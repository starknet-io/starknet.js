import type { AllowArray } from '../../types';
import assert from '../assert';
import { isTypeResult } from '../calldata/cairo';
import { CairoResult, CairoResultVariant } from '../calldata/enum';
import type { CairoTypeStrategy, VariantType } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { isUndefined } from '../typed';
import { isCairoType, type CairoType } from './cairoType.interface';
import { findConstructor, findResponseParser } from './strategyLookup';
import { CairoTuple } from './tuple';

/**
 * A Cairo `core::result::Result::<T, E>` : either an outcome or an error, each with its own type.
 *
 * On the wire it is an enum with two branches — `0` then the `Ok` value, `1` then the `Err` value.
 * Unlike an option, both branches carry something, so a Result always has content; what cannot be
 * guessed is which of the two types that content is, which is why building one from raw data asks
 * for the variant.
 *
 * This is the internal shape. What a caller writes and reads back is {@link CairoResult}, and
 * handing one here says the branch by itself.
 * @example
 * ```typescript
 * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
 * new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Ok).toApiRequest();
 * // ["0", "8"]
 * new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Err).toApiRequest();
 * // ["1", "8"]
 * ```
 */
export class CairoTypeResult {
  /**
   * The name this class is registered under in a strategy's `dynamicSelectors`.
   * @example
   * ```typescript
   * const result = CairoTypeResult.dynamicSelector;
   * // result = "CairoTypeResult"
   * ```
   */
  static dynamicSelector = 'CairoTypeResult' as const;

  /**
   * The selector on the instance, which is how a composite holding it knows what built it.
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * const result = new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Ok)
   *   .dynamicSelector;
   * // result = "CairoTypeResult"
   * ```
   */
  public readonly dynamicSelector = CairoTypeResult.dynamicSelector;

  /**
   * The value this result carries, on whichever branch it is.
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * const result = new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Ok)
   *   .content.toApiRequest();
   * // result = ["8"]
   * ```
   */
  public readonly content: CairoType;

  /**
   * The abi type this result was built for.
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * const result = new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Ok)
   *   .resultCairoType;
   * // result = "core::result::Result::<core::integer::u8, core::integer::u16>"
   * ```
   */
  public readonly resultCairoType: string;

  /**
   * Which of the two branches this result is on.
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * const result = new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Err)
   *   .isVariantOk;
   * // result = false
   * ```
   */
  public readonly isVariantOk: boolean;

  /**
   * Build a result, from a value a caller passed or from the felts of a response.
   *
   * A {@link CairoResult} says its own branch, so `variant` must be left out with one — as with
   * the response iterator, and as with a `CairoTypeResult` being copied. Anywhere else it is
   * required, since the two branches carry different types and the value alone does not say which.
   *
   * `subType` is what makes a result of results work. Handed a `CairoResult`, this constructor
   * unwraps it and calls itself with what was inside, which for a nested result is another
   * `CairoResult`; the flag stops that second call from unwrapping again and losing a level.
   * @param {unknown} content the value, a `CairoResult`, an instance already built, or the
   * response iterator. Never undefined : both branches carry something.
   * @param {string} resultCairoType the abi type, `core::result::Result::<T, E>`
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build the value
   * @param {CairoResultVariant | number} [variant] which branch, when the content does not say
   * @param {boolean} [subType=false] true when called from the unwrapping of a nested
   * `CairoResult`, which is the only caller that should set it
   * @throws {Error} when the content is missing, the type is not a result, or the variant is
   * missing, absurd, or given where the content already says it
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Ok).toApiRequest();
   * // ["0", "8"]
   * new CairoTypeResult(new CairoResult(CairoResultVariant.Err, 8), type, cairoTypeStrategy).toApiRequest();
   * // ["1", "8"]     the CairoResult says the branch
   * new CairoTypeResult(['0x0', '0x64'].values(), type, cairoTypeStrategy).toApiRequest();
   * // ["0", "100"]   read off a response
   * ```
   */
  constructor(
    content: unknown,
    resultCairoType: string,
    parsingStrategy: AllowArray<CairoTypeStrategy>,
    variant?: CairoResultVariant | number,
    subType: boolean = false
  ) {
    this.resultCairoType = resultCairoType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    assert(!isUndefined(content), '"content" parameter has to be defined.');
    assert(content !== null, '"content" parameter has to be defined.');

    if (typeof content === 'object' && 'next' in content) {
      assert(
        isUndefined(variant),
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
      const variantFromIterator = Number(getNext(content as Iterator<string>));
      const activeVariantType =
        CairoTypeResult.getVariantTypes(resultCairoType)[variantFromIterator];
      this.content = CairoTypeResult.parser(
        content as Iterator<string>,
        activeVariantType,
        strategies
      );
      this.isVariantOk = variantFromIterator === CairoResultVariant.Ok;
      return;
    }

    if (content instanceof CairoTypeResult) {
      assert(
        isUndefined(variant),
        'when "content" parameter is a CairoTypeResult, do not define "variant" parameter.'
      );
      this.content = content.content;
      this.isVariantOk = content.isVariantOk;
      this.resultCairoType = content.resultCairoType;
      return;
    }

    CairoTypeResult.validate(content, resultCairoType, variant);

    if (isCairoType(content)) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo Result from a CairoType.'
      );
      this.content = content;
      this.isVariantOk = variant === CairoResultVariant.Ok;
      return;
    }

    if (content instanceof CairoResult && !subType) {
      assert(
        isUndefined(variant),
        'when "content" parameter is a CairoResult and subType is false, do not define "variant" parameter.'
      );
      const variantForResult = content.isOk() ? CairoResultVariant.Ok : CairoResultVariant.Err;
      const result = new CairoTypeResult(
        content.unwrap(),
        resultCairoType,
        strategies,
        variantForResult,
        true // recursive sub-type
      );
      this.content = result.content;
      this.isVariantOk = content.isOk();
      return;
    }

    // not an iterator, not a CairoType -> so it is low level data (BigNumberish, array, object,
    // Cairo Enum)
    assert(
      !isUndefined(variant),
      '"variant" parameter is mandatory when creating a new Cairo Result from a Cairo Enum or raw data.'
    );
    this.isVariantOk = variant === CairoResultVariant.Ok;
    const elementType = CairoTypeResult.getVariantTypes(resultCairoType)[variant];
    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`"${elementType}" is not a valid Cairo type`);
    }
    this.content = build(content, strategies, elementType);
  }

  /**
   * Read the value of the active branch off a response, the branch having already been consumed.
   * @param {Iterator<string>} responseIterator the response felts, positioned on the value
   * @param {string} elementType the type of the branch that was read
   * @param {CairoTypeStrategy[]} strategies how to build the value
   * @returns {CairoType} the value that was read
   * @throws {Error} when the branch type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * new CairoTypeResult(['0x0', '0x64'].values(), type, cairoTypeStrategy).toApiRequest();
   * // ["0", "100"]
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    elementType: string,
    strategies: CairoTypeStrategy[]
  ): CairoType {
    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    return build(responseIterator, strategies, elementType);
  }

  /**
   * The two types a result declares, in the order `[Ok, Err]`.
   *
   * The two are separated by a comma inside the angle brackets, which is exactly how a tuple
   * writes its members — so the tuple splitter reads them, wrapped in parentheses for the
   * occasion, rather than a second comma-scanner being written here.
   * @param {string} type the abi type to read
   * @returns {string[]} the `Ok` type then the `Err` type
   * @throws {Error} when the type carries no bracketed pair, or does not hold exactly two types
   * @example
   * ```typescript
   * const result = CairoTypeResult.getVariantTypes(
   *   'core::result::Result::<core::integer::u8, core::integer::u16>'
   * );
   * // result = ["core::integer::u8", "core::integer::u16"]
   * ```
   */
  static getVariantTypes(type: string): string[] {
    const matchArray = type.match(/(?<=<).+(?=>)/);
    if (matchArray === null) {
      throw new Error(`ABI type ${type} do not includes 2 types enclosed in <>.`);
    }
    const subTypes = CairoTuple.getTupleElementTypes(`(${matchArray[0]})`).map((member) =>
      typeof member === 'string' ? member : member.type
    );
    assert(
      subTypes.length === 2,
      `ABI type ${type} is not including 2 sub types. Found ${subTypes.length}.`
    );
    return subTypes;
  }

  /**
   * Throw unless this is a result type and this variant is one of its two branches.
   *
   * The value is not read here : what it is worth is the business of the branch type, and is
   * checked when that value is built.
   * @param {unknown} _input the value, which this does not read
   * @param {string} type the abi type it is meant for
   * @param {VariantType} variant the branch, when one was given
   * @throws {Error} when the type is not a result, or the variant is neither 0 nor 1
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * CairoTypeResult.validate(200, type, CairoResultVariant.Err); // passes
   * CairoTypeResult.validate(200, type, 3);
   * // throws Error("In Cairo Result, only 0 or 1 variants are authorized.")
   * ```
   */
  static validate(_input: unknown, type: string, variant: VariantType | undefined): void {
    assert(
      CairoTypeResult.isAbiType(type),
      `The type ${type} is not a Cairo Result. Needs core::result::Result::<type1, type2>.`
    );
    if (!isUndefined(variant)) {
      const numberVariant = Number(variant);
      assert(
        [0, 1].includes(numberVariant),
        'In Cairo Result, only 0 or 1 variants are authorized.'
      );
    }
  }

  /**
   * Can this be read as a result of this type, on this branch?
   *
   * The non-throwing form of {@link CairoTypeResult.validate}.
   * @param {unknown} input the value to test
   * @param {string} type the abi type it is meant for
   * @param {VariantType} variant the branch
   * @returns {boolean} true when the type and the variant both fit
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * const result = CairoTypeResult.is(200, type, CairoResultVariant.Ok);
   * // result = true
   * const result2 = CairoTypeResult.is(200, 'wrong', 3);
   * // result2 = false
   * ```
   */
  static is(input: unknown, type: string, variant: VariantType): boolean {
    try {
      CairoTypeResult.validate(input, type, variant);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type a result?
   * @param {string} type the abi type to test
   * @returns {boolean} true for `core::result::Result::<T, E>`
   * @example
   * ```typescript
   * const result = CairoTypeResult.isAbiType(
   *   'core::result::Result::<core::integer::u8, core::integer::u16>'
   * );
   * // result = true
   * const result2 = CairoTypeResult.isAbiType('core::integer::u16');
   * // result2 = false
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeResult(type);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The branch comes first, then the value — always, since both branches carry one.
   * @returns {string[]} the branch then the value, flagged as compiled
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * new CairoTypeResult(8, type, cairoTypeStrategy, CairoResultVariant.Err).toApiRequest();
   * // ["1", "8"]
   * ```
   */
  public toApiRequest(): string[] {
    const result: string[] = [this.isVariantOk ? '0' : '1'];
    result.push(...this.content.toApiRequest());
    return addCompiledFlag(result.flat());
  }

  /**
   * Read the result back as the {@link CairoResult} a caller reads.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read the value back
   * @returns {CairoResult<any, any>} the result, on the branch it was built with
   * @throws {Error} when no strategy can read the value back
   * @example
   * ```typescript
   * const type = 'core::result::Result::<core::integer::u8, core::integer::u16>';
   * const result = new CairoTypeResult(3, type, cairoTypeStrategy, CairoResultVariant.Ok);
   * const value = result.decompose(cairoTypeStrategy).unwrap();
   * // value = 3n
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): CairoResult<any, any> {
    const { content } = this;
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = CairoTypeResult.getVariantTypes(this.resultCairoType)[
      this.isVariantOk ? CairoResultVariant.Ok : CairoResultVariant.Err
    ];
    const parserName =
      'dynamicSelector' in content
        ? (content as { dynamicSelector: string }).dynamicSelector
        : elementType;
    const read = findResponseParser(strategies, parserName);
    if (!read) {
      throw new Error(
        `No response parser found for element type: ${elementType} in parsing strategy`
      );
    }
    return new CairoResult<any, any>(
      this.isVariantOk ? CairoResultVariant.Ok : CairoResultVariant.Err,
      read(content, strategies)
    );
  }
}

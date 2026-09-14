import type { AllowArray } from '../../types';
import assert from '../assert';
import { isTypeOption } from '../calldata/cairo';
import { CairoOption, CairoOptionVariant } from '../calldata/enum';
import type { CairoTypeStrategy, VariantType } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { isUndefined } from '../typed';
import { isCairoType, type CairoType } from './cairoType.interface';
import { findConstructor, findResponseParser } from './strategyLookup';

/**
 * A Cairo `core::option::Option::<T>` : either a value, or nothing.
 *
 * On the wire it is an enum with two branches — `0` then the value for `Some`, `1` alone for
 * `None`. Which branch is meant cannot be read off the value, since `Some(0)` and `None` would
 * look alike, so building one from raw data asks for the variant.
 *
 * This is the internal shape. What a caller writes and reads back is {@link CairoOption}, and
 * handing one of those here says the variant by itself.
 * @example
 * ```typescript
 * const type = 'core::option::Option::<core::integer::u8>';
 * new CairoTypeOption(7, type, cairoTypeStrategy, CairoOptionVariant.Some).toApiRequest();
 * // ["0", "7"]
 * new CairoTypeOption(undefined, type, cairoTypeStrategy, CairoOptionVariant.None).toApiRequest();
 * // ["1"]
 * ```
 */
export class CairoTypeOption {
  /**
   * The name this class is registered under in a strategy's `dynamicSelectors`.
   * @example
   * ```typescript
   * const result = CairoTypeOption.dynamicSelector;
   * // result = "CairoTypeOption"
   * ```
   */
  static dynamicSelector = 'CairoTypeOption' as const;

  /**
   * The selector on the instance, which is how a composite holding it knows what built it.
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u8>';
   * const result = new CairoTypeOption(7, type, cairoTypeStrategy, CairoOptionVariant.Some)
   *   .dynamicSelector;
   * // result = "CairoTypeOption"
   * ```
   */
  public readonly dynamicSelector = CairoTypeOption.dynamicSelector;

  /**
   * The value this option carries, or nothing at all when it is `None`.
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u8>';
   * const result = new CairoTypeOption(undefined, type, cairoTypeStrategy, CairoOptionVariant.None)
   *   .content;
   * // result = undefined
   * ```
   */
  public readonly content: CairoType | undefined;

  /**
   * The abi type this option was built for.
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u8>';
   * const result = new CairoTypeOption(7, type, cairoTypeStrategy, CairoOptionVariant.Some)
   *   .optionCairoType;
   * // result = "core::option::Option::<core::integer::u8>"
   * ```
   */
  public readonly optionCairoType: string;

  /**
   * Which of the two branches this option is on.
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u8>';
   * const result = new CairoTypeOption(7, type, cairoTypeStrategy, CairoOptionVariant.Some)
   *   .isVariantSome;
   * // result = true
   * ```
   */
  public readonly isVariantSome: boolean;

  /**
   * Build an option, from a value a caller passed or from the felts of a response.
   *
   * A {@link CairoOption} says its own branch, so `variant` is not given with one — nor with the
   * response iterator, which reads the branch off the wire. Anywhere else it is required.
   *
   * `subType` is what makes an option of options work. Handed a `CairoOption`, this constructor
   * unwraps it and calls itself with what was inside, which for a nested option is another
   * `CairoOption`; the flag stops that second call from unwrapping again and losing a level, and
   * sends it to the strategy instead, where the inner type is what gets built.
   * @param {unknown} content the value, a `CairoOption`, an instance already built, or the
   * response iterator
   * @param {string} optionCairoType the abi type, `core::option::Option::<T>`
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build the value
   * @param {CairoOptionVariant | number} [variant] which branch, when the content does not say.
   * Must be omitted when `content` is the response iterator.
   * @param {boolean} [subType=false] true when called from the unwrapping of a nested
   * `CairoOption`, which is the only caller that should set it
   * @throws {Error} when the type is not an option, when the variant is missing, absurd, or
   * contradicts the content
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u8>';
   * new CairoTypeOption(7, type, cairoTypeStrategy, CairoOptionVariant.Some).toApiRequest();
   * // ["0", "7"]
   * new CairoTypeOption(new CairoOption(CairoOptionVariant.Some, 7), type, cairoTypeStrategy).toApiRequest();
   * // ["0", "7"]     the CairoOption says the branch
   * new CairoTypeOption(['0x0', '0x20'].values(), type, cairoTypeStrategy).toApiRequest();
   * // ["0", "32"]    read off a response
   * ```
   */
  constructor(
    content: unknown,
    optionCairoType: string,
    parsingStrategy: AllowArray<CairoTypeStrategy>,
    variant?: CairoOptionVariant | number,
    subType: boolean = false
  ) {
    this.optionCairoType = optionCairoType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];

    if (variant === CairoOptionVariant.Some && isUndefined(content)) {
      throw new Error('"content" parameter has to be defined when Some variant is selected');
    }
    if (variant === CairoOptionVariant.None && !isUndefined(content)) {
      throw new Error('"content" parameter has to be NOT defined when None variant is selected');
    }

    if (content && typeof content === 'object' && 'next' in content) {
      assert(
        isUndefined(variant),
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
      const variantFromIterator = Number(getNext(content as Iterator<string>));
      switch (variantFromIterator) {
        case CairoOptionVariant.Some:
          this.content = CairoTypeOption.parser(
            content as Iterator<string>,
            optionCairoType,
            strategies
          );
          break;
        case CairoOptionVariant.None:
          this.content = undefined;
          break;
        default:
          throw new Error('Invalid Option variant in iterator.');
      }
      this.isVariantSome = variantFromIterator === CairoOptionVariant.Some;
      return;
    }

    if (content instanceof CairoTypeOption) {
      this.content = content.content;
      this.isVariantSome = content.isVariantSome;
      this.optionCairoType = content.optionCairoType;
      return;
    }

    CairoTypeOption.validate(content, optionCairoType, variant);

    if (isCairoType(content)) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo option from a CairoType.'
      );
      this.content = content;
      this.isVariantSome = variant === CairoOptionVariant.Some;
      return;
    }

    if (content instanceof CairoOption) {
      if (!subType) {
        const option = new CairoTypeOption(
          content.unwrap(),
          optionCairoType,
          strategies,
          content.isSome() ? CairoOptionVariant.Some : CairoOptionVariant.None,
          true // recursive sub-type
        );
        this.content = option.content;
        this.isVariantSome = option.isVariantSome;
        return;
      }
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoOption.'
      );
    }

    // not an iterator, not a CairoType -> so it is low level data (BigNumberish, array, object,
    // Cairo Enum)
    assert(
      !isUndefined(variant),
      '"variant" parameter is mandatory when creating a new Cairo option from a "CairoType" or raw data.'
    );
    this.isVariantSome = true;
    switch (variant) {
      case CairoOptionVariant.Some: {
        const elementType = CairoTypeOption.getVariantSomeType(optionCairoType);
        const build = findConstructor(strategies, elementType);
        if (!build) {
          throw new Error(`"${elementType}" is not a valid Cairo type`);
        }
        this.content = build(content, strategies, elementType);
        break;
      }
      case CairoOptionVariant.None: {
        this.isVariantSome = false;
        this.content = undefined;
        break;
      }
      default:
        throw new Error('Invalid Option variant.');
    }
  }

  /**
   * Read the value of a `Some` off a response, the branch having already been consumed.
   * @param {Iterator<string>} responseIterator the response felts, positioned on the value
   * @param {string} someVariantCairoType the abi type, `core::option::Option::<T>`
   * @param {CairoTypeStrategy[]} strategies how to build the value
   * @returns {CairoType} the value that was read
   * @throws {Error} when the value type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator holding a Some
   * const type = 'core::option::Option::<core::integer::u8>';
   * new CairoTypeOption(['0x0', '0x20'].values(), type, cairoTypeStrategy).toApiRequest();
   * // ["0", "32"]
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    someVariantCairoType: string,
    strategies: CairoTypeStrategy[]
  ): CairoType {
    const elementType = CairoTypeOption.getVariantSomeType(someVariantCairoType);
    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    return build(responseIterator, strategies, elementType);
  }

  /**
   * The type a `Some` carries, read out of the option type.
   * @param {string} type the abi type to read
   * @returns {string} the type between the angle brackets
   * @throws {Error} when there is no type between brackets
   * @example
   * ```typescript
   * const result = CairoTypeOption.getVariantSomeType('core::option::Option::<core::integer::u8>');
   * // result = "core::integer::u8"
   * ```
   */
  static getVariantSomeType(type: string): string {
    const matchArray = type.match(/(?<=<).+(?=>)/);
    if (matchArray === null) {
      throw new Error(`ABI type ${type} do not includes a valid type of data.`);
    }
    return matchArray[0];
  }

  /**
   * Throw unless this is an option type and this variant is one of its two branches.
   *
   * The value is not read here : what it is worth is the business of the type the option carries,
   * and is checked when that value is built.
   * @param {unknown} _input the value, which this does not read
   * @param {string} type the abi type it is meant for
   * @param {VariantType} variant the branch, when one was given
   * @throws {Error} when the type is not an option, or the variant is neither 0 nor 1
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u16>';
   * CairoTypeOption.validate(200, type, CairoOptionVariant.Some); // passes
   * CairoTypeOption.validate(200, type, 3);
   * // throws Error("In Cairo option, only 0 or 1 variants are authorized.")
   * ```
   */
  static validate(_input: unknown, type: string, variant: VariantType | undefined): void {
    assert(
      CairoTypeOption.isAbiType(type),
      `The type ${type} is not a Cairo option. Needs core::option::Option::<type>.`
    );
    if (!isUndefined(variant)) {
      const numberVariant = Number(variant);
      assert(
        [0, 1].includes(numberVariant),
        'In Cairo option, only 0 or 1 variants are authorized.'
      );
    }
  }

  /**
   * Can this be read as an option of this type, on this branch?
   *
   * The non-throwing form of {@link CairoTypeOption.validate}.
   * @param {unknown} input the value to test
   * @param {string} type the abi type it is meant for
   * @param {VariantType} variant the branch
   * @returns {boolean} true when the type and the variant both fit
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u16>';
   * const result = CairoTypeOption.is(200, type, CairoOptionVariant.Some);
   * // result = true
   * const result2 = CairoTypeOption.is(200, type, 3);
   * // result2 = false
   * ```
   */
  static is(input: unknown, type: string, variant: VariantType): boolean {
    try {
      CairoTypeOption.validate(input, type, variant);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type an option?
   * @param {string} type the abi type to test
   * @returns {boolean} true for `core::option::Option::<T>`
   * @example
   * ```typescript
   * const result = CairoTypeOption.isAbiType('core::option::Option::<core::integer::u16>');
   * // result = true
   * const result2 = CairoTypeOption.isAbiType('core::integer::u16');
   * // result2 = false
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeOption(type);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The branch comes first, and the value only follows it on `Some` — a `None` is one felt, and
   * that is the whole of it.
   * @returns {string[]} the branch then the value, flagged as compiled
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u8>';
   * new CairoTypeOption(8, type, cairoTypeStrategy, CairoOptionVariant.Some).toApiRequest();
   * // ["0", "8"]
   * new CairoTypeOption(undefined, type, cairoTypeStrategy, CairoOptionVariant.None).toApiRequest();
   * // ["1"]
   * ```
   */
  public toApiRequest(): string[] {
    const result: string[] = [this.isVariantSome ? '0' : '1'];
    if (this.isVariantSome) {
      result.push(...this.content!.toApiRequest());
    }
    return addCompiledFlag(result.flat());
  }

  /**
   * Read the value of a `Some` back as the plain value a caller reads.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read the value back
   * @returns {any} the value the option carries
   * @throws {Error} when no strategy can read it back
   * @example
   * ```typescript
   * // called from decompose, and only on a Some
   * const type = 'core::option::Option::<core::integer::u8>';
   * const option = new CairoTypeOption(3, type, cairoTypeStrategy, CairoOptionVariant.Some);
   * option.decompose(cairoTypeStrategy).unwrap();
   * // 3n
   * ```
   */
  private decomposeSome(strategyDecompose: AllowArray<CairoTypeStrategy>): any {
    const content = this.content as CairoType;
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = CairoTypeOption.getVariantSomeType(this.optionCairoType);
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
    return read(content, strategies);
  }

  /**
   * Read the option back as the {@link CairoOption} a caller reads.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read the value back
   * @returns {CairoOption<any>} the option, on the branch it was built with
   * @throws {Error} when no strategy can read the value back
   * @example
   * ```typescript
   * const type = 'core::option::Option::<core::integer::u8>';
   * const option = new CairoTypeOption(3, type, cairoTypeStrategy, CairoOptionVariant.Some);
   * const result = option.decompose(cairoTypeStrategy).unwrap();
   * // result = 3n
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): CairoOption<any> {
    if (this.isVariantSome) {
      return new CairoOption<any>(CairoOptionVariant.Some, this.decomposeSome(strategyDecompose));
    }
    return new CairoOption<any>(CairoOptionVariant.None);
  }
}

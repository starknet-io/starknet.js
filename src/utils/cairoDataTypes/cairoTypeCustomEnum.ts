import type { AbiEnum, AllowArray } from '../../types';
import assert from '../assert';
import { isCairo1Type } from '../calldata/cairo';
import {
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  type CairoEnumRaw,
} from '../calldata/enum';
import type { CairoTypeStrategy, VariantType } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { isUndefined } from '../typed';
import { isCairoType, type CairoType } from './cairoType.interface';
import { CairoTypeOption } from './cairoTypeOption';
import { CairoTypeResult } from './cairoTypeResult';
import { findConstructor, findResponseParser } from './strategyLookup';

/**
 * A Cairo custom enum : one of several named variants, each carrying its own type.
 *
 * On the wire it is the index of the active variant, then that variant's value. Which variant is
 * meant cannot be read off the value, so building one from raw data asks for the index — unless
 * the content is a {@link CairoCustomEnum}, which names its own active variant.
 *
 * Like a struct, a custom enum has no shape to recognize : its abi type is the name the contract
 * chose. It is found by that exact name among a strategy's constructors, which is what
 * `enumStrategy` builds from an abi.
 * @example
 * ```typescript
 * const abiEnum: AbiEnum = {
 *   type: 'enum',
 *   name: 'test::MyEnum',
 *   variants: [
 *     { name: 'Empty', type: '()' },
 *     { name: 'Number', type: 'core::integer::u8' },
 *   ],
 * };
 * const strategies = [cairoTypeStrategy, enumStrategy([abiEnum])];
 * new CairoTypeCustomEnum(7, abiEnum, strategies, 1).toApiRequest();
 * // ["1", "7"]
 * ```
 */
export class CairoTypeCustomEnum {
  /**
   * The name this enum is registered under, which is the name the abi gave it.
   * @example
   * ```typescript
   * const result = new CairoTypeCustomEnum(7, abiEnum, strategies, 1).dynamicSelector;
   * // result = "test::MyEnum"
   * ```
   */
  public readonly dynamicSelector: string;

  /**
   * The value the active variant carries.
   * @example
   * ```typescript
   * const result = new CairoTypeCustomEnum(7, abiEnum, strategies, 1).content.toApiRequest();
   * // result = ["7"]
   * ```
   */
  public readonly content: CairoType;

  /**
   * The abi definition this enum was built from.
   * @example
   * ```typescript
   * const result = new CairoTypeCustomEnum(7, abiEnum, strategies, 1).abiEnum.name;
   * // result = "test::MyEnum"
   * ```
   */
  public readonly abiEnum: AbiEnum;

  /**
   * The index of the active variant, in the abi's order.
   * @example
   * ```typescript
   * const result = new CairoTypeCustomEnum(7, abiEnum, strategies, 1).enumVariant;
   * // result = 1
   * ```
   */
  public readonly enumVariant: number;

  /**
   * Build a custom enum, from a value a caller passed or from the felts of a response.
   *
   * A {@link CairoCustomEnum} names its own active variant, so `variant` must be left out with one
   * — as with the response iterator and with a `CairoTypeCustomEnum` being copied. Anywhere else
   * it is required, the index being the only thing that says which variant a value belongs to.
   *
   * A {@link CairoOption} or a {@link CairoResult} is turned into its own Cairo type here rather
   * than through the strategy : the strategy is handed `variant`, and those two would read it as
   * their own branch instead of as the enum's index.
   *
   * `subType` is what makes an enum of enums work. Handed a `CairoCustomEnum`, this constructor
   * unwraps it and calls itself with what was inside; the flag stops that second call from
   * unwrapping again and losing a level.
   * @param {unknown} content the value, a `CairoCustomEnum`, an instance already built, or the
   * response iterator
   * @param {AbiEnum} abiEnum the abi definition of this enum
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build the variant's value
   * @param {number} [variant] the index of the active variant, when the content does not say
   * @param {boolean} [subType=false] true when called from the unwrapping of a nested
   * `CairoCustomEnum`, which is the only caller that should set it
   * @throws {Error} when the content is missing, the variant is missing or out of range, or the
   * variant type is one no strategy knows
   * @example
   * ```typescript
   * new CairoTypeCustomEnum(7, abiEnum, strategies, 1).toApiRequest();
   * // ["1", "7"]
   * new CairoTypeCustomEnum(new CairoCustomEnum({ Number: 7 }), abiEnum, strategies).toApiRequest();
   * // ["1", "7"]     the CairoCustomEnum names its own variant
   * ```
   */
  constructor(
    content: unknown,
    abiEnum: AbiEnum,
    parsingStrategy: AllowArray<CairoTypeStrategy>,
    variant?: number,
    subType: boolean = false
  ) {
    this.dynamicSelector = abiEnum.name;
    this.abiEnum = abiEnum;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    assert(!isUndefined(content), '"content" parameter has to be defined.');
    assert(content !== null, '"content" parameter has to be defined.');

    if (content && typeof content === 'object' && 'next' in content) {
      assert(
        isUndefined(variant),
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
      const variantFromIterator = Number(getNext(content as Iterator<string>));
      this.enumVariant = variantFromIterator;
      const elementTypes = CairoTypeCustomEnum.getVariantTypes(abiEnum);
      this.content = CairoTypeCustomEnum.parser(
        content as Iterator<string>,
        elementTypes[variantFromIterator],
        strategies
      );
      return;
    }

    if (content instanceof CairoTypeCustomEnum) {
      assert(
        isUndefined(variant),
        'when "content" parameter is a CairoTypeCustomEnum do not define "variant" parameter.'
      );
      this.content = content.content;
      this.enumVariant = content.enumVariant;
      this.dynamicSelector = content.dynamicSelector;
      this.abiEnum = content.abiEnum;
      return;
    }

    CairoTypeCustomEnum.validate(content, abiEnum.name, variant);

    if (isCairoType(content)) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo enum from a CairoType.'
      );
      this.content = content;
      this.enumVariant = variant;
      return;
    }

    if (content instanceof CairoOption) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoOption.'
      );
      this.content = new CairoTypeOption(
        content.unwrap(),
        CairoTypeCustomEnum.getVariantTypes(abiEnum)[variant],
        strategies,
        content.isSome() ? CairoOptionVariant.Some : CairoOptionVariant.None
      );
      this.enumVariant = variant;
      return;
    }

    if (content instanceof CairoResult) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoResult.'
      );
      this.content = new CairoTypeResult(
        content.unwrap(),
        CairoTypeCustomEnum.getVariantTypes(abiEnum)[variant],
        strategies,
        content.isOk() ? CairoResultVariant.Ok : CairoResultVariant.Err
      );
      this.enumVariant = variant;
      return;
    }

    if (content instanceof CairoCustomEnum) {
      if (!subType) {
        const subVariant = CairoTypeCustomEnum.extractEnumMembersNames(abiEnum).indexOf(
          content.activeVariant()
        );
        assert(subVariant >= 0, `${content.activeVariant()} activeVariant is unknown in AbiEnum.`);
        const customEnum = new CairoTypeCustomEnum(
          content.unwrap(),
          abiEnum,
          strategies,
          subVariant,
          true // recursive sub-type
        );
        this.content = customEnum.content;
        this.enumVariant = customEnum.enumVariant;
        return;
      }
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoCustomEnum.'
      );
    }

    // not an iterator, not a CairoType -> so it is low level data (BigNumberish, array, object)
    assert(
      !isUndefined(variant),
      '"variant" parameter is mandatory when creating a new Cairo custom enum from a Cairo Enum or raw data.'
    );
    const numberVariant = Number(variant);
    assert(
      numberVariant < abiEnum.variants.length && numberVariant >= 0,
      `The custom enum ${abiEnum.name} variant must be in the range 0..${abiEnum.variants.length - 1}. You requested variant #${numberVariant}`
    );
    this.enumVariant = variant;
    const elementType = CairoTypeCustomEnum.getVariantTypes(abiEnum)[variant];
    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`"${elementType}" is not a valid Cairo type`);
    }
    this.content = build(content, strategies, elementType, variant);
  }

  /**
   * Read the value of the active variant off a response, its index having been consumed.
   * @param {Iterator<string>} responseIterator the response felts, positioned on the value
   * @param {string} variantCairoType the type of the variant that was read
   * @param {CairoTypeStrategy[]} strategies how to build the value
   * @returns {CairoType} the value that was read
   * @throws {Error} when the variant type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * new CairoTypeCustomEnum(['0x1', '0x7'].values(), abiEnum, strategies).toApiRequest();
   * // ["1", "7"]
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    variantCairoType: string,
    strategies: CairoTypeStrategy[]
  ): CairoType {
    const build = findConstructor(strategies, variantCairoType);
    if (!build) {
      throw new Error(`No parser found for element type: ${variantCairoType} in parsing strategy`);
    }
    return build(responseIterator, strategies, variantCairoType);
  }

  /**
   * Throw unless this name can be a Cairo 1 type at all.
   *
   * There is nothing more to check : a custom enum's abi type is the name the contract chose, and
   * what the value is worth is the business of the active variant's type.
   * @param {unknown} _input the value, which this does not read
   * @param {string} type the abi name it is meant for
   * @param {VariantType} _variant the variant, which this does not read
   * @throws {Error} when the name is not a Cairo 1 type name
   * @example
   * ```typescript
   * CairoTypeCustomEnum.validate(7, 'test::MyEnum', 1); // passes
   * CairoTypeCustomEnum.validate(7, 'wrong', 1);
   * // throws Error("The type wrong is not a Cairo Enum. Needs impl::name.")
   * ```
   */
  static validate(_input: unknown, type: string, _variant: VariantType | undefined): void {
    assert(
      CairoTypeCustomEnum.isAbiType(type),
      `The type ${type} is not a Cairo Enum. Needs impl::name.`
    );
  }

  /**
   * Can this name be a Cairo custom enum?
   *
   * The non-throwing form of {@link CairoTypeCustomEnum.validate}.
   * @param {unknown} input the value to test
   * @param {string} type the abi name it is meant for
   * @param {VariantType} variant the variant
   * @returns {boolean} true when the name could be one
   * @example
   * ```typescript
   * const result = CairoTypeCustomEnum.is(7, 'test::MyEnum', 1);
   * // result = true
   * const result2 = CairoTypeCustomEnum.is(7, 'wrong', 1);
   * // result2 = false
   * ```
   */
  static is(input: unknown, type: string, variant: VariantType): boolean {
    try {
      CairoTypeCustomEnum.validate(input, type, variant);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Could this abi type name a Cairo custom enum?
   *
   * Only the shape of the name is testable — a custom enum has no pattern of its own, so this
   * says no more than that the name looks like a Cairo 1 type. It is deliberately not used as a
   * dynamic selector : one that answered true this widely would shadow every other type.
   * @param {string} type the abi type to test
   * @returns {boolean} true when the name contains `::`
   * @example
   * ```typescript
   * const result = CairoTypeCustomEnum.isAbiType('my_contract::my_enum');
   * // result = true
   * const result2 = CairoTypeCustomEnum.isAbiType('wrong');
   * // result2 = false
   * ```
   */
  static isAbiType(type: string): boolean {
    return isCairo1Type(type);
  }

  /**
   * The types of the variants, in the abi's order.
   * @param {AbiEnum} type the abi definition to read
   * @returns {string[]} one type per variant
   * @example
   * ```typescript
   * const result = CairoTypeCustomEnum.getVariantTypes(abiEnum);
   * // result = ["()", "core::integer::u8"]
   * ```
   */
  static getVariantTypes(type: AbiEnum): string[] {
    return type.variants.map((member) => member.type);
  }

  /**
   * The names of the variants, in the abi's order.
   * @param {AbiEnum} type the abi definition to read
   * @returns {string[]} one name per variant
   * @example
   * ```typescript
   * const result = CairoTypeCustomEnum.extractEnumMembersNames(abiEnum);
   * // result = ["Empty", "Number"]
   * ```
   */
  static extractEnumMembersNames(type: AbiEnum): string[] {
    return type.variants.map((member) => member.name);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The index of the active variant comes first, then its value.
   * @returns {string[]} the variant index then the value, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoTypeCustomEnum(7, abiEnum, strategies, 1).toApiRequest();
   * // result = ["1", "7"]
   * ```
   */
  public toApiRequest(): string[] {
    const result: string[] = [this.enumVariant.toString(10)];
    result.push(...this.content.toApiRequest());
    return addCompiledFlag(result.flat());
  }

  /**
   * Read the enum back as the {@link CairoCustomEnum} a caller reads.
   *
   * Every variant the abi declares appears in the result, the inactive ones as `undefined` — which
   * is how `CairoCustomEnum` tells which one is active.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read the value back
   * @returns {CairoCustomEnum} the enum, with its active variant carrying the value
   * @throws {Error} when no strategy can read the value back
   * @example
   * ```typescript
   * const result = new CairoTypeCustomEnum(7, abiEnum, strategies, 1).decompose(strategies);
   * // result = CairoCustomEnum { Empty: undefined, Number: 7n }
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): CairoCustomEnum {
    const { content } = this;
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = CairoTypeCustomEnum.getVariantTypes(this.abiEnum)[this.enumVariant];
    const elementNames = CairoTypeCustomEnum.extractEnumMembersNames(this.abiEnum);
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
    const resultObject: CairoEnumRaw = elementNames.reduce(
      (current: CairoEnumRaw, name: string, index: number) => ({
        ...current,
        [name]: index === this.enumVariant ? read(content, strategies) : undefined,
      }),
      {}
    );
    return new CairoCustomEnum(resultObject);
  }
}

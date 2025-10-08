import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { type ParsingStrategy, type VariantType } from '../calldata/parser/parsingStrategy.type';
import { CairoType } from './cairoType.interface';
import { isCairo1Type } from '../calldata/cairo';
import { isUndefined } from '../typed';
import {
  CairoOptionVariant,
  CairoOption,
  CairoResultVariant,
  CairoResult,
  CairoCustomEnum,
  type CairoEnumRaw,
} from '../calldata/enum';
import { CairoTypeOption } from './cairoTypeOption';
import type { AbiEnum, AllowArray } from '../../types';
import { CairoTypeResult } from './cairoTypeResult';

/**
 * Represents a Cairo custom enum.
 *
 * Key Features:
 * - Internal usage class (users are using "CairoCustomEnum" class).
 * - Unified constructor handling user input, API responses, and CairoType instances
 * - Automatic type validation and conversion using parsing strategies
 * - Bi-directional serialization (to/from Starknet API format)
 * - Support for nested types
 * - Direct CallData.compile() integration
 * - Comprehensive type checking and validation
 */
export class CairoTypeCustomEnum extends CairoType {
  public readonly dynamicSelector: string;

  /* CairoType instance representing the content of the Cairo enum. */
  public readonly content: CairoType;

  /** Cairo named custom enum type definition */
  public readonly abiEnum: AbiEnum;

  /* Id of the selected enum */
  public readonly enumVariant: number;

  /**
   * CairoTypeCustomEnum provides a complete implementation for handling Cairo's enums,
   * which have the form "my_contract::enum_name".
   *
   * Internal usage class (users are using "CairoResult" class).
   *
   * It supports nested types, type validation, encoding, and parsing from various sources.
   * @param {unknown} content - Input data (array, object, BigNumberish,
   * Iterator<string>, CairoOption, CairoResult, CairoCustomEnum, or CairoType instance).
   * @param {AbiEnum} abiEnum - Abi definition of the enum.
   * @param {AllowArray<ParsingStrategy>} parsingStrategy - Parsing strategy for element type handling.
   * @param {number} [variant] - (optional) variant number of the custom enum. If "content" is an iterator or a CairoCustomEnum, this parameter must be omitted.
   * @param {boolean} [subType=false] - optional default=false. Use "true" if called in nested CairoResult instances.
   * @example
   * ```typescript
   * import { CairoTypeCustomEnum } from 'starknet';
   * // from a CairoCustomEnum instance:
   * const strategies = myTestContract.callData.parser.parsingStrategies;
   * const abiMyEnum = myTestContract.abi.find((data: AbiEntry) => data.name == "enums::MyEnum") as AbiEnum;
   * const myEnum = new CairoCustomEnum({ valid: 15n });
   * const myTypeEnum1 = new CairoTypeCustomEnum(myEnum, abiMyEnum, strategies);
   * console.log(myTypeEnum1.toApiRequest()); // ['1','15']
   * console.log(myTypeEnum1.decompose(strategies)); // CairoCustomEnum instance with content 15n and `valid` variant.
   *
   * // From API response:
   * const apiData = ['0x1', '0x20'][Symbol.iterator]();
   * const fromApiResult = new CairoTypeCustomEnum(apiData, abiMyEnum, strategies); // CairoTypeCustomEnum instance with content 32n and `valid` variant.
   * ```
   */

  constructor(
    content: unknown,
    abiEnum: AbiEnum,
    parsingStrategy: AllowArray<ParsingStrategy>,
    variant?: number,
    subType: boolean = false
  ) {
    super();
    this.dynamicSelector = abiEnum.name;
    this.abiEnum = abiEnum;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    assert(!isUndefined(content), '"content" parameter has to be defined.');
    assert(content !== null, '"content" parameter has to be defined.');
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      assert(
        isUndefined(variant),
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
      const variantFromIterator = Number(getNext(content as Iterator<string>));
      this.enumVariant = variantFromIterator;
      const elementTypes: string[] = CairoTypeCustomEnum.getVariantTypes(abiEnum);
      const parsedContent: CairoType = CairoTypeCustomEnum.parser(
        content as Iterator<string>,
        elementTypes[variantFromIterator],
        strategies
      );
      this.content = parsedContent;
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
    // "content" is a CairoType
    if (content && typeof content === 'object' && content !== null && 'toApiRequest' in content) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo enum from a CairoType.'
      );
      this.content = content as CairoType;
      this.enumVariant = variant;
      return;
    }

    // "content" is a CairoOption
    if (content instanceof CairoOption) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoOption.'
      );
      const option = new CairoTypeOption(
        content.unwrap(),
        CairoTypeCustomEnum.getVariantTypes(abiEnum)[variant],
        strategies,
        content.isSome() ? CairoOptionVariant.Some : CairoOptionVariant.None
      );
      this.content = option;
      this.enumVariant = variant;
      return;
    }

    // "content" is a CairoResult
    if (content instanceof CairoResult) {
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo custom enum from a CairoResult.'
      );
      const option = new CairoTypeResult(
        content.unwrap(),
        CairoTypeCustomEnum.getVariantTypes(abiEnum)[variant],
        strategies,
        content.isOk() ? CairoResultVariant.Ok : CairoResultVariant.Err
      );
      this.content = option;
      this.enumVariant = variant;
      return;
    }

    // "content" is a CairoCustomEnum
    if (content instanceof CairoCustomEnum) {
      if (!subType) {
        const subVariant: number = CairoTypeCustomEnum.extractEnumMembersNames(abiEnum).indexOf(
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
    // not an iterator, not an CairoType -> so is low level data (BigNumberish, array, object)
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
    const strategyConstructorNum = strategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[elementType]
    );
    if (strategyConstructorNum >= 0) {
      const constructor = strategies[strategyConstructorNum].constructors[elementType];
      this.content = constructor(content, strategies, elementType, variant);
      return;
    }
    const strategyDynamicNum = strategies.findIndex((strategy: ParsingStrategy) => {
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      return dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));
    });
    if (strategyDynamicNum >= 0) {
      const dynamicSelectors = Object.entries(strategies[strategyDynamicNum].dynamicSelectors);
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));
      const [selectorName] = matchingSelector as [string, (type: string) => boolean];
      const dynamicConstructor = strategies[strategyDynamicNum].constructors[selectorName];
      this.content = dynamicConstructor(content, strategies, elementType, variant);
      return;
    }
    throw new Error(`"${elementType}" is not a valid Cairo type`);
  }

  /**
   * Parse data from iterator into CairoType instances using the provided parsing strategy.
   *
   * This is the core parsing logic that consumes data sequentially from an iterator and
   * converts it into proper CairoType instances. It handles:
   * - Direct constructors (primitive types like u8, u256, etc.)
   * - Dynamic selectors (complex types like nested fixed arrays)
   * - Unknown types (stored as raw strings for later error handling)
   *
   * @param {Iterator<string>} responseIterator - Iterator over string data to parse
   * @param {string} variantCairoType - The Cairo type of the variant of the custom enum (e.g., "core::integer::u8")
   * @param {ParsingStrategy[]} parsingStrategies - The parsing strategy containing constructors and selectors
   * @returns {CairoType} CairoType instance
   * @private
   */
  private static parser(
    responseIterator: Iterator<string>,
    variantCairoType: string,
    parsingStrategies: ParsingStrategy[]
  ): CairoType {
    const strategyConstructorNum = parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[variantCairoType]
    );
    if (strategyConstructorNum >= 0) {
      const constructor = parsingStrategies[strategyConstructorNum].constructors[variantCairoType];
      return constructor(responseIterator, parsingStrategies, variantCairoType);
    }
    const strategyDynamicNum = parsingStrategies.findIndex((strategy: ParsingStrategy) => {
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      return dynamicSelectors.find(([, selectorFn]) => selectorFn(variantCairoType));
    });
    if (strategyDynamicNum >= 0) {
      const dynamicSelectors = Object.entries(
        parsingStrategies[strategyDynamicNum].dynamicSelectors
      );
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) =>
        selectorFn(variantCairoType)
      );
      const [selectorName] = matchingSelector as [string, (type: string) => boolean];
      const dynamicConstructor = parsingStrategies[strategyDynamicNum].constructors[selectorName];
      if (dynamicConstructor) {
        return dynamicConstructor(responseIterator, parsingStrategies, variantCairoType);
      }
    }
    // Unknown type - collect raw values, defer error
    const rawValues = getNext(responseIterator);
    return rawValues as unknown as CairoType;
  }

  /**
   * Validate input data for CairoTypeCustomEnum creation.
   * @param {unknown} _input - Input data to validate
   * @param {string} type - The Abi definition of the enum
   * @param {VariantType} _variant - The variant of the enum (0, "1", 2, ...)
   * @throws Error if input is invalid
   */
  static validate(_input: unknown, type: string, _variant: VariantType | undefined): void {
    assert(
      CairoTypeCustomEnum.isAbiType(type),
      `The type ${type} is not a Cairo Enum. Needs impl::name.`
    );
  }

  /**
   * Check if input data is valid for CairoTypeCustomEnum creation.
   * @param {unknown} input - Input data to check
   * @param {string} type - The Cairo Custom Enum type (e.g. "core::integer::u16")
   * @param {VariantType} variant - The variant of the enum.
   * @returns {boolean} true if valid, false otherwise
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
   * Checks if the given string represents a valid Cairo custom enum variant type format.
   * Type is any valid Cairo type.
   * @param {string} type - The type string to validate
   * @returns {boolean} `true` if the type is a valid Cairo custom enum format, `false` otherwise
   * @example
   * ```typescript
   * CairoTypeCustomEnum.isAbiType("my_contract::my_enum"); // true
   * ```
   */
  static isAbiType(type: string): boolean {
    return isCairo1Type(type);
  }

  /**
   * Extract the Cairo type of each property of a named Cairo Enum
   * @param {AbiEnum} type - Abi definition of the enum
   * @returns {string[]} an array of Cairo types
   * @example
   * ```typescript
   * const abiEnum: AbiEnum = {
   *   type: "enum",
   *   name: "my_enum",
   *   variants: [
   *     { name: "variant1", type: "core::integer::u8" },
   *     { name: "variant2", type: "core::integer::u16" }
   *   ]
   * };
   * const types = CairoTypeCustomEnum.getVariantTypes(abiEnum);
   * // types = ["core::integer::u8", "core::integer::u16"]
   * ```
   */
  private static getVariantTypes(type: AbiEnum): string[] {
    return type.variants.map((member) => member.type);
  }

  /**
   *Extract the Cairo names of each property of a Cairo custom enum
   * @param {AbiStruct} type - Abi definition of the enum
   * @returns {string[]} an array of Cairo enum property names
   * @example
   * ```typescript
   * const abiEnum: AbiEnum = {
   *   type: "enum",
   *   name: "my_enum",
   *   variants: [
   *     { name: "variant1", type: "core::integer::u8" },
   *     { name: "variant2", type: "core::integer::u16" }
   *   ]
   * };
   * const variantList = CairoTypeCustomEnum.extractEnumMembersNames(abiEnum);
   * // variantList = ["variant1", "variant2"]
   * ```
   */
  public static extractEnumMembersNames(type: AbiEnum): string[] {
    return type.variants.map((member) => member.name);
  }

  /**
   * Serialize the Cairo custom enum into decimal strings for Starknet API requests.
   *
   * Converts all CairoType elements in this Cairo custom enum into their hex string representation
   * by calling `toApiRequest()`. This is used when
   * sending data to the Starknet network.
   *
   * @returns {string[]} Array of decimal strings ready for API requests
   * @example
   * ```typescript
   * const strategies = myTestContract.callData.parser.parsingStrategies;
   * const abiMyEnum = myTestContract.abi.find((data: AbiEntry) => data.name == "enums::MyEnum") as AbiEnum;
   * const myEnum = new CairoCustomEnum({ valid: 15n });
   * const myTypeEnum1 = new CairoTypeCustomEnum(myEnum, abiMyEnum, strategies);
   * const encoded = myTypeEnum1.toApiRequest());
   * // encoded = ['1','15']
   * ```
   */
  public toApiRequest(): string[] {
    const result: string[] = [this.enumVariant.toString(10)];
    result.push(this.content!.toApiRequest());
    return addCompiledFlag(result.flat());
  }

  /**
   * Decompose the CairoTypeResult instance into a CairoResult instance.
   *
   * Transforms CairoType instances into their final parsed values using the strategy's
   * response parsers (e.g., CairoUint8 → BigInt). This method is used primarily for
   * parsing API responses into user-friendly formats.
   *
   * @param {AllowArray<ParsingStrategy>} strategyDecompose - Parsing strategy for response parsing
   * @returns {CairoCustomEnum} a CairoCustomEnum instance, with parsed variant (BigInt, numbers, nested arrays, etc.)
   * @example
   * ```typescript
   * const strategies = myTestContract.callData.parser.parsingStrategies;
   * const abiMyEnum = myTestContract.abi.find((data: AbiEntry) => data.name == "enums::MyEnum") as AbiEnum;
   * const myEnum = new CairoCustomEnum({ valid: 15n });
   * const myTypeEnum1 = new CairoTypeCustomEnum(myEnum, abiMyEnum, strategies);
   * const parsed = myTypeEnum1.decompose(strategies);
   * // parsed = CairoCustomEnum{ valid: 15n }
   * ```
   */
  public decompose(strategyDecompose: AllowArray<ParsingStrategy>): CairoCustomEnum {
    const { content } = this;
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    // For raw string values (unsupported types), throw error
    const enumTypes = CairoTypeCustomEnum.getVariantTypes(this.abiEnum);
    const elementType = enumTypes[this.enumVariant];
    const elementNames = CairoTypeCustomEnum.extractEnumMembersNames(this.abiEnum);
    if (typeof content === 'string') {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    let parserName: string = elementType;
    if (content instanceof CairoType) {
      if ('dynamicSelector' in content) {
        // dynamic recursive CairoType
        parserName = (content as any).dynamicSelector;
      }
    }
    const strategyDecomposeNum = strategies.findIndex(
      (strategy: ParsingStrategy) => strategy.response[parserName]
    );
    const responseParser = strategies[strategyDecomposeNum].response[parserName];
    if (responseParser) {
      const resultObject: CairoEnumRaw = elementNames.reduce(
        (current: CairoEnumRaw, name: string, index: number) => {
          if (index === this.enumVariant) {
            return { ...current, [name]: responseParser(content as CairoType, strategies) };
          }
          return { ...current, [name]: undefined };
        },
        {}
      );
      return new CairoCustomEnum(resultObject);
    }
    // No response parser found - throw error instead of fallback magic
    throw new Error(
      `No response parser found for element type: ${elementType} in parsing strategy`
    );
  }
}

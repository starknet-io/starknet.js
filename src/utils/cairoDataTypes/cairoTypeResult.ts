import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { type ParsingStrategy, type VariantType } from '../calldata/parser/parsingStrategy.type';
import { CairoType } from './cairoType.interface';
import { isTypeResult } from '../calldata/cairo';
import { isUndefined } from '../typed';
import { CairoResultVariant, CairoResult } from '../calldata/enum';
import { CairoTuple } from './tuple';
import type { AllowArray } from '../../types';

/**
 * Represents a Cairo Result enum.
 *
 * Key Features:
 * - Internal usage class (users are using "CairoResult" class).
 * - Unified constructor handling user input, API responses, and CairoType instances
 * - Automatic type validation and conversion using parsing strategies
 * - Bi-directional serialization (to/from Starknet API format)
 * - Support for nested types
 * - Direct CallData.compile() integration
 * - Comprehensive type checking and validation
 */
export class CairoTypeResult extends CairoType {
  static dynamicSelector = 'CairoTypeResult' as const;

  public readonly dynamicSelector = CairoTypeResult.dynamicSelector;

  /* CairoType instance representing the content of a Cairo result. */
  public readonly content: CairoType;

  /* Cairo type of the result enum. */
  public readonly resultCairoType: string;

  /* True if the current variant is 'Ok', false if 'Err'. */
  public readonly isVariantOk: boolean;

  /**
   * CairoTypeResult provides a complete implementation for handling Cairo's result,
   * which have the form "core::result::Result::<type1, type2>" (e.g., "core::result::Result::<core::integer::u8, core::integer::u16>").
   * Internal usage class (users are using "CairoResult" class).
   * It supports nested types, type validation, encoding, and parsing from various sources.
   * @param {unknown} content - Input data (array, object, BigNumberish,
   * Iterator<string>, CairoOption, CairoResult, CairoCustomEnum, or CairoType instance).
   * @param {string} resultCairoType - Cairo result type string (e.g., "core::result::Result::<core::integer::u8, core::integer::u8>").
   * @param {AllowArray<ParsingStrategy>} parsingStrategy - Parsing strategy for element type handling (e.g. hdParsingStrategy).
   * @param {CairoResultVariant | number} [variant] - (optional) variant of the result: CairoResultVariant.Ok (0), or CairoResultVariant.Err (1). If "content" is an iterator, this parameter must be omitted.
   * @param {boolean} [subType=false] - optional default=false. Use "true" if called in nested CairoResult instances.
   * @example
   * ```typescript
   * import { CairoTypeResult, hdParsingStrategy, CairoResultVariant } from 'starknet';
   * // Simple Result with Ok variant
   * const myResult1 = new CairoTypeResult(7, "core::result::Result::<core::integer::u8, core::integer::u8>", hdParsingStrategy, CairoResultVariant.Ok);
   * console.log(myResult1.toApiRequest()); // ['0x01','0x7b']
   * console.log(myResult1.decompose(hdParsingStrategy)); // CairoResult instance with content 7n and Ok variant.
   * // Simple Result with Err variant
   * const myResult2 = new CairoTypeResult(11, "core::result::Result::<core::integer::u8, core::integer::u8>", hdParsingStrategy, CairoResultVariant.Err);
   *
   * // Nested Cairo types
   * const myTuple0 = new CairoTuple([234, [1, 2, 3]], "(core::integer::u8, core::array::Array::<core::integer::u8>)", hdParsingStrategy);
   * const myResult3 = new CairoTypeResult(myTuple0, "core::result::Result::<(core::integer::u8, core::array::Array::<core::integer::u8>), core::integer::u16>", hdParsingStrategy, CairoResultVariant.Ok);
   * console.log(CallData.compile([myResult3])); // [ "0", "234", "3", "1", "2", "3" ]
   *
   * // From API response
   * const apiData = ['0x0', '0x20'][Symbol.iterator]();
   * const fromApiResult = new CairoTypeResult(apiData, "core::result::Result::<core::integer::u8, core::integer::u8>", hdParsingStrategy); // CairoResult instance with content 32n and Ok variant.
   * ```
   */
  constructor(
    content: unknown,
    resultCairoType: string,
    parsingStrategy: AllowArray<ParsingStrategy>,
    variant?: CairoResultVariant | number,
    subType: boolean = false
  ) {
    super();
    this.resultCairoType = resultCairoType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    assert(!isUndefined(content), '"content" parameter has to be defined.');
    assert(content !== null, '"content" parameter has to be defined.');
    if (typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      assert(
        isUndefined(variant),
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
      const variantFromIterator = Number(getNext(content as Iterator<string>));
      const activeVariantType =
        CairoTypeResult.getVariantTypes(resultCairoType)[variantFromIterator];
      const parsedContent: CairoType = CairoTypeResult.parser(
        content as Iterator<string>,
        activeVariantType,
        strategies
      );
      this.content = parsedContent;
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
    if (content && typeof content === 'object' && content !== null && 'toApiRequest' in content) {
      // "content" is a CairoType
      assert(
        !isUndefined(variant),
        '"variant" parameter is mandatory when creating a new Cairo Result from a CairoType.'
      );
      this.content = content as CairoType;
      this.isVariantOk = variant === CairoResultVariant.Ok;
      return;
    }
    if (content instanceof CairoResult) {
      // "content" is a CairoResult
      if (!subType) {
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
    }

    // not an iterator, not an CairoType -> so is low level data (BigNumberish, array, object, Cairo Enum)
    assert(
      !isUndefined(variant),
      '"variant" parameter is mandatory when creating a new Cairo Result from a Cairo Enum or raw data.'
    );
    this.isVariantOk = variant === CairoResultVariant.Ok;
    const elementType = CairoTypeResult.getVariantTypes(resultCairoType)[variant];
    const strategyConstructorNum = strategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[elementType]
    );
    if (strategyConstructorNum >= 0) {
      const constructor = strategies[strategyConstructorNum].constructors[elementType];
      this.content = constructor(content, strategies, elementType);
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
      this.content = dynamicConstructor(content, strategies, elementType);
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
   * @param {string} elementType - The Cairo result type (e.g., "core::result::Result::<core::integer::u8, core::integer::u8>")
   * @param {ParsingStrategy[]} parsingStrategies - The parsing strategy containing constructors and selectors
   * @returns {CairoType} CairoType instance
   * @private
   */
  private static parser(
    responseIterator: Iterator<string>,
    elementType: string,
    parsingStrategies: ParsingStrategy[]
  ): CairoType {
    const strategyConstructorNum = parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[elementType]
    );
    if (strategyConstructorNum >= 0) {
      const constructor = parsingStrategies[strategyConstructorNum].constructors[elementType];
      return constructor(responseIterator, parsingStrategies, elementType);
    }
    const strategyDynamicNum = parsingStrategies.findIndex((strategy: ParsingStrategy) => {
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      return dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));
    });
    if (strategyDynamicNum >= 0) {
      const dynamicSelectors = Object.entries(
        parsingStrategies[strategyDynamicNum].dynamicSelectors
      );
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));
      const [selectorName] = matchingSelector as [string, (type: string) => boolean];
      const dynamicConstructor = parsingStrategies[strategyDynamicNum].constructors[selectorName];
      if (dynamicConstructor) {
        return dynamicConstructor(responseIterator, parsingStrategies, elementType);
      }
    }
    // Unknown type - collect raw values, defer error
    const rawValues = getNext(responseIterator);
    return rawValues as unknown as CairoType;
  }

  /**
   * Retrieve the Cairo content type from a Cairo Result type.
   * @param {string} type - The Cairo Result type string.
   * @returns {string[]} The Cairo types of the possible contents of the Cairo Result.
   * @example
   * ```typescript
   * const result = CairoTypeResult.getVariantSomeType("core::result::Result::<core::integer::u8, core::integer::u16>");
   * // result = [" core::integer::u8", "core::integer::u16"]
   * ```
   */
  static getVariantTypes(type: string): string[] {
    const matchArray = type.match(/(?<=<).+(?=>)/);
    if (matchArray === null)
      throw new Error(`ABI type ${type} do not includes 2 types enclosed in <>.`);
    const subTypes = CairoTuple.extractCairo1Tuple(`(${matchArray[0]})`) as string[];
    assert(
      subTypes.length === 2,
      `ABI type ${type} is not including 2 sub types. Found ${subTypes.length}.`
    );
    return subTypes;
  }

  /**
   * Validate input data for CairoTypeResult creation.
   * @param {unknown} _input - Input data to validate
   * @param {string} type - The Cairo Result type string (e.g., "core::result::Result::<core::integer::u8, core::integer::u8>")
   * @throws Error if input is invalid
   * @example
   * ```typescript
   * CairoTypeResult.validate(200, "core::result::Result::<core::integer::u8, core::integer::u16>", CairoResultVariant.Err); // passes
   * CairoTypeResult.validate(200, "wrong", 3); // throws
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
   * Check if input data is valid for CairoTypeResult creation.
   * @param {unknown} input - Input data to check
   * @param {string} type - The Cairo Result type (e.g., "core::result::Result::<core::integer::u8, core::integer::u16>")
   * @param {VariantType} variant - The variant of the Result: CairoResultVariant.Ok (0), or CairoResultVariant.Err (1)
   * @returns {boolean} true if valid, false otherwise
   * @example
   * ```typescript
   * const isValid1 = CairoTypeResult.is(200, "core::result::Result::<core::integer::u8, core::integer::u16>", CairoResultVariant.Ok"); // true
   * const isValid2 = CairoTypeResult.is(200, "wrong", 3); // false
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
   * Checks if the given string represents a valid Cairo Result type format.
   *
   * A valid Cairo Result type must follow the pattern: "core::result::Result::<type1, type2>"
   * where type is any valid Cairo type.
   * @param {string} type - The type string to validate
   * @returns {boolean} `true` if the type is a valid Cairo Result format, `false` otherwise
   * @example
   * ```typescript
   * CairoTypeResult.isAbiType("core::result::Result::<core::integer::u8, core::integer::u16>");     // true
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeResult(type);
  }

  /**
   * Serialize the Cairo Result into hex strings for Starknet API requests.
   *
   * Converts all CairoType elements in this Cairo Result into their hex string representation
   * by calling toApiRequest(). This is used when
   * sending data to the Starknet network.
   *
   * @returns {string[]} Array of hex strings ready for API requests
   * @example
   * ```typescript
   * const myResult = new CairoTypeResult(8, "core::result::Result::<core::integer::u8, core::integer::u16>", strategy, CairoResultVariant.Err);
   * const result = myResult.toApiRequest(); // ['0x1', '0x8']
   * ```
   */
  public toApiRequest(): string[] {
    const result = [this.isVariantOk ? '0x00' : '0x01'];
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
   * @returns {CairoResult<any, any>} a CairoResultInstance, with parsed variant (BigInt, numbers, nested arrays, etc.)
   * @example
   * ```typescript
   * const myResult = new CairoTypedResult(3, "core::result::Result::<core::integer::u8, core::integer::u16>", hdParsingStrategy, CairoResultVariant.Some);
   * const parsed = myResult.decompose(hdParsingStrategy); // CairoResult{ Some: 3n }
   * ```
   */
  public decompose(strategyDecompose: AllowArray<ParsingStrategy>): CairoResult<any, any> {
    const { content } = this;
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    // For raw string values (unsupported types), throw error
    const elementType = CairoTypeResult.getVariantTypes(this.resultCairoType)[
      this.isVariantOk ? CairoResultVariant.Ok : CairoResultVariant.Err
    ];
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
      return new CairoResult<any, any>(
        this.isVariantOk ? CairoResultVariant.Ok : CairoResultVariant.Err,
        responseParser(content as CairoType, strategies)
      );
    }
    // No response parser found - throw error instead of fallback magic
    throw new Error(
      `No response parser found for element type: ${elementType} in parsing strategy`
    );
  }
}

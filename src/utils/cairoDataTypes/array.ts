import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext, toHex } from '../num';
import { felt, getArrayType, isTypeArray } from '../calldata/cairo';
import { type ParsingStrategy } from '../calldata/parser/parsingStrategy.type';
import { CairoType } from './cairoType.interface';
import { CairoTypeOption } from './cairoTypeOption';
import { CairoOption, CairoResult } from '../calldata/enum';
import { CairoTypeResult } from './cairoTypeResult';
import type { AllowArray } from '../../types';

/**
 * Represents a Cairo dynamic array with runtime-determined length.
 *
 * CairoArray provides a complete implementation for handling Cairo's dynamic arrays,
 * which have the form `core::array::Array::<T>` or `core::array::Span::<T>`
 * (e.g., `core::array::Array::<core::integer::u8>`).
 * It supports nested arrays, type validation, serialization with length prefixes,
 * and parsing from various sources.
 *
 * Key Features:
 * - Unified constructor handling user input, API responses, and CairoType instances
 * - Automatic type validation and conversion using parsing strategies
 * - Bi-directional serialization (to/from Starknet API format with length prefix)
 * - Support for deeply nested dynamic arrays
 * - Direct CallData.compile() integration
 * - Comprehensive type checking and validation
 *
 * @example
 * ```typescript
 * import { CairoArray, hdParsingStrategy } from './path/to/module';
 *
 * // Simple dynamic array
 * const simple = new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', hdParsingStrategy);
 * console.log(simple.toApiRequest()); // ['0x3', '0x1', '0x2', '0x3'] (length first)
 * console.log(simple.decompose(hdParsingStrategy)); // [1n, 2n, 3n]
 *
 * // Nested dynamic arrays
 * const nested = new CairoArray([[1, 2], [3, 4]], 'core::array::Array::<core::array::Array::<core::integer::u8>>', hdParsingStrategy);
 * console.log(CallData.compile([nested])); // Works directly with CallData.compile()
 *
 * // From API response (with length prefix)
 * const apiData = ['0x2', '0x1', '0x2'][Symbol.iterator](); // length=2, elements=[1,2]
 * const fromApi = new CairoArray(apiData, 'core::array::Array::<core::integer::u8>', hdParsingStrategy);
 * ```
 */
export class CairoArray extends CairoType {
  static dynamicSelector = 'CairoArray' as const;

  public readonly dynamicSelector = CairoArray.dynamicSelector;

  /**
   * Array of CairoType instances representing a Cairo dynamic array.
   */
  public readonly content: CairoType[];

  /**
   * Cairo dynamic array type.
   */
  public readonly arrayType: string;

  /**
   * Create a CairoArray instance from various input types.
   *
   * This constructor provides a unified interface for creating dynamic arrays from:
   * - User input: Arrays [1, 2, 3] or objects {0: 1, 1: 2, 2: 3}
   * - API responses: Iterator<string> from Starknet API calls (with length prefix)
   * - Already constructed CairoType instances (for nesting)
   *
   * The constructor automatically detects input type and processes it appropriately,
   * converting all elements to proper CairoType instances based on the array type.
   *
   * @param {unknown} content - Input data (array, object, Iterator<string>, or CairoType instances)
   * @param {string} arrayType - Dynamic array type string (e.g., "core::array::Array::<core::integer::u8>")
   * @param {AllowArray<ParsingStrategy>} parsingStrategy - Parsing strategy for element type handling
   * @example
   * ```typescript
   * // From user array
   * const arr1 = new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', hdParsingStrategy);
   *
   * // From user object
   * const arr2 = new CairoArray({0: 1, 1: 2, 2: 3}, 'core::array::Array::<core::integer::u8>', hdParsingStrategy);
   *
   * // From API response iterator (with length prefix)
   * const iterator = ['0x2', '0x1', '0x2'][Symbol.iterator](); // length=2, elements=[1,2]
   * const arr3 = new CairoArray(iterator, 'core::array::Array::<core::integer::u8>', hdParsingStrategy);
   *
   * // Nested arrays
   * const nested = new CairoArray([[1, 2], [3, 4]], 'core::array::Array::<core::array::Array::<core::integer::u8>>', hdParsingStrategy);
   * ```
   */
  constructor(content: unknown, arrayType: string, parsingStrategy: AllowArray<ParsingStrategy>) {
    super();
    this.arrayType = arrayType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      const parsedContent: CairoType[] = CairoArray.parser(
        content as Iterator<string>,
        arrayType,
        strategies
      );
      this.content = parsedContent;
      return;
    }
    if (content instanceof CairoArray) {
      this.content = content.content;
      this.arrayType = content.arrayType;
      return;
    }
    CairoArray.validate(content, arrayType);
    const arrayContentType = CairoArray.getArrayElementType(arrayType);
    const resultContent: any[] = CairoArray.extractValuesArray(content).map((contentItem: any) => {
      if (
        contentItem &&
        typeof contentItem === 'object' &&
        contentItem !== null &&
        'toApiRequest' in contentItem
      ) {
        // "content" is a CairoType
        return contentItem as CairoType;
      }
      if (contentItem instanceof CairoOption) {
        // "content" is a CairoOption
        return new CairoTypeOption(contentItem, arrayContentType, strategies);
      }
      if (contentItem instanceof CairoResult) {
        // "content" is a CairoResult
        return new CairoTypeResult(contentItem, arrayContentType, strategies);
      }
      // not an iterator, not an CairoType, neither a CairoType -> so is low level data (BigNumberish, array, object)

      const strategyConstructorNum = strategies.findIndex(
        (strategy: ParsingStrategy) => strategy.constructors[arrayContentType]
      );
      if (strategyConstructorNum >= 0) {
        const constructor = strategies[strategyConstructorNum].constructors[arrayContentType];
        return constructor(contentItem, strategies, arrayContentType);
      }
      const strategyDynamicNum = strategies.findIndex((strategy: ParsingStrategy) => {
        const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
        return dynamicSelectors.find(([, selectorFn]) => selectorFn(arrayContentType));
      });
      if (strategyDynamicNum >= 0) {
        const dynamicSelectors = Object.entries(strategies[strategyDynamicNum].dynamicSelectors);
        const matchingSelector = dynamicSelectors.find(([, selectorFn]) =>
          selectorFn(arrayContentType)
        );
        const [selectorName] = matchingSelector as [string, (type: string) => boolean];
        const dynamicConstructor = strategies[strategyDynamicNum].constructors[selectorName];
        if (dynamicConstructor) {
          return dynamicConstructor(contentItem, strategies, arrayContentType);
        }
      }
      throw new Error(`"${arrayContentType}" is not a valid Cairo type`);
    });
    this.content = resultContent;
  }

  /**
   * Parse data from iterator into CairoType instances using the provided parsing strategy.
   *
   * This is the core parsing logic that consumes data sequentially from an iterator and
   * converts it into proper CairoType instances. It handles:
   * - Length prefix consumption for API responses
   * - Direct constructors (primitive types like u8, u256, etc.)
   * - Dynamic selectors (complex types like nested dynamic arrays)
   * - Unknown types (stored as raw strings for later error handling)
   *
   * @param {Iterator<string>} responseIterator - Iterator over string data to parse
   * @param {string} arrayType - The dynamic array type (e.g., "core::array::Array::<core::integer::u32>")
   * @param {ParsingStrategy[]} strategy - The parsing strategy containing constructors and selectors
   * @returns Array of parsed CairoType instances
   * @private
   */
  private static parser(
    responseIterator: Iterator<string>,
    arrayType: string,
    parsingStrategies: ParsingStrategy[]
  ): CairoType[] {
    const elementType = getArrayType(arrayType); // Extract T from core::array::Array::<T>

    // For API responses, first element is the array length
    const lengthStr = getNext(responseIterator);
    const arrayLength = parseInt(lengthStr, 16);
    // First check direct constructors
    const strategyConstructorNum = parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[elementType]
    );
    if (strategyConstructorNum >= 0) {
      const constructor = parsingStrategies[strategyConstructorNum].constructors[elementType];
      return Array.from({ length: arrayLength }, () =>
        constructor(responseIterator, parsingStrategies, elementType)
      );
    }

    // Check dynamic selectors (includes CairoFixedArray, future: tuples, structs, etc.)
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
        return Array.from({ length: arrayLength }, () =>
          dynamicConstructor(responseIterator, parsingStrategies, elementType)
        );
      }
    }
    // Unknown type - collect raw values, defer error
    const rawValues = Array.from({ length: arrayLength }, () => getNext(responseIterator));
    return rawValues as unknown as CairoType[];
  }

  /**
   * Extract values array from either array or object input.
   *
   * Normalizes the two supported input formats (arrays and objects) into a consistent
   * array format for further processing. Objects are converted using Object.values()
   * which maintains the insertion order of properties.
   *
   * @param input - Input data (array or object)
   * @returns Array of values extracted from the input
   * @private
   * @example
   * extractValuesArray([1, 2, 3]) → [1, 2, 3]
   * extractValuesArray({0: 1, 1: 2, 2: 3}) → [1, 2, 3]
   */
  private static extractValuesArray(input: unknown): any[] {
    if (Array.isArray(input)) {
      return input;
    }
    return Object.values(input as object);
  }

  /**
   * Retrieves the array element type from the given dynamic array type string.
   * @param {string} type - The Cairo dynamic array type.
   * @returns {string} The element type.
   * @example
   * ```typescript
   * const result = CairoArray.getArrayElementType("core::array::Array::<core::integer::u32>");
   * // result = "core::integer::u32"
   * ```
   */
  static getArrayElementType = (type: string): string => {
    return getArrayType(type);
  };

  /**
   * Validate input data for CairoArray creation.
   * @param input - Input data to validate
   * @param type - The dynamic array type (e.g., "core::array::Array::<core::integer::u8>")
   * @throws Error if input is invalid
   * @example
   * ```typescript
   * CairoArray.validate([1, 2, 3], "core::array::Array::<core::integer::u8>"); // passes
   * CairoArray.validate("invalid", "core::array::Array::<core::integer::u8>"); // throws
   * ```
   */
  static validate(input: unknown, type: string): void {
    // Validate the type format first
    assert(
      CairoArray.isAbiType(type),
      `The type ${type} is not a Cairo dynamic array. Needs core::array::Array::<T> or core::array::Span::<T>.`
    );

    // Validate that input is array or object
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
  }

  /**
   * Check if input data is valid for CairoArray creation.
   * @param input - Input data to check
   * @param type - The dynamic array type (e.g., "core::array::Array::<core::integer::u8>")
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * const isValid1 = CairoArray.is([1, 2, 3], "core::array::Array::<core::integer::u8>"); // true
   * const isValid2 = CairoArray.is("invalid", "core::array::Array::<core::integer::u8>"); // false
   * ```
   */
  static is(input: unknown, type: string): boolean {
    try {
      CairoArray.validate(input, type);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the given string represents a valid Cairo dynamic array type format.
   *
   * A valid dynamic array type must follow the pattern: `core::array::Array::<T>` or `core::array::Span::<T>`
   * where T is any valid Cairo type.
   *
   * @param type - The type string to validate
   * @returns `true` if the type is a valid dynamic array format, `false` otherwise
   * @example
   * ```typescript
   * CairoArray.isAbiType("core::array::Array::<core::integer::u32>");     // true
   * CairoArray.isAbiType("core::array::Span::<core::integer::u8>");       // true
   * CairoArray.isAbiType("core::array::Array::<core::array::Array::<core::integer::u8>>"); // true (nested)
   * CairoArray.isAbiType("core::integer::u32");                           // false (not an array)
   * CairoArray.isAbiType("[core::integer::u32; 8]");                      // false (fixed array, not dynamic)
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeArray(type);
  }

  /**
   * Serialize the Cairo dynamic array into hex strings for Starknet API requests.
   *
   * Converts the array into a length-prefixed format: [length, element1, element2, ...]
   * by calling toApiRequest() on each element and flattening the results. This follows
   * the Cairo ABI standard for dynamic arrays.
   *
   * @returns Array of hex strings ready for API requests (length-prefixed)
   * @example
   * ```typescript
   * const dynArray = new CairoArray([1, 2, 3], "core::array::Array::<core::integer::u8>", strategy);
   * const result = dynArray.toApiRequest(); // ['0x3', '0x1', '0x2', '0x3']
   *
   * // Nested arrays include nested length prefixes
   * const nested = new CairoArray([[1, 2], [3]], "core::array::Array::<core::array::Array::<core::integer::u8>>", strategy);
   * const flatResult = nested.toApiRequest(); // ['0x2', '0x2', '0x1', '0x2', '0x1', '0x3']
   * //                                           ^^^^  ^^^^  --------- ^^^^  --------
   * //                                           outer inner  [1,2]     inner   [3]
   * //                                           length length        length
   * ```
   */
  public toApiRequest(): string[] {
    // Start with array length
    const result = [toHex(felt(this.content.length))];

    // Then add all elements (flattened)
    result.push(...this.content.flatMap((element) => element.toApiRequest()));

    return addCompiledFlag(result);
  }

  /**
   * Decompose the dynamic array into final parsed values.
   *
   * Transforms CairoType instances into their final parsed values using the strategy's
   * response parsers (e.g., CairoUint8 → BigInt). This method is used primarily for
   * parsing API responses into user-friendly formats.
   *
   * @param strategyDecompose - Parsing strategy for response parsing
   * @returns Array of parsed values (BigInt, numbers, nested arrays, etc.)
   * @example
   * ```typescript
   * const dynArray = new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', hdParsingStrategy);
   * const parsed = dynArray.decompose(hdParsingStrategy); // [1n, 2n, 3n]
   * ```
   */
  public decompose(strategyDecompose: AllowArray<ParsingStrategy>): any[] {
    // Use response parsers to get final parsed values (for API response parsing)
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = getArrayType(this.arrayType);
    return this.content.map((element) => {
      // For raw string values (unsupported types), throw error
      if (typeof element === 'string') {
        throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
      }
      let parserName: string = elementType;
      if (element instanceof CairoType) {
        if (Object.hasOwn(element, 'dynamicSelector')) {
          // dynamic recursive CairoType
          parserName = (element as any).dynamicSelector;
        }
      }
      const strategyDecomposeNum = strategies.findIndex(
        (strategy: ParsingStrategy) => strategy.response[parserName]
      );
      const responseParser = strategies[strategyDecomposeNum].response[parserName];
      if (responseParser) {
        return responseParser(element, strategies);
      }

      // No response parser found - throw error instead of fallback magic
      throw new Error(
        `No response parser found for element type: ${elementType} in parsing strategy`
      );
    });
  }
}

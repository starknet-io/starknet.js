import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { type ParsingStrategy } from '../calldata/parser/parsingStrategy';
import { CairoType } from './cairoType.interface';
import { CairoOption } from '../calldata/enum';
import { CairoTypeOption } from './cairoTypeOption';

/**
 * Represents a Cairo fixed-size array with compile-time known length.
 *
 * CairoFixedArray provides a complete implementation for handling Cairo's fixed arrays,
 * which have the form `[element_type; size]` (e.g., `[core::integer::u8; 3]`).
 * It supports nested arrays, type validation, serialization, and parsing from various sources.
 *
 * Key Features:
 * - Unified constructor handling user input, API responses, and CairoType instances
 * - Automatic type validation and conversion using parsing strategies
 * - Bi-directional serialization (to/from Starknet API format)
 * - Support for deeply nested fixed arrays
 * - Direct CallData.compile() integration
 * - Comprehensive type checking and validation
 *
 * @example
 * ```typescript
 * import { CairoFixedArray, hdParsingStrategy } from './path/to/module';
 *
 * // Simple fixed array
 * const simple = new CairoFixedArray([1, 2, 3], '[core::integer::u8; 3]', hdParsingStrategy);
 * console.log(simple.toApiRequest()); // ['0x1', '0x2', '0x3']
 * console.log(simple.decompose(hdParsingStrategy)); // [1n, 2n, 3n]
 *
 * // Nested fixed arrays
 * const nested = new CairoFixedArray([[1, 2], [3, 4]], '[[core::integer::u8; 2]; 2]', hdParsingStrategy);
 * console.log(CallData.compile([nested])); // Works directly with CallData.compile()
 *
 * // From API response
 * const apiData = ['0x1', '0x2', '0x3'][Symbol.iterator]();
 * const fromApi = new CairoFixedArray(apiData, '[core::integer::u8; 3]', hdParsingStrategy);
 * ```
 */
export class CairoFixedArray extends CairoType {
  static dynamicSelector = 'CairoFixedArray' as const;

  public readonly dynamicSelector = CairoFixedArray.dynamicSelector;

  /**
   * Array of CairoType instances representing a Cairo fixed array.
   */
  public readonly content: CairoType[];

  /**
   * Cairo fixed array type.
   */
  public readonly arrayType: string;

  /**
   * Create a CairoFixedArray instance from various input types.
   *
   * This constructor provides a unified interface for creating fixed arrays from:
   * - User input: Arrays [1, 2, 3] or objects {0: 1, 1: 2, 2: 3}
   * - API responses: Iterator<string> from Starknet API calls
   * - Already constructed CairoType instances (for nesting)
   *
   * The constructor automatically detects input type and processes it appropriately,
   * converting all elements to proper CairoType instances based on the array type.
   *
   * @param content - Input data (array, object, Iterator<string>, or CairoType instances)
   * @param arrayType - Fixed array type string (e.g., "[core::integer::u8; 3]")
   * @param strategy - Parsing strategy for element type handling
   * @example
   * ```typescript
   * // From user array
   * const arr1 = new CairoFixedArray([1, 2, 3], '[core::integer::u8; 3]', hdParsingStrategy);
   *
   * // From user object
   * const arr2 = new CairoFixedArray({0: 1, 1: 2, 2: 3}, '[core::integer::u8; 3]', hdParsingStrategy);
   *
   * // From API response iterator
   * const iterator = ['0x1', '0x2', '0x3'][Symbol.iterator]();
   * const arr3 = new CairoFixedArray(iterator, '[core::integer::u8; 3]', hdParsingStrategy);
   *
   * // Nested arrays
   * const nested = new CairoFixedArray([[1, 2], [3, 4]], '[[core::integer::u8; 2]; 2]', hdParsingStrategy);
   * ```
   */
  constructor(content: unknown, arrayType: string, strategy: ParsingStrategy) {
    super();

    // // If content is already a CairoFixedArray instance, just copy its properties
    // if (content instanceof CairoFixedArray) {
    //   this.content = content.content;
    //   this.arrayType = content.arrayType;
    //   return;
    // }

    // // Always use parser for unified processing
    // const iterator = CairoFixedArray.prepareIterator(content, arrayType);
    // const parsedContent = CairoFixedArray.parser(iterator, arrayType, strategy);

    // this.content = parsedContent;

    this.arrayType = arrayType;
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      const parsedContent: CairoType[] = CairoFixedArray.parser(
        content as Iterator<string>,
        arrayType,
        strategy
      );
      this.content = parsedContent;
      return;
    }
    if (content instanceof CairoFixedArray) {
      this.content = content.content;
      return;
    }
    CairoFixedArray.validate(content, arrayType);
    const arrayContentType = CairoFixedArray.getFixedArrayType(arrayType);
    const resultContent: any[] = CairoFixedArray.extractValuesArray(content).map(
      (contentItem: any) => {
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
          return new CairoTypeOption(contentItem, arrayContentType, strategy);
        }
        // not an iterator, not an CairoType, neither a CairoType -> so is low level data (BigNumberish, array, object)

        const constructor = strategy.constructors[arrayContentType];
        if (constructor) {
          return constructor(contentItem, arrayContentType);
        }
        const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
        const matchingSelector = dynamicSelectors.find(([, selectorFn]) =>
          selectorFn(arrayContentType)
        );
        if (matchingSelector) {
          const [selectorName] = matchingSelector;
          const dynamicConstructor = strategy.constructors[selectorName];
          if (dynamicConstructor) {
            return dynamicConstructor(contentItem, arrayContentType);
          }
        }
        throw new Error(`"${arrayContentType}" is not a valid Cairo type`);
      }
    );
    assert(
      resultContent.length === CairoFixedArray.getFixedArraySize(arrayType),
      `ABI type ${arrayType}: expected ${CairoFixedArray.getFixedArraySize(arrayType)} items, got ${resultContent.length} items.`
    );
    this.content = resultContent;
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
   * @param responseIterator - Iterator over string data to parse
   * @param arrayType - The fixed array type (e.g., "[core::integer::u32; 4]")
   * @param strategy - The parsing strategy containing constructors and selectors
   * @returns Array of parsed CairoType instances
   * @private
   */
  private static parser(
    responseIterator: Iterator<string>,
    arrayType: string,
    strategy: ParsingStrategy
  ): CairoType[] {
    const elementType = CairoFixedArray.getFixedArrayType(arrayType);
    const outerSize = CairoFixedArray.getFixedArraySize(arrayType);

    // First check direct constructors
    const constructor = strategy.constructors[elementType];

    if (constructor) {
      return Array.from({ length: outerSize }, () => constructor(responseIterator, elementType));
    }

    // Check dynamic selectors (includes CairoFixedArray, future: tuples, structs, etc.)
    const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
    const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));

    if (matchingSelector) {
      const [selectorName] = matchingSelector;
      const dynamicConstructor = strategy.constructors[selectorName];
      if (dynamicConstructor) {
        return Array.from({ length: outerSize }, () =>
          dynamicConstructor(responseIterator, elementType)
        );
      }
    }

    // Unknown type - collect raw values, defer error
    const rawValues = Array.from({ length: outerSize }, () => getNext(responseIterator));
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
   * Retrieves the array size from the given type string representing a Cairo fixed array.
   * @param {string} type - The Cairo fixed array type.
   * @returns {number} The array size.
   * @example
   * ```typescript
   * const result = CairoFixedArray.getFixedArraySize("[core::integer::u32; 8]");
   * // result = 8
   * ```
   */
  static getFixedArraySize(type: string) {
    // Match the LAST occurrence of "; number]" to get the outermost array size
    const matchArray = type.match(/(?<=; )\d+(?=\]$)/);
    if (matchArray === null)
      throw new Error(`ABI type ${type} do not includes a valid number after ';' character.`);
    return Number(matchArray[0]);
  }

  /**
   * Retrieve the Cairo content type from a Cairo fixed array type.
   * @param {string} type - The type string.
   * @returns {string} The fixed-array type.
   * @example
   * ```typescript
   * const result = CairoFixedArray.getFixedArrayType("[core::integer::u32; 8]");
   * // result = "core::integer::u32"
   * ```
   */
  static getFixedArrayType = (type: string) => {
    const matchArray = type.match(/(?<=\[).+(?=;)/);
    if (matchArray === null)
      throw new Error(`ABI type ${type} do not includes a valid type of data.`);
    return matchArray[0];
  };

  /**
   * Validate input data for CairoFixedArray creation.
   * @param input - Input data to validate
   * @param type - The fixed array type (e.g., "[core::integer::u8; 3]")
   * @throws Error if input is invalid
   * @example
   * ```typescript
   * CairoFixedArray.validate([1, 2, 3], "[core::integer::u8; 3]"); // passes
   * CairoFixedArray.validate("invalid", "[core::integer::u8; 3]"); // throws
   * ```
   */
  static validate(input: unknown, type: string): void {
    // Validate the type format first
    assert(
      CairoFixedArray.isAbiType(type),
      `The type ${type} is not a Cairo fixed array. Needs [type; length].`
    );

    // Validate that input is array or object
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );

    const values = CairoFixedArray.extractValuesArray(input);
    const outerSize = CairoFixedArray.getFixedArraySize(type);

    // Validate array size matches type specification
    assert(
      values.length === outerSize,
      `ABI type ${type}: expected ${outerSize} items, got ${values.length} items`
    );
  }

  /**
   * Check if input data is valid for CairoFixedArray creation.
   * @param input - Input data to check
   * @param type - The fixed array type (e.g., "[core::integer::u8; 3]")
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * const isValid1 = CairoFixedArray.is([1, 2, 3], "[core::integer::u8; 3]"); // true
   * const isValid2 = CairoFixedArray.is("invalid", "[core::integer::u8; 3]"); // false
   * ```
   */
  static is(input: unknown, type: string): boolean {
    try {
      CairoFixedArray.validate(input, type);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the given string represents a valid Cairo fixed array type format.
   *
   * A valid fixed array type must follow the pattern: `[element_type; size]`
   * where element_type is any valid Cairo type and size is a positive integer.
   * The method validates both the bracket structure and spacing requirements.
   *
   * @param type - The type string to validate
   * @returns `true` if the type is a valid fixed array format, `false` otherwise
   * @example
   * ```typescript
   * CairoFixedArray.isAbiType("[core::integer::u32; 8]");     // true
   * CairoFixedArray.isAbiType("[[core::integer::u8; 2]; 3]"); // true (nested)
   * CairoFixedArray.isAbiType("[core::integer::u32;8]");      // false (no space)
   * CairoFixedArray.isAbiType("core::integer::u32; 8");       // false (no brackets)
   * CairoFixedArray.isAbiType("[; 8]");                       // false (empty element type)
   * ```
   */
  static isAbiType(type: string) {
    return /^\[.+; \d+\]$/.test(type) && !/\s+;/.test(type);
  }

  /**
   * Serialize the Cairo fixed array into hex strings for Starknet API requests.
   *
   * Converts all CairoType elements in this fixed array into their hex string representation
   * by calling toApiRequest() on each element and flattening the results. This is used when
   * sending data to the Starknet network.
   *
   * @returns Array of hex strings ready for API requests
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([1, 2, 3], "[core::integer::u8; 3]", strategy);
   * const result = fArray.toApiRequest(); // ['0x1', '0x2', '0x3']
   *
   * // Nested arrays are flattened
   * const nested = new CairoFixedArray([[1, 2], [3, 4]], "[[core::integer::u8; 2]; 2]", strategy);
   * const flatResult = nested.toApiRequest(); // ['0x1', '0x2', '0x3', '0x4']
   * ```
   */
  public toApiRequest(): string[] {
    // Simply call toApiRequest on each content element and flatten the results
    const result = this.content.flatMap((element) => element.toApiRequest());
    return addCompiledFlag(result);
  }

  /**
   * Decompose the fixed array into final parsed values.
   *
   * Transforms CairoType instances into their final parsed values using the strategy's
   * response parsers (e.g., CairoUint8 → BigInt). This method is used primarily for
   * parsing API responses into user-friendly formats.
   *
   * @param strategy - Parsing strategy for response parsing
   * @returns Array of parsed values (BigInt, numbers, nested arrays, etc.)
   * @example
   * ```typescript
   * const fixedArray = new CairoFixedArray([1, 2, 3], '[core::integer::u8; 3]', hdParsingStrategy);
   * const parsed = fixedArray.decompose(hdParsingStrategy); // [1n, 2n, 3n]
   * ```
   */
  public decompose(strategy: ParsingStrategy): any[] {
    // Use response parsers to get final parsed values (for API response parsing)
    const elementType = CairoFixedArray.getFixedArrayType(this.arrayType);
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
      const responseParser = strategy.response[parserName];
      if (responseParser) {
        return responseParser(element);
      }

      // No response parser found - throw error instead of fallback magic
      throw new Error(
        `No response parser found for element type: ${elementType} in parsing strategy`
      );
    });
  }
}

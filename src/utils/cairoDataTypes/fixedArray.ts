import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { type ParsingStrategy } from '../calldata/parser/parsingStrategy';
import { CairoType } from './cairoType.interface';

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
  public readonly content: any[];

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

    // If content is already a CairoFixedArray instance, just copy its properties
    if (content instanceof CairoFixedArray) {
      this.content = content.content;
      this.arrayType = content.arrayType;
      return;
    }

    // Always use parser for unified processing
    const iterator = CairoFixedArray.prepareIterator(content, arrayType);
    const parsedContent = CairoFixedArray.parser(iterator, arrayType, strategy);

    this.content = parsedContent;
    this.arrayType = arrayType;
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
   * Prepare a string iterator from any input type for unified processing.
   *
   * This method normalizes all possible input types into a consistent Iterator<string>
   * that can be consumed by the parser. It handles three main scenarios:
   * 1. Iterator<string> from API responses → pass through unchanged
   * 2. CairoType instances → serialize to API strings and create iterator
   * 3. User input (arrays/objects) → flatten to strings and create iterator
   *
   * @param content - Input data (Iterator, array, object, or CairoType instances)
   * @param arrayType - Fixed array type for validation and processing
   * @returns Iterator over string values ready for parsing
   * @private
   */
  private static prepareIterator(content: unknown, arrayType: string): Iterator<string> {
    // If already an iterator (API response), return as-is
    if (content && typeof content === 'object' && 'next' in content) {
      return content as Iterator<string>;
    }

    // For user input, validate and convert to string iterator
    CairoFixedArray.validate(content, arrayType);
    const values = CairoFixedArray.extractValuesArray(content);

    // If values are already CairoType instances, serialize them to strings
    if (
      values.length > 0 &&
      typeof values[0] === 'object' &&
      values[0] !== null &&
      'toApiRequest' in values[0]
    ) {
      // Convert CairoType instances to their API string representation
      const stringValues = values.flatMap((cairoType) => (cairoType as any).toApiRequest());
      return stringValues[Symbol.iterator]();
    }

    // Convert user input to flattened string array and return iterator
    const flatStringValues = CairoFixedArray.flattenUserInput(values, arrayType);
    return flatStringValues[Symbol.iterator]();
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
   * Flatten user input into a sequence of strings for parser consumption.
   *
   * Recursively processes user input to create a flat sequence of strings that matches
   * the format expected by API responses. For nested fixed arrays, it recursively
   * flattens all nested structures into a single sequential stream of values.
   *
   * @param values - Array of user input values to flatten
   * @param arrayType - Fixed array type to determine element processing
   * @returns Flattened array of strings ready for parser consumption
   * @private
   * @example
   * // Simple array: [1, 2, 3] → ['1', '2', '3']
   * // Nested array: [[1, 2], [3, 4]] → ['1', '2', '3', '4']
   */
  private static flattenUserInput(values: any[], arrayType: string): string[] {
    const elementType = CairoFixedArray.getFixedArrayType(arrayType);

    // If element type is itself a fixed array, we need to flatten recursively
    if (CairoFixedArray.isAbiType(elementType)) {
      return values.flatMap((value) => {
        if (
          Array.isArray(value) ||
          (typeof value === 'object' && value !== null && !('toApiRequest' in value))
        ) {
          // Recursively flatten nested arrays
          const nestedValues = CairoFixedArray.extractValuesArray(value);
          return CairoFixedArray.flattenUserInput(nestedValues, elementType);
        }
        // Single value, convert to string
        return String(value);
      });
    }

    // For primitive types, just convert all values to strings
    return values.map((value) => String(value));
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

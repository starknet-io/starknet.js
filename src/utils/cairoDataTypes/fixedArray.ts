import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { type ParsingStrategy } from '../calldata/parser/parsingStrategy';
import { CairoType } from './cairoType.interface';

export class CairoFixedArray extends CairoType {
  static abiSelector = 'CairoFixedArray' as const;

  static dynamicSelector = 'CairoFixedArray' as const;

  /**
   * JS array representing a Cairo fixed array.
   */
  public readonly content: any[]; // TODO: return to this after we implement other nested types. it shoud store them directy as CairroTypes

  /**
   * Cairo fixed array type.
   */
  public readonly arrayType: string;

  /**
   * Parsing strategy used for element serialization.
   */
  private readonly strategy: ParsingStrategy;

  /**
   * Create an instance representing a Cairo fixed Array.
   * @param {unknown} content JS array or object representing a Cairo fixed array.
   * @param {string} arrayType Cairo fixed array type.
   * @param {ParsingStrategy} strategy Parsing strategy for element serialization.
   */
  constructor(content: unknown, arrayType: string, strategy: ParsingStrategy) {
    super();
    CairoFixedArray.validate(content, arrayType);

    let values: any[];
    if (Array.isArray(content)) {
      values = content;
    } else {
      values = Object.values(content as object);
    }

    // Flatten nested arrays to consistent internal representation
    this.content = CairoFixedArray.flattenContent(values, arrayType);
    this.arrayType = arrayType;
    this.strategy = strategy;
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
    const matchArray = type.match(/(?<=; )\d+(?=\])/);
    if (matchArray === null)
      throw new Error(`ABI type ${type} do not includes a valid number after ';' character.`);
    return Number(matchArray[0]);
  }

  /**
   * Retrieves the Cairo fixed array size from the CairoFixedArray instance.
   * @returns {number} The fixed array size.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.getFixedArraySize();
   * // result = 3
   * ```
   */
  getFixedArraySize() {
    return CairoFixedArray.getFixedArraySize(this.arrayType);
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
   * Retrieve the Cairo content type of the Cairo fixed array.
   * @returns {string} The fixed-array content type.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.getFixedArrayType();
   * // result = "core::integer::u32"
   * ```
   */
  getFixedArrayType() {
    return CairoFixedArray.getFixedArrayType(this.arrayType);
  }

  /**
   * Create an object from a Cairo fixed array.
   * Be sure to have an array length conform to the ABI.
   * To be used with CallData.compile().
   * @param {Array<any>} input JS array representing a Cairo fixed array.
   * @returns {Object} a specific struct representing a fixed Array.
   * @example
   * ```typescript
   * const result = CairoFixedArray.compile([10,20,30]);
   * // result = { '0': 10, '1': 20, '2': 30 }
   * ```
   */
  static compile(input: Array<any>): Object {
    return input.reduce((acc: any, item: any, idx: number) => {
      acc[idx] = item;
      return acc;
    }, {});
  }

  /**
   * Generate an object from the Cairo fixed array instance.
   * To be used with CallData.compile().
   * @returns a specific struct representing a fixed array.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.compile();
   * // result = { '0': 10, '1': 20, '2': 30 }
   * ```
   */
  public compile(): Object {
    return CairoFixedArray.compile(this.content);
  }

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

    let values: any[];
    if (Array.isArray(input)) {
      values = input;
    } else {
      values = Object.values(input as object);
    }

    // Validate array size matches type specification
    // Handle both nested structure and flattened input
    const outerSize = CairoFixedArray.getFixedArraySize(type);
    const totalSize = CairoFixedArray.calculateTotalSize(type);
    const elementType = CairoFixedArray.getFixedArrayType(type);

    if (CairoFixedArray.isAbiType(elementType)) {
      // For nested arrays, accept both formats:
      // - Nested structure: [[1,2],[3,4]] (length = outer size)
      // - Flattened: [1,2,3,4] (length = total size)
      const isValidNested = values.length === outerSize;
      const isValidFlattened = values.length === totalSize;
      assert(
        isValidNested || isValidFlattened,
        `ABI type ${type}: expected ${outerSize} (nested) or ${totalSize} (flattened) items, got ${values.length} items`
      );
    } else {
      // For primitive arrays, only accept flat structure
      assert(
        values.length === outerSize,
        `ABI type ${type}: expected ${outerSize} items, got ${values.length} items`
      );
    }
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
   * Serialize the Cairo fixed array for API requests.
   * Uses the default parsing strategy to handle nested element serialization.
   * @returns Array of strings representing the serialized fixed array.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([1, 2, 3], "[core::integer::u8; 3]");
   * const result = fArray.toApiRequest();
   * // result = ['0x1', '0x2', '0x3']
   * ```
   */
  public toApiRequest(): string[] {
    const elementType = this.getFixedArrayType();

    // For nested arrays, we need to handle them differently since content is flattened
    if (CairoFixedArray.isAbiType(elementType)) {
      // For nested arrays, just serialize all primitive elements directly
      // The flattened content already contains the primitive values
      const result = this.content.flatMap((element) => {
        // Find the base primitive type by recursively extracting from nested arrays
        let baseType = elementType;
        while (CairoFixedArray.isAbiType(baseType)) {
          baseType = CairoFixedArray.getFixedArrayType(baseType);
        }

        const elementParser = this.strategy.request[baseType];
        if (elementParser) {
          const serialized = elementParser(element);
          return Array.isArray(serialized) ? serialized : [serialized];
        }
        throw new Error(`No parser found for base element type: ${baseType} in parsing strategy`);
      });
      return addCompiledFlag(result);
    }

    // For primitive arrays, process each element directly
    const result = this.content.flatMap((element) => {
      const elementParser = this.strategy.request[elementType];
      if (elementParser) {
        const serialized = elementParser(element);
        return Array.isArray(serialized) ? serialized : [serialized];
      }
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    });
    return addCompiledFlag(result);
  }

  /**
   * Checks if the given Cairo type is a fixed-array type.
   * structure: [string; number]
   *
   * @param {string} type - The type to check.
   * @returns - `true` if the type is a fixed array type, `false` otherwise.
   * ```typescript
   * const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
   * // result = true
   */
  static isAbiType(type: string) {
    return /^\[.+; \d+\]$/.test(type) && !/\s+;/.test(type);
  }

  /**
   * Parse fixed array from API response using the provided parsing strategy.
   * @param {Iterator<string>} responseIterator - Iterator over the API response data.
   * @param {string} arrayType - The fixed array type (e.g., "[core::integer::u32; 4]").
   * @param {ParsingStrategy} strategy - The parsing strategy to use for elements.
   * @returns {any[]} Array of parsed values according to the strategy.
   * @example
   * ```typescript
   * const response = ['0x1', '0x2', '0x3'];
   * const iterator = response[Symbol.iterator]();
   * const result = CairoFixedArray.factoryFromApiResponse(
   *   iterator,
   *   "[core::integer::u8; 3]",
   *   hdParsingStrategy
   * );
   * // result = [1n, 2n, 3n]
   * ```
   */
  static factoryFromApiResponse(
    responseIterator: Iterator<string>,
    arrayType: string,
    strategy: ParsingStrategy
  ): CairoFixedArray {
    const totalSize = CairoFixedArray.calculateTotalSize(arrayType);

    const rawContent = [];
    for (let i = 0; i < totalSize; i += 1) {
      rawContent.push(getNext(responseIterator));
    }
    return new CairoFixedArray(rawContent, arrayType, strategy);
  }

  /**
   * Calculate the total number of primitive elements in a fixed array type.
   * For nested arrays like [[u8; 2]; 3], this returns 6 (2 * 3).
   */
  private static calculateTotalSize(arrayType: string): number {
    const elementType = CairoFixedArray.getFixedArrayType(arrayType);
    const size = CairoFixedArray.getFixedArraySize(arrayType);

    if (CairoFixedArray.isAbiType(elementType)) {
      // Nested array: multiply by inner array's total size
      return size * CairoFixedArray.calculateTotalSize(elementType);
    }
    // Primitive type: just return the size
    return size;
  }

  /**
   * Flatten nested array content to consistent internal representation.
   * Handles both nested structure [[1,2],[3,4]] and already flattened [1,2,3,4].
   */
  private static flattenContent(values: any[], arrayType: string): any[] {
    const elementType = CairoFixedArray.getFixedArrayType(arrayType);

    // If element type is not a fixed array, content is already flat
    if (!CairoFixedArray.isAbiType(elementType)) {
      return values;
    }

    // Check if already flattened (all primitive elements)
    const isAlreadyFlat = values.every((item) => !Array.isArray(item));
    if (isAlreadyFlat) {
      return values;
    }

    // Flatten nested structure
    return values.flat(Infinity);
  }

  public decompose(): any[] {
    const elementType = this.getFixedArrayType();

    // For nested fixed arrays, we need to calculate how many raw elements each parsed element consumes
    if (CairoFixedArray.isAbiType(elementType)) {
      const innerSize = CairoFixedArray.getFixedArraySize(elementType);
      const outerSize = this.getFixedArraySize();
      const result = [];

      for (let i = 0; i < outerSize; i += 1) {
        const innerElements = this.content.slice(i * innerSize, (i + 1) * innerSize);
        const innerIterator = innerElements[Symbol.iterator]();
        result.push(CairoFixedArray.parseElement(innerIterator, elementType, this.strategy));
      }
      return result;
    }
    // For primitive types, parse each element individually
    const contentIterator = this.content[Symbol.iterator]();
    const result = [];
    const size = this.getFixedArraySize();

    for (let i = 0; i < size; i += 1) {
      result.push(CairoFixedArray.parseElement(contentIterator, elementType, this.strategy));
    }
    return result;
  }

  /**
   * Parse a single element using the strategy, with support for dynamic types like fixed arrays.
   * @param {Iterator<string>} responseIterator - Iterator over the API response data.
   * @param {string} elementType - The element type to parse.
   * @param {ParsingStrategy} strategy - The parsing strategy to use.
   * @returns {any} Parsed element according to the strategy.
   */
  private static parseElement(
    responseIterator: Iterator<string>,
    elementType: string,
    strategy: ParsingStrategy
  ): any {
    // Try exact match first (for primitive types registered in strategy)
    const elementParser = strategy.response[elementType];
    if (elementParser) {
      return elementParser(responseIterator, elementType);
    }

    // Try dynamic selectors for complex types
    const matchingSelector = Object.entries(strategy.dynamicSelectors).find(([, isAbiType]) =>
      isAbiType(elementType)
    );

    if (matchingSelector) {
      const [selector] = matchingSelector;
      const dynamicParser = strategy.response[selector];
      if (dynamicParser) {
        return dynamicParser(responseIterator, elementType);
      }
    }

    throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
  }
}

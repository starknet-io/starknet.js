import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { isTypeTuple, isCairo1Type, isTypeNamedTuple } from '../calldata/cairo';
import { type ParsingStrategy } from '../calldata/parser/parsingStrategy.type';
import { CairoType } from './cairoType.interface';
import { CairoFelt252 } from './felt';
import type { AllowArray } from '../../types';

/**
 * Represents a Cairo tuple with compile-time known structure.
 *
 * CairoTuple provides a complete implementation for handling Cairo's tuples,
 * which have the form `(type1, type2, ...)` (e.g., `(core::integer::u8, core::integer::u32)`).
 * It supports named tuples, nested tuples, type validation, serialization, and parsing from various sources.
 *
 * Key Features:
 * - Unified constructor handling user input, API responses, and CairoType instances
 * - Automatic type validation and conversion using parsing strategies
 * - Bi-directional serialization (to/from Starknet API format without length prefix)
 * - Support for deeply nested tuples and named tuples
 * - Direct CallData.compile() integration
 * - Comprehensive type checking and validation
 *
 * @example
 * ```typescript
 * import { CairoTuple, hdParsingStrategy } from 'starknet';
 *
 * // Simple tuple
 * const simple = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', hdParsingStrategy);
 * console.log(simple.toApiRequest()); // ['0x1', '0x2'] (no length prefix)
 * console.log(simple.decompose(hdParsingStrategy)); // [1n, 2n]
 *
 * // Named tuple
 * const named = new CairoTuple({x: 1, y: 2}, '(x:core::integer::u8, y:core::integer::u32)', hdParsingStrategy);
 * console.log(CallData.compile([named])); // Works directly with CallData.compile()
 *
 * // From API response
 * const apiData = ['0x1', '0x2'][Symbol.iterator]();
 * const fromApi = new CairoTuple(apiData, '(core::integer::u8, core::integer::u32)', hdParsingStrategy);
 * ```
 */
export class CairoTuple extends CairoType {
  static dynamicSelector = 'CairoTuple' as const;

  public readonly dynamicSelector = CairoTuple.dynamicSelector;

  /**
   * Array of CairoType instances representing the tuple elements.
   */
  public readonly content: CairoType[];

  /**
   * Cairo tuple type string.
   */
  public readonly tupleType: string;

  /**
   * Create a CairoTuple instance from various input types.
   *
   * This constructor provides a unified interface for creating tuples from:
   * - User input: Arrays [1, 2, 3] or objects {0: 1, 1: 2, 2: 3} or named {x: 1, y: 2}
   * - API responses: Iterator<string> from Starknet API calls
   * - Already constructed CairoType instances (for nesting)
   *
   * The constructor automatically detects input type and processes it appropriately,
   * converting all elements to proper CairoType instances based on the tuple type.
   *
   * @param content - Input data (array, object, Iterator<string>, or CairoType instances)
   * @param tupleType - Tuple type string (e.g., "(core::integer::u8, core::integer::u32)")
   * @param strategy - Parsing strategy for element type handling
   * @example
   * ```typescript
   * // From user object with indices
   * const tuple2 = new CairoTuple({0: 1, 1: 2}, '(core::integer::u8, core::integer::u32)', hdParsingStrategy);
   *
   * // From named object
   * const tuple3 = new CairoTuple({x: 1, y: 2}, '(x:core::integer::u8, y:core::integer::u32)', hdParsingStrategy);
   *
   * // From API response iterator
   * const iterator = ['0x1', '0x2'][Symbol.iterator]();
   * const tuple4 = new CairoTuple(iterator, '(core::integer::u8, core::integer::u32)', hdParsingStrategy);
   *
   * // Nested tuples
   * const nested = new CairoTuple([[1, 2], 3], '((core::integer::u8, core::integer::u8), core::integer::u32)', hdParsingStrategy);
   * ```
   */
  constructor(content: unknown, tupleType: string, parsingStrategy: AllowArray<ParsingStrategy>) {
    super();
    this.tupleType = tupleType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      const parsedContent: CairoType[] = CairoTuple.parser(
        content as Iterator<string>,
        tupleType,
        strategies
      );
      this.content = parsedContent;
      return;
    }
    if (content instanceof CairoTuple) {
      this.content = content.content;
      this.tupleType = content.tupleType;
      return;
    }
    CairoTuple.validate(content, tupleType);
    const tupleContentTypeResponse = CairoTuple.getTupleElementTypes(tupleType);
    const tupleContentType: string[] = tupleContentTypeResponse.map(
      (el: string | { name: string; type: string }) => (typeof el === 'string' ? el : el.type)
    );
    const resultContent: any[] = CairoTuple.extractValuesArray(content, tupleType).map(
      (contentItem: any, index: number) => {
        if (
          contentItem &&
          typeof contentItem === 'object' &&
          contentItem !== null &&
          'toApiRequest' in contentItem
        ) {
          // "content" is a CairoType
          return contentItem as CairoType;
        }

        // not an iterator, not an CairoType -> so is low level data (BigNumberish, array, object, Cairo Enums)
        const strategyConstructorNum = strategies.findIndex(
          (strategy: ParsingStrategy) => strategy.constructors[tupleContentType[index]]
        );
        if (strategyConstructorNum >= 0) {
          const constructor =
            strategies[strategyConstructorNum].constructors[tupleContentType[index]];
          return constructor(contentItem, strategies, tupleContentType[index]);
        }
        const strategyDynamicNum = strategies.findIndex((strategy: ParsingStrategy) => {
          const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
          return dynamicSelectors.find(([, selectorFn]) => selectorFn(tupleType));
        });
        if (strategyDynamicNum >= 0) {
          const dynamicSelectors = Object.entries(strategies[strategyDynamicNum].dynamicSelectors);
          const matchingSelector = dynamicSelectors.find(([, selectorFn]) =>
            selectorFn(tupleContentType[index])
          );
          const [selectorName] = matchingSelector as [string, (type: string) => boolean];
          const dynamicConstructor = strategies[strategyDynamicNum].constructors[selectorName];
          if (dynamicConstructor) {
            return dynamicConstructor(
              contentItem,
              strategies[strategyDynamicNum],
              tupleContentType[index]
            );
          }
        }
        throw new Error(`"${tupleContentType[index]}" is not a valid Cairo type`);
      }
    );
    assert(
      resultContent.length === tupleContentType.length,
      `ABI type ${tupleType}: expected ${tupleContentType.length} items, got ${resultContent.length} items.`
    );
    this.content = resultContent;
  }

  /**
   * Parse data from iterator into CairoType instances using the provided parsing strategy.
   *
   * This is the core parsing logic that consumes data sequentially from an iterator and
   * converts it into proper CairoType instances. It handles:
   * - Direct constructors (primitive types like u8, u256, etc.)
   * - Dynamic selectors (complex types like nested tuples, arrays)
   * - Unknown types (stored as raw strings for later error handling)
   *
   * Unlike arrays, tuples don't have a length prefix in the API response.
   *
   * @param responseIterator - Iterator over string data to parse
   * @param tupleType - The tuple type (e.g., "(core::integer::u8, core::integer::u32)")
   * @param parsingStrategies - The parsing strategies containing constructors and selectors
   * @returns Array of parsed CairoType instances
   * @private
   */
  private static parser(
    responseIterator: Iterator<string>,
    tupleType: string,
    parsingStrategies: ParsingStrategy[]
  ): CairoType[] {
    const elementTypes = CairoTuple.getTupleElementTypes(tupleType);

    return elementTypes.map((elementTypeInfo) => {
      const elementType =
        typeof elementTypeInfo === 'string' ? elementTypeInfo : (elementTypeInfo as any).type;

      // First check direct constructors
      const strategyConstructorNum = parsingStrategies.findIndex(
        (strategy: ParsingStrategy) => strategy.constructors[elementType]
      );
      if (strategyConstructorNum >= 0) {
        const constructor = parsingStrategies[strategyConstructorNum].constructors[elementType];
        return constructor(responseIterator, elementType);
      }

      // Check dynamic selectors (includes CairoArray, CairoFixedArray, CairoTuple, etc.)
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

      // Unknown type - fallback to felt252 constructor
      const felt252ConstructorNum = parsingStrategies.findIndex(
        (strategy: ParsingStrategy) => strategy.constructors[CairoFelt252.abiSelector]
      );
      const feltConstructor =
        parsingStrategies[felt252ConstructorNum].constructors[CairoFelt252.abiSelector];
      if (feltConstructor) {
        return feltConstructor(responseIterator, elementType);
      }

      // If even felt252 constructor is not available, collect raw value for error handling
      const rawValue = getNext(responseIterator);
      return rawValue as unknown as CairoType;
    });
  }

  /**
   * Extract values array from various input formats and organize them according to tuple structure.
   *
   * Handles different input formats:
   * - Arrays: [1, 2, 3] -> [1, 2, 3]
   * - Objects with indices: {0: 1, 1: 2, 2: 3} -> [1, 2, 3]
   * - Named objects: {x: 1, y: 2} -> [1, 2] (using tuple type names)
   *
   * @param input - Input data (array or object)
   * @param tupleType - Tuple type to determine element order for named objects
   * @returns Array of values extracted from the input
   * @private
   * @example
   * extractValuesArray([1, 2, 3], '(u8, u8, u8)') → [1, 2, 3]
   * extractValuesArray({0: 1, 1: 2, 2: 3}, '(u8, u8, u8)') → [1, 2, 3]
   * extractValuesArray({x: 1, y: 2}, '(x:u8, y:u8)') → [1, 2]
   */
  private static extractValuesArray(input: unknown, tupleType: string): any[] {
    if (Array.isArray(input)) {
      return input;
    }

    const inputObj = input as Record<string | number, any>;
    const elementTypes = CairoTuple.getTupleElementTypes(tupleType);

    // Check if this is a named tuple and input uses names
    const hasNames = elementTypes.some((el) => typeof el === 'object' && 'name' in el);
    if (hasNames) {
      const firstNamedElement = elementTypes.find(
        (el) => typeof el === 'object' && 'name' in el
      ) as any;
      if (firstNamedElement && firstNamedElement.name in inputObj) {
        // Named object input - extract values in tuple order
        return elementTypes.map((el) => {
          const name = typeof el === 'object' ? (el as any).name : el;
          return inputObj[name];
        });
      }
    }

    // Check if input uses numeric string keys (e.g., { "0": value1, "1": value2 })
    const hasNumericKeys = Object.keys(inputObj).every((key) => /^\d+$/.test(key));
    if (hasNumericKeys) {
      // Convert to array by sorting numeric keys
      const sortedKeys = Object.keys(inputObj).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
      return sortedKeys.map((key) => inputObj[key]);
    }

    // Object with arbitrary keys - convert to array using Object.values()
    // This maintains insertion order for compatibility with old behavior
    return Object.values(inputObj);
  }

  /**
   * Parse named tuple element like "name:type" into {name, type} object.
   * @private
   */
  private static parseNamedTuple(namedTuple: string): any {
    const name = namedTuple.substring(0, namedTuple.indexOf(':'));
    const type = namedTuple.substring(name.length + ':'.length);
    return { name, type };
  }

  /**
   * Parse sub-tuples by extracting nested parentheses.
   */
  // eslint-disable-next-line no-plusplus
  static parseSubTuple(s: string): {
    subTuple: string[];
    result: string;
  } {
    if (!s.includes('(')) return { subTuple: [], result: s };
    const subTuple: string[] = [];
    let result = '';
    let i = 0;
    while (i < s.length) {
      if (s[i] === '(') {
        let counter = 1;
        const lBracket = i;
        // eslint-disable-next-line no-plusplus
        i++;
        while (counter) {
          // eslint-disable-next-line no-plusplus
          if (s[i] === ')') counter--;
          // eslint-disable-next-line no-plusplus
          if (s[i] === '(') counter++;
          // eslint-disable-next-line no-plusplus
          i++;
        }
        subTuple.push(s.substring(lBracket, i));
        result += ' ';
        // eslint-disable-next-line no-plusplus
        i--;
      } else {
        result += s[i];
      }
      // eslint-disable-next-line no-plusplus
      i++;
    }

    return {
      subTuple,
      result,
    };
  }

  /**
   * Extract tuple member types for Cairo 0 format.
   * A cairo 0 tuple can be made in 2 formats:
   * - (val1, val2)
   * - named tuple (x:val1, y:val2)
   * See https://github.com/starknet-io/starknet-docs/blob/f97d02377290df38a2192414f210f75f95684373/archive/cairozero/how-cairozero-works/types.rst#types
   * @private
   */
  private static extractCairo0Tuple(type: string) {
    const cleanType = type.replace(/\s/g, '').slice(1, -1); // remove first lvl () and spaces

    // Handle empty tuple
    if (cleanType === '') {
      return [];
    }

    // Decompose subTuple
    const { subTuple, result } = CairoTuple.parseSubTuple(cleanType);

    // Recompose subTuple
    let recomposed = result.split(',').map((it) => {
      return subTuple.length ? it.replace(' ', subTuple.shift() as string) : it;
    });

    // Parse named tuple
    if (isTypeNamedTuple(type)) {
      recomposed = recomposed.reduce((acc, it) => {
        return acc.concat(CairoTuple.parseNamedTuple(it));
      }, []);
    }

    return recomposed;
  }

  /**
   * Get closure offset for matching brackets.
   * @private
   */
  private static getClosureOffset(input: string, open: string, close: string): number {
    // eslint-disable-next-line no-plusplus
    for (let i = 0, counter = 0; i < input.length; i++) {
      if (input[i] === open) {
        // eslint-disable-next-line no-plusplus
        counter++;
        // eslint-disable-next-line no-plusplus
      } else if (input[i] === close && --counter === 0) {
        return i;
      }
    }
    return Number.POSITIVE_INFINITY;
  }

  /**
   * Extract tuple member types for Cairo 1 format.
   * A cairo 1 tuple is made with  (val1, val2).
   * No named tuples in Cairo 1.
   * See https://www.starknet.io/cairo-book/ch02-02-data-types.html?highlight=tuple#the-tuple-type
   */
  static extractCairo1Tuple(type: string): (string | { name: string; type: string })[] {
    // Support both named and un-named tuples
    const input = type.slice(1, -1); // remove first lvl ()
    const result: (string | { name: string; type: string })[] = [];

    // Handle empty tuple
    if (input.trim() === '') {
      return result;
    }

    let currentIndex: number = 0;
    let limitIndex: number;

    while (currentIndex < input.length) {
      switch (true) {
        // Tuple
        case input[currentIndex] === '(': {
          limitIndex =
            currentIndex + CairoTuple.getClosureOffset(input.slice(currentIndex), '(', ')') + 1;
          break;
        }
        case input.startsWith('core::result::Result::<', currentIndex) ||
          input.startsWith('core::array::Array::<', currentIndex) ||
          input.startsWith('core::option::Option::<', currentIndex): {
          limitIndex =
            currentIndex + CairoTuple.getClosureOffset(input.slice(currentIndex), '<', '>') + 1;
          break;
        }
        default: {
          const commaIndex = input.indexOf(',', currentIndex);
          limitIndex = commaIndex !== -1 ? commaIndex : Number.POSITIVE_INFINITY;
        }
      }

      const elementString = input.slice(currentIndex, limitIndex);

      // Check if this element is named (contains a single colon not preceded by another colon)
      const colonIndex = elementString.indexOf(':');
      const isNamedElement =
        colonIndex !== -1 &&
        elementString.charAt(colonIndex - 1) !== ':' &&
        elementString.charAt(colonIndex + 1) !== ':' &&
        !elementString.includes('<');

      if (isNamedElement) {
        // This is a named tuple element
        const name = elementString.substring(0, colonIndex);
        const elementType = elementString.substring(colonIndex + 1);
        result.push({ name, type: elementType });
      } else {
        // This is an unnamed tuple element
        result.push(elementString);
      }

      currentIndex = limitIndex + 2; // +2 to skip ', '
    }

    return result;
  }

  /**
   * Convert a tuple string definition into an object-like definition.
   * Supports both Cairo 0 and Cairo 1 tuple formats.
   *
   * @param type - The tuple string definition (e.g., "(u8, u8)" or "(x:u8, y:u8)").
   * @returns An array of strings or objects representing the tuple components.
   *
   * @example
   * ```typescript
   * // Cairo 0 Tuple
   * const cairo0Tuple = "(u8, u8)";
   * const result = CairoTuple.extractTupleMemberTypes(cairo0Tuple);
   * // result: ["u8", "u8"]
   *
   * // Named Cairo 0 Tuple
   * const namedCairo0Tuple = "(x:u8, y:u8)";
   * const namedResult = CairoTuple.extractTupleMemberTypes(namedCairo0Tuple);
   * // namedResult: [{ name: "x", type: "u8" }, { name: "y", type: "u8" }]
   *
   * // Cairo 1 Tuple
   * const cairo1Tuple = "(core::result::Result::<u8, u8>, u8)";
   * const cairo1Result = CairoTuple.extractTupleMemberTypes(cairo1Tuple);
   * // cairo1Result: ["core::result::Result::<u8, u8>", "u8"]
   * ```
   * @private
   */
  private static extractTupleMemberTypes(
    type: string
  ): (string | { name: string; type: string })[] {
    return isCairo1Type(type)
      ? CairoTuple.extractCairo1Tuple(type)
      : CairoTuple.extractCairo0Tuple(type);
  }

  public static extractTupleMembersNames(type: string): string[] {
    const elementTypes = CairoTuple.getTupleElementTypes(type);
    if (typeof elementTypes[0] === 'string')
      return elementTypes.map((_, index) => index.toString());
    if ('name' in elementTypes[0] && 'type' in elementTypes[0])
      return elementTypes.map((el) => (el as { name: string; type: string }).name);
    return [];
  }

  /**
   * Get tuple element types from the tuple type string.
   * Uses the internal extractTupleMemberTypes method to parse tuple structure.
   * @param {string} tupleType - The tuple type string
   * @returns Array of element types (strings or objects with name/type for named tuples)
   * @example
   * ```typescript
   * const result1 = CairoTuple.getTupleElementTypes("(core::integer::u8, core::integer::u32)");
   * // result1 = ["core::integer::u8", "core::integer::u32"]
   *
   * const result2 = CairoTuple.getTupleElementTypes("(x:core::integer::u8, y:core::integer::u32)");
   * // result2 = [{name: "x", type: "core::integer::u8"}, {name: "y", type: "core::integer::u32"}]
   * ```
   */
  static getTupleElementTypes = (
    tupleType: string
  ): (string | { name: string; type: string })[] => {
    return CairoTuple.extractTupleMemberTypes(tupleType);
  };

  /**
   * Validate input data for CairoTuple creation.
   * @param {unknown} input - Input data to validate
   * @param {string} tupleType - The tuple type (e.g. "(core::integer::u8, core::integer::u32)")
   * @throws Error if input is invalid
   * @example
   * ```typescript
   * CairoTuple.validate([1, 2], "(core::integer::u8, core::integer::u32)"); // passes
   * CairoTuple.validate("invalid", "(core::integer::u8, core::integer::u32)"); // throws
   * ```
   */
  static validate(input: unknown, tupleType: string): void {
    // Validate the type format first
    assert(
      CairoTuple.isAbiType(tupleType),
      `The type ${tupleType} is not a Cairo tuple. Expected format: (type1, type2, ...)`
    );

    // Validate that input is array or object
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
  }

  /**
   * Check if input data is valid for CairoTuple creation.
   * @param {unknown} input - Input data to check
   * @param {string} tupleType - The tuple type (e.g., "(core::integer::u8, core::integer::u32)")
   * @returns {boolean} true if valid, false otherwise
   * @example
   * ```typescript
   * const isValid1 = CairoTuple.is([1, 2], "(core::integer::u8, core::integer::u32)"); // true
   * const isValid2 = CairoTuple.is("invalid", "(core::integer::u8, core::integer::u32)"); // false
   * ```
   */
  static is(input: unknown, tupleType: string): boolean {
    try {
      CairoTuple.validate(input, tupleType);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the given string represents a valid Cairo tuple type format.
   *
   * A valid tuple type must follow the pattern: `(type1, type2, ...)` where each type
   * is a valid Cairo type. Named tuples (from Cairo 0) like `(x:type1, y:type2)` are also supported.
   *
   * @param {string} type - The type string to validate
   * @returns {boolean} `true` if the type is a valid tuple format, `false` otherwise
   * @example
   * ```typescript
   * CairoTuple.isAbiType("(core::integer::u8, core::integer::u32)");     // true
   * CairoTuple.isAbiType("(x:core::integer::u8, y:core::integer::u32)"); // true (named)
   * CairoTuple.isAbiType("((core::integer::u8, core::integer::u8), core::integer::u32)"); // true (nested)
   * CairoTuple.isAbiType("core::integer::u32");                          // false (not a tuple)
   * CairoTuple.isAbiType("[core::integer::u32; 8]");                     // false (array, not tuple)
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeTuple(type);
  }

  /**
   * Serialize the Cairo tuple into hex strings for Starknet API requests.
   *
   * Converts the tuple into a flat array of hex strings WITHOUT a length prefix.
   * This follows the Cairo ABI standard for tuples which are serialized as
   * consecutive elements without length information.
   *
   * @returns {string[]} Array of hex strings ready for API requests (no length prefix)
   * @example
   * ```typescript
   * const tuple = new CairoTuple([1, 2], "(core::integer::u8, core::integer::u32)", strategy);
   * const result = tuple.toApiRequest(); // ['0x1', '0x2']
   * ```
   */
  public toApiRequest(): string[] {
    // Flatten all elements (no length prefix for tuples)
    const result = this.content.flatMap((element) => element.toApiRequest());
    return addCompiledFlag(result);
  }

  /**
   * Decompose the tuple into final parsed values, in an object {0:value0, ...}.
   *
   * Transforms CairoType instances into their final parsed values using the strategy's
   * response parsers (e.g., CairoUint8 → BigInt). This method is used primarily for
   * parsing API responses into user-friendly formats.
   *
   * @param {AllowArray<ParsingStrategy>} strategyDecompose - Parsing strategies for response parsing
   * @returns {Object} an object of format {0:value0, 1:value2}
   * @example
   * ```typescript
   * const myTuple = new CairoTuple(cairo.tuple(1, 2), '(core::integer::u8, core::integer::u32)', hdParsingStrategy);
   * const parsed = myTuple.decompose(hdParsingStrategy); // {"0": 1n, "1": 2n}
   * const myTuple1 = new CairoTuple([100, 200], "(x:felt, y:felt)", hdParsingStrategy); // Cairo 0 named tuple
   * const parsed1 = myTuple.decompose(hdParsingStrategy); // { x: 100n, y: 200n }
   * ```
   */
  public decompose(strategyDecompose: AllowArray<ParsingStrategy>): Object {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const tupleContentTypeResponse = CairoTuple.getTupleElementTypes(this.tupleType);
    const elementTypes: string[] = tupleContentTypeResponse.map(
      (el: string | { name: string; type: string }) => (typeof el === 'string' ? el : el.type)
    );
    const result = this.content.map((element, index) => {
      // For raw string values (unsupported types), throw error
      if (typeof element === 'string') {
        const elementType =
          typeof elementTypes[index] === 'string'
            ? (elementTypes[index] as string)
            : (elementTypes[index] as any).type;
        throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
      }
      let parserName: string = elementTypes[index] as string;
      if (element instanceof CairoType) {
        if ('dynamicSelector' in element) {
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
        `No response parser found for element type: ${elementTypes[index]} in parsing strategy`
      );
    });
    if (typeof tupleContentTypeResponse[0] === 'string') {
      return { ...result };
    }
    const namedTuple: Record<string, any> = {};
    tupleContentTypeResponse.forEach((el, index) => {
      const a = (
        tupleContentTypeResponse[index] as {
          name: string;
          type: string;
        }
      ).name;
      namedTuple[a] = result[index];
    });
    return namedTuple;
  }
}

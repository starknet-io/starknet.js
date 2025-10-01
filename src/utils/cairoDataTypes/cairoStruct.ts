import type { AbiEntry, AbiStruct, AllowArray } from '../../types';
import assert from '../assert';
import type { ParsingStrategy, VariantType } from '../calldata';
import { isCairo1Type, isLen } from '../calldata/cairo';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { CairoType } from './cairoType.interface';
import { CairoFelt252 } from './felt';

/**
 * Represents a Cairo named struct.
 */
export class CairoStruct extends CairoType {
  public readonly dynamicSelector: string;

  /** Array of CairoType instances representing the struct elements. */
  public readonly content: CairoType[];

  /** Cairo named struct type definition */
  public readonly abiStruct: AbiStruct;

  /**
   * Represents a Cairo named struct.
   * @param {unknown} content - Input data. (Iterator<string>, object, array)
   * @param {AbiStruct} abiStruct - Abi definition of the struct
   * @param {AllowArray<ParsingStrategy>} parsingStrategy - parsing strategy or array of strategies,
   * that includes the handling of the named struct defined in `abiStruct` (created automatically by `createAbiParser().parsingStrategies`)
   * @example
   * ```typescript
   * const abiPoint: AbiStruct = {
   *   type: 'struct',
   *   name: 'cairo_test::Point',
   *   members: [{ name: 'x', type: 'core::integer::u64' }, { name: 'y', type: 'core::integer::u32' }]
   * }
   * // From user object
   * const struct0 = new CairoStruct({x: 1, y: 2}, 'cairo_test::Point', parsingStrategies);
   * // From an array
   * const struct1 = new CairoStruct([1, 2], 'cairo_test::Point', parsingStrategies);
   * // From an iterator
   * const iterator = ['0x1', '0x2'][Symbol.iterator]();
   * const struct2 = new CairoStruct(iterator, 'cairo_test::Point', parsingStrategies);
   * ```
   */
  constructor(
    content: unknown,
    abiStruct: AbiStruct,
    parsingStrategy: AllowArray<ParsingStrategy>
  ) {
    super();
    this.dynamicSelector = abiStruct.name;
    this.abiStruct = abiStruct;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      const parsedContent: CairoType[] = CairoStruct.parser(
        content as Iterator<string>,
        abiStruct,
        strategies
      );
      this.content = parsedContent;
      return;
    }
    if (content instanceof CairoStruct) {
      this.content = content.content;
      this.abiStruct = content.abiStruct;
      this.dynamicSelector = content.dynamicSelector;
      return;
    }
    CairoStruct.validate(content, abiStruct);
    const structContentType: string[] = CairoStruct.getStructMembersTypes(abiStruct);
    const resultContent: any[] = CairoStruct.extractValuesArray(content, abiStruct).map(
      (contentItem: any, index: number) => {
        // "content" is a CairoType
        if (
          contentItem &&
          typeof contentItem === 'object' &&
          contentItem !== null &&
          'toApiRequest' in contentItem
        ) {
          return contentItem as CairoType;
        }

        // not an iterator, not an CairoType -> so is low level data (BigNumberish, array, object)
        const strategyConstructorNum = strategies.findIndex(
          (strategy: ParsingStrategy) => strategy.constructors[structContentType[index]]
        );
        if (strategyConstructorNum >= 0) {
          const constructor =
            strategies[strategyConstructorNum].constructors[structContentType[index]];
          return constructor(contentItem, strategies, structContentType[index]);
        }

        const strategyDynamicNum = strategies.findIndex((strategy: ParsingStrategy) => {
          const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
          return dynamicSelectors.find(([, selectorFn]) => selectorFn(structContentType[index]));
        });
        if (strategyDynamicNum >= 0) {
          const dynamicSelectors = Object.entries(strategies[strategyDynamicNum].dynamicSelectors);
          const matchingSelector = dynamicSelectors.find(([, selectorFn]) =>
            selectorFn(structContentType[index])
          );
          const [selectorName] = matchingSelector as [string, (type: string) => boolean];
          const dynamicConstructor = strategies[strategyDynamicNum].constructors[selectorName];
          return dynamicConstructor(contentItem, strategies, structContentType[index]);
        }
        throw new Error(`"${structContentType[index]}" is not a valid Cairo type`);
      }
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
   * @param {Iterator<string>} responseIterator - Iterator over string data to parse
   * @param {AbiStruct} abiStruct - The Abi description of the struct
   * @param {ParsingStrategy[]} parsingStrategies - The parsing strategies containing constructors and selectors
   * @returns Array of parsed CairoType instances
   */
  private static parser(
    responseIterator: Iterator<string>,
    abiStruct: AbiStruct,
    parsingStrategies: ParsingStrategy[]
  ): CairoType[] {
    const elementTypes: string[] = CairoStruct.getStructMembersTypes(abiStruct);

    return elementTypes.map((elementType: string) => {
      const strategyConstructorNum = parsingStrategies.findIndex(
        (strategy: ParsingStrategy) => strategy.constructors[elementType]
      );
      if (strategyConstructorNum >= 0) {
        const constructor = parsingStrategies[strategyConstructorNum].constructors[elementType];
        return constructor(responseIterator, parsingStrategies, elementType);
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
      const feltConstructorNum = parsingStrategies.findIndex(
        (strategy: ParsingStrategy) => strategy.constructors[CairoFelt252.abiSelector]
      );
      if (feltConstructorNum >= 0) {
        const feltConstructor =
          parsingStrategies[feltConstructorNum].constructors[CairoFelt252.abiSelector];
        return feltConstructor(responseIterator, parsingStrategies, elementType);
      }

      // If even felt252 constructor is not available, collect raw value for error handling
      const rawValue = getNext(responseIterator);
      return rawValue as unknown as CairoType;
    });
  }

  /**
   * Validate input data for CairoStruct creation.
   * @param {unknown} input - Input data to validate
   * @param {AbiStruct} abiStruct - optional - Abi definition of the struct
   * @throws Error if input is invalid
   */
  static validate(input: unknown, abiStruct?: AbiStruct): void {
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
    if (!abiStruct) return; // cannot validate without ABI
    assert(abiStruct.type === 'struct', `Invalid ABI: expected struct, got ${abiStruct.type}`);
    const lengthInput = Array.isArray(input) ? input.length : Object.keys(input).length;
    assert(
      abiStruct.members.length === lengthInput,
      `Invalid input: expected ${abiStruct.members.length} members, got ${lengthInput}`
    );
  }

  /**
   * Check if input data is valid for CairoStruct creation.
   * @param {any} data - Input data to check
   * @param {string} _type - not used
   * @param {VariantType} _variant - not used
   * @returns true if valid, false otherwise
   */
  static is(data: any, _type?: string, _variant?: VariantType): boolean {
    try {
      CairoStruct.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /** Not applicable for CairoStruct */
  static isAbiType(_type: string): boolean {
    // A Cairo struct type (it's name) do not include any special pattern allowing to identify it directly.
    return true;
  }

  /**
   * Extract an array from data representing a Cairo Struct
   * @param {unknown} input - Input data (array or object)
   * @returns {any[]} Array of values extracted from the input
   */
  private static extractValuesArray(input: unknown, abiStruct: AbiStruct): any[] {
    if (Array.isArray(input)) {
      return input;
    }
    const inputObj = input as Record<string | number, any>;
    const orderedObject2 = abiStruct.members.reduce(
      (orderedObject: Record<string | number, any>, abiParam: AbiEntry) => {
        const setProperty = (value?: any) =>
          Object.defineProperty(orderedObject, abiParam.name, {
            enumerable: true,
            value: value ?? inputObj[abiParam.name],
          });

        if (typeof inputObj[abiParam.name] === 'undefined') {
          if (isCairo1Type(abiParam.type) || !isLen(abiParam.name)) {
            throw Error(`Your object needs a property with key : ${abiParam.name} .`);
          }
        }
        setProperty(inputObj[abiParam.name]);
        return orderedObject;
      },
      {}
    );
    return Object.values(orderedObject2);
  }

  /**
   * Extract the Cairo type of each property of a named Cairo Struct
   * @param {AbiStruct} type - Abi definition of the struct
   * @returns {string[]} an array of Cairo types
   */
  private static getStructMembersTypes(type: AbiStruct): string[] {
    return type.members.map((member) => member.type);
  }

  /**
   *Extract the Cairo names of each property of a named Cairo Struct
   * @param {AbiStruct} type - Abi definition of the struct
   * @returns {string[]} an array of Cairo struct properties
   */
  public static extractStructMembersNames(type: AbiStruct): string[] {
    return type.members.map((member) => member.name);
  }

  /**
   * Serialize the CairoStruct into hex strings for Starknet API requests.
   * @returns {string[]} Array of hex strings ready for API requests
   * ```typescript
   * // for a struct {x:1, y:2}
   * const result = myStruct.toApiRequest();
   * // result = ['0x1', '0x2']
   * ```
   */
  toApiRequest(): string[] {
    const result = this.content.flatMap((element) => element.toApiRequest());
    return addCompiledFlag(result);
  }

  /**
   * Decompose the struct into final parsed values, in an object {x:value0, ...}.
   * @param {AllowArray<ParsingStrategy>} strategyDecompose
   * @returns {Object} an object of format {a:value0, b:value1, ...}
   * ```typescript
   * // for a struct {x:1, y:2}
   * const result = myStruct.decompose(strategies);
   * // result = {x:1, y:2}
   * ```
   */
  public decompose(strategyDecompose: AllowArray<ParsingStrategy>): Object {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const structContentType = CairoStruct.getStructMembersTypes(this.abiStruct);
    const result = this.content.map((element: CairoType, index: number) => {
      // For raw string values (unsupported types), throw error
      if (typeof element === 'string') {
        const elementType =
          typeof structContentType[index] === 'string'
            ? (structContentType[index] as string)
            : (structContentType[index] as any).type;
        throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
      }
      let parserName: string = structContentType[index] as string;
      if (element instanceof CairoType) {
        if ('dynamicSelector' in element) {
          // dynamic recursive CairoType
          parserName = (element as any).dynamicSelector;
        }
      }
      const strategyDecomposeNum = strategies.findIndex(
        (strategy: ParsingStrategy) => strategy.response[parserName]
      );
      if (strategyDecomposeNum >= 0) {
        const responseParser = strategies[strategyDecomposeNum].response[parserName];
        if (responseParser) {
          return responseParser(element, strategies);
        }
      }
      // No response parser found - throw error instead of fallback magic
      throw new Error(
        `No response parser found for element type: ${structContentType[index]} in parsing strategy`
      );
    });
    const struct: Record<string, any> = {};
    result.forEach((el, index) => {
      struct[this.abiStruct.members[index].name] = el;
    });
    return struct;
  }
}

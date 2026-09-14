import type { AllowArray } from '../../types';
import assert from '../assert';
import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { isUndefined } from '../typed';
import { isCairoType, type CairoType } from './cairoType.interface';
import { findConstructor, findResponseParser } from './strategyLookup';

/**
 * A Cairo fixed array : a known number of items, all of the same type.
 *
 * Its abi type is written `[itemType; length]`, and both halves matter — the length is part of the
 * type, so an array of the wrong size is refused rather than padded or cut. On the wire it carries
 * no length of its own, exactly like a tuple : the type already says how many items follow, which
 * is the whole difference with {@link CairoArray}.
 * @example
 * ```typescript
 * const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]', cairoTypeStrategy);
 * fArray.toApiRequest(); //                 ["10", "20", "30"]     no length on the wire
 * fArray.decompose(cairoTypeStrategy); //   [10n, 20n, 30n]
 * ```
 */
export class CairoFixedArray {
  /**
   * The name this class is registered under in a strategy's `dynamicSelectors`.
   * @example
   * ```typescript
   * const result = CairoFixedArray.dynamicSelector;
   * // result = "CairoFixedArray"
   * ```
   */
  static dynamicSelector = 'CairoFixedArray' as const;

  /**
   * The selector on the instance, which is how a composite holding it knows what built it.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10], '[core::integer::u32; 1]', cairoTypeStrategy);
   * const result = fArray.dynamicSelector;
   * // result = "CairoFixedArray"
   * ```
   */
  public readonly dynamicSelector = CairoFixedArray.dynamicSelector;

  /**
   * The items, each already built as the type the array declares.
   *
   * Not the raw values handed in : like every other composite — {@link CairoStruct},
   * {@link CairoArray}, {@link CairoTuple} — what is kept is the typed form, which is what lets the
   * whole tree serialize itself at once. {@link CairoFixedArray.decompose} reads them back.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]', cairoTypeStrategy);
   * const result = fArray.content.length;
   * // result = 3
   * ```
   */
  public readonly content: CairoType[];

  /**
   * The abi type this array was built for.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10], '[core::integer::u32; 1]', cairoTypeStrategy);
   * const result = fArray.arrayType;
   * // result = "[core::integer::u32; 1]"
   * ```
   */
  public readonly arrayType: string;

  /**
   * Split a `[itemType; length]` type into its two halves, or say it is not one.
   *
   * The separator is the **last** `'; '` of the string, so a fixed array of fixed arrays splits on
   * its outer level and its inner type comes back whole. A type that is not bracketed, that has no
   * item type, or whose length is not made of digits is not one : `undefined` comes back, and it is
   * the callers that decide whether to raise.
   * @param {string} type the abi type to split
   * @returns {{itemType: string, size: string} | undefined} the two halves, or undefined
   * @example
   * ```typescript
   * // called from within the class
   * CairoFixedArray.parseFixedArrayType('[core::integer::u32; 8]');
   * // { itemType: 'core::integer::u32', size: '8' }
   * CairoFixedArray.parseFixedArrayType('[[core::integer::u8; 2]; 3]');
   * // { itemType: '[core::integer::u8; 2]', size: '3' }     the inner array, kept whole
   * CairoFixedArray.parseFixedArrayType('core::integer::u32');
   * // undefined
   * ```
   */
  private static parseFixedArrayType(type: string) {
    if (!type.startsWith('[') || !type.endsWith(']')) {
      return undefined;
    }

    const separator = type.lastIndexOf('; ');
    const itemType = type.slice(1, separator);
    const size = type.slice(separator + 2, -1);

    if (
      separator <= 1 ||
      size.length === 0 ||
      ![...size].every((char) => char >= '0' && char <= '9')
    ) {
      return undefined;
    }

    return { itemType, size };
  }

  /**
   * Build a fixed array, from values a caller passed or from the felts of a response.
   *
   * Items are accepted raw, or already built and taken as they stand. An object is read by its
   * values, which is the shape {@link CairoFixedArray.compile} produces. Another instance is
   * adopted whole.
   *
   * The strategy says how to build each item, and is required rather than defaulted : defaulting
   * would mean importing the default strategy, which reads this very class to register itself, and
   * the two modules would depend on each other. `cairoTypeStrategy` is what to pass for the
   * language's own types.
   * @param {unknown} content the items, as an array, an object, or the response iterator
   * @param {string} arrayType the abi type, `[itemType; length]`
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build each item
   * @throws {Error} when the type is not a fixed array, when the item count does not match, or
   * when the item type is one no strategy knows
   * @example
   * ```typescript
   * const type = '[core::integer::u32; 2]';
   * new CairoFixedArray([10, 20], type, cairoTypeStrategy).toApiRequest();
   * // ["10", "20"]
   * new CairoFixedArray(['0xa', '0x14'].values(), type, cairoTypeStrategy).toApiRequest();
   * // ["10", "20"]
   * new CairoFixedArray([10], type, cairoTypeStrategy);
   * // throws Error("The ABI type [core::integer::u32; 2] is expecting 2 items. 1 items provided.")
   * ```
   */
  constructor(content: unknown, arrayType: string, parsingStrategy: AllowArray<CairoTypeStrategy>) {
    this.arrayType = arrayType;
    // This argument is new: until now the constructor took two. Code written against that older
    // shape still runs in plain JavaScript, and without this guard it would fail much further
    // down, inside the strategy lookup, on "Cannot read properties of undefined".
    assert(
      !isUndefined(parsingStrategy),
      'A CairoFixedArray needs a parsing strategy to build its items. Pass `cairoTypeStrategy` for the language types.'
    );
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];

    if (content && typeof content === 'object' && 'next' in content) {
      this.content = CairoFixedArray.parser(content as Iterator<string>, arrayType, strategies);
      return;
    }
    if (content instanceof CairoFixedArray) {
      // checked against the declared type, not adopted from the instance: a caller may hand over
      // an array built for another length, and the abi is what says how many items belong here
      CairoFixedArray.validate(content.content, arrayType);
      this.content = content.content;
      return;
    }

    CairoFixedArray.validate(content, arrayType);
    const itemType = CairoFixedArray.getFixedArrayType(arrayType);
    const build = findConstructor(strategies, itemType);
    if (!build) {
      throw new Error(`"${itemType}" is not a valid Cairo type`);
    }
    this.content = CairoFixedArray.extractValuesArray(content).map((value) =>
      isCairoType(value) ? value : build(value, strategies, itemType)
    );
  }

  /**
   * Read a fixed array off a response, one item after another.
   *
   * Nothing marks where it ends on the wire, so the type is what says how many to take.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this array
   * @param {string} arrayType the abi type, `[itemType; length]`
   * @param {CairoTypeStrategy[]} strategies how to build each item
   * @returns {CairoType[]} the items that were read
   * @throws {Error} when the item type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * const fArray = new CairoFixedArray(
   *   ['0xa', '0x14'].values(),
   *   '[core::integer::u32; 2]',
   *   cairoTypeStrategy
   * );
   * fArray.decompose(cairoTypeStrategy);
   * // [10n, 20n]
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    arrayType: string,
    strategies: CairoTypeStrategy[]
  ): CairoType[] {
    const itemType = CairoFixedArray.getFixedArrayType(arrayType);
    const size = CairoFixedArray.getFixedArraySize(arrayType);
    const build = findConstructor(strategies, itemType);
    if (!build) {
      throw new Error(`No parser found for element type: ${itemType} in parsing strategy`);
    }
    return Array.from({ length: size }, () => build(responseIterator, strategies, itemType));
  }

  /**
   * Line the items up, whatever shape the input took.
   * @param {unknown} input the items, as an array or an object
   * @returns {any[]} the items in order
   * @example
   * ```typescript
   * // called from the constructor: this is the shape CairoFixedArray.compile produces
   * const fArray = new CairoFixedArray(
   *   { 0: 10, 1: 20 },
   *   '[core::integer::u32; 2]',
   *   cairoTypeStrategy
   * );
   * fArray.toApiRequest();
   * // ["10", "20"]
   * ```
   */
  private static extractValuesArray(input: unknown): any[] {
    return Array.isArray(input) ? input : Object.values(input as object);
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
    const fixedArrayType = CairoFixedArray.parseFixedArrayType(type);
    if (!fixedArrayType)
      throw new Error(`ABI type ${type} do not includes a valid number after ';' character.`);
    return Number(fixedArrayType.size);
  }

  /**
   * Retrieves the Cairo fixed array size from the CairoFixedArray instance.
   * @returns {number} The fixed array size.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]", cairoTypeStrategy);
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
    const fixedArrayType = CairoFixedArray.parseFixedArrayType(type);
    if (!fixedArrayType) throw new Error(`ABI type ${type} do not includes a valid type of data.`);
    return fixedArrayType.itemType;
  };

  /**
   * Retrieve the Cairo content type of the Cairo fixed array.
   * @returns {string} The fixed-array content type.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]", cairoTypeStrategy);
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
   *
   * The values are the built items rather than the raw ones, which changes nothing for the
   * calldata : `CallData.compile` serializes anything that knows its own wire format.
   * @returns a specific struct representing a fixed array.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]", cairoTypeStrategy);
   * const result = CallData.compile(fArray.compile());
   * // result = ["10", "20", "30"]
   * ```
   */
  public compile(): Object {
    return CairoFixedArray.compile(this.content);
  }

  /**
   * Throw unless this input can be read as a fixed array of this type.
   *
   * The item count is checked here, unlike a dynamic array's : a fixed array declares its length
   * in its type, so a list of the wrong size is the caller's mistake.
   * @param {unknown} input the items to check
   * @param {string} type the abi type they are meant for
   * @throws {Error} when the type is not a fixed array, when the input is neither an array nor an
   * object, or when the item count does not match
   * @example
   * ```typescript
   * CairoFixedArray.validate([1, 2, 3], '[core::integer::u8; 3]'); // passes
   * CairoFixedArray.validate([1, 2], '[core::integer::u8; 3]');
   * // throws Error("The ABI type [core::integer::u8; 3] is expecting 3 items. 2 items provided.")
   * ```
   */
  static validate(input: unknown, type: string): void {
    assert(
      CairoFixedArray.isAbiType(type),
      `The type ${type} is not a Cairo fixed array. Needs [type; length].`
    );
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
    const values = CairoFixedArray.extractValuesArray(input);
    const size = CairoFixedArray.getFixedArraySize(type);
    assert(
      values.length === size,
      `The ABI type ${type} is expecting ${size} items. ${values.length} items provided.`
    );
  }

  /**
   * Can this input be read as a fixed array of this type?
   *
   * The non-throwing form of {@link CairoFixedArray.validate}.
   * @param {unknown} input the items to test
   * @param {string} type the abi type they are meant for
   * @returns {boolean} true when the shape and the count both fit
   * @example
   * ```typescript
   * const result = CairoFixedArray.is([1, 2, 3], '[core::integer::u8; 3]');
   * // result = true
   * const result2 = CairoFixedArray.is([1, 2], '[core::integer::u8; 3]');
   * // result2 = false     (one item short)
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
   * Is this abi type a fixed array?
   * @param {string} type the abi type to test
   * @returns {boolean} true for `[itemType; length]`, nested or not
   * @example
   * ```typescript
   * const result = CairoFixedArray.isAbiType('[core::integer::u32; 8]');
   * // result = true
   * const result2 = CairoFixedArray.isAbiType('core::array::Array::<core::integer::u8>');
   * // result2 = false     (a dynamic array carries its length on the wire)
   * ```
   */
  static isAbiType(type: string): boolean {
    return CairoFixedArray.parseFixedArrayType(type) !== undefined;
  }

  /**
   * Checks if the given Cairo type is a fixed-array type.
   * structure: [string; number]
   *
   * The name every other Cairo type class uses for this is `isAbiType`; this one is kept because
   * it is what the library has exposed all along.
   * @param {string} type - The type to check.
   * @returns {boolean} `true` if the type is a fixed array type, `false` otherwise.
   * @example
   * ```typescript
   * const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
   * // result = true
   * ```
   */
  static isTypeFixedArray(type: string) {
    return CairoFixedArray.isAbiType(type);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The items follow one another with nothing in front : the length is in the type, not on the
   * wire — which is the whole difference with a dynamic array.
   * @returns {string[]} the items' felts, in order, flagged as compiled
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]', cairoTypeStrategy);
   * const result = fArray.toApiRequest();
   * // result = ["10", "20", "30"]
   * ```
   */
  public toApiRequest(): string[] {
    return addCompiledFlag(this.content.flatMap((item) => item.toApiRequest()));
  }

  /**
   * Read the array back as the plain values a caller reads.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read each item back
   * @returns {any[]} the items' values, in order
   * @throws {Error} when no strategy can read an item back
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]', cairoTypeStrategy);
   * const result = fArray.decompose(cairoTypeStrategy);
   * // result = [10n, 20n, 30n]
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): any[] {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const itemType = CairoFixedArray.getFixedArrayType(this.arrayType);

    return this.content.map((item) => {
      const parserName =
        'dynamicSelector' in item
          ? (item as { dynamicSelector: string }).dynamicSelector
          : itemType;
      const read = findResponseParser(strategies, parserName);
      if (!read) {
        throw new Error(
          `No response parser found for element type: ${parserName} in parsing strategy`
        );
      }
      return read(item, strategies);
    });
  }
}

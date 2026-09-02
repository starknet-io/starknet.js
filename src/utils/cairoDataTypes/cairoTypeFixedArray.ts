import type { AllowArray } from '../../types';
import assert from '../assert';
import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { isCairoType, type CairoType } from './cairoType.interface';
import { CairoFixedArray } from './fixedArray';
import { findConstructor, findResponseParser } from './strategyLookup';

/**
 * A Cairo fixed array : a known number of values, all of the same type.
 *
 * Its abi type is `[T; length]`, and both halves matter — the length is part of the type, so an
 * array of the wrong size is refused rather than padded or cut. On the wire it carries no length
 * of its own, exactly like a tuple : the type already says how many elements follow.
 *
 * This is the internal shape, the one that serializes itself and reads itself back. The public
 * {@link CairoFixedArray} is the other half of the story : it turns a list into the struct
 * `CallData.compile` expects, and it is what a caller writes today. The two coexist while the
 * encoding is being moved over, and this one delegates its type reading to it so that both read a
 * `[T; length]` the same way.
 * @example
 * ```typescript
 * const array = new CairoTypeFixedArray([1, 2, 3], '[core::integer::u8; 3]', cairoTypeStrategy);
 * array.toApiRequest(); //                 ["1", "2", "3"]     no length on the wire
 * array.decompose(cairoTypeStrategy); //   [1n, 2n, 3n]
 * ```
 */
export class CairoTypeFixedArray {
  /**
   * The name this class is registered under in a strategy's `dynamicSelectors`.
   * @example
   * ```typescript
   * const result = CairoTypeFixedArray.dynamicSelector;
   * // result = "CairoTypeFixedArray"
   * ```
   */
  static dynamicSelector = 'CairoTypeFixedArray' as const;

  /**
   * The selector on the instance, which is how a composite holding it knows what built it.
   * @example
   * ```typescript
   * const array = new CairoTypeFixedArray([1], '[core::integer::u8; 1]', cairoTypeStrategy);
   * const result = array.dynamicSelector;
   * // result = "CairoTypeFixedArray"
   * ```
   */
  public readonly dynamicSelector = CairoTypeFixedArray.dynamicSelector;

  /**
   * The elements, each already built as the type the array declares.
   * @example
   * ```typescript
   * const array = new CairoTypeFixedArray([1, 2, 3], '[core::integer::u8; 3]', cairoTypeStrategy);
   * const result = array.content.length;
   * // result = 3
   * ```
   */
  public readonly content: CairoType[];

  /**
   * The abi type this array was built for.
   * @example
   * ```typescript
   * const array = new CairoTypeFixedArray([1], '[core::integer::u8; 1]', cairoTypeStrategy);
   * const result = array.arrayType;
   * // result = "[core::integer::u8; 1]"
   * ```
   */
  public readonly arrayType: string;

  /**
   * Build a fixed array, from values a caller passed or from the felts of a response.
   *
   * Elements are accepted raw, or already built and taken as they stand. An object is read by its
   * values, which is the shape {@link CairoFixedArray.compile} produces.
   * @param {unknown} content the elements, as an array, an object, or the response iterator
   * @param {string} arrayType the abi type, `[T; length]`
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build each element
   * @throws {Error} when the type is not a fixed array, when the element count does not match, or
   * when the element type is one no strategy knows
   * @example
   * ```typescript
   * const type = '[core::integer::u8; 2]';
   * new CairoTypeFixedArray([1, 2], type, cairoTypeStrategy).toApiRequest();
   * // ["1", "2"]
   * new CairoTypeFixedArray(['0x1', '0x2'].values(), type, cairoTypeStrategy).toApiRequest();
   * // ["1", "2"]
   * ```
   */
  constructor(content: unknown, arrayType: string, parsingStrategy: AllowArray<CairoTypeStrategy>) {
    this.arrayType = arrayType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];

    if (content && typeof content === 'object' && 'next' in content) {
      this.content = CairoTypeFixedArray.parser(content as Iterator<string>, arrayType, strategies);
      return;
    }
    if (content instanceof CairoTypeFixedArray) {
      this.content = content.content;
      this.arrayType = content.arrayType;
      return;
    }

    CairoTypeFixedArray.validate(content, arrayType);
    const elementType = CairoTypeFixedArray.getFixedArrayType(arrayType);
    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`"${elementType}" is not a valid Cairo type`);
    }
    this.content = CairoTypeFixedArray.extractValuesArray(content).map((value) =>
      isCairoType(value) ? value : build(value, strategies, elementType)
    );
  }

  /**
   * Read a fixed array off a response, one element after another.
   *
   * Nothing marks where it ends on the wire, so the type is what says how many to take.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this array
   * @param {string} arrayType the abi type, `[T; length]`
   * @param {CairoTypeStrategy[]} strategies how to build each element
   * @returns {CairoType[]} the elements that were read
   * @throws {Error} when the element type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * const array = new CairoTypeFixedArray(
   *   ['0x1', '0x2'].values(),
   *   '[core::integer::u8; 2]',
   *   cairoTypeStrategy
   * );
   * array.decompose(cairoTypeStrategy);
   * // [1n, 2n]
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    arrayType: string,
    strategies: CairoTypeStrategy[]
  ): CairoType[] {
    const elementType = CairoTypeFixedArray.getFixedArrayType(arrayType);
    const size = CairoTypeFixedArray.getFixedArraySize(arrayType);
    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    return Array.from({ length: size }, () => build(responseIterator, strategies, elementType));
  }

  /**
   * Line the elements up, whatever shape the input took.
   * @param {unknown} input the elements, as an array or an object
   * @returns {any[]} the elements in order
   * @example
   * ```typescript
   * // called from the constructor: this is the shape CairoFixedArray.compile produces
   * const array = new CairoTypeFixedArray(
   *   { 0: 1, 1: 2 },
   *   '[core::integer::u8; 2]',
   *   cairoTypeStrategy
   * );
   * array.toApiRequest();
   * // ["1", "2"]
   * ```
   */
  private static extractValuesArray(input: unknown): any[] {
    return Array.isArray(input) ? input : Object.values(input as object);
  }

  /**
   * How many elements this type declares.
   * @param {string} type the abi type to read
   * @returns {number} the declared length
   * @example
   * ```typescript
   * const result = CairoTypeFixedArray.getFixedArraySize('[core::integer::u32; 8]');
   * // result = 8
   * ```
   */
  static getFixedArraySize(type: string): number {
    return CairoFixedArray.getFixedArraySize(type);
  }

  /**
   * The type of the elements this array holds.
   * @param {string} type the abi type to read
   * @returns {string} the element type
   * @example
   * ```typescript
   * const result = CairoTypeFixedArray.getFixedArrayType('[core::integer::u32; 8]');
   * // result = "core::integer::u32"
   * const result2 = CairoTypeFixedArray.getFixedArrayType('[[core::integer::u8; 2]; 3]');
   * // result2 = "[core::integer::u8; 2]"     the inner array, kept whole
   * ```
   */
  static getFixedArrayType(type: string): string {
    return CairoFixedArray.getFixedArrayType(type);
  }

  /**
   * Throw unless this input can be read as a fixed array of this type.
   *
   * The element count is checked here, unlike a dynamic array's : a fixed array declares its
   * length in its type, so a list of the wrong size is the caller's mistake.
   * @param {unknown} input the elements to check
   * @param {string} type the abi type they are meant for
   * @throws {Error} when the type is not a fixed array, when the input is neither an array nor an
   * object, or when the element count does not match
   * @example
   * ```typescript
   * CairoTypeFixedArray.validate([1, 2, 3], '[core::integer::u8; 3]'); // passes
   * CairoTypeFixedArray.validate([1, 2], '[core::integer::u8; 3]');
   * // throws Error("ABI type [core::integer::u8; 3]: expected 3 items, got 2 items")
   * ```
   */
  static validate(input: unknown, type: string): void {
    assert(
      CairoTypeFixedArray.isAbiType(type),
      `The type ${type} is not a Cairo fixed array. Needs [type; length].`
    );
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
    const values = CairoTypeFixedArray.extractValuesArray(input);
    const size = CairoTypeFixedArray.getFixedArraySize(type);
    assert(
      values.length === size,
      `ABI type ${type}: expected ${size} items, got ${values.length} items`
    );
  }

  /**
   * Can this input be read as a fixed array of this type?
   *
   * The non-throwing form of {@link CairoTypeFixedArray.validate}.
   * @param {unknown} input the elements to test
   * @param {string} type the abi type they are meant for
   * @returns {boolean} true when the shape and the count both fit
   * @example
   * ```typescript
   * const result = CairoTypeFixedArray.is([1, 2, 3], '[core::integer::u8; 3]');
   * // result = true
   * const result2 = CairoTypeFixedArray.is([1, 2], '[core::integer::u8; 3]');
   * // result2 = false     (one element short)
   * ```
   */
  static is(input: unknown, type: string): boolean {
    try {
      CairoTypeFixedArray.validate(input, type);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type a fixed array?
   *
   * Answered by the public {@link CairoFixedArray}, so that both classes recognize the same
   * strings while the encoding is being moved over.
   * @param {string} type the abi type to test
   * @returns {boolean} true for `[T; length]`, nested or not
   * @example
   * ```typescript
   * const result = CairoTypeFixedArray.isAbiType('[core::integer::u32; 8]');
   * // result = true
   * const result2 = CairoTypeFixedArray.isAbiType('core::array::Array::<core::integer::u8>');
   * // result2 = false     (a dynamic array carries its length on the wire)
   * ```
   */
  static isAbiType(type: string): boolean {
    return CairoFixedArray.isTypeFixedArray(type);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The elements follow one another with nothing in front : the length is in the type, not on the
   * wire — which is the whole difference with a dynamic array.
   * @returns {string[]} the elements' felts, in order, flagged as compiled
   * @example
   * ```typescript
   * const array = new CairoTypeFixedArray([1, 2, 3], '[core::integer::u8; 3]', cairoTypeStrategy);
   * const result = array.toApiRequest();
   * // result = ["1", "2", "3"]
   * ```
   */
  public toApiRequest(): string[] {
    return addCompiledFlag(this.content.flatMap((element) => element.toApiRequest()));
  }

  /**
   * Read the array back as the plain values a caller reads.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read each element back
   * @returns {any[]} the elements' values, in order
   * @throws {Error} when no strategy can read an element back
   * @example
   * ```typescript
   * const array = new CairoTypeFixedArray([1, 2, 3], '[core::integer::u8; 3]', cairoTypeStrategy);
   * const result = array.decompose(cairoTypeStrategy);
   * // result = [1n, 2n, 3n]
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): any[] {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = CairoTypeFixedArray.getFixedArrayType(this.arrayType);

    return this.content.map((element) => {
      const parserName =
        'dynamicSelector' in element
          ? (element as { dynamicSelector: string }).dynamicSelector
          : elementType;
      const read = findResponseParser(strategies, parserName);
      if (!read) {
        throw new Error(
          `No response parser found for element type: ${parserName} in parsing strategy`
        );
      }
      return read(element, strategies);
    });
  }
}

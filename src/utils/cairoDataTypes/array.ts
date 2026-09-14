import type { AllowArray } from '../../types';
import assert from '../assert';
import { getArrayType, isTypeArray } from '../calldata/cairo';
import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { getNext, isBigNumberish } from '../num';
import { splitLongString } from '../shortString';
import { CairoBytes31 } from './bytes31';
import { CairoFelt252 } from './felt';
import { isCairoType, type CairoType } from './cairoType.interface';
import { findConstructor, findResponseParser } from './strategyLookup';

/**
 * A Cairo dynamic array : any number of values, all of the same type.
 *
 * Its abi type is `core::array::Array::<T>` or `core::array::Span::<T>`, and both are handled the
 * same way. Unlike a tuple, whose size is in its type, an array carries its length on the wire :
 * the felts start with how many elements follow.
 *
 * Text is accepted where the elements are felt252 or bytes31, and is split into the 31-character
 * chunks each of those holds — which is how a long string reaches a contract that takes an array
 * of felts.
 * @example
 * ```typescript
 * const array = new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', cairoTypeStrategy);
 * array.toApiRequest(); //                 ["3", "1", "2", "3"]     length first
 * array.decompose(cairoTypeStrategy); //   [1n, 2n, 3n]
 * ```
 */
export class CairoArray {
  /**
   * The name this class is registered under in a strategy's `dynamicSelectors`.
   * @example
   * ```typescript
   * const result = CairoArray.dynamicSelector;
   * // result = "CairoArray"
   * ```
   */
  static dynamicSelector = 'CairoArray' as const;

  /**
   * The selector on the instance, which is how a composite holding it knows what built it.
   * @example
   * ```typescript
   * const array = new CairoArray([1], 'core::array::Array::<core::integer::u8>', cairoTypeStrategy);
   * const result = array.dynamicSelector;
   * // result = "CairoArray"
   * ```
   */
  public readonly dynamicSelector = CairoArray.dynamicSelector;

  /**
   * The elements, each already built as the type the array declares.
   * @example
   * ```typescript
   * const array = new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', cairoTypeStrategy);
   * const result = array.content.length;
   * // result = 3
   * ```
   */
  public readonly content: CairoType[];

  /**
   * The abi type this array was built for.
   * @example
   * ```typescript
   * const array = new CairoArray([1], 'core::array::Span::<core::integer::u8>', cairoTypeStrategy);
   * const result = array.arrayType;
   * // result = "core::array::Span::<core::integer::u8>"
   * ```
   */
  public readonly arrayType: string;

  /**
   * Build an array, from values a caller passed or from the felts of a response.
   *
   * Elements are accepted raw, or already built and taken as they stand. An object is read by its
   * values, and text is split into chunks where the element type holds text.
   * @param {unknown} content the elements, as an array, an object, text, or the response iterator
   * @param {string} arrayType the abi type, `core::array::Array::<T>` or `Span::<T>`
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build each element
   * @throws {Error} when the type is not an array, or when its element type no strategy knows
   * @example
   * ```typescript
   * const fromArray = new CairoArray([1, 2], 'core::array::Array::<core::integer::u8>', cairoTypeStrategy);
   * fromArray.toApiRequest(); // ["2", "1", "2"]
   *
   * const fromResponse = new CairoArray(
   *   ['0x2', '0x1', '0x2'].values(),
   *   'core::array::Array::<core::integer::u8>',
   *   cairoTypeStrategy
   * );
   * fromResponse.toApiRequest(); // ["2", "1", "2"]
   * ```
   */
  constructor(content: unknown, arrayType: string, parsingStrategy: AllowArray<CairoTypeStrategy>) {
    this.arrayType = arrayType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];

    if (content && typeof content === 'object' && 'next' in content) {
      this.content = CairoArray.parser(content as Iterator<string>, arrayType, strategies);
      return;
    }
    if (content instanceof CairoArray) {
      this.content = content.content;
      this.arrayType = content.arrayType;
      return;
    }

    const elementType = CairoArray.getArrayElementType(arrayType);
    const elements = CairoArray.splitTextIfHeld(content, elementType);
    CairoArray.validate(elements, arrayType);

    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`"${elementType}" is not a valid Cairo type`);
    }
    this.content = CairoArray.extractValuesArray(elements).map((value) =>
      isCairoType(value) ? value : build(value, strategies, elementType)
    );
  }

  /**
   * Turn text into the chunks an array of felt252 or bytes31 holds, or leave the input alone.
   *
   * Both of those types carry at most 31 bytes, so a longer string cannot be one element. Text is
   * only split where the array actually holds text : anywhere else a string is a number written
   * out, and splitting it would be nonsense.
   * @param {unknown} content the value the caller passed
   * @param {string} elementType the type the array declares
   * @returns {unknown} the chunks, or the input unchanged
   * @example
   * ```typescript
   * // called from the constructor
   * const array = new CairoArray('hello', 'core::array::Array::<core::felt252>', cairoTypeStrategy);
   * array.toApiRequest();
   * // ["1", "448378203247"]     one chunk, holding the five bytes of "hello"
   * ```
   */
  private static splitTextIfHeld(content: unknown, elementType: string): unknown {
    const holdsText =
      elementType === CairoFelt252.abiSelector || elementType === CairoBytes31.abiSelector;
    return typeof content === 'string' && !isBigNumberish(content) && holdsText
      ? splitLongString(content)
      : content;
  }

  /**
   * Read an array off a response : its length, then that many elements.
   *
   * The length felt comes as a node wrote it, which is hexadecimal, but this class writes it in
   * decimal — so it is read as a number rather than parsed in a fixed base, and both spellings
   * give the same count.
   * @param {Iterator<string>} responseIterator the response felts, positioned on the length
   * @param {string} arrayType the abi type, `core::array::Array::<T>` or `Span::<T>`
   * @param {CairoTypeStrategy[]} strategies how to build each element
   * @returns {CairoType[]} the elements that were read
   * @throws {Error} when the element type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * const array = new CairoArray(
   *   ['0x2', '0x1', '0x2'].values(),
   *   'core::array::Array::<core::integer::u8>',
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
    const elementType = CairoArray.getArrayElementType(arrayType);
    const length = Number(BigInt(getNext(responseIterator)));

    const build = findConstructor(strategies, elementType);
    if (!build) {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    return Array.from({ length }, () => build(responseIterator, strategies, elementType));
  }

  /**
   * Line the elements up, whatever shape the input took.
   *
   * An array is already one. An object is read by its values, in the insertion order JavaScript
   * keeps — an array has no names to go by, so position is all there is.
   * @param {unknown} input the elements, as an array or an object
   * @returns {any[]} the elements in order
   * @example
   * ```typescript
   * // called from the constructor
   * const array = new CairoArray({ 0: 1, 1: 2 }, 'core::array::Array::<core::integer::u8>', cairoTypeStrategy);
   * array.toApiRequest();
   * // ["2", "1", "2"]
   * ```
   */
  private static extractValuesArray(input: unknown): any[] {
    return Array.isArray(input) ? input : Object.values(input as object);
  }

  /**
   * The type of the elements an array holds.
   * @param {string} type the abi type to read
   * @returns {string} the element type
   * @example
   * ```typescript
   * const result = CairoArray.getArrayElementType('core::array::Array::<core::integer::u32>');
   * // result = "core::integer::u32"
   * const result2 = CairoArray.getArrayElementType('core::array::Span::<core::integer::u8>');
   * // result2 = "core::integer::u8"
   * ```
   */
  static getArrayElementType(type: string): string {
    return getArrayType(type);
  }

  /**
   * Throw unless this input can be read as an array of this type.
   *
   * Only the shape is checked : an array type, and elements given as a list or an object. How
   * many there are is not, since an array declares no length — that is the whole difference with
   * a tuple.
   * @param {unknown} input the elements to check
   * @param {string} type the abi type they are meant for
   * @throws {Error} when the type is not an array, or the input is neither an array nor an object
   * @example
   * ```typescript
   * CairoArray.validate([1, 2], 'core::array::Array::<core::integer::u8>'); // passes
   * CairoArray.validate([1, 2], 'core::integer::u8');
   * // throws Error("The type core::integer::u8 is not a Cairo dynamic array. Needs
   * //               core::array::Array::<T> or core::array::Span::<T>.")
   * ```
   */
  static validate(input: unknown, type: string): void {
    assert(
      CairoArray.isAbiType(type),
      `The type ${type} is not a Cairo dynamic array. Needs core::array::Array::<T> or core::array::Span::<T>.`
    );
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
  }

  /**
   * Can this input be read as an array of this type?
   *
   * The non-throwing form of {@link CairoArray.validate}.
   * @param {unknown} input the elements to test
   * @param {string} type the abi type they are meant for
   * @returns {boolean} true when the shape fits
   * @example
   * ```typescript
   * const result = CairoArray.is([1, 2], 'core::array::Array::<core::integer::u8>');
   * // result = true
   * const result2 = CairoArray.is('nope', 'core::array::Array::<core::integer::u8>');
   * // result2 = false
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
   * Is this abi type a dynamic array?
   * @param {string} type the abi type to test
   * @returns {boolean} true for `core::array::Array::<T>` and `core::array::Span::<T>`
   * @example
   * ```typescript
   * const result = CairoArray.isAbiType('core::array::Array::<core::integer::u32>');
   * // result = true
   * const result2 = CairoArray.isAbiType('core::array::Span::<core::integer::u8>');
   * // result2 = true
   * const result3 = CairoArray.isAbiType('[core::integer::u32; 8]');
   * // result3 = false     (a fixed array declares its length in its type)
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeArray(type);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The count comes first, then the elements. A nested array carries its own count in turn, which
   * is what lets the whole of it be read back from one flat list.
   * @returns {string[]} the length then the elements' felts, flagged as compiled
   * @example
   * ```typescript
   * const array = new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', cairoTypeStrategy);
   * const result = array.toApiRequest();
   * // result = ["3", "1", "2", "3"]
   * ```
   */
  public toApiRequest(): string[] {
    return addCompiledFlag([
      String(this.content.length),
      ...this.content.flatMap((element) => element.toApiRequest()),
    ]);
  }

  /**
   * Read the array back as the plain values a caller reads.
   *
   * Each element is handed to the strategy entry for its type — or for what built it, when that
   * is a composite, which is what its `dynamicSelector` says.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read each element back
   * @returns {any[]} the elements' values, in order
   * @throws {Error} when no strategy can read an element back
   * @example
   * ```typescript
   * const array = new CairoArray([1, 2, 3], 'core::array::Array::<core::integer::u8>', cairoTypeStrategy);
   * const result = array.decompose(cairoTypeStrategy);
   * // result = [1n, 2n, 3n]
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): any[] {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = CairoArray.getArrayElementType(this.arrayType);

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

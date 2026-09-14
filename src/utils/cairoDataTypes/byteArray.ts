/* eslint-disable no-underscore-dangle */
import { BigNumberish, ByteArray } from '../../types';
import assert from '../assert';
import {
  addHexPrefix,
  bigIntToUint8Array,
  buf2hex,
  concatenateArrayBuffer,
  stringToUint8Array,
  utf8ToUint8Array,
} from '../encode';
import { computeHashOnElements } from '../hash/pedersenCore';
import { getNext, toHex } from '../num';
import { isBigInt, isBuffer, isInteger, isNumber, isObject, isString } from '../typed';
import { addCompiledFlag } from '../helpers';
import Buffer from '../connect/buffer';
import { CairoBytes31 } from './bytes31';
import { CairoFelt252 } from './felt';
import { CairoUint32 } from './uint32';

/**
 * The three components of a Cairo `ByteArray`, whatever the type of each one.
 *
 * A {@link CairoByteArray} holds them already typed, while the plain object of
 * `byteArrayFromString` holds them as `BigNumberish`. This type is what the two have in common.
 */
type ByteArrayComponents = {
  data: (BigNumberish | CairoBytes31)[];
  pending_word: BigNumberish | CairoFelt252;
  pending_word_len: BigNumberish | CairoUint32;
};

/**
 * Does this value spell out the three components of a Cairo `ByteArray`?
 *
 * `data` has to be an array, which is what separates a ByteArray from an unrelated object that
 * happens to own a `data` key. The members themselves are not inspected: whether they are typed
 * or `BigNumberish` is decided when they are adopted, not here.
 * @param {unknown} value the value to test
 * @returns {boolean} true when the value owns `data` (an array), `pending_word` and `pending_word_len`
 * @example
 * ```typescript
 * const result = isByteArrayShape({ data: [], pending_word: '0x3132', pending_word_len: 2 });
 * // result = true
 * const result2 = isByteArrayShape({ data: 'ABC' });
 * // result2 = false
 * ```
 */
function isByteArrayShape(value: unknown): value is ByteArrayComponents {
  return (
    isObject(value) &&
    'data' in value &&
    Array.isArray((value as ByteArrayComponents).data) &&
    'pending_word' in value &&
    'pending_word_len' in value
  );
}

/**
 * A Cairo `core::byte_array::ByteArray` : an arbitrary sequence of bytes, cut into words of 31.
 *
 * A ByteArray is **not** Cairo's string type. It carries bytes, and text is only one of the things
 * those bytes can mean — which is why the constructor reads a string the way calldata does, and why
 * text has a door of its own, {@link CairoByteArray.fromText}.
 * @example
 * ```typescript
 * // the same four characters, read four ways
 * new CairoByteArray('Hello').toHexString(); //      "0x48656c6c6f"  text, nothing else fits
 * new CairoByteArray('12345').toHexString(); //      "0x3039"        the number 12345
 * new CairoByteArray('0x4142').toHexString(); //     "0x4142"        the bytes 0x41 0x42
 * CairoByteArray.fromText('12345').toHexString(); // "0x3132333435"  the text '12345'
 * ```
 */
export class CairoByteArray {
  /**
   * The complete words, 31 bytes each.
   *
   * Bytes that do not fill a whole word are not here, but in {@link CairoByteArray.pending_word}.
   * @example
   * ```typescript
   * const result = CairoByteArray.fromText('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567').data.length;
   * // result = 1     (33 bytes : one full word of 31, and 2 bytes left pending)
   * ```
   */
  data: CairoBytes31[] = [];

  /**
   * The bytes left over after the last complete word, held as a felt252.
   *
   * Its value alone does not say how many bytes it holds — a leading zero byte is invisible in a
   * number — which is what {@link CairoByteArray.pending_word_len} is for.
   * @example
   * ```typescript
   * const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567';
   * const result = CairoByteArray.fromText(text).pending_word.toHexString();
   * // result = "0x3637"     (the two characters '67' left after the first word)
   * ```
   */
  pending_word!: CairoFelt252; // felt

  /**
   * How many bytes {@link CairoByteArray.pending_word} holds, from 0 to 30.
   *
   * The contract reads this length, so the same pending word under two lengths is two different
   * values : `0x41` on one byte is `A`, on two bytes it is a NUL followed by `A`.
   * @example
   * ```typescript
   * const result = new CairoByteArray('0x0041').pending_word_len.toBigInt();
   * // result = 2n    (where new CairoByteArray('0x41') gives 1n, for the same pending word)
   * ```
   */
  pending_word_len!: CairoUint32; // u32

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoByteArray.abiSelector;
   * // result = "core::byte_array::ByteArray"
   * ```
   */
  static abiSelector = 'core::byte_array::ByteArray' as const;

  /**
   * Build from components that are already typed, the form an api response arrives in.
   * @param {CairoBytes31[]} data the complete 31-byte words
   * @param {CairoFelt252} pendingWord the bytes left after the last complete word
   * @param {CairoUint32} pendingWordLen how many bytes `pendingWord` holds
   * @example
   * ```typescript
   * const pending = new CairoFelt252('0x48656c6c6f');
   * const result = new CairoByteArray([], pending, new CairoUint32(5)).decodeUtf8();
   * // result = "Hello"
   * ```
   */
  public constructor(data: CairoBytes31[], pendingWord: CairoFelt252, pendingWordLen: CairoUint32);
  /**
   * Build from a single value, cut into words of 31 bytes.
   *
   * A string is read the way calldata reads it : `'0x41'` as the byte 0x41, `'12345'` as the number
   * 12345, anything else as UTF-8 text. A string that spells a number therefore becomes that
   * number, with no error raised — use {@link CairoByteArray.fromText} when the argument is text.
   *
   * A value that is already a ByteArray — an instance, or the object returned by
   * `byteArrayFromString` — is adopted as it stands, its words never cut again.
   * @param {BigNumberish | Buffer | Uint8Array | ByteArray} data the value to carry
   * @example
   * ```typescript
   * const result = new CairoByteArray('Hello').toApiRequest();
   * // result = ["0", "310939249775", "5"]
   * const components = { data: [], pending_word: '0x41', pending_word_len: 1 };
   * const result2 = new CairoByteArray(components).decodeUtf8();
   * // result2 = "A"
   * ```
   */
  public constructor(data: BigNumberish | Buffer | Uint8Array | ByteArray | unknown);
  public constructor(...arr: any[]) {
    // Handle constructor from typed components
    if (arr.length === 3) {
      const [dataArg, pendingWord, pendingWordLen] = arr;

      // Check if we're dealing with typed classes
      assert(
        Array.isArray(dataArg) &&
          pendingWord instanceof CairoFelt252 &&
          pendingWordLen instanceof CairoUint32,
        'Invalid constructor parameters. Expected (CairoBytes31[], CairoFelt252, CairoUint32)'
      );
      // Typed classes - use directly
      this.data = dataArg;
      this.pending_word = pendingWord;
      this.pending_word_len = pendingWordLen;
      return;
    }

    // Handle custom constructor
    const inData = arr[0] as unknown;
    CairoByteArray.validate(inData);
    const { data, pending_word, pending_word_len } = CairoByteArray.__processData(inData);
    this.data = data;
    this.pending_word = pending_word;
    this.pending_word_len = pending_word_len;
  }

  /**
   * Turn any accepted input into the three components of a ByteArray.
   *
   * Shared by both constructor paths. An input that is already a ByteArray is adopted rather than
   * cut again, so a pending word declared longer than its content keeps that declared length.
   * @param {BigNumberish | Buffer | Uint8Array | ByteArray} inData the value to convert
   * @returns {object} the `data`, `pending_word` and `pending_word_len` components
   * @example
   * ```typescript
   * const result = CairoByteArray.__processData('Hello').pending_word_len.toBigInt();
   * // result = 5n
   * ```
   */
  static __processData(inData: BigNumberish | Buffer | Uint8Array | ByteArray | unknown) {
    // An already cut ByteArray : its components are adopted as they are, never concatenated and
    // cut again. Covers a CairoByteArray instance and the plain object of `byteArrayFromString`.
    if (isByteArrayShape(inData)) {
      return {
        // a data word has no length field, so a BigNumberish one is normalized through its hex
        // form, the only representation CairoBytes31 reads without guessing
        data: inData.data.map((word) =>
          word instanceof CairoBytes31 ? word : new CairoBytes31(toHex(word))
        ),
        pending_word:
          inData.pending_word instanceof CairoFelt252
            ? inData.pending_word
            : new CairoFelt252(inData.pending_word),
        pending_word_len:
          inData.pending_word_len instanceof CairoUint32
            ? inData.pending_word_len
            : new CairoUint32(inData.pending_word_len),
      };
    }

    let fullData: Uint8Array;
    // Handle different input types
    if (inData instanceof Uint8Array) {
      // byteArrayFromUint8Array
      fullData = inData;
    } else if (isBuffer(inData)) {
      // byteArrayFromBuffer
      fullData = new Uint8Array(inData as Buffer);
    } else if (isString(inData)) {
      // byteArrayFromString - stringToUint8Array handles hex, decimal, and UTF-8
      fullData = stringToUint8Array(inData);
    } else if (isBigInt(inData)) {
      // byteArrayFromBigInt
      fullData = bigIntToUint8Array(inData);
    } else if (isInteger(inData)) {
      // byteArrayFromNumber
      fullData = bigIntToUint8Array(BigInt(inData));
    } else {
      throw new Error(
        'Invalid input type. Expected Uint8Array, Buffer, ByteArray, string, number, or bigint'
      );
    }

    const CHUNK_SIZE = CairoBytes31.MAX_BYTE_SIZE;

    // Calculate how many complete 31-byte chunks we have
    const completeChunks = Math.floor(fullData.length / CHUNK_SIZE);
    const remainderLength = fullData.length % CHUNK_SIZE;

    // Extract the data (complete 31-byte chunks) as CairoBytes31 objects
    const data = [];
    let pending_word: CairoFelt252;
    let pending_word_len: CairoUint32;
    for (let i = 0; i < completeChunks; i += 1) {
      const chunkStart = i * CHUNK_SIZE;
      const chunkEnd = chunkStart + CHUNK_SIZE;
      const chunk = fullData.slice(chunkStart, chunkEnd);
      data.push(new CairoBytes31(chunk));
    }

    // Handle the pending word (remainder)
    if (remainderLength > 0) {
      const remainder = fullData.slice(completeChunks * CHUNK_SIZE);
      // Convert remainder to hex string for CairoFelt252
      let hex = '0x';
      for (let i = 0; i < remainder.length; i += 1) {
        hex += remainder[i].toString(16).padStart(2, '0');
      }
      pending_word = new CairoFelt252(hex);
      pending_word_len = new CairoUint32(remainderLength);
    } else {
      pending_word = new CairoFelt252(0);
      pending_word_len = new CairoUint32(0);
    }

    return { data, pending_word, pending_word_len };
  }

  /**
   * Build from text, with no interpretation of what the text looks like.
   *
   * The constructor reads a string the way calldata does — `'0x1a'` as two hexadecimal bytes,
   * `'12345'` as a decimal number — because a ByteArray is a byte sequence, not Cairo's string
   * type, and spelling those bytes in hexadecimal is a legitimate way to fill one. Here there is
   * no such ambiguity: the argument is text, and its UTF-8 bytes are the value.
   * @param {string} text the text to encode
   * @returns {CairoByteArray} the UTF-8 bytes of the text, cut into 31-byte words
   * @example
   * ```typescript
   * const result = CairoByteArray.fromText('12345').toHexString();
   * // result = "0x3132333435"     (the text, where the constructor would read the number 0x3039)
   * const result2 = CairoByteArray.fromText('0x4142').toHexString();
   * // result2 = "0x307834313432"  (six characters, where the constructor would read the bytes "AB")
   * ```
   */
  static fromText(text: string): CairoByteArray {
    return new CairoByteArray(utf8ToUint8Array(text));
  }

  /**
   * Serialize to the felt sequence a contract call carries : the number of complete words, each of
   * them, then the pending word and its length.
   * @returns {string[]} the decimal-string felts, flagged as compiled
   * @example
   * ```typescript
   * const result = CairoByteArray.fromText('Hello').toApiRequest();
   * // result = ["0", "310939249775", "5"]
   * ```
   */
  toApiRequest() {
    this.assertInitialized();

    return addCompiledFlag([
      this.data.length.toString(),
      ...this.data.flatMap((bytes31) => bytes31.toApiRequest()),
      ...this.pending_word.toApiRequest(),
      ...this.pending_word_len.toApiRequest(),
    ]);
  }

  /**
   * Read the bytes back as UTF-8 text.
   *
   * The words are concatenated before decoding, so a multi-byte character split across two of them
   * survives. Bytes that are not valid UTF-8 come back as replacement characters rather than as an
   * error, so succeeding here does not prove the ByteArray was carrying text.
   * @returns {string} the bytes decoded as UTF-8
   * @example
   * ```typescript
   * const result = CairoByteArray.fromText('héllo').decodeUtf8();
   * // result = "héllo"    (5 characters, 6 bytes)
   * const result2 = new CairoByteArray('12345').decodeUtf8();
   * // result2 = "09"      (the number 12345 is the two bytes 0x30 0x39)
   * ```
   */
  decodeUtf8() {
    // Convert all bytes to Uint8Array and decode as UTF-8 string
    // This ensures multi-byte UTF-8 characters are not split across chunk boundaries
    const allBytes = concatenateArrayBuffer(this.toElements());
    return new TextDecoder().decode(allBytes);
  }

  /**
   * The whole byte sequence read as one big-endian number.
   *
   * A number has no room for a leading zero byte, so that byte is lost here. Use
   * {@link CairoByteArray.toHexString} when the byte count matters.
   * @returns {bigint} the bytes as a number, 0n when there are none
   * @example
   * ```typescript
   * const result = CairoByteArray.fromText('Hello').toBigInt();
   * // result = 310939249775n
   * const result2 = new CairoByteArray('0x0041').toBigInt();
   * // result2 = 65n     (two bytes in, one byte out - toHexString keeps both)
   * ```
   */
  toBigInt() {
    // Reconstruct the full byte sequence
    const allBytes = concatenateArrayBuffer(this.toElements());

    // Convert bytes array to bigint
    if (allBytes.length === 0) {
      return 0n;
    }

    let result = 0n;
    allBytes.forEach((byte) => {
      result = result * 256n + BigInt(byte);
    });

    return result;
  }

  /**
   * The whole byte sequence in hexadecimal, leading zero bytes included.
   *
   * This is the faithful view : two hex digits per byte, whatever their value. An empty ByteArray
   * and one holding a single zero byte both read as a zero here, which is the one case this form
   * does not separate.
   * @returns {string} the bytes as a 0x-prefixed hex string, "0x0" when there are none
   * @example
   * ```typescript
   * const result = new CairoByteArray('0x0041').toHexString();
   * // result = "0x0041"    (where toBigInt() gives 65n, having dropped the first byte)
   * ```
   */
  toHexString() {
    // TODO: revisit empty data handling, how to differentiate empty and zero input
    const allBytes = concatenateArrayBuffer(this.toElements());
    const hexValue = allBytes.length === 0 ? '0' : buf2hex(allBytes);
    return addHexPrefix(hexValue);
  }

  /**
   * The whole byte sequence as a Buffer, leading zero bytes included.
   * @returns {Buffer} a copy of the bytes, empty when there are none
   * @example
   * ```typescript
   * const result = CairoByteArray.fromText('Hello').toBuffer().toString('hex');
   * // result = "48656c6c6f"
   * ```
   */
  toBuffer() {
    const allBytes = concatenateArrayBuffer(this.toElements());
    return Buffer.from(allBytes);
  }

  /**
   * Compute the Pedersen hash of this ByteArray, following OpenZeppelin's `hash_byte_array` algorithm.
   *
   * Serializes the ByteArray to its felt252 components (data array length, each data chunk,
   * pending_word, pending_word_len), then chains Pedersen hash over all elements starting
   * from 0, and finalizes with the total element count.
   *
   * @returns {string} hex-string felt252 Pedersen hash of the ByteArray
   * @example
   * ```typescript
   * const ba = new CairoByteArray('Hello');
   * const result = ba.hash();
   * // result = 0x15d19ad651ffaf8e90a13938db2081fa3ff01de0712e00cbe69891bace66c51
   * ```
   */
  hash(): string {
    this.assertInitialized();
    const serialized: string[] = [
      addHexPrefix(this.data.length.toString(16)),
      ...this.data.flatMap((bytes31) => bytes31.toApiRequest()),
      ...this.pending_word.toApiRequest(),
      ...this.pending_word_len.toApiRequest(),
    ];
    return computeHashOnElements(serialized);
  }

  /**
   * The words as raw byte buffers : every complete word, then the pending one.
   *
   * Concatenating them gives the original byte sequence back. A complete word is always 31 bytes,
   * while the last buffer holds exactly `pending_word_len` bytes — zero-padded on the left when the
   * pending word is shorter than its declared length. A pending length of 0 yields no last buffer.
   * @returns {Uint8Array[]} one buffer per word, in order
   * @example
   * ```typescript
   * const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567';
   * const result = CairoByteArray.fromText(text).toElements().map((word) => word.length);
   * // result = [31, 2]
   * ```
   */
  toElements(): Uint8Array[] {
    this.assertInitialized();

    // Add bytes from all complete chunks (each chunk contains exactly 31 bytes when full)
    const allChunks: Uint8Array[] = this.data.flatMap((chunk) => chunk.data);

    // Add bytes from pending word
    const pendingLen = Number(this.pending_word_len.toBigInt());
    if (pendingLen) {
      const pending = new Uint8Array(pendingLen);
      const paddingDifference = pendingLen - this.pending_word.data.length;
      pending.set(this.pending_word.data, paddingDifference);
      allChunks.push(pending);
    }

    return allChunks;
  }

  /**
   * Throw unless the three components are present.
   *
   * They are declared with a definite assignment assertion, so TypeScript does not catch an
   * instance whose components were never filled, or one overwritten after construction. Every
   * method that reads them calls this first.
   * @throws {Error} when any of the three components is missing
   * @example
   * ```typescript
   * const byteArray = new CairoByteArray('test');
   * (byteArray as any).data = undefined;
   * byteArray.toApiRequest();
   * // throws Error("CairoByteArray is not properly initialized")
   * ```
   */
  private assertInitialized(): void {
    assert(
      this.data && this.pending_word !== undefined && this.pending_word_len !== undefined,
      'CairoByteArray is not properly initialized'
    );
  }

  /**
   * Throw unless the value is of a kind this class can carry.
   *
   * Called by the constructor, and called directly by the calldata validator before a contract
   * call — so a value refused here never reaches serialization. It weighs the kind of the value,
   * not its contents : a ByteArray object holding unusable components passes here and fails later,
   * when those components are adopted.
   * @param {Uint8Array | Buffer | BigNumberish | ByteArray} data the value to check
   * @throws {Error} when the value is of a kind this class does not carry
   * @example
   * ```typescript
   * CairoByteArray.validate('12345'); //           passes, and will be read as the number 12345
   * CairoByteArray.validate(new Uint8Array(2)); // passes
   * CairoByteArray.validate(-1);
   * // throws Error("Invalid input for CairoByteArray: negative numbers are not supported")
   * ```
   */
  static validate(data: Uint8Array | Buffer | BigNumberish | ByteArray | unknown) {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(
      !Array.isArray(data) || data instanceof Uint8Array,
      'Invalid input: arrays are not supported, use Uint8Array'
    );
    assert(
      typeof data !== 'object' ||
        isBuffer(data) ||
        data instanceof Uint8Array ||
        isByteArrayShape(data),
      'Invalid input for CairoByteArray: the only objects supported are Uint8Array, Buffer, and { data, pending_word, pending_word_len }'
    );
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input for CairoByteArray: decimal numbers are not supported, only integers'
    );
    assert(
      !isNumber(data) || data >= 0,
      'Invalid input for CairoByteArray: negative numbers are not supported'
    );
    assert(
      !isBigInt(data) || data >= 0n,
      'Invalid input for CairoByteArray: negative bigints are not supported'
    );

    // There is no particular validation from input parameters when they are composed of existing types
    assert(
      data instanceof Uint8Array ||
        isBuffer(data) ||
        isString(data) ||
        isNumber(data) ||
        isBigInt(data) ||
        isByteArrayShape(data),
      'Invalid input type. Expected Uint8Array, Buffer, ByteArray, string, number, or bigint'
    );
  }

  /**
   * Can this value be carried by a CairoByteArray?
   *
   * The non-throwing form of {@link CairoByteArray.validate}, with the same reach : it answers on
   * the kind of the value, not on the usability of its contents.
   * @param {any} data the value to test
   * @returns {boolean} true when the value is of a kind this class can carry
   * @example
   * ```typescript
   * const result = CairoByteArray.is('12345');
   * // result = true
   * const result2 = CairoByteArray.is({ data: 'ABC' });
   * // result2 = false    (an object, and not the three components of a ByteArray)
   * ```
   */
  static is(data: any): boolean {
    try {
      CairoByteArray.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::byte_array::ByteArray`
   * @example
   * ```typescript
   * const result = CairoByteArray.isAbiType('core::byte_array::ByteArray');
   * // result = true
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoByteArray.abiSelector;
  }

  /**
   * Read one ByteArray off a contract response, advancing the iterator past it.
   *
   * The felts are consumed in the order a contract emits them : how many complete words follow,
   * those words, then the pending word and its length. The iterator is left on the next value, so
   * successive calls read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this ByteArray
   * @returns {CairoByteArray} the ByteArray that was read
   * @example
   * ```typescript
   * const response = ['0', '310939249775', '5'];
   * const result = CairoByteArray.factoryFromApiResponse(response.values()).decodeUtf8();
   * // result = "Hello"
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoByteArray {
    const data = Array.from({ length: Number(getNext(responseIterator)) }, () =>
      CairoBytes31.factoryFromApiResponse(responseIterator)
    );
    const pending_word = CairoFelt252.factoryFromApiResponse(responseIterator);
    const pending_word_len = CairoUint32.factoryFromApiResponse(responseIterator);
    return new CairoByteArray(data, pending_word, pending_word_len);
  }
}

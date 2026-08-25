/* eslint-disable no-underscore-dangle */
import {
  addHexPrefix,
  buf2hex,
  stringToUint8Array,
  uint8ArrayToBigInt,
  utf8ToUint8Array,
} from '../encode';
import { getNext } from '../num';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { isBuffer, isObject, isString } from '../typed';

/**
 * Does this value spell out the single component of a Cairo `bytes31`?
 *
 * An already built {@link CairoBytes31} answers yes: it is a lone `data` field holding the 31
 * bytes, and that shape is what identifies it. A `CairoByteArray` does not — its own `data` is an
 * array of words, not a byte buffer.
 * @param {unknown} value the value to test
 * @returns {boolean} true when the value owns a `data` field holding a Uint8Array
 * @example
 * ```typescript
 * const result = isBytes31Shape(new CairoBytes31('0x31'));
 * // result = true
 * const result2 = isBytes31Shape({ data: '0x31' });
 * // result2 = false
 * ```
 */
function isBytes31Shape(value: unknown): value is { data: Uint8Array } {
  return (
    isObject(value) && 'data' in value && (value as { data: unknown }).data instanceof Uint8Array
  );
}

/**
 * A Cairo `core::bytes_31::bytes31` : up to 31 bytes, carried in a single felt252.
 *
 * The bytes are held right-aligned in a fixed 31-byte buffer, so the length of the input is not
 * recoverable from the value — `'0x41'` and `'0x0041'` give the same bytes31. Reach for
 * `CairoByteArray` when the byte count has to survive.
 * @example
 * ```typescript
 * // the same five characters, read two ways
 * new CairoBytes31('12345').toHexString(); //      "0x3039"        the number 12345
 * CairoBytes31.fromText('12345').toHexString(); // "0x3132333435"  the text '12345'
 * ```
 */
export class CairoBytes31 {
  /**
   * How many bytes a bytes31 holds, which is also the width of a `ByteArray` word.
   * @example
   * ```typescript
   * const result = CairoBytes31.MAX_BYTE_SIZE;
   * // result = 31
   * ```
   */
  static MAX_BYTE_SIZE = 31 as const;

  /**
   * The bytes, always exactly 31 of them.
   *
   * A shorter input is right-aligned and the leading bytes left at zero, so this buffer does not
   * record how long that input was.
   * @example
   * ```typescript
   * const result = new CairoBytes31('0x41').data.length;
   * // result = 31    (the byte 0x41 sits last, at index 30)
   * ```
   */
  data: Uint8Array;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoBytes31.abiSelector;
   * // result = "core::bytes_31::bytes31"
   * ```
   */
  static abiSelector = 'core::bytes_31::bytes31' as const;

  /**
   * Build from a single value, right-aligned in 31 bytes.
   *
   * A string is read the way calldata reads it : `'0x41'` as the byte 0x41, `'12345'` as the number
   * 12345, anything else as UTF-8 text. A string that spells a number therefore becomes that
   * number, with no error raised — use {@link CairoBytes31.fromText} when the argument is text.
   *
   * A value that is already a CairoBytes31 is adopted as it stands, its bytes copied rather than
   * read a second time.
   * @param {string | Uint8Array | Buffer | CairoBytes31} data the value to carry, 31 bytes at most
   * @throws {Error} when the value needs more than 31 bytes
   * @example
   * ```typescript
   * const result = new CairoBytes31('Hello').toApiRequest();
   * // result = ["310939249775"]
   * ```
   */
  constructor(data: string | Uint8Array | Buffer | unknown) {
    CairoBytes31.validate(data);
    const processedData = CairoBytes31.__processData(data);
    this.data = new Uint8Array(CairoBytes31.MAX_BYTE_SIZE); // ensure data has an exact size
    this.data.set(processedData, CairoBytes31.MAX_BYTE_SIZE - processedData.length);
  }

  /**
   * Turn any accepted input into its bytes, before they are right-aligned by the constructor.
   *
   * The returned length is the length of the input, not 31 : `validate` reads it to decide whether
   * the value fits. An input that is already a CairoBytes31 comes back as a copy of its 31 bytes.
   * @param {Uint8Array | string | Buffer | CairoBytes31} data the value to convert
   * @returns {Uint8Array} the bytes, of whatever length the input implied
   * @throws {Error} when the input is of a type this class does not read
   * @example
   * ```typescript
   * const result = CairoBytes31.__processData('0x4142').length;
   * // result = 2     (where CairoBytes31.__processData('Hello').length is 5)
   * ```
   */
  static __processData(data: Uint8Array | string | Buffer | unknown): Uint8Array {
    if (isString(data)) {
      return stringToUint8Array(data);
    }
    if (isBuffer(data)) {
      return new Uint8Array(data);
    }
    if (data instanceof Uint8Array) {
      return new Uint8Array(data);
    }
    // an already built bytes31, adopted as it is : its bytes have already been decided, so they
    // are copied rather than read again through the string heuristic
    if (isBytes31Shape(data)) {
      return new Uint8Array(data.data);
    }
    throw new Error(
      'Invalid input type for CairoBytes31. Expected string, Buffer, Uint8Array, or CairoBytes31'
    );
  }

  /**
   * Build from text, with no interpretation of what the text looks like.
   *
   * The constructor reads a string the way calldata does — `'0x1a'` as a hexadecimal number,
   * `'12345'` as a decimal one — so a string spelling a number never reaches its UTF-8 branch.
   * Here there is no such ambiguity: the argument is text, and its UTF-8 bytes are the value.
   * @param {string} text the text to encode, 31 bytes max once UTF-8 encoded
   * @returns {CairoBytes31} the text as a bytes31
   * @example
   * ```typescript
   * const result = CairoBytes31.fromText('12345').toHexString();
   * // result = "0x3132333435"     (the text, where the constructor would read the number 0x3039)
   * ```
   */
  static fromText(text: string): CairoBytes31 {
    return new CairoBytes31(utf8ToUint8Array(text));
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = CairoBytes31.fromText('Hello').toApiRequest();
   * // result = ["310939249775"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  /**
   * The 31 bytes read as one big-endian number.
   *
   * The padding zeros weigh nothing, so this is the same number whether the input was `'0x41'` or
   * `'0x0041'`.
   * @returns {bigint} the bytes as a number, 0n when they are all zero
   * @example
   * ```typescript
   * const result = CairoBytes31.fromText('Hello').toBigInt();
   * // result = 310939249775n
   * ```
   */
  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }

  /**
   * Read the bytes back as UTF-8 text, leading zero bytes dropped.
   *
   * Those zeros are the padding that fills the buffer, and nothing tells them apart from a zero
   * byte the caller meant to carry — so a text opening on a NUL does not survive the round trip.
   * Reach for `CairoByteArray` when it has to.
   * @returns {string} the bytes decoded as UTF-8, without their leading zeros
   * @example
   * ```typescript
   * const result = CairoBytes31.fromText('12345').decodeUtf8();
   * // result = "12345"
   * const result2 = new CairoBytes31('12345').decodeUtf8();
   * // result2 = "09"    (the number 12345 is the two bytes 0x30 0x39)
   * ```
   */
  decodeUtf8() {
    // strip leading zeros for decode to avoid leading null characters
    const cutoff = this.data.findIndex((x) => x > 0);
    const pruned = this.data.subarray(cutoff >= 0 ? cutoff : Infinity);
    return new TextDecoder().decode(pruned);
  }

  /**
   * The bytes in hexadecimal.
   *
   * Bare, the leading zeros are dropped, which is the form a node returns for a felt. Padded, all
   * 31 bytes are written out, which is the form a `ByteArray` data word takes.
   * @param {'padded'} [padded] write the 31 bytes in full, leading zeros included
   * @returns {string} the bytes as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoBytes31('Hello').toHexString();
   * // result = "0x48656c6c6f"
   * const result2 = new CairoBytes31('Hello').toHexString('padded');
   * // result2 = "0x000000000000000000000000000000000000000000000000000048656c6c6f"
   * ```
   */
  toHexString(padded?: 'padded') {
    const hex = padded === 'padded' ? buf2hex(this.data) : this.toBigInt().toString(16);
    return addHexPrefix(hex);
  }

  /**
   * Throw unless the value fits in 31 bytes.
   *
   * Length is all it weighs. Deciding it means converting the value first, so an input of a type
   * this class does not read raises from `__processData` instead, with that method's message.
   * @param {Uint8Array | string | Buffer | CairoBytes31} data the value to check
   * @throws {Error} when the value needs more than 31 bytes, or is of an unread type
   * @example
   * ```typescript
   * CairoBytes31.validate('Hello'); // passes
   * CairoBytes31.validate('x'.repeat(32));
   * // throws Error("Data is too long: 32 bytes (max 31 bytes)")
   * ```
   */
  static validate(data: Uint8Array | string | Buffer | unknown): void {
    const byteLength = CairoBytes31.__processData(data).length;
    assert(
      byteLength <= this.MAX_BYTE_SIZE,
      `Data is too long: ${byteLength} bytes (max ${this.MAX_BYTE_SIZE} bytes)`
    );
  }

  /**
   * Can this value be carried by a CairoBytes31?
   *
   * The non-throwing form of {@link CairoBytes31.validate}, so a value of an unread type answers
   * false here just as an over-long one does.
   * @param {Uint8Array | string | Buffer | CairoBytes31} data the value to test
   * @returns {boolean} true when the value fits in a bytes31
   * @example
   * ```typescript
   * const result = CairoBytes31.is('Hello');
   * // result = true
   * const result2 = CairoBytes31.is('x'.repeat(32));
   * // result2 = false
   * ```
   */
  static is(data: Uint8Array | string | Buffer | unknown): boolean {
    try {
      CairoBytes31.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::bytes_31::bytes31`
   * @example
   * ```typescript
   * const result = CairoBytes31.isAbiType('core::bytes_31::bytes31');
   * // result = true
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoBytes31.abiSelector;
  }

  /**
   * Read one bytes31 off a contract response, advancing the iterator past it.
   *
   * One felt is consumed, so successive calls read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this bytes31
   * @returns {CairoBytes31} the bytes31 that was read
   * @example
   * ```typescript
   * const response = ['310939249775'];
   * const result = CairoBytes31.factoryFromApiResponse(response.values()).decodeUtf8();
   * // result = "Hello"
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoBytes31 {
    return new CairoBytes31(getNext(responseIterator));
  }
}

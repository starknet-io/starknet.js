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
import { isBuffer, isString } from '../typed';

export class CairoBytes31 {
  static MAX_BYTE_SIZE = 31 as const;

  data: Uint8Array;

  static abiSelector = 'core::bytes_31::bytes31' as const;

  constructor(data: string | Uint8Array | Buffer | unknown) {
    CairoBytes31.validate(data);
    const processedData = CairoBytes31.__processData(data);
    this.data = new Uint8Array(CairoBytes31.MAX_BYTE_SIZE); // ensure data has an exact size
    this.data.set(processedData, CairoBytes31.MAX_BYTE_SIZE - processedData.length);
  }

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
    throw new Error('Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array');
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

  toApiRequest(): string[] {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }

  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }

  decodeUtf8() {
    // strip leading zeros for decode to avoid leading null characters
    const cutoff = this.data.findIndex((x) => x > 0);
    const pruned = this.data.subarray(cutoff >= 0 ? cutoff : Infinity);
    return new TextDecoder().decode(pruned);
  }

  /**
   * @param padded flag for including leading zeros
   */
  toHexString(padded?: 'padded') {
    const hex = padded === 'padded' ? buf2hex(this.data) : this.toBigInt().toString(16);
    return addHexPrefix(hex);
  }

  static validate(data: Uint8Array | string | Buffer | unknown): void {
    const byteLength = CairoBytes31.__processData(data).length;
    assert(
      byteLength <= this.MAX_BYTE_SIZE,
      `Data is too long: ${byteLength} bytes (max ${this.MAX_BYTE_SIZE} bytes)`
    );
  }

  static is(data: Uint8Array | string | Buffer): boolean {
    try {
      CairoBytes31.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoBytes31.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoBytes31 {
    return new CairoBytes31(getNext(responseIterator));
  }
}

/* eslint-disable no-underscore-dangle */
import { addHexPrefix, buf2hex, stringToUint8Array, uint8ArrayToBigInt } from '../encode';
import { getNext } from '../num';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { isBuffer, isString } from '../typed';
import { CairoType } from './cairoType.interface';

export class CairoBytes31 extends CairoType {
  static MAX_BYTE_SIZE = 31 as const;

  data: Uint8Array;

  static abiSelector = 'core::bytes_31::bytes31' as const;

  constructor(data: string | Uint8Array | Buffer | unknown) {
    super();
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

  toApiRequest(): string[] {
    return addCompiledFlag([this.toDecimalString()]);
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

  toDecimalString() {
    return this.toBigInt().toString(10);
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

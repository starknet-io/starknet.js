/* eslint-disable no-underscore-dangle */
import { addHexPrefix, stringToUint8Array, uint8ArrayToBigInt } from '../encode';
import { getNext } from '../num';
import assert from '../assert';

export class CairoBytes31 {
  static MAX_BYTE_SIZE = 31 as const;

  data: Uint8Array;

  static abiSelector = 'core::bytes_31::bytes31' as const;

  constructor(data: string | Uint8Array | Buffer | unknown) {
    CairoBytes31.validate(data);
    this.data = CairoBytes31.__processData(data);
  }

  static __processData(data: Uint8Array | string | Buffer | unknown): Uint8Array {
    if (typeof data === 'string') {
      return stringToUint8Array(data);
    }
    if (data instanceof Buffer) {
      return new Uint8Array(data);
    }
    if (data instanceof Uint8Array) {
      return new Uint8Array(data);
    }
    throw new Error('Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array');
  }

  toApiRequest(): string[] {
    const compiled = [this.toHexString()];
    Object.defineProperty(compiled, '__compiled__', {
      enumerable: false,
      writable: false,
      value: true,
    });

    return compiled;
  }

  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }

  decodeUtf8() {
    return new TextDecoder().decode(this.data);
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
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

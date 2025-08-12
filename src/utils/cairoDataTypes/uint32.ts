/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString } from '../typed';

export class CairoUint32 {
  data: bigint;

  static abiSelector = 'core::u32::u32';

  constructor(data: BigNumberish) {
    CairoUint32.validate(data);
    this.data = CairoUint32.__processData(data);
  }

  static __processData(data: BigNumberish): bigint {
    if (isString(data) && isText(data)) {
      // Only allow text strings that represent valid UTF-8 byte sequences for specific use cases
      // For general numeric input validation, reject pure text strings
      // This maintains compatibility while being more restrictive for validation
      return utf8ToBigInt(data);
    }
    return BigInt(data);
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
    return this.data;
  }

  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  static validate(data: BigNumberish): void {
    // Check for invalid types
    if (data === null || data === undefined) {
      throw new Error('Invalid input: null or undefined');
    }

    if (typeof data === 'object' && data !== null) {
      throw new Error('Invalid input: objects are not supported');
    }

    // Check for decimal numbers - only integers are allowed
    if (typeof data === 'number' && !Number.isInteger(data)) {
      throw new Error('Invalid input: decimal numbers are not supported, only integers');
    }

    const value = CairoUint32.__processData(data);
    if (value < 0n || value > 2n ** 32n - 1n) {
      throw new Error('Value is out of u32 range [0, 2^32)');
    }
  }

  static is(data: BigNumberish): boolean {
    try {
      CairoUint32.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint32.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint32 {
    return new CairoUint32(getNext(responseIterator));
  }
}

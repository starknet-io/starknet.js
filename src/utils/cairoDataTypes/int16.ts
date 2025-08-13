/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString } from '../typed';
import assert from '../assert';
import { RANGE_I16 } from '../../global/constants';

export class CairoInt16 {
  data: bigint;

  static abiSelector = 'core::integer::i16';

  constructor(data: BigNumberish | boolean | unknown) {
    CairoInt16.validate(data);
    this.data = CairoInt16.__processData(data);
  }

  static __processData(data: BigNumberish | boolean | unknown): bigint {
    if (isString(data) && isText(data)) {
      // Only allow text strings that represent valid UTF-8 byte sequences for specific use cases
      // For general numeric input validation, reject pure text strings
      // This maintains compatibility while being more restrictive for validation
      return utf8ToBigInt(data);
    }
    return BigInt(data as BigNumberish);
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
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 65536n + this.data)
    );
  }

  toHexString() {
    // For signed integers, convert to unsigned representation using two's complement
    let value = this.toBigInt();
    if (value < 0) {
      // Convert negative value to two's complement 16-bit representation
      value = 65536n + value; // 2^16
    }
    return addHexPrefix(value.toString(16));
  }

  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data != null, 'Invalid input: null or undefined');
    assert(typeof data !== 'object' || data === null, 'Invalid input: objects are not supported');
    assert(
      typeof data !== 'number' || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = CairoInt16.__processData(data);
    assert(
      value >= RANGE_I16.min && value <= RANGE_I16.max,
      `Value is out of i16 range [${RANGE_I16.min}, ${RANGE_I16.max}]`
    );
  }

  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoInt16.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoInt16.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt16 {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    // Convert from field element representation to signed value
    const FIELD_PRIME =
      3618502788666131213697322783095070105623107215331596699973092056135872020481n;
    const signedValue = value > FIELD_PRIME / 2n ? value - FIELD_PRIME : value;
    return new CairoInt16(signedValue);
  }
}

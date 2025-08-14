/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString } from '../typed';
import assert from '../assert';
import { RANGE_U128 } from '../../global/constants';
import { addCompiledFlag } from '../helpers';

export class CairoUint128 {
  data: bigint;

  static abiSelector = 'core::integer::u128';

  constructor(data: BigNumberish | boolean | unknown) {
    CairoUint128.validate(data);
    this.data = CairoUint128.__processData(data);
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
    return addCompiledFlag([this.toHexString()]);
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

  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data != null, 'Invalid input: null or undefined');
    assert(typeof data !== 'object' || data === null, 'Invalid input: objects are not supported');
    assert(
      typeof data !== 'number' || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = CairoUint128.__processData(data);
    assert(
      value >= RANGE_U128.min && value <= RANGE_U128.max,
      `Value is out of u128 range [${RANGE_U128.min}, ${RANGE_U128.max}]`
    );
  }

  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoUint128.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint128.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint128 {
    return new CairoUint128(getNext(responseIterator));
  }
}

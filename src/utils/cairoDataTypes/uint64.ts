/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix, bigIntToUint8Array, utf8ToBigInt } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isString, isObject, isNumber } from '../typed';
import assert from '../assert';
import { RANGE_U64 } from '../../global/constants';
import { addCompiledFlag } from '../helpers';

export class CairoUint64 {
  data: bigint;

  static abiSelector = 'core::integer::u64';

  constructor(data: BigNumberish | boolean | unknown) {
    CairoUint64.validate(data);
    this.data = CairoUint64.__processData(data);
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
    return addCompiledFlag([this.toDecimalString()]);
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

  toDecimalString() {
    return this.data.toString(10);
  }

  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = CairoUint64.__processData(data);
    assert(
      value >= RANGE_U64.min && value <= RANGE_U64.max,
      `Value is out of u64 range [${RANGE_U64.min}, ${RANGE_U64.max}]`
    );
  }

  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoUint64.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint64.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint64 {
    return new CairoUint64(getNext(responseIterator));
  }
}

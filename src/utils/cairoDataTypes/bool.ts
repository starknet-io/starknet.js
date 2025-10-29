/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import { addHexPrefix } from '../encode';
import { getNext, isBigNumberish } from '../num';
import { isObject, isNumber } from '../typed';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';

export class CairoBool {
  data: boolean;

  static abiSelector = 'core::bool';

  constructor(data: BigNumberish | boolean | unknown) {
    CairoBool.validate(data);
    this.data = CairoBool.__processData(data);
  }

  static __processData(data: BigNumberish | boolean | unknown): boolean {
    if (typeof data === 'boolean') {
      return data;
    }
    if (isBigNumberish(data)) {
      const numb = BigInt(data);
      if (numb === 0n) return false;
      if (numb === 1n) return true;
    }
    throw new Error('Invalid input for a core::bool');
  }

  toApiRequest(): string[] {
    return addCompiledFlag([this.toDecimalString()]);
  }

  toBoolean() {
    return this.data;
  }

  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString() {
    return addHexPrefix(this.data ? '1' : '0');
  }

  toDecimalString() {
    return this.data ? '1' : '0';
  }

  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers or booleans'
    );
    const value = BigInt(data as BigNumberish | boolean);
    assert(value === 0n || value === 1n, `Only values 0 or 1 are possible in a core::bool`);
  }

  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoBool.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoBool.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoBool {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    return new CairoBool(value);
  }
}

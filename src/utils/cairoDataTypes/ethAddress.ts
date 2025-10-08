/* eslint-disable no-underscore-dangle */
import { BigNumberish, ETH_ADDRESS } from '../../types';
import { addHexPrefix } from '../encode';
import { getNext } from '../num';
import { isObject, isNumber } from '../typed';
import assert from '../assert';
import { RANGE_ETH_ADDRESS } from '../../global/constants';
import { addCompiledFlag } from '../helpers';

export class CairoEthAddress {
  data: bigint;

  static abiSelector = ETH_ADDRESS;

  constructor(data: BigNumberish | boolean | unknown) {
    CairoEthAddress.validate(data);
    this.data = BigInt(data as BigNumberish);
  }

  toApiRequest(): string[] {
    return addCompiledFlag([this.toDecimalString()]);
  }

  toBigInt() {
    return this.data;
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  toDecimalString() {
    return this.data.toString(10);
  }

  static validate(data: BigNumberish | boolean | unknown): void {
    assert(data !== null && data !== undefined, 'Invalid input: null or undefined');
    assert(
      !isObject(data) && !Array.isArray(data),
      'Invalid input: objects are not supported for EthAddress'
    );
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    const value = BigInt(data as BigNumberish);
    assert(
      // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1259
      value >= RANGE_ETH_ADDRESS.min && value <= RANGE_ETH_ADDRESS.max,
      'Validate: EthAddress arg should be in range [0, 2^160-1]'
    );
  }

  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoEthAddress.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoEthAddress.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoEthAddress {
    return new CairoEthAddress(getNext(responseIterator));
  }
}

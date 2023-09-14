/* eslint-disable no-bitwise */
import { BigNumberish, Uint256 } from '../types';
import { addHexPrefix } from './encode';
import { toBigInt } from './num';

/** @deprecated prefer importing from 'types' over 'uint256' */
export type { Uint256 };

export const UINT_128_MAX = (1n << 128n) - 1n;
export const UINT_256_MAX = (1n << 256n) - 1n;

/**
 * Convert Uint256 to bigint
 */
export function uint256ToBN(uint256: Uint256) {
  return (toBigInt(uint256.high) << 128n) + toBigInt(uint256.low);
}

/**
 * Test BigNumberish is smaller or equal 2**256-1
 */
export function isUint256(bn: BigNumberish): boolean {
  return toBigInt(bn) <= UINT_256_MAX;
}

/**
 * Convert BigNumberish (string | number | bigint) to Uint256 (hex)
 */
export function bnToUint256(bn: BigNumberish): Uint256 {
  const bi = toBigInt(bn);
  if (!isUint256(bi)) throw new Error('Number is too large');
  return {
    low: addHexPrefix((bi & UINT_128_MAX).toString(16)),
    high: addHexPrefix((bi >> 128n).toString(16)),
  };
}

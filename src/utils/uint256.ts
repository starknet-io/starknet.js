/* eslint-disable no-bitwise */
import { addHexPrefix } from './encode';
import { BigNumberish, toBigInt } from './num';

// Represents an integer in the range [0, 2^256).
export interface Uint256 {
  // The low 128 bits of the value.
  low: BigNumberish;
  // The high 128 bits of the value.
  high: BigNumberish;
}

// function to convert Uint256 to BN
export function uint256ToBN(uint256: Uint256) {
  return (toBigInt(uint256.high) << 128n) + toBigInt(uint256.low);
}

export const UINT_128_MAX = (1n << 128n) - 1n;
export const UINT_256_MAX = (1n << 256n) - 1n;
// function to check if BN is smaller or equal 2**256-1
export function isUint256(bn: BigNumberish): boolean {
  return toBigInt(bn) <= UINT_256_MAX;
}

// function to convert BN to Uint256 hex
export function bnToUint256(bignumber: BigNumberish): Uint256 {
  const bn = toBigInt(bignumber);
  if (!isUint256(bn)) throw new Error('Number is too large');
  return {
    low: addHexPrefix((bn & UINT_128_MAX).toString(16)),
    high: addHexPrefix((bn >> 128n).toString(16)),
  };
}

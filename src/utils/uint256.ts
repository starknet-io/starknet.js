import { addHexPrefix } from './encode';
import { BigNumberish, toBN } from './number';

// Represents an integer in the range [0, 2^256).
export interface Uint256 {
  // The low 128 bits of the value.
  low: BigNumberish;
  // The high 128 bits of the value.
  high: BigNumberish;
}

// function to convert Uint256 to BN
export function uint256ToBN(uint256: Uint256) {
  return toBN(uint256.high).shln(128).add(toBN(uint256.low));
}

export const UINT_128_MAX = toBN(1).shln(128).sub(toBN(1));
export const UINT_256_MAX = toBN(1).shln(256).sub(toBN(1));
// function to check if BN is smaller or equal 2**256-1
export function isUint256(bn: BigNumberish): boolean {
  return toBN(bn).lte(UINT_256_MAX);
}

// function to convert BN to Uint256
export function bnToUint256(bignumber: BigNumberish): Uint256 {
  const bn = toBN(bignumber);
  if (!isUint256(bn)) throw new Error('Number is too large');
  return {
    low: addHexPrefix(bn.maskn(128).toString(16)),
    high: addHexPrefix(bn.shrn(128).toString(16)),
  };
}

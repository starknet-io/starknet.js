/**
 * Pure Pedersen hash utilities — no calldata dependency
 */
import { BigNumberish } from '../../types';
import { starkCurve } from '../ec';

export function computePedersenHash(a: BigNumberish, b: BigNumberish): string {
  return starkCurve.pedersen(BigInt(a), BigInt(b));
}

/**
 * Compute Pedersen hash from data
 *
 * @param {BigNumberish[]} data Array of data to compute Pedersen hash on
 * @returns {string} hex-string of Pedersen hash
 *
 * @example
 * ```typescript
 * const result = hash.computeHashOnElements(['0xabc', '0x123', '0xabc123'])
 * // result = 0x148141e8f7db29d005a0187669a56f0790d7e8c2c5b2d780e4d8b9e436a5521
 * ```
 */
export function computeHashOnElements(data: BigNumberish[]): string {
  return [...data, data.length]
    .reduce((x: BigNumberish, y: BigNumberish) => starkCurve.pedersen(BigInt(x), BigInt(y)), 0)
    .toString();
}

export const computePedersenHashOnElements = computeHashOnElements;

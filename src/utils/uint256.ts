/* eslint-disable no-bitwise */
import { BigNumberish, Uint256 } from '../types';
import { CairoUint256, UINT_128_MAX, UINT_256_MAX } from './cairoDataTypes/uint256';

/**
 * @deprecated Legacy support Export
 */
export { UINT_128_MAX, UINT_256_MAX };

/**
 * Convert Uint256 to bigint
 * Legacy support Export
 * @param uint256 Uint256 value to convert to bigint
 * @returns {bigint} BigInt representation of the input Uint25
 * @example
 * ```typescript
 * const uint256Value: Uint256 = "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result = uint256ToBN(uint256Value);
 * // result = 28139218908760698114965631183142736658067655190345294133754686837148899816404n
 * ```
 */
export function uint256ToBN(uint256: Uint256) {
  return new CairoUint256(uint256).toBigInt();
}

/**
 * Test BigNumberish is smaller or equal 2**256-1
 * Legacy support Export
 * @param bn BigNumberish value to test
 * @returns {boolean} True if the input value is smaller or equal to 2**256-1, false otherwise
 * @example
 * ```typescript
 * const bnValue: BigNumberish = 28139218908760698114965631183142736658067655190345294133754686837148899816404n;
 * const result = isUint256(bnValue);
 * // result = true
 * ```
 */
export function isUint256(bn: BigNumberish): boolean {
  return CairoUint256.is(bn);
}

/**
 * Convert BigNumberish (string | number | bigint) to Uint256 (hex)
 * Legacy support Export
 * @param bn BigNumberish value to convert to Uint256 (hex)
 * @returns {Uint256} Uint256 (hex) representation of the input BigNumberish value
 * @example
 * ```typescript
 * const bnValue: BigNumberish = 28139218908760698114965631183142736658067655190345294133754686837148899816404n;
 * const result = bnToUint256(bnValue);
 * // result = "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914"
 * ```
 */
export function bnToUint256(bn: BigNumberish): Uint256 {
  return new CairoUint256(bn).toUint256HexString();
}

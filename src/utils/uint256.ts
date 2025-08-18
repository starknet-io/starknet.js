/* eslint-disable no-bitwise */
import { BigNumberish, Uint256 } from '../types';
import { CairoUint256 } from './cairoDataTypes/uint256';

/**
 * Convert Uint256 to bigint
 * Legacy support Export
 * @param {Uint256} uint256 Uint256 value to convert to bigint
 * @returns {bigint} BigInt representation of the input Uint256
 * @example
 * ```typescript
 * const uint256Value: Uint256 = {low: 1234567890, high: 1};
 * const result = uint256.uint256ToBN(uint256Value);
 * // result = 340282366920938463463374607433002779346n
 * ```
 */
export function uint256ToBN(uint256: Uint256): bigint {
  return new CairoUint256(uint256).toBigInt();
}

/**
 * Test BigNumberish is in the range[0, 2**256-1]
 * Legacy support Export
 * @param {BigNumberish} bn value to test
 * @returns {boolean} True if the input value is in the range[0, 2**256-1], false otherwise
 * @example
 * ```typescript
 * const result = uint256.isUint256(12345n);
 * // result = true
 * const result1 = uint256.isUint256(-1);
 * // result1 = false
 * ```
 */
export function isUint256(bn: BigNumberish): boolean {
  return CairoUint256.is(bn);
}

/**
 * Convert BigNumberish (string | number | bigint) to Uint256
 * Legacy support Export
 * @param {BigNumberish} bn value to convert to Uint256
 * @returns {Uint256} Uint256 object representing the BigNumberish value
 * @example
 * ```typescript
 * const result = uint256.bnToUint256(1000000000n);
 * // result = {"low": "0x3b9aca00", "high": "0x0"}
 * ```
 */
export function bnToUint256(bn: BigNumberish): Uint256 {
  return new CairoUint256(bn).toUint256HexString();
}

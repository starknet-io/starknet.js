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
 * const uint256Value: Uint256 = { low: 1234567890, high: 1 };
 * const result = uint256ToBN(uint256Value);
 * // result = 519229685234822890n
 * ```
 */
export function uint256ToBN(uint256: Uint256) {
  return new CairoUint256(uint256).toBigInt();
}

/**
 * Test BigNumberish is in the range[0, 2**256-1]
 * Legacy support Export
 * @param bn BigNumberish value to test
 * @returns {boolean} True if the input value is in the range[0, 2**256-1], false otherwise
 * @example
 * ```typescript
 * const bnValue: BigNumberish = 12345n;
 * const result = isUint256(bnValue);
 * // result = true
 * 
 * const bnValue1: BigNumberish = -1n;
 * const result1 = isUint256(bnValue1);
 * // result = false
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
 * import { uint256 } from "path/to/file";
 * 
 * const bnValue: BigNumberish = -1n;
 * const result = uint256.bnToUint256(bnValue);
 * // Throws Error: bigNumberish is smaller than UINT_256_MIN
 * 
 * const bnValue: BigNumberish = 1000000000n;
 * const result1 = uint256.bnToUint256(bnValue);
 * // result1 = { "high": "0x0", "low": "0x3b9aca00" }
 * ```
 */
export function bnToUint256(bn: BigNumberish): Uint256 {
  return new CairoUint256(bn).toUint256HexString();
}

import * as starknet from 'starknet';

/**
 * Throws if x is not a felt252: a bigint with 0 <= x < P. The range check is the one of
 * `CairoFelt252`.
 * @param {bigint} x the value to check
 * @param {string} label the name of the value, used in the error message
 * @throws {Error} when x is not a bigint, or is outside [0, P)
 * @example
 * ```typescript
 * assertFelt(5n, 'salt');
 * // passes
 * assertFelt(-1n, 'salt');
 * // throws Error("Value -1 is out of felt252 range [0, 3618502788666131213697322783095070105623107215331596699973092056135872020481)")
 * ```
 */
export function assertFelt(x: bigint, label: string): void {
  if (typeof x !== 'bigint') throw new Error(`Falcon512: ${label} is not a felt252`);
  starknet.CairoFelt252.assertRange(x);
}

/**
 * Spellings accepted for a felt252: "0x" and 1 to 64 hex digits, or 1 to 76 decimal digits (P has
 * 76). The caps keep an untrusted signature cheap to reject: 61 huge strings would cost seconds.
 */
const FELT_STRING = /^(0[xX][0-9a-fA-F]{1,64}|[0-9]{1,76})$/;

/**
 * Parses a felt252 given as a bigint, a safe integer, a hex string ("0x…") or a decimal string.
 * The check comes first and refuses what starknet.js would convert without a word ("", " ",
 * "0x", a text, a boolean, an unsafe integer), and a negative number; `CairoFelt252` then converts
 * and checks the range.
 * @param {unknown} value the value to parse
 * @param {string} label the name of the value, used in the error message
 * @returns {bigint} the felt252
 * @throws {Error} when the value is not one of the accepted spellings, or is outside [0, P)
 * @example
 * ```typescript
 * const result = parseFelt('0x1F', 'x');
 * // result = 31n
 * const result2 = parseFelt('31', 'x');
 * // result2 = 31n
 * parseFelt('', 'x');
 * // throws Error("Falcon512: x is not a felt252")
 * ```
 */
export function parseFelt(value: unknown, label: string): bigint {
  const accepted =
    (typeof value === 'bigint' && value >= 0n) ||
    (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0) ||
    (typeof value === 'string' && FELT_STRING.test(value));
  if (!accepted) throw new Error(`Falcon512: ${label} is not a felt252`);
  return new starknet.CairoFelt252(value).toBigInt();
}

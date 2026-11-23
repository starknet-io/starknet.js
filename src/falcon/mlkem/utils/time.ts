// Times of the key exchange: in seconds since 1970-01-01 (UTC), like the timestamps of Starknet.

/**
 * The biggest time accepted, in seconds: 4294967295, in the year 2106. A bigger value is probably
 * in milliseconds, like the result of `Date.now()`.
 */
const MAX_TIME = 0xffffffff;

/**
 * The current time, in seconds since 1970-01-01 (UTC).
 * @returns {number} the current time, in seconds
 * @example
 * ```typescript
 * const result = nowInSeconds();
 * // result = 1795000000 (for example)
 * ```
 */
export function nowInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Checks that a value is a time in seconds since 1970-01-01 (UTC): a whole number from 0 to
 * 4294967295 (the year 2106).
 * @param {unknown} value the value to check
 * @param {string} name the name of the value, for the error message
 * @returns {number} the value
 * @throws {Error} when the value is not such a whole number. For example, a `Date`, or a time in
 * milliseconds like the result of `Date.now()`
 * @example
 * ```typescript
 * const result = checkTime(1798761600, 'validUntil');
 * // result = 1798761600
 * checkTime(Date.now(), 'validUntil');
 * // throws Error('ML-KEM: validUntil must be a time in seconds, from 0 to 4294967295. …')
 * ```
 */
export function checkTime(value: unknown, name: string): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0 || value > MAX_TIME) {
    throw new Error(
      `ML-KEM: ${name} must be a time in seconds, from 0 to ${MAX_TIME}. ` +
        'Note: Date.now() gives milliseconds, so divide it by 1000.'
    );
  }
  return value;
}

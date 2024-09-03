/**
 * Check if a value is a undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} Returns true if the value is a undefined, otherwise returns false.
 * @example
 * ```typescript
 * const result = isUndefined(undefined);
 * // result = true
 *
 * const result2 = isUndefined('existing value');
 * // result2 = false
 * ```
 * @return {boolean} Returns true if the value is undefined, otherwise returns false.
 */
export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined' || value === undefined;
};

/**
 * Check if a value is a number.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} Returns true if the value is a number, otherwise returns false.
 * @example
 * ```typescript
 * const result = isNumber(123);
 * // result = true
 *
 * const result2 = isNumber("123");
 * // result2 = false
 * ```
 * @return {boolean} Returns true if the value is a number, otherwise returns false.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

/**
 * Checks if a given value is of boolean type.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is of boolean type, false otherwise.
 * @example
 * ```typescript
 * const result = isBoolean(true);
 * // result = true
 *
 * const result2 = isBoolean(false);
 * // result2 = false
 * ```
 * @return {boolean} - True if the value is of boolean type, false otherwise.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Test if value is bigint
 *
 * @param value value to test
 * @returns {boolean} true if value is bigint, false otherwise
 * @example
 * ```typescript
 * isBigInt(10n); // true
 * isBigInt(BigInt('10')); // true
 * isBigInt(10); // false
 * isBigInt('10'); // false
 * isBigInt(null); // false
 * ```
 */
export function isBigInt(value: any): value is bigint {
  return typeof value === 'bigint';
}

/**
 * Checks if a given value is a string.
 * @param {unknown} value the value to be checked.
 * @return {boolean} returns true if the value is a string, false otherwise.
 * @example
 * ```typescript
 * const result = shortString.isString("12345");
 * // result = true
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a given value is an object (Object or Array)
 * @param {unknown} item the tested item
 * @returns {boolean}
 * @example
 * ```typescript
 * const result = events.isObject({event: "pending"});
 * // result = true
 * ```
 */
export function isObject(item: unknown | undefined): boolean {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

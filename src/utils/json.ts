import * as json from 'lossless-json';

/**
 * Helper to convert string to number or bigint based on size
 */
const parseIntAsNumberOrBigInt = (str: string) => {
  if (!json.isInteger(str)) return parseFloat(str);
  const num = parseInt(str, 10);
  return Number.isSafeInteger(num) ? num : BigInt(str);
};

/**
 * Convert JSON string to JSON object
 *
 * NOTE: the String() wrapping is used so the behavior conforms to JSON.parse()
 * which can accept simple data types but is not represented in the default typing
 *
 * @param str JSON string
 * @return {object} Parsed json object
 * @example
 * ```typescript
 * const str = '[123, 12.3, 11223344556677889900]';
 * const result = parse(str);
 * // result = [123, 12.3, 11223344556677890048n]
 * ```
 */
export const parse = (str: string): any =>
  json.parse(String(str), undefined, parseIntAsNumberOrBigInt);

/**
 * Convert JSON string to JSON object with all numbers as bigint
 * @param str JSON string
 * @return {object} Parsed json object
 * @example
 * ```typescript
 * const str = '[123, 12.3, 1234567890]';
 * const result = parseAlwaysAsBig(str);
 * // result = [123n, 12.3, 1234567890n]
 * ```
 */
export const parseAlwaysAsBig = (str: string): any =>
  json.parse(String(str), undefined, json.parseNumberAndBigInt);

/**
 * Convert JSON object to JSON string
 *
 * NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
 * which can also return undefined but is not represented in the default typing
 *
 * @param value JSON object
 * @param [replacer] Function that alters the behavior of the stringification process
 * @param [space] Used to insert white space into the output JSON string
 * @param [numberStringifiers] Function used to stringify numbers (returning undefined will delete the property from the object)
 * @return {string} JSON string
 * @example
 * ```typescript
 * const value = [123, 12.3, 1234567890];
 * const result = stringify(value);
 * // result = '[123,12.3,1234567890]'
 * ```
 */
export const stringify = (
  value: unknown,
  replacer?: any,
  space?: string | number | undefined,
  numberStringifiers?: json.NumberStringifier[] | undefined
): string => json.stringify(value, replacer, space, numberStringifiers)!;

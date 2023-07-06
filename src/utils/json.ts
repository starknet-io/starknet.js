// the ts-ignore suppresses an esm to cjs import error that is resolved with bundling
// @ts-ignore
import * as json from 'lossless-json';

const parseIntAsNumberOrBigInt = (x: string) => {
  if (!json.isInteger(x)) return parseFloat(x);
  const v = parseInt(x, 10);
  return Number.isSafeInteger(v) ? v : BigInt(x);
};
// NOTE: the String() wrapping is used so the behaviour conforms to JSON.parse()
// which can accept simple data types but is not represented in the default typing
export const parse = (x: string): any => json.parse(String(x), undefined, parseIntAsNumberOrBigInt);
export const parseAlwaysAsBig = (x: string): any =>
  json.parse(String(x), undefined, json.parseNumberAndBigInt);

// NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
// which can also return undefined but is not represented in the default typing
export const stringify = (
  value: json.JavaScriptValue,
  replacer?: any,
  space?: string | number | undefined,
  numberStringifiers?: json.NumberStringifier[] | undefined
): string => json.stringify(value, replacer, space, numberStringifiers)!;

/** @deprecated equivalent to 'stringify', alias will be removed */
export const stringifyAlwaysAsBig = stringify;

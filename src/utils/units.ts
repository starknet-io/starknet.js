import { RANGE_U8 } from '../global/constants';
import { BigNumberish } from '../types';
import assert from './assert';
import { assertInRange, isBigNumberish, isHex, toBigInt } from './num';
import { isBigInt, isNumber, isString } from './typed';

/**
 * Name an amount in an error message, with the name of its token when there is one.
 * @param {string} [tokenName] name of the token
 * @returns {string} the words that name the amount
 * @example
 * ```typescript
 * amountName('USDC'); // 'USDC amount'
 * amountName(); // 'amount'
 * ```
 */
function amountName(tokenName?: string): string {
  return tokenName ? `${tokenName} amount` : 'amount';
}

/**
 * Check the optional name of a token, written in the error messages.
 * @param {string} [tokenName] name of the token
 * @throws {Error} if the name is not a string, or is empty or made of spaces
 * @example
 * ```typescript
 * checkTokenName('USDC'); // no error
 * checkTokenName(undefined); // no error
 * checkTokenName(' ');
 * // throws Error('the token name is an empty string')
 * ```
 */
function checkTokenName(tokenName?: string): void {
  if (tokenName === undefined) return;
  // TypeScript forbids other types, but plain JavaScript can pass anything
  assert(isString(tokenName), `the token name must be a string, not ${typeof tokenName}`);
  assert(tokenName.trim() !== '', 'the token name is an empty string');
}

/**
 * Check the number of decimals of a token, and return it as a number.
 * @param {BigNumberish} decimals number of decimals: an integer from 0 to 255
 * (the `decimals` of an ERC-20 token is a `u8`)
 * @returns {number} the number of decimals
 * @throws {Error} if `decimals` is not an integer, or is out of [0, 255]
 * @example
 * ```typescript
 * toDecimals(6); // 6
 * toDecimals(18n); // 18, as a contract call returns it
 * toDecimals('0x6'); // 6, as a node returns it
 * toDecimals(256);
 * // throws Error('Value is out of decimals range [0, 255]')
 * ```
 */
function toDecimals(decimals: BigNumberish): number {
  const shown = isString(decimals) ? `'${decimals}'` : String(decimals);
  // isBigNumberish refuses '' (that BigInt reads as 0), true, and a text such as '6.0'
  assert(
    isBigNumberish(decimals) && (!isNumber(decimals) || Number.isInteger(decimals)),
    `decimals must be an integer, not ${shown}`
  );
  assertInRange(decimals, RANGE_U8.min, RANGE_U8.max, 'decimals');
  return Number(decimals);
}

/**
 * Convert a decimal amount, written as text, into an integer in the smallest unit of a token.
 * @param {string} text decimal amount: an optional minus sign, then digits with at most one dot
 * @param {number} decimals number of decimals of the token, already checked
 * @param {string} [tokenName] name of the token, written in the error messages
 * @returns {bigint} the amount in the smallest unit of the token
 * @throws {Error} if `text` is not a decimal amount, or has more than `decimals` decimals,
 * not counting zeros at the end
 * @example
 * ```typescript
 * decimalToInteger('1.5', 6); // 1500000n
 * decimalToInteger('1.50', 1); // 15n: zeros at the end change nothing
 * decimalToInteger('1,5', 6, 'USDC');
 * // throws Error("'1,5' is not a valid USDC amount")
 * ```
 */
function decimalToInteger(text: string, decimals: number, tokenName?: string): bigint {
  // An optional minus sign, then digits with at most one dot: '1', '-1.5', '.5', '1.'
  const match = /^(-?)(\d*)(?:\.(\d*))?$/.exec(text);
  assert(
    match !== null && `${match[2]}${match[3] ?? ''}` !== '',
    `'${text}' is not a valid ${amountName(tokenName)}`
  );
  const [, sign, integer, fraction = ''] = match;
  // A digit other than 0 after the last allowed decimal is a fraction of the smallest unit.
  // Zeros there change nothing: '1.50' with 1 decimal is 1.5.
  // Do not trim the zeros with /0+$/: it is very slow on a long run of zeros.
  const name = tokenName ? ` ${tokenName}` : '';
  const unit = decimals === 1 ? 'decimal' : 'decimals';
  assert(
    !/[1-9]/.test(fraction.slice(decimals)),
    `'${text}'${name} has more than ${decimals} ${unit}`
  );
  // The '0' in front keeps the text non-empty: '.0' with 0 decimals is 0
  const result = BigInt(`0${integer}${fraction.slice(0, decimals).padEnd(decimals, '0')}`);
  // A bigint has no minus zero: '-0' gives 0n
  return sign === '-' ? -result : result;
}

/**
 * Write an amount given in the smallest unit of a token as a decimal amount of the token.
 * @param {BigNumberish} value amount in the smallest unit of the token
 * @param {number} decimals number of decimals of the token, already checked
 * @param {string} [tokenName] name of the token, written in the error messages
 * @returns {string} the decimal amount, with no zero at the end, and no dot without decimals
 * @throws {Error} if `value` is an empty string, or a text that `BigInt` cannot read
 * @example
 * ```typescript
 * integerToDecimal(1500000n, 6); // '1.5'
 * integerToDecimal('0x2710', 6); // '0.01'
 * integerToDecimal(-1n, 6); // '-0.000001'
 * ```
 */
function integerToDecimal(value: BigNumberish, decimals: number, tokenName?: string): string {
  assert(
    !isString(value) || value.trim() !== '',
    `the ${amountName(tokenName)} is an empty string`
  );
  const integer = toBigInt(value);
  // Work on the absolute value: a minus sign would be counted as a digit
  const sign = integer < 0n ? '-' : '';
  const digits = (integer < 0n ? -integer : integer).toString();
  let text;
  if (digits.length <= decimals) {
    text = `0.${digits.padStart(decimals, '0')}`;
  } else {
    text = `${digits.slice(0, digits.length - decimals)}.${digits.slice(digits.length - decimals)}`;
  }
  return sign + text.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');
}

/**
 * Convert strk to fri or fri to strk. Negative amounts are accepted in both directions.
 * For another token, use `parseUnits` and `formatUnits`.
 * @param {string | bigint} amount amount to convert, in the unit given by `symbol`
 * @param {'fri' | 'strk'} symbol unit of `amount`: 'fri' (default) gives strk, 'strk' gives fri
 * @throws {Error} if a strk amount is not a bigint, a hex string or a decimal string
 * (an optional minus sign, then digits with at most one dot)
 * @throws {Error} if a strk amount has more than 18 decimals, not counting zeros at the end
 * (1 strk = 10^18 fri)
 * @throws {Error} if a fri amount is an empty string
 * @example
 * ```typescript
 * units(1000n, 'fri') // '0.000000000000001' strk
 * units('1', 'strk') // '1000000000000000000' fri
 * units(-1n, 'fri') // '-0.000000000000000001' strk
 * ```
 */
export function units(amount: string | bigint, symbol: 'fri' | 'strk' = 'fri') {
  if (symbol === 'strk') {
    // TypeScript forbids other types, but plain JavaScript can pass a number
    assert(
      isBigInt(amount) || isString(amount),
      `the strk amount must be a string or a bigint, not ${typeof amount}`
    );
    // A bigint or a hex string is a whole number of strk
    const text = isBigInt(amount) || isHex(amount) ? toBigInt(amount).toString() : amount;
    return decimalToInteger(text, 18, 'strk').toString();
  }
  return integerToDecimal(amount, 18, 'fri');
}

/**
 * Convert a decimal amount of a token, written as text, into an integer in the smallest unit
 * of the token. With 6 decimals, '1.5' gives 1500000n.
 *
 * Only text is accepted, on purpose:
 * - an amount read on-chain is already in the smallest unit of the token: a bigint from a
 *   contract call, or a hex text from a node. Passed here by mistake, it would be multiplied
 *   by 10^decimals, without an error. To display such an amount, use `formatUnits`.
 * - a JavaScript number can be inexact: `0.1 + 0.2` is `0.30000000000000004`.
 *
 * @param {string} value decimal amount: an optional minus sign, then digits with at most one
 * dot ('1', '-1.5', '.5', '1.')
 * @param {BigNumberish} decimals number of decimals of the token: an integer from 0 to 255
 * @param {string} [tokenName] name of the token, written in the error messages
 * @returns {bigint} the amount in the smallest unit of the token
 * @throws {Error} if `value` is not a decimal amount, or has more than `decimals` decimals,
 * not counting zeros at the end
 * @throws {Error} if `decimals` is not an integer from 0 to 255, or if `tokenName` is empty
 * @example
 * ```typescript
 * parseUnits('1.5', 6); // 1500000n
 * parseUnits('-0.25', 6); // -250000n
 * parseUnits('1.1234567', 6, 'USDC');
 * // throws Error("'1.1234567' USDC has more than 6 decimals")
 * ```
 */
export function parseUnits(value: string, decimals: BigNumberish, tokenName?: string): bigint {
  checkTokenName(tokenName);
  const decimalCount = toDecimals(decimals);
  // TypeScript forbids other types, but plain JavaScript can pass a bigint or a number
  assert(isString(value), `the ${amountName(tokenName)} must be a string, not ${typeof value}`);
  return decimalToInteger(value, decimalCount, tokenName);
}

/**
 * Write an amount given in the smallest unit of a token as a decimal amount of the token.
 * With 6 decimals, 1500000n gives '1.5'. The result has no zero at the end, and no dot when it
 * has no decimals.
 * @param {BigNumberish} value amount in the smallest unit of the token: a bigint (as a contract
 * call returns it), a hex text (as a node returns it), a decimal text or a number
 * @param {BigNumberish} decimals number of decimals of the token: an integer from 0 to 255
 * @param {string} [tokenName] name of the token, written in the error messages
 * @returns {string} the decimal amount
 * @throws {Error} if `value` is an empty string, or is not a number, a bigint or a string
 * @throws {SyntaxError} if `value` is a text that `BigInt` cannot read, such as '1.5'
 * @throws {Error} if `decimals` is not an integer from 0 to 255, or if `tokenName` is empty
 * @example
 * ```typescript
 * formatUnits(1500000n, 6); // '1.5'
 * formatUnits('0x2710', 6); // '0.01'
 * formatUnits(-1500000n, 6, 'USDC'); // '-1.5'
 * formatUnits(10n ** 18n, 18); // '1'
 * ```
 */
export function formatUnits(
  value: BigNumberish,
  decimals: BigNumberish,
  tokenName?: string
): string {
  checkTokenName(tokenName);
  const decimalCount = toDecimals(decimals);
  // TypeScript forbids other types, but plain JavaScript can pass `true`, which BigInt reads as 1
  assert(
    isNumber(value) || isBigInt(value) || isString(value),
    `the ${amountName(tokenName)} must be a number, a bigint or a string, not ${typeof value}`
  );
  return integerToDecimal(value, decimalCount, tokenName);
}

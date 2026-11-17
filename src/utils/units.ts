import { isHex, toBigInt } from './num';
import { isBigInt, isString } from './typed';

/**
 * Convert strk to fri or fri to strk. Negative amounts are accepted in both directions.
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
    if (!isBigInt(amount) && !isString(amount)) {
      throw new Error(`units: a strk amount must be a string or a bigint, not ${typeof amount}`);
    }
    const numStr = isBigInt(amount) || isHex(amount) ? toBigInt(amount).toString() : amount;
    // An optional minus sign, then digits with at most one dot: '1', '-1.5', '.5', '1.'
    const match = /^(-?)(\d*)(?:\.(\d*))?$/.exec(numStr);
    if (!match || `${match[2]}${match[3] ?? ''}` === '') {
      throw new Error(`units: '${numStr}' is not a strk amount`);
    }
    const [, sign, integer, decimal = ''] = match;
    // 1 strk = 10^18 fri: a digit other than 0 after the 18th decimal is a fraction of a fri.
    // Zeros there change nothing: '1.50000000000000000000' is 1.5 strk.
    // Do not trim the zeros with /0+$/: it is very slow on a long run of zeros.
    if (/[1-9]/.test(decimal.slice(18))) {
      throw new Error(`units: '${numStr}' strk has more than 18 decimals`);
    }
    const fri = BigInt(`${integer}${decimal.slice(0, 18).padEnd(18, '0')}`);
    // '-0' gives '0', without a sign
    return fri === 0n ? '0' : `${sign}${fri.toString()}`;
  }

  if (isString(amount) && amount.trim() === '') {
    throw new Error('units: the fri amount is an empty string');
  }
  const fri = toBigInt(amount);
  // Work on the absolute value: a minus sign would be counted as a digit
  const sign = fri < 0n ? '-' : '';
  const bis = (fri < 0n ? -fri : fri).toString();
  let strk;
  if (bis.length <= 18) {
    strk = `0.${bis.padStart(18, '0')}`;
  } else {
    strk = `${bis.slice(0, bis.length - 18)}.${bis.slice(bis.length - 18)}`;
  }

  return sign + strk.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');
}

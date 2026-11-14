import { isHex } from './num';
import { isBigInt, isString } from './typed';

/**
 * Convert strk to fri or fri to strk
 * @throws {Error} if a strk amount has more than 18 decimals (1 strk = 10^18 fri)
 * @example
 * ```typescript
 * units(1000n, 'fri') // '0.000000000000001' strk
 * units('1', 'strk') // '1000000000000000000' fri
 * ```
 */
export function units(amount: string | bigint, simbol: 'fri' | 'strk' = 'fri') {
  if (simbol === 'strk') {
    let numStr = '';
    if (isBigInt(amount)) numStr = amount.toString();
    else if (isString(amount)) {
      if (isHex(amount)) {
        numStr = BigInt(amount).toString();
      } else {
        numStr = amount;
      }
    }

    const [integer, decimal = '0'] = numStr.split('.');
    if (decimal.length > 18) {
      // 1 strk = 10^18 fri, so more decimals can't be expressed in fri
      throw new Error(`units: '${numStr}' strk has more than 18 decimals`);
    }
    const pdec = decimal.padEnd(18, '0');
    // strip leading zeros, but keep the last digit so zero stays '0'
    return `${integer}${pdec}`.replace(/\b0+(?=\d)/g, '');
  }

  const bis = BigInt(amount).toString();
  let strk;
  if (bis.length <= 18) {
    strk = `0.${bis.padStart(18, '0')}`;
  } else {
    strk = `${bis.slice(0, bis.length - 18)}.${bis.slice(bis.length - 18)}`;
  }

  return strk.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');
}

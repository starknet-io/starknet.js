// TODO Convert to CairoFelt base on CairoUint256 and implement it in the codebase in the backward compatible manner

import { BigNumberish, isBigInt, isHex, isStringWholeNumber } from '../num';
import { encodeShortString, isShortString, isText } from '../shortString';

/**
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
 */
export function CairoFelt(it: BigNumberish): string {
  // BN or number
  if (isBigInt(it) || (typeof it === 'number' && Number.isInteger(it))) {
    return it.toString();
  }
  // string text
  if (isText(it)) {
    if (!isShortString(it as string))
      throw new Error(
        `${it} is a long string > 31 chars, felt can store short strings, split it to array of short strings`
      );
    const encoded = encodeShortString(it as string);
    return BigInt(encoded).toString();
  }
  // hex string
  if (typeof it === 'string' && isHex(it)) {
    // toBN().toString
    return BigInt(it).toString();
  }
  // string number (already converted), or unhandled type
  if (typeof it === 'string' && isStringWholeNumber(it)) {
    return it;
  }
  // bool to felt
  if (typeof it === 'boolean') {
    return `${+it}`;
  }

  throw new Error(`${it} can't be computed by felt()`);
}

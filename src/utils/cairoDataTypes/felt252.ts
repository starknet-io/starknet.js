/* eslint-disable max-classes-per-file */
// TODO Convert to CairoFelt base on CairoUint256 and implement it in the codebase in the backward compatible manner

import { BigNumberish, isBigInt, isBoolean, isHex, isStringWholeNumber } from '../num';
import { encodeShortString, isLongText, isShortText, isString } from '../shortString';

type ParseableTypes = BigNumberish | Boolean;
type Numberish = BigInt | number;

export class FeltParseError extends Error {
  constructor(val: ParseableTypes, msg?: string) {
    const message = msg ?? `${val} can't be converted to felt252`;
    super(message);
  }
}

export class CairoFelt252 {
  private felt: string;

  constructor(val: ParseableTypes) {
    if (isBigInt(val) || Number.isInteger(val)) {
      this.felt = this.parseNumberish(val as Numberish);
    } else if (isString(val)) {
      this.felt = this.parseString(val);
    } else if (isBoolean(val)) {
      this.felt = this.parseBoolean(val);
    } else {
      throw new FeltParseError(val);
    }
  }

  private parseNumberish(val: Numberish) {
    return val.toString();
  }

  private parseString(val: string) {
    if (isHex(val)) {
      return BigInt(val).toString();
    }
    if (isShortText(val)) {
      return BigInt(encodeShortString(val)).toString();
    }
    if (isStringWholeNumber(val)) {
      return val;
    }
    if (isLongText(val)) {
      throw new FeltParseError(
        `${val} is a long string > 31 chars. Please split it into an array of short strings.`
      );
    }
    throw new FeltParseError(val);
  }

  private parseBoolean(val: boolean) {
    return `${+val}`;
  }

  get value() {
    return this.felt;
  }
}

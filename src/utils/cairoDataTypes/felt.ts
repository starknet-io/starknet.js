// TODO Convert to CairoFelt base on CairoUint256 and implement it in the codebase in the backward compatible manner

import { BigNumberish } from '../../types';
import { PRIME } from '../../global/constants';
import { isHex, isStringWholeNumber } from '../num';
import { encodeShortString, isShortString, isText } from '../shortString';
import { isBoolean, isString, isBigInt } from '../typed';
import {
  stringToUint8Array,
  bigIntToUint8Array,
  uint8ArrayToBigInt,
  addHexPrefix,
} from '../encode';

/**
 * @deprecated use CairoFelt252 Class instead
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
 */
export function CairoFelt(it: BigNumberish): string {
  // BN or number
  if (isBigInt(it) || Number.isInteger(it)) {
    return it.toString();
  }

  // Handling strings
  if (isString(it)) {
    // Hex strings
    if (isHex(it)) {
      return BigInt(it).toString();
    }
    // Text strings that must be short
    if (isText(it)) {
      if (!isShortString(it)) {
        throw new Error(
          `${it} is a long string > 31 chars. Please split it into an array of short strings.`
        );
      }
      // Assuming encodeShortString returns a hex representation of the string
      return BigInt(encodeShortString(it)).toString();
    }
    // Whole numeric strings
    if (isStringWholeNumber(it)) {
      return it;
    }
  }
  // bool to felt
  if (isBoolean(it)) {
    return `${+it}`;
  }

  throw new Error(`${it} can't be computed by felt()`);
}

/**
 * felt252 is the basic field element used in Cairo.
 * It corresponds to an integer in the range 0 ≤ x < P where P is a very large prime number currently equal to 2^251 + 17⋅2^192 + 1.
 * Any operation that uses felt252 will be computed modulo P.
 * 63 hex symbols (31 bytes + 4 bits), 252 bits
 */
export class CairoFelt252 {
  /**
   * byte representation of the felt252
   */
  data: Uint8Array;

  static abiSelector = 'core::felt252';

  constructor(data: BigNumberish | boolean) {
    // Validate input
    CairoFelt252.validate(data);

    // Handle strings - stringToUint8Array will automatically handle all string types
    if (isString(data)) {
      // Use stringToUint8Array which will:
      // - Detect hex strings (0x prefix) and convert from hex
      // - Detect decimal strings and convert as numbers
      // - Treat everything else as UTF-8 text (including Unicode)
      this.data = stringToUint8Array(data);
    }
    // Handle bigints and numbers
    else if (isBigInt(data)) {
      this.data = bigIntToUint8Array(data);
    } else if (Number.isInteger(data)) {
      this.data = bigIntToUint8Array(BigInt(data));
    }
    // Handle booleans
    else if (isBoolean(data)) {
      this.data = bigIntToUint8Array(BigInt(data ? 1 : 0));
    } else {
      throw new Error(`${data} can't be computed by felt()`);
    }
  }

  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }

  toUnicode() {
    return new TextDecoder().decode(this.data);
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  toApiRequest(): string[] {
    /**
     * DecimalString representation of the felt252
     */
    return [uint8ArrayToBigInt(this.data).toString()];
  }

  static validate(data: BigNumberish | boolean): void {
    let value: bigint;

    // Convert to bigint based on type
    if (isBoolean(data)) {
      value = BigInt(+data);
    } else if (isBigInt(data)) {
      value = data;
    } else if (Number.isInteger(data)) {
      value = BigInt(data);
    } else if (isString(data)) {
      // Try to convert string to bigint
      try {
        if (isHex(data)) {
          value = BigInt(data);
        } else if (isStringWholeNumber(data)) {
          value = BigInt(data);
        } else if (isText(data)) {
          // For text unicode strings, convert to UTF-8 bytes then to bigint
          const bytes = stringToUint8Array(data);
          value = uint8ArrayToBigInt(bytes);
        } else {
          throw new Error(`Invalid felt252 value`);
        }
      } catch {
        throw new Error(`${data} cannot be converted to felt252`);
      }
    } else {
      throw new Error(`${data} is not a valid felt252 type`);
    }

    // Check if value is within the felt252 range (0 ≤ x < PRIME)
    if (value < 0n || value >= PRIME) {
      throw new Error(`Value ${value} is out of felt252 range [0, ${PRIME})`);
    }
  }

  static is(data: BigNumberish | boolean): boolean {
    try {
      CairoFelt252.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  static isAbiType(abiType: string): boolean {
    return abiType === CairoFelt252.abiSelector;
  }
}

import { BigNumberish, Literal } from '../../types';
import { RANGE_STORAGE_ADDRESS } from '../../global/constants';
import { addHexPrefix } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import { isBigInt, isNumber } from '../typed';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { CairoFelt252 } from './felt';

/**
 * A Cairo `core::starknet::storage_access::StorageAddress` : the address of a value in the storage
 * of a contract.
 *
 * On the wire it is a field element like any other, so what this class adds over
 * {@link CairoFelt252} is the bound of the Cairo `StorageAddress` type : [0, 2^251), the same range
 * as the Cairo type of a class hash, and narrower than the field.
 *
 * A number, a bigint, a decimal string and a hexadecimal string are all read as the same number.
 * Text is **not** an accepted input : a storage address spelled as words is a mistake, not a value.
 * @example
 * ```typescript
 * // the same address, reached three ways
 * new CairoStorageAddress('0x1234').toBigInt(); // 4660n
 * new CairoStorageAddress(4660).toBigInt(); //    4660n
 * new CairoStorageAddress('4660').toBigInt(); //  4660n
 * ```
 */
export class CairoStorageAddress {
  /**
   * The address, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoStorageAddress('0x1234').data;
   * // result = 4660n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoStorageAddress.abiSelector;
   * // result = "core::starknet::storage_access::StorageAddress"
   * ```
   */
  static abiSelector = Literal.StorageAddress;

  /**
   * Build from a number or a numeric string, refusing text and anything outside the
   * StorageAddress range.
   * @param {BigNumberish | boolean} data the address to carry, within [0, 2^251 - 1]
   * @throws {Error} when the value is text, a decimal number, not a felt252 input, or out of the StorageAddress range
   * @example
   * ```typescript
   * const result = new CairoStorageAddress('0x1234').toApiRequest();
   * // result = ["4660"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoStorageAddress.validate(data);
    this.data = new CairoFelt252(data).toBigInt();
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoStorageAddress('0x1234').toApiRequest();
   * // result = ["4660"]
   * ```
   */
  toApiRequest(): string[] {
    return addCompiledFlag([this.toBigInt().toString()]);
  }

  /**
   * The address as a number.
   * @returns {bigint} the number this address holds
   * @example
   * ```typescript
   * const result = new CairoStorageAddress('0x1234').toBigInt();
   * // result = 4660n
   * ```
   */
  toBigInt(): bigint {
    return this.data;
  }

  /**
   * The address in hexadecimal, without padding.
   *
   * Leading zeros are dropped, as they are everywhere else in the library.
   * @returns {string} the address as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoStorageAddress(4660).toHexString();
   * // result = "0x1234"
   * const result2 = new CairoStorageAddress('0x0034').toHexString();
   * // result2 = "0x34"     (four digits in, two out)
   * ```
   */
  toHexString(): string {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Throw unless the value can be carried by a StorageAddress.
   *
   * Text is refused first, then a number with a decimal part. A number or a bigint is read as it
   * is, so that a negative one reaches the range check. Anything else is read as a felt252 — which
   * is what refuses a null, an object or an unsupported type. The value is finally checked against
   * the range of the Cairo `StorageAddress` type, [0, 2^251), which is narrower than the field.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is text, a decimal number, not a felt252 input, or out of the StorageAddress range
   * @example
   * ```typescript
   * CairoStorageAddress.validate('0x1234'); // passes
   * CairoStorageAddress.validate('abc');
   * // throws Error("Invalid input: a StorageAddress cannot be built from text")
   * CairoStorageAddress.validate(2n ** 251n);
   * // throws Error("Value is out of StorageAddress range [0, 3618502788666131106986593281521497120414687020801267626233049500247285301247]")
   * CairoStorageAddress.validate(-1);
   * // throws Error("Value is out of StorageAddress range [0, 3618502788666131106986593281521497120414687020801267626233049500247285301247]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(!isText(data), 'Invalid input: a StorageAddress cannot be built from text');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );

    // a number is read here rather than by CairoFelt252, which would refuse a negative one before
    // the range below is checked, and in the words of its encoding rather than of a storage address
    const value =
      isNumber(data) || isBigInt(data) ? BigInt(data) : new CairoFelt252(data).toBigInt();
    assert(
      value >= RANGE_STORAGE_ADDRESS.min && value <= RANGE_STORAGE_ADDRESS.max,
      `Value is out of StorageAddress range [${RANGE_STORAGE_ADDRESS.min}, ${RANGE_STORAGE_ADDRESS.max}]`
    );
  }

  /**
   * Can this value be carried by a StorageAddress?
   *
   * The non-throwing form of {@link CairoStorageAddress.validate}, so it answers false for every
   * input that one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in a StorageAddress
   * @example
   * ```typescript
   * const result = CairoStorageAddress.is('0x1234');
   * // result = true
   * const result2 = CairoStorageAddress.is('abc');
   * // result2 = false     (text, not a number)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoStorageAddress.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::starknet::storage_access::StorageAddress`
   * @example
   * ```typescript
   * const result = CairoStorageAddress.isAbiType(
   *   'core::starknet::storage_access::StorageAddress'
   * );
   * // result = true
   * const result2 = CairoStorageAddress.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoStorageAddress.abiSelector;
  }

  /**
   * Read one StorageAddress off a contract response, advancing the iterator past it.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this address
   * @returns {CairoStorageAddress} the address that was read
   * @example
   * ```typescript
   * const response = ['0x1234'];
   * const result = CairoStorageAddress.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 4660n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoStorageAddress {
    return new CairoStorageAddress(getNext(responseIterator));
  }
}

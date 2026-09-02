import { BigNumberish, Literal } from '../../types';
import { RANGE_CONTRACT_ADDRESS } from '../../global/constants';
import { addHexPrefix } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { CairoFelt252 } from './felt';

/**
 * A Cairo `core::starknet::contract_address::ContractAddress` : the address of a deployed contract.
 *
 * On the wire it is a field element like any other, so what this class adds over
 * {@link CairoFelt252} is the narrower bound an address has : `ADDR_BOUND`, which is what an
 * address is computed modulo and what `validateAndParseAddress` already refuses to exceed. The
 * 252 bits the RPC spec states are looser than both, and never what binds.
 *
 * A number, a bigint, a decimal string and a hexadecimal string are all read as the same number.
 * Text is **not** an accepted input : an address spelled as words is a mistake, not a value.
 * @example
 * ```typescript
 * // the same address, reached three ways
 * new CairoContractAddress('0x1234').toBigInt(); // 4660n
 * new CairoContractAddress(4660).toBigInt(); //    4660n
 * new CairoContractAddress('4660').toBigInt(); //  4660n
 * ```
 */
export class CairoContractAddress {
  /**
   * The address, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoContractAddress('0x1234').data;
   * // result = 4660n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoContractAddress.abiSelector;
   * // result = "core::starknet::contract_address::ContractAddress"
   * ```
   */
  static abiSelector = Literal.ContractAddress;

  /**
   * Build from a number or a numeric string, refusing text and anything wider than 252 bits.
   * @param {BigNumberish | boolean} data the address to carry, within [0, 2^252 - 1]
   * @throws {Error} when the value is text, is not a felt252 input, or is out of range
   * @example
   * ```typescript
   * const result = new CairoContractAddress('0x1234').toApiRequest();
   * // result = ["4660"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoContractAddress.validate(data);
    this.data = new CairoFelt252(data).toBigInt();
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoContractAddress('0x1234').toApiRequest();
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
   * const result = new CairoContractAddress('0x1234').toBigInt();
   * // result = 4660n
   * ```
   */
  toBigInt(): bigint {
    return this.data;
  }

  /**
   * The address in hexadecimal, without padding.
   *
   * The 64 hex digits an address is usually written with are not restored here : leading zeros
   * are dropped, as they are everywhere else in the library.
   * @returns {string} the address as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoContractAddress(4660).toHexString();
   * // result = "0x1234"
   * const result2 = new CairoContractAddress('0x0034').toHexString();
   * // result2 = "0x34"     (four digits in, two out)
   * ```
   */
  toHexString(): string {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Throw unless the value can be carried by a ContractAddress.
   *
   * Text is refused first, then the value is read as a felt252 — which is what refuses a null, an
   * object or an unsupported type — and finally checked against the bound an address has, which
   * is narrower than the field.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is text, is not a felt252 input, or is out of range
   * @example
   * ```typescript
   * CairoContractAddress.validate('0x1234'); // passes
   * CairoContractAddress.validate('abc');
   * // throws Error("Invalid input: a ContractAddress cannot be built from text")
   * CairoContractAddress.validate(2n ** 251n);
   * // throws Error("Value is out of ContractAddress range [0, 3618502788666131106986593281521497120414687020801267626233049500247285300991]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(!isText(data), 'Invalid input: a ContractAddress cannot be built from text');

    const value = new CairoFelt252(data).toBigInt();
    assert(
      value >= RANGE_CONTRACT_ADDRESS.min && value <= RANGE_CONTRACT_ADDRESS.max,
      `Value is out of ContractAddress range [${RANGE_CONTRACT_ADDRESS.min}, ${RANGE_CONTRACT_ADDRESS.max}]`
    );
  }

  /**
   * Can this value be carried by a ContractAddress?
   *
   * The non-throwing form of {@link CairoContractAddress.validate}, so it answers false for every
   * input that one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in a ContractAddress
   * @example
   * ```typescript
   * const result = CairoContractAddress.is('0x1234');
   * // result = true
   * const result2 = CairoContractAddress.is('abc');
   * // result2 = false     (text, not a number)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoContractAddress.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::starknet::contract_address::ContractAddress`
   * @example
   * ```typescript
   * const result = CairoContractAddress.isAbiType(
   *   'core::starknet::contract_address::ContractAddress'
   * );
   * // result = true
   * const result2 = CairoContractAddress.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoContractAddress.abiSelector;
  }

  /**
   * Read one ContractAddress off a contract response, advancing the iterator past it.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this address
   * @returns {CairoContractAddress} the address that was read
   * @example
   * ```typescript
   * const response = ['0x1234'];
   * const result = CairoContractAddress.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 4660n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoContractAddress {
    return new CairoContractAddress(getNext(responseIterator));
  }
}

import { BigNumberish, ETH_ADDRESS } from '../../types';
import { RANGE_ETH_ADDRESS } from '../../global/constants';
import { addHexPrefix } from '../encode';
import { getNext } from '../num';
import { isText } from '../shortString';
import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { CairoFelt252 } from './felt';

/**
 * A Cairo `core::starknet::eth_address::EthAddress` : an Ethereum address, carried in one felt252
 * but only 160 bits wide.
 *
 * On the wire it is a field element like any other, so what this class adds over
 * {@link CairoFelt252} is the narrower bound : an address must fit in 160 bits, and a value past
 * that is refused before any calldata leaves.
 *
 * A number, a bigint, a decimal string and a hexadecimal string are all read as the same number,
 * so the shape of the input does not survive. Text is **not** an accepted input : unlike the other
 * Cairo classes, which take a string that spells no number for its UTF-8 bytes, an address has no
 * meaning as text and refuses it rather than encoding it into a number nobody meant.
 * @example
 * ```typescript
 * // the same address, reached three ways
 * new CairoEthAddress('0x1234').toBigInt(); // 4660n
 * new CairoEthAddress(4660).toBigInt(); //    4660n
 * new CairoEthAddress('4660').toBigInt(); //  4660n
 * ```
 */
export class CairoEthAddress {
  /**
   * The address, always as a bigint.
   * @example
   * ```typescript
   * const result = new CairoEthAddress('0x1234').data;
   * // result = 4660n
   * ```
   */
  data: bigint;

  /**
   * The abi type this class serializes.
   * @example
   * ```typescript
   * const result = CairoEthAddress.abiSelector;
   * // result = "core::starknet::eth_address::EthAddress"
   * ```
   */
  static abiSelector = ETH_ADDRESS;

  /**
   * Build from a number or a numeric string, refusing text and anything wider than 160 bits.
   * @param {BigNumberish | boolean} data the address to carry, within [0, 2^160 - 1]
   * @throws {Error} when the value is text, is not a felt252 input, or is out of the EthAddress range
   * @example
   * ```typescript
   * const result = new CairoEthAddress('0x1234').toApiRequest();
   * // result = ["4660"]
   * ```
   */
  constructor(data: BigNumberish | boolean | unknown) {
    CairoEthAddress.validate(data);
    this.data = new CairoFelt252(data).toBigInt();
  }

  /**
   * Serialize to the single felt a contract call carries.
   * @returns {string[]} one decimal-string felt, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoEthAddress('0x1234').toApiRequest();
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
   * const result = new CairoEthAddress('0x1234').toBigInt();
   * // result = 4660n
   * ```
   */
  toBigInt(): bigint {
    return this.data;
  }

  /**
   * The address in hexadecimal, without padding.
   *
   * The 40 hex digits an Ethereum address is usually written with are not restored here : leading
   * zeros are dropped, as they are everywhere else in the library.
   * @returns {string} the address as a 0x-prefixed hex string
   * @example
   * ```typescript
   * const result = new CairoEthAddress(4660).toHexString();
   * // result = "0x1234"
   * const result2 = new CairoEthAddress('0x0034').toHexString();
   * // result2 = "0x34"     (four digits in, two out)
   * ```
   */
  toHexString(): string {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  /**
   * Throw unless the value can be carried by an EthAddress.
   *
   * Text is refused first, since an address spelled as words is a mistake rather than a value to
   * encode. What remains is read as a felt252 — which is what refuses a null, an object or an
   * unsupported type — then checked against the 160 bits an Ethereum address occupies.
   * @param {BigNumberish | boolean} data the value to check
   * @throws {Error} when the value is text, is not a felt252 input, or is out of the EthAddress range
   * @example
   * ```typescript
   * CairoEthAddress.validate('0x1234'); // passes
   * CairoEthAddress.validate('abc');
   * // throws Error("Invalid input: an EthAddress cannot be built from text")
   * CairoEthAddress.validate(2n ** 160n);
   * // throws Error("Value is out of EthAddress range [0, 1461501637330902918203684832716283019655932542975]")
   * ```
   */
  static validate(data: BigNumberish | boolean | unknown): void {
    assert(!isText(data), 'Invalid input: an EthAddress cannot be built from text');

    const value = new CairoFelt252(data).toBigInt();
    assert(
      value >= RANGE_ETH_ADDRESS.min && value <= RANGE_ETH_ADDRESS.max,
      `Value is out of EthAddress range [${RANGE_ETH_ADDRESS.min}, ${RANGE_ETH_ADDRESS.max}]`
    );
  }

  /**
   * Can this value be carried by an EthAddress?
   *
   * The non-throwing form of {@link CairoEthAddress.validate}, so it answers false for every input
   * that one refuses, whatever the reason.
   * @param {BigNumberish | boolean} data the value to test
   * @returns {boolean} true when the value fits in an EthAddress
   * @example
   * ```typescript
   * const result = CairoEthAddress.is('0x1234');
   * // result = true
   * const result2 = CairoEthAddress.is('abc');
   * // result2 = false     (text, not a number)
   * const result3 = CairoEthAddress.is(2n ** 160n);
   * // result3 = false     (one bit too wide)
   * ```
   */
  static is(data: BigNumberish | boolean | unknown): boolean {
    try {
      CairoEthAddress.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type the one this class serializes?
   * @param {string} abiType the abi type to test
   * @returns {boolean} true for `core::starknet::eth_address::EthAddress`
   * @example
   * ```typescript
   * const result = CairoEthAddress.isAbiType('core::starknet::eth_address::EthAddress');
   * // result = true
   * const result2 = CairoEthAddress.isAbiType('core::felt252');
   * // result2 = false
   * ```
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoEthAddress.abiSelector;
  }

  /**
   * Read one EthAddress off a contract response, advancing the iterator past it.
   *
   * The felts a node returns are hex strings, and one is consumed per call, so successive calls
   * read successive return values.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this address
   * @returns {CairoEthAddress} the address that was read
   * @example
   * ```typescript
   * const response = ['0x1234'];
   * const result = CairoEthAddress.factoryFromApiResponse(response.values()).toBigInt();
   * // result = 4660n
   * ```
   */
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoEthAddress {
    return new CairoEthAddress(getNext(responseIterator));
  }
}

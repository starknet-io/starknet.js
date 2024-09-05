import { keccak } from '@scure/starknet';
import { keccak_256 } from '@noble/hashes/sha3';
import { bytesToHex } from '@noble/curves/abstract/utils';
import { MASK_250 } from '../../constants';
import { BigNumberish } from '../../types';
import { addHexPrefix, removeHexPrefix, utf8ToArray } from '../encode';
import { hexToBytes, isHex, isStringWholeNumber, toHex } from '../num';
import { isBigInt, isNumber } from '../typed';

/**
 * Calculate the hex-string Starknet Keccak hash for a given BigNumberish
 *
 * @param value value to hash
 * @returns hex-string Keccak hash
 * @example
 * ```typescript
 * const result = keccakBn('0xabc');
 * // result = '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
 * ```
 */
export function keccakBn(value: BigNumberish): string {
  const hexWithoutPrefix = removeHexPrefix(toHex(BigInt(value)));
  const evenHex = hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;
  return addHexPrefix(keccak(hexToBytes(addHexPrefix(evenHex))).toString(16));
}

/**
 * [internal]
 * Calculate hex-string Starknet Keccak hash for a given string
 *
 * String -> hex-string Keccak hash
 * @returns format: hex-string
 */
function keccakHex(str: string): string {
  return addHexPrefix(keccak(utf8ToArray(str)).toString(16));
}

/**
 * Calculate the BigInt Starknet Keccak hash for a given string
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L38)
 *
 * @param str value to hash
 * @returns BigInt Keccak hash
 * @example
 * ```typescript
 * const result = starknetKeccak('test').toString();
 * // result = '61835310290161785288773114225739080147441215596947647498723774891619563096'
 * ```
 */
export function starknetKeccak(str: string): bigint {
  const hash = BigInt(keccakHex(str));
  // eslint-disable-next-line no-bitwise
  return hash & MASK_250;
}

/**
 * Calculate the hex-string selector for a given abi function name
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L46)
 *
 * @param funcName abi function name
 * @returns hex-string selector
 * @example
 * ```typescript
 * const result = getSelectorFromName('myFunction');
 * // result = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 * ```
 */
export function getSelectorFromName(funcName: string) {
  // sometimes BigInteger pads the hex string with zeros, which is not allowed in the starknet api
  return toHex(starknetKeccak(funcName));
}

/**
 * Calculate the hex-string selector from a given abi function name or of any representation of number.
 *
 * @param value ascii-string | hex-string | dec-string | number | BigInt
 * @returns hex-string selector
 * @example
 * ```typescript
 * const selector1: string = getSelector("myFunction");
 * // selector1 = "0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8"
 *
 * const selector2: string = getSelector("0x123abc");
 * // selector2 = "0x123abc"
 *
 * const selector3: string = getSelector("123456");
 * // selector3 = "0x1e240"
 *
 * const selector4: string = getSelector(123456n);
 * // selector4 = "0x1e240"
 * ```
 */
export function getSelector(value: string | BigNumberish) {
  if (isNumber(value) || isBigInt(value)) return toHex(value);
  if (isHex(value)) return value;
  if (isStringWholeNumber(value)) return toHex(value);
  return getSelectorFromName(value);
}

/**
 * Solidity hash of an array of uint256
 * @param {BigNumberish[]} params an array of uint256 numbers
 * @returns the hash of the array of Solidity uint256
 * @example
 * ```typescript
 * const result = hash.solidityUint256PackedKeccak256(['0x100', '200', 300, 400n]);
 * // result = '0xd1e6cb422b65269603c491b0c85463295edabebfb2a6844e4fdc389ff1dcdd97'
 * ```
 */
export function solidityUint256PackedKeccak256(params: BigNumberish[]): string {
  const myEncode = addHexPrefix(
    params.reduce(
      (res: string, par: BigNumberish) => res + removeHexPrefix(toHex(par)).padStart(64, '0'),
      ''
    )
  );
  return addHexPrefix(bytesToHex(keccak_256(hexToBytes(myEncode))));
}

/**
 * Calculate the L2 message hash related by a message L1->L2
 * @param {BigNumberish} l1FromAddress L1 account address that paid the message.
 * @param {BigNumberish} l2ToAddress L2 contract address to execute.
 * @param {string | BigNumberish} l2Selector can be a function name ("bridge_withdraw") or a number (BigNumberish).
 * @param {RawCalldata} l2Calldata an array of BigNumberish of the raw parameters passed to the above function.
 * @param {BigNumberish} l1Nonce The nonce of the L1 account.
 * @returns {string} hex-string of the L2 transaction hash
 * @example
 * ```typescript
 * const l1FromAddress = "0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc";
 * const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
 * const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
 * const payload = [
 *     4543560n,
 *    829565602143178078434185452406102222830667255948n,
 *     3461886633118033953192540141609307739580461579986333346825796013261542798665n,
 *     9000000000000000n,
 *     0n,
 * ];
 * const l1Nonce = 8288n;
 * const result = hash.getL2MessageHash(l1FromAddress, l2ToAddress, l2Selector, payload, l1Nonce);
 * // result = "0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090"
 * ```
 */
export function getL2MessageHash(
  l1FromAddress: BigNumberish,
  l2ToAddress: BigNumberish,
  l2Selector: string | BigNumberish,
  l2Calldata: BigNumberish[],
  l1Nonce: BigNumberish
): string {
  return solidityUint256PackedKeccak256([
    l1FromAddress,
    l2ToAddress,
    l1Nonce,
    l2Selector,
    l2Calldata.length,
    ...l2Calldata,
  ]);
}

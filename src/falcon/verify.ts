import * as starknet from 'starknet';
import { parseFelt } from './s2morrow/felt';
import { publicKeyToNtt } from './s2morrow/keys';
import { verifyHash } from './s2morrow/signature';

/**
 * Strict parsing (see `parseFelt`): "", " ", "0x", a text or a boolean is not a message hash.
 * @param {BigNumberish} value the message hash
 * @returns {bigint | undefined} the hash as a bigint, or undefined when it is not a valid felt252
 * @example
 * ```typescript
 * const result = toMessageHash('0x1234');
 * // result = 4660n
 * const result2 = toMessageHash('0x');
 * // result2 = undefined
 * ```
 */
function toMessageHash(value: starknet.BigNumberish): bigint | undefined {
  try {
    return parseFelt(value, 'message hash');
  } catch {
    return undefined;
  }
}

/**
 * Low-level verification, same shape as `ec.starkCurve.verify(signature, msgHash, fullPublicKey)`.
 * @param {Signature} signature the 61 felts of a Falcon-512 signature
 * @param {BigNumberish} msgHash the signed hash (a transaction hash, or the hash of a SNIP-12
 * message)
 * @param {Uint8Array | string} fullPublicKey NIST Falcon-512 public key (897 bytes), as returned by
 * `getPubKey()`
 * @returns {boolean} true for a valid signature of msgHash; false for an invalid or malformed
 * signature, or a malformed hash
 * @throws {Error} when the public key is invalid
 * @example
 * ```typescript
 * const { secretKey, publicKey } = falcon512.generateKeyPair();
 * const mySigner = new Falcon512Signer(secretKey);
 * const signature = await mySigner.signMessage(myTypedData, accountAddress);
 * const msgHash = typedData.getMessageHash(myTypedData, accountAddress);
 * const result = falcon512.verify(signature, msgHash, publicKey);
 * // result = true
 * const result2 = falcon512.verify(signature, '0x1234', publicKey);
 * // result2 = false
 * falcon512.verify(signature, msgHash, '0x1234');
 * // throws Error("Falcon512: public key must have 1794 hex digits, got 4")
 * ```
 */
export function verify(
  signature: starknet.Signature,
  msgHash: starknet.BigNumberish,
  fullPublicKey: Uint8Array | string
): boolean {
  const pkNtt = publicKeyToNtt(fullPublicKey);
  const h = toMessageHash(msgHash);
  if (h === undefined || !Array.isArray(signature)) return false;
  return verifyHash(h, signature, pkNtt);
}

/**
 * Checks a SNIP-12 message signed by a Falcon-512 account. Same shapes as
 * `typedData.verifyMessage`.
 * @param {BigNumberish | TypedData} message a TypedData message, or its hash (SNIP-12)
 * @param {Signature} signature the 61 felts of a Falcon-512 signature
 * @param {Uint8Array | string} fullPublicKey NIST Falcon-512 public key (897 bytes), as returned by
 * `getPubKey()`
 * @param {BigNumberish} [accountAddress] address of the account that signed the message. Needed
 * only when `message` is a TypedData
 * @returns {boolean} true if the message is verified
 * @throws {Error} when `message` is a TypedData and accountAddress is missing, or when the public
 * key is invalid
 * @example
 * ```typescript
 * const signature = await mySigner.signMessage(myTypedData, accountAddress);
 * const msgHash = typedData.getMessageHash(myTypedData, accountAddress);
 * const result1 = falcon512.verifyMessage(myTypedData, signature, publicKey, accountAddress);
 * const result2 = falcon512.verifyMessage(msgHash, signature, publicKey);
 * // result1 = result2 = true
 * ```
 */
export function verifyMessage(
  message: starknet.TypedData,
  signature: starknet.Signature,
  fullPublicKey: Uint8Array | string,
  accountAddress: starknet.BigNumberish
): boolean;
export function verifyMessage(
  message: starknet.BigNumberish,
  signature: starknet.Signature,
  fullPublicKey: Uint8Array | string
): boolean;
export function verifyMessage(
  message: starknet.BigNumberish | starknet.TypedData,
  signature: starknet.Signature,
  fullPublicKey: Uint8Array | string,
  accountAddress?: starknet.BigNumberish
): boolean {
  if (typeof message === 'object' && message !== null) {
    if (accountAddress === undefined) {
      throw new Error('Falcon512: accountAddress is required to verify a TypedData message');
    }
    return verify(
      signature,
      starknet.typedData.getMessageHash(message, accountAddress),
      fullPublicKey
    );
  }
  return verify(signature, message, fullPublicKey);
}

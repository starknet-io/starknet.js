import * as starknet from 'starknet';
import { parseFalconOptions, type Falcon512Options } from './accountType';
import { verifyHashOz } from './oz/signature';
import { PACKED_SLOTS } from './s2morrow/constants';
import { parseFelt } from './s2morrow/felt';
import { publicKeyToNtt } from './s2morrow/keys';
import { unpackPoly } from './s2morrow/packing';
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
 * NTT of the public polynomial h, from a NIST public key or from the 29 felts of a packed key.
 * @param {Uint8Array | string | BigNumberish[]} fullPublicKey the NIST key (897 bytes, or its hex
 * string), or the 29 felts of the packed key
 * @returns {Uint16Array} the 512 values of NTT(h)
 * @throws {Error} when the NIST key is invalid, or the packed key does not have 29 felts, has an
 * invalid felt, or is not canonical
 * @example
 * ```typescript
 * const { publicKey } = falcon512.generateKeyPair();
 * const result = toPkNtt(falcon512.getPackedPublicKey(publicKey));
 * // result = toPkNtt(publicKey) = Uint16Array(512) […]
 * ```
 */
function toPkNtt(
  fullPublicKey: Uint8Array | string | readonly starknet.BigNumberish[]
): Uint16Array {
  if (Array.isArray(fullPublicKey)) {
    if (fullPublicKey.length !== PACKED_SLOTS) {
      throw new Error(`Falcon512: packed public key must have ${PACKED_SLOTS} felts`);
    }
    return unpackPoly(fullPublicKey.map((x, i) => parseFelt(x, `public key[${i}]`)));
  }
  return publicKeyToNtt(fullPublicKey as Uint8Array | string);
}

/**
 * Low-level verification, same shape as `ec.starkCurve.verify(signature, msgHash, fullPublicKey)`.
 * @param {Signature} signature the felts of a Falcon-512 signature: 61 (S2morrow), 60
 * (OpenZeppelin, hint) or 31 (OpenZeppelin, direct)
 * @param {BigNumberish} msgHash the signed hash (a transaction hash, or the hash of a SNIP-12
 * message)
 * @param {Uint8Array | string | BigNumberish[]} fullPublicKey the public key: the NIST Falcon-512
 * key (897 bytes, as returned by `getPubKey()`), or the 29 felts of the packed key (as returned by
 * `getPackedPublicKey()`, or by `get_public_key` of an OpenZeppelin account)
 * @param {Falcon512Options} [options] `accountType`: the signature layout to check, `'s2morrow'`
 * (default), `'oz-hint'` or `'oz-direct'`
 * @returns {boolean} true for a valid signature of msgHash in this layout; false for an invalid or
 * malformed signature, a signature in another layout, or a malformed hash
 * @throws {Error} when the public key or an option is invalid
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
 * const myOzSigner = new Falcon512Signer(secretKey, { accountType: 'oz-hint' });
 * const ozSignature = await myOzSigner.signMessage(myTypedData, accountAddress);
 * const result3 = falcon512.verify(ozSignature, msgHash, myOzSigner.getPackedPublicKey(), {
 *   accountType: 'oz-hint',
 * });
 * // result3 = true
 * falcon512.verify(signature, msgHash, '0x1234');
 * // throws Error("Falcon512: public key must have 1794 hex digits, got 4")
 * ```
 */
export function verify(
  signature: starknet.Signature,
  msgHash: starknet.BigNumberish,
  fullPublicKey: Uint8Array | string | readonly starknet.BigNumberish[],
  options?: Falcon512Options
): boolean {
  const accountType = parseFalconOptions(options);
  const pkNtt = toPkNtt(fullPublicKey);
  const h = toMessageHash(msgHash);
  if (h === undefined || !Array.isArray(signature)) return false;
  switch (accountType) {
    case 'oz-hint':
      return verifyHashOz(h, signature, pkNtt, 'hint');
    case 'oz-direct':
      return verifyHashOz(h, signature, pkNtt, 'direct');
    default: // 's2morrow'
      return verifyHash(h, signature, pkNtt);
  }
}

/**
 * Checks a SNIP-12 message signed by a Falcon-512 account. Same shapes as
 * `typedData.verifyMessage`, with the options of `falcon512.verify` at the end.
 * @param {BigNumberish | TypedData} message a TypedData message, or its hash (SNIP-12)
 * @param {Signature} signature the felts of a Falcon-512 signature: 61 (S2morrow), 60
 * (OpenZeppelin, hint) or 31 (OpenZeppelin, direct)
 * @param {Uint8Array | string | BigNumberish[]} fullPublicKey the NIST Falcon-512 key (897 bytes,
 * as returned by `getPubKey()`), or the 29 felts of the packed key
 * @param {BigNumberish} accountAddress address of the account that signed the message, required
 * when `message` is a TypedData. With a hash, there is no address: the options come in its place
 * @param {Falcon512Options} [options] `accountType`, as for `falcon512.verify`
 * @returns {boolean} true if the message is verified
 * @throws {Error} when `message` is a TypedData and the account address is missing, or when the
 * public key or an option is invalid
 * @example
 * ```typescript
 * const signature = await mySigner.signMessage(myTypedData, accountAddress);
 * const msgHash = typedData.getMessageHash(myTypedData, accountAddress);
 * const result1 = falcon512.verifyMessage(myTypedData, signature, publicKey, accountAddress);
 * const result2 = falcon512.verifyMessage(msgHash, signature, publicKey);
 * // result1 = result2 = true
 * const ozSignature = await myOzSigner.signMessage(myTypedData, accountAddress);
 * const options = { accountType: 'oz-direct' } as const;
 * const result3 = falcon512.verifyMessage(myTypedData, ozSignature, publicKey, accountAddress, options);
 * const result4 = falcon512.verifyMessage(msgHash, ozSignature, publicKey, options);
 * // result3 = result4 = true (myOzSigner built with { accountType: 'oz-direct' })
 * ```
 */
export function verifyMessage(
  message: starknet.TypedData,
  signature: starknet.Signature,
  fullPublicKey: Uint8Array | string | readonly starknet.BigNumberish[],
  accountAddress: starknet.BigNumberish,
  options?: Falcon512Options
): boolean;
export function verifyMessage(
  message: starknet.BigNumberish,
  signature: starknet.Signature,
  fullPublicKey: Uint8Array | string | readonly starknet.BigNumberish[],
  options?: Falcon512Options
): boolean;
export function verifyMessage(
  message: starknet.BigNumberish | starknet.TypedData,
  signature: starknet.Signature,
  fullPublicKey: Uint8Array | string | readonly starknet.BigNumberish[],
  accountAddressOrOptions?: starknet.BigNumberish | Falcon512Options,
  options?: Falcon512Options
): boolean {
  if (typeof message === 'object' && message !== null) {
    if (accountAddressOrOptions === undefined) {
      throw new Error('Falcon512: accountAddress is required to verify a TypedData message');
    }
    const accountAddress = accountAddressOrOptions as starknet.BigNumberish;
    return verify(
      signature,
      starknet.typedData.getMessageHash(message, accountAddress),
      fullPublicKey,
      options
    );
  }
  // With a hash, a 4th argument that is not an options object is ignored, as before.
  const hashOptions =
    typeof accountAddressOrOptions === 'object' &&
    accountAddressOrOptions !== null &&
    !Array.isArray(accountAddressOrOptions)
      ? accountAddressOrOptions
      : undefined;
  return verify(signature, message, fullPublicKey, hashOptions);
}

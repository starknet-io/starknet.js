import {
  getPublicKey,
  getStarkKey as getStarkKeyNoble,
  sign as signNoble,
  utils,
  verify as verifyNoble,
} from '@noble/curves/stark';

import { MAX_ECDSA_VAL, ZERO } from '../../constants';
import { addHexPrefix, buf2hex, sanitizeHex } from '../encode';
import { BigNumberish, assertInRange, toHex } from '../number';

export * as starkCurve from './ecAdaptNoble';
export * as weierstrass from '@noble/curves/abstract/weierstrass';

// here the 8 methods with V4 interface

/**
 * class that handle a key pair private/public.
 * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
 */
export class KeyPair {
  private readonly privateKey: bigint;

  private publicKey: bigint;

  constructor(privKey: BigNumberish) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !privKey
      ? (this.privateKey = BigInt(buf2hex(utils.randomPrivateKey())))
      : (this.privateKey = BigInt(privKey));

    this.publicKey =
      BigInt(privKey) === 0n
        ? 0n
        : BigInt(addHexPrefix(buf2hex(getPublicKey(toHex(this.privateKey)))));
  }

  /**
   * get full public key
   * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
   * @param enc - optional. if 'hex' returns hex string, else returns a numString
   * @returns an Hex string with `0x04` prefix, or a numString.
   */
  public getPublic(enc?: string): string {
    if (enc === 'hex') {
      return toHex(this.publicKey);
    }
    return this.publicKey.toString();
  }

  /**
   *
   * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
   */
  public setPublic(pubK: BigNumberish) {
    this.publicKey = BigInt(pubK);
  }

  /**
   * get private key
   * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
   * @param enc - optional. if 'hex' returns hex string, else returns a numString
   * @returns an Hex string with `0x` prefix, or a numString.
   */
  public getPrivate(enc?: string): string {
    if (enc === 'hex') {
      return toHex(this.privateKey);
    }
    return this.privateKey.toString();
  }
}

/**
 * get a key pair from a private key
 * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
 * @param pk - private key
 * @returns key pair
 */
export function getKeyPair(pk: BigNumberish): KeyPair {
  return new KeyPair(BigInt(pk));
}

/**
 * get a key pair from a random private key
 * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
 * @returns key pair
 */
export const genKeyPair = getKeyPair(addHexPrefix(buf2hex(utils.randomPrivateKey())));

/**
 * get the Starknet public key, from a KeyPair.
 * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
 * @param keyPair
 * @returns a Starknet public key (only X part of the 512 bits public key, without HEAD)
 */
export function getStarkKey(keyPair: KeyPair): string {
  // this method needs to be run to generate the .pub property used below
  // the result can be dumped
  return sanitizeHex(getStarkKeyNoble(keyPair.getPrivate('hex')));
}

/**
 * Takes a public key and casts it into `elliptic` KeyPair format.
 * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
 * @param publicKey - public key which should get casted to a KeyPair
 * @returns keyPair with public key only, which can be used to verify signatures, but cant sign anything
 */
export function getKeyPairFromPublicKey(publicKey: BigNumberish): KeyPair {
  const keyPair = new KeyPair('0x00');
  keyPair.setPublic(BigInt(publicKey));
  return keyPair;
}

/**
 * Signs a message using the provided key.
 *
 * @deprecated Only for migration V4 -> V5. Do not use in new code using V5 onwards.
 * @param keyPair should be an KeyPair with a valid private key.
 * @returns a Signature.
 */
export function sign(keyPair: KeyPair, msgHash: string): string {
  const msgHashBi = BigInt(addHexPrefix(msgHash));
  // Verify message hash has valid length.
  assertInRange(msgHashBi, ZERO, BigInt(addHexPrefix(MAX_ECDSA_VAL)), 'msgHash');
  return signNoble(msgHash, keyPair.getPrivate('hex')).toDERHex();
}

/**
 * Verifies a message using the provided key.
 * @deprecated Only for migration V4 -> V5.
 * Do not use in new code using V5 onwards.
 * Replaced by {@link TBD }
 * @param keyPair should be an KeyPair with a valid public key.
 * @param sig should be an Signature.
 * @returns true if the verification succeeds.
 */
export function verify(
  keyPair: KeyPair | KeyPair[],
  msgHash: string,
  sig: string | string[]
): boolean {
  const keyPairArray = Array.isArray(keyPair) ? keyPair : [keyPair];
  const sigArray = Array.isArray(sig) ? sig : [sig];
  const msgHashBi = BigInt(addHexPrefix(msgHash));
  if (sig.length % 2 !== 0) throw new Error('Signature must be an array of length dividable by 2');
  assertInRange(msgHashBi, ZERO, BigInt(addHexPrefix(MAX_ECDSA_VAL)), 'msgHash');
  if (keyPairArray.length !== sigArray.length)
    throw new Error('Signature and keyPair length must be equal');
  return sigArray.every((singleSignature, i) => {
    return verifyNoble(singleSignature, msgHash, keyPairArray[i].getPublic('hex')) ?? false;
  });
}

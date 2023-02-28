import { Hex } from '@noble/curves/abstract/utils';
import { SignatureType } from '@noble/curves/abstract/weierstrass';
import {
  CURVE,
  getPublicKey as getPublicKeyNoble,
  verify as verifyNoble,
} from '@noble/curves/stark';

import { addHexPrefix, buf2hex, sanitizeHex } from '../encode';
import { BigNumberish, toHex } from '../number';

/**
 * Verifies a message using the provided public key
 * @param signature - signature of the hashed message
 * @param msgHash - Hash of the message
 * @param pubKey - public key. 512 bits full public key or 256 bits compressed (Starknet, without 0x02 or 0x03 head)
 * @returns true if the message is verified
 */
export function verify(signature: SignatureType | Hex, msgHash: Hex, pubKey: Hex): boolean {
  // adapted because Noble verify() do not handle Starknet public key.

  /**
   * y² = x³ + ax + b: Short weierstrass curve formula
   * @returns y²
   */
  function weierstrassEquation(x: bigint): bigint {
    const { a, b } = CURVE;
    return x * x * x + a * x + b;
  }

  function isValidFieldElement(num: bigint): boolean {
    return CURVE.Fp.ZERO < num && num < CURVE.Fp.ORDER; // 0 is banned since it's not invertible FE
  }

  const pubKeyHex = typeof pubKey === 'string' ? sanitizeHex(pubKey) : sanitizeHex(buf2hex(pubKey));
  if (pubKeyHex.slice(2, 4) === '04') {
    // full public key (512 bits)
    return verify(signature, msgHash, pubKeyHex);
  }
  const x = BigInt(pubKeyHex);
  if (!isValidFieldElement(x))
    throw new Error('Public key provided not valid : Point is not on curve');
  const y2 = weierstrassEquation(x); // y² = x³ + ax + b
  const y = CURVE.Fp.sqrt(y2); // y = y² ^ (p+1)/4
  const yneg = CURVE.Fp.neg(y); // to use if HEAD and y do not have same parity
  // HEAD (0x02 or 0x03) is unknown (not provided by Starknet).
  // So both solutions (y and neg y) have to try to verify the result.
  // if one succeeds, verification is TRUE.
  // eslint-disable-next-line prefer-template
  const pubKeySolution1 = '0x040' + x.toString(16) + '0' + y.toString(16);
  // eslint-disable-next-line prefer-template
  const pubKeySolution2 = '0x040' + x.toString(16) + '0' + yneg.toString(16);

  const verif1 = verifyNoble(signature, msgHash, pubKeySolution1);
  const verif2 = verifyNoble(signature, msgHash, pubKeySolution2);
  return verif1 || verif2;
}

/**
 * Provides a hex public key, from a Hex private key.
 * @param privKey - private key, on 32 bytes.
 * @param isCompressed - optional format of key. Normaly not used with Starknet.
 * @returns Hex string of the full public key (64 bytes), with 0x prefix.
 */
export function getPublicKey(privKey: BigNumberish, isCompressed = false): string {
  // adapted due to Uint8Array return from Noble getPublicKey.
  const privKeyHex = toHex(BigInt(privKey));
  return addHexPrefix(buf2hex(getPublicKeyNoble(privKeyHex, isCompressed)));
}

export {
  getSharedSecret,
  sign,
  CURVE,
  ProjectivePoint,
  Signature,
  utils,
  grindKey,
  getStarkKey,
  ethSigToPrivate,
  getAccountPath,
} from '@noble/curves/stark';

import { getPublicKey } from '@scure/starknet';
import type { BigNumberish } from '../types';
import { addHexPrefix, buf2hex } from './encode';

// TODO rename
export * as starkCurve from '@scure/starknet';
export * as weierstrass from '@noble/curves/abstract/weierstrass';

/**
 * get the hex string of the full public key related to a Starknet private key.
 * @param {BigNumberish} privateKey a 252 bits private key.
 * @returns {string} an hex string of a 520 bit number, representing the full public key related to `privateKey`.
 * @example
 * ```typescript
 * const result = ec.getFullPublicKey("0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535");
 * // result = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf"
 * ```
 */
export function getFullPublicKey(privateKey: BigNumberish): string {
  const privKey = addHexPrefix(BigInt(privateKey).toString(16));
  const fullPrivKey = addHexPrefix(buf2hex(getPublicKey(privKey, false)));
  return fullPrivKey;
}

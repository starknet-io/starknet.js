import { secp256k1 } from '@noble/curves/secp256k1';

import { buf2hex, sanitizeHex } from './encode';

/**
 * Get random Ethereum private Key.
 * @returns an Hex string
 * @example
 * const myPK: string = randomAddress()
 * // result = "0xf04e69ac152fba37c02929c2ae78c9a481461dda42dbc6c6e286be6eb2a8ab83"
 */
export function ethRandomPrivateKey(): string {
  return sanitizeHex(buf2hex(secp256k1.utils.randomPrivateKey()));
}

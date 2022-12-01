import elliptic from 'elliptic';
import hashJS from 'hash.js';
import assert from 'minimalistic-assert';

import { CONSTANT_POINTS, EC_ORDER, FIELD_PRIME, MAX_ECDSA_VAL, ONE, ZERO } from '../constants';
import { KeyPair, Signature } from '../types';
import { addHexPrefix, removeHexPrefix, sanitizeBytes } from './encode';
import { BigNumberish, assertInRange, toBN, toHex } from './number';

const { ec: EC, curves } = elliptic;

export const ec = new EC(
  new curves.PresetCurve({
    type: 'short',
    prime: null,
    p: FIELD_PRIME,
    a: '00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000001',
    b: '06f21413 efbe40de 150e596d 72f7a8c5 609ad26c 15c915c1 f4cdfcb9 9cee9e89',
    n: EC_ORDER,
    hash: hashJS.sha256,
    gRed: false,
    g: CONSTANT_POINTS[1],
  })
);

/**
 * The function _truncateToN in lib/elliptic/ec/index.js does a shift-right of 4 bits
 * in some cases. This function does the opposite operation so that
 * _truncateToN(fixMessage(msg)) == msg.
 *
 * @param msg
 */
function fixMessage(msg: string) {
  const pureHex = msg.replace(/^0x0*/, '');

  if (pureHex.length <= 62) {
    // In this case, pureHex should not be transformed, as the byteLength() is at most 31,
    // so delta < 0 (see _truncateToN).
    return pureHex;
  }
  assert(pureHex.length === 63);
  // In this case delta will be 4 so we perform a shift-left of 4 bits by adding a ZERO_BN.
  return `${pureHex}0`;
}

export const genKeyPair = ec.genKeyPair.bind(ec);

export function getKeyPair(pk: BigNumberish): KeyPair {
  const pkBn = toBN(pk);
  return ec.keyFromPrivate(removeHexPrefix(toHex(pkBn)), 'hex');
}

export function getStarkKey(keyPair: KeyPair): string {
  // this method needs to be run to generate the .pub property used below
  // the result can be dumped
  keyPair.getPublic(true, 'hex');
  return addHexPrefix(sanitizeBytes((keyPair as any).pub.getX().toString(16), 2));
}

/**
 * Takes a public key and casts it into `elliptic` KeyPair format.
 *
 * @param publicKey - public key which should get casted to a KeyPair
 * @returns keyPair with public key only, which can be used to verify signatures, but cant sign anything
 */
export function getKeyPairFromPublicKey(publicKey: BigNumberish): KeyPair {
  const publicKeyBn = toBN(publicKey);
  return ec.keyFromPublic(removeHexPrefix(toHex(publicKeyBn)), 'hex');
}

/**
 * Signs a message using the provided key.
 *
 * @param keyPair should be an KeyPair with a valid private key.
 * @returns an Signature.
 */
export function sign(keyPair: KeyPair, msgHash: string): Signature {
  const msgHashBN = toBN(addHexPrefix(msgHash));
  // Verify message hash has valid length.
  assertInRange(msgHashBN, ZERO, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'msgHash');
  const msgSignature = keyPair.sign(fixMessage(msgHash));
  const { r, s } = msgSignature;
  const w = s.invm((ec as any).n);
  // Verify signature has valid length.
  assertInRange(r, ONE, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'r');
  assertInRange(s, ONE, toBN(addHexPrefix(EC_ORDER)), 's');
  assertInRange(w, ONE, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'w');
  return [r.toString(), s.toString()];
}

function chunkArray(arr: any[], n: number): any[][] {
  return Array(Math.ceil(arr.length / n))
    .fill('')
    .map((_, i) => arr.slice(i * n, i * n + n));
}

/**
 * Verifies a message using the provided key.
 *
 * @param keyPair should be an KeyPair with a valid public key.
 * @param sig should be an Signature.
 * @returns true if the verification succeeds.
 */
export function verify(keyPair: KeyPair | KeyPair[], msgHash: string, sig: Signature): boolean {
  const keyPairArray = Array.isArray(keyPair) ? keyPair : [keyPair];
  const msgHashBN = toBN(addHexPrefix(msgHash));
  assert(sig.length % 2 === 0, 'Signature must be an array of length dividable by 2');
  assertInRange(msgHashBN, ZERO, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'msgHash');
  assert(keyPairArray.length === sig.length / 2, 'Signature and keyPair length must be equal');

  return chunkArray(sig, 2).every(([r, s], i) => {
    const rBN = toBN(r);
    const sBN = toBN(s);
    const w = sBN.invm((ec as any).n);
    assertInRange(rBN, ONE, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'r');
    assertInRange(sBN, ONE, toBN(addHexPrefix(EC_ORDER)), 's');
    assertInRange(w, ONE, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'w');
    return ec.verify(fixMessage(msgHash), { r: rBN, s: sBN }, keyPairArray[i]) ?? false;
  });
}

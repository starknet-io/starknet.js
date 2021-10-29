import { ec as EC, curves } from 'elliptic';
import hashJS from 'hash.js';
import assert from 'minimalistic-assert';

import { CONSTANT_POINTS, EC_ORDER, FIELD_PRIME, MAX_ECDSA_VAL, ONE, ZERO } from './constants';
import { addHexPrefix, removeHexPrefix, sanitizeBytes } from './utils/encode';
import { BigNumberish, assertInRange, toBN, toHex } from './utils/number';

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

/*
 The function _truncateToN in lib/elliptic/ec/index.js does a shift-right of 4 bits
 in some cases. This function does the opposite operation so that
   _truncateToN(fixMessage(msg)) == msg.
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

export function getKeyPair(pk: BigNumberish): EC.KeyPair {
  const pkBn = toBN(pk);
  return ec.keyFromPrivate(removeHexPrefix(toHex(pkBn)), 'hex');
}

export function getStarkKey(keyPair: EC.KeyPair): string {
  // this method needs to be run to generate the .pub property used below
  // the result can be dumped
  keyPair.getPublic(true, 'hex');
  return addHexPrefix(sanitizeBytes((keyPair as any).pub.getX().toString(16), 2));
}

/*
 Signs a message using the provided key.
 key should be an KeyPair with a valid private key.
 Returns an Signature.
*/
export function sign(keyPair: EC.KeyPair, msgHash: string): EC.Signature {
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
  return msgSignature;
}

/*
   Verifies a message using the provided key.
   key should be an KeyPair with a valid public key.
   msgSignature should be an Signature.
   Returns a boolean true if the verification succeeds.
  */
export function verify(keyPair: EC.KeyPair, msgHash: string, sig: EC.Signature): boolean {
  const msgHashBN = toBN(addHexPrefix(msgHash));
  assertInRange(msgHashBN, ZERO, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'msgHash');
  const { r, s } = sig;
  const w = s.invm(ec.n!);
  // Verify signature has valid length.
  assertInRange(r, ONE, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'r');
  assertInRange(s, ONE, toBN(addHexPrefix(EC_ORDER)), 's');
  assertInRange(w, ONE, toBN(addHexPrefix(MAX_ECDSA_VAL)), 'w');

  return keyPair.verify(msgHash, sig);
}

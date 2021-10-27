import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import hashJS from 'hash.js';
import { ec as EC, curves } from 'elliptic';
import { sanitizeBytes } from 'enc-utils';
import assert from 'assert';
import { CONSTANT_POINTS, EC_ORDER, FIELD_PRIME, MAX_ECDSA_VAL } from './constants';
import { ensureNo0x, ensure0x } from './utils';

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

export const getKeyPair = (pk: string | BigNumberish): EC.KeyPair => {
  const pkBn = BigNumber.from(pk);
  return ec.keyFromPrivate(ensureNo0x(pkBn.toHexString()), 'hex');
};

export const getStarkKey = (keyPair: EC.KeyPair): string => {
  // this method needs to be run to generate the .pub property used below
  // the result can be dumped
  keyPair.getPublic(true, 'hex');
  return ensure0x(sanitizeBytes((keyPair as any).pub.getX().toString(16), 2));
};

const constantPoints = CONSTANT_POINTS.map((coords: string[]) =>
  ec.curve.point(coords[0], coords[1])
);
const shiftPoint = constantPoints[0];

export function pedersen(input: [BigNumberish, BigNumberish]) {
  let point = shiftPoint;
  for (let i = 0; i < input.length; i += 1) {
    let x = BigNumber.from(input[i]);
    assert(
      x.gte(BigNumber.from(0)) && x.lt(BigNumber.from(ensure0x(FIELD_PRIME))),
      `Invalid input: ${input[i]}`
    );
    for (let j = 0; j < 252; j += 1) {
      const pt = constantPoints[2 + i * 252 + j];
      assert(!point.getX().eq(pt.getX()));
      if (x.and(BigNumber.from(1)).toNumber() !== 0) {
        point = point.add(pt);
      }
      x = x.shr(1);
    }
  }
  return ensure0x(point.getX().toString(16));
}

/*
 Asserts input is equal to or greater then lowerBound and lower then upperBound.
 Assert message specifies inputName.
 input, lowerBound, and upperBound should be of type BN.
 inputName should be a string.
*/
function assertInRange(
  input: BigNumber,
  lowerBound: BigNumber,
  upperBound: BigNumber,
  inputName = ''
) {
  const messageSuffix = inputName === '' ? 'invalid length' : `invalid ${inputName} length`;
  assert(input.gte(lowerBound) && input.lt(upperBound), `Message not signable, ${messageSuffix}.`);
}

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

/*
 Signs a message using the provided key.
 key should be an KeyPair with a valid private key.
 Returns an Signature.
*/
export function sign(keyPair: EC.KeyPair, msgHash: string): EC.Signature {
  const msgHashBN = BigNumber.from(ensure0x(msgHash));
  // Verify message hash has valid length.
  assertInRange(msgHashBN, BigNumber.from(0), BigNumber.from(ensure0x(MAX_ECDSA_VAL)), 'msgHash');
  const msgSignature = keyPair.sign(fixMessage(msgHash));
  const { r, s } = msgSignature;
  const w = s.invm((ec as any).n);
  // Verify signature has valid length.
  assertInRange(
    BigNumber.from(ensure0x(r.toString('hex'))),
    BigNumber.from(1),
    BigNumber.from(ensure0x(MAX_ECDSA_VAL)),
    'r'
  );
  assertInRange(
    BigNumber.from(ensure0x(s.toString('hex'))),
    BigNumber.from(1),
    BigNumber.from(ensure0x(EC_ORDER)),
    's'
  );
  assertInRange(
    BigNumber.from(ensure0x(w.toString('hex'))),
    BigNumber.from(1),
    BigNumber.from(ensure0x(MAX_ECDSA_VAL)),
    'w'
  );
  return msgSignature;
}

/*
   Verifies a message using the provided key.
   key should be an KeyPair with a valid public key.
   msgSignature should be an Signature.
   Returns a boolean true if the verification succeeds.
  */
export function verify(keyPair: EC.KeyPair, msgHash: string, sig: EC.Signature): boolean {
  const msgHashBN = BigNumber.from(ensure0x(msgHash));
  assertInRange(msgHashBN, BigNumber.from(0), BigNumber.from(ensure0x(MAX_ECDSA_VAL)), 'msgHash');
  const { r, s } = sig;
  const w = s.invm(ec.n!);
  // Verify signature has valid length.
  assertInRange(
    BigNumber.from(r.toString()),
    BigNumber.from(1),
    BigNumber.from(ensure0x(MAX_ECDSA_VAL)),
    'r'
  );
  assertInRange(
    BigNumber.from(s.toString()),
    BigNumber.from(1),
    BigNumber.from(ensure0x(EC_ORDER)),
    's'
  );
  assertInRange(
    BigNumber.from(w.toString()),
    BigNumber.from(1),
    BigNumber.from(ensure0x(MAX_ECDSA_VAL)),
    'w'
  );

  return keyPair.verify(msgHash, sig);
}

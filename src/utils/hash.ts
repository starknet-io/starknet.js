import BN from 'bn.js';
import { keccak256 } from 'ethereum-cryptography/keccak';
import assert from 'minimalistic-assert';

import { CONSTANT_POINTS, FIELD_PRIME, MASK_250, ONE, ZERO } from '../constants';
import { ec } from './ellipticCurve';
import { addHexPrefix, buf2hex, utf8ToArray } from './encode';
import { BigNumberish, toBN } from './number';

function keccakHex(value: string): string {
  return addHexPrefix(buf2hex(keccak256(utf8ToArray(value))));
}

/**
 * Function to get the starknet keccak hash from a string
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)
 * @param value - string you want to get the starknetKeccak hash from
 * @returns starknet keccak hash as BigNumber
 */
export function starknetKeccak(value: string): BN {
  return toBN(keccakHex(value)).and(MASK_250);
}

const constantPoints = CONSTANT_POINTS.map((coords: string[]) =>
  ec.curve.point(coords[0], coords[1])
);

export function pedersen(input: [BigNumberish, BigNumberish]) {
  let point = constantPoints[0];
  for (let i = 0; i < input.length; i += 1) {
    let x = toBN(input[i]);
    assert(x.gte(ZERO) && x.lt(toBN(addHexPrefix(FIELD_PRIME))), `Invalid input: ${input[i]}`);
    for (let j = 0; j < 252; j += 1) {
      const pt = constantPoints[2 + i * 252 + j];
      assert(!point.getX().eq(pt.getX()));
      if (x.and(ONE).toNumber() !== 0) {
        point = point.add(pt);
      }
      x = x.shrn(1);
    }
  }
  return addHexPrefix(point.getX().toString(16));
}

export function hashCalldata(calldata: string[]): string {
  const calldataCopy = [...calldata];
  if (calldataCopy.length === 0) {
    return '0';
  }
  if (calldataCopy.length === 1) {
    return calldataCopy[0];
  }
  // calldata element will always be there as it was checked by an if statement before (!)
  const calldataEl = calldataCopy.shift()!;
  return pedersen([hashCalldata(calldataCopy), calldataEl]);
}

export function hashMessage(
  account: string,
  to: string,
  selector: string,
  calldata: string[],
  nonce: string
) {
  const hash0 = pedersen([account, to]);
  const hash1 = pedersen([hash0, selector]);
  const calldataHash = hashCalldata(calldata);
  const hash2 = pedersen([hash1, calldataHash]);
  return pedersen([hash2, nonce]);
}

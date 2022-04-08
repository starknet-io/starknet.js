import BN from 'bn.js';
import { keccak256 } from 'ethereum-cryptography/keccak';
import assert from 'minimalistic-assert';

import { CONSTANT_POINTS, FIELD_PRIME, MASK_250, ONE, ZERO } from '../constants';
import { Call } from '../types';
import { ec } from './ellipticCurve';
import { addHexPrefix, buf2hex, utf8ToArray } from './encode';
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBN, toHex } from './number';
import { encodeShortString } from './shortString';

export const transactionPrefix = encodeShortString('StarkNet Transaction');
export const transactionVersion = 0;
export const feeTransactionVersion = toBN(2).pow(toBN(128)).add(toBN(transactionVersion));

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

/**
 * Function to get the hex selector from a given function name
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)
 * @param funcName - selectors abi function name
 * @returns hex selector of given abi function name
 */
export function getSelectorFromName(funcName: string) {
  // sometimes BigInteger pads the hex string with zeros, which isnt allowed in the starknet api
  return toHex(starknetKeccak(funcName));
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

export function computeHashOnElements(data: BigNumberish[]) {
  return [...data, data.length].reduce((x, y) => pedersen([x, y]), 0).toString();
}

export function hashMulticall(
  account: string,
  transactions: Call[],
  nonce: string,
  maxFee: string,
  version: string | number = transactionVersion
) {
  const hashArray = transactions
    .map(({ contractAddress, entrypoint, calldata }) => [
      contractAddress,
      getSelectorFromName(entrypoint),
      computeHashOnElements(calldata || []),
    ])
    .map(bigNumberishArrayToDecimalStringArray)
    .map(computeHashOnElements);

  return computeHashOnElements([
    transactionPrefix,
    account,
    computeHashOnElements(hashArray),
    nonce,
    maxFee,
    version,
  ]);
}

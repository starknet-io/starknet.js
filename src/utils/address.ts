/* eslint-disable no-bitwise */
import { hexToBytes } from '@noble/curves/abstract/utils';

import { ADDR_BOUND, ZERO } from '../constants';
import { BigNumberish } from '../types';
import { addHexPrefix, removeHexPrefix } from './encode';
import { keccakBn } from './hash';
import { assertInRange, toHex } from './num';

export function addAddressPadding(address: BigNumberish): string {
  return addHexPrefix(removeHexPrefix(toHex(address)).padStart(64, '0'));
}

export function validateAndParseAddress(address: BigNumberish): string {
  assertInRange(address, ZERO, ADDR_BOUND - 1n, 'Starknet Address');

  const result = addAddressPadding(address);

  if (!result.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    throw new Error('Invalid Address Format');
  }

  return result;
}

// from https://github.com/ethers-io/ethers.js/blob/fc1e006575d59792fa97b4efb9ea2f8cca1944cf/packages/address/src.ts/index.ts#L12
export function getChecksumAddress(address: BigNumberish): string {
  const chars = removeHexPrefix(validateAndParseAddress(address)).toLowerCase().split('');
  const hex = removeHexPrefix(keccakBn(address));
  const hashed = hexToBytes(hex.padStart(64, '0'));

  for (let i = 0; i < chars.length; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 0x0f) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }

  return addHexPrefix(chars.join(''));
}

export function validateChecksumAddress(address: string): boolean {
  return getChecksumAddress(address) === address;
}

/* eslint-disable no-bitwise */
import { arrayify } from '@ethersproject/bytes';

import { MASK_251, ZERO } from '../constants';
import { addHexPrefix, removeHexPrefix } from './encode';
import { pedersen } from './hash';
import { BigNumberish, assertInRange, toBN, toHex } from './number';

export function addAddressPadding(address: BigNumberish): string {
  return addHexPrefix(removeHexPrefix(toHex(toBN(address))).padStart(64, '0'));
}

export function validateAndParseAddress(address: BigNumberish): string {
  assertInRange(address, ZERO, MASK_251, 'Starknet Address');

  const result = addAddressPadding(address);

  if (!result.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    throw new Error('Invalid Address Format');
  }

  return result;
}

// from https://github.com/ethers-io/ethers.js/blob/fc1e006575d59792fa97b4efb9ea2f8cca1944cf/packages/address/src.ts/index.ts#L12
export function getChecksumAddress(address: BigNumberish): string {
  const chars = removeHexPrefix(validateAndParseAddress(address)).toLowerCase().split('');
  const hashed = arrayify(pedersen([0, address]), { hexPad: 'left' }); // as the hash will be 251 bits (63 chars) we need to pad it to 64 chars without changing the number value ("left")

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

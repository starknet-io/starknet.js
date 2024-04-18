/* eslint-disable no-bitwise */
import { hexToBytes } from '@noble/curves/abstract/utils';

import { ADDR_BOUND, ZERO } from '../constants';
import { BigNumberish } from '../types';
import { addHexPrefix, removeHexPrefix } from './encode';
import { keccakBn } from './hash';
import { assertInRange, toHex } from './num';

/**
 * Format a hex number to '0x' and 64 characters, adding leading zeros if necessary.
 * @param {BigNumberish} address
 * @returns {string} Hex string : 0x followed by 64 characters. No upper case characters in the response.
 */
export function addAddressPadding(address: BigNumberish): string {
  return addHexPrefix(removeHexPrefix(toHex(address)).padStart(64, '0'));
}

/**
 * Check the validity of a Starknet address, and format it as a hex number : '0x' and 64 characters, adding leading zeros if necessary.
 * @param {BigNumberish} address
 * @returns {string} Hex string : 0x followed by 64 characters. No upper case characters in the response.
 */
export function validateAndParseAddress(address: BigNumberish): string {
  assertInRange(address, ZERO, ADDR_BOUND - 1n, 'Starknet Address');

  const result = addAddressPadding(address);

  if (!result.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    throw new Error('Invalid Address Format');
  }

  return result;
}

/**
 * Computes the checksum address for the given Ethereum address.
 *
 * From https://github.com/ethers-io/ethers.js/blob/fc1e006575d59792fa97b4efb9ea2f8cca1944cf/packages/address/src.ts/index.ts#L12
 * @param {BigNumberish} address - The Ethereum address to compute the checksum for.
 *
 * @returns {string} The checksum address.
 */
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

/**
 * If the casing of an address is mixed, it is a Checksum Address, which uses a specific pattern of uppercase and lowercase letters within
 * a given address to reduce the risk of errors introduced from typing an address or cut and paste issues.
 *
 * @param address string
 *
 * @returns true if the ChecksumAddress is valid
 */
export function validateChecksumAddress(address: string): boolean {
  return getChecksumAddress(address) === address;
}

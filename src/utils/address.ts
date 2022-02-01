import { MASK_251, ZERO } from '../constants';
import { addHexPrefix, removeHexPrefix } from './encode';
import { assertInRange } from './number';

export function addAddressPadding(address: string): string {
  return addHexPrefix(removeHexPrefix(address).padStart(64, '0'));
}

export function validateAndParseAddress(address: string): string {
  if (typeof address !== 'string') {
    throw new Error('Invalid Address Type');
  }

  assertInRange(address, ZERO, MASK_251, 'Starknet Address');

  const result = addAddressPadding(address);

  if (!result.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    throw new Error('Invalid Address Format');
  }

  return result;
}

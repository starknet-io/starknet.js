import { addHexPrefix, removeHexPrefix } from './encode';

export function validateAndParseAddress(address: string): string {
  let result = null;
  if (typeof address !== 'string') {
    throw new Error('Invalid Address Type');
  }

  if (address.match(/^(0x)?[0-9a-fA-F]{63, 64}$/)) {
    throw new Error('Invalid Address Format');
  }

  result = addHexPrefix(removeHexPrefix(address).padStart(64, '0'));

  return result;
}

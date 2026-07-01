import { blake2s } from '@noble/hashes/blake2.js';
import { config } from '../../global/config';

export default function blakeHash(uint8Array: Uint8Array): Uint8Array {
  return config.get('blake')?.(uint8Array) || blake2s(uint8Array, { dkLen: 32 });
}

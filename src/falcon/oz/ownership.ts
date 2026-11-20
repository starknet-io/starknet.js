// Key change of the OpenZeppelin Falcon-512 accounts (OpenZeppelin Contracts for Cairo
// v4.1.0-rc.0, `set_public_key`): the hash that the new key signs to accept the account.
import * as starknet from 'starknet';
import { PACKED_SLOTS } from '../s2morrow/constants';
import { parseFelt } from '../s2morrow/felt';

/**
 * Hash that the new key signs to accept a key change of an OpenZeppelin Falcon-512 account:
 * Poseidon('StarkNet Message', 'accept_ownership', account address, Poseidon(current key)).
 * It holds no chain id, nonce or expiry (as in OpenZeppelin): an acceptance is not single-use.
 * @param {BigNumberish} accountAddress the address of the account
 * @param {BigNumberish[]} currentPublicKey the 29 felts of the key that the account holds now, or
 * none
 * @returns {string} the hash to sign, as a hex string
 * @throws {Error} when the current key has neither 29 felts nor none, or a value is not a felt252
 * @example
 * ```typescript
 * const result = ownershipAcceptanceHash(CairoBytes31.fromText('FALCON_MIGRATION').toBigInt(), []);
 * // result = '0x4cd1d8e37687d438b941364f25ae8c1d3198903239a23dd49add4f3c250a61b'
 * // (the value of the OpenZeppelin reference data, migration_fixture.cairo)
 * ```
 */
export function ownershipAcceptanceHash(
  accountAddress: starknet.BigNumberish,
  currentPublicKey: readonly starknet.BigNumberish[]
): string {
  if (
    !Array.isArray(currentPublicKey) ||
    (currentPublicKey.length !== PACKED_SLOTS && currentPublicKey.length !== 0)
  ) {
    throw new Error('Falcon512: current public key must have 29 felts, or none');
  }
  const address = parseFelt(accountAddress, 'account address');
  const key = currentPublicKey.map((x, i) => parseFelt(x, `current public key[${i}]`));
  const { computePoseidonHashOnElements } = starknet.hash;
  return computePoseidonHashOnElements([
    starknet.CairoBytes31.fromText('StarkNet Message').toBigInt(),
    starknet.CairoBytes31.fromText('accept_ownership').toBigInt(),
    address,
    computePoseidonHashOnElements(key),
  ]);
}

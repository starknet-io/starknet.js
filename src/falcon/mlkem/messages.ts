import * as starknet from 'starknet';

// The two SNIP-12 messages of the ML-KEM key exchange:
// - Alice signs the first one, to link her ML-KEM public key to her account.
// - Bob signs the second one, to sign the capsule that he sends to Alice. The capsule is what
//   FIPS 203 and noble call the "cipher text": 1088 bytes that hold the shared secret. Only the
//   ML-KEM secret key of Alice can open it.
// The side that checks a signature builds the message again, from the data that it receives and
// with the same function. So both sides get the same message, and the same hash.

/** Name of the SNIP-12 domain of the two messages. */
export const DOMAIN_NAME = 'ML-KEM key exchange';

/** Version of the SNIP-12 domain. If the two messages change, this version must change too. */
export const DOMAIN_VERSION = '1';

/** The ML-KEM variant. The message of Alice shows it. */
const ALGORITHM = 'ML-KEM-768';

/**
 * The domain of the two messages: its type and its values, as SNIP-12 revision 1 defines them.
 * The function builds new objects at each call. So if a caller changes one message, the other
 * message does not change.
 * @param {string} chainId the chain id, as `provider.getChainId()` returns it
 * @returns {{ type: StarknetType[]; domain: StarknetDomain }} the type and the values of the domain
 * @example
 * ```typescript
 * const result = messageDomain(constants.StarknetChainId.SN_SEPOLIA);
 * // result = { type: [{ name: 'name', type: 'shortstring' }, …],
 * //   domain: { name: 'ML-KEM key exchange', version: '1', chainId: '0x534e5f5345504f4c4941',
 * //     revision: '1' } }
 * ```
 */
function messageDomain(chainId: string): {
  type: starknet.StarknetType[];
  domain: starknet.StarknetDomain;
} {
  return {
    type: [
      { name: 'name', type: 'shortstring' },
      { name: 'version', type: 'shortstring' },
      { name: 'chainId', type: 'shortstring' },
      { name: 'revision', type: 'shortstring' },
    ],
    domain: {
      name: DOMAIN_NAME,
      version: DOMAIN_VERSION,
      chainId,
      revision: starknet.TypedDataRevision.ACTIVE,
    },
  };
}

/**
 * The message that Alice signs after `createKey`. It tells Bob that this ML-KEM key belongs to the
 * account of Alice. Alice signs it with `signMessage(typedData, aliceAddress)`: her address is part
 * of what she signs, so the message does not repeat it.
 * @param {string} chainId the chain id, as `provider.getChainId()` returns it
 * @param {string} keyHash the hash of the ML-KEM public key of Alice, from `hashBytes`
 * @param {number} validUntil the end of validity of the key, in seconds since 1970-01-01 (UTC)
 * @returns {TypedData} the SNIP-12 message (revision 1)
 * @example
 * ```typescript
 * const result = publicKeyMessage(constants.StarknetChainId.SN_SEPOLIA, keyHash, 1798761600);
 * // result = {
 * //   types: { StarknetDomain: […], MlKemPublicKey: […] },
 * //   primaryType: 'MlKemPublicKey',
 * //   domain: { name: 'ML-KEM key exchange', version: '1', chainId: '0x534e…', revision: '1' },
 * //   message: { Algorithm: 'ML-KEM-768', 'Key hash': keyHash, 'Valid until': 1798761600 },
 * // }
 * ```
 */
export function publicKeyMessage(
  chainId: string,
  keyHash: string,
  validUntil: number
): starknet.TypedData {
  const { type, domain } = messageDomain(chainId);
  return {
    types: {
      StarknetDomain: type,
      MlKemPublicKey: [
        { name: 'Algorithm', type: 'shortstring' },
        { name: 'Key hash', type: 'felt' },
        { name: 'Valid until', type: 'timestamp' },
      ],
    },
    primaryType: 'MlKemPublicKey',
    domain,
    message: { Algorithm: ALGORITHM, 'Key hash': keyHash, 'Valid until': validUntil },
  };
}

/**
 * The message that Bob signs after `encapsulate`. It tells Alice that the capsule comes from Bob.
 * Bob signs it with `signMessage(typedData, bobAddress)`: his address is part of what he signs, so
 * the message does not repeat it.
 * @param {string} chainId the chain id, as `provider.getChainId()` returns it
 * @param {BigNumberish} keyOwnerAddress the address of the account of Alice, which owns the ML-KEM
 * key
 * @param {string} keyHash the hash of the ML-KEM public key of Alice, from `hashBytes`
 * @param {string} capsuleHash the hash of the capsule, from `hashBytes`
 * @param {number} timestamp the time of `encapsulate`, in seconds since 1970-01-01 (UTC)
 * @returns {TypedData} the SNIP-12 message (revision 1)
 * @example
 * ```typescript
 * const result = capsuleMessage(chainId, aliceAddress, keyHash, capsuleHash, 1795000000);
 * // result = {
 * //   types: { StarknetDomain: […], MlKemCapsule: […] },
 * //   primaryType: 'MlKemCapsule',
 * //   domain: { name: 'ML-KEM key exchange', version: '1', chainId, revision: '1' },
 * //   message: { 'Key owner': '0x…', 'Key hash': keyHash, 'Capsule hash': capsuleHash,
 * //     Timestamp: 1795000000 },
 * // }
 * ```
 */
export function capsuleMessage(
  chainId: string,
  keyOwnerAddress: starknet.BigNumberish,
  keyHash: string,
  capsuleHash: string,
  timestamp: number
): starknet.TypedData {
  const { type, domain } = messageDomain(chainId);
  return {
    types: {
      StarknetDomain: type,
      MlKemCapsule: [
        { name: 'Key owner', type: 'ContractAddress' },
        { name: 'Key hash', type: 'felt' },
        { name: 'Capsule hash', type: 'felt' },
        { name: 'Timestamp', type: 'timestamp' },
      ],
    },
    primaryType: 'MlKemCapsule',
    domain,
    message: {
      'Key owner': starknet.num.toHex(keyOwnerAddress),
      'Key hash': keyHash,
      'Capsule hash': capsuleHash,
      Timestamp: timestamp,
    },
  };
}

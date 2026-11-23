import { hkdf } from '@noble/hashes/hkdf.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { randomBytes } from '@noble/hashes/utils.js';
import * as starknet from 'starknet';
import { ml_kem768 } from '../engine/engine';
import { parseFelt } from '../s2morrow/felt';
import { capsuleMessage, DOMAIN_NAME, DOMAIN_VERSION, publicKeyMessage } from './messages';
import type {
  MlKemEncapsulation,
  MlKemKey,
  MlKemSignedCapsule,
  MlKemSignedKey,
} from './mlkem.type';
import { checkSignature } from './signatures';
import { checkBytes, hashBytes } from './utils/bytes';
import { checkTime, nowInSeconds } from './utils/time';

// The ML-KEM key exchange, in three steps:
// 1. Alice calls `createKey`. She keeps the seed secret. She signs the message with her account,
//    then she publishes her public key with the signature.
// 2. Bob calls `encapsulate`. It checks the signature of Alice. Then it gives Bob the shared
//    secret and a capsule. Bob signs the message with his account, then he sends the capsule to
//    Alice with the signature.
// 3. Alice calls `decapsulate`. It checks the signature of Bob. Then it opens the capsule, and it
//    gives Alice the same shared secret as Bob.
// A wallet only signs the two messages, with `signMessage`: it needs nothing new.

// Sizes of ML-KEM-768, in bytes (FIPS 203).
const PUBLIC_KEY_SIZE = 1184;
const CAPSULE_SIZE = 1088;
const SEED_SIZE = 64;
const SHARED_SECRET_SIZE = 32;

/**
 * The final shared secret. ML-KEM gives Alice and Bob a secret of 32 bytes. HKDF (with SHA-256)
 * mixes this secret with the context of the exchange: the chain, the two accounts, the key and the
 * capsule. So Alice and Bob get the same final secret only when they agree on all of them.
 * For example, if Mallory signs the capsule of Bob in her own name, Alice and Bob get two
 * different secrets. So Bob cannot read what Alice sends to Mallory, and Alice cannot take a
 * message of Bob for a message of Mallory.
 * @param {Uint8Array} mlKemSecret the secret that ML-KEM gives (32 bytes)
 * @param {object} context the context of the exchange: the chain id, the address of the account
 * of Alice (`keyOwnerAddress`), the address of the account of Bob (`senderAddress`), the hash of
 * the key and the hash of the capsule
 * @returns {Uint8Array} the final shared secret (32 bytes)
 * @example
 * ```typescript
 * const result = finalSecret(mlKemSecret, {
 *   chainId,
 *   keyOwnerAddress: aliceAddress,
 *   senderAddress: bobAddress,
 *   keyHash,
 *   capsuleHash,
 * });
 * // result = Uint8Array(32) [ … ]
 * ```
 */
function finalSecret(
  mlKemSecret: Uint8Array,
  context: {
    chainId: string;
    keyOwnerAddress: bigint;
    senderAddress: bigint;
    keyHash: string;
    capsuleHash: string;
  }
): Uint8Array {
  const contextHash = starknet.hash.computePoseidonHashOnElements([
    starknet.CairoBytes31.fromText(DOMAIN_NAME).toBigInt(),
    starknet.CairoBytes31.fromText(DOMAIN_VERSION).toBigInt(),
    context.chainId,
    context.keyOwnerAddress,
    context.senderAddress,
    context.keyHash,
    context.capsuleHash,
  ]);
  // HKDF takes the context as bytes: the 32 bytes of the hash of the context.
  const info = starknet.num.hexToBytes(starknet.num.toHex64(contextHash));
  return hkdf(sha256, mlKemSecret, undefined, info, SHARED_SECRET_SIZE);
}

/**
 * Step 1, for Alice: creates a new ML-KEM-768 key, and the message that links it to her account.
 * Alice keeps the seed secret. She signs the message with her account (`signMessage`). Then she
 * publishes her public key, its end of validity and the signature (see `MlKemSignedKey`).
 * A wallet can sign the message: it needs nothing new. The seed stays in the dapp.
 * @param {string} chainId the chain id, as `provider.getChainId()` returns it
 * @param {number} validUntil the end of validity of the key, in seconds since 1970-01-01 (UTC).
 * It must be in the future
 * @returns {MlKemKey} the seed, the public key and the message to sign
 * @throws {Error} when the chain id is empty, or when validUntil is not a time in seconds in the
 * future
 * @example
 * ```typescript
 * const chainId = await myProvider.getChainId();
 * const validUntil = Math.floor(Date.now() / 1000) + 30 * 24 * 3600; // in 30 days
 * const aliceKey = mlkem.createKey(chainId, validUntil);
 * const signature = await aliceAccount.signMessage(aliceKey.typedData);
 * const signedKey = {
 *   keyOwnerAddress: aliceAccount.address,
 *   publicKey: aliceKey.publicKey,
 *   validUntil,
 *   signature,
 * };
 * // Alice keeps aliceKey.seed (64 bytes) secret, and publishes signedKey.
 * ```
 */
export function createKey(chainId: string, validUntil: number): MlKemKey {
  if (typeof chainId !== 'string' || chainId === '') {
    throw new Error('ML-KEM: chainId must be the chain id, as provider.getChainId() returns it.');
  }
  checkTime(validUntil, 'validUntil');
  if (validUntil <= nowInSeconds()) throw new Error('ML-KEM: validUntil must be in the future.');
  const seed = randomBytes(SEED_SIZE);
  const { publicKey, secretKey } = ml_kem768.keygen(seed);
  // Alice does not need the secret key now: `decapsulate` builds it again from the seed.
  // Erase the secret key: write 0 in each byte, so that it does not stay in memory.
  secretKey.fill(0);
  const typedData = publicKeyMessage(chainId, hashBytes(publicKey), validUntil);
  return { seed, publicKey, typedData };
}

/**
 * Step 2, for Bob: checks the signed key of Alice, then creates the shared secret and a capsule.
 * Bob keeps the shared secret. He signs the message with his account (`signMessage`). Then he
 * sends the capsule, the timestamp and the signature to Alice (see `MlKemSignedCapsule`).
 * The function refuses the key when it has expired, or when the account of Alice did not sign it
 * with a post-quantum signature (see `checkSignature`).
 * @param {ProviderInterface} provider the provider of the chain of the exchange
 * @param {MlKemSignedKey} signedKey what Alice published
 * @param {BigNumberish} senderAddress the address of the account of Bob, who makes the capsule
 * and sends it
 * @returns {Promise<MlKemEncapsulation>} the shared secret, the capsule, the timestamp and the
 * message to sign
 * @throws {Error} when the key has a wrong size or has expired, or when the signature of Alice is
 * not valid
 * @example
 * ```typescript
 * const bobSide = await mlkem.encapsulate(myProvider, signedKey, bobAccount.address);
 * const signature = await bobAccount.signMessage(bobSide.typedData);
 * const signedCapsule = {
 *   senderAddress: bobAccount.address,
 *   capsule: bobSide.capsule,
 *   timestamp: bobSide.timestamp,
 *   signature,
 * };
 * // Bob keeps bobSide.sharedSecret (32 bytes) secret, and sends signedCapsule to Alice.
 * ```
 */
export async function encapsulate(
  provider: starknet.ProviderInterface,
  signedKey: MlKemSignedKey,
  senderAddress: starknet.BigNumberish
): Promise<MlKemEncapsulation> {
  checkBytes(signedKey.publicKey, PUBLIC_KEY_SIZE, 'public key');
  checkTime(signedKey.validUntil, 'validUntil');
  // Alice owns the key. Bob calls this function: he makes the capsule and sends it.
  const aliceAddress = parseFelt(signedKey.keyOwnerAddress, 'ML-KEM key owner address');
  const bobAddress = parseFelt(senderAddress, 'ML-KEM sender address');
  if (signedKey.validUntil <= nowInSeconds()) {
    const owner = starknet.num.toHex(aliceAddress);
    throw new Error(`ML-KEM: the key of the account ${owner} has expired.`);
  }
  const chainId = await provider.getChainId();
  const keyHash = hashBytes(signedKey.publicKey);
  const keyMessage = publicKeyMessage(chainId, keyHash, signedKey.validUntil);
  await checkSignature(provider, keyMessage, signedKey.signature, aliceAddress);

  // noble calls the capsule `cipherText`.
  const { cipherText: capsule, sharedSecret: mlKemSecret } = ml_kem768.encapsulate(
    signedKey.publicKey
  );
  const capsuleHash = hashBytes(capsule);
  const timestamp = nowInSeconds();
  const sharedSecret = finalSecret(mlKemSecret, {
    chainId,
    keyOwnerAddress: aliceAddress,
    senderAddress: bobAddress,
    keyHash,
    capsuleHash,
  });
  // Erase the ML-KEM secret: write 0 in each byte, so that it does not stay in memory.
  mlKemSecret.fill(0);
  const typedData = capsuleMessage(chainId, aliceAddress, keyHash, capsuleHash, timestamp);
  return { sharedSecret, capsule, timestamp, typedData };
}

/**
 * Step 3, for Alice: checks the signed capsule of Bob, then opens the capsule. Alice gets the same
 * shared secret as Bob.
 * The function refuses the capsule when the account of Bob did not sign it with a post-quantum
 * signature (see `checkSignature`). A capsule made for another key or for another account is
 * refused too: the signature of Bob does not match.
 * Bob signed the timestamp, so it is the time that Bob gave. To refuse an old capsule, or a
 * capsule received twice, is the job of the application.
 * @param {ProviderInterface} provider the provider of the chain of the exchange
 * @param {MlKemSignedCapsule} signedCapsule what Bob sent
 * @param {BigNumberish} keyOwnerAddress the address of the account of Alice, who owns the key
 * @param {Uint8Array} seed the seed that `createKey` gave to Alice (64 bytes)
 * @returns {Promise<Uint8Array>} the shared secret (32 bytes), the same as the one of Bob
 * @throws {Error} when the capsule or the seed has a wrong size, or when the signature of Bob is
 * not valid
 * @example
 * ```typescript
 * const sharedSecret = await mlkem.decapsulate(
 *   myProvider,
 *   signedCapsule,
 *   aliceAccount.address,
 *   aliceKey.seed
 * );
 * // sharedSecret = bobSide.sharedSecret (32 bytes)
 * ```
 */
export async function decapsulate(
  provider: starknet.ProviderInterface,
  signedCapsule: MlKemSignedCapsule,
  keyOwnerAddress: starknet.BigNumberish,
  seed: Uint8Array
): Promise<Uint8Array> {
  checkBytes(signedCapsule.capsule, CAPSULE_SIZE, 'capsule');
  checkTime(signedCapsule.timestamp, 'timestamp');
  checkBytes(seed, SEED_SIZE, 'seed');
  // Alice calls this function: she owns the key. Bob made the capsule and sent it.
  const aliceAddress = parseFelt(keyOwnerAddress, 'ML-KEM key owner address');
  const bobAddress = parseFelt(signedCapsule.senderAddress, 'ML-KEM sender address');
  const { publicKey, secretKey } = ml_kem768.keygen(seed);
  try {
    const chainId = await provider.getChainId();
    const keyHash = hashBytes(publicKey);
    const capsuleHash = hashBytes(signedCapsule.capsule);
    const { timestamp } = signedCapsule;
    const typedData = capsuleMessage(chainId, aliceAddress, keyHash, capsuleHash, timestamp);
    await checkSignature(provider, typedData, signedCapsule.signature, bobAddress);

    const mlKemSecret = ml_kem768.decapsulate(signedCapsule.capsule, secretKey);
    const sharedSecret = finalSecret(mlKemSecret, {
      chainId,
      keyOwnerAddress: aliceAddress,
      senderAddress: bobAddress,
      keyHash,
      capsuleHash,
    });
    // Erase the ML-KEM secret: write 0 in each byte, so that it does not stay in memory.
    mlKemSecret.fill(0);
    return sharedSecret;
  } finally {
    // This part runs in all cases, also after an error.
    // Erase the secret key: write 0 in each byte, so that it does not stay in memory.
    secretKey.fill(0);
  }
}

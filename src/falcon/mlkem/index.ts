/**
 * A post-quantum key exchange between two Falcon-512 accounts of OpenZeppelin, with ML-KEM-768
 * (FIPS 203). Alice and Bob get the same secret of 32 bytes, for example the key of an encrypted
 * message. The secret itself is never sent.
 *
 * 1. Alice calls `createKey`. She keeps the seed secret, signs the message with her account, and
 *    sends her public key with the signature (`MlKemSignedKey`).
 * 2. Bob calls `encapsulate`. It first checks the signature of Alice, then gives Bob the secret and
 *    a capsule. Bob signs the message with his account, and sends the capsule with the signature
 *    (`MlKemSignedCapsule`).
 * 3. Alice calls `decapsulate`. It first checks the signature of Bob, then opens the capsule: Alice
 *    gets the same secret.
 *
 * Each signature is checked with the Falcon key that the account stores (`get_public_key`): any
 * other account is refused. A wallet only signs the two messages, with `signMessage`.
 *
 * ```typescript
 * // 1. Alice
 * const aliceKey = mlkem.createKey(await myProvider.getChainId(), validUntil);
 * // 2. Bob, with the key signed by Alice
 * const bobSide = await mlkem.encapsulate(myProvider, signedKey, bobAccount.address);
 * // 3. Alice, with the capsule signed by Bob
 * const secret = await mlkem.decapsulate(myProvider, signedCapsule, aliceAccount.address, aliceKey.seed);
 * // secret = bobSide.sharedSecret
 * ```
 *
 * The diagram of the exchange, a complete example and the limits are in the
 * [guide](https://starknet-js.com/docs/guides/account/postQuantum#share-a-secret-between-two-falcon-accounts).
 * @module
 */
export { createKey, decapsulate, encapsulate } from './exchange';

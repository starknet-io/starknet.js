/**
 * Functions for the keys and the signatures of Falcon-512: create a key pair, get its public key
 * (NIST format, or packed in 29 felts), import or export a falcon-rs key, and verify a signature or
 * a SNIP-12 message off-chain. To sign, use `Falcon512Signer`.
 *
 * ```typescript
 * const { secretKey, publicKey } = falcon512.generateKeyPair();
 * const signer = new Falcon512Signer(secretKey, { accountType: 'oz-hint' });
 * const signature = await signer.signMessage(myTypedData, accountAddress);
 * const options = { accountType: 'oz-hint' } as const;
 * const isValid = falcon512.verifyMessage(myTypedData, signature, publicKey, accountAddress, options);
 * // isValid = true
 * ```
 *
 * Choice of the account, deployment and key change are in the
 * [guide](https://starknet-js.com/docs/guides/account/postQuantum).
 * @module
 */
export { verify, verifyMessage } from './verify';
export {
  exportFalconRsSecretKey,
  generateKeyPair,
  getPackedPublicKey,
  getPublicKey,
  importFalconRsSecretKey,
} from './s2morrow/keys';

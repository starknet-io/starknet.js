// Falcon-512 helpers, exposed by index.ts as the `falcon512` namespace
// (same style as `ec.starkCurve` or `typedData` in starknet.js).
export { verify, verifyMessage } from './verify';
export {
  exportFalconRsSecretKey,
  generateKeyPair,
  getPackedPublicKey,
  getPublicKey,
  importFalconRsSecretKey,
} from './s2morrow/keys';

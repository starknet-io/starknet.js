import * as api from '../../../src/falcon';

// Free functions live in a namespace named after their algorithm: `falcon512` for the signature,
// `mlkem` for the key exchange (like `ec.starkCurve` or `typedData` in starknet.js).
describe('public API (lib/index.ts)', () => {
  test('exports only Falcon512Signer, the falcon512 namespace and the mlkem namespace', () => {
    expect(Object.keys(api).sort()).toEqual(['Falcon512Signer', 'falcon512', 'mlkem']);
    expect(Object.keys(api.falcon512).sort()).toEqual([
      'exportFalconRsSecretKey',
      'generateKeyPair',
      'getPackedPublicKey',
      'getPublicKey',
      'importFalconRsSecretKey',
      'verify',
      'verifyMessage',
    ]);
    expect(Object.keys(api.mlkem).sort()).toEqual(['createKey', 'decapsulate', 'encapsulate']);
  });

  test('the signer exposes getPackedPublicKey, not getStarknetPublicKey', () => {
    const signer = new api.Falcon512Signer(api.falcon512.generateKeyPair().secretKey);
    expect(signer.getPackedPublicKey()).toHaveLength(29);
    expect((signer as any).getStarknetPublicKey).toBeUndefined();
  });
});

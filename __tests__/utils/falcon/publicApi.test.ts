import * as api from '../../../src/falcon';

// Public names must say "Falcon-512": free functions live in the `falcon512` namespace
// (like `ec.starkCurve` or `typedData` in starknet.js).
describe('public API (lib/index.ts)', () => {
  test('exports only Falcon512Signer and the falcon512 namespace', () => {
    expect(Object.keys(api).sort()).toEqual(['Falcon512Signer', 'falcon512']);
    expect(Object.keys(api.falcon512).sort()).toEqual([
      'exportFalconRsSecretKey',
      'generateKeyPair',
      'getPackedPublicKey',
      'getPublicKey',
      'importFalconRsSecretKey',
      'verify',
      'verifyMessage',
    ]);
  });

  test('the signer exposes getPackedPublicKey, not getStarknetPublicKey', () => {
    const signer = new api.Falcon512Signer(api.falcon512.generateKeyPair().secretKey);
    expect(signer.getPackedPublicKey()).toHaveLength(29);
    expect((signer as any).getStarknetPublicKey).toBeUndefined();
  });
});

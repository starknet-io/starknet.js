import { ec, hash } from '../../src';

test('getStarkKey()', () => {
  const privateKey = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const starkKey = ec.starkCurve.getStarkKey(privateKey);
  expect(starkKey).toBe('0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745');
});

test('getPublicKey()', () => {
  const privateKey = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const fullPubKey = ec.starkCurve.getPublicKey(privateKey);
  // somehow needed, returns error else
  expect(fullPubKey).toBe(
    '0x04033f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d997450319d0f53f6ca077c4fa5207819144a2a4165daef6ee47a7c1d06c0dcaa3e456'
  );
});

test('verify signed message with full public key()', () => {
  const privk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = hash.pedersen(account, price);
  const signature = ec.starkCurve.sign(hashMsg, privk);
  const pubKey = ec.starkCurve.getPublicKey(privk);
  expect(ec.starkCurve.verify(signature, hashMsg, pubKey)).toBe(true);
});

test('verify signed message with Starknet public Key()', () => {
  const privk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = hash.pedersen(account, price);
  const signature = ec.starkCurve.sign(hashMsg, privk);
  const pubKey = ec.starkCurve.getStarkKey(privk);
  expect(ec.starkCurve.verify(signature, hashMsg, pubKey)).toBe(true);
});

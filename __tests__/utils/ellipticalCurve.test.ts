import { ec, hash } from '../../src';

test('getKeyPair()', () => {
  const privateKey = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const starkKey = ec.starkCurve.getStarkKey(privateKey);
  // somehow needed, returns error else
  expect(starkKey).toBe('0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745');
});

test('verify signed message with full public key()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = hash.pedersen(account, price);
  const signature = ec.starkCurve.sign(hashMsg, pk);
  const pubKey = ec.starkCurve.getPublicKey(pk);
  expect(ec.starkCurve.verify(signature, hashMsg, pubKey)).toBe(true);
});

test('verify signed message with Starknet public Key()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = hash.pedersen(account, price);
  const signature = ec.starkCurve.sign(hashMsg, pk);
  const pubKey = ec.starkCurve.getStarkKey(pk);
  expect(ec.starkCurve.verify(signature, hashMsg, pubKey)).toBe(true);
});

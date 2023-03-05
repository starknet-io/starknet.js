import { ec, hash } from '../../src';
import { removeHexPrefix } from '../../src/utils/encode';

// Test of all deprecated ec functions from V4

test('genKeyPair()', () => {
  const pair = ec.genKeyPair();
  expect(pair.constructor.name).toBe('KeyPair');
});

test('getKeyPair() & getStarkKey() & Keypair.getPrivate()', () => {
  const privateKey = '0x19800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const pair = ec.getKeyPair(privateKey);
  expect(ec.getStarkKey(pair)).toBe(
    '0x033f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745'
  );

  expect(pair.getPrivate('hex')).toBe(privateKey);
});

test('verify signed message()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = hash.pedersen(account, price);
  const keyPair = ec.getKeyPair(pk);
  const signature = ec.sign(keyPair, removeHexPrefix(hashMsg));
  const pubKey = keyPair.getPublic('hex');
  expect(pubKey).toBe(
    '0x4033f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d997450319d0f53f6ca077c4fa5207819144a2a4165daef6ee47a7c1d06c0dcaa3e456'
  );
  const pubKeyPair = ec.getKeyPairFromPublicKey(pubKey);
  expect(ec.verify(pubKeyPair, removeHexPrefix(hashMsg), signature)).toBe(true);
});

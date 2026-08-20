import { ec } from '../../src';
import { computeHashOnElements } from '../../src/utils/hash';

test('getKeyPair()', () => {
  const privateKey = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const starkKey = ec.starkCurve.getStarkKey(privateKey);
  // somehow needed, returns error else
  expect(starkKey).toBe('0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745');
});

test('pedersen()', () => {
  const own = ec.starkCurve.pedersen('0x12773', '0x872362');
  expect(own).toMatchSnapshot();
});

test('pedersen() with 0', () => {
  const own = ec.starkCurve.pedersen('0x12773', '0x0');
  expect(own).toMatchSnapshot();
});

test('computeHashOnElements()', () => {
  const array = ['1', '2', '3', '4'];
  expect(computeHashOnElements(array)).toBe(
    '0x66bd4335902683054d08a0572747ea78ebd9e531536fb43125424ca9f902084'
  );
  expect(array).toStrictEqual(['1', '2', '3', '4']);

  expect(computeHashOnElements(['1', '2'])).toBe(
    '0x501a3a8e6cd4f5241c639c74052aaa34557aafa84dd4ba983d6443c590ab7df'
  );
});

test('verify signed message()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = ec.starkCurve.pedersen(account, price);
  const signature = ec.starkCurve.sign(hashMsg, pk);
  const pubKey = ec.starkCurve.getPublicKey(pk);
  expect(ec.starkCurve.verify(signature, hashMsg, pubKey)).toBe(true);
});

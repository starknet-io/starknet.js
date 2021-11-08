import { getKeyPair, getStarkKey, sign } from '../../src/utils/ellipticCurve';
import { removeHexPrefix } from '../../src/utils/encode';
import { hashCalldata, hashMessage, pedersen } from '../../src/utils/hash';
import { toBN, toHex } from '../../src/utils/number';

test('getKeyPair()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const pair = getKeyPair(pk);
  // somehow needed, returns error else
  expect(toHex(toBN(getStarkKey(pair)))).toBe(
    '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745'
  );
});

test('pedersen()', () => {
  const own = pedersen(['0x12773', '0x872362']);
  expect(own).toMatchSnapshot();
});

test('hashCalldata()', () => {
  const array = ['1', '2', '3', '4'];
  expect(hashCalldata(array)).toBe(
    '0x1439c58e1c389a2ac51f8462ecc0a4ec7f812be1c04e3b82ce2af1c2cf959ef'
  );
  expect(array).toStrictEqual(['1', '2', '3', '4']);

  expect(hashCalldata(['1', '2'])).toBe(
    '0x2ab889bd35e684623df9b4ea4a4a1f6d9e0ef39b67c1293b8a89dd17e351235'
  );
});

test('hashMessage()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const hashMsg = hashMessage(
    '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745',
    '5',
    '6',
    ['1', '2'],
    '2'
  );
  expect(hashMsg).toBe('0xf7ec4a68876819eed838be83b5d5dc337081f4a5fb8e421f3d9bdef7c69e9b');
  const keyPair = getKeyPair(pk);
  const { r, s } = sign(keyPair, removeHexPrefix(hashMsg));
  expect(r.toString()).toStrictEqual(
    toBN('2699852629692218907583414128365108566181098618321049245303767746418549764831').toString()
  );
  expect(s.toString()).toStrictEqual(
    toBN('2362979021721299440845279407227912881357338080403308888611869245024056250189').toString()
  );
});

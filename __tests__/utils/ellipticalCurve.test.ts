import { ec, getKeyPair, getStarkKey, sign, verify } from '../../src/utils/ellipticCurve';
import { removeHexPrefix } from '../../src/utils/encode';
import { hashCalldata, hashMessage, pedersen } from '../../src/utils/hash';
import { toBN, toHex } from '../../src/utils/number';

test('getKeyPair()', () => {
  const privateKey = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const pair = getKeyPair(privateKey);
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
    '0x66bd4335902683054d08a0572747ea78ebd9e531536fb43125424ca9f902084'
  );
  expect(array).toStrictEqual(['1', '2', '3', '4']);

  expect(hashCalldata(['1', '2'])).toBe(
    '0x501a3a8e6cd4f5241c639c74052aaa34557aafa84dd4ba983d6443c590ab7df'
  );
});

test('hashMessage()', () => {
  const privateKey = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const hashMsg = hashMessage(
    '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745',
    '5',
    '6',
    ['1', '2'],
    '2'
  );
  expect(hashMsg).toBe('0x7f15c38ea577a26f4f553282fcfe4f1feeb8ecfaad8f221ae41abf8224cbddd');
  const keyPair = getKeyPair(privateKey);
  const [r, s] = sign(keyPair, removeHexPrefix(hashMsg));
  expect(r.toString()).toStrictEqual(
    toBN('2458502865976494910213617956670505342647705497324144349552978333078363662855').toString()
  );
  expect(s.toString()).toStrictEqual(
    toBN('3439514492576562277095748549117516048613512930236865921315982886313695689433').toString()
  );
});

test('verify signed message()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = pedersen([account, price]);
  const keyPair = getKeyPair(pk);
  const signature = sign(keyPair, removeHexPrefix(hashMsg));
  const pubKey = keyPair.getPublic('hex');
  const pubKeyPair = ec.keyFromPublic(pubKey, 'hex');
  expect(verify(pubKeyPair, removeHexPrefix(hashMsg), signature)).toBe(true);
});

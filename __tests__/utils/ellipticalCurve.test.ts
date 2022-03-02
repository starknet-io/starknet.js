import { ec, getKeyPair, getStarkKey, sign, verify } from '../../src/utils/ellipticCurve';
import { removeHexPrefix } from '../../src/utils/encode';
import { computeHashOnElements, hashMulticall, pedersen } from '../../src/utils/hash';
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

test('hashMessage()', () => {
  const privateKey = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '2007067565103695475819120104515800035851923905855118399071773059478896040938';
  const transactions = [
    {
      contractAddress:
        '3290661298119599979891444342541795905081168856323302956721669397616389152866',
      entrypoint: 'set_number',
      calldata: ['47'],
    },
  ];
  const nonce = '3';
  const maxFee = '0';
  const hashMsg = hashMulticall(account, transactions, nonce, maxFee);
  expect(hashMsg).toBe(
    toHex(toBN('1608351043472325350463069815257733118091727529101532499046754244230898025592'))
  );
  const keyPair = getKeyPair(privateKey);
  const [r, s] = sign(keyPair, removeHexPrefix(hashMsg));
  expect(r.toString()).toStrictEqual(
    toBN('1079537730825246752292590270213864261175133133352510235773017189606850691611').toString()
  );
  expect(s.toString()).toStrictEqual(
    toBN('2904560423220491364719171767721067837294296476624248675613584621502231297000').toString()
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

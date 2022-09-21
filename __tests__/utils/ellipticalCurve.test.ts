import { StarknetChainId } from '../../src/constants';
import { ec, getKeyPair, getStarkKey, sign, verify } from '../../src/utils/ellipticCurve';
import { removeHexPrefix } from '../../src/utils/encode';
import {
  calculateTransactionHash,
  computeHashOnElements,
  pedersen,
  transactionVersion,
} from '../../src/utils/hash';
import { toBN, toHex } from '../../src/utils/number';
import { fromCallsToExecuteCalldataWithNonce } from '../../src/utils/transaction';

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

test('pedersen() with 0', () => {
  const own = pedersen(['0x12773', '0x0']);
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
  const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);

  const hashMsg = calculateTransactionHash(
    account,
    transactionVersion,
    calldata,
    maxFee,
    StarknetChainId.TESTNET,
    nonce
  );

  expect(hashMsg).toMatchInlineSnapshot(
    `"0x6d1706bd3d1ba7c517be2a2a335996f63d4738e2f182144d078a1dd9997062e"`
  );
  const keyPair = getKeyPair(privateKey);
  const [r, s] = sign(keyPair, removeHexPrefix(hashMsg));
  expect(r.toString()).toMatchInlineSnapshot(
    `"1427981024487605678086498726488552139932400435436186597196374630267616399345"`
  );
  expect(s.toString()).toMatchInlineSnapshot(
    `"1853664302719670721837677288395394946745467311923401353018029119631574115563"`
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

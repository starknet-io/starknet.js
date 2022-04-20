import { StarknetChainId } from '../../src/constants';
import { ec, getKeyPair, getStarkKey, sign, verify } from '../../src/utils/ellipticCurve';
import { removeHexPrefix } from '../../src/utils/encode';
import {
  calculcateTransactionHash,
  computeHashOnElements,
  getSelectorFromName,
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

  const hashMsg = calculcateTransactionHash(
    account,
    transactionVersion,
    getSelectorFromName('__execute__'),
    calldata,
    maxFee,
    StarknetChainId.TESTNET
  );

  expect(hashMsg).toMatchInlineSnapshot(
    `"0x4c337c6bf32b2cf2b8ae54064e4b982c214660e8d0423b431a3fde10b9b9c02"`
  );
  const keyPair = getKeyPair(privateKey);
  const [r, s] = sign(keyPair, removeHexPrefix(hashMsg));
  expect(r.toString()).toMatchInlineSnapshot(
    `"1944132633844378384908742523072599391732300777648030785844673145513474741467"`
  );
  expect(s.toString()).toMatchInlineSnapshot(
    `"1067771353159635307522498807851959257107695451405842425488451092336556917559"`
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

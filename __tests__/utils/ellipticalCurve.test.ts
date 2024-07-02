import { constants, ec } from '../../src';
import { StarknetChainId } from '../../src/constants';
import { computeHashOnElements } from '../../src/utils/hash';
import { calculateTransactionHash } from '../../src/utils/hash/transactionHash/v2';
import { fromCallsToExecuteCalldataWithNonce } from '../../src/utils/transaction';

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
    BigInt(constants.TRANSACTION_VERSION.V1),
    calldata,
    maxFee,
    StarknetChainId.SN_SEPOLIA,
    nonce
  );

  expect(hashMsg).toMatchInlineSnapshot(
    `"0xa006ce6da518722c1af8bdb1d8a42cee638102c670bb1a55f063bff10506d4"`
  );

  const { r, s } = ec.starkCurve.sign(hashMsg, privateKey);

  expect(r.toString()).toMatchInlineSnapshot(
    `"384207128292005766686294801921397180350977625816434242436096267488258549139"`
  );
  expect(s.toString()).toMatchInlineSnapshot(
    `"2521602681140573534692734854765316415611209530542226558354401890884906162365"`
  );
});

test('verify signed message()', () => {
  const pk = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
  const account = '0x33f45f07e1bd1a51b45fc24ec8c8c9908db9e42191be9e169bfcac0c0d99745';
  const price = '1';
  const hashMsg = ec.starkCurve.pedersen(account, price);
  const signature = ec.starkCurve.sign(hashMsg, pk);
  const pubKey = ec.starkCurve.getPublicKey(pk);
  expect(ec.starkCurve.verify(signature.toDERHex(), hashMsg, pubKey)).toBe(true);
});

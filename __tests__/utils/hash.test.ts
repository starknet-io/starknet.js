import { constants, ec, hash, num, transaction } from '../../src';
import {
  compiledErc20,
  compiledOpenZeppelinAccount,
  compiledTestDapp,
  erc20ClassHash,
} from '../fixtures';

describe('Hash Tester', () => {
  test('keccakBn', () => {
    const data = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
    const ha = hash.keccakBn(data);
    expect(ha).toBe('0x134d917421787dc6f797e97ebf96ef55fda2e0c22433544cb90da656ebb5a1c');
  });

  test('starknetKeccak', () => {
    const data = '0x019800ea6a9a73f94aee6a3d2edf018fc770443e90c7ba121e8303ec6b349279';
    const ha = hash.starknetKeccak(data);
    expect(num.toHex(ha)).toBe('0x2fb0ce11acb684c1354cac9d3349dda7bf6cc71fde4267dab6b7e92c9631ff');
  });

  test('Test getSelectorFromName', () => {
    const hash0 = hash.getSelectorFromName('__validate__');
    expect(hash0).toEqual('0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775');
  });

  describe('Compute ClassHash of various contracts', () => {
    test('ERC20 Contract ClassHash', () => {
      const classHash = hash.computeContractClassHash(compiledErc20);

      expect(classHash).toEqual(erc20ClassHash);
      expect(classHash).toMatchInlineSnapshot(
        `"0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a"`
      );
    });

    test('OZ ERC20 Contract ClassHash', () => {
      const classHash = hash.computeContractClassHash(compiledOpenZeppelinAccount);

      expect(classHash).toMatchInlineSnapshot(
        `"0x58d97f7d76e78f44905cc30cb65b91ea49a4b908a76703c54197bca90f81773"`
      );
    });

    test('Test DApp Contract ClassHash', () => {
      const classHash = hash.computeContractClassHash(compiledTestDapp);

      expect(classHash).toMatchInlineSnapshot(
        `"0x4367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5"`
      );
    });
  });
  test('pedersen()', () => {
    const own = hash.pedersen('0x12773', '0x872362');
    expect(own).toMatchSnapshot();
  });

  test('pedersen() with 0', () => {
    const own = hash.pedersen('0x12773', '0x0');
    expect(own).toMatchSnapshot();
  });

  test('computeHashOnElements()', () => {
    const array = ['1', '2', '3', '4'];
    expect(hash.computeHashOnElements(array)).toBe(
      '0x66bd4335902683054d08a0572747ea78ebd9e531536fb43125424ca9f902084'
    );
    expect(array).toStrictEqual(['1', '2', '3', '4']);

    expect(hash.computeHashOnElements(['1', '2'])).toBe(
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
    const calldata = transaction.fromCallsToExecuteCalldataWithNonce(transactions, nonce);

    const hashMsg = hash.calculateTransactionHash(
      account,
      hash.transactionVersion,
      calldata,
      maxFee,
      constants.StarknetChainId.SN_GOERLI,
      nonce
    );

    expect(hashMsg).toMatchInlineSnapshot(
      `"0x6d1706bd3d1ba7c517be2a2a335996f63d4738e2f182144d078a1dd9997062e"`
    );

    const { r, s } = ec.starkCurve.sign(hashMsg, privateKey);

    expect(r.toString()).toMatchInlineSnapshot(
      `"1427981024487605678086498726488552139932400435436186597196374630267616399345"`
    );
    expect(s.toString()).toMatchInlineSnapshot(
      `"1853664302719670721837677288395394946745467311923401353018029119631574115563"`
    );
  });
});

describe('getSelectorFromName()', () => {
  test('hash works for value="test"', () => {
    expect(hash.getSelectorFromName('test')).toBe(
      '0x22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658'
    );
  });
  test('hash works for value="initialize"', () => {
    expect(hash.getSelectorFromName('initialize')).toBe(
      '0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463'
    );
  });
  test('hash works for value="mint"', () => {
    expect(hash.getSelectorFromName('mint')).toBe(
      '0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354'
    );
  });
});
describe('computeHashOnElements()', () => {
  test('should return valid hash for empty array', () => {
    const res = hash.computeHashOnElements([]);
    expect(res).toMatchInlineSnapshot(
      `"0x49ee3eba8c1600700ee1b87eb599f16716b0b1022947733551fde4050ca6804"`
    );
  });
  test('should return valid hash for valid array', () => {
    const res = hash.computeHashOnElements([
      num.toBigInt(123782376),
      num.toBigInt(213984),
      num.toBigInt(128763521321),
    ]);
    expect(res).toMatchInlineSnapshot(
      `"0x7b422405da6571242dfc245a43de3b0fe695e7021c148b918cd9cdb462cac59"`
    );
  });
});

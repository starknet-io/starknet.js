import fs from 'fs';

import { constants, hash, json, number, stark } from '../../src';
import { pedersen } from '../../src/utils/hash';

const { IS_BROWSER } = constants;

const compiledArgentAccount = json.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

test('isNode', () => {
  expect(IS_BROWSER).toBe(false);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputProgram = compiledArgentAccount.program;

    const compressed = stark.compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
  test('works with strings', () => {
    const inputProgram = json.stringify(compiledArgentAccount.program);

    const compressed = stark.compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
});
describe('hexToDecimalString()', () => {
  test('parse 0xa23', () => {
    expect(number.hexToDecimalString('0xa23')).toBe('2595');
  });
});

describe('makeAddress()', () => {
  test('test on eth address', () => {
    const ethAddress = '0xdFD0F27FCe99b50909de0bDD328Aed6eAbe76BC5';

    const starkAddress = stark.makeAddress(ethAddress);

    expect(starkAddress).toBe('0xdfd0f27fce99b50909de0bdd328aed6eabe76bc5');
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
      number.toBN(123782376),
      number.toBN(213984),
      number.toBN(128763521321),
    ]);
    expect(res).toMatchInlineSnapshot(
      `"0x7b422405da6571242dfc245a43de3b0fe695e7021c148b918cd9cdb462cac59"`
    );
  });
});
describe('estimatedFeeToMaxFee()', () => {
  test('should return maxFee for 0', () => {
    const res = stark.estimatedFeeToMaxFee(0, 0.15).toNumber();
    expect(res).toBe(0);
  });
  test('should return maxFee for 10_000', () => {
    const res = stark.estimatedFeeToMaxFee(10_000, 0.15).toNumber();
    expect(res).toBe(11_500);
  });
});

describe('calculateContractAddressFromHash()', () => {
  // This test just show how to use calculateContractAddressFromHash for new devs

  test('calculated contract address should match the snapshot', () => {
    const ethAddress = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

    const daiAddress = '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9';
    const factoryAddress = '0x249827618A01858A72B7D04339C47195A324D20D6037033DFE2829F98AFF4FC';
    const classHash = '0x55187E68C60664A947048E0C9E5322F9BF55F7D435ECDCF17ED75724E77368F';

    // Any type of salt can be used. It depends on the dApp what kind of salt it wants to use.
    const salt = pedersen([ethAddress, daiAddress]);

    const res = hash.calculateContractAddressFromHash(
      salt,
      classHash,
      [ethAddress, daiAddress, factoryAddress],
      factoryAddress
    );

    expect(res).toMatchInlineSnapshot(
      `"0x36dc8dcb3440596472ddde11facacc45d0cd250df764ae7c3d1a360c853c324"`
    );
  });
});

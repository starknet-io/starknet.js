import fs from 'fs';

import { constants, hash, json, number, stark } from '../../src';

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

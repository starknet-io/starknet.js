import fs from 'fs';

import { constants, utils } from '../src';

const { IS_BROWSER } = constants;
const {
  json: { parse, stringify },
  starknet: { compressProgram, getSelectorFromName, makeAddress },
  enc: { hexToDecimalString },
} = utils;

const compiledArgentAccount = parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

test('isNode', () => {
  expect(IS_BROWSER).toBe(false);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputProgram = compiledArgentAccount.program;

    const compressed = compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
  test('works with strings', () => {
    const inputProgram = stringify(compiledArgentAccount.program);

    const compressed = compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
});
describe('hexToDecimalString()', () => {
  test('parse 0xa23', () => {
    expect(hexToDecimalString('0xa23')).toBe('2595');
  });
});

describe('makeAddress()', () => {
  test('test on eth address', () => {
    const ethAddress = '0xdFD0F27FCe99b50909de0bDD328Aed6eAbe76BC5';

    const starkAddress = makeAddress(ethAddress);

    expect(starkAddress).toBe('0xdfd0f27fce99b50909de0bdd328aed6eabe76bc5');
  });
});
describe('getSelectorFromName()', () => {
  test('hash works for value="test"', () => {
    expect(getSelectorFromName('test')).toBe(
      '0x22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658'
    );
  });
  test('hash works for value="initialize"', () => {
    expect(getSelectorFromName('initialize')).toBe(
      '0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463'
    );
  });
  test('hash works for value="mint"', () => {
    expect(getSelectorFromName('mint')).toBe(
      '0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354'
    );
  });
});

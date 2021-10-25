import fs from 'fs';
import { compressProgram, makeAddress, isBrowser, JsonParser } from '../src/utils';

const compiledArgentAccount = JsonParser.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

test('isNode', () => {
  expect(isBrowser).toBe(false);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputProgram = compiledArgentAccount.program;

    const compressed = compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
  test('works with strings', () => {
    const inputProgram = JsonParser.stringify(compiledArgentAccount.program);

    const compressed = compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
});
describe('makeAddress()', () => {
  test('test on eth address', () => {
    const ethAddress = '0xdFD0F27FCe99b50909de0bDD328Aed6eAbe76BC5';

    const starkAddress = makeAddress(ethAddress);

    expect(starkAddress).toBe('0xdfd0f27fce99b50909de0bdd328aed6eabe76bc5');
  });
});

/**
 * @jest-environment jsdom
 */

import fs from 'fs';

import { constants, json, starknet } from '../../src';

const { IS_BROWSER } = constants;

const compiledArgentAccount = json.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

test('isBrowser', () => {
  expect(IS_BROWSER).toBe(true);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputContract = compiledArgentAccount as any;

    const compressed = starknet.compressProgram(inputContract.program);

    expect(compressed).toMatchSnapshot();
  });
  test('works with strings', () => {
    const inputProgram = json.stringify(compiledArgentAccount.program);

    const compressed = starknet.compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
});

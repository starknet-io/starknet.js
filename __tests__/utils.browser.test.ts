/**
 * @jest-environment jsdom
 */

import fs from 'fs';

import { constants, utils } from '../src';

const { IS_BROWSER } = constants;
const {
  json: { parse, stringify },
  starknet: { compressProgram },
} = utils;

const compiledArgentAccount = parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

test('isBrowser', () => {
  expect(IS_BROWSER).toBe(true);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputContract = compiledArgentAccount as any;

    const compressed = compressProgram(inputContract.program);

    expect(compressed).toMatchSnapshot();
  });
  test('works with strings', () => {
    const inputProgram = stringify(compiledArgentAccount.program);

    const compressed = compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
});

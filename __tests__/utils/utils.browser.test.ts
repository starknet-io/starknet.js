/**
 * @jest-environment jsdom
 */

import fs from 'fs';

import { constants, json, stark } from '../../src';

const { IS_BROWSER } = constants;

const compiledArgentAccount = json.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

test('isBrowser', () => {
  expect(IS_BROWSER).toBe(true);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const compressed = stark.compressProgram(compiledArgentAccount.program);

    expect(compressed).toMatchSnapshot();
  });
  test('works with strings', () => {
    const inputProgram = json.stringify(compiledArgentAccount.program);

    const compressed = stark.compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
});

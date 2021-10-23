/**
 * @jest-environment jsdom
 */

import fs from 'fs';
import { compressProgram, isBrowser, JsonParser } from '..';

const compiledArgentAccount = JsonParser.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);

test('isBrowser', () => {
  expect(isBrowser).toBe(true);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputContract = compiledArgentAccount as any;

    const compressed = compressProgram(inputContract.program);

    expect(compressed).toMatchSnapshot();
  });
  test('works with strings', () => {
    const inputProgram = JsonParser.stringify(compiledArgentAccount.program);

    const compressed = compressProgram(inputProgram);

    expect(compressed).toMatchSnapshot();
  });
});

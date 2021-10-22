/**
 * @jest-environment jsdom
 */

import { compressProgram, isBrowser } from '..';
import compiledArgentAccount from '../__mocks__/ArgentAccount.json';

test('isBrowser', () => {
  expect(isBrowser).toBe(true);
});
describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputContract = compiledArgentAccount as any;

    const compressed = compressProgram(inputContract.program);

    expect(compressed).toMatchSnapshot();
  });
});

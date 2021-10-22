import { compressProgram } from '..';
import compiledArgentAccount from '../__mocks__/ArgentAccount.json';

describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputContract = compiledArgentAccount as any;

    const compressed = compressProgram(JSON.stringify(inputContract.program));

    expect(compressed).toMatchSnapshot();
  });
  test('throws Error when no contract program is provided', () => {
    expect(() => compressProgram('test')).toThrow();
  });
});

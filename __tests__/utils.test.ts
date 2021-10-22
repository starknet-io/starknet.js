import { compressProgram } from '..';
import compiledArgentAccount from '../__mocks__/ArgentAccount.json';

describe('compressProgram()', () => {
  test('compresses a contract program', () => {
    const inputContract = compiledArgentAccount as any;

    const compressed = compressProgram(inputContract.program);

    expect(compressed).toMatchSnapshot();
  });
  // there's basically no error case with almost all types being supported
});

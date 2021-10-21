import { compressProgram } from '..';
import compiledArgentAccount from '../__mocks__/ArgentAccount.json';

describe('compression', () => {
  describe('compressProgram', () => {
    test('works', () => {
      const inputContract = compiledArgentAccount as any;

      const compressed = compressProgram(JSON.stringify(inputContract.program));

      expect(compressed).toMatchSnapshot();
    });
    test('throws when no json', () => {
      expect(() => compressProgram('test')).toThrow();
    });
  });
});

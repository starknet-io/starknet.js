import fs from 'fs';

import { RawArgs, json, stark } from '../../src';
import { toBigInt, toHex } from '../../src/utils/number';

const compiledAccount = json.parse(fs.readFileSync('./__mocks__/Account.json').toString('ascii'));

describe('stark', () => {
  describe('compressProgram()', () => {
    test('compresses a contract program', () => {
      const inputProgram = compiledAccount.program;

      const compressed = stark.compressProgram(inputProgram);

      expect(compressed).toMatchSnapshot();
    });
    test('works with strings', () => {
      const inputProgram = json.stringify(compiledAccount.program);

      const compressed = stark.compressProgram(inputProgram);

      expect(compressed).toMatchSnapshot();
    });
  });

  describe('compileCalldata() ', () => {
    test('compiles BigNumberish[] calldata', () => {
      const callData = ['0x000', 2n, 10000];

      const compiled = stark.compileCalldata(callData);

      expect(compiled).toEqual(['0', '2', '10000']);
    });

    test('compiles Object type calldata', () => {
      const callData = {
        a: '0x000',
        b: 2n,
        c: 10000,
        d: [1n, 2n, '0x3'],
      };

      const compiled = stark.compileCalldata(callData);

      expect(compiled).toEqual(['0', '2', '10000', '3', '1', '2', '3']);
    });

    test('compiles Struct type calldata', () => {
      const calldata: RawArgs = {
        a: {
          type: 'struct',
          x: 1n,
          y: 2n,
          z: 3n,
        },
        b: 10000000000,
        c: ['1', '2', toBigInt(3), toHex(4)],
      };

      const compiled = stark.compileCalldata(calldata);

      expect(compiled).toEqual(['1', '2', '3', '10000000000', '4', '1', '2', '3', '4']);
    });
  });
});

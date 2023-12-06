import { CallData, EstimateFeeResponse, RawArgs, json, stark } from '../../src';
import { toBigInt, toHex } from '../../src/utils/num';
import { compiledOpenZeppelinAccount } from '../config/fixtures';

const compiledAccount = compiledOpenZeppelinAccount;

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

  describe('decompressProgram()', () => {
    test('decompress a contract program', () => {
      const inputProgram = compiledAccount.program;
      const compressed = stark.compressProgram(inputProgram);
      const decompressed = stark.decompressProgram(compressed);
      expect(decompressed).toMatchObject(compiledAccount.program);
    });
  });

  describe('CallData.compile() ', () => {
    test('compiles BigNumberish[] calldata', () => {
      const callData = ['0x000', 2n, 10000];

      const compiled = CallData.compile(callData);

      expect(compiled).toEqual(['0', '2', '10000']);
    });

    test('compiles Object type calldata', () => {
      const callData = {
        a: '0x000',
        b: 2n,
        c: 10000,
        d: [1n, 2n, '0x3'],
      };

      const compiled = CallData.compile(callData);

      expect(compiled).toEqual(['0', '2', '10000', '3', '1', '2', '3']);
    });

    test('compiles Struct type calldata', () => {
      const calldata: RawArgs = {
        a: {
          x: 1n,
          y: 2n,
          z: 3n,
        },
        b: 10000000000,
        c: ['1', '2', toBigInt(3), toHex(4)],
      };

      const compiled = CallData.compile(calldata);

      expect(compiled).toEqual(['1', '2', '3', '10000000000', '4', '1', '2', '3', '4']);
    });
  });

  test('estimatedFeeToMaxFee', () => {
    expect(stark.estimatedFeeToMaxFee(100)).toBe(150n);
  });

  test('estimateFeeToBounds', () => {
    const estimateFeeResponse: EstimateFeeResponse = {
      gas_consumed: 100n,
      gas_price: 10n,
      overall_fee: 1000n,
    };
    expect(stark.estimateFeeToBounds(estimateFeeResponse)).toStrictEqual({
      l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
      l1_gas: { max_amount: '0x6e', max_price_per_unit: '0xf' },
    });
  });
});

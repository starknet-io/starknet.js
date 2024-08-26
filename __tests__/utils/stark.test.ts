import { CallData, RawArgs, UniversalDetails, json, stark } from '../../src';
import { EDataAvailabilityMode } from '../../src/types/api';
import { FeeEstimate } from '../../src/types/provider';
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
    const estimateFeeResponse: FeeEstimate = {
      gas_consumed: '100',
      gas_price: '10',
      overall_fee: '1000',
      unit: 'FRI',
    };
    const estimateFeeResponse07: FeeEstimate = {
      ...estimateFeeResponse,
      data_gas_consumed: '100',
      data_gas_price: '10',
      overall_fee: '2000',
    };
    expect(stark.estimateFeeToBounds(estimateFeeResponse)).toStrictEqual({
      l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
      l1_gas: { max_amount: '0x96', max_price_per_unit: '0xf' },
    });
    expect(stark.estimateFeeToBounds(estimateFeeResponse07)).toStrictEqual({
      l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
      l1_gas: { max_amount: '0x12c', max_price_per_unit: '0xf' },
    });
  });

  test('v3Details', () => {
    const setValues = (o: {}, v: any) => Object.fromEntries(Object.keys(o).map((k) => [k, v]));

    const details: UniversalDetails = {
      tip: 99n,
      paymasterData: [99n, 99n],
      accountDeploymentData: [99n, 99n],
      nonceDataAvailabilityMode: EDataAvailabilityMode.L2,
      feeDataAvailabilityMode: EDataAvailabilityMode.L2,
      resourceBounds: {
        l1_gas: { max_amount: '0x99', max_price_per_unit: '0x99' },
        l2_gas: { max_amount: '0x99', max_price_per_unit: '0x99' },
      },
    };
    const detailsUndefined = setValues(details, undefined);
    const detailsAnything = setValues(details, expect.anything());

    expect(stark.v3Details(details)).toMatchObject(details);
    expect(stark.v3Details(detailsUndefined)).toEqual(expect.objectContaining(detailsAnything));
  });
});

describe('ec full public key', () => {
  test('determine if value is a BigNumberish', () => {
    const privateKey1 = '0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535';
    expect(stark.getFullPublicKey(privateKey1)).toBe(
      '0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf'
    );
  });
});

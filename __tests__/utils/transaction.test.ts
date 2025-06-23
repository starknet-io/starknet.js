import { Call } from '../../src/types';
import { fromCallsToExecuteCalldata_cairo1, getVersionsByType } from '../../src/utils/transaction';
import { ETransactionVersion } from '../../src';

describe('fromCallsToExecuteCalldata_cairo1', () => {
  it('should return an array with a length of one when given an empty input', () => {
    expect(fromCallsToExecuteCalldata_cairo1([])).toEqual(['0']);
  });

  it('should transform a list of calls into the full flattened calldata', () => {
    const calls: Call[] = [
      {
        contractAddress: '0x123',
        entrypoint: 'transfer',
        calldata: [10],
      },
      {
        contractAddress: '0x456',
        entrypoint: 'mint',
        calldata: ['0x2000', BigInt(10000000)],
      },
    ];
    const expected = [
      '2', // Call size
      '291', // First call
      '232670485425082704932579856502088130646006032362877466777181098476241604910',
      '1',
      '10',
      '1110', // Second call
      '1329909728320632088402217562277154056711815095720684343816173432540100887380',
      '2',
      '8192',
      '10000000',
    ];
    expect(fromCallsToExecuteCalldata_cairo1(calls)).toEqual(expected);
  });
});

describe('getVersionsByType', () => {
  it("should return fee versions when versionType is 'fee'", () => {
    const versions = getVersionsByType('fee');
    expect(versions).toEqual({
      v1: ETransactionVersion.F1,
      v2: ETransactionVersion.F2,
      v3: ETransactionVersion.F3,
    });
  });

  it("should return transaction versions when versionType is 'transaction'", () => {
    const versions = getVersionsByType('transaction');
    expect(versions).toEqual({
      v1: ETransactionVersion.V1,
      v2: ETransactionVersion.V2,
      v3: ETransactionVersion.V3,
    });
  });

  it('should return transaction versions when versionType is undefined', () => {
    const versions = getVersionsByType();
    expect(versions).toEqual({
      v1: ETransactionVersion.V1,
      v2: ETransactionVersion.V2,
      v3: ETransactionVersion.V3,
    });
  });
});

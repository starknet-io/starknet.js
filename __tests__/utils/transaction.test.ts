import { Call } from '../../src/types';
import { fromCallsToExecuteCalldata_cairo1 } from '../../src/utils/transaction';

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

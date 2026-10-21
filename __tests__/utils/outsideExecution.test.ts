import {
  CallData,
  OutsideExecutionVersion,
  cairo,
  constants,
  outsideExecution,
  typedData,
  type Call,
} from '../../src';

describe('outsideExecution.getOutsideCall', () => {
  test('flattens a u256 object in an array calldata', () => {
    const call: Call = {
      contractAddress: '0x123',
      entrypoint: 'transfer',
      calldata: ['0x456', cairo.uint256(100)],
    };

    expect(outsideExecution.getOutsideCall(call).calldata).toEqual(['1110', '100', '0']);
  });

  test('keeps the values of a flat array calldata, written in decimal', () => {
    const call: Call = {
      contractAddress: '0x123',
      entrypoint: 'transfer',
      calldata: ['0x456', '0x64', '0x0'],
    };

    expect(outsideExecution.getOutsideCall(call).calldata).toEqual(['1110', '100', '0']);
  });

  test('keeps a calldata marked as compiled as it is', () => {
    const calldata = CallData.compile(['0x456', cairo.uint256(100)]);
    const call: Call = { contractAddress: '0x123', entrypoint: 'transfer', calldata };

    expect(outsideExecution.getOutsideCall(call).calldata).toBe(calldata);
  });
});

describe('outsideExecution.getTypedData', () => {
  test('gives the same hash for a u256 written as an object or as two felts', () => {
    const options = {
      caller: constants.OutsideExecutionCallerAny,
      execute_after: 1,
      execute_before: 1_800_000_000,
    };
    const withObject = outsideExecution.getTypedData(
      constants.StarknetChainId.SN_SEPOLIA,
      options,
      1,
      [
        {
          contractAddress: '0x123',
          entrypoint: 'transfer',
          calldata: ['0x456', cairo.uint256(100)],
        },
      ],
      OutsideExecutionVersion.V2
    );
    const withFelts = outsideExecution.getTypedData(
      constants.StarknetChainId.SN_SEPOLIA,
      options,
      1,
      [{ contractAddress: '0x123', entrypoint: 'transfer', calldata: ['0x456', '100', '0'] }],
      OutsideExecutionVersion.V2
    );

    expect(typedData.getMessageHash(withObject, '0xabc')).toBe(
      typedData.getMessageHash(withFelts, '0xabc')
    );
  });
});

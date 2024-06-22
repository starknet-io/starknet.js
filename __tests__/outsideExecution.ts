// outsideExecution.test.ts

import {
  EOutsideExecutionVersion,
  OutsideExecutionTypesV1,
  OutsideExecutionTypesV2,
} from '../src/types/outsideExecution';
import { OutsideExecution } from '../src/utils/outsideExecution';
import { Call } from '../src/types';
import { encodeShortString } from '../src/utils/shortString';

describe('OutsideExecution', () => {
  const calls: Call[] = [
    {
      contractAddress: '0x1234',
      entrypoint: 'execute',
      calldata: ['0x123', '0x456'],
    },
  ];

  const options = {
    caller: '0xabcdef',
    nonce: '0x123',
    execute_after: '100',
    execute_before: '500',
  };

  it('should construct an OutsideExecution object', () => {
    const oe = new OutsideExecution(calls, options);
    expect(oe.calls).toEqual(calls);
    expect(oe.options).toEqual(options);
  });

  it('should get typed data for V1', () => {
    const oe = new OutsideExecution(calls, options);
    const typedData = oe.getTypedData('SN_MAIN', EOutsideExecutionVersion.V1);

    const expectedDomain = {
      name: 'Account.execute_from_outside',
      version: '1',
      chainId: 'SN_MAIN',
    };

    const expectedTypes = OutsideExecutionTypesV1;

    const expectedMessage = {
      caller: options.caller,
      nonce: options.nonce,
      execute_after: options.execute_after,
      execute_before: options.execute_before,
      calls_len: calls.length.toString(),
      calls: [
        {
          to: calls[0].contractAddress,
          selector: BigInt(encodeShortString(calls[0].entrypoint)).toString(),
          calldata_len: (calls[0].calldata ?? []).length.toString(),
          calldata: calls[0].calldata ?? [],
        },
      ],
    };

    expect(typedData.domain).toEqual(expectedDomain);
    expect(typedData.types).toEqual(expectedTypes);
    expect(typedData.message).toEqual(expectedMessage);
  });

  it('should get typed data for V2', () => {
    const oe = new OutsideExecution(calls, options);
    const typedData = oe.getTypedData('SN_MAIN', EOutsideExecutionVersion.V2);

    const expectedDomain = {
      name: 'Account.execute_from_outside',
      version: '2',
      chainId: 'SN_MAIN',
      revision: '1',
    };

    const expectedTypes = OutsideExecutionTypesV2;

    const expectedMessage = {
      Caller: options.caller,
      Nonce: options.nonce,
      'Execute After': options.execute_after,
      'Execute Before': options.execute_before,
      Calls: [
        {
          To: calls[0].contractAddress,
          Selector: BigInt(encodeShortString(calls[0].entrypoint)).toString(),
          Calldata: calls[0].calldata,
        },
      ],
    };

    expect(typedData.domain).toEqual(expectedDomain);
    expect(typedData.types).toEqual(expectedTypes);
    expect(typedData.message).toEqual(expectedMessage);
  });

  it('should get ABI data', () => {
    const oe = new OutsideExecution(calls, options);
    const abiData = oe.getABIData();

    const expectedResult = {
      caller: options.caller,
      nonce: options.nonce,
      execute_after: options.execute_after,
      execute_before: options.execute_before,
      calls: [
        {
          to: calls[0].contractAddress,
          selector: BigInt(encodeShortString(calls[0].entrypoint)).toString(),
          calldata: calls[0].calldata,
        },
      ],
    };

    expect(abiData).toEqual(expectedResult);
  });
});

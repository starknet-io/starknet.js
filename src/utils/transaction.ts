import { ParsedStruct } from '../contract';
import { Call } from '../types';
import { getSelectorFromName } from './hash';
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBN } from './number';

export const fromCallsToCallArray = (calls: Call[]) => {
  const callArray: ParsedStruct[] = [];
  const calldata: BigNumberish[] = [];
  calls.forEach((call) => {
    const data = call.calldata || [];
    callArray.push({
      to: toBN(call.contractAddress).toString(10),
      selector: toBN(getSelectorFromName(call.entrypoint)).toString(10),
      data_offset: calldata.length.toString(),
      data_len: data.length.toString(),
    });
    calldata.push(...data);
  });
  return {
    callArray,
    calldata: bigNumberishArrayToDecimalStringArray(calldata),
  };
};

export const fromCallsToExecuteCalldata = (calls: Call[]): string[] => {
  const { callArray, calldata } = fromCallsToCallArray(calls);
  return [
    callArray.length.toString(),
    ...callArray
      .map(
        ({ to, selector, data_offset, data_len }) =>
          [to, selector, data_offset, data_len] as string[]
      )
      .flat(),
    calldata.length.toString(),
    ...calldata,
  ];
};

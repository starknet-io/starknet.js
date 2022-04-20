import { Call, ParsedStruct } from '../types';
import { getSelectorFromName } from './hash';
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBN } from './number';

/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entrypoints, and one with the concatenated calldata.
 * @param calls
 * @returns
 */
export const transformCallsToMulticallArrays = (calls: Call[]) => {
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

/**
 * Transforms a list of calls in the full flattened calldata expected
 * by the __execute__ protocol.
 * @param calls
 * @returns
 */
export const fromCallsToExecuteCalldata = (calls: Call[]): string[] => {
  const { callArray, calldata } = transformCallsToMulticallArrays(calls);
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

export const fromCallsToExecuteCalldataWithNonce = (
  calls: Call[],
  nonce: BigNumberish
): string[] => {
  return [...fromCallsToExecuteCalldata(calls), toBN(nonce).toString()];
};

import { CairoVersion, Call, CallStruct, ParsedStruct } from '../types';
import { getSelectorFromName } from './hash';
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBigInt } from './num';

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
      to: toBigInt(call.contractAddress).toString(10),
      selector: toBigInt(getSelectorFromName(call.entrypoint)).toString(10),
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
  return [...fromCallsToExecuteCalldata(calls), toBigInt(nonce).toString()];
};

/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entrypoints, and one with the concatenated calldata.
 * @param calls
 * @returns
 */
export const transformCallsToMulticallArrays_cairo1 = (calls: Call[]) => {
  const callArray = calls.map<CallStruct>((call) => ({
    to: toBigInt(call.contractAddress).toString(10),
    selector: toBigInt(getSelectorFromName(call.entrypoint)).toString(10),
    calldata: bigNumberishArrayToDecimalStringArray(call.calldata || []),
  }));
  return callArray;
};

/**
 * Transforms a list of calls in the full flattened calldata expected
 * by the __execute__ protocol.
 * @param calls
 * @returns
 */
export const fromCallsToExecuteCalldata_cairo1 = (calls: Call[]): string[] => {
  const callArray = transformCallsToMulticallArrays_cairo1(calls);
  return [
    callArray.length.toString(), // Call size
    ...callArray
      .map(({ to, selector, calldata }) => [to, selector, calldata.length.toString(), ...calldata])
      .flat(),
  ];
};

/**
 *
 * @param calls Call array
 * @param cairoVersion Defaults to 0
 * @returns string[] of calldata
 */
export const getExecuteCalldata = (calls: Call[], cairoVersion: CairoVersion = '0'): string[] => {
  if (cairoVersion === '1') {
    return fromCallsToExecuteCalldata_cairo1(calls);
  }
  return fromCallsToExecuteCalldata(calls);
};

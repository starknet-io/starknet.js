import { CairoVersion, Call, CallStruct, Calldata, ParsedStruct } from '../types';
import { CallData } from './calldata';
import { getSelectorFromName } from './hash';
import { BigNumberish, toBigInt } from './num';

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
    const data = CallData.compile(call.calldata || []);
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
    calldata: CallData.compile({ calldata }),
  };
};

/**
 * Transforms a list of calls in the full flattened calldata expected
 * by the __execute__ protocol.
 * @param calls
 * @returns
 */
export const fromCallsToExecuteCalldata = (calls: Call[]) => {
  const { callArray, calldata } = transformCallsToMulticallArrays(calls);
  const compiledCalls = CallData.compile({ callArray });
  return [...compiledCalls, ...calldata] as Calldata;
};

export const fromCallsToExecuteCalldataWithNonce = (calls: Call[], nonce: BigNumberish) => {
  return [...fromCallsToExecuteCalldata(calls), toBigInt(nonce).toString()] as Calldata;
};

// TT: Can be removed ?
/**
 * Format Data inside Calls
 * @param calls Call[]
 * @returns CallStruct
 */
export const transformCallsToMulticallArrays_cairo1 = (calls: Call[]) => {
  const callArray = calls.map<CallStruct>((call) => ({
    to: toBigInt(call.contractAddress).toString(10),
    selector: toBigInt(getSelectorFromName(call.entrypoint)).toString(10),
    calldata: CallData.compile(call.calldata || []),
  }));
  return callArray;
};

// TT: Can be removed ?
/**
 * Transforms a list of calls in the full flattened calldata expected
 * by the __execute__ protocol.
 * @param calls
 * @returns Calldata
 */
export const fromCallsToExecuteCalldata_cairo1 = (calls: Call[]) => {
  return CallData.compile({ calls });
};

/**
 *
 * @param calls Call array
 * @param cairoVersion Defaults to 0
 * @returns string[] of calldata
 */
export const getExecuteCalldata = (calls: Call[], cairoVersion: CairoVersion = '0') => {
  if (cairoVersion === '1') {
    return CallData.compile({ calls });
  }
  return fromCallsToExecuteCalldata(calls);
};

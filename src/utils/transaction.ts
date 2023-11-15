import {
  BigNumberish,
  CairoVersion,
  Call,
  CallStruct,
  Calldata,
  ParsedStruct,
  RawArgs,
} from '../types';
import { CallData } from './calldata';
import { getSelectorFromName } from './hash';
import { toBigInt } from './num';

/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entry points, and one with the concatenated calldata
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
 * Transforms a list of calls into the Cairo 0 `__execute__` calldata.
 */
export const fromCallsToExecuteCalldata = (calls: Call[]) => {
  const { callArray, calldata } = transformCallsToMulticallArrays(calls);
  const compiledCalls = CallData.compile({ callArray });
  return [...compiledCalls, ...calldata] as Calldata;
};

/**
 * Transforms a list of calls into the Cairo 0 `__execute__` calldata including nonce.
 *
 * @deprecated
 */
export const fromCallsToExecuteCalldataWithNonce = (calls: Call[], nonce: BigNumberish) => {
  return [...fromCallsToExecuteCalldata(calls), toBigInt(nonce).toString()] as Calldata;
};

/**
 * Format Data inside Calls
 *
 * @deprecated Not required for getting execute Calldata
 */
export const transformCallsToMulticallArrays_cairo1 = (calls: Call[]) => {
  const callArray = calls.map<CallStruct>((call) => ({
    to: toBigInt(call.contractAddress).toString(10),
    selector: toBigInt(getSelectorFromName(call.entrypoint)).toString(10),
    calldata: CallData.compile(call.calldata || []),
  }));
  return callArray;
};

/**
 * Transforms a list of calls into the Cairo 1 `__execute__` calldata.
 */
export const fromCallsToExecuteCalldata_cairo1 = (calls: Call[]) => {
  // ensure property order
  const orderCalls = calls.map((call) => ({
    contractAddress: call.contractAddress,
    entrypoint: call.entrypoint,
    calldata:
      Array.isArray(call.calldata) && '__compiled__' in call.calldata
        ? call.calldata // Calldata type
        : CallData.compile(call.calldata as RawArgs), // RawArgsObject | RawArgsArray type
  }));

  return CallData.compile({ orderCalls });
};

/**
 * Create `__execute__` Calldata from Calls based on Cairo versions
 */
export const getExecuteCalldata = (calls: Call[], cairoVersion: CairoVersion = '0') => {
  if (cairoVersion === '1') {
    return fromCallsToExecuteCalldata_cairo1(calls);
  }
  return fromCallsToExecuteCalldata(calls);
};

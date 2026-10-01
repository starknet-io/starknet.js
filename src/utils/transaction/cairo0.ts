// Cairo 0 specific: when Cairo 0 support is dropped, remove this file.
import { BigNumberish, Call, Calldata, ParsedStruct } from '../../types';
import { CallData } from '../calldata';
import { getSelectorFromName } from '../hash';
import { toBigInt } from '../num';

/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entry points, and one with the concatenated calldata
 * @param {Call[]} calls the list of calls to transform.
 * @returns {callArray: ParsedStruct[], calldata: BigNumberish[]} An object containing two arrays: callArray and calldata.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1,2,3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4,5,6]
 * 	}
 * ];
 * const result = transaction.transformCallsToMulticallArrays(calls);
 * // result = {
 * // callArray: [
 * // { to: "0x1234567890123456789012345678901234567890", selector: "1234567890",
 * // data_offset: "0", data_len: "3" },
 * // { to: "0x0987654321098765432109876543210987654321", selector: "1234567890",
 * // data_offset: "0987654321", data_offset: "3", data_len: "3"}
 * // ], calldata: [1, 2, 3, 4, 5, 6]
 * // }
 * ```
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
 * @param {Call[]} calls the list of calls to transform
 * @returns {Calldata} the Cairo 0 `__execute__` calldata
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transaction.fromCallsToExecuteCalldata(calls);
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699', '0',
 * //   '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '3', '6', '1', '2', '3', '4', '5', '6']
 * ```
 */
export const fromCallsToExecuteCalldata = (calls: Call[]) => {
  const { callArray, calldata } = transformCallsToMulticallArrays(calls);
  const compiledCalls = CallData.compile({ callArray });
  return [...compiledCalls, ...calldata] as Calldata;
};

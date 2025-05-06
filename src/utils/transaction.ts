import { UDC } from '../global/constants';
import { ETransactionVersion } from '../provider/types/spec.type';
import {
  BigNumberish,
  CairoVersion,
  Call,
  Calldata,
  ParsedStruct,
  RawArgs,
  UniversalDeployerContractPayload,
} from '../types';
import { CallData } from './calldata';
import { starkCurve } from './ec';
import { calculateContractAddressFromHash, getSelectorFromName } from './hash';
import { toBigInt, toCairoBool } from './num';
import { randomAddress } from './stark';

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

/**
 * Transforms a list of calls into the Cairo 1 `__execute__` calldata.
 * @param {Call[]} calls the list of calls to transform.
 * @returns {Calldata} the Cairo 1 `__execute__` calldata.
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
 * const result = transaction.fromCallsToExecuteCalldata_cairo1(calls);
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699',
 * //   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '4', '5', '6']
 * ```
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
 * Create `__execute__` Calldata from Calls based on Cairo versions.
 * @param {Call[]} calls the list of calls to transform
 * @param {CairoVersion} cairoVersion the Cairo version
 * @returns {Calldata} the `__execute__` calldata.
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
 * const result = transaction.getExecuteCalldata(calls, '1');
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699',
 * //   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '4', '5', '6']
 * ```
 */
export const getExecuteCalldata = (calls: Call[], cairoVersion: CairoVersion = '0') => {
  if (cairoVersion === '1') {
    return fromCallsToExecuteCalldata_cairo1(calls);
  }
  return fromCallsToExecuteCalldata(calls);
};

/**
 * Builds a UDCCall object.
 *
 * @param {UniversalDeployerContractPayload | UniversalDeployerContractPayload[]} payload the payload data for the UDCCall. Can be a single payload object or an array of payload objects.
 * @param {string} address the address to be used in the UDCCall
 * @returns { calls: Call[], addresses: string[] } the UDCCall object containing an array of calls and an array of addresses.
 * @example
 * ```typescript
 * const payload: UniversalDeployerContractPayload = {
 * classHash: "0x1234567890123456789012345678901234567890",
 * salt: "0x0987654321098765432109876543210987654321",
 * unique:true,
 * constructorCalldata: [1, 2, 3]
 * };
 * const address = "0xABCDEF1234567890ABCDEF1234567890ABCDEF12";
 * const result  = transaction.buildUDCCall(payload, address);
 * // result = {
 * // 	calls: [
 * //			{
 * //			contractAddress: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
 * //			entrypoint: "functionName",
 * //			calldata: [classHash, salt, true, 3, 1, 2, 3]
 * //		}],
 * //	addresses: ["0x6fD084B56a7EDc5C06B3eB40f97Ae5A0C707A865"]
 * // }
 * ```
 */
export function buildUDCCall(
  payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
  address: string
) {
  const params = [].concat(payload as []).map((it) => {
    const {
      classHash,
      salt,
      unique = true,
      constructorCalldata = [],
    } = it as UniversalDeployerContractPayload;

    const compiledConstructorCallData = CallData.compile(constructorCalldata);
    const deploySalt = salt ?? randomAddress();

    return {
      call: {
        contractAddress: UDC.ADDRESS,
        entrypoint: UDC.ENTRYPOINT,
        calldata: [
          classHash,
          deploySalt,
          toCairoBool(unique),
          compiledConstructorCallData.length,
          ...compiledConstructorCallData,
        ],
      },
      address: calculateContractAddressFromHash(
        unique ? starkCurve.pedersen(address, deploySalt) : deploySalt,
        classHash,
        compiledConstructorCallData,
        unique ? UDC.ADDRESS : 0
      ),
    };
  });

  return {
    calls: params.map((it) => it.call),
    addresses: params.map((it) => it.address),
  };
}

/**
 * Return transaction versions based on version type, default version type is 'transaction'.
 * @param {'fee' | 'transaction'} [versionType] the type of version ("fee" or "transaction")
 * @returns {v1: ETransactionVersion, v2: ETransactionVersion, v3: ETransactionVersion} an object containing the transaction versions.
 * @example
 * ```typescript
 * const result = transaction.getVersionsByType('fee');
 * // result = {
 * //   v1: '0x100000000000000000000000000000001',
 * //   v2: '0x100000000000000000000000000000002',
 * //   v3: '0x100000000000000000000000000000003'
 * // }
 * ```
 */
export function getVersionsByType(versionType?: 'fee' | 'transaction') {
  return versionType === 'fee'
    ? {
        v1: ETransactionVersion.F1,
        v2: ETransactionVersion.F2,
        v3: ETransactionVersion.F3,
      }
    : { v1: ETransactionVersion.V1, v2: ETransactionVersion.V2, v3: ETransactionVersion.V3 };
}

import { UDC } from '../constants';
import {
  BigNumberish,
  CairoVersion,
  Call,
  CallStruct,
  Calldata,
  ParsedStruct,
  RawArgs,
  UniversalDeployerContractPayload,
} from '../types';
import { ETransactionVersion } from '../types/api';
import { CallData } from './calldata';
import { starkCurve } from './ec';
import { calculateContractAddressFromHash, getSelectorFromName } from './hash';
import { toBigInt, toCairoBool } from './num';
import { randomAddress } from './stark';

/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entry points, and one with the concatenated calldata
 * @param calls - The list of calls to transform.
 * @returns An object containin two arrays: callArray and calldata.
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
 * const transformedData = transformCallsToMulticallArrays(calls);
 * console.log(transformedData);
 * // {
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
 * @param calls - The list of calls to transform.
 * @returns The Cairo 0 `__execute__` calldata.
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
 * const executeCalldata = fromCallsToExecuteCalldata(calls);
 * console.log(executeCalldata);
 * // [1234567890, 0987654321, 0, 6, 1, 2, 3, 4, 5, 6]
 * ```
 */
export const fromCallsToExecuteCalldata = (calls: Call[]) => {
  const { callArray, calldata } = transformCallsToMulticallArrays(calls);
  const compiledCalls = CallData.compile({ callArray });
  return [...compiledCalls, ...calldata] as Calldata;
};

/**
 * Transforms a list of calls into the Cairo 0 `__execute__` calldata including nonce.
 * @param calls - The list of calls to transform.
 * @param nonce - The nonce to include in the calldata.
 * @returns The Cairo 0 `__execute__` calldata including the nonce.
 * @deprecated
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
 * const nonce = 123;
 * const result = fromCallsToExecuteCalldataWithNonce(calls, nonce);
 * console.log(result);
 * // [1234567890, 0987654321, 0, 6, 1, 2, 3, 4, 5, 6, "123"]
 * ```
 */
export const fromCallsToExecuteCalldataWithNonce = (calls: Call[], nonce: BigNumberish) => {
  return [...fromCallsToExecuteCalldata(calls), toBigInt(nonce).toString()] as Calldata;
};

/**
 * Format Data inside Calls
 * @param calls - The list of calls to transform.
 * @deprecated Not required for getting execute Calldata
 * @returns An array of formatted call data.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890"
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transformCallsToMulticallArrays_cairo1(calls);
 * console.log(formattedCalls);
 * // [
 * //	{
 * //		to: "1234567890123456789012345678901234567890",
 * //		selector: "1234567890",
 * //		calldata: [1, 2, 3]
 * //	},
 * //	{
 * //		to: "0987654321098765432109876543210987654321",
 * //		selector: "0987654321",
 * //		calldata: [4, 5, 6]
 * //	}
 * // ]
 * ```
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
 * @param calls - The list of calls to transform.
 * @returns The Cairo 1 `__execute__` calldata.
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
 * const result = fromCallsToExecuteCalldata_cairo1(calls);
 * console.log(result);
 * // [1234567890, 0987654321, 0, 6, 1, 2, 3, 4, 5, 6]
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
 * @param calls - The list of calls to transform.
 * @param cairoVersion - The Cairo version.
 * @returns The `__execute__` calldata.
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
 * const result = getExecuteCalldata(calls, '1');
 * console.log(result);
 * // [1234567890, 0987654321, 0, 6, 1, 2, 3, 4, 5, 6]
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
 * @param {UniversalDeployerContractPayload | UniversalDeployerContractPayload[]} payload - The payload data for the UDCCall. Can be a single payload object or an array of payload objects.
 * @param {string} address - The address to be used in the UDCCall.
 * @returns {{ calls: Array, addresses: Array }} - The UDCCall object containing an array of calls and an array of addresses.
 * @example
 * ```typescript
 * const payload: UniversalDeployerContractPayload = {
 * classHash: "0x1234567890123456789012345678901234567890",
 * salt: "0x0987654321098765432109876543210987654321",
 * unique:true,
 * constructCalldata: [1, 2, 3]
 * };
 * const address = "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
 * const udcall  = buildUDCCall(payload, address);
 * console.log(udccall);
 * // {
 * // 	calls: [
 * 			{
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
 * @param versionType - The type of version ("fee" or "transaction").
 * @returns An object containing transaction versions.
 * @example
 * ```typescript
 * const transactionVersions = getVersionsByType('fee');
 * console.log(transactionVersions);
 * // { v1: 1, v2: 2, v3: 3 }
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

import { ETransactionVersion } from '../../provider/types/spec.type';
import { CairoVersion, Call, RawArgs } from '../../types';
import { CallData } from '../calldata';
import { fromCallsToExecuteCalldata } from './cairo0';

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
  // Cairo 0 specific: when Cairo 0 support is dropped, remove the '0' default. Then, if Starknet
  // still holds Cairo 0 contracts, replace the Cairo 0 branch by a clear error; otherwise remove it.
  if (cairoVersion === '1') {
    return fromCallsToExecuteCalldata_cairo1(calls);
  }
  return fromCallsToExecuteCalldata(calls);
};

/**
 * Return transaction versions based on version type, default version type is 'transaction'.
 * @param {'fee' | 'transaction'} [versionType] the type of version ("fee" or "transaction")
 * @returns {v3: ETransactionVersion} an object containing the transaction versions.
 * @example
 * ```typescript
 * const result = transaction.getVersionsByType('fee');
 * // result = {
 * //   v3: '0x100000000000000000000000000000003'
 * // }
 * ```
 */
export function getVersionsByType(versionType?: 'fee' | 'transaction') {
  return versionType === 'fee'
    ? {
        v3: ETransactionVersion.F3,
      }
    : { v3: ETransactionVersion.V3 };
}

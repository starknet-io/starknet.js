import { CallData } from './calldata';
import { Call, type AllowArray, type BigNumberish, type Calldata } from '../types/lib';
import {
  OutsideExecutionTypesV1,
  OutsideExecutionTypesV2,
  OutsideExecutionVersion,
  type OutsideCall,
  type OutsideExecutionOptions,
  type OutsideTransaction,
  type TypedData,
} from '../types';
import { getSelectorFromName } from './hash/selector';
import { formatSignature } from './stark';
import { toHex } from './num';

/**
 * Converts a Call object to an OutsideCall object that can be used for an Outside Execution.
 * @param {Call} call transaction to proceed.
 * @returns {OutsideCall} transaction formatted in conformity to SNIP-9
 * @example
 * ```typescript
 * const call1: Call = {
 *    contractAddress: '0x0123',
 *    entrypoint: 'transfer',
 *    calldata: { recipient: '0xabcd', amount: cairo.uint256(10) },
 *  };
 *  const result = outsideExecution.getOutsideCall(call1);
 *  // result = {
 *  //  to: '0x0123',
 *  //  selector: getSelectorFromName(call1.entrypoint),
 *  //  calldata: ['43981', '10', '0'],
 *  //}
 * ```
 */
export function getOutsideCall(call: Call): OutsideCall {
  const callData = call.calldata ?? [];
  const callDataCompiled = Array.isArray(callData) ? callData : CallData.compile(callData);
  return {
    to: call.contractAddress,
    selector: getSelectorFromName(call.entrypoint),
    calldata: callDataCompiled,
  };
}

/**  represents a call object as a typed data, supporting both v1 and v2 versions */
function callToTypedData(call: Call, version: OutsideExecutionVersion) {
  const outsideCall = getOutsideCall(call);
  if (version === '1') {
    return {
      ...outsideCall,
      calldata_len: outsideCall.calldata.length,
      calldata: outsideCall.calldata,
    };
  }
  return {
    To: outsideCall.to,
    Selector: outsideCall.selector,
    Calldata: outsideCall.calldata,
  };
}

function getDomain(chainId: string, version: OutsideExecutionVersion) {
  return {
    name: 'Account.execute_from_outside',
    version,
    chainId,
    ...(version === '2' ? { revision: '1' } : {}),
  };
}

/**
 * Build a TypedData message that will be used for an Outside execution.
 * @param {string} chainId  The encoded string of the name of network.
 * @param {OutsideExecutionOptions} options Parameters related to an Outside Execution.
 * @param {BigNumberish} nonce Outside execution nonce (not to confuse with normal transaction nonce).
 * @param {Call[]} myCalls transaction(s) to proceed.
 * @param {OutsideExecutionVersion} version SNIP-9 V1 or V2.
 * @returns {TypedData} SNIP-12 message conform to SNIP-9.
 * @example
 * ```typescript
 * const callOptions: OutsideExecutionOptions = {
 *    caller: '0x1234',
 *    execute_after: 100,
 *    execute_before: 200,
 *  };
 *  const result: TypedData = outsideExecution.getTypedData(
 *    constants.StarknetChainId.SN_SEPOLIA,
 *    callOptions,
 *    21,
 *    [call1],
 *    EOutsideExecutionVersion.V2
 *  );
 *  // result = {
 *  //  domain: {
 *  //    chainId: '0x534e5f5345504f4c4941',
 *  //    name: 'Account.execute_from_outside',
 *  //    revision: '1',
 *  //    version: '2',
 *  //  },
 *  //  message: {
 *  //    Caller: '0x1234',
 *  //  ...
 * ```
 */
export function getTypedData(
  chainId: string,
  options: OutsideExecutionOptions,
  nonce: BigNumberish,
  myCalls: Call[],
  version: OutsideExecutionVersion
): TypedData {
  if (version === '1') {
    return {
      types: OutsideExecutionTypesV1,
      primaryType: 'OutsideExecution',
      domain: getDomain(chainId, version),
      message: {
        ...options,
        nonce,
        calls_len: myCalls.length,
        calls: myCalls.map((call) => callToTypedData(call, version)),
      },
    };
  }
  return {
    types: OutsideExecutionTypesV2,
    primaryType: 'OutsideExecution',
    domain: getDomain(chainId, version),
    message: {
      Caller: options.caller,
      Nonce: nonce,
      'Execute After': options.execute_after,
      'Execute Before': options.execute_before,
      Calls: myCalls.map((call) => callToTypedData(call, version)),
    },
  };
}

/**
 * Builds a Calldata for the execute_from_outside() entrypoint.
 * @param {OutsideTransaction} outsideTransaction an object that contains all the data for a Outside Execution.
 * @returns {Calldata} The Calldata related to this Outside transaction
 * @example
 * ```typescript
 * const outsideTransaction: OutsideTransaction = {
 *     outsideExecution: {
 *      caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 *      nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
 *      execute_after: 500, execute_before: 600,
 *      calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
 *    },
 *    signature: ['0x123', '0x456'],
 *    signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
 *    version: EOutsideExecutionVersion.V2,
 *  };
 *
 *  const result: Calldata = outsideExecution.buildExecuteFromOutsideCallData(outsideTransaction);
 * // result =      ['2846891009026995430665703316224827616914889274105712248413538305735679628945',
 * //   '3534941323322368687588030484849371698982661160919690922146419787802417549486',
 * //   '500', '600', '1', '1656', '2192', '2', '12', '13', '2', '291', '1110']
 * ```
 */
export function buildExecuteFromOutsideCallData(outsideTransaction: OutsideTransaction): Calldata {
  const execution = outsideTransaction.outsideExecution;
  const formattedSignature = formatSignature(outsideTransaction.signature);
  return CallData.compile({
    outside_execution: execution,
    signature: formattedSignature,
  });
}

/**
 * Builds a Call for execute(), estimateFee() and simulateTransaction() functions.
 * @param {AllowArray<OutsideTransaction>} outsideTransaction an object that contains all the data for an Outside Execution.
 * @returns {Call[]} The Call related to this Outside transaction
 * @example
 * ```typescript
 * const outsideTransaction: OutsideTransaction = {
 *     outsideExecution: {
 *      caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 *      nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
 *      execute_after: 500, execute_before: 600,
 *      calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
 *    },
 *    signature: ['0x123', '0x456'],
 *    signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
 *    version: EOutsideExecutionVersion.V2,
 *  };
 *
 *  const result: Call[] = outsideExecution.buildExecuteFromOutsideCall(outsideTransaction);
 * // result = [{contractAddress: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 * //   entrypoint: 'execute_from_outside_v2',
 * //   calldata: [ ... ],
 * // }]
 * ```
 */
export function buildExecuteFromOutsideCall(
  outsideTransaction: AllowArray<OutsideTransaction>
): Call[] {
  const myOutsideTransactions = Array.isArray(outsideTransaction)
    ? outsideTransaction
    : [outsideTransaction];
  const multiCall: Call[] = myOutsideTransactions.map((outsideTx: OutsideTransaction) => {
    let entrypoint: string;
    if (outsideTx.version === OutsideExecutionVersion.V1) {
      entrypoint = 'execute_from_outside';
    } else if (outsideTx.version === OutsideExecutionVersion.V2) {
      entrypoint = 'execute_from_outside_v2';
    } else {
      throw new Error('Unsupported OutsideExecution version');
    }
    return {
      contractAddress: toHex(outsideTx.signerAddress),
      entrypoint,
      calldata: buildExecuteFromOutsideCallData(outsideTx),
    };
  });
  return multiCall;
}

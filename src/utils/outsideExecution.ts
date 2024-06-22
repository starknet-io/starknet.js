import { CallData } from './calldata';
import { getSelectorFromName } from './selector';
import { encodeShortString } from './shortString';
import { Call } from '../types/lib';
import {
  OutsideExecutionOptions,
  OutsideCall,
  EOutsideExecutionVersion,
  OutsideExecutionTypesV1,
  OutsideExecutionTypesV2,
} from '../types/outsideExecutionTypes';

export const OutsideExecutionCallerAny = encodeShortString('ANY_CALLER');

export class OutsideExecution {
  options: OutsideExecutionOptions;

  calls: Call[];

  constructor(calls: Call[], options: OutsideExecutionOptions) {
    this.calls = calls;
    this.options = options;
  }

  getTypedData(chainId: string, version: EOutsideExecutionVersion) {
    if (version === '1') {
      return {
        types: OutsideExecutionTypesV1,
        primaryType: 'OutsideExecution',
        domain: getDomain(chainId, version),
        message: {
          ...this.options,
          calls_len: this.calls.length,
          calls: this.calls.map((call) => callToTypedData(call, version)),
        },
      };
    }
    return {
      types: OutsideExecutionTypesV2,
      primaryType: 'OutsideExecution',
      domain: getDomain(chainId, version),
      message: {
        Caller: this.options.caller,
        Nonce: this.options.nonce,
        'Execute After': this.options.execute_after,
        'Execute Before': this.options.execute_before,
        Calls: this.calls.map((call) => callToTypedData(call, version)),
      },
    };
  }

  // Returns the ABI representation to be used with Account entrypoints.
  // (may still be needed if different versions of the same object are used)
  getABIData() {
    return {
      caller: this.options.caller,
      nonce: this.options.nonce,
      execute_after: this.options.execute_after,
      execute_before: this.options.execute_before,
      calls: this.calls.map((call) => getOutsideCall(call)),
    };
  }
}

function getDomain(chainId: string, version: EOutsideExecutionVersion) {
  return {
    name: 'Account.execute_from_outside',
    version,
    chainId,
    ...(version === '2' ? { revision: '1' } : {}),
  };
}

// converts a Call object to an OutsideCall object that can be used in the OutsideExecution object
// TODO maybe just use the Call object directly?
function getOutsideCall(call: Call): OutsideCall {
  const callData = call.calldata ?? [];
  const callDataCompiled = Array.isArray(callData) ? callData : CallData.compile(callData);
  return {
    to: call.contractAddress,
    selector: getSelectorFromName(call.entrypoint),
    calldata: callDataCompiled,
  };
}

// represents a call object as a typed data, supporting both v1 and v2 versions
function callToTypedData(call: Call, version: EOutsideExecutionVersion) {
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

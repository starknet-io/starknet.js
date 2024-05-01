import { getSelectorFromName } from '../utils/selector';
import { encodeShortString } from '../utils/shortString';
import { BigNumberish, Call, RawArgs } from './lib';

interface OutsideExecutionOptions {
  caller: string;
  nonce: BigNumberish;
  execute_after: BigNumberish;
  execute_before: BigNumberish;
}

export interface OutsideCall {
  to: string;
  selector: BigNumberish;
  calldata: RawArgs;
}

export const SNIP9_V1_INTERFACE_ID =
  '0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181';
export const SNIP9_V2_INTERFACE_ID =
  '0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872';

export const OutsideExecutionTypesV1 = {
  StarkNetDomain: [
    { name: 'name', type: 'felt' },
    { name: 'version', type: 'felt' },
    { name: 'chainId', type: 'felt' },
  ],
  OutsideExecution: [
    { name: 'caller', type: 'felt' },
    { name: 'nonce', type: 'felt' },
    { name: 'execute_after', type: 'felt' },
    { name: 'execute_before', type: 'felt' },
    { name: 'calls_len', type: 'felt' },
    { name: 'calls', type: 'OutsideCall*' },
  ],
  OutsideCall: [
    { name: 'to', type: 'felt' },
    { name: 'selector', type: 'felt' },
    { name: 'calldata_len', type: 'felt' },
    { name: 'calldata', type: 'felt*' },
  ],
};

export const OutsideExecutionTypesV2 = {
  StarknetDomain: [
    // SNIP-12 revision 1 is used, so should be "StarknetDomain", not "StarkNetDomain"
    { name: 'name', type: 'shortstring' },
    { name: 'version', type: 'shortstring' }, // set to 2 in v2
    { name: 'chainId', type: 'shortstring' },
    { name: 'revision', type: 'shortstring' },
  ],
  OutsideExecution: [
    { name: 'Caller', type: 'ContractAddress' },
    { name: 'Nonce', type: 'felt' },
    { name: 'Execute After', type: 'u128' },
    { name: 'Execute Before', type: 'u128' },
    { name: 'Calls', type: 'Call*' },
  ],
  Call: [
    { name: 'To', type: 'ContractAddress' },
    { name: 'Selector', type: 'selector' },
    { name: 'Calldata', type: 'felt*' },
  ],
};

export declare enum EOutsideExecutionVersion {
  V1 = '1',
  V2 = '2',
}

export const OutsideExecutionCallerAny = encodeShortString('ANY_CALLER');

export class OutsideExecution {
  options: OutsideExecutionOptions; // TODO maybe need to use concrete types here (not "bigNumberish" etc)

  calls: Call[];

  // TODO accept Calls and OutsideCalls, determine by contractAddress field or by instanceOf
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
  // TODO May be not needed if we maintain the correct structure in the object
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
  return {
    to: call.contractAddress,
    selector: getSelectorFromName(call.entrypoint),
    calldata: call.calldata ?? [],
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

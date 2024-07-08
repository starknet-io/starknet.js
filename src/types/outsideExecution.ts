import { BigNumberish, RawArgs } from './lib';

export interface OutsideExecutionOptions {
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

export enum EOutsideExecutionVersion {
  V1 = '1',
  V2 = '2',
}

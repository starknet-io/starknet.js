import { ValuesType } from './helpers/valuesType';
import { BigNumberish, RawArgs, type Signature } from './lib';

export interface OutsideExecutionOptions {
  /** authorized executer of the transaction(s):  Hex address or "ANY_CALLER" or shortString.encodeShortString(constants.OutsideExecutionCallerAny) */
  caller: string;
  /** Unix timestamp of the beginning of the timeframe */
  execute_after: BigNumberish;
  /** Unix timestamp of the end of the timeframe */
  execute_before: BigNumberish;
}

export interface OutsideCall {
  to: string;
  selector: BigNumberish;
  calldata: RawArgs;
}

export interface OutsideExecution {
  caller: string;
  nonce: BigNumberish;
  execute_after: BigNumberish;
  execute_before: BigNumberish;
  calls: OutsideCall[];
}

export interface OutsideTransaction {
  outsideExecution: OutsideExecution;
  signature: Signature;
  signerAddress: BigNumberish;
  version: OutsideExecutionVersion;
}

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

export const OutsideExecutionVersion = {
  UNSUPPORTED: '0',
  V1: '1',
  V2: '2',
} as const;
export type OutsideExecutionVersion = ValuesType<typeof OutsideExecutionVersion>;

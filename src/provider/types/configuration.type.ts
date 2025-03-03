import { NetworkName, StarknetChainId, SupportedRpcVersion } from '../../global/constants';
import { BlockIdentifier } from '../../types/lib';
import { ResourceBoundsOverhead } from './spec.type';

export interface ProviderOptions extends RpcProviderOptions {}

export type FeeMarginPercentage = {
  bounds: ResourceBoundsOverhead; // V3 tx
  maxFee: number; // V legacy tx
};

export type RpcProviderOptions = {
  nodeUrl?: string | NetworkName;
  retries?: number;
  transactionRetryIntervalFallback?: number;
  headers?: object;
  blockIdentifier?: BlockIdentifier;
  chainId?: StarknetChainId;
  specVersion?: SupportedRpcVersion;
  default?: boolean;
  waitMode?: boolean;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
  feeMarginPercentage?: FeeMarginPercentage;
  batch?: false | number;
};

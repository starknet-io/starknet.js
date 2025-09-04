import { NetworkName, StarknetChainId, SupportedRpcVersion } from '../../global/constants';
import { BlockIdentifier } from '../../types/lib';
import { ResourceBoundsOverhead } from './spec.type';

export interface ProviderOptions extends RpcProviderOptions {}

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
  resourceBoundsOverhead?: ResourceBoundsOverhead | false;
  batch?: false | number;
};

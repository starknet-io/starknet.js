import { NetworkName, StarknetChainId } from '../../global/constants';
import { BlockIdentifier } from '../../types/lib';

export interface ProviderOptions extends RpcProviderOptions {}

export type RpcProviderOptions = {
  nodeUrl?: string | NetworkName;
  retries?: number;
  transactionRetryIntervalFallback?: number;
  headers?: object;
  blockIdentifier?: BlockIdentifier;
  chainId?: StarknetChainId;
  specVersion?: string;
  default?: boolean;
  waitMode?: boolean;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
  feeMarginPercentage?: {
    l1BoundMaxAmount: number;
    l1BoundMaxPricePerUnit: number;
    maxFee: number;
  };
  batch?: false | number;
};

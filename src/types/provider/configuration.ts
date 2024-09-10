import { NetworkName } from '../../constants';
import { BlockIdentifier, ChainId } from '../lib';

export interface ProviderOptions extends RpcProviderOptions {}

export type RpcProviderOptions = {
  nodeUrl?: string | NetworkName;
  retries?: number;
  transactionRetryIntervalFallback?: number;
  headers?: object;
  blockIdentifier?: BlockIdentifier;
  chainId?: ChainId;
  specVersion?: string;
  default?: boolean;
  waitMode?: boolean;
  feeMarginPercentage?: {
    l1BoundMaxAmount: number;
    l1BoundMaxPricePerUnit: number;
    maxFee: number;
  };
  batch?: false | number;
};

// export type ChainId = `0x${string}`;

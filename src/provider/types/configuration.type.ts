import { NetworkName, StarknetChainId, SupportedRpcVersion } from '../../global/constants';
import { BlockIdentifier, waitForTransactionOptions } from '../../types/lib';
import { ResourceBoundsOverhead } from './spec.type';

export interface ProviderOptions extends RpcProviderOptions {}

export type RpcProviderOptions = {
  nodeUrl?: string | NetworkName;
  /**
   * Define the number of retries for waitForTransaction
   */
  retries?: waitForTransactionOptions['retries'];
  /**
   * Define the time interval between retries in milliseconds
   */
  transactionRetryIntervalFallback?: number;
  /**
   * Define the headers
   */
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

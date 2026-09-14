import { NetworkName, StarknetChainId, SupportedRpcVersion } from '../../global/constants';
import { BlockIdentifier, waitForTransactionOptions } from '../../types/lib';
import type { PluginConfig } from '../../plugins/types';
import type { RpcTransport } from '../../channel/transport';
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
  waitMode?: boolean;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
  /**
   * Carries JSON-RPC envelopes to the node. Defaults to an `HttpTransport` built from `nodeUrl`,
   * `headers` and `baseFetch`, so leaving it unset keeps the historical behaviour.
   */
  transport?: RpcTransport;
  resourceBoundsOverhead?: ResourceBoundsOverhead | false;
  batch?: false | number;
} & PluginConfig;

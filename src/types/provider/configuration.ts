import { NetworkName, StarknetChainId } from '../../constants';
import { BlockIdentifier } from '../lib';

export interface ProviderOptions extends RpcProviderOptions {}

export type RpcProviderOptions = {
  nodeUrl?: string | NetworkName;
  retries?: number;
  headers?: object;
  blockIdentifier?: BlockIdentifier;
  chainId?: StarknetChainId;
  default?: boolean;
  waitMode?: boolean;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
};

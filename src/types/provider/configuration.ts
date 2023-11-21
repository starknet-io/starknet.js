import { NetworkName, StarknetChainId } from '../../constants';
import { BlockIdentifier } from '../lib';

export interface ProviderOptions extends RpcProviderOptions {
  rpc: RpcProviderOptions; // backward-compatibility
}

export type RpcProviderOptions = {
  nodeUrl?: string | NetworkName;
  retries?: number;
  headers?: object;
  blockIdentifier?: BlockIdentifier;
  chainId?: StarknetChainId;
  default?: boolean;
};

export type SequencerHttpMethod = 'POST' | 'GET';

export type SequencerProviderOptions = {
  headers?: Record<string, string>;
  blockIdentifier?: BlockIdentifier;
  chainId?: StarknetChainId;
} & (
  | {
      network: NetworkName | StarknetChainId;
    }
  | {
      baseUrl: string;
      feederGatewayUrl?: string;
      gatewayUrl?: string;
    }
);

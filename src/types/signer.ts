import { StarknetChainId } from '../constants';
import { BigNumberish } from '../utils/number';
import { DeployAccountContractPayload, InvocationsDetails } from './lib';

export interface InvocationsSignerDetails extends Required<InvocationsDetails> {
  walletAddress: string;
  chainId: StarknetChainId;
}

export interface DeclareSignerDetails {
  // contractClass: ContractClass,  // Should be used once class hash is present in ContractClass
  classHash: BigNumberish;
  senderAddress: BigNumberish;
  chainId: StarknetChainId;
  maxFee: BigNumberish;
  version: BigNumberish;
  nonce: BigNumberish;
}

export type DeployAccountSignerDetails = Required<DeployAccountContractPayload> &
  Required<InvocationsDetails> & {
    contractAddress: BigNumberish;
    chainId: StarknetChainId;
  };

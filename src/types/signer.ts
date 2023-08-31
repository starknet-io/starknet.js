import { StarknetChainId } from '../constants';
import {
  BigNumberish,
  CairoVersion,
  DeployAccountContractPayload,
  InvocationsDetails,
} from './lib';

export interface InvocationsSignerDetails extends Required<InvocationsDetails> {
  walletAddress: string;
  chainId: StarknetChainId;
  cairoVersion: CairoVersion;
}

export interface DeclareSignerDetails {
  classHash: string;
  senderAddress: string;
  chainId: StarknetChainId;
  maxFee: BigNumberish;
  version: BigNumberish;
  nonce: BigNumberish;
  compiledClassHash?: string;
}

export interface AbstractionSigns {
  abstractedTransactionSign?: Function;
  abstractedAccountDeploySign?: Function;
  abstractedContractDeploySign?: Function;
  abstractedMessageSign?: Function;
}

export interface AbstractionHashs {
  abstractedTransactionHash?: Function;
  abstractedAccountDeployHash?: Function;
  abstractedContractDeployHash?: Function;
  abstractedMessageHash?: Function;
}

export type DeployAccountSignerDetails = Required<DeployAccountContractPayload> &
  Required<InvocationsDetails> & {
    contractAddress: BigNumberish;
    chainId: StarknetChainId;
  };

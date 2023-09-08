import { StarknetChainId } from '../constants';
import {
  BigNumberish,
  CairoVersion,
  DeployAccountContractPayload,
  InvocationsDetails,
  RawCalldata,
  Signature,
} from './lib';
import { TypedData } from './typedData';

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

export type AbstractionDeployAccountFunctionSign = (
  standardInputData: DeployAccountSignerDetails,
  privateKey: string,
  ...additionalParams: string[]
) => Signature;

export type AbstractionTransactionFunctionSign = (
  standardInputData: {
    contractAddress: BigNumberish;
    version: BigNumberish;
    calldata: RawCalldata;
    maxFee: BigNumberish;
    chainId: StarknetChainId;
    nonce: BigNumberish;
  },
  privateKey: string,
  ...additionalParams: string[]
) => Signature;

export type AbstractionDeclareFunctionSign = (
  standardInputData: DeclareSignerDetails,
  privateKey: string,
  ...additionalParams: string[]
) => Signature;

export type AbstractionMessageFunctionHash = (
  typedData: TypedData,
  accountAddress: string,
  ...additionalParams: string[]
) => string;

export type AbstractionMessageFunctionSign = (
  msgHash: string,
  privateKey: string,
  ...additionalParams: string[]
) => Signature;

export interface AbstractionFunctions {
  abstractedTransactionSign?: AbstractionTransactionFunctionSign;
  abstractedDeployAccountSign?: AbstractionDeployAccountFunctionSign;
  abstractedDeclareSign?: AbstractionDeclareFunctionSign;
  abstractedMessageHash?: AbstractionMessageFunctionHash;
  abstractedMessageSign?: AbstractionMessageFunctionSign;
}

export type DeployAccountSignerDetails = Required<DeployAccountContractPayload> &
  Required<InvocationsDetails> & {
    contractAddress: BigNumberish;
    chainId: StarknetChainId;
  };

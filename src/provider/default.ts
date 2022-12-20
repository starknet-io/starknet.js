import { StarknetChainId } from '../constants';
import {
  Call,
  CallContractResponse,
  ContractClass,
  DeclareContractResponse,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  InvokeFunctionResponse,
  Status,
} from '../types';
import { BigNumberish } from '../utils/number';
import { ProviderInterface } from './interface';
import { RpcProvider, RpcProviderOptions } from './rpc';
import { SequencerProvider, SequencerProviderOptions } from './sequencer';
import { BlockIdentifier } from './utils';

export interface ProviderOptions {
  sequencer?: SequencerProviderOptions;
  rpc?: RpcProviderOptions;
}

export class Provider implements ProviderInterface {
  private provider!: ProviderInterface;

  constructor(providerOrOptions?: ProviderOptions | ProviderInterface) {
    if (providerOrOptions instanceof Provider) {
      // providerOrOptions is Provider
      this.provider = providerOrOptions.provider;
    } else if (
      providerOrOptions instanceof RpcProvider ||
      providerOrOptions instanceof SequencerProvider
    ) {
      // providerOrOptions is SequencerProvider or RpcProvider
      this.provider = <ProviderInterface>providerOrOptions;
    } else if (providerOrOptions && 'rpc' in providerOrOptions) {
      // providerOrOptions is rpc option
      this.provider = new RpcProvider(<RpcProviderOptions>providerOrOptions.rpc);
    } else if (providerOrOptions && 'sequencer' in providerOrOptions) {
      // providerOrOptions is sequencer option
      this.provider = new SequencerProvider(<SequencerProviderOptions>providerOrOptions.sequencer);
    } else {
      // providerOrOptions is none, create SequencerProvider as default
      this.provider = new SequencerProvider();
    }
  }

  public get chainId(): StarknetChainId {
    return this.provider.chainId;
  }

  public async getChainId(): Promise<StarknetChainId> {
    return this.provider.getChainId();
  }

  public async getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse> {
    return this.provider.getBlock(blockIdentifier);
  }

  public async getClassAt(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClass> {
    return this.provider.getClassAt(contractAddress, blockIdentifier);
  }

  public async getClassHashAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier
  ): Promise<string> {
    return this.provider.getClassHashAt(contractAddress, blockIdentifier);
  }

  public getClassByHash(classHash: string): Promise<ContractClass> {
    return this.provider.getClassByHash(classHash);
  }

  public async getEstimateFee(
    invocationWithTxType: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.provider.getEstimateFee(invocationWithTxType, invocationDetails, blockIdentifier);
  }

  public async getInvokeEstimateFee(
    invocationWithTxType: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.provider.getInvokeEstimateFee(
      invocationWithTxType,
      invocationDetails,
      blockIdentifier
    );
  }

  public async getNonceForAddress(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<BigNumberish> {
    return this.provider.getNonceForAddress(contractAddress, blockIdentifier);
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<BigNumberish> {
    return this.provider.getStorageAt(contractAddress, key, blockIdentifier);
  }

  public async getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
    return this.provider.getTransaction(txHash);
  }

  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    return this.provider.getTransactionReceipt(txHash);
  }

  public async callContract(
    request: Call,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse> {
    return this.provider.callContract(request, blockIdentifier);
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse> {
    return this.provider.invokeFunction(functionInvocation, details);
  }

  public async deployAccountContract(
    payload: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeployContractResponse> {
    return this.provider.deployAccountContract(payload, details);
  }

  public async declareContract(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeclareContractResponse> {
    return this.provider.declareContract(transaction, details);
  }

  public async getDeclareEstimateFee(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.provider.getDeclareEstimateFee(transaction, details, blockIdentifier);
  }

  public getDeployAccountEstimateFee(
    transaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.provider.getDeployAccountEstimateFee(transaction, details, blockIdentifier);
  }

  public async getCode(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse> {
    return this.provider.getCode(contractAddress, blockIdentifier);
  }

  public async waitForTransaction(
    txHash: BigNumberish,
    retryInterval?: number,
    successStates?: Array<Status>
  ): Promise<GetTransactionReceiptResponse> {
    return this.provider.waitForTransaction(txHash, retryInterval, successStates);
  }
}

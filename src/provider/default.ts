import { StarknetChainId } from '../constants';
import {
  CallContractResponse,
  DeclareContractPayload,
  DeclareContractResponse,
  DeployContractPayload,
  DeployContractResponse,
  EstimateFeeResponse,
  FunctionCall,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetails,
  InvokeFunctionResponse,
} from '../types';
import { BigNumberish } from '../utils/number';
import { GatewayProvider, GatewayProviderOptions } from './gateway';
import { ProviderInterface } from './interface';
import { RPCProvider, RpcProviderOptions } from './rpc';
import { BlockIdentifier } from './utils';

export interface ProviderOptions {
  gateway: GatewayProviderOptions;
  rpc: RpcProviderOptions;
}

export class Provider implements ProviderInterface {
  private provider!: ProviderInterface;

  constructor(options?: ProviderOptions) {
    if (options && 'rpc' in options) {
      this.provider = new RPCProvider(options.rpc);
    }

    this.provider = new GatewayProvider(options?.gateway);
  }

  public get chainId(): StarknetChainId {
    return this.provider.chainId;
  }

  public async getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse> {
    return this.provider.getBlock(blockIdentifier);
  }

  public async getClassAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<any> {
    return this.provider.getClassAt(contractAddress, blockIdentifier);
  }

  public async getEstimateFee(
    request: FunctionCall,
    blockIdentifier: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.provider.getEstimateFee(request, blockIdentifier);
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier = 'pending'
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
    request: FunctionCall,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<CallContractResponse> {
    return this.provider.callContract(request, blockIdentifier);
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetails
  ): Promise<InvokeFunctionResponse> {
    return this.provider.invokeFunction(functionInvocation, details);
  }

  public async deployContract(payload: DeployContractPayload): Promise<DeployContractResponse> {
    return this.provider.deployContract(payload);
  }

  public async declareContract(payload: DeclareContractPayload): Promise<DeclareContractResponse> {
    return this.provider.declareContract(payload);
  }

  public async waitForTransaction(txHash: BigNumberish, retryInterval: number): Promise<void> {
    return this.provider.waitForTransaction(txHash, retryInterval);
  }
}

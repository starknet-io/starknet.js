import { StarknetChainId } from '../constants';
import {
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  Call,
  CallContractResponse,
  ContractClassResponse,
  ContractVersion,
  DeclareContractResponse,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  DeployContractResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  InvokeFunctionResponse,
  Nonce,
  ProviderOptions,
  RpcProviderOptions,
  SimulateTransactionResponse,
  StateUpdateResponse,
  Storage,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
} from '../types';
import { RPCResponseParser } from '../utils/responseParser/rpc';
import { StarknetId } from './extensions/starknetId';
import { ProviderInterface } from './interface';
import { RpcProvider } from './rpc';

/**
 * Represent old common ProviderInterface interface used in RPCProvider
 * Backward compatible to old provider now using only rpc provider
 */
export class Provider implements ProviderInterface {
  private provider!: RpcProvider;

  private responseParser = new RPCResponseParser();

  constructor(providerOrOptions?: ProviderOptions | ProviderInterface) {
    if (providerOrOptions instanceof Provider) {
      // providerOrOptions is Provider
      this.provider = providerOrOptions.provider;
    } else if (providerOrOptions instanceof RpcProvider) {
      // providerOrOptions is RpcProvider
      this.provider = <RpcProvider>providerOrOptions;
    } else if (providerOrOptions && 'rpc' in providerOrOptions) {
      // providerOrOptions is rpc option
      this.provider = new RpcProvider(<RpcProviderOptions>providerOrOptions.rpc);
    } else {
      // providerOrOptions is none, create RpcProvider as default
      this.provider = new RpcProvider();
    }
  }

  public async getChainId(): Promise<StarknetChainId> {
    return this.provider.getChainId();
  }

  public async getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse> {
    return this.provider
      .getBlockWithTxHashes(blockIdentifier)
      .then(this.responseParser.parseGetBlockResponse);
  }

  public async getClass(classHash: BigNumberish, blockIdentifier?: BlockIdentifier) {
    return this.provider.getClass(classHash, blockIdentifier);
  }

  public async getClassAt(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClassResponse> {
    return this.provider.getClassAt(contractAddress, blockIdentifier);
  }

  public async getClassHashAt(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<string> {
    return this.provider.getClassHashAt(contractAddress, blockIdentifier);
  }

  public getClassByHash(classHash: string): Promise<ContractClassResponse> {
    return this.provider.getClassByHash(classHash);
  }

  public async getEstimateFee(
    invocationWithTxType: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.getInvokeEstimateFee(invocationWithTxType, invocationDetails, blockIdentifier);
  }

  public async getInvokeEstimateFee(
    invocationWithTxType: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.provider
      .getInvokeEstimateFee(invocationWithTxType, invocationDetails, blockIdentifier)
      .then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    options: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulk> {
    return this.provider
      .getEstimateFeeBulk(invocations, options)
      .then(this.responseParser.parseFeeEstimateBulkResponse);
  }

  public async getNonceForAddress(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<Nonce> {
    return this.provider.getNonceForAddress(contractAddress, blockIdentifier);
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<Storage> {
    return this.provider.getStorageAt(contractAddress, key, blockIdentifier);
  }

  public async getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
    return this.provider
      .getTransactionByHash(txHash)
      .then(this.responseParser.parseGetTransactionResponse);
  }

  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    return this.provider.getTransactionReceipt(txHash);
  }

  public async callContract(
    request: Call,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse> {
    return this.provider
      .callContract(request, blockIdentifier)
      .then(this.responseParser.parseCallContractResponse);
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
    return this.provider
      .getDeclareEstimateFee(transaction, details, blockIdentifier)
      .then(this.responseParser.parseFeeEstimateResponse);
  }

  public getDeployAccountEstimateFee(
    transaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.provider
      .getDeployAccountEstimateFee(transaction, details, blockIdentifier)
      .then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getCode(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse> {
    return this.provider.getCode(contractAddress, blockIdentifier);
  }

  public async waitForTransaction(
    txHash: BigNumberish,
    options?: waitForTransactionOptions
  ): Promise<GetTransactionReceiptResponse> {
    return this.provider.waitForTransaction(txHash, options);
  }

  public async getSimulateTransaction(
    invocations: AccountInvocations,
    options?: getSimulateTransactionOptions
  ): Promise<SimulateTransactionResponse> {
    return this.provider
      .simulateTransaction(invocations, options)
      .then(this.responseParser.parseSimulateTransactionResponse);
  }

  public async getStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse> {
    return this.provider.getBlockStateUpdate(blockIdentifier);
  }

  public async getStarkName(address: BigNumberish, StarknetIdContract?: string): Promise<string> {
    return StarknetId.getStarkName(this, address, StarknetIdContract);
  }

  public async getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string> {
    return StarknetId.getAddressFromStarkName(this, name, StarknetIdContract);
  }

  public async getContractVersion(
    contractAddress: string,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  public async getContractVersion(
    contractAddress: undefined,
    classHash: string,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;

  public async getContractVersion(
    contractAddress?: string,
    classHash?: string,
    options?: getContractVersionOptions
  ) {
    return this.provider.getContractVersion(contractAddress as any, classHash as any, options);
  }
}

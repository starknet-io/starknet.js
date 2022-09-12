import { StarknetChainId } from '../constants';
import {
  Call,
  CallContractResponse,
  DeclareContractPayload,
  DeclareContractResponse,
  DeployContractPayload,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetails,
  InvokeFunctionResponse,
} from '../types';
import { RPC } from '../types/api';
import fetch from '../utils/fetchPonyfill';
import { getSelectorFromName } from '../utils/hash';
import { stringify } from '../utils/json';
import {
  BigNumberish,
  bigNumberishArrayToHexadecimalStringArray,
  toBN,
  toHex,
} from '../utils/number';
import { parseCalldata, parseContract, wait } from '../utils/provider';
import { RPCResponseParser } from '../utils/responseParser/rpc';
import { randomAddress } from '../utils/stark';
import { ProviderInterface } from './interface';
import { Block, BlockIdentifier } from './utils';

export type RpcProviderOptions = { nodeUrl: string };

export class RpcProvider implements ProviderInterface {
  public nodeUrl: string;

  public chainId!: StarknetChainId;

  private responseParser = new RPCResponseParser();

  constructor(optionsOrProvider: RpcProviderOptions) {
    const { nodeUrl } = optionsOrProvider;
    this.nodeUrl = nodeUrl;

    this.getChainId().then((chainId) => {
      this.chainId = chainId;
    });
  }

  public fetch(method: any, params: any): Promise<any> {
    return fetch(this.nodeUrl, {
      method: 'POST',
      body: stringify({ method, jsonrpc: '2.0', params, id: 0 }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  protected errorHandler(error: any) {
    if (error) {
      const { code, message } = error;
      throw new Error(`${code}: ${message}`);
    }
  }

  protected async fetchEndpoint<T extends keyof RPC.Methods>(
    method: T,
    request?: RPC.Methods[T]['REQUEST']
  ): Promise<RPC.Methods[T]['RESPONSE']> {
    try {
      const rawResult = await this.fetch(method, request);
      const { error, result } = await rawResult.json();
      this.errorHandler(error);
      return result as RPC.Methods[T]['RESPONSE'];
    } catch (error: any) {
      this.errorHandler(error?.response?.data);
      throw error;
    }
  }

  public async getChainId(): Promise<StarknetChainId> {
    return this.fetchEndpoint('starknet_chainId');
  }

  // Common Interface
  public async getBlock(blockIdentifier: BlockIdentifier = 'pending'): Promise<GetBlockResponse> {
    return this.getBlockWithTxHashes(blockIdentifier).then(
      this.responseParser.parseGetBlockResponse
    );
  }

  public async getBlockHashAndNumber(): Promise<RPC.BlockHashAndNumber> {
    return this.fetchEndpoint('starknet_blockHashAndNumber');
  }

  public async getBlockWithTxHashes(
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<RPC.GetBlockWithTxHashesResponse> {
    const block = new Block(blockIdentifier);
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', [block.identifier]);
  }

  public async getBlockWithTxs(
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<RPC.GetBlockWithTxs> {
    const block = new Block(blockIdentifier);
    return this.fetchEndpoint('starknet_getBlockWithTxs', [block.identifier]);
  }

  public async getClassHashAt(
    blockIdentifier: BlockIdentifier,
    contractAddress: RPC.ContractAddress
  ): Promise<RPC.Felt> {
    return this.fetchEndpoint('starknet_getClassHashAt', [blockIdentifier, contractAddress]);
  }

  public async getNonce(contractAddress: string): Promise<any> {
    return this.fetchEndpoint('starknet_getNonce', [contractAddress]);
  }

  public async getPendingTransactions(): Promise<RPC.Transaction> {
    return this.fetchEndpoint('starknet_pendingTransactions');
  }

  public async getProtocolVersion(): Promise<Error> {
    throw new Error('Pathfinder does not implement this rpc 0.1.0 method');
  }

  public async getStateUpdate(blockIdentifier: BlockIdentifier): Promise<RPC.StateUpdate> {
    return this.fetchEndpoint('starknet_getStateUpdate', [blockIdentifier]);
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<BigNumberish> {
    const parsedKey = toHex(toBN(key));
    const block = new Block(blockIdentifier);
    return this.fetchEndpoint('starknet_getStorageAt', [
      contractAddress,
      parsedKey,
      block.identifier,
    ]);
  }

  // common interface
  public async getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
    return this.getTransactionByHash(txHash).then(this.responseParser.parseGetTransactionResponse);
  }

  public async getTransactionByHash(
    txHash: BigNumberish
  ): Promise<RPC.GetTransactionByHashResponse> {
    return this.fetchEndpoint('starknet_getTransactionByHash', [txHash]);
  }

  public async getTransactionByBlockIdAndIndex(
    blockIdentifier: BlockIdentifier,
    index: number
  ): Promise<RPC.GetTransactionByBlockIdAndIndex> {
    return this.fetchEndpoint('starknet_getTransactionByHash', [blockIdentifier, index]);
  }

  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    return this.fetchEndpoint('starknet_getTransactionReceipt', [txHash]).then(
      this.responseParser.parseGetTransactionReceiptResponse
    );
  }

  // TODO: Check, changed response from common interface to rpc
  public async getClass(classHash: RPC.Felt): Promise<RPC.ContractClass> {
    return this.fetchEndpoint('starknet_getClass', [classHash]);
  }

  public async getClassAt(contractAddress: string, blockIdentifier: BlockIdentifier): Promise<any> {
    const block = new Block(blockIdentifier);
    return this.fetchEndpoint('starknet_getClassAt', [block.identifier, contractAddress]);
  }

  public async getCode(
    _contractAddress: string,
    _blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse> {
    throw new Error('RPC 0.1.0 does not implement getCode function');
  }

  public async getEstimateFee(
    invocation: Invocation,
    blockIdentifier: BlockIdentifier = 'pending',
    invocationDetails: InvocationsDetails = {}
  ): Promise<EstimateFeeResponse> {
    return this.fetchEndpoint('starknet_estimateFee', [
      {
        contract_address: invocation.contractAddress,
        entry_point_selector: getSelectorFromName(invocation.entrypoint),
        calldata: parseCalldata(invocation.calldata),
        signature: bigNumberishArrayToHexadecimalStringArray(invocation.signature || []),
        version: toHex(toBN(invocationDetails?.version || 0)),
      },
      blockIdentifier,
    ]).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async declareContract({
    contract,
    version,
  }: DeclareContractPayload): Promise<DeclareContractResponse> {
    const contractDefinition = parseContract(contract);

    return this.fetchEndpoint('starknet_addDeclareTransaction', [
      {
        program: contractDefinition.program,
        entry_points_by_type: contractDefinition.entry_points_by_type,
        abi: contractDefinition.abi, // rpc 2.0
      },
      toHex(toBN(version || 0)),
    ]).then(this.responseParser.parseDeclareContractResponse);
  }

  public async deployContract({
    contract,
    constructorCalldata,
    addressSalt,
  }: DeployContractPayload): Promise<DeployContractResponse> {
    const contractDefinition = parseContract(contract);

    return this.fetchEndpoint('starknet_addDeployTransaction', [
      addressSalt ?? randomAddress(),
      bigNumberishArrayToHexadecimalStringArray(constructorCalldata ?? []),
      {
        program: contractDefinition.program,
        entry_points_by_type: contractDefinition.entry_points_by_type,
        abi: contractDefinition.abi, // rpc 2.0
      },
    ]).then(this.responseParser.parseDeployContractResponse);
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetails
  ): Promise<InvokeFunctionResponse> {
    return this.fetchEndpoint('starknet_addInvokeTransaction', [
      {
        contract_address: functionInvocation.contractAddress,
        entry_point_selector: getSelectorFromName(functionInvocation.entrypoint),
        calldata: parseCalldata(functionInvocation.calldata),
      },
      bigNumberishArrayToHexadecimalStringArray(functionInvocation.signature || []),
      toHex(toBN(details.maxFee || 0)),
      toHex(toBN(details.version || 0)),
    ]).then(this.responseParser.parseInvokeFunctionResponse);
  }

  public async callContract(
    call: Call,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<CallContractResponse> {
    const result = await this.fetchEndpoint('starknet_call', [
      {
        contract_address: call.contractAddress,
        entry_point_selector: getSelectorFromName(call.entrypoint),
        calldata: parseCalldata(call.calldata),
      },
      blockIdentifier,
    ]);

    return this.responseParser.parseCallContractResponse(result);
  }

  public async traceTransaction(transactionHash: RPC.TransactionHash): Promise<RPC.Trace> {
    return this.fetchEndpoint('starknet_traceTransaction', [transactionHash]);
  }

  public async traceBlockTransactions(blockHash: RPC.BlockHash): Promise<RPC.Traces> {
    return this.fetchEndpoint('starknet_traceBlockTransactions', [blockHash]);
  }

  public async waitForTransaction(txHash: BigNumberish, retryInterval: number = 8000) {
    let onchain = false;
    let retries = 100;

    while (!onchain) {
      const successStates = ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2', 'PENDING'];
      const errorStates = ['REJECTED', 'NOT_RECEIVED'];

      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      try {
        // eslint-disable-next-line no-await-in-loop
        const res = await this.getTransactionReceipt(txHash);

        if (successStates.includes(res.status)) {
          onchain = true;
        } else if (errorStates.includes(res.status)) {
          const message = res.status;
          const error = new Error(message) as Error & { response: any };
          error.response = res;
          throw error;
        }
      } catch (error: unknown) {
        if (error instanceof Error && errorStates.includes(error.message)) {
          throw error;
        }

        if (retries === 0) {
          throw error;
        }
      }

      retries -= 1;
    }

    await wait(retryInterval);
  }

  /**
   * Gets the transaction count from a block.
   *
   *
   * @param blockIdentifier
   * @returns Number of transactions
   */
  public async getTransactionCount(
    blockIdentifier: BlockIdentifier
  ): Promise<RPC.GetTransactionCountResponse> {
    const block = new Block(blockIdentifier);
    return this.fetchEndpoint('starknet_getBlockTransactionCount', [block.identifier]);
  }

  /**
   * Gets the latest block number
   *
   *
   * @returns Number of the latest block
   */
  public async getBlockNumber(): Promise<RPC.GetBlockNumberResponse> {
    return this.fetchEndpoint('starknet_blockNumber');
  }

  /**
   * Gets syncing status of the node
   *
   *
   * @returns Object with the stats data
   */
  public async getSyncingStats(): Promise<RPC.GetSyncingStatsResponse> {
    return this.fetchEndpoint('starknet_syncing');
  }

  /**
   * Gets all the events filtered
   *
   *
   * @returns events and the pagination of the events
   */
  public async getEvents(eventFilter: RPC.EventFilter): Promise<RPC.GetEventsResponse> {
    return this.fetchEndpoint('starknet_getEvents', [eventFilter]);
  }
}

import { StarknetChainId } from '../constants';
import {
  Call,
  CallContractResponse,
  DeclareContractResponse,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetCodeResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  InvokeFunctionResponse,
  RPC,
} from '../types';
import fetch from '../utils/fetchPonyfill';
import { getSelectorFromName } from '../utils/hash';
import { stringify } from '../utils/json';
import {
  BigNumberish,
  bigNumberishArrayToHexadecimalStringArray,
  toBN,
  toHex,
} from '../utils/number';
import { parseCalldata, wait } from '../utils/provider';
import { RPCResponseParser } from '../utils/responseParser/rpc';
import { ProviderInterface } from './interface';
import { Block, BlockIdentifier } from './utils';

export type RpcProviderOptions = {
  nodeUrl: string;
  retries?: number;
  headers?: object;
  blockIdentifier?: BlockIdentifier;
};

// Default Pathfinder disabled pending block https://github.com/eqlabs/pathfinder/blob/main/README.md
// Note that pending support is disabled by default and must be enabled by setting poll-pending=true in the configuration options.
const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
  blockIdentifier: 'latest',
  retries: 200,
};

export class RpcProvider implements ProviderInterface {
  public nodeUrl: string;

  public chainId!: StarknetChainId;

  public headers: object;

  private responseParser = new RPCResponseParser();

  private retries: number;

  private blockIdentifier: BlockIdentifier;

  constructor(optionsOrProvider: RpcProviderOptions) {
    const { nodeUrl, retries, headers, blockIdentifier } = optionsOrProvider;
    this.nodeUrl = nodeUrl;
    this.retries = retries || defaultOptions.retries;
    this.headers = { ...defaultOptions.headers, ...headers };
    this.blockIdentifier = blockIdentifier || defaultOptions.blockIdentifier;

    this.getChainId().then((chainId) => {
      this.chainId = chainId;
    });
  }

  public fetch(method: any, params: any): Promise<any> {
    return fetch(this.nodeUrl, {
      method: 'POST',
      body: stringify({ method, jsonrpc: '2.0', params, id: 0 }),
      headers: this.headers as Record<string, string>,
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
    params?: RPC.Methods[T]['params']
  ): Promise<RPC.Methods[T]['result']> {
    try {
      const rawResult = await this.fetch(method, params);
      const { error, result } = await rawResult.json();
      this.errorHandler(error);
      return result as RPC.Methods[T]['result'];
    } catch (error: any) {
      this.errorHandler(error?.response?.data);
      throw error;
    }
  }

  // Methods from Interface
  public async getChainId(): Promise<any> {
    return this.fetchEndpoint('starknet_chainId');
  }

  // Methods from Interface
  public async getBlock(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<GetBlockResponse> {
    return this.getBlockWithTxHashes(blockIdentifier).then(
      this.responseParser.parseGetBlockResponse
    );
  }

  public async getBlockHashAndNumber(): Promise<RPC.BlockHashAndNumber> {
    return this.fetchEndpoint('starknet_blockHashAndNumber');
  }

  public async getBlockWithTxHashes(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.GetBlockWithTxHashesResponse> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  }

  public async getBlockWithTxs(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.GetBlockWithTxs> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id });
  }

  public async getClassHashAt(
    contractAddress: RPC.ContractAddress,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.Felt> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassHashAt', {
      block_id,
      contract_address: contractAddress,
    });
  }

  public async getNonceForAddress(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.Nonce> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getNonce', {
      contract_address: contractAddress,
      block_id,
    });
  }

  public async getPendingTransactions(): Promise<RPC.PendingTransactions> {
    return this.fetchEndpoint('starknet_pendingTransactions');
  }

  public async getProtocolVersion(): Promise<Error> {
    throw new Error('Pathfinder does not implement this rpc 0.1.0 method');
  }

  public async getStateUpdate(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.StateUpdate> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStateUpdate', { block_id });
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<BigNumberish> {
    const parsedKey = toHex(toBN(key));
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStorageAt', {
      contract_address: contractAddress,
      key: parsedKey,
      block_id,
    });
  }

  // Methods from Interface
  public async getTransaction(txHash: string): Promise<GetTransactionResponse> {
    return this.getTransactionByHash(txHash).then(this.responseParser.parseGetTransactionResponse);
  }

  public async getTransactionByHash(txHash: string): Promise<RPC.GetTransactionByHashResponse> {
    return this.fetchEndpoint('starknet_getTransactionByHash', { transaction_hash: txHash });
  }

  public async getTransactionByBlockIdAndIndex(
    blockIdentifier: BlockIdentifier,
    index: number
  ): Promise<RPC.GetTransactionByBlockIdAndIndex> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', { block_id, index });
  }

  public async getTransactionReceipt(txHash: string): Promise<RPC.TransactionReceipt> {
    return this.fetchEndpoint('starknet_getTransactionReceipt', { transaction_hash: txHash });
  }

  public async getClassByHash(classHash: RPC.Felt): Promise<RPC.ContractClass> {
    return this.getClass(classHash);
  }

  public async getClass(
    classHash: RPC.Felt,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.ContractClass> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClass', { class_hash: classHash, block_id });
  }

  public async getClassAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.ContractClass> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassAt', {
      block_id,
      contract_address: contractAddress,
    });
  }

  public async getCode(
    _contractAddress: string,
    _blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse> {
    throw new Error('RPC does not implement getCode function');
  }

  public async getEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    return this.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier);
  }

  public async getInvokeEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_estimateFee', {
      request: {
        type: 'INVOKE',
        sender_address: invocation.contractAddress,
        calldata: parseCalldata(invocation.calldata),
        signature: bigNumberishArrayToHexadecimalStringArray(invocation.signature || []),
        version: toHex(toBN(invocationDetails?.version || 0)),
        nonce: toHex(toBN(invocationDetails.nonce)),
        max_fee: toHex(toBN(invocationDetails?.maxFee || 0)),
      },
      block_id,
    }).then(this.responseParser.parseFeeEstimateResponse);
  }

  // TODO: Revisit after Pathfinder release with JSON-RPC v0.2.1 RPC Spec

  public async getDeclareEstimateFee(
    { senderAddress, contractDefinition, signature }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_estimateFee', {
      request: {
        type: 'DECLARE',
        contract_class: {
          program: contractDefinition.program,
          entry_points_by_type: contractDefinition.entry_points_by_type,
          abi: contractDefinition.abi, // rpc 2.0
        },
        sender_address: senderAddress,
        signature: bigNumberishArrayToHexadecimalStringArray(signature || []),
        version: toHex(toBN(details?.version || 0)),
        nonce: toHex(toBN(details.nonce)),
        max_fee: toHex(toBN(details?.maxFee || 0)),
      },
      block_id,
    }).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getDeployAccountEstimateFee(
    { classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<EstimateFeeResponse> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_estimateFee', {
      request: {
        type: 'DEPLOY_ACCOUNT',
        constructor_calldata: bigNumberishArrayToHexadecimalStringArray(constructorCalldata || []),
        class_hash: toHex(toBN(classHash)),
        contract_address_salt: toHex(toBN(addressSalt || 0)),
        signature: bigNumberishArrayToHexadecimalStringArray(signature || []),
        version: toHex(toBN(details?.version || 0)),
        nonce: toHex(toBN(details.nonce)),
        max_fee: toHex(toBN(details?.maxFee || 0)),
      },
      block_id,
    }).then(this.responseParser.parseFeeEstimateResponse);
  }

  // TODO: Revisit after Pathfinder release with JSON-RPC v0.2.1 RPC Spec
  public async declareContract(
    { contractDefinition, signature, senderAddress }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeclareContractResponse> {
    return this.fetchEndpoint('starknet_addDeclareTransaction', {
      declare_transaction: {
        contract_class: {
          program: contractDefinition.program,
          entry_points_by_type: contractDefinition.entry_points_by_type,
          abi: contractDefinition.abi, // rpc 2.0
        },
        type: 'DECLARE',
        version: toHex(toBN(details.version || 0)),
        max_fee: toHex(toBN(details.maxFee || 0)),
        signature: bigNumberishArrayToHexadecimalStringArray(signature || []),
        sender_address: senderAddress,
        nonce: toHex(toBN(details.nonce)),
      },
    });
  }

  public async deployAccountContract(
    { classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeployContractResponse> {
    return this.fetchEndpoint('starknet_addDeployAccountTransaction', {
      deploy_account_transaction: {
        constructor_calldata: bigNumberishArrayToHexadecimalStringArray(constructorCalldata || []),
        class_hash: toHex(toBN(classHash)),
        contract_address_salt: toHex(toBN(addressSalt || 0)),
        type: 'DEPLOY_ACCOUNT',
        max_fee: toHex(toBN(details.maxFee || 0)),
        version: toHex(toBN(details.version || 0)),
        signature: bigNumberishArrayToHexadecimalStringArray(signature || []),
        nonce: toHex(toBN(details.nonce)),
      },
    });
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse> {
    return this.fetchEndpoint('starknet_addInvokeTransaction', {
      invoke_transaction: {
        sender_address: functionInvocation.contractAddress,
        calldata: parseCalldata(functionInvocation.calldata),
        type: 'INVOKE',
        max_fee: toHex(toBN(details.maxFee || 0)),
        version: toHex(toBN(details.version || 0)),
        signature: bigNumberishArrayToHexadecimalStringArray(functionInvocation.signature || []),
        nonce: toHex(toBN(details.nonce)),
      },
    });
  }

  // Methods from Interface
  public async callContract(
    call: Call,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<CallContractResponse> {
    const block_id = new Block(blockIdentifier).identifier;
    const result = await this.fetchEndpoint('starknet_call', {
      request: {
        contract_address: call.contractAddress,
        entry_point_selector: getSelectorFromName(call.entrypoint),
        calldata: parseCalldata(call.calldata),
      },
      block_id,
    });

    return this.responseParser.parseCallContractResponse(result);
  }

  public async traceTransaction(transactionHash: RPC.TransactionHash): Promise<RPC.Trace> {
    return this.fetchEndpoint('starknet_traceTransaction', { transaction_hash: transactionHash });
  }

  public async traceBlockTransactions(blockHash: RPC.BlockHash): Promise<RPC.Traces> {
    return this.fetchEndpoint('starknet_traceBlockTransactions', { block_hash: blockHash });
  }

  public async waitForTransaction(
    txHash: string,
    retryInterval: number = 8000,
    successStates = ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2', 'PENDING']
  ) {
    const errorStates = ['REJECTED', 'NOT_RECEIVED'];
    let { retries } = this;
    let onchain = false;
    let txReceipt: any = {};

    while (!onchain) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      try {
        // eslint-disable-next-line no-await-in-loop
        txReceipt = await this.getTransactionReceipt(txHash);

        if (!('status' in txReceipt)) {
          const error = new Error('pending transaction');
          throw error;
        }

        if (txReceipt.status && successStates.includes(txReceipt.status)) {
          onchain = true;
        } else if (txReceipt.status && errorStates.includes(txReceipt.status)) {
          const message = txReceipt.status;
          const error = new Error(message) as Error & { response: any };
          error.response = txReceipt;
          throw error;
        }
      } catch (error: unknown) {
        if (error instanceof Error && errorStates.includes(error.message)) {
          throw error;
        }

        if (retries === 0) {
          throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
        }
      }

      retries -= 1;
    }

    await wait(retryInterval);
    return txReceipt;
  }

  /**
   * Gets the transaction count from a block.
   *
   *
   * @param blockIdentifier
   * @returns Number of transactions
   */
  public async getTransactionCount(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<RPC.GetTransactionCountResponse> {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
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
    return this.fetchEndpoint('starknet_getEvents', { filter: eventFilter });
  }
}

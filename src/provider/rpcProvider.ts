import fetch from 'cross-fetch';

import { StarknetChainId } from '../constants';
import { RPC } from '../types/api/rpc';
import { getSelectorFromName } from '../utils/hash';
import {
  BigNumberish,
  bigNumberishArrayToDecimalStringArray,
  isHex,
  toBN,
  toHex,
} from '../utils/number';
import { randomAddress } from '../utils/stark';
import {
  CallContractResponse,
  ContractClass,
  DeclareContractResponse,
  DeployContractResponse,
  FeeEstimateResponse,
  FunctionCall,
  GetBlockResponse,
  GetStateUpdateResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeContractResponse,
  Provider,
} from './abstractProvider';
import { RPCResponseParser } from './rpcParser';
import { BlockIdentifier } from './utils';

export type RpcProviderOptions = { nodeUrl: string };

export class RPCProvider implements Provider {
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

  protected async fetchEndpoint<T extends keyof RPC.Methods>(
    method: T,
    request?: RPC.Methods[T]['REQUEST']
  ): Promise<RPC.Methods[T]['RESPONSE']> {
    const requestData = {
      method,
      jsonrpc: '2.0',
      params: request,
      id: 0,
    };

    try {
      const rawResult = await fetch(this.nodeUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { error, result } = await rawResult.json();
      if (error) {
        const { code, message } = error;
        throw new Error(`${code}: ${message}`);
      } else {
        return result as RPC.Methods[T]['RESPONSE'];
      }
    } catch (error: any) {
      const data = error?.response?.data;
      if (data?.message) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      throw error;
    }
  }

  public async getChainId(): Promise<StarknetChainId> {
    return this.fetchEndpoint('starknet_chainId');
  }

  public async getBlock(blockIdentifier: BlockIdentifier = 'pending'): Promise<GetBlockResponse> {
    const method =
      typeof blockIdentifier === 'string' && isHex(blockIdentifier)
        ? 'starknet_getBlockByHash'
        : 'starknet_getBlockByNumber';

    return this.fetchEndpoint(method, [blockIdentifier]).then(
      this.responseParser.parseGetBlockResponse
    );
  }

  public async getClass(classHash: BigNumberish): Promise<ContractClass> {
    return this.fetchEndpoint('starknet_getClass', [classHash]).then(
      this.responseParser.parseGetClassResponse
    );
  }

  public async getClassHash(contractAddress: BigNumberish): Promise<string> {
    return this.fetchEndpoint('starknet_getClassHashAt', [contractAddress]);
  }

  public async getClassAt(contractAddress: BigNumberish): Promise<ContractClass> {
    return this.fetchEndpoint('starknet_getClassAt', [contractAddress]).then(
      this.responseParser.parseGetClassResponse
    );
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockHash: BlockIdentifier
  ): Promise<BigNumberish> {
    const parsedKey = toHex(toBN(key));
    return this.fetchEndpoint('starknet_getStorageAt', [contractAddress, parsedKey, blockHash]);
  }

  public async getStateUpdate(blockHash: BigNumberish): Promise<GetStateUpdateResponse> {
    return this.fetchEndpoint('starknet_getStateUpdateByHash', [blockHash]).then(
      this.responseParser.parseGetStateUpdateResponse
    );
  }

  public async getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
    return this.fetchEndpoint('starknet_getTransactionByHash', [txHash]).then(
      this.responseParser.parseGetTransactionResponse
    );
  }

  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    return this.fetchEndpoint('starknet_getTransactionReceipt', [txHash]).then(
      this.responseParser.parseGetTransactionReceiptResponse
    );
  }

  public async estimateFee(
    request: FunctionCall,
    blockIdentifier: BlockIdentifier
  ): Promise<FeeEstimateResponse> {
    const parsedCalldata = request.calldata.map((data) => {
      if (typeof data === 'string' && isHex(data as string)) {
        return data;
      }
      return toHex(toBN(data));
    });

    return this.fetchEndpoint('starknet_estimateFee', [
      {
        contract_address: request.contractAddress,
        entry_point_selector: getSelectorFromName(request.entryPointSelector),
        calldata: parsedCalldata,
      },
      blockIdentifier,
    ]).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async declareContract(
    contractClass: ContractClass,
    version?: BigNumberish | undefined
  ): Promise<DeclareContractResponse> {
    return this.fetchEndpoint('starknet_addDeclareTransaction', [
      {
        program: contractClass.program,
        entry_point_by_type: contractClass.entryPointByType,
      },
      version,
    ]).then(this.responseParser.parseDeclareContractResponse);
  }

  public async deployContract(
    contractDefinition: ContractClass,
    constructorCalldata: BigNumberish[],
    salt?: BigNumberish | undefined
  ): Promise<DeployContractResponse> {
    return this.fetchEndpoint('starknet_addDeployTransaction', [
      salt ?? randomAddress(),
      bigNumberishArrayToDecimalStringArray(constructorCalldata ?? []),
      {
        program: contractDefinition.program,
        entry_point_by_type: contractDefinition.entryPointByType,
      },
    ]).then(this.responseParser.parseDeployContractResponse);
  }

  public async invokeContract(
    functionInvocation: FunctionCall,
    signature?: BigNumberish[] | undefined,
    maxFee?: BigNumberish | undefined,
    version?: BigNumberish | undefined
  ): Promise<InvokeContractResponse> {
    const parsedCalldata = functionInvocation.calldata.map((data) => {
      if (typeof data === 'string' && isHex(data as string)) {
        return data;
      }
      return toHex(toBN(data));
    });

    return this.fetchEndpoint('starknet_addInvokeTransaction', [
      {
        contract_address: functionInvocation.contractAddress,
        entry_point_selector: getSelectorFromName(functionInvocation.entryPointSelector),
        calldata: parsedCalldata,
      },
      signature,
      maxFee,
      version,
    ]).then(this.responseParser.parseInvokeContractResponse);
  }

  public async callContract(
    request: FunctionCall,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<CallContractResponse> {
    const parsedCalldata = request.calldata.map((data) => {
      if (typeof data === 'string' && isHex(data as string)) {
        return data;
      }
      return toHex(toBN(data));
    });

    const result = await this.fetchEndpoint('starknet_call', [
      {
        contract_address: request.contractAddress,
        entry_point_selector: getSelectorFromName(request.entryPointSelector),
        calldata: parsedCalldata,
      },
      blockIdentifier,
    ]);

    return this.responseParser.parseCallContractResponse(result);
  }

  public async waitForTransaction(txHash: BigNumberish, retryInterval: number): Promise<void> {
    throw new Error(`Not implemented ${txHash} ${retryInterval}`);
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
    if (typeof blockIdentifier === 'number') {
      return this.fetchEndpoint('starknet_getBlockTransactionCountByNumber', [blockIdentifier]);
    }
    return this.fetchEndpoint('starknet_getBlockTransactionCountByHash', [blockIdentifier]);
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

import fetch from 'cross-fetch';

import { StarknetChainId } from '../constants';
import { CompiledContract } from '../types';
import { RPC } from '../types/api/rpc';
import { getSelectorFromName } from '../utils/hash';
import { parse, stringify } from '../utils/json';
import {
  BigNumberish,
  bigNumberishArrayToDecimalStringArray,
  isHex,
  toBN,
  toHex,
} from '../utils/number';
import { compressProgram, randomAddress } from '../utils/stark';
import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  FeeEstimateResponse,
  FunctionCall,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeContractResponse,
  Provider,
} from './abstractProvider';
import { RPCResponseParser } from './rpcParser';
import { BlockIdentifier } from './utils';

function wait(delay: number) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}

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
        body: stringify(requestData),
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

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockHash: BlockIdentifier = 'pending'
  ): Promise<BigNumberish> {
    const parsedKey = toHex(toBN(key));
    return this.fetchEndpoint('starknet_getStorageAt', [contractAddress, parsedKey, blockHash]);
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

  public async getClassAt(
    contractAddress: string,
    _blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<any> {
    return this.fetchEndpoint('starknet_getClassAt', [contractAddress]);
  }

  public async estimateFee(
    request: FunctionCall,
    blockIdentifier: BlockIdentifier = 'pending'
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
    compiledContract: CompiledContract | string,
    version: BigNumberish | undefined = 0
  ): Promise<DeclareContractResponse> {
    const parsedContract =
      typeof compiledContract === 'string'
        ? (parse(compiledContract) as CompiledContract)
        : compiledContract;
    const contractDefinition = {
      ...parsedContract,
      program: compressProgram(parsedContract.program),
    };

    return this.fetchEndpoint('starknet_addDeclareTransaction', [
      {
        program: contractDefinition.program,
        entry_points_by_type: contractDefinition.entry_points_by_type,
      },
      toHex(toBN(version)),
    ]).then(this.responseParser.parseDeclareContractResponse);
  }

  public async deployContract(
    compiledContract: CompiledContract | string,
    constructorCalldata?: BigNumberish[],
    salt?: BigNumberish | undefined
  ): Promise<DeployContractResponse> {
    const parsedContract =
      typeof compiledContract === 'string'
        ? (parse(compiledContract) as CompiledContract)
        : compiledContract;
    const contractDefinition = {
      ...parsedContract,
      program: compressProgram(parsedContract.program),
    };

    return this.fetchEndpoint('starknet_addDeployTransaction', [
      salt ?? randomAddress(),
      bigNumberishArrayToDecimalStringArray(constructorCalldata ?? []),
      {
        program: contractDefinition.program,
        entry_points_by_type: contractDefinition.entry_points_by_type,
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

  public async waitForTransaction(txHash: BigNumberish, retryInterval: number = 8000) {
    let onchain = false;
    // TODO: optimize this
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

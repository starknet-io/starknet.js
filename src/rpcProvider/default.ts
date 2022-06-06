import axios from 'axios';

import { StarknetChainId } from '../constants';
import { BlockIdentifier } from '../provider/utils';
import {
  AddTransactionResponse,
  Call,
  CallContractResponse,
  CompiledContract,
  DeployContractPayload,
  DeployContractRPCResponse,
  EventFilterRPC,
  GetBlockNumberResponseRPC,
  GetBlockResponseRPC,
  GetCodeResponseRPC,
  GetContractAddressesResponse,
  GetEventsResponseRPC,
  GetStorageAtResponseRPC,
  GetSyncingStatsResponseRPC,
  GetTransactionCountResponseRPC,
  GetTransactionReceiptResponseRPC,
  GetTransactionResponseRPC,
  GetTransactionStatusResponse,
  Invocation,
  Methods,
  RPCResponse,
} from '../types';
import { getSelectorFromName } from '../utils/hash';
import { parse } from '../utils/json';
import {
  BigNumberish,
  bigNumberishArrayToDecimalStringArray,
  isHex,
  toBN,
  toHex,
} from '../utils/number';
import { compressProgram, randomAddress } from '../utils/stark';
// import { compressProgram, randomAddress } from '../utils/stark';
import { RPCProviderInterface } from './interface';

function wait(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export class RPCProvider implements RPCProviderInterface {
  public nodeUrl: string;

  public chainId!: StarknetChainId;

  constructor(optionsOrProvider: RPCProviderInterface | { nodeUrl: string }) {
    const { nodeUrl } = optionsOrProvider;
    this.nodeUrl = nodeUrl;

    this.getChainId().then((chainId) => {
      this.chainId = chainId;
    });
  }

  // typesafe fetch
  protected async fetchEndpoint<T extends keyof Methods>(
    method: T,
    request?: Methods[T]['REQUEST']
  ): Promise<Methods[T]['RESPONSE']> {
    const requestData = {
      method,
      jsonrpc: '2.0',
      params: request,
      id: 0,
    };

    try {
      const {
        data: response,
        data: { result: data },
      } = await axios.post<RPCResponse>(this.nodeUrl, requestData);
      if (response.error) {
        const { code, message } = response.error;
        throw new Error(`${code}: ${message}`);
      }
      return data;
    } catch (error: any) {
      const data = error?.response?.data;
      if (data?.message) {
        throw new Error(`${data.code}: ${data.message}`);
      }
      throw error;
    }
  }

  /**
   * Gets chain id of the network
   *
   * @returns chainId
   */
  public async getChainId(): Promise<StarknetChainId> {
    return this.fetchEndpoint('starknet_chainId');
  }

  /**
   * Calls a function on the StarkNet contract.
   *
   * @param invokeTransaction transaction to be invoked
   * @param options additional options for the call
   * @returns the result of the function on the smart contract.
   */
  public async callContract(
    { contractAddress, entrypoint, calldata = [] }: Call,
    options: { blockIdentifier: BlockIdentifier } = { blockIdentifier: null }
  ): Promise<CallContractResponse> {
    const parsedCalldata = calldata.map((data) => {
      if (typeof data === 'string' && isHex(data as string)) {
        return data;
      }
      return toHex(toBN(data));
    });
    const result = await this.fetchEndpoint('starknet_call', [
      {
        contract_address: contractAddress,
        entry_point_selector: getSelectorFromName(entrypoint),
        calldata: parsedCalldata,
      },
      options.blockIdentifier || 'latest',
    ]);
    return { result };
  }

  /**
   * Gets the block information
   *   *
   * @param blockIdentifier
   * @returns the block object
   */
  public async getBlock(blockIdentifier: BlockIdentifier = 'latest'): Promise<GetBlockResponseRPC> {
    if (typeof blockIdentifier === 'string' && isHex(blockIdentifier)) {
      return this.fetchEndpoint('starknet_getBlockByHash', [blockIdentifier]);
    }
    return this.fetchEndpoint('starknet_getBlockByNumber', [blockIdentifier]);
  }

  /**
   * Gets the code of the deployed contract.
   *
   * @param contractAddress
   * @returns Bytecode and ABI of compiled contract
   */
  public async getCode(contractAddress: string): Promise<GetCodeResponseRPC> {
    return this.fetchEndpoint('starknet_getCode', [contractAddress]);
  }

  /**
   * Gets the contract's storage variable at a specific key.
   *
   * @param contractAddress
   * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
   * @param txHash
   * @returns the value of the storage variable
   */
  public async getStorageAt(
    contractAddress: string,
    key: number | string,
    blockHash: string = 'latest'
  ): Promise<GetStorageAtResponseRPC> {
    const parsedKey = toHex(toBN(key));
    return this.fetchEndpoint('starknet_getStorageAt', [contractAddress, parsedKey, blockHash]);
  }

  /**
   * Gets the transaction receipt from a tx hash
   *
   *
   * @param txHash
   * @returns the transaction receipt object
   */

  public async getTransactionReceipt(
    txHash: BigNumberish
  ): Promise<GetTransactionReceiptResponseRPC> {
    const txHashHex = toHex(toBN(txHash));
    return this.fetchEndpoint('starknet_getTransactionReceipt', [txHashHex]);
  }

  /**
   * Gets the transaction information from a tx hash.
   *
   * @param txHash
   * @param blockIndex
   * @returns the transaction object
   */
  public async getTransaction(
    txIdentifier: BigNumberish,
    blockIndex?: number
  ): Promise<GetTransactionResponseRPC> {
    if (typeof txIdentifier === 'number' && blockIndex) {
      return this.fetchEndpoint('starknet_getTransactionByBlockNumberAndIndex', [
        txIdentifier,
        blockIndex,
      ]);
    }
    const txHashHex = toHex(toBN(txIdentifier));
    if (blockIndex) {
      return this.fetchEndpoint('starknet_getTransactionByBlockHashAndIndex', [
        txHashHex,
        blockIndex,
      ]);
    }
    return this.fetchEndpoint('starknet_getTransactionByHash', [txHashHex]);
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
  ): Promise<GetTransactionCountResponseRPC> {
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
  public async getBlockNumber(): Promise<GetBlockNumberResponseRPC> {
    return this.fetchEndpoint('starknet_blockNumber');
  }

  /**
   * Gets syncing status of the node
   *
   *
   * @returns Object with the stats data
   */
  public async getSyncingStats(): Promise<GetSyncingStatsResponseRPC> {
    return this.fetchEndpoint('starknet_syncing');
  }

  /**
   * Gets all the events filtered
   *
   *
   * @returns events and the pagination of the events
   */
  public async getEvents(eventFilter: EventFilterRPC): Promise<GetEventsResponseRPC> {
    return this.fetchEndpoint('starknet_getEvents', [eventFilter]);
  }

  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param contract - a json object containing the compiled contract
   * @param address - (optional, defaults to a random address) the address where the contract should be deployed (alpha)
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public async deployContract(payload: DeployContractPayload): Promise<DeployContractRPCResponse> {
    const parsedContract =
      typeof payload.contract === 'string'
        ? (parse(payload.contract) as CompiledContract)
        : payload.contract;
    const contractDefinition = {
      ...parsedContract,
      program: compressProgram(parsedContract.program),
    };
    return this.fetchEndpoint('starknet_addDeployTransaction', [
      payload.addressSalt ?? randomAddress(),
      bigNumberishArrayToDecimalStringArray(payload.constructorCalldata ?? []),
      contractDefinition,
    ]);
  }

  /**
   * Waits for the transaction to be resolved
   *
   * @param txHash
   * @param retryInterval
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public async waitForTransaction(txHash: BigNumberish, retryInterval: number = 8000) {
    let onchain = false;

    while (!onchain) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      // eslint-disable-next-line no-await-in-loop
      const res = await this.getTransactionReceipt(txHash);

      const successStates = ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2', 'PENDING'];
      const errorStates = ['REJECTED', 'NOT_RECEIVED'];

      if (successStates.includes(res.status)) {
        onchain = true;
      } else if (errorStates.includes(res.status)) {
        // const message = res.tx_failure_reason
        //   ? `${res.tx_status}: ${res.tx_failure_reason.code}\n${res.tx_failure_reason.error_message}`
        //   : res.tx_status;
        const error = new Error('Comething went wrong');
        // error.response = res;
        throw error;
      }
    }
  }

  // Yet not supported endpoints
  public getContractAddresses(): Promise<GetContractAddressesResponse> {
    throw new Error('Not Implemented');
  }

  public invokeFunction(_: Invocation): Promise<AddTransactionResponse> {
    throw new Error('Not Implemented');
  }

  public getTransactionStatus(_: BigNumberish): Promise<GetTransactionStatusResponse> {
    throw new Error('Not Implemented');
  }
}

import axios from 'axios';
import urljoin from 'url-join';

import {
  Abi,
  AddTransactionResponse,
  Call,
  CallContractResponse,
  CompiledContract,
  DeployContractPayload,
  Endpoints,
  GetBlockResponse,
  GetCodeResponse,
  GetContractAddressesResponse,
  GetTransactionResponse,
  GetTransactionStatusResponse,
  Invocation,
  TransactionReceipt,
} from '../types';
import { parse, stringify } from '../utils/json';
import { BigNumberish, bigNumberishArrayToDecimalStringArray, toBN, toHex } from '../utils/number';
import { compressProgram, getSelectorFromName, randomAddress } from '../utils/stark';
import { ProviderInterface } from './interface';
import { BlockIdentifier, getFormattedBlockIdentifier, txIdentifier } from './utils';

type NetworkName = 'mainnet-alpha' | 'goerli-alpha';

type ProviderOptions =
  | {
      network: NetworkName;
    }
  | {
      baseUrl: string;
    };

function wait(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

function isEmptyQueryObject(obj?: Record<any, any>): obj is undefined {
  return (
    obj === undefined ||
    Object.keys(obj).length === 0 ||
    (Object.keys(obj).length === 1 &&
      Object.entries(obj).every(([k, v]) => k === 'blockIdentifier' && v === null))
  );
}

export class Provider implements ProviderInterface {
  public baseUrl: string;

  public feederGatewayUrl: string;

  public gatewayUrl: string;

  constructor(optionsOrProvider: ProviderOptions | Provider = { network: 'goerli-alpha' }) {
    if (optionsOrProvider instanceof Provider) {
      this.baseUrl = optionsOrProvider.baseUrl;
      this.feederGatewayUrl = optionsOrProvider.feederGatewayUrl;
      this.gatewayUrl = optionsOrProvider.gatewayUrl;
    } else {
      const baseUrl =
        'baseUrl' in optionsOrProvider
          ? optionsOrProvider.baseUrl
          : Provider.getNetworkFromName(optionsOrProvider.network);
      this.baseUrl = baseUrl;
      this.feederGatewayUrl = urljoin(baseUrl, 'feeder_gateway');
      this.gatewayUrl = urljoin(baseUrl, 'gateway');
    }
  }

  protected static getNetworkFromName(name: NetworkName) {
    switch (name) {
      case 'mainnet-alpha':
        return 'https://alpha-mainnet.starknet.io';
      case 'goerli-alpha':
      default:
        return 'https://alpha4.starknet.io';
    }
  }

  // typesafe fetch
  protected async fetchEndpoint<T extends keyof Endpoints>(
    endpoint: T,
    ...[query, request]: Endpoints[T]['QUERY'] extends never
      ? Endpoints[T]['REQUEST'] extends never
        ? []
        : [undefined, Endpoints[T]['REQUEST']]
      : Endpoints[T]['REQUEST'] extends never
      ? [Endpoints[T]['QUERY']]
      : [Endpoints[T]['QUERY'], Endpoints[T]['REQUEST']]
  ): Promise<Endpoints[T]['RESPONSE']> {
    const baseUrl = ['add_transaction'].includes(endpoint)
      ? this.gatewayUrl
      : this.feederGatewayUrl;
    const method = ['add_transaction', 'call_contract'].includes(endpoint) ? 'POST' : 'GET';
    const queryString =
      !isEmptyQueryObject(query) &&
      `?${Object.entries(query)
        .map(([key, value]) =>
          key !== 'blockIdentifier' ? `${key}=${value}` : `${getFormattedBlockIdentifier(value)}`
        )
        .join('&')}`;

    const { data } = await axios.request<Endpoints[T]['RESPONSE']>({
      method,
      url: urljoin(baseUrl, endpoint, queryString || ''),
      data: stringify(request),
      headers: method === 'POST' ? { 'Content-Type': 'application/json' } : {},
    });

    return data;
  }

  /**
   * Gets the smart contract address on the goerli testnet.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)
   * @returns starknet smart contract addresses
   */
  public async getContractAddresses(): Promise<GetContractAddressesResponse> {
    return this.fetchEndpoint('get_contract_addresses');
  }

  /**
   * Calls a function on the StarkNet contract.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L25-L39)
   *
   * @param invokeTransaction - transaction to be invoked
   * @param blockHash
   * @param blockNumber
   * @returns the result of the function on the smart contract.
   */
  public async callContract(
    { contractAddress, entrypoint, calldata = [] }: Call,
    blockIdentifier: BlockIdentifier = null
  ): Promise<CallContractResponse> {
    return this.fetchEndpoint(
      'call_contract',
      {
        blockIdentifier,
      },
      {
        signature: [],
        contract_address: contractAddress,
        entry_point_selector: getSelectorFromName(entrypoint),
        calldata,
      }
    );
  }

  /**
   * Gets the block information
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L41-L53)
   *
   * @param blockHash
   * @param blockNumber
   * @returns the block object { block_number, previous_block_number, state_root, status, timestamp, transaction_receipts, transactions }
   */
  public async getBlock(blockIdentifier: BlockIdentifier = null): Promise<GetBlockResponse> {
    return this.fetchEndpoint('get_block', { blockIdentifier });
  }

  /**
   * Gets the code of the deployed contract.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L55-L68)
   *
   * @param contractAddress
   * @param blockHash
   * @param blockNumber
   * @returns Bytecode and ABI of compiled contract
   */
  public async getCode(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = null
  ): Promise<GetCodeResponse> {
    return this.fetchEndpoint('get_code', { blockIdentifier, contractAddress });
  }

  // TODO: add proper type
  /**
   * Gets the contract's storage variable at a specific key.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L70-L85)
   *
   * @param contractAddress
   * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
   * @param blockHash
   * @param blockNumber
   * @returns the value of the storage variable
   */
  public async getStorageAt(
    contractAddress: string,
    key: number,
    blockIdentifier: BlockIdentifier = null
  ): Promise<object> {
    return this.fetchEndpoint('get_storage_at', { blockIdentifier, contractAddress, key });
  }

  /**
   * Gets the status of a transaction.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)
   *
   * @param txHash
   * @returns the transaction status object { block_number, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }
   */
  public async getTransactionStatus(txHash: BigNumberish): Promise<GetTransactionStatusResponse> {
    const txHashHex = toHex(toBN(txHash));
    return this.fetchEndpoint('get_transaction_status', { transactionHash: txHashHex });
  }

  /**
   * Gets the transaction receipt from a tx hash or tx id.
   *
   * [Reference] (https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L104-L111)
   *
   * @param txHash
   * @param txId
   * @returns the transaction receipt object
   */

  public async getTransactionReceipt({
    txHash,
    txId,
  }: {
    txHash?: BigNumberish;
    txId?: BigNumberish;
  }): Promise<TransactionReceipt> {
    const { data } = await axios.get<TransactionReceipt>(
      urljoin(this.feederGatewayUrl, 'get_transaction_receipt', `?${txIdentifier(txHash, txId)}`)
    );

    return data;
  }

  /**
   * Gets the transaction information from a tx id.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58)
   *
   * @param txHash
   * @returns the transacton object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }
   */
  public async getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
    const txHashHex = toHex(toBN(txHash));
    return this.fetchEndpoint('get_transaction', { transactionHash: txHashHex });
  }

  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param contract - a json object containing the compiled contract
   * @param address - (optional, defaults to a random address) the address where the contract should be deployed (alpha)
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public deployContract(
    payload: DeployContractPayload,
    _abi?: Abi
  ): Promise<AddTransactionResponse> {
    const parsedContract =
      typeof payload.contract === 'string'
        ? (parse(payload.contract) as CompiledContract)
        : payload.contract;
    const contractDefinition = {
      ...parsedContract,
      program: compressProgram(parsedContract.program),
    };

    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'DEPLOY',
      contract_address_salt: payload.addressSalt ?? randomAddress(),
      constructor_calldata: bigNumberishArrayToDecimalStringArray(
        payload.constructorCalldata ?? []
      ),
      contract_definition: contractDefinition,
    });
  }

  /**
   * Invokes a function on starknet
   *
   * @param contractAddress - target contract address for invoke
   * @param entrypointSelector - target entrypoint selector for
   * @param calldata - (optional, default []) calldata
   * @param signature - (optional) signature to send along
   * @returns response from addTransaction
   */
  public invokeFunction(invocation: Invocation, _abi?: Abi): Promise<AddTransactionResponse> {
    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'INVOKE_FUNCTION',
      contract_address: invocation.contractAddress,
      entry_point_selector: getSelectorFromName(invocation.entrypoint),
      calldata: bigNumberishArrayToDecimalStringArray(invocation.calldata ?? []),
      signature: bigNumberishArrayToDecimalStringArray(invocation.signature ?? []),
    });
  }

  public async waitForTx(txHash: BigNumberish, retryInterval: number = 8000) {
    let onchain = false;
    await wait(retryInterval);

    while (!onchain) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      // eslint-disable-next-line no-await-in-loop
      const res = await this.getTransactionStatus(txHash);

      if (res.tx_status === 'ACCEPTED_ON_L1' || res.tx_status === 'ACCEPTED_ON_L2') {
        onchain = true;
      } else if (res.tx_status === 'REJECTED' || res.tx_status === 'NOT_RECEIVED') {
        const error = Error(res.tx_status) as Error & { response: GetTransactionStatusResponse };
        error.response = res;
        throw error;
      }
    }
  }
}

import axios from 'axios';
import urljoin from 'url-join';

import {
  AddTransactionResponse,
  BlockNumber,
  CallContractResponse,
  CallContractTransaction,
  CompiledContract,
  GetBlockResponse,
  GetCodeResponse,
  GetContractAddressesResponse,
  GetTransactionResponse,
  GetTransactionStatusResponse,
  Signature,
  Transaction,
  TransactionReceipt,
} from '../types';
import { parse, stringify } from '../utils/json';
import { BigNumberish, toBN, toHex } from '../utils/number';
import { compressProgram, formatSignature, randomAddress } from '../utils/stark';
import { ProviderInterface } from './interface';
import { getFormattedBlockIdentifier, txIdentifier } from './utils';

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

  /**
   * Gets the smart contract address on the goerli testnet.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)
   * @returns starknet smart contract addresses
   */
  public async getContractAddresses(): Promise<GetContractAddressesResponse> {
    const { data } = await axios.get<GetContractAddressesResponse>(
      urljoin(this.feederGatewayUrl, 'get_contract_addresses')
    );
    return data;
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
    invokeTransaction: CallContractTransaction,
    blockHash?: BigNumberish,
    blockNumber: BlockNumber = null
  ): Promise<CallContractResponse> {
    const formattedBlockIdentifier = getFormattedBlockIdentifier(blockHash, blockNumber);

    const { data } = await axios.post<CallContractResponse>(
      urljoin(this.feederGatewayUrl, 'call_contract', formattedBlockIdentifier),
      {
        signature: [],
        calldata: [],
        ...invokeTransaction,
      }
    );
    return data;
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
  public async getBlock(
    blockHash?: BigNumberish,
    blockNumber: BlockNumber = null
  ): Promise<GetBlockResponse> {
    const formattedBlockIdentifier = getFormattedBlockIdentifier(blockHash, blockNumber);

    const { data } = await axios.get<GetBlockResponse>(
      urljoin(this.feederGatewayUrl, 'get_block', formattedBlockIdentifier)
    );
    return data;
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
    blockHash?: BigNumberish,
    blockNumber: BlockNumber = null
  ): Promise<GetCodeResponse> {
    const formattedBlockIdentifier = getFormattedBlockIdentifier(blockHash, blockNumber);

    const { data } = await axios.get<GetCodeResponse>(
      urljoin(
        this.feederGatewayUrl,
        'get_code',
        `?contractAddress=${contractAddress}&${formattedBlockIdentifier}`
      )
    );
    return data;
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
    blockHash?: BigNumberish,
    blockNumber: BlockNumber = null
  ): Promise<object> {
    const formattedBlockIdentifier = getFormattedBlockIdentifier(blockHash, blockNumber);

    const { data } = await axios.get<object>(
      urljoin(
        this.feederGatewayUrl,
        'get_storage_at',
        `?contractAddress=${contractAddress}&key=${key}&${formattedBlockIdentifier}`
      )
    );
    return data;
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
    const txHashBn = toBN(txHash);
    const { data } = await axios.get<GetTransactionStatusResponse>(
      urljoin(
        this.feederGatewayUrl,
        'get_transaction_status',
        `?transactionHash=${toHex(txHashBn)}`
      )
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
    const txHashBn = toBN(txHash);
    const { data } = await axios.get<GetTransactionResponse>(
      urljoin(this.feederGatewayUrl, 'get_transaction', `?transactionHash=${toHex(txHashBn)}`)
    );
    return data;
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

  public async getTransactionReceipt(
    txHash?: BigNumberish,
    txId?: BigNumberish
  ): Promise<TransactionReceipt> {
    const { data } = await axios.get<TransactionReceipt>(
      urljoin(this.feederGatewayUrl, 'get_transaction_receipt', `?${txIdentifier(txHash, txId)}`)
    );

    return data;
  }

  /**
   * Invoke a function on the starknet contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param transaction - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public async addTransaction(transaction: Transaction): Promise<AddTransactionResponse> {
    const signature =
      transaction.type === 'INVOKE_FUNCTION' && formatSignature(transaction.signature);
    const contract_address_salt =
      transaction.type === 'DEPLOY' && toHex(toBN(transaction.contract_address_salt));

    const { data } = await axios.post<AddTransactionResponse>(
      urljoin(this.gatewayUrl, 'add_transaction'),
      stringify({
        ...transaction, // the tx can contain BigInts, so we use our own `stringify`
        ...(Array.isArray(signature) && { signature }), // not needed on deploy tx
        ...(contract_address_salt && { contract_address_salt }), // not needed on invoke tx
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    return data;
  }

  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param contract - a json object containing the compiled contract
   * @param address - (optional, defaults to a random address) the address where the contract should be deployed (alpha)
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public deployContract(
    contract: CompiledContract | string,
    constructorCalldata: string[] = [],
    addressSalt: BigNumberish = randomAddress()
  ): Promise<AddTransactionResponse> {
    const parsedContract =
      typeof contract === 'string' ? (parse(contract) as CompiledContract) : contract;
    const contractDefinition = {
      ...parsedContract,
      program: compressProgram(parsedContract.program),
    };

    return this.addTransaction({
      type: 'DEPLOY',
      contract_address_salt: addressSalt,
      constructor_calldata: constructorCalldata,
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
  public invokeFunction(
    contractAddress: string,
    entrypointSelector: string,
    calldata?: string[],
    signature?: Signature
  ): Promise<AddTransactionResponse> {
    return this.addTransaction({
      type: 'INVOKE_FUNCTION',
      contract_address: contractAddress,
      entry_point_selector: entrypointSelector,
      calldata,
      signature,
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

import urljoin from 'url-join';

import { StarknetChainId } from '../constants';
import {
  Call,
  CallContractResponse,
  ContractClass,
  DeclareContractResponse,
  DeployContractPayload,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  InvokeFunctionResponse,
} from '../types';
import {
  CallL1Handler,
  GetContractAddressesResponse,
  GetTransactionStatusResponse,
  GetTransactionTraceResponse,
  Sequencer,
} from '../types/api';
import { DeclareContractTransaction, DeployAccountContractTransaction } from '../types/lib';
import fetch from '../utils/fetchPonyfill';
import { getSelector, getSelectorFromName } from '../utils/hash';
import { parse, parseAlwaysAsBig, stringify } from '../utils/json';
import {
  BigNumberish,
  bigNumberishArrayToDecimalStringArray,
  getDecimalString,
  getHexString,
  getHexStringArray,
  toBN,
  toHex,
} from '../utils/number';
import { parseContract, wait } from '../utils/provider';
import { SequencerAPIResponseParser } from '../utils/responseParser/sequencer';
import { randomAddress } from '../utils/stark';
import { buildUrl } from '../utils/url';
import { GatewayError, HttpError } from './errors';
import { ProviderInterface } from './interface';
import { Block, BlockIdentifier } from './utils';

type NetworkName = 'mainnet-alpha' | 'goerli-alpha' | 'goerli-alpha-2';

function isEmptyQueryObject(obj?: Record<any, any>): obj is undefined {
  return (
    obj === undefined ||
    Object.keys(obj).length === 0 ||
    (Object.keys(obj).length === 1 &&
      Object.entries(obj).every(([k, v]) => k === 'blockIdentifier' && v === null))
  );
}

export type SequencerProviderOptions =
  | { network: NetworkName }
  | {
      baseUrl: string;
      feederGatewayUrl?: string;
      gatewayUrl?: string;
      chainId?: StarknetChainId;
      headers?: object;
    };

export class SequencerProvider implements ProviderInterface {
  public baseUrl: string;

  public feederGatewayUrl: string;

  public gatewayUrl: string;

  public chainId: StarknetChainId;

  public headers: object | undefined;

  private responseParser = new SequencerAPIResponseParser();

  constructor(optionsOrProvider: SequencerProviderOptions = { network: 'goerli-alpha-2' }) {
    if ('network' in optionsOrProvider) {
      this.baseUrl = SequencerProvider.getNetworkFromName(optionsOrProvider.network);
      this.chainId = SequencerProvider.getChainIdFromBaseUrl(this.baseUrl);
      this.feederGatewayUrl = urljoin(this.baseUrl, 'feeder_gateway');
      this.gatewayUrl = urljoin(this.baseUrl, 'gateway');
    } else {
      this.baseUrl = optionsOrProvider.baseUrl;
      this.feederGatewayUrl = buildUrl(
        this.baseUrl,
        'feeder_gateway',
        optionsOrProvider.feederGatewayUrl
      );
      this.gatewayUrl = buildUrl(this.baseUrl, 'gateway', optionsOrProvider.gatewayUrl);

      this.chainId =
        optionsOrProvider.chainId ??
        SequencerProvider.getChainIdFromBaseUrl(optionsOrProvider.baseUrl);

      this.headers = optionsOrProvider?.headers;
    }
  }

  protected static getNetworkFromName(name: NetworkName) {
    switch (name) {
      case 'mainnet-alpha':
        return 'https://alpha-mainnet.starknet.io';
      case 'goerli-alpha':
        return 'https://alpha4.starknet.io';
      case 'goerli-alpha-2':
        return 'https://alpha4-2.starknet.io';
      default:
        return 'https://alpha4.starknet.io';
    }
  }

  protected static getChainIdFromBaseUrl(baseUrl: string): StarknetChainId {
    try {
      const url = new URL(baseUrl);
      if (url.host.includes('mainnet.starknet.io')) {
        return StarknetChainId.MAINNET;
      }
    } catch {
      // eslint-disable-next-line no-console
      console.error(`Could not parse baseUrl: ${baseUrl}`);
    }
    return StarknetChainId.TESTNET;
  }

  private getFetchUrl(endpoint: keyof Sequencer.Endpoints) {
    const gatewayUrlEndpoints = ['add_transaction'];

    return gatewayUrlEndpoints.includes(endpoint) ? this.gatewayUrl : this.feederGatewayUrl;
  }

  private getFetchMethod(endpoint: keyof Sequencer.Endpoints) {
    const postMethodEndpoints = [
      'add_transaction',
      'call_contract',
      'estimate_fee',
      'estimate_message_fee',
    ];

    return postMethodEndpoints.includes(endpoint) ? 'POST' : 'GET';
  }

  private getQueryString(query?: Record<string, any>): string {
    if (isEmptyQueryObject(query)) {
      return '';
    }
    const queryString = Object.entries(query)
      .map(([key, value]) => {
        if (key === 'blockIdentifier') {
          const block = new Block(value);
          return `${block.queryIdentifier}`;
        }
        return `${key}=${value}`;
      })
      .join('&');

    return `?${queryString}`;
  }

  private getHeaders(method: 'POST' | 'GET'): object | undefined {
    if (method === 'POST') {
      return {
        'Content-Type': 'application/json',
        ...this.headers,
      };
    }
    return this.headers;
  }

  // typesafe fetch
  protected async fetchEndpoint<T extends keyof Sequencer.Endpoints>(
    endpoint: T,
    // typescript type magic to create a nice fitting function interface
    ...[query, request]: Sequencer.Endpoints[T]['QUERY'] extends never
      ? Sequencer.Endpoints[T]['REQUEST'] extends never
        ? [] // when no query and no request is needed, we can omit the query and request parameters
        : [undefined, Sequencer.Endpoints[T]['REQUEST']]
      : Sequencer.Endpoints[T]['REQUEST'] extends never
      ? [Sequencer.Endpoints[T]['QUERY']] // when no request is needed, we can omit the request parameter
      : [Sequencer.Endpoints[T]['QUERY'], Sequencer.Endpoints[T]['REQUEST']] // when both query and request are needed, we cant omit anything
  ): Promise<Sequencer.Endpoints[T]['RESPONSE']> {
    const baseUrl = this.getFetchUrl(endpoint);
    const method = this.getFetchMethod(endpoint);
    const queryString = this.getQueryString(query);
    const headers = this.getHeaders(method);
    const url = urljoin(baseUrl, endpoint, queryString);

    try {
      const res = await fetch(url, {
        method,
        body: stringify(request),
        headers,
      });
      const textResponse = await res.text();
      if (!res.ok) {
        // This will allow user to handle contract errors
        let responseBody: any;
        try {
          responseBody = parse(textResponse);
        } catch {
          // if error parsing fails, return an http error
          throw new HttpError(res.statusText, res.status);
        }

        const errorCode = responseBody.code || ((responseBody as any)?.status_code as string); // starknet-devnet uses status_code instead of code; They need to fix that
        throw new GatewayError(responseBody.message, errorCode); // Caught locally, and re-thrown for the user
      }

      if (endpoint === 'estimate_fee') {
        return parseAlwaysAsBig(textResponse, (_, v) => {
          if (v && typeof v === 'bigint') {
            return toBN(v.toString());
          }
          return v;
        });
      }
      return parse(textResponse) as Sequencer.Endpoints[T]['RESPONSE'];
    } catch (err) {
      // rethrow custom errors
      if (err instanceof GatewayError || err instanceof HttpError) {
        throw err;
      }
      if (err instanceof Error) {
        throw Error(`Could not ${method} from endpoint \`${url}\`: ${err.message}`);
      }
      throw err;
    }
  }

  public async getChainId(): Promise<StarknetChainId> {
    return Promise.resolve(this.chainId);
  }

  public async callContract(
    { contractAddress, entrypoint: entryPointSelector, calldata = [] }: Call,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<CallContractResponse> {
    return this.fetchEndpoint(
      'call_contract',
      { blockIdentifier },
      {
        signature: [],
        contract_address: contractAddress,
        entry_point_selector: getSelectorFromName(entryPointSelector),
        calldata,
      }
    ).then(this.responseParser.parseCallContractResponse);
  }

  public async getBlock(blockIdentifier: BlockIdentifier = 'pending'): Promise<GetBlockResponse> {
    return this.fetchEndpoint('get_block', { blockIdentifier }).then(
      this.responseParser.parseGetBlockResponse
    );
  }

  public async getNonce(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<BigNumberish> {
    return this.fetchEndpoint('get_nonce', { contractAddress, blockIdentifier });
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<BigNumberish> {
    const parsedKey = toBN(key).toString(10);
    return this.fetchEndpoint('get_storage_at', {
      blockIdentifier,
      contractAddress,
      key: parsedKey,
    });
  }

  public async getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
    const txHashHex = toHex(toBN(txHash));
    return this.fetchEndpoint('get_transaction', { transactionHash: txHashHex }).then((value) =>
      this.responseParser.parseGetTransactionResponse(value)
    );
  }

  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    const txHashHex = toHex(toBN(txHash));
    return this.fetchEndpoint('get_transaction_receipt', { transactionHash: txHashHex }).then(
      this.responseParser.parseGetTransactionReceiptResponse
    );
  }

  public async getClassAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<ContractClass> {
    return this.fetchEndpoint('get_full_contract', { blockIdentifier, contractAddress }).then(
      parseContract
    );
  }

  public async getClassHashAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<string> {
    return this.fetchEndpoint('get_class_hash_at', { blockIdentifier, contractAddress });
  }

  public async getClassByHash(classHash: string): Promise<ContractClass> {
    return this.fetchEndpoint('get_class_by_hash', { classHash }).then(parseContract);
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse> {
    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'INVOKE_FUNCTION',
      contract_address: functionInvocation.contractAddress,
      calldata: bigNumberishArrayToDecimalStringArray(functionInvocation.calldata ?? []),
      signature: bigNumberishArrayToDecimalStringArray(functionInvocation.signature ?? []),
      nonce: toHex(toBN(details.nonce)),
      max_fee: toHex(toBN(details.maxFee || 0)),
      version: toHex(toBN(details.version || 1)),
    }).then(this.responseParser.parseInvokeFunctionResponse);
  }

  public async deployContract({
    contract,
    constructorCalldata,
    addressSalt,
  }: DeployContractPayload): Promise<DeployContractResponse> {
    const contractDefinition = parseContract(contract);

    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'DEPLOY',
      contract_address_salt: addressSalt ?? randomAddress(),
      constructor_calldata: bigNumberishArrayToDecimalStringArray(constructorCalldata ?? []),
      contract_definition: contractDefinition,
    }).then(this.responseParser.parseDeployContractResponse);
  }

  public async deployAccountContract(
    { classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeployContractResponse> {
    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'DEPLOY_ACCOUNT',
      contract_address_salt: addressSalt ?? randomAddress(),
      constructor_calldata: bigNumberishArrayToDecimalStringArray(constructorCalldata ?? []),
      class_hash: toHex(toBN(classHash)),
      max_fee: toHex(toBN(details.maxFee || 0)),
      version: toHex(toBN(details.version || 0)),
      nonce: toHex(toBN(details.nonce)),
      signature: bigNumberishArrayToDecimalStringArray(signature || []),
    }).then(this.responseParser.parseDeployContractResponse);
  }

  public async declareContract(
    { senderAddress, contractDefinition, signature }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeclareContractResponse> {
    return this.fetchEndpoint('add_transaction', undefined, {
      type: 'DECLARE',
      contract_class: contractDefinition,
      nonce: toHex(toBN(details.nonce)),
      signature: bigNumberishArrayToDecimalStringArray(signature || []),
      sender_address: senderAddress,
      max_fee: toHex(toBN(details.maxFee || 0)),
      version: toHex(toBN(details.version || 1)),
    }).then(this.responseParser.parseDeclareContractResponse);
  }

  public async getEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<EstimateFeeResponse> {
    return this.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier);
  }

  public async getInvokeEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<EstimateFeeResponse> {
    return this.fetchEndpoint(
      'estimate_fee',
      { blockIdentifier },
      {
        type: 'INVOKE_FUNCTION',
        contract_address: invocation.contractAddress,
        calldata: invocation.calldata ?? [],
        signature: bigNumberishArrayToDecimalStringArray(invocation.signature || []),
        version: toHex(toBN(invocationDetails?.version || 1)),
        nonce: toHex(toBN(invocationDetails.nonce)),
      }
    ).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getDeclareEstimateFee(
    { senderAddress, contractDefinition, signature }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<EstimateFeeResponse> {
    return this.fetchEndpoint(
      'estimate_fee',
      { blockIdentifier },
      {
        type: 'DECLARE',
        sender_address: senderAddress,
        contract_class: contractDefinition,
        signature: bigNumberishArrayToDecimalStringArray(signature || []),
        version: toHex(toBN(details?.version || 1)),
        nonce: toHex(toBN(details.nonce)),
      }
    ).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getDeployAccountEstimateFee(
    { classHash, addressSalt, constructorCalldata, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<EstimateFeeResponse> {
    return this.fetchEndpoint(
      'estimate_fee',
      { blockIdentifier },
      {
        type: 'DEPLOY_ACCOUNT',
        class_hash: toHex(toBN(classHash)),
        constructor_calldata: bigNumberishArrayToDecimalStringArray(constructorCalldata || []),
        contract_address_salt: toHex(toBN(addressSalt || 0)),
        signature: bigNumberishArrayToDecimalStringArray(signature || []),
        version: toHex(toBN(details?.version || 0)),
        nonce: toHex(toBN(details.nonce)),
      }
    ).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getCode(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<Sequencer.GetCodeResponse> {
    return this.fetchEndpoint('get_code', { contractAddress, blockIdentifier });
  }

  public async waitForTransaction(txHash: BigNumberish, retryInterval: number = 8000) {
    let onchain = false;

    while (!onchain) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      // eslint-disable-next-line no-await-in-loop
      const res = await this.getTransactionStatus(txHash);

      const successStates = ['ACCEPTED_ON_L1', 'ACCEPTED_ON_L2', 'PENDING'];
      const errorStates = ['REJECTED', 'NOT_RECEIVED'];

      if (successStates.includes(res.tx_status)) {
        onchain = true;
      } else if (errorStates.includes(res.tx_status)) {
        const message = res.tx_failure_reason
          ? `${res.tx_status}: ${res.tx_failure_reason.code}\n${res.tx_failure_reason.error_message}`
          : res.tx_status;
        const error = new Error(message) as Error & { response: GetTransactionStatusResponse };
        error.response = res;
        throw error;
      }
    }
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
   * Gets the smart contract address on the goerli testnet.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)
   * @returns starknet smart contract addresses
   */
  public async getContractAddresses(): Promise<GetContractAddressesResponse> {
    return this.fetchEndpoint('get_contract_addresses');
  }

  /**
   * Gets the transaction trace from a tx id.
   *
   *
   * @param txHash
   * @returns the transaction trace
   */
  public async getTransactionTrace(txHash: BigNumberish): Promise<GetTransactionTraceResponse> {
    const txHashHex = toHex(toBN(txHash));
    return this.fetchEndpoint('get_transaction_trace', { transactionHash: txHashHex });
  }

  public async estimateMessageFee(
    { from_address, to_address, entry_point_selector, payload }: CallL1Handler,
    blockIdentifier: BlockIdentifier = 'pending'
  ): Promise<Sequencer.EstimateFeeResponse> {
    const validCallL1Handler = {
      from_address: getDecimalString(from_address),
      to_address: getHexString(to_address),
      entry_point_selector: getSelector(entry_point_selector),
      payload: getHexStringArray(payload),
    };

    return this.fetchEndpoint('estimate_message_fee', { blockIdentifier }, validCallL1Handler);
  }
}

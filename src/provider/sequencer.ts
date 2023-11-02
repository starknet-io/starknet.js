import urljoin from 'url-join';

import { BaseUrl, NetworkName, StarknetChainId } from '../constants';
import {
  AccountInvocationItem,
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  BlockTag,
  CairoAssembly,
  Call,
  CallContractResponse,
  CallL1Handler,
  ContractClassResponse,
  ContractVersion,
  DeclareContractResponse,
  DeclareContractTransaction,
  DeployAccountContractTransaction,
  DeployContractResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetContractAddressesResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  GetTransactionStatusResponse,
  Invocation,
  InvocationsDetailsWithNonce,
  InvokeFunctionResponse,
  Sequencer,
  SequencerHttpMethod,
  SequencerProviderOptions,
  SimulateTransactionResponse,
  StateUpdateResponse,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
  TransactionType,
  getContractVersionOptions,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
} from '../types';
import { CallData } from '../utils/calldata';
import { getAbiContractVersion } from '../utils/calldata/cairo';
import { isSierra } from '../utils/contract';
import fetch from '../utils/fetchPonyfill';
import {
  getSelector,
  getSelectorFromName,
  getVersionsByType,
  transactionVersion,
  transactionVersion_2,
} from '../utils/hash';
import { parse, parseAlwaysAsBig, stringify } from '../utils/json';
import { getDecimalString, getHexString, getHexStringArray, toBigInt, toHex } from '../utils/num';
import { wait } from '../utils/provider';
import { SequencerAPIResponseParser } from '../utils/responseParser/sequencer';
import { randomAddress, signatureToDecimalArray } from '../utils/stark';
import { buildUrl } from '../utils/url';
import { GatewayError, HttpError, LibraryError } from './errors';
import { ProviderInterface } from './interface';
import { getAddressFromStarkName, getStarkName } from './starknetId';
import { Block } from './utils';

function isEmptyQueryObject(obj?: Record<any, any>): obj is undefined {
  return (
    obj === undefined ||
    Object.keys(obj).length === 0 ||
    (Object.keys(obj).length === 1 &&
      Object.entries(obj).every(([k, v]) => k === 'blockIdentifier' && v === null))
  );
}

const defaultOptions = {
  network: NetworkName.SN_GOERLI,
  blockIdentifier: BlockTag.pending,
};
/**
 * @deprecated Feeder gateway will be removed during November 2023, as Network is switching to P2P Nodes.
 * Use RPC Provider or Default provider (Default provider will be RPC Provider with public nodes and legacy interface/response)
 */
export class SequencerProvider implements ProviderInterface {
  public baseUrl: string;

  public feederGatewayUrl: string;

  public gatewayUrl: string;

  public headers?: Record<string, string>;

  private blockIdentifier: BlockIdentifier;

  private chainId: StarknetChainId;

  private responseParser = new SequencerAPIResponseParser();

  constructor(optionsOrProvider: SequencerProviderOptions = defaultOptions) {
    if ('network' in optionsOrProvider) {
      this.baseUrl = SequencerProvider.getNetworkFromName(optionsOrProvider.network);
      this.feederGatewayUrl = buildUrl(this.baseUrl, 'feeder_gateway');
      this.gatewayUrl = buildUrl(this.baseUrl, 'gateway');
    } else {
      this.baseUrl = optionsOrProvider.baseUrl;
      this.feederGatewayUrl = buildUrl(
        this.baseUrl,
        'feeder_gateway',
        optionsOrProvider.feederGatewayUrl
      );
      this.gatewayUrl = buildUrl(this.baseUrl, 'gateway', optionsOrProvider.gatewayUrl);
    }
    this.chainId =
      optionsOrProvider?.chainId ?? SequencerProvider.getChainIdFromBaseUrl(this.baseUrl);
    this.headers = optionsOrProvider.headers;
    this.blockIdentifier = optionsOrProvider?.blockIdentifier || defaultOptions.blockIdentifier;
  }

  protected static getNetworkFromName(name: NetworkName | StarknetChainId) {
    switch (name) {
      case NetworkName.SN_MAIN:
      case StarknetChainId.SN_MAIN:
        return BaseUrl.SN_MAIN;
      case NetworkName.SN_GOERLI:
      case StarknetChainId.SN_GOERLI:
        return BaseUrl.SN_GOERLI;
      default:
        throw new Error('Could not detect base url from NetworkName');
    }
  }

  protected static getChainIdFromBaseUrl(baseUrl: string): StarknetChainId {
    try {
      const url = new URL(baseUrl);
      if (url.host.includes('mainnet.starknet.io')) {
        return StarknetChainId.SN_MAIN;
      }
      return StarknetChainId.SN_GOERLI;
    } catch {
      // eslint-disable-next-line no-console
      console.error(`Could not parse baseUrl: ${baseUrl}`);
      return StarknetChainId.SN_GOERLI;
    }
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
      'estimate_fee_bulk',
      'simulate_transaction',
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

  private getHeaders(method: SequencerHttpMethod): Record<string, string> | undefined {
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
    const url = urljoin(baseUrl, endpoint, queryString);

    return this.fetch(url, {
      method,
      body: request,
    });
  }

  public async fetch(
    endpoint: string,
    options?: {
      method?: SequencerHttpMethod;
      body?: any;
      parseAlwaysAsBigInt?: boolean;
    }
  ): Promise<any> {
    const url = buildUrl(this.baseUrl, '', endpoint);
    const method = options?.method ?? 'GET';
    const headers = this.getHeaders(method);
    const body = stringify(options?.body);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const textResponse = await response.text();

      if (!response.ok) {
        // This will allow the user to handle contract errors
        let responseBody: any;
        try {
          responseBody = parse(textResponse);
        } catch {
          throw new HttpError(response.statusText, response.status);
        }
        throw new GatewayError(responseBody.message, responseBody.code);
      }

      const parseChoice = options?.parseAlwaysAsBigInt ? parseAlwaysAsBig : parse;
      return parseChoice(textResponse);
    } catch (error) {
      if (error instanceof Error && !(error instanceof LibraryError))
        throw Error(`Could not ${method} from endpoint \`${url}\`: ${error.message}`);

      throw error;
    }
  }

  public async getChainId(): Promise<StarknetChainId> {
    return Promise.resolve(this.chainId);
  }

  public async callContract(
    { contractAddress, entrypoint: entryPointSelector, calldata = [] }: Call,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<CallContractResponse> {
    return this.fetchEndpoint(
      'call_contract',
      { blockIdentifier },
      {
        // TODO - determine best choice once both are fully supported in devnet
        // signature: [],
        // sender_address: contractAddress,
        contract_address: contractAddress,
        entry_point_selector: getSelectorFromName(entryPointSelector),
        calldata: CallData.compile(calldata),
      }
    ).then(this.responseParser.parseCallContractResponse);
  }

  public async getBlock(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<GetBlockResponse> {
    return this.fetchEndpoint('get_block', { blockIdentifier }).then(
      this.responseParser.parseGetBlockResponse
    );
  }

  public async getNonceForAddress(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<Sequencer.Nonce> {
    return this.fetchEndpoint('get_nonce', { contractAddress, blockIdentifier });
  }

  public async getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<Sequencer.Storage> {
    const parsedKey = toBigInt(key).toString(10);
    return this.fetchEndpoint('get_storage_at', {
      blockIdentifier,
      contractAddress,
      key: parsedKey,
    });
  }

  public async getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
    const txHashHex = toHex(txHash);
    return this.fetchEndpoint('get_transaction', { transactionHash: txHashHex }).then((result) => {
      // throw for no matching transaction to unify behavior with RPC and avoid parsing errors
      if (Object.values(result).length === 1) throw new LibraryError(result.status);
      return this.responseParser.parseGetTransactionResponse(result);
    });
  }

  public async getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse> {
    const txHashHex = toHex(txHash);
    return this.fetchEndpoint('get_transaction_receipt', { transactionHash: txHashHex }).then(
      this.responseParser.parseGetTransactionReceiptResponse
    );
  }

  public async getClassAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<ContractClassResponse> {
    return this.fetchEndpoint('get_full_contract', { blockIdentifier, contractAddress }).then(
      this.responseParser.parseContractClassResponse
    );
  }

  public async getClassHashAt(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<string> {
    return this.fetchEndpoint('get_class_hash_at', { blockIdentifier, contractAddress });
  }

  public async getClassByHash(
    classHash: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<ContractClassResponse> {
    return this.fetchEndpoint('get_class_by_hash', { classHash, blockIdentifier }).then(
      this.responseParser.parseContractClassResponse
    );
  }

  public async getCompiledClassByClassHash(
    classHash: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<CairoAssembly> {
    return this.fetchEndpoint('get_compiled_class_by_class_hash', { classHash, blockIdentifier });
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
    { blockIdentifier = this.blockIdentifier, compiler = true }: getContractVersionOptions = {}
  ): Promise<ContractVersion> {
    let contractClass;
    if (contractAddress) {
      contractClass = await this.getClassAt(contractAddress, blockIdentifier);
    } else if (classHash) {
      contractClass = await this.getClassByHash(classHash, blockIdentifier);
    } else {
      throw Error('getContractVersion require contractAddress or classHash');
    }

    if (isSierra(contractClass)) {
      if (compiler) {
        const abiTest = getAbiContractVersion(contractClass.abi);
        return { cairo: '1', compiler: abiTest.compiler };
      }
      return { cairo: '1', compiler: undefined };
    }
    return { cairo: '0', compiler: '0' };
  }

  public async invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse> {
    return this.fetchEndpoint('add_transaction', undefined, {
      type: TransactionType.INVOKE,
      sender_address: functionInvocation.contractAddress,
      calldata: CallData.compile(functionInvocation.calldata ?? []),
      signature: signatureToDecimalArray(functionInvocation.signature),
      nonce: toHex(details.nonce),
      max_fee: toHex(details.maxFee || 0),
      version: '0x1',
    }).then(this.responseParser.parseInvokeFunctionResponse);
  }

  public async deployAccountContract(
    { classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeployContractResponse> {
    return this.fetchEndpoint('add_transaction', undefined, {
      type: TransactionType.DEPLOY_ACCOUNT,
      contract_address_salt: addressSalt ?? randomAddress(),
      constructor_calldata: CallData.compile(constructorCalldata ?? []),
      class_hash: toHex(classHash),
      max_fee: toHex(details.maxFee || 0),
      version: toHex(details.version || 0),
      nonce: toHex(details.nonce),
      signature: signatureToDecimalArray(signature),
    }).then(this.responseParser.parseDeployContractResponse);
  }

  public async declareContract(
    { senderAddress, contract, signature, compiledClassHash }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeclareContractResponse> {
    if (!isSierra(contract)) {
      return this.fetchEndpoint('add_transaction', undefined, {
        type: TransactionType.DECLARE,
        contract_class: contract,
        nonce: toHex(details.nonce),
        signature: signatureToDecimalArray(signature),
        sender_address: senderAddress,
        max_fee: toHex(details.maxFee || 0),
        version: toHex(transactionVersion),
      }).then(this.responseParser.parseDeclareContractResponse);
    }
    // Cairo 1
    return this.fetchEndpoint('add_transaction', undefined, {
      type: TransactionType.DECLARE,
      sender_address: senderAddress,
      compiled_class_hash: compiledClassHash,
      contract_class: contract,
      nonce: toHex(details.nonce),
      signature: signatureToDecimalArray(signature),
      max_fee: toHex(details.maxFee || 0),
      version: toHex(transactionVersion_2),
    }).then(this.responseParser.parseDeclareContractResponse);
  }

  public async getEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier,
    skipValidate: boolean = false
  ): Promise<EstimateFeeResponse> {
    return this.getInvokeEstimateFee(invocation, invocationDetails, blockIdentifier, skipValidate);
  }

  public async getInvokeEstimateFee(
    invocation: Invocation,
    invocationDetails: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier,
    skipValidate: boolean = false
  ): Promise<EstimateFeeResponse> {
    const transaction = this.buildTransaction(
      {
        type: TransactionType.INVOKE,
        ...invocation,
        ...invocationDetails,
      },
      'fee'
    );
    return this.fetchEndpoint('estimate_fee', { blockIdentifier, skipValidate }, transaction).then(
      this.responseParser.parseFeeEstimateResponse
    );
  }

  public async getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier,
    skipValidate: boolean = false
  ): Promise<EstimateFeeResponse> {
    const transaction = this.buildTransaction(
      {
        type: TransactionType.DECLARE,
        ...invocation,
        ...details,
      },
      'fee'
    );
    return this.fetchEndpoint('estimate_fee', { blockIdentifier, skipValidate }, transaction).then(
      this.responseParser.parseFeeEstimateResponse
    );
  }

  public async getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier,
    skipValidate: boolean = false
  ): Promise<EstimateFeeResponse> {
    const transaction = this.buildTransaction(
      {
        type: TransactionType.DEPLOY_ACCOUNT,
        ...invocation,
        ...details,
      },
      'fee'
    );
    return this.fetchEndpoint('estimate_fee', { blockIdentifier, skipValidate }, transaction).then(
      this.responseParser.parseFeeEstimateResponse
    );
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    { blockIdentifier = this.blockIdentifier, skipValidate = false }: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulk> {
    const transactions = invocations.map((it) => this.buildTransaction(it, 'fee'));
    return this.fetchEndpoint(
      'estimate_fee_bulk',
      { blockIdentifier, skipValidate },
      transactions
    ).then(this.responseParser.parseFeeEstimateBulkResponse);
  }

  public async getCode(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<Sequencer.GetCodeResponse> {
    return this.fetchEndpoint('get_code', { contractAddress, blockIdentifier });
  }

  public async waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions) {
    let res;
    let completed = false;
    let retries = 0;
    const retryInterval = options?.retryInterval ?? 5000;
    const errorStates = options?.errorStates ?? [
      TransactionExecutionStatus.REJECTED,
      TransactionFinalityStatus.NOT_RECEIVED,
      TransactionExecutionStatus.REVERTED,
    ];
    const successStates = options?.successStates ?? [
      TransactionExecutionStatus.SUCCEEDED,
      TransactionFinalityStatus.ACCEPTED_ON_L1,
      TransactionFinalityStatus.ACCEPTED_ON_L2,
    ];

    while (!completed) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      // eslint-disable-next-line no-await-in-loop
      res = await this.getTransactionStatus(txHash);

      if (TransactionFinalityStatus.NOT_RECEIVED === res.finality_status && retries < 3) {
        retries += 1;
      } else if (
        successStates.includes(res.finality_status) ||
        successStates.includes(res.execution_status)
      ) {
        completed = true;
      } else if (
        errorStates.includes(res.finality_status) ||
        errorStates.includes(res.execution_status)
      ) {
        let message;
        if (res.tx_failure_reason) {
          message = `${res.tx_status}: ${res.tx_failure_reason.code}\n${res.tx_failure_reason.error_message}`;
        } else if (res.tx_revert_reason) {
          message = `${res.tx_status}: ${res.tx_revert_reason}`;
        } else {
          message = res.tx_status;
        }
        const error = new Error(message) as Error & { response: GetTransactionStatusResponse };
        error.response = res;
        throw error;
      }
    }
    const txReceipt = await this.getTransactionReceipt(txHash);
    return txReceipt;
  }

  /**
   * Gets the status of a transaction.
   * @param txHash BigNumberish
   * @returns GetTransactionStatusResponse - the transaction status object
   */
  public async getTransactionStatus(txHash: BigNumberish): Promise<GetTransactionStatusResponse> {
    const txHashHex = toHex(txHash);
    return this.fetchEndpoint('get_transaction_status', { transactionHash: txHashHex });
  }

  /**
   * Gets the smart contract address on the goerli testnet.
   * @returns GetContractAddressesResponse - starknet smart contract addresses
   */
  public async getContractAddresses(): Promise<GetContractAddressesResponse> {
    return this.fetchEndpoint('get_contract_addresses');
  }

  /**
   * Gets the transaction trace from a tx id.
   * @param txHash BigNumberish
   * @returns TransactionTraceResponse - the transaction trace
   */
  public async getTransactionTrace(
    txHash: BigNumberish
  ): Promise<Sequencer.TransactionTraceResponse> {
    const txHashHex = toHex(txHash);
    return this.fetchEndpoint('get_transaction_trace', { transactionHash: txHashHex });
  }

  public async estimateMessageFee(
    { from_address, to_address, entry_point_selector, payload }: CallL1Handler,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<Sequencer.EstimateFeeResponse> {
    const validCallL1Handler = {
      from_address: getDecimalString(from_address),
      to_address: getHexString(to_address),
      entry_point_selector: getSelector(entry_point_selector),
      payload: getHexStringArray(payload),
    };

    return this.fetchEndpoint('estimate_message_fee', { blockIdentifier }, validCallL1Handler);
  }

  /**
   * Simulate transaction using Sequencer provider
   * WARNING!: Sequencer will process only first element from invocations array
   *
   * @param invocations Array of invocations, but only first invocation will be processed
   * @param blockIdentifier block identifier, default 'latest'
   * @param skipValidate Skip Account __validate__ method
   * @returns
   */
  public async getSimulateTransaction(
    invocations: AccountInvocations,
    {
      blockIdentifier = this.blockIdentifier,
      skipValidate = false,
      skipExecute = false,
    }: getSimulateTransactionOptions
  ): Promise<SimulateTransactionResponse> {
    if (invocations.length > 1) {
      // eslint-disable-next-line no-console
      console.warn('Sequencer simulate process only first element from invocations list');
    }
    if (skipExecute) {
      // eslint-disable-next-line no-console
      console.warn("Sequencer can't skip account __execute__");
    }
    const transaction = this.buildTransaction(invocations[0]);
    return this.fetchEndpoint(
      'simulate_transaction',
      {
        blockIdentifier,
        skipValidate: skipValidate ?? false,
      },
      transaction
    ).then(this.responseParser.parseSimulateTransactionResponse);
  }

  public async getStateUpdate(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<StateUpdateResponse> {
    const args = new Block(blockIdentifier).sequencerIdentifier;
    return this.fetchEndpoint('get_state_update', { ...args }).then(
      this.responseParser.parseGetStateUpdateResponse
    );
  }

  // consider adding an optional trace retrieval parameter to the getBlock method
  public async getBlockTraces(
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<Sequencer.BlockTransactionTracesResponse> {
    const args = new Block(blockIdentifier).sequencerIdentifier;
    return this.fetchEndpoint('get_block_traces', { ...args });
  }

  public async getStarkName(address: BigNumberish, StarknetIdContract?: string): Promise<string> {
    return getStarkName(this, address, StarknetIdContract);
  }

  public async getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string> {
    return getAddressFromStarkName(this, name, StarknetIdContract);
  }

  /**
   * Build Single AccountTransaction from Single AccountInvocation
   * @param invocation AccountInvocationItem
   * @param versionType 'fee' | 'transaction' - used to determine default versions
   * @returns AccountTransactionItem
   */
  public buildTransaction(
    invocation: AccountInvocationItem,
    versionType?: 'fee' | 'transaction'
  ): Sequencer.AccountTransactionItem {
    const defaultVersions = getVersionsByType(versionType);
    const details = {
      signature: signatureToDecimalArray(invocation.signature),
      nonce: toHex(invocation.nonce),
    };

    if (invocation.type === TransactionType.INVOKE) {
      return {
        type: invocation.type,
        sender_address: invocation.contractAddress,
        calldata: CallData.compile(invocation.calldata ?? []),
        version: toHex(invocation.version || defaultVersions.v1),
        ...details,
      };
    }
    if (invocation.type === TransactionType.DECLARE) {
      if (!isSierra(invocation.contract)) {
        return {
          type: invocation.type,
          contract_class: invocation.contract,
          sender_address: invocation.senderAddress,
          version: toHex(invocation.version || defaultVersions.v1), // fee from getDeclareEstimateFee use t.v. instead of feet.v.
          ...details,
        };
      }
      return {
        type: invocation.type,
        contract_class: invocation.contract,
        compiled_class_hash: invocation.compiledClassHash,
        sender_address: invocation.senderAddress,
        version: toHex(invocation.version || defaultVersions.v2), // fee on getDeclareEstimateFee use t.v. instead of feet.v.
        ...details,
      };
    }
    if (invocation.type === TransactionType.DEPLOY_ACCOUNT) {
      return {
        type: invocation.type,
        constructor_calldata: CallData.compile(invocation.constructorCalldata || []),
        class_hash: toHex(invocation.classHash),
        contract_address_salt: toHex(invocation.addressSalt || 0),
        version: toHex(invocation.version || defaultVersions.v1),
        ...details,
      };
    }
    throw Error('Sequencer buildTransaction received unknown TransactionType');
  }
}

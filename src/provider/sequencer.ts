import urljoin from 'url-join';

import { BaseUrl, NetworkName, StarknetChainId } from '../constants';
import {
  AccountInvocationItem,
  AccountInvocations,
  BigNumberish,
  BlockIdentifier,
  CairoAssembly,
  Call,
  CallContractResponse,
  CallL1Handler,
  ContractClass,
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
  TransactionStatus,
  TransactionType,
  getEstimateFeeBulkOptions,
  getSimulateTransactionOptions,
  waitForTransactionOptions,
} from '../types';
import { CallData } from '../utils/calldata';
import { isSierra } from '../utils/contract';
import fetch from '../utils/fetchPonyfill';
import {
  getSelector,
  getSelectorFromName,
  transactionVersion,
  transactionVersion_2,
} from '../utils/hash';
import { parse, parseAlwaysAsBig, stringify } from '../utils/json';
import {
  bigNumberishArrayToDecimalStringArray,
  getDecimalString,
  getHexString,
  getHexStringArray,
  toBigInt,
  toHex,
} from '../utils/num';
import { parseContract, wait } from '../utils/provider';
import { SequencerAPIResponseParser } from '../utils/responseParser/sequencer';
import { formatSignature, randomAddress, signatureToDecimalArray } from '../utils/stark';
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
  network: NetworkName.SN_GOERLI2,
  blockIdentifier: 'pending',
};

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
      case NetworkName.SN_MAIN || StarknetChainId.SN_MAIN:
        return BaseUrl.SN_MAIN;
      case NetworkName.SN_GOERLI || StarknetChainId.SN_GOERLI:
        return BaseUrl.SN_GOERLI;
      case NetworkName.SN_GOERLI2 || StarknetChainId.SN_GOERLI2:
        return BaseUrl.SN_GOERLI2;
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
      if (url.host.includes('alpha4-2.starknet.io')) {
        return StarknetChainId.SN_GOERLI2;
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
  ): Promise<ContractClass> {
    return this.fetchEndpoint('get_full_contract', { blockIdentifier, contractAddress }).then(
      (res) => {
        if (isSierra(res)) {
          return this.responseParser.parseSierraContractClassResponse(res);
        }
        return parseContract(res);
      }
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
  ): Promise<ContractClass> {
    return this.fetchEndpoint('get_class_by_hash', { classHash, blockIdentifier }).then((res) => {
      if (isSierra(res)) {
        return this.responseParser.parseSierraContractClassResponse(res);
      }
      return parseContract(res);
    });
  }

  public async getCompiledClassByClassHash(
    classHash: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<CairoAssembly> {
    return this.fetchEndpoint('get_compiled_class_by_class_hash', { classHash, blockIdentifier });
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
    return this.fetchEndpoint(
      'estimate_fee',
      { blockIdentifier, skipValidate },
      {
        type: TransactionType.INVOKE,
        sender_address: invocation.contractAddress,
        calldata: CallData.compile(invocation.calldata ?? []),
        signature: signatureToDecimalArray(invocation.signature),
        version: toHex(invocationDetails?.version || 1),
        nonce: toHex(invocationDetails.nonce),
      }
    ).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getDeclareEstimateFee(
    { senderAddress, contract, signature, compiledClassHash }: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier,
    skipValidate: boolean = false
  ): Promise<EstimateFeeResponse> {
    if (!isSierra(contract)) {
      return this.fetchEndpoint(
        'estimate_fee',
        { blockIdentifier, skipValidate },
        {
          type: TransactionType.DECLARE,
          sender_address: senderAddress,
          contract_class: contract,
          signature: signatureToDecimalArray(signature),
          version: toHex(transactionVersion),
          nonce: toHex(details.nonce),
        }
      ).then(this.responseParser.parseFeeEstimateResponse);
    }

    return this.fetchEndpoint(
      'estimate_fee',
      { blockIdentifier, skipValidate },
      {
        type: TransactionType.DECLARE,
        sender_address: senderAddress,
        compiled_class_hash: compiledClassHash,
        contract_class: contract,
        nonce: toHex(details.nonce),
        signature: signatureToDecimalArray(signature),
        version: toHex(transactionVersion_2),
      }
    ).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getDeployAccountEstimateFee(
    { classHash, addressSalt, constructorCalldata, signature }: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier: BlockIdentifier = this.blockIdentifier,
    skipValidate: boolean = false
  ): Promise<EstimateFeeResponse> {
    return this.fetchEndpoint(
      'estimate_fee',
      { blockIdentifier, skipValidate },
      {
        type: TransactionType.DEPLOY_ACCOUNT,
        class_hash: toHex(classHash),
        constructor_calldata: CallData.compile(constructorCalldata || []),
        contract_address_salt: toHex(addressSalt || 0),
        signature: signatureToDecimalArray(signature),
        version: toHex(details?.version || 0),
        nonce: toHex(details.nonce),
      }
    ).then(this.responseParser.parseFeeEstimateResponse);
  }

  public async getEstimateFeeBulk(
    invocations: AccountInvocations,
    { blockIdentifier = this.blockIdentifier, skipValidate = false }: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulk> {
    const params: Sequencer.EstimateFeeRequestBulk = invocations.map((invocation) => {
      let res;
      if (invocation.type === TransactionType.INVOKE) {
        res = {
          type: invocation.type,
          sender_address: invocation.contractAddress,
          calldata: CallData.compile(invocation.calldata ?? []),
        };
      } else if (invocation.type === TransactionType.DECLARE) {
        if (!isSierra(invocation.contract)) {
          res = {
            type: invocation.type,
            contract_class: invocation.contract,
            sender_address: invocation.senderAddress,
          };
        }
        res = {
          type: invocation.type,
          contract_class: invocation.contract,
          compiled_class_hash: invocation.compiledClassHash,
          sender_address: invocation.senderAddress,
        };
      } else {
        res = {
          type: invocation.type,
          class_hash: toHex(toBigInt(invocation.classHash)),
          constructor_calldata: CallData.compile(invocation.constructorCalldata || []),
          contract_address_salt: toHex(toBigInt(invocation.addressSalt || 0)),
        };
      }

      // TODO: TT: What case is this ??? This will never enter ?
      return {
        ...res,
        signature: bigNumberishArrayToDecimalStringArray(formatSignature(invocation.signature)),
        version: toHex(toBigInt(invocation?.version || 1)),
        nonce: toHex(toBigInt(invocation.nonce)),
      };
    });

    return this.fetchEndpoint('estimate_fee_bulk', { blockIdentifier, skipValidate }, params).then(
      this.responseParser.parseFeeEstimateBulkResponse
    );
  }

  public async getCode(
    contractAddress: string,
    blockIdentifier: BlockIdentifier = this.blockIdentifier
  ): Promise<Sequencer.GetCodeResponse> {
    return this.fetchEndpoint('get_code', { contractAddress, blockIdentifier });
  }

  public async waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions) {
    const errorStates = [TransactionStatus.REJECTED, TransactionStatus.NOT_RECEIVED];
    let onchain = false;
    let res;
    const retryInterval = options?.retryInterval ?? 8000;
    const successStates = options?.successStates ?? [
      TransactionStatus.ACCEPTED_ON_L1,
      TransactionStatus.ACCEPTED_ON_L2,
      TransactionStatus.PENDING,
    ];

    while (!onchain) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);
      // eslint-disable-next-line no-await-in-loop
      res = await this.getTransactionStatus(txHash);

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
    const txReceipt = await this.getTransactionReceipt(txHash);
    return txReceipt;
  }

  /**
   * Gets the status of a transaction.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)
   *
   * @param txHash
   * @returns the transaction status object \{ block_number, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN \}
   */
  public async getTransactionStatus(txHash: BigNumberish): Promise<GetTransactionStatusResponse> {
    const txHashHex = toHex(txHash);
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
   * @param txHash
   * @returns the transaction trace
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
    return this.fetchEndpoint(
      'simulate_transaction',
      {
        blockIdentifier,
        skipValidate: skipValidate ?? false,
      },
      {
        ...this.buildInvocation(invocations[0]),
      }
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

  public buildInvocation(invocation: AccountInvocationItem): Sequencer.SimulateTransactionItem {
    if (invocation.type === TransactionType.INVOKE) {
      return {
        type: invocation.type,
        sender_address: invocation.contractAddress,
        calldata: CallData.toHex(invocation.calldata),
        signature: signatureToDecimalArray(invocation.signature),
        version: toHex(invocation.version || 1),
        nonce: toHex(invocation.nonce),
      };
    }

    if (invocation.type === TransactionType.DECLARE) {
      if (!isSierra(invocation.contract)) {
        return {
          type: invocation.type,
          contract_class: invocation.contract,
          sender_address: invocation.senderAddress,
          signature: signatureToDecimalArray(invocation.signature),
          version: toHex(transactionVersion),
          nonce: toHex(invocation.nonce),
        };
      }
      return {
        type: invocation.type,
        contract_class: invocation.contract,
        compiled_class_hash: invocation.compiledClassHash,
        sender_address: invocation.senderAddress,
        signature: signatureToDecimalArray(invocation.signature),
        version: toHex(transactionVersion_2),
        nonce: toHex(invocation.nonce),
      };
    }

    return {
      type: invocation.type,
      constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
      class_hash: toHex(invocation.classHash),
      contract_address_salt: toHex(invocation.addressSalt || 0),
      signature: signatureToDecimalArray(invocation.signature),
      version: toHex(invocation.version || 0),
      nonce: toHex(invocation.nonce),
    };
  }
}

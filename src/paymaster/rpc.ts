import { Signature } from 'starknet-types-07';
import { JRPC } from '../types/api';
import { type Call, RPC, RPC_ERROR, RpcProviderOptions } from '../types';
import { getDefaultPaymasterNodeUrl } from '../utils/paymaster';
import fetch from '../utils/fetchPonyfill';
import { LibraryError, RpcError } from '../utils/errors';
import { PaymasterInterface } from './interface';
import { NetworkName } from '../global/constants';
import { stringify } from '../utils/json';
import {
  AccountDeploymentData,
  ExecuteResponse,
  OutsideExecutionTypedData,
  TimeBounds,
} from '../types/api/paymaster-rpc-spec/nonspec';
import { CallData } from '../utils/calldata';
import { getSelectorFromName } from '../utils/hash';
import { signatureToHexArray } from '../utils/stark';
import { PaymasterOptions, TokenData, TypedDataWithTokenAmountAndPrice } from '../types/paymaster';

const defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
};

export class PaymasterRpc implements PaymasterInterface {
  public nodeUrl: string;

  public headers: object;

  public readonly baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;

  public requestId: number;

  constructor(options?: PaymasterOptions | PaymasterInterface | PaymasterRpc) {
    if (options instanceof PaymasterRpc) {
      this.nodeUrl = options.nodeUrl;
      this.headers = { ...defaultOptions.headers, ...options.headers };
      this.baseFetch = options.baseFetch;
      this.requestId = options.requestId;
      return;
    }

    if (options && 'nodeUrl' in options && 'headers' in options && 'baseFetch' in options) {
      this.nodeUrl = options.nodeUrl ?? getDefaultPaymasterNodeUrl(undefined);
      this.headers = { ...defaultOptions.headers, ...options.headers };
      this.baseFetch = options.baseFetch ?? fetch;
      this.requestId = 0;
      return;
    }

    const { nodeUrl, headers, baseFetch } = options || {};
    if (nodeUrl && Object.values(NetworkName).includes(nodeUrl as NetworkName)) {
      this.nodeUrl = getDefaultPaymasterNodeUrl(nodeUrl as NetworkName, options?.default);
    } else if (nodeUrl) {
      this.nodeUrl = nodeUrl;
    } else {
      this.nodeUrl = getDefaultPaymasterNodeUrl(undefined, options?.default);
    }
    this.baseFetch = baseFetch ?? fetch;
    this.headers = { ...defaultOptions.headers, ...headers };
    this.requestId = 0;
  }

  public fetch(method: string, params?: object, id: string | number = 0) {
    const rpcRequestBody: JRPC.RequestBody = {
      id,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    return this.baseFetch(this.nodeUrl, {
      method: 'POST',
      body: stringify(rpcRequestBody),
      headers: this.headers as Record<string, string>,
    });
  }

  protected errorHandler(method: string, params: any, rpcError?: JRPC.Error, otherError?: any) {
    if (rpcError) {
      throw new RpcError(rpcError as RPC_ERROR, method, params);
    }
    if (otherError instanceof LibraryError) {
      throw otherError;
    }
    if (otherError) {
      throw Error(otherError.message);
    }
  }

  protected async fetchEndpoint<T extends keyof RPC.PAYMASTER_RPC_SPEC.Methods>(
    method: T,
    params?: RPC.PAYMASTER_RPC_SPEC.Methods[T]['params']
  ): Promise<RPC.PAYMASTER_RPC_SPEC.Methods[T]['result']> {
    try {
      this.requestId += 1;
      const rawResult = await this.fetch(method, params, this.requestId);
      const { error, result } = await rawResult.json();
      this.errorHandler(method, params, error);
      return result as RPC.PAYMASTER_RPC_SPEC.Methods[T]['result'];
    } catch (error: any) {
      this.errorHandler(method, params, error?.response?.data, error);
      throw error;
    }
  }

  public async isAvailable(): Promise<boolean> {
    return this.fetchEndpoint('paymaster_isAvailable');
  }

  public async buildTypedData(
    user_address: string,
    calls: Call[],
    gas_token_address?: string,
    time_bounds?: TimeBounds,
    deployment_data?: AccountDeploymentData
  ): Promise<TypedDataWithTokenAmountAndPrice> {
    return this.fetchEndpoint('paymaster_buildTypedData', {
      user_address,
      calls: calls.map((call) => ({
        to: call.contractAddress,
        selector: getSelectorFromName(call.entrypoint),
        calldata: CallData.toHex(call.calldata),
      })),
      gas_token_address,
      deployment_data,
      time_bounds,
    }).then((r) => ({
      typedData: r.typed_data,
      tokenAmountAndPrice: {
        estimatedAmount: BigInt(r.token_amount_and_price.estimated_amount),
        priceInStrk: BigInt(r.token_amount_and_price.price_in_strk),
      },
    }));
  }

  public async execute(
    user_address: string,
    typed_data: OutsideExecutionTypedData,
    signature: Signature,
    deployment_data?: AccountDeploymentData
  ): Promise<ExecuteResponse> {
    return this.fetchEndpoint('paymaster_execute', {
      user_address,
      deployment_data,
      typed_data,
      signature: signatureToHexArray(signature),
    });
  }

  public async getSupportedTokensAndPrices(): Promise<TokenData[]> {
    return this.fetchEndpoint('paymaster_getSupportedTokensAndPrices').then((tokens) =>
      tokens.map((token) => ({
        tokenAddress: token.token_address,
        decimals: token.decimals,
        priceInStrk: BigInt(token.price_in_strk),
      }))
    );
  }
}

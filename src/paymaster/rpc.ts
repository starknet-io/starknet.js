import type { JRPC, PAYMASTER_API, TIME_BOUNDS } from '../types/api';
import type {
  Call,
  ExecutableUserTransaction,
  ExecutionParameters,
  FeeMode,
  PaymasterFeeEstimate,
  PaymasterTimeBounds,
  PreparedTransaction,
  RPC_ERROR,
  RpcProviderOptions,
  UserTransaction,
  PaymasterOptions,
  TokenData,
} from '../types';
import { getDefaultPaymasterNodeUrl } from '../utils/paymaster';
import fetch from '../utils/connect/fetch';
import { LibraryError, RpcError } from '../utils/errors';
import { PaymasterInterface } from './interface';
import { NetworkName } from '../global/constants';
import { stringify } from '../utils/json';
import { CallData } from '../utils/calldata';
import { getSelectorFromName } from '../utils/hash';
import { signatureToHexArray } from '../utils/stark';

const convertCalls = (calls: Call[]): PAYMASTER_API.CALL[] =>
  calls.map((call) => ({
    to: call.contractAddress,
    selector: getSelectorFromName(call.entrypoint),
    calldata: CallData.toHex(call.calldata),
  }));

const convertFeeMode = (feeMode: FeeMode): PAYMASTER_API.FEE_MODE => {
  if (feeMode.mode === 'sponsored') {
    return { mode: 'sponsored' };
  }
  return { mode: 'default', gas_token: feeMode.gasToken };
};

const convertFEE_MODE = (feeMode: PAYMASTER_API.FEE_MODE): FeeMode => {
  if (feeMode.mode === 'sponsored') {
    return { mode: 'sponsored' };
  }
  return { mode: 'default', gasToken: feeMode.gas_token };
};

const convertTimeBounds = (timeBounds?: PaymasterTimeBounds): TIME_BOUNDS | undefined =>
  timeBounds && timeBounds.executeAfter && timeBounds.executeBefore
    ? {
        execute_after: timeBounds.executeAfter,
        execute_before: timeBounds.executeBefore,
      }
    : undefined;

const convertTIME_BOUNDS = (timeBounds?: TIME_BOUNDS): PaymasterTimeBounds | undefined =>
  timeBounds && timeBounds.execute_after && timeBounds.execute_before
    ? {
        executeAfter: timeBounds.execute_after,
        executeBefore: timeBounds.execute_before,
      }
    : undefined;

const convertEXECUTION_PARAMETERS = (
  parameters: PAYMASTER_API.EXECUTION_PARAMETERS
): ExecutionParameters => ({
  version: parameters.version,
  feeMode: convertFEE_MODE(parameters.fee_mode),
  timeBounds: convertTIME_BOUNDS(parameters.time_bounds),
});

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

  protected async fetchEndpoint<T extends keyof PAYMASTER_API.Methods>(
    method: T,
    params?: PAYMASTER_API.Methods[T]['params']
  ): Promise<PAYMASTER_API.Methods[T]['result']> {
    try {
      this.requestId += 1;
      const rawResult = await this.fetch(method, params, this.requestId);
      const { error, result } = await rawResult.json();
      this.errorHandler(method, params, error);
      return result as PAYMASTER_API.Methods[T]['result'];
    } catch (error: any) {
      this.errorHandler(method, params, error?.response?.data, error);
      throw error;
    }
  }

  public async isAvailable(): Promise<boolean> {
    return this.fetchEndpoint('paymaster_isAvailable');
  }

  public async buildTransaction(
    transaction: UserTransaction,
    parameters: ExecutionParameters
  ): Promise<PreparedTransaction> {
    let userTransaction: PAYMASTER_API.USER_TRANSACTION;
    switch (transaction.type) {
      case 'invoke':
        userTransaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            calls: convertCalls(transaction.invoke.calls),
          },
        };
        break;

      case 'deploy_and_invoke':
        userTransaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            calls: convertCalls(transaction.invoke.calls),
          },
        };
        break;

      case 'deploy':
      default:
        userTransaction = transaction;
        break;
    }
    const executionParameters: PAYMASTER_API.EXECUTION_PARAMETERS = {
      version: parameters.version,
      fee_mode: convertFeeMode(parameters.feeMode),
      time_bounds: convertTimeBounds(parameters.timeBounds),
    };

    const response = await this.fetchEndpoint('paymaster_buildTransaction', {
      transaction: userTransaction,
      parameters: executionParameters,
    });

    const fee: PaymasterFeeEstimate = {
      gas_token_price_in_strk: BigInt(response.fee.gas_token_price_in_strk),
      estimated_fee_in_strk: BigInt(response.fee.estimated_fee_in_strk),
      estimated_fee_in_gas_token: BigInt(response.fee.estimated_fee_in_gas_token),
      suggested_max_fee_in_strk: BigInt(response.fee.suggested_max_fee_in_strk),
      suggested_max_fee_in_gas_token: BigInt(response.fee.suggested_max_fee_in_gas_token),
    };

    switch (response.type) {
      case 'invoke':
        return {
          type: 'invoke',
          typed_data: response.typed_data,
          parameters: convertEXECUTION_PARAMETERS(response.parameters),
          fee,
        };
      case 'deploy_and_invoke':
        return {
          type: 'deploy_and_invoke',
          deployment: response.deployment,
          typed_data: response.typed_data,
          parameters: convertEXECUTION_PARAMETERS(response.parameters),

          fee,
        };
      case 'deploy':
      default:
        return {
          type: 'deploy',
          deployment: response.deployment,
          parameters: convertEXECUTION_PARAMETERS(response.parameters),
          fee,
        };
    }
  }

  public async executeTransaction(
    transaction: ExecutableUserTransaction,
    parameters: ExecutionParameters
  ): Promise<PAYMASTER_API.ExecuteResponse> {
    let user_transaction: PAYMASTER_API.EXECUTABLE_USER_TRANSACTION;
    switch (transaction.type) {
      case 'invoke':
        user_transaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            typed_data: transaction.invoke.typedData,
            signature: signatureToHexArray(transaction.invoke.signature),
          },
        };
        break;

      case 'deploy_and_invoke':
        user_transaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            typed_data: transaction.invoke.typedData,
            signature: signatureToHexArray(transaction.invoke.signature),
          },
        };
        break;

      case 'deploy':
      default:
        user_transaction = transaction;
        break;
    }
    const executionParameters: PAYMASTER_API.EXECUTION_PARAMETERS = {
      version: parameters.version,
      fee_mode: convertFeeMode(parameters.feeMode),
      time_bounds: convertTimeBounds(parameters.timeBounds),
    };
    return this.fetchEndpoint('paymaster_executeTransaction', {
      transaction: user_transaction,
      parameters: executionParameters,
    });
  }

  public async getSupportedTokens(): Promise<TokenData[]> {
    return this.fetchEndpoint('paymaster_getSupportedTokens').then((tokens) =>
      tokens.map((token) => ({
        token_address: token.token_address,
        decimals: token.decimals,
        priceInStrk: BigInt(token.price_in_strk),
      }))
    );
  }
}

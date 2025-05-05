import {
  PreparedTransaction,
  RpcProviderOptions,
  TokenData,
  UserTransaction,
  ExecutableUserTransaction,
  ExecutionParameters,
} from '../types';
import { ExecuteResponse } from '../types/api/paymaster-rpc-spec/nonspec';

export abstract class PaymasterInterface {
  public abstract nodeUrl: string;

  public abstract headers: object;

  public abstract readonly baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;

  /**
   * Returns the status of the paymaster service
   *
   * @returns If the paymaster service is correctly functioning, return true. Else, return false
   */
  public abstract isAvailable(): Promise<boolean>;

  /**
   * Receives the transaction the user wants to execute. Returns the typed data along with
   * the estimated gas cost and the maximum gas cost suggested to ensure execution
   *
   * @param transaction Transaction to be executed by the paymaster
   * @param parameters Execution parameters to be used when executing the transaction
   * @returns The transaction data required for execution along with an estimation of the fee
   */
  public abstract buildTransaction(
    transaction: UserTransaction,
    parameters: ExecutionParameters
  ): Promise<PreparedTransaction>;

  /**
   * Sends the signed typed data to the paymaster service for execution
   *
   * @param transaction Typed data build by calling paymaster_buildTransaction signed by the user to be executed by the paymaster service
   * @param parameters Execution parameters to be used when executing the transaction
   * @returns The hash of the transaction broadcasted by the paymaster and the tracking ID corresponding to the user `execute` request
   */
  public abstract executeTransaction(
    transaction: ExecutableUserTransaction,
    parameters: ExecutionParameters
  ): Promise<ExecuteResponse>;

  /**
   * Get a list of the tokens that the paymaster supports, together with their prices in STRK
   *
   * @returns An array of token data
   */
  public abstract getSupportedTokens(): Promise<TokenData[]>;
}

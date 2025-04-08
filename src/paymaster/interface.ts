import { Signature, TypedData } from 'starknet-types-07';
import { Call, RpcProviderOptions } from '../types';
import {
  AccountDeploymentData,
  ExecuteResponse,
  TimeBounds,
} from '../types/api/paymaster-rpc-spec/nonspec';
import { TokenData, TypedDataWithTokenAmountAndPrice } from '../types/paymaster';

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
   * Sends the array of calls that the user wishes to make, along with token data.
   * Returns a typed object for the user to sign and, optionally, data about token amount and rate.
   *
   * @param userAddress The address of the user account
   * @param calls The sequence of calls that the user wishes to perform
   * @param deploymentData The necessary data to deploy an account through the universal deployer contract
   * @param timeBounds Bounds on valid timestamps
   * @param gasTokenAddress The address of the token contract that the user wishes use to pay fees with. If not present then the paymaster can allow other flows, such as sponsoring
   * @returns The typed data that the user needs to sign, together with information about the fee
   */
  public abstract buildTypedData(
    userAddress: string,
    calls: Call[],
    gasTokenAddress?: string,
    timeBounds?: TimeBounds,
    deploymentData?: AccountDeploymentData
  ): Promise<TypedDataWithTokenAmountAndPrice>;

  /**
   * Sends the signed typed data to the paymaster service for execution
   *
   * @param userAddress The address of the user account
   * @param deploymentData The necessary data to deploy an account through the universal deployer contract
   * @param typedData The typed data that was returned by the `paymaster_buildTypedData` endpoint and signed upon by the user
   * @param signature The signature of the user on the typed data
   * @returns The hash of the transaction broadcasted by the paymaster and the tracking ID corresponding to the user `execute` request
   */
  public abstract execute(
    userAddress: string,
    typedData: TypedData,
    signature: Signature,
    deploymentData?: AccountDeploymentData
  ): Promise<ExecuteResponse>;

  /**
   * Get a list of the tokens that the paymaster supports, together with their prices in STRK
   *
   * @returns An array of token data
   */
  public abstract getSupportedTokensAndPrices(): Promise<TokenData[]>;
}

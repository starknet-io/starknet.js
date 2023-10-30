import type { Abi as AbiKanabi, TypedContract as AbiWanTypedContract } from 'abi-wan-kanabi';

import { AccountInterface } from '../account';
import { ProviderInterface } from '../provider';
import {
  Abi,
  ArgsOrCalldata,
  AsyncContractFunction,
  BlockIdentifier,
  CallOptions,
  ContractFunction,
  ContractVersion,
  EstimateFeeResponse,
  GetTransactionReceiptResponse,
  Invocation,
  InvokeFunctionResponse,
  InvokeOptions,
  ParsedEvents,
  Result,
} from '../types';

export type TypedContract<TAbi extends AbiKanabi> = AbiWanTypedContract<TAbi> & ContractInterface;

export abstract class ContractInterface {
  public abstract abi: Abi;

  public abstract address: string;

  public abstract providerOrAccount: ProviderInterface | AccountInterface;

  public abstract deployTransactionHash?: string;

  readonly functions!: { [name: string]: AsyncContractFunction };

  readonly callStatic!: { [name: string]: AsyncContractFunction };

  readonly populateTransaction!: { [name: string]: ContractFunction };

  readonly estimateFee!: { [name: string]: ContractFunction };

  readonly [key: string]: AsyncContractFunction | any;

  /**
   * Saves the address of the contract deployed on network that will be used for interaction
   *
   * @param address - address of the contract
   */
  public abstract attach(address: string): void;

  /**
   * Attaches to new Provider or Account
   *
   * @param providerOrAccount - new Provider or Account to attach to
   */
  public abstract connect(providerOrAccount: ProviderInterface | AccountInterface): void;

  /**
   * Resolves when contract is deployed on the network or when no deployment transaction is found
   *
   * @returns Promise that resolves when contract is deployed on the network or when no deployment transaction is found
   * @throws When deployment fails
   */
  public abstract deployed(): Promise<ContractInterface>;

  /**
   * Calls a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call
   * @param options optional blockIdentifier
   * @returns Result of the call as an array with key value pars
   */
  public abstract call(
    method: string,
    args?: ArgsOrCalldata,
    options?: CallOptions
  ): Promise<Result>;

  /**
   * Invokes a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the invoke or Calldata
   * @param options
   * @returns Add Transaction Response
   */
  public abstract invoke(
    method: string,
    args?: ArgsOrCalldata,
    options?: InvokeOptions
  ): Promise<InvokeFunctionResponse>;

  /**
   * Estimates a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call or Calldata
   * @param options optional blockIdentifier
   */
  public abstract estimate(
    method: string,
    args?: ArgsOrCalldata,
    options?: {
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<EstimateFeeResponse>;

  /**
   * Calls a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call or Calldata
   * @returns Invocation object
   */
  public abstract populate(method: string, args?: ArgsOrCalldata): Invocation;

  /**
   * Parse contract events of a GetTransactionReceiptResponse received from waitForTransaction. Based on contract's abi
   *
   * @param receipt transaction receipt
   * @returns Events parsed
   */
  public abstract parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents;

  /**
   * tells if the contract comes from a Cairo 1 contract
   *
   * @returns TRUE if the contract comes from a Cairo1 contract
   * @example
   * ```typescript
   * const isCairo1: boolean = myContract.isCairo1();
   * ```
   */
  public abstract isCairo1(): boolean;

  /**
   * Retrieves the version of the contract (cairo version & compiler version)
   */
  public abstract getVersion(): Promise<ContractVersion>;

  public abstract typed<TAbi extends AbiKanabi>(tAbi: TAbi): TypedContract<TAbi>;
}

import { AccountInterface } from '../account';
import { ProviderInterface } from '../provider';
import { BlockIdentifier } from '../provider/utils';
import {
  Abi,
  AsyncContractFunction,
  ContractFunction,
  Invocation,
  InvokeFunctionResponse,
  Overrides,
  Result,
} from '../types';

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
    args?: Array<any>,
    options?: {
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<Result>;

  /**
   * Invokes a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the invoke
   * @param options
   * @returns Add Transaction Response
   */
  public abstract invoke(
    method: string,
    args?: Array<any>,
    options?: Overrides
  ): Promise<InvokeFunctionResponse>;

  /**
   * Estimates a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call
   * @param options optional blockIdentifier
   */
  public abstract estimate(
    method: string,
    args?: Array<any>,
    options?: {
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<any>;

  /**
   * Calls a method on a contract
   *
   * @param method name of the method
   * @param args Array of the arguments for the call
   * @returns Invocation object
   */
  public abstract populate(method: string, args?: Array<any>): Invocation;
}

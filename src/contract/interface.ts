import type { Abi as AbiKanabi, TypedContract as AbiWanTypedContract } from 'abi-wan-kanabi';

import type {
  Abi,
  BigNumberish,
  BlockIdentifier,
  Calldata,
  ContractVersion,
  Invocation,
  InvokeFunctionResponse,
  PaymasterFeeEstimate,
  RawArgs,
  Uint256,
} from '../types';
import type {
  ArgsOrCalldata,
  AsyncContractFunction,
  CallOptions,
  CallResult,
  ContractFunction,
  ExecuteOptions,
  ParsedEvents,
  ProviderOrAccount,
  WithOptions,
} from './types/index.type';
import type { EstimateFeeResponseOverhead } from '../provider/types/index.type';
import { CairoCustomEnum } from '../utils/calldata/enum/CairoCustomEnum';
import { CairoOption } from '../utils/calldata/enum/CairoOption';
import { CairoResult } from '../utils/calldata/enum/CairoResult';
import type { GetTransactionReceiptResponse } from '../utils/transactionReceipt/transactionReceipt.type';

declare module 'abi-wan-kanabi' {
  export interface Config<OptionT = any, ResultT = any, ErrorT = any> {
    FeltType: BigNumberish;
    U256Type: number | bigint | Uint256;
    U512Type: BigNumberish;
    Secp256k1PointType: BigNumberish;
    Option: CairoOption<OptionT>;
    Tuple: Record<number, BigNumberish | object | boolean>;
    Result: CairoResult<ResultT, ErrorT>;
    Enum: CairoCustomEnum;
    Calldata: RawArgs | Calldata;
    CallOptions: CallOptions;
    InvokeOptions: ExecuteOptions;
    InvokeFunctionResponse: InvokeFunctionResponse;
  }
}

type TypedContractV2<TAbi extends AbiKanabi> = AbiWanTypedContract<TAbi> & ContractInterface;

/**
 * Interface for interacting with Starknet smart contracts
 *
 * Provides methods for calling contract functions, estimating fees, and managing contract state.
 * Supports both read-only calls and state-changing invocations.
 *
 * @remarks
 * The interface provides multiple ways to interact with contracts:
 * - Direct method calls for convenience
 * - Generic call/invoke methods for flexibility
 * - Fee estimation and transaction population
 * - Event parsing and contract validation
 */
export abstract class ContractInterface {
  /**
   * Contract ABI (Application Binary Interface)
   */
  public abstract abi: Abi;

  /**
   * Contract address on Starknet
   */
  public abstract address: string;

  /**
   * Provider for read operations or Account for write operations
   */
  public abstract providerOrAccount: ProviderOrAccount;

  /**
   * Optional contract class hash for optimization
   */
  public abstract classHash?: string;

  /**
   * Contract methods that return promises (async operations)
   */
  readonly functions!: { [name: string]: AsyncContractFunction };

  /**
   * Contract methods for read-only calls (state queries)
   */
  readonly callStatic!: { [name: string]: AsyncContractFunction };

  /**
   * Contract methods that return populated transactions for batching
   */
  readonly populateTransaction!: { [name: string]: ContractFunction };

  /**
   * Contract methods for fee estimation
   */
  readonly estimateFee!: { [name: string]: ContractFunction };

  /**
   * Dynamic method access - allows calling contract methods directly
   */
  readonly [key: string]: AsyncContractFunction | any;

  /**
   * Attach the contract to a different address with optional new ABI
   *
   * @param address - New contract address to interact with
   * @param abi - Optional new ABI to use (defaults to current ABI)
   * @example
   * ```typescript
   * contract.attach('0x123...', newAbi);
   * // Now contract.address === '0x123...' and uses newAbi
   * ```
   */
  public abstract attach(address: string, abi?: Abi): void;

  /**
   * Verify that a contract is deployed at the current address
   *
   * @returns Promise resolving to this contract instance if deployed
   * @throws {Error} If no contract is found at the address
   * @example
   * ```typescript
   * try {
   *   await contract.isDeployed();
   *   console.log('Contract is deployed');
   * } catch (error) {
   *   console.log('Contract not found at address');
   * }
   * ```
   */
  public abstract isDeployed(): Promise<ContractInterface>;

  /**
   * Call a read-only contract method (view function)
   *
   * @param method - Name of the contract method to call
   * @param args - Method arguments as array or calldata
   * @param options - Call options including block identifier and parsing settings
   * @returns Parsed result from the contract method
   * @example
   * ```typescript
   * const balance = await contract.call('balanceOf', [userAddress]);
   * const name = await contract.call('name', [], { blockIdentifier: 'latest' });
   * ```
   */
  public abstract call(
    method: string,
    args?: ArgsOrCalldata,
    options?: CallOptions
  ): Promise<CallResult>;

  /**
   * Invoke a state-changing contract method (external function)
   *
   * @param method - Name of the contract method to invoke
   * @param args - Method arguments as array or calldata
   * @param options - Execution options including transaction details
   * @returns Transaction response with hash
   * @example
   * ```typescript
   * const tx = await contract.invoke('transfer', [recipient, amount]);
   * const receipt = await provider.waitForTransaction(tx.transaction_hash);
   * ```
   */
  public abstract invoke(
    method: string,
    args?: ArgsOrCalldata,
    options?: ExecuteOptions
  ): Promise<InvokeFunctionResponse>;

  /**
   * Estimate fee for invoking a contract method
   *
   * @param method - Name of the contract method to estimate
   * @param args - Method arguments as array or calldata
   * @param options - Estimation options including block identifier
   * @returns Fee estimation details
   * @example
   * ```typescript
   * const feeEstimate = await contract.estimate('transfer', [recipient, amount]);
   * console.log('Estimated fee:', feeEstimate.overall_fee);
   * ```
   */
  public abstract estimate(
    method: string,
    args?: ArgsOrCalldata,
    options?: {
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<EstimateFeeResponseOverhead | PaymasterFeeEstimate>;

  /**
   * Populate transaction data for a contract method call
   *
   * @param method - Name of the contract method
   * @param args - Method arguments as array or calldata
   * @returns Invocation object for batching or inspection
   * @example
   * ```typescript
   * const invocation = contract.populate('transfer', [recipient, amount]);
   * // Use in account.execute([invocation1, invocation2, ...])
   * ```
   */
  public abstract populate(method: string, args?: ArgsOrCalldata): Invocation;

  /**
   * Parse events from a transaction receipt using the contract's ABI
   *
   * @param receipt - Transaction receipt from waitForTransaction
   * @returns Array of parsed events with decoded data
   * @example
   * ```typescript
   * const receipt = await provider.waitForTransaction(txHash);
   * const events = contract.parseEvents(receipt);
   * events.forEach(event => {
   *   console.log('Event:', event.name, event.data);
   * });
   * ```
   */
  public abstract parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents;

  /**
   * Check if the contract is implemented in Cairo 1
   *
   * @returns True if the contract uses Cairo 1, false for Cairo 0 (legacy)
   * @example
   * ```typescript
   * if (contract.isCairo1()) {
   *   console.log('Using Cairo 1 features');
   * }
   * ```
   */
  public abstract isCairo1(): boolean;

  /**
   * Get the Cairo and compiler version of the contract
   *
   * @returns Object containing cairo version and compiler version
   * @example
   * ```typescript
   * const version = await contract.getVersion();
   * console.log(`Cairo ${version.cairo}, Compiler ${version.compiler}`);
   * ```
   */
  public abstract getVersion(): Promise<ContractVersion>;

  /**
   * Create a typed contract instance with full TypeScript support
   *
   * @param tAbi - The typed ABI interface for compile-time type checking
   * @returns Typed contract instance with IntelliSense support
   * @example
   * ```typescript
   * const typedContract = contract.typedv2(erc20Abi);
   * // Now typedContract.transfer() has full type safety
   * ```
   */
  public abstract typedv2<TAbi extends AbiKanabi>(tAbi: TAbi): TypedContractV2<TAbi>;

  /**
   * Set execution options for subsequent contract interactions
   *
   * @param options - Options to override for contract interactions
   * @returns This contract instance with the specified options applied
   * @example
   * ```typescript
   * contract.withOptions({
   *   blockIdentifier: 'latest',
   *   parseResponse: false
   * });
   * // Now all subsequent calls use these options
   * ```
   */
  public abstract withOptions(options: WithOptions): ContractInterface;
}

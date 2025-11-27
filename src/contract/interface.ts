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

// MARK: - External Module Type Extension (Keeping it here for simplicity)
/**
 * Extends the 'abi-wan-kanabi' module config to support custom Starknet.js types.
 */
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

/**
 * Type alias for a contract instance with type-safe methods based on a provided ABI.
 * Combines the generic ContractInterface with abi-wan-kanabi's typed methods.
 */
type TypedContract<TAbi extends AbiKanabi> = AbiWanTypedContract<TAbi> & ContractInterface;

/**
 * Interface for interacting with Starknet smart contracts.
 * * Provides methods for querying contract state (calls), executing state-changing 
 * transactions (invokes), estimating fees, and managing contract metadata.
 */
export abstract class ContractInterface {
  /**
   * Contract ABI (Application Binary Interface).
   */
  public abstract abi: Abi;

  /**
   * Contract address on Starknet (e.g., '0x123...').
   */
  public abstract address: string;

  /**
   * Provider for read-only operations or Account for state-changing transactions.
   */
  public abstract providerOrAccount: ProviderOrAccount;

  /**
   * Optional contract class hash, often used for deployment verification or optimization.
   */
  public abstract classHash?: string;

  /**
   * Dynamic property access for calling write methods (sends transactions).
   * Maps to contract functions that return promises.
   */
  readonly functions!: { [name: string]: AsyncContractFunction };

  /**
   * Dynamic property access for calling read-only methods (queries state).
   * Maps to contract functions for 'callStatic' (view) operations.
   */
  readonly callStatic!: { [name: string]: AsyncContractFunction };

  /**
   * Dynamic property access for populating transaction data without sending it.
   * Maps to contract functions for 'populateTransaction' operations.
   */
  readonly populateTransaction!: { [name: string]: ContractFunction };

  /**
   * Dynamic property access for estimating fees of a transaction.
   * Maps to contract functions for 'estimateFee' operations.
   */
  readonly estimateFee!: { [name: string]: ContractFunction };

  /**
   * Dynamic method access - allows calling contract methods directly (e.g., contract.transfer(...)).
   */
  readonly [key: string]: AsyncContractFunction | any;

  /**
   * Changes the contract's interaction context to a different address and optionally a new ABI.
   *
   * @param address - New contract address to interact with.
   * @param abi - Optional new ABI to use (defaults to current ABI).
   * @example
   * ```typescript
   * contract.attach('0x123...', newAbi);
   * ```
   */
  public abstract attach(address: string, abi?: Abi): void;

  /**
   * Verifies that a contract is deployed at the current address.
   *
   * @returns Promise resolving to this contract instance if deployed.
   * @throws {Error} If no contract is found at the address.
   * @example
   * ```typescript
   * await contract.isDeployed();
   * ```
   */
  public abstract isDeployed(): Promise<ContractInterface>;

  /**
   * Executes a read-only contract method (view function).
   *
   * @param method - Name of the contract method to call.
   * @param args - Method arguments as array or Calldata.
   * @param options - Call options including block identifier and parsing settings.
   * @returns Parsed result from the contract method.
   * @example
   * ```typescript
   * const balance = await contract.call('balanceOf', [userAddress]);
   * ```
   */
  public abstract call(
    method: string,
    args?: ArgsOrCalldata,
    options?: CallOptions
  ): Promise<CallResult>;

  /**
   * Executes a state-changing contract method (external function).
   *
   * @param method - Name of the contract method to invoke.
   * @param args - Method arguments as array or Calldata.
   * @param options - Execution options including transaction details.
   * @returns Transaction response with transaction hash.
   * @example
   * ```typescript
   * const tx = await contract.invoke('transfer', [recipient, amount]);
   * ```
   */
  public abstract invoke(
    method: string,
    args?: ArgsOrCalldata,
    options?: ExecuteOptions
  ): Promise<InvokeFunctionResponse>;

  /**
   * Estimates the fee for invoking a contract method.
   *
   * @param method - Name of the contract method to estimate.
   * @param args - Method arguments as array or Calldata.
   * @param options - Estimation options, typically includes `blockIdentifier`.
   * @returns Fee estimation details.
   * @example
   * ```typescript
   * const feeEstimate = await contract.estimate('transfer', [recipient, amount]);
   * ```
   */
  public abstract estimate(
    method: string,
    args?: ArgsOrCalldata,
    // Use full ExecuteOptions for consistency, even if only blockIdentifier is primarily used
    options?: ExecuteOptions
  ): Promise<EstimateFeeResponseOverhead | PaymasterFeeEstimate>;

  /**
   * Generates the transaction data for a contract method call without sending it.
   *
   * @param method - Name of the contract method.
   * @param args - Method arguments as array or Calldata.
   * @returns Invocation object ready for batch execution.
   * @example
   * ```typescript
   * const invocation = contract.populate('transfer', [recipient, amount]);
   * // Use in account.execute([invocation, ...])
   * ```
   */
  public abstract populate(method: string, args?: ArgsOrCalldata): Invocation;

  /**
   * Parses events from a transaction receipt using the contract's ABI.
   *
   * @param receipt - Transaction receipt object.
   * @returns Array of parsed events with decoded data.
   * @example
   * ```typescript
   * const events = contract.parseEvents(receipt);
   * ```
   */
  public abstract parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents;

  /**
   * Checks if the contract is implemented in Cairo 1 or later.
   *
   * @returns True if the contract uses Cairo 1, false for Cairo 0 (legacy).
   */
  public abstract isCairo1(): boolean;

  /**
   * Retrieves the Cairo and compiler version of the contract.
   *
   * @returns Object containing cairo version and compiler version.
   * @example
   * ```typescript
   * const version = await contract.getVersion();
   * ```
   */
  public abstract getVersion(): Promise<ContractVersion>;

  /**
   * Creates a typed contract instance with full TypeScript support (IntelliSense).
   *
   * @param tAbi - The typed ABI interface for compile-time type checking.
   * @returns Typed contract instance.
   * @example
   * ```typescript
   * const typedContract = contract.typed(erc20Abi);
   * ```
   */
  public abstract typed<TAbi extends AbiKanabi>(tAbi: TAbi): TypedContract<TAbi>;

  /**
   * Creates a new contract instance with specified execution/call options, enabling method chaining.
   * The returned instance will use these options for all subsequent interactions.
   *
   * @param options - Options to override for contract interactions (e.g., blockIdentifier).
   * @returns A new ContractInterface instance with the specified options applied.
   * @example
   * ```typescript
   * const latestContract = contract.withOptions({ blockIdentifier: 'latest' });
   * ```
   */
  public abstract withOptions(options: WithOptions): ContractInterface;
}

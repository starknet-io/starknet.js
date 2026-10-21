import type { BigNumberish, Call } from '../../../types/lib';
import type { InvokeFunctionResponse } from '../../../provider/types/response.type';
import type { PaymasterInterface } from '../interface';
import type {
  ExecutableUserTransaction,
  PaymasterDetails,
  PaymasterFeeEstimate,
  PreparedTransaction,
} from './response.type';

/**
 * The SNIP-29 paymaster members that the paymaster plugin adds to an Account.
 */
export interface PaymasterAccountMethods {
  /**
   * The paymaster service of the account. The paymaster methods read it at each call, so you can
   * replace it after the account is created.
   */
  paymaster: PaymasterInterface;

  /**
   * Build a transaction for paymaster execution
   *
   * @param calls - Array of calls to be sponsored
   * @param paymasterDetails - Paymaster configuration
   *
   * @returns Prepared transaction with typed data for signing
   * @example
   * ```typescript
   * const prepared = await account.buildPaymasterTransaction(
   *   calls,
   *   { feeMode: { mode: 'default', gasToken: ETH_ADDRESS } }
   * );
   * ```
   */
  buildPaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction>;

  /**
   * Estimate fees for a paymaster-sponsored transaction
   *
   * @param calls - Array of calls to be sponsored
   * - .contractAddress - Target contract address
   * - .entrypoint - Function to invoke
   * - .calldata - Function parameters
   *
   * @param paymasterDetails - Paymaster configuration
   * - .feeMode - Sponsorship mode: 'sponsored' or gas token
   * - .deploymentData - Account deployment data if needed
   * - .timeBounds - Valid execution time window
   *
   * @returns Fee estimates in both STRK and gas token
   * @example
   * ```typescript
   * const fees = await account.estimatePaymasterTransactionFee(
   *   [{ contractAddress, entrypoint, calldata }],
   *   { feeMode: { mode: 'sponsored' } }
   * );
   * ```
   */
  estimatePaymasterTransactionFee(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate>;

  /**
   * Signs a transaction prepared by the paymaster, after checking it is safe to sign. The safety
   * check needs the calls and the fee details the user actually requested, so a caller that uses
   * this low-level method directly must pass them, the same way `executePaymasterTransaction`
   * does.
   * @param preparedTransaction the transaction returned by the paymaster.
   * @param calls the calls the user requested.
   * @param paymasterDetails the fee mode and related paymaster details.
   * @param maxFeeInGasToken optional user-approved ceiling on the gas-token fee.
   * @returns The transaction to send to the paymaster, with the signed typed data.
   * @example
   * ```typescript
   * const prepared = await account.buildPaymasterTransaction(calls, paymasterDetails);
   * const executable = await account.preparePaymasterTransaction(
   *   prepared,
   *   calls,
   *   paymasterDetails
   * );
   * const { transaction_hash } = await account.paymaster.executeTransaction(
   *   executable,
   *   prepared.parameters
   * );
   * ```
   */
  preparePaymasterTransaction(
    preparedTransaction: PreparedTransaction,
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<ExecutableUserTransaction>;

  /**
   * Execute a paymaster-sponsored transaction
   *
   * @param calls - Array of calls to execute
   * @param paymasterDetails - Paymaster configuration
   * - .feeMode - 'sponsored' or gas token payment
   * - .deploymentData - Deploy account if needed
   * - .timeBounds - Execution validity window (UNIX timestamps)
   *
   * @param maxFeeInGasToken - Maximum acceptable fee in gas token
   *
   * @returns Transaction hash if successful
   * @throws {Error} If gas token price exceeds maxFeeInGasToken
   * @throws {Error} If transaction parameters are modified by paymaster
   * @example
   * ```typescript
   * const txHash = await account.executePaymasterTransaction(
   *   calls,
   *   { feeMode: { mode: 'sponsored' }, timeBounds: { executeBefore: Date.now()/1000 + 3600 } },
   *   maxFeeETH
   * );
   * ```
   */
  executePaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse>;
}

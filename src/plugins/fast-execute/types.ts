import type { BigNumberish } from '../../types';
import type { InvokeFunctionResponse } from '../../provider/types/response.type';

/**
 * Options for controlling fastWaitForTransaction polling behavior
 */
export type FastWaitForTransactionOptions = {
  /** Number of retry attempts (default: 50) */
  retries?: number;
  /** Milliseconds to wait between retries (default: 500) */
  retryInterval?: number;
};

/**
 * Response from fastExecute() containing transaction result and readiness status
 */
export type FastExecuteResponse = {
  /** The transaction invoke response with transaction hash */
  txResult: InvokeFunctionResponse;
  /** Whether the next transaction can be executed immediately */
  isReady: boolean;
};

/**
 * Provider methods added by the FastExecute plugin
 */
export interface FastExecuteProviderMethods {
  /**
   * Wait for transaction confirmation with polling optimization for gaming.
   *
   * This method is fast but Events and transaction reports are not yet available.
   * Useful for gaming activity and rapid-fire transaction scenarios.
   *
   * Only available on RPC 0.9 and onwards.
   *
   * @param {BigNumberish} txHash - Transaction hash to monitor
   * @param {string} address - Address of the account (used to track nonce changes)
   * @param {BigNumberish} initNonce - Initial nonce of the account (before the transaction)
   * @param {FastWaitForTransactionOptions} [options={retries: 50, retryInterval: 500}] - Polling configuration
   *        options. `retries` is the number of times to retry (default: 50), `retryInterval` is the time in ms
   *        between retries (default: 500).
   * @returns {Promise<boolean>} Returns true if the next transaction is possible (nonce increment detected),
   *          false if the timeout has been reached, or throws an error in case of provider communication failure
   *          or transaction reversion.
   *
   * @example
   * ```typescript
   * const isReady = await provider.fastWaitForTransaction(
   *   '0x123abc...',
   *   '0x456def...',
   *   10,
   *   { retries: 30, retryInterval: 500 }
   * );
   *
   * if (isReady) {
   *   // Next transaction can be sent
   * }
   * ```
   */
  fastWaitForTransaction(
    txHash: BigNumberish,
    address: string,
    initNonce: BigNumberish,
    options?: FastWaitForTransactionOptions
  ): Promise<boolean>;
}

/**
 * Account methods added by the FastExecute plugin
 */
export interface FastExecuteAccountMethods {
  /**
   * Execute one or multiple calls through the account contract,
   * responding as soon as a new transaction is possible with the same account.
   * Useful for gaming usage where rapid consecutive transactions are needed.
   *
   * This method requires the provider to be initialized with `pre_confirmed` blockIdentifier option.
   * RPC 0.9 minimum.
   *
   * In a normal `account.execute()` call followed by `provider.waitForTransaction()`, you have immediate access
   * to the events and transaction report. Here, we process consecutive transactions faster, but events and
   * transaction reports are not available immediately.
   *
   * As a consequence of the above, do not use contract/account deployment with this method.
   *
   * @param {AllowArray<Call>} transactions - Single call or array of calls to execute
   * @param {UniversalDetails} [transactionsDetail] - Transaction execution options
   * @param {FastWaitForTransactionOptions} [waitDetail={retries: 50, retryInterval: 500}] - Options to scan the
   *        network for the next possible transaction. `retries` is the number of times to retry (default: 50),
   *        `retryInterval` is the time in ms between retries (default: 500).
   * @returns {Promise<FastExecuteResponse>} Response containing the transaction result and status for the next
   *          transaction. If `isReady` is true, you can execute the next transaction immediately. If false,
   *          timeout has been reached before the next transaction was possible.
   *
   * @example
   * ```typescript
   * const myProvider = new RpcProvider({
   *   nodeUrl: url,
   *   blockIdentifier: BlockTag.PRE_CONFIRMED
   * });
   * const myAccount = new Account({
   *   provider: myProvider,
   *   address: accountAddress0,
   *   signer: privateKey0
   * });
   *
   * const resp = await myAccount.fastExecute(
   *   call,
   *   { tip: recommendedTip },
   *   { retries: 30, retryInterval: 500 }
   * );
   *
   * // if resp.isReady is true, you can launch immediately a new tx
   * if (resp.isReady) {
   *   // send next transaction
   * }
   * ```
   */
  fastExecute(
    transactions: any,
    transactionsDetail?: any,
    waitDetail?: FastWaitForTransactionOptions
  ): Promise<FastExecuteResponse>;
}

/* eslint-disable no-nested-ternary */
// import { LibraryError } from '../provider';
import {
  GetTransactionReceiptResponseWoHelper,
  RejectedTransactionReceiptResponse,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
  TransactionExecutionStatus,
  TransactionReceiptCallbacks,
  TransactionReceiptCallbacksDefault,
  TransactionReceiptStatus,
  TransactionReceiptUtilityInterface,
  TransactionReceiptValue,
} from '../types';

/**
 * Utility that analyses transaction receipt response and provides helpers to process it
 * @example
 * ```typescript
 * const responseTx = new TransactionReceiptUtility(receipt);
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   rejected: (txR: RejectedTransactionReceiptResponse) => { },
 *   reverted: (txR: RevertedTransactionReceiptResponse) => { },
 *   error: (err: Error) => { },
 * });
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   _: () => { },
 * }
 * ```
 */
export class GetTransactionReceiptResponse implements TransactionReceiptUtilityInterface {
  public readonly statusReceipt: TransactionReceiptStatus;

  public readonly value: TransactionReceiptValue;

  constructor(receipt: GetTransactionReceiptResponseWoHelper) {
    [this.statusReceipt, this.value] = GetTransactionReceiptResponse.isSuccess(receipt)
      ? ['success', receipt]
      : GetTransactionReceiptResponse.isReverted(receipt)
      ? ['reverted', receipt]
      : GetTransactionReceiptResponse.isRejected(receipt)
      ? ['rejected', receipt]
      : ['error', new Error('Unknown response type')];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(receipt)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        writable: false,
        value,
      });
    }
  }

  match(callbacks: TransactionReceiptCallbacks) {
    if (this.statusReceipt in callbacks) {
      return callbacks[this.statusReceipt]!(this.value as any);
    }
    return (callbacks as TransactionReceiptCallbacksDefault)._();
  }

  isSuccess() {
    return this.statusReceipt === 'success';
  }

  isReverted() {
    return this.statusReceipt === 'reverted';
  }

  isRejected() {
    return this.statusReceipt === 'rejected';
  }

  isError() {
    return this.statusReceipt === 'error';
  }

  static isSuccess(
    transactionReceipt: GetTransactionReceiptResponseWoHelper
  ): transactionReceipt is SuccessfulTransactionReceiptResponse {
    return (
      (transactionReceipt as SuccessfulTransactionReceiptResponse).execution_status ===
      TransactionExecutionStatus.SUCCEEDED
    );
  }

  static isReverted(
    transactionReceipt: GetTransactionReceiptResponseWoHelper
  ): transactionReceipt is RevertedTransactionReceiptResponse {
    return (
      (transactionReceipt as RevertedTransactionReceiptResponse).execution_status ===
      TransactionExecutionStatus.REVERTED
    );
  }

  static isRejected(
    transactionReceipt: GetTransactionReceiptResponseWoHelper
  ): transactionReceipt is RejectedTransactionReceiptResponse {
    return (
      (transactionReceipt as RejectedTransactionReceiptResponse).status ===
      TransactionExecutionStatus.REJECTED
    );
  }
}

/**
 * Analyses a transaction receipt response and provides helpers to process it
 * @example
 * ```typescript
 * const responseTx = evaluateTransactionReceipt(receipt);
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   rejected: (txR: RejectedTransactionReceiptResponse) => { },
 *   reverted: (txR: RevertedTransactionReceiptResponse) => { },
 *   error: (err: Error) => { },
 * });
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   _: () => { },
 * }
 * ```
 */
export function evaluateTransactionReceipt(
  transactionResponse: GetTransactionReceiptResponseWoHelper
): GetTransactionReceiptResponse {
  return new GetTransactionReceiptResponse(transactionResponse);
}

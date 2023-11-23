/* eslint-disable no-nested-ternary */
import { LibraryError } from '../provider';
import {
  GetTransactionReceiptResponse,
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
export class TransactionReceiptUtility implements TransactionReceiptUtilityInterface {
  public readonly status: TransactionReceiptStatus;

  public readonly value: TransactionReceiptValue;

  get isSuccess() {
    return this.status === 'success';
  }

  get isReverted() {
    return this.status === 'reverted';
  }

  get isRejected() {
    return this.status === 'rejected';
  }

  get isError() {
    return this.status === 'error';
  }

  constructor(receipt: GetTransactionReceiptResponse) {
    [this.status, this.value] = TransactionReceiptUtility.isSuccess(receipt)
      ? ['success', receipt]
      : TransactionReceiptUtility.isReverted(receipt)
      ? ['reverted', receipt]
      : TransactionReceiptUtility.isRejected(receipt)
      ? ['rejected', receipt]
      : ['error', new LibraryError('Unknown response type')];
  }

  match(callbacks: TransactionReceiptCallbacks) {
    if (this.status in callbacks) {
      return callbacks[this.status]!(this.value as any);
    }
    return (callbacks as TransactionReceiptCallbacksDefault)._();
  }

  static isSuccess(
    transactionReceipt: GetTransactionReceiptResponse
  ): transactionReceipt is SuccessfulTransactionReceiptResponse {
    return (
      (transactionReceipt as SuccessfulTransactionReceiptResponse).execution_status ===
      TransactionExecutionStatus.SUCCEEDED
    );
  }

  static isReverted(
    transactionReceipt: GetTransactionReceiptResponse
  ): transactionReceipt is RevertedTransactionReceiptResponse {
    return (
      (transactionReceipt as RevertedTransactionReceiptResponse).execution_status ===
      TransactionExecutionStatus.REVERTED
    );
  }

  static isRejected(
    transactionReceipt: GetTransactionReceiptResponse
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
  transactionResponse: GetTransactionReceiptResponse
): TransactionReceiptUtility {
  return new TransactionReceiptUtility(transactionResponse);
}

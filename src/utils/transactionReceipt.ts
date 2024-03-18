/* eslint-disable no-nested-ternary */
import {
  GetTransactionReceiptResponseWoHelper,
  RejectedTransactionReceiptResponse,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
  TransactionExecutionStatus,
} from '../types';
import type {
  TransactionReceiptCallbacks,
  TransactionReceiptCallbacksDefault,
  TransactionReceiptStatus,
  TransactionReceiptUtilityInterface,
  TransactionReceiptValue,
} from '../types/transactionReceipt';

/**
 * Utility that analyses transaction receipt response and provides helpers to process it
 * @example
 * ```typescript
 * const responseTx = new ReceiptTx(receipt);
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
export class ReceiptTx implements TransactionReceiptUtilityInterface {
  public readonly statusReceipt: TransactionReceiptStatus;

  public readonly value: TransactionReceiptValue;

  constructor(receipt: GetTransactionReceiptResponseWoHelper) {
    [this.statusReceipt, this.value] = ReceiptTx.isSuccess(receipt)
      ? ['success', receipt]
      : ReceiptTx.isReverted(receipt)
        ? ['reverted', receipt]
        : ReceiptTx.isRejected(receipt)
          ? ['rejected', receipt]
          : ['error', new Error('Unknown response type')];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key] of Object.entries(this)) {
      Object.defineProperty(this, key, {
        enumerable: false,
      });
    }
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

export type GetTransactionReceiptResponse = GetTransactionReceiptResponseWoHelper & ReceiptTx;

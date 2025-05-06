/* eslint-disable no-nested-ternary */
import {
  GetTxReceiptResponseWithoutHelper,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
  TransactionExecutionStatus,
} from '../../types';
import type {
  TransactionReceiptCallbacks,
  TransactionReceiptCallbacksDefault,
  TransactionReceiptStatus,
  GetTransactionReceiptResponse,
  TransactionReceiptValue,
} from './transactionReceipt.type';

/**
 * Utility that analyses transaction receipt response and provides helpers to process it
 * @example
 * ```typescript
 * const responseTx = new ReceiptTx(receipt);
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   reverted: (txR: RevertedTransactionReceiptResponse) => { },
 *   error: (err: Error) => { },
 * });
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   _: () => { },
 * }
 * ```
 */
export class ReceiptTx implements GetTransactionReceiptResponse {
  public readonly statusReceipt: TransactionReceiptStatus;

  public readonly value: TransactionReceiptValue;

  constructor(receipt: GetTxReceiptResponseWithoutHelper) {
    [this.statusReceipt, this.value] = ReceiptTx.isSuccess(receipt)
      ? ['success', receipt]
      : ReceiptTx.isReverted(receipt)
        ? ['reverted', receipt]
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

  isSuccess(): this is SuccessfulTransactionReceiptResponse {
    return this.statusReceipt === 'success';
  }

  isReverted(): this is RevertedTransactionReceiptResponse {
    return this.statusReceipt === 'reverted';
  }

  // TODO: Missing is Pending or Production block

  // Status do not exist on receipts
  /*   isRejected(): this is RejectedTransactionReceiptResponse {
    return this.statusReceipt === 'rejected';
  } */

  isError() {
    return this.statusReceipt === 'error';
  }

  static isSuccess(
    transactionReceipt: GetTxReceiptResponseWithoutHelper
  ): transactionReceipt is SuccessfulTransactionReceiptResponse {
    return transactionReceipt.execution_status === TransactionExecutionStatus.SUCCEEDED;
  }

  static isReverted(
    transactionReceipt: GetTxReceiptResponseWithoutHelper
  ): transactionReceipt is RevertedTransactionReceiptResponse {
    return transactionReceipt.execution_status === TransactionExecutionStatus.REVERTED;
  }

  // Status do not exist on receipts
  /*   static isRejected(
    transactionReceipt: GetTxReceiptResponseWithoutHelper
  ): transactionReceipt is RejectedTransactionReceiptResponse {
    return (
      (transactionReceipt as RejectedTransactionReceiptResponse).status ===
      TransactionExecutionStatus.REJECTED
    );
  } */
}

// export type GetTransactionReceiptResponse = GetTxReceiptResponseWithoutHelper & ReceiptTx;

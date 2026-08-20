import {
  GetTxReceiptResponseWithoutHelper,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
  TransactionExecutionStatus,
} from '../../types';
import type {
  GetTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponseHelper,
  RevertedTransactionReceiptResponseHelper,
  ErrorReceiptResponseHelper,
  TransactionReceiptCallbacks,
  TransactionReceiptCallbacksDefault,
} from './transactionReceipt.type';

/**
 * !! Main design decision:
 * Class can't extend GetTransactionReceiptResponse because it is union type
 * and it is not possible to extend union type in current typescript version
 * So we have to use factory function to create 'data' return type
 *
 * ERROR case left but in library flow it is not possible as fetch would throw on error before it could be read by Helper
 */

// Receipt configuration mapping - data-driven approach
const RECEIPT_CONFIG = {
  [TransactionExecutionStatus.SUCCEEDED]: {
    statusReceipt: 'SUCCEEDED' as const,
    getBaseData: (receipt: GetTxReceiptResponseWithoutHelper) => receipt,
    getValue: (receipt: GetTxReceiptResponseWithoutHelper) =>
      receipt as SuccessfulTransactionReceiptResponse,
  },
  [TransactionExecutionStatus.REVERTED]: {
    statusReceipt: 'REVERTED' as const,
    getBaseData: (receipt: GetTxReceiptResponseWithoutHelper) => receipt,
    getValue: (receipt: GetTxReceiptResponseWithoutHelper) =>
      receipt as RevertedTransactionReceiptResponse,
  },
} as const;

/**
 * Creates a transaction receipt response object with helpers
 * @param receipt - The transaction receipt response from the provider
 * @returns A transaction receipt response object with helpers
 */
export function createTransactionReceipt(
  receipt: GetTxReceiptResponseWithoutHelper
): GetTransactionReceiptResponse {
  const config = RECEIPT_CONFIG[receipt.execution_status];

  let obj: any;

  if (config) {
    const { statusReceipt, getBaseData, getValue } = config;
    const value = getValue(receipt);

    obj = {
      ...getBaseData(receipt),
      statusReceipt,
      value,
      match(callbacks: TransactionReceiptCallbacks) {
        return statusReceipt in callbacks
          ? (callbacks as any)[statusReceipt]!(value)
          : (callbacks as TransactionReceiptCallbacksDefault)._();
      },
      // @ts-ignore - docs
      isSuccess(): this is SuccessfulTransactionReceiptResponseHelper {
        return statusReceipt === 'SUCCEEDED';
      },
      // @ts-ignore - docs
      isReverted(): this is RevertedTransactionReceiptResponseHelper {
        return statusReceipt === 'REVERTED';
      },
      // @ts-ignore - docs
      isError(): this is ErrorReceiptResponseHelper {
        return false;
      },
    };
  } else {
    // Error case
    const errorValue = new Error('Unknown response type');
    obj = {
      statusReceipt: 'ERROR' as const,
      value: errorValue,
      match(callbacks: TransactionReceiptCallbacks) {
        return 'ERROR' in callbacks
          ? callbacks.ERROR!(errorValue)
          : (callbacks as TransactionReceiptCallbacksDefault)._();
      },
      // @ts-ignore - docs
      isSuccess(): this is SuccessfulTransactionReceiptResponseHelper {
        return false;
      },
      // @ts-ignore - docs
      isReverted(): this is RevertedTransactionReceiptResponseHelper {
        return false;
      },
      // @ts-ignore - docs
      isError(): this is ErrorReceiptResponseHelper {
        return true;
      },
    };
  }

  return obj as GetTransactionReceiptResponse;
}

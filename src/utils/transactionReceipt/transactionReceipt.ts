/* eslint-disable no-nested-ternary */
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
  TransactionReceiptStatus,
  TransactionReceiptValue,
} from './transactionReceipt.type';

/**
 * !! Main design decision:
 * Class can't extend GetTransactionReceiptResponse because it is union type
 * and it is not possible to extend union type in current typescript version
 * So we have to use factory function to create 'data' return type and inject constructor
 *
 * ERROR case left but in library flow it is not possible as fetch would throw on error before it could be read by Helper
 */

/**
 * @deprecated Use `createTransactionReceipt` instead
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
// Legacy class for backward compatibility (defined first for prototype hack)
export class ReceiptTx {
  public readonly statusReceipt!: TransactionReceiptStatus;

  public readonly value!: TransactionReceiptValue;

  constructor(receipt: GetTxReceiptResponseWithoutHelper) {
    // Copy all receipt properties to this instance
    Object.assign(this, receipt);

    // Determine status and value
    const [statusReceipt, value] = ReceiptTx.isSuccess(receipt)
      ? ['SUCCEEDED', receipt]
      : ReceiptTx.isReverted(receipt)
        ? ['REVERTED', receipt]
        : ['ERROR', new Error('Unknown response type')];

    // Define statusReceipt and value as non-enumerable properties
    Object.defineProperties(this, {
      statusReceipt: {
        value: statusReceipt,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      value: {
        value,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      match: {
        value(callbacks: TransactionReceiptCallbacks) {
          return statusReceipt in callbacks
            ? (callbacks as any)[statusReceipt]!(value)
            : (callbacks as TransactionReceiptCallbacksDefault)._();
        },
        writable: false,
        enumerable: false,
        configurable: false,
      },
      isSuccess: {
        value: () => statusReceipt === 'SUCCEEDED',
        writable: false,
        enumerable: false,
        configurable: false,
      },
      isReverted: {
        value: () => statusReceipt === 'REVERTED',
        writable: false,
        enumerable: false,
        configurable: false,
      },
      isError: {
        value: () => statusReceipt === 'ERROR',
        writable: false,
        enumerable: false,
        configurable: false,
      },
    });
  }

  match!: (callbacks: TransactionReceiptCallbacks) => void;

  isSuccess!: () => this is SuccessfulTransactionReceiptResponseHelper;

  isReverted!: () => this is RevertedTransactionReceiptResponseHelper;

  isError!: () => this is ErrorReceiptResponseHelper;

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
}

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
      isSuccess(): this is SuccessfulTransactionReceiptResponseHelper {
        return statusReceipt === 'SUCCEEDED';
      },
      isReverted(): this is RevertedTransactionReceiptResponseHelper {
        return statusReceipt === 'REVERTED';
      },
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
      isSuccess(): this is SuccessfulTransactionReceiptResponseHelper {
        return false;
      },
      isReverted(): this is RevertedTransactionReceiptResponseHelper {
        return false;
      },
      isError(): this is ErrorReceiptResponseHelper {
        return true;
      },
    };
  }

  // 🔥 HACK: Make it look like ReceiptTx instance for instanceof checks
  Object.setPrototypeOf(obj, ReceiptTx.prototype);
  Object.defineProperty(obj, 'constructor', {
    value: ReceiptTx,
    writable: false,
    enumerable: false,
    configurable: false,
  });

  return obj as GetTransactionReceiptResponse;
}

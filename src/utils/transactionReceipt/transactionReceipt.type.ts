import {
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
} from '../../provider/types/index.type';

// Keep these for backward compatibility
export type TransactionStatusReceiptSets = {
  SUCCEEDED: SuccessfulTransactionReceiptResponse;
  REVERTED: RevertedTransactionReceiptResponse;
  ERROR: Error;
};
export type TransactionReceiptStatus = keyof TransactionStatusReceiptSets;

export type TransactionReceiptValue = TransactionStatusReceiptSets[TransactionReceiptStatus];

export type TransactionReceiptCallbacksDefined = {
  [key in TransactionReceiptStatus]: (response: TransactionStatusReceiptSets[key]) => void;
};

export type TransactionReceiptCallbacksDefault = Partial<TransactionReceiptCallbacksDefined> & {
  _: () => void;
};

export type TransactionReceiptCallbacks =
  | TransactionReceiptCallbacksDefined
  | TransactionReceiptCallbacksDefault;

// Transaction receipt types with helpers - clean, consolidated definitions
export type SuccessfulTransactionReceiptResponseHelper = SuccessfulTransactionReceiptResponse & {
  readonly statusReceipt: 'SUCCEEDED';
  readonly value: SuccessfulTransactionReceiptResponse;
  match(callbacks: TransactionReceiptCallbacks): void;
  isSuccess(): this is SuccessfulTransactionReceiptResponseHelper;
  isReverted(): this is RevertedTransactionReceiptResponseHelper;
  isError(): this is ErrorReceiptResponseHelper;
};

export type RevertedTransactionReceiptResponseHelper = RevertedTransactionReceiptResponse & {
  readonly statusReceipt: 'REVERTED';
  readonly value: RevertedTransactionReceiptResponse;
  match(callbacks: TransactionReceiptCallbacks): void;
  isSuccess(): this is SuccessfulTransactionReceiptResponseHelper;
  isReverted(): this is RevertedTransactionReceiptResponseHelper;
  isError(): this is ErrorReceiptResponseHelper;
};

export type ErrorReceiptResponseHelper = {
  readonly statusReceipt: 'ERROR';
  readonly value: Error;
  match(callbacks: TransactionReceiptCallbacks): void;
  isSuccess(): this is SuccessfulTransactionReceiptResponseHelper;
  isReverted(): this is RevertedTransactionReceiptResponseHelper;
  isError(): this is ErrorReceiptResponseHelper;
};

export type GetTransactionReceiptResponse =
  | SuccessfulTransactionReceiptResponseHelper
  | RevertedTransactionReceiptResponseHelper
  | ErrorReceiptResponseHelper;

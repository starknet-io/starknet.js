import {
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
} from '../../provider/types/index.type';

export type TransactionStatusReceiptSets = {
  success: SuccessfulTransactionReceiptResponse;
  reverted: RevertedTransactionReceiptResponse;
  // rejected: RejectedTransactionReceiptResponse;
  error: Error;
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

export type GetTransactionReceiptResponse = {
  readonly statusReceipt: TransactionReceiptStatus;
  readonly value: TransactionReceiptValue;
  match(callbacks: TransactionReceiptCallbacks): void;
} & {
  [key in `is${Capitalize<TransactionReceiptStatus>}`]: () => boolean;
};

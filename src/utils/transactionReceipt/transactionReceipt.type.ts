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

type TransactionReceiptStatusFromMethod<T extends `is${Capitalize<TransactionReceiptStatus>}`> =
  T extends `is${infer R}` ? Uncapitalize<R> : never;

export type GetTransactionReceiptResponse<
  T extends TransactionReceiptStatus = TransactionReceiptStatus,
> = {
  readonly statusReceipt: T;
  readonly value: TransactionStatusReceiptSets[T];
  match(callbacks: TransactionReceiptCallbacks): void;
} & {
  // @ts-ignore - seems to be needed only for docs, check again after the doc dependencies are updated
  [key in `is${Capitalize<TransactionReceiptStatus>}`]: () => this is GetTransactionReceiptResponse<
    TransactionReceiptStatusFromMethod<key>
  >;
};

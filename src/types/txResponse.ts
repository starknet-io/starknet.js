import {
  RejectedTransactionReceiptResponse,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
} from './provider';

export interface TransactionResponse {
  Success: SuccessfulTransactionReceiptResponse;
  Rejected: RejectedTransactionReceiptResponse;
  Reverted: RevertedTransactionReceiptResponse;
  Error: Error;
}
export type TxVariants = keyof TransactionResponse;

type Rec = Record<string, any>;
type MatchAuthorizedFns<U extends Rec> = {
  [V in TxVariants]: (f: U[V]) => any;
};
type MatchAuthorizedFnsDefault = Partial<MatchAuthorizedFns<TransactionResponse>> & {
  _: () => any;
};

export type TransactionResponseVariant = {
  readonly status: TxVariants;
  readonly content: TransactionResponse[TxVariants];
  match(handlerFns: MatchAuthorizedFns<TransactionResponse> | MatchAuthorizedFnsDefault): any;
  isSuccess: () => boolean;
  isRejected: () => boolean;
  isReverted: () => boolean;
  isError: () => boolean;
};

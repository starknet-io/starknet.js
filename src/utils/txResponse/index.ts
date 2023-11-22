import { TransactionExecutionStatus, TransactionStatus } from '../../types/lib';
import {
  GetTransactionReceiptResponse,
  RejectedTransactionReceiptResponse,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
} from '../../types/provider';
import {
  TransactionResponse,
  TransactionResponseVariant,
  TxVariants,
} from '../../types/txResponse';
import { TxResponseVariant } from './txResponseVariant';

type TxRFactory = {
  [V in TxVariants]: (data: TransactionResponse[V]) => TransactionResponseVariant;
};

function create(...args: any[]) {
  return new TxResponseVariant(...args);
}

const factoryProxy = new Proxy(
  {},
  {
    get(target, prop, _receiver) {
      return (...args: any[]) => create(prop, ...args);
    },
  }
);

function responseTxFactory(): TxRFactory {
  return factoryProxy as TxRFactory;
}

/**
 * analyse a transaction response and provides helpers to process it.
 * @param txR transaction receipt (from waitForTransaction or getTransactionReceipt)
 * @returns a Rust like Enum
 * @example
 * ```typescript
 * const responseTx = transactionResponse(await account.waitForTransaction(declareAccount.transaction_hash));
  * responseTx.match({
  *     Success: (txR: SuccessfulTransactionReceiptResponse) => { console.log("success =", txR) },
  *     Rejected: (txR: RejectedTransactionReceiptResponse) => { console.log("rejected =", txR) },
  *     Reverted: (txR: RevertedTransactionReceiptResponse) => { console.log("reverted =", txR) },
  *     Error: (err: Error) => { console.log("Error =", Error.message) },
  });
  * // or 
  * responseTx.match({
  *     Success: (txR: SuccessfulTransactionReceiptResponse) => { console.log("success =", txR) },
  *     _: () => { console.log("Unsuccess") },
  *      },
  * console.log("status = ", responseTx.status); // string
  * console.log("Is a success = ", responseTx.isSuccess); //boolean
  * console.log("Is rejected = ", responseTx.isRejected);
  * console.log("Is reverted = ", responseTx.isReverted);
  * console.log("response content =",responseTx.content);
  * ```
  */
export function transactionResponse(
  txR: GetTransactionReceiptResponse
): TransactionResponseVariant {
  const txResponse: TxRFactory = responseTxFactory();
  switch (true) {
    case 'execution_status' in txR &&
      txR.execution_status === TransactionExecutionStatus.SUCCEEDED: {
      return txResponse.Success(txR as SuccessfulTransactionReceiptResponse);
    }
    case 'status' in txR && txR.status === TransactionStatus.REJECTED: {
      return txResponse.Rejected(txR as RejectedTransactionReceiptResponse);
    }
    case 'execution_status' in txR &&
      txR.execution_status === TransactionExecutionStatus.REVERTED: {
      return txResponse.Reverted(txR as RevertedTransactionReceiptResponse);
    }
    default: {
      return txResponse.Error(new Error('Unknown response type.'));
    }
  }
}

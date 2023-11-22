import { TxVariants } from '../../types/txResponse';

/**
 * class to define a variant related to a transaction response.
 * @param arg[0] : name of the variant ("Success" | "Rejected" | "Reverted" |"Error")
 * @param arg[1] : value related to this variant
 * @returns a Rust like Enum
 * @example
 * ```typescript
 * const txR:SuccessfulTransactionReceiptResponse = {...}
 * const response = new TxResponseVariant("Success", txR);
 * ```
 */
export class TxResponseVariant {
  public status: TxVariants;

  public content: any;

  private readonly isSuccessValue: boolean;

  private readonly isRejectedValue: boolean;

  private readonly isRevertedValue: boolean;

  private readonly isErrorValue: boolean;

  constructor(...args: any[]) {
    [this.status] = args;
    this.content = args.length > 2 ? args.slice(1) : args[1];
    this.isSuccessValue = this.status === 'Success';
    this.isRejectedValue = this.status === 'Rejected';
    this.isRevertedValue = this.status === 'Reverted';
    this.isErrorValue = this.status === 'Error';
  }

  match(
    this: TxResponseVariant,
    handlerFns: Record<TxVariants | '_', CallableFunction | undefined>
  ): any {
    if (typeof handlerFns[this.status] !== 'undefined') {
      return handlerFns[this.status]!(this.content);
    }
    return handlerFns._!();
  }

  get isSuccess() {
    return () => this.isSuccessValue;
  }

  get isRejected() {
    return () => this.isRejectedValue;
  }

  get isReverted() {
    return () => this.isRevertedValue;
  }

  get isError() {
    return () => this.isErrorValue;
  }
}

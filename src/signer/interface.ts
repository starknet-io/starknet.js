import { Provider } from '../provider';
import { AddTransactionResponse, Transaction } from '../types';

export abstract class SignerInterface extends Provider {
  public abstract address: string;
  /**
   * Invoke a function on the starknet contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param transaction - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public abstract override addTransaction(
    transaction: Transaction
  ): Promise<AddTransactionResponse>;
}

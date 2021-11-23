import { Provider } from '../provider';
import { AddTransactionResponse, Signature, Transaction } from '../types';

export abstract class SignerInterface extends Provider {
  public abstract address: string;
  /**
   * Invoke a function on the starknet contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param tx - transaction to be invoked
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public abstract override addTransaction(tx: Transaction): Promise<AddTransactionResponse>;

  /**
   * Sign a message hash.
   *
   * @param msghash - Message hash to be signed.
   * @returns {r,s} of the signed message
   */
  public abstract sign(msghash: string): Signature;
}

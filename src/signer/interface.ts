import { Provider } from '../provider';
import { AddTransactionResponse, Signature, Transaction } from '../types';
import { TypedData } from '../utils/typedData/types';

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

  /**
   * Sign an JSON object with the starknet private key and return the signature
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public abstract signMessage(typedData: TypedData): Promise<Signature>;

  /**
   * Hash a JSON object with pederson hash and return the hash
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public abstract hashMessage(typedData: TypedData): Promise<string>;
}

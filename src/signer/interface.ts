import { Abi, Invocation, InvocationsSignerDetails, Signature } from '../types';
import { TypedData } from '../utils/typedData';

export abstract class SignerInterface {
  /**
   * Method to get the public key of the signer
   *
   * @returns public key of signer as hex string with 0x prefix
   */
  public abstract getPubKey(): Promise<string>;

  /**
   * Sign an JSON object for off-chain usage with the starknet private key and return the signature
   * This adds a message prefix so it cant be interchanged with transactions
   *
   * @param typedData - JSON object to be signed
   * @param accountAddress - account
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public abstract signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;

  /**
   * Signs a transaction with the starknet private key and returns the signature
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   * @param abi (optional) the abi of the contract for better displaying
   *
   * @returns signature
   */
  public abstract signTransaction(
    transactions: Invocation[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
  ): Promise<Signature>;
}

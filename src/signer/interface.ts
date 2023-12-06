import {
  Abi,
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
} from '../types';

export abstract class SignerInterface {
  /**
   * Method to get the public key of the signer
   *
   * @returns format: hex-string
   */
  public abstract getPubKey(): Promise<string>;

  /**
   * Signs a JSON object for off-chain usage with the Starknet private key and returns the signature
   * This adds a message prefix so it can't be interchanged with transactions
   *
   * @param typedData - JSON object to be signed
   * @param accountAddress
   */
  public abstract signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;

  /**
   * Signs transactions with the Starknet private key and returns the signature
   *
   * @param transactions - Array of Call objects, each including:<br/>
   *  - contractAddress<br/>
   *  - entrypoint<br/>
   *  - calldata<br/>
   * @param transactionsDetail - InvocationsSignerDetails object with:<br/>
   *  - walletAddress<br/>
   *  - chainId<br/>
   *  - cairoVersion<br/>
   *  - maxFee<br/>
   *  - version<br/>
   *  - nonce<br/>
   * @param abis - (optional) An array of Abi objects for displaying decoded data
   */
  public abstract signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
  ): Promise<Signature>;

  /**
   * Signs a DEPLOY_ACCOUNT transaction with the Starknet private key and returns the signature
   *
   * @param transaction<br/>
   * - contractAddress<br/>
   * - chainId<br/>
   * - classHash<br/>
   * - constructorCalldata<br/>
   * - addressSalt<br/>
   * - maxFee<br/>
   * - version<br/>
   * - nonce<br/>
   */
  public abstract signDeployAccountTransaction(
    transaction: DeployAccountSignerDetails
  ): Promise<Signature>;

  /**
   * Signs a DECLARE transaction with the Starknet private key and returns the signature
   *
   * @param transaction<br/>
   * - classHash<br/>
   * - compiledClassHash? - used for Cairo1<br/>
   * - senderAddress<br/>
   * - chainId<br/>
   * - maxFee<br/>
   * - version<br/>
   * - nonce<br/>
   */
  public abstract signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}

import {
  Abi,
  AbstractionFunctions,
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
} from '../types';

export abstract class SignerInterface {
  public abstract abstractionFunctions: AbstractionFunctions | undefined;

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
   * @param adds an array of string, used as additional parameters for account abstraction, for message hash and signature.
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public abstract signMessage(
    typedData: TypedData,
    accountAddress: string,
    ...adds: string[]
  ): Promise<Signature>;

  /**
   * Signs a transaction with the starknet private key and returns the signature
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * @param abi (optional) the abi of the contract for better displaying
   * @param adds an array of string, used as additional parameters for account abstraction, for message hash and signature.
   *
   * @returns signature
   */
  public abstract signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[],
    ...adds: string[]
  ): Promise<Signature>;

  /**
   * Signs a DEPLOY_ACCOUNT transaction with the starknet private key and returns the signature
   *
   * @param transaction
   * - contractAddress - the computed address of the contract
   * - constructorCalldata - calldata to be passed in deploy constructor
   * - addressSalt - contract address salt
   * - chainId - the chainId to declare contract on
   * - maxFee - maxFee for the declare transaction
   * - version - transaction version
   * - nonce - Nonce of the declare transaction
   * @param adds an array of string, used as additional parameters for account abstraction, for message hash and signature.
   * @returns signature
   */
  public abstract signDeployAccountTransaction(
    transaction: DeployAccountSignerDetails,
    ...adds: string[]
  ): Promise<Signature>;

  /**
   * Signs a DECLARE transaction with the starknet private key and returns the signature
   *
   * @param transaction
   * - classHash - computed class hash. Will be replaced by ContractClass in future once class hash is present in CompiledContract
   * - senderAddress - the address of the sender
   * - chainId - the chainId to declare contract on
   * - maxFee - maxFee for the declare transaction
   * - version - transaction version
   * - nonce - Nonce of the declare transaction
   * @param adds an array of string, used as additional parameters for account abstraction, for message hash and signature.
   * @returns signature
   */
  public abstract signDeclareTransaction(
    transaction: DeclareSignerDetails,
    ...adds: string[]
  ): Promise<Signature>;
}

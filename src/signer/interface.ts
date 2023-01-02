import { Abi, Call, DeclareSignerDetails, InvocationsSignerDetails, Signature } from '../types';
import { DeployAccountSignerDetails } from '../types/signer';
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
   * @param abi (optional) the abi of the contract for better displaying
   *
   * @returns signature
   */
  public abstract signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails,
    abis?: Abi[]
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
   * @returns signature
   */
  public abstract signDeployAccountTransaction(
    transaction: DeployAccountSignerDetails
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
   * @returns signature
   */
  public abstract signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}

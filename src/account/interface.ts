import { ProviderInterface } from '../provider';
import { BlockIdentifier } from '../provider/utils';
import { SignerInterface } from '../signer';
import {
  Abi,
  Call,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeAction,
  EstimateFeeDetails,
  EstimateFeeResponse,
  InvocationsDetails,
  InvokeFunctionResponse,
  Signature,
} from '../types';
import {
  AllowArray,
  DeclareContractPayload,
  DeployAccountContractPayload,
  UniversalDeployerContractPayload,
} from '../types/lib';
import { BigNumberish } from '../utils/number';
import { TypedData } from '../utils/typedData/types';

export abstract class AccountInterface extends ProviderInterface {
  public abstract address: string;

  public abstract signer: SignerInterface;

  /**
   * @deprecated Use estimateInvokeFee or estimateDeclareFee instead
   * Estimate Fee for executing an INVOKE transaction on starknet
   *
   * @param calls the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   *
   * @returns response from estimate_fee
   */
  public abstract estimateFee(
    calls: AllowArray<Call>,
    estimateFeeDetails?: EstimateFeeDetails
  ): Promise<EstimateFeeResponse>;

  /**
   * Estimate Fee for executing an INVOKE transaction on starknet
   *
   * @param calls the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   *
   * @returns response from estimate_fee
   */
  public abstract estimateInvokeFee(
    calls: AllowArray<Call>,
    estimateFeeDetails?: EstimateFeeDetails
  ): Promise<EstimateFeeResponse>;

  /**
   * Estimate Fee for executing a DECLARE transaction on starknet
   *
   * @param contractPayload the payload object containing:
   * - contract - the compiled contract to be declared
   * - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli.
   *
   * @returns response from estimate_fee
   */
  public abstract estimateDeclareFee(
    contractPayload: DeclareContractPayload,
    estimateFeeDetails?: EstimateFeeDetails
  ): Promise<EstimateFeeResponse>;

  /**
   * Estimate Fee for executing a DEPLOY_ACCOUNT transaction on starknet
   *
   * @param contractPayload the payload object containing:
   * - contract - the compiled contract to be deployed
   * - classHash - the class hash of the compiled contract. This can be obtained by using starknet-cli.
   *
   * @returns response from estimate_fee
   */
  public abstract estimateAccountDeployFee(
    contractPayload: DeployAccountContractPayload,
    estimateFeeDetails?: EstimateFeeDetails
  ): Promise<EstimateFeeResponse>;

  /**
   * Invoke execute function in account contract
   *
   * @param transactions the invocation object or an array of them, containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   * @param abi (optional) the abi of the contract for better displaying
   *
   * @returns response from addTransaction
   */
  public abstract execute(
    transactions: AllowArray<Call>,
    abis?: Abi[],
    transactionsDetail?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;

  /**
   * Declares a given compiled contract (json) to starknet
   * 
   * @param contractPayload transaction payload to be deployed containing:
  - contract: compiled contract code
  - classHash: computed class hash of compiled contract
  - signature
   * @param transactionsDetail Invocation Details containing:
  - optional nonce
  - optional version
  - optional maxFee
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract declare(
    contractPayload: DeclareContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeclareContractResponse>;

  /**
   * @param deployContractPayload containing
   * - classHash: computed class hash of compiled contract
   * - salt: address salt
   * - unique: bool if true ensure unique salt
   * - calldata: constructor calldata
   * @param additionalCalls - optional additional calls array to support multicall
   * @param transactionsDetail Invocation Details containing:
   *  - optional nonce
   *  - optional version
   *  - optional maxFee
   */
  public abstract deploy(
    deployContractPayload: UniversalDeployerContractPayload,
    additionalCalls?: AllowArray<Call>,
    transactionsDetail?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;

  /**
   * Deploy the account on Starknet
   * 
   * @param contractPayload transaction payload to be deployed containing:
  - classHash: computed class hash of compiled contract
  - optional constructor calldata
  - optional address salt  
  - optional contractAddress
   * @param transactionsDetail Invocation Details containing:
  - optional nonce
  - optional version
  - optional maxFee
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract deployAccount(
    contractPayload: DeployAccountContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeployContractResponse>;

  /**
   * Sign an JSON object for off-chain usage with the starknet private key and return the signature
   * This adds a message prefix so it cant be interchanged with transactions
   *
   * @param json - JSON object to be signed
   * @returns the signature of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public abstract signMessage(typedData: TypedData): Promise<Signature>;

  /**
   * Hash a JSON object with pederson hash and return the hash
   * This adds a message prefix so it cant be interchanged with transactions
   *
   * @param json - JSON object to be hashed
   * @returns the hash of the JSON object
   * @throws {Error} if the JSON object is not a valid JSON
   */
  public abstract hashMessage(typedData: TypedData): Promise<string>;

  /**
   * Verify a signature of a JSON object
   *
   * @param typedData - JSON object to be verified
   * @param signature - signature of the JSON object
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the JSON object is not a valid JSON or the signature is not a valid signature
   */
  public abstract verifyMessage(typedData: TypedData, signature: Signature): Promise<boolean>;

  /**
   * Verify a signature of a given hash
   * @warning This method is not recommended, use verifyMessage instead
   *
   * @param hash - hash to be verified
   * @param signature - signature of the hash
   * @returns true if the signature is valid, false otherwise
   * @throws {Error} if the signature is not a valid signature
   */
  public abstract verifyMessageHash(hash: BigNumberish, signature: Signature): Promise<boolean>;

  /**
   * Gets the nonce of the account with respect to a specific block
   *
   * @param  {BlockIdentifier} blockIdentifier - optional blockIdentifier. Defaults to 'pending'
   * @returns nonce of the account
   */
  public abstract getNonce(blockIdentifier?: BlockIdentifier): Promise<BigNumberish>;

  /**
   * Gets Suggested Max Fee based on the transaction type
   *
   * @param  {EstimateFeeAction} estimateFeeAction
   * @param  {EstimateFeeDetails} details
   * @returns suggestedMaxFee
   */
  public abstract getSuggestedMaxFee(
    estimateFeeAction: EstimateFeeAction,
    details: EstimateFeeDetails
  ): Promise<BigNumberish>;
}

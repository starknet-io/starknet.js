import { ProviderInterface } from '../provider/interface';
import type { SignerInterface } from '../signer';
import type { DeployerInterface } from '../deployer/index';
import type {
  AllowArray,
  BigNumberish,
  BlockIdentifier,
  CairoVersion,
  Call,
  DeclareAndDeployContractPayload,
  DeclareContractPayload,
  DeclareContractResponse,
  DeployAccountContractPayload,
  DeployContractResponse,
  Invocations,
  InvocationsDetails,
  InvokeFunctionResponse,
  Nonce,
  Signature,
  TypedData,
  UniversalDeployerContractPayload,
} from '../types/index';
import type {
  DeclareDeployUDCResponse,
  MultiDeployContractResponse,
  PaymasterDetails,
  UniversalDetails,
} from './types/index.type';
import type {
  EstimateFeeResponseBulkOverhead,
  EstimateFeeResponseOverhead,
} from '../provider/types/index.type';
import type { PaymasterFeeEstimate, PreparedTransaction } from '../paymaster/types/index.type';
import type { DeployContractUDCResponse } from '../deployer/types/index.type';

/**
 * Interface for interacting with Starknet account contracts (e.g., wallet contracts).
 *
 * Extends ProviderInterface to provide account-specific functionality including:
 * - Transaction execution and signing
 * - Fee estimation (supporting v1, v2, v3 transactions)
 * - Contract deployment through UDC (Universal Deployer Contract)
 * - Paymaster support for sponsored transactions
 * - EIP-712 message signing
 *
 * @remarks
 * Implementations handle: Nonce management, transaction signing, and interaction 
 * with the account contract's __execute__ entrypoint.
 */
export abstract class AccountInterface extends ProviderInterface {
  /**
   * The address of the account contract on Starknet
   */
  public abstract address: string;

  /**
   * Signer instance for signing transactions and messages
   */
  public abstract signer: SignerInterface;

  /**
   * Cairo version of the account contract implementation (e.g., '1', '0')
   */
  public abstract cairoVersion: CairoVersion;

  /**
   * Optional deployer instance for custom contract deployment logic
   * @default Uses default UDC (Universal Deployer Contract) if not specified
   */
  public abstract deployer?: DeployerInterface;

  /**
   * Estimate fee for executing an INVOKE transaction on Starknet
   *
   * @param calls - Single call or array of calls to estimate fees for
   * @param estimateFeeDetails - Optional universal transaction details for fee estimation
   * @returns Fee estimation including overall_fee and resourceBounds
   * @inheritdoc estimateInvokeFee
   */
  public abstract estimateInvokeFee(
    calls: AllowArray<Call>,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fee for executing a DECLARE transaction on Starknet
   *
   * @param contractPayload - Contract declaration payload
   * @param estimateFeeDetails - Optional universal transaction details for fee estimation
   * @returns Fee estimation including overall_fee and resourceBounds
   * @inheritdoc estimateInvokeFee
   */
  public abstract estimateDeclareFee(
    contractPayload: DeclareContractPayload,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fee for executing a DEPLOY_ACCOUNT transaction on Starknet
   *
   * @param contractPayload - Account deployment payload
   * @param estimateFeeDetails - Optional universal transaction details for fee estimation
   * @returns Fee estimation including overall_fee and resourceBounds
   * @inheritdoc estimateInvokeFee
   */
  public abstract estimateAccountDeployFee(
    contractPayload: DeployAccountContractPayload,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fee for deploying contract(s) through the Universal Deployer Contract (UDC)
   *
   * @param deployContractPayload - Single or array of deployment payloads
   * @param estimateFeeDetails - Optional universal transaction details for fee estimation
   * @returns Fee estimation for the deployment transaction
   * @inheritdoc estimateInvokeFee
   */
  public abstract estimateDeployFee(
    deployContractPayload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fees for executing multiple transactions in a single request (bulk estimation)
   *
   * @param invocations - Array of transactions (DECLARE, DEPLOY, INVOKE, DEPLOY_ACCOUNT) to estimate
   * @param details - Optional universal transaction details for fee estimation
   * @returns Array of fee estimations for each transaction
   * @inheritdoc estimateInvokeFee
   */
  public abstract estimateFeeBulk(
    invocations: Invocations,
    details?: UniversalDetails
  ): Promise<EstimateFeeResponseBulkOverhead>;

  /**
   * Execute one or multiple calls through the account contract
   *
   * @param transactions - Single call or array of calls to execute
   * @param transactionsDetail - Optional details for transaction execution
   * @returns Transaction hash and response
   * @inheritdoc execute
   */
  public abstract execute(
    transactions: AllowArray<Call>,
    transactionsDetail?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;

  /**
   * Estimate fees for a paymaster-sponsored transaction
   *
   * @param calls - Array of calls to be sponsored
   * @param paymasterDetails - Paymaster configuration (e.g., fee mode, deployment data)
   * @returns Fee estimates in both STRK and gas token
   * @inheritdoc estimatePaymasterTransactionFee
   */
  public abstract estimatePaymasterTransactionFee(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate>;

  /**
   * Build a transaction for paymaster execution and signing
   *
   * @param calls - Array of calls to be sponsored
   * @param paymasterDetails - Paymaster configuration
   * @returns Prepared transaction with typed data for signing
   * @inheritdoc estimatePaymasterTransactionFee
   */
  public abstract buildPaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction>;

  /**
   * Execute a paymaster-sponsored transaction
   *
   * @param calls - Array of calls to execute
   * @param paymasterDetails - Paymaster configuration
   * @param maxFeeInGasToken - Maximum acceptable fee in gas token (optional)
   * @returns Transaction hash if successful
   * @inheritdoc executePaymasterTransaction
   */
  public abstract executePaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse>;

  /**
   * Declare a contract class on Starknet
   *
   * @param contractPayload - Contract declaration payload
   * @param transactionsDetail - Optional details for transaction execution
   * @returns Declaration transaction hash and class hash
   * @inheritdoc execute
   */
  public abstract declare(
    contractPayload: DeclareContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeclareContractResponse>;

  /**
   * Deploy contract(s) using the Universal Deployer Contract (UDC)
   *
   * @param payload - Single or multiple deployment configurations
   * @param details - Optional details for transaction execution
   * @returns Deployed contract addresses and transaction hash
   * @inheritdoc execute
   */
  public abstract deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails
  ): Promise<MultiDeployContractResponse>;

  /**
   * Deploy and wait for a contract deployment to complete
   *
   * @param payload - Deployment configuration(s)
   * @param details - Optional details for transaction execution
   * @returns Deployment result with contract address and UDC event details
   * @remarks This method waits for transaction confirmation before returning.
   * @inheritdoc execute
   */
  public abstract deployContract(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails
  ): Promise<DeployContractUDCResponse>;

  /**
   * Declare and deploy a contract in a single method
   *
   * @param payload - Combined declare and deploy configuration
   * @param details - Optional details for transaction execution
   * @returns Declaration and deployment results
   * @remarks Automatically skips declaration if contract is already declared, and waits for both transactions to complete.
   * @inheritdoc execute
   */
  public abstract declareAndDeploy(
    payload: DeclareAndDeployContractPayload,
    details?: InvocationsDetails
  ): Promise<DeclareDeployUDCResponse>;

  /**
   * Deploy the account contract itself on Starknet
   *
   * @param contractPayload - Account deployment configuration
   * @param transactionsDetail - Optional details for transaction execution
   * @returns Deployment transaction hash and contract address
   * @remarks Used for deploying the account contract when using a pre-funded address.
   * @inheritdoc execute
   */
  public abstract deployAccount(
    contractPayload: DeployAccountContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeployContractResponse>;

  /**
   * Sign a typed data message (EIP-712 style) for off-chain verification
   *
   * @param typedData - EIP-712 style typed data structure
   * @returns Signature array [r, s]
   * @remarks Compatible with Starknet's signature verification. Cannot be used to sign transactions.
   */
  public abstract signMessage(typedData: TypedData): Promise<Signature>;

  /**
   * Hash a typed data message using Pedersen hash
   *
   * @param typedData - EIP-712 style typed data structure
   * @returns Message hash as hex string
   * @remarks Uses Pedersen hash function (not Keccak). Result can be used for signature verification.
   */
  public abstract hashMessage(typedData: TypedData): Promise<string>;

  /**
   * Get the current nonce of the account
   *
   * @param blockIdentifier - Block to query nonce at (default: 'pending')
   * @returns Account nonce as hex string
   */
  public abstract getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce>;

  /**
   * Declare a contract class if it has not already been declared
   *
   * @param contractPayload - Contract declaration payload
   * @param transactionsDetail - Optional details for transaction execution
   * @returns Declaration result (with empty transaction_hash if already declared)
   * @inheritdoc execute
   */
  public abstract declareIfNot(
    contractPayload: DeclareContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeclareContractResponse>;
}

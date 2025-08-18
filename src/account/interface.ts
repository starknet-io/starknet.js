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
 * Interface for interacting with Starknet account contracts
 *
 * Extends ProviderInterface to provide account-specific functionality including:
 * - Transaction execution and signing
 * - Fee estimation for various transaction types
 * - Contract deployment through UDC (Universal Deployer Contract)
 * - Paymaster support for sponsored transactions
 * - EIP-712 message signing
 *
 * @remarks
 * Implementations of this interface typically handle the complexities of:
 * - Nonce management
 * - Transaction signing with the account's private key
 * - Interaction with the account contract's __execute__ entrypoint
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
   * Cairo version of the account contract implementation
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
   * @param calls.contractAddress - The address of the contract to invoke
   * @param calls.entrypoint - The function selector of the contract method
   * @param calls.calldata - The serialized function parameters (defaults to [])
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * @param estimateFeeDetails.blockIdentifier - Block to estimate against
   * @param estimateFeeDetails.nonce - Account nonce (defaults to current nonce)
   * @param estimateFeeDetails.skipValidate - Skip account validation (default: true)
   * @param estimateFeeDetails.tip - Priority fee tip in fri/wei for faster inclusion
   * @param estimateFeeDetails.accountDeploymentData - Include account deployment
   * @param estimateFeeDetails.paymasterData - Paymaster sponsorship data
   * @param estimateFeeDetails.nonceDataAvailabilityMode - DA mode for nonce
   * @param estimateFeeDetails.feeDataAvailabilityMode - DA mode for fee
   * @param estimateFeeDetails.version - Transaction version (v3 uses fri, v1/v2 use wei)
   * @param estimateFeeDetails.resourceBounds - Resource limits for v3 transactions
   *
   * @returns Fee estimation including overall_fee and resourceBounds
   * @example
   * ```typescript
   * const fee = await account.estimateInvokeFee({
   *   contractAddress: '0x123...',
   *   entrypoint: 'transfer',
   *   calldata: [recipient, amount]
   * });
   * ```
   */
  public abstract estimateInvokeFee(
    calls: AllowArray<Call>,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fee for executing a DECLARE transaction on Starknet
   *
   * @param contractPayload - Contract declaration payload
   * @param contractPayload.contract - Compiled contract (Sierra JSON)
   * @param contractPayload.casm - Compiled Cairo assembly (required for Cairo 1)
   * @param contractPayload.classHash - Pre-computed class hash (optional optimization)
   * @param contractPayload.compiledClassHash - Pre-computed CASM hash (alternative to casm)
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * @param estimateFeeDetails.blockIdentifier - Block to estimate against
   * @param estimateFeeDetails.nonce - Account nonce (defaults to current nonce)
   * @param estimateFeeDetails.skipValidate - Skip account validation (default: true)
   * @param estimateFeeDetails.tip - Priority fee tip for faster inclusion
   * @param estimateFeeDetails.version - Transaction version (v3 uses fri, v1/v2 use wei)
   *
   * @returns Fee estimation including overall_fee and resourceBounds
   * @example
   * ```typescript
   * const fee = await account.estimateDeclareFee({
   *   contract: compiledContract,
   *   casm: compiledCasm
   * });
   * ```
   */
  public abstract estimateDeclareFee(
    contractPayload: DeclareContractPayload,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fee for executing a DEPLOY_ACCOUNT transaction on Starknet
   *
   * @param contractPayload - Account deployment payload
   * @param contractPayload.classHash - Class hash of the account contract
   * @param contractPayload.constructorCalldata - Constructor parameters
   * @param contractPayload.contractAddress - Pre-computed account address
   * @param contractPayload.addressSalt - Salt for address generation
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * @inheritdoc estimateInvokeFee
   *
   * @returns Fee estimation including overall_fee and resourceBounds
   * @example
   * ```typescript
   * const fee = await account.estimateAccountDeployFee({
   *   classHash: accountClassHash,
   *   constructorCalldata: { publicKey },
   *   addressSalt: publicKey
   * });
   * ```
   */
  public abstract estimateAccountDeployFee(
    contractPayload: DeployAccountContractPayload,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fee for deploying contract(s) through the Universal Deployer Contract (UDC)
   *
   * @param deployContractPayload - Single or array of deployment payloads
   * @param deployContractPayload.classHash - Class hash of contract to deploy
   * @param deployContractPayload.salt - Deployment salt (optional)
   * @param deployContractPayload.unique - Ensure unique deployment address
   * @param deployContractPayload.constructorCalldata - Constructor parameters
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * @inheritdoc estimateInvokeFee
   *
   * @returns Fee estimation for the deployment transaction
   * @example
   * ```typescript
   * const fee = await account.estimateDeployFee({
   *   classHash: contractClassHash,
   *   constructorCalldata: [param1, param2],
   *   unique: true
   * });
   * ```
   */
  public abstract estimateDeployFee(
    deployContractPayload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;

  /**
   * Estimate fees for executing multiple transactions in a single request
   *
   * @param invocations - Array of transactions to estimate
   * @param invocations.type - Transaction type: DECLARE, DEPLOY, INVOKE, DEPLOY_ACCOUNT
   * @param invocations.payload - Transaction-specific payload
   *
   * @param details - Optional details for fee estimation
   * @inheritdoc estimateInvokeFee
   *
   * @returns Array of fee estimations for each transaction
   * @example
   * ```typescript
   * const fees = await account.estimateFeeBulk([
   *   { type: 'INVOKE', payload: { contractAddress, entrypoint, calldata } },
   *   { type: 'DECLARE', payload: { contract, casm } }
   * ]);
   * ```
   */
  public abstract estimateFeeBulk(
    invocations: Invocations,
    details?: UniversalDetails
  ): Promise<EstimateFeeResponseBulkOverhead>;

  /**
   * Execute one or multiple calls through the account contract
   *
   * @param transactions - Single call or array of calls to execute
   * @param transactions.contractAddress - Target contract address
   * @param transactions.entrypoint - Function to invoke on the contract
   * @param transactions.calldata - Function parameters
   *
   * @param transactionsDetail - Transaction execution options
   * @param transactionsDetail.nonce - Override account nonce
   * @param transactionsDetail.maxFee - Maximum fee for v1/v2 transactions
   * @param transactionsDetail.resourceBounds - Resource limits for v3 transactions
   * @param transactionsDetail.tip - Priority fee tip
   * @param transactionsDetail.version - Force specific transaction version
   *
   * @returns Transaction hash and response
   * @example
   * ```typescript
   * const result = await account.execute([
   *   { contractAddress: token, entrypoint: 'transfer', calldata: [to, amount] },
   *   { contractAddress: nft, entrypoint: 'mint', calldata: [recipient] }
   * ]);
   * ```
   */
  public abstract execute(
    transactions: AllowArray<Call>,
    transactionsDetail?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;

  /**
   * Estimate fees for a paymaster-sponsored transaction
   *
   * @param calls - Array of calls to be sponsored
   * @param calls.contractAddress - Target contract address
   * @param calls.entrypoint - Function to invoke
   * @param calls.calldata - Function parameters
   *
   * @param paymasterDetails - Paymaster configuration
   * @param paymasterDetails.feeMode - Sponsorship mode: 'sponsored' or gas token
   * @param paymasterDetails.deploymentData - Account deployment data if needed
   * @param paymasterDetails.timeBounds - Valid execution time window
   *
   * @returns Fee estimates in both STRK and gas token
   * @example
   * ```typescript
   * const fees = await account.estimatePaymasterTransactionFee(
   *   [{ contractAddress, entrypoint, calldata }],
   *   { feeMode: { mode: 'sponsored' } }
   * );
   * ```
   */
  public abstract estimatePaymasterTransactionFee(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate>;

  /**
   * Build a transaction for paymaster execution
   *
   * @param calls - Array of calls to be sponsored
   * @param paymasterDetails - Paymaster configuration
   * @inheritdoc estimatePaymasterTransactionFee
   *
   * @returns Prepared transaction with typed data for signing
   * @example
   * ```typescript
   * const prepared = await account.buildPaymasterTransaction(
   *   calls,
   *   { feeMode: { mode: 'default', gasToken: ETH_ADDRESS } }
   * );
   * ```
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
   * @param paymasterDetails.feeMode - 'sponsored' or gas token payment
   * @param paymasterDetails.deploymentData - Deploy account if needed
   * @param paymasterDetails.timeBounds - Execution validity window (UNIX timestamps)
   *
   * @param maxFeeInGasToken - Maximum acceptable fee in gas token
   *
   * @returns Transaction hash if successful
   * @throws {Error} If gas token price exceeds maxFeeInGasToken
   * @throws {Error} If transaction parameters are modified by paymaster
   * @example
   * ```typescript
   * const txHash = await account.executePaymasterTransaction(
   *   calls,
   *   { feeMode: { mode: 'sponsored' }, timeBounds: { executeBefore: Date.now()/1000 + 3600 } },
   *   maxFeeETH
   * );
   * ```
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
   * @param contractPayload.contract - Compiled Sierra contract
   * @param contractPayload.classHash - Pre-computed class hash (optional)
   * @param contractPayload.casm - Compiled CASM (required for Cairo 1)
   * @param contractPayload.compiledClassHash - Pre-computed CASM hash
   *
   * @param transactionsDetail - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Declaration transaction hash and class hash
   * @example
   * ```typescript
   * const declareResult = await account.declare({
   *   contract: compiledSierra,
   *   casm: compiledCasm
   * });
   * ```
   */
  public abstract declare(
    contractPayload: DeclareContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeclareContractResponse>;

  /**
   * Deploy contract(s) using the Universal Deployer Contract (UDC)
   *
   * @param payload - Single or multiple deployment configurations
   * @param payload.classHash - Class hash of declared contract
   * @param payload.constructorCalldata - Constructor parameters
   * @param payload.salt - Deployment salt (random if not specified)
   * @param payload.unique - Modify salt for unique address (default: true)
   *
   * @param details - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Deployed contract addresses and transaction hash
   * @example
   * ```typescript
   * const deployment = await account.deploy([
   *   { classHash: erc20ClassHash, constructorCalldata: [name, symbol] },
   *   { classHash: nftClassHash, unique: true }
   * ]);
   * ```
   */
  public abstract deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails
  ): Promise<MultiDeployContractResponse>;

  /**
   * Deploy and wait for a contract deployment to complete
   *
   * @param payload - Deployment configuration(s)
   * @inheritdoc deploy
   *
   * @param details - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Deployment result with contract address and UDC event details
   * @remarks
   * This method waits for transaction confirmation before returning
   * @example
   * ```typescript
   * const result = await account.deployContract({
   *   classHash: contractClassHash,
   *   constructorCalldata: params
   * });
   * console.log('Deployed at:', result.address);
   * ```
   */
  public abstract deployContract(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails
  ): Promise<DeployContractUDCResponse>;

  /**
   * Declare and deploy a contract in a single method
   *
   * @param payload - Combined declare and deploy configuration
   * @param payload.contract - Compiled Sierra contract
   * @param payload.casm - Compiled CASM (required for Cairo 1)
   * @param payload.compiledClassHash - Pre-computed CASM hash
   * @param payload.classHash - Pre-computed class hash
   * @param payload.constructorCalldata - Constructor parameters
   * @param payload.salt - Deployment salt
   * @param payload.unique - Ensure unique deployment address
   *
   * @param details - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Declaration and deployment results
   * @remarks
   * - Automatically skips declaration if contract is already declared
   * - Waits for both transactions to complete
   * - Does not support batch operations
   * @example
   * ```typescript
   * const result = await account.declareAndDeploy({
   *   contract: compiledContract,
   *   casm: compiledCasm,
   *   constructorCalldata: [param1, param2]
   * });
   * ```
   */
  public abstract declareAndDeploy(
    payload: DeclareAndDeployContractPayload,
    details?: InvocationsDetails
  ): Promise<DeclareDeployUDCResponse>;

  /**
   * Deploy the account contract itself on Starknet
   *
   * @param contractPayload - Account deployment configuration
   * @param contractPayload.classHash - Account contract class hash
   * @param contractPayload.constructorCalldata - Constructor parameters
   * @param contractPayload.addressSalt - Salt for address generation
   * @param contractPayload.contractAddress - Pre-computed address
   *
   * @param transactionsDetail - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Deployment transaction hash and contract address
   * @remarks
   * Used for deploying the account contract when using a pre-funded address
   * @example
   * ```typescript
   * const deployment = await account.deployAccount({
   *   classHash: accountClassHash,
   *   constructorCalldata: { publicKey: pubKey },
   *   addressSalt: pubKey
   * });
   * ```
   */
  public abstract deployAccount(
    contractPayload: DeployAccountContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeployContractResponse>;

  /**
   * Sign a typed data message for off-chain verification
   *
   * @param typedData - EIP-712 style typed data structure
   * @returns Signature array [r, s]
   * @remarks
   * - Includes domain separation to prevent signature reuse
   * - Compatible with Starknet's signature verification
   * - Cannot be used to sign transactions
   * @example
   * ```typescript
   * const signature = await account.signMessage({
   *   domain: { name: 'MyDapp', chainId: 'SN_MAIN' },
   *   types: { ... },
   *   primaryType: 'Message',
   *   message: { content: 'Hello Starknet!' }
   * });
   * ```
   */
  public abstract signMessage(typedData: TypedData): Promise<Signature>;

  /**
   * Hash a typed data message using Pedersen hash
   *
   * @param typedData - EIP-712 style typed data structure
   * @returns Message hash as hex string
   * @remarks
   * - Uses Pedersen hash function (not Keccak)
   * - Includes domain separation
   * - Result can be used for signature verification
   * @example
   * ```typescript
   * const messageHash = await account.hashMessage(typedData);
   * ```
   */
  public abstract hashMessage(typedData: TypedData): Promise<string>;

  /**
   * Get the current nonce of the account
   *
   * @param blockIdentifier - Block to query nonce at (default: 'pending')
   * @returns Account nonce as hex string
   * @example
   * ```typescript
   * const nonce = await account.getNonce();
   * const historicalNonce = await account.getNonce('latest');
   * ```
   */
  public abstract getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce>;

  /**
   * Declare a contract class if not already declared
   *
   * @param contractPayload - Contract declaration payload
   * @param transactionsDetail - Transaction execution options
   * @returns Declaration result (with empty transaction_hash if already declared)
   * @example
   * ```typescript
   * const result = await account.declareIfNot({
   *   contract: compiledContract,
   *   casm: compiledCasm
   * });
   * ```
   */
  public abstract declareIfNot(
    contractPayload: DeclareContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeclareContractResponse>;
}

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
   * - .contractAddress - The address of the contract to invoke
   * - .entrypoint - The function selector of the contract method
   * - .calldata - The serialized function parameters (defaults to [])
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * - .blockIdentifier - Block to estimate against
   * - .nonce - Account nonce (defaults to current nonce)
   * - .skipValidate - Skip account validation (default: true)
   * - .tip - Priority fee tip in fri/wei for faster inclusion
   * - .accountDeploymentData - Include account deployment
   * - .paymasterData - Paymaster sponsorship data
   * - .nonceDataAvailabilityMode - DA mode for nonce
   * - .feeDataAvailabilityMode - DA mode for fee
   * - .version - Transaction version (v3 uses fri, v1/v2 use wei)
   * - .resourceBounds - Resource limits for v3 transactions
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
   * @param contractPayload - Contract declaration payload.
   * - .contract - Compiled contract (Sierra JSON).
   * - .casm - Compiled Cairo assembly (required for Cairo 1).
   * - .classHash - Pre-computed class hash (optional optimization).
   * - .compiledClassHash - Pre-computed CASM hash (alternative to casm).
   *
   * @param estimateFeeDetails - Optional details for fee estimation.
   *
   * - .blockIdentifier - Block to estimate against.
   * - .nonce - Account nonce (defaults to current nonce)
   * - .skipValidate - Skip account validation (default: true)
   * - .tip - Priority fee tip for faster inclusion
   * - .version - Transaction version (v3 uses fri, v1/v2 use wei)
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
   * - .classHash - Class hash of the account contract
   * - .constructorCalldata - Constructor parameters
   * - .contractAddress - Pre-computed account address
   * - .addressSalt - Salt for address generation
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
   * - .classHash - Class hash of contract to deploy
   * - .salt - Deployment salt (optional)
   * - .unique - Ensure unique deployment address
   * - .constructorCalldata - Constructor parameters
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
   * - .type - Transaction type: DECLARE, DEPLOY, INVOKE, DEPLOY_ACCOUNT
   * - .payload - Transaction-specific payload
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
   * - .contractAddress - Target contract address
   * - .entrypoint - Function to invoke on the contract
   * - .calldata - Function parameters
   *
   * @param transactionsDetail - Transaction execution options
   * - .nonce - Override account nonce
   * - .maxFee - Maximum fee for v1/v2 transactions
   * - .resourceBounds - Resource limits for v3 transactions
   * - .tip - Priority fee tip
   * - .version - Force specific transaction version
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
   * - .contractAddress - Target contract address
   * - .entrypoint - Function to invoke
   * - .calldata - Function parameters
   *
   * @param paymasterDetails - Paymaster configuration
   * - .feeMode - Sponsorship mode: 'sponsored' or gas token
   * - .deploymentData - Account deployment data if needed
   * - .timeBounds - Valid execution time window
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
   * - .feeMode - 'sponsored' or gas token payment
   * - .deploymentData - Deploy account if needed
   * - .timeBounds - Execution validity window (UNIX timestamps)
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
   // eslint-disable-next-line prettier/prettier
   * @param contractPayload - Contract declaration payload 
   * - .contract - Compiled Sierra contract  
   * - .classHash - Pre-computed class hash (optional)  
   * - .casm - Compiled CASM (required for Cairo 1) 
   * - .compiledClassHash - Pre-computed CASM hash  
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
   * @param payload - Single or multiple deployment configurations.
   * - .classHash - Class hash of declared contract.
   * - .constructorCalldata - Constructor parameters.
   * - .salt - Deployment salt (random if not specified).
   * - .unique - Modify salt for unique address (default: true).
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
   * - .contract - Compiled Sierra contract
   * - .casm - Compiled CASM (required for Cairo 1)
   * - .compiledClassHash - Pre-computed CASM hash
   * - .classHash - Pre-computed class hash
   * - .constructorCalldata - Constructor parameters
   * - .salt - Deployment salt
   * - .unique - Ensure unique deployment address
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
   * - .classHash - Account contract class hash
   * - .constructorCalldata - Constructor parameters
   * - .addressSalt - Salt for address generation
   * - .contractAddress - Pre-computed address
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
   * @param blockIdentifier - Block to query nonce at (default: 'latest' tag)
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

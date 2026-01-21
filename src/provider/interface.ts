/**
 * Starknet Provider Interface - Security & Performance Optimized
 * This interface defines the core interaction layer between the application 
 * and the Starknet L2 Node (Sequencer/Full Node).
 */

export abstract class ProviderInterface {
  // Core Communication Channels (Supports spec 0.9 & 0.10)
  public abstract channel: RPC09.RpcChannel | RPC010.RpcChannel;
  public abstract responseParser: RPCResponseParser;

  /**
   * TRANSACTION FLOW & EXECUTION
   * These methods handle the lifecycle of transactions on-chain.
   */

  /**
   * Executes a read-only call to a contract without creating a transaction.
   * Security Note: Always use a specific blockIdentifier to ensure data consistency.
   */
  public abstract callContract(
    call: Call,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse>;

  /**
   * Invokes a state-changing function on Starknet.
   * Safety: Requires a valid signature and nonce to prevent replay attacks.
   */
  public abstract invokeFunction(
    invocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse>;

  /**
   * FEE & PERFORMANCE ANALYSIS
   */

  /**
   * Estimates fees for multiple transactions in a single batch.
   * Optimization: Recommended over single estimate methods to reduce RPC overhead.
   */
  public abstract getEstimateFeeBulk(
    invocations: AccountInvocations,
    options?: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulkOverhead>;

  /**
   * Estimates the current transaction tip based on network congestion.
   * Critical for EIP-1559 style fee markets in Starknet.
   */
  public abstract getEstimateTip(
    blockIdentifier?: BlockIdentifier,
    options?: TipAnalysisOptions
  ): Promise<TipEstimate>;

  /**
   * VERIFICATION & STATE PROOFS
   */

  /**
   * Cryptographically verifies a signature on-chain.
   * Important for confirming identity in Account Abstraction wallets.
   */
  public abstract verifyMessageInStarknet(
    message: BigNumberish | TypedData,
    signature: Signature,
    accountAddress: BigNumberish,
    signatureVerificationFunctionName?: string,
    signatureVerificationResponse?: {
      okResponse: string[];
      nokResponse: string[];
      error: string[];
    }
  ): Promise<boolean>;

  /**
   * Retrieves Merkle paths for state variables.
   * Security: Used for trustless verification of L2 state on L1 or other clients.
   */
  public abstract getStorageProof(
    classHashes: BigNumberish[],
    contractAddresses: BigNumberish[],
    contractsStorageKeys: RPC.CONTRACT_STORAGE_KEYS[],
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC.StorageProof>;

  // ... (Utility methods like getBlock, getTransaction, etc.)
}

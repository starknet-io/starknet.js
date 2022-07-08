import { StarknetChainId } from '../constants';
import type {
  Call,
  CallContractResponse,
  ContractClass,
  DeclareContractPayload,
  DeclareContractResponse,
  DeployContractPayload,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  Invocation,
  InvocationsDetails,
  InvokeFunctionResponse,
  Signature,
} from '../types';
import type { BigNumberish } from '../utils/number';
import { BlockIdentifier } from './utils';

export abstract class ProviderInterface {
  public abstract chainId: StarknetChainId;

  /**
   * Calls a function on the StarkNet contract.
   *
   * @param invokeTransaction transaction to be invoked
   * @param blockIdentifier block identifier
   * @returns the result of the function on the smart contract.
   */
  public abstract callContract(
    request: Call,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse>;

  /**
   * Gets the block information
   *
   * @param blockIdentifier block identifier
   * @returns the block object
   */
  public abstract getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse>;

  /**
   * Gets the contract class of the deployed contract.
   *
   * @param contractAddress - contract address
   * @param blockIdentifier - block identifier
   * @returns Bytecode and ABI of compiled contract
   */
  public abstract getClassAt(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClass>;

  /**
   * Gets the contract's storage variable at a specific key.
   *
   * @param contractAddress
   * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
   * @param blockIdentifier - block identifier
   * @returns the value of the storage variable
   */
  public abstract getStorageAt(
    contractAddress: string,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<BigNumberish>;

  /**
   * Gets the transaction information from a tx id.
   *
   * @param txHash
   * @returns the transacton object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }
   */
  public abstract getTransaction(transactionHash: BigNumberish): Promise<GetTransactionResponse>;

  /**
   * Gets the transaction receipt from a tx hash.
   *
   * @param txHash
   * @returns the transaction receipt object
   */
  public abstract getTransactionReceipt(
    transactionHash: BigNumberish
  ): Promise<GetTransactionReceiptResponse>;

  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - constructor calldata
   * - address salt
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract deployContract(payload: DeployContractPayload): Promise<DeployContractResponse>;

  /**
   * Declares a given compiled contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - constructor calldata
   * - address salt
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract declareContract(
    payload: DeclareContractPayload
  ): Promise<DeclareContractResponse>;

  /**
   * Invokes a function on starknet
   * @deprecated This method wont be supported as soon as fees are mandatory
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - the entrypoint of the contract
   * - calldata - (defaults to []) the calldata
   * - signature - (defaults to []) the signature
   *
   * @returns response from addTransaction
   */
  public abstract invokeFunction(
    invocation: Invocation,
    details?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;

  public abstract getEstimateFee(
    request: Call,
    blockIdentifier: BlockIdentifier,
    signature?: Signature
  ): Promise<EstimateFeeResponse>;

  public abstract waitForTransaction(txHash: BigNumberish, retryInterval?: number): Promise<void>;
}

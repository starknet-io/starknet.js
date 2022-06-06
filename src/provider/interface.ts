import { StarknetChainId } from '../constants';
import type {
  AddTransactionResponse,
  Call,
  CallContractResponse,
  DeployContractPayload,
  DeployContractRPCResponse,
  GetBlockResponse,
  GetBlockResponseRPC,
  GetCodeResponse,
  GetCodeResponseRPC,
  GetContractAddressesResponse,
  GetStorageAtResponseRPC,
  GetTransactionReceiptResponseRPC,
  GetTransactionResponse,
  GetTransactionResponseRPC,
  GetTransactionStatusResponse,
  Invocation,
  TransactionReceiptResponse,
} from '../types';
import type { BigNumberish } from '../utils/number';
import { BlockIdentifier } from './utils';

export abstract class ProviderInterface {
  public abstract chainId: StarknetChainId;

  /**
   * Gets the smart contract address on the goerli testnet.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)
   * @returns starknet smart contract addresses
   */
  public abstract getContractAddresses(): Promise<GetContractAddressesResponse>;

  /**
   * Calls a function on the StarkNet contract.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L25-L39)
   *
   * @param invokeTransaction transaction to be invoked
   * @param blockIdentifier block identifier
   * @returns the result of the function on the smart contract.
   */
  public abstract callContract(
    invokeTransaction: Call,
    options: {
      blockIdentifier: BlockIdentifier;
    }
  ): Promise<CallContractResponse>;

  /**
   * Gets the block information
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L41-L53)
   *
   * @param blockIdentifier block identifier
   * @returns the block object { block_number, previous_block_number, state_root, status, timestamp, transaction_receipts, transactions }
   */
  public abstract getBlock(
    blockIdentifier?: BlockIdentifier
  ): Promise<GetBlockResponse | GetBlockResponseRPC>;

  /**
   * Gets the code of the deployed contract.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L55-L68)
   *
   * @param contractAddress - contract address
   * @param blockIdentifier - block identifier
   * @returns Bytecode and ABI of compiled contract
   */
  public abstract getCode(
    contractAddress: string,
    blockIdentifier?: BlockIdentifier
  ): Promise<GetCodeResponse | GetCodeResponseRPC>;

  // TODO: add proper type
  /**
   * Gets the contract's storage variable at a specific key.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L70-L85)
   *
   * @param contractAddress
   * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
   * @param blockIdentifier - block identifier
   * @returns the value of the storage variable
   */
  public abstract getStorageAt(
    contractAddress: string,
    key: number,
    blockIdentifier?: BlockIdentifier
  ): Promise<object | GetStorageAtResponseRPC>;

  /**
   * Gets the status of a transaction.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)
   *
   * @param txHash
   * @returns the transaction status object { block_number, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }
   */
  public abstract getTransactionStatus(txHash: BigNumberish): Promise<GetTransactionStatusResponse>;

  /**
   * Gets the transaction information from a tx id.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58)
   *
   * @param txHash
   * @returns the transacton object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }
   */
  public abstract getTransaction(
    txHash: BigNumberish
  ): Promise<GetTransactionResponse | GetTransactionResponseRPC>;

  public abstract getTransactionReceipt(
    txHash: BigNumberish
  ): Promise<TransactionReceiptResponse | GetTransactionReceiptResponseRPC>;

  /**
   * Deploys a given compiled contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - constructor calldata
   * - address salt
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  public abstract deployContract(
    payload: DeployContractPayload
  ): Promise<AddTransactionResponse | DeployContractRPCResponse>;

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
  public abstract invokeFunction(invocation: Invocation): Promise<AddTransactionResponse>;

  public abstract waitForTransaction(txHash: BigNumberish, retryInterval?: number): Promise<void>;

  /**
   * @deprecated use `waitForTransaction` instead
   */
  public abstract waitForTransaction(txHash: BigNumberish, retryInterval?: number): Promise<void>;
}

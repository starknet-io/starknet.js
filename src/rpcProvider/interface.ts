import { StarknetChainId } from '../constants';
import { ProviderInterface } from '../provider/interface';
import { BlockIdentifier } from '../provider/utils';
import type {
  Call,
  CallContractResponse,
  DeployContractPayload,
  DeployContractRPCResponse,
  EventFilterRPC,
  GetBlockNumberResponseRPC,
  GetBlockResponseRPC,
  GetCodeResponseRPC,
  GetEventsResponseRPC,
  GetStorageAtResponseRPC,
  GetSyncingStatsResponseRPC,
  GetTransactionCountResponseRPC,
  GetTransactionReceiptResponseRPC,
  GetTransactionResponseRPC,
} from '../types';
import type { BigNumberish } from '../utils/number';

export abstract class RPCProviderInterface extends ProviderInterface {
  public abstract nodeUrl: string;

  /**
   * Gets chain id of the network
   *
   * @returns chainId
   */
  public abstract getChainId(): Promise<StarknetChainId>;

  /**
   * Calls a function on the StarkNet contract.
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/fc97bdd8322a7df043c87c371634b26c15ed6cee/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L25-L39)
   *
   * @param invokeTransaction transaction to be invoked
   * @param options additional options for the call
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
   * @param blockIdentifier block identifier
   * @returns the block object
   */
  public abstract getBlock(blockIdentifier?: BlockIdentifier): Promise<GetBlockResponseRPC>;

  /**
   * Gets the code of the deployed contract.
   *
   * @param contractAddress - contract address
   * @returns Bytecode and ABI of compiled contract
   */
  public abstract getCode(contractAddress: string): Promise<GetCodeResponseRPC>;

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
    key: number,
    blockIdentifier?: BlockIdentifier
  ): Promise<GetStorageAtResponseRPC>;

  /**
   * Gets the transaction receipt from a tx hash
   *
   *
   * @param txHash
   * @returns the transaction receipt object
   */

  public abstract getTransactionReceipt(
    txHash: BigNumberish
  ): Promise<GetTransactionReceiptResponseRPC>;

  /**
   * Gets the transaction information from a tx hash.
   *
   * @param txHash
   * @param blockIndex
   * @returns the transaction object
   */
  public abstract getTransaction(txHash: BigNumberish): Promise<GetTransactionResponseRPC>;

  /**
   * Gets the transaction count from a block.
   *
   *
   * @param blockIdentifier
   * @returns Number of transactions
   */
  public abstract getTransactionCount(
    blockIdentifier: BlockIdentifier
  ): Promise<GetTransactionCountResponseRPC>;

  /**
   * Gets the latest block number
   *
   *
   * @returns Number of the latest block
   */
  public abstract getBlockNumber(): Promise<GetBlockNumberResponseRPC>;

  /**
   * Gets syncing status of the node
   *
   *
   * @returns Object with the stats data
   */
  public abstract getSyncingStats(): Promise<GetSyncingStatsResponseRPC>;

  /**
   * Gets all the events filtered
   *
   *
   * @returns events and the pagination of the events
   */
  public abstract getEvents(eventFilter: EventFilterRPC): Promise<GetEventsResponseRPC>;

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
  ): Promise<DeployContractRPCResponse>;
}

/**
 * PRIMITIVES
 */

/**
 * An Ethereum address, represented as 40 hex digits.
 * @pattern ^0x[a-fA-F0-9]{40}$
 */
export type ETH_ADDRESS = string;

/**
 * A transaction hash, represented as a 32-byte hex string.
 * @pattern ^0x[a-fA-F0-9]{64}$
 */
export type TXN_HASH = string;

/**
 * A block hash, represented as a 32-byte hex string.
 * @pattern ^0x[a-fA-F0-9]{64}$
 */
export type BLOCK_HASH = string;

/**
 * A block number, represented as a positive integer.
 */
export type BLOCK_NUMBER = string | number | 'latest' | 'finalized' | 'pending';

/**
 * A nonce, represented as a hex string of at most 16 hex digits.
 * @pattern ^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,15})$
 */
export type NONCE = string;

/**
 * Gas value, represented as a hex string.
 * @pattern ^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,15})$
 */
export type GAS = string;

/**
 * A storage key, represented as a 32-byte hex string.
 * @pattern ^0x[a-fA-F0-9]{64}$
 */
export type STORAGE_KEY = string;

/**
 * A 256-bit integer, represented as a hex string of length at most 64.
 * @pattern ^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,63})$
 */
export type UINT256 = string;

/**
 * A 128-bit integer, represented as a hex string of length at most 32.
 * @pattern ^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,31})$
 */
export type UINT128 = string;

/**
 * A signature, represented as an array of two 32-byte hex strings (r, s).
 */
export type SIGNATURE = [string, string];

/**
 * A chain ID, represented as a hex string.
 * @pattern ^0x[a-fA-F0-9]{1,64}$
 */
export type CHAIN_ID = string;

/**
 * Transaction Status Enum
 */
export enum TX_STATUS {
  /** The transaction has been created but not yet broadcasted. */
  CREATED = 'CREATED',

  /** The transaction has been received by the network but not yet included in a block. */
  PENDING = 'PENDING',

  /** The transaction is included in a block but is not yet finalized. */
  INCLUDED = 'INCLUDED',

  /** The transaction has been successfully executed and confirmed on-chain. */
  SUCCESS = 'SUCCESS',

  /** The transaction was included in a block but reverted due to an error. */
  FAILED = 'FAILED',

  /** The transaction was dropped from the mempool and will not be processed. */
  DROPPED = 'DROPPED',

  /** The transaction was replaced by another transaction with the same nonce but a higher gas price. */
  REPLACED = 'REPLACED',
}

/**
 * Call that modifies state and consumes gas.
 */
export type STATE_CHANGING_CALL = 'CALL' | 'CREATE' | 'DELEGATECALL' | 'STATICCALL';

/**
 * Call that does not modify state and is free to execute.
 */
export type VIEW_CALL = 'STATICCALL';

/**
 * Calls that occur internally between smart contracts.
 */
export type INTERNAL_CALL = 'CALL' | 'DELEGATECALL' | 'STATICCALL';

/**
 * Low-level Ethereum calls.
 */
export type LOW_LEVEL_CALL = 'CALLCODE' | 'SELFDESTRUCT';

/**
 * ETH-specific calls.
 */
export type ETH_CALL = 'TRANSFER' | 'SEND';

export type CALL_TYPE = STATE_CHANGING_CALL | VIEW_CALL | INTERNAL_CALL | LOW_LEVEL_CALL | ETH_CALL;

/**
 * Block Status Enum
 */
export enum BLOCK_STATUS {
  /** The block has been proposed but not yet finalized. */
  PENDING = 'PENDING',

  /** The block has been included in the chain but is not yet finalized. */
  INCLUDED = 'INCLUDED',

  /** The block has been confirmed and is unlikely to be reverted. */
  CONFIRMED = 'CONFIRMED',

  /** The block has been finalized and cannot be changed. */
  FINALIZED = 'FINALIZED',

  /** The block was reorged out of the chain and is no longer valid. */
  REORGED = 'REORGED',

  /** The block was invalidated due to a protocol or consensus issue. */
  INVALID = 'INVALID',
}

/**
 * Block Tag of 'latest' or 'pending' block.
 */
export type BLOCK_TAG = 'latest' | 'pending';

/**
 * Transaction Type Enum
 */
export enum TX_TYPE {
  /** A standard ETH transfer from one EOA to another. */
  TRANSFER = 'TRANSFER',

  /** A transaction that deploys a new smart contract. */
  CONTRACT_CREATION = 'CONTRACT_CREATION',

  /** A transaction calling a smart contract function, possibly modifying state. */
  CONTRACT_CALL = 'CONTRACT_CALL',

  /** A transaction that delegates execution to another contract while maintaining the caller's context. */
  DELEGATECALL = 'DELEGATECALL',

  /** A read-only transaction that does not modify state (gas-free). */
  STATICCALL = 'STATICCALL',

  /** A transaction using the EIP-1559 fee structure (Base Fee + Priority Fee). */
  EIP1559 = 'EIP1559',

  /** A legacy transaction using a gas price instead of the EIP-1559 model. */
  LEGACY = 'LEGACY',

  /** A transaction that cancels or replaces a pending transaction with a higher gas price. */
  CANCEL = 'CANCEL',

  /** A transaction that self-destructs a contract and transfers remaining ETH. */
  SELFDESTRUCT = 'SELFDESTRUCT',
}

/**
 * Ethereum Transaction Type (Based on provided data)
 */
export type TX = {
  /** List of addresses involved in the transaction and their access lists (if any). */
  accessList: Array<{
    address: ETH_ADDRESS;
    storageKeys: string[];
  }>;

  /** Block hash where the transaction was included. */
  blockHash: BLOCK_HASH;

  /** Block number in which the transaction was included (hex string). */
  blockNumber: BLOCK_NUMBER;

  /** Chain ID (for preventing replay attacks). */
  chainId: CHAIN_ID;

  /** Sender's Ethereum address. */
  from: ETH_ADDRESS;

  /** Gas limit for the transaction (hex string). */
  gas: string;

  /** Gas price (used for legacy transactions). */
  gasPrice: string;

  /** Transaction hash (unique identifier). */
  hash: TXN_HASH;

  /** Input data for the transaction (used in contract calls). */
  input: string;

  /** Maximum fee per gas (used for EIP-1559 transactions). */
  maxFeePerGas: string;

  /** Maximum priority fee per gas (used for EIP-1559 transactions). */
  maxPriorityFeePerGas: string;

  /** Nonce of the transaction (unique per sender). */
  nonce: string;

  /** Transaction signature component 'r'. */
  r: string;

  /** Transaction signature component 's'. */
  s: string;

  /** Transaction recipient address (or `null` for contract creation). */
  to: ETH_ADDRESS | null;

  /** Index of the transaction in the block. */
  transactionIndex: number;

  /** Type of transaction (EIP-1559 or legacy). */
  type: string;

  /** Transaction signature component 'v'. */
  v: string;

  /** Value of Ether sent in the transaction (in Wei, hex string). */
  value: string;

  /** Parity for the transaction's signature (optional, included in some cases). */
  yParity: string;
};

/**
 * Ethereum Transaction Receipt Type
 */
export type TX_RECEIPT = {
  /** Transaction hash (32 bytes). */
  transactionHash: TXN_HASH;

  /** Index of the transaction within the block. */
  transactionIndex: number;

  /** Block number in which the transaction was included. */
  blockNumber: BLOCK_NUMBER;

  /** Block hash in which the transaction was included. */
  blockHash: BLOCK_HASH;

  /** The address that deployed the contract (if applicable). */
  contractAddress: ETH_ADDRESS | null;

  /** Gas used by the transaction execution. */
  gasUsed: string;

  /** Cumulative gas used by the transaction and all preceding ones in the block. */
  cumulativeGasUsed: string;

  /** Effective gas price (EIP-1559) or gas price (legacy). */
  effectiveGasPrice: string;

  /** Logs generated by the transaction. */
  logs: LOG_ENTRY[];

  /** Logs bloom filter for indexing events. */
  logsBloom: string;

  /** Transaction status: `1` for success, `0` for failure. */
  status: TX_STATUS;

  /** Type of transaction (EIP-1559, Legacy, etc.). */
  type: TX_TYPE;

  /** The address of the sender of the transaction. */
  from: ETH_ADDRESS;

  /** The address of the recipient or `null` if contract creation. */
  to: ETH_ADDRESS | null;
};

/**
 * Ethereum Log Entry Type
 */
export type LOG_ENTRY = {
  /** Address that emitted the log. */
  address: ETH_ADDRESS;

  /** List of indexed topics (max 4). */
  topics: string[];

  /** Non-indexed data field. */
  data: string;

  /** Block number in which the log was included. */
  blockNumber: BLOCK_NUMBER;

  /** Transaction hash associated with the log. */
  transactionHash: TXN_HASH;

  /** Index of the log within the transaction. */
  logIndex: number;

  /** Index of the log within the block. */
  blockIndex: number;
};

/**
 * Ethereum Block Type
 */
export type BLOCK = {
  /** Block number (or `null` if it's a pending block). */
  number: BLOCK_NUMBER | null;

  /** Block hash (or `null` if it's a pending block). */
  hash: BLOCK_HASH | null;

  /** Hash of the parent block. */
  parentHash: BLOCK_HASH;

  /** Hash of the state root after executing this block. */
  stateRoot: string;

  /** Hash of the transactions root. */
  transactionsRoot: string;

  /** Hash of the receipts root. */
  receiptsRoot: string;

  /** Bloom filter for logs in the block. */
  logsBloom: string;

  /** Address of the block miner. */
  miner: ETH_ADDRESS;

  /** Difficulty of the block. */
  difficulty: string;

  /** Total difficulty up to this block. */
  totalDifficulty: string;

  /** Extra data included in the block. */
  extraData: string;

  /** Size of the block in bytes. */
  size: string;

  /** Gas limit for the block. */
  gasLimit: string;

  /** Total gas used in this block. */
  gasUsed: string;

  /** Base fee per gas (EIP-1559) or `null` for pre-London blocks. */
  baseFeePerGas?: string | null;

  /** Timestamp when the block was mined. */
  timestamp: number;

  /** List of transaction hashes included in the block. */
  transactions: TXN_HASH[];

  /** List of uncle block hashes (empty for modern Ethereum blocks). */
  uncles: BLOCK_HASH[];

  /** Mix hash used in proof-of-work (pre-Merge). */
  mixHash?: string;

  /** Proof-of-work nonce (pre-Merge). */
  nonce?: string;
};

/**
 * Ethereum Block Receipts Type
 */
export type BLOCK_RECEIPTS = {
  /** The block number in which these receipts belong. */
  blockNumber: BLOCK_NUMBER;

  /** The block hash in which these receipts belong. */
  blockHash: BLOCK_HASH;

  /** List of transaction receipts in the block. */
  receipts: TX_RECEIPT[];
};

/**
 * Ethereum Transaction Request Type
 */
export type TX_REQUEST = {
  /** The transaction type (optional). */
  type?: null | number;

  /** The target address of the transaction (optional). */
  to?: null | ETH_ADDRESS;

  /** The sender address of the transaction (optional). */
  from?: null | ETH_ADDRESS;

  /** The nonce of the transaction (optional). */
  nonce?: null | number;

  /** The gas limit for the transaction (optional). */
  gasLimit?: null | string;

  /** The gas price for legacy transactions (optional). */
  gasPrice?: null | string;

  /** The max priority fee to pay per gas (EIP-1559) (optional). */
  maxPriorityFeePerGas?: null | string;

  /** The max total fee to pay per gas (EIP-1559) (optional). */
  maxFeePerGas?: null | string;

  /** The transaction data (optional). */
  data?: null | string;

  /** The value of the transaction in wei (optional). */
  value?: null | string;

  /** The chain ID for the transaction (optional). */
  chainId?: null | string;

  /** The access list for EIP-2930 transactions (optional). */
  accessList?: null | Array<{
    address: ETH_ADDRESS;
    storageKeys: string[];
  }>;

  /** Custom data for network-specific values (optional). */
  customData?: any;

  /** Block tag for call or estimateGas (optional). */
  blockTag?: string;

  /** Whether CCIP-read should be enabled (optional). */
  enableCcipRead?: boolean;

  /** Blob versioned hashes for EIP-4844 transactions (optional). */
  blobVersionedHashes?: null | Array<string>;

  /** The maximum fee per blob gas for EIP-4844 (optional). */
  maxFeePerBlobGas?: null | string;
};

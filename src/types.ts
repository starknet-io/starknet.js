import type { ec as EC } from 'elliptic';

import type { BigNumberish } from './utils/number';

export type KeyPair = EC.KeyPair;
export type Signature = BigNumberish[];

export type GetContractAddressesResponse = {
  Starknet: string;
  GpsStatementVerifier: string;
};

export type Status =
  | 'NOT_RECEIVED'
  | 'RECEIVED'
  | 'PENDING'
  | 'ACCEPTED_ON_L2'
  | 'ACCEPTED_ON_L1'
  | 'REJECTED';
export type TransactionStatus = 'TRANSACTION_RECEIVED';
export type Type = 'DEPLOY' | 'INVOKE_FUNCTION';
export type EntryPointType = 'EXTERNAL';
export type CompressedProgram = string;

export type AbiEntry = { name: string; type: 'felt' | 'felt*' | string };

export type FunctionAbi = {
  inputs: AbiEntry[];
  name: string;
  outputs: AbiEntry[];
  stateMutability?: 'view';
  type: 'function';
};

export type StructAbi = {
  members: (AbiEntry & { offset: number })[];
  name: string;
  size: number;
  type: 'struct';
};

export type Abi = FunctionAbi | StructAbi;

export type EntryPointsByType = object;
export type Program = object;
export type BlockNumber = 'pending' | null | number;

export type CompiledContract = {
  abi: Abi[];
  entry_points_by_type: EntryPointsByType;
  program: Program;
};

export type CompressedCompiledContract = Omit<CompiledContract, 'program'>;

export type DeployTransaction = {
  type: 'DEPLOY';
  contract_definition: CompressedCompiledContract;
  contract_address_salt: BigNumberish;
  constructor_calldata: string[];
  nonce?: BigNumberish;
};

export type InvokeFunctionTransaction = {
  type: 'INVOKE_FUNCTION';
  contract_address: string;
  signature?: Signature;
  entry_point_type?: EntryPointType;
  entry_point_selector: string;
  calldata?: string[];
  nonce?: BigNumberish;
};

export type CallContractTransaction = Omit<InvokeFunctionTransaction, 'type'>;

export type Transaction = DeployTransaction | InvokeFunctionTransaction;

export type CallContractResponse = {
  result: string[];
};

export type GetBlockResponse = {
  block_number: number;
  state_root: string;
  block_hash: string;
  transactions: {
    [txHash: string]: Transaction;
  };
  timestamp: number;
  transaction_receipts: {
    [txHash: string]: {
      block_hash: string;
      transaction_hash: string;
      l2_to_l1_messages: {
        to_address: string;
        payload: string[];
        from_address: string;
      }[];
      block_number: BlockNumber;
      status: Status;
      transaction_index: number;
    };
  };
  previous_block_hash: string;
  status: Status;
};

export type GetCodeResponse = {
  bytecode: string[];
  abi: Abi[];
};

export type GetTransactionStatusResponse = {
  tx_status: Status;
  block_hash: string;
};

export type GetTransactionResponse = {
  status: Status;
  transaction: Transaction;
  block_hash: string;
  block_number: BlockNumber;
  transaction_index: number;
  transaction_hash: string;
};

export type AddTransactionResponse = {
  code: TransactionStatus;
  transaction_hash: string;
  address?: string;
};

export type TransactionReceipt = {
  status: Status;
  transaction_hash: string;
  transaction_index: number;
  block_hash: string;
  block_number: string;
  l2_to_l1_messages: string[];
  events: string[];
};

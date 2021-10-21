export interface GetContractAddressesResponse {
  Starknet: string;
  GpsStatementVerifier: string;
}

export type Status = 'NOT_RECEIVED' | 'RECEIVED' | 'PENDING' | 'REJECTED' | 'ACCEPTED_ONCHAIN';
export type TxStatus = 'TRANSACTION_RECEIVED';
export type Type = 'DEPLOY' | 'INVOKE_FUNCTION';
export type EntryPointType = 'EXTERNAL';
export type CompressedProgram = string;

export interface Abi {
  inputs: { name: string; type: string }[];
  name: string;
  outputs: { name: string; type: string }[];
  type: string;
}
export type EntryPointsByType = any;
export type Program = any;

export interface CompiledContract {
  abi: Abi;
  entry_points_by_type: EntryPointsByType;
  program: Program;
}

export interface CompressedCompiledContract extends CompiledContract {
  program: CompressedProgram;
}

export interface DeployTransaction {
  type: 'DEPLOY';
  contract_definition: CompressedCompiledContract;
  contract_address: string;
}

export interface InvokeFunctionTransaction {
  type: 'INVOKE_FUNCTION';
  contract_address: string;
  entry_point_type?: EntryPointType;
  entry_point_selector?: string;
  calldata?: string[];
}

export type Transaction = DeployTransaction | InvokeFunctionTransaction;

export interface GetBlockResponse {
  sequence_number: number;
  state_root: string;
  block_id: number;
  transactions: {
    [txid: string]: Transaction;
  };
  timestamp: number;
  transaction_receipts: {
    [txid: string]: {
      block_id: number;
      transaction_id: number;
      l2_to_l1_messages: {
        to_address: string;
        payload: string[];
        from_address: string;
      }[];
      block_number: number;
      status: Status;
      transaction_index: number;
    };
  };
  previous_block_id: number;
  status: Status;
}

export interface GetCode {
  bytecode: string[];
  abi: Abi[];
}

export interface GetTransactionStatusResponse {
  tx_status: Status;
  block_id: number;
}

export interface GetTransactionResponse {
  transaction_index: number;
  transaction: Transaction;
  block_id: number;
  block_number: number;
  status: Status;
  transaction_id: number;
}

export interface AddTransactionResponse {
  code: TxStatus;
  tx_id: number;
}

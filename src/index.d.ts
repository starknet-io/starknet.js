export interface GetContractAddressesResponse {
  Starknet: string;
  GpsStatementVerifier: string;
}

export type Status = 'NOT_RECEIVED' | 'RECEIVED' | 'PENDING' | 'REJECTED' | 'ACCEPTED_ONCHAIN';
export type Type = 'DEPLOY' | 'INVOKE_FUNCTION';
export type EntryPointType = 'EXTERNAL';

export interface Transaction {
  type: Type;
  contract_address: string;
  entry_point_type?: EntryPointType;
  entry_point_selector?: string;
  calldata?: string[];
}

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

export interface Abi {
  inputs: { name: string; type: string }[];
  name: string;
  outputs: { name: string; type: string }[];
  type: string;
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

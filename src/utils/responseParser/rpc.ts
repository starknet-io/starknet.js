/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
} from '../../types';
import { RPC } from '../../types/api';
import { toBN } from '../number';
import { ResponseParser } from '.';

type RpcGetBlockResponse = RPC.GetBlockWithTxHashesResponse & {
  [key: string]: any;
};

type GetTransactionByHashResponse = RPC.GetTransactionByHashResponse & {
  [key: string]: any;
};

export class RPCResponseParser extends ResponseParser {
  public parseGetBlockResponse(res: RpcGetBlockResponse): GetBlockResponse {
    return {
      timestamp: res.timestamp,
      block_hash: res.block_hash,
      block_number: res.block_number,
      new_root: res.new_root,
      parent_hash: res.parent_hash,
      status: res.status,
      transactions: res.transactions,
    };
  }

  public parseGetTransactionResponse(res: GetTransactionByHashResponse): GetTransactionResponse {
    return {
      calldata: res.calldata || [],
      contract_address: res.contract_address,
      entry_point_selector: res.entry_point_selector,
      max_fee: res.max_fee,
      nonce: res.nonce,
      signature: res.signature || [],
      transaction_hash: res.transaction_hash,
      version: res.version,
    };
  }

  public parseGetTransactionReceiptResponse(
    res: RPC.GetTransactionReceiptResponse
  ): GetTransactionReceiptResponse {
    return {
      transaction_hash: res.txn_hash,
      actual_fee: res.actual_fee,
      status: res.status,
      status_data: res.status_data,
      messages_sent: res.messages_sent,
      l1_origin_message: res.l1_origin_message,
      events: res.events,
    };
  }

  public parseFeeEstimateResponse(res: RPC.EstimateFeeResponse): EstimateFeeResponse {
    return {
      overall_fee: toBN(res.overall_fee),
      gas_consumed: toBN(res.gas_consumed),
      gas_price: toBN(res.gas_price),
    };
  }

  public parseCallContractResponse(res: Array<string>): CallContractResponse {
    return {
      result: res,
    };
  }

  public parseInvokeFunctionResponse(res: RPC.AddTransactionResponse): InvokeFunctionResponse {
    return {
      transaction_hash: res.transaction_hash,
    };
  }

  public parseDeployContractResponse(res: RPC.DeployContractResponse): DeployContractResponse {
    return {
      transaction_hash: res.transaction_hash,
      contract_address: res.contract_address,
    };
  }

  public parseDeclareContractResponse(res: RPC.DeclareResponse): DeclareContractResponse {
    return {
      transaction_hash: res.transaction_hash,
      class_hash: res.class_hash,
    };
  }
}

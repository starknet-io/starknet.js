/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import {
  CallContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetTransactionResponse,
  RPC,
} from '../../types';
import { toBN } from '../number';
import { ResponseParser } from '.';

type RpcGetBlockResponse = RPC.GetBlockWithTxHashesResponse & {
  [key: string]: any;
};

type GetTransactionByHashResponse = RPC.GetTransactionByHashResponse & {
  [key: string]: any;
};

export class RPCResponseParser
  implements
    Omit<
      ResponseParser,
      | 'parseDeclareContractResponse'
      | 'parseDeployContractResponse'
      | 'parseInvokeFunctionResponse'
      | 'parseGetTransactionReceiptResponse'
    >
{
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
      max_fee: res.max_fee,
      nonce: res.nonce,
      signature: res.signature || [],
      transaction_hash: res.transaction_hash,
      version: res.version,
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
}

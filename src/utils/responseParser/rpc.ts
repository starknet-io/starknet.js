/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import {
  CallContractResponse,
  ContractClassResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetTransactionResponse,
  RPC,
  SimulateTransactionResponse,
} from '../../types';
import { toBigInt } from '../num';
import { estimatedFeeToMaxFee } from '../stark';
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
      sender_address: res.contract_address,
      max_fee: res.max_fee,
      nonce: res.nonce,
      signature: res.signature || [],
      transaction_hash: res.transaction_hash,
      version: res.version,
    };
  }

  public parseFeeEstimateResponse(res: Array<RPC.EstimateFeeResponse>): EstimateFeeResponse {
    return {
      overall_fee: toBigInt(res[0].overall_fee),
      gas_consumed: toBigInt(res[0].gas_consumed),
      gas_price: toBigInt(res[0].gas_price),
    };
  }

  public parseFeeEstimateBulkResponse(
    res: Array<RPC.EstimateFeeResponse>
  ): EstimateFeeResponseBulk {
    return res.map((val) => ({
      overall_fee: toBigInt(val.overall_fee),
      gas_consumed: toBigInt(val.gas_consumed),
      gas_price: toBigInt(val.gas_price),
    }));
  }

  public parseCallContractResponse(res: Array<string>): CallContractResponse {
    return {
      result: res,
    };
  }

  public parseSimulateTransactionResponse(
    res: RPC.SimulateTransactionResponse
  ): SimulateTransactionResponse {
    return res.map((it) => {
      return {
        ...it,
        suggestedMaxFee: estimatedFeeToMaxFee(BigInt(it.fee_estimation.overall_fee)),
      };
    });
  }

  public parseContractClassResponse(res: RPC.ContractClass): ContractClassResponse {
    return {
      ...res,
      abi: typeof res.abi === 'string' ? JSON.parse(res.abi) : res.abi,
    };
  }
}

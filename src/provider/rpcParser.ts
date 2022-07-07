import { RPC } from '../types/api/rpc';
import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  FeeEstimateResponse,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeContractResponse,
} from './abstractProvider';
import { ResponseParser } from './parser';

export class RPCResponseParser extends ResponseParser {
  public parseGetBlockResponse(res: RPC.GetBlockResponse): GetBlockResponse {
    return {
      acceptedTime: res.accepted_time,
      blockHash: res.block_hash,
      blockNumber: res.block_number,
      gasPrice: res.gas_price,
      newRoot: res.new_root,
      oldRoot: res.old_root,
      parentHash: res.parent_hash,
      sequencer: res.sequencer,
      status: res.status,
      transactions: res.transactions,
    };
  }

  public parseGetTransactionResponse(res: RPC.GetTransactionResponse): GetTransactionResponse {
    return {
      calldata: res.calldata,
      contractAddress: res.contract_address,
      contractClass: res.contract_class,
      entryPointSelector: res.entry_point_selector,
      maxFee: res.max_fee,
      nonce: res.nonce,
      senderAddress: res.sender_address,
      signature: res.signature,
      transactionHash: res.txn_hash,
      version: res.version,
    };
  }

  public parseGetTransactionReceiptResponse(
    res: RPC.GetTransactionReceiptResponse
  ): GetTransactionReceiptResponse {
    return {
      transactionHash: res.txn_hash,
      actualFee: res.actual_fee,
      status: res.status,
      statusData: res.status_data,
      messagesSent: res.messages_sent?.map(({ to_address, payload }) => ({
        toAddress: to_address,
        payload,
      })),
      l1OriginMessage: res.l1_origin_message && {
        fromAddress: res.l1_origin_message.from_address,
        payload: res.l1_origin_message.payload,
      },
      events: res.events.map(({ from_address, keys, data }) => ({
        fromAddress: from_address,
        keys,
        data,
      })),
    };
  }

  public parseFeeEstimateResponse(res: RPC.EstimateFeeResponse): FeeEstimateResponse {
    return {
      overallFee: res.overall_fee,
    };
  }

  public parseCallContractResponse(res: Array<string>): CallContractResponse {
    return {
      result: res,
    };
  }

  public parseInvokeContractResponse(res: RPC.AddTransactionResponse): InvokeContractResponse {
    return {
      transactionHash: res.transaction_hash,
    };
  }

  public parseDeployContractResponse(res: RPC.DeployContractResponse): DeployContractResponse {
    return {
      transactionHash: res.transaction_hash,
      contractAddress: res.contract_address,
    };
  }

  public parseDeclareContractResponse(res: RPC.DeclareResponse): DeclareContractResponse {
    return {
      transactionHash: res.transaction_hash,
      classHash: res.class_hash,
    };
  }
}

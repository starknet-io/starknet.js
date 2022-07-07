import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  Gateway,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
} from '../../types';
import { toBN } from '../number';
import { ResponseParser } from '.';

export class GatewayAPIResponseParser extends ResponseParser {
  public parseGetBlockResponse(res: Gateway.GetBlockResponse): GetBlockResponse {
    return {
      acceptedTime: res.timestamp,
      blockHash: res.block_hash,
      blockNumber: res.block_number,
      gasPrice: res.gas_price,
      newRoot: res.state_root,
      oldRoot: undefined,
      parentHash: res.parent_block_hash,
      sequencer: res.sequencer_address,
      status: res.status,
      transactions: Object.values(res.transactions)
        .map((value) => 'transaction_hash' in value && value.transaction_hash)
        .filter(Boolean) as Array<string>,
    };
  }

  public parseGetTransactionResponse(res: Gateway.GetTransactionResponse): GetTransactionResponse {
    return {
      calldata: 'calldata' in res.transaction ? (res.transaction.calldata as Array<string>) : [],
      contractAddress:
        'contract_address' in res.transaction ? res.transaction.contract_address : undefined,
      contractClass:
        'contract_class' in res.transaction ? (res.transaction.contract_class as any) : undefined,
      entryPointSelector:
        'entry_point_selector' in res.transaction
          ? res.transaction.entry_point_selector
          : undefined,
      maxFee: 'max_fee' in res.transaction ? (res.transaction.max_fee as string) : undefined,
      nonce: res.transaction.nonce as string,
      senderAddress:
        'sender_address' in res.transaction
          ? (res.transaction.sender_address as string)
          : undefined,
      signature: 'signature' in res.transaction ? res.transaction.signature : undefined,
      transactionHash:
        'transaction_hash' in res.transaction ? res.transaction.transaction_hash : undefined,
      version: 'version' in res.transaction ? (res.transaction.version as string) : undefined,
    };
  }

  public parseGetTransactionReceiptResponse(
    res: Gateway.TransactionReceiptResponse
  ): GetTransactionReceiptResponse {
    return {
      transactionHash: res.transaction_hash,
      actualFee: 'actual_fee' in res ? res.actual_fee : undefined,
      status: res.status,
      statusData: undefined,
      messagesSent: res.l2_to_l1_messages as any, // TODO: parse
      events: res.events as any,
      l1OriginMessage: undefined,
    };
  }

  public parseFeeEstimateResponse(res: Gateway.EstimateFeeResponse): EstimateFeeResponse {
    return {
      overallFee: toBN(res.amount),
    };
  }

  public parseCallContractResponse(res: Gateway.CallContractResponse): CallContractResponse {
    return {
      result: res.result,
    };
  }

  public parseInvokeFunctionResponse(res: Gateway.AddTransactionResponse): InvokeFunctionResponse {
    return {
      transactionHash: res.transaction_hash,
    };
  }

  public parseDeployContractResponse(res: Gateway.AddTransactionResponse): DeployContractResponse {
    return {
      transactionHash: res.transaction_hash,
      contractAddress: res.address as string,
    };
  }

  public parseDeclareContractResponse(
    res: Gateway.AddTransactionResponse
  ): DeclareContractResponse {
    return {
      transactionHash: res.transaction_hash,
      classHash: res.class_hash as string,
    };
  }
}

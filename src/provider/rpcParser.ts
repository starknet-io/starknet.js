import { RPC } from '../types/api/rpc';
import {
  CallContractResponse,
  ContractClass,
  DeclareContractResponse,
  DeployContractResponse,
  FeeEstimateResponse,
  GetBlockResponse,
  GetStateUpdateResponse,
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

  public parseGetClassResponse(res: RPC.GetClassResponse): ContractClass {
    return {
      program: res.program,
      entryPointByType: res.entry_point_by_type,
    };
  }

  public parseGetStateUpdateResponse(res: any): GetStateUpdateResponse {
    return {
      blockHash: res.block_hash,
      newRoot: res.new_root,
      oldRoot: res.old_root,
      acceptedTime: res.accepted_time,
      stateDiff: {
        storageDiffs: res.storage_diffs,
        deployedContracts: res.deployed_contracts.map((deployedContract: any) => ({
          address: deployedContract.address,
          contractHash: deployedContract.contract_hash,
        })),
        nonces: res.nonces.map(({ contract_address, nonce }: any) => ({
          nonce,
          contractAddress: contract_address,
        })),
      },
    };
  }

  public parseGetTransactionResponse(res: RPC.GetTransactionResponse): GetTransactionResponse {
    return {
      transactionHash: res.txn_hash,
      maxFee: res.max_fee,
      nonce: res.nonce,
      signature: res.signature,
      version: res.version,
      senderAddress: res.sender_address,
      contractClass: res.contract_class && this.parseGetClassResponse(res.contract_class),
      contractAddress: res.contract_address,
      entryPointSelector: res.entry_point_selector,
      calldata: res.calldata,
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

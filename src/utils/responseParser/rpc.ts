/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import {
  BlockStatus,
  CallContractResponse,
  ContractClassResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  RPC,
  SimulateTransactionResponse,
} from '../../types';
import {
  BlockWithTxHashes,
  ContractClass,
  FeeEstimate,
  SimulateTransactionResponse as RPCSimulateTransactionResponse,
  TransactionWithHash,
} from '../../types/api/rpcspec_0_6';
import { toBigInt } from '../num';
import { estimateFeeToBounds, estimatedFeeToMaxFee } from '../stark';
import { ResponseParser } from '.';

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
  public parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse {
    return {
      timestamp: res.timestamp,
      block_hash: 'block_hash' in res ? res.block_hash : '',
      block_number: 'block_number' in res ? res.block_number : -1,
      new_root: 'new_root' in res ? res.new_root : '',
      parent_hash: res.parent_hash,
      status: 'status' in res ? (res.status as BlockStatus) : BlockStatus.PENDING,
      transactions: res.transactions,
    };
  }

  public parseTransactionReceipt(res: RPC.TransactionReceipt): GetTransactionReceiptResponse {
    if (typeof res.actual_fee === 'string') {
      // This case is RPC 0.5. It can be only v2 thx with FRI units
      return {
        ...res,
        actual_fee: {
          amount: res.actual_fee,
          unit: 'FRI' as RPC.PriceUnit,
        },
      };
    }

    return res;
  }

  public parseGetTransactionResponse(res: TransactionWithHash): GetTransactionResponse {
    return {
      calldata: 'calldata' in res ? res.calldata : [],
      contract_address: 'contract_address' in res ? res.contract_address : '',
      sender_address: 'sender_address' in res ? res.sender_address : '',
      max_fee: 'max_fee' in res ? res.max_fee : '',
      nonce: 'nonce' in res ? res.nonce : '',
      signature: 'signature' in res ? res.signature : [],
      transaction_hash: res.transaction_hash,
      version: res.version,
    };
  }

  public parseFeeEstimateResponse(res: FeeEstimate[]): EstimateFeeResponse {
    const val = res[0];
    return {
      overall_fee: toBigInt(val.overall_fee),
      gas_consumed: toBigInt(val.gas_consumed),
      gas_price: toBigInt(val.gas_price),
      unit: val.unit,
      suggestedMaxFee: estimatedFeeToMaxFee(val.overall_fee),
      resourceBounds: estimateFeeToBounds(val),
    };
  }

  public parseFeeEstimateBulkResponse(res: FeeEstimate[]): EstimateFeeResponseBulk {
    return res.map((val) => ({
      overall_fee: toBigInt(val.overall_fee),
      gas_consumed: toBigInt(val.gas_consumed),
      gas_price: toBigInt(val.gas_price),
      unit: val.unit,
      suggestedMaxFee: estimatedFeeToMaxFee(val.overall_fee),
      resourceBounds: estimateFeeToBounds(val),
    }));
  }

  public parseCallContractResponse(res: string[]): CallContractResponse {
    return {
      result: res,
    };
  }

  public parseSimulateTransactionResponse(
    res: RPCSimulateTransactionResponse
  ): SimulateTransactionResponse {
    return res.map((it) => {
      return {
        ...it,
        suggestedMaxFee: estimatedFeeToMaxFee(BigInt(it.fee_estimation.overall_fee)),
      };
    });
  }

  public parseContractClassResponse(res: ContractClass): ContractClassResponse {
    return {
      ...res,
      abi: typeof res.abi === 'string' ? JSON.parse(res.abi) : res.abi,
    };
  }
}

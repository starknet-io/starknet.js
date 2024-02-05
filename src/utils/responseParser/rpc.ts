/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import {
  ContractClassResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  RPC,
  SimulateTransactionResponse,
} from '../../types';
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
      | 'parseGetTransactionResponse'
      | 'parseCallContractResponse'
    >
{
  public parseGetBlockResponse(res: RPC.BlockWithTxHashes): GetBlockResponse {
    return { status: 'PENDING', ...res };
  }

  public parseTransactionReceipt(res: RPC.TransactionReceipt): GetTransactionReceiptResponse {
    // HOTFIX RPC 0.5 to align with RPC 0.6
    // This case is RPC 0.5. It can be only v2 thx with FRI units
    if ('actual_fee' in res && typeof res.actual_fee === 'string') {
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

  public parseFeeEstimateResponse(res: RPC.FeeEstimate[]): EstimateFeeResponse {
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

  public parseFeeEstimateBulkResponse(res: RPC.FeeEstimate[]): EstimateFeeResponseBulk {
    return res.map((val) => ({
      overall_fee: toBigInt(val.overall_fee),
      gas_consumed: toBigInt(val.gas_consumed),
      gas_price: toBigInt(val.gas_price),
      unit: val.unit,
      suggestedMaxFee: estimatedFeeToMaxFee(val.overall_fee),
      resourceBounds: estimateFeeToBounds(val),
    }));
  }

  public parseSimulateTransactionResponse(
    res: RPC.SimulateTransactionResponse
  ): SimulateTransactionResponse {
    return res.map((it) => {
      return {
        ...it,
        suggestedMaxFee: estimatedFeeToMaxFee(BigInt(it.fee_estimation.overall_fee)),
        resourceBounds: estimateFeeToBounds(it.fee_estimation),
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

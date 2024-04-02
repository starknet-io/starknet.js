/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import {
  BlockWithTxHashes,
  ContractClassPayload,
  ContractClassResponse,
  TransactionReceipt,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  FeeEstimate,
  SimulateTransactionResponse,
  SimulatedTransaction,
} from '../../types/provider';
import { toBigInt } from '../num';
import { estimateFeeToBounds, estimatedFeeToMaxFee } from '../stark';
import { ResponseParser } from '.';
import { BlockWithTxs } from '../../types/api/rpcspec_0_6/nonspec';

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
  public parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse {
    return { status: 'PENDING', ...res } as GetBlockResponse;
  }

  public parseTransactionReceipt(res: TransactionReceipt): GetTransactionReceiptResponse {
    // HOTFIX RPC 0.5 to align with RPC 0.6
    // This case is RPC 0.5. It can be only v2 thx with FRI units
    if ('actual_fee' in res && typeof res.actual_fee === 'string') {
      return {
        ...(res as GetTransactionReceiptResponse),
        actual_fee: {
          amount: res.actual_fee,
          unit: 'FRI',
        },
      };
    }

    return res as GetTransactionReceiptResponse;
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

  public parseSimulateTransactionResponse(
    // TODO: revisit
    // set as 'any' to avoid a mapped type circular recursion error stemming from
    // merging src/types/api/rpcspec*/components/FUNCTION_INVOCATION.calls
    //
    // res: SimulateTransactionResponse
    res: any
  ): SimulateTransactionResponse {
    return res.map((it: SimulatedTransaction) => {
      return {
        ...it,
        suggestedMaxFee: estimatedFeeToMaxFee(BigInt(it.fee_estimation.overall_fee)),
        resourceBounds: estimateFeeToBounds(it.fee_estimation),
      };
    });
  }

  public parseContractClassResponse(res: ContractClassPayload): ContractClassResponse {
    return {
      ...(res as ContractClassResponse),
      abi: typeof res.abi === 'string' ? JSON.parse(res.abi) : res.abi,
    };
  }

  public parseGasPriceResponse(res: BlockWithTxs): string {
    return res.l1_gas_price.price_in_wei;
  }
}

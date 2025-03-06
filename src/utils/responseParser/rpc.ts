/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import type {
  ContractClassPayload,
  ContractClassResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  FeeEstimate,
  GetBlockResponse,
  GetTxReceiptResponseWithoutHelper,
  RpcProviderOptions,
  SimulateTransactionResponse,
  BlockWithTxHashes,
} from '../../provider/types/index.type';
import { toBigInt, tryToBigInt } from '../num';
import { isString } from '../typed';
import { estimateFeeToBounds, estimatedFeeToMaxFee } from '../stark';
import { ResponseParser } from './interface';
import { SimulateTransaction, TransactionReceipt } from '../../provider/types/spec.type';
// import { TransactionReceipt } from '../../types/api/merge';

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
  private margin: RpcProviderOptions['feeMarginPercentage'];

  constructor(margin?: RpcProviderOptions['feeMarginPercentage']) {
    this.margin = margin;
  }

  private estimatedFeeToMaxFee(estimatedFee: Parameters<typeof estimatedFeeToMaxFee>[0]) {
    return estimatedFeeToMaxFee(estimatedFee, this.margin?.maxFee);
  }

  // TODO: Check how to recaltulate bounds and what use this ?
  private estimateFeeToBounds(estimate: Parameters<typeof estimateFeeToBounds>[0]) {
    return estimateFeeToBounds(estimate, this.margin?.bounds);
  }

  public parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse {
    return res as GetBlockResponse;
  }

  public parseTransactionReceipt(res: TransactionReceipt): GetTxReceiptResponseWithoutHelper {
    return res as GetTxReceiptResponseWithoutHelper;
  }

  public parseFeeEstimateResponse(res: FeeEstimate[]): EstimateFeeResponse {
    const val = res[0];
    return {
      overall_fee: toBigInt(val.overall_fee),
      unit: val.unit,

      l1_gas_consumed: tryToBigInt(val.l1_gas_consumed) ?? tryToBigInt(val.gas_consumed) ?? 0n,
      l1_gas_price: tryToBigInt(val.l1_gas_price) ?? tryToBigInt(val.gas_price) ?? 0n,
      l2_gas_consumed: tryToBigInt(val.l2_gas_consumed) ?? undefined,
      l2_gas_price: tryToBigInt(val.l2_gas_price) ?? undefined,
      l1_data_gas_consumed:
        tryToBigInt(val.l1_data_gas_consumed) ?? tryToBigInt(val.data_gas_consumed) ?? 0n,
      l1_data_gas_price: tryToBigInt(val.l1_data_gas_price) ?? tryToBigInt(val.gas_price) ?? 0n,

      suggestedMaxFee: this.estimatedFeeToMaxFee(val.overall_fee),
      resourceBounds: this.estimateFeeToBounds(val),
    };
  }

  public parseFeeEstimateBulkResponse(res: FeeEstimate[]): EstimateFeeResponseBulk {
    return res.map((val) => ({
      overall_fee: toBigInt(val.overall_fee),
      unit: val.unit,

      l1_gas_consumed: tryToBigInt(val.l1_gas_consumed) ?? tryToBigInt(val.gas_consumed) ?? 0n,
      l1_gas_price: tryToBigInt(val.l1_gas_price) ?? tryToBigInt(val.gas_price) ?? 0n,
      l2_gas_consumed: tryToBigInt(val.l2_gas_consumed) ?? undefined,
      l2_gas_price: tryToBigInt(val.l2_gas_price) ?? undefined,
      l1_data_gas_consumed:
        tryToBigInt(val.l1_data_gas_consumed) ?? tryToBigInt(val.data_gas_consumed) ?? 0n,
      l1_data_gas_price: tryToBigInt(val.l1_data_gas_price) ?? tryToBigInt(val.gas_price) ?? 0n,

      suggestedMaxFee: this.estimatedFeeToMaxFee(val.overall_fee),
      resourceBounds: this.estimateFeeToBounds(val),
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
    return res.map((it: SimulateTransaction) => {
      return {
        ...it,
        suggestedMaxFee: this.estimatedFeeToMaxFee(it.fee_estimation.overall_fee),
        resourceBounds: this.estimateFeeToBounds(it.fee_estimation),
      };
    });
  }

  public parseContractClassResponse(res: ContractClassPayload): ContractClassResponse {
    return {
      ...(res as ContractClassResponse),
      abi: isString(res.abi) ? JSON.parse(res.abi) : res.abi,
    };
  }

  public parseL1GasPriceResponse(res: BlockWithTxHashes): string {
    return res.l1_gas_price.price_in_wei;
  }
}

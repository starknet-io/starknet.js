/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import type {
  ContractClassPayload,
  ContractClassResponse,
  EstimateFeeResponseOverhead,
  GetBlockResponse,
  GetTxReceiptResponseWithoutHelper,
  RpcProviderOptions,
  SimulateTransactionResponse,
  BlockWithTxHashes,
  SimulateTransactionOverheadResponse,
  EstimateFeeResponseBulkOverhead,
} from '../../provider/types/index.type';
import { isString } from '../typed';
import { toOverheadOverallFee, toOverheadResourceBounds } from '../stark';
import { ResponseParser } from './interface';
import {
  ApiEstimateFeeResponse,
  SimulateTransaction,
  TransactionReceipt,
} from '../../provider/types/spec.type';
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
  private resourceBoundsOverhead: RpcProviderOptions['resourceBoundsOverhead'];

  constructor(resourceBoundsOverhead?: RpcProviderOptions['resourceBoundsOverhead']) {
    this.resourceBoundsOverhead = resourceBoundsOverhead;
  }

  public parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse {
    return res as GetBlockResponse;
  }

  public parseTransactionReceipt(res: TransactionReceipt): GetTxReceiptResponseWithoutHelper {
    return res as GetTxReceiptResponseWithoutHelper;
  }

  public parseFeeEstimateResponse(res: ApiEstimateFeeResponse): EstimateFeeResponseOverhead {
    const val = res[0];
    return {
      resourceBounds: toOverheadResourceBounds(val, this.resourceBoundsOverhead),
      overall_fee: toOverheadOverallFee(val, this.resourceBoundsOverhead),
      unit: val.unit,
    };
  }

  public parseFeeEstimateBulkResponse(
    res: ApiEstimateFeeResponse
  ): EstimateFeeResponseBulkOverhead {
    return res.map((val) => ({
      resourceBounds: toOverheadResourceBounds(val, this.resourceBoundsOverhead),
      overall_fee: toOverheadOverallFee(val, this.resourceBoundsOverhead),
      unit: val.unit,
    }));
  }

  public parseSimulateTransactionResponse(
    res: SimulateTransactionResponse
  ): SimulateTransactionOverheadResponse {
    return res.map((it: SimulateTransaction) => {
      return {
        transaction_trace: it.transaction_trace,
        ...this.parseFeeEstimateResponse([it.fee_estimation]),
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

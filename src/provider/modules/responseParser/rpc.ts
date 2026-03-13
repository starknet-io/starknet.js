/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import type {
  ContractClassPayload,
  ContractClassResponse,
  GetBlockResponse,
  GetTxReceiptResponseWithoutHelper,
  RpcProviderOptions,
  SimulateTransactionResponse,
  BlockWithTxHashes,
  SimulateTransactionOverheadResponse,
  EstimateFeeResponseBulkOverhead,
} from '../../types/index.type';
import { RPCSPEC0101 } from '../../../types/api';
import { isString } from '../../../utils/typed';
import { toOverheadOverallFee, toOverheadResourceBounds } from '../../../utils/stark';
import { ResponseParser } from './interface';
import {
  ApiEstimateFeeResponse,
  SimulateTransaction,
  TransactionReceipt,
} from '../../types/spec.type';
// import { TransactionReceipt } from '../../types/api/merge';

export class RPCResponseParser implements Omit<
  ResponseParser,
  | 'parseDeclareContractResponse'
  | 'parseDeployContractResponse'
  | 'parseInvokeFunctionResponse'
  | 'parseGetTransactionReceiptResponse'
  | 'parseGetTransactionResponse'
  | 'parseCallContractResponse'
> {
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
    const mapTransactions = (transactions: SimulateTransaction[]) =>
      transactions.map((it) => ({
        transaction_trace: it.transaction_trace,
        resourceBounds: toOverheadResourceBounds(it.fee_estimation, this.resourceBoundsOverhead),
        overall_fee: toOverheadOverallFee(it.fee_estimation, this.resourceBoundsOverhead),
        unit: it.fee_estimation.unit,
      }));

    const isArray = Array.isArray(res);
    return {
      simulated_transactions: mapTransactions(isArray ? res : res.simulated_transactions),
      ...(!isArray && { initial_reads: res.initial_reads }),
    };
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

  public parseStorageResponse(
    res: RPCSPEC0101.FELT | RPCSPEC0101.STORAGE_RESULT
  ): RPCSPEC0101.STORAGE_RESULT {
    // Normalize response: wrap FELT (string) in STORAGE_RESULT if needed
    if (typeof res === 'string') {
      return { value: res, last_update_block: 0 };
    }
    return res;
  }
}

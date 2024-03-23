/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */
import {
  BlockWithTxHashes,
  ContractClassPayload,
  ContractClassResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  FeeEstimate,
  GetBlockResponse,
  GetTxReceiptResponseWithoutHelper,
  RpcProviderOptions,
  SimulateTransactionResponse,
  SimulatedTransaction,
  TransactionReceipt,
} from '../../types/provider';
import { toBigInt } from '../num';
import { isString } from '../shortString';
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
  private margin: RpcProviderOptions['feeMarginPercentage'];

  constructor(margin?: RpcProviderOptions['feeMarginPercentage']) {
    this.margin = margin;
  }

  /**
   * Converts the estimated fee to the maximum fee.
   *
   * @param {number} estimatedFee - The estimated fee value.
   * @return {number} - The maximum fee value.
   */
  private estimatedFeeToMaxFee(estimatedFee: Parameters<typeof estimatedFeeToMaxFee>[0]) {
    return estimatedFeeToMaxFee(estimatedFee, this.margin?.maxFee);
  }

  /**
   * Estimate the fee within the specified bounds.
   *
   * @param {object} estimate - The estimate object containing the necessary parameters.
   * @returns {object} - The estimated fee within the specified bounds.
   */
  private estimateFeeToBounds(estimate: Parameters<typeof estimateFeeToBounds>[0]) {
    return estimateFeeToBounds(
      estimate,
      this.margin?.l1BoundMaxAmount,
      this.margin?.l1BoundMaxPricePerUnit
    );
  }

  /**
   * Parses the response from a "getBlock" request.
   *
   * @param {BlockWithTxHashes} res - The response object with block information and transaction hashes.
   * @return {GetBlockResponse} - The parsed result with the status set to 'PENDING'.
   */
  public parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse {
    return { status: 'PENDING', ...res } as GetBlockResponse;
  }

  /**
   * Parses a transaction receipt and returns a processed response.
   *
   * @param {TransactionReceipt} res - The transaction receipt to parse.
   * @return {GetTransactionReceiptResponse} - The parsed transaction receipt.
   */
  public parseTransactionReceipt(res: TransactionReceipt): GetTxReceiptResponseWithoutHelper {
    // HOTFIX RPC 0.5 to align with RPC 0.6
    // This case is RPC 0.5. It can be only v2 thx with FRI units
    if ('actual_fee' in res && isString(res.actual_fee)) {
      return {
        ...(res as GetTxReceiptResponseWithoutHelper),
        actual_fee: {
          amount: res.actual_fee,
          unit: 'FRI',
        },
      } as GetTxReceiptResponseWithoutHelper;
    }

    return res as GetTxReceiptResponseWithoutHelper;
  }

  /**
   * Parses the response of a fee estimate request.
   *
   * @param {FeeEstimate[]} res - The response array of fee estimates.
   * @return {EstimateFeeResponse} The parsed fee estimate response.
   */
  public parseFeeEstimateResponse(res: FeeEstimate[]): EstimateFeeResponse {
    const val = res[0];
    return {
      overall_fee: toBigInt(val.overall_fee),
      gas_consumed: toBigInt(val.gas_consumed),
      gas_price: toBigInt(val.gas_price),
      unit: val.unit,
      suggestedMaxFee: this.estimatedFeeToMaxFee(val.overall_fee),
      resourceBounds: this.estimateFeeToBounds(val),
      data_gas_consumed: val.data_gas_consumed ? toBigInt(val.data_gas_consumed) : 0n,
      data_gas_price: val.data_gas_price ? toBigInt(val.data_gas_price) : 0n,
    };
  }

  /**
   * Parses a bulk fee estimate response.
   *
   * @param {FeeEstimate[]} res - The array of fee estimates to parse.
   * @return {EstimateFeeResponseBulk} - The parsed bulk fee estimate response.
   */
  public parseFeeEstimateBulkResponse(res: FeeEstimate[]): EstimateFeeResponseBulk {
    return res.map((val) => ({
      overall_fee: toBigInt(val.overall_fee),
      gas_consumed: toBigInt(val.gas_consumed),
      gas_price: toBigInt(val.gas_price),
      unit: val.unit,
      suggestedMaxFee: this.estimatedFeeToMaxFee(val.overall_fee),
      resourceBounds: this.estimateFeeToBounds(val),
      data_gas_consumed: val.data_gas_consumed ? toBigInt(val.data_gas_consumed) : 0n,
      data_gas_price: val.data_gas_price ? toBigInt(val.data_gas_price) : 0n,
    }));
  }

  /**
   * Parses the simulate transaction response.
   *
   * @param {any} res - The simulate transaction response.
   * @returns {SimulateTransactionResponse} - The parsed simulate transaction response.
   */
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
        suggestedMaxFee: this.estimatedFeeToMaxFee(it.fee_estimation.overall_fee),
        resourceBounds: this.estimateFeeToBounds(it.fee_estimation),
      };
    });
  }

  /**
   * Parses the contract class response.
   *
   * @param {ContractClassPayload} res - The response payload to parse.
   * @return {ContractClassResponse} - The parsed contract class response.
   */
  public parseContractClassResponse(res: ContractClassPayload): ContractClassResponse {
    return {
      ...(res as ContractClassResponse),
      abi: isString(res.abi) ? JSON.parse(res.abi) : res.abi,
    };
  }
}

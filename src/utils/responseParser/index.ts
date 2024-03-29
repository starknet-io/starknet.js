import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  GetBlockResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
  SimulateTransactionResponse,
} from '../../types';
import type { GetTransactionReceiptResponse } from '../transactionReceipt';

export abstract class ResponseParser {
  abstract parseGetBlockResponse(res: any): GetBlockResponse;

  abstract parseGetTransactionResponse(res: any): GetTransactionResponse;

  abstract parseGetTransactionReceiptResponse(res: any): GetTransactionReceiptResponse;

  abstract parseFeeEstimateResponse(res: any): EstimateFeeResponse;

  abstract parseCallContractResponse(res: any): CallContractResponse;

  abstract parseInvokeFunctionResponse(res: any): InvokeFunctionResponse;

  abstract parseDeployContractResponse(res: any): DeployContractResponse;

  abstract parseDeclareContractResponse(res: any): DeclareContractResponse;

  abstract parseSimulateTransactionResponse(res: any): SimulateTransactionResponse;
}

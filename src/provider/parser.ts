import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  FeeEstimateResponse,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  InvokeContractResponse,
} from './abstractProvider';

export abstract class ResponseParser {
  abstract parseGetBlockResponse(res: any): GetBlockResponse;

  abstract parseGetTransactionResponse(res: any): GetTransactionResponse;

  abstract parseGetTransactionReceiptResponse(res: any): GetTransactionReceiptResponse;

  abstract parseFeeEstimateResponse(res: any): FeeEstimateResponse;

  abstract parseCallContractResponse(res: any): CallContractResponse;

  abstract parseInvokeContractResponse(res: any): InvokeContractResponse;

  abstract parseDeployContractResponse(res: any): DeployContractResponse;

  abstract parseDeclareContractResponse(res: any): DeclareContractResponse;
}

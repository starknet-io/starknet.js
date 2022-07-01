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

export abstract class ResponseParser {
  abstract parseGetBlockResponse(res: any): GetBlockResponse;

  abstract parseGetClassResponse(res: any): ContractClass;

  abstract parseGetStateUpdateResponse(res: any): GetStateUpdateResponse;

  abstract parseGetTransactionResponse(res: any): GetTransactionResponse;

  abstract parseGetTransactionReceiptResponse(res: any): GetTransactionReceiptResponse;

  abstract parseFeeEstimateResponse(res: any): FeeEstimateResponse;

  abstract parseCallContractResponse(res: any): CallContractResponse;

  abstract parseInvokeContractResponse(res: any): InvokeContractResponse;

  abstract parseDeployContractResponse(res: any): DeployContractResponse;

  abstract parseDeclareContractResponse(res: any): DeclareContractResponse;
}

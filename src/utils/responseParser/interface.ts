import {
  CallContractResponse,
  DeclareContractResponse,
  DeployContractResponse,
  GetBlockResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
  BlockWithTxHashes,
  SimulateTransactionOverheadResponse,
} from '../../types';
import type { GetTransactionReceiptResponse } from '../transactionReceipt/transactionReceipt.type';

export abstract class ResponseParser {
  abstract parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse;

  abstract parseGetTransactionResponse(res: any): GetTransactionResponse;

  abstract parseGetTransactionReceiptResponse(res: any): GetTransactionReceiptResponse;

  abstract parseCallContractResponse(res: any): CallContractResponse;

  abstract parseInvokeFunctionResponse(res: any): InvokeFunctionResponse;

  abstract parseDeployContractResponse(res: any): DeployContractResponse;

  abstract parseDeclareContractResponse(res: any): DeclareContractResponse;

  abstract parseSimulateTransactionResponse(res: any): SimulateTransactionOverheadResponse;
}

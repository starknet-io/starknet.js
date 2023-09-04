/**
 * Map Sequencer Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

import { LibraryError } from '../../provider/errors';
import {
  CallContractResponse,
  CompiledContract,
  ContractClassResponse,
  DeclareContractResponse,
  DeployContractResponse,
  EstimateFeeResponse,
  EstimateFeeResponseBulk,
  GetBlockResponse,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  HexCalldata,
  InvokeFunctionResponse,
  Sequencer,
  SimulateTransactionResponse,
  StateUpdateResponse,
  TransactionFinalityStatus,
  TransactionStatus,
} from '../../types';
import { isSierra } from '../contract';
import { toBigInt } from '../num';
import { parseContract } from '../provider';
import { estimatedFeeToMaxFee } from '../stark';
import { ResponseParser } from '.';

export class SequencerAPIResponseParser extends ResponseParser {
  public parseGetBlockResponse(res: Sequencer.GetBlockResponse): GetBlockResponse {
    return {
      ...res,
      new_root: res.state_root,
      parent_hash: res.parent_block_hash,
      transactions: Object.values(res.transactions)
        .map((value) => 'transaction_hash' in value && value.transaction_hash)
        .filter(Boolean) as Array<string>,
    };
  }

  public parseGetTransactionResponse(
    res: Sequencer.GetTransactionResponse
  ): GetTransactionResponse {
    if (
      res.status === TransactionStatus.NOT_RECEIVED &&
      res.finality_status === TransactionFinalityStatus.NOT_RECEIVED
    ) {
      throw new LibraryError();
    }

    return {
      ...res,
      calldata: 'calldata' in res.transaction ? (res.transaction.calldata as HexCalldata) : [],
      contract_class:
        'contract_class' in res.transaction ? (res.transaction.contract_class as any) : undefined,
      entry_point_selector:
        'entry_point_selector' in res.transaction
          ? res.transaction.entry_point_selector
          : undefined,
      max_fee: 'max_fee' in res.transaction ? (res.transaction.max_fee as string) : undefined,
      nonce: res.transaction.nonce as string,
      sender_address:
        'sender_address' in res.transaction
          ? (res.transaction.sender_address as string)
          : undefined,
      signature: 'signature' in res.transaction ? res.transaction.signature : undefined,
      transaction_hash:
        'transaction_hash' in res.transaction ? res.transaction.transaction_hash : undefined,
      version: 'version' in res.transaction ? (res.transaction.version as string) : undefined,
    };
  }

  public parseGetTransactionReceiptResponse(
    res: Sequencer.TransactionReceiptResponse
  ): GetTransactionReceiptResponse {
    return {
      ...res,
      messages_sent: res.l2_to_l1_messages as any,
      ...('revert_error' in res && { revert_reason: res.revert_error }),
    };
  }

  public parseFeeEstimateResponse(res: Sequencer.EstimateFeeResponse): EstimateFeeResponse {
    if ('overall_fee' in res) {
      let gasInfo = {};

      try {
        gasInfo = {
          gas_consumed: toBigInt(res.gas_usage),
          gas_price: toBigInt(res.gas_price),
        };
      } catch {
        // do nothing
      }

      return {
        overall_fee: toBigInt(res.overall_fee),
        ...gasInfo,
      };
    }
    return {
      overall_fee: toBigInt(res.amount),
    };
  }

  public parseFeeEstimateBulkResponse(
    res: Sequencer.EstimateFeeResponseBulk
  ): EstimateFeeResponseBulk {
    return [].concat(res as []).map((item: Sequencer.EstimateFeeResponse) => {
      if ('overall_fee' in item) {
        let gasInfo = {};

        try {
          gasInfo = {
            gas_consumed: toBigInt(item.gas_usage),
            gas_price: toBigInt(item.gas_price),
          };
        } catch {
          // do nothing
        }

        return {
          overall_fee: toBigInt(item.overall_fee),
          ...gasInfo,
        };
      }
      return {
        overall_fee: toBigInt(item.amount),
      };
    });
  }

  public parseSimulateTransactionResponse(
    res: Sequencer.SimulateTransactionResponse
  ): SimulateTransactionResponse {
    const suggestedMaxFee =
      'overall_fee' in res.fee_estimation
        ? res.fee_estimation.overall_fee
        : res.fee_estimation.amount;
    return [
      {
        transaction_trace: res.trace,
        fee_estimation: res.fee_estimation,
        suggestedMaxFee: estimatedFeeToMaxFee(BigInt(suggestedMaxFee)),
      },
    ];
  }

  public parseCallContractResponse(res: Sequencer.CallContractResponse): CallContractResponse {
    return {
      result: res.result,
    };
  }

  public parseInvokeFunctionResponse(
    res: Sequencer.AddTransactionResponse
  ): InvokeFunctionResponse {
    return {
      transaction_hash: res.transaction_hash,
    };
  }

  public parseDeployContractResponse(
    res: Sequencer.AddTransactionResponse
  ): DeployContractResponse {
    return {
      transaction_hash: res.transaction_hash,
      contract_address: res.address as string,
    };
  }

  public parseDeclareContractResponse(
    res: Sequencer.AddTransactionResponse
  ): DeclareContractResponse {
    return {
      transaction_hash: res.transaction_hash,
      class_hash: res.class_hash as string,
    };
  }

  public parseGetStateUpdateResponse(res: Sequencer.StateUpdateResponse): StateUpdateResponse {
    const nonces = Object.entries(res.state_diff.nonces).map(([contract_address, nonce]) => ({
      contract_address,
      nonce,
    }));
    const storage_diffs = Object.entries(res.state_diff.storage_diffs).map(
      ([address, storage_entries]) => ({ address, storage_entries })
    );

    return {
      ...res,
      state_diff: {
        ...res.state_diff,
        storage_diffs,
        nonces,
      },
    };
  }

  public parseContractClassResponse(res: CompiledContract): ContractClassResponse {
    const response = isSierra(res) ? res : parseContract(res);
    return {
      ...response,
      abi: typeof response.abi === 'string' ? JSON.parse(response.abi) : response.abi,
    };
  }
}

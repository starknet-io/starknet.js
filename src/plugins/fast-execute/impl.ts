import type { BigNumberish } from '../../types';
import { BlockTag } from '../../types';
import type { ProviderInterface } from '../../provider/interface';
import type { AccountInterface } from '../../account/interface';
import type { InvokeFunctionResponse } from '../../provider/types/response.type';
import { logger } from '../../global/logger';
import { wait } from '../../utils/provider';
import assert from '../../utils/assert';
import type { FastWaitForTransactionOptions, FastExecuteResponse } from './types';

/**
 * Static implementation of fast execute functionality
 * This is the core logic for gaming-optimized transaction execution
 */
export class FastExecuteImpl {
  /**
   * Wait for transaction with polling-optimized confirmation
   * Only available on RPC 0.9+, requires PRE_CONFIRMED block identifier
   */
  static async fastWaitForTransaction(
    provider: ProviderInterface,
    txHash: BigNumberish,
    address: string,
    initNonceBN: BigNumberish,
    options?: FastWaitForTransactionOptions
  ): Promise<boolean> {
    const initNonce = BigInt(initNonceBN);
    let retries = options?.retries ?? 50;
    const retryInterval = options?.retryInterval ?? 500; // 0.5s

    // Define transaction states
    const errorStates = ['REVERTED'];
    const successStates = ['ACCEPTED_ON_L2', 'ACCEPTED_ON_L1', 'PRE_CONFIRMED'];

    const start = new Date().getTime();

    while (retries > 0) {
      // eslint-disable-next-line no-await-in-loop
      await wait(retryInterval);

      // eslint-disable-next-line no-await-in-loop
      const txStatus = await provider.getTransactionStatus(txHash);

      logger.info(
        `fastWaitForTransaction: ${retries} retries left, status: ${JSON.stringify(txStatus)}, elapsed: ${(new Date().getTime() - start) / 1000}s.`
      );

      const executionStatus = txStatus.execution_status ?? '';
      const finalityStatus = txStatus.finality_status;

      if (errorStates.includes(executionStatus)) {
        const message = `${executionStatus}: ${finalityStatus}`;
        const error = new Error(message) as Error & { response: any };
        error.response = txStatus;
        throw error;
      } else if (successStates.includes(finalityStatus)) {
        let currentNonce = initNonce;
        while (currentNonce === initNonce && retries > 0) {
          // eslint-disable-next-line no-await-in-loop
          currentNonce = BigInt(await provider.getNonceForAddress(address, BlockTag.PRE_CONFIRMED));

          logger.info(
            `fastWaitForTransaction: checking new nonce ${currentNonce}, initial was ${initNonce}, elapsed: ${(new Date().getTime() - start) / 1000}s.`
          );

          if (currentNonce !== initNonce) {
            return true;
          }

          // eslint-disable-next-line no-await-in-loop
          await wait(retryInterval);
          retries -= 1;
        }
        return false;
      }

      retries -= 1;
    }

    return false;
  }

  /**
   * Execute transaction with fast confirmation waiting
   * Combines execute() with optimized polling for next transaction
   */
  static async fastExecute(
    account: AccountInterface,
    transactions: any,
    transactionsDetail: any = {},
    waitDetail: FastWaitForTransactionOptions = {}
  ): Promise<FastExecuteResponse> {
    // Get the channel to verify it has PRE_CONFIRMED block identifier
    const { channel } = account.provider as any;

    assert(
      channel.blockIdentifier === BlockTag.PRE_CONFIRMED,
      'Provider needs to be initialized with `pre_confirmed` blockIdentifier option.'
    );

    // Get initial nonce
    const initNonce = BigInt(
      transactionsDetail.nonce ??
        (await account.provider.getNonceForAddress(account.address, BlockTag.PRE_CONFIRMED))
    );

    // Execute transaction
    const details = { ...transactionsDetail, nonce: initNonce };
    const resultTx: InvokeFunctionResponse = await account.execute(transactions, details);

    // Wait for next transaction readiness
    const isReady = await FastExecuteImpl.fastWaitForTransaction(
      account.provider,
      resultTx.transaction_hash,
      account.address,
      initNonce,
      waitDetail
    );

    return { txResult: resultTx, isReady };
  }
}

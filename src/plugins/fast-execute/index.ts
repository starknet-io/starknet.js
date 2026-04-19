import type { ProviderInterface } from '../../provider/interface';
import type { AccountInterface } from '../../account/interface';
import type { StarknetPlugin } from '../types';
import { FastExecuteImpl } from './impl';
import type {
  FastWaitForTransactionOptions,
  FastExecuteResponse,
  FastExecuteProviderMethods,
  FastExecuteAccountMethods,
} from './types';

/**
 * FastExecute plugin - adds gaming-optimized transaction execution
 *
 * Provides fastExecute() on accounts and fastWaitForTransaction() on providers
 * for rapid successive transaction execution with minimal confirmation latency.
 *
 * Requires:
 * - RPC 0.9 or later
 * - Provider initialized with BlockTag.PRE_CONFIRMED
 *
 * @example
 * ```typescript
 * import { RpcProvider, Account } from 'starknet';
 * import { fastExecute } from 'starknet/plugins';
 *
 * const provider = new RpcProvider({
 *   nodeUrl: url,
 *   blockIdentifier: BlockTag.PRE_CONFIRMED,
 * });
 *
 * const account = new Account({ provider, address, signer });
 *
 * const resp = await account.fastExecute(
 *   call,
 *   { tip: recommendedTip },
 *   { retries: 30, retryInterval: 500 }
 * );
 *
 * if (resp.isReady) {
 *   // Next transaction can be sent immediately
 * }
 * ```
 */
export function fastExecute(): StarknetPlugin<
  FastExecuteProviderMethods,
  FastExecuteAccountMethods
> {
  return {
    name: 'fast-execute',

    extend(provider: ProviderInterface): FastExecuteProviderMethods {
      return {
        fastWaitForTransaction: (txHash, address, initNonce, options) =>
          FastExecuteImpl.fastWaitForTransaction(provider, txHash, address, initNonce, options),
      };
    },

    accountExtend(account: AccountInterface): FastExecuteAccountMethods {
      return {
        fastExecute: (transactions, details, waitDetail) =>
          FastExecuteImpl.fastExecute(account, transactions, details, waitDetail),
      };
    },
  };
}

// Export types for plugin consumers
export type {
  FastWaitForTransactionOptions,
  FastExecuteResponse,
  FastExecuteProviderMethods,
  FastExecuteAccountMethods,
};

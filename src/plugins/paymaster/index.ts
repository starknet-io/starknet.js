import type { AccountInterface } from '../../account/interface';
import type { ContractInterface } from '../../contract/interface';
import type { Call } from '../../types';
import type { StarknetPlugin } from '../types';
import { PaymasterPluginImpl } from './impl';
import { PaymasterRpc } from './rpc';
import { PaymasterInterface } from './interface';
import type { PaymasterOptions } from './types/configuration.type';
import type { PaymasterAccountMethods, PaymasterContractMethods } from './types';

/**
 * Paymaster plugin - adds SNIP-29 paymaster transaction support
 *
 * Provides paymaster transaction building, estimation, and execution on accounts.
 * Auto-configures using PAYMASTER_RPC_NODES defaults when no options are provided.
 *
 * @param options - Optional PaymasterOptions or PaymasterInterface instance
 *
 * @example
 * ```typescript
 * import { Account } from 'starknet';
 *
 * // Default (auto-configured from PAYMASTER_RPC_NODES):
 * const account = new Account({ provider, address, signer });
 * await account.executePaymasterTransaction(calls, { feeMode: { mode: 'sponsored' } });
 *
 * // Custom paymaster URL:
 * const account = new Account({
 *   provider, address, signer,
 *   plugins: { paymaster: { nodeUrl: 'https://custom.paymaster.url' } },
 * });
 * ```
 */
export function paymaster(
  options?: PaymasterOptions | PaymasterInterface
): StarknetPlugin<Record<string, never>, PaymasterAccountMethods, PaymasterContractMethods> {
  return {
    name: 'paymaster',

    accountExtend(account: AccountInterface): PaymasterAccountMethods {
      const pm = options instanceof PaymasterInterface ? options : new PaymasterRpc(options);

      return {
        buildPaymasterTransaction: (calls, paymasterDetails) =>
          PaymasterPluginImpl.build(account, pm, calls, paymasterDetails),
        estimatePaymasterTransactionFee: (calls, paymasterDetails) =>
          PaymasterPluginImpl.estimate(account, pm, calls, paymasterDetails),
        preparePaymasterTransaction: (preparedTransaction) =>
          PaymasterPluginImpl.prepare(account, preparedTransaction),
        executePaymasterTransaction: (calls, paymasterDetails, maxFeeInGasToken) =>
          PaymasterPluginImpl.execute(account, pm, calls, paymasterDetails, maxFeeInGasToken),
        isPaymasterAvailable: () => pm.isAvailable(),
        getPaymasterSupportedTokens: () => pm.getSupportedTokens(),
        paymaster: pm,
      };
    },

    contractExtend(
      contract: ContractInterface,
      account: AccountInterface
    ): PaymasterContractMethods {
      const acc = account as AccountInterface & PaymasterAccountMethods;
      return {
        invokePaymaster(method, args, paymasterDetails, maxFeeInGasToken?) {
          const call = contract.populate(method, args ?? []) as Call;
          return acc.executePaymasterTransaction([call], paymasterDetails, maxFeeInGasToken);
        },
        estimatePaymaster(method, args, paymasterDetails) {
          const call = contract.populate(method, args ?? []) as Call;
          return acc.estimatePaymasterTransactionFee([call], paymasterDetails);
        },
      };
    },
  };
}

// Re-export for end users
export { PaymasterInterface } from './interface';
export { PaymasterRpc } from './rpc';
export * from './utils';
export * from './types/index.type';
export type { PaymasterAccountMethods, PaymasterContractMethods } from './types';

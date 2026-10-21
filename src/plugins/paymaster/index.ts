import type { Account } from '../../account/default';
import type { AccountInterface } from '../../account/interface';
import type { StarknetPlugin } from '../types';
import { PaymasterImpl } from './impl';
import type { PaymasterInterface } from './interface';
import { PaymasterRpc } from './rpc';
import type { PaymasterOptions } from './types/configuration.type';
import type { PaymasterAccountMethods } from './types/plugin.type';

/** The name of the paymaster plugin. An account installs only one plugin with this name. */
const PAYMASTER_PLUGIN_NAME = 'paymaster';

/**
 * Paymaster plugin: adds the SNIP-29 paymaster members to an Account. They are `paymaster`,
 * `buildPaymasterTransaction`, `estimatePaymasterTransactionFee`, `preparePaymasterTransaction`
 * and `executePaymasterTransaction`. It is a default plugin. It adds nothing to a provider.
 *
 * The plugin does not add a method that the account already has: when a subclass of Account
 * redefines a paymaster method, its method is kept.
 * @param {PaymasterOptions | PaymasterInterface} [options] The paymaster to use: the options of a
 * `PaymasterRpc`, or a paymaster instance. Without them, the account uses a public paymaster
 * service, and no message is logged.
 * @returns {StarknetPlugin<Record<string, never>, PaymasterAccountMethods>} The plugin.
 * @example
 * ```typescript
 * const myAccount = new Account({
 *   provider: myProvider,
 *   address: accountAddress,
 *   signer: privateKey,
 *   plugins: [fastExecute(), paymasterPlugin({ nodeUrl: 'https://sepolia.paymaster.avnu.fi' })],
 * });
 * // myAccount.paymaster.nodeUrl = 'https://sepolia.paymaster.avnu.fi'
 * ```
 */
export function paymasterPlugin(
  options?: PaymasterOptions | PaymasterInterface
): StarknetPlugin<Record<string, never>, PaymasterAccountMethods> {
  return {
    name: PAYMASTER_PLUGIN_NAME,

    accountExtend(account: AccountInterface): PaymasterAccountMethods {
      // The paymaster methods need members that only Account has, like getSnip9Version.
      const target = account as Account;
      const members: PaymasterAccountMethods = {
        paymaster: options ? new PaymasterRpc(options) : new PaymasterRpc({ mute: true }),
        buildPaymasterTransaction: (calls, paymasterDetails) =>
          PaymasterImpl.build(target, calls, paymasterDetails),
        estimatePaymasterTransactionFee: (calls, paymasterDetails) =>
          PaymasterImpl.estimate(target, calls, paymasterDetails),
        preparePaymasterTransaction: (
          preparedTransaction,
          calls,
          paymasterDetails,
          maxFeeInGasToken
        ) =>
          PaymasterImpl.prepare(
            target,
            preparedTransaction,
            calls,
            paymasterDetails,
            maxFeeInGasToken
          ),
        executePaymasterTransaction: (calls, paymasterDetails, maxFeeInGasToken) =>
          PaymasterImpl.execute(target, calls, paymasterDetails, maxFeeInGasToken),
      };
      // A subclass of Account can redefine a paymaster method. Keep its method: do not add ours.
      return Object.fromEntries(
        Object.entries(members).filter(([name]) => !(name in account))
      ) as PaymasterAccountMethods;
    },
  };
}

/**
 * Applies the `paymaster` option of an Account to its list of plugins. The option wins over the
 * list: it installs the paymaster plugin even with `plugins: false` or with a list without it, and
 * it replaces the paymaster plugin of the list. Without the option, the list does not change.
 * @param {StarknetPlugin<any, any>[]} plugins The plugins chosen for the account.
 * @param {PaymasterOptions | PaymasterInterface} [paymaster] The `paymaster` option of the account.
 * @returns {StarknetPlugin<any, any>[]} The plugins to install on the account.
 * @example
 * ```typescript
 * const plugins = applyPaymasterOption([fastExecute()], {
 *   nodeUrl: 'https://sepolia.paymaster.avnu.fi',
 * });
 * // plugins.map((plugin) => plugin.name) = ['fast-execute', 'paymaster']
 * ```
 */
export function applyPaymasterOption(
  plugins: StarknetPlugin<any, any>[],
  paymaster?: PaymasterOptions | PaymasterInterface
): StarknetPlugin<any, any>[] {
  // Same test as before the plugin existed: a falsy value means "no paymaster option".
  if (!paymaster) return plugins;
  const configured = paymasterPlugin(paymaster);
  return plugins.some((plugin) => plugin.name === PAYMASTER_PLUGIN_NAME)
    ? plugins.map((plugin) => (plugin.name === PAYMASTER_PLUGIN_NAME ? configured : plugin))
    : [...plugins, configured];
}

export { PaymasterInterface } from './interface';
export { PaymasterRpc } from './rpc';
export type { PaymasterAccountMethods } from './types/plugin.type';

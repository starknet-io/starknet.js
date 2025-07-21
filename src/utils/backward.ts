/**
 * Backward compatibility utilities for migrating from arguments-based to object-based APIs
 */

import { Account } from '../account';
import { Contract } from '../contract';
import type { SupportedTransactionVersion } from '../global/constants';
import type { PaymasterInterface } from '../paymaster';
import type { SignerInterface } from '../signer';
import type {
  Abi,
  AccountOptions,
  CairoVersion,
  PaymasterOptions,
  ProviderOrAccount,
} from '../types';
import { WalletAccount } from '../wallet';
import type { StarknetWalletProvider, WalletAccountV4Options } from '../wallet/types/index.type';

/**
 * Backward compatibility method to create Contract instances using the old arguments-based API
 *
 * @deprecated Use `new Contract({ abi, address, providerOrAccount })` instead
 * @param abi - Contract ABI
 * @param address - Contract address
 * @param providerOrAccount - Provider or Account instance
 * @returns Contract instance
 *
 * @example
 * ```typescript
 * // Old API (deprecated)
 * const contract = createContract(abi, address, provider);
 *
 * // New API (recommended)
 * const contract = new Contract({ abi, address, providerOrAccount: provider });
 * ```
 */
export function createContract(
  abi: Abi,
  address: string,
  providerOrAccount: ProviderOrAccount
): Contract {
  return new Contract({
    abi,
    address,
    providerOrAccount,
  });
}

/**
 * Backward compatibility method to create Account instances using the old arguments-based API
 *
 * @deprecated Use `new Account({ provider, address, signer, ... })` instead
 * @param provider - Provider instance or options
 * @param address - Account address
 * @param signer - Signer interface, private key string, or Uint8Array
 * @param cairoVersion - Optional Cairo version
 * @param transactionVersion - Optional transaction version
 * @param paymaster - Optional paymaster configuration
 * @returns Account instance
 *
 * @example
 * ```typescript
 * // Old API (deprecated)
 * const account = createAccount(provider, address, privateKey, '1', 'v3', paymasterConfig);
 *
 * // New API (recommended)
 * const account = new Account({
 *   provider,
 *   address,
 *   signer: privateKey,
 *   cairoVersion: '1',
 *   transactionVersion: 'v3',
 *   paymaster: paymasterConfig
 * });
 * ```
 */
export function createAccount(
  provider: AccountOptions['provider'],
  address: string,
  signer: Uint8Array | string | SignerInterface,
  cairoVersion?: CairoVersion,
  transactionVersion?: SupportedTransactionVersion,
  paymaster?: PaymasterOptions | PaymasterInterface
): Account {
  return new Account({
    provider,
    address,
    signer,
    ...(cairoVersion && { cairoVersion }),
    ...(transactionVersion && { transactionVersion }),
    ...(paymaster && { paymaster }),
  });
}

/**
 * Backward compatibility method to create WalletAccount instances using the old arguments-based API
 *
 * @deprecated Use `new WalletAccount({ provider, walletProvider, address, ... })` instead
 * @param provider - Provider instance or options
 * @param walletProvider - Starknet wallet provider (from get-starknet or similar)
 * @param address - Account address
 * @param cairoVersion - Optional Cairo version
 * @param paymaster - Optional paymaster configuration
 * @returns WalletAccount instance
 *
 * @example
 * ```typescript
 * // Old API (deprecated)
 * const walletAccount = createWalletAccount(provider, walletProvider, address, '1', paymasterConfig);
 *
 * // New API (recommended)
 * const walletAccount = new WalletAccount({
 *   provider,
 *   walletProvider,
 *   address,
 *   cairoVersion: '1',
 *   paymaster: paymasterConfig
 * });
 * ```
 */
export function createWalletAccount(
  provider: WalletAccountV4Options['provider'],
  walletProvider: StarknetWalletProvider,
  address: string,
  cairoVersion?: CairoVersion,
  paymaster?: PaymasterOptions | PaymasterInterface
): WalletAccount {
  return new WalletAccount({
    provider,
    walletProvider,
    address,
    ...(cairoVersion && { cairoVersion }),
    ...(paymaster && { paymaster }),
  });
}

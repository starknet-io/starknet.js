import type { WalletWithStarknetFeatures as WalletWithStarknetFeaturesV6 } from '@starknet-io/get-starknet-wallet-standard-v6/features';
import type {
  StandardConnectOutput,
  StandardEventsChangeProperties,
} from '@wallet-standard/features';
import {
  type WatchAssetParameters,
  type AddDeclareTransactionParameters,
  type AddInvokeTransactionParameters,
  type AddStarknetChainParameters,
  type ChainId,
  type TypedData,
  type Permission,
  type Address,
  type AddInvokeTransactionResult,
  type AddDeclareTransactionResult,
  type AccountDeploymentData,
  type Signature,
  type SpecVersion,
  type STRK20_ACTION,
  type STRK20_CALL_AND_PROOF,
  type STRK20_BALANCE_ENTRY,
  type API_VERSION,
} from '@starknet-io/starknet-types-0103';

/**
 * Connect the DApp to the wallet through the wallet-standard `standard:connect` feature.
 *
 * Besides authorizing the accounts, this primes the wallet-standard wrapper internal
 * state (its `#account`). This priming is mandatory: the wrapper only bridges the wallet
 * legacy `accountsChanged` / `networkChanged` events to the `standard:events` "change"
 * event (consumed by {@link subscribeWalletEvent}) once it has been connected this way.
 * Without it, account/network change events never reach the DApp.
 * @param {WalletWithStarknetFeaturesV6} walletWSF - The get-starknet V6 wallet object to use.
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed accounts.
 * @returns {StandardConnectOutput} the wallet-standard accounts the DApp is authorized to use.
 */
export function standardConnect(
  walletWSF: WalletWithStarknetFeaturesV6,
  silent_mode: boolean = false
): Promise<StandardConnectOutput> {
  return walletWSF.features['standard:connect'].connect({ silent: silent_mode });
}

export function requestAccounts(
  walletWSF: WalletWithStarknetFeaturesV6,
  silent_mode: boolean = false
): Promise<Address[]> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_requestAccounts',
    params: { silent_mode },
  });
}

export function getPermissions(walletWSF: WalletWithStarknetFeaturesV6): Promise<Permission[]> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_getPermissions' });
}

export function watchAsset(
  walletWSF: WalletWithStarknetFeaturesV6,
  asset: WatchAssetParameters
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_watchAsset',
    params: asset,
  });
}

export function addStarknetChain(
  walletWSF: WalletWithStarknetFeaturesV6,
  chain: AddStarknetChainParameters
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addStarknetChain',
    params: chain,
  });
}

export function switchStarknetChain(
  walletWSF: WalletWithStarknetFeaturesV6,
  chainId: ChainId,
  silent_mode: boolean = false
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_switchStarknetChain',
    params: { chainId, silent_mode },
  });
}

export function requestChainId(walletWSF: WalletWithStarknetFeaturesV6): Promise<ChainId> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_requestChainId' });
}

export function deploymentData(
  walletWSF: WalletWithStarknetFeaturesV6
): Promise<AccountDeploymentData> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_deploymentData' });
}

export function addInvokeTransaction(
  walletWSF: WalletWithStarknetFeaturesV6,
  params: AddInvokeTransactionParameters
): Promise<AddInvokeTransactionResult> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addInvokeTransaction',
    params,
  });
}

export function addDeclareTransaction(
  walletWSF: WalletWithStarknetFeaturesV6,
  params: AddDeclareTransactionParameters
): Promise<AddDeclareTransactionResult> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addDeclareTransaction',
    params,
  });
}

export function signMessage(
  walletWSF: WalletWithStarknetFeaturesV6,
  typedData: TypedData
): Promise<Signature> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_signTypedData',
    params: typedData,
  });
}

export function supportedSpecs(walletWSF: WalletWithStarknetFeaturesV6): Promise<SpecVersion[]> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedSpecs' });
}

export function supportedWalletApi(
  walletWSF: WalletWithStarknetFeaturesV6
): Promise<API_VERSION[]> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedWalletApi' });
}

export function subscribeWalletEvent(
  walletWSF: WalletWithStarknetFeaturesV6,
  callback: (change: StandardEventsChangeProperties) => void
): () => void {
  return walletWSF.features['standard:events'].on('change', callback);
}

export function strk20Balances(
  walletWSF: WalletWithStarknetFeaturesV6,
  tokens: Address[]
): Promise<STRK20_BALANCE_ENTRY[]> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20Balances',
    params: { tokens },
  });
}

export function strk20PrepareInvoke(
  walletWSF: WalletWithStarknetFeaturesV6,
  actions: STRK20_ACTION[],
  simulate?: boolean
): Promise<STRK20_CALL_AND_PROOF> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20PrepareInvoke',
    params: { actions, simulate },
  });
}

export function strk20InvokeTransaction(
  walletWSF: WalletWithStarknetFeaturesV6,
  actions: STRK20_ACTION[]
): Promise<{ transaction_hash: string }> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20InvokeTransaction',
    params: { actions },
  });
}

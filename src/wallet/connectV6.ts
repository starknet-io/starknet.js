import type { WalletWithStarknetFeatures } from '@starknet-io/get-starknet-wallet-standard-v6/features';
import type { StandardEventsChangeProperties } from '@wallet-standard/features';
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
} from '@starknet-io/starknet-types-0103';

export function requestAccounts(
  walletWSF: WalletWithStarknetFeatures,
  silent_mode: boolean = false
): Promise<Address[]> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_requestAccounts',
    params: { silent_mode },
  });
}

export function getPermissions(walletWSF: WalletWithStarknetFeatures): Promise<Permission[]> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_getPermissions' });
}

export function watchAsset(
  walletWSF: WalletWithStarknetFeatures,
  asset: WatchAssetParameters
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_watchAsset',
    params: asset,
  });
}

export function addStarknetChain(
  walletWSF: WalletWithStarknetFeatures,
  chain: AddStarknetChainParameters
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addStarknetChain',
    params: chain,
  });
}

export function switchStarknetChain(
  walletWSF: WalletWithStarknetFeatures,
  chainId: ChainId
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_switchStarknetChain',
    params: { chainId },
  });
}

export function requestChainId(walletWSF: WalletWithStarknetFeatures): Promise<ChainId> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_requestChainId' });
}

export function deploymentData(
  walletWSF: WalletWithStarknetFeatures
): Promise<AccountDeploymentData> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_deploymentData' });
}

export function addInvokeTransaction(
  walletWSF: WalletWithStarknetFeatures,
  params: AddInvokeTransactionParameters
): Promise<AddInvokeTransactionResult> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addInvokeTransaction',
    params,
  });
}

export function addDeclareTransaction(
  walletWSF: WalletWithStarknetFeatures,
  params: AddDeclareTransactionParameters
): Promise<AddDeclareTransactionResult> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addDeclareTransaction',
    params,
  });
}

export function signMessage(
  walletWSF: WalletWithStarknetFeatures,
  typedData: TypedData
): Promise<Signature> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_signTypedData',
    params: typedData,
  });
}

export function supportedSpecs(walletWSF: WalletWithStarknetFeatures): Promise<SpecVersion[]> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedSpecs' });
}

export function subscribeWalletEvent(
  walletWSF: WalletWithStarknetFeatures,
  callback: (change: StandardEventsChangeProperties) => void
): () => void {
  return walletWSF.features['standard:events'].on('change', callback);
}

export function strk20Balances(
  walletWSF: WalletWithStarknetFeatures,
  tokens: Address[]
): Promise<STRK20_BALANCE_ENTRY[]> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20Balances',
    params: { tokens },
  });
}

export function strk20PrepareInvoke(
  walletWSF: WalletWithStarknetFeatures,
  actions: STRK20_ACTION[],
  simulate?: boolean
): Promise<STRK20_CALL_AND_PROOF> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20PrepareInvoke',
    params: { actions, simulate },
  });
}

export function strk20InvokeTransaction(
  walletWSF: WalletWithStarknetFeatures,
  actions: STRK20_ACTION[]
): Promise<{ transaction_hash: string }> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20InvokeTransaction',
    params: { actions },
  });
}

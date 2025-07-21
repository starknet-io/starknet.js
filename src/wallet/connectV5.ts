import type { WalletWithStarknetFeatures } from '@starknet-io/get-starknet-wallet-standard/features';
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
  AddInvokeTransactionResult,
  AddDeclareTransactionResult,
  AccountDeploymentData,
  Signature,
  SpecVersion,
} from 'starknet-types-08';

/**
 * Request Permission for wallet account, return addresses that are allowed by user
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed
 * @returns {Address[]} allowed accounts addresses
 */
export function requestAccounts(
  walletWSF: WalletWithStarknetFeatures,
  silent_mode: boolean = false
): Promise<Address[]> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_requestAccounts',
    params: { silent_mode },
  });
}

/**
 * Request if DAPP is connected to wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {Permission[]} "accounts" if permission granted
 */
export function getPermissions(walletWSF: WalletWithStarknetFeatures): Promise<Permission[]> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_getPermissions' });
}

/**
 * Request adding an ERC20 Token to the Wallet List
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {WatchAssetParameters} asset description of the token to add.
 * @returns {boolean} true if the token was added successfully
 */
export function watchAsset(
  walletWSF: WalletWithStarknetFeatures,
  asset: WatchAssetParameters
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_watchAsset',
    params: asset,
  });
}

/**
 * Request adding custom Starknet chain
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {AddStarknetChainParameters} chain description of the chain to add.
 * @returns {boolean} true if the chain was added successfully
 */
export function addStarknetChain(
  walletWSF: WalletWithStarknetFeatures,
  chain: AddStarknetChainParameters
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addStarknetChain',
    params: chain,
  });
}

/**
 * Request Wallet Network change
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {ChainId} chainId encoded name of the chain requested.
 * @returns {boolean} true if the chain was changed successfully
 */
export function switchStarknetChain(
  walletWSF: WalletWithStarknetFeatures,
  chainId: ChainId
): Promise<boolean> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_switchStarknetChain',
    params: { chainId },
  });
}

/**
 * Request the current chain ID from the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {ChainId} The current Starknet chain ID.
 */
export function requestChainId(walletWSF: WalletWithStarknetFeatures): Promise<ChainId> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_requestChainId' });
}

/**
 * Get deployment data for a contract.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {AccountDeploymentData} The deployment data result.
 */
export function deploymentData(
  walletWSF: WalletWithStarknetFeatures
): Promise<AccountDeploymentData> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_deploymentData' });
}

/**
 * Add an invoke transaction to the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {AddInvokeTransactionParameters} params The parameters required for the invoke transaction.
 * @returns {AddInvokeTransactionResult} The result of adding the invoke transaction.
 */
export function addInvokeTransaction(
  walletWSF: WalletWithStarknetFeatures,
  params: AddInvokeTransactionParameters
): Promise<AddInvokeTransactionResult> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addInvokeTransaction',
    params,
  });
}

/**
 * Add a declare transaction to the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {AddDeclareTransactionParameters} params The parameters required for the declare transaction.
 * @returns {AddDeclareTransactionResult} The result of adding the declare transaction.
 */
export function addDeclareTransaction(
  walletWSF: WalletWithStarknetFeatures,
  params: AddDeclareTransactionParameters
): Promise<AddDeclareTransactionResult> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addDeclareTransaction',
    params,
  });
}

/**
 * Sign typed data using the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {TypedData} typedData The typed data to sign.
 * @returns {Signature} An array of signatures as strings.
 */
export function signMessage(
  walletWSF: WalletWithStarknetFeatures,
  typedData: TypedData
): Promise<Signature> {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_signTypedData',
    params: typedData,
  });
}

/**
 * Get the list of supported Wallet API specifications.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {SpecVersion[]} An array of wallet API supported specification strings.
 */
export function supportedSpecs(walletWSF: WalletWithStarknetFeatures): Promise<SpecVersion[]> {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedSpecs' });
}

/**
 * Attaches an event handler function for the changes of network and account.
 * When the account/network are changed, the specified callback function will be called.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {StandardEventsChangeProperties} callback - The function to be called when the account/network are changed.
 * @returns {() => void} function to execute to unsubscribe events.
 */
export function subscribeWalletEvent(
  walletWSF: WalletWithStarknetFeatures,
  callback: (change: StandardEventsChangeProperties) => void
): () => void {
  return walletWSF.features['standard:events'].on('change', callback);
}

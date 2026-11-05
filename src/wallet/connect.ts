import {
  Address,
  AddStarknetChainParameters,
  ChainId,
  AccountDeploymentData,
  AddInvokeTransactionParameters,
  AddInvokeTransactionResult,
  AddDeclareTransactionParameters,
  AddDeclareTransactionResult,
  Permission,
  StarknetWindowObject,
  WatchAssetParameters,
  TypedData,
  Signature,
  SpecVersion,
  type API_VERSION,
  AccountChangeEventHandler,
  NetworkChangeEventHandler,
} from '../types/api';

/**
 * Request Permission for wallet account, return addresses that are allowed by user
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.requestAccounts} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed
 * @returns allowed accounts addresses
 */
export function requestAccounts(
  swo: StarknetWindowObject,
  silent_mode: boolean = false
): Promise<Address[]> {
  return swo.request({
    type: 'wallet_requestAccounts',
    params: { silent_mode },
  });
}

/**
 * Request Permission for wallet account
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.getPermissions} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @returns allowed accounts addresses
 */
export function getPermissions(swo: StarknetWindowObject): Promise<Permission[]> {
  return swo.request({ type: 'wallet_getPermissions' });
}

/**
 * Request adding ERC20 Token to Wallet List
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.watchAsset} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @param asset WatchAssetParameters
 * @returns boolean
 */
export function watchAsset(
  swo: StarknetWindowObject,
  asset: WatchAssetParameters
): Promise<boolean> {
  return swo.request({ type: 'wallet_watchAsset', params: asset });
}

/**
 * Request adding custom Starknet chain
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.addStarknetChain} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @param chain AddStarknetChainParameters
 * @returns boolean
 */
export function addStarknetChain(
  swo: StarknetWindowObject,
  chain: AddStarknetChainParameters
): Promise<boolean> {
  // TODO: This should set custom RPC endpoint ?
  return swo.request({ type: 'wallet_addStarknetChain', params: chain });
}

/**
 * Request Wallet Network change
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.switchStarknetChain} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @param chainId StarknetChainId
 * @returns boolean
 */
export function switchStarknetChain(swo: StarknetWindowObject, chainId: ChainId): Promise<boolean> {
  return swo.request({
    type: 'wallet_switchStarknetChain',
    params: { chainId },
  });
}

/**
 * Request the current chain ID from the wallet.
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.requestChainId} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @returns The current Starknet chain ID.
 */
export function requestChainId(swo: StarknetWindowObject): Promise<ChainId> {
  return swo.request({ type: 'wallet_requestChainId' });
}

/**
 * Get deployment data for a contract.
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.deploymentData} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @returns The deployment data result.
 */
export function deploymentData(swo: StarknetWindowObject): Promise<AccountDeploymentData> {
  return swo.request({ type: 'wallet_deploymentData' });
}

/**
 * Add an invoke transaction to the wallet.
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.addInvokeTransaction} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @param params The parameters required for the invoke transaction.
 * @returns The result of adding the invoke transaction.
 */
export function addInvokeTransaction(
  swo: StarknetWindowObject,
  params: AddInvokeTransactionParameters
): Promise<AddInvokeTransactionResult> {
  return swo.request({ type: 'wallet_addInvokeTransaction', params });
}

/**
 * Add a declare transaction to the wallet.
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.addDeclareTransaction} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @param params The parameters required for the declare transaction.
 * @returns The result of adding the declare transaction.
 */
export function addDeclareTransaction(
  swo: StarknetWindowObject,
  params: AddDeclareTransactionParameters
): Promise<AddDeclareTransactionResult> {
  return swo.request({ type: 'wallet_addDeclareTransaction', params });
}

/**
 * Sign typed data using the wallet.
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.signMessage} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @param swo the starknet (wallet) window object to request the signature.
 * @param typedData The typed data to sign.
 * @returns An array of signatures as strings.
 */
export function signMessage(swo: StarknetWindowObject, typedData: TypedData): Promise<Signature> {
  return swo.request({ type: 'wallet_signTypedData', params: typedData });
}

/**
 * Get the list of supported specifications.
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.supportedSpecs} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @returns An array of supported specification strings.
 */
export function supportedSpecs(swo: StarknetWindowObject): Promise<SpecVersion[]> {
  return swo.request({ type: 'wallet_supportedSpecs' });
}

/**
 * Get the list of supported wallet API versions.
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.supportedWalletApi} (get-starknet v6) instead. The `wallet` namespace will be
 * removed in v12.
 * @returns An array of supported wallet API version strings.
 */
export function supportedWalletApi(swo: StarknetWindowObject): Promise<API_VERSION[]> {
  return swo.request({ type: 'wallet_supportedWalletApi' });
}

/**
 * Attaches an event handler function to the "accountsChanged" event of a StarknetWindowObject.
 * When the accounts are changed, the specified callback function will be called.
 *
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.subscribeWalletEvent} (get-starknet v6) instead. Its callback is called for a
 * change of account and for a change of network. The `wallet` namespace will be removed in v12.
 * @param {StarknetWindowObject} swo - The StarknetWindowObject to attach the event handler to.
 * @param {AccountChangeEventHandler} callback - The function to be called when the accounts are changed.
 *                                              It will receive the changed accounts as a parameter.
 * @returns {void}
 */
export function onAccountChange(
  swo: StarknetWindowObject,
  callback: AccountChangeEventHandler
): void {
  swo.on('accountsChanged', callback);
}

/**
 * Register a callback function to be called when the network is changed.
 *
 * @deprecated This function works only with get-starknet v4. Use
 * {@link walletV6.subscribeWalletEvent} (get-starknet v6) instead. Its callback is called for a
 * change of account and for a change of network. The `wallet` namespace will be removed in v12.
 * @param {StarknetWindowObject} swo - The StarknetWindowObject instance.
 * @param {NetworkChangeEventHandler} callback - The callback function to be called when the network is changed.
 * @return {void}
 */
export function onNetworkChanged(
  swo: StarknetWindowObject,
  callback: NetworkChangeEventHandler
): void {
  swo.on('networkChanged', callback);
}

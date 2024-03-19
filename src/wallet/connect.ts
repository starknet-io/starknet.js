import {
  AccountChangeEventHandler,
  AddDeclareTransactionParameters,
  AddDeployAccountTransactionParameters,
  AddInvokeTransactionParameters,
  AddStarknetChainParameters,
  NetworkChangeEventHandler,
  StarknetChainId,
  StarknetWindowObject,
  TypedData,
  WatchAssetParameters,
} from './getst/main';

/**
 * Request Permission for wallet account, return addresses that are allowed by user
 * @param silentMode false: request user interaction allowance. true: return only pre-allowed
 * @returns allowed accounts addresses
 */
export function requestAccounts(swo: StarknetWindowObject, silentMode = false) {
  return swo.request({
    type: 'wallet_requestAccounts',
    params: {
      silentMode,
    },
  });
}

/**
 * Request Permission for wallet account
 * @returns allowed accounts addresses
 */
export function getPermissions(swo: StarknetWindowObject) {
  return swo.request({ type: 'wallet_getPermissions' });
}

/**
 * Request adding ERC20 Token to Wallet List
 * @param asset WatchAssetParameters
 * @returns boolean
 */
export function watchAsset(swo: StarknetWindowObject, asset: WatchAssetParameters) {
  return swo.request({
    type: 'wallet_watchAsset',
    params: asset,
  });
}

/**
 * Request adding custom Starknet chain
 * @param chain AddStarknetChainParameters
 * @returns boolean
 */
export function addStarknetChain(swo: StarknetWindowObject, chain: AddStarknetChainParameters) {
  // TODO: This should set custom RPC endpoint ?
  return swo.request({
    type: 'wallet_addStarknetChain',
    params: chain,
  });
}

/**
 * Request Wallet Network change
 * @param chainId StarknetChainId
 * @returns boolean
 */
export function switchStarknetChain(swo: StarknetWindowObject, chainId: StarknetChainId) {
  return swo.request({
    type: 'wallet_switchStarknetChain',
    params: {
      chainId,
    },
  });
}

/**
 * Request the current chain ID from the wallet.
 * @returns The current Starknet chain ID.
 */
export function requestChainId(swo: StarknetWindowObject) {
  return swo.request({ type: 'wallet_requestChainId' });
}

/**
 * Get deployment data for a contract.
 * @returns The deployment data result.
 */
export function deploymentData(swo: StarknetWindowObject) {
  return swo.request({ type: 'wallet_deploymentData' }); // TODO: test
}

/**
 * Add an invoke transaction to the wallet.
 * @param params The parameters required for the invoke transaction.
 * @returns The result of adding the invoke transaction.
 */
export function addInvokeTransaction(
  swo: StarknetWindowObject,
  params: AddInvokeTransactionParameters
) {
  return swo.request({
    type: 'starknet_addInvokeTransaction',
    params,
  });
}

/**
 * Add a declare transaction to the wallet.
 * @param params The parameters required for the declare transaction.
 * @returns The result of adding the declare transaction.
 */
export function addDeclareTransaction(
  swo: StarknetWindowObject,
  params: AddDeclareTransactionParameters
) {
  return swo.request({
    type: 'starknet_addDeclareTransaction',
    params,
  });
}

/**
 * Add a deploy account transaction to the wallet.
 * @param params The parameters required for the deploy account transaction.
 * @returns The result of adding the deploy account transaction.
 */
export function addDeployAccountTransaction(
  swo: StarknetWindowObject,
  params: AddDeployAccountTransactionParameters
) {
  return swo.request({
    type: 'starknet_addDeployAccountTransaction',
    params,
  });
}

/**
 * Sign typed data using the wallet.
 * @param params The typed data to sign.
 * @returns An array of signatures as strings.
 */
export function signMessage(swo: StarknetWindowObject, typedData: TypedData) {
  return swo.request({
    type: 'starknet_signTypedData',
    params: typedData,
  });
}

/**
 * Get the list of supported specifications.
 * @returns An array of supported specification strings.
 */
export function supportedSpecs(swo: StarknetWindowObject) {
  return swo.request({ type: 'starknet_supportedSpecs' });
}

export function onAccountChange(swo: StarknetWindowObject, callback: AccountChangeEventHandler) {
  swo.on('accountsChanged', callback);
}

export function onNetworkChanged(swo: StarknetWindowObject, callback: NetworkChangeEventHandler) {
  swo.on('networkChanged', callback);
}

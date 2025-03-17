import {
  TypedData,
  WatchAssetParameters,
  RequestFn,
  WalletEventListener,
  Permission,
  ChainId,
} from 'starknet-types-07';
import {
  BLOCK_HASH,
  BLOCK_NUMBER,
  BLOCK_TAG,
  TX_REQUEST,
  TXN_HASH,
} from '../types/api/rosettaRpc/components';

interface Request extends RequestFn {
  (request: { method: string; params?: Array<unknown> }): Promise<any>;
}

export interface EthereumWindowObject {
  request: Request;
  on: WalletEventListener;
  off: WalletEventListener;
  id: string;
  name: string;
  icon: string;
  version: '1.0.0';
}

export function requestAccounts(ewo: EthereumWindowObject): Promise<string[]> {
  return ewo.request({ method: 'eth_requestAccounts' });
}

export function watchAsset(
  ewo: EthereumWindowObject,
  asset: WatchAssetParameters
): Promise<boolean> {
  return ewo.request({ method: 'wallet_watchAsset', params: [asset] });
}

export function requestChainId(ewo: EthereumWindowObject): Promise<string> {
  return ewo.request({ method: 'eth_chainId' });
}

export function sendTransaction(ewo: EthereumWindowObject, tx: TX_REQUEST): Promise<string> {
  return ewo.request({ method: 'eth_sendTransaction', params: [tx] });
}

export function switchRosettanetChain(
  ewo: EthereumWindowObject,
  chainId: ChainId
): Promise<string> {
  return ewo.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId }],
  });
}

export function getPermissions(ewo: EthereumWindowObject): Promise<Permission[]> {
  return ewo.request({ method: 'wallet_getPermissions' });
}

export function personalSign(
  ewo: EthereumWindowObject,
  message: string,
  address: string
): Promise<string> {
  return ewo.request({ method: 'personal_sign', params: [message, address] });
}

export function accounts(ewo: EthereumWindowObject): Promise<string[]> {
  return ewo.request({ method: 'eth_accounts' });
}

export function clientVersion(ewo: EthereumWindowObject): Promise<string> {
  return ewo.request({ method: 'web3_clientVersion' });
}

export function getBlockNumber(ewo: EthereumWindowObject): Promise<string> {
  return ewo.request({ method: 'eth_blockNumber' });
}

export function call(ewo: EthereumWindowObject, tx: TX_REQUEST): Promise<string> {
  return ewo.request({ method: 'eth_call', params: [tx] });
}

export function estimateGas(ewo: EthereumWindowObject, tx: TX_REQUEST): Promise<string> {
  return ewo.request({ method: 'eth_estimateGas', params: [tx] });
}

export function gasPrice(ewo: EthereumWindowObject): Promise<string> {
  return ewo.request({ method: 'eth_gasPrice' });
}

export function getBalance(
  ewo: EthereumWindowObject,
  address: string,
  block: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG = 'latest'
): Promise<string> {
  return ewo.request({ method: 'eth_getBalance', params: [address, block] });
}

export function getBlockByHash(
  ewo: EthereumWindowObject,
  blockHash: BLOCK_HASH,
  hydratedTx: boolean = false
): Promise<string> {
  return ewo.request({ method: 'eth_getBlockByHash', params: [blockHash, hydratedTx] });
}

export function getBlockByNumber(
  ewo: EthereumWindowObject,
  blockNumber: BLOCK_NUMBER | BLOCK_TAG,
  hydratedTx: boolean = false
): Promise<string> {
  return ewo.request({ method: 'eth_getBlockByNumber', params: [blockNumber, hydratedTx] });
}

export function getBlockTransactionCountByHash(
  ewo: EthereumWindowObject,
  blockHash: BLOCK_HASH
): Promise<string> {
  return ewo.request({ method: 'eth_getBlockTransactionCountByHash', params: [blockHash] });
}

export function getBlockTransactionCountByNumber(
  ewo: EthereumWindowObject,
  blockNumber: BLOCK_NUMBER | BLOCK_TAG
): Promise<string> {
  return ewo.request({ method: 'eth_getBlockTransactionCountByNumber', params: [blockNumber] });
}

export function getCode(
  ewo: EthereumWindowObject,
  address: string,
  block: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG = 'latest'
): Promise<string> {
  return ewo.request({ method: 'eth_getCode', params: [address, block] });
}

export function getTransactionHashByBlockHashAndIndex(
  ewo: EthereumWindowObject,
  blockHash: BLOCK_HASH,
  index: string
): Promise<string> {
  return ewo.request({
    method: 'eth_getTransactionByBlockHashAndIndex',
    params: [blockHash, index],
  });
}

export function getTransactionHashByBlockNumberAndIndex(
  ewo: EthereumWindowObject,
  blockNumber: BLOCK_NUMBER | BLOCK_TAG,
  index: string
): Promise<string> {
  return ewo.request({
    method: 'eth_getTransactionByBlockNumberAndIndex',
    params: [blockNumber, index],
  });
}

export function getTransactionByHash(ewo: EthereumWindowObject, txHash: TXN_HASH): Promise<string> {
  return ewo.request({ method: 'eth_getTransactionByHash', params: [txHash] });
}

export function getTransactionCount(
  ewo: EthereumWindowObject,
  address: string,
  block: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG = 'latest'
): Promise<string> {
  return ewo.request({ method: 'eth_getTransactionCount', params: [address, block] });
}

export function getTransactionReceipt(
  ewo: EthereumWindowObject,
  txHash: TXN_HASH
): Promise<string> {
  return ewo.request({ method: 'eth_getTransactionReceipt', params: [txHash] });
}

export function syncing(ewo: EthereumWindowObject): Promise<string> {
  return ewo.request({ method: 'eth_syncing' });
}

/**
 * Sign typed data using the wallet.
 * @param ewo wallet window object to request the signature.
 * @param message The typed data to sign.
 * @param address The wallet address to sign.
 * @returns Signatures as strings.
 */
export function signMessage(
  ewo: EthereumWindowObject,
  message: TypedData,
  address: string
): Promise<string> {
  return ewo.request({ method: 'eth_signTypedData_v4', params: [address, message] });
}

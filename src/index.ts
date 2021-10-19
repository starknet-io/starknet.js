import axios from 'axios';

import type {
  GetBlockResponse,
  GetCode,
  GetContractAddressesResponse,
  GetTransactionResponse,
  GetTransactionStatusResponse,
} from './index.d';

const API_URL: string = 'https://alpha2.starknet.io/';
const FEEDER_GATEWAY_URL: string = `${API_URL}/feeder_gateway`;
const GATEWAY_URL: string = `${API_URL}/gateway`;

/**
 * Gets the smart contract address on the goerli testnet.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15)
 * @returns starknet smart contract addresses
 */
export function getContractAddresses(): Promise<GetContractAddressesResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get<GetContractAddressesResponse>(`${FEEDER_GATEWAY_URL}/get_contract_addresses`)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

// TODO: add proper type
/**
 * Calls a function on the StarkNet contract.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L17-L25)
 *
 * @param invokeTx - transaction to be invoked (WIP)
 * @param blockId
 * @returns the result of the function on the smart contract.
 */
export function callContract(invokeTx: object, blockId: number): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${FEEDER_GATEWAY_URL}/call_contract?blockId=${blockId}`, invokeTx)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * Gets the block information from a block ID.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L27-L31)
 *
 * @param blockId
 * @returns the block object { block_id, previous_block_id, state_root, status, timestamp, transaction_receipts, transactions }
 */
export function getBlock(blockId: number): Promise<GetBlockResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get<GetBlockResponse>(`${FEEDER_GATEWAY_URL}/get_block?blockId=${blockId}`)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * Gets the code of the deployed contract.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L33-L36)
 *
 * @param contractAddress
 * @param blockId
 * @returns Bytecode and ABI of compiled contract
 */
export function getCode(contractAddress: string, blockId: number): Promise<GetCode> {
  return new Promise((resolve, reject) => {
    axios
      .get<GetCode>(
        `${FEEDER_GATEWAY_URL}/get_code?contractAddress=${contractAddress}&blockId=${blockId}`
      )
      .then((resp) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

// TODO: add proper type
/**
 * Gets the contract's storage variable at a specific key.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L38-L46)
 *
 * @param contractAddress
 * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
 * @param blockId
 * @returns the value of the storage variable
 */
export function getStorageAt(
  contractAddress: string,
  key: number,
  blockId: number
): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${FEEDER_GATEWAY_URL}/get_storage_at?contractAddress=${contractAddress}&key=${key}&blockId=${blockId}`
      )
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * Gets the status of a transaction.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52)
 *
 * @param txId
 * @returns the transaction status object { block_id, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }
 */
export function getTransactionStatus(txId: number): Promise<GetTransactionStatusResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get<GetTransactionStatusResponse>(
        `${FEEDER_GATEWAY_URL}/get_transaction_status?transactionId=${txId}`
      )
      .then((resp) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * Gets the transaction information from a tx id.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58)
 *
 * @param txId
 * @returns the transacton object { transaction_id, status, transaction, block_id?, block_number?, transaction_index?, transaction_failure_reason? }
 */
export function getTransaction(txId: number): Promise<GetTransactionResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get<GetTransactionResponse>(`${FEEDER_GATEWAY_URL}/get_transaction?transactionId=${txId}`)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

// TODO: add proper type
/**
 * Invoke a function on the starknet contract
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
 *
 * @param tx - transaction to be invoked (WIP)
 * @returns a confirmation of invoking a function on the starknet contract
 */
export function addTransaction(tx: object): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${GATEWAY_URL}/add_transaction`, tx)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

export default {
  getContractAddresses,
  callContract,
  getBlock,
  getCode,
  getStorageAt,
  getTransactionStatus,
  getTransaction,
  addTransaction,
};

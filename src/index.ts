import axios from 'axios';

const API_URL: string = 'https://alpha2.starknet.io/';
const FEEDER_GATEWAY_URL: string = `${API_URL}/feeder_gateway`;
const GATEWAY_URL: string = `${API_URL}/gateway`;

/**
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L13-L15
 * @returns
 */
export function getContractAddresses(): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${FEEDER_GATEWAY_URL}/get_contract_addresses`)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L17-L25
 * @param invokeTx
 * @param blockId
 * @returns
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
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L27-L31
 * @param blockId
 * @returns
 */
export function getBlock(blockId: number): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${FEEDER_GATEWAY_URL}/get_block?blockId=${blockId}`)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L33-L36
 * @param contractAddress
 * @param blockId
 * @returns
 */
export function getCode(contractAddress: string, blockId: number): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${FEEDER_GATEWAY_URL}/get_code?contractAddress=${contractAddress}&blockId=${blockId}`)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L38-L46
 * @param contractAddress
 * @param key
 * @param blockId
 * @returns
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
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L48-L52
 * @param txId
 * @returns
 */
export function getTransactionStatus(txId: number): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${FEEDER_GATEWAY_URL}/get_transaction_status?transactionId=${txId}`)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L54-L58
 * @param txId
 * @returns
 */
export function getTransaction(txId: number): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${FEEDER_GATEWAY_URL}/get_transaction?transactionId=${txId}`)
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17
 * @param tx
 * @returns
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

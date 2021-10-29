import axios from 'axios';

import type {
  AddTransactionResponse,
  Call,
  CallContractResponse,
  CompiledContract,
  GetBlockResponse,
  GetCodeResponse,
  GetContractAddressesResponse,
  GetTransactionResponse,
  GetTransactionStatusResponse,
  Transaction,
} from './types';
import { parse } from './utils/json';
import { BigNumberish, toBN, toHex } from './utils/number';
import { compressProgram, randomAddress } from './utils/starknet';

const API_URL = 'https://alpha3.starknet.io';
const FEEDER_GATEWAY_URL = `${API_URL}/feeder_gateway`;
const GATEWAY_URL = `${API_URL}/gateway`;

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

/**
 * Calls a function on the StarkNet contract.
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/feeder_gateway/feeder_gateway_client.py#L17-L25)
 *
 * @param invokeTx - transaction to be invoked
 * @param blockId
 * @returns the result of the function on the smart contract.
 */
export function callContract(invokeTx: Call, blockId?: number): Promise<CallContractResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${FEEDER_GATEWAY_URL}/call_contract?blockId=${blockId ?? 'null'}`, {
        signature: [],
        ...invokeTx,
      })
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
export function getBlock(blockId?: number): Promise<GetBlockResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get<GetBlockResponse>(`${FEEDER_GATEWAY_URL}/get_block?blockId=${blockId ?? 'null'}`)
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
export function getCode(contractAddress: string, blockId?: number): Promise<GetCodeResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get<GetCodeResponse>(
        `${FEEDER_GATEWAY_URL}/get_code?contractAddress=${contractAddress}&blockId=${
          blockId ?? 'null'
        }`
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
  blockId?: number
): Promise<object> {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${FEEDER_GATEWAY_URL}/get_storage_at?contractAddress=${contractAddress}&key=${key}&blockId=${
          blockId ?? 'null'
        }`
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
 * @param txHash
 * @returns the transaction status object { block_id, tx_status: NOT_RECEIVED | RECEIVED | PENDING | REJECTED | ACCEPTED_ONCHAIN }
 */
export function getTransactionStatus(txHash: BigNumberish): Promise<GetTransactionStatusResponse> {
  const txHashBn = toBN(txHash);
  return new Promise((resolve, reject) => {
    axios
      .get<GetTransactionStatusResponse>(
        `${FEEDER_GATEWAY_URL}/get_transaction_status?transactionHash=${toHex(txHashBn)}`
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
 * @param txHash
 * @returns the transacton object { transaction_id, status, transaction, block_id?, block_number?, transaction_index?, transaction_failure_reason? }
 */
export function getTransaction(txHash: BigNumberish): Promise<GetTransactionResponse> {
  const txHashBn = toBN(txHash);
  return new Promise((resolve, reject) => {
    axios
      .get<GetTransactionResponse>(
        `${FEEDER_GATEWAY_URL}/get_transaction?transactionHash=${toHex(txHashBn)}`
      )
      .then((resp) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

function formatSignature(sig?: [BigNumberish, BigNumberish]): [string, string] | [] {
  if (!sig) return [];
  try {
    return sig.map((x) => toBN(x)).map((x) => x.toString()) as [string, string];
  } catch (e) {
    return [];
  }
}
/**
 * Invoke a function on the starknet contract
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
 *
 * @param tx - transaction to be invoked
 * @returns a confirmation of invoking a function on the starknet contract
 */
export function addTransaction(tx: Transaction): Promise<AddTransactionResponse> {
  const signature = tx.type === 'INVOKE_FUNCTION' && formatSignature(tx.signature);
  const contract_address_salt = tx.type === 'DEPLOY' && toHex(toBN(tx.contract_address_salt));

  console.log({
    ...tx,
    ...(Array.isArray(signature) && { signature }), // not needed on deploy tx
    ...(contract_address_salt && { contract_address_salt }), // not needed on invoke tx
  });

  return new Promise((resolve, reject) => {
    axios
      .post(`${GATEWAY_URL}/add_transaction`, {
        ...tx,
        ...(Array.isArray(signature) && { signature }), // not needed on deploy tx
        ...(contract_address_salt && { contract_address_salt }), // not needed on invoke tx
      })
      .then((resp: any) => {
        resolve(resp.data);
      })
      .catch(reject);
  });
}

/**
 * Deploys a given compiled contract (json) to starknet
 *
 * @param contract - a json object containing the compiled contract
 * @param address - (optional, defaults to a random address) the address where the contract should be deployed (alpha)
 * @returns a confirmation of sending a transaction on the starknet contract
 */
export function deployContract(
  contract: CompiledContract | string,
  constructorCalldata: string[] = [],
  addressSalt: BigNumberish = randomAddress()
): Promise<AddTransactionResponse> {
  const parsedContract =
    typeof contract === 'string' ? (parse(contract) as CompiledContract) : contract;
  const contractDefinition = {
    ...parsedContract,
    program: compressProgram(parsedContract.program),
  };

  return addTransaction({
    type: 'DEPLOY',
    contract_address_salt: addressSalt,
    constructor_calldata: constructorCalldata,
    contract_definition: contractDefinition,
  });
}

function wait(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
export async function waitForTx(txHash: BigNumberish, retryInterval: number = 2000) {
  let onchain = false;
  while (!onchain) {
    // eslint-disable-next-line no-await-in-loop
    await wait(retryInterval);
    // eslint-disable-next-line no-await-in-loop
    const res = await getTransactionStatus(txHash);
    if (res.tx_status === 'ACCEPTED_ONCHAIN' || res.tx_status === 'PENDING') {
      onchain = true;
    } else if (res.tx_status === 'REJECTED') {
      throw Error('REJECTED');
    } else if (res.tx_status === 'NOT_RECEIVED') {
      throw Error('NOT_RECEIVED');
    }
  }
}

export default {
  waitForTx,
  getContractAddresses,
  callContract,
  getBlock,
  getCode,
  getStorageAt,
  getTransactionStatus,
  getTransaction,
  addTransaction,
  compressProgram,
  deployContract,
};

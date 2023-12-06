---
sidebar_position: 1
title: RPC Provider
id: 'rpcProvider'
---

## Creating an instance

`new starknet.RpcProvider(options)`

- options.**nodeUrl** - Starknet RPC node url
- options.**headers** - [Optional] custom fetch headers
- options.**retries** - [Optional] wait for transaction max retries
- options.**blockIdentifier** - [Optional] default value set to 'latest'

Example:

```typescript
const provider = new starknet.RpcProvider({
  nodeUrl: 'URL_TO_STARKNET_RPC_NODE',
})
```

## Methods

---

### fetch()

provider.**fetch**(method: any, params: any) => _Promise < any >_

Generic method for users to be able to experiment with RPC methods.

---

### getChainId()

provider.**getChainId**() => _Promise < any >_

---

### getBlock()

provider.**getBlock**(blockIdentifier) => _Promise < GetBlockResponse >_

---

### getBlockHashAndNumber()

provider.**getBlockHashAndNumber**() => _Promise < BlockHashAndNumber >_

###### _BlockHashAndNumber_

```typescript
{
  block_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
}
```

---

### getBlockWithTxHashes()

provider.**getBlockWithTxHashes**(blockIdentifier) => _Promise < GetBlockWithTxHashesResponse >_

###### _GetBlockWithTxHashesResponse_

```typescript
OPENRPC.BlockWithTxHashes
```

---

### getBlockWithTxs()

provider.**getBlockWithTxs**(blockIdentifier) => _Promise < GetBlockWithTxs >_

###### _GetBlockWithTxs_

```typescript
OPENRPC.BlockWithTxs
```

---

### getClassHashAt()

provider.**getClassHashAt**(blockIdentifier) => _Promise < ContractAddress >_

---

### getTransactionCount()

provider.**getTransactionCount**(blockIdentifier) => _Promise < number >_

Gets the transaction count from a block.

---

### getBlockNumber()

provider.**getBlockNumber**() => _Promise < number >_

Gets the latest block number.

---

### getPendingTransactions()

provider.**getPendingTransactions**() => _Promise < PendingTransactions >_

###### _PendingTransactions_

```typescript
OPENRPC.PendingTransactions;
```

---

### getStateUpdate()

provider.**getStateUpdate**(blockIdentifier) => _Promise < StateUpdate >_

###### _StateUpdate_

```typescript
OPENRPC.StateUpdate;
```

---

### getStorageAt()

provider.**getStorageAt**(contractAddress, key, blockIdentifier) => _Promise < BigNumberish >_

---

### getTransaction()

provider.**getTransaction**(txHash) => _Promise < GetTransactionResponse >_

---

### getTransactionByHash()

provider.**getTransactionByHash**(txHash) => _Promise < GetTransactionByHashResponse >_

###### _GetTransactionByHashResponse_

```typescript
OPENRPC.Transaction;
```

---

### getTransactionByBlockIdAndIndex()

provider.**getTransactionByBlockIdAndIndex**(blockIdentifier, index) => _Promise < GetTransactionByBlockIdAndIndex >_

###### _GetTransactionByBlockIdAndIndex_

```typescript
OPENRPC.Transaction;
```

---

### getTransactionReceipt()

provider.**getTransactionReceipt**(txHash) => _Promise < GetTransactionReceiptResponse >_

---

### getClass()

provider.**getClass**(classHash) => _Promise < ContractClass >_

###### _ContractClass_

```typescript
OPENRPC.ContractClass;
```

---

### getClassAt()

provider.**getClassAt**(contractAddress, blockIdentifier) => _Promise < ContractClass >_

###### _ContractClass_

```typescript
OPENRPC.ContractClass;
```

---

### getInvokeEstimateFee()

provider.**getInvokeEstimateFee**(invocation, invocationDetails, blockIdentifier) => _Promise < EstimateFeeResponse >_

###### _EstimateFeeResponse_

```typescript
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
```

---

### getDeclareEstimateFee()

provider.**getDeclareEstimateFee**(DeclareContractTransaction, details, blockIdentifier) => _Promise < EstimateFeeResponse >_

###### _EstimateFeeResponse_

```typescript
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
```

---

### declareContract()

provider.**declareContract**(DeclareContractTransaction, details) => _Promise < DeclareContractResponse >_

###### _DeclareContractResponse_

```typescript
  transaction_hash: string;
  class_hash: string;
```

---

### callContract()

provider.**callContract**(call, blockIdentifier) => _Promise < CallContractResponse >_

---

### getContractAddresses()

provider.**traceTransaction**(transactionHash) => _Promise < Trace >_

###### _Trace_

```typescript
OPENRPC.Trace;
```

---

### traceBlockTransactions()

provider.**traceBlockTransactions**(blockHash) => _Promise < Traces >_

###### _Traces_

```typescript
OPENRPC.Traces;
```

---

### getSyncingStats()

provider.**getSyncingStats**() => _Promise < GetSyncingStatsResponse >_

Gets syncing status of the node.

###### _GetSyncingStatsResponse_

```typescript
boolean |
{
  starting_block_hash: string;
  starting_block_num: string;
  current_block_hash: string;
  current_block_num: string;
  highest_block_hash: string;
  highest_block_num: string;
}
```

---

### getEvents()

provider.**getEvents**(eventFilter) => _Promise < GetEventsResponse >_

Gets all the events filtered

##### _EventFilter_

```typescript
type EventFilter = {
  fromBlock: string;
  toBlock: string;
  address: string;
  keys: string[];
  page_size: number;
  page_number: number;
};
```

###### _GetEventsResponse_

```typescript
{
  events: StarknetEmittedEvent[];
  page_number: number;
  is_last_page: number;
}
```

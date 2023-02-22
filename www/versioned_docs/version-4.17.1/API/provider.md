---
sidebar_position: 1
---

# Provider

The **Provider** API allows you to interact with the Starknet network, without signing transactions or messages.

Typically, these are _read_ calls on the blockchain.

## Default Provider

### Creating an instance

`new starknet.Provider(optionsOrProvider)`

The options for the provider depend on the network. The structure of the options object is:

- options.**sequencer** - Options for sequencer provider
- options.**rpc** - Options for RPC provider

The easiest way to get started is:

```typescript
const provider = new starknet.Provider()
```

The above snippet creates a Starknet Provider instance with testnet `SN_GOERLI` network.

However, if you want to use mainnet `SN_MAIN` or explicitly declare the network, you can use:

```typescript
const provider = new starknet.Provider({
  sequencer: {
    network: NetworkName.SN_MAIN // or NetworkName.SN_GOERLI
  }
})
```

If you want more control:

```typescript
const provider = new starknet.Provider({
  sequencer: {
    baseUrl: BaseUrl.SN_GOERLI,
    feederGatewayUrl: 'feeder_gateway',
    gatewayUrl: 'gateway',
  }
})
```

These are also the default options for the Provider constructor with `network: 'SN_GOERLI'`.

> **Note**
>
> `network` argument should work in most cases. If you want to use the `sequencer` argument with `baseUrl`, you will not be able to use the `network` field in the object.

### Methods

#### getChainId()

provider.**getChainId**() => _Promise < StarknetChainId >_

Returns the chain Id for the current network.

---

#### callContract()

provider.**callContract**(call [ , blockIdentifier ]) => _Promise < CallContractResponse >_

Calls a function on the Starknet contract.

The call object structure:

- call.**contractAddress** - Address of the contract
- call.**entrypoint** - Entrypoint of the call (method name)
- call.**calldata** - Payload for the invoking method

###### _CallContractResponse_

```typescript
{
  result: string[];
}
```

---

#### getBlock()

provider.**getBlock**(blockIdentifier) => _Promise < GetBlockResponse >_

Gets the block information.

###### _GetBlockResponse_

```typescript
{
  accepted_time: number;
  block_hash: string;
  block_number: number;
  gas_price: string;
  new_root: string;
  old_root?: string;
  parent_hash: string;
  sequencer: string;
  status: 'NOT_RECEIVED' | 'RECEIVED' | 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
  transactions: Array<string>;
  starknet_version?: string;
}
```

---

#### getClassAt()

provider.**getClassAt**(contractAddress, blockIdentifier) => _Promise < ContractClass >_

Gets the contract class of the deployed contract.

###### _ContractClass_

```typescript
{
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi?: Abi;
}
```

---

#### getInvokeEstimateFee()

provider.**getInvokeEstimateFee**(invocationWithTxType, invocationDetails, blockIdentifier) => _Promise < EstimateFeeResponse >_

Estimate fee for invoke transaction.

###### _EstimateFeeResponse_

```typescript
{
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
}
```

---

#### getNonceForAddress()

provider.**getNonceForAddress**(contractAddress, blockIdentifier) => _Promise < BigNumberish >_

Gets the nonce of the provided contractAddress. This was renamed from `getNonce` to `getNonceForAddress` to avoid confusion when inheriting an Account from the Provider class.

---

#### getStorageAt()

provider.**getStorageAt**(contractAddress, key, blockIdentifier) => _Promise < string >_

Gets the contract's storage variable at a specific key.

---

#### getTransactionReceipt()

provider.**getTransactionReceipt**(txHash) => _Promise < GetTransactionReceiptResponse >_

Gets the status of a transaction.

###### _GetTransactionReceiptResponse_

```typescript
{
  transaction_hash: string;
  status: 'NOT_RECEIVED' | 'RECEIVED' | 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
  actual_fee?: string;
  status_data?: string;
  messages_sent?: Array<MessageToL1>;
  events?: Array<Event>;
  l1_origin_message?: MessageToL2;
}
```

---

#### getTransaction()

provider.**getTransaction**(txHash) => _Promise < GetTransactionResponse >_

Gets the transaction information from a tx hash.

###### _GetTransactionResponse_

```typescript
{
  transaction_hash: string;
  version?: string;
  signature?: Signature;
  max_fee?: string;
  nonce?: string;
  contract_address?: string;
  entry_point_selector?: string;
  calldata?: RawCalldata;
  contract_class?: ContractClass;
  sender_address?: string;
}
```

---

#### declareContract()

provider.**declareContract**(transaction, details) => _Promise < DeclareContractResponse >_

Declare a contract on Starknet.

###### _DeclareContractResponse_

```typescript
{
  transaction_hash: string;
  class_hash: string;
};
```

---

#### getDeclareEstimateFee()

provider.**getDeclareEstimateFee**(transaction, details, blockIdentifier) => _Promise < EstimateFeeResponse >_

Estimate fee for declare transaction.

###### _EstimateFeeResponse_

```typescript
{
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
};
```

---

#### waitForTransaction()

provider.**waitForTransaction**(txHash [ , options]) => _Promise < GetTransactionReceiptResponse >_

Wait for the transaction to be accepted on L2 or L1.

## SequencerProvider

On top of methods found in the [Default Provider](#default-provider) section, `SequencerProvider` has some additional ones you can use.

### Creating an instance

`new starknet.SequencerProvider(optionsOrProvider)`

The options for the provider depend on the network. The structure of the options object is:

- options.**baseUrl** - Base URL of the network
- options.**feederGatewayUrl** - Feeder Gateway Endpoint of the network
- options.**gatewayUrl** - Gateway Endpoint
- options.**headers** - [Optional] custom fetch headers

or

- options.**network** - NetworkName
- options.**headers** - [Optional] custom fetch headers

Example:

```typescript
const provider = new starknet.SequencerProvider({
  baseUrl: BaseUrl.SN_GOERLI,
  feederGatewayUrl: 'feeder_gateway',
  gatewayUrl: 'gateway',
})
```

### Methods

---

#### getContractAddresses()

provider.**getContractAddresses**() => _Promise < GetContractAddressesResponse >_

Gets the smart contract address on the network.

###### _GetContractAddressesResponse_

```typescript
{
  Starknet: string;
  GpsStatementVerifier: string;
}
```

---

#### getCode()

provider.**getCode**(contractAddress, blockIdentifier) => _Promise < GetCodeResponse >_

Gets the smart contract address on the network.

###### _GetCodeResponse_

```typescript
{
  bytecode: string[];
  abi: Abi;
}
```

---

#### estimateMessageFee()

provider.**estimateMessageFee**(CallL1Handler, blockIdentifier) => _Promise < EstimateFeeResponse >_

Estimate fee for sending a message to L1.

##### _CallL1Handler_

````typescript
type CallL1Handler = {
  from_address: getDecimalString(from_address),
  to_address: getHexString(to_address),
  entry_point_selector: getSelector(entry_point_selector),
  payload: getHexStringArray(payload),
};

###### _EstimateFeeResponse_

```typescript
{
  overall_fee: number;
  gas_price: number;
  gas_usage: number;
  unit: string;
}
````

---

#### getTransactionStatus()

provider.**getTransactionStatus**(txHash) => _Promise < GetTransactionStatusResponse >_

Gets the status of a transaction.

###### _GetTransactionStatusResponse_

```typescript
{
  tx_status: 'NOT_RECEIVED' | 'RECEIVED' | 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
  block_hash: string;
  tx_failure_reason?: {
    tx_id: number;
    code: string;
    error_message: string;
  }
}
```

---

#### getTransactionTrace()

provider.**getTransactionTrace**(txHash) => _Promise < GetTransactionTraceResponse >_

Gets the transaction trace from a tx hash.

###### _GetTransactionTraceResponse_

```typescript
{
  validate_invocation?: FunctionInvocation;
  function_invocation?: FunctionInvocation;
  fee_transfer_invocation?: FunctionInvocation;
  signature: Signature;
}

{
  FunctionInvocation: {
    caller_address: string;
    contract_address: string;
    calldata: {
      [inputName: string]: string | string[] | { type: 'struct'; [k: string]: BigNumberish };
    };
    call_type?: string;
    class_hash?: string;
    selector?: string;
    entry_point_type?: EntryPointType;
    result: Array<any>;
    execution_resources: ExecutionResources;
    internal_calls: Array<FunctionInvocation>;
    events: Array<any>;
    messages: Array<any>;
  };
}
```

## RpcProvider

### Creating an instance

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

### Methods

---

#### fetch()

provider.**fetch**(method: any, params: any) => _Promise < any >_

Generic method for users to be able to experiment with RPC methods.

---

#### getChainId()

provider.**getChainId**() => _Promise < any >_

---

#### getBlock()

provider.**getBlock**(blockIdentifier) => _Promise < GetBlockResponse >_

---

#### getBlockHashAndNumber()

provider.**getBlockHashAndNumber**() => _Promise < BlockHashAndNumber >_

###### _BlockHashAndNumber_

```typescript
{
  block_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
}
```

---

#### getBlockWithTxHashes()

provider.**getBlockWithTxHashes**(blockIdentifier) => _Promise < GetBlockWithTxHashesResponse >_

###### _GetBlockWithTxHashesResponse_

```typescript
OPENRPC.BlockWithTxHashes
```

---

#### getBlockWithTxs()

provider.**getBlockWithTxs**(blockIdentifier) => _Promise < GetBlockWithTxs >_

###### _GetBlockWithTxs_

```typescript
OPENRPC.BlockWithTxs
```

---

#### getClassHashAt()

provider.**getClassHashAt**(blockIdentifier) => _Promise < ContractAddress >_

---

#### getTransactionCount()

provider.**getTransactionCount**(blockIdentifier) => _Promise < number >_

Gets the transaction count from a block.

---

#### getBlockNumber()

provider.**getBlockNumber**() => _Promise < number >_

Gets the latest block number.

---

#### getPendingTransactions()

provider.**getPendingTransactions**() => _Promise < PendingTransactions >_

###### _PendingTransactions_

```typescript
OPENRPC.PendingTransactions;
```

---

#### getStateUpdate()

provider.**getStateUpdate**(blockIdentifier) => _Promise < StateUpdate >_

###### _StateUpdate_

```typescript
OPENRPC.StateUpdate;
```

---

#### getStorageAt()

provider.**getStorageAt**(contractAddress, key, blockIdentifier) => _Promise < BigNumberish >_

---

#### getTransaction()

provider.**getTransaction**(txHash) => _Promise < GetTransactionResponse >_

---

#### getTransactionByHash()

provider.**getTransactionByHash**(txHash) => _Promise < GetTransactionByHashResponse >_

###### _GetTransactionByHashResponse_

```typescript
OPENRPC.Transaction;
```

---

#### getTransactionByBlockIdAndIndex()

provider.**getTransactionByBlockIdAndIndex**(blockIdentifier, index) => _Promise < GetTransactionByBlockIdAndIndex >_

###### _GetTransactionByBlockIdAndIndex_

```typescript
OPENRPC.Transaction;
```

---

#### getTransactionReceipt()

provider.**getTransactionReceipt**(txHash) => _Promise < GetTransactionReceiptResponse >_

---

#### getClass()

provider.**getClass**(classHash) => _Promise < ContractClass >_

###### _ContractClass_

```typescript
OPENRPC.ContractClass;
```

---

#### getClassAt()

provider.**getClassAt**(contractAddress, blockIdentifier) => _Promise < ContractClass >_

###### _ContractClass_

```typescript
OPENRPC.ContractClass;
```

---

#### getInvokeEstimateFee()

provider.**getInvokeEstimateFee**(invocation, invocationDetails, blockIdentifier) => _Promise < EstimateFeeResponse >_

###### _EstimateFeeResponse_

```typescript
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
```

---

#### getDeclareEstimateFee()

provider.**getDeclareEstimateFee**(DeclareContractTransaction, details, blockIdentifier) => _Promise < EstimateFeeResponse >_

###### _EstimateFeeResponse_

```typescript
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
```

---

#### declareContract()

provider.**declareContract**(DeclareContractTransaction, details) => _Promise < DeclareContractResponse >_

###### _DeclareContractResponse_

```typescript
  transaction_hash: string;
  class_hash: string;
```

---

#### callContract()

provider.**callContract**(call, blockIdentifier) => _Promise < CallContractResponse >_

---

#### getContractAddresses()

provider.**traceTransaction**(transactionHash) => _Promise < Trace >_

###### _Trace_

```typescript
OPENRPC.Trace;
```

---

#### traceBlockTransactions()

provider.**traceBlockTransactions**(blockHash) => _Promise < Traces >_

###### _Traces_

```typescript
OPENRPC.Traces;
```

---

#### getSyncingStats()

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

#### getEvents()

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

---
sidebar_position: 1
---

# Provider

The **Provider** API allows you to interact with the StarkNet network, without signing transactions or messages.

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

The above snippet creates a Starknet Provider instance with `goerli-alpha` network.

However, if you want to use `mainnet-alpha` or explicitly declare the network, you can use:

```typescript
const provider = new starknet.Provider({
  sequencer: {
    network: 'mainnet-alpha' // or 'goerli-alpha'
  }
})
```

If you want more control:

```typescript
const provider = new starknet.Provider({
  sequencer: {
    baseUrl: 'https://alpha4.starknet.io',
    feederGatewayUrl: 'feeder_gateway',
    gatewayUrl: 'gateway',
  }
})
```

These are also the default options for the Provider constructor with `network: 'goerli-alpha'`.

> **Note**
>
> `network` arguement should work in most cases. If you want to use the `sequencer` arguement with `baseUrl`, you will not be able to use the `network` field in the object.

### Methods

<hr/>

provider.**getChainId**() => _Promise < StarknetChainId >_

Returns the chain Id for the current network.

<hr/>

provider.**callContract**(call [ , blockIdentifier ]) => _Promise < CallContractResponse >_

Calls a function on the StarkNet contract.

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

<hr/>

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

<hr/>

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

<hr/>

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

<hr/>

provider.**getNonce**(contractAddress, blockIdentifier) => _Promise < BigNumberish >_

Gets the nonce of the provided contractAddress.

<hr/>

provider.**getStorageAt**(contractAddress, key, blockIdentifier) => _Promise < string >_

Gets the contract's storage variable at a specific key.

<hr/>

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

<hr/>

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

<hr/>

provider.**deployContract**(payload [ , abi ]) => _Promise < DeployContractResponse >_

Deploys a contract on Starknet.

###### _DeployContractResponse_

```typescript
{
  transaction_hash: string;
  contract_address: string;
};
```

<hr/>

provider.**declareContract**(transaction, details) => _Promise < DeclareContractResponse >_

Declare a contract on Starknet.

###### _DeclareContractResponse_

```typescript
{
  transaction_hash: string;
  class_hash: string;
};
```

<hr/>

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

<hr/>

provider.**waitForTransaction**(txHash [ , retryInterval]) => _Promise < void >_

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

- options.**network** - Either 'mainnet-alpha' or 'goerli-alpha'
- options.**headers** - [Optional] custom fetch headers

Example:

```typescript
const provider = new starknet.SequencerProvider({
  baseUrl: 'https://alpha4.starknet.io',
  feederGatewayUrl: 'feeder_gateway',
  gatewayUrl: 'gateway',
})
```

### Methods

<hr/>

provider.**getContractAddresses**() => _Promise < GetContractAddressesResponse >_

Gets the smart contract address on the network.

###### _GetContractAddressesResponse_

```typescript
{
  Starknet: string;
  GpsStatementVerifier: string;
}
```

<hr/>

provider.**getCode**(contractAddress, blockIdentifier) => _Promise < GetCodeResponse >_

Gets the smart contract address on the network.

###### _GetCodeResponse_

```typescript
{
  bytecode: string[];
  abi: Abi;
}
```

<hr/>

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

<hr/>

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

<hr/>

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

Example:

```typescript
const provider = new starknet.RpcProvider({
  nodeUrl: 'URL_TO_STARKNET_RPC_NODE',
})
```

### Methods

<hr/>

provider.**fetch**(method: any, params: any) => _Promise < any >_

Generic method for users to be able to experiment with RPC methods.

<hr/>

provider.**getChainId**() => _Promise < any >_

<hr/>

provider.**getBlock**(blockIdentifier) => _Promise < GetBlockResponse >_

<hr/>

provider.**getBlockHashAndNumber**() => _Promise < BlockHashAndNumber >_

###### _BlockHashAndNumber_

```typescript
{
  block_hash: BLOCK_HASH;
  block_number: BLOCK_NUMBER;
}
```

<hr/>

provider.**getBlockWithTxHashes**(blockIdentifier) => _Promise < GetBlockWithTxHashesResponse >_

###### _GetBlockWithTxHashesResponse_

```typescript
OPENRPC.BlockWithTxHashes
```

<hr/>

provider.**getBlockWithTxs**(blockIdentifier) => _Promise < GetBlockWithTxs >_

###### _GetBlockWithTxs_

```typescript
OPENRPC.BlockWithTxs
```

<hr/>

provider.**getClassHashAt**(blockIdentifier) => _Promise < ContractAddress >_

<hr/>

provider.**getTransactionCount**(blockIdentifier) => _Promise < number >_

Gets the transaction count from a block.

<hr/>

provider.**getBlockNumber**() => _Promise < number >_

Gets the latest block number.

<hr/>

provider.**getNonce**(contractAddress, blockIdentifier) => _Promise < BigNumberish >_

Gets the nonce of the provided contractAddress

<hr/>

provider.**getPendingTransactions**() => _Promise < PendingTransactions >_

###### _PendingTransactions_

```typescript
OPENRPC.PendingTransactions;
```

<hr/>

provider.**getStateUpdate**(blockIdentifier) => _Promise < StateUpdate >_

###### _StateUpdate_

```typescript
OPENRPC.StateUpdate;
```

<hr/>

provider.**getStorageAt**(contractAddress, key, blockIdentifier) => _Promise < BigNumberish >_

<hr/>

provider.**getTransaction**(txHash) => _Promise < GetTransactionResponse >_

<hr/>

provider.**getTransactionByHash**(txHash) => _Promise < GetTransactionByHashResponse >_

###### _GetTransactionByHashResponse_

```typescript
OPENRPC.Transaction;
```

<hr/>

provider.**getTransactionByBlockIdAndIndex**(blockIdentifier, index) => _Promise < GetTransactionByBlockIdAndIndex >_

###### _GetTransactionByBlockIdAndIndex_

```typescript
OPENRPC.Transaction;
```

<hr/>

provider.**getTransactionReceipt**(txHash) => _Promise < GetTransactionReceiptResponse >_

<hr/>

provider.**getClass**(classHash) => _Promise < ContractClass >_

###### _ContractClass_

```typescript
OPENRPC.ContractClass;
```

<hr/>

provider.**getClassAt**(contractAddress, blockIdentifier) => _Promise < ContractClass >_

###### _ContractClass_

```typescript
OPENRPC.ContractClass;
```

<hr/>

provider.**getInvokeEstimateFee**(invocation, invocationDetails, blockIdentifier) => _Promise < EstimateFeeResponse >_

###### _EstimateFeeResponse_

```typescript
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
```

<hr/>

provider.**getDeclareEstimateFee**(DeclareContractTransaction, details, blockIdentifier) => _Promise < EstimateFeeResponse >_

###### _EstimateFeeResponse_

```typescript
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
```

<hr/>

provider.**declareContract**(DeclareContractTransaction, details) => _Promise < DeclareContractResponse >_

###### _DeclareContractResponse_

```typescript
  transaction_hash: string;
  class_hash: string;
```

<hr/>

provider.**deployContract**(contract, constructorCalldata, addressSalt) => _Promise < DeployContractResponse >_

###### _DeployContractResponse_

```typescript
  contract_address: string;
  transaction_hash: string;
```

<hr/>

provider.**callContract**(call, blockIdentifier) => _Promise < CallContractResponse >_

<hr/>

provider.**traceTransaction**(transactionHash) => _Promise < Trace >_

###### _Trace_

```typescript
OPENRPC.Trace;
```

<hr/>

provider.**traceBlockTransactions**(blockHash) => _Promise < Traces >_

###### _Traces_

```typescript
OPENRPC.Traces;
```

<hr/>

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

<hr/>

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

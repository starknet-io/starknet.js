---
sidebar_position: 1
---

# Provider

The **Provider** API allows you to interface with the StarkNet network, without signing transactions or messages.

Typically, these are _read_ calls on the blockchain.

## Creating an instance

`new starknet.Provider(optionsOrProvider)`

The options for the provider depends from the network. The structure of the options object is:

- options.**sequencer** - Options for sequencer provider
- options.**rpc** - Options for RPC provider

Example:

```
const provider = new starknet.Provider({
  sequencer: {
    baseUrl: 'https://alpha4.starknet.io',
    feederGatewayUrl: 'feeder_gateway',
    gatewayUrl: 'gateway',
  }
})
```

**This is also default options for the constructor for the **testnet\*\*\*

## Methods

<hr/>

provider.**callContract**(call [ , blockIdentifier ]) => _Promise < CallContractResponse >_

Calls a function on the StarkNet contract.

The call object structure:

- call.**contractAddress** - Address of the contract
- call.**entrypoint** - Entrypoint of the call (method name)
- call.**calldata** - Payload for the invoking the method

###### CallContractResponse

```
{
    result: string[];
}
```

<hr/>

provider.**getBlock**(blockIdentifier) => _Promise < GetBlockResponse >_

Gets the block information.

###### _GetBlockResponse_

```
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

```
{
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi?: Abi;
}
```

<hr/>

provider.**getStorageAt**(contractAddress, key, blockHashOrTag) => _Promise < string >_

Gets the contract's storage variable at a specific key

<hr/>

provider.**getTransactionReceipt**(txHash) => _Promise < GetTransactionReceiptResponse >_

Gets the status of a transaction.

###### _GetTransactionReceiptResponse_

```
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

```
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

provider.**declareContract**(payload) => _Promise < DeclareContractResponse >_

Declares a contract on Starknet

###### _DeclareContractResponse_

```
{
  transaction_hash: string;
  class_hash: string;
};

<hr/>

```

provider.**deployContract**(payload [ , abi ]) => _Promise < DeployContractResponse >_

Deploys a contract on Starknet

###### _DeployContractResponse_

```
{
  transaction_hash: string;
  contract_address?: string;
};
```

<hr/>

provider.\*\*waitForTransaction(txHash [ , retryInterval]) => _Promise < void >_

Wait for the transaction to be accepted on L2 or L1.

# SequencerProvider

## Creating an instance

`new starknet.SequencerProvider(optionsOrProvider)`

The options for the provider depends from the network. The structure of the options object is:

- options.**baseUrl** - Base URL of the network
- options.**feederGatewayUrl** - Feeder Gateway Endpoint of the network
- options.**gatewayUrl** - Gateway Endpoint

or

- options.**network** - One of 'mainnet-alpha' or 'goerli-alpha'

Example:

```
const provider = new starknet.Provider({
  baseUrl: 'https://alpha4.starknet.io',
  feederGatewayUrl: 'feeder_gateway',
  gatewayUrl: 'gateway',
})
```

## Methods

Gets the smart contract address on the network

provider.**getContractAddresses**() => _Promise < GetContractAddressesResponse >_

```
{
  Starknet: string;
  GpsStatementVerifier: string;
}
```

<hr/>

provider.**getTransactionStatus**(txHash) => _Promise < GetTransactionStatusResponse >_

Gets the status of a transaction.

###### _GetTransactionStatusResponse_

```
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

```
{
  function_invocation: {
    caller_address: string;
    contract_address: string;
    code_address: string;
    selector: string;
    calldata: {
        [inputName: string]: string | string[] | { type: 'struct'; [k: string]: BigNumberish };
    };
    result: Array<any>;
    execution_resources: any;
    internal_call: Array<any>;
    events: Array<any>;
    messages: Array<any>;
  };
  signature: Signature;
}
```

# RpcProvider

## Creating an instance

`new starknet.RpcProvider(options)`

- options.**nodeUrl** - Starknet RPC node url

Example:

```
const provider = new starknet.RpcProvider({
  nodeUrl: 'URL_TO_STARKNET_RPC_NODE',
})
```

## Methods

provider.**getTransactionCount**(blockIdentifier) => _Promise < number >_

Gets the transaction count from a block.

<hr/>

provider.**getBlockNumber**() => _Promise < number >_

Gets the latest block number

<hr/>

provider.**getSyncingStats**() => _Promise < GetSyncingStatsResponse >_

Gets syncing status of the node

###### GetSyncingStatsResponse

```
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

##### EventFilter

```
type EventFilter = {
  fromBlock: string;
  toBlock: string;
  address: string;
  keys: string[];
  page_size: number;
  page_number: number;
};
```

###### GetSyncingStatsResponse

```
{
  events: StarknetEmittedEvent[];
  page_number: number;
  is_last_page: number;
}
```

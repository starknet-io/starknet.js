---
sidebar_position: 1
title: Provider
id: 'provider'
---

The **Provider** API allows you to interact with the Starknet network, without signing transactions or messages.

Typically, these are _read_ calls on the blockchain.

### Creating an instance

`new starknet.Provider(optionsOrProvider)`

The options for the provider depend on the network. The structure of the options object is:

- options.**sequencer** - Options for sequencer provider
- options.**rpc** - Options for RPC provider

The easiest way to get started is:

```typescript
const provider = new starknet.Provider()
```

The above snippet creates a Starknet Provider instance with testnet `SN_GOERLI2` network.

However, if you want to use mainnet `SN_MAIN` or explicitly declare the network, you can use:

```typescript
const provider = new starknet.Provider({
  sequencer: {
    network: NetworkName.SN_MAIN // or NetworkName.SN_GOERLI2
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

These are also the default options for the Provider constructor with `network: 'SN_GOERLI2'`.

> **Note**
>
> `network` argument should work in most cases. If you want to use the `sequencer` argument with `baseUrl`, you will not be able to use the `network` field in the object.

## Methods

### getChainId()

provider.**getChainId**() => _Promise < StarknetChainId >_

Returns the chain Id for the current network.

---

### callContract()

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

### getBlock()

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

### getClassAt()

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

### getInvokeEstimateFee()

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

### getNonceForAddress()

provider.**getNonceForAddress**(contractAddress, blockIdentifier) => _Promise < BigNumberish >_

Gets the nonce of the provided contractAddress. This was renamed from `getNonce` to `getNonceForAddress` to avoid confusion when inheriting an Account from the Provider class.

---

### getStorageAt()

provider.**getStorageAt**(contractAddress, key, blockIdentifier) => _Promise < string >_

Gets the contract's storage variable at a specific key.

---

### getTransactionReceipt()

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

### getTransaction()

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

### declareContract()

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

### getDeclareEstimateFee()

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

### waitForTransaction()

provider.**waitForTransaction**(txHash [ , options]) => _Promise < GetTransactionReceiptResponse >_

Wait for the transaction to be accepted on L2 or L1.

---

### getStarkName()

provider.**getStarkName**(address, StarknetIdContract) => _Promise<string | Error>_

Gets starknet.id stark name with the address provided

The _StarknetIdContract_ argument can be undefined, if it is, the function will automatically use official starknet id contracts of your network.

Returns directly a string (Example: `vitalik.stark`).

---

### getAddressFromStarkName()

provider.**getAddressFromStarkName**(name, StarknetIdContract) => _Promise<string | Error>_

Gets account address with the starknet id stark name.

The _StarknetIdContract_ argument can be undefined, if it is, the function will automatically use official starknet id contracts of your network.

Returns directly the address in a string (Example: `0xff...34`).

---

### getStateUpdate()

provider.**getStateUpdate**(blockIdentifier) => _Promise < StateUpdateResponse >_

Gets the state changes in a specific block

###### StateUpdateResponse

```typescript
{
  block_hash: string;
  new_root: string;
  old_root: string;
  state_diff: {
    storage_diffs: Array<StorageDiffItem>;
    declared_contract_hashes: Array<string>;
    deployed_contracts: Array<DeployedContractItem>;
    nonces: Array<Nonces>;
  };
};
```

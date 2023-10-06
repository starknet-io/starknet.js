---
sidebar_position: 1
title: Sequencer Provider
id: 'sequencerProvider'
---

On top of methods found in the [Provider](./) section, `SequencerProvider` has some additional ones you can use.

## Creating an instance

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

## Methods

---

### getContractAddresses()

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

### getCode()

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

### estimateMessageFee()

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

### getTransactionStatus()

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

### getTransactionTrace()

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

---

### getBlockTraces()

provider.**getBlockTraces**(blockIdentifier) => _Promise < BlockTransactionTracesResponse >_

Gets the transaction traces of an entire block

###### _BlockTransactionTracesResponse_

```typescript

{
    traces: Array<TransactionTraceResponse & { transaction_hash: string }>;
}

{
  TransactionTraceResponse: {
    validate_invocation?: FunctionInvocation;
    function_invocation?: FunctionInvocation;
    fee_transfer_invocation?: FunctionInvocation;
    signature: Signature;
  };

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

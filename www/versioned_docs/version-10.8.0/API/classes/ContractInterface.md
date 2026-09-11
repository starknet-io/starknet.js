# Abstract Class: ContractInterface

Defined in: [src/contract/interface.ts:64](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L64)

Interface for interacting with Starknet smart contracts

Provides methods for calling contract functions, estimating fees, and managing contract state.
Supports both read-only calls and state-changing invocations.

## Remarks

The interface provides multiple ways to interact with contracts:

- Direct method calls for convenience
- Generic call/invoke methods for flexibility
- Fee estimation and transaction population
- Event parsing and contract validation

## Indexable

> \[`key`: `string`\]: `any`

Dynamic method access - allows calling contract methods directly

## Constructors

### Constructor

> **new ContractInterface**(): `ContractInterface`

#### Returns

`ContractInterface`

## Properties

### abi

> `abstract` **abi**: [`Abi`](../type-aliases/Abi.md)

Defined in: [src/contract/interface.ts:68](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L68)

Contract ABI (Application Binary Interface)

---

### address

> `abstract` **address**: `string`

Defined in: [src/contract/interface.ts:73](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L73)

Contract address on Starknet

---

### providerOrAccount?

> `abstract` `optional` **providerOrAccount?**: [`ProviderOrAccount`](../type-aliases/ProviderOrAccount.md)

Defined in: [src/contract/interface.ts:79](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L79)

Provider for read operations or Account for write operations
Optional - a default RpcProvider will be created on first async operation if not provided

---

### classHash?

> `abstract` `optional` **classHash?**: `string`

Defined in: [src/contract/interface.ts:84](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L84)

Optional contract class hash for optimization

---

### functions

> `readonly` **functions**: `object`

Defined in: [src/contract/interface.ts:89](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L89)

Contract methods that return promises (async operations)

#### Index Signature

\[`name`: `string`\]: [`AsyncContractFunction`](../type-aliases/AsyncContractFunction.md)

---

### callStatic

> `readonly` **callStatic**: `object`

Defined in: [src/contract/interface.ts:94](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L94)

Contract methods for read-only calls (state queries)

#### Index Signature

\[`name`: `string`\]: [`AsyncContractFunction`](../type-aliases/AsyncContractFunction.md)

---

### populateTransaction

> `readonly` **populateTransaction**: `object`

Defined in: [src/contract/interface.ts:99](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L99)

Contract methods that return populated transactions for batching

#### Index Signature

\[`name`: `string`\]: [`ContractFunction`](../type-aliases/ContractFunction.md)

---

### estimateFee

> `readonly` **estimateFee**: `object`

Defined in: [src/contract/interface.ts:104](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L104)

Contract methods for fee estimation

#### Index Signature

\[`name`: `string`\]: [`ContractFunction`](../type-aliases/ContractFunction.md)

## Methods

### attach()

> `abstract` **attach**(`address`, `abi?`): `void`

Defined in: [src/contract/interface.ts:122](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L122)

Attach the contract to a different address with optional new ABI

#### Parameters

##### address

`string`

New contract address to interact with

##### abi?

[`Abi`](../type-aliases/Abi.md)

Optional new ABI to use (defaults to current ABI)

#### Returns

`void`

#### Example

```typescript
contract.attach('0x123...', newAbi);
// Now contract.address === '0x123...' and uses newAbi
```

---

### isDeployed()

> `abstract` **isDeployed**(): `Promise`\<`ContractInterface`\>

Defined in: [src/contract/interface.ts:139](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L139)

Verify that a contract is deployed at the current address

#### Returns

`Promise`\<`ContractInterface`\>

Promise resolving to this contract instance if deployed

#### Throws

If no contract is found at the address

#### Example

```typescript
try {
  await contract.isDeployed();
  console.log('Contract is deployed');
} catch (error) {
  console.log('Contract not found at address');
}
```

---

### call()

> `abstract` **call**(`method`, `args?`, `options?`): `Promise`\<[`CallResult`](../type-aliases/CallResult.md)\>

Defined in: [src/contract/interface.ts:154](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L154)

Call a read-only contract method (view function)

#### Parameters

##### method

`string`

Name of the contract method to call

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

Method arguments as array or calldata

##### options?

[`CallOptions`](../type-aliases/CallOptions.md)

Call options including block identifier and parsing settings

#### Returns

`Promise`\<[`CallResult`](../type-aliases/CallResult.md)\>

Parsed result from the contract method

#### Example

```typescript
const balance = await contract.call('balanceOf', [userAddress]);
const name = await contract.call('name', [], { blockIdentifier: 'latest' });
```

---

### invoke()

> `abstract` **invoke**(`method`, `args?`, `options?`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/contract/interface.ts:173](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L173)

Invoke a state-changing contract method (external function)

#### Parameters

##### method

`string`

Name of the contract method to invoke

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

Method arguments as array or calldata

##### options?

[`ExecuteOptions`](../type-aliases/ExecuteOptions.md)

Execution options including transaction details

#### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

Transaction response with hash

#### Example

```typescript
const tx = await contract.invoke('transfer', [recipient, amount]);
const receipt = await provider.waitForTransaction(tx.transaction_hash);
```

---

### estimate()

> `abstract` **estimate**(`method`, `args?`, `options?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md) \| [`PaymasterFeeEstimate`](../type-aliases/PaymasterFeeEstimate.md)\>

Defined in: [src/contract/interface.ts:192](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L192)

Estimate fee for invoking a contract method

#### Parameters

##### method

`string`

Name of the contract method to estimate

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

Method arguments as array or calldata

##### options?

Estimation options including block identifier

###### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md) \| [`PaymasterFeeEstimate`](../type-aliases/PaymasterFeeEstimate.md)\>

Fee estimation details

#### Example

```typescript
const feeEstimate = await contract.estimate('transfer', [recipient, amount]);
console.log('Estimated fee:', feeEstimate.overall_fee);
```

---

### populate()

> `abstract` **populate**(`method`, `args?`): [`Invocation`](../type-aliases/Invocation.md)

Defined in: [src/contract/interface.ts:212](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L212)

Populate transaction data for a contract method call

#### Parameters

##### method

`string`

Name of the contract method

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

Method arguments as array or calldata

#### Returns

[`Invocation`](../type-aliases/Invocation.md)

Invocation object for batching or inspection

#### Example

```typescript
const invocation = contract.populate('transfer', [recipient, amount]);
// Use in account.execute([invocation1, invocation2, ...])
```

---

### compile()

> `abstract` **compile**(`method`, `args?`): [`Calldata`](../type-aliases/Calldata.md)

Defined in: [src/contract/interface.ts:234](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L234)

Compile the calldata for a contract method, using the contract abi.

Unlike [populate](#populate), this returns only the compiled `Calldata` array, without wrapping it
in an `Invocation` object (no `contractAddress` nor `entrypoint`). It is the contract-bound
equivalent of `myCallData.compile(method, args)`.

If `args` is already a compiled `Calldata`, it is returned as-is without recompilation.

#### Parameters

##### method

`string`

Name of the contract method, as defined in the abi

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

Method arguments as array (in abi order) or object (free order), or an already
compiled calldata

#### Returns

[`Calldata`](../type-aliases/Calldata.md)

The compiled calldata

#### Example

```typescript
// 'amount' is a u256: the abi splits it into 2 felts automatically
const calldata = contract.compile('transfer', { recipient: '0x123', amount: 100n });
// calldata = ['0x123', '100', '0']
```

---

### parseEvents()

> `abstract` **parseEvents**(`receipt`): [`ParsedEvents`](../type-aliases/ParsedEvents.md)

Defined in: [src/contract/interface.ts:250](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L250)

Parse events from a transaction receipt using the contract's ABI

#### Parameters

##### receipt

[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)

Transaction receipt from waitForTransaction

#### Returns

[`ParsedEvents`](../type-aliases/ParsedEvents.md)

Array of parsed events with decoded data

#### Example

```typescript
const receipt = await provider.waitForTransaction(txHash);
const events = contract.parseEvents(receipt);
events.forEach((event) => {
  console.log('Event:', event.name, event.data);
});
```

---

### isCairo1()

> `abstract` **isCairo1**(): `boolean`

Defined in: [src/contract/interface.ts:263](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L263)

Check if the contract is implemented in Cairo 1

#### Returns

`boolean`

True if the contract uses Cairo 1, false for Cairo 0 (legacy)

#### Example

```typescript
if (contract.isCairo1()) {
  console.log('Using Cairo 1 features');
}
```

---

### getVersion()

> `abstract` **getVersion**(): `Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Defined in: [src/contract/interface.ts:275](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L275)

Get the Cairo and compiler version of the contract

#### Returns

`Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Object containing cairo version and compiler version

#### Example

```typescript
const version = await contract.getVersion();
console.log(`Cairo ${version.cairo}, Compiler ${version.compiler}`);
```

---

### typedv2()

> `abstract` **typedv2**\<`TAbi`\>(`tAbi`): `TypedContractV2`\<`TAbi`\>

Defined in: [src/contract/interface.ts:288](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L288)

Create a typed contract instance with full TypeScript support

#### Type Parameters

##### TAbi

`TAbi` _extends_ `Abi`

#### Parameters

##### tAbi

`TAbi`

The typed ABI interface for compile-time type checking

#### Returns

`TypedContractV2`\<`TAbi`\>

Typed contract instance with IntelliSense support

#### Example

```typescript
const typedContract = contract.typedv2(erc20Abi);
// Now typedContract.transfer() has full type safety
```

---

### withOptions()

> `abstract` **withOptions**(`options`): `ContractInterface`

Defined in: [src/contract/interface.ts:304](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/interface.ts#L304)

Set execution options for subsequent contract interactions

#### Parameters

##### options

[`WithOptions`](../type-aliases/WithOptions.md)

Options to override for contract interactions

#### Returns

`ContractInterface`

This contract instance with the specified options applied

#### Example

```typescript
contract.withOptions({
  blockIdentifier: 'latest',
  parseResponse: false,
});
// Now all subsequent calls use these options
```

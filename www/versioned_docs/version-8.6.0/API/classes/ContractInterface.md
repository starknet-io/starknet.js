---
id: 'ContractInterface'
title: 'Class: ContractInterface'
sidebar_label: 'ContractInterface'
sidebar_position: 0
custom_edit_url: null
---

Interface for interacting with Starknet smart contracts

Provides methods for calling contract functions, estimating fees, and managing contract state.
Supports both read-only calls and state-changing invocations.

**`Remarks`**

The interface provides multiple ways to interact with contracts:

- Direct method calls for convenience
- Generic call/invoke methods for flexibility
- Fee estimation and transaction population
- Event parsing and contract validation

## Implemented by

- [`Contract`](Contract.md)

## Indexable

▪ [key: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction) \| `any`

Dynamic method access - allows calling contract methods directly

## Constructors

### constructor

• **new ContractInterface**(): [`ContractInterface`](ContractInterface.md)

#### Returns

[`ContractInterface`](ContractInterface.md)

## Properties

### abi

• `Abstract` **abi**: [`Abi`](../modules.md#abi)

Contract ABI (Application Binary Interface)

#### Defined in

[src/contract/interface.ts:67](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L67)

---

### address

• `Abstract` **address**: `string`

Contract address on Starknet

#### Defined in

[src/contract/interface.ts:72](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L72)

---

### providerOrAccount

• `Abstract` **providerOrAccount**: [`ProviderOrAccount`](../modules.md#provideroraccount)

Provider for read operations or Account for write operations

#### Defined in

[src/contract/interface.ts:77](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L77)

---

### classHash

• `Optional` `Abstract` **classHash**: `string`

Optional contract class hash for optimization

#### Defined in

[src/contract/interface.ts:82](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L82)

---

### functions

• `Readonly` **functions**: `Object`

Contract methods that return promises (async operations)

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:87](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L87)

---

### callStatic

• `Readonly` **callStatic**: `Object`

Contract methods for read-only calls (state queries)

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:92](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L92)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

Contract methods that return populated transactions for batching

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Defined in

[src/contract/interface.ts:97](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L97)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

Contract methods for fee estimation

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Defined in

[src/contract/interface.ts:102](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L102)

## Methods

### attach

▸ **attach**(`address`, `abi?`): `void`

Attach the contract to a different address with optional new ABI

#### Parameters

| Name      | Type                       | Description                                       |
| :-------- | :------------------------- | :------------------------------------------------ |
| `address` | `string`                   | New contract address to interact with             |
| `abi?`    | [`Abi`](../modules.md#abi) | Optional new ABI to use (defaults to current ABI) |

#### Returns

`void`

**`Example`**

```typescript
contract.attach('0x123...', newAbi);
// Now contract.address === '0x123...' and uses newAbi
```

#### Defined in

[src/contract/interface.ts:120](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L120)

---

### isDeployed

▸ **isDeployed**(): `Promise`<[`ContractInterface`](ContractInterface.md)\>

Verify that a contract is deployed at the current address

#### Returns

`Promise`<[`ContractInterface`](ContractInterface.md)\>

Promise resolving to this contract instance if deployed

**`Throws`**

If no contract is found at the address

**`Example`**

```typescript
try {
  await contract.isDeployed();
  console.log('Contract is deployed');
} catch (error) {
  console.log('Contract not found at address');
}
```

#### Defined in

[src/contract/interface.ts:137](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L137)

---

### call

▸ **call**(`method`, `args?`, `options?`): `Promise`<[`CallResult`](../modules.md#callresult)\>

Call a read-only contract method (view function)

#### Parameters

| Name       | Type                                             | Description                                                  |
| :--------- | :----------------------------------------------- | :----------------------------------------------------------- |
| `method`   | `string`                                         | Name of the contract method to call                          |
| `args?`    | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | Method arguments as array or calldata                        |
| `options?` | [`CallOptions`](../modules.md#calloptions)       | Call options including block identifier and parsing settings |

#### Returns

`Promise`<[`CallResult`](../modules.md#callresult)\>

Parsed result from the contract method

**`Example`**

```typescript
const balance = await contract.call('balanceOf', [userAddress]);
const name = await contract.call('name', [], { blockIdentifier: 'latest' });
```

#### Defined in

[src/contract/interface.ts:152](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L152)

---

### invoke

▸ **invoke**(`method`, `args?`, `options?`): `Promise`<\{ `transaction_hash`: `string` }\>

Invoke a state-changing contract method (external function)

#### Parameters

| Name       | Type                                             | Description                                     |
| :--------- | :----------------------------------------------- | :---------------------------------------------- |
| `method`   | `string`                                         | Name of the contract method to invoke           |
| `args?`    | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | Method arguments as array or calldata           |
| `options?` | [`ExecuteOptions`](../modules.md#executeoptions) | Execution options including transaction details |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

Transaction response with hash

**`Example`**

```typescript
const tx = await contract.invoke('transfer', [recipient, amount]);
const receipt = await provider.waitForTransaction(tx.transaction_hash);
```

#### Defined in

[src/contract/interface.ts:171](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L171)

---

### estimate

▸ **estimate**(`method`, `args?`, `options?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for invoking a contract method

#### Parameters

| Name                       | Type                                               | Description                                   |
| :------------------------- | :------------------------------------------------- | :-------------------------------------------- |
| `method`                   | `string`                                           | Name of the contract method to estimate       |
| `args?`                    | [`ArgsOrCalldata`](../modules.md#argsorcalldata)   | Method arguments as array or calldata         |
| `options?`                 | `Object`                                           | Estimation options including block identifier |
| `options.blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | -                                             |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation details

**`Example`**

```typescript
const feeEstimate = await contract.estimate('transfer', [recipient, amount]);
console.log('Estimated fee:', feeEstimate.overall_fee);
```

#### Defined in

[src/contract/interface.ts:190](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L190)

---

### populate

▸ **populate**(`method`, `args?`): [`Invocation`](../modules.md#invocation)

Populate transaction data for a contract method call

#### Parameters

| Name     | Type                                             | Description                           |
| :------- | :----------------------------------------------- | :------------------------------------ |
| `method` | `string`                                         | Name of the contract method           |
| `args?`  | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | Method arguments as array or calldata |

#### Returns

[`Invocation`](../modules.md#invocation)

Invocation object for batching or inspection

**`Example`**

```typescript
const invocation = contract.populate('transfer', [recipient, amount]);
// Use in account.execute([invocation1, invocation2, ...])
```

#### Defined in

[src/contract/interface.ts:210](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L210)

---

### parseEvents

▸ **parseEvents**(`receipt`): [`ParsedEvents`](../modules.md#parsedevents)

Parse events from a transaction receipt using the contract's ABI

#### Parameters

| Name      | Type                                                                           | Description                                 |
| :-------- | :----------------------------------------------------------------------------- | :------------------------------------------ |
| `receipt` | [`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse) | Transaction receipt from waitForTransaction |

#### Returns

[`ParsedEvents`](../modules.md#parsedevents)

Array of parsed events with decoded data

**`Example`**

```typescript
const receipt = await provider.waitForTransaction(txHash);
const events = contract.parseEvents(receipt);
events.forEach((event) => {
  console.log('Event:', event.name, event.data);
});
```

#### Defined in

[src/contract/interface.ts:226](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L226)

---

### isCairo1

▸ **isCairo1**(): `boolean`

Check if the contract is implemented in Cairo 1

#### Returns

`boolean`

True if the contract uses Cairo 1, false for Cairo 0 (legacy)

**`Example`**

```typescript
if (contract.isCairo1()) {
  console.log('Using Cairo 1 features');
}
```

#### Defined in

[src/contract/interface.ts:239](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L239)

---

### getVersion

▸ **getVersion**(): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Get the Cairo and compiler version of the contract

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Object containing cairo version and compiler version

**`Example`**

```typescript
const version = await contract.getVersion();
console.log(`Cairo ${version.cairo}, Compiler ${version.compiler}`);
```

#### Defined in

[src/contract/interface.ts:251](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L251)

---

### typedv2

▸ **typedv2**<`TAbi`\>(`tAbi`): `TypedContractV2`<`TAbi`\>

Create a typed contract instance with full TypeScript support

#### Type parameters

| Name   | Type          |
| :----- | :------------ |
| `TAbi` | extends `Abi` |

#### Parameters

| Name   | Type   | Description                                            |
| :----- | :----- | :----------------------------------------------------- |
| `tAbi` | `TAbi` | The typed ABI interface for compile-time type checking |

#### Returns

`TypedContractV2`<`TAbi`\>

Typed contract instance with IntelliSense support

**`Example`**

```typescript
const typedContract = contract.typedv2(erc20Abi);
// Now typedContract.transfer() has full type safety
```

#### Defined in

[src/contract/interface.ts:264](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L264)

---

### withOptions

▸ **withOptions**(`options`): [`ContractInterface`](ContractInterface.md)

Set execution options for subsequent contract interactions

#### Parameters

| Name      | Type                                       | Description                                   |
| :-------- | :----------------------------------------- | :-------------------------------------------- |
| `options` | [`WithOptions`](../modules.md#withoptions) | Options to override for contract interactions |

#### Returns

[`ContractInterface`](ContractInterface.md)

This contract instance with the specified options applied

**`Example`**

```typescript
contract.withOptions({
  blockIdentifier: 'latest',
  parseResponse: false,
});
// Now all subsequent calls use these options
```

#### Defined in

[src/contract/interface.ts:280](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/interface.ts#L280)

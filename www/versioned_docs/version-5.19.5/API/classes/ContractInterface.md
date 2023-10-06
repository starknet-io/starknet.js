---
id: 'ContractInterface'
title: 'Class: ContractInterface'
sidebar_label: 'ContractInterface'
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`Contract`](Contract.md)

## Indexable

▪ [key: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction) \| `any`

## Constructors

### constructor

• **new ContractInterface**()

## Properties

### abi

• `Abstract` **abi**: [`Abi`](../namespaces/types.md#abi)

#### Defined in

[src/contract/interface.ts:24](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L24)

---

### address

• `Abstract` **address**: `string`

#### Defined in

[src/contract/interface.ts:26](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L26)

---

### providerOrAccount

• `Abstract` **providerOrAccount**: [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md)

#### Defined in

[src/contract/interface.ts:28](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L28)

---

### deployTransactionHash

• `Optional` `Abstract` **deployTransactionHash**: `string`

#### Defined in

[src/contract/interface.ts:30](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L30)

---

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:32](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L32)

---

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:34](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L34)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../namespaces/types.md#contractfunction)

#### Defined in

[src/contract/interface.ts:36](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L36)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../namespaces/types.md#contractfunction)

#### Defined in

[src/contract/interface.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L38)

## Methods

### attach

▸ `Abstract` **attach**(`address`): `void`

Saves the address of the contract deployed on network that will be used for interaction

#### Parameters

| Name      | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `address` | `string` | address of the contract |

#### Returns

`void`

#### Defined in

[src/contract/interface.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L47)

---

### connect

▸ `Abstract` **connect**(`providerOrAccount`): `void`

Attaches to new Provider or Account

#### Parameters

| Name                | Type                                                                                     | Description                          |
| :------------------ | :--------------------------------------------------------------------------------------- | :----------------------------------- |
| `providerOrAccount` | [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md) | new Provider or Account to attach to |

#### Returns

`void`

#### Defined in

[src/contract/interface.ts:54](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L54)

---

### deployed

▸ `Abstract` **deployed**(): `Promise`<[`ContractInterface`](ContractInterface.md)\>

Resolves when contract is deployed on the network or when no deployment transaction is found

**`Throws`**

When deployment fails

#### Returns

`Promise`<[`ContractInterface`](ContractInterface.md)\>

Promise that resolves when contract is deployed on the network or when no deployment transaction is found

#### Defined in

[src/contract/interface.ts:62](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L62)

---

### call

▸ `Abstract` **call**(`method`, `args?`, `options?`): `Promise`<[`Result`](../namespaces/types.md#result)\>

Calls a method on a contract

#### Parameters

| Name       | Type                                                      | Description                         |
| :--------- | :-------------------------------------------------------- | :---------------------------------- |
| `method`   | `string`                                                  | name of the method                  |
| `args?`    | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | Array of the arguments for the call |
| `options?` | [`CallOptions`](../namespaces/types.md#calloptions)       | optional blockIdentifier            |

#### Returns

`Promise`<[`Result`](../namespaces/types.md#result)\>

Result of the call as an array with key value pars

#### Defined in

[src/contract/interface.ts:72](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L72)

---

### invoke

▸ `Abstract` **invoke**(`method`, `args?`, `options?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Invokes a method on a contract

#### Parameters

| Name       | Type                                                      | Description                                       |
| :--------- | :-------------------------------------------------------- | :------------------------------------------------ |
| `method`   | `string`                                                  | name of the method                                |
| `args?`    | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | Array of the arguments for the invoke or Calldata |
| `options?` | [`InvokeOptions`](../namespaces/types.md#invokeoptions)   |                                                   |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Add Transaction Response

#### Defined in

[src/contract/interface.ts:86](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L86)

---

### estimate

▸ `Abstract` **estimate**(`method`, `args?`, `options?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates a method on a contract

#### Parameters

| Name                       | Type                                                        | Description                                     |
| :------------------------- | :---------------------------------------------------------- | :---------------------------------------------- |
| `method`                   | `string`                                                    | name of the method                              |
| `args?`                    | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata)   | Array of the arguments for the call or Calldata |
| `options?`                 | `Object`                                                    | optional blockIdentifier                        |
| `options.blockIdentifier?` | [`BlockIdentifier`](../namespaces/types.md#blockidentifier) | -                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

#### Defined in

[src/contract/interface.ts:99](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L99)

---

### populate

▸ `Abstract` **populate**(`method`, `args?`): [`Invocation`](../namespaces/types.md#invocation)

Calls a method on a contract

#### Parameters

| Name     | Type                                                      | Description                                     |
| :------- | :-------------------------------------------------------- | :---------------------------------------------- |
| `method` | `string`                                                  | name of the method                              |
| `args?`  | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | Array of the arguments for the call or Calldata |

#### Returns

[`Invocation`](../namespaces/types.md#invocation)

Invocation object

#### Defined in

[src/contract/interface.ts:114](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L114)

---

### parseEvents

▸ `Abstract` **parseEvents**(`receipt`): [`ParsedEvents`](../namespaces/types.md#parsedevents)

Parse contract events of a GetTransactionReceiptResponse received from waitForTransaction. Based on contract's abi

#### Parameters

| Name      | Type                                                                                    | Description         |
| :-------- | :-------------------------------------------------------------------------------------- | :------------------ |
| `receipt` | [`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse) | transaction receipt |

#### Returns

[`ParsedEvents`](../namespaces/types.md#parsedevents)

Events parsed

#### Defined in

[src/contract/interface.ts:122](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L122)

---

### isCairo1

▸ `Abstract` **isCairo1**(): `boolean`

tells if the contract comes from a Cairo 1 contract

**`Example`**

```typescript
const isCairo1: boolean = myContract.isCairo1();
```

#### Returns

`boolean`

TRUE if the contract comes from a Cairo1 contract

#### Defined in

[src/contract/interface.ts:133](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L133)

---

### typed

▸ `Abstract` **typed**<`TAbi`\>(`tAbi`): [`TypedContract`](../modules.md#typedcontract)<`TAbi`\>

#### Type parameters

| Name   | Type                                                                         |
| :----- | :--------------------------------------------------------------------------- |
| `TAbi` | extends readonly (`AbiFunction` \| `AbiEvent` \| `AbiStruct` \| `AbiEnum`)[] |

#### Parameters

| Name   | Type   |
| :----- | :----- |
| `tAbi` | `TAbi` |

#### Returns

[`TypedContract`](../modules.md#typedcontract)<`TAbi`\>

#### Defined in

[src/contract/interface.ts:135](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/interface.ts#L135)

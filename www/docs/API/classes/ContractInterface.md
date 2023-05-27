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

▪ [key: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction) \| `any`

## Constructors

### constructor

• **new ContractInterface**()

## Properties

### abi

• `Abstract` **abi**: [`Abi`](../modules.md#abi)

#### Defined in

[src/contract/interface.ts:18](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L18)

---

### address

• `Abstract` **address**: `string`

#### Defined in

[src/contract/interface.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L20)

---

### providerOrAccount

• `Abstract` **providerOrAccount**: [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md)

#### Defined in

[src/contract/interface.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L22)

---

### deployTransactionHash

• `Optional` `Abstract` **deployTransactionHash**: `string`

#### Defined in

[src/contract/interface.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L24)

---

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:26](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L26)

---

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:28](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L28)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Defined in

[src/contract/interface.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L30)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Defined in

[src/contract/interface.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L32)

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

[src/contract/interface.ts:41](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L41)

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

[src/contract/interface.ts:48](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L48)

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

[src/contract/interface.ts:56](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L56)

---

### call

▸ `Abstract` **call**(`method`, `args?`, `options?`): `Promise`<[`Result`](../modules.md#result)\>

Calls a method on a contract

#### Parameters

| Name       | Type                                             | Description                         |
| :--------- | :----------------------------------------------- | :---------------------------------- |
| `method`   | `string`                                         | name of the method                  |
| `args?`    | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | Array of the arguments for the call |
| `options?` | [`CallOptions`](../modules.md#calloptions)       | optional blockIdentifier            |

#### Returns

`Promise`<[`Result`](../modules.md#result)\>

Result of the call as an array with key value pars

#### Defined in

[src/contract/interface.ts:66](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L66)

---

### invoke

▸ `Abstract` **invoke**(`method`, `args?`, `options?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invokes a method on a contract

#### Parameters

| Name       | Type                                             | Description                                       |
| :--------- | :----------------------------------------------- | :------------------------------------------------ |
| `method`   | `string`                                         | name of the method                                |
| `args?`    | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | Array of the arguments for the invoke or Calldata |
| `options?` | [`InvokeOptions`](../modules.md#invokeoptions)   |                                                   |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Add Transaction Response

#### Defined in

[src/contract/interface.ts:80](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L80)

---

### estimate

▸ `Abstract` **estimate**(`method`, `args?`, `options?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates a method on a contract

#### Parameters

| Name                       | Type                                             | Description                                     |
| :------------------------- | :----------------------------------------------- | :---------------------------------------------- |
| `method`                   | `string`                                         | name of the method                              |
| `args?`                    | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | Array of the arguments for the call or Calldata |
| `options?`                 | `Object`                                         | optional blockIdentifier                        |
| `options.blockIdentifier?` | `BlockIdentifier`                                | -                                               |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

#### Defined in

[src/contract/interface.ts:93](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L93)

---

### populate

▸ `Abstract` **populate**(`method`, `args?`): [`Invocation`](../modules.md#invocation)

Calls a method on a contract

#### Parameters

| Name     | Type                                             | Description                                     |
| :------- | :----------------------------------------------- | :---------------------------------------------- |
| `method` | `string`                                         | name of the method                              |
| `args?`  | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | Array of the arguments for the call or Calldata |

#### Returns

[`Invocation`](../modules.md#invocation)

Invocation object

#### Defined in

[src/contract/interface.ts:108](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/interface.ts#L108)

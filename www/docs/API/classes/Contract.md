---
id: 'Contract'
title: 'Class: Contract'
sidebar_label: 'Contract'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`ContractInterface`](ContractInterface.md)

## Indexable

▪ [key: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction) \| `any`

## Constructors

### constructor

• **new Contract**(`abi`, `address`, `providerOrAccount?`)

Contract class to handle contract methods

#### Parameters

| Name                | Type                                                                                     | Default value     | Description                                   |
| :------------------ | :--------------------------------------------------------------------------------------- | :---------------- | :-------------------------------------------- |
| `abi`               | [`Abi`](../modules.md#abi)                                                               | `undefined`       | Abi of the contract object                    |
| `address`           | `string`                                                                                 | `undefined`       | (optional) - address to connect to            |
| `providerOrAccount` | [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md) | `defaultProvider` | (optional) - Provider or Account to attach to |

#### Defined in

[src/contract/default.ts:119](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L119)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Implementation of

[ContractInterface](ContractInterface.md).[abi](ContractInterface.md#abi)

#### Defined in

[src/contract/default.ts:90](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L90)

---

### address

• **address**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[address](ContractInterface.md#address)

#### Defined in

[src/contract/default.ts:92](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L92)

---

### providerOrAccount

• **providerOrAccount**: [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md)

#### Implementation of

[ContractInterface](ContractInterface.md).[providerOrAccount](ContractInterface.md#provideroraccount)

#### Defined in

[src/contract/default.ts:94](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L94)

---

### deployTransactionHash

• `Optional` **deployTransactionHash**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[deployTransactionHash](ContractInterface.md#deploytransactionhash)

#### Defined in

[src/contract/default.ts:96](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L96)

---

### structs

• `Protected` `Readonly` **structs**: `Object`

#### Index signature

▪ [name: `string`]: [`StructAbi`](../modules.md#structabi)

#### Defined in

[src/contract/default.ts:98](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L98)

---

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[functions](ContractInterface.md#functions)

#### Defined in

[src/contract/default.ts:100](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L100)

---

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[callStatic](ContractInterface.md#callstatic)

#### Defined in

[src/contract/default.ts:102](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L102)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[populateTransaction](ContractInterface.md#populatetransaction)

#### Defined in

[src/contract/default.ts:104](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L104)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[estimateFee](ContractInterface.md#estimatefee)

#### Defined in

[src/contract/default.ts:106](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L106)

---

### callData

• `Private` **callData**: `CallData`

#### Defined in

[src/contract/default.ts:110](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L110)

## Methods

### attach

▸ **attach**(`address`): `void`

Saves the address of the contract deployed on network that will be used for interaction

#### Parameters

| Name      | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `address` | `string` | address of the contract |

#### Returns

`void`

#### Implementation of

[ContractInterface](ContractInterface.md).[attach](ContractInterface.md#attach)

#### Defined in

[src/contract/default.ts:173](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L173)

---

### connect

▸ **connect**(`providerOrAccount`): `void`

Attaches to new Provider or Account

#### Parameters

| Name                | Type                                                                                     | Description                          |
| :------------------ | :--------------------------------------------------------------------------------------- | :----------------------------------- |
| `providerOrAccount` | [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md) | new Provider or Account to attach to |

#### Returns

`void`

#### Implementation of

[ContractInterface](ContractInterface.md).[connect](ContractInterface.md#connect)

#### Defined in

[src/contract/default.ts:177](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L177)

---

### deployed

▸ **deployed**(): `Promise`<[`Contract`](Contract.md)\>

Resolves when contract is deployed on the network or when no deployment transaction is found

**`Throws`**

When deployment fails

#### Returns

`Promise`<[`Contract`](Contract.md)\>

Promise that resolves when contract is deployed on the network or when no deployment transaction is found

#### Implementation of

[ContractInterface](ContractInterface.md).[deployed](ContractInterface.md#deployed)

#### Defined in

[src/contract/default.ts:181](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L181)

---

### call

▸ **call**(`method`, `args?`, `options?`): `Promise`<`Object`\>

Calls a method on a contract

#### Parameters

| Name      | Type                                       | Default value | Description                         |
| :-------- | :----------------------------------------- | :------------ | :---------------------------------- |
| `method`  | `string`                                   | `undefined`   | name of the method                  |
| `args`    | `any`[]                                    | `[]`          | Array of the arguments for the call |
| `options` | [`CallOptions`](../modules.md#calloptions) | `undefined`   | optional blockIdentifier            |

#### Returns

`Promise`<`Object`\>

Result of the call as an array with key value pars

#### Implementation of

[ContractInterface](ContractInterface.md).[call](ContractInterface.md#call)

#### Defined in

[src/contract/default.ts:189](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L189)

---

### invoke

▸ **invoke**(`method`, `args?`, `options?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invokes a method on a contract

#### Parameters

| Name      | Type                                   | Default value | Description                           |
| :-------- | :------------------------------------- | :------------ | :------------------------------------ |
| `method`  | `string`                               | `undefined`   | name of the method                    |
| `args`    | `any`[]                                | `[]`          | Array of the arguments for the invoke |
| `options` | [`Overrides`](../modules.md#overrides) | `undefined`   |                                       |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Add Transaction Response

#### Implementation of

[ContractInterface](ContractInterface.md).[invoke](ContractInterface.md#invoke)

#### Defined in

[src/contract/default.ts:225](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L225)

---

### estimate

▸ **estimate**(`method`, `args?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates a method on a contract

#### Parameters

| Name     | Type     | Default value | Description                         |
| :------- | :------- | :------------ | :---------------------------------- |
| `method` | `string` | `undefined`   | name of the method                  |
| `args`   | `any`[]  | `[]`          | Array of the arguments for the call |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

#### Implementation of

[ContractInterface](ContractInterface.md).[estimate](ContractInterface.md#estimate)

#### Defined in

[src/contract/default.ts:272](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L272)

---

### populate

▸ **populate**(`method`, `args?`): [`Call`](../modules.md#call)

Calls a method on a contract

#### Parameters

| Name     | Type     | Default value | Description                         |
| :------- | :------- | :------------ | :---------------------------------- |
| `method` | `string` | `undefined`   | name of the method                  |
| `args`   | `any`[]  | `[]`          | Array of the arguments for the call |

#### Returns

[`Call`](../modules.md#call)

Invocation object

#### Implementation of

[ContractInterface](ContractInterface.md).[populate](ContractInterface.md#populate)

#### Defined in

[src/contract/default.ts:286](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/default.ts#L286)

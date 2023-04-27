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

[src/contract/interface.ts:21](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L21)

---

### address

• `Abstract` **address**: `string`

#### Defined in

[src/contract/interface.ts:23](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L23)

---

### providerOrAccount

• `Abstract` **providerOrAccount**: [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md)

#### Defined in

[src/contract/interface.ts:25](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L25)

---

### deployTransactionHash

• `Optional` `Abstract` **deployTransactionHash**: `string`

#### Defined in

[src/contract/interface.ts:27](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L27)

---

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:29](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L29)

---

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Defined in

[src/contract/interface.ts:31](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L31)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Defined in

[src/contract/interface.ts:33](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L33)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Defined in

[src/contract/interface.ts:35](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L35)

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

[src/contract/interface.ts:44](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L44)

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

[src/contract/interface.ts:51](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L51)

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

[src/contract/interface.ts:59](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L59)

---

### call

▸ `Abstract` **call**(`method`, `args?`, `options?`): `Promise`<`Object`\>

Calls a method on a contract

#### Parameters

| Name       | Type                                       | Description                         |
| :--------- | :----------------------------------------- | :---------------------------------- |
| `method`   | `string`                                   | name of the method                  |
| `args?`    | `any`[]                                    | Array of the arguments for the call |
| `options?` | [`CallOptions`](../modules.md#calloptions) | optional blockIdentifier            |

#### Returns

`Promise`<`Object`\>

Result of the call as an array with key value pars

#### Defined in

[src/contract/interface.ts:69](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L69)

---

### invoke

▸ `Abstract` **invoke**(`method`, `args?`, `options?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invokes a method on a contract

#### Parameters

| Name       | Type                                   | Description                           |
| :--------- | :------------------------------------- | :------------------------------------ |
| `method`   | `string`                               | name of the method                    |
| `args?`    | `any`[]                                | Array of the arguments for the invoke |
| `options?` | [`Overrides`](../modules.md#overrides) |                                       |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Add Transaction Response

#### Defined in

[src/contract/interface.ts:79](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L79)

---

### estimate

▸ `Abstract` **estimate**(`method`, `args?`, `options?`): `Promise`<`any`\>

Estimates a method on a contract

#### Parameters

| Name                       | Type              | Description                         |
| :------------------------- | :---------------- | :---------------------------------- |
| `method`                   | `string`          | name of the method                  |
| `args?`                    | `any`[]           | Array of the arguments for the call |
| `options?`                 | `Object`          | optional blockIdentifier            |
| `options.blockIdentifier?` | `BlockIdentifier` | -                                   |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/contract/interface.ts:92](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L92)

---

### populate

▸ `Abstract` **populate**(`method`, `args?`): [`Invocation`](../modules.md#invocation)

Calls a method on a contract

#### Parameters

| Name     | Type     | Description                         |
| :------- | :------- | :---------------------------------- |
| `method` | `string` | name of the method                  |
| `args?`  | `any`[]  | Array of the arguments for the call |

#### Returns

[`Invocation`](../modules.md#invocation)

Invocation object

#### Defined in

[src/contract/interface.ts:107](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/contract/interface.ts#L107)

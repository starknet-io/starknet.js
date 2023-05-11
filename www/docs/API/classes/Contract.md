---
id: 'Contract'
title: 'Class: Contract'
sidebar_label: 'Contract'
sidebar_position: 0
custom_edit_url: null
---

Not used at the moment

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

[src/contract/default.ts:142](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L142)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

#### Implementation of

[ContractInterface](ContractInterface.md).[abi](ContractInterface.md#abi)

#### Defined in

[src/contract/default.ts:113](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L113)

---

### address

• **address**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[address](ContractInterface.md#address)

#### Defined in

[src/contract/default.ts:115](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L115)

---

### providerOrAccount

• **providerOrAccount**: [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md)

#### Implementation of

[ContractInterface](ContractInterface.md).[providerOrAccount](ContractInterface.md#provideroraccount)

#### Defined in

[src/contract/default.ts:117](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L117)

---

### deployTransactionHash

• `Optional` **deployTransactionHash**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[deployTransactionHash](ContractInterface.md#deploytransactionhash)

#### Defined in

[src/contract/default.ts:119](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L119)

---

### structs

• `Protected` `Readonly` **structs**: `Object`

#### Index signature

▪ [name: `string`]: [`StructAbi`](../modules.md#structabi)

#### Defined in

[src/contract/default.ts:121](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L121)

---

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[functions](ContractInterface.md#functions)

#### Defined in

[src/contract/default.ts:123](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L123)

---

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[callStatic](ContractInterface.md#callstatic)

#### Defined in

[src/contract/default.ts:125](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L125)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[populateTransaction](ContractInterface.md#populatetransaction)

#### Defined in

[src/contract/default.ts:127](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L127)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[estimateFee](ContractInterface.md#estimatefee)

#### Defined in

[src/contract/default.ts:129](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L129)

---

### callData

• `Private` **callData**: [`CallData`](CallData.md)

#### Defined in

[src/contract/default.ts:133](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L133)

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

[src/contract/default.ts:196](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L196)

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

[src/contract/default.ts:200](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L200)

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

[src/contract/default.ts:204](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L204)

---

### call

▸ **call**(`method`, `args?`, `«destructured»?`): `Promise`<[`Result`](../modules.md#result)\>

Calls a method on a contract

#### Parameters

| Name             | Type                                             | Default value | Description                         |
| :--------------- | :----------------------------------------------- | :------------ | :---------------------------------- |
| `method`         | `string`                                         | `undefined`   | name of the method                  |
| `args`           | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | `[]`          | Array of the arguments for the call |
| `«destructured»` | [`CallOptions`](../modules.md#calloptions)       | `{}`          | optional blockIdentifier            |

#### Returns

`Promise`<[`Result`](../modules.md#result)\>

Result of the call as an array with key value pars

#### Implementation of

[ContractInterface](ContractInterface.md).[call](ContractInterface.md#call)

#### Defined in

[src/contract/default.ts:212](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L212)

---

### invoke

▸ **invoke**(`method`, `args?`, `«destructured»?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Invokes a method on a contract

#### Parameters

| Name             | Type                                             | Default value | Description                                       |
| :--------------- | :----------------------------------------------- | :------------ | :------------------------------------------------ |
| `method`         | `string`                                         | `undefined`   | name of the method                                |
| `args`           | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | `[]`          | Array of the arguments for the invoke or Calldata |
| `«destructured»` | [`InvokeOptions`](../modules.md#invokeoptions)   | `{}`          |                                                   |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/InvokeFunctionResponse.md)\>

Add Transaction Response

#### Implementation of

[ContractInterface](ContractInterface.md).[invoke](ContractInterface.md#invoke)

#### Defined in

[src/contract/default.ts:254](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L254)

---

### estimate

▸ **estimate**(`method`, `args?`): `Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

Estimates a method on a contract

#### Parameters

| Name     | Type                                             | Default value | Description                                     |
| :------- | :----------------------------------------------- | :------------ | :---------------------------------------------- |
| `method` | `string`                                         | `undefined`   | name of the method                              |
| `args`   | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | `[]`          | Array of the arguments for the call or Calldata |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/EstimateFeeResponse.md)\>

#### Implementation of

[ContractInterface](ContractInterface.md).[estimate](ContractInterface.md#estimate)

#### Defined in

[src/contract/default.ts:298](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L298)

---

### populate

▸ **populate**(`method`, `args?`): [`Call`](../modules.md#call)

Calls a method on a contract

#### Parameters

| Name     | Type                                             | Default value | Description                                     |
| :------- | :----------------------------------------------- | :------------ | :---------------------------------------------- |
| `method` | `string`                                         | `undefined`   | name of the method                              |
| `args`   | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | `[]`          | Array of the arguments for the call or Calldata |

#### Returns

[`Call`](../modules.md#call)

Invocation object

#### Implementation of

[ContractInterface](ContractInterface.md).[populate](ContractInterface.md#populate)

#### Defined in

[src/contract/default.ts:312](https://github.com/0xs34n/starknet.js/blob/develop/src/contract/default.ts#L312)

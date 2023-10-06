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

▪ [key: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction) \| `any`

## Constructors

### constructor

• **new Contract**(`abi`, `address`, `providerOrAccount?`)

Contract class to handle contract methods

#### Parameters

| Name                | Type                                                                                     | Default value     | Description                                   |
| :------------------ | :--------------------------------------------------------------------------------------- | :---------------- | :-------------------------------------------- |
| `abi`               | [`Abi`](../namespaces/types.md#abi)                                                      | `undefined`       | Abi of the contract object                    |
| `address`           | `string`                                                                                 | `undefined`       | (optional) - address to connect to            |
| `providerOrAccount` | [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md) | `defaultProvider` | (optional) - Provider or Account to attach to |

#### Defined in

[src/contract/default.ts:144](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L144)

## Properties

### abi

• **abi**: [`Abi`](../namespaces/types.md#abi)

#### Implementation of

[ContractInterface](ContractInterface.md).[abi](ContractInterface.md#abi)

#### Defined in

[src/contract/default.ts:115](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L115)

---

### address

• **address**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[address](ContractInterface.md#address)

#### Defined in

[src/contract/default.ts:117](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L117)

---

### providerOrAccount

• **providerOrAccount**: [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md)

#### Implementation of

[ContractInterface](ContractInterface.md).[providerOrAccount](ContractInterface.md#provideroraccount)

#### Defined in

[src/contract/default.ts:119](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L119)

---

### deployTransactionHash

• `Optional` **deployTransactionHash**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[deployTransactionHash](ContractInterface.md#deploytransactionhash)

#### Defined in

[src/contract/default.ts:121](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L121)

---

### structs

• `Protected` `Readonly` **structs**: `Object`

#### Index signature

▪ [name: `string`]: [`StructAbi`](../namespaces/types.md#structabi)

#### Defined in

[src/contract/default.ts:123](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L123)

---

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[functions](ContractInterface.md#functions)

#### Defined in

[src/contract/default.ts:125](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L125)

---

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[callStatic](ContractInterface.md#callstatic)

#### Defined in

[src/contract/default.ts:127](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L127)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../namespaces/types.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[populateTransaction](ContractInterface.md#populatetransaction)

#### Defined in

[src/contract/default.ts:129](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L129)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../namespaces/types.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[estimateFee](ContractInterface.md#estimatefee)

#### Defined in

[src/contract/default.ts:131](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L131)

---

### callData

• `Private` **callData**: [`CallData`](CallData.md)

#### Defined in

[src/contract/default.ts:135](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L135)

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

[src/contract/default.ts:198](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L198)

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

[src/contract/default.ts:202](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L202)

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

[src/contract/default.ts:206](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L206)

---

### call

▸ **call**(`method`, `args?`, `«destructured»?`): `Promise`<[`Result`](../namespaces/types.md#result)\>

Calls a method on a contract

#### Parameters

| Name             | Type                                                      | Default value | Description                         |
| :--------------- | :-------------------------------------------------------- | :------------ | :---------------------------------- |
| `method`         | `string`                                                  | `undefined`   | name of the method                  |
| `args`           | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | `[]`          | Array of the arguments for the call |
| `«destructured»` | [`CallOptions`](../namespaces/types.md#calloptions)       | `{}`          | optional blockIdentifier            |

#### Returns

`Promise`<[`Result`](../namespaces/types.md#result)\>

Result of the call as an array with key value pars

#### Implementation of

[ContractInterface](ContractInterface.md).[call](ContractInterface.md#call)

#### Defined in

[src/contract/default.ts:214](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L214)

---

### invoke

▸ **invoke**(`method`, `args?`, `«destructured»?`): `Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Invokes a method on a contract

#### Parameters

| Name             | Type                                                      | Default value | Description                                       |
| :--------------- | :-------------------------------------------------------- | :------------ | :------------------------------------------------ |
| `method`         | `string`                                                  | `undefined`   | name of the method                                |
| `args`           | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | `[]`          | Array of the arguments for the invoke or Calldata |
| `«destructured»` | [`InvokeOptions`](../namespaces/types.md#invokeoptions)   | `{}`          |                                                   |

#### Returns

`Promise`<[`InvokeFunctionResponse`](../interfaces/types.InvokeFunctionResponse.md)\>

Add Transaction Response

#### Implementation of

[ContractInterface](ContractInterface.md).[invoke](ContractInterface.md#invoke)

#### Defined in

[src/contract/default.ts:256](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L256)

---

### estimate

▸ **estimate**(`method`, `args?`): `Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

Estimates a method on a contract

#### Parameters

| Name     | Type                                                      | Default value | Description                                     |
| :------- | :-------------------------------------------------------- | :------------ | :---------------------------------------------- |
| `method` | `string`                                                  | `undefined`   | name of the method                              |
| `args`   | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | `[]`          | Array of the arguments for the call or Calldata |

#### Returns

`Promise`<[`EstimateFeeResponse`](../interfaces/types.EstimateFeeResponse.md)\>

#### Implementation of

[ContractInterface](ContractInterface.md).[estimate](ContractInterface.md#estimate)

#### Defined in

[src/contract/default.ts:300](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L300)

---

### populate

▸ **populate**(`method`, `args?`): [`Call`](../namespaces/types.md#call)

Calls a method on a contract

#### Parameters

| Name     | Type                                        | Default value | Description                                     |
| :------- | :------------------------------------------ | :------------ | :---------------------------------------------- |
| `method` | `string`                                    | `undefined`   | name of the method                              |
| `args`   | [`RawArgs`](../namespaces/types.md#rawargs) | `[]`          | Array of the arguments for the call or Calldata |

#### Returns

[`Call`](../namespaces/types.md#call)

Invocation object

#### Implementation of

[ContractInterface](ContractInterface.md).[populate](ContractInterface.md#populate)

#### Defined in

[src/contract/default.ts:314](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L314)

---

### isCairo1

▸ **isCairo1**(): `boolean`

tells if the contract comes from a Cairo 1 contract

**`Example`**

```typescript
const isCairo1: boolean = myContract.isCairo1();
```

#### Returns

`boolean`

TRUE if the contract comes from a Cairo1 contract

#### Implementation of

[ContractInterface](ContractInterface.md).[isCairo1](ContractInterface.md#iscairo1)

#### Defined in

[src/contract/default.ts:324](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/default.ts#L324)

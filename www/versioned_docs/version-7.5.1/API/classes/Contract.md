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

▪ [key: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction) \| `any`

## Constructors

### constructor

• **new Contract**(`abi`, `address`, `providerOrAccount?`): [`Contract`](Contract.md)

Contract class to handle contract methods

#### Parameters

| Name                | Type                                                                                     | Default value     | Description                                   |
| :------------------ | :--------------------------------------------------------------------------------------- | :---------------- | :-------------------------------------------- |
| `abi`               | [`Abi`](../namespaces/types.md#abi)                                                      | `undefined`       | Abi of the contract object                    |
| `address`           | `string`                                                                                 | `undefined`       | (optional) - address to connect to            |
| `providerOrAccount` | [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md) | `defaultProvider` | (optional) - Provider or Account to attach to |

#### Returns

[`Contract`](Contract.md)

#### Defined in

[src/contract/default.ts:138](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L138)

## Properties

### abi

• **abi**: [`Abi`](../namespaces/types.md#abi)

#### Implementation of

[ContractInterface](ContractInterface.md).[abi](ContractInterface.md#abi)

#### Defined in

[src/contract/default.ts:105](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L105)

---

### address

• **address**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[address](ContractInterface.md#address)

#### Defined in

[src/contract/default.ts:107](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L107)

---

### providerOrAccount

• **providerOrAccount**: [`ProviderInterface`](ProviderInterface.md) \| [`AccountInterface`](AccountInterface.md)

#### Implementation of

[ContractInterface](ContractInterface.md).[providerOrAccount](ContractInterface.md#provideroraccount)

#### Defined in

[src/contract/default.ts:109](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L109)

---

### deployTransactionHash

• `Optional` **deployTransactionHash**: `string`

#### Implementation of

[ContractInterface](ContractInterface.md).[deployTransactionHash](ContractInterface.md#deploytransactionhash)

#### Defined in

[src/contract/default.ts:111](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L111)

---

### structs

• `Protected` `Readonly` **structs**: `Object`

#### Index signature

▪ [name: `string`]: [`AbiStruct`](../namespaces/types.md#abistruct)

#### Defined in

[src/contract/default.ts:113](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L113)

---

### events

• `Protected` `Readonly` **events**: [`AbiEvents`](../namespaces/types.md#abievents)

#### Defined in

[src/contract/default.ts:115](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L115)

---

### functions

• `Readonly` **functions**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[functions](ContractInterface.md#functions)

#### Defined in

[src/contract/default.ts:117](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L117)

---

### callStatic

• `Readonly` **callStatic**: `Object`

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../namespaces/types.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[callStatic](ContractInterface.md#callstatic)

#### Defined in

[src/contract/default.ts:119](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L119)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../namespaces/types.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[populateTransaction](ContractInterface.md#populatetransaction)

#### Defined in

[src/contract/default.ts:121](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L121)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../namespaces/types.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[estimateFee](ContractInterface.md#estimatefee)

#### Defined in

[src/contract/default.ts:123](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L123)

---

### callData

• `Private` **callData**: [`CallData`](CallData.md)

#### Defined in

[src/contract/default.ts:127](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L127)

---

### contractOptions

• `Optional` **contractOptions**: [`ContractOptions`](../namespaces/types.md#contractoptions)

#### Defined in

[src/contract/default.ts:129](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L129)

## Methods

### withOptions

▸ **withOptions**(`options`): [`Contract`](Contract.md)

#### Parameters

| Name      | Type                                                        |
| :-------- | :---------------------------------------------------------- |
| `options` | [`ContractOptions`](../namespaces/types.md#contractoptions) |

#### Returns

[`Contract`](Contract.md)

#### Defined in

[src/contract/default.ts:194](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L194)

---

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

[src/contract/default.ts:199](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L199)

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

[src/contract/default.ts:203](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L203)

---

### deployed

▸ **deployed**(): `Promise`<[`Contract`](Contract.md)\>

Resolves when contract is deployed on the network or when no deployment transaction is found

#### Returns

`Promise`<[`Contract`](Contract.md)\>

Promise that resolves when contract is deployed on the network or when no deployment transaction is found

**`Throws`**

When deployment fails

#### Implementation of

[ContractInterface](ContractInterface.md).[deployed](ContractInterface.md#deployed)

#### Defined in

[src/contract/default.ts:207](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L207)

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

[src/contract/default.ts:215](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L215)

---

### invoke

▸ **invoke**(`method`, `args?`, `«destructured»?`): `Promise`<\{ `transaction_hash`: `string` }\>

Invokes a method on a contract

#### Parameters

| Name             | Type                                                      | Default value | Description                                       |
| :--------------- | :-------------------------------------------------------- | :------------ | :------------------------------------------------ |
| `method`         | `string`                                                  | `undefined`   | name of the method                                |
| `args`           | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | `[]`          | Array of the arguments for the invoke or Calldata |
| `«destructured»` | [`InvokeOptions`](../namespaces/types.md#invokeoptions)   | `{}`          |                                                   |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

Add Transaction Response

#### Implementation of

[ContractInterface](ContractInterface.md).[invoke](ContractInterface.md#invoke)

#### Defined in

[src/contract/default.ts:256](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L256)

---

### estimate

▸ **estimate**(`method`, `args?`): `Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

Estimates a method on a contract

#### Parameters

| Name     | Type                                                      | Default value | Description                                     |
| :------- | :-------------------------------------------------------- | :------------ | :---------------------------------------------- |
| `method` | `string`                                                  | `undefined`   | name of the method                              |
| `args`   | [`ArgsOrCalldata`](../namespaces/types.md#argsorcalldata) | `[]`          | Array of the arguments for the call or Calldata |

#### Returns

`Promise`<[`EstimateFeeResponse`](../namespaces/types.md#estimatefeeresponse)\>

#### Implementation of

[ContractInterface](ContractInterface.md).[estimate](ContractInterface.md#estimate)

#### Defined in

[src/contract/default.ts:298](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L298)

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

[src/contract/default.ts:312](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L312)

---

### parseEvents

▸ **parseEvents**(`receipt`): [`ParsedEvents`](../namespaces/types.md#parsedevents)

Parse contract events of a GetTransactionReceiptResponse received from waitForTransaction. Based on contract's abi

#### Parameters

| Name      | Type                                                                                    | Description         |
| :-------- | :-------------------------------------------------------------------------------------- | :------------------ |
| `receipt` | [`GetTransactionReceiptResponse`](../namespaces/types.md#gettransactionreceiptresponse) | transaction receipt |

#### Returns

[`ParsedEvents`](../namespaces/types.md#parsedevents)

Events parsed

#### Implementation of

[ContractInterface](ContractInterface.md).[parseEvents](ContractInterface.md#parseevents)

#### Defined in

[src/contract/default.ts:323](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L323)

---

### isCairo1

▸ **isCairo1**(): `boolean`

tells if the contract comes from a Cairo 1 contract

#### Returns

`boolean`

TRUE if the contract comes from a Cairo1 contract

**`Example`**

```typescript
const isCairo1: boolean = myContract.isCairo1();
```

#### Implementation of

[ContractInterface](ContractInterface.md).[isCairo1](ContractInterface.md#iscairo1)

#### Defined in

[src/contract/default.ts:354](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L354)

---

### getVersion

▸ **getVersion**(): `Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

Retrieves the version of the contract (cairo version & compiler version)

#### Returns

`Promise`<[`ContractVersion`](../namespaces/types.md#contractversion)\>

#### Implementation of

[ContractInterface](ContractInterface.md).[getVersion](ContractInterface.md#getversion)

#### Defined in

[src/contract/default.ts:358](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L358)

---

### typedv2

▸ **typedv2**<`TAbi`\>(`tAbi`): [`TypedContractV2`](../modules.md#typedcontractv2)<`TAbi`\>

Returns a typed instance of ContractV2 based on the supplied ABI.

#### Type parameters

| Name   | Type                                                                                                                            |
| :----- | :------------------------------------------------------------------------------------------------------------------------------ |
| `TAbi` | extends readonly (`AbiImpl` \| `AbiFunction` \| `AbiInterface` \| `AbiConstructor` \| `AbiEvent` \| `AbiStruct` \| `AbiEnum`)[] |

#### Parameters

| Name   | Type   | Description                                            |
| :----- | :----- | :----------------------------------------------------- |
| `tAbi` | `TAbi` | The ABI (Abstract Binary Interface) of the ContractV2. |

#### Returns

[`TypedContractV2`](../modules.md#typedcontractv2)<`TAbi`\>

- A typed instance of ContractV2.

#### Implementation of

[ContractInterface](ContractInterface.md).[typedv2](ContractInterface.md#typedv2)

#### Defined in

[src/contract/default.ts:362](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/contract/default.ts#L362)

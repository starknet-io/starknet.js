---
id: 'ContractFactory'
title: 'Class: ContractFactory'
sidebar_label: 'ContractFactory'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ContractFactory**(`compiledContract`, `classHash`, `account`, `abi?`)

#### Parameters

| Name               | Type                                                          | Default value          |
| :----------------- | :------------------------------------------------------------ | :--------------------- |
| `compiledContract` | [`CompiledContract`](../namespaces/types.md#compiledcontract) | `undefined`            |
| `classHash`        | `string`                                                      | `undefined`            |
| `account`          | [`AccountInterface`](AccountInterface.md)                     | `undefined`            |
| `abi`              | [`Abi`](../namespaces/types.md#abi)                           | `compiledContract.abi` |

#### Defined in

[src/contract/contractFactory.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L18)

## Properties

### abi

• **abi**: [`Abi`](../namespaces/types.md#abi)

#### Defined in

[src/contract/contractFactory.ts:8](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L8)

---

### compiledContract

• **compiledContract**: [`CompiledContract`](../namespaces/types.md#compiledcontract)

#### Defined in

[src/contract/contractFactory.ts:10](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L10)

---

### classHash

• **classHash**: `string`

#### Defined in

[src/contract/contractFactory.ts:12](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L12)

---

### account

• **account**: [`AccountInterface`](AccountInterface.md)

#### Defined in

[src/contract/contractFactory.ts:14](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L14)

---

### CallData

• `Private` **CallData**: [`CallData`](CallData.md)

#### Defined in

[src/contract/contractFactory.ts:16](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L16)

## Methods

### deploy

▸ **deploy**(`...args`): `Promise`<[`Contract`](Contract.md)\>

Deploys contract and returns new instance of the Contract

#### Parameters

| Name      | Type                                                                            | Description                                       |
| :-------- | :------------------------------------------------------------------------------ | :------------------------------------------------ |
| `...args` | [`ArgsOrCalldataWithOptions`](../namespaces/types.md#argsorcalldatawithoptions) | Array of the constructor arguments for deployment |

#### Returns

`Promise`<[`Contract`](Contract.md)\>

deployed Contract

#### Defined in

[src/contract/contractFactory.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L38)

---

### connect

▸ **connect**(`account`): [`ContractFactory`](ContractFactory.md)

Attaches to new Account

#### Parameters

| Name      | Type                                      | Description                          |
| :-------- | :---------------------------------------- | :----------------------------------- |
| `account` | [`AccountInterface`](AccountInterface.md) | new Provider or Account to attach to |

#### Returns

[`ContractFactory`](ContractFactory.md)

ContractFactory

#### Defined in

[src/contract/contractFactory.ts:76](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L76)

---

### attach

▸ **attach**(`address`): [`Contract`](Contract.md)

Attaches current abi and account to the new address

#### Parameters

| Name      | Type     | Description      |
| :-------- | :------- | :--------------- |
| `address` | `string` | Contract address |

#### Returns

[`Contract`](Contract.md)

Contract

#### Defined in

[src/contract/contractFactory.ts:87](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/contract/contractFactory.ts#L87)

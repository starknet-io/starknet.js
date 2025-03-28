---
id: 'ContractFactory'
title: 'Class: ContractFactory'
sidebar_label: 'ContractFactory'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ContractFactory**(`params`): [`ContractFactory`](ContractFactory.md)

#### Parameters

| Name     | Type                                                           | Description                                                                                                                                                          |
| :------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`ContractFactoryParams`](../modules.md#contractfactoryparams) | CFParams - compiledContract: CompiledContract; - account: AccountInterface; - casm?: CairoAssembly; - classHash?: string; - compiledClassHash?: string; - abi?: Abi; |

#### Returns

[`ContractFactory`](ContractFactory.md)

#### Defined in

[src/contract/contractFactory.ts:47](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L47)

## Properties

### compiledContract

• **compiledContract**: [`CompiledContract`](../namespaces/types.md#compiledcontract)

#### Defined in

[src/contract/contractFactory.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L24)

---

### account

• **account**: [`AccountInterface`](AccountInterface.md)

#### Defined in

[src/contract/contractFactory.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L26)

---

### abi

• **abi**: [`Abi`](../namespaces/types.md#abi)

#### Defined in

[src/contract/contractFactory.ts:28](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L28)

---

### classHash

• `Optional` **classHash**: `string`

#### Defined in

[src/contract/contractFactory.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L30)

---

### casm

• `Optional` **casm**: [`CairoAssembly`](../namespaces/types.md#cairoassembly)

#### Defined in

[src/contract/contractFactory.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L32)

---

### compiledClassHash

• `Optional` **compiledClassHash**: `string`

#### Defined in

[src/contract/contractFactory.ts:34](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L34)

---

### CallData

• `Private` **CallData**: [`CallData`](CallData.md)

#### Defined in

[src/contract/contractFactory.ts:36](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L36)

## Methods

### deploy

▸ **deploy**(`...args`): `Promise`<[`Contract`](Contract.md)\>

Deploys contract and returns new instance of the Contract

If contract is not declared it will first declare it, and then deploy

#### Parameters

| Name      | Type                                                                            |
| :-------- | :------------------------------------------------------------------------------ |
| `...args` | [`ArgsOrCalldataWithOptions`](../namespaces/types.md#argsorcalldatawithoptions) |

#### Returns

`Promise`<[`Contract`](Contract.md)\>

#### Defined in

[src/contract/contractFactory.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L62)

---

### connect

▸ **connect**(`account`): [`ContractFactory`](ContractFactory.md)

Attaches to new Account

#### Parameters

| Name      | Type                                      | Description              |
| :-------- | :---------------------------------------- | :----------------------- |
| `account` | [`AccountInterface`](AccountInterface.md) | new Account to attach to |

#### Returns

[`ContractFactory`](ContractFactory.md)

#### Defined in

[src/contract/contractFactory.ts:101](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L101)

---

### attach

▸ **attach**(`address`): [`Contract`](Contract.md)

Attaches current abi and account to the new address

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

[`Contract`](Contract.md)

#### Defined in

[src/contract/contractFactory.ts:109](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/contract/contractFactory.ts#L109)

---
id: 'ContractFactory'
title: 'Class: ContractFactory'
sidebar_label: 'ContractFactory'
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ContractFactory**(`params`)

#### Parameters

| Name     | Type                                                           | Description                                                                                                                                                          |
| :------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `params` | [`ContractFactoryParams`](../modules.md#contractfactoryparams) | CFParams - compiledContract: CompiledContract; - account: AccountInterface; - casm?: CairoAssembly; - classHash?: string; - compiledClassHash?: string; - abi?: Abi; |

#### Defined in

[src/contract/contractFactory.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L46)

## Properties

### compiledContract

• **compiledContract**: [`CompiledContract`](../namespaces/types.md#compiledcontract)

#### Defined in

[src/contract/contractFactory.ts:23](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L23)

---

### account

• **account**: [`AccountInterface`](AccountInterface.md)

#### Defined in

[src/contract/contractFactory.ts:25](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L25)

---

### abi

• **abi**: [`Abi`](../namespaces/types.md#abi)

#### Defined in

[src/contract/contractFactory.ts:27](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L27)

---

### classHash

• `Optional` **classHash**: `string`

#### Defined in

[src/contract/contractFactory.ts:29](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L29)

---

### casm

• `Optional` **casm**: [`CairoAssembly`](../namespaces/types.md#cairoassembly)

#### Defined in

[src/contract/contractFactory.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L31)

---

### compiledClassHash

• `Optional` **compiledClassHash**: `string`

#### Defined in

[src/contract/contractFactory.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L33)

---

### CallData

• `Private` **CallData**: [`CallData`](CallData.md)

#### Defined in

[src/contract/contractFactory.ts:35](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L35)

## Methods

### deploy

▸ **deploy**(`...args`): `Promise`<[`Contract`](Contract.md)\>

Deploys contract and returns new instance of the Contract
If contract is not declared it will first declare it, and then deploy

#### Parameters

| Name      | Type                                                                            | Description                                       |
| :-------- | :------------------------------------------------------------------------------ | :------------------------------------------------ |
| `...args` | [`ArgsOrCalldataWithOptions`](../namespaces/types.md#argsorcalldatawithoptions) | Array of the constructor arguments for deployment |

#### Returns

`Promise`<[`Contract`](Contract.md)\>

deployed Contract

#### Defined in

[src/contract/contractFactory.ts:64](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L64)

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

[src/contract/contractFactory.ts:105](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L105)

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

[src/contract/contractFactory.ts:116](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/contract/contractFactory.ts#L116)

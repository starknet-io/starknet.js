---
id: 'types.RPC.RPCSPEC08.WALLET_API'
title: 'Namespace: WALLET_API'
sidebar_label: 'WALLET_API'
custom_edit_url: null
---

[RPC](types.RPC.md).[RPCSPEC08](types.RPC.RPCSPEC08.md).WALLET_API

## Interfaces

- [StarknetDomain](../interfaces/types.RPC.RPCSPEC08.WALLET_API.StarknetDomain.md)
- [TypedData](../interfaces/types.RPC.RPCSPEC08.WALLET_API.TypedData.md)
- [StarknetWindowObject](../interfaces/types.RPC.RPCSPEC08.WALLET_API.StarknetWindowObject.md)
- [AddInvokeTransactionParameters](../interfaces/types.RPC.RPCSPEC08.WALLET_API.AddInvokeTransactionParameters.md)
- [AddInvokeTransactionResult](../interfaces/types.RPC.RPCSPEC08.WALLET_API.AddInvokeTransactionResult.md)
- [AddDeclareTransactionParameters](../interfaces/types.RPC.RPCSPEC08.WALLET_API.AddDeclareTransactionParameters.md)
- [AddDeclareTransactionResult](../interfaces/types.RPC.RPCSPEC08.WALLET_API.AddDeclareTransactionResult.md)
- [RequestAccountsParameters](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RequestAccountsParameters.md)
- [WatchAssetParameters](../interfaces/types.RPC.RPCSPEC08.WALLET_API.WatchAssetParameters.md)
- [AddStarknetChainParameters](../interfaces/types.RPC.RPCSPEC08.WALLET_API.AddStarknetChainParameters.md)
- [SwitchStarknetChainParameters](../interfaces/types.RPC.RPCSPEC08.WALLET_API.SwitchStarknetChainParameters.md)
- [AccountDeploymentData](../interfaces/types.RPC.RPCSPEC08.WALLET_API.AccountDeploymentData.md)
- [ApiVersionRequest](../interfaces/types.RPC.RPCSPEC08.WALLET_API.ApiVersionRequest.md)
- [RpcTypeToMessageMap](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)
- [WalletEventHandlers](../interfaces/types.RPC.RPCSPEC08.WALLET_API.WalletEventHandlers.md)
- [NOT_ERC20](../interfaces/types.RPC.RPCSPEC08.WALLET_API.NOT_ERC20.md)
- [UNLISTED_NETWORK](../interfaces/types.RPC.RPCSPEC08.WALLET_API.UNLISTED_NETWORK.md)
- [USER_REFUSED_OP](../interfaces/types.RPC.RPCSPEC08.WALLET_API.USER_REFUSED_OP.md)
- [INVALID_REQUEST_PAYLOAD](../interfaces/types.RPC.RPCSPEC08.WALLET_API.INVALID_REQUEST_PAYLOAD.md)
- [ACCOUNT_ALREADY_DEPLOYED](../interfaces/types.RPC.RPCSPEC08.WALLET_API.ACCOUNT_ALREADY_DEPLOYED.md)
- [API_VERSION_NOT_SUPPORTED](../interfaces/types.RPC.RPCSPEC08.WALLET_API.API_VERSION_NOT_SUPPORTED.md)
- [UNKNOWN_ERROR](../interfaces/types.RPC.RPCSPEC08.WALLET_API.UNKNOWN_ERROR.md)

## Type Aliases

### Permission

Ƭ **Permission**: typeof [`Permission`](types.RPC.RPCSPEC08.WALLET_API.md#permission-1)[keyof typeof [`Permission`](types.RPC.RPCSPEC08.WALLET_API.md#permission-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/constants.d.ts:1

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/constants.d.ts:4

---

### BLOCK_TIMESTAMP

Ƭ **BLOCK_TIMESTAMP**: `number`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:3

---

### TIME_BOUNDS

Ƭ **TIME_BOUNDS**: `Object`

Object containing timestamps corresponding to `Execute After` and `Execute Before`

#### Type declaration

| Name             | Type                                                                   |
| :--------------- | :--------------------------------------------------------------------- |
| `execute_after`  | [`BLOCK_TIMESTAMP`](types.RPC.RPCSPEC08.WALLET_API.md#block_timestamp) |
| `execute_before` | [`BLOCK_TIMESTAMP`](types.RPC.RPCSPEC08.WALLET_API.md#block_timestamp) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:7

---

### TypedDataRevision

Ƭ **TypedDataRevision**: typeof [`TypedDataRevision`](types.RPC.RPCSPEC08.WALLET_API.md#typeddatarevision-1)[keyof typeof [`TypedDataRevision`](types.RPC.RPCSPEC08.WALLET_API.md#typeddatarevision-1)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:11

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:15

---

### StarknetEnumType

Ƭ **StarknetEnumType**: `Object`

#### Type declaration

| Name       | Type                                                          |
| :--------- | :------------------------------------------------------------ |
| `name`     | `string`                                                      |
| `type`     | [`ABI_TYPE_ENUM`](types.RPC.RPCSPEC08.API.md#abi_type_enum-1) |
| `contains` | `string`                                                      |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:16

---

### StarknetMerkleType

Ƭ **StarknetMerkleType**: `Object`

#### Type declaration

| Name       | Type           |
| :--------- | :------------- |
| `name`     | `string`       |
| `type`     | `"merkletree"` |
| `contains` | `string`       |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:21

---

### StarknetType

Ƭ **StarknetType**: \{ `name`: `string` ; `type`: `string` } \| [`StarknetEnumType`](types.RPC.RPCSPEC08.WALLET_API.md#starknetenumtype) \| [`StarknetMerkleType`](types.RPC.RPCSPEC08.WALLET_API.md#starknetmerkletype)

SPEC: STARKNET_TYPE
A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.
Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
standard.

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:32

---

### OutsideExecutionTypedData

Ƭ **OutsideExecutionTypedData**: [`OutsideExecutionTypedDataV1`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddatav1) \| [`OutsideExecutionTypedDataV2`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutiontypeddatav2)

"A typed data object (in the sense of SNIP-12) which represents an outside execution payload, according to SNIP-9

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:58

---

### OutsideExecutionTypedDataV1

Ƭ **OutsideExecutionTypedDataV1**: `Object`

#### Type declaration

| Name          | Type                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| `types`       | `Record`<`string`, [`StarknetType`](types.RPC.RPCSPEC08.WALLET_API.md#starknettype)[]\>    |
| `primaryType` | `string`                                                                                   |
| `domain`      | [`StarknetDomain`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.StarknetDomain.md)         |
| `message`     | [`OutsideExecutionMessageV1`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutionmessagev1) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:59

---

### OutsideExecutionTypedDataV2

Ƭ **OutsideExecutionTypedDataV2**: `Object`

#### Type declaration

| Name          | Type                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| `types`       | `Record`<`string`, [`StarknetType`](types.RPC.RPCSPEC08.WALLET_API.md#starknettype)[]\>    |
| `primaryType` | `string`                                                                                   |
| `domain`      | [`StarknetDomain`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.StarknetDomain.md)         |
| `message`     | [`OutsideExecutionMessageV2`](types.RPC.RPCSPEC08.WALLET_API.md#outsideexecutionmessagev2) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:65

---

### OutsideExecutionMessageV1

Ƭ **OutsideExecutionMessageV1**: `Object`

#### Type declaration

| Name             | Type                                                                 |
| :--------------- | :------------------------------------------------------------------- |
| `caller`         | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `nonce`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `execute_after`  | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `execute_before` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `calls_len`      | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `calls`          | [`OutsideCallV1`](types.RPC.RPCSPEC08.WALLET_API.md#outsidecallv1)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:71

---

### OutsideCallV1

Ƭ **OutsideCallV1**: `Object`

#### Type declaration

| Name           | Type                                            |
| :------------- | :---------------------------------------------- |
| `to`           | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) |
| `selector`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)       |
| `calldata_len` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |
| `calldata`     | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:79

---

### OutsideExecutionMessageV2

Ƭ **OutsideExecutionMessageV2**: `Object`

#### Type declaration

| Name             | Type                                                                 |
| :--------------- | :------------------------------------------------------------------- |
| `Caller`         | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `Nonce`          | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `Execute After`  | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `Execute Before` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)                            |
| `Calls`          | [`OutsideCallV2`](types.RPC.RPCSPEC08.WALLET_API.md#outsidecallv2)[] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:85

---

### OutsideCallV2

Ƭ **OutsideCallV2**: `Object`

#### Type declaration

| Name       | Type                                            |
| :--------- | :---------------------------------------------- |
| `To`       | [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address) |
| `Selector` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)       |
| `Calldata` | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]     |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:92

---

### Address

Ƭ **Address**: [`ADDRESS`](types.RPC.RPCSPEC08.API.md#address)

Account Address

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:6

---

### Signature

Ƭ **Signature**: [`SIGNATURE`](types.RPC.RPCSPEC08.API.md#signature)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:7

---

### PADDED_TXN_HASH

Ƭ **PADDED_TXN_HASH**: [`PADDED_FELT`](types.RPC.RPCSPEC08.WALLET_API.md#padded_felt)

The transaction hash, as assigned in Starknet

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:11

---

### PADDED_FELT

Ƭ **PADDED_FELT**: `string`

A padded felt represent 0x0 + (0-7) + (62 hex digits)

**`Pattern`**

^0x(0[0-7]{1}[a-fA-F0-9]{62}$)

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:16

---

### SpecVersion

Ƭ **SpecVersion**: `string`

A Starknet RPC spec version, only two numbers are provided

**`Pattern`**

^[0-9]+\\.[0-9]+$

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:21

---

### TokenSymbol

Ƭ **TokenSymbol**: `string`

ERC20 Token Symbol (min:1 char - max:6 chars)

**`Pattern`**

^[A-Za-z0-9]{1,6}$

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:26

---

### Asset

Ƭ **Asset**: `Object`

Starknet Token
Details of an onchain Starknet ERC20 token

#### Type declaration

| Name                | Type                                                                                                                                                                                                                |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`              | `"ERC20"`                                                                                                                                                                                                           |
| `options`           | \{ `address`: [`Address`](types.RPC.RPCSPEC08.WALLET_API.md#address) ; `symbol?`: [`TokenSymbol`](types.RPC.RPCSPEC08.WALLET_API.md#tokensymbol) ; `decimals?`: `number` ; `image?`: `string` ; `name?`: `string` } |
| `options.address`   | [`Address`](types.RPC.RPCSPEC08.WALLET_API.md#address)                                                                                                                                                              |
| `options.symbol?`   | [`TokenSymbol`](types.RPC.RPCSPEC08.WALLET_API.md#tokensymbol)                                                                                                                                                      |
| `options.decimals?` | `number`                                                                                                                                                                                                            |
| `options.image?`    | `string`                                                                                                                                                                                                            |
| `options.name?`     | `string`                                                                                                                                                                                                            |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:31

---

### StarknetChain

Ƭ **StarknetChain**: `Object`

#### Type declaration

| Name                  | Type                                               |
| :-------------------- | :------------------------------------------------- |
| `id`                  | `string`                                           |
| `chain_id`            | [`ChainId`](types.RPC.RPCSPEC08.API.md#chainid)    |
| `chain_name`          | `string`                                           |
| `rpc_urls?`           | `string`[]                                         |
| `block_explorer_url?` | `string`[]                                         |
| `native_currency?`    | [`Asset`](types.RPC.RPCSPEC08.WALLET_API.md#asset) |
| `icon_urls?`          | `string`[]                                         |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:41

---

### Call

Ƭ **Call**: `Object`

#### Type declaration

| Name               | Type                                                   |
| :----------------- | :----------------------------------------------------- |
| `contract_address` | [`Address`](types.RPC.RPCSPEC08.WALLET_API.md#address) |
| `entry_point`      | `string`                                               |
| `calldata?`        | [`FELT`](types.RPC.RPCSPEC08.API.md#felt)[]            |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:50

---

### API_VERSION

Ƭ **API_VERSION**: `string`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/components.d.ts:126

---

### RpcMessage

Ƭ **RpcMessage**: \{ [K in keyof RpcTypeToMessageMap]: Object & RpcTypeToMessageMap[K] }[keyof [`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/methods.d.ts:125

---

### IsParamsOptional

Ƭ **IsParamsOptional**<`T`\>: `undefined` extends [`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)[`T`][``"params"``] ? `true` : `false`

#### Type parameters

| Name | Type                                                                                                       |
| :--- | :--------------------------------------------------------------------------------------------------------- |
| `T`  | extends keyof [`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md) |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/methods.d.ts:130

---

### RequestFnCall

Ƭ **RequestFnCall**<`T`\>: \{ `type`: `T` } & [`IsParamsOptional`](types.RPC.RPCSPEC08.WALLET_API.md#isparamsoptional)<`T`\> extends `true` ? \{ `params?`: [`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)[`T`][``"params"``] } : \{ `params`: [`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)[`T`][``"params"``] }

#### Type parameters

| Name | Type                                                                             |
| :--- | :------------------------------------------------------------------------------- |
| `T`  | extends [`RpcMessage`](types.RPC.RPCSPEC08.WALLET_API.md#rpcmessage)[``"type"``] |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/methods.d.ts:131

---

### RequestFn

Ƭ **RequestFn**: <T\>(`call`: [`RequestFnCall`](types.RPC.RPCSPEC08.WALLET_API.md#requestfncall)<`T`\>) => `Promise`<[`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)[`T`][``"result"``]\>

#### Type declaration

▸ <`T`\>(`call`): `Promise`<[`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)[`T`][``"result"``]\>

##### Type parameters

| Name | Type                                                                             |
| :--- | :------------------------------------------------------------------------------- |
| `T`  | extends [`RpcMessage`](types.RPC.RPCSPEC08.WALLET_API.md#rpcmessage)[``"type"``] |

##### Parameters

| Name   | Type                                                                     |
| :----- | :----------------------------------------------------------------------- |
| `call` | [`RequestFnCall`](types.RPC.RPCSPEC08.WALLET_API.md#requestfncall)<`T`\> |

##### Returns

`Promise`<[`RpcTypeToMessageMap`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.RpcTypeToMessageMap.md)[`T`][``"result"``]\>

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/methods.d.ts:138

---

### AccountChangeEventHandler

Ƭ **AccountChangeEventHandler**: (`accounts?`: `string`[]) => `void`

#### Type declaration

▸ (`accounts?`): `void`

##### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `accounts?` | `string`[] |

##### Returns

`void`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/events.d.ts:2

---

### NetworkChangeEventHandler

Ƭ **NetworkChangeEventHandler**: (`chainId?`: [`ChainId`](types.RPC.RPCSPEC08.API.md#chainid), `accounts?`: `string`[]) => `void`

#### Type declaration

▸ (`chainId?`, `accounts?`): `void`

##### Parameters

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `chainId?`  | [`ChainId`](types.RPC.RPCSPEC08.API.md#chainid) |
| `accounts?` | `string`[]                                      |

##### Returns

`void`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/events.d.ts:3

---

### WalletEvents

Ƭ **WalletEvents**: \{ [E in keyof WalletEventHandlers]: Object }[keyof [`WalletEventHandlers`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.WalletEventHandlers.md)]

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/events.d.ts:8

---

### WalletEventListener

Ƭ **WalletEventListener**: <E\>(`event`: `E`, `handleEvent`: [`WalletEventHandlers`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.WalletEventHandlers.md)[`E`]) => `void`

#### Type declaration

▸ <`E`\>(`event`, `handleEvent`): `void`

##### Type parameters

| Name | Type                                                                                                       |
| :--- | :--------------------------------------------------------------------------------------------------------- |
| `E`  | extends keyof [`WalletEventHandlers`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.WalletEventHandlers.md) |

##### Parameters

| Name          | Type                                                                                              |
| :------------ | :------------------------------------------------------------------------------------------------ |
| `event`       | `E`                                                                                               |
| `handleEvent` | [`WalletEventHandlers`](../interfaces/types.RPC.RPCSPEC08.WALLET_API.WalletEventHandlers.md)[`E`] |

##### Returns

`void`

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/events.d.ts:14

## Variables

### Permission

• `Const` **Permission**: `Object`

#### Type declaration

| Name       | Type         |
| :--------- | :----------- |
| `ACCOUNTS` | `"accounts"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/constants.d.ts:1

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/constants.d.ts:4

---

### TypedDataRevision

• `Const` **TypedDataRevision**: `Object`

#### Type declaration

| Name     | Type  |
| :------- | :---- |
| `ACTIVE` | `"1"` |
| `LEGACY` | `"0"` |

#### Defined in

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:11

node_modules/@starknet-io/starknet-types-08/dist/types/wallet-api/typedData.d.ts:15

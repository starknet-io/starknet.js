---
id: 'constants'
title: 'Namespace: constants'
sidebar_label: 'constants'
sidebar_position: 0
custom_edit_url: null
---

Utils

## Type Aliases

### BaseUrl

Ƭ **BaseUrl**: `ValuesType`<typeof [`BaseUrl`](constants.md#baseurl-1)\>

#### Defined in

[src/global/constants.ts:69](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L69)

[src/global/constants.ts:73](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L73)

---

### NetworkName

Ƭ **NetworkName**: `ValuesType`<typeof [`NetworkName`](constants.md#networkname-1)\>

#### Defined in

[src/global/constants.ts:76](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L76)

[src/global/constants.ts:80](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L80)

---

### StarknetChainId

Ƭ **StarknetChainId**: `ValuesType`<typeof [`StarknetChainId`](constants.md#starknetchainid-1)\>

#### Defined in

[src/global/constants.ts:83](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L83)

[src/global/constants.ts:87](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L87)

---

### TransactionHashPrefix

Ƭ **TransactionHashPrefix**: `ValuesType`<typeof [`TransactionHashPrefix`](constants.md#transactionhashprefix-1)\>

#### Defined in

[src/global/constants.ts:90](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L90)

[src/global/constants.ts:97](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L97)

---

### SupportedRpcVersion

Ƭ **SupportedRpcVersion**: `ValuesType`<typeof [`SupportedRpcVersion`](constants.md#supportedrpcversion-1)\>

#### Defined in

[src/global/constants.ts:103](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L103)

[src/global/constants.ts:109](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L109)

---

### SupportedTransactionVersion

Ƭ **SupportedTransactionVersion**: typeof [`V3`](RPC.RPCSPEC010.API.md#v3)

#### Defined in

[src/global/constants.ts:112](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L112)

---

### SupportedCairoVersion

Ƭ **SupportedCairoVersion**: `"1"`

#### Defined in

[src/global/constants.ts:113](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L113)

---

### ChannelMethodOptions

Ƭ **ChannelMethodOptions**: `Object`

Channel method-specific options

#### Type declaration

| Name                  | Type                                                                                                         |
| :-------------------- | :----------------------------------------------------------------------------------------------------------- |
| `simulateTransaction` | `Omit`<[`getSimulateTransactionOptions`](../modules.md#getsimulatetransactionoptions), `"blockIdentifier"`\> |
| `getEstimateFee`      | `Omit`<[`getEstimateFeeBulkOptions`](../modules.md#getestimatefeebulkoptions), `"blockIdentifier"`\>         |

#### Defined in

[src/global/constants.ts:118](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L118)

---

### ChannelDefaultOptions

Ƭ **ChannelDefaultOptions**: `Object`

Channel default options

#### Type declaration

| Name              | Type                                 |
| :---------------- | :----------------------------------- |
| `headers`         | `Record`<`string`, `string`\>        |
| `blockIdentifier` | [`BlockTag`](../modules.md#blocktag) |
| `retries`         | `number`                             |

#### Defined in

[src/global/constants.ts:126](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L126)

---

### ChannelDefaults

Ƭ **ChannelDefaults**: `Object`

Channel defaults configuration

#### Type declaration

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `options` | [`ChannelDefaultOptions`](constants.md#channeldefaultoptions) |
| `methods` | [`ChannelMethodOptions`](constants.md#channelmethodoptions)   |

#### Defined in

[src/global/constants.ts:135](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L135)

## Variables

### IS_BROWSER

• `Const` **IS_BROWSER**: `boolean`

#### Defined in

[src/utils/encode.ts:3](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/encode.ts#L3)

---

### TEXT_TO_FELT_MAX_LEN

• `Const` **TEXT_TO_FELT_MAX_LEN**: `31`

Cairo Felt support storing max 31 character

#### Defined in

[src/global/constants.ts:15](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L15)

---

### ZERO

• `Const` **ZERO**: `0n`

#### Defined in

[src/global/constants.ts:16](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L16)

---

### MASK_250

• `Const` **MASK_250**: `bigint`

#### Defined in

[src/global/constants.ts:17](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L17)

---

### MASK_31

• `Const` **MASK_31**: `bigint`

#### Defined in

[src/global/constants.ts:18](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L18)

---

### API_VERSION

• `Const` **API_VERSION**: `0n`

#### Defined in

[src/global/constants.ts:19](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L19)

---

### PRIME

• `Const` **PRIME**: `bigint`

#### Defined in

[src/global/constants.ts:20](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L20)

---

### MAX_STORAGE_ITEM_SIZE

• `Const` **MAX_STORAGE_ITEM_SIZE**: `256n`

#### Defined in

[src/global/constants.ts:23](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L23)

---

### ADDR_BOUND

• `Const` **ADDR_BOUND**: `bigint`

#### Defined in

[src/global/constants.ts:24](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L24)

---

### RANGE_FELT

• `Const` **RANGE_FELT**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:28](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L28)

---

### RANGE_U8

• `Const` **RANGE_U8**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:31](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L31)

---

### RANGE_U16

• `Const` **RANGE_U16**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:32](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L32)

---

### RANGE_U32

• `Const` **RANGE_U32**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:33](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L33)

---

### RANGE_U64

• `Const` **RANGE_U64**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:34](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L34)

---

### RANGE_U96

• `Const` **RANGE_U96**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:35](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L35)

---

### RANGE_U128

• `Const` **RANGE_U128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:36](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L36)

---

### RANGE_I8

• `Const` **RANGE_I8**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:39](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L39)

---

### RANGE_I16

• `Const` **RANGE_I16**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:40](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L40)

---

### RANGE_I32

• `Const` **RANGE_I32**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:41](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L41)

---

### RANGE_I64

• `Const` **RANGE_I64**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:42](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L42)

---

### RANGE_I128

• `Const` **RANGE_I128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:43](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L43)

---

### LegacyUDC

• `Const` **LegacyUDC**: `Object`

#### Type declaration

| Name         | Type                                                                   |
| :----------- | :--------------------------------------------------------------------- |
| `ADDRESS`    | `"0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"` |
| `ENTRYPOINT` | `"deployContract"`                                                     |

#### Defined in

[src/global/constants.ts:45](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L45)

---

### UDC

• `Const` **UDC**: `Object`

#### Type declaration

| Name         | Type                                                                   |
| :----------- | :--------------------------------------------------------------------- |
| `ADDRESS`    | `"0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125"` |
| `ENTRYPOINT` | `"deploy_contract"`                                                    |

#### Defined in

[src/global/constants.ts:50](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L50)

---

### OutsideExecutionCallerAny

• `Const` **OutsideExecutionCallerAny**: `"0x414e595f43414c4c4552"`

#### Defined in

[src/global/constants.ts:55](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L55)

---

### SNIP9_V1_INTERFACE_ID

• `Const` **SNIP9_V1_INTERFACE_ID**: `"0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181"`

#### Defined in

[src/global/constants.ts:56](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L56)

---

### SNIP9_V2_INTERFACE_ID

• `Const` **SNIP9_V2_INTERFACE_ID**: `"0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872"`

#### Defined in

[src/global/constants.ts:58](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L58)

---

### HARDENING_BYTE

• `Const` **HARDENING_BYTE**: `128`

#### Defined in

[src/global/constants.ts:63](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L63)

---

### HARDENING_4BYTES

• `Const` **HARDENING_4BYTES**: `2147483648n`

#### Defined in

[src/global/constants.ts:65](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L65)

---

### BaseUrl

• `Const` **BaseUrl**: `Object`

#### Type declaration

| Name         | Type                                  |
| :----------- | :------------------------------------ |
| `SN_MAIN`    | `"https://alpha-mainnet.starknet.io"` |
| `SN_SEPOLIA` | `"https://alpha-sepolia.starknet.io"` |

#### Defined in

[src/global/constants.ts:69](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L69)

[src/global/constants.ts:73](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L73)

---

### NetworkName

• `Const` **NetworkName**: `Object`

#### Type declaration

| Name         | Type           |
| :----------- | :------------- |
| `SN_MAIN`    | `"SN_MAIN"`    |
| `SN_SEPOLIA` | `"SN_SEPOLIA"` |

#### Defined in

[src/global/constants.ts:76](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L76)

[src/global/constants.ts:80](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L80)

---

### StarknetChainId

• `Const` **StarknetChainId**: `Object`

#### Type declaration

| Name         | Type                       |
| :----------- | :------------------------- |
| `SN_MAIN`    | `"0x534e5f4d41494e"`       |
| `SN_SEPOLIA` | `"0x534e5f5345504f4c4941"` |

#### Defined in

[src/global/constants.ts:83](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L83)

[src/global/constants.ts:87](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L87)

---

### TransactionHashPrefix

• `Const` **TransactionHashPrefix**: `Object`

#### Type declaration

| Name             | Type                               |
| :--------------- | :--------------------------------- |
| `DECLARE`        | `"0x6465636c617265"`               |
| `DEPLOY`         | `"0x6465706c6f79"`                 |
| `DEPLOY_ACCOUNT` | `"0x6465706c6f795f6163636f756e74"` |
| `INVOKE`         | `"0x696e766f6b65"`                 |
| `L1_HANDLER`     | `"0x6c315f68616e646c6572"`         |

#### Defined in

[src/global/constants.ts:90](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L90)

[src/global/constants.ts:97](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L97)

---

### SupportedRpcVersion

• `Const` **SupportedRpcVersion**: `Object`

dot format rpc versions

#### Type declaration

| Name      | Type       |
| :-------- | :--------- |
| `0.9.0`   | `"0.9.0"`  |
| `0.10.0`  | `"0.10.0"` |
| `v0_9_0`  | `"0.9.0"`  |
| `v0_10_0` | `"0.10.0"` |

#### Defined in

[src/global/constants.ts:103](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L103)

[src/global/constants.ts:109](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L109)

---

### DEFAULT_GLOBAL_CONFIG

• `Const` **DEFAULT_GLOBAL_CONFIG**: `Object`

#### Type declaration

| Name                     | Type                                                                      | Description                                                                                                                                                                           |
| :----------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `logLevel`               | [`LogLevel`](../modules.md#loglevel)                                      | -                                                                                                                                                                                     |
| `rpcVersion`             | [`SupportedRpcVersion`](constants.md#supportedrpcversion)                 | -                                                                                                                                                                                     |
| `transactionVersion`     | [`SupportedTransactionVersion`](constants.md#supportedtransactionversion) | -                                                                                                                                                                                     |
| `resourceBoundsOverhead` | [`ResourceBoundsOverhead`](../modules.md#resourceboundsoverhead)          | -                                                                                                                                                                                     |
| `defaultTipType`         | [`TipType`](../modules.md#tiptype)                                        | -                                                                                                                                                                                     |
| `channelDefaults`        | [`ChannelDefaults`](constants.md#channeldefaults)                         | -                                                                                                                                                                                     |
| `fetch`                  | `any`                                                                     | -                                                                                                                                                                                     |
| `websocket`              | `any`                                                                     | -                                                                                                                                                                                     |
| `buffer`                 | `any`                                                                     | -                                                                                                                                                                                     |
| `blake`                  | (`uint8Array`: `Uint8Array`) => `Uint8Array` \| `undefined`               | Custom blake function **`Param`** The uint8Array to hash **`Example`** `typescript config.set('blake', (uint8Array: Uint8Array) => { return blake2s(uint8Array, { dkLen: 32 }); }); ` |

#### Defined in

[src/global/constants.ts:141](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L141)

---

### RPC_DEFAULT_NODES

• `Const` **RPC_DEFAULT_NODES**: `Object`

#### Type declaration

| Name         | Type                                                              |
| :----------- | :---------------------------------------------------------------- |
| `SN_MAIN`    | readonly [``"https://api.zan.top/public/starknet-mainnet/rpc/"``] |
| `SN_SEPOLIA` | readonly [``"https://api.zan.top/public/starknet-sepolia/rpc/"``] |

#### Defined in

[src/global/constants.ts:204](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L204)

---

### PAYMASTER_RPC_NODES

• `Const` **PAYMASTER_RPC_NODES**: `Object`

#### Type declaration

| Name         | Type                                                |
| :----------- | :-------------------------------------------------- |
| `SN_MAIN`    | readonly [``"https://starknet.paymaster.avnu.fi"``] |
| `SN_SEPOLIA` | readonly [``"https://sepolia.paymaster.avnu.fi"``]  |

#### Defined in

[src/global/constants.ts:209](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L209)

---

### SYSTEM_MESSAGES

• `Const` **SYSTEM_MESSAGES**: `Object`

#### Type declaration

| Name                             | Type     |
| :------------------------------- | :------- |
| `legacyTxWarningMessage`         | `string` |
| `legacyTxRPC08Message`           | `string` |
| `SWOldV3`                        | `string` |
| `channelVersionMismatch`         | `string` |
| `unsupportedSpecVersion`         | `string` |
| `maxFeeInV3`                     | `string` |
| `declareNonSierra`               | `string` |
| `unsupportedMethodForRpcVersion` | `string` |
| `txEvictedFromMempool`           | `string` |
| `consensusFailed`                | `string` |
| `txFailsBlockBuildingValidation` | `string` |

#### Defined in

[src/global/constants.ts:215](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L215)

---

### SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS

• `Const` **SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS**: `"0.14.1"`

#### Defined in

[src/global/constants.ts:233](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/global/constants.ts#L233)

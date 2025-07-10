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

[src/global/constants.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L56)

[src/global/constants.ts:60](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L60)

---

### NetworkName

Ƭ **NetworkName**: `ValuesType`<typeof [`NetworkName`](constants.md#networkname-1)\>

#### Defined in

[src/global/constants.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L63)

[src/global/constants.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L67)

---

### StarknetChainId

Ƭ **StarknetChainId**: `ValuesType`<typeof [`StarknetChainId`](constants.md#starknetchainid-1)\>

#### Defined in

[src/global/constants.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L70)

[src/global/constants.ts:74](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L74)

---

### TransactionHashPrefix

Ƭ **TransactionHashPrefix**: `ValuesType`<typeof [`TransactionHashPrefix`](constants.md#transactionhashprefix-1)\>

#### Defined in

[src/global/constants.ts:77](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L77)

[src/global/constants.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L84)

---

### SupportedRpcVersion

Ƭ **SupportedRpcVersion**: `ValuesType`<typeof [`SupportedRpcVersion`](constants.md#supportedrpcversion-1)\>

#### Defined in

[src/global/constants.ts:90](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L90)

[src/global/constants.ts:96](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L96)

---

### SupportedTransactionVersion

Ƭ **SupportedTransactionVersion**: typeof [`V2`](types.RPC.RPCSPEC08.API.md#v2) \| typeof [`V3`](types.RPC.RPCSPEC08.API.md#v3)

#### Defined in

[src/global/constants.ts:99](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L99)

## Variables

### IS_BROWSER

• `Const` **IS_BROWSER**: `boolean`

#### Defined in

[src/utils/encode.ts:3](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/encode.ts#L3)

---

### TEXT_TO_FELT_MAX_LEN

• `Const` **TEXT_TO_FELT_MAX_LEN**: `31`

Cairo Felt support storing max 31 character

#### Defined in

[src/global/constants.ts:12](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L12)

---

### TRANSACTION_VERSION

• **TRANSACTION_VERSION**: `Object`

#### Type declaration

| Name | Type                                    | Description                                                      |
| :--- | :-------------------------------------- | :--------------------------------------------------------------- |
| `V0` | `"0x0"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V1` | `"0x1"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V2` | `"0x2"`                                 | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `V3` | `"0x3"`                                 | -                                                                |
| `F0` | `"0x100000000000000000000000000000000"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F1` | `"0x100000000000000000000000000000001"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F2` | `"0x100000000000000000000000000000002"` | **`Deprecated`** Starknet 0.14 will not support this transaction |
| `F3` | `"0x100000000000000000000000000000003"` | -                                                                |

#### Defined in

[src/global/constants.ts:19](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L19)

---

### ZERO

• `Const` **ZERO**: `0n`

#### Defined in

[src/global/constants.ts:21](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L21)

---

### MASK_250

• `Const` **MASK_250**: `bigint`

#### Defined in

[src/global/constants.ts:22](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L22)

---

### MASK_31

• `Const` **MASK_31**: `bigint`

#### Defined in

[src/global/constants.ts:23](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L23)

---

### API_VERSION

• `Const` **API_VERSION**: `0n`

#### Defined in

[src/global/constants.ts:24](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L24)

---

### PRIME

• `Const` **PRIME**: `bigint`

#### Defined in

[src/global/constants.ts:25](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L25)

---

### MAX_STORAGE_ITEM_SIZE

• `Const` **MAX_STORAGE_ITEM_SIZE**: `256n`

#### Defined in

[src/global/constants.ts:28](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L28)

---

### ADDR_BOUND

• `Const` **ADDR_BOUND**: `bigint`

#### Defined in

[src/global/constants.ts:29](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L29)

---

### RANGE_FELT

• `Const` **RANGE_FELT**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:33](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L33)

---

### RANGE_I128

• `Const` **RANGE_I128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:34](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L34)

---

### RANGE_U128

• `Const` **RANGE_U128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:35](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L35)

---

### UDC

• `Const` **UDC**: `Object`

#### Type declaration

| Name         | Type                                                                   |
| :----------- | :--------------------------------------------------------------------- |
| `ADDRESS`    | `"0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"` |
| `ENTRYPOINT` | `"deployContract"`                                                     |

#### Defined in

[src/global/constants.ts:37](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L37)

---

### OutsideExecutionCallerAny

• `Const` **OutsideExecutionCallerAny**: `"0x414e595f43414c4c4552"`

#### Defined in

[src/global/constants.ts:42](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L42)

---

### SNIP9_V1_INTERFACE_ID

• `Const` **SNIP9_V1_INTERFACE_ID**: `"0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181"`

#### Defined in

[src/global/constants.ts:43](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L43)

---

### SNIP9_V2_INTERFACE_ID

• `Const` **SNIP9_V2_INTERFACE_ID**: `"0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872"`

#### Defined in

[src/global/constants.ts:45](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L45)

---

### HARDENING_BYTE

• `Const` **HARDENING_BYTE**: `128`

#### Defined in

[src/global/constants.ts:50](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L50)

---

### HARDENING_4BYTES

• `Const` **HARDENING_4BYTES**: `2147483648n`

#### Defined in

[src/global/constants.ts:52](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L52)

---

### BaseUrl

• `Const` **BaseUrl**: `Object`

#### Type declaration

| Name         | Type                                  |
| :----------- | :------------------------------------ |
| `SN_MAIN`    | `"https://alpha-mainnet.starknet.io"` |
| `SN_SEPOLIA` | `"https://alpha-sepolia.starknet.io"` |

#### Defined in

[src/global/constants.ts:56](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L56)

[src/global/constants.ts:60](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L60)

---

### NetworkName

• `Const` **NetworkName**: `Object`

#### Type declaration

| Name         | Type           |
| :----------- | :------------- |
| `SN_MAIN`    | `"SN_MAIN"`    |
| `SN_SEPOLIA` | `"SN_SEPOLIA"` |

#### Defined in

[src/global/constants.ts:63](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L63)

[src/global/constants.ts:67](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L67)

---

### StarknetChainId

• `Const` **StarknetChainId**: `Object`

#### Type declaration

| Name         | Type                       |
| :----------- | :------------------------- |
| `SN_MAIN`    | `"0x534e5f4d41494e"`       |
| `SN_SEPOLIA` | `"0x534e5f5345504f4c4941"` |

#### Defined in

[src/global/constants.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L70)

[src/global/constants.ts:74](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L74)

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

[src/global/constants.ts:77](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L77)

[src/global/constants.ts:84](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L84)

---

### SupportedRpcVersion

• `Const` **SupportedRpcVersion**: `Object`

dot format rpc versions

#### Type declaration

| Name     | Type      |
| :------- | :-------- |
| `0.7.1`  | `"0.7.1"` |
| `0.8.1`  | `"0.8.1"` |
| `v0_7_1` | `"0.7.1"` |
| `v0_8_1` | `"0.8.1"` |

#### Defined in

[src/global/constants.ts:90](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L90)

[src/global/constants.ts:96](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L96)

---

### DEFAULT_GLOBAL_CONFIG

• `Const` **DEFAULT_GLOBAL_CONFIG**: `Object`

#### Type declaration

| Name                  | Type                                                                      |
| :-------------------- | :------------------------------------------------------------------------ |
| `legacyMode`          | `boolean`                                                                 |
| `logLevel`            | [`LogLevel`](../modules.md#loglevel)                                      |
| `rpcVersion`          | [`SupportedRpcVersion`](constants.md#supportedrpcversion-1)               |
| `transactionVersion`  | [`SupportedTransactionVersion`](constants.md#supportedtransactionversion) |
| `feeMarginPercentage` | [`FeeMarginPercentage`](types.md#feemarginpercentage)                     |
| `fetch`               | `any`                                                                     |
| `websocket`           | `any`                                                                     |

#### Defined in

[src/global/constants.ts:104](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L104)

---

### RPC_DEFAULT_NODES

• `Const` **RPC_DEFAULT_NODES**: `Object`

#### Type declaration

| Name         | Type                                                              |
| :----------- | :---------------------------------------------------------------- |
| `SN_MAIN`    | readonly [``"https://starknet-mainnet.public.blastapi.io/rpc/"``] |
| `SN_SEPOLIA` | readonly [``"https://starknet-sepolia.public.blastapi.io/rpc/"``] |

#### Defined in

[src/global/constants.ts:138](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L138)

---

### PAYMASTER_RPC_NODES

• `Const` **PAYMASTER_RPC_NODES**: `Object`

#### Type declaration

| Name         | Type                                                |
| :----------- | :-------------------------------------------------- |
| `SN_MAIN`    | readonly [``"https://starknet.paymaster.avnu.fi"``] |
| `SN_SEPOLIA` | readonly [``"https://sepolia.paymaster.avnu.fi"``]  |

#### Defined in

[src/global/constants.ts:143](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L143)

---

### SYSTEM_MESSAGES

• `Const` **SYSTEM_MESSAGES**: `Object`

#### Type declaration

| Name                     | Type     |
| :----------------------- | :------- |
| `legacyTxWarningMessage` | `string` |
| `legacyTxRPC08Message`   | `string` |
| `SWOldV3`                | `string` |
| `channelVersionMismatch` | `string` |
| `unsupportedSpecVersion` | `string` |
| `maxFeeInV3`             | `string` |

#### Defined in

[src/global/constants.ts:149](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/global/constants.ts#L149)

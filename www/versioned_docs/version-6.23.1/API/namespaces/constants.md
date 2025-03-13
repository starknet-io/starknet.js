---
id: 'constants'
title: 'Namespace: constants'
sidebar_label: 'constants'
sidebar_position: 0
custom_edit_url: null
---

Utils

## Enumerations

- [BaseUrl](../enums/constants.BaseUrl.md)
- [NetworkName](../enums/constants.NetworkName.md)
- [StarknetChainId](../enums/constants.StarknetChainId.md)
- [TransactionHashPrefix](../enums/constants.TransactionHashPrefix.md)
- [FeeMarginPercentage](../enums/constants.FeeMarginPercentage.md)

## References

### TRANSACTION_VERSION

Renames and re-exports [ETransactionVersion](types.RPC.RPCSPEC07.API.md#etransactionversion-1)

## Variables

### IS_BROWSER

• `Const` **IS_BROWSER**: `boolean`

#### Defined in

[src/utils/encode.ts:3](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/encode.ts#L3)

---

### TEXT_TO_FELT_MAX_LEN

• `Const` **TEXT_TO_FELT_MAX_LEN**: `31`

Cairo Felt support storing max 31 character

#### Defined in

[src/global/constants.ts:9](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L9)

---

### ZERO

• `Const` **ZERO**: `0n`

#### Defined in

[src/global/constants.ts:18](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L18)

---

### MASK_250

• `Const` **MASK_250**: `bigint`

#### Defined in

[src/global/constants.ts:19](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L19)

---

### MASK_31

• `Const` **MASK_31**: `bigint`

#### Defined in

[src/global/constants.ts:20](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L20)

---

### API_VERSION

• `Const` **API_VERSION**: `0n`

#### Defined in

[src/global/constants.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L21)

---

### PRIME

• `Const` **PRIME**: `bigint`

#### Defined in

[src/global/constants.ts:22](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L22)

---

### MAX_STORAGE_ITEM_SIZE

• `Const` **MAX_STORAGE_ITEM_SIZE**: `256n`

#### Defined in

[src/global/constants.ts:25](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L25)

---

### ADDR_BOUND

• `Const` **ADDR_BOUND**: `bigint`

#### Defined in

[src/global/constants.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L26)

---

### RANGE_FELT

• `Const` **RANGE_FELT**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L30)

---

### RANGE_I128

• `Const` **RANGE_I128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:31](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L31)

---

### RANGE_U128

• `Const` **RANGE_U128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/global/constants.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L32)

---

### UDC

• `Const` **UDC**: `Object`

#### Type declaration

| Name         | Type                                                                   |
| :----------- | :--------------------------------------------------------------------- |
| `ADDRESS`    | `"0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"` |
| `ENTRYPOINT` | `"deployContract"`                                                     |

#### Defined in

[src/global/constants.ts:63](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L63)

---

### RPC_DEFAULT_VERSION

• `Const` **RPC_DEFAULT_VERSION**: `"v0_7"`

#### Defined in

[src/global/constants.ts:68](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L68)

---

### RPC_NODES

• `Const` **RPC_NODES**: `Object`

#### Type declaration

| Name         | Type                                                                                                                          |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `SN_MAIN`    | readonly [``"https://starknet-mainnet.public.blastapi.io/rpc/v0_7"``, ``"https://free-rpc.nethermind.io/mainnet-juno/v0_7"``] |
| `SN_SEPOLIA` | readonly [``"https://starknet-sepolia.public.blastapi.io/rpc/v0_7"``, ``"https://free-rpc.nethermind.io/sepolia-juno/v0_7"``] |

#### Defined in

[src/global/constants.ts:70](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L70)

---

### OutsideExecutionCallerAny

• `Const` **OutsideExecutionCallerAny**: `"0x414e595f43414c4c4552"`

#### Defined in

[src/global/constants.ts:81](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L81)

---

### SNIP9_V1_INTERFACE_ID

• `Const` **SNIP9_V1_INTERFACE_ID**: `"0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181"`

#### Defined in

[src/global/constants.ts:82](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L82)

---

### SNIP9_V2_INTERFACE_ID

• `Const` **SNIP9_V2_INTERFACE_ID**: `"0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872"`

#### Defined in

[src/global/constants.ts:84](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L84)

---

### HARDENING_BYTE

• `Const` **HARDENING_BYTE**: `128`

#### Defined in

[src/global/constants.ts:89](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L89)

---

### HARDENING_4BYTES

• `Const` **HARDENING_4BYTES**: `2147483648n`

#### Defined in

[src/global/constants.ts:91](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L91)

---

### DEFAULT_GLOBAL_CONFIG

• `Const` **DEFAULT_GLOBAL_CONFIG**: `Object`

#### Type declaration

| Name               | Type                                                                                         |
| :----------------- | :------------------------------------------------------------------------------------------- |
| `legacyMode`       | `boolean`                                                                                    |
| `logLevel`         | [`LogLevel`](../modules.md#loglevel)                                                         |
| `accountTxVersion` | typeof [`V2`](types.RPC.RPCSPEC07.API.md#v2) \| typeof [`V3`](types.RPC.RPCSPEC07.API.md#v3) |

#### Defined in

[src/global/constants.ts:94](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L94)

---

### SYSTEM_MESSAGES

• `Const` **SYSTEM_MESSAGES**: `Object`

#### Type declaration

| Name                     | Type     |
| :----------------------- | :------- |
| `legacyTxWarningMessage` | `string` |

#### Defined in

[src/global/constants.ts:105](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/global/constants.ts#L105)

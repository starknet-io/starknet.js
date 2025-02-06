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

[src/utils/encode.ts:4](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L4)

---

### TEXT_TO_FELT_MAX_LEN

• `Const` **TEXT_TO_FELT_MAX_LEN**: `31`

Cairo Felt support storing max 31 character

#### Defined in

[src/constants.ts:8](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L8)

---

### ZERO

• `Const` **ZERO**: `0n`

#### Defined in

[src/constants.ts:17](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L17)

---

### MASK_250

• `Const` **MASK_250**: `bigint`

#### Defined in

[src/constants.ts:18](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L18)

---

### API_VERSION

• `Const` **API_VERSION**: `0n`

#### Defined in

[src/constants.ts:19](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L19)

---

### PRIME

• `Const` **PRIME**: `bigint`

#### Defined in

[src/constants.ts:20](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L20)

---

### MAX_STORAGE_ITEM_SIZE

• `Const` **MAX_STORAGE_ITEM_SIZE**: `256n`

#### Defined in

[src/constants.ts:23](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L23)

---

### ADDR_BOUND

• `Const` **ADDR_BOUND**: `bigint`

#### Defined in

[src/constants.ts:24](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L24)

---

### RANGE_FELT

• `Const` **RANGE_FELT**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/constants.ts:28](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L28)

---

### RANGE_I128

• `Const` **RANGE_I128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/constants.ts:29](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L29)

---

### RANGE_U128

• `Const` **RANGE_U128**: `Object`

#### Type declaration

| Name  | Type     |
| :---- | :------- |
| `min` | `bigint` |
| `max` | `bigint` |

#### Defined in

[src/constants.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L30)

---

### UDC

• `Const` **UDC**: `Object`

#### Type declaration

| Name         | Type                                                                   |
| :----------- | :--------------------------------------------------------------------- |
| `ADDRESS`    | `"0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"` |
| `ENTRYPOINT` | `"deployContract"`                                                     |

#### Defined in

[src/constants.ts:61](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L61)

---

### RPC_DEFAULT_VERSION

• `Const` **RPC_DEFAULT_VERSION**: `"v0_7"`

#### Defined in

[src/constants.ts:66](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L66)

---

### RPC_NODES

• `Const` **RPC_NODES**: `Object`

#### Type declaration

| Name         | Type                                                                                                                          |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `SN_MAIN`    | readonly [``"https://starknet-mainnet.public.blastapi.io/rpc/v0_7"``, ``"https://free-rpc.nethermind.io/mainnet-juno/v0_7"``] |
| `SN_SEPOLIA` | readonly [``"https://starknet-sepolia.public.blastapi.io/rpc/v0_7"``, ``"https://free-rpc.nethermind.io/sepolia-juno/v0_7"``] |

#### Defined in

[src/constants.ts:68](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/constants.ts#L68)

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

## Variables

### IS_BROWSER

• `Const` **IS_BROWSER**: `boolean`

#### Defined in

[src/utils/encode.ts:2](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/encode.ts#L2)

---

### ZERO

• `Const` **ZERO**: `0n`

#### Defined in

[src/constants.ts:3](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L3)

---

### MASK_250

• `Const` **MASK_250**: `bigint`

#### Defined in

[src/constants.ts:4](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L4)

---

### MASK_251

• `Const` **MASK_251**: `bigint`

#### Defined in

[src/constants.ts:5](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L5)

---

### API_VERSION

• `Const` **API_VERSION**: `0n`

#### Defined in

[src/constants.ts:6](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L6)

---

### UDC

• `Const` **UDC**: `Object`

#### Type declaration

| Name         | Type     |
| :----------- | :------- |
| `ADDRESS`    | `string` |
| `ENTRYPOINT` | `string` |

#### Defined in

[src/constants.ts:34](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L34)

---

### FIELD_PRIME

• `Const` **FIELD_PRIME**: `"800000000000011000000000000000000000000000000000000000000000001"`

The following is taken from https://github.com/starkware-libs/starkex-resources/blob/master/crypto/starkware/crypto/signature/pedersen_params.json but converted to hex, because JS is very bad handling big integers by default
Please do not edit until the JSON changes.

#### Defined in

[src/constants.ts:43](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L43)

---

### FIELD_GEN

• `Const` **FIELD_GEN**: `"3"`

#### Defined in

[src/constants.ts:44](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L44)

---

### FIELD_SIZE

• `Const` **FIELD_SIZE**: `251`

#### Defined in

[src/constants.ts:45](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L45)

---

### EC_ORDER

• `Const` **EC_ORDER**: `"800000000000010FFFFFFFFFFFFFFFFB781126DCAE7B2321E66A241ADC64D2F"`

#### Defined in

[src/constants.ts:46](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L46)

---

### ALPHA

• `Const` **ALPHA**: `"1"`

#### Defined in

[src/constants.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L47)

---

### BETA

• `Const` **BETA**: `"6F21413EFBE40DE150E596D72F7A8C5609AD26C15C915C1F4CDFCB99CEE9E89"`

#### Defined in

[src/constants.ts:48](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L48)

---

### MAX_ECDSA_VAL

• `Const` **MAX_ECDSA_VAL**: `"800000000000000000000000000000000000000000000000000000000000000"`

#### Defined in

[src/constants.ts:49](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L49)

---

### CONSTANT_POINTS

• `Const` **CONSTANT_POINTS**: `string`[][]

#### Defined in

[src/constants.ts:50](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/constants.ts#L50)

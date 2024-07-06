---
id: 'types.EstimateFeeResponse'
title: 'Interface: EstimateFeeResponse'
sidebar_label: 'EstimateFeeResponse'
custom_edit_url: null
---

[types](../namespaces/types.md).EstimateFeeResponse

## Hierarchy

- **`EstimateFeeResponse`**

  ↳ [`EstimateFee`](types.EstimateFee.md)

## Properties

### gas_consumed

• **gas_consumed**: `bigint`

#### Defined in

[src/types/provider/response.ts:118](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L118)

---

### overall_fee

• **overall_fee**: `bigint`

#### Defined in

[src/types/provider/response.ts:119](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L119)

---

### gas_price

• **gas_price**: `bigint`

#### Defined in

[src/types/provider/response.ts:120](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L120)

---

### unit

• **unit**: `PRICE_UNIT`

#### Defined in

[src/types/provider/response.ts:121](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L121)

---

### suggestedMaxFee

• **suggestedMaxFee**: `bigint`

#### Defined in

[src/types/provider/response.ts:122](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L122)

---

### resourceBounds

• **resourceBounds**: `Object`

#### Type declaration

| Name     | Type                                                 |
| :------- | :--------------------------------------------------- |
| `l1_gas` | \{ max_amount: string; max_price_per_unit: string; } |
| `l2_gas` | \{ max_amount: string; max_price_per_unit: string; } |

#### Defined in

[src/types/provider/response.ts:123](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L123)

---

### data_gas_consumed

• **data_gas_consumed**: `bigint`

#### Defined in

[src/types/provider/response.ts:124](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L124)

---

### data_gas_price

• **data_gas_price**: `bigint`

#### Defined in

[src/types/provider/response.ts:125](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L125)

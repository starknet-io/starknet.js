---
id: 'types.EstimateFee'
title: 'Interface: EstimateFee'
sidebar_label: 'EstimateFee'
custom_edit_url: null
---

[types](../namespaces/types.md).EstimateFee

## Hierarchy

- [`EstimateFeeResponse`](types.EstimateFeeResponse.md)

  ↳ **`EstimateFee`**

## Properties

### gas_consumed

• **gas_consumed**: `bigint`

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[gas_consumed](types.EstimateFeeResponse.md#gas_consumed)

#### Defined in

[src/types/provider/response.ts:118](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L118)

---

### overall_fee

• **overall_fee**: `bigint`

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[overall_fee](types.EstimateFeeResponse.md#overall_fee)

#### Defined in

[src/types/provider/response.ts:119](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L119)

---

### gas_price

• **gas_price**: `bigint`

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[gas_price](types.EstimateFeeResponse.md#gas_price)

#### Defined in

[src/types/provider/response.ts:120](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L120)

---

### unit

• **unit**: `PRICE_UNIT`

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[unit](types.EstimateFeeResponse.md#unit)

#### Defined in

[src/types/provider/response.ts:121](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L121)

---

### suggestedMaxFee

• **suggestedMaxFee**: `bigint`

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[suggestedMaxFee](types.EstimateFeeResponse.md#suggestedmaxfee)

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

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[resourceBounds](types.EstimateFeeResponse.md#resourcebounds)

#### Defined in

[src/types/provider/response.ts:123](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L123)

---

### data_gas_consumed

• **data_gas_consumed**: `bigint`

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[data_gas_consumed](types.EstimateFeeResponse.md#data_gas_consumed)

#### Defined in

[src/types/provider/response.ts:124](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L124)

---

### data_gas_price

• **data_gas_price**: `bigint`

#### Inherited from

[EstimateFeeResponse](types.EstimateFeeResponse.md).[data_gas_price](types.EstimateFeeResponse.md#data_gas_price)

#### Defined in

[src/types/provider/response.ts:125](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/types/provider/response.ts#L125)

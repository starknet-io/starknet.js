---
id: 'transaction'
title: 'Namespace: transaction'
sidebar_label: 'transaction'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### transformCallsToMulticallArrays

▸ **transformCallsToMulticallArrays**(`calls`): `Object`

Transforms a list of Calls, each with their own calldata, into
two arrays: one with the entry points, and one with the concatenated calldata

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `calls` | [`Call`](types.md#call)[] |

#### Returns

`Object`

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `callArray` | [`ParsedStruct`](types.md#parsedstruct)[] |
| `calldata`  | [`Calldata`](types.md#calldata)           |

#### Defined in

[src/utils/transaction.ts:18](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/transaction.ts#L18)

---

### fromCallsToExecuteCalldata

▸ **fromCallsToExecuteCalldata**(`calls`): [`Calldata`](types.md#calldata)

Transforms a list of calls into the Cairo 0 `__execute__` calldata.

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `calls` | [`Call`](types.md#call)[] |

#### Returns

[`Calldata`](types.md#calldata)

#### Defined in

[src/utils/transaction.ts:40](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/transaction.ts#L40)

---

### fromCallsToExecuteCalldataWithNonce

▸ **fromCallsToExecuteCalldataWithNonce**(`calls`, `nonce`): [`Calldata`](types.md#calldata)

Transforms a list of calls into the Cairo 0 `__execute__` calldata including nonce.

**`Deprecated`**

#### Parameters

| Name    | Type                                    |
| :------ | :-------------------------------------- |
| `calls` | [`Call`](types.md#call)[]               |
| `nonce` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

[`Calldata`](types.md#calldata)

#### Defined in

[src/utils/transaction.ts:51](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/transaction.ts#L51)

---

### transformCallsToMulticallArrays_cairo1

▸ **transformCallsToMulticallArrays_cairo1**(`calls`): [`CallStruct`](../interfaces/types.CallStruct.md)[]

Format Data inside Calls

**`Deprecated`**

Not required for getting execute Calldata

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `calls` | [`Call`](types.md#call)[] |

#### Returns

[`CallStruct`](../interfaces/types.CallStruct.md)[]

#### Defined in

[src/utils/transaction.ts:60](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/transaction.ts#L60)

---

### fromCallsToExecuteCalldata_cairo1

▸ **fromCallsToExecuteCalldata_cairo1**(`calls`): [`Calldata`](types.md#calldata)

Transforms a list of calls into the Cairo 1 `__execute__` calldata.

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `calls` | [`Call`](types.md#call)[] |

#### Returns

[`Calldata`](types.md#calldata)

#### Defined in

[src/utils/transaction.ts:72](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/transaction.ts#L72)

---

### getExecuteCalldata

▸ **getExecuteCalldata**(`calls`, `cairoVersion?`): [`Calldata`](types.md#calldata)

Create `__execute__` Calldata from Calls based on Cairo versions

#### Parameters

| Name           | Type                                    | Default value |
| :------------- | :-------------------------------------- | :------------ |
| `calls`        | [`Call`](types.md#call)[]               | `undefined`   |
| `cairoVersion` | [`CairoVersion`](types.md#cairoversion) | `'0'`         |

#### Returns

[`Calldata`](types.md#calldata)

#### Defined in

[src/utils/transaction.ts:89](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/transaction.ts#L89)

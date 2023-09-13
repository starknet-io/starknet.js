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
two arrays: one with the entrypoints, and one with the concatenated calldata.

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

[src/utils/transaction.ts:10](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L10)

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

[src/utils/transaction.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L32)

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

[src/utils/transaction.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L43)

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

[src/utils/transaction.ts:52](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L52)

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

[src/utils/transaction.ts:64](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L64)

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

[src/utils/transaction.ts:78](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L78)

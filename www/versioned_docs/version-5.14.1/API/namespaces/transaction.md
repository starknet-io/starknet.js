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

[src/utils/transaction.ts:12](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/transaction.ts#L12)

---

### fromCallsToExecuteCalldata

▸ **fromCallsToExecuteCalldata**(`calls`): [`Calldata`](types.md#calldata)

Transforms a list of calls in the full flattened calldata expected
by the **execute** protocol.

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `calls` | [`Call`](types.md#call)[] |

#### Returns

[`Calldata`](types.md#calldata)

#### Defined in

[src/utils/transaction.ts:37](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/transaction.ts#L37)

---

### fromCallsToExecuteCalldataWithNonce

▸ **fromCallsToExecuteCalldataWithNonce**(`calls`, `nonce`): [`Calldata`](types.md#calldata)

#### Parameters

| Name    | Type                                    |
| :------ | :-------------------------------------- |
| `calls` | [`Call`](types.md#call)[]               |
| `nonce` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

[`Calldata`](types.md#calldata)

#### Defined in

[src/utils/transaction.ts:43](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/transaction.ts#L43)

---

### transformCallsToMulticallArrays_cairo1

▸ **transformCallsToMulticallArrays_cairo1**(`calls`): [`CallStruct`](../interfaces/types.CallStruct.md)[]

Format Data inside Calls

#### Parameters

| Name    | Type                      | Description |
| :------ | :------------------------ | :---------- |
| `calls` | [`Call`](types.md#call)[] | Call[]      |

#### Returns

[`CallStruct`](../interfaces/types.CallStruct.md)[]

CallStruct

#### Defined in

[src/utils/transaction.ts:53](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/transaction.ts#L53)

---

### fromCallsToExecuteCalldata_cairo1

▸ **fromCallsToExecuteCalldata_cairo1**(`calls`): [`Calldata`](types.md#calldata)

Transforms a list of calls in the full flattened calldata expected
by the **execute** protocol.

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `calls` | [`Call`](types.md#call)[] |

#### Returns

[`Calldata`](types.md#calldata)

Calldata

#### Defined in

[src/utils/transaction.ts:68](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/transaction.ts#L68)

---

### getExecuteCalldata

▸ **getExecuteCalldata**(`calls`, `cairoVersion?`): [`Calldata`](types.md#calldata)

#### Parameters

| Name           | Type                                    | Default value | Description   |
| :------------- | :-------------------------------------- | :------------ | :------------ |
| `calls`        | [`Call`](types.md#call)[]               | `undefined`   | Call array    |
| `cairoVersion` | [`CairoVersion`](types.md#cairoversion) | `'0'`         | Defaults to 0 |

#### Returns

[`Calldata`](types.md#calldata)

string[] of calldata

#### Defined in

[src/utils/transaction.ts:85](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/transaction.ts#L85)

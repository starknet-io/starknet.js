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

| Name    | Type                           |
| :------ | :----------------------------- |
| `calls` | [`Call`](../modules.md#call)[] |

#### Returns

`Object`

| Name        | Type                                           |
| :---------- | :--------------------------------------------- |
| `callArray` | [`ParsedStruct`](../modules.md#parsedstruct)[] |
| `calldata`  | [`Calldata`](../modules.md#calldata)           |

#### Defined in

[src/utils/transaction.ts:12](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L12)

---

### fromCallsToExecuteCalldata

▸ **fromCallsToExecuteCalldata**(`calls`): [`Calldata`](../modules.md#calldata)

Transforms a list of calls in the full flattened calldata expected
by the **execute** protocol.

#### Parameters

| Name    | Type                           |
| :------ | :----------------------------- |
| `calls` | [`Call`](../modules.md#call)[] |

#### Returns

[`Calldata`](../modules.md#calldata)

#### Defined in

[src/utils/transaction.ts:37](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L37)

---

### fromCallsToExecuteCalldataWithNonce

▸ **fromCallsToExecuteCalldataWithNonce**(`calls`, `nonce`): [`Calldata`](../modules.md#calldata)

#### Parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `calls` | [`Call`](../modules.md#call)[]        |
| `nonce` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

[`Calldata`](../modules.md#calldata)

#### Defined in

[src/utils/transaction.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L43)

---

### transformCallsToMulticallArrays_cairo1

▸ **transformCallsToMulticallArrays_cairo1**(`calls`): [`CallStruct`](../interfaces/CallStruct.md)[]

Format Data inside Calls

#### Parameters

| Name    | Type                           | Description |
| :------ | :----------------------------- | :---------- |
| `calls` | [`Call`](../modules.md#call)[] | Call[]      |

#### Returns

[`CallStruct`](../interfaces/CallStruct.md)[]

CallStruct

#### Defined in

[src/utils/transaction.ts:53](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L53)

---

### fromCallsToExecuteCalldata_cairo1

▸ **fromCallsToExecuteCalldata_cairo1**(`calls`): [`Calldata`](../modules.md#calldata)

Transforms a list of calls in the full flattened calldata expected
by the **execute** protocol.

#### Parameters

| Name    | Type                           |
| :------ | :----------------------------- |
| `calls` | [`Call`](../modules.md#call)[] |

#### Returns

[`Calldata`](../modules.md#calldata)

Calldata

#### Defined in

[src/utils/transaction.ts:69](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L69)

---

### getExecuteCalldata

▸ **getExecuteCalldata**(`calls`, `cairoVersion?`): [`Calldata`](../modules.md#calldata)

#### Parameters

| Name           | Type                                         | Default value | Description   |
| :------------- | :------------------------------------------- | :------------ | :------------ |
| `calls`        | [`Call`](../modules.md#call)[]               | `undefined`   | Call array    |
| `cairoVersion` | [`CairoVersion`](../modules.md#cairoversion) | `'0'`         | Defaults to 0 |

#### Returns

[`Calldata`](../modules.md#calldata)

string[] of calldata

#### Defined in

[src/utils/transaction.ts:79](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/transaction.ts#L79)

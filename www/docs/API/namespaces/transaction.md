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
| `calldata`  | `string`[]                                     |

#### Defined in

[src/utils/transaction.ts:11](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/transaction.ts#L11)

---

### fromCallsToExecuteCalldata

▸ **fromCallsToExecuteCalldata**(`calls`): `string`[]

Transforms a list of calls in the full flattened calldata expected
by the **execute** protocol.

#### Parameters

| Name    | Type                           |
| :------ | :----------------------------- |
| `calls` | [`Call`](../modules.md#call)[] |

#### Returns

`string`[]

#### Defined in

[src/utils/transaction.ts:36](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/transaction.ts#L36)

---

### fromCallsToExecuteCalldataWithNonce

▸ **fromCallsToExecuteCalldataWithNonce**(`calls`, `nonce`): `string`[]

#### Parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `calls` | [`Call`](../modules.md#call)[]        |
| `nonce` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

`string`[]

#### Defined in

[src/utils/transaction.ts:51](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/transaction.ts#L51)

---

### transformCallsToMulticallArrays_cairo1

▸ **transformCallsToMulticallArrays_cairo1**(`calls`): [`CallStruct`](../interfaces/CallStruct.md)[]

Transforms a list of Calls, each with their own calldata, into
two arrays: one with the entrypoints, and one with the concatenated calldata.

#### Parameters

| Name    | Type                           |
| :------ | :----------------------------- |
| `calls` | [`Call`](../modules.md#call)[] |

#### Returns

[`CallStruct`](../interfaces/CallStruct.md)[]

#### Defined in

[src/utils/transaction.ts:64](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/transaction.ts#L64)

---

### fromCallsToExecuteCalldata_cairo1

▸ **fromCallsToExecuteCalldata_cairo1**(`calls`): `string`[]

Transforms a list of calls in the full flattened calldata expected
by the **execute** protocol.

#### Parameters

| Name    | Type                           |
| :------ | :----------------------------- |
| `calls` | [`Call`](../modules.md#call)[] |

#### Returns

`string`[]

#### Defined in

[src/utils/transaction.ts:79](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/transaction.ts#L79)

---

### getExecuteCalldata

▸ **getExecuteCalldata**(`calls`, `cairoVersion?`): `string`[]

#### Parameters

| Name           | Type                                         | Default value | Description   |
| :------------- | :------------------------------------------- | :------------ | :------------ |
| `calls`        | [`Call`](../modules.md#call)[]               | `undefined`   | Call array    |
| `cairoVersion` | [`CairoVersion`](../modules.md#cairoversion) | `'0'`         | Defaults to 0 |

#### Returns

`string`[]

string[] of calldata

#### Defined in

[src/utils/transaction.ts:95](https://github.com/PhilippeR26/starknet.js/blob/d3c8cca/src/utils/transaction.ts#L95)

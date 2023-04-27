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

[src/utils/transaction.ts:11](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/transaction.ts#L11)

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

[src/utils/transaction.ts:36](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/transaction.ts#L36)

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

[src/utils/transaction.ts:51](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/transaction.ts#L51)

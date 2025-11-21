---
id: 'transaction'
title: 'Namespace: transaction'
sidebar_label: 'transaction'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### getCompiledCalldata

▸ **getCompiledCalldata**(`constructorArguments`, `callback`): [`Calldata`](../modules.md#calldata)

Extract compiled calldata from args or execute callback

#### Parameters

| Name                   | Type                               |
| :--------------------- | :--------------------------------- |
| `constructorArguments` | [`RawArgs`](../modules.md#rawargs) |
| `callback`             | `Function`                         |

#### Returns

[`Calldata`](../modules.md#calldata)

#### Defined in

[src/utils/transaction/getCompiledCalldata.ts:6](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transaction/getCompiledCalldata.ts#L6)

---

### getVersionsByType

▸ **getVersionsByType**(`versionType?`): \{ `v3`: `"0x100000000000000000000000000000003"` = ETransactionVersion.F3 } \| \{ `v3`: `"0x3"` = ETransactionVersion.V3 }

Return transaction versions based on version type, default version type is 'transaction'.

#### Parameters

| Name           | Type                       | Description                                  |
| :------------- | :------------------------- | :------------------------------------------- |
| `versionType?` | `"fee"` \| `"transaction"` | the type of version ("fee" or "transaction") |

#### Returns

\{ `v3`: `"0x100000000000000000000000000000003"` = ETransactionVersion.F3 } \| \{ `v3`: `"0x3"` = ETransactionVersion.V3 }

an object containing the transaction versions.

**`Example`**

```typescript
const result = transaction.getVersionsByType('fee');
// result = {
//   v1: '0x100000000000000000000000000000001',
//   v2: '0x100000000000000000000000000000002',
//   v3: '0x100000000000000000000000000000003'
// }
```

#### Defined in

[src/utils/transaction/transaction.ts:176](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transaction/transaction.ts#L176)

---

### transformCallsToMulticallArrays

▸ **transformCallsToMulticallArrays**(`calls`): `Object`

Transforms a list of Calls, each with their own calldata, into
two arrays: one with the entry points, and one with the concatenated calldata

#### Parameters

| Name    | Type                           | Description                     |
| :------ | :----------------------------- | :------------------------------ |
| `calls` | [`Call`](../modules.md#call)[] | the list of calls to transform. |

#### Returns

`Object`

An object containing two arrays: callArray and calldata.

| Name        | Type                                           |
| :---------- | :--------------------------------------------- |
| `callArray` | [`ParsedStruct`](../modules.md#parsedstruct)[] |
| `calldata`  | [`Calldata`](../modules.md#calldata)           |

**`Example`**

```typescript
const calls: Call[] = [
  {
    contractAddress: '0x1234567890123456789012345678901234567890',
    entrypoint: 'functionName',
    calldata: [1, 2, 3],
  },
  {
    contractAddress: '0x0987654321098765432109876543210987654321',
    entrypoint: 'anotherFunction',
    calldata: [4, 5, 6],
  },
];
const result = transaction.transformCallsToMulticallArrays(calls);
// result = {
// callArray: [
// { to: "0x1234567890123456789012345678901234567890", selector: "1234567890",
// data_offset: "0", data_len: "3" },
// { to: "0x0987654321098765432109876543210987654321", selector: "1234567890",
// data_offset: "0987654321", data_offset: "3", data_len: "3"}
// ], calldata: [1, 2, 3, 4, 5, 6]
// }
```

#### Defined in

[src/utils/transaction/transaction.ts:37](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transaction/transaction.ts#L37)

---

### fromCallsToExecuteCalldata

▸ **fromCallsToExecuteCalldata**(`calls`): [`Calldata`](../modules.md#calldata)

Transforms a list of calls into the Cairo 0 `__execute__` calldata.

#### Parameters

| Name    | Type                           | Description                    |
| :------ | :----------------------------- | :----------------------------- |
| `calls` | [`Call`](../modules.md#call)[] | the list of calls to transform |

#### Returns

[`Calldata`](../modules.md#calldata)

the Cairo 0 `__execute__` calldata

**`Example`**

```typescript
const calls: Call[] = [
  {
    contractAddress: '0x1234567890123456789012345678901234567890',
    entrypoint: 'functionName',
    calldata: [1, 2, 3],
  },
  {
    contractAddress: '0x0987654321098765432109876543210987654321',
    entrypoint: 'anotherFunction',
    calldata: [4, 5, 6],
  },
];
const result = transaction.fromCallsToExecuteCalldata(calls);
// result = ['2', '103929005307130220006098923584552504982110632080',
//   '784552248838722632831848474045274978537388011177294206940059575485454596699', '0',
//   '3', '54400338722927882010739357306608455014511100705',
//   '836430224577382061379420368022192503799782058803937958828224424676927281484',
//   '3', '3', '6', '1', '2', '3', '4', '5', '6']
```

#### Defined in

[src/utils/transaction/transaction.ts:82](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transaction/transaction.ts#L82)

---

### fromCallsToExecuteCalldata_cairo1

▸ **fromCallsToExecuteCalldata_cairo1**(`calls`): [`Calldata`](../modules.md#calldata)

Transforms a list of calls into the Cairo 1 `__execute__` calldata.

#### Parameters

| Name    | Type                           | Description                     |
| :------ | :----------------------------- | :------------------------------ |
| `calls` | [`Call`](../modules.md#call)[] | the list of calls to transform. |

#### Returns

[`Calldata`](../modules.md#calldata)

the Cairo 1 `__execute__` calldata.

**`Example`**

```typescript
const calls: Call[] = [
  {
    contractAddress: '0x1234567890123456789012345678901234567890',
    entrypoint: 'functionName',
    calldata: [1, 2, 3],
  },
  {
    contractAddress: '0x0987654321098765432109876543210987654321',
    entrypoint: 'anotherFunction',
    calldata: [4, 5, 6],
  },
];
const result = transaction.fromCallsToExecuteCalldata_cairo1(calls);
// result = ['2', '103929005307130220006098923584552504982110632080',
//   '784552248838722632831848474045274978537388011177294206940059575485454596699',
//   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
//   '836430224577382061379420368022192503799782058803937958828224424676927281484',
//   '3', '4', '5', '6']
```

#### Defined in

[src/utils/transaction/transaction.ts:114](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transaction/transaction.ts#L114)

---

### getExecuteCalldata

▸ **getExecuteCalldata**(`calls`, `cairoVersion?`): [`Calldata`](../modules.md#calldata)

Create `__execute__` Calldata from Calls based on Cairo versions.

#### Parameters

| Name           | Type                                         | Default value | Description                    |
| :------------- | :------------------------------------------- | :------------ | :----------------------------- |
| `calls`        | [`Call`](../modules.md#call)[]               | `undefined`   | the list of calls to transform |
| `cairoVersion` | [`CairoVersion`](../modules.md#cairoversion) | `'0'`         | the Cairo version              |

#### Returns

[`Calldata`](../modules.md#calldata)

the `__execute__` calldata.

**`Example`**

```typescript
const calls: Call[] = [
  {
    contractAddress: '0x1234567890123456789012345678901234567890',
    entrypoint: 'functionName',
    calldata: [1, 2, 3],
  },
  {
    contractAddress: '0x0987654321098765432109876543210987654321',
    entrypoint: 'anotherFunction',
    calldata: [4, 5, 6],
  },
];
const result = transaction.getExecuteCalldata(calls, '1');
// result = ['2', '103929005307130220006098923584552504982110632080',
//   '784552248838722632831848474045274978537388011177294206940059575485454596699',
//   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
//   '836430224577382061379420368022192503799782058803937958828224424676927281484',
//   '3', '4', '5', '6']
```

#### Defined in

[src/utils/transaction/transaction.ts:155](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/transaction/transaction.ts#L155)

---
id: 'transaction'
title: 'Namespace: transaction'
sidebar_label: 'transaction'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### buildUDCCall

▸ **buildUDCCall**(`payload`, `address`): `Object`

Builds a UDCCall object.

#### Parameters

| Name      | Type                                                                                                                                                                 | Description                                                                                      |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `payload` | [`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](types.md#universaldeployercontractpayload)[] | the payload data for the UDCCall. Can be a single payload object or an array of payload objects. |
| `address` | `string`                                                                                                                                                             | the address to be used in the UDCCall                                                            |

#### Returns

`Object`

the UDCCall object containing an array of calls and an array of addresses.

| Name        | Type                                                                                                                                                                                                                     |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`     | \{ `contractAddress`: `"0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf"` = UDC.ADDRESS; `entrypoint`: `"deployContract"` = UDC.ENTRYPOINT; `calldata`: [`BigNumberish`](types.md#bignumberish)[] }[] |
| `addresses` | `string`[]                                                                                                                                                                                                               |

**`Example`**

```typescript
const payload: UniversalDeployerContractPayload = {
  classHash: '0x1234567890123456789012345678901234567890',
  salt: '0x0987654321098765432109876543210987654321',
  unique: true,
  constructorCalldata: [1, 2, 3],
};
const address = '0xABCDEF1234567890ABCDEF1234567890ABCDEF12';
const result = transaction.buildUDCCall(payload, address);
// result = {
// 	calls: [
//			{
//			contractAddress: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
//			entrypoint: "functionName",
//			calldata: [classHash, salt, true, 3, 1, 2, 3]
//		}],
//	addresses: ["0x6fD084B56a7EDc5C06B3eB40f97Ae5A0C707A865"]
// }
```

#### Defined in

[src/utils/transaction.ts:222](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L222)

---

### getVersionsByType

▸ **getVersionsByType**(`versionType?`): \{ `v1`: `"0x100000000000000000000000000000001"` = ETransactionVersion.F1; `v2`: `"0x100000000000000000000000000000002"` = ETransactionVersion.F2; `v3`: `"0x100000000000000000000000000000003"` = ETransactionVersion.F3 } \| \{ `v1`: `"0x1"` = ETransactionVersion.V1; `v2`: `"0x2"` = ETransactionVersion.V2; `v3`: `"0x3"` = ETransactionVersion.V3 }

Return transaction versions based on version type, default version type is 'transaction'.

#### Parameters

| Name           | Type                       | Description                                  |
| :------------- | :------------------------- | :------------------------------------------- |
| `versionType?` | `"fee"` \| `"transaction"` | the type of version ("fee" or "transaction") |

#### Returns

\{ `v1`: `"0x100000000000000000000000000000001"` = ETransactionVersion.F1; `v2`: `"0x100000000000000000000000000000002"` = ETransactionVersion.F2; `v3`: `"0x100000000000000000000000000000003"` = ETransactionVersion.F3 } \| \{ `v1`: `"0x1"` = ETransactionVersion.V1; `v2`: `"0x2"` = ETransactionVersion.V2; `v3`: `"0x3"` = ETransactionVersion.V3 }

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

[src/utils/transaction.ts:278](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L278)

---

### transformCallsToMulticallArrays

▸ **transformCallsToMulticallArrays**(`calls`): `Object`

Transforms a list of Calls, each with their own calldata, into
two arrays: one with the entry points, and one with the concatenated calldata

#### Parameters

| Name    | Type                      | Description                     |
| :------ | :------------------------ | :------------------------------ |
| `calls` | [`Call`](types.md#call)[] | the list of calls to transform. |

#### Returns

`Object`

An object containing two arrays: callArray and calldata.

| Name        | Type                                      |
| :---------- | :---------------------------------------- |
| `callArray` | [`ParsedStruct`](types.md#parsedstruct)[] |
| `calldata`  | [`Calldata`](types.md#calldata)           |

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

[src/utils/transaction.ts:49](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L49)

---

### fromCallsToExecuteCalldata

▸ **fromCallsToExecuteCalldata**(`calls`): [`Calldata`](types.md#calldata)

Transforms a list of calls into the Cairo 0 `__execute__` calldata.

#### Parameters

| Name    | Type                      | Description                    |
| :------ | :------------------------ | :----------------------------- |
| `calls` | [`Call`](types.md#call)[] | the list of calls to transform |

#### Returns

[`Calldata`](types.md#calldata)

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

[src/utils/transaction.ts:94](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L94)

---

### fromCallsToExecuteCalldataWithNonce

▸ **fromCallsToExecuteCalldataWithNonce**(`calls`, `nonce`): [`Calldata`](types.md#calldata)

Transforms a list of calls into the Cairo 0 `__execute__` calldata including nonce.

#### Parameters

| Name    | Type                                    |
| :------ | :-------------------------------------- |
| `calls` | [`Call`](types.md#call)[]               |
| `nonce` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

[`Calldata`](types.md#calldata)

**`Deprecated`**

#### Defined in

[src/utils/transaction.ts:104](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L104)

---

### transformCallsToMulticallArrays_cairo1

▸ **transformCallsToMulticallArrays_cairo1**(`calls`): [`CallStruct`](../interfaces/types.CallStruct.md)[]

Format Data inside Calls

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `calls` | [`Call`](types.md#call)[] |

#### Returns

[`CallStruct`](../interfaces/types.CallStruct.md)[]

**`Deprecated`**

Not required for getting execute Calldata

#### Defined in

[src/utils/transaction.ts:112](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L112)

---

### fromCallsToExecuteCalldata_cairo1

▸ **fromCallsToExecuteCalldata_cairo1**(`calls`): [`Calldata`](types.md#calldata)

Transforms a list of calls into the Cairo 1 `__execute__` calldata.

#### Parameters

| Name    | Type                      | Description                     |
| :------ | :------------------------ | :------------------------------ |
| `calls` | [`Call`](types.md#call)[] | the list of calls to transform. |

#### Returns

[`Calldata`](types.md#calldata)

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

[src/utils/transaction.ts:147](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L147)

---

### getExecuteCalldata

▸ **getExecuteCalldata**(`calls`, `cairoVersion?`): [`Calldata`](types.md#calldata)

Create `__execute__` Calldata from Calls based on Cairo versions.

#### Parameters

| Name           | Type                                    | Default value | Description                    |
| :------------- | :-------------------------------------- | :------------ | :----------------------------- |
| `calls`        | [`Call`](types.md#call)[]               | `undefined`   | the list of calls to transform |
| `cairoVersion` | [`CairoVersion`](types.md#cairoversion) | `'0'`         | the Cairo version              |

#### Returns

[`Calldata`](types.md#calldata)

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

[src/utils/transaction.ts:188](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/transaction.ts#L188)

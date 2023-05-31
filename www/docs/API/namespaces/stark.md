---
id: 'stark'
title: 'Namespace: stark'
sidebar_label: 'stark'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### compressProgram

▸ **compressProgram**(`jsonProgram`): [`CompressedProgram`](types.md#compressedprogram)

Function to compress compiled cairo program

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)

#### Parameters

| Name          | Type                                                    | Description                                       |
| :------------ | :------------------------------------------------------ | :------------------------------------------------ |
| `jsonProgram` | `string` \| [`Program`](../interfaces/types.Program.md) | json file representing the compiled cairo program |

#### Returns

[`CompressedProgram`](types.md#compressedprogram)

Compressed cairo program

#### Defined in

[src/utils/stark.ts:21](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L21)

---

### randomAddress

▸ **randomAddress**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/stark.ts:27](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L27)

---

### makeAddress

▸ **makeAddress**(`input`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/stark.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L32)

---

### formatSignature

▸ **formatSignature**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:36](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L36)

---

### signatureToDecimalArray

▸ **signatureToDecimalArray**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:49](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L49)

---

### signatureToHexArray

▸ **signatureToHexArray**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:53](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L53)

---

### estimatedFeeToMaxFee

▸ **estimatedFeeToMaxFee**(`estimatedFee`, `overhead?`): `bigint`

#### Parameters

| Name           | Type                                    | Default value |
| :------------- | :-------------------------------------- | :------------ |
| `estimatedFee` | [`BigNumberish`](types.md#bignumberish) | `undefined`   |
| `overhead`     | `number`                                | `0.5`         |

#### Returns

`bigint`

#### Defined in

[src/utils/stark.ts:57](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L57)

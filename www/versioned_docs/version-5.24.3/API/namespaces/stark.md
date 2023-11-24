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

Compress compiled Cairo program

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)

#### Parameters

| Name          | Type                                                    | Description                             |
| :------------ | :------------------------------------------------------ | :-------------------------------------- |
| `jsonProgram` | `string` \| [`Program`](../interfaces/types.Program.md) | Representing the compiled cairo program |

#### Returns

[`CompressedProgram`](types.md#compressedprogram)

#### Defined in

[src/utils/stark.ts:20](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L20)

---

### decompressProgram

▸ **decompressProgram**(`base64`): `any`

Decompress compressed compiled Cairo program

#### Parameters

| Name     | Type     | Description        |
| :------- | :------- | :----------------- |
| `base64` | `string` | Compressed program |

#### Returns

`any`

Parsed decompressed compiled Cairo program

#### Defined in

[src/utils/stark.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L31)

---

### randomAddress

▸ **randomAddress**(): `string`

Random Address based on random keyPair

#### Returns

`string`

#### Defined in

[src/utils/stark.ts:40](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L40)

---

### makeAddress

▸ **makeAddress**(`input`): `string`

Lowercase and hex prefix string

**`Deprecated`**

Not used internally, naming is confusing based on functionality

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/stark.ts:50](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L50)

---

### formatSignature

▸ **formatSignature**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

Format Signature to standard type (hex array)

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

Custom hex array or weierstrass.SignatureType hex array

#### Defined in

[src/utils/stark.ts:58](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L58)

---

### signatureToDecimalArray

▸ **signatureToDecimalArray**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

Format Signature to decimal string array

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:74](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L74)

---

### signatureToHexArray

▸ **signatureToHexArray**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

Format Signature to hex string array

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:81](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L81)

---

### estimatedFeeToMaxFee

▸ **estimatedFeeToMaxFee**(`estimatedFee`, `overhead?`): `bigint`

Convert estimated fee to max fee with overhead

#### Parameters

| Name           | Type                                    | Default value |
| :------------- | :-------------------------------------- | :------------ |
| `estimatedFee` | [`BigNumberish`](types.md#bignumberish) | `undefined`   |
| `overhead`     | `number`                                | `0.5`         |

#### Returns

`bigint`

#### Defined in

[src/utils/stark.ts:88](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/stark.ts#L88)

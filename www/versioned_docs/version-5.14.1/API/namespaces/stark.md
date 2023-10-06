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

[src/utils/stark.ts:21](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L21)

---

### decompressProgram

▸ **decompressProgram**(`base64`): `any`

Function to decompress compressed compiled cairo program

#### Parameters

| Name     | Type     | Description       |
| :------- | :------- | :---------------- |
| `base64` | `string` | CompressedProgram |

#### Returns

`any`

parsed decompressed compiled cairo program

#### Defined in

[src/utils/stark.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L33)

---

### randomAddress

▸ **randomAddress**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/stark.ts:39](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L39)

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

[src/utils/stark.ts:44](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L44)

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

[src/utils/stark.ts:48](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L48)

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

[src/utils/stark.ts:61](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L61)

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

[src/utils/stark.ts:65](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L65)

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

[src/utils/stark.ts:69](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/stark.ts#L69)

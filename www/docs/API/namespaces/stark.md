---
id: 'stark'
title: 'Namespace: stark'
sidebar_label: 'stark'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### compressProgram

▸ **compressProgram**(`jsonProgram`): [`CompressedProgram`](../modules.md#compressedprogram)

Function to compress compiled cairo program

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)

#### Parameters

| Name          | Type                                              | Description                                       |
| :------------ | :------------------------------------------------ | :------------------------------------------------ |
| `jsonProgram` | `string` \| [`Program`](../interfaces/Program.md) | json file representing the compiled cairo program |

#### Returns

[`CompressedProgram`](../modules.md#compressedprogram)

Compressed cairo program

#### Defined in

[src/utils/stark.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L22)

---

### randomAddress

▸ **randomAddress**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/stark.ts:28](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L28)

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

[src/utils/stark.ts:33](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L33)

---

### formatSignature

▸ **formatSignature**(`sig?`): [`ArraySignatureType`](../modules.md#arraysignaturetype)

#### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `sig?` | [`Signature`](../modules.md#signature) |

#### Returns

[`ArraySignatureType`](../modules.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:37](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L37)

---

### signatureToDecimalArray

▸ **signatureToDecimalArray**(`sig?`): [`ArraySignatureType`](../modules.md#arraysignaturetype)

#### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `sig?` | [`Signature`](../modules.md#signature) |

#### Returns

[`ArraySignatureType`](../modules.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:50](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L50)

---

### signatureToHexArray

▸ **signatureToHexArray**(`sig?`): [`ArraySignatureType`](../modules.md#arraysignaturetype)

#### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `sig?` | [`Signature`](../modules.md#signature) |

#### Returns

[`ArraySignatureType`](../modules.md#arraysignaturetype)

#### Defined in

[src/utils/stark.ts:54](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L54)

---

### estimatedFeeToMaxFee

▸ **estimatedFeeToMaxFee**(`estimatedFee`, `overhead?`): `bigint`

#### Parameters

| Name           | Type                                  | Default value |
| :------------- | :------------------------------------ | :------------ |
| `estimatedFee` | [`BigNumberish`](num.md#bignumberish) | `undefined`   |
| `overhead`     | `number`                              | `0.5`         |

#### Returns

`bigint`

#### Defined in

[src/utils/stark.ts:58](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/stark.ts#L58)

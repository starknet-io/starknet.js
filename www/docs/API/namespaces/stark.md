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

[src/utils/stark.ts:28](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L28)

---

### randomAddress

▸ **randomAddress**(): `string`

#### Returns

`string`

#### Defined in

[src/utils/stark.ts:34](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L34)

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

[src/utils/stark.ts:39](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L39)

---

### formatSignature

▸ **formatSignature**(`sig?`): `string`[]

#### Parameters

| Name   | Type                                                             |
| :----- | :--------------------------------------------------------------- |
| `sig?` | [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md) |

#### Returns

`string`[]

#### Defined in

[src/utils/stark.ts:43](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L43)

---

### signatureToDecimalArray

▸ **signatureToDecimalArray**(`sig?`): `string`[]

#### Parameters

| Name   | Type                                                             |
| :----- | :--------------------------------------------------------------- |
| `sig?` | [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md) |

#### Returns

`string`[]

#### Defined in

[src/utils/stark.ts:53](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L53)

---

### signatureToHexArray

▸ **signatureToHexArray**(`sig?`): `string`[]

#### Parameters

| Name   | Type                                                             |
| :----- | :--------------------------------------------------------------- |
| `sig?` | [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md) |

#### Returns

`string`[]

#### Defined in

[src/utils/stark.ts:57](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L57)

---

### parseSignature

▸ **parseSignature**(`sig?`): `undefined` \| [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `sig?` | `string`[] |

#### Returns

`undefined` \| [`SignatureType`](../interfaces/ec.weierstrass.SignatureType.md)

#### Defined in

[src/utils/stark.ts:61](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L61)

---

### compileCalldata

▸ **compileCalldata**(`args`): [`Calldata`](../modules.md#calldata)

**`Deprecated`**

this function is deprecated use callData instead from calldata.ts

#### Parameters

| Name   | Type                               |
| :----- | :--------------------------------- |
| `args` | [`RawArgs`](../modules.md#rawargs) |

#### Returns

[`Calldata`](../modules.md#calldata)

#### Defined in

[src/utils/stark.ts:71](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L71)

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

[src/utils/stark.ts:89](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/stark.ts#L89)

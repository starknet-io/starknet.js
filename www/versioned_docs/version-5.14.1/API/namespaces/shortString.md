---
id: 'shortString'
title: 'Namespace: shortString'
sidebar_label: 'shortString'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### isASCII

▸ **isASCII**(`str`): `boolean`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:6](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L6)

---

### isShortString

▸ **isShortString**(`str`): `boolean`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:12](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L12)

---

### isDecimalString

▸ **isDecimalString**(`decim`): `boolean`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `decim` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:17](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L17)

---

### isText

▸ **isText**(`val`): `boolean`

check if value is string text, and not string-hex, string-number

#### Parameters

| Name  | Type  | Description |
| :---- | :---- | :---------- |
| `val` | `any` | any         |

#### Returns

`boolean`

boolean

#### Defined in

[src/utils/shortString.ts:26](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L26)

---

### splitLongString

▸ **splitLongString**(`longStr`): `string`[]

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `longStr` | `string` |

#### Returns

`string`[]

#### Defined in

[src/utils/shortString.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L33)

---

### encodeShortString

▸ **encodeShortString**(`str`): `string`

Convert an ASCII string to an hexadecimal string.

**`Example`**

```typescript
const myEncodedString: string = encodeShortString("uri/pict/t38.jpg");
```

returns: string("0x7572692f706963742f7433382e6a7067")

#### Parameters

| Name  | Type     | Description                                             |
| :---- | :------- | :------------------------------------------------------ |
| `str` | `string` | ASCII string - 31 characters maxi. Ex: "uri/item23.jpg" |

#### Returns

`string`

a string representing an Hex number 248 bits max.

#### Defined in

[src/utils/shortString.ts:49](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L49)

---

### decodeShortString

▸ **decodeShortString**(`str`): `string`

Convert an hexadecimal or decimal string to an ASCII string.

**`Example`**

```typescript
const myDecodedString: string = decodeShortString("0x7572692f706963742f7433382e6a7067");
```

return string ("uri/pict/t38.jpg")

#### Parameters

| Name  | Type     | Description                                                                                             |
| :---- | :------- | :------------------------------------------------------------------------------------------------------ |
| `str` | `string` | string - representing a 248 bits max number. Ex: hex ("0x1A4F64EA56") or decimal ("236942575435676423") |

#### Returns

`string`

a string with 31 characters max.

#### Defined in

[src/utils/shortString.ts:67](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L67)

---

### isShortText

▸ **isShortText**(`val`): `boolean`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `val` | `any` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:30](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L30)

---

### isLongText

▸ **isLongText**(`val`): `boolean`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `val` | `any` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.14.1/src/utils/shortString.ts#L31)

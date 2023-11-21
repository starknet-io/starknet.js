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

Test if string contains only ASCII characters (string can be ascii text)

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:8](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L8)

---

### isShortString

▸ **isShortString**(`str`): `boolean`

Test if string is a Cairo short string (string has less or equal 31 characters)

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:16](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L16)

---

### isDecimalString

▸ **isDecimalString**(`str`): `boolean`

Test if string contains only numbers (string can be converted to decimal number)

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:23](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L23)

---

### isText

▸ **isText**(`val`): `boolean`

Test if value is a free-from string text, and not a hex string or number string

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `val` | `any` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:30](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L30)

---

### splitLongString

▸ **splitLongString**(`longStr`): `string`[]

Split long text into short strings

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `longStr` | `string` |

#### Returns

`string`[]

#### Defined in

[src/utils/shortString.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L47)

---

### encodeShortString

▸ **encodeShortString**(`str`): `string`

Convert an ASCII string to a hexadecimal string.

**`Example`**

```typescript
const myEncodedString: string = encodeShortString("uri/pict/t38.jpg");
// return hex string (ex."0x7572692f706963742f7433382e6a7067")
```

#### Parameters

| Name  | Type     | Description                                    |
| :---- | :------- | :--------------------------------------------- |
| `str` | `string` | short string (ASCII string, 31 characters max) |

#### Returns

`string`

format: hex-string; 248 bits max

#### Defined in

[src/utils/shortString.ts:62](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L62)

---

### decodeShortString

▸ **decodeShortString**(`str`): `string`

Convert a hexadecimal or decimal string to an ASCII string.

**`Example`**

```typescript
const myDecodedString: string = decodeShortString("0x7572692f706963742f7433382e6a7067");
// return string (ex."uri/pict/t38.jpg")
```

#### Parameters

| Name  | Type     | Description                                                                    |
| :---- | :------- | :----------------------------------------------------------------------------- |
| `str` | `string` | representing a 248 bit max number (ex. "0x1A4F64EA56" or "236942575435676423") |

#### Returns

`string`

format: short string; 31 characters max

#### Defined in

[src/utils/shortString.ts:78](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L78)

---

### isShortText

▸ **isShortText**(`val`): `boolean`

Test if value is short text

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `val` | `any` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:37](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L37)

---

### isLongText

▸ **isLongText**(`val`): `boolean`

Test if value is long text

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `val` | `any` |

#### Returns

`boolean`

#### Defined in

[src/utils/shortString.ts:42](https://github.com/starknet-io/starknet.js/blob/v5.24.3/src/utils/shortString.ts#L42)

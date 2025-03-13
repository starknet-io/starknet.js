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

| Name  | Type     | Description        |
| :---- | :------- | :----------------- |
| `str` | `string` | The string to test |

#### Returns

`boolean`

Returns true if the string contains only ASCII characters, otherwise false

**`Example`**

```typescript
const result = shortString.isASCII('Hello, world!');
// result = true
const result = shortString.isASCII('Hello, 世界!');
// result = false
```

#### Defined in

[src/utils/shortString.ts:18](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L18)

---

### isShortString

▸ **isShortString**(`str`): `boolean`

Test if a string is a Cairo short string (string with less or equal 31 characters)

#### Parameters

| Name  | Type     | Description        |
| :---- | :------- | :----------------- |
| `str` | `string` | the string to test |

#### Returns

`boolean`

Returns true if the string has less than or equal to 31 characters, otherwise false.

**`Example`**

```typescript
const result = shortString.isShortString('Hello, world!');
// result = true
```

#### Defined in

[src/utils/shortString.ts:33](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L33)

---

### isDecimalString

▸ **isDecimalString**(`str`): `boolean`

Test if string contains only numbers (string can be converted to decimal integer number)

#### Parameters

| Name  | Type     | Description         |
| :---- | :------- | :------------------ |
| `str` | `string` | the string to test. |

#### Returns

`boolean`

Returns true if the string contains only numbers, otherwise false.

**`Example`**

```typescript
const result = shortString.isDecimalString('12345');
// result = true
const result = shortString.isDecimalString('12a45');
// result = false
```

#### Defined in

[src/utils/shortString.ts:49](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L49)

---

### isText

▸ **isText**(`val`): `boolean`

Test if value is a pure string text, and not a hex string or number string

#### Parameters

| Name  | Type  | Description       |
| :---- | :---- | :---------------- |
| `val` | `any` | the value to test |

#### Returns

`boolean`

returns true if the value is a free-form string text, otherwise false

**`Example`**

```typescript
const result = shortString.isText('Hello, world!');
// result = true
const result = shortString.isText('0x7aec92f706');
// result = false
```

#### Defined in

[src/utils/shortString.ts:65](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L65)

---

### splitLongString

▸ **splitLongString**(`longStr`): `string`[]

Split long text (string greater than 31 characters) into short strings (string lesser or equal 31 characters)

#### Parameters

| Name      | Type     | Description                                                |
| :-------- | :------- | :--------------------------------------------------------- |
| `longStr` | `string` | the long text (string greater than 31 characters) to split |

#### Returns

`string`[]

an array of short strings (string lesser or equal 31 characters).

**`Example`**

```typescript
const result = shortString.splitLongString(
  'Hello, world! we just testing splitLongString function.'
);
// result = [ 'Hello, world! we just testing s', 'plitLongString function.' ]
```

#### Defined in

[src/utils/shortString.ts:103](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L103)

---

### encodeShortString

▸ **encodeShortString**(`str`): `string`

Convert an ASCII short string to a hexadecimal string.

#### Parameters

| Name  | Type     | Description                                    |
| :---- | :------- | :--------------------------------------------- |
| `str` | `string` | short string (ASCII string, 31 characters max) |

#### Returns

`string`

hex-string with 248 bits max

**`Example`**

```typescript
const result = shortString.encodeShortString('uri/pict/t38.jpg');
// result = "0x7572692f706963742f7433382e6a7067"
```

#### Defined in

[src/utils/shortString.ts:118](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L118)

---

### decodeShortString

▸ **decodeShortString**(`str`): `string`

Convert a hexadecimal or decimal string to an ASCII string.

#### Parameters

| Name  | Type     | Description                                                                    |
| :---- | :------- | :----------------------------------------------------------------------------- |
| `str` | `string` | representing a 248 bit max number (ex. "0x1A4F64EA56" or "236942575435676423") |

#### Returns

`string`

short string; 31 characters max

**`Example`**

```typescript
const result = shortString.decodeShortString('0x7572692f706963742f7433382e6a7067');
// result = "uri/pict/t38.jpg"
```

#### Defined in

[src/utils/shortString.ts:134](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L134)

---

### isShortText

▸ **isShortText**(`val`): `boolean`

Test if value is short text

#### Parameters

| Name  | Type  | Description      |
| :---- | :---- | :--------------- |
| `val` | `any` | The item to test |

#### Returns

`boolean`

Returns true if the value is a short text (string has less or equal 31 characters), otherwise false

**`Example`**

```typescript
const result = shortString.isShortText('Hello, world!');
// result = true
```

#### Defined in

[src/utils/shortString.ts:79](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L79)

---

### isLongText

▸ **isLongText**(`val`): `boolean`

Test if value is long text

#### Parameters

| Name  | Type  | Description       |
| :---- | :---- | :---------------- |
| `val` | `any` | the value to test |

#### Returns

`boolean`

returns true if the value is a long text(string has more than 31 characters), otherwise false.

**`Example`**

```typescript
const result = shortString.isLongText(
  'Hello, world! this is some random long string to enable you test isLongText function.'
);
// result = true
```

#### Defined in

[src/utils/shortString.ts:91](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/shortString.ts#L91)

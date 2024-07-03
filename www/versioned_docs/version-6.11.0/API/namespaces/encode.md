---
id: 'encode'
title: 'Namespace: encode'
sidebar_label: 'encode'
sidebar_position: 0
custom_edit_url: null
---

## References

### IS_BROWSER

Re-exports [IS_BROWSER](constants.md#is_browser)

## Functions

### arrayBufferToString

▸ **arrayBufferToString**(`array`): `string`

Convert array buffer to string

_[internal usage]_

#### Parameters

| Name    | Type          | Description                           |
| :------ | :------------ | :------------------------------------ |
| `array` | `ArrayBuffer` | The ArrayBuffer to convert to string. |

#### Returns

`string`

The converted string.

**`Example`**

```typescript
const buffer = new ArrayBuffer(5);
const view = new Uint8Array(buffer);
[72, 101, 108, 108, 111].forEach((x, idx) => (view[idx] = x));
const result = encode.arrayBufferToString(buffer);
// result = "Hello"
```

#### Defined in

[src/utils/encode.ts:30](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L30)

---

### utf8ToArray

▸ **utf8ToArray**(`str`): `Uint8Array`

Convert utf8-string to Uint8Array

_[internal usage]_

#### Parameters

| Name  | Type     | Description                  |
| :---- | :------- | :--------------------------- |
| `str` | `string` | The UTF-8 string to convert. |

#### Returns

`Uint8Array`

The encoded Uint8Array.

**`Example`**

```typescript
const myString = 'Hi';
const result = encode.utf8ToArray(myString);
// result = Uint8Array(2) [ 72, 105 ]
```

#### Defined in

[src/utils/encode.ts:49](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L49)

---

### stringToArrayBuffer

▸ **stringToArrayBuffer**(`str`): `Uint8Array`

Convert utf8-string to Uint8Array

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`Uint8Array`

**`Deprecated`**

equivalent to 'utf8ToArray', alias will be removed

#### Defined in

[src/utils/encode.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L58)

---

### atobUniversal

▸ **atobUniversal**(`a`): `Uint8Array`

Convert string to array buffer (browser and node compatible)

#### Parameters

| Name | Type     | Description                           |
| :--- | :------- | :------------------------------------ |
| `a`  | `string` | The Base64 encoded string to convert. |

#### Returns

`Uint8Array`

The decoded Uint8Array.

**`Example`**

```typescript
const base64String = 'SGVsbG8='; // 'Hello' in Base64
const result = encode.atobUniversal(base64String);
// result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
```

#### Defined in

[src/utils/encode.ts:75](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L75)

---

### btoaUniversal

▸ **btoaUniversal**(`b`): `string`

Convert array buffer to string (browser and node compatible)

#### Parameters

| Name | Type          | Description       |
| :--- | :------------ | :---------------- |
| `b`  | `ArrayBuffer` | The Array buffer. |

#### Returns

`string`

The Base64 encoded string.

**`Example`**

```typescript
const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
const result = encode.btoaUniversal(buffer);
// result = "SGVsbG8="
```

#### Defined in

[src/utils/encode.ts:92](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L92)

---

### buf2hex

▸ **buf2hex**(`buffer`): `string`

Convert array buffer to hex-string

#### Parameters

| Name     | Type         | Description             |
| :------- | :----------- | :---------------------- |
| `buffer` | `Uint8Array` | The encoded Uint8Array. |

#### Returns

`string`

The hex-string

**`Example`**

```typescript
const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
const result = encode.buf2hex(buffer);
// result = "48656c6c6f"
```

#### Defined in

[src/utils/encode.ts:109](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L109)

---

### removeHexPrefix

▸ **removeHexPrefix**(`hex`): `string`

Remove hex prefix '0x' from hex-string

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`string`

The hex-string

**`Example`**

```typescript
const hexStringWithPrefix = '0x48656c6c6f';
const result = encode.removeHexPrefix(hexStringWithPrefix);
// result: "48656c6c6f"
```

#### Defined in

[src/utils/encode.ts:125](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L125)

---

### addHexPrefix

▸ **addHexPrefix**(`hex`): `string`

Add hex prefix '0x' to base16-string

#### Parameters

| Name  | Type     | Description   |
| :---- | :------- | :------------ |
| `hex` | `string` | base16-string |

#### Returns

`string`

The hex-string

**`Example`**

```typescript
const plainHexString = '48656c6c6f';
const result = encode.addHexPrefix(plainHexString);
// result: "0x48656c6c6f"
```

#### Defined in

[src/utils/encode.ts:141](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L141)

---

### padLeft

▸ **padLeft**(`str`, `length`, `padding?`): `string`

Prepend string (default with '0')

Pads a string to a certain length with a specific string.
The padding can be applied only to the left of the input string.

#### Parameters

| Name       | Type     | Default value | Description                                     |
| :--------- | :------- | :------------ | :---------------------------------------------- |
| `str`      | `string` | `undefined`   | The string to pad.                              |
| `length`   | `number` | `undefined`   | The target length for the padded string.        |
| `padding?` | `string` | `STRING_ZERO` | The string to use for padding. Defaults to '0'. |

#### Returns

`string`

The padded string.

**`Example`**

```typescript
const myString = '1A3F';
const result = encode.padLeft(myString, 10);
// result: '0000001A3F'
```

#### Defined in

[src/utils/encode.ts:194](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L194)

---

### calcByteLength

▸ **calcByteLength**(`str`, `byteSize?`): `number`

Calculate byte length of string

_[no internal usage]_

Calculates the byte length of a string based on a specified byte size.
The function rounds up the byte count to the nearest multiple of the specified byte size.

#### Parameters

| Name        | Type     | Default value | Description                                               |
| :---------- | :------- | :------------ | :-------------------------------------------------------- |
| `str`       | `string` | `undefined`   | The string whose byte length is to be calculated.         |
| `byteSize?` | `number` | `8`           | The size of the byte block to round up to. Defaults to 8. |

#### Returns

`number`

The calculated byte length, rounded to the nearest multiple of byteSize.

**`Example`**

```typescript
const myString = 'Hello';
const result = encode.calcByteLength(myString, 4);
// result = 8 (rounded up to the nearest multiple of 4)
```

#### Defined in

[src/utils/encode.ts:218](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L218)

---

### sanitizeBytes

▸ **sanitizeBytes**(`str`, `byteSize?`, `padding?`): `string`

Prepend '0' to string bytes

_[no internal usage]_

- Prepends padding to the left of a string to ensure it matches a specific byte length.
  The function uses a specified padding character and rounds up the string length to the nearest multiple of `byteSize`.

#### Parameters

| Name        | Type     | Default value | Description                                                                         |
| :---------- | :------- | :------------ | :---------------------------------------------------------------------------------- |
| `str`       | `string` | `undefined`   | The string to be padded.                                                            |
| `byteSize?` | `number` | `8`           | The byte block size to which the string length should be rounded up. Defaults to 8. |
| `padding?`  | `string` | `STRING_ZERO` | The character to use for padding. Defaults to '0'.                                  |

#### Returns

`string`

The padded string.

**`Example`**

```typescript
const myString = '123';
const result = encode.sanitizeBytes(myString);
// result: '00000123' (padded to 8 characters)
```

#### Defined in

[src/utils/encode.ts:245](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L245)

---

### sanitizeHex

▸ **sanitizeHex**(`hex`): `string`

Sanitizes a hex-string by removing any existing '0x' prefix, padding the string with '0' to ensure it has even length,
and then re-adding the '0x' prefix.

_[no internal usage]_

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`string`

format: hex-string

**`Example`**

```typescript
const unevenHex = '0x23abc';
const result = encode.sanitizeHex(unevenHex);
// result = '0x023abc' (padded to ensure even length)
```

#### Defined in

[src/utils/encode.ts:264](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L264)

---

### pascalToSnake

▸ **pascalToSnake**(`text`): `string`

String transformation util

Pascal case to screaming snake case

#### Parameters

| Name   | Type     | Description                       |
| :----- | :------- | :-------------------------------- |
| `text` | `string` | The PascalCase string to convert. |

#### Returns

`string`

The converted snake_case string in uppercase.

**`Example`**

```typescript
const pascalString = 'PascalCaseExample';
const result = encode.pascalToSnake(pascalString);
// result: 'PASCAL_CASE_EXAMPLE'
```

#### Defined in

[src/utils/encode.ts:288](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/encode.ts#L288)

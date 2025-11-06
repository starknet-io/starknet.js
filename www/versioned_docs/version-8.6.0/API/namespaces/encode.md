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

[src/utils/encode.ts:29](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L29)

---

### utf8ToUint8Array

▸ **utf8ToUint8Array**(`str`): `Uint8Array`

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

[src/utils/encode.ts:48](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L48)

---

### utf8ToBigInt

▸ **utf8ToBigInt**(`str`): `bigint`

Convert utf8-string to bigint

#### Parameters

| Name  | Type     | Description                  |
| :---- | :------- | :--------------------------- |
| `str` | `string` | The UTF-8 string to convert. |

#### Returns

`bigint`

The converted bigint.

#### Defined in

[src/utils/encode.ts:63](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L63)

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

[src/utils/encode.ts:80](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L80)

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

[src/utils/encode.ts:97](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L97)

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

[src/utils/encode.ts:114](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L114)

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

[src/utils/encode.ts:130](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L130)

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

[src/utils/encode.ts:146](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L146)

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

[src/utils/encode.ts:203](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L203)

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

[src/utils/encode.ts:227](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L227)

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

[src/utils/encode.ts:254](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L254)

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

[src/utils/encode.ts:277](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L277)

---

### concatenateArrayBuffer

▸ **concatenateArrayBuffer**(`uint8arrays`): `Uint8Array`

Combine multiple Uint8Arrays into one.
Useful for wallet path creation.

#### Parameters

| Name          | Type           | Description             |
| :------------ | :------------- | :---------------------- |
| `uint8arrays` | `Uint8Array`[] | An array of Uint8Array. |

#### Returns

`Uint8Array`

all the Uint8Arrays joined.

**`Example`**

```typescript
const path0buff = new Uint8Array([128, 0, 10, 85]);
const path1buff = new Uint8Array([71, 65, 233, 201]);
const result = encode.concatenateArrayBuffer([path0buff, path1buff]);
// result = Uint8Array(8) [128, 0, 10, 85, 71, 65, 233, 201]
```

#### Defined in

[src/utils/encode.ts:319](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L319)

---

### hexStringToUint8Array

▸ **hexStringToUint8Array**(`hex`): `Uint8Array`

Convert hex string to Uint8Array

#### Parameters

| Name  | Type     | Description                                             |
| :---- | :------- | :------------------------------------------------------ |
| `hex` | `string` | The hex string to convert (with or without '0x' prefix) |

#### Returns

`Uint8Array`

The converted byte array

**`Throws`**

If the string contains non-hexadecimal characters

**`Example`**

```typescript
const hexString = '0x48656c6c6f';
const result = encode.hexStringToUint8Array(hexString);
// result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
```

#### Defined in

[src/utils/encode.ts:344](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L344)

---

### stringToUint8Array

▸ **stringToUint8Array**(`str`): `Uint8Array`

Convert any string to Uint8Array

Handles three types of strings:

- Hex strings (e.g., '0x123f') - converts hex bytes to Uint8Array
- Decimal strings (e.g., '124324332') - converts decimal number to bytes
- Text strings (e.g., 'I am cool ☥') - converts UTF-8 text to bytes

#### Parameters

| Name  | Type     | Description           |
| :---- | :------- | :-------------------- |
| `str` | `string` | The string to convert |

#### Returns

`Uint8Array`

The converted byte array

**`Example`**

```typescript
// Hex string
const hex = stringToUint8Array('0x48656c6c6f');
// result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]

// Decimal string
const decimal = stringToUint8Array('256');
// result = Uint8Array(2) [ 1, 0 ]

// Text string
const text = stringToUint8Array('Hello ☥');
// result = UTF-8 encoded bytes
```

#### Defined in

[src/utils/encode.ts:403](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L403)

---

### bigIntToUint8Array

▸ **bigIntToUint8Array**(`value`): `Uint8Array`

Convert bigint to Uint8Array (big-endian)

#### Parameters

| Name    | Type     | Description                                        |
| :------ | :------- | :------------------------------------------------- |
| `value` | `bigint` | The bigint value to convert (must be non-negative) |

#### Returns

`Uint8Array`

The converted byte array in big-endian byte order

**`Throws`**

If value is negative

**`Example`**

```typescript
const value = 256n; // 0x0100
const result = encode.bigIntToUint8Array(value);
// result = Uint8Array([1, 0]) - big-endian, MSB first
```

#### Defined in

[src/utils/encode.ts:434](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L434)

---

### uint8ArrayToBigInt

▸ **uint8ArrayToBigInt**(`data`): `bigint`

Convert Uint8Array to bigint (big-endian)

#### Parameters

| Name   | Type         | Description                                           |
| :----- | :----------- | :---------------------------------------------------- |
| `data` | `Uint8Array` | The Uint8Array to convert (interpreted as big-endian) |

#### Returns

`bigint`

The converted bigint value

**`Example`**

```typescript
const data = new Uint8Array([1, 0]); // Big-endian representation
const result = encode.uint8ArrayToBigInt(data);
// result = 256n (0x0100)
```

#### Defined in

[src/utils/encode.ts:472](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L472)

---

### utf8ToArray

▸ **utf8ToArray**(`str`): `Uint8Array`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`Uint8Array`

**`Deprecated`**

use utf8ToUint8Array instead

#### Defined in

[src/utils/encode.ts:55](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L55)

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

[src/utils/encode.ts:298](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/encode.ts#L298)

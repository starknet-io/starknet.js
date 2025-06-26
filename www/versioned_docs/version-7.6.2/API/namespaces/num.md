---
id: 'num'
title: 'Namespace: num'
sidebar_label: 'num'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### isHex

▸ **isHex**(`hex`): `boolean`

Test if string is hex-string

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`boolean`

true if the input string is a hexadecimal string, false otherwise

**`Example`**

```typescript
const hexString1 = '0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914';
const result1 = isHex(hexString1);
// result1 = true

const hexString2 = '2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914';
const result2 = isHex(hexString2);
// result2 = false
```

#### Defined in

[src/utils/num.ts:26](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L26)

---

### toBigInt

▸ **toBigInt**(`value`): `bigint`

Convert BigNumberish to bigint

#### Parameters

| Name    | Type                                    | Description      |
| :------ | :-------------------------------------- | :--------------- |
| `value` | [`BigNumberish`](types.md#bignumberish) | value to convert |

#### Returns

`bigint`

converted value

**`Example`**

```typescript
const str = '123';
const result = toBigInt(str);
// result = 123n
```

#### Defined in

[src/utils/num.ts:42](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L42)

---

### tryToBigInt

▸ **tryToBigInt**(`value`): `undefined` \| `bigint`

try to convert BigNumberish to bigint
in case of undefined return undefined

#### Parameters

| Name    | Type                                                   |
| :------ | :----------------------------------------------------- |
| `value` | `undefined` \| [`BigNumberish`](types.md#bignumberish) |

#### Returns

`undefined` \| `bigint`

#### Defined in

[src/utils/num.ts:50](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L50)

---

### toHex

▸ **toHex**(`value`): `string`

Convert BigNumberish to hex-string

#### Parameters

| Name    | Type                                    | Description      |
| :------ | :-------------------------------------- | :--------------- |
| `value` | [`BigNumberish`](types.md#bignumberish) | value to convert |

#### Returns

`string`

converted number in hex-string format

**`Example`**

```typescript
toHex(100); // '0x64'
toHex('200'); // '0xc8'
```

#### Defined in

[src/utils/num.ts:65](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L65)

---

### toStorageKey

▸ **toStorageKey**(`number`): `string`

Convert BigNumberish to storage-key-string

Same as toHex but conforming to the STORAGE_KEY pattern `^0x0[0-7]{1}[a-fA-F0-9]{0,62}$`.

A storage key is represented as up to 62 hex digits, 3 bits, and 5 leading zeroes:
`0x0 + [0-7] + 62 hex = 0x + 64 hex`

#### Parameters

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `number` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

format: storage-key-string

**`Example`**

```typescript
toStorageKey(0x123); // '0x0000000000000000000000000000000000000000000000000000000000000123'
toStorageKey(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
toStorageKey('test'); // 'Error'
```

#### Defined in

[src/utils/num.ts:89](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L89)

---

### toHex64

▸ **toHex64**(`number`): `string`

Convert BigNumberish to hex format 0x + 64 hex chars

Similar as toStorageKey but conforming to exactly 0x(64 hex chars).

#### Parameters

| Name     | Type                                    |
| :------- | :-------------------------------------- |
| `number` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

format: hex-0x(64)-string

**`Example`**

```typescript
toHex64(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
toHex64(123n); // '0x000000000000000000000000000000000000000000000000000000000000007b'
toHex64('test'); // 'Error'
```

#### Defined in

[src/utils/num.ts:107](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L107)

---

### hexToDecimalString

▸ **hexToDecimalString**(`hex`): `string`

Convert hexadecimal string to decimal string

#### Parameters

| Name  | Type     | Description           |
| :---- | :------- | :-------------------- |
| `hex` | `string` | hex-string to convert |

#### Returns

`string`

converted number in decimal string format

**`Example`**

```typescript
hexToDecimalString('64'); // '100'
hexToDecimalString('c8'); // '200'
```

#### Defined in

[src/utils/num.ts:124](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L124)

---

### cleanHex

▸ **cleanHex**(`hex`): `string`

Remove hex-string leading zeroes and lowercase it

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `hex` | `string` | hex-string  |

#### Returns

`string`

updated string in hex-string format

**`Example`**

```typescript
cleanHex('0x00023AB'); // '0x23ab'
```

#### Defined in

[src/utils/num.ts:138](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L138)

---

### assertInRange

▸ **assertInRange**(`input`, `lowerBound`, `upperBound`, `inputName?`): `void`

Asserts input is equal to or greater then lowerBound and lower then upperBound.

The `inputName` parameter is used in the assertion message.

#### Parameters

| Name         | Type                                    | Default value | Description                         |
| :----------- | :-------------------------------------- | :------------ | :---------------------------------- |
| `input`      | [`BigNumberish`](types.md#bignumberish) | `undefined`   | Value to check                      |
| `lowerBound` | [`BigNumberish`](types.md#bignumberish) | `undefined`   | Lower bound value                   |
| `upperBound` | [`BigNumberish`](types.md#bignumberish) | `undefined`   | Upper bound value                   |
| `inputName`  | `string`                                | `''`          | Name of the input for error message |

#### Returns

`void`

**`Throws`**

Error if input is out of range

**`Example`**

```typescript
const input1: BigNumberish = 10;
assertInRange(input1, 5, 20, 'value');

const input2: BigNumberish = 25;
assertInRange(input2, 5, 20, 'value');
// throws Error: Message not signable, invalid value length.
```

#### Defined in

[src/utils/num.ts:161](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L161)

---

### bigNumberishArrayToDecimalStringArray

▸ **bigNumberishArrayToDecimalStringArray**(`data`): `string`[]

Convert BigNumberish array to decimal string array

#### Parameters

| Name   | Type                                      | Description                     |
| :----- | :---------------------------------------- | :------------------------------ |
| `data` | [`BigNumberish`](types.md#bignumberish)[] | array of big-numberish elements |

#### Returns

`string`[]

array of decimal strings

**`Example`**

```typescript
const data = [100, 200n];
const result = bigNumberishArrayToDecimalStringArray(data);
// result = ['100', '200']
```

#### Defined in

[src/utils/num.ts:190](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L190)

---

### bigNumberishArrayToHexadecimalStringArray

▸ **bigNumberishArrayToHexadecimalStringArray**(`data`): `string`[]

Convert BigNumberish array to hexadecimal string array

#### Parameters

| Name   | Type                                      | Description                     |
| :----- | :---------------------------------------- | :------------------------------ |
| `data` | [`BigNumberish`](types.md#bignumberish)[] | array of big-numberish elements |

#### Returns

`string`[]

array of hex-strings

**`Example`**

```typescript
const data = [100, 200n];
const result = bigNumberishArrayToHexadecimalStringArray(data);
// result = ['0x64', '0xc8']
```

#### Defined in

[src/utils/num.ts:206](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L206)

---

### isStringWholeNumber

▸ **isStringWholeNumber**(`str`): `boolean`

Test if string is a whole number (0, 1, 2, 3...)

#### Parameters

| Name  | Type     | Description    |
| :---- | :------- | :------------- |
| `str` | `string` | string to test |

#### Returns

`boolean`

: true if string is a whole number, false otherwise

**`Example`**

```typescript
isStringWholeNumber('100'); // true
isStringWholeNumber('10.0'); // false
isStringWholeNumber('test'); // false
```

#### Defined in

[src/utils/num.ts:222](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L222)

---

### getDecimalString

▸ **getDecimalString**(`str`): `string`

Convert string to decimal string

#### Parameters

| Name  | Type     | Description       |
| :---- | :------- | :---------------- |
| `str` | `string` | string to convert |

#### Returns

`string`

converted string in decimal format

**`Throws`**

str needs to be a number string in hex or whole number format

**`Example`**

```typescript
const result = getDecimalString('0x1a');
// result = "26"

const result2 = getDecimalString('Hello');
// throws Error: "Hello needs to be a hex-string or whole-number-string"
```

#### Defined in

[src/utils/num.ts:241](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L241)

---

### getHexString

▸ **getHexString**(`str`): `string`

Convert string to hexadecimal string

#### Parameters

| Name  | Type     | Description       |
| :---- | :------- | :---------------- |
| `str` | `string` | string to convert |

#### Returns

`string`

converted hex-string

**`Throws`**

str needs to be a number string in hex or whole number format

**`Example`**

```typescript
const result = getHexString('123');
// result = "0x7b"

const result2 = getHexString('Hello');
// throws Error: Hello needs to be a hex-string or whole-number-string
```

#### Defined in

[src/utils/num.ts:266](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L266)

---

### getHexStringArray

▸ **getHexStringArray**(`array`): `string`[]

Convert string array to hex-string array

#### Parameters

| Name    | Type       | Description              |
| :------ | :--------- | :----------------------- |
| `array` | `string`[] | array of string elements |

#### Returns

`string`[]

array of converted elements in hex-string format

**`Example`**

```typescript
const data = ['100', '200', '0xaa'];
const result = getHexStringArray(data);
// result = ['0x64', '0xc8', '0xaa']
```

#### Defined in

[src/utils/num.ts:288](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L288)

---

### toCairoBool

▸ **toCairoBool**(`value`): `string`

Convert boolean to "0" or "1"

#### Parameters

| Name    | Type      | Description                        |
| :------ | :-------- | :--------------------------------- |
| `value` | `boolean` | The boolean value to be converted. |

#### Returns

`string`

Returns true if the value is a number, otherwise returns false.

**`Example`**

```typescript
const result = toCairoBool(true);
// result ="1"

const result2 = toCairoBool(false);
// result2 = "0"
```

#### Defined in

[src/utils/num.ts:306](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L306)

---

### hexToBytes

▸ **hexToBytes**(`str`): `Uint8Array`

Convert hex-string to an array of Bytes (Uint8Array)

#### Parameters

| Name  | Type     | Description |
| :---- | :------- | :---------- |
| `str` | `string` | hex-string  |

#### Returns

`Uint8Array`

array containing the converted elements

**`Throws`**

str must be a hex-string

**`Example`**

```typescript
let result;

result = hexToBytes('0x64');
// result = [100]

result = hexToBytes('test');
// throws Error: test needs to be a hex-string
```

#### Defined in

[src/utils/num.ts:327](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L327)

---

### addPercent

▸ **addPercent**(`number`, `percent`): `bigint`

Adds a percentage amount to the value

#### Parameters

| Name      | Type                                    | Description                       |
| :-------- | :-------------------------------------- | :-------------------------------- |
| `number`  | [`BigNumberish`](types.md#bignumberish) | value to be modified              |
| `percent` | `number`                                | integer as percent ex. 50 for 50% |

#### Returns

`bigint`

modified value

**`Example`**

```typescript
addPercent(100, 50); // 150n
addPercent(100, 100); // 200n
addPercent(200, 50); // 300n
addPercent(200, -50); // 100n
addPercent(200, -100); // 0n
addPercent(200, -150); // -100n
```

#### Defined in

[src/utils/num.ts:353](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L353)

---

### stringToSha256ToArrayBuff4

▸ **stringToSha256ToArrayBuff4**(`str`): `Uint8Array`

Calculate the sha256 hash of an utf8 string, then encode the
result in an uint8Array of 4 elements.
Useful in wallet path calculation.

#### Parameters

| Name  | Type     | Description                           |
| :---- | :------- | :------------------------------------ |
| `str` | `string` | utf8 string (hex string not handled). |

#### Returns

`Uint8Array`

a uint8Array of 4 bytes.

**`Example`**

```typescript
const ledgerPathApplicationName = 'LedgerW';
const path2Buffer = num.stringToSha256ToArrayBuff4(ledgerPathApplicationName);
// path2Buffer = Uint8Array(4) [43, 206, 231, 219]
```

#### Defined in

[src/utils/num.ts:371](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L371)

---

### isBigNumberish

▸ **isBigNumberish**(`input`): input is BigNumberish

Checks if a given value is of BigNumberish type.
234, 234n, "234", "0xea" are valid

#### Parameters

| Name    | Type      | Description |
| :------ | :-------- | :---------- |
| `input` | `unknown` | a value     |

#### Returns

input is BigNumberish

true if type of input is `BigNumberish`

**`Example`**

```typescript
const res = num.isBigNumberish('ZERO');
// res = false
```

#### Defined in

[src/utils/num.ts:389](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L389)

---

### toHexString

▸ **toHexString**(`value`): `string`

Alias of ToHex

#### Parameters

| Name    | Type                                    |
| :------ | :-------------------------------------- |
| `value` | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/num.ts:65](https://github.com/starknet-io/starknet.js/blob/v7.6.2/src/utils/num.ts#L65)

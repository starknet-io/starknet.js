---
id: 'num'
title: 'Namespace: num'
sidebar_label: 'num'
sidebar_position: 0
custom_edit_url: null
---

## References

### BigNumberish

Re-exports [BigNumberish](types.md#bignumberish)

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

[src/utils/num.ts:26](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L26)

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

[src/utils/num.ts:42](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L42)

---

### isBigInt

▸ **isBigInt**(`value`): value is bigint

Test if value is bigint

#### Parameters

| Name    | Type  | Description   |
| :------ | :---- | :------------ |
| `value` | `any` | value to test |

#### Returns

value is bigint

true if value is bigint, false otherwise

**`Example`**

```typescript
isBigInt(10n); // true
isBigInt(BigInt('10')); // true
isBigInt(10); // false
isBigInt('10'); // false
isBigInt(null); // false
```

#### Defined in

[src/utils/num.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L60)

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

[src/utils/num.ts:75](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L75)

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

#### Defined in

[src/utils/num.ts:93](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L93)

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

[src/utils/num.ts:108](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L108)

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

[src/utils/num.ts:122](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L122)

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

[src/utils/num.ts:145](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L145)

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

[src/utils/num.ts:174](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L174)

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

[src/utils/num.ts:190](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L190)

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

[src/utils/num.ts:206](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L206)

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

[src/utils/num.ts:225](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L225)

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

[src/utils/num.ts:250](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L250)

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

[src/utils/num.ts:272](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L272)

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

[src/utils/num.ts:290](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L290)

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

[src/utils/num.ts:311](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L311)

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

[src/utils/num.ts:337](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L337)

---

### isNumber

▸ **isNumber**(`value`): value is number

Check if a value is a number.

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is number

Returns true if the value is a number, otherwise returns false.

Returns true if the value is a number, otherwise returns false.

**`Example`**

```typescript
const result = isNumber(123);
// result = true

const result2 = isNumber('123');
// result2 = false
```

#### Defined in

[src/utils/num.ts:357](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L357)

---

### isBoolean

▸ **isBoolean**(`value`): value is boolean

Checks if a given value is of boolean type.

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `value` | `unknown` | The value to check. |

#### Returns

value is boolean

- True if the value is of boolean type, false otherwise.

- True if the value is of boolean type, false otherwise.

**`Example`**

```typescript
const result = isBoolean(true);
// result = true

const result2 = isBoolean(false);
// result2 = false
```

#### Defined in

[src/utils/num.ts:376](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L376)

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

[src/utils/num.ts:75](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/num.ts#L75)

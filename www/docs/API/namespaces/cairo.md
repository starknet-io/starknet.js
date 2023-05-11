---
id: 'cairo'
title: 'Namespace: cairo'
sidebar_label: 'cairo'
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [Uint](../enums/cairo.Uint.md)

## Functions

### felt

▸ **felt**(`it`): `string`

felt cairo type

#### Parameters

| Name | Type                                  |
| :--- | :------------------------------------ |
| `it` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/calldata/cairo.ts:64](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L64)

---

### isLen

▸ **isLen**(`name`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:15](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L15)

---

### isTypeFelt

▸ **isTypeFelt**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:16](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L16)

---

### isTypeArray

▸ **isTypeArray**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:17](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L17)

---

### isTypeTuple

▸ **isTypeTuple**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:19](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L19)

---

### isTypeNamedTuple

▸ **isTypeNamedTuple**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:20](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L20)

---

### isTypeStruct

▸ **isTypeStruct**(`type`, `structs`): `boolean`

#### Parameters

| Name      | Type                                     |
| :-------- | :--------------------------------------- |
| `type`    | `string`                                 |
| `structs` | [`AbiStructs`](../modules.md#abistructs) |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:21](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L21)

---

### isTypeUint

▸ **isTypeUint**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:22](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L22)

---

### isTypeUint256

▸ **isTypeUint256**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L23)

---

### isTypeBool

▸ **isTypeBool**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:24](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L24)

---

### isTypeContractAddress

▸ **isTypeContractAddress**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:25](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L25)

---

### isCairo1Type

▸ **isCairo1Type**(`type`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/calldata/cairo.ts:27](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L27)

---

### getArrayType

▸ **getArrayType**(`type`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `type` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/calldata/cairo.ts:29](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L29)

---

### uint256

▸ **uint256**(`it`): [`Uint256`](../interfaces/uint256.Uint256.md)

Uint256 cairo type (helper for common struct type)

#### Parameters

| Name | Type                                  |
| :--- | :------------------------------------ |
| `it` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

[`Uint256`](../interfaces/uint256.Uint256.md)

#### Defined in

[src/utils/calldata/cairo.ts:45](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L45)

---

### tuple

▸ **tuple**(`...args`): `Object`

unnamed tuple cairo type (helper same as common struct type)

#### Parameters

| Name      | Type                                                               |
| :-------- | :----------------------------------------------------------------- |
| `...args` | (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[] |

#### Returns

`Object`

| Name             | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                                                                                                                                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `length`         | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Gets or sets the length of the array. This is a number one higher than the highest index in the array.                                                                                                                                      |
| `toString`       | () => `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Returns a string representation of an array.                                                                                                                                                                                                |
| `toLocaleString` | () => `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.                                                                                                                       |
| `pop`            | () => `undefined` \| `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Removes the last element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                          |
| `push`           | (...`items`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Appends new elements to the end of an array, and returns the new length of the array.                                                                                                                                                       |
| `concat`         | (...`items`: `ConcatArray`<`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)\>[]) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[](...`items`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish) \| `ConcatArray`<`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)\>)[]) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Combines two or more arrays. This method returns a new array without modifying any existing arrays.                                                                                                                                         |
| `join`           | (`separator?`: `string`) => `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Adds all the elements of an array into a string, separated by the specified separator string.                                                                                                                                               |
| `reverse`        | () => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Reverses the elements in an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                        |
| `shift`          | () => `undefined` \| `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.                                                                                                         |
| `slice`          | (`start?`: `number`, `end?`: `number`) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Returns a copy of a section of an array. For both start and end, a negative index can be used to indicate an offset from the end of the array. For example, -2 refers to the second to last element of the array.                           |
| `sort`           | (`compareFn?`: (`a`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `b`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)) => `number`) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sorts an array in place. This method mutates the array and returns a reference to the same array.                                                                                                                                           |
| `splice`         | (`start`: `number`, `deleteCount?`: `number`) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[](`start`: `number`, `deleteCount`: `number`, ...`items`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.                                                                                                                      |
| `unshift`        | (...`items`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Inserts new elements at the start of an array, and returns the new length of the array.                                                                                                                                                     |
| `indexOf`        | (`searchElement`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `fromIndex?`: `number`) => `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Returns the index of the first occurrence of a value in an array, or -1 if it is not present.                                                                                                                                               |
| `lastIndexOf`    | (`searchElement`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `fromIndex?`: `number`) => `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.                                                                                                                                      |
| `every`          | <S\>(`predicate`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => value is S, `thisArg?`: `any`) => this is S[](`predicate`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `unknown`, `thisArg?`: `any`) => `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Determines whether all the members of an array satisfy the specified test.                                                                                                                                                                  |
| `some`           | (`predicate`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `unknown`, `thisArg?`: `any`) => `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Determines whether the specified callback function returns true for any element of an array.                                                                                                                                                |
| `forEach`        | (`callbackfn`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `void`, `thisArg?`: `any`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Performs the specified action for each element in an array.                                                                                                                                                                                 |
| `map`            | <U\>(`callbackfn`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `U`, `thisArg?`: `any`) => `U`[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Calls a defined callback function on each element of an array, and returns an array that contains the results.                                                                                                                              |
| `filter`         | <S\>(`predicate`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => value is S, `thisArg?`: `any`) => `S`[](`predicate`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `unknown`, `thisArg?`: `any`) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Returns the elements of an array that meet the condition specified in a callback function.                                                                                                                                                  |
| `reduce`         | (`callbackfn`: (`previousValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentIndex`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)(`callbackfn`: (`previousValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentIndex`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `initialValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)<U\>(`callbackfn`: (`previousValue`: `U`, `currentValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentIndex`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `U`, `initialValue`: `U`) => `U` | Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.                      |
| `reduceRight`    | (`callbackfn`: (`previousValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentIndex`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)(`callbackfn`: (`previousValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentIndex`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `initialValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)) => `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)<U\>(`callbackfn`: (`previousValue`: `U`, `currentValue`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `currentIndex`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `U`, `initialValue`: `U`) => `U` | Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function. |
| `find`           | <S\>(`predicate`: (`this`: `void`, `value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `obj`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => value is S, `thisArg?`: `any`) => `undefined` \| `S`(`predicate`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `obj`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `unknown`, `thisArg?`: `any`) => `undefined` \| `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Returns the value of the first element in the array where predicate is true, and undefined otherwise.                                                                                                                                       |
| `findIndex`      | (`predicate`: (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `obj`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `unknown`, `thisArg?`: `any`) => `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Returns the index of the first element in the array where predicate is true, and -1 otherwise.                                                                                                                                              |
| `fill`           | (`value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `start?`: `number`, `end?`: `number`) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Changes all array elements from `start` to `end` index to a static `value` and returns the modified array                                                                                                                                   |
| `copyWithin`     | (`target`: `number`, `start`: `number`, `end?`: `number`) => (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Returns the this object after copying a section of the array identified by start and end to the same array starting at position target                                                                                                      |
| `entries`        | () => `IterableIterator`<[`number`, `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)]\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Returns an iterable of key, value pairs for every entry in the array                                                                                                                                                                        |
| `keys`           | () => `IterableIterator`<`number`\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Returns an iterable of keys in the array                                                                                                                                                                                                    |
| `values`         | () => `IterableIterator`<`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Returns an iterable of values in the array                                                                                                                                                                                                  |
| `includes`       | (`searchElement`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `fromIndex?`: `number`) => `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Determines whether an array includes a certain element, returning true or false as appropriate.                                                                                                                                             |
| `flatMap`        | <U, This\>(`callback`: (`this`: `This`, `value`: `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish), `index`: `number`, `array`: (`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish))[]) => `U` \| readonly `U`[], `thisArg?`: `This`) => `U`[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Calls a defined callback function on each element of an array. Then, flattens the result into a new array. This is identical to a map followed by flat with depth 1.                                                                        |
| `flat`           | <A, D\>(`this`: `A`, `depth?`: `D`) => `FlatArray`<`A`, `D`\>[]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.                                                                                                                                 |
| `[iterator]`     | () => `IterableIterator`<`boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)\>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Iterator                                                                                                                                                                                                                                    |
| `[unscopables]`  | () => { `copyWithin`: `boolean` ; `entries`: `boolean` ; `fill`: `boolean` ; `find`: `boolean` ; `findIndex`: `boolean` ; `keys`: `boolean` ; `values`: `boolean` }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Returns an object whose properties have the value 'true' when they will be absent when used in a 'with' statement.                                                                                                                          |
| `at`             | (`index`: `number`) => `undefined` \| `boolean` \| `object` \| [`BigNumberish`](num.md#bignumberish)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.                                                                       |

#### Defined in

[src/utils/calldata/cairo.ts:59](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/calldata/cairo.ts#L59)

# Function: isStringWholeNumber()

> **isStringWholeNumber**(`str`): `boolean`

Defined in: [src/utils/num.ts:223](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L223)

Test if string is a whole number (0, 1, 2, 3...)

## Parameters

### str

`string`

string to test

## Returns

`boolean`

: true if string is a whole number, false otherwise

## Example

```typescript
isStringWholeNumber('100'); // true
isStringWholeNumber('10.0'); // false
isStringWholeNumber('test'); // false
```

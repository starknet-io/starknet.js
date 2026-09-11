# Function: isShortString()

> **isShortString**(`str`): `boolean`

Defined in: [src/utils/shortString.ts:33](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L33)

Test if a string is a Cairo short string (string with less or equal 31 characters)

## Parameters

### str

`string`

the string to test

## Returns

`boolean`

Returns true if the string has less than or equal to 31 characters, otherwise false.

## Example

```typescript
const result = shortString.isShortString('Hello, world!');
// result = true
```

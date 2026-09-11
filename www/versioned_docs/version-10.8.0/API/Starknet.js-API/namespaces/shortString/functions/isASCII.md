# Function: isASCII()

> **isASCII**(`str`): `boolean`

Defined in: [src/utils/shortString.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L18)

Test if string contains only ASCII characters (string can be ascii text)

## Parameters

### str

`string`

The string to test

## Returns

`boolean`

Returns true if the string contains only ASCII characters, otherwise false

## Example

```typescript
const result = shortString.isASCII('Hello, world!');
// result = true
const result = shortString.isASCII('Hello, 世界!');
// result = false
```

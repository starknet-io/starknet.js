# Function: isShortText()

> **isShortText**(`val`): `boolean`

Defined in: [src/utils/shortString.ts:79](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L79)

Test if value is short text

## Parameters

### val

`any`

The item to test

## Returns

`boolean`

Returns true if the value is a short text (string has less or equal 31 characters), otherwise false

## Example

```typescript
const result = shortString.isShortText('Hello, world!');
// result = true
```

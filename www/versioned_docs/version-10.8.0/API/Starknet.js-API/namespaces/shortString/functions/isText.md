# Function: isText()

> **isText**(`val`): `val is string`

Defined in: [src/utils/shortString.ts:65](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L65)

Test if value is a pure string text, and not a hex string or number string

## Parameters

### val

`any`

the value to test

## Returns

`val is string`

returns true if the value is a free-form string text, otherwise false

## Example

```typescript
const result = shortString.isText('Hello, world!');
// result = true
const result = shortString.isText('0x7aec92f706');
// result = false
```

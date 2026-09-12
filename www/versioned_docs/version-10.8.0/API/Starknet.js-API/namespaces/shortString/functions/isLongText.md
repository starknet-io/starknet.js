# Function: isLongText()

> **isLongText**(`val`): `boolean`

Defined in: [src/utils/shortString.ts:91](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/shortString.ts#L91)

Test if value is long text

## Parameters

### val

`any`

the value to test

## Returns

`boolean`

returns true if the value is a long text(string has more than 31 characters), otherwise false.

## Example

```typescript
const result = shortString.isLongText(
  'Hello, world! this is some random long string to enable you test isLongText function.'
);
// result = true
```

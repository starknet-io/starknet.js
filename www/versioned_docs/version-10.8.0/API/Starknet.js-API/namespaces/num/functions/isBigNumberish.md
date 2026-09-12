# Function: isBigNumberish()

> **isBigNumberish**(`input`): `input is BigNumberish`

Defined in: [src/utils/num.ts:390](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L390)

Checks if a given value is of BigNumberish type.
234, 234n, "234", "0xea" are valid, exclude boolean and string

## Parameters

### input

`unknown`

a value

## Returns

`input is BigNumberish`

true if type of input is `BigNumberish`

## Example

```typescript
const res = num.isBigNumberish('ZERO');
// res = false
```

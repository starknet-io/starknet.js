# Function: assertInRange()

> **assertInRange**(`input`, `lowerBound`, `upperBound`, `inputName?`): `void`

Defined in: [src/utils/num.ts:162](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L162)

Asserts input is equal to or greater then lowerBound and lower then upperBound.

The `inputName` parameter is used in the assertion message.

## Parameters

### input

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Value to check

### lowerBound

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Lower bound value

### upperBound

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Upper bound value

### inputName?

`string` = `''`

Name of the input for error message

## Returns

`void`

## Throws

Error if input is out of range

## Example

```typescript
const input1: BigNumberish = 10;
assertInRange(input1, 5, 20, 'value');

const input2: BigNumberish = 25;
assertInRange(input2, 5, 20, 'value');
// throws Error: Message not signable, invalid value length.
```

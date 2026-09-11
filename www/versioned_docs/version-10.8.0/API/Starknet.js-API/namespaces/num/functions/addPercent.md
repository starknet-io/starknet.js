# Function: addPercent()

> **addPercent**(`number`, `percent`): `bigint`

Defined in: [src/utils/num.ts:354](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/num.ts#L354)

Adds a percentage amount to the value

## Parameters

### number

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

value to be modified

### percent

`number`

integer as percent ex. 50 for 50%

## Returns

`bigint`

modified value

## Example

```typescript
addPercent(100, 50); // 150n
addPercent(100, 100); // 200n
addPercent(200, 50); // 300n
addPercent(200, -50); // 100n
addPercent(200, -100); // 0n
addPercent(200, -150); // -100n
```

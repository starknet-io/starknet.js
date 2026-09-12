# Function: tuple()

> **tuple**(...`args`): `Record`\<`number`, [`BigNumberish`](../../../../type-aliases/BigNumberish.md) \| `object` \| `boolean`\>

Defined in: [src/utils/calldata/cairo.ts:266](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/cairo.ts#L266)

Create unnamed tuple Cairo type (helper same as common struct type)

## Parameters

### args

...(`boolean` \| `object` \| [`BigNumberish`](../../../../type-aliases/BigNumberish.md))[]

## Returns

`Record`\<`number`, [`BigNumberish`](../../../../type-aliases/BigNumberish.md) \| `object` \| `boolean`\>

## Example

```typescript
tuple(1, '0x101', 16);
```

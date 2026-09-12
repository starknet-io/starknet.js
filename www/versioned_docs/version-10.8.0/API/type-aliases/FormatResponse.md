# Type Alias: FormatResponse

> **FormatResponse** = `object`

Defined in: [src/contract/types/index.type.ts:149](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/types/index.type.ts#L149)

Advance formatting used to get js types data as result

## Index Signature

\[`key`: `string`\]: `any`

## See

https://starknet-io.github.io/starknet.js/docs/guides/define_call_message/#formatresponse

## Examples

```typescript
// assign custom or existing method to resulting data
formatResponse: { balance: uint256ToBN },
```

```typescript
// define resulting data js types
const formatAnswer = { id: 'number', description: 'string' };
```

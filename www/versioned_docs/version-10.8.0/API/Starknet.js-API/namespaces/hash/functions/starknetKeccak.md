# Function: starknetKeccak()

> **starknetKeccak**(`str`): `bigint`

Defined in: [src/utils/hash/selector.ts:50](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/selector.ts#L50)

Calculate the BigInt Starknet Keccak hash for a given string
[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L38)

## Parameters

### str

`string`

value to hash

## Returns

`bigint`

BigInt Keccak hash

## Example

```typescript
const result = starknetKeccak('test').toString();
// result = '61835310290161785288773114225739080147441215596947647498723774891619563096'
```

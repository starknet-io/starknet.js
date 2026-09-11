# Function: isStarkDomain()

> **isStarkDomain**(`domain`): `boolean`

Defined in: [src/utils/starknetId.ts:411](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/starknetId.ts#L411)

Check if a given string is a valid Starknet.id domain.

## Parameters

### domain

`string`

The domain string to validate.

## Returns

`boolean`

- True if the domain is a valid Starknet.id domain, false otherwise.

## Example

```typescript
const result = starknetId.isStarkDomain('example.stark');
// result = true

const result2 = starknetId.isStarkDomain('invalid-domain');
// result2 = false
```

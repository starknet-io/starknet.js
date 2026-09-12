# Function: isVersion()

> **isVersion**(`expected`, `provided`): `boolean`

Defined in: [src/utils/resolve.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/resolve.ts#L57)

Determines if the provided version matches the specified version.
Version must be formatted "major.minor.patch" using dot delimiters.
Use wildcard _ or unspecified to match 'any' value on the position.
ex. 7.3._ == 7.3.15, \* == 1.1.1, 0.8 == 0.8.5. '' != 0.8.5

## Parameters

### expected

`string`

version.

### provided

`string`

to check against the expected version.

## Returns

`boolean`

True if the response matches the version, false otherwise.

## Example

```typescript
const result = provider.isVersion('0.9', '0.9.0');
// result = true
```

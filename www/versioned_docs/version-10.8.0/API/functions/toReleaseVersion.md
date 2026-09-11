# Function: toReleaseVersion()

> **toReleaseVersion**(`version`): `string`

Defined in: [src/utils/resolve.ts:103](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/resolve.ts#L103)

Strip the semver pre-release and build metadata suffixes from a version.
A node can report a pre-release of a spec version (ex. Pathfinder reporting '0.10.3-rc.0');
the SDK handles it as the release it is a candidate for.
Input that is not a semver version is returned unchanged.
ex. '0.10.3-rc.0' -> '0.10.3', '0.10.3+build.1' -> '0.10.3', '0.10.2' -> '0.10.2'

## Parameters

### version

`string`

## Returns

`string`

the version without its pre-release and build metadata suffixes

## Example

```typescript
const result = toReleaseVersion('0.10.3-rc.0');
// result = '0.10.3'
```

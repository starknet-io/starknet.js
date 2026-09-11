# Function: compareVersions()

> **compareVersions**(`a`, `b`): `number`

Defined in: [src/utils/resolve.ts:145](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/resolve.ts#L145)

Compare two semantic version strings segment by segment.
This function safely compares versions without collision risk between
versions like '0.0.1000' and '0.1.0'.
Pre-release and build metadata suffixes are ignored, so a version is compared as
the release it is a candidate for: '0.14.1-rc.0' compares equal to '0.14.1'.

## Parameters

### a

`string`

First version string (e.g., '0.0.9')

### b

`string`

Second version string (e.g., '0.0.10')

## Returns

`number`

-1 if a < b, 0 if a === b, 1 if a > b

## Example

```typescript
const result1 = compareVersions('0.0.9', '0.0.10');
// result1 = -1 (0.0.9 < 0.0.10)

const result2 = compareVersions('0.1.0', '0.0.1000');
// result2 = 1 (0.1.0 > 0.0.1000, correctly different!)

const result3 = compareVersions('1.2.3', '1.2.3');
// result3 = 0 (equal versions)

// Usage for version checks:
if (compareVersions(specVersion, '0.14.1') >= 0) {
  // Use Blake2s hash for version >= 0.14.1
}
```

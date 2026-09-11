# Function: wait()

> **wait**(`delay`): `Promise`\<`unknown`\>

Defined in: [src/utils/provider.ts:33](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/provider.ts#L33)

Helper - Async Sleep for 'delay' time

## Parameters

### delay

`number`

Number of milliseconds to delay

## Returns

`Promise`\<`unknown`\>

## Example

```typescript
await provider.wait(1000); // 1000 milliseconds == 1 second
```

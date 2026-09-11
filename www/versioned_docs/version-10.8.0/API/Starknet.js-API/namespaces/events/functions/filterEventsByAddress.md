# Function: filterEventsByAddress()

> **filterEventsByAddress**\<`T`\>(`events`, `contractAddress`): `T`[]

Defined in: [src/utils/events/index.ts:343](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/events/index.ts#L343)

Filter events by contract address

## Type Parameters

### T

`T` _extends_ `object`

## Parameters

### events

`T`[] \| `undefined`

Array of events to filter (defaults to empty array if undefined)

### contractAddress

`string`

Address to filter by

## Returns

`T`[]

Filtered events matching the contract address

## Example

```typescript
const myEvents = filterEventsByAddress(allEvents, '0x123...');
```

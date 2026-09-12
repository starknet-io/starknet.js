# Function: getEmittedEvents()

> **getEmittedEvents**(`receipt`, `contractAddress?`): [`EMITTED_EVENT`](../../RPC/type-aliases/EMITTED_EVENT.md)[]

Defined in: [src/utils/events/index.ts:309](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/events/index.ts#L309)

Extract and prepare emitted events from a transaction receipt
Optionally filters by contract address and enriches with transaction/block metadata

## Parameters

### receipt

Transaction receipt containing events and metadata

#### events?

[`EVENT`](../../RPC/type-aliases/EVENT.md)[]

#### transaction_hash

`string`

#### block_hash?

`string`

#### block_number?

`number`

### contractAddress?

`string`

Optional contract address to filter events by

## Returns

[`EMITTED_EVENT`](../../RPC/type-aliases/EMITTED_EVENT.md)[]

Emitted events with transaction and block context, optionally filtered

## Example

```typescript
// Get all emitted events
const allEvents = getEmittedEvents(receipt);

// Get events from specific contract
const contractEvents = getEmittedEvents(receipt, contractAddress);
```

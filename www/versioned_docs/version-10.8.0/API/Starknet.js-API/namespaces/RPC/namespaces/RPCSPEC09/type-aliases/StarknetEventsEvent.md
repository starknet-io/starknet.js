# Type Alias: StarknetEventsEvent

> **StarknetEventsEvent** = `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:159

Notification to the client of a new event. The event also includes the finality status of the transaction emitting the event

## Properties

### subscription_id

> **subscription_id**: [`SUBSCRIPTION_ID`](SUBSCRIPTION_ID.md)

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:160

---

### result

> **result**: [`EMITTED_EVENT`](EMITTED_EVENT.md) & `object`

Defined in: node_modules/@starknet-io/starknet-types-09/dist/types/api/components.d.ts:161

#### Type Declaration

##### finality_status

> **finality_status**: [`TXN_FINALITY_STATUS`](TXN_FINALITY_STATUS.md)

---
id: 'events'
title: 'Namespace: events'
sidebar_label: 'events'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### isAbiEvent

▸ **isAbiEvent**(`object`): `boolean`

Check if an ABI entry is related to events.

#### Parameters

| Name     | Type                                 | Description  |
| :------- | :----------------------------------- | :----------- |
| `object` | [`AbiEntry`](../modules.md#abientry) | an Abi entry |

#### Returns

`boolean`

true if this Abi Entry is related to an event

**`Example`**

```typescript
// use of a transaction receipt
```

#### Defined in

[src/utils/events/index.ts:34](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/events/index.ts#L34)

---

### getAbiEvents

▸ **getAbiEvents**(`abi`): [`AbiEvents`](../modules.md#abievents)

Retrieves the events from the given ABI (from Cairo 0 or Cairo 1 contract).

Is able to handle Cairo 1 events nested in Cairo components.

#### Parameters

| Name  | Type                       | Description                     |
| :---- | :------------------------- | :------------------------------ |
| `abi` | [`Abi`](../modules.md#abi) | The ABI to extract events from. |

#### Returns

[`AbiEvents`](../modules.md#abievents)

- An object containing the hashes and the definition of the events.

**`Example`**

```typescript
const result = events.getAbiEvents(abi);
// result = {
//   '0x22ea134d4126804c60797e633195f8c9aa5fd6d1567e299f4961d0e96f373ee':
//    { '0x34e55c1cd55f1338241b50d352f0e91c7e4ffad0e4271d64eb347589ebdfd16': {
//     kind: 'struct', type: 'event',
//     name: 'ka::ExComponent::ex_logic_component::Mint',
//     members: [{
//      name: 'spender',
//      type: 'core::starknet::contract_address::ContractAddress',
//      kind: 'key'},
//      { name: 'value', type: 'core::integer::u256', kind: 'data' }]},
// ...
```

#### Defined in

[src/utils/events/index.ts:152](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/events/index.ts#L152)

---

### parseEvents

▸ **parseEvents**(`providerReceivedEvents`, `abiEvents`, `abiStructs`, `abiEnums`, `parser`): [`ParsedEvents`](../modules.md#parsedevents)

Parse raw events and structure them into response object based on a contract structs and defined events

#### Parameters

| Name                     | Type                                                     | Description                |
| :----------------------- | :------------------------------------------------------- | :------------------------- |
| `providerReceivedEvents` | [`EMITTED_EVENT`](RPC.RPCSPEC010.API.md#emitted_event)[] | Array of raw events        |
| `abiEvents`              | [`AbiEvents`](../modules.md#abievents)                   | Events defined in the abi  |
| `abiStructs`             | [`AbiStructs`](../modules.md#abistructs)                 | Structs defined in the abi |
| `abiEnums`               | [`AbiEnums`](../modules.md#abienums)                     | Enums defined in the abi   |
| `parser`                 | [`AbiParserInterface`](../classes/AbiParserInterface.md) | -                          |

#### Returns

[`ParsedEvents`](../modules.md#parsedevents)

parsed events corresponding to the abi

**`Example`**

```typescript
const abiEvents = events.getAbiEvents(sierra.abi);
const abiStructs =  CallData.getAbiStruct(sierra.abi);
const abiEnums = CallData.getAbiEnum(sierra.abi);
const result = events.parseEvents(myEvents, abiEvents, abiStructs, abiEnums);
// result = [{test::ExCh::ex_ch::Trade: {
     maker: 7548613724711489396448209137n,
     taker: 6435850562375218974960297344n,
     router_maker: 0n,
   }}]
```

#### Defined in

[src/utils/events/index.ts:198](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/events/index.ts#L198)

---

### addGetByPathMethod

▸ **addGetByPathMethod**(`parsedEvents`): [`ParsedEvents`](../modules.md#parsedevents)

Add getByPath helper method to parsed events array
This method allows finding events by partial key path matching

#### Parameters

| Name           | Type                                         | Description                       |
| :------------- | :------------------------------------------- | :-------------------------------- |
| `parsedEvents` | [`ParsedEvents`](../modules.md#parsedevents) | Array of parsed events to enhance |

#### Returns

[`ParsedEvents`](../modules.md#parsedevents)

The same array with getByPath method attached

**`Example`**

```typescript
const events = addGetByPathMethod(parsedEvents);
const transferEvent = events.getByPath('Transfer');
```

#### Defined in

[src/utils/events/index.ts:280](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/events/index.ts#L280)

---

### getEmittedEvents

▸ **getEmittedEvents**(`receipt`, `contractAddress?`): [`EmittedEvent`](RPC.RPCSPEC010.API.md#emittedevent)[]

Extract and prepare emitted events from a transaction receipt
Optionally filters by contract address and enriches with transaction/block metadata

#### Parameters

| Name                       | Type                                     | Description                                        |
| :------------------------- | :--------------------------------------- | :------------------------------------------------- |
| `receipt`                  | `Object`                                 | Transaction receipt containing events and metadata |
| `receipt.events?`          | [`EVENT`](RPC.RPCSPEC010.API.md#event)[] | -                                                  |
| `receipt.transaction_hash` | `string`                                 | -                                                  |
| `receipt.block_hash?`      | `string`                                 | -                                                  |
| `receipt.block_number?`    | `number`                                 | -                                                  |
| `contractAddress?`         | `string`                                 | Optional contract address to filter events by      |

#### Returns

[`EmittedEvent`](RPC.RPCSPEC010.API.md#emittedevent)[]

Emitted events with transaction and block context, optionally filtered

**`Example`**

```typescript
// Get all emitted events
const allEvents = getEmittedEvents(receipt);

// Get events from specific contract
const contractEvents = getEmittedEvents(receipt, contractAddress);
```

#### Defined in

[src/utils/events/index.ts:309](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/events/index.ts#L309)

---

### filterEventsByAddress

▸ **filterEventsByAddress**<`T`\>(`events`, `contractAddress`): `T`[]

Filter events by contract address

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `Object` |

#### Parameters

| Name              | Type                 | Description                                                      |
| :---------------- | :------------------- | :--------------------------------------------------------------- |
| `events`          | `undefined` \| `T`[] | Array of events to filter (defaults to empty array if undefined) |
| `contractAddress` | `string`             | Address to filter by                                             |

#### Returns

`T`[]

Filtered events matching the contract address

**`Example`**

```typescript
const myEvents = filterEventsByAddress(allEvents, '0x123...');
```

#### Defined in

[src/utils/events/index.ts:343](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/utils/events/index.ts#L343)

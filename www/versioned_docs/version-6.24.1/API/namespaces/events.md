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

| Name     | Type                            | Description  |
| :------- | :------------------------------ | :----------- |
| `object` | [`AbiEntry`](types.md#abientry) | an Abi entry |

#### Returns

`boolean`

true if this Abi Entry is related to an event

**`Example`**

```typescript
// use of a transaction receipt
```

#### Defined in

[src/utils/events/index.ts:36](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/events/index.ts#L36)

---

### getAbiEvents

▸ **getAbiEvents**(`abi`): [`AbiEvents`](types.md#abievents)

Retrieves the events from the given ABI (from Cairo 0 or Cairo 1 contract).

Is able to handle Cairo 1 events nested in Cairo components.

#### Parameters

| Name  | Type                  | Description                     |
| :---- | :-------------------- | :------------------------------ |
| `abi` | [`Abi`](types.md#abi) | The ABI to extract events from. |

#### Returns

[`AbiEvents`](types.md#abievents)

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

[src/utils/events/index.ts:154](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/events/index.ts#L154)

---

### parseEvents

▸ **parseEvents**(`providerReceivedEvents`, `abiEvents`, `abiStructs`, `abiEnums`): [`ParsedEvents`](types.md#parsedevents)

Parse raw events and structure them into response object based on a contract structs and defined events

#### Parameters

| Name                     | Type                                                               | Description                |
| :----------------------- | :----------------------------------------------------------------- | :------------------------- |
| `providerReceivedEvents` | [`EMITTED_EVENT`](types.RPC.RPCSPEC07.API.SPEC.md#emitted_event)[] | Array of raw events        |
| `abiEvents`              | [`AbiEvents`](types.md#abievents)                                  | Events defined in the abi  |
| `abiStructs`             | [`AbiStructs`](types.md#abistructs)                                | Structs defined in the abi |
| `abiEnums`               | [`AbiEnums`](types.md#abienums)                                    | Enums defined in the abi   |

#### Returns

[`ParsedEvents`](types.md#parsedevents)

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

[src/utils/events/index.ts:196](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/events/index.ts#L196)

---

### parseUDCEvent

▸ **parseUDCEvent**(`txReceipt`): [`DeployContractUDCResponse`](types.md#deploycontractudcresponse)

Parse Transaction Receipt Event from UDC invoke transaction and
create DeployContractResponse compatible response with addition of the UDC Event data

#### Parameters

| Name        | Type                                                                            |
| :---------- | :------------------------------------------------------------------------------ |
| `txReceipt` | [`InvokeTransactionReceiptResponse`](types.md#invoketransactionreceiptresponse) |

#### Returns

[`DeployContractUDCResponse`](types.md#deploycontractudcresponse)

parsed UDC event data

#### Defined in

[src/utils/events/index.ts:263](https://github.com/starknet-io/starknet.js/blob/v6.24.1/src/utils/events/index.ts#L263)

---
id: 'events'
title: 'Namespace: events'
sidebar_label: 'events'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### getAbiEvents

▸ **getAbiEvents**(`abi`): [`AbiEvents`](types.md#abievents)

#### Parameters

| Name  | Type                  |
| :---- | :-------------------- |
| `abi` | [`Abi`](types.md#abi) |

#### Returns

[`AbiEvents`](types.md#abievents)

#### Defined in

[src/utils/events/index.ts:17](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/events/index.ts#L17)

---

### parseEvents

▸ **parseEvents**(`providerReceivedEvents`, `abiEvents`, `abiStructs`, `abiEnums`): [`ParsedEvents`](types.md#parsedevents)

Parse raw events and structure them into response object based on a contract structs and defined events

#### Parameters

| Name                     | Type                                      | Description                             |
| :----------------------- | :---------------------------------------- | :-------------------------------------- |
| `providerReceivedEvents` | [`Event`](../interfaces/types.Event.md)[] | ProviderEvent[] - Array of raw events   |
| `abiEvents`              | [`AbiEvents`](types.md#abievents)         | AbiEvents - Events defined in the abi   |
| `abiStructs`             | [`AbiStructs`](types.md#abistructs)       | AbiStructs - Structs defined in the abi |
| `abiEnums`               | [`AbiEnums`](types.md#abienums)           | -                                       |

#### Returns

[`ParsedEvents`](types.md#parsedevents)

ParsedEvents - parsed events corresponding to the abi

#### Defined in

[src/utils/events/index.ts:38](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/events/index.ts#L38)

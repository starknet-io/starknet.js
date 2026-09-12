# Function: parseEvents()

> **parseEvents**(`providerReceivedEvents`, `abiEvents`, `abiStructs`, `abiEnums`, `parser`): [`ParsedEvents`](../../../../type-aliases/ParsedEvents.md)

Defined in: [src/utils/events/index.ts:198](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/events/index.ts#L198)

Parse raw events and structure them into response object based on a contract structs and defined events

## Parameters

### providerReceivedEvents

[`EMITTED_EVENT`](../../RPC/type-aliases/EMITTED_EVENT.md)[]

Array of raw events

### abiEvents

[`AbiEvents`](../../../../type-aliases/AbiEvents.md)

Events defined in the abi

### abiStructs

[`AbiStructs`](../../../../type-aliases/AbiStructs.md)

Structs defined in the abi

### abiEnums

[`AbiEnums`](../../../../type-aliases/AbiEnums.md)

Enums defined in the abi

### parser

[`AbiParserInterface`](../../../../classes/AbiParserInterface.md)

## Returns

[`ParsedEvents`](../../../../type-aliases/ParsedEvents.md)

parsed events corresponding to the abi

## Example

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

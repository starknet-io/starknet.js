# Function: getAbiEvents()

> **getAbiEvents**(`abi`): [`AbiEvents`](../../../../type-aliases/AbiEvents.md)

Defined in: [src/utils/events/index.ts:152](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/events/index.ts#L152)

Retrieves the events from the given ABI (from Cairo 0 or Cairo 1 contract).

Is able to handle Cairo 1 events nested in Cairo components.

## Parameters

### abi

[`Abi`](../../../../type-aliases/Abi.md)

The ABI to extract events from.

## Returns

[`AbiEvents`](../../../../type-aliases/AbiEvents.md)

- An object containing the hashes and the definition of the events.

## Example

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

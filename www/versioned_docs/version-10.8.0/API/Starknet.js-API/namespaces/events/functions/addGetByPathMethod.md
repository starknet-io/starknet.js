# Function: addGetByPathMethod()

> **addGetByPathMethod**(`parsedEvents`): [`ParsedEvents`](../../../../type-aliases/ParsedEvents.md)

Defined in: [src/utils/events/index.ts:280](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/events/index.ts#L280)

Add getByPath helper method to parsed events array
This method allows finding events by partial key path matching

## Parameters

### parsedEvents

[`ParsedEvents`](../../../../type-aliases/ParsedEvents.md)

Array of parsed events to enhance

## Returns

[`ParsedEvents`](../../../../type-aliases/ParsedEvents.md)

The same array with getByPath method attached

## Example

```typescript
const events = addGetByPathMethod(parsedEvents);
const transferEvent = events.getByPath('Transfer');
```

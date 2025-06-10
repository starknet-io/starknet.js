---
sidebar_position: 3
---

# Channel (WebSocket, Rpc)

Channel is the lowest purest object you can use to interact with the network.
Channel represent implementation of the Starknet specification in it's strictly defined form.

## WebSocket Channel

WebSocket channel provide convenient way to establish websocket connection to the [Starknet RPC Node](https://www.starknet.io/fullnodes-rpc-services/).

Ensure that you are using node supporting the required RPC spec >= v0.8.0. Details regarding Starknet Nodes and supported RPC versions could be found on each node github/page.

Websocket Channel implements specification methods defined by [@starknet-io/types-js](https://github.com/starknet-io/types-js/blob/b7d38ca30a1def28e89370068efff81b3a3062b7/src/api/methods.ts#L421)

### Import

```typescript
import { WebSocketChannel, Subscription } from 'starknet';
```

### Create instance

```typescript
// create new ws channel
const webSocketChannel = new WebSocketChannel({
  nodeUrl: 'wss://sepolia-pathfinder-rpc.server.io/rpc/v0_8',
  maxBufferSize: 200, // Optional: default is 1000
});

// ensure ws channel is open
await webSocketChannel.waitForConnection();

// ... use webSocketChannel
```

If the environment doesn't have a detectable global `WebSocket`, an appropriate `WebSocket` implementation should be used and set with the `websocket` constructor parameter.

```typescript
import { WebSocket } from 'ws';

const webSocketChannel = new WebSocketChannel({
  websocket: new WebSocket('wss://sepolia-pathfinder-rpc.server.io/rpc/v0_8'),
});
```

### Usage

When you call a subscription method like `subscribeNewHeads`, it now returns a `Promise` that resolves with a `Subscription` object. This object is your handle to that specific subscription.

You can attach a listener to it using the `.on()` method and stop listening with the `.unsubscribe()` method. This new model allows you to have multiple, independent subscriptions to the same type of event.

Here is a complete example:

```typescript
// 1. Subscribe to an event. This returns a Subscription object.
const subscription = await webSocketChannel.subscribeNewHeads();

// 2. Attach a handler to the `.on()` method to process incoming events.
subscription.on((data) => {
  console.log('New Head:', data);
  // After receiving one event, we can choose to unsubscribe.
  unsubscribeFromEvents();
});

// 3. To stop receiving events, call the .unsubscribe() method.
async function unsubscribeFromEvents() {
  const success = await subscription.unsubscribe();
  console.log('Unsubscribed successfully:', success);
}
```

### Buffering

If you subscribe to an event but don't attach a handler with `.on()` immediately, the `Subscription` object will buffer incoming events for you. When you eventually attach a handler, all buffered events will be passed to it in order before any new events are processed.

To prevent memory overflow, the buffer has a maximum size. You can configure this with the `maxBufferSize` option in the `WebSocketChannel` constructor (default is 1000). If the buffer becomes full, the oldest events will be dropped.

### Available Subscription Methods

You can subscribe to different types of events using the following methods on the `WebSocketChannel` instance. Each returns a `Promise<Subscription>`.

- `subscribeNewHeads`
- `subscribeEvents`
- `subscribeTransactionStatus`
- `subscribePendingTransaction`

Complete API can be found on [websocket API section](/docs/next/API/classes/WebSocketChannel)

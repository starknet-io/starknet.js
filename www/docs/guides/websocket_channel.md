---
sidebar_position: 7
---

# WebSocket Channel

The `WebSocketChannel` provides a robust, real-time connection to a Starknet RPC Node, enabling you to subscribe to events and receive updates as they happen. It's designed for production use with features like automatic reconnection, request queueing, and a modern subscription management API.

Ensure that you are using a node that supports the required RPC spec (e.g., v0.8.0).

## Key Features

- **Modern API**: Uses a `Subscription` object to manage event streams.
- **Automatic Reconnection**: Automatically detects connection drops and reconnects with an exponential backoff strategy.
- **Request Queueing**: Queues any requests made while the connection is down and executes them upon reconnection.
- **Event Buffering**: Buffers events for a subscription if no handler is attached, preventing event loss.
- **Custom Errors**: Throws specific, catchable errors like `TimeoutError` for more reliable error handling.

## Importing

To get started, import the necessary classes and types from the `starknet` library.

```typescript
import {
  WebSocketChannel,
  WebSocketOptions,
  Subscription,
  TimeoutError,
  WebSocketNotConnectedError,
} from 'starknet';
```

## Creating a WebSocket Channel

Instantiate `WebSocketChannel` with your node's WebSocket URL.

```typescript
const channel = new WebSocketChannel({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_8',
});

// It's good practice to wait for the initial connection.
await channel.waitForConnection();
```

If you are in an environment without a native `WebSocket` object (like old node.js), you can provide a custom implementation (e.g., from the `ws` library).

```typescript
import WebSocket from 'ws';

const channel = new WebSocketChannel({
  nodeUrl: '...',
  websocket: WebSocket, // Provide the implementation class
});

await channel.waitForConnection();
```

### Advanced Configuration

You can customize the channel's behavior with `WebSocketOptions`.

```typescript
const options: WebSocketOptions = {
  nodeUrl: '...',
  autoReconnect: true, // Default: true
  reconnectOptions: {
    retries: 5, // Default: 5
    delay: 2000, // Default: 2000ms
  },
  requestTimeout: 60000, // Default: 60000ms
  maxBufferSize: 1000, // Default: 1000 events per subscription
};

const channel = new WebSocketChannel(options);
```

## Subscribing to Events

When you call a subscription method (e.g., `subscribeNewHeads`), it returns a `Promise` that resolves with a `Subscription` object. This object is your handle to that specific event stream.

You attach a listener with `.on()` and stop listening with `.unsubscribe()`.

```typescript
// 1. Subscribe to an event stream.
const sub: Subscription<BLOCK_HEADER> = await channel.subscribeNewHeads();

// 2. Attach a handler to process incoming data.
sub.on((data) => {
  console.log('Received new block header:', data.block_number);
});

// 3. When you're done, unsubscribe.
// This is automatically handled if the channel disconnects and restores the subscription.
// You only need to call this when you explicitly want to stop listening.
await sub.unsubscribe();
```

### Event Buffering

If you `await` a subscription but don't immediately attach an `.on()` handler, the `Subscription` object will buffer incoming events. Once you attach a handler, all buffered events will be delivered in order before any new events are processed. This prevents event loss during asynchronous setup.

The buffer size is limited by the `maxBufferSize` in the channel options. If the buffer is full, the oldest events are dropped.

## Automatic Reconnection and Queueing

The channel is designed to be resilient. If the connection drops, it will automatically try to reconnect. While reconnecting:

- Any API calls (e.g., `sendReceive`, `subscribeNewHeads`) will be queued.
- Once the connection is restored, the queue will be processed automatically.
- All previously active subscriptions will be **automatically re-subscribed**. The original `Subscription` objects you hold will continue to work without any need for manual intervention.

## Error Handling

The channel throws specific errors, allowing for precise error handling.

```typescript
try {
  const result = await channel.sendReceive('starknet_chainId');
} catch (e) {
  if (e instanceof TimeoutError) {
    console.error('The request timed out!');
  } else if (e instanceof WebSocketNotConnectedError) {
    console.error('The WebSocket is not connected.');
  } else {
    console.error('An unknown error occurred:', e);
  }
}
```

## Available Subscription Methods

Each of these methods returns a `Promise<Subscription>`.

- `subscribeNewHeads`
- `subscribeEvents`
- `subscribeTransactionStatus`
- `subscribePendingTransaction`

For more details, see the complete [API documentation](/docs/next/API/classes/WebSocketChannel).

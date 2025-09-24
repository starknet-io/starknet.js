---
sidebar_position: 7
---

# WebSocket Channel

The `WebSocketChannel` provides a robust, real-time connection to a Starknet RPC Node, enabling you to subscribe to events and receive updates as they happen. It's designed for production use with features like automatic reconnection, request queueing, and a modern subscription management API.

Ensure that you are using a node that supports the required RPC spec (RPC 0.9).

## Key Features

- **Object-Based API**: All subscription methods now use object-based parameters for better type safety and extensibility
- **Modern Subscription Management**: Uses a `Subscription` object to manage event streams with typed results
- **Automatic Reconnection**: Automatically detects connection drops and reconnects with an exponential backoff strategy
- **Request Queueing**: Queues any requests made while the connection is down and executes them upon reconnection
- **Event Buffering**: Buffers events for a subscription if no handler is attached, preventing event loss
- **Custom Errors**: Throws specific, catchable errors like `TimeoutError` for more reliable error handling
- **Full Type Safety**: Complete TypeScript support with exported parameter interfaces and subscription types

## Importing

To get started, import the necessary classes and types from the `starknet` library.

```typescript
import {
  WebSocketChannel,
  WebSocketOptions,
  ReconnectOptions,
  WebSocketModule,
  Subscription,
  SubscriptionOptions,
  // Subscription parameter interfaces
  SubscribeNewHeadsParams,
  SubscribeEventsParams,
  SubscribeTransactionStatusParams,
  SubscribeNewTransactionReceiptsParams,
  SubscribeNewTransactionsParams,
  // Typed subscription results
  SubscriptionNewHeadsEvent,
  SubscriptionStarknetEventsEvent,
  SubscriptionTransactionStatusEvent,
  SubscriptionNewTransactionReceiptsEvent,
  SubscriptionNewTransactionEvent,
  // Error types
  TimeoutError,
  WebSocketNotConnectedError,
} from 'starknet';
```

## Creating a WebSocket Channel

Instantiate `WebSocketChannel` with your node's WebSocket URL.

```typescript
const channel = new WebSocketChannel({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_9',
});

// It's good practice to wait for the initial connection.
await channel.waitForConnection();
```

If you are in an environment without a native `WebSocket` object (like older node.js), you can provide a custom implementation (e.g., from the `ws` library).

```typescript
import WebSocket from 'ws';

const channel = new WebSocketChannel({
  nodeUrl: '...',
  websocket: WebSocket as WebSocketModule, // Provide the implementation class
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
// 1. Subscribe to an event stream using object-based API.
const sub: SubscriptionNewHeadsEvent = await channel.subscribeNewHeads({
  blockIdentifier: 'latest', // optional: 'latest', 'pending', block hash, or block number
});

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

## Type Safety and Exported Types

Starknet.js v8 provides complete TypeScript support for WebSocket subscriptions. All subscription methods return properly typed `Subscription` objects, and parameter interfaces are exported for external use.

```typescript
import { SubscriptionNewHeadsEvent, SubscribeEventsParams } from 'starknet';

// Typed subscription result
const headsSub: SubscriptionNewHeadsEvent = await channel.subscribeNewHeads();

// Typed parameters
const eventsParams: SubscribeEventsParams = {
  fromAddress: '0x1234...',
  finalityStatus: 'ACCEPTED_ON_L2',
};
const eventsSub = await channel.subscribeEvents(eventsParams);

// Type-safe event handling
headsSub.on((blockHeader) => {
  // blockHeader is properly typed as NewHeadsEvent['result']
  console.log('Block number:', blockHeader.block_number);
  console.log('Block hash:', blockHeader.block_hash);
});
```

### Available Parameter Types

All subscription parameter interfaces are exported:

- `SubscribeNewHeadsParams` - For `subscribeNewHeads()`
- `SubscribeEventsParams` - For `subscribeEvents()`
- `SubscribeTransactionStatusParams` - For `subscribeTransactionStatus()`
- `SubscribeNewTransactionReceiptsParams` - For `subscribeNewTransactionReceipts()`
- `SubscribeNewTransactionsParams` - For `subscribeNewTransactions()`

### Available Subscription Result Types

All subscription result types are exported for type annotations:

- `SubscriptionNewHeadsEvent` - Result type for new block headers
- `SubscriptionStarknetEventsEvent` - Result type for contract events
- `SubscriptionTransactionStatusEvent` - Result type for transaction status updates
- `SubscriptionNewTransactionReceiptsEvent` - Result type for transaction receipts
- `SubscriptionNewTransactionEvent` - Result type for new transactions

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

All subscription methods now use object-based parameters for better type safety and extensibility. Each method returns a `Promise<Subscription>` with typed results.

### `subscribeNewHeads(params?: SubscribeNewHeadsParams)`

Subscribes to new block headers.

```typescript
// Subscribe to all new blocks
const sub1 = await channel.subscribeNewHeads();

// Subscribe from a specific block
const sub2 = await channel.subscribeNewHeads({
  blockIdentifier: 'latest', // or block number/hash
});
```

### `subscribeEvents(params?: SubscribeEventsParams)`

Subscribes to contract events with optional filtering.

```typescript
// Subscribe to all events
const sub1 = await channel.subscribeEvents();

// Subscribe to events with filters
const sub2 = await channel.subscribeEvents({
  fromAddress: '0x1234...', // Filter by contract address
  keys: [['0xkey1', '0xkey2']], // Filter by event keys
  blockIdentifier: 'latest',
  finalityStatus: 'ACCEPTED_ON_L2', // Filter by finality status
});
```

### `subscribeTransactionStatus(params: SubscribeTransactionStatusParams)`

Subscribes to status updates for a specific transaction.

```typescript
const sub = await channel.subscribeTransactionStatus({
  transactionHash: '0x1234...', // Required
  blockIdentifier: 'latest', // Optional
});
```

### `subscribeNewTransactionReceipts(params?: SubscribeNewTransactionReceiptsParams)`

Subscribes to new transaction receipts (RPC 0.9+).

```typescript
// Subscribe to all transaction receipts
const sub1 = await channel.subscribeNewTransactionReceipts();

// Subscribe with filters
const sub2 = await channel.subscribeNewTransactionReceipts({
  finalityStatus: ['ACCEPTED_ON_L2'], // Filter by finality status
  senderAddress: ['0x1234...', '0x5678...'], // Filter by sender addresses
});
```

### `subscribeNewTransactions(params?: SubscribeNewTransactionsParams)`

Subscribes to new transactions (RPC 0.9+).

```typescript
// Subscribe to all transactions
const sub1 = await channel.subscribeNewTransactions();

// Subscribe with filters
const sub2 = await channel.subscribeNewTransactions({
  finalityStatus: ['ACCEPTED_ON_L2'], // Filter by finality status
  senderAddress: ['0x1234...'], // Filter by sender addresses
});
```

## Migration from v7 to v8

The WebSocket API has been updated to use object-based parameters:

```typescript
// v7 (positional arguments)
const sub = await channel.subscribeEvents(
  '0x1234...', // fromAddress
  [['0xkey1']], // keys
  'latest', // blockIdentifier
  'ACCEPTED_ON_L2' // finalityStatus
);

// v8 (object-based parameters)
const sub = await channel.subscribeEvents({
  fromAddress: '0x1234...',
  keys: [['0xkey1']],
  blockIdentifier: 'latest',
  finalityStatus: 'ACCEPTED_ON_L2',
});
```

**Breaking Changes:**

- `subscribePendingTransaction` has been removed (not available in RPC 0.9)
- All subscription methods now use object parameters
- New methods `subscribeNewTransactionReceipts` and `subscribeNewTransactions` added for RPC 0.9

## Complete Example

Here's a comprehensive example showcasing the new object-based API and type safety:

```typescript
import {
  WebSocketChannel,
  SubscriptionNewHeadsEvent,
  SubscriptionStarknetEventsEvent,
  SubscribeEventsParams,
  TimeoutError,
  WebSocketNotConnectedError,
} from 'starknet';

async function main() {
  // Create WebSocket channel
  const channel = new WebSocketChannel({
    nodeUrl: 'wss://starknet-sepolia.public.blastapi.io/rpc/v0_9',
    autoReconnect: true,
    reconnectOptions: {
      retries: 5,
      delay: 2000,
    },
    requestTimeout: 30000,
    maxBufferSize: 1000,
  });

  try {
    // Wait for connection
    await channel.waitForConnection();
    console.log('Connected to WebSocket');

    // Subscribe to new block headers
    const headsSub: SubscriptionNewHeadsEvent = await channel.subscribeNewHeads({
      blockIdentifier: 'latest',
    });

    headsSub.on((blockHeader) => {
      console.log(`New block ${blockHeader.block_number}: ${blockHeader.block_hash}`);
    });

    // Subscribe to contract events with filtering
    const eventParams: SubscribeEventsParams = {
      fromAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', // ETH token
      finalityStatus: 'ACCEPTED_ON_L2',
    };

    const eventsSub: SubscriptionStarknetEventsEvent = await channel.subscribeEvents(eventParams);

    eventsSub.on((eventData) => {
      console.log('Contract event:', eventData.event);
    });

    // Subscribe to transaction receipts (RPC 0.9+)
    const receiptsSub = await channel.subscribeNewTransactionReceipts({
      finalityStatus: ['ACCEPTED_ON_L2'],
    });

    receiptsSub.on((receipt) => {
      console.log('New transaction receipt:', receipt.transaction_receipt.transaction_hash);
    });

    // Keep running for demonstration
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Clean up subscriptions
    await headsSub.unsubscribe();
    await eventsSub.unsubscribe();
    await receiptsSub.unsubscribe();
  } catch (error) {
    if (error instanceof TimeoutError) {
      console.error('Connection timeout:', error.message);
    } else if (error instanceof WebSocketNotConnectedError) {
      console.error('WebSocket not connected:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  } finally {
    // Close the connection
    channel.disconnect();
    await channel.waitForDisconnection();
    console.log('Disconnected from WebSocket');
  }
}

main().catch(console.error);
```

For more details, see the complete [API documentation](/docs/next/API/classes/WebSocketChannel).

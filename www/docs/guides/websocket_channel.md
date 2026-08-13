---
sidebar_position: 7
---

# WebSocket

A Starknet node pushes new blocks, contract events and transaction status over a WebSocket, and
only over a WebSocket. Opening one is what lets your application **react** to the chain instead of
polling it — that is the reason this guide exists.

Once the socket is open, it can carry ordinary RPC requests too, so you do not need a second HTTP
connection alongside it. The connection reconnects on its own when it drops, restores the
subscriptions it had, and replays the requests that were pending meanwhile.

:::info
This guide covers RPC spec **0.10**; your node must expose a WebSocket endpoint — see
[WebSocket endpoints](#websocket-endpoints) below.

The subscription methods are the same in RPC 0.9 and 0.10, so everything here also works against a
0.9 node — except for the two 0.10.1+ additions, `fromAddress` as an array and the `tags` option.
:::

## Getting a connection

Two objects can open a socket, and the choice is only about what else you need from it.

| Object              | What it gives you                                    | Use it when                                                |
| ------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| `WebSocketProvider` | A full provider **and** subscriptions, on one socket | Your app also sends transactions or reads state            |
| `WebSocketChannel`  | Subscriptions and raw requests, nothing else         | You only subscribe, or you keep an HTTP provider beside it |

### With a provider

`WebSocketProvider` is an `RpcProvider`, so `Account` and `Contract` accept it unchanged, and its
`subscriptions` property carries the streams:

```typescript
import { WebSocketProvider } from 'starknet';

const myProvider = new WebSocketProvider({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
});

const sub = await myProvider.subscriptions.subscribeNewHeads();
```

See [Requests and subscriptions over WebSocket](./provider_instance.md#requests-and-subscriptions-over-websocket)
in the Provider guide for the construction options and for when to prefer HTTP.

### With a channel alone

`WebSocketChannel` opens and owns its socket, and exposes the same `subscribe…()` methods without
the provider surface:

```typescript
import { WebSocketChannel } from 'starknet';

const channel = new WebSocketChannel({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
});

// Wait for the socket to be open before subscribing.
await channel.waitForConnection();

const sub = await channel.subscribeNewHeads();
```

When you are done, close the connection — this also stops the automatic reconnection:

```typescript
channel.disconnect();
await channel.waitForDisconnection();
```

Node.js 22+ and browsers provide a global `WebSocket`, which is used automatically. An environment
that has none can be given an implementation through the `websocket` option, or globally with
[`config.set('websocket', …)`](./configuration.md).

:::note
The examples in the rest of this guide are written on `myProvider.subscriptions`. Every one of them
works identically on a `WebSocketChannel` — write `channel.subscribeNewHeads()` where the example
writes `myProvider.subscriptions.subscribeNewHeads()`.
:::

### WebSocket endpoints

The WebSocket address is not always the HTTP one with the `wss://` scheme: the port and the path
depend on the node. Working examples:

```typescript
// Alchemy Mainnet — same URL as the HTTP one, with the wss:// scheme:
const channelAlchemyMainnet = new WebSocketChannel({
  nodeUrl: 'wss://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_10/' + alchemyKey,
});

// Alchemy Sepolia Testnet:
const channelAlchemySepolia = new WebSocketChannel({
  nodeUrl: 'wss://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_10/' + alchemyKey,
});

// Local Pathfinder — same port as HTTP, but the path is mandatory:
const channelPathfinder = new WebSocketChannel({ nodeUrl: 'ws://127.0.0.1:9545/rpc/v0_10' });

// Local Juno — dedicated port, enabled with the `--ws` option (default port 6061):
const channelJuno = new WebSocketChannel({ nodeUrl: 'ws://127.0.0.1:6061/ws/v0_10' });

// Local starknet-devnet — `/ws` path on the devnet port:
const channelDevnet = new WebSocketChannel({ nodeUrl: 'ws://127.0.0.1:5050/ws' });
```

> Take care to safely manage your API key. It's a confidential item!

:::note
Free public endpoints supporting the Starknet subscriptions are rare: most node providers serve the
WebSocket only with an API key. A node exposing a `wss://` address does not necessarily accept
`starknet_subscribe…` requests.
:::

:::warning
A node applies its own limits to the WebSocket traffic — for example the number of new connections
per IP and per second, the number of simultaneous subscriptions, or the maximum lifetime of a socket.
Reaching one of them shows up as a connection refused when opening the socket, or as a socket closed
while everything was working (the [automatic reconnection](#reconnection) then takes over). Check
these limits with your node provider before subscribing to a busy stream.
:::

## Subscriptions

### Subscribe to a stream

Every `subscribe…()` method resolves to a `Subscription` object. Attach a handler with `.on()`, and
stop the stream with `.unsubscribe()`:

```typescript
const sub = await myProvider.subscriptions.subscribeNewHeads();

sub.on((blockHeader) => {
  console.log('New block', blockHeader.block_number, blockHeader.block_hash);
});

// ... later
await sub.unsubscribe();
```

The handler is typed from the subscription: `blockHeader` above is a block header, an event handler
receives an event, and so on.

If data arrives before you attach a handler, it is buffered (up to `maxBufferSize`, 1000 by default)
and delivered in order as soon as `.on()` is called, so nothing is lost during an asynchronous setup.

A subscription holds **one handler at a time**. Attaching a different one while the first is still
in place throws; detach it first with `.off()`, which leaves the subscription open and starts
buffering again:

```typescript
sub.off(); // stop delivering, keep the stream alive
sub.on(anotherHandler); // now allowed
```

### Sharing a stream between consumers

When several parts of your code need the same stream, dispatch from a single handler:

```typescript
const sub = await myProvider.subscriptions.subscribeEvents({ fromAddress });

sub.on((event) => {
  updateUI(event);
  updateCache(event);
});
```

Subscribing twice with the same parameters also works, and gives two independent streams — but the
node then sends everything twice, for no benefit over dispatching from one handler.

### When a subscription closes

`unsubscribe()` is not the only way a stream ends. After a reconnection, the node may refuse to
re-establish a subscription; it is then closed for good, and no further event will arrive even
though the connection itself is healthy. `onClose()` tells you about both cases:

```typescript
const detach = sub.onClose(() => {
  console.warn('This stream is over');
});

// `isClosed` answers the same question at any time:
if (sub.isClosed) reSubscribe();
```

`onClose()` returns a function that detaches the listener. Registering on an already-closed
subscription calls your listener immediately, so a late registration cannot miss the closure.

### `subscribeNewHeads`

New block headers:

```typescript
const sub = await myProvider.subscriptions.subscribeNewHeads();

// Or start from an earlier block (up to 1024 blocks back):
const sub2 = await myProvider.subscriptions.subscribeNewHeads({ blockIdentifier: 1_500_000 });
```

`blockIdentifier` accepts `'latest'` (default), a block number, or a block hash.

### `subscribeEvents`

Contract events, with optional filters:

```typescript
const sub = await myProvider.subscriptions.subscribeEvents({
  fromAddress: '0x049d36...', // one address, or an array of addresses (RPC 0.10.1+)
  keys: [['0x02db34...']], // event key filter
  finalityStatus: 'ACCEPTED_ON_L2', // or 'PRE_CONFIRMED'
});

sub.on((event) => {
  console.log(event.from_address, event.keys, event.data, event.transaction_hash);
});
```

All filters are optional — without any, you receive every event of the network.

### `subscribeTransactionStatus`

Status updates of one transaction, starting with its current status:

```typescript
const sub = await myProvider.subscriptions.subscribeTransactionStatus({
  transactionHash: '0x0123...',
});

sub.on((update) => {
  console.log(update.transaction_hash, update.status.finality_status);
  // status.execution_status and status.failure_reason are set once executed
});
```

### `subscribeNewTransactions`

New transactions and their finality status changes:

```typescript
const sub = await myProvider.subscriptions.subscribeNewTransactions({
  finalityStatus: ['RECEIVED', 'ACCEPTED_ON_L2'], // default: ['ACCEPTED_ON_L2']
  senderAddress: ['0x0456...'], // optional sender filter
});

sub.on((transaction) => {
  console.log(transaction.transaction_hash, transaction.finality_status);
});
```

`finalityStatus` accepts `'RECEIVED'`, `'CANDIDATE'`, `'PRE_CONFIRMED'` and `'ACCEPTED_ON_L2'`. One
event is fired for each status update, so the same transaction can show up several times.

To also receive the SNIP-36 proof facts of the transactions, add the corresponding tag (RPC 0.10.1+):

```typescript
const sub = await myProvider.subscriptions.subscribeNewTransactions({
  tags: ['INCLUDE_PROOF_FACTS'],
});
```

### `subscribeNewTransactionReceipts`

Same filters, but you receive the full receipt instead of the transaction:

```typescript
const sub = await myProvider.subscriptions.subscribeNewTransactionReceipts({
  finalityStatus: ['ACCEPTED_ON_L2'], // or 'PRE_CONFIRMED'
  senderAddress: ['0x0456...'],
});

sub.on((receipt) => {
  console.log(receipt.transaction_hash, receipt.execution_status, receipt.block_number);
});
```

## Managing the connection

### Sharing one socket

The socket is a separate object — a **transport** — and it can be built once and lent to several
providers or channels. One connection then serves them all:

```typescript
import { ReconnectingWsTransport, WebSocketProvider } from 'starknet';

const transport = new ReconnectingWsTransport({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
});

const myProvider = new WebSocketProvider({ transport });
```

Beware of the lifecycle when you share: `dispose()` closes the socket whether the provider built it
or borrowed it, so calling it on one consumer disconnects all the others. With a shared transport,
leave the providers alone and close the transport itself when the application shuts down:

```typescript
transport.close();
```

This is the form to use in a front-end framework: the transport lives at module scope, outside the
component tree, while components own only their subscriptions. See [In a React app](#in-a-react-app).

### Reconnection

If the connection drops, it is re-established with an exponential backoff, all your active streams
are re-subscribed — your existing `Subscription` objects keep working, with nothing to do on your
side — and the queued requests are then flushed.

A stream the node refuses to re-subscribe cannot be recovered: its `Subscription` is closed, which
[`onClose()`](#when-a-subscription-closes) reports.

The defaults suit most applications. To tune the behavior — `autoReconnect`, `reconnectOptions`,
`requestTimeout`, `maxBufferSize` — see the
[API reference](/docs/next/API/classes/WebSocketProvider), where each option is documented with its
default.

Reconnection is not infinite: once the retries are exhausted it gives up and stops on its own, and
any request still queued at that point is rejected with a `WebSocketNotConnectedError`. Call
`reconnect()` on the transport to start over.

### Connection state

A transport reports its state, and notifies on every transition:

```typescript
myProvider.transport.getState(); // 'connecting' | 'open' | 'reconnecting' | 'closed'

const detach = myProvider.transport.on('statechange', () => {
  console.log('now', myProvider.transport.getState());
});
```

`on()` returns the function that detaches the listener.

### In a React app

The pair `getState()` / `on('statechange')` is exactly what `useSyncExternalStore` expects, so
connection state can drive the UI without any adapter:

```tsx
import { useSyncExternalStore } from 'react';
import { transport } from './starknet'; // the module-scope transport

export function ConnectionBadge() {
  const state = useSyncExternalStore(
    (onStoreChange) => transport.on('statechange', onStoreChange),
    () => transport.getState()
  );

  return <span>{state}</span>;
}
```

Under server-side rendering, pass a third argument returning the state to use on the server.

`Subscription.onClose()` follows the same contract, so it plugs straight into an effect:

```tsx
useEffect(() => sub.onClose(() => setLive(false)), [sub]);
```

Three things to keep in mind in a browser application:

- **Hot module reload.** A module-scope transport is re-executed on reload: the new socket opens
  while the old one stays alive and keeps reconnecting. Close the previous one explicitly —
  `import.meta.hot?.dispose(() => transport.close())`.
- **Backgrounded tabs and mobile.** Browsers throttle timers in background tabs, which stretches the
  reconnection backoff, and iOS closes backgrounded sockets outright. Forcing a reconnect on
  `visibilitychange` and `online` belongs in your application, not in the library.
- **A socket cannot be serialized.** It does not go into `localStorage`, into `redux-persist`, or
  into React state. Keep the transport in a module singleton or a Context.

### Sending RPC requests

With a `WebSocketProvider`, the ordinary provider methods already travel over the socket — there is
nothing specific to do:

```typescript
const blockNumber = await myProvider.getBlockNumber();
```

On a bare `WebSocketChannel`, `sendReceive()` sends any JSON-RPC method and resolves with its
result:

```typescript
const chainId = await channel.sendReceive<string>('starknet_chainId');

const nonce = await channel.sendReceive('starknet_getNonce', {
  block_id: 'latest',
  contract_address: '0x0456...',
});
```

Parameters and result are the raw RPC ones — no conversion is applied, unlike the provider methods.

A call made while the connection is down is queued and sent once the socket is back, whichever
object you use. It is never left pending: it rejects with a `TimeoutError` if the node does not
answer in time, or with a `WebSocketNotConnectedError` if the connection never comes back.

### Error handling

```typescript
import { TimeoutError, WebSocketNotConnectedError } from 'starknet';

try {
  const blockNumber = await myProvider.getBlockNumber();
} catch (error) {
  if (error instanceof TimeoutError) {
    console.error('No answer from the node in time');
  } else if (error instanceof WebSocketNotConnectedError) {
    console.error('The connection is gone, the request will not be answered');
  } else {
    throw error;
  }
}
```

## Complete example

```typescript
import { WebSocketProvider, TimeoutError } from 'starknet';

async function main() {
  const myProvider = await WebSocketProvider.create({
    nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
  });

  try {
    console.log('Connected to', await myProvider.getChainId());

    const headsSub = await myProvider.subscriptions.subscribeNewHeads();
    headsSub.on((header) => {
      console.log(`Block ${header.block_number}: ${header.block_hash}`);
    });

    const eventsSub = await myProvider.subscriptions.subscribeEvents({
      fromAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7', // ETH token
      finalityStatus: 'ACCEPTED_ON_L2',
    });
    eventsSub.on((event) => {
      console.log(`Event from ${event.from_address} in tx ${event.transaction_hash}`);
    });

    // Listen for 1 minute
    await new Promise((resolve) => {
      setTimeout(resolve, 60_000);
    });

    await headsSub.unsubscribe();
    await eventsSub.unsubscribe();
  } catch (error) {
    if (error instanceof TimeoutError) console.error('Node did not answer:', error.message);
    else console.error(error);
  } finally {
    myProvider.dispose();
  }
}

main();
```

All the types (`WebSocketProviderOptions`, `WebSocketOptions`, `Subscription`, the
`Subscribe…Params` interfaces, …) are exported from `starknet`; see the
[API documentation](/docs/next/API/classes/WebSocketProvider) for the full list.

---
sidebar_position: 7
---

# WebSocket Channel

`WebSocketChannel` keeps a persistent connection to a Starknet node and streams data as it happens:
new blocks, contract events, transaction status. The same connection can also be used to send any
regular RPC request.

It reconnects on its own when the connection drops, restores the subscriptions it had, and replays
the requests that were pending meanwhile.

:::info
This guide covers RPC spec **0.10**; your node must expose a WebSocket endpoint — see
[WebSocket endpoints](#websocket-endpoints) below.

Unlike `RpcProvider`, `WebSocketChannel` is not versioned: the subscription methods are the same in
RPC 0.9 and 0.10, so the channel also works against a 0.9 node — except for the two 0.10.1+
additions, `fromAddress` as an array and the `tags` option.
:::

## Create a channel

```typescript
import { WebSocketChannel } from 'starknet';

const channel = new WebSocketChannel({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
});

// Wait for the socket to be open before subscribing.
await channel.waitForConnection();
```

Node.js 22+ and browsers provide a global `WebSocket`, which is used automatically. In an environment
that has none, pass an implementation with the `websocket` option:

```typescript
import WebSocket from 'ws';
import { WebSocketChannel, WebSocketModule } from 'starknet';

const channel = new WebSocketChannel({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
  websocket: WebSocket as WebSocketModule,
});
```

When you are done, close the connection — this also stops the automatic reconnection:

```typescript
channel.disconnect();
await channel.waitForDisconnection();
```

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
Reaching one of them shows up as a connection refused when opening the channel, or as a socket closed
while everything was working (the [automatic reconnection](#reconnection) then takes over). Check
these limits with your node provider before subscribing to a busy stream.
:::

## Subscribe to a stream

Every `subscribe…()` method resolves to a `Subscription` object. Attach a handler with `.on()`, and
stop the stream with `.unsubscribe()`:

```typescript
const sub = await channel.subscribeNewHeads();

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

:::warning
A subscription accepts only one handler: calling `.on()` a second time throws.
:::

### Sharing a stream between consumers

When several parts of your code need the same stream, dispatch from a single handler:

```typescript
const sub = await channel.subscribeEvents({ fromAddress });

sub.on((event) => {
  updateUI(event);
  updateCache(event);
});
```

Subscribing twice with the same parameters also works — you get two independent streams, each with
its own handler and its own `unsubscribe()` — but the node then sends everything twice:

```typescript
const subUI = await channel.subscribeEvents({ fromAddress });
const subCache = await channel.subscribeEvents({ fromAddress });

subUI.on(updateUI);
subCache.on(updateCache);
```

## Subscription methods

### `subscribeNewHeads`

New block headers:

```typescript
const sub = await channel.subscribeNewHeads();

// Or start from an earlier block (up to 1024 blocks back):
const sub2 = await channel.subscribeNewHeads({ blockIdentifier: 1_500_000 });
```

`blockIdentifier` accepts `'latest'` (default), a block number, or a block hash.

### `subscribeEvents`

Contract events, with optional filters:

```typescript
const sub = await channel.subscribeEvents({
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
const sub = await channel.subscribeTransactionStatus({
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
const sub = await channel.subscribeNewTransactions({
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
const sub = await channel.subscribeNewTransactions({
  tags: ['INCLUDE_PROOF_FACTS'],
});
```

### `subscribeNewTransactionReceipts`

Same filters, but you receive the full receipt instead of the transaction:

```typescript
const sub = await channel.subscribeNewTransactionReceipts({
  finalityStatus: ['ACCEPTED_ON_L2'], // or 'PRE_CONFIRMED'
  senderAddress: ['0x0456...'],
});

sub.on((receipt) => {
  console.log(receipt.transaction_hash, receipt.execution_status, receipt.block_number);
});
```

## Sending RPC requests

`sendReceive()` sends any JSON-RPC method over the socket and resolves with its result, so you do not
need a second HTTP connection for occasional reads:

```typescript
const chainId = await channel.sendReceive<string>('starknet_chainId');
const blockNumber = await channel.sendReceive<number>('starknet_blockNumber');

const nonce = await channel.sendReceive('starknet_getNonce', {
  block_id: 'latest',
  contract_address: '0x0456...',
});
```

Parameters and result are the raw RPC ones — no conversion is applied, unlike the `RpcProvider`
methods.

A call made while the connection is down is queued and sent once the socket is back. If no answer
comes within `requestTimeout` (60 s by default), the promise rejects with a `TimeoutError`.

:::tip
`channel.send()` sends a request and returns its id at once, without waiting for the answer. You then
have to read the incoming messages yourself (`channel.on('message', …)`) and find the one carrying
the same id. In most cases, use `sendReceive()`.
:::

## Reconnection

If the connection drops, the channel reconnects with an exponential backoff, re-subscribes all your
active streams — your existing `Subscription` objects keep working, with nothing to do on your side —
then flushes the queued requests.

The defaults are usually fine; tune them if needed:

```typescript
const channel = new WebSocketChannel({
  nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
  autoReconnect: true, // default: true
  reconnectOptions: {
    retries: 5, // default: 5 attempts before giving up
    delay: 2000, // default: 2000 ms before the first retry
    exponential: true, // default: true — the delay doubles at each attempt
    stableConnectionThreshold: 5000, // default: 5000 ms
  },
  requestTimeout: 60000, // default: 60000 ms
  maxBufferSize: 1000, // default: 1000 events per subscription
});
```

`stableConnectionThreshold` is how long a new connection must stay open before it is considered
stable and the retry counter is reset. It prevents a node that accepts then immediately drops the
connection from being retried forever.

## Error handling

```typescript
import { TimeoutError, WebSocketNotConnectedError } from 'starknet';

try {
  const chainId = await channel.sendReceive('starknet_chainId');
} catch (error) {
  if (error instanceof TimeoutError) {
    console.error('No answer from the node in time');
  } else if (error instanceof WebSocketNotConnectedError) {
    console.error('Socket closed and auto-reconnect disabled');
  } else {
    throw error;
  }
}
```

## Complete example

```typescript
import { WebSocketChannel, TimeoutError } from 'starknet';

async function main() {
  const channel = new WebSocketChannel({
    nodeUrl: 'wss://your-starknet-node/rpc/v0_10',
  });

  try {
    await channel.waitForConnection();
    console.log('Connected to', await channel.sendReceive('starknet_chainId'));

    const headsSub = await channel.subscribeNewHeads();
    headsSub.on((header) => {
      console.log(`Block ${header.block_number}: ${header.block_hash}`);
    });

    const eventsSub = await channel.subscribeEvents({
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
    channel.disconnect();
    await channel.waitForDisconnection();
  }
}

main();
```

All the types (`WebSocketOptions`, `Subscription`, the `Subscribe…Params` interfaces, …) are exported
from `starknet`; see the [API documentation](/docs/next/API/classes/WebSocketChannel) for the full
list.

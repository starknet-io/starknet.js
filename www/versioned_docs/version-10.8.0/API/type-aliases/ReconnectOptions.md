# Type Alias: ReconnectOptions

> **ReconnectOptions** = `object`

Defined in: [src/channel/ws/ws_0_10.ts:76](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L76)

Options for configuring the automatic reconnection behavior of the WebSocketChannel.

## Properties

### retries?

> `optional` **retries?**: `number`

Defined in: [src/channel/ws/ws_0_10.ts:81](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L81)

The number of retries to attempt before giving up.

#### Default

```ts
5;
```

---

### delay?

> `optional` **delay?**: `number`

Defined in: [src/channel/ws/ws_0_10.ts:86](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L86)

The initial delay in milliseconds before the first retry.

#### Default

```ts
2000;
```

---

### exponential?

> `optional` **exponential?**: `number` \| `boolean`

Defined in: [src/channel/ws/ws_0_10.ts:91](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L91)

Whether to use the exponential backoff (delay being doubled for each subsequent retry).

#### Default

```ts
true;
```

---

### stableConnectionThreshold?

> `optional` **stableConnectionThreshold?**: `number`

Defined in: [src/channel/ws/ws_0_10.ts:99](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L99)

The minimum time in milliseconds a reconnected connection must stay open before
it is considered stable and the retry counter is reset. This prevents a gateway
that accepts the connection then immediately drops it (a "flapping" connection)
from resetting the counter on every cycle and reconnecting forever.

#### Default

```ts
5000;
```

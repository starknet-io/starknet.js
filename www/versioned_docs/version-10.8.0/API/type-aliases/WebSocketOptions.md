# Type Alias: WebSocketOptions

> **WebSocketOptions** = `object`

Defined in: [src/channel/ws/ws_0_10.ts:110](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L110)

Options for configuring the WebSocketChannel.

## Properties

### nodeUrl

> **nodeUrl**: `string`

Defined in: [src/channel/ws/ws_0_10.ts:115](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L115)

The URL of the WebSocket endpoint of the Starknet node.

#### Example

```ts
'ws://localhost:9545';
```

---

### websocket?

> `optional` **websocket?**: [`WebSocketModule`](WebSocketModule.md)

Defined in: [src/channel/ws/ws_0_10.ts:125](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L125)

This parameter can be used to provide a custom WebSocket implementation.
This is useful in environments where the global WebSocket object is not available (e.g., Node.js).

#### Example

```typescript
import WebSocket from 'ws';
const channel = new WebSocketChannel({ nodeUrl: '...', websocket: WebSocket });
```

---

### maxBufferSize?

> `optional` **maxBufferSize?**: `number`

Defined in: [src/channel/ws/ws_0_10.ts:130](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L130)

The maximum number of events to buffer per subscription when no handler is attached.

#### Default

```ts
1000;
```

---

### autoReconnect?

> `optional` **autoReconnect?**: `boolean`

Defined in: [src/channel/ws/ws_0_10.ts:135](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L135)

Whether to automatically reconnect when the connection is lost.

#### Default

```ts
true;
```

---

### reconnectOptions?

> `optional` **reconnectOptions?**: [`ReconnectOptions`](ReconnectOptions.md)

Defined in: [src/channel/ws/ws_0_10.ts:139](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L139)

Options for the automatic reconnection behavior.

---

### requestTimeout?

> `optional` **requestTimeout?**: `number`

Defined in: [src/channel/ws/ws_0_10.ts:144](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/channel/ws/ws_0_10.ts#L144)

The timeout in milliseconds for a `sendReceive` call.

#### Default

```ts
60000;
```

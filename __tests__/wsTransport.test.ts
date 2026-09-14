import { WsTransport } from '../src/channel/transport';
import { TimeoutError, WebSocketNotConnectedError } from '../src/utils/errors';
import { createMockWebSocket, withoutErrorLogs } from './config';

describe('UNIT TEST: WsTransport lifecycle', () => {
  const opened: WsTransport[] = [];

  const transportFor = (mock: ReturnType<typeof createMockWebSocket>) => {
    const transport = new WsTransport({
      nodeUrl: 'ws://mock/rpc',
      websocket: mock.MockWebSocket as any,
    });
    opened.push(transport);
    return transport;
  };

  afterEach(() => {
    opened.splice(0).forEach((transport) => transport.close());
  });

  test('opens its socket synchronously and starts in the connecting state', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);

    // The constructor must contain no await: a caller needs a usable value immediately,
    // and readiness is handled by the latch on first use.
    expect(mock.sockets).toHaveLength(1);
    expect(mock.last.url).toBe('ws://mock/rpc');
    expect(transport.getState()).toBe('connecting');
  });

  test('moves to open when the handshake completes, and notifies state listeners', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    const seen: string[] = [];
    transport.on('statechange', () => seen.push(transport.getState()));

    mock.last.open();

    expect(transport.getState()).toBe('open');
    expect(seen).toEqual(['open']);
  });

  test('on() returns the unsubscribe function useSyncExternalStore expects', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    const seen: string[] = [];
    const unsubscribe = transport.on('statechange', () => seen.push(transport.getState()));

    unsubscribe();
    mock.last.open();

    expect(seen).toEqual([]);
  });

  test('moves to closed when the peer closes', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    mock.last.closeRemote();

    expect(transport.getState()).toBe('closed');
  });

  test('does not repeat a state transition it is already in', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    let notifications = 0;
    transport.on('statechange', () => {
      notifications += 1;
    });

    mock.last.open();
    mock.last.closeRemote();
    mock.last.closeRemote();

    expect(notifications).toBe(2);
  });

  test('close() shuts the socket and reports the closed state', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    transport.close();

    expect(transport.getState()).toBe('closed');
    expect(mock.last.readyState).toBe(3);
  });

  test('surfaces a refused connection as WebSocketNotConnectedError, not as a hang', async () => {
    // A gateway turning the connection away may only close it, with no `error` first — the
    // case that produced the reconnection deadlock fixed in 10.6.7. Waiting on `error` alone
    // would leave this pending until the request timeout.
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    const pending = (transport as any).ensureReady();

    mock.last.closeRemote();

    await expect(pending).rejects.toBeInstanceOf(WebSocketNotConnectedError);
  });

  test('surfaces a connection error the same way', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    const pending = (transport as any).ensureReady();

    mock.last.fail();

    await expect(pending).rejects.toBeInstanceOf(WebSocketNotConnectedError);
  });
});

describe('UNIT TEST: WsTransport requests', () => {
  const opened: WsTransport[] = [];

  const transportFor = (mock: ReturnType<typeof createMockWebSocket>, requestTimeout?: number) => {
    const transport = new WsTransport({
      nodeUrl: 'ws://mock/rpc',
      websocket: mock.MockWebSocket as any,
      requestTimeout,
    });
    opened.push(transport);
    return transport;
  };

  afterEach(() => {
    // A request left in flight keeps its `requestTimeout` timer armed — 60s by default — which
    // holds the Node event loop open long after the test ended and then surfaces as an
    // unhandled rejection. Closing settles them and clears the timers.
    opened.splice(0).forEach((transport) => transport.close());
  });

  test('writes nothing before the socket is open, then sends on the latch', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    expect(mock.last.sent).toHaveLength(0);

    mock.last.open();
    await Promise.resolve();
    expect(mock.last.sentBodies).toHaveLength(1);

    mock.last.reply({ jsonrpc: '2.0', id: mock.last.sentBodies[0].id, result: '0x1' });
    await expect(pending).resolves.toEqual({ jsonrpc: '2.0', id: 1, result: '0x1' });
  });

  test('allocates its own wire id and gives the caller theirs back', async () => {
    // One socket outlives several channels, and every channel numbers its own
    // requests from 1. The transport must renumber on the wire, and restore the caller's id
    // on the reply — BatchClient correlates on it.
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    // A string id no counter could ever produce, so the assertion cannot pass by coincidence:
    // the transport numbers its own requests from 1, which a caller may legitimately use too.
    const pending = transport.request({
      id: 'caller-owned',
      jsonrpc: '2.0',
      method: 'starknet_chainId',
    });
    await Promise.resolve();

    const onTheWire = mock.last.sentBodies[0];
    expect(typeof onTheWire.id).toBe('number');
    expect(onTheWire.method).toBe('starknet_chainId');

    mock.last.reply({ jsonrpc: '2.0', id: onTheWire.id, result: '0x1' });
    await expect(pending).resolves.toEqual({
      jsonrpc: '2.0',
      id: 'caller-owned',
      result: '0x1',
    });
  });

  test('keeps two concurrent requests apart', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const first = transport.request({ id: 7, jsonrpc: '2.0', method: 'starknet_blockNumber' });
    const second = transport.request({ id: 7, jsonrpc: '2.0', method: 'starknet_chainId' });
    await Promise.resolve();

    const [wireA, wireB] = mock.last.sentBodies;
    expect(wireA.id).not.toBe(wireB.id);

    // Answered out of order, which a node is free to do.
    mock.last.reply({ jsonrpc: '2.0', id: wireB.id, result: 'chain' });
    mock.last.reply({ jsonrpc: '2.0', id: wireA.id, result: 'block' });

    await expect(first).resolves.toMatchObject({ result: 'block', id: 7 });
    await expect(second).resolves.toMatchObject({ result: 'chain', id: 7 });
  });

  test('resolves an error envelope instead of rejecting', async () => {
    // The same contract as HttpTransport. `errorHandler` on the channel turns this
    // into a typed RpcError, so application code sees identical errors on both transports.
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await Promise.resolve();
    const wireId = mock.last.sentBodies[0].id;
    mock.last.reply({
      jsonrpc: '2.0',
      id: wireId,
      error: { code: 24, message: 'Block not found' },
    });

    await expect(pending).resolves.toEqual({
      jsonrpc: '2.0',
      id: 1,
      error: { code: 24, message: 'Block not found' },
    });
  });

  test('rejects with TimeoutError when the node never answers', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock, 50);
    mock.last.open();

    await expect(
      transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' })
    ).rejects.toBeInstanceOf(TimeoutError);
  });

  test('settles requests still on the wire when the connection drops', async () => {
    // Their only other exit is the timeout, so without this the caller waits the full 60s
    // for a reply that can no longer arrive — and the pending timer keeps Node alive for it.
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await Promise.resolve();
    mock.last.closeRemote();

    await expect(pending).rejects.toBeInstanceOf(WebSocketNotConnectedError);
  });

  test('settles requests still on the wire when the user closes', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await Promise.resolve();
    transport.close();

    await expect(pending).rejects.toBeInstanceOf(WebSocketNotConnectedError);
  });

  test('rejects a request made after the connection is gone', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();
    mock.last.closeRemote();

    await expect(
      transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' })
    ).rejects.toBeInstanceOf(WebSocketNotConnectedError);
  });

  test('ignores a malformed frame instead of killing the process', async () => {
    // A frame that will not parse carries no id, so it cannot be attributed to any request.
    // Throwing here would escape the socket's event dispatch, not a promise chain.
    const mock = createMockWebSocket();
    const transport = transportFor(mock, 80);
    mock.last.open();

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await Promise.resolve();
    const ev: any = new Event('message');
    ev.data = 'not json at all';
    // The transport logs the parse failure; that is the point, but it must not print under a
    // passing run.
    await withoutErrorLogs(() => mock.last.dispatchEvent(ev));

    await expect(pending).rejects.toBeInstanceOf(TimeoutError);
  });

  test('sends an array for a batch and restores every caller id', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const pending = transport.request([
      { id: 'batched_1', jsonrpc: '2.0', method: 'starknet_blockNumber' },
      { id: 'batched_2', jsonrpc: '2.0', method: 'starknet_chainId' },
    ]);
    await Promise.resolve();

    const wire = mock.last.sentBodies[0];
    expect(Array.isArray(wire)).toBe(true);
    expect(wire).toHaveLength(2);

    // A node answers a batch with one array frame, in whatever order it likes.
    mock.last.reply([
      { jsonrpc: '2.0', id: wire[1].id, result: 'chain' },
      { jsonrpc: '2.0', id: wire[0].id, result: 'block' },
    ]);

    await expect(pending).resolves.toEqual([
      { jsonrpc: '2.0', id: 'batched_1', result: 'block' },
      { jsonrpc: '2.0', id: 'batched_2', result: 'chain' },
    ]);
  });

  test('accepts a batch answered as separate frames', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const pending = transport.request([
      { id: 1, jsonrpc: '2.0', method: 'starknet_blockNumber' },
      { id: 2, jsonrpc: '2.0', method: 'starknet_chainId' },
    ]);
    await Promise.resolve();
    const wire = mock.last.sentBodies[0];

    mock.last.reply({ jsonrpc: '2.0', id: wire[0].id, result: 'block' });
    mock.last.reply({ jsonrpc: '2.0', id: wire[1].id, result: 'chain' });

    await expect(pending).resolves.toEqual([
      { jsonrpc: '2.0', id: 1, result: 'block' },
      { jsonrpc: '2.0', id: 2, result: 'chain' },
    ]);
  });
});

describe('UNIT TEST: WsTransport notifications', () => {
  const opened: WsTransport[] = [];

  const transportFor = (mock: ReturnType<typeof createMockWebSocket>) => {
    const transport = new WsTransport({
      nodeUrl: 'ws://mock/rpc',
      websocket: mock.MockWebSocket as any,
    });
    opened.push(transport);
    return transport;
  };

  afterEach(() => {
    opened.splice(0).forEach((transport) => transport.close());
  });

  test('hands a node-pushed notification to its listeners', () => {
    // A notification carries `method` and `params.subscription_id` and no `id`.
    // The discrimination is on the shape of the frame, never on id values — a subscription id
    // is a decimal string that routinely exceeds Number.MAX_SAFE_INTEGER.
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const seen: any[] = [];
    transport.on('notification', (notification) => seen.push(notification));

    mock.last.reply({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: '17529898712701846618', result: { block_number: 1 } },
    });

    expect(seen).toHaveLength(1);
    expect(seen[0].params.subscription_id).toBe('17529898712701846618');
  });

  test('does not confuse a reply with a notification', async () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const seen: any[] = [];
    transport.on('notification', (notification) => seen.push(notification));

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await Promise.resolve();
    mock.last.reply({ jsonrpc: '2.0', id: mock.last.sentBodies[0].id, result: '0x1' });

    await expect(pending).resolves.toMatchObject({ result: '0x1' });
    expect(seen).toEqual([]);
  });

  test('on("notification") returns an unsubscribe function', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    mock.last.open();

    const seen: any[] = [];
    const unsubscribe = transport.on('notification', (notification) => seen.push(notification));
    unsubscribe();

    mock.last.reply({
      jsonrpc: '2.0',
      method: 'starknet_subscriptionNewHeads',
      params: { subscription_id: '1', result: {} },
    });

    expect(seen).toEqual([]);
  });
});

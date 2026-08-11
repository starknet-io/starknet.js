import { WebSocketProvider } from '../src';
import { createBlockForDevnet, describeIfDevnet, getTestProvider, waitUntil } from './config';

/**
 * The point of the whole transport design, against a real node: one socket serving both plain
 * JSON-RPC and subscriptions, through a provider that behaves like any other.
 *
 * Devnet only. It serves both on its `/ws` endpoint, which is what makes this runnable without a
 * public node.
 */
describeIfDevnet('E2E: WebSocketProvider over a real socket', () => {
  let wsUrl: string;
  let provider: WebSocketProvider;

  beforeAll(() => {
    const { nodeUrl } = getTestProvider().channel;
    // http://127.0.0.1:5050/rpc → ws://127.0.0.1:5050/ws
    wsUrl = `${nodeUrl.replace(/^http/, 'ws').replace(/\/[^/]*$/, '')}/ws`;
  });

  afterEach(() => {
    // The socket is a libuv handle the event loop holds onto; nothing collects it on its own.
    provider?.transport.close();
  });

  test('create() probes the node and serves requests over the socket', async () => {
    provider = await WebSocketProvider.create({ nodeUrl: wsUrl });

    const blockNumber = await provider.getBlockNumber();
    expect(typeof blockNumber).toBe('number');

    const chainId = await provider.getChainId();
    expect(chainId).toBe(await getTestProvider().getChainId());
  });

  test('requests and subscriptions run over the same socket', async () => {
    provider = await WebSocketProvider.create({ nodeUrl: wsUrl });

    const sub = await provider.subscriptions.subscribeNewHeads({});
    const received: unknown[] = [];
    sub.on((data) => {
      received.push(data);
    });

    // Interleaved on purpose: a request must not disturb the notification stream, and vice versa.
    const before = await provider.getBlockNumber();
    await createBlockForDevnet();
    await waitUntil(() => received.length >= 1, 30_000, createBlockForDevnet);
    const after = await provider.getBlockNumber();

    expect(after).toBeGreaterThan(before);
    expect(received[0]).toBeDefined();

    expect(await sub.unsubscribe()).toBe(true);
  });

  test('onClose fires when the subscription is unsubscribed', async () => {
    provider = await WebSocketProvider.create({ nodeUrl: wsUrl });

    const sub = await provider.subscriptions.subscribeNewHeads({});
    const closed = jest.fn();
    sub.onClose(closed);

    await sub.unsubscribe();

    expect(closed).toHaveBeenCalledTimes(1);
    expect(sub.isClosed).toBe(true);
  });
});

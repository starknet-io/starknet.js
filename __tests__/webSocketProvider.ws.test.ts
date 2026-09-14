import { WebSocketProvider } from '../src';
import {
  createBlockForDevnet,
  describeIfWs,
  getTestProvider,
  TEST_WS_URL,
  waitUntil,
} from './config';

/**
 * The point of the whole transport design, against a real node: one socket serving both plain
 * JSON-RPC and subscriptions, through a provider that behaves like any other.
 */
describeIfWs('E2E: WebSocketProvider over a real socket', () => {
  const wsUrl = TEST_WS_URL!;
  let provider: WebSocketProvider;

  afterEach(async () => {
    if (!provider) return;

    // Unsubscribe first, and do not assume the test got that far. A gateway that will not
    // complete the closing handshake of a still-subscribed socket leaves it in CLOSING for good,
    // and that handle outlives the whole run — measured against Pathfinder. A test that fails
    // before its own `unsubscribe()` must not turn into a run that never exits.
    const live = Array.from(provider.subscriptions.subscriptions.values()).filter(
      (sub) => !sub.isClosed
    );
    await Promise.all(live.map((sub) => sub.unsubscribe().catch(() => false)));

    // The socket is a libuv handle the event loop holds onto; nothing collects it on its own.
    provider.transport.close();
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

    // Not `toBeGreaterThan`: a public node announces a head over the subscription before
    // `starknet_blockNumber` reports it, so requiring the request to have caught up asserts an
    // ordering no node promises. What this test owes is that both halves work on one socket —
    // a request answers, a notification arrives — and that the chain has not gone backwards.
    expect(after).toBeGreaterThanOrEqual(before);
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

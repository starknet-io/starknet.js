import { RPC0103, WsTransport } from '../src';
import { createBlockForDevnet, describeIfDevnet, getTestProvider } from './config';

/**
 * Real subscriptions against devnet's WebSocket endpoint.
 *
 * devnet does not mint blocks on a timer — it makes one per transaction — so a `newHeads`
 * subscription observes nothing until something creates a block. `createBlockForDevnet()` is
 * that lever, and it is why this test drives its own events instead of waiting for the chain.
 *
 * The URL is derived locally: devnet serves its socket on a dedicated `/ws` path, which is not a
 * general rule (Pathfinder serves it on the same path as HTTP, differing only by scheme). Giving
 * the whole suite a WebSocket URL is Lot A's job.
 */
describeIfDevnet('E2E: SubscriptionChannel over a real socket', () => {
  let wsUrl: string;
  let transport: WsTransport;
  let channel: RPC0103.SubscriptionChannel;

  beforeAll(() => {
    const { nodeUrl } = getTestProvider().channel;
    wsUrl = `${nodeUrl.replace(/^http/, 'ws').replace(/\/[^/]*$/, '')}/ws`;
  });

  beforeEach(() => {
    transport = new WsTransport({ nodeUrl: wsUrl, requestTimeout: 15_000 });
    channel = new RPC0103.SubscriptionChannel({ transport });
  });

  afterEach(() => {
    channel.close();
    transport.close();
  });

  test('subscribes to new heads and receives a block the test causes', async () => {
    const subscription = await channel.subscribeNewHeads();
    expect(typeof subscription.id).toBe('string');

    const received = new Promise<any>((resolve) => {
      subscription.on(resolve);
    });
    await createBlockForDevnet();

    await expect(received).resolves.toHaveProperty('block_number');
  }, 30_000);

  test('unsubscribes and settles a waiter', async () => {
    const subscription = await channel.subscribeNewHeads();

    const waiting = channel.waitForUnsubscription(subscription.id);
    await expect(subscription.unsubscribe()).resolves.toBe(true);
    await expect(waiting).resolves.toBeUndefined();
    expect(subscription.isClosed).toBe(true);
  }, 30_000);

  test('subscribes to events', async () => {
    const subscription = await channel.subscribeEvents();

    expect(typeof subscription.id).toBe('string');
    await expect(subscription.unsubscribe()).resolves.toBe(true);
  }, 30_000);
});

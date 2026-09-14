import { RPC0103, WsTransport } from '../src';
import { createBlockForDevnet, describeIfWs, TEST_WS_URL, withTimeout } from './config';

/**
 * Real subscriptions over a real socket.
 *
 * devnet does not mint blocks on a timer — it makes one per transaction — so a `newHeads`
 * subscription observes nothing until something creates a block. `createBlockForDevnet()` is
 * that lever, and it is why this test drives its own events instead of waiting for the chain.
 * Off devnet it is a no-op and the chain provides its own cadence.
 */
describeIfWs('E2E: SubscriptionChannel over a real socket', () => {
  const wsUrl = TEST_WS_URL!;
  let transport: WsTransport;
  let channel: RPC0103.SubscriptionChannel;

  beforeEach(() => {
    transport = new WsTransport({ nodeUrl: wsUrl, requestTimeout: 15_000 });
    channel = new RPC0103.SubscriptionChannel({ transport });
  });

  afterEach(async () => {
    // Unsubscribe before closing, and do not assume a test did it. A gateway that will not
    // complete the closing handshake of a still-subscribed socket leaves it in CLOSING for good,
    // and that handle outlives the whole run — measured against Pathfinder. devnet drops the
    // connection instead, which hides the problem rather than removing it. Bounded, because a
    // node that has stopped answering must not stall teardown.
    const live = Array.from(channel.subscriptions.values()).filter((sub) => !sub.isClosed);
    await withTimeout(Promise.all(live.map((sub) => sub.unsubscribe().catch(() => false))), 2000);

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

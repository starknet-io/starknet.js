import { Provider, Subscription, SubscriptionNewHeadsEvent, WebSocketChannel } from '../src';
import {
  createBlockForDevnet,
  describeIfWs,
  getTestAccount,
  getTestProvider,
  openChannel,
  simulateConnectionDrop,
  STRKtokenAddress,
  TEST_WS_URL,
  waitUntil,
  withTimeout,
} from './config';

/**
 * Everything `WebSocketChannel` can only prove against a live node.
 *
 * Named `.ws.test.ts` because the runner derives its `ws-specific` category from that suffix: a
 * file that needs a socket says so in its name, so the category never needs a hand-kept list.
 * The mocked half of these tests lives in `WebSocketChannel.test.ts` and needs no URL at all.
 */
const NODE_URL = TEST_WS_URL!;

describeIfWs('E2E WebSocket Tests', () => {
  /**
   * The chain the node under test actually serves.
   *
   * Asserting against a hardcoded `SN_SEPOLIA` pinned the whole suite to one network and made
   * every run on another one fail on the constant rather than on anything real. Reading it from
   * the RPC provider also makes the assertion stronger: it now checks that the WebSocket channel
   * and the HTTP channel agree on the chain, instead of checking a literal.
   */
  let expectedChainId: string;

  beforeAll(async () => {
    expectedChainId = await new Provider(getTestProvider()).getChainId();
  });

  describe('websocket specific endpoints', () => {
    // Updated for RPC 0.9: removed subscribePendingTransaction (not available in 0.9)
    // Added subscribeNewTransactionReceipts and subscribeNewTransactions (new in 0.9)
    // account provider
    const provider = new Provider(getTestProvider());
    const account = getTestAccount(provider);

    // websocket
    let webSocketChannel: WebSocketChannel;

    beforeEach(async () => {
      webSocketChannel = await openChannel({ nodeUrl: NODE_URL });
    });

    afterEach(async () => {
      if (webSocketChannel.isConnected()) {
        webSocketChannel.disconnect();
        await webSocketChannel.waitForDisconnection();
      }
    });

    test('should throw an error when sending on a disconnected socket', async () => {
      // This test uses its own channel to disable auto-reconnect and isolate the error behavior
      const testChannel = await openChannel({ nodeUrl: NODE_URL, autoReconnect: false });

      testChannel.disconnect();
      await testChannel.waitForDisconnection();

      // With autoReconnect: false, this should immediately throw, not queue.
      await expect(testChannel.subscribeNewHeads()).rejects.toThrow(
        'WebSocketChannel.send() failed due to socket being disconnected'
      );
    });

    test('should allow manual reconnection after a user-initiated disconnect', async () => {
      // The beforeEach channel is opened with autoReconnect disabled (see openChannel),
      // so a user-initiated disconnect leaves it closed until reconnect() is called.
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection();

      expect(webSocketChannel.isConnected()).toBe(false);

      // Now, manually reconnect
      webSocketChannel.reconnect();
      await webSocketChannel.waitForConnection();
      expect(webSocketChannel.isConnected()).toBe(true);

      // To prove the connection is working, make a simple RPC call.
      // This avoids the flakiness of creating and tearing down a real subscription.
      const chainId = await webSocketChannel.sendReceive('starknet_chainId');
      expect(chainId).toBe(expectedChainId);
    });

    test('Test subscribeNewHeads', async () => {
      // type not required, here I just test type availability
      const sub: SubscriptionNewHeadsEvent = await webSocketChannel.subscribeNewHeads();
      expect(sub).toBeInstanceOf(Subscription);

      const received: unknown[] = [];
      sub.on((result) => {
        received.push(result);
      });

      // devnet mints a block only on demand, so waiting for two would wait forever. Off devnet
      // `createBlockForDevnet()` is a no-op and the chain produces them on its own.
      await createBlockForDevnet();
      await createBlockForDevnet();
      await waitUntil(() => received.length >= 2);
      received.forEach((result) => expect(result).toBeDefined());

      // Armed before the unsubscribe: the waiter is keyed by subscription id and is only ever
      // resolved by the unsubscription itself, so arming it afterwards waits on something that
      // has already happened — forever, since it carries no timeout of its own.
      const unsubscribed = webSocketChannel.waitForUnsubscription(sub.id);
      const status = await sub.unsubscribe();
      expect(status).toBe(true);
      await unsubscribed;
    });

    test('Test subscribeEvents', async () => {
      const sub = await webSocketChannel.subscribeEvents();
      expect(sub).toBeInstanceOf(Subscription);

      const received: any[] = [];
      sub.on((result) => {
        received.push(result);
      });

      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      });

      // Only this transaction's events count: devnet replays the previous block's events at
      // subscription time, and a public node carries everyone else's traffic.
      const mine = () => received.filter((e) => e.transaction_hash === transaction_hash);
      await waitUntil(() => mine().length >= 2);
      mine().forEach((result) => expect(result).toHaveProperty('keys'));

      // Armed before the unsubscribe: the waiter is keyed by subscription id and is only ever
      // resolved by the unsubscription itself, so arming it afterwards waits on something that
      // has already happened — forever, since it carries no timeout of its own.
      const unsubscribed = webSocketChannel.waitForUnsubscription(sub.id);
      const status = await sub.unsubscribe();
      expect(status).toBe(true);
      await unsubscribed;
    });

    test('Test subscribeEvents with finality status filter', async () => {
      const sub = await webSocketChannel.subscribeEvents({
        finalityStatus: 'ACCEPTED_ON_L2',
      });
      expect(sub).toBeInstanceOf(Subscription);

      const received: any[] = [];
      sub.on((result) => {
        received.push(result);
      });

      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      });

      const mine = () => received.filter((e) => e.transaction_hash === transaction_hash);
      await waitUntil(() => mine().length >= 2);
      mine().forEach((result) => expect(result).toHaveProperty('keys'));

      // Armed before the unsubscribe: the waiter is keyed by subscription id and is only ever
      // resolved by the unsubscription itself, so arming it afterwards waits on something that
      // has already happened — forever, since it carries no timeout of its own.
      const unsubscribed = webSocketChannel.waitForUnsubscription(sub.id);
      const status = await sub.unsubscribe();
      expect(status).toBe(true);
      await unsubscribed;
    });

    test('Test subscribeNewTransactionReceipts', async () => {
      const sub = await webSocketChannel.subscribeNewTransactionReceipts();
      expect(sub).toBeInstanceOf(Subscription);

      const received: any[] = [];
      sub.on((result) => {
        received.push(result);
      });

      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      });

      const mine = () => received.filter((r) => r.transaction_hash === transaction_hash);
      await waitUntil(() => mine().length >= 1);
      expect(mine()[0]).toHaveProperty('execution_status');

      // Armed before the unsubscribe: the waiter is keyed by subscription id and is only ever
      // resolved by the unsubscription itself, so arming it afterwards waits on something that
      // has already happened — forever, since it carries no timeout of its own.
      const unsubscribed = webSocketChannel.waitForUnsubscription(sub.id);
      const status = await sub.unsubscribe();
      expect(status).toBe(true);
      await unsubscribed;
    });

    test('Test subscribeNewTransactionReceipts with finality status filter', async () => {
      const sub = await webSocketChannel.subscribeNewTransactionReceipts({
        finalityStatus: ['ACCEPTED_ON_L2'],
      });
      expect(sub).toBeInstanceOf(Subscription);

      const received: any[] = [];
      sub.on((result) => {
        received.push(result);
      });

      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      });

      const mine = () => received.filter((r) => r.transaction_hash === transaction_hash);
      await waitUntil(() => mine().length >= 1);
      expect(mine()[0]).toHaveProperty('execution_status');

      // Armed before the unsubscribe: the waiter is keyed by subscription id and is only ever
      // resolved by the unsubscription itself, so arming it afterwards waits on something that
      // has already happened — forever, since it carries no timeout of its own.
      const unsubscribed = webSocketChannel.waitForUnsubscription(sub.id);
      const status = await sub.unsubscribe();
      expect(status).toBe(true);
      await unsubscribed;
    });

    test('Test subscribeNewTransactions', async () => {
      const sub = await webSocketChannel.subscribeNewTransactions();
      expect(sub).toBeInstanceOf(Subscription);

      const received: any[] = [];
      sub.on((result) => {
        received.push(result);
      });

      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      });

      const mine = () => received.filter((t) => t.transaction_hash === transaction_hash);
      await waitUntil(() => mine().length >= 1);
      expect(mine()[0]).toHaveProperty('nonce');

      // Armed before the unsubscribe: the waiter is keyed by subscription id and is only ever
      // resolved by the unsubscription itself, so arming it afterwards waits on something that
      // has already happened — forever, since it carries no timeout of its own.
      const unsubscribed = webSocketChannel.waitForUnsubscription(sub.id);
      const status = await sub.unsubscribe();
      expect(status).toBe(true);
      await unsubscribed;
    });

    test('Test subscribeNewTransactions with finality status filter', async () => {
      const sub = await webSocketChannel.subscribeNewTransactions({
        finalityStatus: ['ACCEPTED_ON_L2'],
      });
      expect(sub).toBeInstanceOf(Subscription);

      const received: any[] = [];
      sub.on((result) => {
        received.push(result);
      });

      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      });

      const mine = () => received.filter((t) => t.transaction_hash === transaction_hash);
      await waitUntil(() => mine().length >= 1);
      expect(mine()[0]).toHaveProperty('nonce');

      // Armed before the unsubscribe: the waiter is keyed by subscription id and is only ever
      // resolved by the unsubscription itself, so arming it afterwards waits on something that
      // has already happened — forever, since it carries no timeout of its own.
      const unsubscribed = webSocketChannel.waitForUnsubscription(sub.id);
      const status = await sub.unsubscribe();
      expect(status).toBe(true);
      await unsubscribed;
    });

    test('Test subscribeTransactionStatus', async () => {
      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      });

      const sub = await webSocketChannel.subscribeTransactionStatus({
        transactionHash: transaction_hash,
      });
      expect(sub).toBeInstanceOf(Subscription);

      let i = 0;
      sub.on(async (result) => {
        i += 1;
        expect(result).toBeDefined();
        if (i >= 1) {
          // TODO: it should be 2 statuses received and ..., but juno do not report first one when sub., revisit after RPC 0.9
          const status = await sub.unsubscribe();
          expect(status).toBe(true);
        }
      });
      await webSocketChannel.waitForUnsubscription(sub.id);
    });
  });

  describe('websocket regular endpoints', () => {
    let webSocketChannel: WebSocketChannel;

    beforeAll(async () => {
      webSocketChannel = await openChannel({ nodeUrl: NODE_URL });
      expect(webSocketChannel.isConnected()).toBe(true);
    });

    afterAll(async () => {
      // `beforeAll` can fail to connect at all (per-IP rate limiting), leaving the channel
      // unassigned. Without this guard teardown throws a TypeError, which Jest reports as
      // "Test suite failed to run", hiding the connection error that actually caused it.
      if (!webSocketChannel) return;
      webSocketChannel.disconnect();
      await webSocketChannel.waitForDisconnection().catch(() => undefined);
    });

    test('regular rpc endpoint', async () => {
      const response = await webSocketChannel.sendReceive('starknet_chainId');
      expect(response).toBe(expectedChainId);
    });
  });

  describe('WebSocketChannel Auto-Reconnection', () => {
    let webSocketChannel: WebSocketChannel;

    afterEach(async () => {
      // Ensure the channel is always disconnected after each test to prevent open handles.
      if (!webSocketChannel) return;

      // Unsubscribe first: a gateway that will not complete the closing handshake of a
      // still-subscribed socket leaves it in CLOSING for good, and that handle outlives the
      // whole run. Several tests here call `done()` from inside a subscription handler, so
      // nothing else drops them. Best-effort and bounded — teardown must not fail or stall
      // on a dead socket.
      const subs: Array<{ isClosed: boolean; unsubscribe: () => Promise<boolean> }> = Array.from(
        ((webSocketChannel as any).activeSubscriptions as Map<string, any>).values()
      );
      await withTimeout(
        Promise.all(subs.filter((s) => !s.isClosed).map((s) => s.unsubscribe().catch(() => false))),
        2000
      );

      webSocketChannel.disconnect();
      // Those same gateways can leave `waitForDisconnection()` hanging, so bound it: the next
      // test builds a fresh channel and the node reclaims the idle socket on its own. It also
      // rejects on the socket's `error` event, which some nodes (devnet among them) emit while
      // closing — a noisy shutdown must not fail the test that just ran.
      await withTimeout(
        webSocketChannel.waitForDisconnection().catch(() => undefined),
        3000
      );
    });

    test('should automatically reconnect on connection drop', (done) => {
      // Set a very short reconnection delay for faster tests
      webSocketChannel = new WebSocketChannel({
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });

      let hasReconnected = false;
      webSocketChannel.on('open', () => {
        // This will be called once on initial connection, and a second time on reconnection.
        if (hasReconnected) {
          done(); // Test is successful if we get here
        } else {
          // This is the first connection, now we simulate the drop
          hasReconnected = true;
          simulateConnectionDrop(webSocketChannel);
        }
      });
    });

    test('sendReceive should time out if no response is received', async () => {
      webSocketChannel = await openChannel({
        nodeUrl: NODE_URL,
        requestTimeout: 100, // Set a short timeout for testing
      });

      // Spy on the 'send' method and prevent it from sending anything.
      // This guarantees that we will never get a response and the timeout will be triggered.
      const sendSpy = jest.spyOn(webSocketChannel.websocket, 'send').mockImplementation(() => {});

      // We expect this promise to reject with a timeout error.
      await expect(
        webSocketChannel.sendReceive('some_method_that_will_never_get_a_response')
      ).rejects.toThrow('timed out after 100ms');

      // Restore the original implementation for other tests
      sendSpy.mockRestore();
    });

    test('should queue sendReceive requests when reconnecting and process them after', (done) => {
      webSocketChannel = new WebSocketChannel({
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });

      let hasReconnected = false;
      webSocketChannel.on('open', () => {
        if (hasReconnected) {
          // Reconnected. The promise from the queued sendReceive will resolve now.
        } else {
          // 1. First connection, now simulate a drop
          hasReconnected = true;
          simulateConnectionDrop(webSocketChannel);

          // 2. Immediately try to send a request. It should be queued.
          webSocketChannel
            .sendReceive('starknet_chainId')
            .then((result) => {
              // 3. This assertion runs after reconnection, proving the queue was processed.
              expect(result).toBe(expectedChainId);
              done(); // 4. Test is done when the queued request has been successfully processed.
            })
            // Report the failure rather than leave `done()` uncalled: a queued request has no
            // timeout of its own, so the test would otherwise hang until Jest's global one
            // with no indication of what went wrong.
            .catch(done);
        }
      });
    });

    test('should queue subscribe requests when reconnecting and process them after', async () => {
      webSocketChannel = new WebSocketChannel({
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });
      await webSocketChannel.waitForConnection();

      // Drop, then subscribe straight away: the request cannot reach the wire, so it can only
      // be queued. Resolving at all is therefore the proof that the queue was processed.
      simulateConnectionDrop(webSocketChannel);
      const sub = await webSocketChannel.subscribeNewHeads();

      expect(sub).toBeInstanceOf(Subscription);
      expect(webSocketChannel.isConnected()).toBe(true);

      // And it is a real subscription, not just a resolved promise.
      const received: unknown[] = [];
      sub.on((data) => {
        received.push(data);
      });
      await waitUntil(() => received.length > 0, 30_000, createBlockForDevnet);
      expect(received[0]).toBeDefined();
    });

    test('should restore active subscriptions after an automatic reconnection', async () => {
      webSocketChannel = new WebSocketChannel({
        nodeUrl: NODE_URL,
        reconnectOptions: { retries: 5, delay: 1000, exponential: false },
      });
      await webSocketChannel.waitForConnection();

      const sub = await webSocketChannel.subscribeNewHeads();
      const received: unknown[] = [];
      sub.on((data) => {
        received.push(data);
      });

      simulateConnectionDrop(webSocketChannel);
      await waitUntil(() => webSocketChannel.isConnected(), 30_000);
      // Only what arrives after the reconnection can prove the subscription was restored.
      received.length = 0;

      // Restoration completes after the socket reports itself open, and devnet mints nothing on
      // its own, so keep asking for a block until an event lands. Off devnet the tick is a no-op
      // and the chain's own cadence provides it.
      await waitUntil(() => received.length > 0, 30_000, createBlockForDevnet);
      expect(received[0]).toBeDefined();
    });
  });
});

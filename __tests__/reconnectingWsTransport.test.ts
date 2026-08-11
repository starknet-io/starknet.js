import { ReconnectingWsTransport } from '../src/channel/transport';
import { WebSocketNotConnectedError, config } from '../src';
import { createMockWebSocket } from './config';

/**
 * The reconnection policy, at transport level.
 *
 * These mirror `WebSocketChannel.characterization.test.ts`: the same scenarios, asserted against
 * the class the policy moved into. Both files must stay green — that is what says the move
 * preserved the behaviour rather than replacing it.
 */
describe('UNIT TEST: ReconnectingWsTransport', () => {
  const RECONNECT = { retries: 5, delay: 20, exponential: false, stableConnectionThreshold: 200 };

  const wait = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  let originalLogLevel: unknown;

  beforeAll(() => {
    originalLogLevel = config.get('logLevel');
    config.set('logLevel', 'FATAL' as any);
  });

  afterAll(() => {
    config.set('logLevel', originalLogLevel as any);
  });

  const opened = (
    mock: ReturnType<typeof createMockWebSocket>,
    overrides: Partial<typeof RECONNECT> = {}
  ) => {
    const transport = new ReconnectingWsTransport({
      nodeUrl: 'ws://mock',
      websocket: mock.MockWebSocket as any,
      requestTimeout: 500,
      reconnectOptions: { ...RECONNECT, ...overrides },
    });
    mock.last.open();
    return transport;
  };

  const answerLast = (mock: ReturnType<typeof createMockWebSocket>, result: unknown) => {
    const sent = mock.last.sentBodies;
    mock.last.reply({ jsonrpc: '2.0', id: sent[sent.length - 1].id, result });
  };

  test('replaces its socket immediately when a live connection drops', async () => {
    const mock = createMockWebSocket();
    const transport = opened(mock);

    mock.last.closeRemote();

    // The first attempt is immediate; `delay` only spaces out attempts that failed.
    expect(mock.sockets).toHaveLength(2);
    expect(transport.getState()).toBe('reconnecting');

    mock.last.open();
    await wait(5);
    expect(transport.getState()).toBe('open');

    transport.close();
  });

  test('queues a request made during an outage and sends it on the new socket', async () => {
    const mock = createMockWebSocket();
    const transport = opened(mock);
    const dropped = mock.last;

    dropped.closeRemote();
    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await wait(5);

    // Never on the wire of either socket — which is what makes sending it later safe.
    expect(dropped.sentBodies).toHaveLength(0);
    expect(mock.last.sentBodies).toHaveLength(0);

    mock.last.open();
    await wait(5);

    const sent = mock.last.sentBodies;
    expect(sent).toHaveLength(1);
    expect(sent[0].method).toBe('starknet_chainId');
    answerLast(mock, '0xchain');

    await expect(pending).resolves.toMatchObject({ id: 1, result: '0xchain' });
    transport.close();
  });

  test('rejects a request already on the wire when the connection drops, never replaying it', async () => {
    const mock = createMockWebSocket();
    const transport = opened(mock);

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await wait(5);
    expect(mock.last.sentBodies).toHaveLength(1);

    mock.last.closeRemote();

    await expect(pending).rejects.toBeInstanceOf(WebSocketNotConnectedError);
    // The replacement socket carries nothing: the node may already have seen the first copy.
    mock.last.open();
    await wait(5);
    expect(mock.last.sentBodies).toHaveLength(0);

    transport.close();
  });

  test('runs its reconnected hooks before flushing the queue', async () => {
    const mock = createMockWebSocket();
    const transport = opened(mock);
    const order: string[] = [];

    transport.onReconnected(async () => {
      order.push('hook');
      await wait(10);
    });

    mock.last.closeRemote();
    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    mock.last.open();

    // While the hook is still running the queue is untouched.
    await wait(5);
    expect(order).toEqual(['hook']);
    expect(mock.last.sentBodies).toHaveLength(0);

    await wait(20);
    expect(mock.last.sentBodies).toHaveLength(1);
    answerLast(mock, '0xchain');
    await expect(pending).resolves.toMatchObject({ result: '0xchain' });

    transport.close();
  });

  test('arms the next attempt when a refusal arrives as a bare close, with no error first', async () => {
    // The 10.6.7 deadlock: a gateway that turns the connection away without emitting `error`.
    const mock = createMockWebSocket();
    const transport = opened(mock);

    mock.last.closeRemote(); // live connection drops → attempt 1 socket created
    expect(mock.sockets).toHaveLength(2);

    mock.last.closeRemote(); // attempt 1 refused, bare close
    await wait(40);
    expect(mock.sockets.length).toBeGreaterThan(2);

    transport.close();
  });

  test('arms the next attempt when the refusal arrives as an error instead', async () => {
    const mock = createMockWebSocket();
    const transport = opened(mock);

    mock.last.closeRemote();
    expect(mock.sockets).toHaveLength(2);

    mock.last.fail(); // attempt 1 refused with `error` only
    await wait(40);
    expect(mock.sockets.length).toBeGreaterThan(2);

    transport.close();
  });

  test('gives up after the configured retries and rejects what was queued', async () => {
    const mock = createMockWebSocket();
    const transport = opened(mock, { retries: 2, delay: 10 });

    mock.last.closeRemote();
    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    // Attached before the loop: giving up happens partway through it, and a rejection with no
    // handler yet attached is an unhandled rejection rather than a passing assertion.
    const rejects = expect(pending).rejects.toBeInstanceOf(WebSocketNotConnectedError);

    // Refuse every attempt.
    for (let i = 0; i < 6; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wait(15);
      if (mock.last.readyState !== 3) mock.last.closeRemote();
    }

    await rejects;
    expect(transport.getState()).toBe('closed');

    transport.close();
  });

  test('a user close stops everything and reconnects nothing', async () => {
    const mock = createMockWebSocket();
    const transport = opened(mock);
    const socketCount = mock.sockets.length;

    const pending = transport.request({ id: 1, jsonrpc: '2.0', method: 'starknet_chainId' });
    await wait(5);
    transport.close();

    await expect(pending).rejects.toBeInstanceOf(WebSocketNotConnectedError);
    await wait(40);
    expect(mock.sockets).toHaveLength(socketCount);
    expect(transport.getState()).toBe('closed');
  });
});

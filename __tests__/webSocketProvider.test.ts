import { WebSocketProvider, WsTransport } from '../src';
import { SupportedRpcVersion } from '../src/global/constants';
import { createMockWebSocket } from './config';

/**
 * The thesis of the transport design, asserted without a node: requests and subscriptions are two
 * uses of one socket, and the provider is what pairs them on the same spec version.
 */
describe('UNIT TEST: WebSocketProvider', () => {
  const transportFor = (mock: ReturnType<typeof createMockWebSocket>) =>
    new WsTransport({ nodeUrl: 'ws://mock/rpc', websocket: mock.MockWebSocket as any });

  test('requests and subscriptions share one socket', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);

    const provider = new WebSocketProvider({
      transport,
      specVersion: SupportedRpcVersion.v0_10_3,
    });

    expect(provider.transport).toBe(transport);
    // No second socket was ever opened: the transport was borrowed by both sides. The
    // subscription channel holds it protected, so the socket count is what proves the sharing.
    expect(mock.sockets).toHaveLength(1);

    transport.close();
  });

  test('an existing transport is shared between providers, not replaced', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);

    // The React case from spec §9: the socket lives at module scope and outlives components,
    // which own only subscriptions.
    const a = new WebSocketProvider({ transport, specVersion: SupportedRpcVersion.v0_10_3 });
    const b = new WebSocketProvider({ transport, specVersion: SupportedRpcVersion.v0_10_3 });

    expect(a.transport).toBe(b.transport);
    expect(mock.sockets).toHaveLength(1);

    transport.close();
  });

  test('the request channel and the subscription channel stay on one spec version', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);

    const v09 = new WebSocketProvider({ transport, specVersion: SupportedRpcVersion.v0_9_0 });
    expect(v09.channel.channelSpecVersion).toBe(SupportedRpcVersion.v0_9_0);
    expect(v09.subscriptions.channelSpecVersion).toBe(SupportedRpcVersion.v0_9_0);

    const v0103 = new WebSocketProvider({ transport, specVersion: SupportedRpcVersion.v0_10_3 });
    expect(v0103.channel.channelSpecVersion).toBe(SupportedRpcVersion.v0_10_3);
    expect(v0103.subscriptions.channelSpecVersion).toBe(SupportedRpcVersion.v0_10_3);

    transport.close();
  });

  test('the subscription buffer size reaches the channel', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);

    // `maxBufferSize` belongs to the subscription channel, not to the transport, so it is the one
    // option of the pair that the provider has to carry across on its own. It reads the channel
    // field because nothing on the provider's surface exposes it.
    const tuned = new WebSocketProvider({
      transport,
      specVersion: SupportedRpcVersion.v0_10_3,
      maxBufferSize: 25,
    });
    expect((tuned.subscriptions as any).maxBufferSize).toBe(25);

    const untouched = new WebSocketProvider({
      transport,
      specVersion: SupportedRpcVersion.v0_10_3,
    });
    expect((untouched.subscriptions as any).maxBufferSize).toBe(1000);

    transport.close();
  });

  test('disposing the provider closes its transport', () => {
    const mock = createMockWebSocket();
    const transport = transportFor(mock);
    const provider = new WebSocketProvider({
      transport,
      specVersion: SupportedRpcVersion.v0_10_3,
    });

    provider[Symbol.dispose]();

    expect(transport.getState()).toBe('closed');
  });

  test('a nodeUrl builds a reconnecting transport of its own', () => {
    const mock = createMockWebSocket();
    const provider = new WebSocketProvider({
      nodeUrl: 'ws://mock/rpc',
      websocket: mock.MockWebSocket as any,
      specVersion: SupportedRpcVersion.v0_10_3,
    } as any);

    expect(mock.sockets).toHaveLength(1);
    expect(provider.transport.nodeUrl).toBe('ws://mock/rpc');

    provider.transport.close();
  });
});

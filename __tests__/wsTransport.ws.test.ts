import { RPC0102, RPC0103, RPC09, WsTransport } from '../src';
import { describeIfWs, TEST_WS_URL } from './config';

/**
 * The point of Lot C1, stated as a test: the versioned request channels were not modified, and
 * they now work over a WebSocket purely by being handed a different transport.
 *
 * Runs wherever a socket is available. The node must serve plain JSON-RPC on it, not only
 * subscriptions — devnet and Pathfinder both do.
 */
describeIfWs('E2E: versioned channels over WsTransport', () => {
  const wsUrl = TEST_WS_URL!;
  let transport: WsTransport;

  beforeEach(() => {
    transport = new WsTransport({ nodeUrl: wsUrl, requestTimeout: 10_000 });
  });

  afterEach(() => {
    // The socket is a libuv handle the event loop holds onto; nothing collects it on its own.
    transport.close();
  });

  test('RPC0103.RpcChannel answers over the socket', async () => {
    const channel = new RPC0103.RpcChannel({ nodeUrl: wsUrl, transport });

    const specVersion = await channel.getSpecVersion();
    const chainId = await channel.getChainId();

    expect(typeof specVersion).toBe('string');
    expect(chainId).toMatch(/^0x/);
  });

  test('RPC0102.RpcChannel answers over the socket', async () => {
    const channel = new RPC0102.RpcChannel({ nodeUrl: wsUrl, transport });

    await expect(channel.getBlockLatestAccepted()).resolves.toHaveProperty('block_number');
  });

  test('RPC09.RpcChannel answers over the socket', async () => {
    const channel = new RPC09.RpcChannel({ nodeUrl: wsUrl, transport });

    await expect(channel.getChainId()).resolves.toMatch(/^0x/);
  });

  test('one socket serves two channels without their ids colliding', async () => {
    // The whole reason the transport owns wire ids: both channels number their own requests
    // from 1, so on a shared socket they would otherwise both emit `1`.
    const first = new RPC0103.RpcChannel({ nodeUrl: wsUrl, transport });
    const second = new RPC0103.RpcChannel({ nodeUrl: wsUrl, transport });

    const [chainId, specVersion] = await Promise.all([first.getChainId(), second.getSpecVersion()]);

    expect(chainId).toMatch(/^0x/);
    expect(typeof specVersion).toBe('string');
  });

  test('a batching channel gets its calls answered in one frame', async () => {
    // Batching is the channel's feature, but the array it produces is the transport's problem:
    // one frame out, one frame back, and each caller id restored from it. `wsTransport.test.ts`
    // proves the encoding against a mock socket; this proves a real node accepts it.
    const channel = new RPC0103.RpcChannel({ nodeUrl: wsUrl, transport, batch: 0 });
    const requestSpy = jest.spyOn(transport, 'request');

    const [chainId, specVersion] = await Promise.all([
      channel.getChainId(),
      channel.getSpecVersion(),
    ]);

    // One call carrying both, not two calls — otherwise the node never sees an array and the
    // test would pass on a node that refuses one.
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy.mock.calls[0][0]).toHaveLength(2);
    expect(chainId).toMatch(/^0x/);
    expect(typeof specVersion).toBe('string');
  });

  test('reports a protocol error as a typed RpcError, exactly as HTTP does', async () => {
    // The error contract is what makes Contract and Account transport-agnostic.
    const channel = new RPC0103.RpcChannel({ nodeUrl: wsUrl, transport });

    await expect(channel.getBlockWithTxHashes('0xdeadbeef')).rejects.toThrow();
  });
});

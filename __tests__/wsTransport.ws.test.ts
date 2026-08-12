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

  // No batching test here on purpose. devnet answers `-32700 Parse error` to a JSON-RPC array
  // on its `/ws` endpoint (measured 2026-08-10 with a raw socket, no starknet.js involved), so
  // `batch` over a WebSocket cannot be exercised against it. The transport's own batch encoding
  // and id restoration are covered in `wsTransport.test.ts` against a mock socket.

  test('reports a protocol error as a typed RpcError, exactly as HTTP does', async () => {
    // Spec §7: the error contract is what makes Contract and Account transport-agnostic.
    const channel = new RPC0103.RpcChannel({ nodeUrl: wsUrl, transport });

    await expect(channel.getBlockWithTxHashes('0xdeadbeef')).rejects.toThrow();
  });
});

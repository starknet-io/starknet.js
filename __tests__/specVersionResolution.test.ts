import { LibraryError, RPC09, RPC0103, RpcProvider, logger } from '../src';

const nodeUrl = 'http://127.0.0.1:1234/rpc/v0_10';

/**
 * Offline node stub answering 'starknet_specVersion' with the given version.
 * Any other method is answered with a JSON-RPC error, so a test that triggers
 * an unexpected request fails loudly instead of hitting the network.
 */
function stubNode(specVersion: string) {
  return (async (_url: string, init: any) => {
    const { id, method } = JSON.parse(init.body);
    return {
      json: async () =>
        method === 'starknet_specVersion'
          ? { jsonrpc: '2.0', id, result: specVersion }
          : { jsonrpc: '2.0', id, error: { code: -32601, message: `${method} is not stubbed` } },
    };
  }) as any;
}

describe('spec version resolution', () => {
  describe('RpcChannel.setUpSpecVersion', () => {
    test('resolves a pre-release node version to its release on the 0.10 channel', async () => {
      const channel = new RPC0103.RpcChannel({ nodeUrl, baseFetch: stubNode('0.10.3-rc.0') });

      await expect(channel.setUpSpecVersion()).resolves.toBe('0.10.3');
      expect(channel.readSpecVersion()).toBe('0.10.3');
    });

    test('resolves a pre-release node version to its release on the 0.9 channel', async () => {
      const channel = new RPC09.RpcChannel({ nodeUrl, baseFetch: stubNode('0.9.0-rc.1') });

      await expect(channel.setUpSpecVersion()).resolves.toBe('0.9.0');
    });

    test('leaves a release node version untouched', async () => {
      const channel = new RPC0103.RpcChannel({ nodeUrl, baseFetch: stubNode('0.10.2') });

      await expect(channel.setUpSpecVersion()).resolves.toBe('0.10.2');
    });

    test('still throws on a patch version the SDK does not support', async () => {
      const channel = new RPC0103.RpcChannel({ nodeUrl, baseFetch: stubNode('0.10.999-rc.0') });

      await expect(channel.setUpSpecVersion()).rejects.toThrow(LibraryError);
    });
  });

  describe('RpcChannel constructor', () => {
    test('normalizes a pre-release spec version provided by the caller', () => {
      const channel = new RPC0103.RpcChannel({ nodeUrl, specVersion: '0.10.3-rc.0' as any });

      expect(channel.readSpecVersion()).toBe('0.10.3');
    });
  });

  describe('RpcProvider.create', () => {
    test('does not warn when the node reports a pre-release of a supported spec version', async () => {
      const warn = jest.spyOn(logger, 'warn').mockImplementation(() => {});

      try {
        const provider = await RpcProvider.create({
          nodeUrl,
          baseFetch: stubNode('0.10.3-rc.0'),
        });

        expect(provider.readSpecVersion()).toBe('0.10.3');
        expect(warn).not.toHaveBeenCalled();
      } finally {
        warn.mockRestore();
      }
    });

    test('still warns when the node reports a spec version the SDK does not support', async () => {
      const warn = jest.spyOn(logger, 'warn').mockImplementation(() => {});

      try {
        await RpcProvider.create({ nodeUrl, baseFetch: stubNode('0.10.999') });

        expect(warn).toHaveBeenCalledWith('Using incompatible node spec version 0.10.999');
      } finally {
        warn.mockRestore();
      }
    });

    test('routes every 0.10 patch version to the same channel, reporting the node version', async () => {
      // spec versions actually reported by nodes in the wild, plus the newly released one
      const cases = [
        { reported: '0.10.2', resolved: '0.10.2' },
        { reported: '0.10.3-rc.0', resolved: '0.10.3' },
        { reported: '0.10.4', resolved: '0.10.4' },
      ];

      const providers = await Promise.all(
        cases.map(({ reported }) => RpcProvider.create({ nodeUrl, baseFetch: stubNode(reported) }))
      );

      // the channel is picked per generation, so every patch version must share the same one
      expect(new Set(providers.map((provider) => provider.channel.id)).size).toBe(1);

      providers.forEach((provider, index) => {
        expect(provider.readSpecVersion()).toBe(cases[index].resolved);
      });
    });

    test('routes a 0.9 node to another channel than a 0.10 node', async () => {
      const [node09, node010] = await Promise.all([
        RpcProvider.create({ nodeUrl, baseFetch: stubNode('0.9.0') }),
        RpcProvider.create({ nodeUrl, baseFetch: stubNode('0.10.4') }),
      ]);

      expect(node09.channel.id).not.toBe(node010.channel.id);
      expect(node09.readSpecVersion()).toBe('0.9.0');
    });
  });
});

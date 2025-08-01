import { Provider } from '../src';
import { SupportedRpcVersion } from '../src/global/constants';
import { getDefaultNodes, getSupportedRpcVersions } from '../src/utils/provider';

describe('unit tests', () => {
  describe('getDefaultNodes', () => {
    it('constructs correct URLs for all supported RPC versions', () => {
      const supportedVersions = getSupportedRpcVersions();
      supportedVersions.forEach((version) => {
        const rpcNodes = getDefaultNodes(version);
        const [major, minor] = version.replace(/^v/, '').split('.');
        const expectedEnding = `v${major}_${minor}`;
        Object.values(rpcNodes).forEach((networkNodes: any) => {
          networkNodes.forEach((nodeUrl: string) => {
            expect(nodeUrl.endsWith(expectedEnding)).toBe(true);
          });
        });
      });
    });
  });
  describe('getSupportedRpcVersions', () => {
    it('should return a non-empty array of strings', () => {
      const versions = getSupportedRpcVersions();
      expect(Array.isArray(versions)).toBe(true);
      expect(versions.length).toBeGreaterThan(0);
      versions.forEach((version) => {
        expect(typeof version).toBe('string');
      });
    });

    it('should return an array with unique values', () => {
      const versions = getSupportedRpcVersions();
      const uniqueVersions = [...new Set(versions)];
      expect(versions.length).toEqual(uniqueVersions.length);
    });
  });
});

describe('Default RPC Nodes', () => {
  test('All Default RPC Nodes support Spec Versions', async () => {
    const supportedVersions = getSupportedRpcVersions();
    const finalResult = await Promise.all(
      supportedVersions.map(async (rpcv) => {
        const rpcNodes = getDefaultNodes(rpcv as SupportedRpcVersion);

        const result = await Promise.all(
          Object.keys(rpcNodes).map(async (network: any) => {
            return Promise.all(
              rpcNodes[network as keyof typeof rpcNodes].map(async (it: any) => {
                const provider = new Provider({ nodeUrl: it });
                let version;
                try {
                  version = await provider.getSpecVersion();
                } catch (error) {
                  version = undefined;
                }

                return {
                  network,
                  nodeUrl: provider.channel.nodeUrl,
                  version,
                };
              })
            );
          })
        );
        // eslint-disable-next-line no-console
        console.table(result.flat());
        return result
          .flat()
          .map((it) => it.version)
          .includes(undefined);
      })
    );

    expect(finalResult.includes(true)).toBeFalsy();
  });
});

import { Provider } from '../src';
import { SupportedRpcVersion } from '../src/global/constants';
import { getDefaultNodes, getSupportedRpcVersions } from '../src/utils/provider';

describe('unit tests', () => {
  xdescribe('getDefaultNodes', () => {
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

// JSON-RPC error code returned by some public nodes (e.g. ZAN) when we exceed
// their per-second request quota. It is a transient rate-limit, not a lack of
// spec-version support, so it must not be counted as a node failure.
const RATE_LIMIT_ERROR_CODE = -32011;

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * A transient error is one worth retrying: a rate-limit, or a network timeout.
 * A node that genuinely does not support the spec version fails differently.
 */
function isTransientError(error: any): boolean {
  if (error?.code === RATE_LIMIT_ERROR_CODE) return true;
  const name = String(error?.name ?? '');
  const message = String(error?.message ?? '').toLowerCase();
  return name === 'AbortError' || message.includes('timeout') || message.includes('fetch failed');
}

/**
 * Resolve the spec version of a node, retrying on transient errors with
 * exponential backoff. Returns:
 *  - the version string on success,
 *  - `'rate-limited'` if every attempt was rejected by a rate-limit,
 *  - `undefined` for any genuine failure (unsupported spec, malformed response...).
 */
async function getSpecVersionWithRetry(
  provider: InstanceType<typeof Provider>,
  nodeUrl: string,
  retries = 3
): Promise<string | undefined> {
  let lastError: any;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      return await provider.getSpecVersion();
    } catch (error) {
      lastError = error;
      if (!isTransientError(error) || attempt === retries) break;
      // eslint-disable-next-line no-await-in-loop
      await sleep(500 * 2 ** attempt); // 500ms, 1s, 2s
    }
  }

  if (lastError?.code === RATE_LIMIT_ERROR_CODE) {
    // eslint-disable-next-line no-console
    console.warn(`[defaultNodes] SKIP ${nodeUrl} | rate-limited after ${retries + 1} attempts`);
    return 'rate-limited';
  }
  // eslint-disable-next-line no-console
  console.error(
    `[defaultNodes] FAIL ${nodeUrl} | err=${lastError?.name}: ${lastError?.message} (code=${lastError?.code})`
  );
  return undefined;
}

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
                const version = await getSpecVersionWithRetry(provider, it);

                return {
                  network,
                  nodeUrl: provider.channel.nodeUrl,
                  version,
                };
              })
            );
          })
        );
        return result
          .flat()
          .map((it) => it.version)
          .includes(undefined);
      })
    );

    expect(finalResult.includes(true)).toBeFalsy();
  });
});

import { readdirSync, readFileSync } from 'node:fs';
import type { Config } from 'jest';

/**
 * One `npm test`, four categories, and **nothing but the available URLs decides what runs**.
 *
 * | Category      | Files                                | Runs when            |
 * | ------------- | ------------------------------------ | -------------------- |
 * | `unit`        | tests that never build a provider    | always               |
 * | `node-http`   | tests that do, over HTTP             | an HTTP url resolves |
 * | `node-ws`     | the same files, over a WebSocket     | a WS url resolves    |
 * | `ws-specific` | `*.ws.test.ts`, needing a live socket| a WS url resolves    |
 *
 * So a node-touching test runs once per available transport, and a pure unit test runs once
 * regardless. A category whose url is missing is simply not declared — an absent project rather
 * than a file full of skipped tests.
 */

/** Which files touch a node, derived rather than listed.
 *
 * The two sets do not align with the directory tree: of ~97 test files, 22 build a provider and 75
 * do not, spread across both `__tests__/` and `__tests__/utils/`. A glob would need a dozen
 * exceptions, and a hand-kept list would rot silently as tests are added, so the set is computed
 * from what each file actually calls.
 */
const NODE_FACTORY = /createTestProvider|getTestAccount|getTestProvider/;

/* Default devnet config, mirroring `__tests__/config/constants.ts`. Duplicated on purpose: this
 * file is evaluated before any module resolution the test config would need, and importing the
 * test helpers here would pull `src` into config loading. */
const DEVNET_RPC_URL = 'http://127.0.0.1:5050/';

/**
 * Is the node at `rpcUrl` a devnet?
 *
 * Asked of the **configured** url, never inferred from the absence of one: CI hands devnet's url
 * in explicitly, so keying off "nothing was provided" classified the CI devnet job as a public
 * node and let the batch suite run over a socket that refuses batches.
 *
 * `devnet_getPredeployedAccounts` is the question, not `starknet_syncing`: every node answers the
 * latter, so it proves a node is there and nothing more. A real node answers this one with
 * `-32601 Method not found`.
 *
 * The config is evaluated **before** `globalSetup`, so the WebSocket url a devnet run derives
 * there does not exist yet, and the projects have to be declared now — hence the probe here.
 */
const isDevnetNode = async (rpcUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'devnet_getPredeployedAccounts' }),
      signal: AbortSignal.timeout(2000),
    });
    const body = (await response.json()) as { result?: unknown };
    return Array.isArray(body?.result);
  } catch {
    return false;
  }
};

/** `http://host:5050/rpc` → `ws://host:5050/ws`, devnet's dedicated socket path. */
const devnetWsUrlFor = (rpcUrl: string): string =>
  `${rpcUrl.replace(/^http/, 'ws').replace(/\/[^/]*$/, '')}/ws`;

const testFilesUnder = (dir: string): string[] =>
  readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((name) => name.endsWith('.test.ts'))
    .map((name) => `${dir}/${name}`)
    .sort();

export default async (): Promise<Config> => {
  const all = testFilesUnder('__tests__');
  const wsSpecific = all.filter((file) => file.endsWith('.ws.test.ts'));
  const nodeTouching = all.filter(
    (file) => !file.endsWith('.ws.test.ts') && NODE_FACTORY.test(readFileSync(file, 'utf8'))
  );
  const unit = all.filter((file) => !wsSpecific.includes(file) && !nodeTouching.includes(file));

  // Whatever the caller pointed at, falling back to the local devnet the way `strategyResolver`
  // does. Asking the node itself is what makes this hold in CI, which supplies the url.
  const rpcUrl = process.env.TEST_RPC_URL || DEVNET_RPC_URL;
  const isDevnet = await isDevnetNode(rpcUrl);
  if (isDevnet) {
    // Derived from the rpc url rather than hardcoded, so a devnet reached at another host still
    // gets its own socket. Only fills a gap — an explicit TEST_WS_URL always wins.
    process.env.TEST_WS_URL ??= devnetWsUrlFor(rpcUrl);
  }
  const hasWs = !!process.env.TEST_WS_URL;

  /**
   * The one file the WebSocket run cannot carry, and only against devnet.
   *
   * devnet answers `-32700 Parse error` to a JSON-RPC batch on its `/ws` endpoint — measured
   * 2026-08-10 — and the refusal carries `id: null`, so it belongs to no request and every call in
   * the batch runs out its timeout instead of failing fast. Pathfinder accepts the same batch over
   * the same kind of socket, so this is a devnet limitation, not a transport one: the exclusion is
   * conditional, and disappears on any node that implements §6 of JSON-RPC 2.0.
   */
  const overWebSocket = nodeTouching.filter(
    (file) => !(isDevnet && file.endsWith('utils/batch.test.ts'))
  );

  const toMatch = (files: string[]) => files.map((file) => `<rootDir>/${file}`);

  const shared = {
    snapshotFormat: { escapeString: true, printBasicPrototype: true },
    setupFilesAfterEnv: ['<rootDir>/__tests__/config/jest.setup.ts'],
    sandboxInjectedGlobals: ['Math'],
    transform: { '^.+\\.(t|j)sx?$': '@swc/jest' },
  } satisfies Partial<Config>;

  return {
    // Runs once for every project, and its `process.env` mutations reach all of them.
    globalSetup: './__tests__/config/jestGlobalSetup.ts',
    projects: [
      { ...shared, displayName: 'unit', testMatch: toMatch(unit) },
      {
        ...shared,
        displayName: 'node-http',
        testMatch: toMatch(nodeTouching),
        setupFiles: ['<rootDir>/__tests__/config/projects/http.ts'],
      },
      ...(hasWs
        ? [
            {
              ...shared,
              displayName: 'node-ws',
              testMatch: toMatch(overWebSocket),
              setupFiles: ['<rootDir>/__tests__/config/projects/ws.ts'],
            },
            {
              ...shared,
              displayName: 'ws-specific',
              testMatch: toMatch(wsSpecific),
              // HTTP on purpose. These files open and own their WebSocket explicitly; what the
              // factories give them is the *account* provider, which drives transactions before a
              // subscription can observe anything. Handing that one a socket too would add a
              // second connection per file and change what the suite exercises, for no gain.
              setupFiles: ['<rootDir>/__tests__/config/projects/http.ts'],
            },
          ]
        : []),
    ],
  } as Config;
};

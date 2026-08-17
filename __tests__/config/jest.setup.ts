/**
 * Test Setup
 * Run before each test
 * ref: order of execution jestGlobalSetup.ts -> jest.setup.ts -> fixtures.ts
 */

import 'isomorphic-fetch';

/* eslint-disable no-console */
import { register } from 'fetch-intercept';

import customMatchers from './customMatchers';

beforeAll(() => {
  expect.extend(customMatchers);
});

// Releases the file's WebSocket. An open socket is a live libuv handle, and nothing else can reach
// it once the test file's module registry is gone, so without this a `node-ws` run never exits.
//
// The import is deferred, and skipped entirely off the WebSocket categories. Importing the test
// factories here would pull the whole `src` barrel into setup — before a test file's `jest.mock`
// calls are registered — so the real modules would already be cached and every mock in that file
// would silently target a different instance. `defaultPaymaster.test.ts` mocks
// `src/utils/paymaster`, and that is exactly how it broke.
afterAll(async () => {
  if (process.env.TEST_TRANSPORT !== 'ws') return;
  const { closeTestTransports } = await import('./helpers/testInstances');
  await closeTestTransports();
});

const util = require('util');

jest.setTimeout(5 * 60 * 1000);

const combiner: object[] = [];

if (process.env.DEBUG === 'true') {
  register({
    request(url, config) {
      const randId = crypto.randomUUID();
      if (config.body) {
        const body = JSON.parse(config.body);
        combiner.push({
          request: {
            matchId: randId,
            url,
            method: config.method,
            body,
          },
        });

        // match request and response when DEBUG, lib override headers instead of add
        const headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-match-id': randId,
        };
        // eslint-disable-next-line no-param-reassign
        config.headers = headers;
      }
      return [url, config];
    },

    requestError(error) {
      // unknown original request
      console.log('[fetch.requestError]', error);
      return Promise.reject(error);
    },

    response(response) {
      const requestId = response.request.headers.get('x-match-id');
      const cloned = response.clone();
      cloned.json().then((res) => {
        const { result } = res;
        const match: any = combiner.find((it: any) => it.request.matchId === requestId);
        if (match && 'request' in match) {
          if (result) match.result = result;
          else match.response = res;

          console.log(util.inspect(match, false, null, true /* enable colors */));
        } else {
          console.log(result);
        }
      });
      return response;
    },

    responseError(error) {
      // unknown original request
      console.log('[fetch.responseError]', error);
      return Promise.reject(error);
    },
  });
}

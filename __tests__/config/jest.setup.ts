/**
 * Test Setup
 * Run before each test
 * ref: order of execution jestGlobalSetup.ts -> jest.setup.ts -> fixtures.ts
 */

import 'isomorphic-fetch';

import { register } from 'fetch-intercept';

const util = require('util');

jest.setTimeout(50 * 60 * 1000);

const combiner: object[] = [];

if (process.env.DEBUG === 'true') {
  register({
    request(url, config) {
      const body = JSON.parse(config.body);
      combiner.push({
        request: {
          url,
          method: config.method,
          body,
        },
      });
      return [url, config];
    },

    requestError(error) {
      const match: any = combiner.find((it: any) => typeof it.result === 'undefined');
      match.result = error;
      // eslint-disable-next-line no-console
      console.log('[fetch.requestError]', match);
      return Promise.reject(error);
    },

    response(response) {
      const cloned = response.clone();
      cloned.json().then((res) => {
        const { result } = res;
        const match: any = combiner.find((it: any) => it.request.body.id === res.id);
        if (match && 'request' in match) {
          match.result = result;
          // eslint-disable-next-line no-console
          console.log(util.inspect(match, false, null, true /* enable colors */));
        } else {
          // eslint-disable-next-line no-console
          console.log(result);
        }
      });
      return response;
    },

    responseError(error) {
      const match: any = combiner.find((it: any) => typeof it.result === 'undefined');
      match.result = error;
      // eslint-disable-next-line no-console
      console.log('[fetch.responseError]', match);
      return Promise.reject(error);
    },
  });
}

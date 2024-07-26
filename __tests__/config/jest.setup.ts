/**
 * Test Setup
 * Run before each test
 * ref: order of execution jestGlobalSetup.ts -> jest.setup.ts -> fixtures.ts
 */

import 'isomorphic-fetch';

/* eslint-disable no-console */
import { register } from 'fetch-intercept';

const util = require('util');

jest.setTimeout(50 * 60 * 1000);

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

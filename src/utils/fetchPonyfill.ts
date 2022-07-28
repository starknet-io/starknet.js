/* eslint-disable global-require, import/no-mutable-exports */
let fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

if (typeof window !== 'undefined') {
  // use buildin fetch in browser if available
  fetch = window.fetch;
} else if (typeof global !== 'undefined') {
  // use buildin fetch in node, react-native and service worker if available
  fetch = global.fetch;
} else {
  // ponyfill fetch in node and browsers that don't have it
  fetch = require('isomorphic-fetch');
}

export default fetch;

// the ts-ignore suppresses an esm to cjs import error that is resolved with entry point resolution
// @ts-ignore
import makeFetchCookie from 'fetch-cookie';
import isomorphicFetch from 'isomorphic-fetch';

export default (typeof window !== 'undefined' && window.fetch) || // use buildin fetch in browser if available
  (typeof global !== 'undefined' && makeFetchCookie(global.fetch)) || // use buildin fetch in node, react-native and service worker if available
  isomorphicFetch; // ponyfill fetch in node and browsers that don't have it

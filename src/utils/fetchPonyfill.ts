// the ts-ignore suppresses an esm to cjs import error that is resolved with entry point resolution
// @ts-ignore
import makeFetchCookie from 'fetch-cookie';
import isomorphicFetch from 'isomorphic-fetch';
import { IS_BROWSER } from './encode';
import { isUndefined } from './typed';

export default (IS_BROWSER && window.fetch) || // use built-in fetch in browser if available
  (!isUndefined(global) && makeFetchCookie(global.fetch)) || // use built-in fetch in node, react-native and service worker if available
  isomorphicFetch; // ponyfill fetch in node and browsers that don't have it

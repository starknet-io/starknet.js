/* eslint-disable global-require */

function getFetch() {
  if (typeof window !== 'undefined') {
    // use buildin fetch in browser if available
    return window.fetch;
  }
  if (typeof global !== 'undefined') {
    // use buildin fetch in node, react-native and service worker if available
    return global.fetch;
  }
  // ponyfill fetch in node and browsers that don't have it
  return require('isomorphic-fetch');
}

const fetch = getFetch();

export default fetch;

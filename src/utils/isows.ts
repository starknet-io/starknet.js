/**
 * Isomorphic WebSocket implementation for Node.js, Bun, Deno, and modern browsers.
 *
 * https://github.com/wevm/isows
 */

import * as WebSocket_ from 'ws';

const WebSocketIso = (() => {
  try {
    if (typeof WebSocket !== 'undefined') return WebSocket;
    if (typeof global.WebSocket !== 'undefined') return global.WebSocket;
    if (typeof window.WebSocket !== 'undefined') return window.WebSocket;
    // eslint-disable-next-line no-restricted-globals
    if (typeof self.WebSocket !== 'undefined') return self.WebSocket;
    throw new Error('`WebSocket` is not supported in this environment');
  } catch {
    if (WebSocket_.WebSocket) return WebSocket_.WebSocket;
    return WebSocket_;
  }
})();

export { WebSocketIso as WebSocket };

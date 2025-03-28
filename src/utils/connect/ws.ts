import { LibraryError } from '../errors';

export default (typeof WebSocket !== 'undefined' && WebSocket) ||
  (typeof window !== 'undefined' && window.WebSocket) ||
  (typeof global !== 'undefined' && global.WebSocket) ||
  (class {
    constructor() {
      throw new LibraryError(
        "WebSocket module not detected, use the 'websocket' constructor parameter to set a compatible connection"
      );
    }
  } as unknown as typeof WebSocket);

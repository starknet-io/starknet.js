import { LibraryError } from '../errors';

export default (typeof fetch !== 'undefined' && fetch) ||
  (typeof globalThis !== 'undefined' && globalThis.fetch) ||
  (typeof window !== 'undefined' && window.fetch.bind(window)) ||
  (typeof global !== 'undefined' && global.fetch) ||
  ((() => {
    throw new LibraryError(
      "'fetch()' not detected, use the 'baseFetch' constructor parameter to set it"
    );
  }) as WindowOrWorkerGlobalScope['fetch']);

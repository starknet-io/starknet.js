import { LibraryError } from '../errors';

export default (typeof globalThis !== 'undefined' && globalThis.fetch.bind(globalThis)) ||
  (typeof window !== 'undefined' && window.fetch.bind(window)) ||
  (typeof global !== 'undefined' && global.fetch.bind(global)) ||
  ((() => {
    throw new LibraryError(
      "'fetch()' not detected, use the 'baseFetch' constructor parameter to set it"
    );
  }) as WindowOrWorkerGlobalScope['fetch']);

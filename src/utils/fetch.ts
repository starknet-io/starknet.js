import { IS_BROWSER } from './encode';
import { LibraryError } from './errors';
import { isUndefined } from './typed';

export default (IS_BROWSER && window.fetch.bind(window)) || // use built-in fetch in browser if available
  (!isUndefined(global) && global.fetch) || // use built-in fetch in node, react-native and service worker if available
  // throw with instructions when no fetch is detected
  ((() => {
    throw new LibraryError(
      "'fetch()' not detected, use the 'baseFetch' constructor parameter to set it"
    );
  }) as WindowOrWorkerGlobalScope['fetch']);

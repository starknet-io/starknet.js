import { LibraryError } from '../errors';
import { config } from '../../global/config';

export default config.get('buffer') ||
  (typeof Buffer !== 'undefined' && Buffer) ||
  (typeof globalThis !== 'undefined' && globalThis.Buffer) ||
  (typeof window !== 'undefined' && (window as any).Buffer) ||
  (typeof global !== 'undefined' && global.Buffer) ||
  (class {
    constructor() {
      throw new LibraryError(
        'Buffer not detected, use \'config.set("buffer", YourBufferPolyfill)\' or polyfill or Node.js environment for Buffer support'
      );
    }

    static from(_data: any): Uint8Array {
      throw new LibraryError(
        'Buffer not detected, use \'config.set("buffer", YourBufferPolyfill)\' or polyfill or Node.js environment for Buffer support'
      );
    }

    static isBuffer(obj: any): obj is Buffer {
      const BufferImpl = config.get('buffer') || (typeof Buffer !== 'undefined' && Buffer);
      return BufferImpl && BufferImpl.isBuffer && BufferImpl.isBuffer(obj);
    }
  } as unknown as typeof Buffer);

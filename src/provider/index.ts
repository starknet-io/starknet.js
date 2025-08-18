import { RpcProvider } from './rpc';

export { RpcProvider as Provider } from './extensions/default'; // backward-compatibility
export { LibraryError, RpcError } from '../utils/errors';
export * from './interface';
export * from './extensions/default';
export * from './modules';

export const defaultProvider = new RpcProvider({ default: true });

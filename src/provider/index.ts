import { RpcProvider } from './rpc';

export { RpcProvider as Provider } from './rpc'; // backward-compatibility
export { LibraryError, RpcError } from '../utils/errors';
export * from './interface';
export * from './rpc';
export * from './modules';

export const defaultProvider = new RpcProvider({ default: true });

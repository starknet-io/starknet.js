import { RpcProvider } from './rpc';

export { RpcProvider as Provider } from './extensions/default'; // backward-compatibility
export { LibraryError, RpcError, starknetError, GatewayError } from '../utils/errors';
export * from './interface';
export * from './extensions/default';

export const defaultProvider = new RpcProvider({ default: true });

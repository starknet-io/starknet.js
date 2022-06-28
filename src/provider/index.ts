import { Provider } from './default';

export * from './default';
export { GatewayError } from './utils';
export * from './interface';
export * from './rpcProvider';

export const defaultProvider = new Provider();

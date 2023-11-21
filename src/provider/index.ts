import { Provider } from './default';

export * from './default';
export * from './errors';
export * from './interface';
export * from './extensions/default';

export const defaultProvider = new Provider({ rpc: { default: true } });

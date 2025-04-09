import { PaymasterRpc } from './rpc';

export * from './rpc';
export * from './interface';

export const defaultPaymaster = new PaymasterRpc({ default: true });

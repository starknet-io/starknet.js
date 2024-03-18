import { RpcMessage, StarknetWindowObject } from './getst/main';

// ---- TT Request Handler
export type RpcCall = Omit<RpcMessage, 'result'>;

// -- TT Better naming
// This is provider object expected by WalletAccount to communicate with wallet
export interface StarknetWalletProvider extends StarknetWindowObject {}

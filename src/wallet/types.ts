import { type RpcMessage, type StarknetWindowObject } from 'get-starknet-core';

// ---- TT Request Handler
export type RpcCall = Omit<RpcMessage, 'result'>;

// This is provider object expected by WalletAccount to communicate with wallet
export interface StarknetWalletProvider extends StarknetWindowObject {}

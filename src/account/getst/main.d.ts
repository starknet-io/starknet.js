import type { GetStarknetOptions, GetStarknetResult } from './types';

export type { StarknetWindowObject } from './StarknetWindowObject';
export type {
  AddDeclareTransactionParameters,
  AddDeclareTransactionResult,
  AddDeployAccountTransactionParameters,
  AddDeployAccountTransactionResult,
  AddInvokeTransactionParameters,
  AddInvokeTransactionResult,
  AddStarknetChainParameters,
  RequestAccountsParameters,
  StarknetChainId,
  SwitchStarknetChainParameters,
  GetDeploymentDataResult,
  WatchAssetParameters,
  TypedData,
  RequestFn,
  RpcMessage,
  IsParamsOptional,
  RpcTypeToMessageMap,
  RequestFnCall,
} from './rpcMessage';
export type {
  WalletEvents,
  AccountChangeEventHandler,
  NetworkChangeEventHandler,
  WalletEventHandlers,
} from './walletEvents';
export { Permission } from './rpcMessage';
export type {
  DisconnectOptions,
  GetStarknetOptions,
  GetStarknetResult,
  GetWalletOptions,
  WalletProvider,
} from './types';
export declare function getStarknet(options?: Partial<GetStarknetOptions>): GetStarknetResult;
declare const ddefault: GetStarknetResult;
export default ddefault;

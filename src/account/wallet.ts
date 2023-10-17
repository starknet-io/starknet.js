import {
  AccountChangeEventHandler,
  AddDeclareTransactionResult,
  AddDeployAccountTransactionResult,
  AddInvokeTransactionResult,
  AddStarknetChainParameters,
  ConnectedStarknetWindowObject,
  NetworkChangeEventHandler,
  RpcMessage,
  WatchAssetParameters,
} from 'get-starknet-core';

import { StarknetChainId } from '../constants';
// eslint-disable-next-line import/no-cycle
import {
  AllowArray,
  ArraySignatureType,
  Call,
  CallData,
  CompiledSierra,
  DeclareContractPayload,
  DeployAccountContractPayload,
  MultiDeployContractResponse,
  TypedData,
  UniversalDeployerContractPayload,
  extractContractHashes,
  json,
} from '..';

// ---- TT Request Handler
type RpcCall = Omit<RpcMessage, 'result'>;

// -- TT Better naming
// This is provider object expected by WalletAccount to communicate with wallet
interface StarknetWalletProvider extends ConnectedStarknetWindowObject {}

// Represent 'Selected Active' Account inside Connected Wallet
export class WalletAccount /* implements AccountInterface  */ {
  public address: string;

  public provider: StarknetWalletProvider;

  constructor(provider: StarknetWalletProvider) {
    if (!provider.isConnected) throw Error('StarknetWalletProvider should be connected');
    this.provider = provider;
    this.address = provider.selectedAddress;

    this.provider.on('accountsChanged', () => {
      this.address = provider.selectedAddress;
    });
  }

  /**
   * WALLET EVENTS
   */
  public onAccountChange(callback: AccountChangeEventHandler) {
    this.provider.on('accountsChanged', callback);
  }

  public onNetworkChanged(callback: NetworkChangeEventHandler) {
    this.provider.on('networkChanged', callback);
  }

  /**
   * WALLET SPECIFIC METHODS
   */

  /**
   * Request Permission for wallet account, return addresses that's allowed by user
   * @param silentMode false: request user interaction allowance. true: return only pre-allowed
   * @returns allowed accounts addresses
   */
  public requestAccounts(silentMode = false) {
    const rpcCall: RpcCall = {
      type: 'wallet_requestAccounts',
      params: {
        silentMode,
      },
    };
    return this.provider.request(rpcCall) as Promise<string[]>;
  }

  /**
   * Request Wallet Network change
   * @param chainId StarknetChainId
   * @returns boolean
   */
  public switchStarknetChain(chainId: StarknetChainId) {
    const rpcCall: RpcCall = {
      type: 'wallet_switchStarknetChain',
      params: {
        chainId,
      },
    };
    return this.provider.request(rpcCall) as Promise<boolean>;
  }

  /**
   * Request adding ERC20 Token to Wallet List
   * @param asset WatchAssetParameters
   * @returns boolean
   */
  public watchAsset(asset: WatchAssetParameters) {
    const rpcCall: RpcCall = {
      type: 'wallet_watchAsset',
      params: asset,
    };
    return this.provider.request(rpcCall) as Promise<boolean>;
  }

  /**
   * Request adding custom Starknet chain
   * @param chain AddStarknetChainParameters
   * @returns boolean
   */
  public addStarknetChain(chain: AddStarknetChainParameters) {
    // Can this set custom RPC endpoint ?
    const rpcCall: RpcCall = {
      type: 'wallet_addStarknetChain',
      params: chain,
    };
    return this.provider.request(rpcCall) as Promise<boolean>;
  }

  /**
   * ACCOUNT METHODS
   */

  public async execute(calls: AllowArray<Call>) {
    const rpcCall: RpcCall = {
      type: 'starknet_addInvokeTransaction',
      params: {
        calls: [].concat(calls as any),
      },
    };
    return this.provider.request(rpcCall) as Promise<AddInvokeTransactionResult>;
  }

  public async declare(payload: DeclareContractPayload) {
    const declareContractPayload = extractContractHashes(payload);

    // DISCUSS: HOTFIX: Adapt Abi format
    const pContract = payload.contract as CompiledSierra;
    const cairo1Contract = {
      ...pContract,
      abi: json.stringify(pContract.abi),
    };

    const rpcCall: RpcCall = {
      type: 'starknet_addDeclareTransaction',
      params: {
        compiled_class_hash: declareContractPayload.compiledClassHash,
        contract_class: cairo1Contract,
      },
    };
    return this.provider.request(rpcCall) as Promise<AddDeclareTransactionResult>;
  }

  public async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Promise<MultiDeployContractResponse> {
    // TODO: Create UDC PRocedure using invoke()
    return new Promise((e) => false);
  }

  public async deployAccount(payload: DeployAccountContractPayload) {
    const rpcCall: RpcCall = {
      type: 'starknet_addDeployAccountTransaction',
      params: {
        contract_address_salt: payload.addressSalt?.toString(),
        constructor_calldata: CallData.compile(payload.constructorCalldata),
        class_hash: payload.classHash,
      },
    };
    return this.provider.request(rpcCall) as Promise<AddDeployAccountTransactionResult>;
  }

  public async signMessage(typedData: TypedData) {
    const rpcCall: RpcCall = {
      type: 'starknet_signTypedData',
      params: typedData,
    };
    return this.provider.request(rpcCall) as Promise<ArraySignatureType>;
  }

  // MISSING ESTIMATES
}

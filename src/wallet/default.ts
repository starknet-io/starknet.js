import { Account, AccountInterface } from '../account';
import {
  AccountChangeEventHandler,
  AddDeclareTransactionResult,
  AddDeployAccountTransactionResult,
  AddInvokeTransactionResult,
  AddStarknetChainParameters,
  NetworkChangeEventHandler,
  Permission,
  RpcMessage,
  StarknetWindowObject,
  WatchAssetParameters,
} from '../account/getst/main';
import { StarknetChainId } from '../constants';
import { ProviderInterface } from '../provider';
import {
  AllowArray,
  ArraySignatureType,
  CairoVersion,
  Call,
  CompiledSierra,
  DeclareContractPayload,
  DeployAccountContractPayload,
  MultiDeployContractResponse,
  ProviderOptions,
  TypedData,
  UniversalDeployerContractPayload,
} from '../types';
import { CallData } from '../utils/calldata';
import { extractContractHashes } from '../utils/contract';
import { stringify } from '../utils/json';
import { buildUDCCall } from '../utils/transaction';

// ---- TT Request Handler
type RpcCall = Omit<RpcMessage, 'result'>;

// -- TT Better naming
// This is provider object expected by WalletAccount to communicate with wallet
interface StarknetWalletProvider extends StarknetWindowObject {}

// Represent 'Selected Active' Account inside Connected Wallet
export class WalletAccount extends Account implements AccountInterface {
  public address: string = '';

  public walletProvider: StarknetWalletProvider;

  constructor(
    providerOrOptions: ProviderOptions | ProviderInterface,
    walletProvider: StarknetWalletProvider,
    cairoVersion?: CairoVersion
  ) {
    super(providerOrOptions, '', '', cairoVersion); // At this point unknown address
    this.walletProvider = walletProvider;

    // Address change Event Listeners
    this.walletProvider.on('accountsChanged', (res) => {
      if (!res) return;
      this.address = res[0].toLowerCase();
      console.log('Setting new address', res[0].toLowerCase());
    });

    // Network change Event Listeners
    this.walletProvider.on('networkChanged', (res) => {
      if (!res) return;
      console.log('Setting new network', res.toLowerCase());
      throw Error('WalletAccount doest support switching chains');
    });

    // Get and Set Address !!! Post constructor initial it is ''
    walletProvider
      .request({
        type: 'wallet_requestAccounts',
        params: {
          silentMode: false,
        },
      })
      .then((res) => {
        this.address = res[0].toLowerCase();
      });
  }

  /**
   * WALLET EVENTS
   */
  public onAccountChange(callback: AccountChangeEventHandler) {
    this.walletProvider.on('accountsChanged', callback);
  }

  public onNetworkChanged(callback: NetworkChangeEventHandler) {
    this.walletProvider.on('networkChanged', callback);
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
    return this.walletProvider.request(rpcCall) as Promise<string[]>;
  }

  /**
   * Request Permission for wallet account
   * @returns allowed accounts addresses
   */
  public getPermissions() {
    const rpcCall: RpcCall = {
      type: 'wallet_getPermissions',
    };
    return this.walletProvider.request(rpcCall) as Promise<Permission[]>;
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
    return this.walletProvider.request(rpcCall) as Promise<boolean>;
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
    return this.walletProvider.request(rpcCall) as Promise<boolean>;
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
    return this.walletProvider.request(rpcCall) as Promise<boolean>;
  }

  /**
   * ACCOUNT METHODS
   */
  override execute(calls: AllowArray<Call>) {
    const txCalls = [].concat(calls as any).map((it) => {
      const { contractAddress, entrypoint, calldata } = it;
      return {
        contract_address: contractAddress,
        entrypoint,
        calldata,
      };
    });

    const rpcCall: RpcCall = {
      type: 'starknet_addInvokeTransaction',
      params: {
        calls: txCalls,
      },
    };
    return this.walletProvider.request(rpcCall) as Promise<AddInvokeTransactionResult>;
  }

  override declare(payload: DeclareContractPayload) {
    const declareContractPayload = extractContractHashes(payload);

    // DISCUSS: HOTFIX: Adapt Abi format
    const pContract = payload.contract as CompiledSierra;
    const cairo1Contract = {
      ...pContract,
      abi: stringify(pContract.abi),
    };

    // Check FIx
    if (!declareContractPayload.compiledClassHash) {
      throw Error('compiledClassHash is required');
    }

    const rpcCall: RpcCall = {
      type: 'starknet_addDeclareTransaction',
      params: {
        compiled_class_hash: declareContractPayload.compiledClassHash,
        contract_class: cairo1Contract,
      },
    };
    return this.walletProvider.request(rpcCall) as Promise<AddDeclareTransactionResult>;
  }

  override async deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Promise<MultiDeployContractResponse> {
    const { calls, addresses } = buildUDCCall(payload, this.address);
    const invokeResponse = await this.execute(calls);

    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }

  override deployAccount(payload: DeployAccountContractPayload) {
    const rpcCall: RpcCall = {
      type: 'starknet_addDeployAccountTransaction',
      params: {
        contract_address_salt: payload.addressSalt?.toString() || '0',
        constructor_calldata: payload.constructorCalldata
          ? CallData.compile(payload.constructorCalldata)
          : [],
        class_hash: payload.classHash,
      },
    };
    return this.walletProvider.request(rpcCall) as Promise<AddDeployAccountTransactionResult>;
  }

  override signMessage(typedData: TypedData) {
    const rpcCall: RpcCall = {
      type: 'starknet_signTypedData',
      params: typedData,
    };
    return this.walletProvider.request(rpcCall) as Promise<ArraySignatureType>;
  }

  // MISSING ESTIMATES
}

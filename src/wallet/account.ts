import { Account, AccountInterface } from '../account';
import { StarknetChainId } from '../constants';
import { ProviderInterface } from '../provider';
import {
  AllowArray,
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
import {
  addDeclareTransaction,
  addDeployAccountTransaction,
  addInvokeTransaction,
  addStarknetChain,
  getPermissions,
  onAccountChange,
  onNetworkChanged,
  requestAccounts,
  signMessage,
  switchStarknetChain,
  watchAsset,
} from './connect';
import {
  AccountChangeEventHandler,
  AddStarknetChainParameters,
  NetworkChangeEventHandler,
  WatchAssetParameters,
} from './getst/main';
import { StarknetWalletProvider } from './types';

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

    // Update Address on change
    this.walletProvider.on('accountsChanged', (res) => {
      if (!res) return;
      this.address = res[0].toLowerCase();
    });

    // Update Channel chainId on Network change
    this.walletProvider.on('networkChanged', (res) => {
      if (!res) return;
      // Determine is it better to set chainId or replace channel with new one
      // At the moment channel is stateless but it could change
      this.channel.setChainId(res as StarknetChainId);
    });

    // Get and Set Address !!! Post constructor initial empty string
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
   * Registers a callback function to be executed when the account changes.
   *
   * @param {AccountChangeEventHandler} callback - The callback function to be executed.
   */
  public onAccountChange(callback: AccountChangeEventHandler) {
    onAccountChange(this.walletProvider, callback);
  }

  /**
   * Sets a callback function to be executed when the network changes.
   *
   * @param {NetworkChangeEventHandler} callback - The callback function to be executed when the network changes.
   * @return {void}
   */
  public onNetworkChanged(callback: NetworkChangeEventHandler): void {
    onNetworkChanged(this.walletProvider, callback);
  }

  /**
   * Requests accounts from the wallet provider.
   * @param {boolean} silentMode - Determines whether to display warnings/errors in the console. Defaults to false.
   * @return - A promise that resolves with the requested accounts.
   */
  public requestAccounts(silentMode = false) {
    return requestAccounts(this.walletProvider, silentMode);
  }

  /**
   * Retrieves the permissions from the wallet provider.
   *
   * @returns - The permissions obtained from the wallet provider.
   */
  public getPermissions() {
    return getPermissions(this.walletProvider);
  }

  /**
   * Switches the Starknet chain for the current wallet provider.
   *
   * @param {StarknetChainId} chainId - The ID of the Starknet chain to switch to.
   * @return
   */
  public switchStarknetChain(chainId: StarknetChainId) {
    return switchStarknetChain(this.walletProvider, chainId);
  }

  /**
   * Watches an asset by calling the watchAsset method.
   *
   * @param {WatchAssetParameters} asset - The asset to be watched.
   *
   * @return - The result of the watchAsset method.
   */
  public watchAsset(asset: WatchAssetParameters) {
    return watchAsset(this.walletProvider, asset);
  }

  /**
   * Adds a new Starknet chain.
   *
   * @param {AddStarknetChainParameters} chain - The parameters for the Starknet chain to be added.
   * @return - A promise that resolves when the Starknet chain has been added successfully.
   */
  public addStarknetChain(chain: AddStarknetChainParameters) {
    return addStarknetChain(this.walletProvider, chain);
  }

  /**
   * Executes a batch of calls on a smart contract.
   *
   * @param {AllowArray<Call>} calls - The array of calls to execute on the smart contract.
   * @returns - A promise that resolves with the result of the execution.
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

    const params = {
      calls: txCalls,
    };

    return addInvokeTransaction(this.walletProvider, params);
  }

  /**
   * Overrides the declare method.
   *
   * @param {DeclareContractPayload} payload - The payload for declaring a contract.
   * @return {Promise<Transaction>} - A promise that resolves with the transaction object.
   * @throws {Error} - Throws an error if compiledClassHash is missing.
   */
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

    const params = {
      compiled_class_hash: declareContractPayload.compiledClassHash,
      contract_class: cairo1Contract,
    };

    return addDeclareTransaction(this.walletProvider, params);
  }

  /**
   * Deploys a contract or multiple contracts using the UniversalDeployer.
   *
   * @param {UniversalDeployerContractPayload | UniversalDeployerContractPayload[]} payload - The contract payload(s) to be deployed.
   * @return {Promise<MultiDeployContractResponse>} - The response object containing the result of the deployment.
   */
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

  /**
   * Deploys an account for a contract.
   *
   * @param {DeployAccountContractPayload} payload - The payload containing the necessary data for deployment.
   * @param {string} payload.addressSalt - Optional. The address salt for the contract. Defaults to '0'.
   * @param {string} payload.constructorCalldata - The constructor calldata for the contract.
   * @param {string} payload.classHash - The class hash of the contract.
   *
   * @return - A promise that resolves when the account deployment is complete.
   */
  override deployAccount(payload: DeployAccountContractPayload) {
    const params = {
      contract_address_salt: payload.addressSalt?.toString() || '0',
      constructor_calldata: payload.constructorCalldata
        ? CallData.compile(payload.constructorCalldata)
        : [],
      class_hash: payload.classHash,
    };

    return addDeployAccountTransaction(this.walletProvider, params);
  }

  /**
   * Signs the given message using the wallet provider.
   *
   * @param {TypedData} typedData - The typed data to be signed.
   * @return - A promise that resolves with the signed message.
   */
  override signMessage(typedData: TypedData) {
    return signMessage(this.walletProvider, typedData);
  }

  // TODO: MISSING ESTIMATES
}

export declare enum StarknetChainId {
  SN_MAIN = '0x534e5f4d41494e',
  SN_GOERLI = '0x534e5f474f45524c49',
  SN_SEPOLIA = '0x534e5f5345504f4c4941',
}
export declare enum Permission {
  Accounts = 'accounts',
}
declare type FELT = string;
declare type Call = {
  contract_address: FELT;
  entrypoint: string;
  calldata?: FELT[];
};
declare type SIERRA_ENTRY_POINT = {
  selector: FELT;
  function_idx: number;
};
declare type StarknetMerkleType = {
  name: string;
  type: 'merkletree';
  contains: string;
};
/**
 * A single type, as part of a struct. The `type` field can be any of the EIP-712 supported types.
 *
 * Note that the `uint` and `int` aliases like in Solidity, and fixed point numbers are not supported by the EIP-712
 * standard.
 */
declare type StarknetType =
  | {
      name: string;
      type: string;
    }
  | StarknetMerkleType;
/**
 * The EIP712 domain struct. Any of these fields are optional, but it must contain at least one field.
 */
interface StarknetDomain extends Record<string, unknown> {
  name?: string;
  version?: string;
  chainId?: string | number;
}
/**
 * The complete typed data, with all the structs, domain data, primary type of the message, and the message itself.
 */
export interface TypedData {
  types: Record<string, StarknetType[]>;
  primaryType: string;
  domain: StarknetDomain;
  message: Record<string, unknown>;
}
/**
 * INVOKE_TXN_V1
 * @see https://github.com/starkware-libs/starknet-specs/blob/master/api/starknet_api_openrpc.json
 */
export interface AddInvokeTransactionParameters {
  /**
   * Calls to invoke by the account
   */
  calls: Call[];
}
export interface AddInvokeTransactionResult {
  /**
   * The hash of the invoke transaction
   */
  transaction_hash: FELT;
}
/**
 * BROADCASTED_DECLARE_TXN_V2
 * @see https://github.com/starkware-libs/starknet-specs/blob/master/api/starknet_api_openrpc.json
 */
export interface AddDeclareTransactionParameters {
  /**
   * The hash of the Cairo assembly resulting from the Sierra compilation
   */
  compiled_class_hash: FELT;
  contract_class: {
    /**
     * The list of Sierra instructions of which the program consists
     */
    sierra_program: FELT[];
    /**
     * The version of the contract class object. Currently, the Starknet OS supports version 0.1.0
     */
    contract_class_version: string;
    /**
     * Entry points by type
     */
    entry_points_by_type: {
      CONSTRUCTOR: SIERRA_ENTRY_POINT[];
      EXTERNAL: SIERRA_ENTRY_POINT[];
      L1_HANDLER: SIERRA_ENTRY_POINT[];
    };
    /**
     * The class ABI, as supplied by the user declaring the class
     */
    abi?: string;
  };
}
export interface AddDeclareTransactionResult {
  /**
   * The hash of the declare transaction
   */
  transaction_hash: FELT;
  /**
   * The hash of the declared class
   */
  class_hash: FELT;
}
/**
 * DEPLOY_ACCOUNT_TXN_V1
 * @see https://github.com/starkware-libs/starknet-specs/blob/master/api/starknet_api_openrpc.json
 */
export interface AddDeployAccountTransactionParameters {
  /**
   * The salt for the address of the deployed contract
   */
  contract_address_salt: FELT;
  /**
   * The parameters passed to the constructor
   */
  constructor_calldata: FELT[];
  /**
   * The hash of the deployed contract's class
   */
  class_hash: FELT;
}
export interface AddDeployAccountTransactionResult {
  /**
   * The hash of the deploy transaction
   */
  transaction_hash: FELT;
  /**
   * The address of the new contract
   */
  contract_address: FELT;
}
/**
 * EIP-1102:
 * @see https://eips.ethereum.org/EIPS/eip-1102
 */
export interface RequestAccountsParameters {
  /**
   * If true, the wallet will not show the wallet-unlock UI in case of a locked wallet,
   * nor the dApp-approve UI in case of a non-allowed dApp.
   */
  silentMode?: boolean;
}
/**
 * EIP-747:
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md
 */
export interface WatchAssetParameters {
  type: 'ERC20';
  options: {
    address: string;
    symbol?: string;
    decimals?: number;
    image?: string;
    name?: string;
  };
}
/**
 * EIP-3085:
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-3085.md
 */
export interface AddStarknetChainParameters {
  id: string;
  chainId: string;
  chainName: string;
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
  nativeCurrency?: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  iconUrls?: string[];
}
export interface SwitchStarknetChainParameters {
  chainId: string;
}
export interface GetDeploymentDataResult {
  address: FELT;
  class_hash: FELT;
  salt: FELT;
  calldata: FELT[];
  sigdata?: FELT[];
  version: 0 | 1;
}
/**
 * Maps each RPC message type to its corresponding parameters and result type.
 */
export interface RpcTypeToMessageMap {
  /**
   * Get permissions from the wallet.
   * @returns An array of permissions.
   */
  wallet_getPermissions: {
    params?: never;
    result: Permission[];
  };
  /**
   * Request accounts from the wallet.
   * @param params Optional parameters for requesting accounts.
   * @returns An array of account addresses as strings.
   */
  wallet_requestAccounts: {
    params?: RequestAccountsParameters;
    result: string[];
  };
  /**
   * Watch an asset in the wallet.
   * @param params The parameters required to watch an asset.
   * @returns A boolean indicating if the operation was successful.
   */
  wallet_watchAsset: {
    params: WatchAssetParameters;
    result: boolean;
  };
  /**
   * Add a new Starknet chain to the wallet.
   * @param params The parameters required to add a new chain.
   * @returns A boolean indicating if the operation was successful.
   */
  wallet_addStarknetChain: {
    params: AddStarknetChainParameters;
    result: boolean;
  };
  /**
   * Switch the current Starknet chain in the wallet.
   * @param params The parameters required to switch chains.
   * @returns A boolean indicating if the operation was successful.
   */
  wallet_switchStarknetChain: {
    params: SwitchStarknetChainParameters;
    result: boolean;
  };
  /**
   * Request the current chain ID from the wallet.
   * @returns The current Starknet chain ID.
   */
  wallet_requestChainId: {
    params?: never;
    result: StarknetChainId;
  };
  /**
   * Get deployment data for a contract.
   * @returns The deployment data result.
   */
  wallet_deploymentData: {
    params?: never;
    result: GetDeploymentDataResult;
  };
  /**
   * Add an invoke transaction to the wallet.
   * @param params The parameters required for the invoke transaction.
   * @returns The result of adding the invoke transaction.
   */
  starknet_addInvokeTransaction: {
    params: AddInvokeTransactionParameters;
    result: AddInvokeTransactionResult;
  };
  /**
   * Add a declare transaction to the wallet.
   * @param params The parameters required for the declare transaction.
   * @returns The result of adding the declare transaction.
   */
  starknet_addDeclareTransaction: {
    params: AddDeclareTransactionParameters;
    result: AddDeclareTransactionResult;
  };
  /**
   * Add a deploy account transaction to the wallet.
   * @param params The parameters required for the deploy account transaction.
   * @returns The result of adding the deploy account transaction.
   */
  starknet_addDeployAccountTransaction: {
    params: AddDeployAccountTransactionParameters;
    result: AddDeployAccountTransactionResult;
  };
  /**
   * Sign typed data using the wallet.
   * @param params The typed data to sign.
   * @returns An array of signatures as strings.
   */
  starknet_signTypedData: {
    params: TypedData;
    result: string[];
  };
  /**
   * Get the list of supported specifications.
   * @returns An array of supported specification strings.
   */
  starknet_supportedSpecs: {
    params?: never;
    result: string[];
  };
}
export declare type RpcMessage = {
  [K in keyof RpcTypeToMessageMap]: {
    type: K;
  } & RpcTypeToMessageMap[K];
}[keyof RpcTypeToMessageMap];
export declare type IsParamsOptional<T extends keyof RpcTypeToMessageMap> =
  undefined extends RpcTypeToMessageMap[T]['params'] ? true : false;
export declare type RequestFnCall<T extends RpcMessage['type']> = {
  type: T;
} & (IsParamsOptional<T> extends true
  ? {
      params?: RpcTypeToMessageMap[T]['params'];
    }
  : {
      params: RpcTypeToMessageMap[T]['params'];
    });
export declare type RequestFn = <T extends RpcMessage['type']>(
  call: RequestFnCall<T>
) => Promise<RpcTypeToMessageMap[T]['result']>;
export {};

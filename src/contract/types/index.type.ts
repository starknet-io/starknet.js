import type { BlockHash, TransactionHash } from '../../types/api';
import type { CairoEnum } from '../../types/cairoEnum';
import type {
  Abi,
  BigNumberish,
  BlockNumber,
  Calldata,
  DeclareAndDeployContractPayload,
  ParsedStruct,
  RawArgs,
  RawArgsArray,
  Signature,
} from '../../types/lib';
import type { UniversalDetails } from '../../account/types/index.type';
import type { ProviderInterface } from '../../provider';
import type { AccountInterface } from '../../account/interface';
import type { AbiParserInterface } from '../../utils/calldata/parser/interface';

export type AsyncContractFunction<T = any> = (...args: ArgsOrCalldataWithOptions) => Promise<T>;
export type ContractFunction = (...args: ArgsOrCalldataWithOptions) => any;

export type CallResult =
  | {
      [key: string]: any;
    }
  | CallResult[]
  | bigint
  | string
  | boolean
  | CairoEnum;

// export type ArgsOrCalldata = RawArgsArray | [Calldata] | Calldata;
// export type ArgsOrCalldataWithOptions = ArgsOrCalldata & ContractOptions;

// RawParamsOrCalldata as args
export type ArgsOrCalldata =
  // params like (va,vb,vc,vd...)               as args is [va,vb,vc,vd...]
  // params like (x) where x = {a:va,b:vb,c:vc...} as args is [x]
  // params like (x) where x = [va,vb,vc...]       as args is [[x]]
  | RawArgsArray // recursive definition cover all this cases
  // [calldata] is [['0x','0x'...]]
  | [Calldata]
  // calldata is ['0x','0x'...]
  | Calldata;

// RawParamsOrCalldata where each can have an option
export type ArgsOrCalldataWithOptions =
  // params like (va,vb,vc,vd..., option)                   as args is [va,vb,vc,vd..., option]
  // params like (x, option) where x = {a:va,b:vb,c:vc...}  as args is [x, option]
  // params like (x, option) where x = [va,vb,vc...]        as args is [[x], option]
  // recursive definition cover all this cases
  | [...RawArgsArray]
  | [...RawArgsArray, ContractOptions]
  // used when called compile that return array of calldata
  // (calldata, options)                                             as args is [['0x','0x'...], options]
  | [Calldata]
  | [Calldata, ContractOptions]
  // used when separate params compilations
  // (c,a,l,l,d,a,t,a, options)                                      as args is ['0x','0x'..., options]
  | [...Calldata]
  | [...Calldata, ContractOptions];

export type CommonContractOptions = {
  /**
   * compile and validate arguments
   * @default true
   */
  parseRequest?: boolean;

  /**
   * Parse elements of the response array and structuring them into response object
   * @default true
   */
  parseResponse?: boolean;

  /**
   * Custom Abi parser class constructor (must extend AbiParserInterface)
   */
  ParserClass?: new (abi: Abi) => AbiParserInterface;
};

export type ContractOptions = {
  abi: Abi;
  address: string;
  /**
   * Connect account to read and write methods
   * Connect provider to read methods
   * @default defaultProvider
   */
  providerOrAccount?: ProviderOrAccount;

  /**
   * Class hash of the contract
   */
  classHash?: string;
} & CommonContractOptions;

export type ExecuteOptions = Pick<CommonContractOptions, 'parseRequest'> & {
  /**
   * Used when invoking with only provider
   */
  signature?: Signature;
  /**
   * Deployer contract salt
   */
  salt?: string;
} & Partial<UniversalDetails>;

export type CallOptions = CommonContractOptions & {
  formatResponse?: FormatResponse;
} & Pick<UniversalDetails, 'blockIdentifier' | 'version'>;

export type WithOptions = ExecuteOptions & CallOptions;

export type ParsedEvent = { [name: string]: ParsedStruct } & {
  block_hash?: BlockHash;
  block_number?: BlockNumber;
  transaction_hash?: TransactionHash;
};

export type ParsedEvents = Array<ParsedEvent>;

// TODO: This should be in formatResponse type
/**
 * Advance formatting used to get js types data as result
 * @description https://starknetjs.com/docs/guides/define_call_message/#formatresponse
 * @example
 * ```typescript
 * // assign custom or existing method to resulting data
 * formatResponse: { balance: uint256ToBN },
 * ```
 * @example
 * ```typescript
 * // define resulting data js types
 * const formatAnswer = { id: 'number', description: 'string' };
 * ```
 */
export type FormatResponse = { [key: string]: any };

export type ProviderOrAccount = ProviderInterface | AccountInterface;

/**
 * Type guard to narrow ProviderOrAccount to AccountInterface
 * @param providerOrAccount - The object to check
 * @returns true if the object is an AccountInterface
 */
export function isAccount(
  providerOrAccount: ProviderOrAccount
): providerOrAccount is AccountInterface {
  return 'execute' in providerOrAccount;
}

type FactoryParamsBase = {
  account: AccountInterface;
  /**
   * Parse arguments to calldata.
   * optimization when calldata are already validated and compiled.
   * @default true
   */
  parseRequest?: boolean;
};

type DeclareAndDeployParams = FactoryParamsBase & DeclareAndDeployContractPayload;

type DeployOnlyParams = FactoryParamsBase & {
  classHash: BigNumberish;
  salt?: string;
  unique?: boolean;
  constructorCalldata?: RawArgs;
  abi?: Abi;
};

export type FactoryParams = (DeclareAndDeployParams | DeployOnlyParams) & CommonContractOptions;

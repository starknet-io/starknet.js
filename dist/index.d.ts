import * as RPCSPEC0103 from '@starknet-io/starknet-types-0103';
import {
  PAYMASTER_API,
  CONTRACT,
  EDataAvailabilityMode as EDataAvailabilityMode$1,
  ETransactionType,
  SUBSCRIPTION_BLOCK_ID,
  TypedData,
  CONTRACT_STORAGE_KEYS,
  StorageProof,
  CASM_COMPILED_CONTRACT_CLASS,
  OutsideExecutionTypedData,
  ETransactionVersion3 as ETransactionVersion3$1,
  IsType,
  TransactionReceipt as TransactionReceipt$1,
  IsSucceeded,
  IsReverted,
  BLOCK_WITH_TX_HASHES,
  PRE_CONFIRMED_BLOCK_WITH_TX_HASHES,
  TransactionHash,
  BlockHash,
  FAILED_TO_RECEIVE_TXN,
  NO_TRACE_AVAILABLE,
  CONTRACT_NOT_FOUND,
  ENTRYPOINT_NOT_FOUND,
  BLOCK_NOT_FOUND,
  INVALID_TXN_INDEX,
  CLASS_HASH_NOT_FOUND,
  TXN_HASH_NOT_FOUND,
  PAGE_SIZE_TOO_BIG,
  NO_BLOCKS,
  INVALID_CONTINUATION_TOKEN,
  TOO_MANY_KEYS_IN_FILTER,
  CONTRACT_ERROR,
  TRANSACTION_EXECUTION_ERROR,
  STORAGE_PROOF_NOT_SUPPORTED,
  CLASS_ALREADY_DECLARED,
  INVALID_TRANSACTION_NONCE,
  INSUFFICIENT_RESOURCES_FOR_VALIDATE,
  INSUFFICIENT_ACCOUNT_BALANCE,
  VALIDATION_FAILURE,
  COMPILATION_FAILED,
  CONTRACT_CLASS_SIZE_IS_TOO_LARGE,
  NON_ACCOUNT,
  DUPLICATE_TX,
  COMPILED_CLASS_HASH_MISMATCH,
  UNSUPPORTED_TX_VERSION,
  UNSUPPORTED_CONTRACT_CLASS_VERSION,
  UNEXPECTED_ERROR,
  REPLACEMENT_TRANSACTION_UNDERPRICED,
  FEE_BELOW_MINIMUM,
  INVALID_SUBSCRIPTION_ID,
  TOO_MANY_ADDRESSES_IN_FILTER,
  TOO_MANY_BLOCKS_BACK,
  COMPILATION_ERROR,
  ETransactionVersion as ETransactionVersion$1,
  SUBSCRIPTION_ID,
  TXN_FINALITY_STATUS,
  STATUS_ACCEPTED_ON_L1,
  TXN_STATUS_WITHOUT_L1,
  StarknetEventsEvent,
  TransactionsStatusEvent,
  NewTransactionReceiptsEvent,
  NewTransactionEvent,
  NewHeadsEvent,
  STORAGE_RESULT,
  INVOKE_TXN_V3,
  StarknetWindowObject,
  AccountChangeEventHandler,
  NetworkChangeEventHandler,
  WatchAssetParameters,
  AddStarknetChainParameters,
  Signature as Signature$1,
  EDAMode as EDAMode$1,
  StarknetType,
  StarknetMerkleType,
  TypedDataRevision,
  OutsideCallV1,
  OutsideCallV2,
  EmittedEvent as EmittedEvent$1,
  Event as Event$2,
  Address as Address$1,
  Permission,
  ChainId,
  AccountDeploymentData,
  AddInvokeTransactionParameters,
  AddInvokeTransactionResult,
  AddDeclareTransactionParameters,
  AddDeclareTransactionResult,
  SpecVersion,
  API_VERSION as API_VERSION$1,
} from '@starknet-io/starknet-types-0103';
export {
  StarknetDomain,
  StarknetEnumType,
  StarknetMerkleType,
  StarknetType,
  TypedData,
  TypedDataRevision,
} from '@starknet-io/starknet-types-0103';
import * as RPC$1 from '@starknet-io/starknet-types-0101';
import {
  WatchAssetParameters as WatchAssetParameters$1,
  AddStarknetChainParameters as AddStarknetChainParameters$1,
  Signature as Signature$2,
  Address as Address$2,
  Permission as Permission$1,
  ChainId as ChainId$1,
  AccountDeploymentData as AccountDeploymentData$1,
  AddInvokeTransactionParameters as AddInvokeTransactionParameters$1,
  AddInvokeTransactionResult as AddInvokeTransactionResult$1,
  AddDeclareTransactionParameters as AddDeclareTransactionParameters$1,
  AddDeclareTransactionResult as AddDeclareTransactionResult$1,
  TypedData as TypedData$1,
  SpecVersion as SpecVersion$1,
  API_VERSION as API_VERSION$2,
} from '@starknet-io/starknet-types-0101';
import * as weierstrass from '@noble/curves/abstract/weierstrass';
import { RecoveredSignatureType } from '@noble/curves/abstract/weierstrass';
import * as RPC from '@starknet-io/starknet-types-09';
import { Abi as Abi$1, TypedContract } from 'abi-wan-kanabi';
import {
  WalletWithStarknetFeatures,
  StandardEventsChangeProperties,
} from '@starknet-io/get-starknet-wallet-standard/features';
import { WalletWithStarknetFeatures as WalletWithStarknetFeatures$1 } from '@starknet-io/get-starknet-wallet-standard-v6/features';
import * as _starknet_io_starknet_types_0104 from '@starknet-io/starknet-types-0104';
import {
  STRK20_DEPOSIT_ACTION,
  STRK20_WITHDRAW_ACTION,
  STRK20_TRANSFER_ACTION,
  STRK20_INVOKE_ACTION,
  STRK20_SUBACCOUNT_INVOKE_ACTION as STRK20_SUBACCOUNT_INVOKE_ACTION$1,
  STRK20_CALL_AND_PROOF as STRK20_CALL_AND_PROOF$1,
  STRK20_PROOF,
  Address,
  STRK20_BALANCE_ENTRY,
  STRK20_DAPP_NAME,
  FELT as FELT$1,
  Permission as Permission$2,
  WatchAssetParameters as WatchAssetParameters$2,
  AddStarknetChainParameters as AddStarknetChainParameters$2,
  ChainId as ChainId$2,
  AccountDeploymentData as AccountDeploymentData$2,
  AddInvokeTransactionParameters as AddInvokeTransactionParameters$2,
  AddInvokeTransactionResult as AddInvokeTransactionResult$2,
  AddDeclareTransactionParameters as AddDeclareTransactionParameters$2,
  AddDeclareTransactionResult as AddDeclareTransactionResult$2,
  TypedData as TypedData$2,
  Signature as Signature$3,
  SpecVersion as SpecVersion$2,
  API_VERSION as API_VERSION$3,
  STRK20_ACTION as STRK20_ACTION$1,
} from '@starknet-io/starknet-types-0104';
export {
  STRK20_BALANCE_ENTRY,
  STRK20_CALLDATA_ITEM,
  STRK20_CALLDATA_PLACEHOLDER,
  STRK20_COLLECT_POLICY,
  STRK20_DAPP_NAME,
  STRK20_DEPOSIT_ACTION,
  STRK20_INVOKE_ACTION,
  STRK20_PROOF,
  STRK20_TRANSFER_ACTION,
  STRK20_WITHDRAW_ACTION,
} from '@starknet-io/starknet-types-0104';
import * as poseidon from '@noble/curves/abstract/poseidon';
import * as json$1 from 'lossless-json';
import * as starknet from '@scure/starknet';
import {
  StandardConnectOutput,
  StandardEventsChangeProperties as StandardEventsChangeProperties$1,
} from '@wallet-standard/features';

declare const ec_weierstrass: typeof weierstrass;
declare namespace ec {
  export { starknet as starkCurve, ec_weierstrass as weierstrass };
}

type RequestBody = {
  id: number | string;
  jsonrpc: '2.0';
  method: string;
  params?: {};
};
type ResponseBody = {
  id: number | string;
  jsonrpc: '2.0';
} & (SuccessResponseBody | ErrorResponseBody);
type SuccessResponseBody = {
  result: unknown;
};
type ErrorResponseBody = {
  error: Error$1;
};
type Error$1 = {
  code: number;
  message: string;
  data?: unknown;
};
type WebSocketEvent = Omit<RequestBody, 'id'> & {
  params: {};
};

type jsonrpc_ErrorResponseBody = ErrorResponseBody;
type jsonrpc_RequestBody = RequestBody;
type jsonrpc_ResponseBody = ResponseBody;
type jsonrpc_SuccessResponseBody = SuccessResponseBody;
type jsonrpc_WebSocketEvent = WebSocketEvent;
declare namespace jsonrpc {
  export type {
    Error$1 as Error,
    jsonrpc_ErrorResponseBody as ErrorResponseBody,
    jsonrpc_RequestBody as RequestBody,
    jsonrpc_ResponseBody as ResponseBody,
    jsonrpc_SuccessResponseBody as SuccessResponseBody,
    jsonrpc_WebSocketEvent as WebSocketEvent,
  };
}

declare const index$4_PAYMASTER_API: typeof PAYMASTER_API;
declare const index$4_RPCSPEC0103: typeof RPCSPEC0103;
declare namespace index$4 {
  export {
    jsonrpc as JRPC,
    index$4_PAYMASTER_API as PAYMASTER_API,
    index$4_RPCSPEC0103 as RPCSPEC0103,
    RPC as RPCSPEC09,
  };
}

type CairoEnumRaw = Record<string, any>;
/**
 * Class to handle Cairo custom Enum
 * @param enumContent object containing the variants and its content. Example :
 *  {Success: 234, Warning: undefined, Error: undefined}.
 *  Only one variant with a value, object, array.
 * @returns an instance representing a Cairo custom Enum.
 * @example
 * ```typescript
 * const myCairoEnum = new CairoCustomEnum( {Success: undefined, Warning: "0x7f32ea", Error: undefined})
 * ```
 */
declare class CairoCustomEnum {
  /**
   * direct readonly access to variants of the Cairo Custom Enum.
   * @returns a value of type any
   * @example
   * ```typescript
   * const successValue = myCairoEnum.variant.Success;
   */
  readonly variant: CairoEnumRaw;
  /**
   * @param enumContent an object with the variants as keys and the content as value. Only one content shall be defined.
   */
  constructor(enumContent: CairoEnumRaw);
  /**
   *
   * @returns the content of the valid variant of a Cairo custom Enum.
   */
  unwrap(): any;
  /**
   *
   * @returns the name of the valid variant of a Cairo custom Enum.
   */
  activeVariant(): string;
}

type ValuesType<T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any>> =
  T extends ReadonlyArray<any>
    ? T[number]
    : T extends ArrayLike<any>
      ? T[number]
      : T extends object
        ? T[keyof T]
        : never;

declare const CairoOptionVariant: {
  readonly Some: 0;
  readonly None: 1;
};
type CairoOptionVariant = ValuesType<typeof CairoOptionVariant>;
/**
 * Class to handle Cairo Option
 * @param variant CairoOptionVariant.Some or CairoOptionVariant.None
 * @param content value of type T.
 * @returns an instance representing a Cairo Option.
 * @example
 * ```typescript
 * const myOption = new CairoOption<BigNumberish>(CairoOptionVariant.Some, "0x54dda8");
 * ```
 */
declare class CairoOption<T> {
  readonly Some?: T;
  readonly None?: boolean;
  constructor(variant: CairoOptionVariant | number, content?: T);
  /**
   *
   * @returns the content of the valid variant of a Cairo custom Enum.
   *  If None, returns 'undefined'.
   */
  unwrap(): T | undefined;
  /**
   *
   * @returns true if the valid variant is 'isSome'.
   */
  isSome(): boolean;
  /**
   *
   * @returns true if the valid variant is 'isNone'.
   */
  isNone(): boolean;
}

declare const CairoResultVariant: {
  readonly Ok: 0;
  readonly Err: 1;
};
type CairoResultVariant = ValuesType<typeof CairoResultVariant>;
/**
 * Class to handle Cairo Result
 * @param variant CairoResultVariant.Ok or CairoResultVariant.Err
 * @param resultContent value of type T or U.
 * @returns an instance representing a Cairo Result.
 * @example
 * ```typescript
 * const myOption = new CairoResult<BigNumberish, CustomError>(CairoResultVariant.Ok, "0x54dda8");
 * ```
 */
declare class CairoResult<T, U> {
  readonly Ok?: T;
  readonly Err?: U;
  constructor(variant: CairoResultVariant | number, resultContent: T | U);
  /**
   *
   * @returns the content of the valid variant of a Cairo Result.
   */
  unwrap(): T | U;
  /**
   *
   * @returns true if the valid variant is 'Ok'.
   */
  isOk(): boolean;
  /**
   *
   * @returns true if the valid variant is 'isErr'.
   */
  isErr(): boolean;
}

type CairoEnum = CairoCustomEnum | CairoOption<any> | CairoResult<any, any>;

/** ABI */
type Abi = ReadonlyArray<FunctionAbi | AbiEvent | AbiStruct | InterfaceAbi | any>;
type AbiEntry = {
  name: string;
  type: 'felt' | 'felt*' | 'event' | string;
};
type EventEntry = {
  name: string;
  type: 'felt' | 'felt*' | string;
  kind: 'key' | 'data';
};
type FunctionAbiType = 'function' | 'l1_handler' | 'constructor';
type FunctionAbi = {
  inputs: AbiEntry[];
  name: string;
  outputs: AbiEntry[];
  stateMutability?: 'view';
  state_mutability?: string;
  type: FunctionAbiType;
};
type AbiStructs = {
  [name: string]: AbiStruct;
};
type AbiStruct = {
  members: (AbiEntry & {
    offset: number;
  })[];
  name: string;
  size: number;
  type: 'struct';
};
type AbiInterfaces = {
  [name: string]: InterfaceAbi;
};
type InterfaceAbi = {
  items: FunctionAbi[];
  name: string;
  type: 'interface';
};
type AbiEnums = {
  [name: string]: AbiEnum;
};
type AbiEnum = {
  variants: (AbiEntry & {
    offset: number;
  })[];
  name: string;
  size: number;
  type: 'enum';
};
type AbiEvents = {
  [hash: string]: AbiEvent;
};
type AbiEvent = CairoEvent | LegacyEvent;
type CairoEvent = CairoEventDefinition | AbiEvents;
type CairoEventDefinition = CONTRACT.STRUCT_EVENT & {
  name: string;
  type: 'event';
};
type CairoEventVariant = CONTRACT.ENUM_EVENT & {
  name: string;
  type: string;
};
type LegacyEvent = {
  name: string;
  type: 'event';
  data: CONTRACT.EVENT_FIELD[];
  keys: CONTRACT.EVENT_FIELD[];
};

/** LEGACY CONTRACT */
/**
 * format produced after compressing 'program' property
 */
type LegacyContractClass = {
  program: CompressedProgram;
  entry_points_by_type: EntryPointsByType;
  abi: Abi;
};
/**
 * format produced after compiling .cairo to .json
 */
type LegacyCompiledContract = Omit<LegacyContractClass, 'program'> & {
  program: Program;
};
/** SUBTYPES */
type Builtins = string[];
type CompressedProgram = string;
type Hint = Record<string, unknown>;
type EntryPointsByType = {
  CONSTRUCTOR: ContractEntryPointFields[];
  EXTERNAL: ContractEntryPointFields[];
  L1_HANDLER: ContractEntryPointFields[];
};
type ContractEntryPointFields = {
  selector: string;
  offset: string | number;
  builtins?: Builtins;
};
interface Program {
  builtins: string[];
  data: string[];
  hints: Record<string, Hint[]>;
  prime: string;
  attributes?: Array<{
    accessible_scopes?: string[];
    end_pc?: number;
    flow_tracking_data?: {
      ap_tracking?: {
        group?: number;
        offset?: number;
      };
      reference_ids?: Record<string, number>;
    };
    name?: string;
    start_pc?: number;
    value?: string | number;
  }>;
  compiler_version?: string;
  main_scope?: string;
  identifiers?: Record<
    string,
    | {
        destination: string;
        type: 'alias';
      }
    | {
        decorators: string[];
        pc: number;
        type: 'function';
        implicit_args?: {
          full_name: string;
          members: Record<
            string,
            {
              cairo_type: string;
              offset: number;
            }
          >;
          size: number;
          type: 'struct';
        };
        explicit_args?: {
          full_name: string;
          members: Record<
            string,
            {
              cairo_type: string;
              offset: number;
            }
          >;
          size: number;
          type: 'struct';
        };
        return_type?: {
          cairo_type: string;
          type: 'type_definition';
        };
      }
    | {
        full_name: string;
        members:
          | Record<
              string,
              {
                cairo_type: string;
                offset: number;
              }
            >
          | Record<string, never>;
        size: number;
        type: 'struct';
      }
    | {
        cairo_type: string;
        type: 'type_definition';
      }
    | {
        type: 'namespace';
      }
    | {
        type: 'const';
        value: string | number;
      }
    | {
        pc: number;
        type: 'label';
      }
    | {
        cairo_type: string;
        full_name: string;
        references: Array<{
          ap_tracking_data: {
            group: number;
            offset: number;
          };
          pc: number;
          value: string;
        }>;
        type: 'reference';
      }
  >;
  reference_manager?: Record<
    string,
    {
      references: unknown[];
    }
  >;
  debug_info?: Record<
    string,
    {
      file_contents?: Record<string, string>;
      instruction_locations?: Record<string, unknown[]>;
    }
  >;
}

/** Cairo Assembly .casm */
type CairoAssembly = {
  prime: string;
  compiler_version: string;
  bytecode: ByteCode;
  hints: any[];
  pythonic_hints?: PythonicHints;
  bytecode_segment_lengths?: number[];
  entry_points_by_type: EntryPointsByType;
};
/** COMPILED CONTRACT */
/**
 * format produced after starknet-compile .cairo to .json
 *
 * sierra_program is hex array
 */
type CompiledSierra = {
  sierra_program: ByteCode;
  sierra_program_debug_info?: SierraProgramDebugInfo;
  contract_class_version: string;
  entry_points_by_type: SierraEntryPointsByType;
  abi: Abi;
};
/**
 * format produced after compressing 'sierra_program', stringifies 'abi' property and omit sierra_program_debug_info
 *
 * CompressedCompiledSierra
 */
type SierraContractClass = Omit<
  CompiledSierra,
  'abi' | 'sierra_program' | 'sierra_program_debug_info'
> & {
  sierra_program: string;
  abi: string;
};
type CompiledSierraCasm = CairoAssembly;
/** SUBTYPES */
type ByteCode = string[];
type PythonicHints = [number, string[]][];
type SierraProgramDebugInfo = {
  type_names: [number, string][];
  libfunc_names: [number, string][];
  user_func_names: [number, string][];
};
type SierraEntryPointsByType = {
  CONSTRUCTOR: SierraContractEntryPointFields[];
  EXTERNAL: SierraContractEntryPointFields[];
  L1_HANDLER: SierraContractEntryPointFields[];
};
type SierraContractEntryPointFields = {
  selector: string;
  function_idx: number;
};

/**
 * format produced after compressing compiled contract
 *
 * CompressedCompiledContract
 */
type ContractClass = LegacyContractClass | SierraContractClass;
/**
 * format produced after compile .cairo to .json
 */
type CompiledContract = LegacyCompiledContract | CompiledSierra;
/**
 * Compressed or decompressed Cairo0 or Cairo1 Contract
 */
type CairoContract = ContractClass | CompiledContract;
declare const EntryPointType: {
  readonly EXTERNAL: 'EXTERNAL';
  readonly L1_HANDLER: 'L1_HANDLER';
  readonly CONSTRUCTOR: 'CONSTRUCTOR';
};
type EntryPointType = ValuesType<typeof EntryPointType>;

type SimpleOneOf<F, S> = OnlyFirst<F, S> | OnlyFirst<S, F>;
type OnlyFirst<F, S> = F & {
  [Key in keyof Omit<S, keyof F>]?: undefined;
};

type Simplify<T> = {
  [K in keyof T]: T[K];
} & {};
type RequiredKeysOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? K : never;
  }[keyof T],
  undefined
>;
type ArrayElement<T> = T extends Array<infer U> ? U : never;
type MergeProperties<T1 extends Record<any, any>, T2 extends Record<any, any>> = {
  [K in RequiredKeysOf<T1> & RequiredKeysOf<T2>]: Merge<T1[K], T2[K]>;
} & {
  [K in keyof T1 & keyof T2]?: Merge<T1[K], T2[K]>;
} & {
  [K in Exclude<keyof T1, keyof T2>]?: T1[K];
} & {
  [K in Exclude<keyof T2, keyof T1>]?: T2[K];
};
/**
 *  type a = { w: bigint[]; x: bigint; y: string };
 type b = { w: number[]; x: number; z: string };
 type c = Merge<a, b>; // { w: (bigint | number)[] x: bigint | number; y?: string; z?: string; }

 NOTE: handling for ambiguous overlaps, such as a shared property being an array or object,
 is simplified to resolve to only one type since there shouldn't be such occurrences in the
 currently supported RPC specifications
 */
type Merge<T1, T2> = Simplify<
  T1 extends Array<any>
    ? T2 extends Array<any>
      ? Array<Merge<ArrayElement<T1>, ArrayElement<T2>>>
      : T1
    : T2 extends Array<any>
      ? T2
      : T1 extends object
        ? T2 extends object
          ? MergeProperties<T1, T2>
          : T1
        : T2 extends object
          ? T2
          : T1 | T2
>;
type ETransactionVersion = RPC.ETransactionVersion;
declare const ETransactionVersion: {
  readonly V0: '0x0';
  readonly V1: '0x1';
  readonly V2: '0x2';
  readonly V3: '0x3';
  readonly F0: '0x100000000000000000000000000000000';
  readonly F1: '0x100000000000000000000000000000001';
  readonly F2: '0x100000000000000000000000000000002';
  readonly F3: '0x100000000000000000000000000000003';
};
type ETransactionVersion2 = RPC.ETransactionVersion2;
declare const ETransactionVersion2: {
  readonly V0: '0x0';
  readonly V1: '0x1';
  readonly V2: '0x2';
  readonly F0: '0x100000000000000000000000000000000';
  readonly F1: '0x100000000000000000000000000000001';
  readonly F2: '0x100000000000000000000000000000002';
};
type ETransactionVersion3 = RPC.ETransactionVersion3;
declare const ETransactionVersion3: {
  readonly V3: '0x3';
  readonly F3: '0x100000000000000000000000000000003';
};
type BLOCK_HASH = Merge<RPCSPEC0103.BLOCK_HASH, RPC.BLOCK_HASH>;
type BLOCK_NUMBER = Merge<RPCSPEC0103.BLOCK_NUMBER, RPC.BLOCK_NUMBER>;
type FELT = Merge<RPCSPEC0103.FELT, RPC.FELT>;
type TXN_HASH = Merge<RPCSPEC0103.TXN_HASH, RPC.TXN_HASH>;
type PRICE_UNIT = Merge<RPCSPEC0103.PRICE_UNIT, RPC.PRICE_UNIT>;
type RESOURCE_PRICE = Merge<RPCSPEC0103.RESOURCE_PRICE, RPC.RESOURCE_PRICE>;
type SIMULATION_FLAG = Merge<RPCSPEC0103.SIMULATION_FLAG, RPC.SIMULATION_FLAG>;
type STATE_UPDATE = Merge<RPCSPEC0103.STATE_UPDATE, RPC.STATE_UPDATE>;
type PRE_CONFIRMED_STATE_UPDATE = Merge<
  RPCSPEC0103.PRE_CONFIRMED_STATE_UPDATE,
  RPC.PRE_CONFIRMED_STATE_UPDATE
>;
type BlockWithTxHashes = Merge<RPCSPEC0103.BlockWithTxHashes, RPC.BlockWithTxHashes>;
type ContractClassPayload = Merge<RPCSPEC0103.ContractClass, RPC.ContractClass>;
type DeclaredTransaction = Merge<RPCSPEC0103.DeclaredTransaction, RPC.DeclaredTransaction>;
type InvokedTransaction = Merge<RPCSPEC0103.InvokedTransaction, RPC.InvokedTransaction>;
type DeployedAccountTransaction = Merge<
  RPCSPEC0103.DeployedAccountTransaction,
  RPC.DeployedAccountTransaction
>;
type L1_HANDLER_TXN = RPCSPEC0103.L1_HANDLER_TXN;
type EDataAvailabilityMode = RPCSPEC0103.EDataAvailabilityMode;
declare const EDataAvailabilityMode: {
  readonly L1: 'L1';
  readonly L2: 'L2';
};
type EDAMode = RPCSPEC0103.EDAMode;
declare const EDAMode: {
  readonly L1: 0;
  readonly L2: 1;
};
type EmittedEvent = Merge<RPCSPEC0103.EmittedEvent, RPC.EmittedEvent>;
type Event$1 = Merge<RPCSPEC0103.Event, RPC.Event>;
type Receipt = Merge<
  RPCSPEC0103.TransactionReceiptProductionBlock,
  RPC.TransactionReceiptProductionBlock
>;
/**
 * original response from estimate fee without parsing
 */
type FeeEstimate = Merge<RPCSPEC0103.FEE_ESTIMATE, RPC.FEE_ESTIMATE>;
type ApiEstimateFeeResponse = FeeEstimate[];
declare function isRPC08Plus_ResourceBounds(
  entry: ResourceBounds
): entry is RPCSPEC0103.ResourceBounds;
declare function isRPC08Plus_ResourceBoundsBN(entry: ResourceBoundsBN): entry is ResourceBoundsBN;
type ResourceBounds = Merge<RPCSPEC0103.ResourceBounds, RPC.ResourceBounds>;
type EventFilter = RPC.EventFilter;
/**
 * Represents percentage overhead for each resource bound
 * numerical 50 means 50% overhead
 */
type ResourceBoundsOverhead = {
  [K in keyof ResourceBounds]: ResourceBounds[K] extends object
    ? {
        [P in keyof ResourceBounds[K]]: number;
      }
    : number;
};
/**
 * Resource bounds in big number format
 */
type ResourceBoundsBN = {
  [K in keyof ResourceBounds]: ResourceBounds[K] extends object
    ? {
        [P in keyof ResourceBounds[K]]: bigint;
      }
    : number;
};
type SimulateTransaction = SimpleOneOf<RPC.SimulateTransaction, RPCSPEC0103.SimulateTransaction>;
type SimulateTransactionResponse =
  | RPC.SimulateTransactionResponse
  | RPCSPEC0103.SimulateTransactionResponse;
type INITIAL_READS = RPCSPEC0103.INITIAL_READS;
/** Flags to request additional fields in transaction responses (RPC 0.10.1+) */
type ETxnResponseFlag = RPCSPEC0103.ETxnResponseFlag;
declare const ETxnResponseFlag: {
  readonly INCLUDE_PROOF_FACTS: 'INCLUDE_PROOF_FACTS';
};
/** Flags to request additional fields in trace responses (RPC 0.10.1+) */
type ETraceFlag = RPCSPEC0103.ETraceFlag;
declare const ETraceFlag: {
  readonly RETURN_INITIAL_READS: 'RETURN_INITIAL_READS';
};
/** Tags for WebSocket transaction subscriptions (RPC 0.10.1+) */
type ESubscriptionTag = RPCSPEC0103.ESubscriptionTag;
declare const ESubscriptionTag: {
  readonly INCLUDE_PROOF_FACTS: 'INCLUDE_PROOF_FACTS';
};
/** A single transaction trace within a block */
type BlockTransactionTrace = RPCSPEC0103.BlockTransactionTrace;
/** Block transaction traces with optional initial storage reads (RPC 0.10.1+) */
type BlockTransactionsTracesWithInitialReads = RPCSPEC0103.BlockTransactionsTracesWithInitialReads;
type TransactionTrace = SimpleOneOf<RPC.TRANSACTION_TRACE, RPCSPEC0103.TRANSACTION_TRACE>;
type TransactionWithHash = Merge<RPCSPEC0103.TransactionWithHash, RPC.TransactionWithHash>;
type TransactionReceipt = Merge<RPCSPEC0103.TransactionReceipt, RPC.TransactionReceipt>;
type Methods = RPCSPEC0103.Methods;
type TXN_STATUS = Merge<RPCSPEC0103.TXN_STATUS, RPC.TXN_STATUS>;
type TXN_EXECUTION_STATUS = Merge<RPCSPEC0103.TXN_EXECUTION_STATUS, RPC.TXN_EXECUTION_STATUS>;
type TransactionStatus = Merge<RPCSPEC0103.TransactionStatus, RPC.TransactionStatus>;
type ETransactionStatus = RPCSPEC0103.ETransactionStatus;
declare const ETransactionStatus: {
  readonly RECEIVED: 'RECEIVED';
  readonly CANDIDATE: 'CANDIDATE';
  readonly PRE_CONFIRMED: 'PRE_CONFIRMED';
  readonly ACCEPTED_ON_L2: 'ACCEPTED_ON_L2';
  readonly ACCEPTED_ON_L1: 'ACCEPTED_ON_L1';
};
type ETransactionExecutionStatus = RPCSPEC0103.ETransactionExecutionStatus;
declare const ETransactionExecutionStatus: {
  readonly SUCCEEDED: 'SUCCEEDED';
  readonly REVERTED: 'REVERTED';
};
type FEE_ESTIMATE = Merge<RPCSPEC0103.FEE_ESTIMATE, RPC.FEE_ESTIMATE>;
type EVENTS_CHUNK = Merge<RPCSPEC0103.EVENTS_CHUNK, RPC.EVENTS_CHUNK>;
type TransactionType = RPC.ETransactionType;
declare const TransactionType: {
  readonly DECLARE: 'DECLARE';
  readonly DEPLOY: 'DEPLOY';
  readonly DEPLOY_ACCOUNT: 'DEPLOY_ACCOUNT';
  readonly INVOKE: 'INVOKE';
  readonly L1_HANDLER: 'L1_HANDLER';
};
type BlockStatus = RPC.EBlockStatus;
declare const BlockStatus: {
  readonly PRE_CONFIRMED: 'PRE_CONFIRMED';
  readonly ACCEPTED_ON_L2: 'ACCEPTED_ON_L2';
  readonly ACCEPTED_ON_L1: 'ACCEPTED_ON_L1';
};
type TransactionFinalityStatus = RPC.ETransactionFinalityStatus;
declare const TransactionFinalityStatus: {
  readonly PRE_CONFIRMED: 'PRE_CONFIRMED';
  readonly ACCEPTED_ON_L2: 'ACCEPTED_ON_L2';
  readonly ACCEPTED_ON_L1: 'ACCEPTED_ON_L1';
};
type TransactionExecutionStatus = RPC.ETransactionExecutionStatus;
declare const TransactionExecutionStatus: {
  readonly SUCCEEDED: 'SUCCEEDED';
  readonly REVERTED: 'REVERTED';
};
type BlockTag = RPC.EBlockTag;
declare const BlockTag: {
  readonly LATEST: 'latest';
  readonly PRE_CONFIRMED: 'pre_confirmed';
  readonly L1_ACCEPTED: 'l1_accepted';
};

type WeierstrassSignatureType = weierstrass.SignatureType;
type ArraySignatureType = string[];
type Signature = ArraySignatureType | WeierstrassSignatureType;
type BigNumberish = string | number | bigint;
type ByteArray = {
  data: BigNumberish[];
  pending_word: BigNumberish;
  pending_word_len: BigNumberish;
};
/**
 * Compiled calldata ready to be sent
 *
 * decimal-string array
 */
type Calldata = string[] & {
  readonly __compiled__?: true;
};
/**
 * "Abi Entry type"
 * @example
 * 'core::bytes_31::bytes31'
 * 'core::bool'
 * 'core::felt'
 * 'core::uint256'
 * 'core::uint512'
 */
type AbiEntryType = AbiEntry['type'];
/**
 * Represents an integer in the range [0, 2^256)
 */
interface Uint256 {
  low: BigNumberish;
  high: BigNumberish;
}
/**
 * Represents an integer in the range [0, 2^256)
 */
interface Uint512 {
  limb0: BigNumberish;
  limb1: BigNumberish;
  limb2: BigNumberish;
  limb3: BigNumberish;
}
/**
 * BigNumberish array
 *
 * use CallData.compile() to convert to Calldata
 */
type RawCalldata = BigNumberish[];
/**
 * Hexadecimal-string array
 */
type HexCalldata = string[];
type AllowArray<T> = T | T[];
type OptionalPayload<T> =
  | {
      payload: T;
    }
  | T;
type RawArgs = RawArgsObject | RawArgsArray;
type RawArgsObject = {
  [inputName: string]: MultiType | MultiType[] | RawArgs;
};
type RawArgsArray = Array<MultiType | MultiType[] | RawArgs>;
type MultiType = BigNumberish | Uint256 | object | boolean | CairoEnum;
type UniversalDeployerContractPayload = {
  classHash: BigNumberish;
  salt?: string;
  unique?: boolean;
  constructorCalldata?: RawArgs;
  abi?: Abi;
};
type DeployAccountContractPayload = {
  classHash: string;
  constructorCalldata?: RawArgs;
  addressSalt?: BigNumberish;
  contractAddress?: string;
};
type DeployAccountContractTransaction = Omit<DeployAccountContractPayload, 'contractAddress'> & {
  signature?: Signature;
};
/**
 * Base payload for declaring a contract on Starknet
 */
type BaseDeclareContractPayload = {
  /** The compiled contract (JSON object) or path to compiled contract file */
  contract: CompiledContract | string;
  /**
   * Class hash of the contract. Optional optimization - if not provided,
   * it will be computed from the contract
   */
  classHash?: string;
};
/**
 * Declare contract with CASM code
 */
type DeclareWithCasm = BaseDeclareContractPayload & {
  /** Compiled Sierra Assembly (CASM) code */
  casm: CompiledSierraCasm;
  /** Hash of the compiled CASM. Optional - will be computed from casm if not provided */
  compiledClassHash?: string;
};
/**
 * Declare contract with pre-computed compiled class hash (optimization)
 */
type DeclareWithCompiledClassHash = BaseDeclareContractPayload & {
  /** Hash of the compiled CASM */
  compiledClassHash: string;
  /** CASM is not needed when compiledClassHash is provided */
  casm?: never;
};
/**
 * Payload for declaring a contract on Starknet.
 * Either provide CASM code, or a pre-computed compiledClassHash for optimization.
 */
type DeclareContractPayload = DeclareWithCasm | DeclareWithCompiledClassHash;
/**
 * DeclareContractPayload with classHash or contract defined
 */
type ContractClassIdentifier =
  | DeclareContractPayload
  | {
      classHash: string;
    };
type CompleteDeclareContractPayload = {
  contract: CompiledContract | string;
  classHash: string;
  casm?: CompiledSierraCasm;
  compiledClassHash: string;
};
type DeclareAndDeployContractPayload = Omit<UniversalDeployerContractPayload, 'classHash'> &
  DeclareContractPayload;
type DeclareContractTransaction = {
  contract: ContractClass;
  senderAddress: string;
  signature?: Signature;
  compiledClassHash?: string;
};
type CallDetails = {
  contractAddress: string;
  calldata?: RawArgs | Calldata;
};
type Invocation = CallDetails & {
  signature?: Signature;
  /** Proof facts to include in the transaction (RPC 0.10.1+) */
  proofFacts?: BigNumberish[];
  /** Proof for the transaction (RPC 0.10.1+) - base64 encoded string */
  proof?: string;
};
type Call = CallDetails & {
  entrypoint: string;
};
type CairoVersion = '0' | '1' | undefined;
type CompilerVersion = '0' | '1' | '2' | undefined;
type InvocationsDetails = {
  nonce?: BigNumberish;
  maxFee?: BigNumberish;
  version?: BigNumberish;
} & Partial<V3TransactionDetails>;
type V3TransactionDetails = {
  nonce: BigNumberish;
  version: BigNumberish;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
  accountDeploymentData: BigNumberish[];
  nonceDataAvailabilityMode: EDataAvailabilityMode$1;
  feeDataAvailabilityMode: EDataAvailabilityMode$1;
  /** Proof facts to include in the transaction (RPC 0.10.1+) */
  proofFacts?: BigNumberish[];
  /** Proof for the transaction (RPC 0.10.1+) - base64 encoded string */
  proof?: string;
};
/**
 * Contain all additional details params
 */
type Details = {
  nonce: BigNumberish;
  maxFee: BigNumberish;
  version: BigNumberish;
  chainId: _StarknetChainId;
};
type InvocationsDetailsWithNonce =
  | (InvocationsDetails & {
      nonce: BigNumberish;
    })
  | V3TransactionDetails;
/**
 * new statuses are defined by props: finality_status and execution_status
 * to be #deprecated
 */
type BlockNumber = BlockTag | null | number;
/**
 * hex string and BigInt are detected as block hashes
 *
 * decimal string and number are detected as block numbers
 *
 * text string are detected as block tag
 *
 * null return 'latest' block tag
 */
type BlockIdentifier = BlockNumber | BigNumberish;
type SubscriptionBlockTag = Extract<SUBSCRIPTION_BLOCK_ID, string>;
type SubscriptionBlockIdentifier = SubscriptionBlockTag | (string & {}) | number | bigint;
/**
 * items used by AccountInvocations
 */
type AccountInvocationItem = (
  | ({
      type: typeof ETransactionType.DECLARE;
    } & DeclareContractTransaction)
  | ({
      type: typeof ETransactionType.DEPLOY_ACCOUNT;
    } & DeployAccountContractTransaction)
  | ({
      type: typeof ETransactionType.INVOKE;
    } & Invocation)
) &
  InvocationsDetailsWithNonce;
/**
 * Complete invocations array with account details (internal type from account -> provider)
 */
type AccountInvocations = AccountInvocationItem[];
/**
 * Invocations array user provide to bulk method (simulate)
 */
type Invocations = Array<
  | ({
      type: typeof ETransactionType.DECLARE;
    } & OptionalPayload<DeclareContractPayload>)
  | ({
      type: typeof ETransactionType.DEPLOY;
    } & OptionalPayload<AllowArray<UniversalDeployerContractPayload>>)
  | ({
      type: typeof ETransactionType.DEPLOY_ACCOUNT;
    } & OptionalPayload<DeployAccountContractPayload>)
  | ({
      type: typeof ETransactionType.INVOKE;
    } & OptionalPayload<AllowArray<Call>>)
>;
type Tupled = {
  element: any;
  type: string;
};
type Args = {
  [inputName: string]: BigNumberish | BigNumberish[] | ParsedStruct | ParsedStruct[];
};
type ParsedStruct = {
  [key: string]: BigNumberish | BigNumberish[] | ParsedStruct | Uint256;
};
type waitForTransactionOptions = {
  /**
   * Define the number of retries before throwing an error for the transaction life cycle when the transaction is not found after it had a valid status.
   * This is useful for nodes that are not fully synced yet when connecting to service that rotate nodes.
   */
  lifeCycleRetries?: number;
  /**
   * Define the number of retries before throwing an error
   */
  retries?: number;
  /**
   * Define the time interval between retries in milliseconds
   */
  retryInterval?: number;
  /**
   * Define which states are considered as successful
   */
  successStates?: Array<TransactionFinalityStatus | TransactionExecutionStatus>;
  /**
   * Define which states are considered as errors
   */
  errorStates?: Array<TransactionFinalityStatus | TransactionExecutionStatus>;
};
type getSimulateTransactionOptions = {
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
  skipExecute?: boolean;
  skipFeeCharge?: boolean;
  /** Include initial storage reads in the trace response (RPC 0.10.1+) */
  returnInitialReads?: boolean;
};
/**
 * Options for getBlockTransactionsTraces
 */
type getBlockTransactionsTracesOptions = {
  blockIdentifier?: BlockIdentifier;
  /** Include initial storage reads in the trace response (RPC 0.10.1+) */
  returnInitialReads?: boolean;
};
type getContractVersionOptions = {
  blockIdentifier?: BlockIdentifier;
  compiler?: boolean;
};
type getEstimateFeeBulkOptions = {
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
};
/**
 * Represent Contract version
 */
type ContractVersion = {
  /** version of the cairo language */
  cairo: CairoVersion;
  /** version of the cairo compiler used to compile the contract */
  compiler: CompilerVersion;
};

declare const LogLevelIndex: {
  DEBUG: number;
  INFO: number;
  WARN: number;
  ERROR: number;
  FATAL: number;
  OFF: number;
};
type LogLevelIndex = ValuesType<typeof LogLevelIndex>;
type LogLevel = keyof typeof LogLevelIndex;

type TransactionStatusReceiptSets = {
  SUCCEEDED: SuccessfulTransactionReceiptResponse;
  REVERTED: RevertedTransactionReceiptResponse;
  ERROR: Error;
};
type TransactionReceiptStatus = keyof TransactionStatusReceiptSets;
type TransactionReceiptValue = TransactionStatusReceiptSets[TransactionReceiptStatus];
type TransactionReceiptCallbacksDefined = {
  [key in TransactionReceiptStatus]: (response: TransactionStatusReceiptSets[key]) => void;
};
type TransactionReceiptCallbacksDefault = Partial<TransactionReceiptCallbacksDefined> & {
  _: () => void;
};
type TransactionReceiptCallbacks =
  | TransactionReceiptCallbacksDefined
  | TransactionReceiptCallbacksDefault;
type SuccessfulTransactionReceiptResponseHelper = SuccessfulTransactionReceiptResponse & {
  readonly statusReceipt: 'SUCCEEDED';
  readonly value: SuccessfulTransactionReceiptResponse;
  match(callbacks: TransactionReceiptCallbacks): void;
  isSuccess(): this is SuccessfulTransactionReceiptResponseHelper;
  isReverted(): this is RevertedTransactionReceiptResponseHelper;
  isError(): this is ErrorReceiptResponseHelper;
};
type RevertedTransactionReceiptResponseHelper = RevertedTransactionReceiptResponse & {
  readonly statusReceipt: 'REVERTED';
  readonly value: RevertedTransactionReceiptResponse;
  match(callbacks: TransactionReceiptCallbacks): void;
  isSuccess(): this is SuccessfulTransactionReceiptResponseHelper;
  isReverted(): this is RevertedTransactionReceiptResponseHelper;
  isError(): this is ErrorReceiptResponseHelper;
};
type ErrorReceiptResponseHelper = {
  readonly statusReceipt: 'ERROR';
  readonly value: Error;
  match(callbacks: TransactionReceiptCallbacks): void;
  isSuccess(): this is SuccessfulTransactionReceiptResponseHelper;
  isReverted(): this is RevertedTransactionReceiptResponseHelper;
  isError(): this is ErrorReceiptResponseHelper;
};
type GetTransactionReceiptResponse =
  | SuccessfulTransactionReceiptResponseHelper
  | RevertedTransactionReceiptResponseHelper
  | ErrorReceiptResponseHelper;

declare abstract class ResponseParser {
  abstract parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse;
  abstract parseGetTransactionResponse(res: any): GetTransactionResponse;
  abstract parseGetTransactionReceiptResponse(res: any): GetTransactionReceiptResponse;
  abstract parseCallContractResponse(res: any): CallContractResponse;
  abstract parseInvokeFunctionResponse(res: any): InvokeFunctionResponse;
  abstract parseDeployContractResponse(res: any): DeployContractResponse;
  abstract parseDeclareContractResponse(res: any): DeclareContractResponse;
  abstract parseSimulateTransactionResponse(res: any): SimulateTransactionOverheadResponse;
}

/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

declare class RPCResponseParser implements Omit<
  ResponseParser,
  | 'parseDeclareContractResponse'
  | 'parseDeployContractResponse'
  | 'parseInvokeFunctionResponse'
  | 'parseGetTransactionReceiptResponse'
  | 'parseGetTransactionResponse'
  | 'parseCallContractResponse'
> {
  private resourceBoundsOverhead;
  constructor(resourceBoundsOverhead?: RpcProviderOptions['resourceBoundsOverhead']);
  parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse;
  parseTransactionReceipt(res: TransactionReceipt): GetTxReceiptResponseWithoutHelper;
  parseFeeEstimateBulkResponse(res: ApiEstimateFeeResponse): EstimateFeeResponseBulkOverhead;
  parseSimulateTransactionResponse(
    res: SimulateTransactionResponse
  ): SimulateTransactionOverheadResponse;
  parseContractClassResponse(res: ContractClassPayload): ContractClassResponse;
  parseL1GasPriceResponse(res: BlockWithTxHashes): string;
  parseStorageResponse(
    res: RPCSPEC0103.FELT | RPCSPEC0103.STORAGE_RESULT
  ): RPCSPEC0103.STORAGE_RESULT;
}

declare abstract class ProviderInterface {
  abstract channel: RpcChannel$2 | RpcChannel$1 | RpcChannel;
  abstract responseParser: RPCResponseParser;
  /**
   * Gets the Starknet chain Id
   *
   * @returns the chain Id
   */
  abstract getChainId(): Promise<_StarknetChainId>;
  /**
   * Calls a function on the Starknet contract.
   *
   * @param call transaction to be called
   * @param blockIdentifier block identifier
   * @returns the result of the function on the smart contract.
   */
  abstract callContract(
    call: Call,
    blockIdentifier?: BlockIdentifier
  ): Promise<CallContractResponse>;
  /**
   * Gets the header and the transaction hashes of a block (RPC `starknet_getBlockWithTxHashes`).
   *
   * The response contains the block metadata (hash, number, parent hash, timestamp, status,
   * gas prices, sequencer address, ...) plus a `transactions` array holding only the **hashes**
   * of the transactions included in the block — not their content.
   * To get the full transactions use {@link getBlockWithTxs}, and for their receipts use
   * {@link getBlockWithReceipts}.
   *
   * @param blockIdentifier - which block to fetch. Accepts:
   * - a block number: `number` or decimal `string` (e.g. `123456`)
   * - a block hash: hex `string` or `bigint` (e.g. `'0x3a1b...'`)
   * - a block tag `string`:
   *   - `'latest'` — the most recent block already accepted on L2
   *   - `'pre_confirmed'` — the block currently being built, not yet closed (its fields differ:
   *     no `block_hash`/`status`, hence the dedicated {@link PreConfirmedBlock} return type)
   * - `null` — resolved as the `'latest'` tag
   *
   * When omitted, the provider's default block identifier is used (`'latest'`).
   *
   * @returns the block header together with the list of its transaction hashes
   *
   * @example
   * ```typescript
   * const block = await provider.getBlock('latest');
   * // {
   * //   status: 'ACCEPTED_ON_L2',
   * //   block_hash: '0x3a1b...',
   * //   block_number: 123456,
   * //   parent_hash: '0x28f5...',
   * //   timestamp: 1700000000,
   * //   sequencer_address: '0x1176a1...',
   * //   transactions: ['0x1d2c...', '0x5e8f...'],  // transaction hashes only
   * //   ...
   * // }
   *
   * // By block number or hash:
   * await provider.getBlock(123456);
   * await provider.getBlock('0x3a1b...');
   *
   * // Block still being built (fields differ from a closed block):
   * const pending = await provider.getBlock('pre_confirmed');
   * ```
   */
  abstract getBlock(): Promise<Block$1>;
  abstract getBlock(blockIdentifier: 'pre_confirmed'): Promise<PreConfirmedBlock>;
  abstract getBlock(blockIdentifier: 'latest'): Promise<Block$1>;
  abstract getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse>;
  /**
   * Gets the contract class of the deployed contract.
   *
   * @param contractAddress - contract address
   * @param blockIdentifier - block identifier
   * @returns Contract class of compiled contract
   */
  abstract getClassAt(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClassResponse>;
  /**
   * Gets the price of l1 gas in the block
   *
   * @param blockIdentifier block identifier
   * @returns gas price of the block
   */
  abstract getL1GasPrice(blockIdentifier?: BlockIdentifier): Promise<string>;
  /**
   * Get L1 message hash from L2 transaction hash
   * @param {BigNumberish} l2TxHash L2 transaction hash
   * @returns {string} Hex string of L1 message hash
   * @example
   * In Sepolia Testnet :
   * ```typescript
   * const result = provider.getL1MessageHash('0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819');
   * // result = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
   * ```
   */
  abstract getL1MessageHash(l2TxHash: BigNumberish): Promise<string>;
  /**
   * Returns the contract class hash in the given block for the contract deployed at the given address
   *
   * @param contractAddress - contract address
   * @param blockIdentifier - block identifier
   * @returns Class hash
   */
  abstract getClassHashAt(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<string>;
  /**
   * Returns the contract class deployed under the given class hash.
   *
   * @param classHash - class hash
   * @returns Contract class of compiled contract
   */
  abstract getClassByHash(classHash: BigNumberish): Promise<ContractClassResponse>;
  /**
   * Returns the nonce associated with the given address in the given block
   *
   * @param contractAddress - contract address
   * @returns the hex nonce
   */
  abstract getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<Nonce>;
  /**
   * Get the value of the storage (contract's variable) at the given address and key
   *
   * @param contractAddress
   * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
   * @param blockIdentifier - block identifier
   * @returns the value of the storage variable
   */
  abstract getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier,
    responseFlags?: RPCSPEC0103.STORAGE_RESPONSE_FLAG[]
  ): Promise<StorageResponse>;
  /**
   * Gets the transaction information from a tx id.
   *
   * @param transactionHash
   * @param options - (optional) additional request options
   *  - includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)
   * @returns the transaction object \{ transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? \}
   */
  abstract getTransaction(
    transactionHash: BigNumberish,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<GetTransactionResponse>;
  /**
   * Gets the transaction receipt from a tx hash.
   *
   * @param transactionHash
   * @returns the transaction receipt object
   */
  abstract getTransactionReceipt(
    transactionHash: BigNumberish
  ): Promise<GetTransactionReceiptResponse>;
  /**
   * Deploys a given compiled Account contract (json) to starknet
   *
   * @param payload payload to be deployed containing:
   * - compiled contract code
   * - constructor calldata
   * - address salt
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  abstract deployAccountContract(
    payload: DeployAccountContractPayload,
    details: InvocationsDetailsWithNonce
  ): Promise<DeployContractResponse>;
  /**
   * Invokes a function on starknet
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - (optional) the entrypoint of the contract
   * - calldata - (optional, defaults to []) the calldata
   * - signature - (optional, defaults to []) the signature
   * @param details - optional details containing:
   * - nonce - optional nonce
   * - version - optional version
   * - maxFee - optional maxFee
   * @returns response from addTransaction
   */
  abstract invokeFunction(
    invocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<InvokeFunctionResponse>;
  /**
   * Declares a given compiled contract (json) to starknet
   * @param transaction transaction payload to be deployed containing:
   * - compiled contract code
   * - sender address
   * - signature
   * @param details Invocation Details containing:
   * - nonce
   * - optional version
   * - optional maxFee
   * @returns a confirmation of sending a transaction on the starknet contract
   */
  abstract declareContract(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<DeclareContractResponse>;
  /**
   * Estimates the fee for a given INVOKE transaction
   *
   * @param invocation the invocation object containing:
   * - contractAddress - the address of the contract
   * - entrypoint - (optional) the entrypoint of the contract
   * - calldata - (optional, defaults to []) the calldata
   * - signature - (optional, defaults to []) the signature
   * @param details - optional details containing:
   * - nonce - optional nonce
   * - version - optional version
   * @param blockIdentifier - (optional) block identifier
   * @param skipValidate - (optional) skip cairo __validate__ method
   * @returns the estimated fee
   * @deprecated Consider using getEstimateFeeBulk for multiple transactions
   * @example
   * ```typescript
   * const feeEstimate = await provider.getInvokeEstimateFee(invocation, details);
   * // Equivalent to:
   * const [feeEstimate] = await provider.getEstimateFeeBulk([{ type: ETransactionType.INVOKE, ...invocation, ...details }], options);
   * ```
   * @remarks This method is an alias that calls getEstimateFeeBulk with a single transaction
   */
  abstract getInvokeEstimateFee(
    invocation: Invocation,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;
  /**
   * Estimates the fee for a given DECLARE transaction
   *
   * @param transaction transaction payload to be declared containing:
   * - compiled contract code
   * - sender address
   * - signature - (defaults to []) the signature
   * @param details - optional details containing:
   * - nonce
   * - version - optional version
   * - optional maxFee
   * @param blockIdentifier - (optional) block identifier
   * @param skipValidate - (optional) skip cairo __validate__ method
   * @returns the estimated fee
   * @deprecated Consider using getEstimateFeeBulk for multiple transactions
   * @example
   * ```typescript
   * const feeEstimate = await provider.getDeclareEstimateFee(transaction, details);
   * // Equivalent to:
   * const [feeEstimate] = await provider.getEstimateFeeBulk([{ type: ETransactionType.DECLARE, ...transaction, ...details }], options);
   * ```
   * @remarks This method is an alias that calls getEstimateFeeBulk with a single transaction
   */
  abstract getDeclareEstimateFee(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;
  /**
   * Estimates the fee for a given DEPLOY_ACCOUNT transaction
   *
   * @param transaction transaction payload to be deployed containing:
   * - classHash
   * - constructorCalldata
   * - addressSalt
   * - signature - (defaults to []) the signature
   * @param details - optional details containing:
   * - nonce
   * - version - optional version
   * - optional maxFee
   * @param blockIdentifier - (optional) block identifier
   * @param skipValidate - (optional) skip cairo __validate__ method
   * @returns the estimated fee
   * @deprecated Consider using getEstimateFeeBulk for multiple transactions
   * @example
   * ```typescript
   * const feeEstimate = await provider.getDeployAccountEstimateFee(transaction, details);
   * // Equivalent to:
   * const [feeEstimate] = await provider.getEstimateFeeBulk([{ type: ETransactionType.DEPLOY_ACCOUNT, ...transaction, ...details }], options);
   * ```
   * @remarks This method is an alias that calls getEstimateFeeBulk with a single transaction
   */
  abstract getDeployAccountEstimateFee(
    transaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;
  /**
   * Estimates the fee for a list of INVOKE transaction
   *
   * @param invocations AccountInvocations - Complete invocations array with account details
   * @param options getEstimateFeeBulkOptions
   * - (optional) blockIdentifier - BlockIdentifier
   * @returns the estimated fee
   */
  abstract getEstimateFeeBulk(
    invocations: AccountInvocations,
    options?: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulkOverhead>;
  /**
   * Wait for the transaction to be accepted
   * @param txHash - transaction hash
   * @param options waitForTransactionOptions
   * - (optional) retryInterval: number | undefined;
   * - (optional) successStates: TransactionStatus[] | undefined;
   * @return GetTransactionReceiptResponse
   */
  abstract waitForTransaction(
    txHash: BigNumberish,
    options?: waitForTransactionOptions
  ): Promise<GetTransactionReceiptResponse>;
  /**
   * Simulates the transaction and returns the transaction trace and estimated fee.
   *
   * @param invocations AccountInvocations - Complete invocations array with account details
   * @param options - getSimulateTransactionOptions
   *  - (optional) blockIdentifier - block identifier
   *  - (optional) skipValidate - skip cairo __validate__ method
   *  - (optional) skipExecute - skip cairo __execute__ method
   *  - (optional) returnInitialReads - include initial storage reads in the trace response (RPC 0.10.1+)
   * @returns an array of transaction trace and estimated fee
   */
  abstract getSimulateTransaction(
    invocations: AccountInvocations,
    options?: getSimulateTransactionOptions
  ): Promise<SimulateTransactionOverheadResponse>;
  /**
   * Gets the state changes in a specific block (result of executing the requested block)
   *
   * @param blockIdentifier - block identifier
   * @returns StateUpdateResponse
   */
  abstract getStateUpdate(
    blockIdentifier?: BlockIdentifier,
    contractAddresses?: BigNumberish[]
  ): Promise<StateUpdateResponse>;
  /**
   * Gets the state changes in a specific block (result of executing the requested block)
   * Alternative method name for getStateUpdate with specific overloads
   *
   * @returns StateUpdateResponse
   */
  abstract getBlockStateUpdate(): Promise<StateUpdate>;
  abstract getBlockStateUpdate(blockIdentifier: 'pre_confirmed'): Promise<PreConfirmedStateUpdate>;
  abstract getBlockStateUpdate(blockIdentifier: 'latest'): Promise<StateUpdate>;
  abstract getBlockStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse>;
  /**
   * Gets the contract version from the provided address
   * @param contractAddress string
   * @param classHash undefined
   * @param options - getContractVersionOptions
   *   - (optional) compiler - (default true) extract compiler version using type tactic from abi
   *   - (optional) blockIdentifier - block identifier
   */
  abstract getContractVersion(
    contractAddress: BigNumberish,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  /**
   * Gets the contract version from the provided address
   * @param contractAddress undefined
   * @param classHash
   * @param options - getContractVersionOptions
   *   - (optional) compiler - (default true) extract compiler version using type tactic from abi
   *   - (optional) blockIdentifier - block identifier
   */
  abstract getContractVersion(
    contractAddress: undefined,
    classHash: BigNumberish,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  /**
   * Get the most recent accepted block hash and number
   * @returns Object containing block hash and number
   */
  abstract getBlockLatestAccepted(): Promise<{
    block_hash: string;
    block_number: number;
  }>;
  /**
   * Get the most recent accepted block number
   * @returns Number of the latest block
   */
  abstract getBlockNumber(): Promise<number>;
  /**
   * Get block information with transaction hashes
   * @param blockIdentifier - block identifier
   * @returns Block with transaction hashes
   */
  abstract getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<any>;
  /**
   * Get block information with full transactions
   * @param blockIdentifier - block identifier
   * @param options - (optional) additional request options
   *  - includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)
   * @returns Block with full transactions
   */
  abstract getBlockWithTxs(
    blockIdentifier?: BlockIdentifier,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<any>;
  /**
   * Get block information with transaction receipts
   * @param blockIdentifier - block identifier
   * @param options - (optional) additional request options
   *  - includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)
   * @returns Block with transaction receipts
   */
  abstract getBlockWithReceipts(
    blockIdentifier?: BlockIdentifier,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<any>;
  /**
   * Get transaction traces for all transactions in a block
   * @param blockIdentifier - block identifier
   * @param options - (optional) additional request options
   *  - returnInitialReads - include initial storage reads in the trace response (RPC 0.10.1+)
   * @returns Array of transaction traces
   */
  abstract getBlockTransactionsTraces(
    blockIdentifier?: BlockIdentifier,
    options?: {
      returnInitialReads?: boolean;
    }
  ): Promise<any>;
  /**
   * Get the number of transactions in a block
   * @param blockIdentifier - block identifier
   * @returns Transaction count
   */
  abstract getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;
  /**
   * Pause execution until a specified block is created
   * @param blockIdentifier - block number or tag
   * @param retryInterval - milliseconds between requests (default: 5000)
   * @example
   * ```typescript
   * await provider.waitForBlock(12345);
   * await provider.waitForBlock('latest');
   * ```
   */
  abstract waitForBlock(blockIdentifier?: BlockIdentifier, retryInterval?: number): Promise<void>;
  /**
   * Gets the transaction information from a tx hash (alias for getTransaction)
   * @param txHash - transaction hash
   * @param options - (optional) additional request options
   *  - includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)
   * @returns Transaction information
   */
  abstract getTransactionByHash(
    txHash: BigNumberish,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<GetTransactionResponse>;
  /**
   * Gets transaction by block identifier and index
   * @param blockIdentifier - block identifier
   * @param index - transaction index in the block
   * @param options - (optional) additional request options
   *  - includeProofFacts - include proof facts in the transaction response (RPC 0.10.1+)
   * @returns Transaction information
   */
  abstract getTransactionByBlockIdAndIndex(
    blockIdentifier: BlockIdentifier,
    index: number,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<GetTransactionResponse>;
  /**
   * Gets the transaction trace
   * @param txHash - transaction hash
   * @returns Transaction trace
   */
  abstract getTransactionTrace(
    txHash: BigNumberish
  ): Promise<RPCSPEC0103.TRANSACTION_TRACE | RPC.TRANSACTION_TRACE>;
  /**
   * Get the status of a transaction
   * @param transactionHash - transaction hash
   * @returns Transaction status
   */
  abstract getTransactionStatus(transactionHash: BigNumberish): Promise<any>;
  /**
   * Direct RPC method call
   * @param method - RPC method name
   * @param params - method parameters
   * @param id - request ID
   * @returns RPC response
   */
  abstract fetch(method: string, params?: object, id?: string | number): Promise<any>;
  /**
   * Read channel spec version
   * @returns Spec version string or undefined if not set
   */
  abstract readSpecVersion(): string | undefined;
  /**
   * Get channel spec version
   * @returns Promise resolving to spec version
   */
  abstract getSpecVersion(): Promise<string>;
  /**
   * Setup channel spec version and return it
   * @returns Promise resolving to spec version
   */
  abstract setUpSpecVersion(): Promise<string>;
  /**
   * Get contract class by hash with optional block identifier
   * @param classHash - class hash
   * @param blockIdentifier - block identifier
   * @returns Contract class
   */
  abstract getClass(
    classHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<ContractClassResponse>;
  /**
   * Estimate the fee for a message from L1
   * @param message - L1 message
   * @param blockIdentifier - block identifier
   * @returns Fee estimate
   */
  abstract estimateMessageFee(
    message: RPC.L1Message,
    blockIdentifier?: BlockIdentifier
  ): Promise<RPCSPEC0103.FEE_ESTIMATE | RPC.MESSAGE_FEE_ESTIMATE>;
  /**
   * Get node synchronization status
   * @returns Sync status or false if not syncing
   */
  abstract getSyncingStats(): Promise<any>;
  /**
   * Get events matching the given filter
   * @param eventFilter - event filter
   * @returns Events and pagination info
   */
  abstract getEvents(
    eventFilter: RPCSPEC0103.EventFilter | RPC.EventFilter
  ): Promise<RPCSPEC0103.EVENTS_CHUNK | RPC.EVENTS_CHUNK>;
  /**
   * Verify in Starknet a signature of a TypedData object or of a given hash.
   * @param {BigNumberish | TypedData} message TypedData object to be verified, or message hash to be verified.
   * @param {Signature} signature signature of the message.
   * @param {BigNumberish} accountAddress address of the account that has signed the message.
   * @param {string} [signatureVerificationFunctionName] if account contract with non standard account verification function name.
   * @param [signatureVerificationResponse] if account contract with non standard response of verification function.
   * @returns
   * ```typescript
   * const myTypedMessage: TypedMessage = .... ;
   * const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
   * const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
   * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
   * const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
   * const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
   * // result1 = result2 = true
   * ```
   */
  abstract verifyMessageInStarknet(
    message: BigNumberish | TypedData,
    signature: Signature,
    accountAddress: BigNumberish,
    signatureVerificationFunctionName?: string,
    signatureVerificationResponse?: {
      okResponse: string[];
      nokResponse: string[];
      error: string[];
    }
  ): Promise<boolean>;
  /**
   * Test if class is already declared
   * @param contractClassIdentifier - contract class identifier
   * @param blockIdentifier - block identifier
   * @returns true if class is declared
   */
  abstract isClassDeclared(
    contractClassIdentifier: ContractClassIdentifier,
    blockIdentifier?: BlockIdentifier
  ): Promise<boolean>;
  /**
   * Build bulk invocations with auto-detect declared class
   * @param invocations - array of invocations
   * @returns Prepared invocations
   */
  abstract prepareInvocations(invocations: Invocations): Promise<Invocations>;
  /**
   * Get L1 messages status for a transaction
   * @param transactionHash - L1 transaction hash
   * @returns L1 message status
   */
  abstract getL1MessagesStatus(
    transactionHash: BigNumberish
  ): Promise<RPCSPEC0103.L1L2MessagesStatus | RPC.L1L2MessagesStatus>;
  /**
   * Get Merkle paths in state tries
   * @param classHashes - class hashes
   * @param contractAddresses - contract addresses
   * @param contractsStorageKeys - storage keys
   * @param blockIdentifier - block identifier
   * @returns Storage proof
   */
  abstract getStorageProof(
    classHashes: BigNumberish[],
    contractAddresses: BigNumberish[],
    contractsStorageKeys: CONTRACT_STORAGE_KEYS[],
    blockIdentifier?: BlockIdentifier
  ): Promise<StorageProof>;
  /**
   * Get compiled CASM contract class
   * @param classHash - class hash
   * @returns Compiled CASM contract class
   */
  abstract getCompiledCasm(classHash: BigNumberish): Promise<CASM_COMPILED_CONTRACT_CLASS>;
  /**
   * Get transaction tip estimation based on network analysis
   * @param blockIdentifier - block identifier to analyze from
   * @param options - tip analysis options
   * @returns Tip estimation with statistics
   * @example
   * ```typescript
   * const tipEstimate = await provider.getEstimateTip('latest', {
   *   maxBlocks: 10,
   *   minTxsNecessary: 5
   * });
   * console.log('Recommended tip:', tipEstimate.recommendedTip);
   * ```
   */
  abstract getEstimateTip(
    blockIdentifier?: BlockIdentifier,
    options?: TipAnalysisOptions
  ): Promise<TipEstimate>;
}

declare abstract class SignerInterface {
  /**
   * Method to get the public key of the signer
   *
   * @returns {Promise<string>} hex-string public key
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const result = await mySigner.getPubKey();
   * // result = "0x566d69d8c99f62bc71118399bab25c1f03719463eab8d6a444cd11ece131616"
   * ```
   */
  abstract getPubKey(): Promise<string>;
  /**
   * Signs a JSON object for off-chain usage with the private key and returns the signature.
   * This adds a message prefix so it can't be interchanged with transactions
   *
   * @param {TypedData} typedData - JSON object to be signed
   * @param {string} accountAddress - Hex string of the account's address
   * @returns {Promise<Signature>} the signature of the message
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myTypedData: TypedData = {
   *   domain: {
   *     name: "Example DApp",
   *     chainId: constants.StarknetChainId.SN_SEPOLIA,
   *     version: "0.0.3"
   *   },
   *   types: {
   *     StarkNetDomain: [
   *       { name: "name", type: "string" },
   *       { name: "chainId", type: "felt" },
   *       { name: "version", type: "string" }
   *     ],
   *     Message: [{ name: "message", type: "felt" }]
   *   },
   *   primaryType: "Message",
   *   message: { message: "1234" }
   * };
   * const result = await mySigner.signMessage(myTypedData, "0x5d08a4e9188429da4e993c9bf25aafe5cd491ee2b501505d4d059f0c938f82d");
   * // result = Signature {r: 684915484701699003335398790608214855489903651271362390249153620883122231253n,
   * // s: 1399150959912500412309102776989465580949387575375484933432871778355496929189n, recovery: 1}
   * ```
   */
  abstract signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;
  /**
   * Signs INVOKE transactions with the private key and returns the signature
   *
   * @param {Call[]} transactions - Array of Call objects representing the transactions
   * @param {InvocationsSignerDetails} transactionsDetail - Transaction details including V3 fields
   * @returns {Promise<Signature>} the signature of the transaction
   * @remarks Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const calls: Call[] = [{
   *   contractAddress: "0x1234567890123456789012345678901234567890",
   *   entrypoint: "transfer",
   *   calldata: ["0xRecipient", "1000", "0"]
   * }];
   * const transactionsDetail: InvocationsSignerDetails = {
   *   walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
   *   chainId: constants.StarknetChainId.SN_MAIN,
   *   cairoVersion: "1",
   *   version: "0x3",
   *   nonce: 1,
   *   resourceBounds: {
   *     l1_gas: { amount: "0x1000", price: "0x20" },
   *     l2_gas: { amount: "0x200", price: "0x5" },
   *     l1_data_gas: { amount: "0x500", price: "0x10" }
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1
   * };
   * const result = await mySigner.signTransaction(calls, transactionsDetail);
   * // result = Signature {r: 304910226421970384958146916800275294114105560641204815169249090836676768876n,
   * //   s: 1072798866000813654190523783606274062837012608648308896325315895472901074693n, recovery: 0}
   * ```
   */
  abstract signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails
  ): Promise<Signature>;
  /**
   * Signs a DEPLOY_ACCOUNT transaction with the private key and returns the signature
   *
   * @param {DeployAccountSignerDetails} transaction - Transaction details to deploy an account contract
   * @returns {Promise<Signature>} the signature of the transaction to deploy an account
   * @remarks Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myDeployAcc: DeployAccountSignerDetails = {
   *   contractAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
   *   version: "0x3",
   *   chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
   *   constructorCalldata: ["0x123", "0x456"],
   *   addressSalt: "0x789",
   *   nonce: 0,
   *   resourceBounds: {
   *     l1_gas: { amount: "0x1000", price: "0x20" },
   *     l2_gas: { amount: "0x200", price: "0x5" },
   *     l1_data_gas: { amount: "0x500", price: "0x10" }
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1
   * };
   * const result = await mySigner.signDeployAccountTransaction(myDeployAcc);
   * // result = Signature {r: 2871311234341436528393212130310036951068553852419934781736214693308640202748n,
   * //  s: 1746271646048888422437132495446973163454853863041370993384284773665861377605n, recovery: 1}
   * ```
   */
  abstract signDeployAccountTransaction(
    transaction: DeployAccountSignerDetails
  ): Promise<Signature>;
  /**
   * Signs a DECLARE transaction with the private key and returns the signature
   *
   * @param {DeclareSignerDetails} transaction - Transaction details to declare a contract class
   * @returns {Promise<Signature>} the signature of the transaction to declare a class
   * @remarks Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myDeclare: DeclareSignerDetails = {
   *   version: "0x3",
   *   chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   senderAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
   *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
   *   compiledClassHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
   *   nonce: 45,
   *   resourceBounds: {
   *     l1_gas: { amount: "0x1000", price: "0x20" },
   *     l2_gas: { amount: "0x200", price: "0x5" },
   *     l1_data_gas: { amount: "0x500", price: "0x10" }
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1
   * };
   * const result = await mySigner.signDeclareTransaction(myDeclare);
   * // result = Signature {r: 2432056944313955951711774394836075930010416436707488863728289188289211995670n,
   * //  s: 3407649393310177489888603098175002856596469926897298636282244411990343146307n, recovery: 1}
   * ```
   */
  abstract signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}

declare class Signer implements SignerInterface {
  protected pk: Uint8Array | string;
  constructor(pk?: Uint8Array | string);
  getPubKey(): Promise<string>;
  signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;
  signTransaction(transactions: Call[], details: InvocationsSignerDetails): Promise<Signature>;
  signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
  signDeclareTransaction(details: DeclareSignerDetails): Promise<Signature>;
  protected signRaw(msgHash: string): Promise<Signature>;
}

/**
 * Signer for accounts using Ethereum signature
 */
declare class EthSigner implements SignerInterface {
  protected pk: string;
  constructor(pk?: Uint8Array | string);
  /**
   * provides the Ethereum full public key (without parity prefix)
   * @returns an hex string : 64 first characters are Point X coordinate. 64 last characters are Point Y coordinate.
   */
  getPubKey(): Promise<string>;
  signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;
  signTransaction(transactions: Call[], details: InvocationsSignerDetails): Promise<Signature>;
  signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
  signDeclareTransaction(details: DeclareSignerDetails): Promise<Signature>;
  /**
   * Serialize the signature in conformity with starknet::eth_signature::Signature
   * @param ethSignature secp256k1 signature from Noble curves library
   * @return an array of felts, representing a Cairo Eth Signature.
   */
  protected formatEthSignature(ethSignature: RecoveredSignatureType): ArraySignatureType;
}

type _Transport = any;
/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 1.1.1)
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.
 */
declare class LedgerSigner111<Transport extends Record<any, any> = any> implements SignerInterface {
  readonly transporter: Transport;
  protected _transporter: _Transport;
  readonly accountID: number;
  readonly eip2645applicationName: string;
  readonly pathBuffer: Uint8Array;
  protected appVersion: string;
  protected pubKey: string;
  protected fullPubKey: string;
  /**
   * constructor of the LedgerSigner class.
   * @param {Transport} transport 5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
   * See Guides for more details.
   * @param {number} accountID ID of Ledger Nano (can handle 2**31 accounts).
   * @param {string} [eip2645application='LedgerW'] A wallet is defined by an ERC2645 derivation path (6 items),
   * and one item is the `application` and can be customized.
   * Default value is `LedgerW`.
   * @param {LedgerPathCalculation} [pathFunction=getLedgerPathBuffer111]
   * defines the function that will calculate the path. By default `getLedgerPathBuffer111` is selected.
   * @example
   * ```typescript
   * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
   * const myNodeTransport = await TransportNodeHid.create();
   * const myLedgerSigner = new LedgerSigner111(myNodeTransport, 0);
   * ```
   */
  constructor(
    transport: Transport,
    accountID: number,
    eip2645application?: string,
    pathFunction?: LedgerPathCalculation
  );
  /**
   * provides the Starknet public key
   * @returns an hex string : 64 characters are Point X coordinate.
   * @example
   * ```typescript
   * const result = await myLedgerSigner.getPubKey();
   * // result= "0x03681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e"
   * ```
   */
  getPubKey(): Promise<string>;
  /**
   * provides the full public key (with parity prefix)
   * @returns an hex string : 2 first characters are the parity, the 64 following characters are Point X coordinate. 64 last characters are Point Y coordinate.
   * @example
   * ```typescript
   * const result = await myLedgerSigner.getFullPubKey();
   * // result= "0x0403681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e03cbc86f805dcfcb0c1922dd4daf181afa289d86223a18bc856276615bcc7787"
   * ```
   */
  getFullPubKey(): Promise<string>;
  /**
   * Returns the version of the Starknet APP implemented in the Ledger.
   * @returns {string} version.
   * @example
   * ```typescript
   * const result = await myLedgerSigner.getAppVersion();
   * // result= "1.1.1"
   * ```
   */
  getAppVersion(): Promise<string>;
  /**
   * Sign a TypedData message (SNIP-12) in a Ledger.
   * @param {typedDataToHash} typedDataToHash A TypedData message compatible with SNIP-12.
   * @param {string} accountAddress Signer account address (Hex or num string)
   * @returns {Signature} The signed message.
   * @example
   * ```typescript
   * const result = myLedgerSigner.signMessage(snip12Message, account0.address);
   * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
   * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
   * // recovery: 0}
   * ```
   */
  signMessage(typedDataToHash: TypedData, accountAddress: string): Promise<Signature>;
  /**
   * Sign in a Ledger a V1 or a V3 transaction. This is a blind sign on the Ledger screen.
   * @param {Call1[]} transactions An array of `Call` transactions (generated for example by `myContract.populate()`).
   * @param {InvocationsSignerDetails} transactionsDetail An object that includes all the necessary inputs to hash the transaction. Can be `V2InvocationsSignerDetails` or `V3InvocationsSignerDetails` type.
   * @returns {Signature} The signed transaction.
   * @example
   * ```typescript
   * const txDetailsV3: V3InvocationsSignerDetails = {
   * chainId: constants.StarknetChainId.SN_MAIN,
   * nonce: "28",
   * accountDeploymentData: [],
   * paymasterData: [],
   * cairoVersion: "1",
   * feeDataAvailabilityMode: "L1",
   * nonceDataAvailabilityMode: "L1",
   * resourceBounds: {
   *   l1_gas: {
   *     max_amount: "0x2a00",
   *     max_price_per_unit: "0x5c00000"
   *   },
   *   l2_gas: {
   *     max_amount: "0x00",
   *     max_price_per_unit: "0x00"
   *   },
   * },
   * tip: 0,
   * version: "0x3",
   * walletAddress: account0.address
   * }
   * const result = myLedgerSigner.signTransaction([call0, call1], txDetailsV3);
   * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
   * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
   * // recovery: 0}
   * ```
   */
  signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails
  ): Promise<Signature>;
  /**
   * Sign in a Ledger the deployment of a new account. This is a blind sign on the Ledger screen.
   * @param {DeployAccountSignerDetails} details An object that includes all necessary data to calculate the Hash. It can be `V2DeployAccountSignerDetails` or `V3DeployAccountSignerDetails` types.
   * @returns {Signature} The deploy account signature.
   * @example
   * ```typescript
   * const result = myLedgerSigner.signDeployAccountTransaction(details);
   * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
   * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
   * // recovery: 0}
   * ```
   */
  signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
  /**
   * Sign in a Ledger the declaration of a new class. This is a blind sign on the Ledger screen.
   * @param {DeclareSignerDetails} details An object that includes all necessary data to calculate the Hash. It can be `V3DeclareSignerDetails` or `V2DeclareSignerDetails` types.
   * @returns {Signature} The declare Signature.
   * @example
   * ```typescript
   * const result = myLedgerSigner.signDeclareTransaction(details);
   * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
   * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
   * // recovery: 0}
   * ```
   */
  signDeclareTransaction(details: DeclareSignerDetails): Promise<Signature>;
  /**
   * Internal function to sign a hash in a Ledger Nano.
   * This is a blind sign in the Ledger ; no display of what you are signing.
   */
  protected signRaw(msgHash: string): Promise<Signature>;
  /** internal function to get both the Starknet public key and the full public key */
  protected getPublicKeys(): Promise<void>;
}
/**
 * Format the Ledger wallet path to an Uint8Array
 * for a Ledger Starknet DAPP v1.1.1.
 *
 * EIP2645 path = 2645'/starknet/application/0/accountId/0
 * @param {number} accountId Id of account. < 2**31.
 * @param {string} [applicationName='LedgerW'] utf8 string of application name.
 * @returns an Uint8array of 24 bytes.
 * @example
 * ```typescript
 * const result = getLedgerPathBuffer111(0);
 * // result = Uint8Array(24) [
 *   128,   0,  10,  85,  71, 65, 233, 201,
 *    43, 206, 231, 219,   0,  0,   0,   0,
 *     0,   0,   0,   0,   0,  0,   0,   0
 * ]
 * ```
 */
declare function getLedgerPathBuffer111(accountId: number, applicationName?: string): Uint8Array;

/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 2.2.1).
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.
 */
declare class LedgerSigner221<Transport extends Record<any, any> = any>
  extends LedgerSigner111
  implements SignerInterface
{
  /**
   * constructor of the LedgerSigner class.
   * @param {Transport} transport 5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
   * See Guides for more details.
   * @param {number} accountID ID of Ledger Nano (can handle 2**31 accounts).
   * @param {string} [eip2645application='LedgerW'] A wallet is defined by an ERC2645 derivation path (6 items).
   * One item is called `application` and can be customized.
   * Default value is `LedgerW`.
   * @param {LedgerPathCalculation} [pathFunction=getLedgerPathBuffer221]
   * defines the function that will calculate the path. By default `getLedgerPathBuffer221` is selected.
   *
   * If you are using APP v2.2.1 with an account created with the v1.1.1, you need to use :
   * ```typescript
   * const myLedgerSigner = new LedgerSigner211(myNodeTransport, 0, undefined, getLedgerPathBuffer111);
   * ```
   * @example
   * ```typescript
   * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
   * const myNodeTransport = await TransportNodeHid.create();
   * const myLedgerSigner = new LedgerSigner211(myNodeTransport, 0);
   * ```
   */
  constructor(
    transport: Transport,
    accountID: number,
    eip2645application?: string,
    pathFunction?: LedgerPathCalculation
  );
  /**
   * Sign in a Ledger a V1 or a V3 transaction. The details are displayed on the Ledger screen.
   * @param {Call[]} transactions An array of `Call` transactions (generated for example by `myContract.populate()`).
   * @param {InvocationsSignerDetails} transactionsDetail An object that includes all the necessary inputs to hash the transaction. Can be `V2InvocationsSignerDetails` or `V3InvocationsSignerDetails` type.
   * @returns {Signature} The signed transaction.
   * @example
   * ```typescript
   * const txDetailsV3: V3InvocationsSignerDetails = {
   * chainId: constants.StarknetChainId.SN_MAIN,
   * nonce: "28",
   * accountDeploymentData: [],
   * paymasterData: [],
   * cairoVersion: "1",
   * feeDataAvailabilityMode: "L1",
   * nonceDataAvailabilityMode: "L1",
   * resourceBounds: {
   *   l1_gas: {
   *     max_amount: "0x2a00",
   *     max_price_per_unit: "0x5c00000"
   *   },
   *   l2_gas: {
   *     max_amount: "0x00",
   *     max_price_per_unit: "0x00"
   *   },
   * },
   * tip: 0,
   * version: "0x3",
   * walletAddress: account0.address
   * }
   * const result = myLedgerSigner.signTransaction([call0, call1], txDetailsV3);
   * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
   * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
   * // recovery: 0}
   * ```
   */
  signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails
  ): Promise<Signature>;
  /**
   * Sign in a Ledger the deployment of a new account. The details are displayed on the Ledger screen.
   * @param {DeployAccountSignerDetails} details An object that includes all necessary data to calculate the Hash. It can be `V2DeployAccountSignerDetails` or `V3DeployAccountSignerDetails` types.
   * @returns {Signature} The deploy account signature.
   * @example
   * ```typescript
   * const result = myLedgerSigner.signDeployAccountTransaction(details);
   * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
   * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
   * // recovery: 0}
   * ```
   */
  signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
  /**
   * Internal function to convert a bigNumberish to an Uint8array of 256 bits
   * @param {BigNumberish} input input value
   * @returns {Uint8Array} a Uint8Array containing 32 bytes.
   */
  protected convertBnToLedger(input: BigNumberish): Uint8Array;
  /**
   * Internal function to decode the response of the Ledger signature
   * @param {Uint8Array} respSign the Buffer response of the Ledger
   * @returns { hash: bigint; signature: Signature } transaction hash & signature
   */
  protected decodeSignatureLedger(respSign: Uint8Array): {
    hash: bigint;
    signature: Signature;
  };
  /** Internal function to convert a Call to an array of Uint8Array.
   * @param {Call} call A Call to convert.
   * @return {Uint8Array[]} Call encoded in an array of Uint8Array (each containing 7 u256).
   */
  protected encodeCall(call: Call): Uint8Array[];
  /**
   * Ask to the Ledger Nano to display and sign a Starknet V3 transaction.
   * @param {V3InvocationsSignerDetails} txDetails All the details needed for a txV3.
   * @param {Call[]} calls array of Starknet invocations
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const calls: Call[] = [{contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
   *      entrypoint: "transfer",
   *      calldata:["0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016",
   *        "0x9184e72a000", "0x0"]}];
   * const txDetailsV3: V3InvocationsSignerDetails = {
   *   chainId: constants.StarknetChainId.SN_MAIN,
   *   nonce: "28", accountDeploymentData: [],
   *   paymasterData: [], cairoVersion: "1",
   *   feeDataAvailabilityMode: "L1", nonceDataAvailabilityMode: "L1",
   *   resourceBounds: {
   *     l1_gas: { max_amount: "0x2a00", max_price_per_unit: "0x5c00000"
   *     },
   *     l2_gas: { max_amount: "0x00", max_price_per_unit: "0x00"},
   *   }, tip: 0, version: "0x3", walletAddress: account0.address
   *  };
   * const res = await myLedgerSigner.signTxV3(txDetailsV3, calls);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  signTxV3(
    txDetails: V3InvocationsSignerDetails,
    calls: Call[]
  ): Promise<{
    hash: bigint;
    signature: Signature;
  }>;
  /**
   *Ask the Ledger Nano to display and sign a Starknet V3 account deployment.
   * @param {V3DeployAccountSignerDetails} deployAccountDetail All the details needed for a V3 deploy account.
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const deployData: V3DeployAccountSignerDetails =
   * {
   *  tip: 0, paymasterData: [], accountDeploymentData: [],
   *  nonceDataAvailabilityMode: 'L1', feeDataAvailabilityMode: 'L1',
   *  resourceBounds: {
   *    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
   *    l1_gas: { max_amount: '0x226', max_price_per_unit: '0x22ecb25c00' }
   *   },
   *  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
   *  constructorCalldata: [
   *    '3571125127744830445572285574469842579401255431821644822726857471463672199621'
   *  ],
   *  contractAddress: '0x4ca062add1cf12a107be1107af17981cf6e544a24d987693230ea481d3d5e34',
   *  addressSalt: '0x07e52f68e3160e1ef698211cdf6d3792368fe347e7e2d4a8ace14d9b248f39c5',
   *  chainId: '0x534e5f5345504f4c4941', maxFee: 0,
   *  version: '0x3', nonce: 0n
   *}
   * const res = await myLedgerSigner.signDeployAccountV3(deployData);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  signDeployAccountV3(deployAccountDetail: V3DeployAccountSignerDetails): Promise<{
    hash: bigint;
    signature: Signature;
  }>;
}
/**
 * Format the Ledger wallet path to an Uint8Array.
 * for a Ledger Starknet DAPP v2.2.0
 * EIP2645 path = 2645'/starknet'/application'/0'/accountId'/0
 * @param {number} accountId Id of account. < 2**31.
 * @param {string} [applicationName='LedgerW'] utf8 string of application name.
 * @returns an Uint8array of 24 bytes.
 * @example
 * ```typescript
 * const result = getLedgerPathBuffer211(0);
 * // result = Uint8Array(24) [
 *   128,   0,  10,  85, 199, 65, 233, 201,
 *   171, 206, 231, 219, 128,  0,   0,   0,
 *   128,   0,   0,   0,   0,  0,   0,   0
 * ]
 * ```
 */
declare function getLedgerPathBuffer221(accountId: number, applicationName?: string): Uint8Array;

/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 2.3.1).
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.
 */
declare class LedgerSigner231<Transport extends Record<any, any> = any>
  extends LedgerSigner221
  implements SignerInterface
{
  /**
   * constructor of the LedgerSigner class.
   * @param {Transport} transport 5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
   * See Guides for more details.
   * @param {number} accountID ID of Ledger Nano account (can handle 2**31 accounts).
   * @param {string} [eip2645application='LedgerW'] A wallet is defined by an ERC2645 derivation path (6 items).
   * One item is called `application` and can be customized.
   * Default value is `LedgerW`.
   * @param {LedgerPathCalculation} [pathFunction=getLedgerPathBuffer221]
   * defines the function that will calculate the path. By default `getLedgerPathBuffer221` is selected.
   *
   * If you are using APP v2.3.1 with an account created with the v1.1.1, you need to use :
   * ```typescript
   * const myLedgerSigner = new LedgerSigner231(myNodeTransport, 0, undefined, getLedgerPathBuffer111);
   * ```
   * @example
   * ```typescript
   * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
   * const myNodeTransport = await TransportNodeHid.create();
   * const myLedgerSigner = new LedgerSigner231(myNodeTransport, 0);
   * ```
   */
  constructor(
    transport: Transport,
    accountID: number,
    eip2645application?: string,
    pathFunction?: LedgerPathCalculation
  );
  /**
   * Ask to the Ledger Nano to display and sign a Starknet V3 transaction (Rpc 0.7 & Rpc 0.8).
   * @param {V3InvocationsSignerDetails} txDetails All the details needed for a txV3.
   * @param {Call[]} calls array of Starknet invocations
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const calls: Call[] = [{contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
   *      entrypoint: "transfer",
   *      calldata:["0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016",
   *        "0x9184e72a000", "0x0"]}];
   * const txDetailsV3: V3InvocationsSignerDetails = {
   *   chainId: constants.StarknetChainId.SN_MAIN,
   *   nonce: "28", accountDeploymentData: [],
   *   paymasterData: [], cairoVersion: "1",
   *   feeDataAvailabilityMode: "L1", nonceDataAvailabilityMode: "L1",
   *   resourceBounds: {
   *     l1_gas: { max_amount: "0x2a00", max_price_per_unit: "0x5c00000"
   *     },
   *     l2_gas: { max_amount: "0x00", max_price_per_unit: "0x00"},
   *   }, tip: 0, version: "0x3", walletAddress: account0.address
   *  }; // Rpc 0.7 transaction.
   * const res = await myLedgerSigner.signTxV3(txDetailsV3, calls);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  signTxV3(
    txDetails: V3InvocationsSignerDetails,
    calls: Call[]
  ): Promise<{
    hash: bigint;
    signature: Signature;
  }>;
  /**
   *Ask the Ledger Nano to display and sign a Starknet V3 account deployment (Rpc 0.7 & Rpc 0.8).
   * @param {V3DeployAccountSignerDetails} deployAccountDetail All the details needed for a V3 deploy account.
   * @returns an object including the transaction Hash and the signature
   * @example
   * ```typescript
   * const deployData: V3DeployAccountSignerDetails =
   * {
   *  tip: 0, paymasterData: [], accountDeploymentData: [],
   *  nonceDataAvailabilityMode: 'L1', feeDataAvailabilityMode: 'L1',
   *  resourceBounds: {
   *    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
   *    l1_gas: { max_amount: '0x226', max_price_per_unit: '0x22ecb25c00' }
   *   },
   *  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
   *  constructorCalldata: [
   *    '3571125127744830445572285574469842579401255431821644822726857471463672199621'
   *  ],
   *  contractAddress: '0x4ca062add1cf12a107be1107af17981cf6e544a24d987693230ea481d3d5e34',
   *  addressSalt: '0x07e52f68e3160e1ef698211cdf6d3792368fe347e7e2d4a8ace14d9b248f39c5',
   *  chainId: '0x534e5f5345504f4c4941', maxFee: 0,
   *  version: '0x3', nonce: 0n
   *} // Rpc 0.7 transaction.
   * const res = await myLedgerSigner.signDeployAccountV3(deployData);
   * // res = {hash:
   * //   signature:
   * // }
   * ```
   */
  signDeployAccountV3(deployAccountDetail: V3DeployAccountSignerDetails): Promise<{
    hash: bigint;
    signature: Signature;
  }>;
  /** Internal function to convert a Call to an array of Uint8Array.
   * @param {Call} call A Call to convert.
   * @return {Uint8Array[]} Call encoded in an array of Uint8Array (each containing 7 u256).
   */
  protected encodeCall(call: Call): Uint8Array[];
}

/**
 * Interface for Deployer contract payload
 */
type DeployerCall = {
  /** an array of Call */
  calls: Call[];
  /** an array of addresses made of hex string */
  addresses: string[];
};
type DeployContractUDCResponse = {
  contract_address: string;
  transaction_hash: string;
  address: string;
  deployer: string;
  unique: string;
  classHash: string;
  calldata_len: string;
  calldata: Array<string>;
  salt: string;
};

declare abstract class DeployerInterface {
  /** address of the deployer contract */
  abstract readonly address: BigNumberish;
  /** ascii name of the function that deploy a contract */
  abstract readonly entryPoint: string;
  /**
   * Build a Deployer Call with payload and address
   * @param {UniversalDeployerContractPayload | UniversalDeployerContractPayload[]} payload the payload data for the deployer Call. Can be a single payload object or an array of payload objects.
   * @param {string} address the address to be used in the deployer Call
   * @returns {DeployerCall} an object with Calls & addresses
   */
  abstract buildDeployerCall(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    address: string
  ): DeployerCall;
  /**
   * Parse Transaction Receipt Event from a Deployer contract transaction and
   * create DeployContractResponse compatible response with addition of the Deployer Event data
   * @param {InvokeTransactionReceiptResponse} txReceipt Transaction receipt
   *
   * @returns {DeployContractUDCResponse} parsed Deployer event data
   */
  abstract parseDeployerEvent(
    txReceipt: InvokeTransactionReceiptResponse
  ): DeployContractUDCResponse;
}

declare class Deployer implements DeployerInterface {
  readonly address: BigNumberish;
  readonly entryPoint: string;
  constructor(address?: BigNumberish, entryPoint?: string);
  buildDeployerCall(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    address: string
  ): DeployerCall;
  parseDeployerEvent(txReceipt: InvokeTransactionReceiptResponse): DeployContractUDCResponse;
}

declare const defaultDeployer: Deployer;
declare const legacyDeployer: Deployer;

interface PaymasterOptions extends PaymasterRpcOptions {}
type PaymasterRpcOptions = {
  nodeUrl?: string | _NetworkName;
  headers?: object;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
  mute?: boolean;
};

/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

type PaymasterFeeEstimate = {
  gas_token_price_in_strk: BigNumberish;
  estimated_fee_in_strk: BigNumberish;
  estimated_fee_in_gas_token: BigNumberish;
  suggested_max_fee_in_strk: BigNumberish;
  suggested_max_fee_in_gas_token: BigNumberish;
};
type PreparedDeployTransaction = {
  type: 'deploy';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  parameters: ExecutionParameters;
  fee: PaymasterFeeEstimate;
};
type PreparedInvokeTransaction = {
  type: 'invoke';
  typed_data: OutsideExecutionTypedData;
  parameters: ExecutionParameters;
  fee: PaymasterFeeEstimate;
};
type PreparedDeployAndInvokeTransaction = {
  type: 'deploy_and_invoke';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  typed_data: OutsideExecutionTypedData;
  parameters: ExecutionParameters;
  fee: PaymasterFeeEstimate;
};
type PreparedTransaction =
  | PreparedDeployTransaction
  | PreparedInvokeTransaction
  | PreparedDeployAndInvokeTransaction;
interface TokenData {
  token_address: string;
  decimals: number;
  priceInStrk: BigNumberish;
}
type DeployTransaction = {
  type: 'deploy';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
};
type InvokeTransaction = {
  type: 'invoke';
  invoke: UserInvoke;
};
type UserInvoke = {
  userAddress: string;
  calls: Call[];
};
type DeployAndInvokeTransaction = {
  type: 'deploy_and_invoke';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  invoke: UserInvoke;
};
type UserTransaction = DeployTransaction | InvokeTransaction | DeployAndInvokeTransaction;
type ExecutableDeployTransaction = {
  type: 'deploy';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
};
type ExecutableInvokeTransaction = {
  type: 'invoke';
  invoke: ExecutableUserInvoke;
};
type ExecutableUserInvoke = {
  userAddress: string;
  typedData: OutsideExecutionTypedData;
  signature: string[];
};
type ExecutableDeployAndInvokeTransaction = {
  type: 'deploy_and_invoke';
  deployment: PAYMASTER_API.ACCOUNT_DEPLOYMENT_DATA;
  invoke: ExecutableUserInvoke;
};
type ExecutableUserTransaction =
  | ExecutableDeployTransaction
  | ExecutableInvokeTransaction
  | ExecutableDeployAndInvokeTransaction;
type FeeMode =
  | {
      mode: 'sponsored';
    }
  | {
      mode: 'default';
      gasToken: string;
    };
type ExecutionParameters = {
  version: '0x1';
  feeMode: FeeMode;
  timeBounds?: PaymasterTimeBounds;
};
interface PaymasterTimeBounds {
  executeAfter?: number;
  executeBefore: number;
}

declare abstract class PaymasterInterface {
  abstract nodeUrl: string;
  abstract headers: object;
  abstract readonly baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;
  /**
   * Returns the status of the paymaster service
   *
   * @returns If the paymaster service is correctly functioning, return true. Else, return false
   */
  abstract isAvailable(): Promise<boolean>;
  /**
   * Receives the transaction the user wants to execute. Returns the typed data along with
   * the estimated gas cost and the maximum gas cost suggested to ensure execution
   *
   * @param transaction Transaction to be executed by the paymaster
   * @param parameters Execution parameters to be used when executing the transaction
   * @returns The transaction data required for execution along with an estimation of the fee
   */
  abstract buildTransaction(
    transaction: UserTransaction,
    parameters: ExecutionParameters
  ): Promise<PreparedTransaction>;
  /**
   * Sends the signed typed data to the paymaster service for execution
   *
   * @param transaction Typed data build by calling paymaster_buildTransaction signed by the user to be executed by the paymaster service
   * @param parameters Execution parameters to be used when executing the transaction
   * @returns The hash of the transaction broadcasted by the paymaster and the tracking ID corresponding to the user `execute` request
   */
  abstract executeTransaction(
    transaction: ExecutableUserTransaction,
    parameters: ExecutionParameters
  ): Promise<PAYMASTER_API.ExecuteResponse>;
  /**
   * Get a list of the tokens that the paymaster supports, together with their prices in STRK
   *
   * @returns An array of token data
   */
  abstract getSupportedTokens(): Promise<TokenData[]>;
}

declare class PaymasterRpc implements PaymasterInterface {
  nodeUrl: string;
  headers: object;
  readonly baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;
  requestId: number;
  constructor(options?: PaymasterOptions | PaymasterInterface | PaymasterRpc);
  fetch(method: string, params?: object, id?: string | number): Promise<Response>;
  protected errorHandler(method: string, params: any, rpcError?: Error$1, otherError?: any): void;
  protected fetchEndpoint<T extends keyof PAYMASTER_API.Methods>(
    method: T,
    params?: PAYMASTER_API.Methods[T]['params']
  ): Promise<PAYMASTER_API.Methods[T]['result']>;
  isAvailable(): Promise<boolean>;
  buildTransaction(
    transaction: UserTransaction,
    parameters: ExecutionParameters
  ): Promise<PreparedTransaction>;
  executeTransaction(
    transaction: ExecutableUserTransaction,
    parameters: ExecutionParameters
  ): Promise<PAYMASTER_API.ExecuteResponse>;
  getSupportedTokens(): Promise<TokenData[]>;
}

/**
 * Configuration options for creating an Account instance
 */
type AccountOptions = {
  /** Provider instance or configuration for blockchain interaction */
  provider: ProviderOptions | ProviderInterface;
  /** Account address on the Starknet network */
  address: string;
  /** Private key or Signer Class instance for signing transactions */
  signer: Uint8Array | string | SignerInterface;
  /** Cairo version to use for this account (optional, auto-detected if not provided) */
  cairoVersion?: CairoVersion;
  /** Transaction version to use for sending transactions (optional) */
  transactionVersion?: SupportedTransactionVersion;
  /** Paymaster configuration for sponsored transactions (optional) */
  paymaster?: PaymasterOptions | PaymasterInterface;
  /** Use of a custom account deployer contract (optional) */
  deployer?: DeployerInterface;
  /**
   * Default tip type to use for sending transactions (optional)
   * @default 'recommendedTip'
   */
  defaultTipType?: TipType;
} & PluginConfig;
type EstimateFeeBulk = Array<EstimateFeeResponseOverhead>;
type AccountInvocationsFactoryDetails = {
  versions: Array<`${ETransactionVersion3$1}`>;
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
} & Partial<V3TransactionDetails>;
interface UniversalDetails {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  tip?: BigNumberish;
  paymasterData?: BigNumberish[];
  accountDeploymentData?: BigNumberish[];
  nonceDataAvailabilityMode?: EDataAvailabilityMode$1;
  feeDataAvailabilityMode?: EDataAvailabilityMode$1;
  version?: BigNumberish;
  resourceBounds?: ResourceBoundsBN;
  skipValidate?: boolean;
  /** Proof facts to include in the transaction (RPC 0.10.1+) */
  proofFacts?: BigNumberish[];
  /** Proof for the transaction (RPC 0.10.1+) - base64 encoded string */
  proof?: string;
}
interface PaymasterDetails {
  feeMode: FeeMode;
  deploymentData?: PAYMASTER_API.AccountDeploymentData;
  timeBounds?: PaymasterTimeBounds;
}
interface DeployContractResponse {
  contract_address: string;
  transaction_hash: string;
}
type MultiDeployContractResponse = {
  contract_address: Array<string>;
  transaction_hash: string;
};
type DeclareDeployUDCResponse = {
  declare: {
    class_hash: BigNumberish;
  } & Partial<DeclareTransactionReceiptResponse>;
  deploy: DeployContractUDCResponse;
};
type SimulateTransactionDetails = {
  nonce?: BigNumberish;
  blockIdentifier?: BlockIdentifier;
  skipValidate?: boolean;
  skipExecute?: boolean;
  /** Include initial storage reads in the trace response (RPC 0.10.1+) */
  returnInitialReads?: boolean;
} & Partial<V3TransactionDetails>;
type StarkProfile = {
  name?: string;
  profilePicture?: string;
  discord?: string;
  twitter?: string;
  github?: string;
  proofOfPersonhood?: boolean;
};

/**
 * Interface for interacting with Starknet account contracts
 *
 * Provides account-specific functionality including:
 * - Transaction execution and signing
 * - Fee estimation for various transaction types
 * - Contract deployment through UDC (Universal Deployer Contract)
 * - Paymaster support for sponsored transactions
 * - EIP-712 message signing
 *
 * @remarks
 * Implementations of this interface typically handle the complexities of:
 * - Nonce management
 * - Transaction signing with the account's private key
 * - Interaction with the account contract's __execute__ entrypoint
 */
declare abstract class AccountInterface {
  /**
   * Provider instance for blockchain interaction
   */
  abstract provider: ProviderInterface;
  /**
   * The address of the account contract on Starknet
   */
  abstract address: string;
  /**
   * Signer instance for signing transactions and messages
   */
  abstract signer: SignerInterface;
  /**
   * Cairo version of the account contract implementation
   */
  abstract cairoVersion: CairoVersion;
  /**
   * Optional deployer instance for custom contract deployment logic
   * @default Uses default UDC (Universal Deployer Contract) if not specified
   */
  abstract deployer?: DeployerInterface;
  /**
   * Estimate fee for executing an INVOKE transaction on Starknet
   *
   * @param calls - Single call or array of calls to estimate fees for
   * - .contractAddress - The address of the contract to invoke
   * - .entrypoint - The function selector of the contract method
   * - .calldata - The serialized function parameters (defaults to [])
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * - .blockIdentifier - Block to estimate against
   * - .nonce - Account nonce (defaults to current nonce)
   * - .skipValidate - Skip account validation (default: true)
   * - .tip - Priority fee tip in fri/wei for faster inclusion
   * - .accountDeploymentData - Include account deployment
   * - .paymasterData - Paymaster sponsorship data
   * - .nonceDataAvailabilityMode - DA mode for nonce
   * - .feeDataAvailabilityMode - DA mode for fee
   * - .version - Transaction version (v3 uses fri, v1/v2 use wei)
   * - .resourceBounds - Resource limits for v3 transactions
   *
   * @returns Fee estimation including overall_fee and resourceBounds
   * @example
   * ```typescript
   * const fee = await account.estimateInvokeFee({
   *   contractAddress: '0x123...',
   *   entrypoint: 'transfer',
   *   calldata: [recipient, amount]
   * });
   * ```
   */
  abstract estimateInvokeFee(
    calls: AllowArray<Call>,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  /**
   * Estimate fee for executing a DECLARE transaction on Starknet
   *
   * @param contractPayload - Contract declaration payload.
   * - .contract - Compiled contract (Sierra JSON).
   * - .casm - Compiled Cairo assembly (required for Cairo 1).
   * - .classHash - Pre-computed class hash (optional optimization).
   * - .compiledClassHash - Pre-computed CASM hash (alternative to casm).
   *
   * @param estimateFeeDetails - Optional details for fee estimation.
   *
   * - .blockIdentifier - Block to estimate against.
   * - .nonce - Account nonce (defaults to current nonce)
   * - .skipValidate - Skip account validation (default: true)
   * - .tip - Priority fee tip for faster inclusion
   * - .version - Transaction version (v3 uses fri, v1/v2 use wei)
   *
   * @returns Fee estimation including overall_fee and resourceBounds
   * @example
   * ```typescript
   * const fee = await account.estimateDeclareFee({
   *   contract: compiledContract,
   *   casm: compiledCasm
   * });
   * ```
   */
  abstract estimateDeclareFee(
    contractPayload: DeclareContractPayload,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  /**
   * Estimate fee for executing a DEPLOY_ACCOUNT transaction on Starknet
   *
   * @param contractPayload - Account deployment payload
   * - .classHash - Class hash of the account contract
   * - .constructorCalldata - Constructor parameters
   * - .contractAddress - Pre-computed account address
   * - .addressSalt - Salt for address generation
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * @inheritdoc estimateInvokeFee
   *
   * @returns Fee estimation including overall_fee and resourceBounds
   * @example
   * ```typescript
   * const fee = await account.estimateAccountDeployFee({
   *   classHash: accountClassHash,
   *   constructorCalldata: { publicKey },
   *   addressSalt: publicKey
   * });
   * ```
   */
  abstract estimateAccountDeployFee(
    contractPayload: DeployAccountContractPayload,
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  /**
   * Estimate fee for deploying contract(s) through the Universal Deployer Contract (UDC)
   *
   * @param deployContractPayload - Single or array of deployment payloads
   * - .classHash - Class hash of contract to deploy
   * - .salt - Deployment salt (optional)
   * - .unique - Ensure unique deployment address
   * - .constructorCalldata - Constructor parameters
   *
   * @param estimateFeeDetails - Optional details for fee estimation
   * @inheritdoc estimateInvokeFee
   *
   * @returns Fee estimation for the deployment transaction
   * @example
   * ```typescript
   * const fee = await account.estimateDeployFee({
   *   classHash: contractClassHash,
   *   constructorCalldata: [param1, param2],
   *   unique: true
   * });
   * ```
   */
  abstract estimateDeployFee(
    deployContractPayload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    estimateFeeDetails?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  /**
   * Estimate fees for executing multiple transactions in a single request
   *
   * @param invocations - Array of transactions to estimate
   * - .type - Transaction type: DECLARE, DEPLOY, INVOKE, DEPLOY_ACCOUNT
   * - .payload - Transaction-specific payload
   *
   * @param details - Optional details for fee estimation
   * @inheritdoc estimateInvokeFee
   *
   * @returns Array of fee estimations for each transaction
   * @example
   * ```typescript
   * const fees = await account.estimateFeeBulk([
   *   { type: 'INVOKE', payload: { contractAddress, entrypoint, calldata } },
   *   { type: 'DECLARE', payload: { contract, casm } }
   * ]);
   * ```
   */
  abstract estimateFeeBulk(
    invocations: Invocations,
    details?: UniversalDetails
  ): Promise<EstimateFeeResponseBulkOverhead>;
  /**
   * Execute one or multiple calls through the account contract
   *
   * @param transactions - Single call or array of calls to execute
   * - .contractAddress - Target contract address
   * - .entrypoint - Function to invoke on the contract
   * - .calldata - Function parameters
   *
   * @param transactionsDetail - Transaction execution options
   * - .nonce - Override account nonce
   * - .maxFee - Maximum fee for v1/v2 transactions
   * - .resourceBounds - Resource limits for v3 transactions
   * - .tip - Priority fee tip
   * - .version - Force specific transaction version
   *
   * @returns Transaction hash and response
   * @example
   * ```typescript
   * const result = await account.execute([
   *   { contractAddress: token, entrypoint: 'transfer', calldata: [to, amount] },
   *   { contractAddress: nft, entrypoint: 'mint', calldata: [recipient] }
   * ]);
   * ```
   */
  abstract execute(
    transactions: AllowArray<Call>,
    transactionsDetail?: InvocationsDetails
  ): Promise<InvokeFunctionResponse>;
  /**
   * Estimate fees for a paymaster-sponsored transaction
   *
   * @param calls - Array of calls to be sponsored
   * - .contractAddress - Target contract address
   * - .entrypoint - Function to invoke
   * - .calldata - Function parameters
   *
   * @param paymasterDetails - Paymaster configuration
   * - .feeMode - Sponsorship mode: 'sponsored' or gas token
   * - .deploymentData - Account deployment data if needed
   * - .timeBounds - Valid execution time window
   *
   * @returns Fee estimates in both STRK and gas token
   * @example
   * ```typescript
   * const fees = await account.estimatePaymasterTransactionFee(
   *   [{ contractAddress, entrypoint, calldata }],
   *   { feeMode: { mode: 'sponsored' } }
   * );
   * ```
   */
  abstract estimatePaymasterTransactionFee(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate>;
  /**
   * Build a transaction for paymaster execution
   *
   * @param calls - Array of calls to be sponsored
   * @param paymasterDetails - Paymaster configuration
   * @inheritdoc estimatePaymasterTransactionFee
   *
   * @returns Prepared transaction with typed data for signing
   * @example
   * ```typescript
   * const prepared = await account.buildPaymasterTransaction(
   *   calls,
   *   { feeMode: { mode: 'default', gasToken: ETH_ADDRESS } }
   * );
   * ```
   */
  abstract buildPaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction>;
  /**
   * Execute a paymaster-sponsored transaction
   *
   * @param calls - Array of calls to execute
   * @param paymasterDetails - Paymaster configuration
   * - .feeMode - 'sponsored' or gas token payment
   * - .deploymentData - Deploy account if needed
   * - .timeBounds - Execution validity window (UNIX timestamps)
   *
   * @param maxFeeInGasToken - Maximum acceptable fee in gas token
   *
   * @returns Transaction hash if successful
   * @throws {Error} If gas token price exceeds maxFeeInGasToken
   * @throws {Error} If transaction parameters are modified by paymaster
   * @example
   * ```typescript
   * const txHash = await account.executePaymasterTransaction(
   *   calls,
   *   { feeMode: { mode: 'sponsored' }, timeBounds: { executeBefore: Date.now()/1000 + 3600 } },
   *   maxFeeETH
   * );
   * ```
   */
  abstract executePaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse>;
  /**
     * Declare a contract class on Starknet
     *
     // eslint-disable-next-line prettier/prettier
     * @param contractPayload - Contract declaration payload
     * - .contract - Compiled Sierra contract
     * - .classHash - Pre-computed class hash (optional)
     * - .casm - Compiled CASM (required for Cairo 1)
     * - .compiledClassHash - Pre-computed CASM hash
     *
     * @param transactionsDetail - Transaction execution options
     * @inheritdoc execute
     *
     * @returns Declaration transaction hash and class hash
     * @example
     * ```typescript
     * const declareResult = await account.declare({
     *   contract: compiledSierra,
     *   casm: compiledCasm
     * });
     * ```
     */
  abstract declare(
    contractPayload: DeclareContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeclareContractResponse>;
  /**
   * Deploy contract(s) using the Universal Deployer Contract (UDC)
   *
   * @param payload - Single or multiple deployment configurations.
   * - .classHash - Class hash of declared contract.
   * - .constructorCalldata - Constructor parameters.
   * - .salt - Deployment salt (random if not specified).
   * - .unique - Modify salt for unique address (default: true).
   *
   * @param details - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Deployed contract addresses and transaction hash
   * @example
   * ```typescript
   * const deployment = await account.deploy([
   *   { classHash: erc20ClassHash, constructorCalldata: [name, symbol] },
   *   { classHash: nftClassHash, unique: true }
   * ]);
   * ```
   */
  abstract deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails
  ): Promise<MultiDeployContractResponse>;
  /**
   * Deploy and wait for a contract deployment to complete
   *
   * @param payload - Deployment configuration(s)
   * @inheritdoc deploy
   *
   * @param details - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Deployment result with contract address and UDC event details
   * @remarks
   * This method waits for transaction confirmation before returning
   * @example
   * ```typescript
   * const result = await account.deployContract({
   *   classHash: contractClassHash,
   *   constructorCalldata: params
   * });
   * console.log('Deployed at:', result.address);
   * ```
   */
  abstract deployContract(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: InvocationsDetails
  ): Promise<DeployContractUDCResponse>;
  /**
   * Declare and deploy a contract in a single method
   *
   * @param payload - Combined declare and deploy configuration
   * - .contract - Compiled Sierra contract
   * - .casm - Compiled CASM (required for Cairo 1)
   * - .compiledClassHash - Pre-computed CASM hash
   * - .classHash - Pre-computed class hash
   * - .constructorCalldata - Constructor parameters
   * - .salt - Deployment salt
   * - .unique - Ensure unique deployment address
   *
   * @param details - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Declaration and deployment results
   * @remarks
   * - Automatically skips declaration if contract is already declared
   * - Waits for both transactions to complete
   * - Does not support batch operations
   * @example
   * ```typescript
   * const result = await account.declareAndDeploy({
   *   contract: compiledContract,
   *   casm: compiledCasm,
   *   constructorCalldata: [param1, param2]
   * });
   * ```
   */
  abstract declareAndDeploy(
    payload: DeclareAndDeployContractPayload,
    details?: InvocationsDetails
  ): Promise<DeclareDeployUDCResponse>;
  /**
   * Deploy the account contract itself on Starknet
   *
   * @param contractPayload - Account deployment configuration
   * - .classHash - Account contract class hash
   * - .constructorCalldata - Constructor parameters
   * - .addressSalt - Salt for address generation
   * - .contractAddress - Pre-computed address
   *
   * @param transactionsDetail - Transaction execution options
   * @inheritdoc execute
   *
   * @returns Deployment transaction hash and contract address
   * @remarks
   * Used for deploying the account contract when using a pre-funded address
   * @example
   * ```typescript
   * const deployment = await account.deployAccount({
   *   classHash: accountClassHash,
   *   constructorCalldata: { publicKey: pubKey },
   *   addressSalt: pubKey
   * });
   * ```
   */
  abstract deployAccount(
    contractPayload: DeployAccountContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeployContractResponse>;
  /**
   * Sign a typed data message for off-chain verification
   *
   * @param typedData - EIP-712 style typed data structure
   * @returns Signature array [r, s]
   * @remarks
   * - Includes domain separation to prevent signature reuse
   * - Compatible with Starknet's signature verification
   * - Cannot be used to sign transactions
   * @example
   * ```typescript
   * const signature = await account.signMessage({
   *   domain: { name: 'MyDapp', chainId: 'SN_MAIN' },
   *   types: { ... },
   *   primaryType: 'Message',
   *   message: { content: 'Hello Starknet!' }
   * });
   * ```
   */
  abstract signMessage(typedData: TypedData): Promise<Signature>;
  /**
   * Hash a typed data message using Pedersen hash
   *
   * @param typedData - EIP-712 style typed data structure
   * @returns Message hash as hex string
   * @remarks
   * - Uses Pedersen hash function (not Keccak)
   * - Includes domain separation
   * - Result can be used for signature verification
   * @example
   * ```typescript
   * const messageHash = await account.hashMessage(typedData);
   * ```
   */
  abstract hashMessage(typedData: TypedData): Promise<string>;
  /**
   * Get the current nonce of the account
   *
   * @param blockIdentifier - Block to query nonce at (default: 'latest' tag)
   * @returns Account nonce as hex string
   * @example
   * ```typescript
   * const nonce = await account.getNonce();
   * const historicalNonce = await account.getNonce('latest');
   * ```
   */
  abstract getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce>;
  /**
   * Declare a contract class if not already declared
   *
   * @param contractPayload - Contract declaration payload
   * @param transactionsDetail - Transaction execution options
   * @returns Declaration result (with empty transaction_hash if already declared)
   * @example
   * ```typescript
   * const result = await account.declareIfNot({
   *   contract: compiledContract,
   *   casm: compiledCasm
   * });
   * ```
   */
  abstract declareIfNot(
    contractPayload: DeclareContractPayload,
    transactionsDetail?: InvocationsDetails
  ): Promise<DeclareContractResponse>;
}

interface ProviderHooks {
  /**
   * Called before every RPC request through the channel.
   * Return modified context to transform the request, or void to pass through.
   */
  beforeRequest?(ctx: { method: string; params: any }): {
    method: string;
    params: any;
  } | void;
  /**
   * Called after every RPC request through the channel.
   * Return a value to replace the result, or void to pass through.
   */
  afterRequest?(ctx: { method: string; params: any; result: any }): any | void;
}
interface AccountHooks extends ProviderHooks {
  /**
   * Called before Account.execute().
   * Return modified context to transform calls/details, or void to pass through.
   */
  beforeExecute?(ctx: { calls: AllowArray<Call>; details: UniversalDetails }): {
    calls: AllowArray<Call>;
    details: UniversalDetails;
  } | void;
  /**
   * Called after Account.execute() with the result.
   */
  afterExecute?(ctx: { calls: AllowArray<Call>; result: InvokeFunctionResponse }): void;
  /**
   * Called before Account.signMessage().
   * Return modified context to transform typedData, or void to pass through.
   */
  beforeSign?(ctx: { typedData: TypedData }): {
    typedData: TypedData;
  } | void;
  /**
   * Called after Account.signMessage() with the result.
   */
  afterSign?(ctx: { typedData: TypedData; signature: Signature }): void;
}
/**
 * A Starknet plugin that can extend Provider and Account with methods and lifecycle hooks.
 *
 * @template TProviderMethods - Methods added to Provider instances
 * @template TAccountMethods - Methods added to Account instances (defaults to TProviderMethods)
 *
 * @example
 * ```typescript
 * const myPlugin = (): StarknetPlugin<{ greet(): string }> => ({
 *   name: 'my-plugin',
 *   extend: () => ({ greet: () => 'hello' }),
 * });
 * ```
 */
interface StarknetPlugin<
  TProviderMethods extends Record<string, any> = Record<string, never>,
  TAccountMethods extends Record<string, any> = TProviderMethods,
> {
  /** Unique plugin name, used for deduplication */
  readonly name: string;
  /**
   * Called when the plugin is installed on a Provider.
   * Returns an object of methods to add to the provider instance.
   */
  extend?(provider: ProviderInterface): TProviderMethods;
  /**
   * Called when the plugin is installed on an Account.
   * Returns methods specific to the account context.
   * If not provided, `extend` is used instead.
   */
  accountExtend?(account: AccountInterface): TAccountMethods;
  /** Provider-level lifecycle hooks */
  hooks?: ProviderHooks;
  /** Account-level lifecycle hooks */
  accountHooks?: AccountHooks;
}
interface PluginConfig {
  /**
   * Plugins to install.
   * - `undefined` (default): install defaultPlugins (starknetId, brotherId)
   * - explicit array: install exactly these plugins
   * - `false`: no plugins
   */
  plugins?: StarknetPlugin<any, any>[] | false;
}

interface ProviderOptions extends RpcProviderOptions {}
type RpcProviderOptions = {
  nodeUrl?: string | _NetworkName;
  /**
   * Define the number of retries for waitForTransaction
   */
  retries?: waitForTransactionOptions['retries'];
  /**
   * Define the time interval between retries in milliseconds
   */
  transactionRetryIntervalFallback?: number;
  /**
   * Define the headers
   */
  headers?: object;
  blockIdentifier?: BlockIdentifier;
  chainId?: _StarknetChainId;
  specVersion?: _SupportedRpcVersion;
  waitMode?: boolean;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
  resourceBoundsOverhead?: ResourceBoundsOverhead | false;
  batch?: false | number;
} & PluginConfig;

/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

type Block$1 = Simplify<BLOCK_WITH_TX_HASHES>;
type PreConfirmedBlock = Simplify<PRE_CONFIRMED_BLOCK_WITH_TX_HASHES>;
type GetBlockResponse = Simplify<BlockWithTxHashes>;
type GetTxReceiptResponseWithoutHelper = TransactionReceipt$1;
type SuccessfulTransactionReceiptResponse = IsSucceeded<TransactionReceipt$1>;
type RevertedTransactionReceiptResponse = IsReverted<TransactionReceipt$1>;
type InvokeTransactionReceiptResponse = IsType<TransactionReceipt$1, 'INVOKE'>;
type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;
type DeclareTransactionReceiptResponse = IsType<TransactionReceipt$1, 'DECLARE'>;
type DeployAccountTransactionReceiptResponse = IsType<TransactionReceipt$1, 'DEPLOY_ACCOUNT'>;
type L1HandlerTransactionReceiptResponse = IsType<TransactionReceipt$1, 'L1_HANDLER'>;
type GetTransactionResponse = TransactionWithHash;
/**
 * Estimate fee response with overhead
 */
type EstimateFeeResponseOverhead = {
  resourceBounds: ResourceBoundsBN;
  overall_fee: bigint;
  unit: PRICE_UNIT;
};
type EstimateFeeResponseBulkOverhead = Array<EstimateFeeResponseOverhead>;
type InvokeFunctionResponse = InvokedTransaction;
type DeclareContractResponse = DeclaredTransaction;
type CallContractResponse = string[];
type StorageResponse = RPCSPEC0103.STORAGE_RESULT;
type Nonce = string;
type SimulationFlags = Array<SIMULATION_FLAG>;
type SimulateTransactionOverhead = {
  transaction_trace: TransactionTrace;
} & EstimateFeeResponseOverhead;
type SimulateTransactionOverheadResponse = {
  simulated_transactions: SimulateTransactionOverhead[];
  initial_reads?: INITIAL_READS;
};
type PreConfirmedStateUpdate = PRE_CONFIRMED_STATE_UPDATE;
type StateUpdate = STATE_UPDATE;
type StateUpdateResponse = StateUpdate | PreConfirmedStateUpdate;
/**
 * Standardized type
 *
 * Cairo0 program compressed and Cairo1 sierra_program decompressed
 *
 * abi Abi
 *
 * CompiledSierra without '.sierra_program_debug_info'
 */
type ContractClassResponse =
  | LegacyContractClass
  | Omit<CompiledSierra, 'sierra_program_debug_info'>;

/**
 * Result of provider.getGasPrices().
 * @param {bigint} l1DataGasPrice - price in fri of the layer 1 data gas price.
 * @param {bigint} l1GasPrice - price in fri of the layer 1 gas price.
 * @param {bigint} l2GasPrice - price in fri of the layer 2 gas price.
 */
type GasPrices = {
  l1DataGasPrice: bigint;
  l1GasPrice: bigint;
  l2GasPrice: bigint;
};

declare const ValidateType: {
  readonly DEPLOY: 'DEPLOY';
  readonly CALL: 'CALL';
  readonly INVOKE: 'INVOKE';
};
type ValidateType = ValuesType<typeof ValidateType>;
declare const Uint: {
  readonly u8: 'core::integer::u8';
  readonly u16: 'core::integer::u16';
  readonly u32: 'core::integer::u32';
  readonly u64: 'core::integer::u64';
  readonly u96: 'core::integer::u96';
  readonly u128: 'core::integer::u128';
  readonly u256: 'core::integer::u256';
  readonly u512: 'core::integer::u512';
};
type Uint = ValuesType<typeof Uint>;
declare const Int: {
  readonly i8: 'core::integer::i8';
  readonly i16: 'core::integer::i16';
  readonly i32: 'core::integer::i32';
  readonly i64: 'core::integer::i64';
  readonly i128: 'core::integer::i128';
};
type Int = ValuesType<typeof Int>;
declare const Literal: {
  readonly ClassHash: 'core::starknet::class_hash::ClassHash';
  readonly ContractAddress: 'core::starknet::contract_address::ContractAddress';
  readonly Secp256k1Point: 'core::starknet::secp256k1::Secp256k1Point';
  readonly U96: 'core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>';
};
type Literal = ValuesType<typeof Literal>;
declare const ETH_ADDRESS = 'core::starknet::eth_address::EthAddress';
declare const NON_ZERO_PREFIX = 'core::zeroable::NonZero::';

/**
 * Abi parser interface
 */
declare abstract class AbiParserInterface {
  /**
   * Helper to calculate inputs length from abi
   * @param abiMethod FunctionAbi
   * @return number
   */
  abstract methodInputsLength(abiMethod: FunctionAbi): number;
  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  abstract getMethod(name: string): FunctionAbi | undefined;
  /**
   * Return Abi in legacy format
   * @return Abi
   */
  abstract getLegacyFormat(): Abi;
  /**
   * Get request parser for the given abi type
   * @param abiType AbiEntryType
   * @returns Parser function
   */
  abstract getRequestParser(abiType: AbiEntryType): (val: unknown) => any;
  /**
   * Get response parser for the given abi type
   * @param abiType AbiEntryType
   * @returns Parser function
   */
  abstract getResponseParser(abiType: AbiEntryType): (responseIterator: Iterator<string>) => any;
}

/**
 * Singular class handling cairo u512 data type
 */

declare const UINT_512_MAX: bigint;
declare const UINT_512_MIN = 0n;
declare const UINT_128_MIN = 0n;
declare class CairoUint512 {
  limb0: bigint;
  limb1: bigint;
  limb2: bigint;
  limb3: bigint;
  static abiSelector: string;
  /**
   * Default constructor (Lib usage)
   */
  constructor(bigNumberish: BigNumberish | Uint512 | unknown);
  /**
   * Direct props initialization (Api response)
   */
  constructor(limb0: BigNumberish, limb1: BigNumberish, limb2: BigNumberish, limb3: BigNumberish);
  /**
   * Validate if BigNumberish can be represented as Uint512
   */
  static validate(bigNumberish: BigNumberish | unknown): bigint;
  /**
   * Validate if limbs can be represented as Uint512
   */
  static validateProps(
    limb0: BigNumberish,
    limb1: BigNumberish,
    limb2: BigNumberish,
    limb3: BigNumberish
  ): {
    limb0: bigint;
    limb1: bigint;
    limb2: bigint;
    limb3: bigint;
  };
  /**
   * Check if BigNumberish can be represented as Uint512
   */
  static is(bigNumberish: BigNumberish | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint512;
  /**
   * Return bigint representation
   */
  toBigInt(): bigint;
  /**
   * Return Uint512 structure with HexString props
   * limbx: HexString
   */
  toUint512HexString(): {
    limb0: string;
    limb1: string;
    limb2: string;
    limb3: string;
  };
  /**
   * Return Uint512 structure with DecimalString props
   * limbx DecString
   */
  toUint512DecimalString(): {
    limb0: string;
    limb1: string;
    limb2: string;
    limb3: string;
  };
  /**
   * Return api requests representation witch is felt array
   */
  toApiRequest(): string[];
}

declare class CairoUint8 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint8;
}

declare class CairoUint16 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint16;
}

declare class CairoUint64 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint64;
}

declare class CairoUint96 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint96;
}

declare class CairoUint128 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint128;
}

declare class CairoInt8 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt8;
}

declare class CairoInt16 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt16;
}

declare class CairoInt32 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt32;
}

declare class CairoInt64 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt64;
}

declare class CairoInt128 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean | unknown): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString(): string;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoInt128;
}

/**
 * Parsing map for parser, request and response parsers are separated
 * Configure parsing strategy for each abi type
 */
type ParsingStrategy = {
  request: Record<AbiEntryType, (val: unknown) => any>;
  response: Record<AbiEntryType, (responseIterator: Iterator<string>) => any>;
};
/**
 * More robust parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
declare const hdParsingStrategy: {
  readonly request: {
    readonly [CairoUint512.abiSelector]: (val: unknown) => string[];
    readonly [CairoUint8.abiSelector]: (val: unknown) => string[];
    readonly [CairoUint16.abiSelector]: (val: unknown) => string[];
    readonly [CairoUint64.abiSelector]: (val: unknown) => string[];
    readonly [CairoUint96.abiSelector]: (val: unknown) => string[];
    readonly [CairoUint128.abiSelector]: (val: unknown) => string[];
    readonly [CairoInt8.abiSelector]: (val: unknown) => string[];
    readonly [CairoInt16.abiSelector]: (val: unknown) => string[];
    readonly [CairoInt32.abiSelector]: (val: unknown) => string[];
    readonly [CairoInt64.abiSelector]: (val: unknown) => string[];
    readonly [CairoInt128.abiSelector]: (val: unknown) => string[];
    readonly 'core::bytes_31::bytes31': (val: unknown) => string[];
    readonly 'core::byte_array::ByteArray': (val: unknown) => string[];
    readonly 'core::felt252': (val: unknown) => string[];
    readonly 'core::integer::u256': (val: unknown) => string[];
  };
  readonly response: {
    readonly [CairoUint512.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoUint8.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoUint16.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoUint64.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoUint96.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoUint128.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoInt8.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoInt16.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoInt32.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoInt64.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly [CairoInt128.abiSelector]: (responseIterator: Iterator<string>) => bigint;
    readonly 'core::bytes_31::bytes31': (responseIterator: Iterator<string>) => string;
    readonly 'core::byte_array::ByteArray': (responseIterator: Iterator<string>) => string;
    readonly 'core::felt252': (responseIterator: Iterator<string>) => bigint;
    readonly 'core::integer::u256': (responseIterator: Iterator<string>) => bigint;
  };
};
/**
 * Faster parsing strategy
 * Configuration mapping - data-driven approach
 * Configure parsing strategy for each abi type
 */
declare const fastParsingStrategy: ParsingStrategy;

declare class AbiParser1 implements AbiParserInterface {
  abi: Abi;
  parsingStrategy: ParsingStrategy;
  constructor(abi: Abi, parsingStrategy?: ParsingStrategy);
  getRequestParser(abiType: AbiEntryType): (val: unknown) => any;
  getResponseParser(abiType: AbiEntryType): (responseIterator: Iterator<string>) => any;
  /**
   * abi method inputs length without '_len' inputs
   * cairo 0 reducer
   * @param abiMethod FunctionAbi
   * @returns number
   */
  methodInputsLength(abiMethod: FunctionAbi): number;
  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  getMethod(name: string): FunctionAbi | undefined;
  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  getLegacyFormat(): Abi;
}

declare class AbiParser2 implements AbiParserInterface {
  abi: Abi;
  parsingStrategy: ParsingStrategy;
  constructor(abi: Abi, parsingStrategy?: ParsingStrategy);
  getRequestParser(abiType: AbiEntryType): (val: unknown) => any;
  getResponseParser(abiType: AbiEntryType): (responseIterator: Iterator<string>) => any;
  /**
   * abi method inputs length
   * @param abiMethod FunctionAbi
   * @returns number
   */
  methodInputsLength(abiMethod: FunctionAbi): number;
  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  getMethod(name: string): FunctionAbi | undefined;
  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  getLegacyFormat(): Abi;
}

/**
 * Creates ABI parser
 *
 * @param {Abi} abi
 * @returns {AbiParserInterface} abi parser interface
 *
 * @example
 * const abiParser2 = createAbiParser([getInterfaceAbi('struct')]);
 * // abiParser2 instanceof AbiParser2 === true
 *
 * const abiParser1 = createAbiParser([getFunctionAbi('struct')]);
 * // abiParser1 instanceof AbiParser1 === true
 */
declare function createAbiParser(abi: Abi, parsingStrategy?: ParsingStrategy): AbiParserInterface;
/**
 * Retrieves ABI version
 *
 * @param {Abi} abi
 * @returns {1 | 2 | 0} abi 1, 2 or 0 version
 *
 * @example
 * // Example 1: Return ABI version 2
 * const version = getAbiVersion([getInterfaceAbi()]);
 * // version === 2
 *
 * // Example 2: Return ABI version 1
 * const version = getAbiVersion([getInterfaceAbi('core::bool')]);
 * // version === 1
 *
 * // Example 3: Return ABI version 0
 * const version = getAbiVersion([getInterfaceAbi('felt')]);
 * // version === 0
 */
declare function getAbiVersion(abi: Abi): 1 | 2 | 0;
/**
 * Checks if no constructor valid
 *
 * @param {string} method
 * @param {RawArgs} argsCalldata
 * @param {FunctionAbi} abiMethod
 * @returns boolean
 *
 * @example
 * const result1 = isNoConstructorValid('constructor', [])
 * // result1 === true
 * const result2 = isNoConstructorValid('test', ['test'])
 * // result2 === false
 */
declare function isNoConstructorValid(
  method: string,
  argsCalldata: RawArgs,
  abiMethod?: FunctionAbi
): boolean;

type AsyncContractFunction<T = any> = (...args: ArgsOrCalldataWithOptions) => Promise<T>;
type ContractFunction = (...args: ArgsOrCalldataWithOptions) => any;
type CallResult =
  | {
      [key: string]: any;
    }
  | CallResult[]
  | bigint
  | string
  | boolean
  | CairoEnum;
type ArgsOrCalldata = RawArgsArray | [Calldata] | Calldata;
type ArgsOrCalldataWithOptions =
  | [...RawArgsArray]
  | [...RawArgsArray, ContractOptions]
  | [Calldata]
  | [Calldata, ContractOptions]
  | [...Calldata]
  | [...Calldata, ContractOptions];
type CommonContractOptions = {
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
   * Custom parsing strategy for request/response processing
   */
  parsingStrategy?: ParsingStrategy;
};
type ContractOptions = {
  abi: Abi;
  address: string;
  /**
   * Connect account to read and write methods
   * Connect provider to read methods
   * @default creates a new RpcProvider if not provided
   */
  providerOrAccount?: ProviderOrAccount;
  /**
   * Class hash of the contract
   */
  classHash?: string;
} & CommonContractOptions;
type ExecuteOptions = Pick<CommonContractOptions, 'parseRequest'> & {
  /**
   * Used when invoking with only provider
   */
  signature?: Signature;
  /**
   * Deployer contract salt
   */
  salt?: string;
  paymasterDetails?: PaymasterDetails;
  maxFeeInGasToken?: BigNumberish;
  /**
   * Wait for transaction to be included in a block
   * @default false
   */
  waitForTransaction?: boolean;
} & Partial<UniversalDetails>;
type CallOptions = CommonContractOptions & {
  formatResponse?: FormatResponse;
} & Pick<UniversalDetails, 'blockIdentifier' | 'version'>;
type WithOptions = ExecuteOptions & CallOptions;
type ParsedEvent = {
  [name: string]: ParsedStruct;
} & {
  transaction_hash?: TransactionHash;
  transaction_index?: number;
  event_index?: number;
  block_hash?: BlockHash;
  block_number?: BlockNumber;
};
type ParsedEvents = Array<ParsedEvent> & {
  getByPath?(path: string): ParsedStruct | null;
};
/**
 * Advance formatting used to get js types data as result
 * @see https://starknet-io.github.io/starknet.js/docs/guides/define_call_message/#formatresponse
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
type FormatResponse = {
  [key: string]: any;
};
type ProviderOrAccount = ProviderInterface | AccountInterface;
/**
 * Type guard to narrow ProviderOrAccount to AccountInterface
 * @param providerOrAccount - The object to check
 * @returns true if the object is an AccountInterface
 */
declare function isAccount(
  providerOrAccount: ProviderOrAccount
): providerOrAccount is AccountInterface;
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
type FactoryParams = (DeclareAndDeployParams | DeployOnlyParams) & CommonContractOptions;

type RPC_ERROR_SET = {
  FAILED_TO_RECEIVE_TXN: FAILED_TO_RECEIVE_TXN;
  NO_TRACE_AVAILABLE: NO_TRACE_AVAILABLE;
  CONTRACT_NOT_FOUND: CONTRACT_NOT_FOUND;
  ENTRYPOINT_NOT_FOUND: ENTRYPOINT_NOT_FOUND;
  BLOCK_NOT_FOUND: BLOCK_NOT_FOUND;
  INVALID_TXN_INDEX: INVALID_TXN_INDEX;
  CLASS_HASH_NOT_FOUND: CLASS_HASH_NOT_FOUND;
  TXN_HASH_NOT_FOUND: TXN_HASH_NOT_FOUND;
  PAGE_SIZE_TOO_BIG: PAGE_SIZE_TOO_BIG;
  NO_BLOCKS: NO_BLOCKS;
  INVALID_CONTINUATION_TOKEN: INVALID_CONTINUATION_TOKEN;
  TOO_MANY_KEYS_IN_FILTER: TOO_MANY_KEYS_IN_FILTER;
  CONTRACT_ERROR: CONTRACT_ERROR;
  TRANSACTION_EXECUTION_ERROR: TRANSACTION_EXECUTION_ERROR;
  STORAGE_PROOF_NOT_SUPPORTED: STORAGE_PROOF_NOT_SUPPORTED;
  CLASS_ALREADY_DECLARED: CLASS_ALREADY_DECLARED;
  INVALID_TRANSACTION_NONCE: INVALID_TRANSACTION_NONCE;
  INSUFFICIENT_RESOURCES_FOR_VALIDATE: INSUFFICIENT_RESOURCES_FOR_VALIDATE;
  INSUFFICIENT_ACCOUNT_BALANCE: INSUFFICIENT_ACCOUNT_BALANCE;
  VALIDATION_FAILURE: VALIDATION_FAILURE;
  COMPILATION_FAILED: COMPILATION_FAILED;
  CONTRACT_CLASS_SIZE_IS_TOO_LARGE: CONTRACT_CLASS_SIZE_IS_TOO_LARGE;
  NON_ACCOUNT: NON_ACCOUNT;
  DUPLICATE_TX: DUPLICATE_TX;
  COMPILED_CLASS_HASH_MISMATCH: COMPILED_CLASS_HASH_MISMATCH;
  UNSUPPORTED_TX_VERSION: UNSUPPORTED_TX_VERSION;
  UNSUPPORTED_CONTRACT_CLASS_VERSION: UNSUPPORTED_CONTRACT_CLASS_VERSION;
  UNEXPECTED_ERROR: UNEXPECTED_ERROR;
  REPLACEMENT_TRANSACTION_UNDERPRICED: REPLACEMENT_TRANSACTION_UNDERPRICED;
  FEE_BELOW_MINIMUM: FEE_BELOW_MINIMUM;
  INVALID_SUBSCRIPTION_ID: INVALID_SUBSCRIPTION_ID;
  TOO_MANY_ADDRESSES_IN_FILTER: TOO_MANY_ADDRESSES_IN_FILTER;
  TOO_MANY_BLOCKS_BACK: TOO_MANY_BLOCKS_BACK;
  COMPILATION_ERROR: COMPILATION_ERROR;
  INVALID_ADDRESS: PAYMASTER_API.INVALID_ADDRESS;
  TOKEN_NOT_SUPPORTED: PAYMASTER_API.TOKEN_NOT_SUPPORTED;
  INVALID_SIGNATURE: PAYMASTER_API.INVALID_SIGNATURE;
  MAX_AMOUNT_TOO_LOW: PAYMASTER_API.MAX_AMOUNT_TOO_LOW;
  CLASS_HASH_NOT_SUPPORTED: PAYMASTER_API.CLASS_HASH_NOT_SUPPORTED;
  PAYMASTER_TRANSACTION_EXECUTION_ERROR: PAYMASTER_API.TRANSACTION_EXECUTION_ERROR;
  INVALID_TIME_BOUNDS: PAYMASTER_API.INVALID_TIME_BOUNDS;
  INVALID_DEPLOYMENT_DATA: PAYMASTER_API.INVALID_DEPLOYMENT_DATA;
  INVALID_CLASS_HASH: PAYMASTER_API.INVALID_CLASS_HASH;
  INVALID_ID: PAYMASTER_API.INVALID_ID;
  UNKNOWN_ERROR: PAYMASTER_API.UNKNOWN_ERROR;
};
type RPC_ERROR = RPC_ERROR_SET[keyof RPC_ERROR_SET];

interface OutsideExecutionOptions {
  /** authorized executer of the transaction(s):  Hex address or "ANY_CALLER" or shortString.encodeShortString(constants.OutsideExecutionCallerAny) */
  caller: string;
  /** Unix timestamp of the beginning of the timeframe */
  execute_after: BigNumberish;
  /** Unix timestamp of the end of the timeframe */
  execute_before: BigNumberish;
}
interface OutsideCall {
  to: string;
  selector: BigNumberish;
  calldata: RawArgs;
}
interface OutsideExecution {
  caller: string;
  nonce: BigNumberish;
  execute_after: BigNumberish;
  execute_before: BigNumberish;
  calls: OutsideCall[];
}
interface OutsideTransaction {
  outsideExecution: OutsideExecution;
  signature: Signature;
  signerAddress: BigNumberish;
  version: OutsideExecutionVersion;
}
declare const OutsideExecutionTypesV1: {
  StarkNetDomain: {
    name: string;
    type: string;
  }[];
  OutsideExecution: {
    name: string;
    type: string;
  }[];
  OutsideCall: {
    name: string;
    type: string;
  }[];
};
declare const OutsideExecutionTypesV2: {
  StarknetDomain: {
    name: string;
    type: string;
  }[];
  OutsideExecution: {
    name: string;
    type: string;
  }[];
  Call: {
    name: string;
    type: string;
  }[];
};
declare const OutsideExecutionVersion: {
  readonly UNSUPPORTED: '0';
  readonly V1: '1';
  readonly V2: '2';
};
type OutsideExecutionVersion = ValuesType<typeof OutsideExecutionVersion>;

type InvocationsSignerDetails = V3InvocationsSignerDetails & {
  version: `${ETransactionVersion$1}`;
  skipValidate?: boolean;
};
type V3InvocationsSignerDetails = V3TransactionDetails & {
  walletAddress: string;
  cairoVersion: CairoVersion;
  chainId: _StarknetChainId;
  version: `${ETransactionVersion3$1}`;
};
type DeclareSignerDetails = V3DeclareSignerDetails & {
  version: `${ETransactionVersion$1}`;
};
type V3DeclareSignerDetails = V3TransactionDetails & {
  classHash: string;
  compiledClassHash: string;
  senderAddress: string;
  chainId: _StarknetChainId;
  version: `${ETransactionVersion3$1}`;
};
type DeployAccountSignerDetails = V3DeployAccountSignerDetails;
type V3DeployAccountSignerDetails = Required<DeployAccountContractPayload> &
  V3TransactionDetails & {
    contractAddress: BigNumberish;
    chainId: _StarknetChainId;
    version: `${ETransactionVersion3$1}`;
  };
type LedgerPathCalculation = (accountId: number, applicationName: string) => Uint8Array;

declare global {
  interface Buffer<
    TArrayBuffer extends ArrayBufferLike = ArrayBufferLike,
  > extends Uint8Array<TArrayBuffer> {}
}

/**
 * Result of provider.getTipStatsFromBlocks().
 * @param {bigint} minTip - minimum tip encountered in the analyzed blocks.
 * @param {bigint} maxTip - maximum tip encountered in the analyzed blocks.
 * @param {bigint} averageTip - average tip encountered in the analyzed blocks.
 * @param {bigint} medianTip - median (middle value) tip encountered in the analyzed blocks.
 * @param {bigint} modeTip - mode (most frequent) tip encountered in the analyzed blocks.
 * @param {bigint} recommendedTip - suggested tip amount (median tip) for optimal inclusion probability.
 * @param {bigint} p90Tip - 90th percentile tip (90% of tips are below this value).
 * @param {bigint} p95Tip - 95th percentile tip (95% of tips are below this value).
 * @param {object} metrics - Optional performance metrics for the analysis.
 */
type TipEstimate = {
  minTip: bigint;
  maxTip: bigint;
  averageTip: bigint;
  medianTip: bigint;
  modeTip: bigint;
  recommendedTip: bigint;
  p90Tip: bigint;
  p95Tip: bigint;
  metrics?: {
    blocksAnalyzed: number;
    transactionsTipsFound: bigint[];
  };
};
type TipType = Exclude<keyof TipEstimate, 'metrics'>;
/**
 * Options for customizing tip analysis behavior.
 */
type TipAnalysisOptions = {
  /**
   * Maximum number of blocks to analyze going backwards from the starting block.
   * @default 3
   */
  maxBlocks?: number;
  /**
   * Minimum number of transactions required to generate reliable statistics.
   * @default 10
   */
  minTxsNecessary?: number;
  /**
   * Whether to include transactions with zero tips in the analysis.
   * @default true
   */
  includeZeroTips?: boolean;
};
/**
 * Analyzes tip statistics from recent blocks to help determine optimal tip amounts.
 *
 * This function examines V3 invoke transactions across multiple recent blocks to calculate
 * minimum, maximum, and average tip amounts. This data can be used to determine an
 * appropriate tip for new transactions.
 *
 * **Performance Notes:**
 * - Automatically detects if your provider has batching enabled
 * - When batching is enabled, all block requests are made in parallel and automatically
 *   batched into a single HTTP request for maximum efficiency
 * - When batching is not enabled, requests are made sequentially with early exit capability
 *
 * @param provider - RPC provider for blockchain communication
 * @param blockIdentifier - Starting block for analysis (goes backwards from this block)
 * @param options - Configuration options for the analysis
 * @returns Promise resolving to TipEstimate object
 *
 * @throws {Error} When invalid parameters are provided
 * @throws {LibraryError} When RPC calls fail, data is invalid, or insufficient transaction data is found
 *
 * @example
 * ```typescript
 * import { RpcProvider } from 'starknet';
 *
 * // Create provider with batching for optimal performance
 * const provider = new RpcProvider({
 *   nodeUrl: 'your_node_url',
 *   batch: 50  // 50ms batch interval - automatically detected and used
 * });
 *
 * // Basic usage - automatically uses best strategy
 * const tipStats = await getTipStatsFromBlocks(provider, 'latest');
 * console.log(`Recommended tip (median): ${tipStats.recommendedTip}`);
 * console.log(`90th percentile tip: ${tipStats.p90Tip}`);
 * console.log(`95th percentile tip: ${tipStats.p95Tip}`);
 *
 * // Advanced usage with custom options
 * const tipStats = await getTipStatsFromBlocks(
 *   provider,
 *   'latest',
 *   {
 *     maxBlocks: 10,
 *     minTxsNecessary: 5,
 *     includeZeroTips: true
 *   }
 * );
 *
 * // Check if we have sufficient data
 * if (tipStats.recommendedTip === 0n) {
 *   console.log('Insufficient transaction data for reliable tip estimation');
 * } else {
 *   console.log(`Recommended tip: ${tipStats.recommendedTip}`);
 *   console.log(`Average tip: ${tipStats.averageTip}`);
 *   console.log(`Median tip: ${tipStats.medianTip}`);
 *   console.log(`Mode tip: ${tipStats.modeTip}`);
 *   console.log(`Min tip: ${tipStats.minTip}, Max tip: ${tipStats.maxTip}`);
 *   console.log(`P90 tip: ${tipStats.p90Tip} (90% of tips are below this)`);
 *   console.log(`P95 tip: ${tipStats.p95Tip} (95% of tips are below this)`);
 *
 *   // Access performance metrics if available
 *   if (tipStats.metrics) {
 *     console.log(`Analyzed ${tipStats.metrics.transactionsFound} transactions`);
 *     console.log(`Across ${tipStats.metrics.blocksAnalyzed} blocks`);
 *   }
 * }
 *
 * // Using specific block number
 * const blockNumber = 650000;
 * const historicalTips = await getTipStatsFromBlocks(provider, blockNumber);
 * ```
 */
declare function getTipStatsFromBlocks(
  provider: ProviderInterface,
  blockIdentifier?: BlockIdentifier,
  options?: TipAnalysisOptions
): Promise<TipEstimate>;

declare const IS_BROWSER: boolean;
/**
 * Some functions recreated from https://github.com/pedrouid/enc-utils/blob/master/src/index.ts
 * enc-utils is not a dependency to avoid using `Buffer` which only works in node and not browsers
 */
/**
 * Convert array buffer to string
 *
 * *[internal usage]*
 *
 * @param {ArrayBuffer} array The ArrayBuffer to convert to string.
 * @returns {string} The converted string.
 *
 * @example
 * ```typescript
 * const buffer = new ArrayBuffer(5);
 * const view = new Uint8Array(buffer);
 * [72, 101, 108, 108, 111].forEach((x, idx) => view[idx] = x);
 * const result = encode.arrayBufferToString(buffer);
 * // result = "Hello"
 * ```
 */
declare function arrayBufferToString(array: ArrayBuffer): string;
/**
 * Convert utf8-string to Uint8Array
 *
 * *[internal usage]*
 *
 * @param {string} str The UTF-8 string to convert.
 * @returns {Uint8Array} The encoded Uint8Array.
 *
 * @example
 * ```typescript
 * const myString = 'Hi';
 * const result = encode.utf8ToArray(myString);
 * // result = Uint8Array(2) [ 72, 105 ]
 * ```
 */
declare function utf8ToUint8Array(str: string): Uint8Array;
/**
 * @deprecated use utf8ToUint8Array instead
 */
declare const utf8ToArray: typeof utf8ToUint8Array;
/**
 * Convert utf8-string to bigint
 *
 * @param str The UTF-8 string to convert.
 * @returns The converted bigint.
 */
declare function utf8ToBigInt(str: string): bigint;
/**
 * Convert string to array buffer (browser and node compatible)
 *
 * @param {string} a The Base64 encoded string to convert.
 * @returns {Uint8Array} The decoded Uint8Array.
 *
 * @example
 * ```typescript
 * const base64String = 'SGVsbG8='; // 'Hello' in Base64
 * const result = encode.atobUniversal(base64String);
 * // result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
 * ```
 */
declare function atobUniversal(a: string): Uint8Array;
/**
 * Convert array buffer to string (browser and node compatible)
 *
 * @param {ArrayBuffer} b The Array buffer.
 * @returns {string} The Base64 encoded string.
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const result = encode.btoaUniversal(buffer);
 * // result = "SGVsbG8="
 * ```
 */
declare function btoaUniversal(b: ArrayBuffer): string;
/**
 * Convert array buffer to hex-string
 *
 * @param {Uint8Array} buffer The encoded Uint8Array.
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const result = encode.buf2hex(buffer);
 * // result = "48656c6c6f"
 * ```
 */
declare function buf2hex(buffer: Uint8Array): string;
/**
 * Remove hex prefix '0x' from hex-string
 * @param hex hex-string
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const hexStringWithPrefix = '0x48656c6c6f';
 * const result = encode.removeHexPrefix(hexStringWithPrefix);
 * // result: "48656c6c6f"
 * ```
 */
declare function removeHexPrefix(hex: string): string;
/**
 * Add hex prefix '0x' to base16-string
 * @param hex base16-string
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const plainHexString = '48656c6c6f';
 * const result = encode.addHexPrefix(plainHexString);
 * // result: "0x48656c6c6f"
 * ```
 */
declare function addHexPrefix(hex: string): string;
/**
 * Prepend string (default with '0')
 *
 * Pads a string to a certain length with a specific string.
 * The padding can be applied only to the left of the input string.
 *
 * @param {string} str The string to pad.
 * @param {number} length The target length for the padded string.
 * @param {string} [padding='0'] The string to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 * @example
 * ```typescript
 * const myString = '1A3F';
 * const result = encode.padLeft(myString, 10);
 * // result: '0000001A3F'
 * ```
 */
declare function padLeft(str: string, length: number, padding?: string): string;
/**
 * Calculate byte length of string
 *
 * *[no internal usage]*
 *
 * Calculates the byte length of a string based on a specified byte size.
 * The function rounds up the byte count to the nearest multiple of the specified byte size.
 *
 * @param {string} str The string whose byte length is to be calculated.
 * @param {number} [byteSize='8'] The size of the byte block to round up to. Defaults to 8.
 * @returns {number} The calculated byte length, rounded to the nearest multiple of byteSize.
 *
 * @example
 * ```typescript
 * const myString = 'Hello';
 * const result = encode.calcByteLength(myString, 4);
 * // result = 8 (rounded up to the nearest multiple of 4)
 *
 * ```
 */
declare function calcByteLength(str: string, byteSize?: number): number;
/**
 * Prepend '0' to string bytes
 *
 * *[no internal usage]*
 *
 *
 * * Prepends padding to the left of a string to ensure it matches a specific byte length.
 * The function uses a specified padding character and rounds up the string length to the nearest multiple of `byteSize`.
 *
 * @param {string} str The string to be padded.
 * @param {number} [byteSize='8'] The byte block size to which the string length should be rounded up. Defaults to 8.
 * @param {string} [padding='0'] The character to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 *
 * @example
 * ```typescript
 * const myString = '123';
 * const result = encode.sanitizeBytes(myString);
 * // result: '00000123' (padded to 8 characters)
 * ```
 */
declare function sanitizeBytes(str: string, byteSize?: number, padding?: string): string;
/**
 * Sanitizes a hex-string by removing any existing '0x' prefix, padding the string with '0' to ensure it has even length,
 * and then re-adding the '0x' prefix.
 *
 * *[no internal usage]*
 * @param {string} hex hex-string
 * @returns {string} format: hex-string
 *
 * @example
 * ```typescript
 * const unevenHex = '0x23abc';
 * const result = encode.sanitizeHex(unevenHex);
 * // result = '0x023abc' (padded to ensure even length)
 * ```
 */
declare function sanitizeHex(hex: string): string;
/**
 * String transformation util
 *
 * Pascal case to screaming snake case
 *
 * @param {string} text The PascalCase string to convert.
 * @returns {string} The converted snake_case string in uppercase.
 *
 * @example
 * ```typescript
 * const pascalString = 'PascalCaseExample';
 * const result = encode.pascalToSnake(pascalString);
 * // result: 'PASCAL_CASE_EXAMPLE'
 * ```
 */
declare const pascalToSnake: (text: string) => string;
/**
 * Combine multiple Uint8Arrays into one.
 * Useful for wallet path creation.
 * @param {Uint8Array[]} uint8arrays An array of Uint8Array.
 * @returns {Uint8Array} all the Uint8Arrays joined.
 * @example
 * ```typescript
 * const path0buff = new Uint8Array([128, 0, 10, 85]);
 * const path1buff = new Uint8Array([71, 65, 233, 201]);
 * const result = encode.concatenateArrayBuffer([path0buff, path1buff]);
 * // result = Uint8Array(8) [128, 0, 10, 85, 71, 65, 233, 201]
 * ```
 */
declare function concatenateArrayBuffer(uint8arrays: Uint8Array[]): Uint8Array;
/**
 * Convert hex string to Uint8Array
 *
 * @param {string} hex The hex string to convert (with or without '0x' prefix)
 * @returns {Uint8Array} The converted byte array
 * @throws {Error} If the string contains non-hexadecimal characters
 *
 * @example
 * ```typescript
 * const hexString = '0x48656c6c6f';
 * const result = encode.hexStringToUint8Array(hexString);
 * // result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
 * ```
 */
declare function hexStringToUint8Array(hex: string): Uint8Array;
/**
 * Convert any string to Uint8Array
 *
 * Handles three types of strings:
 * - Hex strings (e.g., '0x123f') - converts hex bytes to Uint8Array
 * - Decimal strings (e.g., '124324332') - converts decimal number to bytes
 * - Text strings (e.g., 'I am cool ☥') - converts UTF-8 text to bytes
 *
 * @param {string} str The string to convert
 * @returns {Uint8Array} The converted byte array
 *
 * @example
 * ```typescript
 * // Hex string
 * const hex = stringToUint8Array('0x48656c6c6f');
 * // result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
 *
 * // Decimal string
 * const decimal = stringToUint8Array('256');
 * // result = Uint8Array(2) [ 1, 0 ]
 *
 * // Text string
 * const text = stringToUint8Array('Hello ☥');
 * // result = UTF-8 encoded bytes
 * ```
 */
declare function stringToUint8Array(str: string): Uint8Array;
/**
 * Convert bigint to Uint8Array (big-endian)
 *
 * @param {bigint} value The bigint value to convert (must be non-negative)
 * @returns {Uint8Array} The converted byte array in big-endian byte order
 * @throws {Error} If value is negative
 *
 * @example
 * ```typescript
 * const value = 256n; // 0x0100
 * const result = encode.bigIntToUint8Array(value);
 * // result = Uint8Array([1, 0]) - big-endian, MSB first
 * ```
 */
declare function bigIntToUint8Array(value: bigint): Uint8Array;
/**
 * Convert Uint8Array to bigint (big-endian)
 *
 * @param {Uint8Array} data The Uint8Array to convert (interpreted as big-endian)
 * @returns {bigint} The converted bigint value
 *
 * @example
 * ```typescript
 * const data = new Uint8Array([1, 0]); // Big-endian representation
 * const result = encode.uint8ArrayToBigInt(data);
 * // result = 256n (0x0100)
 * ```
 */
declare function uint8ArrayToBigInt(data: Uint8Array): bigint;

declare const encode_IS_BROWSER: typeof IS_BROWSER;
declare const encode_addHexPrefix: typeof addHexPrefix;
declare const encode_arrayBufferToString: typeof arrayBufferToString;
declare const encode_atobUniversal: typeof atobUniversal;
declare const encode_bigIntToUint8Array: typeof bigIntToUint8Array;
declare const encode_btoaUniversal: typeof btoaUniversal;
declare const encode_buf2hex: typeof buf2hex;
declare const encode_calcByteLength: typeof calcByteLength;
declare const encode_concatenateArrayBuffer: typeof concatenateArrayBuffer;
declare const encode_hexStringToUint8Array: typeof hexStringToUint8Array;
declare const encode_padLeft: typeof padLeft;
declare const encode_pascalToSnake: typeof pascalToSnake;
declare const encode_removeHexPrefix: typeof removeHexPrefix;
declare const encode_sanitizeBytes: typeof sanitizeBytes;
declare const encode_sanitizeHex: typeof sanitizeHex;
declare const encode_stringToUint8Array: typeof stringToUint8Array;
declare const encode_uint8ArrayToBigInt: typeof uint8ArrayToBigInt;
declare const encode_utf8ToArray: typeof utf8ToArray;
declare const encode_utf8ToBigInt: typeof utf8ToBigInt;
declare const encode_utf8ToUint8Array: typeof utf8ToUint8Array;
declare namespace encode {
  export {
    encode_IS_BROWSER as IS_BROWSER,
    encode_addHexPrefix as addHexPrefix,
    encode_arrayBufferToString as arrayBufferToString,
    encode_atobUniversal as atobUniversal,
    encode_bigIntToUint8Array as bigIntToUint8Array,
    encode_btoaUniversal as btoaUniversal,
    encode_buf2hex as buf2hex,
    encode_calcByteLength as calcByteLength,
    encode_concatenateArrayBuffer as concatenateArrayBuffer,
    encode_hexStringToUint8Array as hexStringToUint8Array,
    encode_padLeft as padLeft,
    encode_pascalToSnake as pascalToSnake,
    encode_removeHexPrefix as removeHexPrefix,
    encode_sanitizeBytes as sanitizeBytes,
    encode_sanitizeHex as sanitizeHex,
    encode_stringToUint8Array as stringToUint8Array,
    encode_uint8ArrayToBigInt as uint8ArrayToBigInt,
    encode_utf8ToArray as utf8ToArray,
    encode_utf8ToBigInt as utf8ToBigInt,
    encode_utf8ToUint8Array as utf8ToUint8Array,
  };
}

/**
 * Cairo Felt support storing max 31 character
 */
declare const TEXT_TO_FELT_MAX_LEN = 31;
declare const ZERO = 0n;
declare const MASK_250: bigint;
declare const MASK_31: bigint;
declare const API_VERSION = 0n;
declare const PRIME: bigint;
declare const MAX_STORAGE_ITEM_SIZE = 256n;
declare const ADDR_BOUND: bigint;
declare const RANGE_FELT: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_U8: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_U16: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_U32: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_U64: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_U96: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_U128: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_I8: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_I16: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_I32: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_I64: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const RANGE_I128: {
  readonly min: bigint;
  readonly max: bigint;
};
declare const LegacyUDC: {
  readonly ADDRESS: '0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf';
  readonly ENTRYPOINT: 'deployContract';
};
declare const UDC: {
  readonly ADDRESS: '0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125';
  readonly ENTRYPOINT: 'deploy_contract';
};
declare const OutsideExecutionCallerAny = '0x414e595f43414c4c4552';
declare const SNIP9_V1_INTERFACE_ID =
  '0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181';
declare const SNIP9_V2_INTERFACE_ID =
  '0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872';
declare const HARDENING_BYTE = 128;
declare const HARDENING_4BYTES = 2147483648n;
declare const _BaseUrl: {
  readonly SN_MAIN: 'https://alpha-mainnet.starknet.io';
  readonly SN_SEPOLIA: 'https://alpha-sepolia.starknet.io';
};
type _BaseUrl = ValuesType<typeof _BaseUrl>;

declare const _NetworkName: {
  readonly SN_MAIN: 'SN_MAIN';
  readonly SN_SEPOLIA: 'SN_SEPOLIA';
};
type _NetworkName = ValuesType<typeof _NetworkName>;

declare const _StarknetChainId: {
  readonly SN_MAIN: '0x534e5f4d41494e';
  readonly SN_SEPOLIA: '0x534e5f5345504f4c4941';
};
type _StarknetChainId = ValuesType<typeof _StarknetChainId>;

declare const _TransactionHashPrefix: {
  readonly DECLARE: '0x6465636c617265';
  readonly DEPLOY: '0x6465706c6f79';
  readonly DEPLOY_ACCOUNT: '0x6465706c6f795f6163636f756e74';
  readonly INVOKE: '0x696e766f6b65';
  readonly L1_HANDLER: '0x6c315f68616e646c6572';
};
type _TransactionHashPrefix = ValuesType<typeof _TransactionHashPrefix>;

/**
 * dot format rpc versions
 */
declare const _SupportedRpcVersion: {
  readonly '0.9.0': '0.9.0';
  readonly '0.10.0': '0.10.0';
  readonly '0.10.2': '0.10.2';
  readonly '0.10.3': '0.10.3';
  readonly v0_9_0: '0.9.0';
  readonly v0_10_0: '0.10.0';
  readonly v0_10_2: '0.10.2';
  readonly v0_10_3: '0.10.3';
};
type _SupportedRpcVersion = ValuesType<typeof _SupportedRpcVersion>;

/**
 * Union of RPC 0.10.x dot-format versions (spec 0.10.0 family).
 */
type SupportedRpcVersion0_10 =
  | typeof _SupportedRpcVersion.v0_10_0
  | typeof _SupportedRpcVersion.v0_10_2
  | typeof _SupportedRpcVersion.v0_10_3;
type SupportedTransactionVersion = typeof ETransactionVersion$1.V3;
type SupportedCairoVersion = '1';
/**
 * Channel method-specific options
 */
type ChannelMethodOptions = {
  simulateTransaction: Omit<getSimulateTransactionOptions, 'blockIdentifier'>;
  getEstimateFee: Omit<getEstimateFeeBulkOptions, 'blockIdentifier'>;
};
/**
 * Channel default options
 */
type ChannelDefaultOptions = {
  headers: Record<string, string>;
  blockIdentifier: BlockTag;
  retries: number;
  transactionRetryIntervalFallback: number;
};
/**
 * Channel defaults configuration
 */
type ChannelDefaults = {
  options: ChannelDefaultOptions;
  methods: ChannelMethodOptions;
};
declare const DEFAULT_GLOBAL_CONFIG: {
  logLevel: LogLevel;
  rpcVersion: _SupportedRpcVersion;
  transactionVersion: SupportedTransactionVersion;
  resourceBoundsOverhead: ResourceBoundsOverhead;
  defaultTipType: TipType;
  channelDefaults: ChannelDefaults;
  fetch: any;
  websocket: any;
  buffer: any;
  /**
   * Custom blake function
   * @param uint8Array - The uint8Array to hash
   * @returns The hash of the uint8Array
   * @example
   * ```typescript
   * config.set('blake', (uint8Array: Uint8Array) => {
   *   return blake2s(uint8Array, { dkLen: 32 });
   * });
   * ```
   */
  blake: ((uint8Array: Uint8Array) => Uint8Array) | undefined;
};
declare const RPC_DEFAULT_NODES: {
  readonly SN_MAIN: readonly ['https://api.zan.top/public/starknet-mainnet/rpc/'];
  readonly SN_SEPOLIA: readonly ['https://api.zan.top/public/starknet-sepolia/rpc/'];
};
declare const PAYMASTER_RPC_NODES: {
  readonly SN_MAIN: readonly ['https://starknet.paymaster.avnu.fi'];
  readonly SN_SEPOLIA: readonly ['https://sepolia.paymaster.avnu.fi'];
};
declare const SYSTEM_MESSAGES: {
  legacyTxWarningMessage: string;
  legacyTxRPC08Message: string;
  SWOldV3: string;
  channelVersionMismatch: string;
  unsupportedSpecVersion: string;
  maxFeeInV3: string;
  declareNonSierra: string;
  unsupportedMethodForRpcVersion: string;
  txEvictedFromMempool: string;
  consensusFailed: string;
  txFailsBlockBuildingValidation: string;
};
declare const SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS: '0.14.1';

declare const constants_ADDR_BOUND: typeof ADDR_BOUND;
declare const constants_API_VERSION: typeof API_VERSION;
type constants_ChannelDefaultOptions = ChannelDefaultOptions;
type constants_ChannelDefaults = ChannelDefaults;
type constants_ChannelMethodOptions = ChannelMethodOptions;
declare const constants_DEFAULT_GLOBAL_CONFIG: typeof DEFAULT_GLOBAL_CONFIG;
declare const constants_HARDENING_4BYTES: typeof HARDENING_4BYTES;
declare const constants_HARDENING_BYTE: typeof HARDENING_BYTE;
declare const constants_IS_BROWSER: typeof IS_BROWSER;
declare const constants_LegacyUDC: typeof LegacyUDC;
declare const constants_MASK_250: typeof MASK_250;
declare const constants_MASK_31: typeof MASK_31;
declare const constants_MAX_STORAGE_ITEM_SIZE: typeof MAX_STORAGE_ITEM_SIZE;
declare const constants_OutsideExecutionCallerAny: typeof OutsideExecutionCallerAny;
declare const constants_PAYMASTER_RPC_NODES: typeof PAYMASTER_RPC_NODES;
declare const constants_PRIME: typeof PRIME;
declare const constants_RANGE_FELT: typeof RANGE_FELT;
declare const constants_RANGE_I128: typeof RANGE_I128;
declare const constants_RANGE_I16: typeof RANGE_I16;
declare const constants_RANGE_I32: typeof RANGE_I32;
declare const constants_RANGE_I64: typeof RANGE_I64;
declare const constants_RANGE_I8: typeof RANGE_I8;
declare const constants_RANGE_U128: typeof RANGE_U128;
declare const constants_RANGE_U16: typeof RANGE_U16;
declare const constants_RANGE_U32: typeof RANGE_U32;
declare const constants_RANGE_U64: typeof RANGE_U64;
declare const constants_RANGE_U8: typeof RANGE_U8;
declare const constants_RANGE_U96: typeof RANGE_U96;
declare const constants_RPC_DEFAULT_NODES: typeof RPC_DEFAULT_NODES;
declare const constants_SNIP9_V1_INTERFACE_ID: typeof SNIP9_V1_INTERFACE_ID;
declare const constants_SNIP9_V2_INTERFACE_ID: typeof SNIP9_V2_INTERFACE_ID;
declare const constants_SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS: typeof SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS;
declare const constants_SYSTEM_MESSAGES: typeof SYSTEM_MESSAGES;
type constants_SupportedCairoVersion = SupportedCairoVersion;
type constants_SupportedRpcVersion0_10 = SupportedRpcVersion0_10;
type constants_SupportedTransactionVersion = SupportedTransactionVersion;
declare const constants_TEXT_TO_FELT_MAX_LEN: typeof TEXT_TO_FELT_MAX_LEN;
declare const constants_UDC: typeof UDC;
declare const constants_ZERO: typeof ZERO;
declare namespace constants {
  export {
    constants_ADDR_BOUND as ADDR_BOUND,
    constants_API_VERSION as API_VERSION,
    _BaseUrl as BaseUrl,
    type constants_ChannelDefaultOptions as ChannelDefaultOptions,
    type constants_ChannelDefaults as ChannelDefaults,
    type constants_ChannelMethodOptions as ChannelMethodOptions,
    constants_DEFAULT_GLOBAL_CONFIG as DEFAULT_GLOBAL_CONFIG,
    constants_HARDENING_4BYTES as HARDENING_4BYTES,
    constants_HARDENING_BYTE as HARDENING_BYTE,
    constants_IS_BROWSER as IS_BROWSER,
    constants_LegacyUDC as LegacyUDC,
    constants_MASK_250 as MASK_250,
    constants_MASK_31 as MASK_31,
    constants_MAX_STORAGE_ITEM_SIZE as MAX_STORAGE_ITEM_SIZE,
    _NetworkName as NetworkName,
    constants_OutsideExecutionCallerAny as OutsideExecutionCallerAny,
    constants_PAYMASTER_RPC_NODES as PAYMASTER_RPC_NODES,
    constants_PRIME as PRIME,
    constants_RANGE_FELT as RANGE_FELT,
    constants_RANGE_I128 as RANGE_I128,
    constants_RANGE_I16 as RANGE_I16,
    constants_RANGE_I32 as RANGE_I32,
    constants_RANGE_I64 as RANGE_I64,
    constants_RANGE_I8 as RANGE_I8,
    constants_RANGE_U128 as RANGE_U128,
    constants_RANGE_U16 as RANGE_U16,
    constants_RANGE_U32 as RANGE_U32,
    constants_RANGE_U64 as RANGE_U64,
    constants_RANGE_U8 as RANGE_U8,
    constants_RANGE_U96 as RANGE_U96,
    constants_RPC_DEFAULT_NODES as RPC_DEFAULT_NODES,
    constants_SNIP9_V1_INTERFACE_ID as SNIP9_V1_INTERFACE_ID,
    constants_SNIP9_V2_INTERFACE_ID as SNIP9_V2_INTERFACE_ID,
    constants_SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS as SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS,
    constants_SYSTEM_MESSAGES as SYSTEM_MESSAGES,
    _StarknetChainId as StarknetChainId,
    type constants_SupportedCairoVersion as SupportedCairoVersion,
    _SupportedRpcVersion as SupportedRpcVersion,
    type constants_SupportedRpcVersion0_10 as SupportedRpcVersion0_10,
    type constants_SupportedTransactionVersion as SupportedTransactionVersion,
    constants_TEXT_TO_FELT_MAX_LEN as TEXT_TO_FELT_MAX_LEN,
    _TransactionHashPrefix as TransactionHashPrefix,
    constants_UDC as UDC,
    constants_ZERO as ZERO,
  };
}

declare class RpcChannel$2 {
  readonly id = 'RPC090';
  /**
   * RPC specification version this Channel class implements
   */
  readonly channelSpecVersion: _SupportedRpcVersion;
  nodeUrl: string;
  headers: object;
  requestId: number;
  readonly blockIdentifier: BlockIdentifier;
  readonly retries: number;
  readonly waitMode: boolean;
  private chainId?;
  /**
   * RPC specification version of the connected node
   */
  private specVersion?;
  private transactionRetryIntervalFallback?;
  private batchClient?;
  private baseFetch;
  constructor(optionsOrProvider?: RpcProviderOptions);
  readSpecVersion(): '0.9.0' | '0.10.0' | '0.10.2' | '0.10.3' | undefined;
  private get transactionRetryIntervalDefault();
  setChainId(chainId: _StarknetChainId): void;
  fetch(method: string, params?: object, id?: string | number): Promise<Response>;
  protected errorHandler(method: string, params: any, rpcError?: Error$1, otherError?: any): void;
  protected fetchEndpoint<T extends keyof RPC.Methods>(
    method: T,
    params?: RPC.Methods[T]['params']
  ): Promise<RPC.Methods[T]['result']>;
  getChainId(): Promise<'0x534e5f4d41494e' | '0x534e5f5345504f4c4941'>;
  /**
   * fetch rpc node specVersion
   * @example this.specVersion = "0.9.0"
   */
  getSpecVersion(): Promise<string>;
  /**
   * fetch if undefined else just return this.specVersion
   * @example this.specVersion = "0.9.0"
   */
  setUpSpecVersion(): Promise<'0.9.0' | '0.10.0' | '0.10.2' | '0.10.3'>;
  /**
   * Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order
   */
  getMessagesStatus(txHash: BigNumberish): Promise<RPC.L1L2MessagesStatus>;
  getStorageProof(
    classHashes?: BigNumberish[],
    contractAddresses?: BigNumberish[],
    contractsStorageKeys?: RPC.CONTRACT_STORAGE_KEYS[], // TODO: allow BigNUmberish[] and fix formatting before request
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC.StorageProof>;
  getCompiledCasm(classHash: BigNumberish): Promise<RPC.CASM_COMPILED_CONTRACT_CLASS>;
  getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<string>;
  /**
   * Helper method to get the starknet version from the block, default latest block
   * @returns Starknet version
   */
  getStarknetVersion(blockIdentifier?: BlockIdentifier): Promise<string>;
  /**
   * Get the most recent accepted block hash and number
   */
  getBlockLatestAccepted(): Promise<RPC.BlockHashAndNumber>;
  /**
   * Get the most recent accepted block number
   * redundant use getBlockLatestAccepted();
   * @returns Number of the latest block
   */
  getBlockNumber(): Promise<number>;
  getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<
    | ({
        status: RPC.BLOCK_STATUS;
      } & RPC.BLOCK_HEADER &
        RPC.BLOCK_BODY_WITH_TX_HASHES & {})
    | (RPC.BLOCK_BODY_WITH_TX_HASHES &
        RPC.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
        })
  >;
  getBlockWithTxs(blockIdentifier?: BlockIdentifier): Promise<
    | ({
        status: RPC.BLOCK_STATUS;
      } & RPC.BLOCK_HEADER &
        RPC.BLOCK_BODY_WITH_TXS & {})
    | (RPC.BLOCK_BODY_WITH_TXS &
        RPC.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
        })
  >;
  getBlockWithReceipts(blockIdentifier?: BlockIdentifier): Promise<
    | ({
        status: RPC.BLOCK_STATUS;
      } & RPC.BLOCK_HEADER &
        RPC.BLOCK_BODY_WITH_RECEIPTS & {})
    | (RPC.BLOCK_BODY_WITH_RECEIPTS &
        RPC.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
        })
  >;
  getBlockStateUpdate(blockIdentifier?: BlockIdentifier): Promise<
    | (RPC.STATE_UPDATE & {})
    | (RPC.PRE_CONFIRMED_STATE_UPDATE & {
        new_root?: undefined;
      })
  >;
  getBlockTransactionsTraces(
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC.BlockTransactionsTraces>;
  getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;
  getTransactionByHash(txHash: BigNumberish): Promise<RPC.TXN_WITH_HASH>;
  getTransactionByBlockIdAndIndex(
    blockIdentifier: BlockIdentifier,
    index: number
  ): Promise<RPC.TXN_WITH_HASH>;
  getTransactionReceipt(txHash: BigNumberish): Promise<RPC.TXN_RECEIPT_WITH_BLOCK_INFO>;
  getTransactionTrace(txHash: BigNumberish): Promise<RPC.TRANSACTION_TRACE>;
  /**
   * Get the status of a transaction
   */
  getTransactionStatus(transactionHash: BigNumberish): Promise<RPC.TXN_STATUS_RESULT>;
  /**
   * @param invocations AccountInvocations
   * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
   * - blockIdentifier<br/>
   * - skipValidate (default true)<br/>
   * - skipFeeCharge (default true)<br/>
   */
  simulateTransaction(
    invocations: AccountInvocations,
    simulateTransactionOptions?: getSimulateTransactionOptions
  ): Promise<RPC.SimulateTransactionResponse>;
  waitForTransaction(
    txHash: BigNumberish,
    options?: waitForTransactionOptions
  ): Promise<RPC.TXN_RECEIPT>;
  getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<string>;
  getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
  getClass(
    classHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<
    | (RPC.CONTRACT_CLASS & {
        program?: undefined;
      })
    | (RPC.DEPRECATED_CONTRACT_CLASS & {
        sierra_program?: undefined;
        contract_class_version?: undefined;
      })
  >;
  getClassAt(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<
    | (RPC.CONTRACT_CLASS & {
        program?: undefined;
      })
    | (RPC.DEPRECATED_CONTRACT_CLASS & {
        sierra_program?: undefined;
        contract_class_version?: undefined;
      })
  >;
  getEstimateFee(
    invocations: AccountInvocations,
    options?: getEstimateFeeBulkOptions
  ): Promise<RPC.FEE_ESTIMATE[]>;
  invoke(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<RPC.InvokedTransaction>;
  invokeSignedTx(transaction: RPC.INVOKE_TXN_V3): Promise<RPC.InvokedTransaction>;
  declare(
    declareTransaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<RPC.DeclaredTransaction | RPC.TXN_RECEIPT>;
  deployAccount(
    deployAccountTransaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<RPC.DeployedAccountTransaction | RPC.TXN_RECEIPT>;
  callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<string[]>;
  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   */
  estimateMessageFee(
    message: RPC.L1Message,
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC.MESSAGE_FEE_ESTIMATE>;
  /**
   * Returns an object about the sync status, or false if the node is not synching
   * @returns Object with the stats data
   */
  getSyncingStats(): Promise<RPC.Syncing>;
  /**
   * Returns all events matching the given filter
   * @returns events and the pagination of the events
   */
  getEvents(eventFilter: RPC.EventFilter): Promise<RPC.EVENTS_CHUNK>;
  buildTransaction<T extends AccountInvocationItem>(
    invocation: T,
    versionType?: 'fee' | 'transaction'
  ): Promise<
    T extends {
      type: typeof ETransactionType.INVOKE;
    }
      ? RPC.INVOKE_TXN_V3
      : T extends {
            type: typeof ETransactionType.DECLARE;
          }
        ? RPC.BROADCASTED_DECLARE_TXN_V3
        : T extends {
              type: typeof ETransactionType.DEPLOY_ACCOUNT;
            }
          ? RPC.DEPLOY_ACCOUNT_TXN_V3
          : never
  >;
}

declare namespace rpc_0_9_0 {
  export { RpcChannel$2 as RpcChannel };
}

declare class RpcChannel$1 {
  readonly id: string;
  /**
   * RPC specification version this Channel class implements
   */
  readonly channelSpecVersion: _SupportedRpcVersion;
  nodeUrl: string;
  headers: object;
  requestId: number;
  readonly blockIdentifier: BlockIdentifier;
  readonly retries: number;
  readonly waitMode: boolean;
  private chainId?;
  /**
   * RPC specification version of the connected node
   */
  private specVersion?;
  private transactionRetryIntervalFallback?;
  private batchClient?;
  private baseFetch;
  constructor(optionsOrProvider?: RpcProviderOptions);
  readSpecVersion(): '0.9.0' | '0.10.0' | '0.10.2' | '0.10.3' | undefined;
  private get transactionRetryIntervalDefault();
  setChainId(chainId: _StarknetChainId): void;
  fetch(method: string, params?: object, id?: string | number): Promise<Response>;
  protected errorHandler(method: string, params: any, rpcError?: Error$1, otherError?: any): void;
  protected fetchEndpoint<T extends keyof RPC$1.Methods>(
    method: T,
    params?: RPC$1.Methods[T]['params']
  ): Promise<RPC$1.Methods[T]['result']>;
  getChainId(): Promise<'0x534e5f4d41494e' | '0x534e5f5345504f4c4941'>;
  /**
   * fetch rpc node specVersion
   * @example this.specVersion = "0.9.0"
   */
  getSpecVersion(): Promise<string>;
  /**
   * fetch if undefined else just return this.specVersion
   * @example this.specVersion = "0.9.0"
   */
  setUpSpecVersion(): Promise<'0.9.0' | '0.10.0' | '0.10.2' | '0.10.3'>;
  /**
   * Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order
   */
  getMessagesStatus(txHash: BigNumberish): Promise<RPC$1.L1L2MessagesStatus>;
  getStorageProof(
    classHashes?: BigNumberish[],
    contractAddresses?: BigNumberish[],
    contractsStorageKeys?: RPC$1.CONTRACT_STORAGE_KEYS[], // TODO: allow BigNUmberish[] and fix formatting before request
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC$1.StorageProof>;
  getCompiledCasm(classHash: BigNumberish): Promise<RPC$1.CASM_COMPILED_CONTRACT_CLASS>;
  getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<string>;
  /**
   * Helper method to get the starknet version from the block, default latest block
   * @returns Starknet version
   */
  getStarknetVersion(blockIdentifier?: BlockIdentifier): Promise<string>;
  /**
   * Get the most recent accepted block hash and number
   */
  getBlockLatestAccepted(): Promise<RPC$1.BlockHashAndNumber>;
  /**
   * Get the most recent accepted block number
   * redundant use getBlockLatestAccepted();
   * @returns Number of the latest block
   */
  getBlockNumber(): Promise<number>;
  getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<
    | ({
        status: RPC$1.BLOCK_STATUS;
      } & RPC$1.BLOCK_HEADER &
        RPC$1.BLOCK_BODY_WITH_TX_HASHES & {})
    | (RPC$1.BLOCK_BODY_WITH_TX_HASHES &
        RPC$1.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
          event_commitment?: undefined;
          transaction_commitment?: undefined;
          receipt_commitment?: undefined;
          state_diff_commitment?: undefined;
          event_count?: undefined;
          transaction_count?: undefined;
          state_diff_length?: undefined;
        })
  >;
  /**
   * Get block information with full transactions
   * @param blockIdentifier - block identifier
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getBlockWithTxs(
    blockIdentifier?: BlockIdentifier,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<
    | ({
        status: RPC$1.BLOCK_STATUS;
      } & RPC$1.BLOCK_HEADER &
        RPC$1.BLOCK_BODY_WITH_TXS & {})
    | (RPC$1.BLOCK_BODY_WITH_TXS &
        RPC$1.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
          event_commitment?: undefined;
          transaction_commitment?: undefined;
          receipt_commitment?: undefined;
          state_diff_commitment?: undefined;
          event_count?: undefined;
          transaction_count?: undefined;
          state_diff_length?: undefined;
        })
  >;
  /**
   * Get block information with transaction receipts
   * @param blockIdentifier - block identifier
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getBlockWithReceipts(
    blockIdentifier?: BlockIdentifier,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<
    | ({
        status: RPC$1.BLOCK_STATUS;
      } & RPC$1.BLOCK_HEADER &
        RPC$1.BLOCK_BODY_WITH_RECEIPTS & {})
    | (RPC$1.BLOCK_BODY_WITH_RECEIPTS &
        RPC$1.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
          event_commitment?: undefined;
          transaction_commitment?: undefined;
          receipt_commitment?: undefined;
          state_diff_commitment?: undefined;
          event_count?: undefined;
          transaction_count?: undefined;
          state_diff_length?: undefined;
        })
  >;
  getBlockStateUpdate(
    blockIdentifier?: BlockIdentifier,
    contractAddresses?: BigNumberish[]
  ): Promise<
    | (RPC$1.STATE_UPDATE & {})
    | (RPC$1.PRE_CONFIRMED_STATE_UPDATE & {
        new_root?: undefined;
      })
  >;
  /**
   * Get transaction traces for all transactions in a block
   * @param blockIdentifier - block identifier
   * @param options - optional flags
   *  - returnInitialReads - include initial storage reads in traces (RPC 0.10.1+)
   */
  getBlockTransactionsTraces(
    blockIdentifier?: BlockIdentifier,
    options?: {
      returnInitialReads?: boolean;
    }
  ): Promise<RPC$1.BlockTransactionsTraces>;
  getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;
  /**
   * Get transaction by hash
   * @param txHash - transaction hash
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getTransactionByHash(
    txHash: BigNumberish,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<RPC$1.TXN_WITH_HASH>;
  /**
   * Get transaction by block identifier and index
   * @param blockIdentifier - block identifier
   * @param index - transaction index in the block
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getTransactionByBlockIdAndIndex(
    blockIdentifier: BlockIdentifier,
    index: number,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<RPC$1.TXN_WITH_HASH>;
  getTransactionReceipt(txHash: BigNumberish): Promise<RPC$1.TXN_RECEIPT_WITH_BLOCK_INFO>;
  getTransactionTrace(txHash: BigNumberish): Promise<RPC$1.TRANSACTION_TRACE>;
  /**
   * Get the status of a transaction
   */
  getTransactionStatus(transactionHash: BigNumberish): Promise<RPC$1.TXN_STATUS_RESULT>;
  /**
   * @param invocations AccountInvocations
   * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
   * - blockIdentifier<br/>
   * - skipValidate (default true)<br/>
   * - skipFeeCharge (default true)<br/>
   * - returnInitialReads (default false) - include initial storage reads in trace (RPC 0.10.1+)<br/>
   */
  simulateTransaction(
    invocations: AccountInvocations,
    simulateTransactionOptions?: getSimulateTransactionOptions
  ): Promise<RPC$1.SimulateTransactionResponse>;
  waitForTransaction(
    txHash: BigNumberish,
    options?: waitForTransactionOptions
  ): Promise<RPC$1.TXN_RECEIPT>;
  getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier,
    responseFlags?: RPC$1.STORAGE_RESPONSE_FLAG[]
  ): Promise<string | RPC$1.STORAGE_RESULT>;
  getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
  getClass(
    classHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<
    | (RPC$1.CONTRACT_CLASS & {
        program?: undefined;
      })
    | (RPC$1.DEPRECATED_CONTRACT_CLASS & {
        sierra_program?: undefined;
        contract_class_version?: undefined;
      })
  >;
  getClassAt(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<
    | (RPC$1.CONTRACT_CLASS & {
        program?: undefined;
      })
    | (RPC$1.DEPRECATED_CONTRACT_CLASS & {
        sierra_program?: undefined;
        contract_class_version?: undefined;
      })
  >;
  getEstimateFee(
    invocations: AccountInvocations,
    options?: getEstimateFeeBulkOptions
  ): Promise<RPC$1.FEE_ESTIMATE[]>;
  invoke(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<RPC$1.InvokedTransaction>;
  invokeSignedTx(transaction: RPC$1.INVOKE_TXN_V3): Promise<RPC$1.InvokedTransaction>;
  declare(
    declareTransaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<RPC$1.TXN_RECEIPT | RPC$1.DeclaredTransaction>;
  deployAccount(
    deployAccountTransaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<RPC$1.TXN_RECEIPT | RPC$1.DeployedAccountTransaction>;
  callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<string[]>;
  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   */
  estimateMessageFee(
    message: RPC$1.L1Message,
    blockIdentifier?: BlockIdentifier
  ): Promise<RPC$1.MESSAGE_FEE_ESTIMATE>;
  /**
   * Returns an object about the sync status, or false if the node is not synching
   * @returns Object with the stats data
   */
  getSyncingStats(): Promise<RPC$1.Syncing>;
  /**
   * Returns all events matching the given filter
   * @returns events and the pagination of the events
   */
  getEvents(eventFilter: RPC$1.EventFilter): Promise<RPC$1.EVENTS_CHUNK>;
  buildTransaction<T extends AccountInvocationItem>(
    invocation: T,
    versionType?: 'fee' | 'transaction'
  ): Promise<
    T extends {
      type: typeof ETransactionType.INVOKE;
    }
      ? RPC$1.BROADCASTED_INVOKE_TXN
      : T extends {
            type: typeof ETransactionType.DECLARE;
          }
        ? RPC$1.BROADCASTED_DECLARE_TXN_V3
        : T extends {
              type: typeof ETransactionType.DEPLOY_ACCOUNT;
            }
          ? RPC$1.DEPLOY_ACCOUNT_TXN_V3
          : never
  >;
}

declare namespace rpc_0_10_2 {
  export { RpcChannel$1 as RpcChannel };
}

declare class RpcChannel extends RpcChannel$1 {
  readonly id = 'RPC0.10.3';
  readonly channelSpecVersion: _SupportedRpcVersion;
}

type rpc_0_10_3_RpcChannel = RpcChannel;
declare const rpc_0_10_3_RpcChannel: typeof RpcChannel;
declare namespace rpc_0_10_3 {
  export { rpc_0_10_3_RpcChannel as RpcChannel };
}

/**
 * Options for creating a new Subscription instance
 */
type SubscriptionOptions = {
  /** The containing WebSocketChannel instance */
  channel: WebSocketChannel;
  /** The JSON-RPC method used to create this subscription */
  method: string;
  /** The parameters used to create this subscription (optional, defaults to empty object) */
  params?: object;
  /** The unique identifier for this subscription */
  id: SUBSCRIPTION_ID;
  /** The maximum number of events to buffer */
  maxBufferSize: number;
};
/**
 * Represents an active WebSocket subscription.
 *
 * This class should not be instantiated directly. It is returned by the
 * `subscribe` methods on the `WebSocketChannel`.
 *
 * @template T - The type of data expected from the subscription event.
 * @example
 * ```typescript
 * const channel = new WebSocketChannel({ nodeUrl: 'YOUR_NODE_URL' });
 * await channel.waitForConnection();
 *
 * // The 'sub' object is an instance of the Subscription class.
 * const sub = await channel.subscribeNewHeads();
 *
 * sub.on((data) => {
 *   console.log('Received new head:', data);
 * });
 *
 * // ... later
 * await sub.unsubscribe();
 * ```
 */
declare class Subscription<T = any> {
  /**
   * The containing `WebSocketChannel` instance.
   * @internal
   */
  channel: WebSocketChannel;
  /**
   * The JSON-RPC method used to create this subscription.
   * @internal
   */
  method: string;
  /**
   * The parameters used to create this subscription.
   * @internal
   */
  params: any;
  /**
   * The unique identifier for this subscription.
   * @internal
   */
  id: SUBSCRIPTION_ID;
  private events;
  private buffer;
  private maxBufferSize;
  private handler;
  private _isClosed;
  /**
   * @internal
   * @param options - Subscription configuration options
   */
  constructor(options: SubscriptionOptions);
  /**
   * Indicates if the subscription has been closed.
   * @returns {boolean} `true` if unsubscribed, `false` otherwise.
   */
  get isClosed(): boolean;
  /**
   * Internal method to handle incoming events from the WebSocket channel.
   * If a handler is attached, it's invoked immediately. Otherwise, the event is buffered.
   * @internal
   * @param {T} data - The event data.
   */
  _handleEvent(data: T): void;
  /**
   * Attaches a handler function to be called for each event.
   *
   * When a handler is attached, any buffered events will be passed to it sequentially.
   * Subsequent events will be passed directly as they arrive.
   *
   * @param {(data: T) => void} handler - The function to call with event data.
   * @throws {Error} If a handler is already attached to this subscription.
   */
  on(handler: (data: T) => void): void;
  /**
   * Sends an unsubscribe request to the node and cleans up local resources.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the unsubscription was successful.
   */
  unsubscribe(): Promise<boolean>;
}

interface SubscribeNewHeadsParams {
  blockIdentifier?: SubscriptionBlockIdentifier;
}
interface SubscribeEventsParams {
  /** Contract address(es) to filter events from. Accepts single or array of addresses (RPC 0.10.1+). */
  fromAddress?: BigNumberish | BigNumberish[];
  /** Event key filters */
  keys?: string[][];
  /** Block to start subscribing from */
  blockIdentifier?: SubscriptionBlockIdentifier;
  /** Finality status filter */
  finalityStatus?: Exclude<TXN_FINALITY_STATUS, STATUS_ACCEPTED_ON_L1>;
}
interface SubscribeTransactionStatusParams {
  transactionHash: BigNumberish;
  blockIdentifier?: SubscriptionBlockIdentifier;
}
interface SubscribeNewTransactionReceiptsParams {
  finalityStatus?: Exclude<TXN_FINALITY_STATUS, STATUS_ACCEPTED_ON_L1>[];
  senderAddress?: BigNumberish[];
}
interface SubscribeNewTransactionsParams {
  /** Finality status filter */
  finalityStatus?: TXN_STATUS_WITHOUT_L1[];
  /** Filter by sender addresses */
  senderAddress?: BigNumberish[];
  /** Subscription tags for additional data (RPC 0.10.1+) */
  tags?: RPCSPEC0103.SUBSCRIPTION_TAG[];
}
type SubscriptionNewHeadsEvent = Subscription<NewHeadsEvent['result']>;
type SubscriptionStarknetEventsEvent = Subscription<StarknetEventsEvent['result']>;
type SubscriptionTransactionStatusEvent = Subscription<TransactionsStatusEvent['result']>;
type SubscriptionNewTransactionReceiptsEvent = Subscription<NewTransactionReceiptsEvent['result']>;
type SubscriptionNewTransactionEvent = Subscription<NewTransactionEvent['result']>;
/**
 * Options for configuring the automatic reconnection behavior of the WebSocketChannel.
 */
type ReconnectOptions = {
  /**
   * The number of retries to attempt before giving up.
   * @default 5
   */
  retries?: number;
  /**
   * The initial delay in milliseconds before the first retry.
   * @default 2000
   */
  delay?: number;
  /**
   * Whether to use the exponential backoff (delay being doubled for each subsequent retry).
   * @default true
   */
  exponential?: number | boolean;
  /**
   * The minimum time in milliseconds a reconnected connection must stay open before
   * it is considered stable and the retry counter is reset. This prevents a gateway
   * that accepts the connection then immediately drops it (a "flapping" connection)
   * from resetting the counter on every cycle and reconnecting forever.
   * @default 5000
   */
  stableConnectionThreshold?: number;
};
/**
 * The type of the WebSocket implementation.
 */
type WebSocketModule = {
  new (nodeUrl: WebSocketOptions['nodeUrl']): WebSocket;
};
/**
 * Options for configuring the WebSocketChannel.
 */
type WebSocketOptions = {
  /**
   * The URL of the WebSocket endpoint of the Starknet node.
   * @example 'ws://localhost:9545'
   */
  nodeUrl: string;
  /**
   * This parameter can be used to provide a custom WebSocket implementation.
   * This is useful in environments where the global WebSocket object is not available (e.g., Node.js).
   * @example
   * ```typescript
   * import WebSocket from 'ws';
   * const channel = new WebSocketChannel({ nodeUrl: '...', websocket: WebSocket });
   * ```
   */
  websocket?: WebSocketModule;
  /**
   * The maximum number of events to buffer per subscription when no handler is attached.
   * @default 1000
   */
  maxBufferSize?: number;
  /**
   * Whether to automatically reconnect when the connection is lost.
   * @default true
   */
  autoReconnect?: boolean;
  /**
   * Options for the automatic reconnection behavior.
   */
  reconnectOptions?: ReconnectOptions;
  /**
   * The timeout in milliseconds for a `sendReceive` call.
   * @default 60000
   */
  requestTimeout?: number;
};
type WebSocketChannelEvents = {
  open: Event;
  close: CloseEvent;
  message: MessageEvent<any>;
  error: Event;
  unsubscribe: SUBSCRIPTION_ID;
};
/**
 * Manages a WebSocket connection to a Starknet node for receiving real-time updates.
 * This class handles subscriptions, automatic reconnection, and request queueing.
 *
 * @example
 * ```typescript
 * const channel = new WebSocketChannel({ nodeUrl: 'YOUR_NODE_URL' });
 * await channel.waitForConnection();
 *
 * const sub = await channel.subscribeNewHeads();
 * sub.on((data) => {
 *   console.log('New Block:', data);
 * });
 *
 * // ... later
 * await sub.unsubscribe();
 * channel.disconnect();
 * ```
 */
declare class WebSocketChannel {
  /**
   * The URL of the WebSocket RPC Node.
   * @example 'wss://starknet-sepolia.public.blastapi.io/rpc/v0_8'
   */
  nodeUrl: string;
  /**
   * The underlying WebSocket instance.
   */
  websocket: WebSocket;
  private WsImplementation;
  private activeSubscriptions;
  private readonly maxBufferSize;
  private readonly autoReconnect;
  private readonly reconnectOptions;
  private readonly requestTimeout;
  private isReconnecting;
  private reconnectAttempts;
  private userInitiatedClose;
  private reconnectTimeoutId;
  private reconnectStabilityTimeoutId;
  private requestQueue;
  private events;
  private openListener;
  private closeListener;
  private messageListener;
  private errorListener;
  /**
   * JSON RPC latest sent message ID.
   * The receiving message is expected to contain the same ID.
   */
  private sendId;
  /**
   * Creates an instance of WebSocketChannel.
   * @param {WebSocketOptions} options - The options for configuring the channel.
   */
  constructor(options: WebSocketOptions);
  private idResolver;
  /**
   * Sends a JSON-RPC request over the WebSocket connection without waiting for a response.
   * This is a low-level method. Prefer `sendReceive` for most use cases.
   * @param {string} method - The RPC method name.
   * @param {object} [params] - The parameters for the RPC method.
   * @param {number} [id] - A specific request ID. If not provided, an auto-incrementing ID is used.
   * @returns {number} The ID of the sent request.
   * @throws {WebSocketNotConnectedError} If the WebSocket is not connected.
   */
  send(method: string, params?: object, id?: number): number;
  /**
   * Sends a JSON-RPC request and returns a Promise that resolves with the result.
   * This method abstracts the request/response cycle over WebSockets.
   * If the connection is lost, it will queue the request and send it upon reconnection.
   * @template T - The expected type of the result.
   * @param {string} method - The RPC method name.
   * @param {object} [params] - The parameters for the RPC method.
   * @returns {Promise<T>} A Promise that resolves with the RPC response result.
   * @throws {TimeoutError} If the request does not receive a response within the configured `requestTimeout`.
   * @throws {WebSocketNotConnectedError} If the WebSocket is not connected and auto-reconnect is disabled.
   */
  sendReceive<T = any>(method: string, params?: object): Promise<T>;
  /**
   * Checks if the WebSocket connection is currently open.
   * @returns {boolean} `true` if the connection is open, `false` otherwise.
   */
  isConnected(): boolean;
  /**
   * Returns a Promise that resolves when the WebSocket connection is open.
   * Can be used to block execution until the connection is established.
   * @returns {Promise<number>} A Promise that resolves with the WebSocket's `readyState` when connected.
   * @example
   * ```typescript
   * const channel = new WebSocketChannel({ nodeUrl: '...' });
   * await channel.waitForConnection();
   * console.log('Connected!');
   * ```
   */
  waitForConnection(): Promise<WebSocket['readyState']>;
  /**
   * Closes the WebSocket connection.
   * This method is user-initiated and will prevent automatic reconnection for this closure.
   * @param {number} [code] - The WebSocket connection close code.
   * @param {string} [reason] - The WebSocket connection close reason.
   */
  disconnect(code?: number, reason?: string): void;
  /**
   * Returns a Promise that resolves when the WebSocket connection is closed.
   * @returns {Promise<number | Event>} A Promise that resolves with the WebSocket's `readyState` or a `CloseEvent` when disconnected.
   */
  waitForDisconnection(): Promise<WebSocket['readyState'] | Event>;
  /**
   * Unsubscribes from a Starknet subscription.
   * It is recommended to use the `unsubscribe()` method on the `Subscription` object instead.
   * @internal
   * @param {SUBSCRIPTION_ID} subscriptionId - The ID of the subscription to unsubscribe from.
   * @returns {Promise<boolean>} A Promise that resolves with `true` if the unsubscription was successful.
   */
  unsubscribe(subscriptionId: SUBSCRIPTION_ID): Promise<boolean>;
  /**
   * Returns a Promise that resolves when a specific subscription is successfully unsubscribed.
   * @param {SUBSCRIPTION_ID} targetId - The ID of the subscription to wait for.
   * @returns {Promise<void>}
   * @example
   * ```typescript
   * await channel.waitForUnsubscription(mySubscription.id);
   * console.log('Successfully unsubscribed.');
   * ```
   */
  waitForUnsubscription(targetId: SUBSCRIPTION_ID): Promise<void>;
  /**
   * Manually initiates a reconnection attempt.
   * This creates a new WebSocket instance and re-establishes listeners.
   */
  reconnect(): void;
  private _processRequestQueue;
  private _restoreSubscriptions;
  /**
   * Reset the reconnection attempt counter, but only once the current connection has
   * stayed open for `stableConnectionThreshold` ms. A connection that opens and then
   * immediately drops (a flapping gateway) never reaches this point, so its attempts
   * keep accumulating toward the retry cap instead of resetting every cycle.
   */
  private scheduleReconnectAttemptsReset;
  private _startReconnect;
  private onCloseProxy;
  private onMessageProxy;
  /**
   * Subscribes to new block headers.
   * @param {SubscribeNewHeadsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<BLOCK_HEADER>>} A Promise that resolves with a `Subscription` object for new block headers.
   */
  subscribeNewHeads(params?: SubscribeNewHeadsParams): Promise<SubscriptionNewHeadsEvent>;
  /**
   * Subscribes to events matching a given filter.
   * @param {SubscribeEventsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<EMITTED_EVENT>>} A Promise that resolves with a `Subscription` object for the specified events.
   */
  subscribeEvents(params?: SubscribeEventsParams): Promise<SubscriptionStarknetEventsEvent>;
  /**
   * Subscribes to status updates for a specific transaction.
   * @param {SubscribeTransactionStatusParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NEW_TXN_STATUS>>} A Promise that resolves with a `Subscription` object for the transaction's status.
   */
  subscribeTransactionStatus(
    params: SubscribeTransactionStatusParams
  ): Promise<SubscriptionTransactionStatusEvent>;
  /**
   * Subscribes to new transaction receipts.
   * @param {SubscribeNewTransactionReceiptsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionReceiptsEvent['result']>>} A Promise that resolves with a `Subscription` object for new transaction receipts.
   */
  subscribeNewTransactionReceipts(
    params?: SubscribeNewTransactionReceiptsParams
  ): Promise<SubscriptionNewTransactionReceiptsEvent>;
  /**
   * Subscribes to new transactions.
   * @param {SubscribeNewTransactionsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionEvent['result']>>} A Promise that resolves with a `Subscription` object for new transactions.
   */
  subscribeNewTransactions(
    params?: SubscribeNewTransactionsParams
  ): Promise<SubscriptionNewTransactionEvent>;
  /**
   * Internal method to remove subscription from active map.
   * @internal
   */
  removeSubscription(id: SUBSCRIPTION_ID): void;
  /**
   * Adds a listener for a given event.
   * @param event The event name.
   * @param listener The listener function to add.
   */
  on<K extends keyof WebSocketChannelEvents>(
    event: K,
    listener: (data: WebSocketChannelEvents[K]) => void
  ): void;
  /**
   * Removes a listener for a given event.
   * @param event The event name.
   * @param listener The listener function to remove.
   */
  off<K extends keyof WebSocketChannelEvents>(
    event: K,
    listener: (data: WebSocketChannelEvents[K]) => void
  ): void;
}

declare class CustomError extends Error {
  name: string;
  constructor(message?: string);
}
declare class LibraryError extends CustomError {}
declare class RpcError<BaseErrorT extends RPC_ERROR = RPC_ERROR> extends LibraryError {
  readonly baseError: BaseErrorT;
  readonly request: {
    method: string;
    params: any;
  };
  constructor(baseError: BaseErrorT, method: string, params: any);
  get code():
    | 1
    | 10
    | 64
    | 66
    | 31
    | 20
    | 21
    | 24
    | 27
    | 28
    | 29
    | 32
    | 33
    | 34
    | 40
    | 41
    | 42
    | 51
    | 52
    | 53
    | 54
    | 55
    | 56
    | 57
    | 58
    | 59
    | 60
    | 61
    | 62
    | 63
    | 65
    | 67
    | 68
    | 100
    | 150
    | 151
    | 153
    | 154
    | 155
    | 156
    | 157
    | 158
    | 159
    | 160
    | 163;
  /**
   * Verifies the underlying RPC error, also serves as a type guard for the _baseError_ property
   * @example
   * ```typescript
   * SomeError.isType('UNEXPECTED_ERROR');
   * ```
   */
  isType<N extends keyof RPC_ERROR_SET, C extends RPC_ERROR_SET[N]['code']>(
    typeName: N
  ): this is RpcError<
    RPC_ERROR_SET[N] & {
      code: C;
    }
  >;
}
/**
 * Thrown when a WebSocket request does not receive a response within the configured timeout period.
 * @property {string} name - The name of the error, always 'TimeoutError'.
 */
declare class TimeoutError extends LibraryError {
  constructor(message: string);
}
/**
 * Thrown when an operation is attempted on a WebSocket that is not connected.
 * @property {string} name - The name of the error, always 'WebSocketNotConnectedError'.
 */
declare class WebSocketNotConnectedError extends LibraryError {
  constructor(message: string);
}

/**
 * Manages plugin registration, method installation, and hook execution.
 *
 * Each Provider/Account instance owns its own PluginManager to ensure
 * plugins are scoped to the instance rather than shared globally.
 */
declare class PluginManager {
  private registeredPlugins;
  private providerHooksList;
  private accountHooksList;
  get plugins(): ReadonlyMap<string, StarknetPlugin<any, any>>;
  /**
   * Install a plugin on a Provider instance.
   * Calls `plugin.extend()` and assigns returned methods to the target.
   * Registers provider-level hooks.
   */
  installOnProvider(plugin: StarknetPlugin<any, any>, target: any): void;
  /**
   * Install a plugin on an Account instance.
   * Calls `plugin.accountExtend()` if available, otherwise falls back to `plugin.extend()`.
   * Registers both provider-level and account-level hooks.
   */
  installOnAccount(plugin: StarknetPlugin<any, any>, target: any): void;
  /**
   * Run a provider-level hook across all registered plugins.
   * Hooks are chained: each hook can modify the context for the next.
   */
  runProviderHook<K extends keyof ProviderHooks>(
    hookName: K,
    context: Parameters<NonNullable<ProviderHooks[K]>>[0]
  ): any;
  /**
   * Run an account-level hook across all registered plugins.
   * "before" hooks are chained; "after" hooks are fire-and-forget.
   */
  runAccountHook<K extends keyof AccountHooks>(
    hookName: K,
    context: Parameters<NonNullable<AccountHooks[K]>>[0]
  ): any;
  hasPlugin(name: string): boolean;
}

interface StarknetIdProviderMethods {
  getStarkName(address: BigNumberish, StarknetIdContract?: string): Promise<string>;
  getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string>;
  getStarkProfile(
    address: BigNumberish,
    StarknetIdContract?: string,
    StarknetIdIdentityContract?: string,
    StarknetIdVerifierContract?: string,
    StarknetIdPfpContract?: string,
    StarknetIdPopContract?: string,
    StarknetIdMulticallContract?: string
  ): Promise<StarkProfile>;
}
interface StarknetIdAccountMethods {
  getStarkName(address?: BigNumberish, StarknetIdContract?: string): Promise<string>;
  getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string>;
  getStarkProfile(
    address: BigNumberish,
    StarknetIdContract?: string,
    StarknetIdIdentityContract?: string,
    StarknetIdVerifierContract?: string,
    StarknetIdPfpContract?: string,
    StarknetIdPopContract?: string,
    StarknetIdMulticallContract?: string
  ): Promise<StarkProfile>;
}
declare class StarknetIdImpl {
  static getStarkName(
    provider: ProviderInterface,
    address: BigNumberish,
    StarknetIdContract?: string
  ): Promise<string>;
  static getAddressFromStarkName(
    provider: ProviderInterface,
    name: string,
    StarknetIdContract?: string
  ): Promise<string>;
  static getStarkProfile(
    provider: ProviderInterface,
    address: BigNumberish,
    StarknetIdContract?: string,
    StarknetIdIdentityContract?: string,
    StarknetIdVerifierContract?: string,
    StarknetIdPfpContract?: string,
    StarknetIdPopContract?: string,
    StarknetIdMulticallContract?: string
  ): Promise<StarkProfile>;
}

interface BrotherProfile {
  name: string;
  resolver: string;
  tokenId: string;
  expiryDate: number;
  lastTransferTime: number;
}
interface BrotherIdProviderMethods {
  getBrotherName(address: BigNumberish, BrotherIdContract?: string): Promise<string>;
  getAddressFromBrotherName(name: string, BrotherIdContract?: string): Promise<string>;
  getBrotherProfile(address: BigNumberish, BrotherIdContract?: string): Promise<BrotherProfile>;
}
declare class BrotherIdImpl {
  static getBrotherName(
    provider: ProviderInterface,
    address: BigNumberish,
    BrotherIdContract?: string
  ): Promise<string>;
  static getAddressFromBrotherName(
    provider: ProviderInterface,
    name: string,
    BrotherIdContract?: string
  ): Promise<string>;
  static getBrotherProfile(
    provider: ProviderInterface,
    address: BigNumberish,
    BrotherIdContract?: string
  ): Promise<BrotherProfile>;
}
/**
 * BrotherId plugin - adds .brother domain resolution methods.
 *
 * @example
 * ```typescript
 * import { RpcProvider, brotherId } from 'starknet';
 * const provider = new RpcProvider({ plugins: [brotherId()] });
 * const name = await provider.getBrotherName('0x123...');
 * ```
 */
declare function brotherId(): StarknetPlugin<BrotherIdProviderMethods>;

/**
 * Options for controlling fastWaitForTransaction polling behavior
 */
type FastWaitForTransactionOptions = {
  /** Number of retry attempts (default: 50) */
  retries?: number;
  /** Milliseconds to wait between retries (default: 500) */
  retryInterval?: number;
};
/**
 * Response from fastExecute() containing transaction result and readiness status
 */
type FastExecuteResponse = {
  /** The transaction invoke response with transaction hash */
  txResult: InvokeFunctionResponse;
  /** Whether the next transaction can be executed immediately */
  isReady: boolean;
};
/**
 * Provider methods added by the FastExecute plugin
 */
interface FastExecuteProviderMethods {
  /**
   * Wait for transaction confirmation with polling optimization for gaming.
   *
   * This method is fast but Events and transaction reports are not yet available.
   * Useful for gaming activity and rapid-fire transaction scenarios.
   *
   * Only available on RPC 0.9 and onwards.
   *
   * @param {BigNumberish} txHash - Transaction hash to monitor
   * @param {string} address - Address of the account (used to track nonce changes)
   * @param {BigNumberish} initNonce - Initial nonce of the account (before the transaction)
   * @param {FastWaitForTransactionOptions} [options={retries: 50, retryInterval: 500}] - Polling configuration
   *        options. `retries` is the number of times to retry (default: 50), `retryInterval` is the time in ms
   *        between retries (default: 500).
   * @returns {Promise<boolean>} Returns true if the next transaction is possible (nonce increment detected),
   *          false if the timeout has been reached, or throws an error in case of provider communication failure
   *          or transaction reversion.
   *
   * @example
   * ```typescript
   * const isReady = await provider.fastWaitForTransaction(
   *   '0x123abc...',
   *   '0x456def...',
   *   10,
   *   { retries: 30, retryInterval: 500 }
   * );
   *
   * if (isReady) {
   *   // Next transaction can be sent
   * }
   * ```
   */
  fastWaitForTransaction(
    txHash: BigNumberish,
    address: string,
    initNonce: BigNumberish,
    options?: FastWaitForTransactionOptions
  ): Promise<boolean>;
}
/**
 * Account methods added by the FastExecute plugin
 */
interface FastExecuteAccountMethods {
  /**
   * Execute one or multiple calls through the account contract,
   * responding as soon as a new transaction is possible with the same account.
   * Useful for gaming usage where rapid consecutive transactions are needed.
   *
   * This method requires the provider to be initialized with `pre_confirmed` blockIdentifier option.
   * RPC 0.9 minimum.
   *
   * In a normal `account.execute()` call followed by `provider.waitForTransaction()`, you have immediate access
   * to the events and transaction report. Here, we process consecutive transactions faster, but events and
   * transaction reports are not available immediately.
   *
   * As a consequence of the above, do not use contract/account deployment with this method.
   *
   * @param {AllowArray<Call>} transactions - Single call or array of calls to execute
   * @param {UniversalDetails} [transactionsDetail] - Transaction execution options
   * @param {FastWaitForTransactionOptions} [waitDetail={retries: 50, retryInterval: 500}] - Options to scan the
   *        network for the next possible transaction. `retries` is the number of times to retry (default: 50),
   *        `retryInterval` is the time in ms between retries (default: 500).
   * @returns {Promise<FastExecuteResponse>} Response containing the transaction result and status for the next
   *          transaction. If `isReady` is true, you can execute the next transaction immediately. If false,
   *          timeout has been reached before the next transaction was possible.
   *
   * @example
   * ```typescript
   * const myProvider = new RpcProvider({
   *   nodeUrl: url,
   *   blockIdentifier: BlockTag.PRE_CONFIRMED
   * });
   * const myAccount = new Account({
   *   provider: myProvider,
   *   address: accountAddress0,
   *   signer: privateKey0
   * });
   *
   * const resp = await myAccount.fastExecute(
   *   call,
   *   { tip: recommendedTip },
   *   { retries: 30, retryInterval: 500 }
   * );
   *
   * // if resp.isReady is true, you can launch immediately a new tx
   * if (resp.isReady) {
   *   // send next transaction
   * }
   * ```
   */
  fastExecute(
    transactions: any,
    transactionsDetail?: any,
    waitDetail?: FastWaitForTransactionOptions
  ): Promise<FastExecuteResponse>;
}

/**
 * FastExecute plugin - adds gaming-optimized transaction execution
 *
 * Provides fastExecute() on accounts and fastWaitForTransaction() on providers
 * for rapid successive transaction execution with minimal confirmation latency.
 *
 * Requires:
 * - RPC 0.9 or later
 * - Provider initialized with BlockTag.PRE_CONFIRMED
 *
 * @example
 * ```typescript
 * import { RpcProvider, Account } from 'starknet';
 * import { fastExecute } from 'starknet/plugins';
 *
 * const provider = new RpcProvider({
 *   nodeUrl: url,
 *   blockIdentifier: BlockTag.PRE_CONFIRMED,
 * });
 *
 * const account = new Account({ provider, address, signer });
 *
 * const resp = await account.fastExecute(
 *   call,
 *   { tip: recommendedTip },
 *   { retries: 30, retryInterval: 500 }
 * );
 *
 * if (resp.isReady) {
 *   // Next transaction can be sent immediately
 * }
 * ```
 */
declare function fastExecute(): StarknetPlugin<
  FastExecuteProviderMethods,
  FastExecuteAccountMethods
>;

interface RpcProvider
  extends StarknetIdProviderMethods, BrotherIdProviderMethods, FastExecuteProviderMethods {}
declare class RpcProvider implements ProviderInterface {
  responseParser: RPCResponseParser;
  channel: RpcChannel$2 | RpcChannel$1 | RpcChannel;
  /** @internal Plugin management infrastructure */
  readonly pluginManager: PluginManager;
  constructor(optionsOrProvider?: RpcProviderOptions | ProviderInterface | RpcProvider);
  /**
   * auto configure channel based on provided node
   * leave space for other async before constructor
   */
  static create<T extends RpcProvider>(
    this: {
      new (...args: ConstructorParameters<typeof RpcProvider>): T;
    },
    optionsOrProvider?: RpcProviderOptions
  ): Promise<T>;
  /**
   * Install a plugin at runtime. Returns the instance typed with plugin methods.
   *
   * @example
   * ```typescript
   * const provider = new RpcProvider({ nodeUrl: '...' })
   *   .use(myPlugin());
   * provider.myMethod(); // typed
   * ```
   */
  use<T extends Record<string, any>>(plugin: StarknetPlugin<T, any>): this & T;
  fetch(method: string, params?: object, id?: string | number): Promise<any>;
  getChainId(): Promise<'0x534e5f4d41494e' | '0x534e5f5345504f4c4941'>;
  readSpecVersion(): '0.9.0' | '0.10.0' | '0.10.2' | '0.10.3' | undefined;
  getSpecVersion(): Promise<string>;
  setUpSpecVersion(): Promise<'0.9.0' | '0.10.0' | '0.10.2' | '0.10.3'>;
  getStarknetVersion(blockIdentifier?: BlockIdentifier): Promise<string>;
  getNonceForAddress(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<string>;
  getBlock(): Promise<Block$1>;
  getBlock(blockIdentifier: 'pre_confirmed'): Promise<PreConfirmedBlock>;
  getBlock(blockIdentifier: 'latest'): Promise<Block$1>;
  getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse>;
  getBlockLatestAccepted(): Promise<RPC.BlockHashAndNumber>;
  getBlockNumber(): Promise<number>;
  getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<
    | ({
        status: RPC.BLOCK_STATUS;
      } & RPC.BLOCK_HEADER &
        RPC.BLOCK_BODY_WITH_TX_HASHES & {})
    | (RPC.BLOCK_BODY_WITH_TX_HASHES &
        RPC.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
        })
  >;
  getBlockWithTxs(
    blockIdentifier?: BlockIdentifier,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<
    | ({
        status: RPC.BLOCK_STATUS;
      } & RPC.BLOCK_HEADER &
        RPC.BLOCK_BODY_WITH_TXS & {})
    | (RPC.BLOCK_BODY_WITH_TXS &
        RPC.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
        })
  >;
  waitForBlock(blockIdentifier?: BlockIdentifier, retryInterval?: number): Promise<void>;
  getL1GasPrice(blockIdentifier?: BlockIdentifier): Promise<string>;
  /**
   * Get the gas prices related to a block.
   * @param {BlockIdentifier} [blockIdentifier = this.identifier]
   * @returns {Promise<GasPrices>} an object with l1DataGasPrice, l1GasPrice, l2GasPrice properties (all bigint type).
   * @example
   * ```ts
   * const result = await myProvider.getGasPrices();
   * // result = { l1DataGasPrice: 3039n, l1GasPrice: 55590341542890n, l2GasPrice: 8441845008n }
   * ```
   */
  getGasPrices(blockIdentifier?: BlockIdentifier): Promise<GasPrices>;
  getL1MessageHash(l2TxHash: BigNumberish): Promise<string>;
  getBlockWithReceipts(
    blockIdentifier?: BlockIdentifier,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<
    | ({
        status: RPC.BLOCK_STATUS;
      } & RPC.BLOCK_HEADER &
        RPC.BLOCK_BODY_WITH_RECEIPTS & {})
    | (RPC.BLOCK_BODY_WITH_RECEIPTS &
        RPC.PRE_CONFIRMED_BLOCK_HEADER & {
          block_hash?: undefined;
          new_root?: undefined;
          status?: undefined;
          parent_hash?: undefined;
        })
  >;
  getStateUpdate: {
    (): Promise<StateUpdate>;
    (blockIdentifier: 'pre_confirmed'): Promise<PreConfirmedStateUpdate>;
    (blockIdentifier: 'latest'): Promise<StateUpdate>;
    (
      blockIdentifier?: BlockIdentifier,
      contractAddresses?: BigNumberish[]
    ): Promise<StateUpdateResponse>;
  };
  getBlockStateUpdate(): Promise<StateUpdate>;
  getBlockStateUpdate(blockIdentifier: 'pre_confirmed'): Promise<PreConfirmedStateUpdate>;
  getBlockStateUpdate(blockIdentifier: 'latest'): Promise<StateUpdate>;
  getBlockStateUpdate(
    blockIdentifier?: BlockIdentifier,
    contractAddresses?: BigNumberish[]
  ): Promise<StateUpdateResponse>;
  getBlockTransactionsTraces(
    blockIdentifier?: BlockIdentifier,
    options?: {
      returnInitialReads?: boolean;
    }
  ): Promise<RPC.BlockTransactionsTraces | RPC$1.BlockTransactionsTracesWithInitialReads>;
  getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;
  getTransaction(
    txHash: BigNumberish,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<
    | (RPC.INVOKE_TXN_V0 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.INVOKE_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.INVOKE_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | ({
        version: '0x0';
        type: Uppercase<RPC.ABI_TYPE_L1_HANDLER>;
        nonce: RPC.NUM_AS_HEX;
      } & RPC.FUNCTION_CALL & {
          transaction_hash: RPC.TXN_HASH;
        })
    | (RPC.DECLARE_TXN_V0 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V2 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_TXN & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_ACCOUNT_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_ACCOUNT_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
  >;
  getTransactionByHash(
    txHash: BigNumberish,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<
    | (RPC.INVOKE_TXN_V0 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.INVOKE_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.INVOKE_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | ({
        version: '0x0';
        type: Uppercase<RPC.ABI_TYPE_L1_HANDLER>;
        nonce: RPC.NUM_AS_HEX;
      } & RPC.FUNCTION_CALL & {
          transaction_hash: RPC.TXN_HASH;
        })
    | (RPC.DECLARE_TXN_V0 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V2 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_TXN & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_ACCOUNT_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_ACCOUNT_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
  >;
  getTransactionByBlockIdAndIndex(
    blockIdentifier: BlockIdentifier,
    index: number,
    options?: {
      includeProofFacts?: boolean;
    }
  ): Promise<
    | (RPC.INVOKE_TXN_V0 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.INVOKE_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.INVOKE_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | ({
        version: '0x0';
        type: Uppercase<RPC.ABI_TYPE_L1_HANDLER>;
        nonce: RPC.NUM_AS_HEX;
      } & RPC.FUNCTION_CALL & {
          transaction_hash: RPC.TXN_HASH;
        })
    | (RPC.DECLARE_TXN_V0 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V2 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DECLARE_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_TXN & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_ACCOUNT_TXN_V1 & {
        transaction_hash: RPC.TXN_HASH;
      })
    | (RPC.DEPLOY_ACCOUNT_TXN_V3 & {
        transaction_hash: RPC.TXN_HASH;
      })
  >;
  getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse>;
  getTransactionTrace<V extends _SupportedRpcVersion = _SupportedRpcVersion>(
    txHash: BigNumberish
  ): Promise<
    V extends SupportedRpcVersion0_10 ? RPCSPEC0103.TRANSACTION_TRACE : RPC.TRANSACTION_TRACE
  >;
  getTransactionTrace(
    txHash: BigNumberish
  ): Promise<RPCSPEC0103.TRANSACTION_TRACE | RPC.TRANSACTION_TRACE>;
  getTransactionStatus(transactionHash: BigNumberish): Promise<RPC.TXN_STATUS_RESULT>;
  getSimulateTransaction(
    invocations: AccountInvocations,
    options?: getSimulateTransactionOptions
  ): Promise<SimulateTransactionOverheadResponse>;
  waitForTransaction(
    txHash: BigNumberish,
    options?: waitForTransactionOptions
  ): Promise<GetTransactionReceiptResponse>;
  getStorageAt(
    contractAddress: BigNumberish,
    key: BigNumberish,
    blockIdentifier?: BlockIdentifier,
    responseFlags?: RPCSPEC0103.STORAGE_RESPONSE_FLAG[]
  ): Promise<STORAGE_RESULT>;
  getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
  getClassByHash(
    classHash: BigNumberish
  ): Promise<LegacyContractClass | Omit<CompiledSierra, 'sierra_program_debug_info'>>;
  getClass(
    classHash: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<LegacyContractClass | Omit<CompiledSierra, 'sierra_program_debug_info'>>;
  getClassAt(
    contractAddress: BigNumberish,
    blockIdentifier?: BlockIdentifier
  ): Promise<LegacyContractClass | Omit<CompiledSierra, 'sierra_program_debug_info'>>;
  getContractVersion(
    contractAddress: BigNumberish,
    classHash?: undefined,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  getContractVersion(
    contractAddress: undefined,
    classHash: BigNumberish,
    options?: getContractVersionOptions
  ): Promise<ContractVersion>;
  getInvokeEstimateFee(
    invocation: Invocation,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;
  getDeclareEstimateFee(
    invocation: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;
  getDeployAccountEstimateFee(
    invocation: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce,
    blockIdentifier?: BlockIdentifier,
    skipValidate?: boolean
  ): Promise<EstimateFeeResponseOverhead>;
  getEstimateFeeBulk(
    invocations: AccountInvocations,
    options?: getEstimateFeeBulkOptions
  ): Promise<EstimateFeeResponseBulkOverhead>;
  invokeFunction(
    functionInvocation: Invocation,
    details: InvocationsDetailsWithNonce
  ): Promise<{
    transaction_hash: string;
  }>;
  /**
   * Submit a pre-signed INVOKE_TXN_V3 transaction to the network.
   *
   * Broadcasts a transaction previously built and signed by `Account.getSignedTransaction()`.
   * Fees are already included in the signed transaction and will not be re-estimated.
   *
   * @param transaction - A fully signed `RPC.INVOKE_TXN_V3` object, as returned by `Account.getSignedTransaction()`
   *
   * @returns The transaction hash if `waitMode` is disabled (default), or the transaction receipt if `waitMode` is enabled.
   *
   * @remarks
   * - The transaction must be signed before calling this method ; use `Account.getSignedTransaction()` to produce it.
   * - Resubmitting the same signed transaction (same nonce) will be rejected by the network.
   * - If `waitMode` is enabled on the provider, this method waits for the transaction to be included in a block before returning.
   *
   * @example
   * ```typescript
   * const signedTx = await account.getSignedTransaction([
   *   { contractAddress: erc20Address, entrypoint: 'transfer', calldata: [recipient, amount, 0] }
   * ]);
   * // inspect or store signedTx, then submit when ready:
   * const { transaction_hash } = await provider.invokeSignedTx(signedTx);
   * await provider.waitForTransaction(transaction_hash);
   * ```
   */
  invokeSignedTx(transaction: INVOKE_TXN_V3): Promise<{
    transaction_hash: string;
  }>;
  declareContract(
    transaction: DeclareContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<{
    class_hash: string;
    transaction_hash: string;
  }>;
  deployAccountContract(
    transaction: DeployAccountContractTransaction,
    details: InvocationsDetailsWithNonce
  ): Promise<{
    contract_address: string;
    transaction_hash: string;
  }>;
  callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<string[]>;
  estimateMessageFee<V extends _SupportedRpcVersion = _SupportedRpcVersion>(
    message: RPC.L1Message,
    blockIdentifier?: BlockIdentifier
  ): Promise<
    V extends SupportedRpcVersion0_10 ? RPCSPEC0103.FEE_ESTIMATE : RPC.MESSAGE_FEE_ESTIMATE
  >;
  estimateMessageFee(
    message: RPC.L1Message,
    blockIdentifier?: BlockIdentifier
  ): Promise<RPCSPEC0103.FEE_ESTIMATE | RPC.MESSAGE_FEE_ESTIMATE>;
  getSyncingStats(): Promise<RPC.Syncing>;
  getEvents<V extends _SupportedRpcVersion = _SupportedRpcVersion>(
    eventFilter: V extends SupportedRpcVersion0_10 ? RPCSPEC0103.EventFilter : RPC.EventFilter
  ): Promise<V extends SupportedRpcVersion0_10 ? RPCSPEC0103.EVENTS_CHUNK : RPC.EVENTS_CHUNK>;
  getEvents(
    eventFilter: RPCSPEC0103.EventFilter | RPC.EventFilter
  ): Promise<RPCSPEC0103.EVENTS_CHUNK | RPC.EVENTS_CHUNK>;
  verifyMessageInStarknet(
    message: BigNumberish | TypedData,
    signature: Signature,
    accountAddress: BigNumberish,
    signatureVerificationFunctionName?: string,
    signatureVerificationResponse?: {
      okResponse: string[];
      nokResponse: string[];
      error: string[];
    }
  ): Promise<boolean>;
  isClassDeclared(
    contractClassIdentifier: ContractClassIdentifier,
    blockIdentifier?: BlockIdentifier
  ): Promise<boolean>;
  prepareInvocations(invocations: Invocations): Promise<Invocations>;
  getL1MessagesStatus<V extends _SupportedRpcVersion = _SupportedRpcVersion>(
    transactionHash: BigNumberish
  ): Promise<
    V extends SupportedRpcVersion0_10 ? RPCSPEC0103.L1L2MessagesStatus : RPC.L1L2MessagesStatus
  >;
  getL1MessagesStatus(
    transactionHash: BigNumberish
  ): Promise<RPCSPEC0103.L1L2MessagesStatus | RPC.L1L2MessagesStatus>;
  getStorageProof(
    classHashes: BigNumberish[],
    contractAddresses: BigNumberish[],
    contractsStorageKeys: CONTRACT_STORAGE_KEYS[],
    blockIdentifier?: BlockIdentifier
  ): Promise<StorageProof>;
  getCompiledCasm(classHash: BigNumberish): Promise<CASM_COMPILED_CONTRACT_CLASS>;
  getEstimateTip(
    blockIdentifier?: BlockIdentifier,
    options?: TipAnalysisOptions
  ): Promise<TipEstimate>;
}

/**
 * Verify in Starknet a signature of a TypedData object or of a given hash.
 * @param {ProviderInterface} provider - The provider to use for the verification.
 * @param {BigNumberish | TypedData} message TypedData object to be verified, or message hash to be verified.
 * @param {Signature} signature signature of the message.
 * @param {BigNumberish} accountAddress address of the account that has signed the message.
 * @param {string} [signatureVerificationFunctionName] if account contract with non standard account verification function name.
 * @param { okResponse: string[]; nokResponse: string[]; error: string[] } [signatureVerificationResponse] if account contract with non standard response of verification function.
 * @returns
 * ```typescript
 * const myTypedMessage: TypedMessage = .... ;
 * const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
 * const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
 * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
 * const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
 * const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
 * // result1 = result2 = true
 * ```
 */
declare function verifyMessageInStarknet(
  provider: ProviderInterface,
  message: BigNumberish | TypedData,
  signature: Signature,
  accountAddress: BigNumberish,
  signatureVerificationFunctionName?: string,
  signatureVerificationResponse?: {
    okResponse: string[];
    nokResponse: string[];
    error: string[];
  }
): Promise<boolean>;

declare function getGasPrices(
  channel: RpcChannel$2 | RpcChannel$1,
  blockIdentifier?: BlockIdentifier
): Promise<GasPrices>;

interface Account
  extends StarknetIdAccountMethods, BrotherIdProviderMethods, FastExecuteAccountMethods {}
declare class Account implements AccountInterface {
  provider: RpcProvider;
  signer: SignerInterface;
  address: string;
  cairoVersion: CairoVersion;
  readonly transactionVersion: typeof ETransactionVersion.V3;
  paymaster: PaymasterInterface;
  deployer: Deployer;
  defaultTipType: TipType;
  /** @internal Account-level plugin management */
  readonly accountPluginManager: PluginManager;
  constructor(options: AccountOptions);
  getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce>;
  protected getNonceSafe(nonce?: BigNumberish): Promise<bigint>;
  /**
   * Retrieves the Cairo version from the network and sets `cairoVersion` if not already set in the constructor.
   * @param classHash if provided detects Cairo version from classHash, otherwise from the account address
   */
  getCairoVersion(classHash?: string): Promise<CairoVersion>;
  estimateInvokeFee(
    calls: AllowArray<Call>,
    details?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  estimateDeclareFee(
    payload: DeclareContractPayload,
    details?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  estimateAccountDeployFee(
    { classHash, addressSalt, constructorCalldata, contractAddress }: DeployAccountContractPayload,
    details?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  estimateDeployFee(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: UniversalDetails
  ): Promise<EstimateFeeResponseOverhead>;
  estimateFeeBulk(invocations: Invocations, details?: UniversalDetails): Promise<EstimateFeeBulk>;
  simulateTransaction(
    invocations: Invocations,
    details?: SimulateTransactionDetails
  ): Promise<SimulateTransactionOverheadResponse>;
  /**
   * Shared preparation logic for execute() and buildExecute().
   * Runs hooks, estimates fees, and builds accountInvocations.
   * @private
   */
  private prepareInvoke;
  execute(
    transactions: AllowArray<Call>,
    transactionsDetail?: UniversalDetails
  ): Promise<InvokeFunctionResponse>;
  /**
   * Build a signed INVOKE_TXN_V3 transaction without submitting it to the network.
   *
   * Produces a fully signed transaction object that can be inspected, stored,
   * or submitted later via `provider.channel.sendTransaction()`.
   * Main usage is to send a virtual transaction to a proof server.
   * Fees are estimated automatically if not provided.
   *
   * @param transactions - Single call or array of calls to include in the transaction
   * @param transactionsDetail - Transaction execution options
   * @returns A fully signed `RPC.INVOKE_TXN_V3` object, ready to broadcast
   *
   * @remarks
   * - Unlike `execute()`, this method does **not** submit the transaction ; the account nonce is unchanged after the call.
   * - The `afterExecute` plugin hook is intentionally **not** triggered.
   * - The returned object can be broadcast with `provider.channel.sendTransaction()`.
   *
   * @example
   * ```typescript
   * const signedTx = await account.getSignedTransaction(
   *   { contractAddress: erc20Address, entrypoint: 'transfer', calldata: [recipient, amount, 0] }
   * );
   * ```
   */
  getSignedTransaction(
    transactions: AllowArray<Call>,
    transactionsDetail?: UniversalDetails
  ): Promise<INVOKE_TXN_V3>;
  /**
   * First check if contract is already declared, if not declare it
   * If contract already declared returned transaction_hash is ''.
   * Method will pass even if contract is already declared
   * @param transactionsDetail (optional)
   */
  declareIfNot(
    payload: DeclareContractPayload,
    transactionsDetail?: UniversalDetails
  ): Promise<DeclareContractResponse>;
  declare(
    payload: DeclareContractPayload,
    details?: UniversalDetails
  ): Promise<DeclareContractResponse>;
  deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: UniversalDetails
  ): Promise<MultiDeployContractResponse>;
  deployContract(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[],
    details?: UniversalDetails & waitForTransactionOptions
  ): Promise<DeployContractUDCResponse>;
  declareAndDeploy(
    payload: DeclareAndDeployContractPayload,
    details?: UniversalDetails & waitForTransactionOptions
  ): Promise<DeclareDeployUDCResponse>;
  deploySelf: (
    {
      classHash,
      constructorCalldata,
      addressSalt,
      contractAddress: providedContractAddress,
    }: DeployAccountContractPayload,
    details?: UniversalDetails
  ) => Promise<DeployContractResponse>;
  deployAccount(
    {
      classHash,
      constructorCalldata,
      addressSalt,
      contractAddress: providedContractAddress,
    }: DeployAccountContractPayload,
    details?: UniversalDetails
  ): Promise<DeployContractResponse>;
  signMessage(typedData: TypedData): Promise<Signature>;
  hashMessage(typedData: TypedData): Promise<string>;
  /**
   * Verify if an account is compatible with SNIP-9 outside execution, and with which version of this standard.
   * @returns {OutsideExecutionVersion} Not compatible, V1, V2.
   * @example
   * ```typescript
   * const result = myAccount.getSnip9Version();
   * // result = "V1"
   * ```
   */
  getSnip9Version(): Promise<OutsideExecutionVersion>;
  /**
   * Verify if a SNIP-9 nonce has not yet been used by the account.
   * @param {BigNumberish} nonce SNIP-9 nonce to test.
   * @returns  {boolean} true if SNIP-9 nonce not yet used.
   * @example
   * ```typescript
   * const result = myAccount.isValidSnip9Nonce(1234);
   * // result = true
   * ```
   */
  isValidSnip9Nonce(nonce: BigNumberish): Promise<boolean>;
  /**
   * Outside transaction needs a specific SNIP-9 nonce, that we get in this function.
   * A SNIP-9 nonce can be any number not yet used ; no ordering is needed.
   * @returns  {string} an Hex string of a SNIP-9 nonce.
   * @example
   * ```typescript
   * const result = myAccount.getSnip9Nonce();
   * // result = "0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55"
   * ```
   */
  getSnip9Nonce(): Promise<string>;
  /**
     * Creates an object containing transaction(s) that can be executed by an other account with` Account.executeFromOutside()`, called Outside Transaction.
     * @param {OutsideExecutionOptions} options Parameters of the transaction(s).
     * @param {AllowArray<Call>} calls Transaction(s) to execute.
     * @param {OutsideExecutionVersion} [version] SNIP-9 version of the Account that creates the outside transaction.
     * @param {BigNumberish} [nonce] Outside Nonce.
     * @returns {OutsideTransaction} and object that can be used in `Account.executeFromOutside()`
     * @example
     * ```typescript
     * const now_seconds = Math.floor(Date.now() / 1000);
     * const callOptions: OutsideExecutionOptions = {
        caller: executorAccount.address, execute_after: now_seconds - 3600, execute_before: now_seconds + 3600 };
     * const call1: Call = { contractAddress: ethAddress, entrypoint: 'transfer', calldata: {
     *     recipient: recipientAccount.address, amount: cairo.uint256(100) } };
     * const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions, call3);
     * // result = {
     * // outsideExecution: {
     * // caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
     * // nonce: '0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55',
     * // execute_after: 1723650229, execute_before: 1723704229, calls: [[Object]] },
     * // signature: Signature {
     * // r: 67518627037915514985321278857825384106482999609634873287406612756843916814n,
     * // s: 737198738569840639192844101690009498983611654458636624293579534560862067709n, recovery: 0 },
     * // signerAddress: '0x655f8fd7c4013c07cf12a92184aa6c314d181443913e21f7e209a18f0c78492',
     * // version: '2'
     * // }
     * ```
     */
  getOutsideTransaction(
    options: OutsideExecutionOptions,
    calls: AllowArray<Call>,
    version?: OutsideExecutionVersion,
    nonce?: BigNumberish
  ): Promise<OutsideTransaction>;
  /**
     * An account B executes a transaction that has been signed by an account A.
     * Fees are paid by B.
     * @param {AllowArray<OutsideTransaction>} outsideTransaction the signed transaction generated by `Account.getOutsideTransaction()`.
     * @param {UniversalDetails} [opts] same options than `Account.execute()`.
     * @returns {InvokeFunctionResponse} same response than `Account.execute()`.
     * @example
     * ```typescript
     * const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions, call1);
     * const outsideTransaction2: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions4, call4);
     * const result = await myAccount.executeFromOutside([
        outsideTransaction1,
        outsideTransaction2,
      ]);
     * // result = { transaction_hash: '0x11233...`}
     * ```
     */
  executeFromOutside(
    outsideTransaction: AllowArray<OutsideTransaction>,
    opts?: UniversalDetails
  ): Promise<InvokeFunctionResponse>;
  /**
   * Helper method to resolve details with tip estimation
   * @private
   */
  private resolveDetailsWithTip;
  /**
   * Helper method to resolve transaction version
   * @private
   */
  private resolveTransactionVersion;
  buildInvocation(call: Array<Call>, details: InvocationsSignerDetails): Promise<Invocation>;
  buildDeclarePayload(
    payload: DeclareContractPayload,
    details: InvocationsSignerDetails
  ): Promise<DeclareContractTransaction>;
  buildAccountDeployPayload(
    {
      classHash,
      addressSalt,
      constructorCalldata,
      contractAddress: providedContractAddress,
    }: DeployAccountContractPayload,
    details: InvocationsSignerDetails
  ): Promise<DeployAccountContractTransaction>;
  /**
   * Build account invocations with proper typing based on transaction type
   * @private
   */
  accountInvocationsFactory(
    invocations: [
      {
        type: typeof ETransactionType.INVOKE;
        payload: AllowArray<Call>;
      },
    ],
    details: AccountInvocationsFactoryDetails
  ): Promise<
    [
      ({
        type: typeof ETransactionType.INVOKE;
      } & Invocation) &
        InvocationsDetailsWithNonce,
    ]
  >;
  accountInvocationsFactory(
    invocations: [
      {
        type: typeof ETransactionType.DECLARE;
        payload: DeclareContractPayload;
      },
    ],
    details: AccountInvocationsFactoryDetails
  ): Promise<
    [
      ({
        type: typeof ETransactionType.DECLARE;
      } & DeclareContractTransaction) &
        InvocationsDetailsWithNonce,
    ]
  >;
  accountInvocationsFactory(
    invocations: [
      {
        type: typeof ETransactionType.DEPLOY_ACCOUNT;
        payload: DeployAccountContractPayload;
      },
    ],
    details: AccountInvocationsFactoryDetails
  ): Promise<
    [
      ({
        type: typeof ETransactionType.DEPLOY_ACCOUNT;
      } & DeployAccountContractTransaction) &
        InvocationsDetailsWithNonce,
    ]
  >;
  accountInvocationsFactory(
    invocations: Invocations,
    details: AccountInvocationsFactoryDetails
  ): Promise<AccountInvocations>;
  buildPaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PreparedTransaction>;
  estimatePaymasterTransactionFee(
    calls: Call[],
    paymasterDetails: PaymasterDetails
  ): Promise<PaymasterFeeEstimate>;
  preparePaymasterTransaction(
    preparedTransaction: PreparedTransaction
  ): Promise<ExecutableUserTransaction>;
  executePaymasterTransaction(
    calls: Call[],
    paymasterDetails: PaymasterDetails,
    maxFeeInGasToken?: BigNumberish
  ): Promise<InvokeFunctionResponse>;
}

interface StarknetWalletProvider extends StarknetWindowObject {}
type WalletAccountV4Options = {
  provider: ProviderOptions | ProviderInterface;
  walletProvider: StarknetWalletProvider;
  address: string;
  cairoVersion?: CairoVersion;
  paymaster?: PaymasterOptions | PaymasterInterface;
};
type WalletAccountV5Options = {
  provider: ProviderOptions | ProviderInterface;
  walletProvider: WalletWithStarknetFeatures;
  address: string;
  cairoVersion?: CairoVersion;
  paymaster?: PaymasterOptions | PaymasterInterface;
};
type WalletAccountV6Options = {
  provider: ProviderOptions | ProviderInterface;
  walletProvider: WalletWithStarknetFeatures$1;
  address: string;
  cairoVersion?: CairoVersion;
  paymaster?: PaymasterOptions | PaymasterInterface;
};

declare class WalletAccount extends Account {
  walletProvider: StarknetWalletProvider;
  constructor(options: WalletAccountV4Options);
  /**
   * WALLET EVENTS
   */
  onAccountChange(callback: AccountChangeEventHandler): void;
  onNetworkChanged(callback: NetworkChangeEventHandler): void;
  /**
   * WALLET SPECIFIC METHODS
   */
  requestAccounts(silentMode?: boolean): Promise<string[]>;
  getPermissions(): Promise<'accounts'[]>;
  switchStarknetChain(chainId: _StarknetChainId): Promise<boolean>;
  watchAsset(asset: WatchAssetParameters): Promise<boolean>;
  addStarknetChain(chain: AddStarknetChainParameters): Promise<boolean>;
  /**
   * ACCOUNT METHODS
   */
  execute(calls: AllowArray<Call>): Promise<RPCSPEC0103.AddInvokeTransactionResult>;
  declare(payload: DeclareContractPayload): Promise<RPCSPEC0103.AddDeclareTransactionResult>;
  deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Promise<MultiDeployContractResponse>;
  signMessage(typedData: TypedData): Promise<Signature$1>;
  static connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: StarknetWalletProvider,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode?: boolean
  ): Promise<WalletAccount>;
  static connectSilent(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: StarknetWalletProvider,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface
  ): Promise<WalletAccount>;
}

/**
 * WalletAccountV5 class.
 * This class is used to create a wallet account that can be used to interact with a Starknet wallet browser extension, using get-starknet v5.
 */
declare class WalletAccountV5 extends Account {
  walletProvider: WalletWithStarknetFeatures;
  /**
   * The function to use to unsubscribe from the wallet events.
   * To call before the instance is deleted.
   */
  private unsubscribe;
  /**
   * Unsubscribe functions for the callbacks registered through {@link onChange}.
   * Released by {@link unsubscribeChange}.
   */
  private changeSubscriptions;
  constructor(options: WalletAccountV5Options);
  /**
   * WALLET EVENTS
   */
  /**
   * Subscribe a callback to wallet account/network changes.
   * @param {(change: StandardEventsChangeProperties) => void} callback called on each change.
   * @returns {() => void} a function to unsubscribe this specific callback.
   */
  onChange(callback: (change: StandardEventsChangeProperties) => void): () => void;
  /**
   * Unsubscribe from all wallet events, including the callbacks registered through {@link onChange}.
   * To call before the instance is deleted.
   */
  unsubscribeChange(): void;
  /**
   * WALLET SPECIFIC METHODS
   */
  requestAccounts(silentMode?: boolean): Promise<string[]>;
  getPermissions(): Promise<'accounts'[]>;
  switchStarknetChain(chainId: _StarknetChainId): Promise<boolean>;
  watchAsset(asset: WatchAssetParameters$1): Promise<boolean>;
  addStarknetChain(chain: AddStarknetChainParameters$1): Promise<boolean>;
  /**
   * ACCOUNT METHODS
   */
  execute(calls: AllowArray<Call>): Promise<RPC$1.AddInvokeTransactionResult>;
  declare(payload: DeclareContractPayload): Promise<RPC$1.AddDeclareTransactionResult>;
  deploy(
    payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]
  ): Promise<MultiDeployContractResponse>;
  signMessage(typedData: TypedData): Promise<Signature$2>;
  static connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode?: boolean
  ): Promise<WalletAccountV5>;
  static connectSilent(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeatures,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface
  ): Promise<WalletAccountV5>;
}

/**
 * STRK20 types as exposed to a DAPP by `WalletAccountV6`.
 *
 * They mirror the wallet-api spec types, except that every embedded call is a Starknet.js
 * `Call` instead of a wallet-api `INVOKE_CALL`. A DAPP therefore never handles the
 * snake_case spec shape: `WalletAccountV6` converts in both directions (see `adapterV6.ts`).
 * The raw spec types remain available through the `RPC` namespace.
 */
/**
 * Invokes one or more contract calls through the user's STRK20 sub-account for a DAPP,
 * routed via the sub-account anonymizer. The sub-account is selected by (`dapp_name`,
 * `nonce`); each nonce maps to a distinct, deterministic sub-account.
 *
 * The proceeds of the calls are settled into the open notes created by `transfer` actions
 * with `amount: "OPEN"` in the same transaction, so the number of open notes filled by
 * this action must match the number of open notes created in the transaction.
 * @example
 * ```typescript
 * const action: STRK20_SUBACCOUNT_INVOKE_ACTION = {
 *   type: 'subaccount_invoke',
 *   dapp_name: 'myDapp',
 *   nonce: '0x0',
 *   calls: [myContract.populate('stake', { amount: 1000n })],
 *   collect_policy: { type: 'diff' },
 * };
 * ```
 */
type STRK20_SUBACCOUNT_INVOKE_ACTION = Omit<STRK20_SUBACCOUNT_INVOKE_ACTION$1, 'calls'> & {
  /** The contract calls to execute through the sub-account, in order (min 1). */
  calls: Call[];
};
/**
 * A single action to perform via the STRK20 privacy protocol. The `type` field
 * discriminates the variant.
 * @example
 * ```typescript
 * const actions: STRK20_ACTION[] = [
 *   { type: 'withdraw', token: strkAddress, amount: '0x2386f26fc10000', recipient: subAccountAddr },
 *   { type: 'transfer', token: strkAddress, amount: 'OPEN', recipient: myAddress },
 *   {
 *     type: 'subaccount_invoke',
 *     dapp_name: 'myDapp',
 *     nonce: '0x0',
 *     calls: [myContract.populate('stake', { amount: 1000n })],
 *     collect_policy: { type: 'all' },
 *   },
 * ];
 * ```
 */
type STRK20_ACTION =
  | STRK20_DEPOSIT_ACTION
  | STRK20_WITHDRAW_ACTION
  | STRK20_TRANSFER_ACTION
  | STRK20_INVOKE_ACTION
  | STRK20_SUBACCOUNT_INVOKE_ACTION;
/**
 * A Starknet call built by the wallet, together with the SNIP-36 zero-knowledge proof
 * needed to submit it. In simulate mode the proof fields are present but empty, in which
 * case the call is not submittable on-chain and is only useful for fee estimation or UI
 * previews.
 * @example
 * ```typescript
 * const { call, proof }: STRK20_CALL_AND_PROOF = await myWalletAccount.strk20PrepareInvoke(actions);
 * // `call` is a Starknet.js Call, ready to be submitted by the DAPP:
 * const { transaction_hash } = await mySponsorAccount.execute(call, {
 *   proof: proof.data,
 *   proofFacts: proof.proof_facts,
 * });
 * ```
 */
type STRK20_CALL_AND_PROOF = Omit<STRK20_CALL_AND_PROOF$1, 'call'> & {
  /** The Starknet call to submit. */
  call: Call;
};

/**
 * WalletAccountV6 class.
 * Extends WalletAccountV5 with get-starknet v6 types and STRK20 privacy protocol methods.
 */
declare class WalletAccountV6 extends WalletAccountV5 {
  constructor(options: WalletAccountV6Options);
  private get v6Provider();
  switchStarknetChain(chainId: _StarknetChainId, silent_mode?: boolean): Promise<boolean>;
  /**
   * Execute call(s) with an optional STRK20 privacy proof attached. Same signature as
   * `execute()`, with an extra parameter for the proof provided by `strk20PrepareInvoke()`.
   * @param {AllowArray<Call>} calls - The call(s) to invoke.
   * @param {STRK20_PROOF} [proof] - The SNIP-36 zero-knowledge proof to attach.
   * @returns {Promise<AddInvokeTransactionResult>} The hash of the submitted transaction.
   * @example
   * ```typescript
   * const { proof } = await myWalletAccount.strk20PrepareInvoke(actions);
   * const result = await myWalletAccount.executeWithProof(myContract.populate('claim'), proof);
   * // result = { transaction_hash: '0x6f7d...' }
   * ```
   */
  executeWithProof(
    calls: AllowArray<Call>,
    proof?: STRK20_PROOF
  ): Promise<_starknet_io_starknet_types_0104.AddInvokeTransactionResult>;
  /**
   * Get the private balances held by the user inside the STRK20 privacy pool.
   * @param {Address[]} tokens - The tokens to get the private balance of. An empty array returns every shielded token.
   * @returns {Promise<STRK20_BALANCE_ENTRY[]>} One entry per token.
   * @example
   * ```typescript
   * const balances = await myWalletAccount.strk20Balances([strkAddress]);
   * // balances = [{ token: '0x4718...', amount: '0x2386f26fc10000' }]
   * ```
   */
  strk20Balances(tokens: Address[]): Promise<STRK20_BALANCE_ENTRY[]>;
  /**
   * Build the Starknet call and the SNIP-36 zero-knowledge proof of a STRK20 transaction,
   * without submitting it : the DAPP submits the returned call itself, and therefore pays
   * the fee (the wallet adds no fee action in this mode).
   *
   * With `simulate` set to true, the wallet skips the expensive proof generation and
   * returns an empty proof : the call is then NOT submittable on-chain, and is only useful
   * for fee estimation or UI previews.
   * @param {STRK20_ACTION[]} actions - The STRK20 actions to perform atomically (min 1).
   * @param {boolean} [simulate] - True to skip the proof generation.
   * @returns {Promise<STRK20_CALL_AND_PROOF>} The Starknet.js call to submit, and its proof.
   * @example
   * ```typescript
   * const { call, proof } = await myWalletAccount.strk20PrepareInvoke(actions);
   * const result = await mySponsorAccount.execute(call, {
   *   proof: proof.data,
   *   proofFacts: proof.proof_facts,
   * });
   * // result = { transaction_hash: '0x6f7d...' }
   * ```
   */
  strk20PrepareInvoke(actions: STRK20_ACTION[], simulate?: boolean): Promise<STRK20_CALL_AND_PROOF>;
  /**
   * Submit STRK20 actions as a single atomic transaction. The wallet displays an approval
   * UI, generates the SNIP-36 proof, adds the fee action, and submits — so this call may
   * take significantly longer than a standard invoke.
   * @param {STRK20_ACTION[]} actions - The STRK20 actions to perform atomically (min 1).
   * @returns {Promise<{transaction_hash: string}>} The hash of the submitted transaction.
   * @example
   * ```typescript
   * const result = await myWalletAccount.strk20InvokeTransaction(actions);
   * // result = { transaction_hash: '0x6f7d...' }
   * ```
   */
  strk20InvokeTransaction(actions: STRK20_ACTION[]): Promise<{
    transaction_hash: string;
  }>;
  /**
   * Compute the commitment of a DAPP STRK20 sub-account. The commitment is computed
   * locally by the wallet from the user private state ; no transaction is sent.
   *
   * When `nonce` is given, the full commitment of this single sub-account is returned.
   * When `nonce` is omitted, the partial (nonce independent) commitment is returned
   * instead : it is shared by every sub-account the user derives for this DAPP, so it can
   * be published once to let a DAPP recognize all the sub-accounts of a user without
   * learning any individual nonce.
   * @param {STRK20_DAPP_NAME} dappName - The DAPP that scopes the sub-account(s).
   * @param {FELT} [nonce] - The sub-account nonce ; each nonce selects a distinct sub-account for this user + DAPP. Omit it to get the partial commitment.
   * @returns {Promise<FELT>} The sub-account commitment.
   * @example
   * ```typescript
   * const commitment = await myWalletAccount.strk20SubaccountCommitment('myDapp', '0x0');
   * // commitment = '0x5f2e...'
   * ```
   */
  strk20SubaccountCommitment(dappName: STRK20_DAPP_NAME, nonce?: FELT$1): Promise<FELT$1>;
  static connect(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeatures$1,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface,
    silentMode?: boolean
  ): Promise<WalletAccountV6>;
  static connectSilent(
    provider: ProviderOptions | ProviderInterface,
    walletProvider: WalletWithStarknetFeatures$1,
    cairoVersion?: CairoVersion,
    paymaster?: PaymasterOptions | PaymasterInterface
  ): Promise<WalletAccountV6>;
}

declare module 'abi-wan-kanabi' {
  interface Config<OptionT = any, ResultT = any, ErrorT = any> {
    FeltType: BigNumberish;
    U256Type: number | bigint | Uint256;
    U512Type: BigNumberish;
    Secp256k1PointType: BigNumberish;
    Option: CairoOption<OptionT>;
    Tuple: Record<number, BigNumberish | object | boolean>;
    Result: CairoResult<ResultT, ErrorT>;
    Enum: CairoCustomEnum;
    Calldata: RawArgs | Calldata;
    CallOptions: CallOptions;
    InvokeOptions: ExecuteOptions;
    InvokeFunctionResponse: InvokeFunctionResponse;
  }
}
type TypedContractV2$1<TAbi extends Abi$1> = TypedContract<TAbi> & ContractInterface;
/**
 * Interface for interacting with Starknet smart contracts
 *
 * Provides methods for calling contract functions, estimating fees, and managing contract state.
 * Supports both read-only calls and state-changing invocations.
 *
 * @remarks
 * The interface provides multiple ways to interact with contracts:
 * - Direct method calls for convenience
 * - Generic call/invoke methods for flexibility
 * - Fee estimation and transaction population
 * - Event parsing and contract validation
 */
declare abstract class ContractInterface {
  /**
   * Contract ABI (Application Binary Interface)
   */
  abstract abi: Abi;
  /**
   * Contract address on Starknet
   */
  abstract address: string;
  /**
   * Provider for read operations or Account for write operations
   * Optional - a default RpcProvider will be created on first async operation if not provided
   */
  abstract providerOrAccount?: ProviderOrAccount;
  /**
   * Optional contract class hash for optimization
   */
  abstract classHash?: string;
  /**
   * Contract methods that return promises (async operations)
   */
  readonly functions: {
    [name: string]: AsyncContractFunction;
  };
  /**
   * Contract methods for read-only calls (state queries)
   */
  readonly callStatic: {
    [name: string]: AsyncContractFunction;
  };
  /**
   * Contract methods that return populated transactions for batching
   */
  readonly populateTransaction: {
    [name: string]: ContractFunction;
  };
  /**
   * Contract methods for fee estimation
   */
  readonly estimateFee: {
    [name: string]: ContractFunction;
  };
  /**
   * Dynamic method access - allows calling contract methods directly
   */
  readonly [key: string]: AsyncContractFunction | any;
  /**
   * Attach the contract to a different address with optional new ABI
   *
   * @param address - New contract address to interact with
   * @param abi - Optional new ABI to use (defaults to current ABI)
   * @example
   * ```typescript
   * contract.attach('0x123...', newAbi);
   * // Now contract.address === '0x123...' and uses newAbi
   * ```
   */
  abstract attach(address: string, abi?: Abi): void;
  /**
   * Verify that a contract is deployed at the current address
   *
   * @returns Promise resolving to this contract instance if deployed
   * @throws {Error} If no contract is found at the address
   * @example
   * ```typescript
   * try {
   *   await contract.isDeployed();
   *   console.log('Contract is deployed');
   * } catch (error) {
   *   console.log('Contract not found at address');
   * }
   * ```
   */
  abstract isDeployed(): Promise<ContractInterface>;
  /**
   * Call a read-only contract method (view function)
   *
   * @param method - Name of the contract method to call
   * @param args - Method arguments as array or calldata
   * @param options - Call options including block identifier and parsing settings
   * @returns Parsed result from the contract method
   * @example
   * ```typescript
   * const balance = await contract.call('balanceOf', [userAddress]);
   * const name = await contract.call('name', [], { blockIdentifier: 'latest' });
   * ```
   */
  abstract call(method: string, args?: ArgsOrCalldata, options?: CallOptions): Promise<CallResult>;
  /**
   * Invoke a state-changing contract method (external function)
   *
   * @param method - Name of the contract method to invoke
   * @param args - Method arguments as array or calldata
   * @param options - Execution options including transaction details
   * @returns Transaction response with hash
   * @example
   * ```typescript
   * const tx = await contract.invoke('transfer', [recipient, amount]);
   * const receipt = await provider.waitForTransaction(tx.transaction_hash);
   * ```
   */
  abstract invoke(
    method: string,
    args?: ArgsOrCalldata,
    options?: ExecuteOptions
  ): Promise<InvokeFunctionResponse>;
  /**
   * Estimate fee for invoking a contract method
   *
   * @param method - Name of the contract method to estimate
   * @param args - Method arguments as array or calldata
   * @param options - Estimation options including block identifier
   * @returns Fee estimation details
   * @example
   * ```typescript
   * const feeEstimate = await contract.estimate('transfer', [recipient, amount]);
   * console.log('Estimated fee:', feeEstimate.overall_fee);
   * ```
   */
  abstract estimate(
    method: string,
    args?: ArgsOrCalldata,
    options?: {
      blockIdentifier?: BlockIdentifier;
    }
  ): Promise<EstimateFeeResponseOverhead | PaymasterFeeEstimate>;
  /**
   * Populate transaction data for a contract method call
   *
   * @param method - Name of the contract method
   * @param args - Method arguments as array or calldata
   * @returns Invocation object for batching or inspection
   * @example
   * ```typescript
   * const invocation = contract.populate('transfer', [recipient, amount]);
   * // Use in account.execute([invocation1, invocation2, ...])
   * ```
   */
  abstract populate(method: string, args?: ArgsOrCalldata): Invocation;
  /**
   * Compile the calldata for a contract method, using the contract abi.
   *
   * Unlike {@link populate}, this returns only the compiled `Calldata` array, without wrapping it
   * in an `Invocation` object (no `contractAddress` nor `entrypoint`). It is the contract-bound
   * equivalent of `myCallData.compile(method, args)`.
   *
   * If `args` is already a compiled `Calldata`, it is returned as-is without recompilation.
   *
   * @param method - Name of the contract method, as defined in the abi
   * @param args - Method arguments as array (in abi order) or object (free order), or an already
   * compiled calldata
   * @returns The compiled calldata
   * @example
   * ```typescript
   * // 'amount' is a u256: the abi splits it into 2 felts automatically
   * const calldata = contract.compile('transfer', { recipient: '0x123', amount: 100n });
   * // calldata = ['0x123', '100', '0']
   * ```
   */
  abstract compile(method: string, args?: ArgsOrCalldata): Calldata;
  /**
   * Parse events from a transaction receipt using the contract's ABI
   *
   * @param receipt - Transaction receipt from waitForTransaction
   * @returns Array of parsed events with decoded data
   * @example
   * ```typescript
   * const receipt = await provider.waitForTransaction(txHash);
   * const events = contract.parseEvents(receipt);
   * events.forEach(event => {
   *   console.log('Event:', event.name, event.data);
   * });
   * ```
   */
  abstract parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents;
  /**
   * Check if the contract is implemented in Cairo 1
   *
   * @returns True if the contract uses Cairo 1, false for Cairo 0 (legacy)
   * @example
   * ```typescript
   * if (contract.isCairo1()) {
   *   console.log('Using Cairo 1 features');
   * }
   * ```
   */
  abstract isCairo1(): boolean;
  /**
   * Get the Cairo and compiler version of the contract
   *
   * @returns Object containing cairo version and compiler version
   * @example
   * ```typescript
   * const version = await contract.getVersion();
   * console.log(`Cairo ${version.cairo}, Compiler ${version.compiler}`);
   * ```
   */
  abstract getVersion(): Promise<ContractVersion>;
  /**
   * Create a typed contract instance with full TypeScript support
   *
   * @param tAbi - The typed ABI interface for compile-time type checking
   * @returns Typed contract instance with IntelliSense support
   * @example
   * ```typescript
   * const typedContract = contract.typedv2(erc20Abi);
   * // Now typedContract.transfer() has full type safety
   * ```
   */
  abstract typedv2<TAbi extends Abi$1>(tAbi: TAbi): TypedContractV2$1<TAbi>;
  /**
   * Set execution options for subsequent contract interactions
   *
   * @param options - Options to override for contract interactions
   * @returns This contract instance with the specified options applied
   * @example
   * ```typescript
   * contract.withOptions({
   *   blockIdentifier: 'latest',
   *   parseResponse: false
   * });
   * // Now all subsequent calls use these options
   * ```
   */
  abstract withOptions(options: WithOptions): ContractInterface;
}

type TypedContractV2<TAbi extends Abi$1> = TypedContract<TAbi> & Contract;
declare class Contract implements ContractInterface {
  abi: Abi;
  address: string;
  providerOrAccount?: ProviderOrAccount;
  classHash?: string;
  parseRequest: boolean;
  parseResponse: boolean;
  private defaultProvider?;
  private structs;
  private events;
  readonly functions: {
    [name: string]: AsyncContractFunction;
  };
  readonly callStatic: {
    [name: string]: AsyncContractFunction;
  };
  readonly populateTransaction: {
    [name: string]: ContractFunction;
  };
  readonly estimateFee: {
    [name: string]: ContractFunction;
  };
  readonly [key: string]: AsyncContractFunction | any;
  private callData;
  withOptionsProps?: WithOptions;
  private parsingStrategy?;
  /**
   * Get the provider from providerOrAccount
   * @private
   */
  private get provider();
  /**
   * Lazily initialize and cache the default provider with node version detection
   * @private
   */
  private ensureProvider;
  /**
   * @param options
   *  - abi: Abi of the contract object (required)
   *  - address: address to connect to (required)
   *  - providerOrAccount?: Provider or Account to attach to (optional, creates default RpcProvider on first use with auto node detection)
   *  - parseRequest?: compile and validate arguments (optional, default true)
   *  - parseResponse?: Parse elements of the response array and structuring them into response object (optional, default true)
   *  - parser?: Abi parser (optional, default createAbiParser(options.abi))
   */
  constructor(options: ContractOptions);
  withOptions(options: WithOptions): this;
  attach(address: string, abi?: Abi): void;
  isDeployed(): Promise<this>;
  call(
    method: string,
    args?: ArgsOrCalldata,
    { parseRequest, parseResponse, formatResponse, blockIdentifier }?: CallOptions
  ): Promise<CallResult>;
  invoke(
    method: string,
    args: ArgsOrCalldata,
    options: ExecuteOptions & {
      waitForTransaction: true;
    }
  ): Promise<SuccessfulTransactionReceiptResponseHelper>;
  invoke(
    method: string,
    args: ArgsOrCalldata,
    options: ExecuteOptions & {
      waitForTransaction: false;
    }
  ): Promise<InvokeFunctionResponse>;
  invoke(
    method: string,
    args?: ArgsOrCalldata,
    options?: ExecuteOptions
  ): Promise<InvokeFunctionResponse>;
  estimate(
    method: string,
    args?: ArgsOrCalldata,
    estimateDetails?: ExecuteOptions
  ): Promise<EstimateFeeResponseOverhead | PaymasterFeeEstimate>;
  compile(method: string, args?: RawArgs): Calldata;
  populate(method: string, args?: RawArgs): Call;
  parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents;
  isCairo1(): boolean;
  getVersion(): Promise<ContractVersion>;
  typedv2<TAbi extends Abi$1>(tAbi: TAbi): TypedContractV2<TAbi>;
  /**
   * Factory method to declare and/or deploy a contract creating a new Contract instance
   *
   * It handles the entire lifecycle: compiles constructor calldata, optionally declares the contract class,
   * deploys an instance, and returns a ready-to-use Contract object.
   *
   * When classHash is provided, it will only deploy the contract without declaring.
   * When contract is provided without classHash, it will declare and deploy.
   *
   * @param params - Factory parameters containing Contract Class details and deployment options
   * @returns Promise that resolves to a deployed Contract instance with address and transaction hash
   * @throws Error if deployment fails or contract_address is not returned
   * @example
   * ```typescript
   * // Declare and deploy an ERC20 contract
   * const contract = await Contract.factory({
   *   contract: erc20CompiledContract,
   *   account: myAccount,
   *   casm: erc20Casm,
   *   constructorCalldata: {
   *     name: 'MyToken',
   *     symbol: 'MTK',
   *     decimals: 18,
   *     initial_supply: { low: 1000000, high: 0 },
   *     recipient: myAccount.address
   *   }
   * });
   *
   * // Deploy-only mode with existing classHash (ABI will be fetched from network)
   * const contract2 = await Contract.factory({
   *   classHash: '0x1234...',
   *   account: myAccount,
   *   constructorCalldata: {
   *     name: 'AnotherToken',
   *     symbol: 'ATK',
   *     decimals: 18,
   *     initial_supply: { low: 2000000, high: 0 },
   *     recipient: myAccount.address
   *   }
   * });
   *
   * // Deploy-only mode with provided ABI (faster, no network call)
   * const contract3 = await Contract.factory({
   *   classHash: '0x1234...',
   *   abi: erc20Abi,
   *   account: myAccount,
   *   constructorCalldata: {
   *     name: 'ThirdToken',
   *     symbol: 'TTK',
   *     decimals: 18,
   *     initial_supply: { low: 3000000, high: 0 },
   *     recipient: myAccount.address
   *   }
   * });
   *
   * console.log('Contract deployed at:', contract.address);
   * ```\
   */
  static factory(params: FactoryParams, details?: UniversalDetails): Promise<Contract>;
}

/** Default plugins shipped with the SDK */
declare const defaultPlugins: StarknetPlugin<any, any>[];

/**
 * Calculate the hex-string Starknet Keccak hash for a given BigNumberish
 *
 * @param value value to hash
 * @returns hex-string Keccak hash
 * @example
 * ```typescript
 * const result = keccakBn('0xabc');
 * // result = '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
 * ```
 */
declare function keccakBn(value: BigNumberish): string;
/**
 * Calculate the BigInt Starknet Keccak hash for a given string
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L38)
 *
 * @param str value to hash
 * @returns BigInt Keccak hash
 * @example
 * ```typescript
 * const result = starknetKeccak('test').toString();
 * // result = '61835310290161785288773114225739080147441215596947647498723774891619563096'
 * ```
 */
declare function starknetKeccak(str: string): bigint;
/**
 * Calculate the hex-string selector for a given abi function name
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L46)
 *
 * @param funcName abi function name
 * @returns hex-string selector
 * @example
 * ```typescript
 * const result = getSelectorFromName('myFunction');
 * // result = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 * ```
 */
declare function getSelectorFromName(funcName: string): string;
/**
 * Calculate the hex-string selector from a given abi function name or of any representation of number.
 *
 * @param value ascii-string | hex-string | dec-string | number | BigInt
 * @returns hex-string selector
 * @example
 * ```typescript
 * const selector1: string = getSelector("myFunction");
 * // selector1 = "0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8"
 *
 * const selector2: string = getSelector("0x123abc");
 * // selector2 = "0x123abc"
 *
 * const selector3: string = getSelector("123456");
 * // selector3 = "0x1e240"
 *
 * const selector4: string = getSelector(123456n);
 * // selector4 = "0x1e240"
 * ```
 */
declare function getSelector(value: string | BigNumberish): string;
/**
 * Solidity hash of an array of uint256
 * @param {BigNumberish[]} params an array of uint256 numbers
 * @returns the hash of the array of Solidity uint256
 * @example
 * ```typescript
 * const result = hash.solidityUint256PackedKeccak256(['0x100', '200', 300, 400n]);
 * // result = '0xd1e6cb422b65269603c491b0c85463295edabebfb2a6844e4fdc389ff1dcdd97'
 * ```
 */
declare function solidityUint256PackedKeccak256(params: BigNumberish[]): string;
/**
 * Calculate the message hash related by a message L1->L2
 * @param {BigNumberish} l1FromAddress L1 account address that paid the message.
 * @param {BigNumberish} l2ToAddress L2 contract address to execute.
 * @param {string | BigNumberish} l2Selector can be a function name ("bridge_withdraw") or a number (BigNumberish).
 * @param {RawCalldata} l2Calldata an array of BigNumberish of the raw parameters passed to the above function.
 * @param {BigNumberish} l1Nonce The nonce of the L1 account.
 * @returns {string} hex-string of the L2 transaction hash
 * @example
 * ```typescript
 * const l1FromAddress = "0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc";
 * const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
 * const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
 * const payload = [
 *     4543560n,
 *    829565602143178078434185452406102222830667255948n,
 *     3461886633118033953192540141609307739580461579986333346825796013261542798665n,
 *     9000000000000000n,
 *     0n,
 * ];
 * const l1Nonce = 8288n;
 * const result = hash.getL2MessageHash(l1FromAddress, l2ToAddress, l2Selector, payload, l1Nonce);
 * // result = "0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090"
 * ```
 */
declare function getL2MessageHash(
  l1FromAddress: BigNumberish,
  l2ToAddress: BigNumberish,
  l2Selector: string | BigNumberish,
  l2Calldata: BigNumberish[],
  l1Nonce: BigNumberish
): string;
/**
 * Calculate the message hash related by a message L2->L1.
 * @param {BigNumberish} fromL2Address L2 contract address that send the message.
 * @param {BigNumberish} toL1Address Recipient L1 account address.
 * @param {BigNumberish[]} payload an array of BigNumberish of the raw parameters passed to the message.
 * @returns {string} hex-string of the message hash.
 * @example
 * ```typescript
 * const fromL2Address = '0x04c5772d1914fe6ce891b64eb35bf3522aeae1315647314aac58b01137607f3f';
 *   const toL1Address = '0x8453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
 *   const payload = [
 *     0n,
 *     1270393329865452722422775477982592488490549769359n,
 *    4543560n,
 *     200000000000000,
 *    0n,
 *   ];
 *   const result = hash.getL1MessageHash(fromL2Address, toL1Address, payload);
 * // result = "0x2eace1d0ab5dbe354a93fb0a59c6b98f26e6a0fe7c33f87329f8fc9829058b8b"
 * ```
 */
declare function getL1MessageHash(
  fromL2Address: BigNumberish,
  toL1Address: BigNumberish,
  payload: BigNumberish[]
): string;

declare const selector_getL1MessageHash: typeof getL1MessageHash;
declare const selector_getL2MessageHash: typeof getL2MessageHash;
declare const selector_getSelector: typeof getSelector;
declare const selector_getSelectorFromName: typeof getSelectorFromName;
declare const selector_keccakBn: typeof keccakBn;
declare const selector_solidityUint256PackedKeccak256: typeof solidityUint256PackedKeccak256;
declare const selector_starknetKeccak: typeof starknetKeccak;
declare namespace selector {
  export {
    selector_getL1MessageHash as getL1MessageHash,
    selector_getL2MessageHash as getL2MessageHash,
    selector_getSelector as getSelector,
    selector_getSelectorFromName as getSelectorFromName,
    selector_keccakBn as keccakBn,
    selector_solidityUint256PackedKeccak256 as solidityUint256PackedKeccak256,
    selector_starknetKeccak as starknetKeccak,
  };
}

/**
 * Calculate Hashes for v0 - v2 transactions
 */

/**
 * Compute pedersen hash from data
 * @returns format: hex-string - pedersen hash
 */
declare function computeHashOnElements$1(data: BigNumberish[]): string;
/**
 * Calculate transaction pedersen hash for common properties
 *
 * Following implementation is based on this python [implementation #](https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py)
 * @returns format: hex-string
 */
declare function calculateTransactionHashCommon$1(
  txHashPrefix: _TransactionHashPrefix,
  version: BigNumberish,
  contractAddress: BigNumberish,
  entryPointSelector: BigNumberish,
  calldata: RawCalldata,
  maxFee: BigNumberish,
  chainId: _StarknetChainId,
  additionalData?: BigNumberish[]
): string;
/**
 * Calculate declare transaction hash
 * @param classHash hex-string
 * @param compiledClassHash hex-string
 * @returns format: hex-string
 */
declare function calculateDeclareTransactionHash$2(
  classHash: string,
  senderAddress: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: _StarknetChainId,
  nonce: BigNumberish,
  compiledClassHash?: string
): string;
/**
 * Calculate deploy_account transaction hash
 * @returns format: hex-string
 */
declare function calculateDeployAccountTransactionHash$2(
  contractAddress: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: RawCalldata,
  salt: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: _StarknetChainId,
  nonce: BigNumberish
): string;
/**
 * Calculate invoke transaction hash
 * @returns format: hex-string
 */
declare function calculateTransactionHash(
  contractAddress: BigNumberish,
  version: BigNumberish,
  calldata: RawCalldata,
  maxFee: BigNumberish,
  chainId: _StarknetChainId,
  nonce: BigNumberish
): string;
/**
 * Calculate the L2 transaction hash generated by a message L1->L2
 * @param {BigNumberish} l1FromAddress L1 account address that paid the message.
 * @param {BigNumberish} l2ToAddress L2 contract address to execute.
 * @param {string | BigNumberish} l2Selector can be a function name ("bridge_withdraw") or a number (BigNumberish).
 * @param {RawCalldata} l2Calldata an array of BigNumberish of the raw parameters passed to the above function.
 * @param {BigNumberish} l2ChainId L2 chain ID : from constants.StarknetChainId.xxx
 * @param {BigNumberish} l1Nonce The nonce of the L1 account.
 * @returns {string} hex-string of the L2 transaction hash
 * @example
 * ```typescript
 * const l1FromAddress = "0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc";
 * const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
 * const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
 * const payload = [
 *     4543560n,
 *    829565602143178078434185452406102222830667255948n,
 *     3461886633118033953192540141609307739580461579986333346825796013261542798665n,
 *     9000000000000000n,
 *     0n,
 * ];
 * const l1Nonce = 8288n;
 * const result = hash.calculateL2MessageTxHash(l1FromAddress, l2ToAddress, l2Selector, payload, constants.StarknetChainId.SN_SEPOLIA, l1Nonce);
 * // result = "0x67d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07"
 * ```
 */
declare function calculateL2MessageTxHash(
  l1FromAddress: BigNumberish,
  l2ToAddress: BigNumberish,
  l2Selector: string | BigNumberish,
  l2Calldata: RawCalldata,
  l2ChainId: _StarknetChainId,
  l1Nonce: BigNumberish
): string;

declare const v2_calculateL2MessageTxHash: typeof calculateL2MessageTxHash;
declare const v2_calculateTransactionHash: typeof calculateTransactionHash;
declare namespace v2 {
  export {
    calculateDeclareTransactionHash$2 as calculateDeclareTransactionHash,
    calculateDeployAccountTransactionHash$2 as calculateDeployAccountTransactionHash,
    v2_calculateL2MessageTxHash as calculateL2MessageTxHash,
    v2_calculateTransactionHash as calculateTransactionHash,
    calculateTransactionHashCommon$1 as calculateTransactionHashCommon,
    computeHashOnElements$1 as computeHashOnElements,
  };
}

/**
 * Transaction Hash based on Transaction Version
 */

type CalcV3InvokeTxHashArgs = {
  senderAddress: BigNumberish;
  version: `${ETransactionVersion3$1}`;
  compiledCalldata: Calldata;
  chainId: _StarknetChainId;
  nonce: BigNumberish;
  accountDeploymentData: BigNumberish[];
  nonceDataAvailabilityMode: EDAMode$1;
  feeDataAvailabilityMode: EDAMode$1;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
  proofFacts?: BigNumberish[];
};
type CalcInvokeTxHashArgs = CalcV3InvokeTxHashArgs;
declare function calculateInvokeTransactionHash$1(args: CalcInvokeTxHashArgs): string;
type CalcV3DeclareTxHashArgs = {
  classHash: string;
  compiledClassHash: string;
  senderAddress: BigNumberish;
  version: `${ETransactionVersion3$1}`;
  chainId: _StarknetChainId;
  nonce: BigNumberish;
  accountDeploymentData: BigNumberish[];
  nonceDataAvailabilityMode: EDAMode$1;
  feeDataAvailabilityMode: EDAMode$1;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
};
type CalcDeclareTxHashArgs = CalcV3DeclareTxHashArgs;
declare function calculateDeclareTransactionHash$1(args: CalcDeclareTxHashArgs): string;
type CalcV3DeployAccountTxHashArgs = {
  contractAddress: BigNumberish;
  classHash: BigNumberish;
  compiledConstructorCalldata: Calldata;
  salt: BigNumberish;
  version: `${ETransactionVersion3$1}`;
  chainId: _StarknetChainId;
  nonce: BigNumberish;
  nonceDataAvailabilityMode: EDAMode$1;
  feeDataAvailabilityMode: EDAMode$1;
  resourceBounds: ResourceBoundsBN;
  tip: BigNumberish;
  paymasterData: BigNumberish[];
};
type CalcDeployAccountTxHashArgs = CalcV3DeployAccountTxHashArgs;
declare function calculateDeployAccountTransactionHash$1(args: CalcDeployAccountTxHashArgs): string;

/**
 * Pure Pedersen hash utilities — no calldata dependency
 */

declare function computePedersenHash(a: BigNumberish, b: BigNumberish): string;
/**
 * Compute Pedersen hash from data
 *
 * @param {BigNumberish[]} data Array of data to compute Pedersen hash on
 * @returns {string} hex-string of Pedersen hash
 *
 * @example
 * ```typescript
 * const result = hash.computeHashOnElements(['0xabc', '0x123', '0xabc123'])
 * // result = 0x148141e8f7db29d005a0187669a56f0790d7e8c2c5b2d780e4d8b9e436a5521
 * ```
 */
declare function computeHashOnElements(data: BigNumberish[]): string;
declare const computePedersenHashOnElements: typeof computeHashOnElements;

/**
 * Cairo 0 Class Hash computation using Pedersen hash
 */

/**
 * Calculate contract address from class hash
 *
 * @param {BigNumberish} salt Salt to be used for hashing
 * @param {BigNumberish} classHash Class hash of contract to generate address for
 * @param {RawArgs} constructorCalldata Call data for contract constructor
 * @param {BigNumberish} deployerAddress Address of contract deployer
 * @returns {string} hex-string
 * @example
 * ```typescript
 * const result = hash.calculateContractAddressFromHash(1234, 0x1cf4fe5d37868d25524cdacb89518d88bf217a9240a1e6fde71cc22c429e0e3, [1234, true, false], 0x052fb1a9ab0db3c4f81d70fea6a2f6e55f57c709a46089b25eeec0e959db3695);
 * // result = 0x5fb03d3a88d8e474976932f927ff6a9e332e06ed36642ea3e8c7e38bf010f76
 * ```
 */
declare function calculateContractAddressFromHash(
  salt: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: RawArgs,
  deployerAddress: BigNumberish
): string;
/**
 * Compute hinted class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract} compiledContract
 * @returns {string} hex-string
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeHintedClassHash(compiledCairo0);
 * // result = "0x293eabb06955c0a1e55557014675aa4e7a1fd69896147382b29b2b6b166a2ac"
 * ``` */
declare function computeHintedClassHash(compiledContract: LegacyCompiledContract): string;
/**
 * Computes the class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract | string} contract legacy compiled contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeLegacyContractClassHash(compiledCairo0);
 * // result = "0x4a5cae61fa8312b0a3d0c44658b403d3e4197be80027fd5020ffcdf0c803331"
 * ```
 */
declare function computeLegacyContractClassHash(contract: LegacyCompiledContract | string): string;

/**
 * Cairo 1 Class Hash computation using Poseidon hash
 */

declare function computePoseidonHash(a: BigNumberish, b: BigNumberish): string;
declare function computePoseidonHashOnElements(data: BigNumberish[]): string;
/**
 * Compute hash of the bytecode for Sierra v1.5.0 onwards (Cairo 2.6.0)
 * Each segment is Poseidon hashed.
 * The global hash is : 1 + PoseidonHash(len0, h0, len1, h1, ...)
 * @param {CompiledSierraCasm} casm compiled Sierra CASM file content.
 * @returns {bigint} the bytecode hash as bigint.
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./contractC260.casm.json").toString("ascii"));
 * const result = hash.hashByteCodeSegments(compiledCasm);
 * // result = 80499149343908132326491548897246987792410240503053732367044713070598981699n
 * ```
 */
declare function hashByteCodeSegments(casm: CompiledSierraCasm): bigint;
/**
 * Compute compiled class hash for contract (Cairo 1)
 * @param {CompiledSierraCasm} casm Cairo 1 compiled contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./cairo260.casm.json").toString("ascii"));
 * const result = hash.computeCompiledClassHash(compiledCasm);
 * // result = "0x4087905743b4fa2b3affc1fc71333f1390c8c5d1e8ea47d6ba70786de3fc01a"
```
 */
declare function computeCompiledClassHashPoseidon(casm: CompiledSierraCasm): string;
/**
 * Compute sierra contract class hash (Cairo 1)
 * @param {CompiledSierra} sierra Cairo 1 Sierra contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeSierraContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
declare function computeSierraContractClassHash(sierra: CompiledSierra): string;

/**
 * Blake2s hash function for Starknet that produces a field element.
 * Matches the Blake2Felt252 implementation from Rust.
 *
 * The implementation:
 * 1. Encodes each Felt into u32 words (small: 2 words, large: 8 words)
 * 2. Serializes u32 words as little-endian bytes
 * 3. Computes Blake2s hash (32-byte output)
 * 4. Interprets hash as little-endian Felt
 */
declare function blake2sHashMany(data: bigint[]): bigint;
/**
 * Compute hash of the bytecode using Blake2s for nested segments.
 * Each segment is Blake2s hashed according to the segment structure.
 * For non-leaf nodes: 1 + Blake2sHash(len0, h0, len1, h1, ...)
 * @param {CompiledSierraCasm} casm compiled Sierra CASM file content.
 * @returns {bigint} the bytecode hash as bigint.
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./contractC260.casm.json").toString("ascii"));
 * const result = hash.hashByteCodeSegmentsBlake(compiledCasm);
 * ```
 */
declare function hashByteCodeSegmentsBlake(casm: CompiledSierraCasm): bigint;
/**
 * Compute compiled class hash for contract (Cairo 1) using Blake2s hashing (V2).
 * This implements the V2 hash version as specified in Starknet.
 * @param {CompiledSierraCasm} casm Cairo 1 compiled contract content
 * @returns {string} hex-string of compiled class hash
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./cairo260.casm.json").toString("ascii"));
 * const result = hash.computeCompiledClassHashBlake(compiledCasm);
 * ```
 */
declare function computeCompiledClassHashBlake(casm: CompiledSierraCasm): string;

/**
 * Shared utilities for class hash computation
 */

/**
 * Compiled class version constant used in Cairo 1 compiled class hashing
 */
declare const COMPILED_CLASS_VERSION = 'COMPILED_CLASS_V1';
/**
 * Format json-string without spaces to conform starknet json-string
 * @param {string} json json-string without spaces
 * @returns {string} json-string with additional spaces after `:` and `,`
 * @example
 * ```typescript
 * const result = hash.formatSpaces("{'onchain':true,'isStarknet':true}");
 * // result = "{'onchain': true, 'isStarknet': true}"
 * ```
 */
declare function formatSpaces(json: string): string;
/**
 * JSON replacer function that skips null values and empty arrays for specific keys
 * Used in legacy contract class serialization
 */
declare function nullSkipReplacer(key: string, value: any): any;
/**
 * Convert builtins array to encoded BigInt array
 * Common pattern used in both Poseidon and Blake2s hashing
 */
declare function encodeBuiltins(builtins: Builtins): bigint[];
/**
 * Extract entry point data for hashing
 * Returns flattened array of [selector, offset, ...builtins] for each entry point
 */
declare function flattenEntryPointData(
  data: ContractEntryPointFields[],
  encodedBuiltinsArray: bigint[][]
): bigint[];

/**
 * Class Hash Exports
 */

/**
 * Compute ClassHash (sierra or legacy) based on provided contract
 * @param {CompiledContract | string} contract Cairo 1 contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
declare function computeContractClassHash(contract: CompiledContract | string): string;
declare function computeCompiledClassHash(
  casm: CompiledSierraCasm,
  /**
   * Used to determine which hashing algorithm to use
   */
  starknetVersion?: string
): string;

/**
 * Hashes Exports
 */

declare const index$3_COMPILED_CLASS_VERSION: typeof COMPILED_CLASS_VERSION;
declare const index$3_blake2sHashMany: typeof blake2sHashMany;
declare const index$3_calculateContractAddressFromHash: typeof calculateContractAddressFromHash;
declare const index$3_calculateL2MessageTxHash: typeof calculateL2MessageTxHash;
declare const index$3_computeCompiledClassHash: typeof computeCompiledClassHash;
declare const index$3_computeCompiledClassHashBlake: typeof computeCompiledClassHashBlake;
declare const index$3_computeCompiledClassHashPoseidon: typeof computeCompiledClassHashPoseidon;
declare const index$3_computeContractClassHash: typeof computeContractClassHash;
declare const index$3_computeHashOnElements: typeof computeHashOnElements;
declare const index$3_computeHintedClassHash: typeof computeHintedClassHash;
declare const index$3_computeLegacyContractClassHash: typeof computeLegacyContractClassHash;
declare const index$3_computePedersenHash: typeof computePedersenHash;
declare const index$3_computePedersenHashOnElements: typeof computePedersenHashOnElements;
declare const index$3_computePoseidonHash: typeof computePoseidonHash;
declare const index$3_computePoseidonHashOnElements: typeof computePoseidonHashOnElements;
declare const index$3_computeSierraContractClassHash: typeof computeSierraContractClassHash;
declare const index$3_encodeBuiltins: typeof encodeBuiltins;
declare const index$3_flattenEntryPointData: typeof flattenEntryPointData;
declare const index$3_formatSpaces: typeof formatSpaces;
declare const index$3_getL1MessageHash: typeof getL1MessageHash;
declare const index$3_getL2MessageHash: typeof getL2MessageHash;
declare const index$3_getSelector: typeof getSelector;
declare const index$3_getSelectorFromName: typeof getSelectorFromName;
declare const index$3_hashByteCodeSegments: typeof hashByteCodeSegments;
declare const index$3_hashByteCodeSegmentsBlake: typeof hashByteCodeSegmentsBlake;
declare const index$3_keccakBn: typeof keccakBn;
declare const index$3_nullSkipReplacer: typeof nullSkipReplacer;
declare const index$3_poseidon: typeof poseidon;
declare const index$3_solidityUint256PackedKeccak256: typeof solidityUint256PackedKeccak256;
declare const index$3_starknetKeccak: typeof starknetKeccak;
declare namespace index$3 {
  export {
    index$3_COMPILED_CLASS_VERSION as COMPILED_CLASS_VERSION,
    index$3_blake2sHashMany as blake2sHashMany,
    index$3_calculateContractAddressFromHash as calculateContractAddressFromHash,
    calculateDeclareTransactionHash$1 as calculateDeclareTransactionHash,
    calculateDeployAccountTransactionHash$1 as calculateDeployAccountTransactionHash,
    calculateInvokeTransactionHash$1 as calculateInvokeTransactionHash,
    index$3_calculateL2MessageTxHash as calculateL2MessageTxHash,
    index$3_computeCompiledClassHash as computeCompiledClassHash,
    index$3_computeCompiledClassHashBlake as computeCompiledClassHashBlake,
    index$3_computeCompiledClassHashPoseidon as computeCompiledClassHashPoseidon,
    index$3_computeContractClassHash as computeContractClassHash,
    index$3_computeHashOnElements as computeHashOnElements,
    index$3_computeHintedClassHash as computeHintedClassHash,
    index$3_computeLegacyContractClassHash as computeLegacyContractClassHash,
    index$3_computePedersenHash as computePedersenHash,
    index$3_computePedersenHashOnElements as computePedersenHashOnElements,
    index$3_computePoseidonHash as computePoseidonHash,
    index$3_computePoseidonHashOnElements as computePoseidonHashOnElements,
    index$3_computeSierraContractClassHash as computeSierraContractClassHash,
    index$3_encodeBuiltins as encodeBuiltins,
    index$3_flattenEntryPointData as flattenEntryPointData,
    index$3_formatSpaces as formatSpaces,
    index$3_getL1MessageHash as getL1MessageHash,
    index$3_getL2MessageHash as getL2MessageHash,
    index$3_getSelector as getSelector,
    index$3_getSelectorFromName as getSelectorFromName,
    index$3_hashByteCodeSegments as hashByteCodeSegments,
    index$3_hashByteCodeSegmentsBlake as hashByteCodeSegmentsBlake,
    index$3_keccakBn as keccakBn,
    index$3_nullSkipReplacer as nullSkipReplacer,
    index$3_poseidon as poseidon,
    index$3_solidityUint256PackedKeccak256 as solidityUint256PackedKeccak256,
    index$3_starknetKeccak as starknetKeccak,
  };
}

/**
 * Calculate Hashes for v3 transactions
 */

declare function hashDAMode(nonceDAMode: BigNumberish, feeDAMode: BigNumberish): bigint;
/**
 * Encode the L1&L2 gas limits of a V3 transaction
 * @param {ResourceBounds} bounds object including the limits for L1 & L2 gas
 * @returns {bigint} encoded data
 */
declare function encodeResourceBoundsL1(bounds: ResourceBoundsBN): bigint;
/**
 * Encode the L2 bound of a V3 transaction
 * @param {ResourceBounds} bounds
 * {l1_gas: {max_amount: u64, max_price_per_unit: u128},
 *  l2_gas: {max_amount: u64, max_price_per_unit: u128}}
}
 * @returns {bigint} encoded data
 */
declare function encodeResourceBoundsL2(bounds: ResourceBoundsBN): bigint;
declare function encodeDataResourceBoundsL1(bounds: ResourceBoundsBN): bigint;
/**
 * hash tip and resource bounds (3 bounds params) V3 RPC 0.8
 */
declare function hashFeeFieldV3B3(tip: BigNumberish, bounds: ResourceBoundsBN): bigint;
declare function calculateTransactionHashCommon(
  txHashPrefix: _TransactionHashPrefix,
  version: BigNumberish,
  senderAddress: BigNumberish,
  chainId: _StarknetChainId,
  nonce: BigNumberish,
  tip: BigNumberish,
  paymasterData: BigNumberish[],
  nonceDataAvailabilityMode: EDAMode,
  feeDataAvailabilityMode: EDAMode,
  resourceBounds: ResourceBoundsBN,
  additionalData?: BigNumberish[]
): string;
/**
 * Calculate v3 deploy_account transaction hash
 * @returns format: hex-string
 */
declare function calculateDeployAccountTransactionHash(
  contractAddress: BigNumberish,
  classHash: BigNumberish,
  compiledConstructorCalldata: Calldata,
  salt: BigNumberish,
  version: BigNumberish,
  chainId: _StarknetChainId,
  nonce: BigNumberish,
  nonceDataAvailabilityMode: EDAMode,
  feeDataAvailabilityMode: EDAMode,
  resourceBounds: ResourceBoundsBN,
  tip: BigNumberish,
  paymasterData: BigNumberish[]
): string;
/**
 * Calculate v3 declare transaction hash
 * @returns format: hex-string
 */
declare function calculateDeclareTransactionHash(
  classHash: string,
  compiledClassHash: string,
  senderAddress: BigNumberish,
  version: BigNumberish,
  chainId: _StarknetChainId,
  nonce: BigNumberish,
  accountDeploymentData: BigNumberish[],
  nonceDataAvailabilityMode: EDAMode,
  feeDataAvailabilityMode: EDAMode,
  resourceBounds: ResourceBoundsBN,
  tip: BigNumberish,
  paymasterData: BigNumberish[]
): string;
/**
 * Calculate v3 invoke transaction hash
 * @returns format: hex-string
 */
declare function calculateInvokeTransactionHash(
  senderAddress: BigNumberish,
  version: BigNumberish,
  compiledCalldata: Calldata,
  chainId: _StarknetChainId,
  nonce: BigNumberish,
  accountDeploymentData: BigNumberish[],
  nonceDataAvailabilityMode: EDAMode,
  feeDataAvailabilityMode: EDAMode,
  resourceBounds: ResourceBoundsBN,
  tip: BigNumberish,
  paymasterData: BigNumberish[],
  proofFacts?: BigNumberish[]
): string;

declare const v3_calculateDeclareTransactionHash: typeof calculateDeclareTransactionHash;
declare const v3_calculateDeployAccountTransactionHash: typeof calculateDeployAccountTransactionHash;
declare const v3_calculateInvokeTransactionHash: typeof calculateInvokeTransactionHash;
declare const v3_calculateTransactionHashCommon: typeof calculateTransactionHashCommon;
declare const v3_encodeDataResourceBoundsL1: typeof encodeDataResourceBoundsL1;
declare const v3_encodeResourceBoundsL1: typeof encodeResourceBoundsL1;
declare const v3_encodeResourceBoundsL2: typeof encodeResourceBoundsL2;
declare const v3_hashDAMode: typeof hashDAMode;
declare const v3_hashFeeFieldV3B3: typeof hashFeeFieldV3B3;
declare namespace v3 {
  export {
    v3_calculateDeclareTransactionHash as calculateDeclareTransactionHash,
    v3_calculateDeployAccountTransactionHash as calculateDeployAccountTransactionHash,
    v3_calculateInvokeTransactionHash as calculateInvokeTransactionHash,
    v3_calculateTransactionHashCommon as calculateTransactionHashCommon,
    v3_encodeDataResourceBoundsL1 as encodeDataResourceBoundsL1,
    v3_encodeResourceBoundsL1 as encodeResourceBoundsL1,
    v3_encodeResourceBoundsL2 as encodeResourceBoundsL2,
    v3_hashDAMode as hashDAMode,
    v3_hashFeeFieldV3B3 as hashFeeFieldV3B3,
  };
}

/**
 * Convert JSON string to JSON object
 *
 * NOTE: the String() wrapping is used so the behavior conforms to JSON.parse()
 * which can accept simple data types but is not represented in the default typing
 *
 * @param str JSON string
 * @return {object} Parsed json object
 * @example
 * ```typescript
 * const str = '[123, 12.3, 11223344556677889900]';
 * const result = parse(str);
 * // result = [123, 12.3, 11223344556677890048n]
 * ```
 */
declare const parse: (str: string) => any;
/**
 * Convert JSON string to JSON object with all numbers as bigint
 * @param str JSON string
 * @return {object} Parsed json object
 * @example
 * ```typescript
 * const str = '[123, 12.3, 1234567890]';
 * const result = parseAlwaysAsBig(str);
 * // result = [123n, 12.3, 1234567890n]
 * ```
 */
declare const parseAlwaysAsBig: (str: string) => any;
/**
 * Convert JSON object to JSON string
 *
 * NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
 * which can also return undefined but is not represented in the default typing
 *
 * @param value JSON object
 * @param [replacer] Function that alters the behavior of the stringification process
 * @param [space] Used to insert white space into the output JSON string
 * @param [numberStringifiers] Function used to stringify numbers (returning undefined will delete the property from the object)
 * @return {string} JSON string
 * @example
 * ```typescript
 * const value = [123, 12.3, 1234567890];
 * const result = stringify(value);
 * // result = '[123,12.3,1234567890]'
 * ```
 */
declare const stringify: (
  value: unknown,
  replacer?: any,
  space?: string | number | undefined,
  numberStringifiers?: json$1.NumberStringifier[] | undefined
) => string;

declare const json_parse: typeof parse;
declare const json_parseAlwaysAsBig: typeof parseAlwaysAsBig;
declare const json_stringify: typeof stringify;
declare namespace json {
  export {
    json_parse as parse,
    json_parseAlwaysAsBig as parseAlwaysAsBig,
    json_stringify as stringify,
  };
}

/**
 * Test if string is hex-string
 *
 * @param hex hex-string
 * @returns {boolean} true if the input string is a hexadecimal string, false otherwise
 * @example
 * ```typescript
 * const hexString1 = "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result1 = isHex(hexString1);
 * // result1 = true
 *
 * const hexString2 = "2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result2 = isHex(hexString2);
 * // result2 = false
 * ```
 */
declare function isHex(hex: string): boolean;
declare const isHexString: typeof isHex;
/**
 * Convert BigNumberish to bigint
 *
 * @param {BigNumberish} value value to convert
 * @returns {BigInt} converted value
 * @example
 * ```typescript
 * const str = '123';
 * const result = toBigInt(str);
 * // result = 123n
 * ```
 */
declare function toBigInt(value: BigNumberish): bigint;
/**
 * try to convert BigNumberish to bigint
 * in case of undefined return undefined
 */
declare function tryToBigInt(value: BigNumberish | undefined): bigint | undefined;
/**
 * Convert BigNumberish to hex-string
 *
 * @param {BigNumberish} value value to convert
 * @returns {string} converted number in hex-string format
 * @example
 * ```typescript
 * toHex(100); // '0x64'
 * toHex('200'); // '0xc8'
 * toHex('0x00023AB'); // '0x23ab'
 * ```
 */
declare function toHex(value: BigNumberish): string;
/**
 * Alias of ToHex
 */
declare const toHexString: typeof toHex;
/**
 * Remove hex-string leading zeroes and lowercase it
 *
 * @example
 * ```typescript
 * cleanHex('0x00023AB'); // '0x23ab'
 * ```
 */
declare function cleanHex(hex: string): string;
/**
 * Convert BigNumberish to storage-key-string
 *
 * Same as toHex but conforming to the STORAGE_KEY pattern `^0x0[0-7]{1}[a-fA-F0-9]{0,62}$`.
 *
 * A storage key is represented as up to 62 hex digits, 3 bits, and 5 leading zeroes:
 * `0x0 + [0-7] + 62 hex = 0x + 64 hex`
 * @returns format: storage-key-string
 * @example
 * ```typescript
 * toStorageKey(0x123); // '0x0000000000000000000000000000000000000000000000000000000000000123'
 * toStorageKey(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toStorageKey('test'); // 'Error'
 * ```
 */
declare function toStorageKey(number: BigNumberish): string;
/**
 * Convert BigNumberish to hex format 0x + 64 hex chars
 *
 * Similar as toStorageKey but conforming to exactly 0x(64 hex chars).
 *
 * @returns format: hex-0x(64)-string
 * @example
 * ```typescript
 * toHex64(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toHex64(123n); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toHex64('test'); // 'Error'
 * ```
 */
declare function toHex64(number: BigNumberish): string;
/**
 * Convert hexadecimal string to decimal string
 *
 * @param {string} hex hex-string to convert
 * @returns {string} converted number in decimal string format
 * @example
 * ```typescript
 * hexToDecimalString('64'); // '100'
 * hexToDecimalString('c8'); // '200'
 * ```
 */
declare function hexToDecimalString(hex: string): string;
/**
 * Asserts input is equal to or greater then lowerBound and lower then upperBound.
 *
 * The `inputName` parameter is used in the assertion message.
 * @param input Value to check
 * @param lowerBound Lower bound value
 * @param upperBound Upper bound value
 * @param inputName Name of the input for error message
 * @throws Error if input is out of range
 * @example
 * ```typescript
 * const input1:BigNumberish = 10;
 * assertInRange(input1, 5, 20, 'value')
 *
 * const input2: BigNumberish = 25;
 * assertInRange(input2, 5, 20, 'value');
 * // throws Error: Message not signable, invalid value length.
 * ```
 */
declare function assertInRange(
  input: BigNumberish,
  lowerBound: BigNumberish,
  upperBound: BigNumberish,
  inputName?: string
): void;
/**
 * Convert BigNumberish array to decimal string array
 *
 * @param {BigNumberish[]} data array of big-numberish elements
 * @returns {string[]} array of decimal strings
 * @example
 * ```typescript
 * const data = [100, 200n];
 * const result = bigNumberishArrayToDecimalStringArray(data);
 * // result = ['100', '200']
 * ```
 */
declare function bigNumberishArrayToDecimalStringArray(data: BigNumberish[]): string[];
/**
 * Convert BigNumberish array to hexadecimal string array
 *
 * @param {BigNumberish[]} data array of big-numberish elements
 * @returns array of hex-strings
 * @example
 * ```typescript
 * const data = [100, 200n];
 * const result = bigNumberishArrayToHexadecimalStringArray(data);
 * // result = ['0x64', '0xc8']
 * ```
 */
declare function bigNumberishArrayToHexadecimalStringArray(data: BigNumberish[]): string[];
/**
 * Test if string is a whole number (0, 1, 2, 3...)
 *
 * @param {string} str string to test
 * @returns {boolean}: true if string is a whole number, false otherwise
 * @example
 * ```typescript
 * isStringWholeNumber('100'); // true
 * isStringWholeNumber('10.0'); // false
 * isStringWholeNumber('test'); // false
 * ```
 */
declare function isStringWholeNumber(str: string): boolean;
/**
 * Convert string to decimal string
 *
 * @param {string} str string to convert
 * @returns converted string in decimal format
 * @throws str needs to be a number string in hex or whole number format
 * @example
 * ```typescript
 * const result = getDecimalString("0x1a");
 * // result = "26"
 *
 * const result2 = getDecimalString("Hello");
 * // throws Error: "Hello needs to be a hex-string or whole-number-string"
 * ```
 */
declare function getDecimalString(str: string): string;
/**
 * Convert string to hexadecimal string
 *
 * @param {string} str string to convert
 * @returns converted hex-string
 * @throws str needs to be a number string in hex or whole number format
 * @example
 * ```typescript
 * const result = getHexString("123");
 * // result = "0x7b"
 *
 * const result2 = getHexString("Hello");
 * // throws Error: Hello needs to be a hex-string or whole-number-string
 * ```
 */
declare function getHexString(str: string): string;
/**
 * Convert string array to hex-string array
 *
 * @param {Array<string>} array array of string elements
 * @returns array of converted elements in hex-string format
 * @example
 * ```typescript
 * const data = ['100', '200', '0xaa'];
 * const result = getHexStringArray(data);
 * // result = ['0x64', '0xc8', '0xaa']
 * ```
 */
declare function getHexStringArray(array: Array<string>): string[];
/**
 * Convert boolean to "0" or "1"
 *
 * @param value The boolean value to be converted.
 * @returns {boolean} Returns true if the value is a number, otherwise returns false.
 * @example
 * ```typescript
 * const result = toCairoBool(true);
 * // result ="1"
 *
 * const result2 = toCairoBool(false);
 * // result2 = "0"
 * ```
 */
declare function toCairoBool(value: boolean): string;
/**
 * Convert hex-string to an array of Bytes (Uint8Array)
 *
 * @param {string} str hex-string
 * @returns {Uint8Array} array containing the converted elements
 * @throws str must be a hex-string
 * @example
 * ```typescript
 * let result;
 *
 * result = hexToBytes('0x64');
 * // result = [100]
 *
 * result = hexToBytes('test');
 * // throws Error: test needs to be a hex-string
 * ```
 */
declare function hexToBytes(str: string): Uint8Array;
/**
 * Adds a percentage amount to the value
 *
 * @param number value to be modified
 * @param percent integer as percent ex. 50 for 50%
 * @returns {bigint} modified value
 * @example
 * ```typescript
 * addPercent(100, 50); // 150n
 * addPercent(100, 100); // 200n
 * addPercent(200, 50); // 300n
 * addPercent(200, -50); // 100n
 * addPercent(200, -100); // 0n
 * addPercent(200, -150); // -100n
 * ```
 */
declare function addPercent(number: BigNumberish, percent: number): bigint;
/**
 * Calculate the sha256 hash of an utf8 string, then encode the
 * result in an uint8Array of 4 elements.
 * Useful in wallet path calculation.
 * @param {string} str utf8 string (hex string not handled).
 * @returns a uint8Array of 4 bytes.
 * @example
 * ```typescript
 * const ledgerPathApplicationName = 'LedgerW';
 * const path2Buffer = num.stringToSha256ToArrayBuff4(ledgerPathApplicationName);
 * // path2Buffer = Uint8Array(4) [43, 206, 231, 219]
 * ```
 */
declare function stringToSha256ToArrayBuff4(str: string): Uint8Array;
/**
 * Checks if a given value is of BigNumberish type.
 * 234, 234n, "234", "0xea" are valid, exclude boolean and string
 * @param {unknown} input a value
 * @returns {boolean} true if type of input is `BigNumberish`
 * @example
 * ```typescript
 * const res = num.isBigNumberish("ZERO");
 * // res = false
 *  ```
 */
declare function isBigNumberish(input: unknown): input is BigNumberish;
/**
 * Expect the next value from an iterator
 *
 * @param iterator The iterator to get the next value from.
 * @returns The next value from the iterator.
 * @throws Error if the iterator is done.
 */
declare function getNext(iterator: Iterator<string>): string;

declare const num_addPercent: typeof addPercent;
declare const num_assertInRange: typeof assertInRange;
declare const num_bigNumberishArrayToDecimalStringArray: typeof bigNumberishArrayToDecimalStringArray;
declare const num_bigNumberishArrayToHexadecimalStringArray: typeof bigNumberishArrayToHexadecimalStringArray;
declare const num_cleanHex: typeof cleanHex;
declare const num_getDecimalString: typeof getDecimalString;
declare const num_getHexString: typeof getHexString;
declare const num_getHexStringArray: typeof getHexStringArray;
declare const num_getNext: typeof getNext;
declare const num_hexToBytes: typeof hexToBytes;
declare const num_hexToDecimalString: typeof hexToDecimalString;
declare const num_isBigNumberish: typeof isBigNumberish;
declare const num_isHex: typeof isHex;
declare const num_isHexString: typeof isHexString;
declare const num_isStringWholeNumber: typeof isStringWholeNumber;
declare const num_stringToSha256ToArrayBuff4: typeof stringToSha256ToArrayBuff4;
declare const num_toBigInt: typeof toBigInt;
declare const num_toCairoBool: typeof toCairoBool;
declare const num_toHex: typeof toHex;
declare const num_toHex64: typeof toHex64;
declare const num_toHexString: typeof toHexString;
declare const num_toStorageKey: typeof toStorageKey;
declare const num_tryToBigInt: typeof tryToBigInt;
declare namespace num {
  export {
    num_addPercent as addPercent,
    num_assertInRange as assertInRange,
    num_bigNumberishArrayToDecimalStringArray as bigNumberishArrayToDecimalStringArray,
    num_bigNumberishArrayToHexadecimalStringArray as bigNumberishArrayToHexadecimalStringArray,
    num_cleanHex as cleanHex,
    num_getDecimalString as getDecimalString,
    num_getHexString as getHexString,
    num_getHexStringArray as getHexStringArray,
    num_getNext as getNext,
    num_hexToBytes as hexToBytes,
    num_hexToDecimalString as hexToDecimalString,
    num_isBigNumberish as isBigNumberish,
    num_isHex as isHex,
    num_isHexString as isHexString,
    num_isStringWholeNumber as isStringWholeNumber,
    num_stringToSha256ToArrayBuff4 as stringToSha256ToArrayBuff4,
    num_toBigInt as toBigInt,
    num_toCairoBool as toCairoBool,
    num_toHex as toHex,
    num_toHex64 as toHex64,
    num_toHexString as toHexString,
    num_toStorageKey as toStorageKey,
    num_tryToBigInt as tryToBigInt,
  };
}

/**
 * Extract compiled calldata from args or execute callback
 */
declare function getCompiledCalldata(constructorArguments: RawArgs, callback: Function): Calldata;

/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entry points, and one with the concatenated calldata
 * @param {Call[]} calls the list of calls to transform.
 * @returns {callArray: ParsedStruct[], calldata: BigNumberish[]} An object containing two arrays: callArray and calldata.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1,2,3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4,5,6]
 * 	}
 * ];
 * const result = transaction.transformCallsToMulticallArrays(calls);
 * // result = {
 * // callArray: [
 * // { to: "0x1234567890123456789012345678901234567890", selector: "1234567890",
 * // data_offset: "0", data_len: "3" },
 * // { to: "0x0987654321098765432109876543210987654321", selector: "1234567890",
 * // data_offset: "0987654321", data_offset: "3", data_len: "3"}
 * // ], calldata: [1, 2, 3, 4, 5, 6]
 * // }
 * ```
 */
declare const transformCallsToMulticallArrays: (calls: Call[]) => {
  callArray: ParsedStruct[];
  calldata: Calldata;
};
/**
 * Transforms a list of calls into the Cairo 0 `__execute__` calldata.
 * @param {Call[]} calls the list of calls to transform
 * @returns {Calldata} the Cairo 0 `__execute__` calldata
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transaction.fromCallsToExecuteCalldata(calls);
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699', '0',
 * //   '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '3', '6', '1', '2', '3', '4', '5', '6']
 * ```
 */
declare const fromCallsToExecuteCalldata: (calls: Call[]) => Calldata;
/**
 * Transforms a list of calls into the Cairo 1 `__execute__` calldata.
 * @param {Call[]} calls the list of calls to transform.
 * @returns {Calldata} the Cairo 1 `__execute__` calldata.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transaction.fromCallsToExecuteCalldata_cairo1(calls);
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699',
 * //   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '4', '5', '6']
 * ```
 */
declare const fromCallsToExecuteCalldata_cairo1: (calls: Call[]) => Calldata;
/**
 * Create `__execute__` Calldata from Calls based on Cairo versions.
 * @param {Call[]} calls the list of calls to transform
 * @param {CairoVersion} cairoVersion the Cairo version
 * @returns {Calldata} the `__execute__` calldata.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transaction.getExecuteCalldata(calls, '1');
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699',
 * //   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '4', '5', '6']
 * ```
 */
declare const getExecuteCalldata: (calls: Call[], cairoVersion?: CairoVersion) => Calldata;
/**
 * Return transaction versions based on version type, default version type is 'transaction'.
 * @param {'fee' | 'transaction'} [versionType] the type of version ("fee" or "transaction")
 * @returns {v1: ETransactionVersion, v2: ETransactionVersion, v3: ETransactionVersion} an object containing the transaction versions.
 * @example
 * ```typescript
 * const result = transaction.getVersionsByType('fee');
 * // result = {
 * //   v1: '0x100000000000000000000000000000001',
 * //   v2: '0x100000000000000000000000000000002',
 * //   v3: '0x100000000000000000000000000000003'
 * // }
 * ```
 */
declare function getVersionsByType(versionType?: 'fee' | 'transaction'):
  | {
      v3: '0x100000000000000000000000000000003';
    }
  | {
      v3: '0x3';
    };

declare const index$2_fromCallsToExecuteCalldata: typeof fromCallsToExecuteCalldata;
declare const index$2_fromCallsToExecuteCalldata_cairo1: typeof fromCallsToExecuteCalldata_cairo1;
declare const index$2_getCompiledCalldata: typeof getCompiledCalldata;
declare const index$2_getExecuteCalldata: typeof getExecuteCalldata;
declare const index$2_getVersionsByType: typeof getVersionsByType;
declare const index$2_transformCallsToMulticallArrays: typeof transformCallsToMulticallArrays;
declare namespace index$2 {
  export {
    index$2_fromCallsToExecuteCalldata as fromCallsToExecuteCalldata,
    index$2_fromCallsToExecuteCalldata_cairo1 as fromCallsToExecuteCalldata_cairo1,
    index$2_getCompiledCalldata as getCompiledCalldata,
    index$2_getExecuteCalldata as getExecuteCalldata,
    index$2_getVersionsByType as getVersionsByType,
    index$2_transformCallsToMulticallArrays as transformCallsToMulticallArrays,
  };
}

type V3Details = Required<
  Pick<
    UniversalDetails,
    | 'tip'
    | 'paymasterData'
    | 'accountDeploymentData'
    | 'nonceDataAvailabilityMode'
    | 'feeDataAvailabilityMode'
    | 'resourceBounds'
  >
> &
  Partial<Pick<UniversalDetails, 'proofFacts' | 'proof'>>;
/**
 * Compress compiled Cairo 0 program
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param {Program | string} jsonProgram Representing the compiled Cairo 0 program
 * @return {CompressedProgram} Compressed Cairo 0 program
 * @example
 * ```typescript
 * const contractCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result = stark.compressProgram(contractCairo0);
 * // result = "H4sIAAAAAAAAA+1dC4/bOJL+K4aBu01me7r5EEUyixzQk/TuB..."
 * ```
 */
declare function compressProgram(jsonProgram: Program | string): Promise<CompressedProgram>;
/**
 * Decompress compressed compiled Cairo 0 program
 * @param {CompressedProgram | CompressedProgram[]} base64 Compressed Cairo 0 program
 * @returns Parsed decompressed compiled Cairo 0 program
 * @example
 * ```typescript
 * const contractCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const compressedCairo0 = stark.compressProgram(contractCairo0);
 * const result = stark.decompressProgram(compressedCairo0);
 * // result = {
 * //   abi: [
 * //     {
 * //       inputs: [Array],
 * //       name: 'increase_balance',
 * //       outputs: [],
 * //       type: 'function'
 * //     }
 * //   ],
 * //   entry_points_by_type: { CONSTRUCTOR: [], EXTERNAL: [ [Object], [Object] ], L1_HANDLER: [] },
 * //   program: {
 * //     attributes: [],
 * //     builtins: [ 'pedersen', 'range_check' ],
 * //     compiler_version: '0.10.2',
 * //     data: [
 * //       '0x480680017fff8000',
 * // ...
 * ```
 */
declare function decompressProgram(
  base64: CompressedProgram | CompressedProgram[]
): Promise<Program | CompressedProgram[]>;
/**
 * Random Address based on random keyPair
 * @returns {string} an hex string of a random Starknet address
 * @example
 * ```typescript
 * const result = stark.randomAddress();
 * // result = "0x51fc8126a13cd5ddb29a71ca399cb1e814f086f5af1b502d7151c14929554f"
 * ```
 */
declare function randomAddress(): string;
/**
 * Encode proof array to base64 string for RPC 0.10.1+
 * @param {number[]} proof Array of proof integers
 * @returns {string} Base64 encoded proof
 * @example
 * ```typescript
 * const proofArray = [1, 2, 3, 4, 5];
 * const result = stark.encodeProof(proofArray);
 * // result = "AQAAAAIAAAADAAAABAAAAAUAAAAv"
 * ```
 */
declare function encodeProof(proof: number[]): string;
/**
 * Decode base64 proof string to proof array for RPC 0.10.1+
 * @param {string} proofBase64 Base64 encoded proof string
 * @returns {number[]} Array of proof integers
 * @example
 * ```typescript
 * const proofBase64 = "AQAAAAIAAAADAAAABAAAAAUAAAAv";
 * const result = stark.decodeProof(proofBase64);
 * // result = [1, 2, 3, 4, 5]
 * ```
 */
declare function decodeProof(proofBase64: string): number[];
/**
 * Format Signature to standard type (hex array)
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.formatSignature(signature);
 * // result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
 * //  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
 * ```
 */
declare function formatSignature(sig?: Signature): ArraySignatureType;
/**
 * Format Signature to decimal string array
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.signatureToDecimalArray(signature);
 * // result = ['329619989660444495690615805546674399714973829707166906185976654753023887767',
 * //  '2994745480203297689255012826403147585778741462125743754529207781488706428188']
 * ```
 */
declare function signatureToDecimalArray(sig?: Signature): ArraySignatureType;
/**
 * Format Signature to hex string array
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.signatureToHexArray(signature);
 * // result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
 * //  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
 * ```
 */
declare function signatureToHexArray(sig?: Signature): ArraySignatureType;
/**
 * Calculate the shared secret using ECDH key agreement protocol with a given private key and a full public key.
 * @param {BigNumberish} privateKey - a Starknet 252 bits private key.
 * @param {BigNumberish} fullPublicKey - a 520 bit number, representing the full public key related to `privateKey`, which can be obtained by `getFullPublicKey` function. This number needs to start with '0x04' to indicate that it's a full public key, and the remaining 128 bytes represent the x and y coordinates of the public key point on the elliptic curve (64 bytes for x and 64 bytes for y).
 * @returns {string} an hex string of a 256 bit number, representing the shared secret calculated by ECDH key agreement protocol using `privateKey` and `fullPublicKey`.
 * @example
 * ```typescript
 * const myPrivateKey = "0x67d0bd238e266b6defbb1ad4de4cf1dde2dc55b3518596e0bae29e439165596";
 * const bobFullPublicKey = "0x0402d6b3ff569186d67a2ff0b8548328798d3500c16191f6c021f929134d48a15405f9fc5a11467b96a59b8fce3c0c919c337f11337c815bb9d0dc42bac7ac42a9";
 * const result = stark.getSharedSecret(myPrivateKey, bobFullPublicKey);
 * // result = "0x020619d1a277a5bc51aac6ab0c22d97e414d4bee9711a2d0aa421997f5efd68bab"
 * ```
 */
declare function getSharedSecret(privateKey: BigNumberish, fullPublicKey: BigNumberish): string;
/**
 * Returns a resource bounds with zero values and no overhead.
 * @returns {ResourceBoundsBN} A resource bounds with zero values and no overhead.
 */
declare function zeroResourceBounds(): ResourceBoundsBN;
/**
 * Calculates the maximum resource bounds for fee estimation.
 *
 * @param {FeeEstimate} estimate The estimate for the fee.
 * @param {ResourceBoundsOverhead | false} [overhead] - The percentage overhead added to the max units and max price per unit. Pass `false` to disable overhead.
 * @returns {ResourceBoundsBN} The resource bounds with overhead represented as BigInt.
 * @throws {Error} If the estimate object is undefined or does not have the required properties.
 */
declare function toOverheadResourceBounds(
  estimate: FeeEstimate,
  overhead?: ResourceBoundsOverhead | false
): ResourceBoundsBN;
/**
 * Converts a resource bounds to an estimate fee response. No overhead is applied.
 * @param {ResourceBoundsBN} resourceBounds - The resource bounds to convert.
 * @returns {EstimateFeeResponseOverhead} The estimate fee response.
 * @example
 * ```typescript
 * const resourceBounds = {
 *   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
 *   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
 *   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
 * };
 * const result = stark.resourceBoundsToEstimateFeeResponse(resourceBounds);
 * // result = {
 * //   resourceBounds: resourceBounds,
 * //   overall_fee: 129000n,
 * //   unit: 'FRI'
 * // }
 * ```
 */
declare function resourceBoundsToEstimateFeeResponse(
  resourceBounds: ResourceBoundsBN
): EstimateFeeResponseOverhead;
/**
 * Calculates the overall fee for a transaction based on resource consumption and prices.
 *
 * The estimated fee for the transaction (in wei or fri, depending on the tx version), equals to:
 * l1_gas_consumed*l1_gas_price + l1_data_gas_consumed*l1_data_gas_price + l2_gas_consumed*l2_gas_price
 *
 * @param {FeeEstimate} estimate - The fee estimate containing gas consumption and price data
 * @param {ResourceBoundsOverhead | false} overhead - The overhead percentage. Pass `false` to disable overhead.
 * @returns {bigint} The calculated overall fee in wei or fri
 * @example
 * ```typescript
 * const estimate = {
 *   l1_gas_consumed: 1000n,
 *   l1_gas_price: 100n,
 *   l1_data_gas_consumed: 500n,
 *   l1_data_gas_price: 50n,
 *   l2_gas_consumed: 200n,
 *   l2_gas_price: 20n
 * };
 * const result = stark.toOverheadOverallFee(estimate, overhead);
 * // result = 1000n * 100n + 500n * 50n + 200n * 20n = 129000n
 * ```
 */
declare function toOverheadOverallFee(
  estimate: FeeEstimate,
  overhead?: ResourceBoundsOverhead | false
): bigint;
/**
 * Mock zero fee API response
 */
declare function ZeroFeeEstimate(): FeeEstimate;
/**
 * Converts the data availability mode from EDataAvailabilityMode to EDAMode.
 *
 * @param {EDataAvailabilityMode} dam The data availability mode to be converted.
 * @return {EDAMode} The converted data availability mode.
 * @throws {Error} If the data availability mode is not a valid value.
 * @example
 * ```typescript
 * const result = stark.intDAM(RPC.EDataAvailabilityMode.L1);
 * // result = 0
 * ```
 */
declare function intDAM(dam: EDataAvailabilityMode): EDAMode;
/**
 * Convert input versions to ETransactionVersion or throw an error.
 * Returns providedVersion if specified, otherwise returns defaultVersion.
 * @param {BigNumberish} defaultVersion - The default transaction version to use if providedVersion is not specified
 * @param {BigNumberish} [providedVersion] - Optional transaction version that takes precedence if provided
 * @returns {ETransactionVersion} The transaction version - either providedVersion if specified or defaultVersion
 * @throws {Error} If either version is not a valid ETransactionVersion
 * @example
 * ```typescript
 * const result = stark.toTransactionVersion("0x100000000000000000000000000000003", stark.toFeeVersion(2));
 * // result = "0x100000000000000000000000000000002"
 * ```
 */
declare function toTransactionVersion(
  defaultVersion: BigNumberish,
  providedVersion?: BigNumberish
): ETransactionVersion3;
/**
 * Convert Transaction version to Fee version or throw an error
 * @param {BigNumberish} [providedVersion] 0..3 number representing the transaction version
 * @returns {ETransactionVersion | undefined} the fee estimation version corresponding to the transaction version provided
 * @throws {Error} if the transaction version is unknown
 * @example
 * ```typescript
 * const result = stark.toFeeVersion(2);
 * // result = "0x100000000000000000000000000000002"
 * ```
 */
declare function toFeeVersion(providedVersion?: BigNumberish): ETransactionVersion | undefined;
/**
 * Return provided or default v3 tx details
 * @param {UniversalDetails} details details of the transaction
 * @return {V3Details} an object including the V3 transaction details.
 * @example
 * ```typescript
 * const detail: UniversalDetails = { tip: 3456n };
 * const result = stark.v3Details(detail);
 * // result = {
 * //   tip: 3456n,
 * //   paymasterData: [],
 * //   accountDeploymentData: [],
 * //   nonceDataAvailabilityMode: 'L1',
 * //   feeDataAvailabilityMode: 'L1',
 * //   resourceBounds: {
 * //     l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
 * //     l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' }
 * //   }
 * // }
 * ```
 */
declare function v3Details(details: UniversalDetails): V3Details;
/**
 * get the hex string of the full public key related to a Starknet private key.
 * @param {BigNumberish} privateKey a 252 bits private key.
 * @returns {string} an hex string of a 520 bit number, representing the full public key related to `privateKey`.
 * @example
 * ```typescript
 * const result = ec.getFullPublicKey("0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535");
 * // result = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf"
 * ```
 */
declare function getFullPublicKey(privateKey: BigNumberish): string;
/**
 * Converts ResourceBoundsBN (with bigint values) to ResourceBounds (with string values)
 *
 * @param {ResourceBoundsBN} resourceBoundsBN The resource bounds with bigint values
 * @returns {ResourceBounds} The resource bounds with hex string values
 * @example
 * ```typescript
 * const resourceBoundsBN = {
 *   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
 *   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
 *   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
 * };
 * const result = stark.resourceBoundsToHexString(resourceBoundsBN);
 * // result = {
 * //   l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
 * //   l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
 * //   l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' }
 * // }
 * ```
 */
declare function resourceBoundsToHexString(resourceBoundsBN: ResourceBoundsBN): ResourceBounds;
/**
 * Converts ResourceBounds (with string values) to ResourceBoundsBN (with BigInt values)
 *
 * @param {ResourceBounds} resourceBounds The resource bounds with string values
 * @returns {ResourceBoundsBN} The resource bounds with BigInt values
 * @example
 * ```typescript
 * const resourceBounds = {
 *   l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
 *   l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
 *   l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' }
 * };
 * const result = stark.resourceBoundsToBigInt(resourceBounds);
 * // result = {
 * //   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
 * //   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
 * //   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
 * // }
 * ```
 */
declare function resourceBoundsToBigInt(resourceBounds: ResourceBounds): ResourceBoundsBN;

declare const index$1_ZeroFeeEstimate: typeof ZeroFeeEstimate;
declare const index$1_compressProgram: typeof compressProgram;
declare const index$1_decodeProof: typeof decodeProof;
declare const index$1_decompressProgram: typeof decompressProgram;
declare const index$1_encodeProof: typeof encodeProof;
declare const index$1_formatSignature: typeof formatSignature;
declare const index$1_getFullPublicKey: typeof getFullPublicKey;
declare const index$1_getSharedSecret: typeof getSharedSecret;
declare const index$1_intDAM: typeof intDAM;
declare const index$1_randomAddress: typeof randomAddress;
declare const index$1_resourceBoundsToBigInt: typeof resourceBoundsToBigInt;
declare const index$1_resourceBoundsToEstimateFeeResponse: typeof resourceBoundsToEstimateFeeResponse;
declare const index$1_resourceBoundsToHexString: typeof resourceBoundsToHexString;
declare const index$1_signatureToDecimalArray: typeof signatureToDecimalArray;
declare const index$1_signatureToHexArray: typeof signatureToHexArray;
declare const index$1_toFeeVersion: typeof toFeeVersion;
declare const index$1_toOverheadOverallFee: typeof toOverheadOverallFee;
declare const index$1_toOverheadResourceBounds: typeof toOverheadResourceBounds;
declare const index$1_toTransactionVersion: typeof toTransactionVersion;
declare const index$1_v3Details: typeof v3Details;
declare const index$1_zeroResourceBounds: typeof zeroResourceBounds;
declare namespace index$1 {
  export {
    index$1_ZeroFeeEstimate as ZeroFeeEstimate,
    index$1_compressProgram as compressProgram,
    index$1_decodeProof as decodeProof,
    index$1_decompressProgram as decompressProgram,
    index$1_encodeProof as encodeProof,
    index$1_formatSignature as formatSignature,
    index$1_getFullPublicKey as getFullPublicKey,
    index$1_getSharedSecret as getSharedSecret,
    index$1_intDAM as intDAM,
    index$1_randomAddress as randomAddress,
    index$1_resourceBoundsToBigInt as resourceBoundsToBigInt,
    index$1_resourceBoundsToEstimateFeeResponse as resourceBoundsToEstimateFeeResponse,
    index$1_resourceBoundsToHexString as resourceBoundsToHexString,
    index$1_signatureToDecimalArray as signatureToDecimalArray,
    index$1_signatureToHexArray as signatureToHexArray,
    index$1_toFeeVersion as toFeeVersion,
    index$1_toOverheadOverallFee as toOverheadOverallFee,
    index$1_toOverheadResourceBounds as toOverheadResourceBounds,
    index$1_toTransactionVersion as toTransactionVersion,
    index$1_v3Details as v3Details,
    index$1_zeroResourceBounds as zeroResourceBounds,
  };
}

/**
 * Get random Ethereum private Key.
 * @returns an Hex string
 * @example
 * ```typescript
 * const myPK: string = randomAddress()
 * // result = "0xf04e69ac152fba37c02929c2ae78c9a481461dda42dbc6c6e286be6eb2a8ab83"
 * ```
 */
declare function ethRandomPrivateKey(): string;
/**
 * Get a string formatted for an Ethereum address, without uppercase characters.
 * @param {BigNumberish} address Address of an Ethereum account.
 * @returns an Hex string coded on 20 bytes
 * @example
 * ```typescript
 * const myEthAddress: string = validateAndParseEthAddress("0x8359E4B0152ed5A731162D3c7B0D8D56edB165")
 * // result = "0x008359e4b0152ed5a731162d3c7b0d8d56edb165"
 * ```
 */
declare function validateAndParseEthAddress(address: BigNumberish): string;

declare const eth_ethRandomPrivateKey: typeof ethRandomPrivateKey;
declare const eth_validateAndParseEthAddress: typeof validateAndParseEthAddress;
declare namespace eth {
  export {
    eth_ethRandomPrivateKey as ethRandomPrivateKey,
    eth_validateAndParseEthAddress as validateAndParseEthAddress,
  };
}

declare class MerkleTree {
  leaves: string[];
  branches: string[][];
  root: string;
  hashMethod: (a: BigNumberish, b: BigNumberish) => string;
  /**
   * Create a Merkle tree
   *
   * @param leafHashes hex-string array
   * @param hashMethod hash method to use, default: Pedersen
   * @returns created Merkle tree
   * @example
   * ```typescript
   * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
   * const tree = new MerkleTree(leaves);
   * // tree = {
   * //   branches: [['0x5bb9440e2...', '0x262697b88...', ...], ['0x38118a340...', ...], ...],
   * //   leaves: ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'],
   * //   root: '0x7f748c75e5bdb7ae28013f076b8ab650c4e01d3530c6e5ab665f9f1accbe7d4',
   * //   hashMethod: [Function computePedersenHash],
   * // }
   * ```
   */
  constructor(leafHashes: string[], hashMethod?: (a: BigNumberish, b: BigNumberish) => string);
  /** @ignore */
  private build;
  /**
   * Calculate hash from ordered a and b, Pedersen hash default
   *
   * @param a first value
   * @param b second value
   * @param hashMethod hash method to use, default: Pedersen
   * @returns result of the hash function
   * @example
   * ```typescript
   * const result1 = MerkleTree.hash('0xabc', '0xdef');
   * // result1 = '0x484f029da7914ada038b1adf67fc83632364a3ebc2cd9349b41ab61626d9e82'
   *
   * const customHashMethod = (a, b) => `custom_${a}_${b}`;
   * const result2 = MerkleTree.hash('0xabc', '0xdef', customHashMethod);
   * // result2 = 'custom_2748_3567'
   * ```
   */
  static hash(
    a: BigNumberish,
    b: BigNumberish,
    hashMethod?: (a: BigNumberish, b: BigNumberish) => string
  ): string;
  /**
   * Calculates the merkle membership proof path
   *
   * @param leaf hex-string
   * @param branch hex-string array
   * @param hashPath hex-string array
   * @returns collection of merkle proof hex-string hashes
   * @example
   * ```typescript
   * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
   * const tree = new MerkleTree(leaves);
   * const result = tree.getProof('0x3');
   * // result = [
   * //   '0x4',
   * //   '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
   * //   '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
   * // ]
   * ```
   */
  getProof(leaf: string, branch?: string[], hashPath?: string[]): string[];
}
/**
 * Tests a Merkle tree path
 *
 * @param root hex-string
 * @param leaf hex-string
 * @param path hex-string array
 * @param hashMethod hash method to use, default: Pedersen
 * @returns true if the path is valid, false otherwise
 * @example
 * ```typescript
 * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
 * const tree = new MerkleTree(leaves);
 * const result = proofMerklePath(tree.root, '0x3', [
 *   '0x4',
 *   '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
 *   '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
 * ]);
 * // result = true
 * ```
 */
declare function proofMerklePath(
  root: string,
  leaf: string,
  path: string[],
  hashMethod?: (a: BigNumberish, b: BigNumberish) => string
): boolean;

type merkle_MerkleTree = MerkleTree;
declare const merkle_MerkleTree: typeof MerkleTree;
declare const merkle_proofMerklePath: typeof proofMerklePath;
declare namespace merkle {
  export { merkle_MerkleTree as MerkleTree, merkle_proofMerklePath as proofMerklePath };
}

/**
 * Convert Uint256 to bigint
 * Legacy support Export
 * @param {Uint256} uint256 Uint256 value to convert to bigint
 * @returns {bigint} BigInt representation of the input Uint256
 * @example
 * ```typescript
 * const uint256Value: Uint256 = {low: 1234567890, high: 1};
 * const result = uint256.uint256ToBN(uint256Value);
 * // result = 340282366920938463463374607433002779346n
 * ```
 */
declare function uint256ToBN(uint256: Uint256): bigint;
/**
 * Test BigNumberish is in the range[0, 2**256-1]
 * Legacy support Export
 * @param {BigNumberish} bn value to test
 * @returns {boolean} True if the input value is in the range[0, 2**256-1], false otherwise
 * @example
 * ```typescript
 * const result = uint256.isUint256(12345n);
 * // result = true
 * const result1 = uint256.isUint256(-1);
 * // result1 = false
 * ```
 */
declare function isUint256(bn: BigNumberish): boolean;
/**
 * Convert BigNumberish (string | number | bigint) to Uint256
 * Legacy support Export
 * @param {BigNumberish} bn value to convert to Uint256
 * @returns {Uint256} Uint256 object representing the BigNumberish value
 * @example
 * ```typescript
 * const result = uint256.bnToUint256(1000000000n);
 * // result = {"low": "0x3b9aca00", "high": "0x0"}
 * ```
 */
declare function bnToUint256(bn: BigNumberish): Uint256;

declare const uint256$1_bnToUint256: typeof bnToUint256;
declare const uint256$1_isUint256: typeof isUint256;
declare const uint256$1_uint256ToBN: typeof uint256ToBN;
declare namespace uint256$1 {
  export {
    uint256$1_bnToUint256 as bnToUint256,
    uint256$1_isUint256 as isUint256,
    uint256$1_uint256ToBN as uint256ToBN,
  };
}

/**
 * Test if string contains only ASCII characters (string can be ascii text)
 * @param {string} str The string to test
 * @returns {boolean} Returns true if the string contains only ASCII characters, otherwise false
 * @example
 * ```typescript
 * const result = shortString.isASCII("Hello, world!");
 * // result = true
 * const result = shortString.isASCII("Hello, 世界!");
 * // result = false
 * ```
 */
declare function isASCII(str: string): boolean;
/**
 * Test if a string is a Cairo short string (string with less or equal 31 characters)
 * @param {string} str the string to test
 * @returns {boolean} Returns true if the string has less than or equal to 31 characters, otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isShortString("Hello, world!");
 * // result = true
 * ```
 */
declare function isShortString(str: string): boolean;
/**
 * Test if string contains only numbers (string can be converted to decimal integer number)
 * @param {string} str the string to test.
 * @returns {boolean} Returns true if the string contains only numbers, otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isDecimalString("12345");
 * // result = true
 * const result = shortString.isDecimalString("12a45");
 * // result = false
 * ```
 */
declare function isDecimalString(str: string): boolean;
/**
 * Test if value is a pure string text, and not a hex string or number string
 * @param {any} val the value to test
 * @returns {boolean} returns true if the value is a free-form string text, otherwise false
 * @example
 * ```typescript
 * const result = shortString.isText("Hello, world!");
 * // result = true
 * const result = shortString.isText("0x7aec92f706");
 * // result = false
 * ```
 */
declare function isText(val: any): val is string;
/**
 * Test if value is short text
 * @param {any} val - The item to test
 * @returns {boolean} Returns true if the value is a short text (string has less or equal 31 characters), otherwise false
 * @example
 * ```typescript
 * const result = shortString.isShortText("Hello, world!");
 * // result = true
 * ```
 */
declare const isShortText: (val: any) => boolean;
/**
 * Test if value is long text
 * @param {any} val the value to test
 * @returns {boolean} returns true if the value is a long text(string has more than 31 characters), otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isLongText("Hello, world! this is some random long string to enable you test isLongText function.");
 * // result = true
 * ```
 */
declare const isLongText: (val: any) => boolean;
/**
 * Split long text (string greater than 31 characters) into short strings (string lesser or equal 31 characters)
 * @param {string} longStr the long text (string greater than 31 characters) to split
 * @returns {string[]} an array of short strings (string lesser or equal 31 characters).
 * @example
 * ```typescript
 * const result = shortString.splitLongString("Hello, world! we just testing splitLongString function.");
 * // result = [ 'Hello, world! we just testing s', 'plitLongString function.' ]
 * ```
 */
declare function splitLongString(longStr: string): string[];
/**
 * @deprecated use Utf8 instead
 * Convert an ASCII short string to a hexadecimal string.
 * @param {string} str short string (ASCII string, 31 characters max)
 * @returns {string} hex-string with 248 bits max
 * @example
 * ```typescript
 * const result = shortString.encodeShortString("uri/pict/t38.jpg");
 * // result = "0x7572692f706963742f7433382e6a7067"
 * ```
 */
declare function encodeShortString(str: string): string;
/**
 * @deprecated use Utf8 instead
 * Convert a hexadecimal or decimal string to an ASCII string.
 * @param {string} str representing a 248 bit max number (ex. "0x1A4F64EA56" or "236942575435676423")
 * @returns {string} short string; 31 characters max
 * @example
 * ```typescript
 * const result = shortString.decodeShortString("0x7572692f706963742f7433382e6a7067");
 * // result = "uri/pict/t38.jpg"
 * ```
 */
declare function decodeShortString(str: string): string;

declare const shortString_decodeShortString: typeof decodeShortString;
declare const shortString_encodeShortString: typeof encodeShortString;
declare const shortString_isASCII: typeof isASCII;
declare const shortString_isDecimalString: typeof isDecimalString;
declare const shortString_isLongText: typeof isLongText;
declare const shortString_isShortString: typeof isShortString;
declare const shortString_isShortText: typeof isShortText;
declare const shortString_isText: typeof isText;
declare const shortString_splitLongString: typeof splitLongString;
declare namespace shortString {
  export {
    shortString_decodeShortString as decodeShortString,
    shortString_encodeShortString as encodeShortString,
    shortString_isASCII as isASCII,
    shortString_isDecimalString as isDecimalString,
    shortString_isLongText as isLongText,
    shortString_isShortString as isShortString,
    shortString_isShortText as isShortText,
    shortString_isText as isText,
    shortString_splitLongString as splitLongString,
  };
}

interface Context {
  parent?: string;
  key?: string;
}
/**
 * Validates that `data` matches the EIP-712 JSON schema.
 */
declare function validateTypedData(data: unknown): data is TypedData;
/**
 * Prepares the selector for later use, if it's not already in correct format.
 * The selector in correct format is the starknet_keccak hash of the function name, encoded in ASCII.
 *
 * @param {string} selector - The selector to be prepared.
 * @returns {string} The prepared selector.
 *
 * @example
 * ```typescript
 * const result1 = prepareSelector('0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8');
 * // result1 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 *
 * const result2 =  prepareSelector('myFunction');
 * // result2 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 * ```
 */
declare function prepareSelector(selector: string): string;
/**
 * Checks if the given Starknet type is a Merkle tree type.
 *
 * @param {StarknetType} type - The StarkNet type to check.
 *
 * @returns {boolean} - True if the type is a Merkle tree type, false otherwise.
 *
 * @example
 * ```typescript
 * const type = { name: 'test', type: 'merkletree',};
 * const result1 = isMerkleTreeType(type);
 * // result1 = true
 *
 * const type2 = {name: 'test', type: 'non-merkletree',};
 * const result2 =  isMerkleTreeType(type2);
 * // result2 = false
 * ```
 */
declare function isMerkleTreeType(type: StarknetType): type is StarknetMerkleType;
/**
 * Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
 * in the resulting array.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to get dependencies for.
 * @param {string[]} [dependencies=[]] - The array to store dependencies.
 * @param {string} [contains=''] - The type contained within the struct.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string[]} The array of dependencies.
 */
declare function getDependencies(
  types: TypedData['types'],
  type: string,
  dependencies?: string[],
  contains?: string,
  revision?: TypedDataRevision
): string[];
/**
 * Encode a type to a string. All dependent types are alphabetically sorted.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The encoded string.
 *
 * @example
 * ```typescript
 * import typedDataExample from '../../__mocks__/typedData/baseExample.json';
 *
 * const result = encodeType(typedDataExample.types, 'Mail');
 * // result = "Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)";
 * ```
 */
declare function encodeType(
  types: TypedData['types'],
  type: string,
  revision?: TypedDataRevision
): string;
/**
 * Get a type string as hash.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The hash.
 *
 * @example
 * ```typescript
 * import typedDataExample from '../../__mocks__/typedData/baseExample.json';
 *
 * const result = getTypeHash(typedDataExample.types, 'StarkNetDomain');
 * // result = "0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288";
 * ```
 */
declare function getTypeHash(
  types: TypedData['types'],
  type: string,
  revision?: TypedDataRevision
): string;
/**
 * Encodes a single value to an ABI serialisable string, number or Buffer. Returns the data as a tuple, which consists of
 * an array of ABI compatible types, and an array of corresponding values.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {unknown} data - The data to encode.
 * @param {Context} [ctx={}] - The context of the encoding process.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {[string, string]} The ABI compatible type and corresponding value.
 *
 * @example
 * ```typescript
 * import { getSelectorFromName } from '../../src/utils/hash';
 *
 * const selector = 'transfer';
 * const selectorHash = getSelectorFromName(selector);
 * const result1 = encodeValue({}, 'felt', selectorHash);
 *
 * // result1 = ['felt', '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e']
 * ```
 */
declare function encodeValue(
  types: TypedData['types'],
  type: string,
  data: unknown,
  ctx?: Context,
  revision?: TypedDataRevision
): [string, string];
/**
 * Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {TypedData['message']} data - The data to encode.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {[string[], string[]]} The ABI compatible types and corresponding values.
 */
declare function encodeData<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision?: TypedDataRevision
): [string[], string[]];
/**
 * Get encoded data as a hash. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {TypedData['message']} data - The data to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The hash of the encoded data.
 *
 * @example
 * ```typescript
 * import exampleBaseTypes from '../../__mocks__/typedData/example_baseTypes.json';
 *
 * const result = getStructHash(
 *    exampleBaseTypes.types,
 *    'StarknetDomain',
 *    exampleBaseTypes.domain as StarknetDomain,
 *    TypedDataRevision.ACTIVE
 *  );
 *  // result = "0x555f72e550b308e50c1a4f8611483a174026c982a9893a05c185eeb85399657";
 * ```
 */
declare function getStructHash<T extends TypedData>(
  types: T['types'],
  type: string,
  data: T['message'],
  revision?: TypedDataRevision
): string;
/**
 * Get the SNIP-12 encoded message to sign, from the typedData object.
 *
 * @param {TypedData} typedData - The TypedData object.
 * @param {BigNumberish} accountAddress - The account address to sign the message.
 *
 * @returns {string} The hash of the message to sign.
 * @throws Will throw an error if the typedData does not match the JSON schema.
 *
 * @example
 * ```typescript
 * const exampleAddress = "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826";
 * const typedDataStringExample = {
 *  types: {
 *    StarkNetDomain: [
 *      { name: 'name', type: 'felt' },
 *      { name: 'version', type: 'felt' },
 *      { name: 'chainId', type: 'felt' },
 *    ],
 *    Person: [
 *      { name: 'name', type: 'felt' },
 *      { name: 'wallet', type: 'felt' },
 *    ],
 *    String: [
 *      { name: 'len', type: 'felt' },
 *      { name: 'data', type: 'felt*' },
 *    ],
 *    Mail: [
 *      { name: 'from', type: 'Person' },
 *      { name: 'to', type: 'Person' },
 *      { name: 'contents', type: 'String' },
 *    ],
 *  },
 *  primaryType: 'Mail',
 *  domain: {
 *    name: 'StarkNet Mail',
 *    version: '1',
 *    chainId: 1,
 *  },
 *  message: {
 *    from: {
 *      name: 'Cow',
 *      wallet: exampleAddress,
 *    },
 *    to: {
 *      name: 'Bob',
 *      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *    },
 *    contents: stringToStringStruct(
 *      'this is way longer than just 32 characters, to test if that is possible within a typedData struct.'
 *    ),
 *  },
 * };
 *
 * const result = getMessageHash(typedDataStringExample, exampleAddress);
 * // result = "0x70338fb11b8f70b68b261de8a322bcb004bd85e88ac47d9147982c7f5ac66fd"
 * ```
 */
declare function getMessageHash(typedData: TypedData, accountAddress: BigNumberish): string;
/**
 * Checks if a signed EIP712 message is related to an account.
 * Valid for a standard Starknet signature.
 * @param {BigNumberish | TypedData} message a TypedMessage message, or the hash of an EIP712 message (SNIP-12).
 * @param {Signature} signature a WeierstrassSignatureType signature, or an array of 2 strings.
 * @param {BigNumberish} fullPublicKey a number coded on 520 bits (from ec.getFullPublicKey()).
 * @param {BigNumberish} [accountAddress] address of the account that has signed the message. Not needed with a message hash is provided in `message`
 * @returns {boolean} true if the message is verified.
 * @example
 * ```typescript
 * const myTypedMessage: TypedMessage = .... ;
 * const sign: Signature = ["0x123...abc", "0x345...def"];
 * const fullPubK = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf";
 * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
 * const result1 = typedData.verifyMessage(myTypedMessage, sign, fullPubK, accountAddress);
 * const result2 = typedData.verifyMessage(messageHash, sign, fullPubK);
 * // result1 = result2 = true
 * ```
 */
declare function verifyMessage(
  message: TypedData,
  signature: Signature,
  fullPublicKey: BigNumberish,
  accountAddress: BigNumberish
): boolean;
declare function verifyMessage(
  message: BigNumberish,
  signature: Signature,
  fullPublicKey: BigNumberish
): boolean;

declare const typedData_encodeData: typeof encodeData;
declare const typedData_encodeType: typeof encodeType;
declare const typedData_encodeValue: typeof encodeValue;
declare const typedData_getDependencies: typeof getDependencies;
declare const typedData_getMessageHash: typeof getMessageHash;
declare const typedData_getStructHash: typeof getStructHash;
declare const typedData_getTypeHash: typeof getTypeHash;
declare const typedData_isMerkleTreeType: typeof isMerkleTreeType;
declare const typedData_prepareSelector: typeof prepareSelector;
declare const typedData_validateTypedData: typeof validateTypedData;
declare const typedData_verifyMessage: typeof verifyMessage;
declare namespace typedData {
  export {
    typedData_encodeData as encodeData,
    typedData_encodeType as encodeType,
    typedData_encodeValue as encodeValue,
    typedData_getDependencies as getDependencies,
    typedData_getMessageHash as getMessageHash,
    typedData_getStructHash as getStructHash,
    typedData_getTypeHash as getTypeHash,
    typedData_isMerkleTreeType as isMerkleTreeType,
    typedData_prepareSelector as prepareSelector,
    typedData_validateTypedData as validateTypedData,
    typedData_verifyMessage as verifyMessage,
  };
}

/**
 * Decodes an array of BigInts into a string using the given algorithm.
 * @param {bigint[]} encoded The encoded array of BigInts.
 * @return {string} The decoded string.
 * @example
 * ```typescript
 * const result = starknetId.useDecoded([3015206943634620n]);
 * // result = "starknetjs.stark"
 * ```
 */
declare function useDecoded(encoded: bigint[]): string;
/**
 * Encodes a string into a bigint value.
 *
 * @param {string} decoded The string to be encoded.
 * @returns {bigint} The encoded bigint value.
 * @example
 * ```typescript
 * const result = starknetId.useEncoded("starknet.js");
 * // result = 3015206943634620n
 * ```
 */
declare function useEncoded(decoded: string): bigint;
declare const StarknetIdContract: {
  readonly MAINNET: '0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678';
  readonly TESTNET_SEPOLIA: '0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474';
};
/**
 * Returns the Starknet ID contract address based on the provided chain ID.
 *
 * @param {StarknetChainId} chainId The chain ID of the Starknet network.
 * @return {string} The Starknet ID contract address.
 * @throws {Error} Throws an error if the Starknet ID contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474"
 * ```
 */
declare function getStarknetIdContract(chainId: _StarknetChainId): string;
declare const StarknetIdIdentityContract: {
  readonly MAINNET: '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af';
  readonly TESTNET_SEPOLIA: '0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda';
};
/**
 * Returns the Starknet ID identity contract address for the given chain ID.
 *
 * @param {StarknetChainId} chainId The chain ID for the specified network.
 *
 * @return {string} The Starknet ID identity contract address for the specified network.
 *
 * @throws {Error} If the Starknet ID verifier contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdIdentityContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda"
 * ```
 */
declare function getStarknetIdIdentityContract(chainId: _StarknetChainId): string;
declare const StarknetIdMulticallContract =
  '0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970';
/**
 * Returns the Starknet.id multicall contract address based on the provided chainId.
 *
 * @param {StarknetChainId} chainId - The chainId of the network.
 * @return {string} - The address of the Starknet.id multicall contract.
 * @throws {Error} - If the Starknet.id multicall contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdMulticallContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970"
 * ```
 */
declare function getStarknetIdMulticallContract(chainId: _StarknetChainId): string;
declare const StarknetIdVerifierContract: {
  readonly MAINNET: '0x07d14dfd8ee95b41fce179170d88ba1f0d5a512e13aeb232f19cfeec0a88f8bf';
  readonly TESTNET_SEPOLIA: '0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566';
};
/**
 * Returns the address of the Starknet ID Verifier contract based on the specified chain ID.
 *
 * @param {StarknetChainId} chainId - The ID of the Starknet chain.
 * @return {string} - The address of the Starknet ID Verifier contract.
 * @throws {Error} - If the Starknet ID Verifier contract is not deployed on the specified network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdVerifierContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566"
 * ```
 */
declare function getStarknetIdVerifierContract(chainId: _StarknetChainId): string;
declare const StarknetIdPfpContract: {
  readonly MAINNET: '0x070aaa20ec4a46da57c932d9fd89ca5e6bb9ca3188d3df361a32306aff7d59c7';
  readonly TESTNET_SEPOLIA: '0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02';
};
/**
 * Retrieves the contract address of the Starknet.id profile picture verifier contract based on the given chain ID.
 *
 * @param {StarknetChainId} chainId - The chain ID of the network.
 * @returns {string} - The contract address of the Starknet.id profile picture verifier contract.
 * @throws {Error} - Throws an error if the Starknet.id profile picture verifier contract is not yet deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdPfpContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02"
 * ```
 */
declare function getStarknetIdPfpContract(chainId: _StarknetChainId): string;
declare const StarknetIdPopContract: {
  readonly MAINNET: '0x0293eb2ba9862f762bd3036586d5755a782bd22e6f5028320f1d0405fd47bff4';
  readonly TESTNET_SEPOLIA: '0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a';
};
/**
 * Retrieves the Starknet ID Proof of Personhood (IdPop) verifier contract address for the given chain ID.
 *
 * @param {StarknetChainId} chainId - The chain ID of the Starknet network.
 * @return {string} - The Starknet ID Pop contract address.
 * @throws {Error} - If the Starknet ID Pop contract is not deployed on the specified network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdPopContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a"
 * ```
 */
declare function getStarknetIdPopContract(chainId: _StarknetChainId): string;
/**
 * Returns a CairoCustomEnum object.
 *
 * Functions to build CairoCustomEnum for multiCall contracts
 * @param {Object} [staticEx] An optional object defining the "Static" value of the CairoCustomEnum.
 * @param {number[]} [ifEqual] An optional array defining the "IfEqual" value of the CairoCustomEnum.
 * @param {number[]} [ifNotEqual] An optional array defining the "IfNotEqual" value of the CairoCustomEnum.
 * @return {CairoCustomEnum} - The created CairoCustomEnum object.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.execution(undefined, [1, 2, 3], undefined);
 * // result = CairoCustomEnum {
 * //   variant: {
 * //     Static: undefined,
 * //     IfEqual: { '0': 1, '1': 2, '2': 3 },
 * //     IfNotEqual: undefined
 * //   }
 * // }
 * ```
 */
declare function execution(
  staticEx: {} | undefined,
  ifEqual?: number[] | undefined,
  ifNotEqual?: number[] | undefined
): CairoCustomEnum;
/**
 * Creates a new instance of CairoCustomEnum.
 *
 * @param {BigNumberish} [hardcoded] The hardcoded value for the CairoCustomEnum.
 * @param {number[]} [reference] The reference array for the CairoCustomEnum.
 * @returns {CairoCustomEnum} The new instance of CairoCustomEnum.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.dynamicFelt(undefined, [1, 2]);
 * // result = CairoCustomEnum {
 * //  variant: { Hardcoded: undefined, Reference: { '0': 1, '1': 2 } }
 * // }
 * ```
 */
declare function dynamicFelt(
  hardcoded: BigNumberish | undefined,
  reference?: number[] | undefined
): CairoCustomEnum;
/**
 * Creates a new instance of CairoCustomEnum with the given parameters.
 * @param {BigNumberish} [hardcoded] The hardcoded value.
 * @param {BigNumberish[]} [reference] The reference value (optional).
 * @param {BigNumberish[]} [arrayReference] The array reference value (optional).
 * @return {CairoCustomEnum} The new instance of CairoCustomEnum.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.dynamicCallData(undefined, [1, 2], undefined);
 * // result = CairoCustomEnum {
 * //   variant: {
 * //     Hardcoded: undefined,
 * //     Reference: { '0': 1, '1': 2 },
 * //     ArrayReference: undefined
 * //   }
 * // }
 * ```
 */
declare function dynamicCallData(
  hardcoded: BigNumberish | undefined,
  reference?: BigNumberish[] | undefined,
  arrayReference?: BigNumberish[] | undefined
): CairoCustomEnum;
/**
 * Check if a given string is a valid Starknet.id domain.
 *
 * @param {string} domain - The domain string to validate.
 * @returns {boolean} - True if the domain is a valid Starknet.id domain, false otherwise.
 * @example
 * ```typescript
 * const result = starknetId.isStarkDomain("example.stark");
 * // result = true
 *
 * const result2 = starknetId.isStarkDomain("invalid-domain");
 * // result2 = false
 * ```
 */
declare function isStarkDomain(domain: string): boolean;

declare const starknetId_StarknetIdContract: typeof StarknetIdContract;
declare const starknetId_StarknetIdIdentityContract: typeof StarknetIdIdentityContract;
declare const starknetId_StarknetIdMulticallContract: typeof StarknetIdMulticallContract;
declare const starknetId_StarknetIdPfpContract: typeof StarknetIdPfpContract;
declare const starknetId_StarknetIdPopContract: typeof StarknetIdPopContract;
declare const starknetId_StarknetIdVerifierContract: typeof StarknetIdVerifierContract;
declare const starknetId_dynamicCallData: typeof dynamicCallData;
declare const starknetId_dynamicFelt: typeof dynamicFelt;
declare const starknetId_execution: typeof execution;
declare const starknetId_getStarknetIdContract: typeof getStarknetIdContract;
declare const starknetId_getStarknetIdIdentityContract: typeof getStarknetIdIdentityContract;
declare const starknetId_getStarknetIdMulticallContract: typeof getStarknetIdMulticallContract;
declare const starknetId_getStarknetIdPfpContract: typeof getStarknetIdPfpContract;
declare const starknetId_getStarknetIdPopContract: typeof getStarknetIdPopContract;
declare const starknetId_getStarknetIdVerifierContract: typeof getStarknetIdVerifierContract;
declare const starknetId_isStarkDomain: typeof isStarkDomain;
declare const starknetId_useDecoded: typeof useDecoded;
declare const starknetId_useEncoded: typeof useEncoded;
declare namespace starknetId {
  export {
    starknetId_StarknetIdContract as StarknetIdContract,
    starknetId_StarknetIdIdentityContract as StarknetIdIdentityContract,
    starknetId_StarknetIdMulticallContract as StarknetIdMulticallContract,
    starknetId_StarknetIdPfpContract as StarknetIdPfpContract,
    starknetId_StarknetIdPopContract as StarknetIdPopContract,
    starknetId_StarknetIdVerifierContract as StarknetIdVerifierContract,
    starknetId_dynamicCallData as dynamicCallData,
    starknetId_dynamicFelt as dynamicFelt,
    starknetId_execution as execution,
    starknetId_getStarknetIdContract as getStarknetIdContract,
    starknetId_getStarknetIdIdentityContract as getStarknetIdIdentityContract,
    starknetId_getStarknetIdMulticallContract as getStarknetIdMulticallContract,
    starknetId_getStarknetIdPfpContract as getStarknetIdPfpContract,
    starknetId_getStarknetIdPopContract as getStarknetIdPopContract,
    starknetId_getStarknetIdVerifierContract as getStarknetIdVerifierContract,
    starknetId_isStarkDomain as isStarkDomain,
    starknetId_useDecoded as useDecoded,
    starknetId_useEncoded as useEncoded,
  };
}

/**
 * Return randomly select available public paymaster node url
 * @param {NetworkName} networkName NetworkName
 * @param {boolean} mute mute public node warning
 * @returns {string} default node url
 */
declare const getDefaultPaymasterNodeUrl: (networkName?: _NetworkName, mute?: boolean) => string;
/**
 * Asserts that the given calls are strictly equal, otherwise throws an error.
 * @param {Call[]} originalCalls - The original calls.
 * @param {Call[]} unsafeCalls - The unsafe calls.
 * @throws {Error} Throws an error if the calls are not strictly equal.
 */
declare function assertCallsAreStrictlyEqual(
  originalCalls: Call[],
  unsafeCalls: (OutsideCallV1 | OutsideCallV2)[]
): void;
declare const assertPaymasterTransactionSafety: (
  preparedTransaction: PreparedTransaction,
  calls: Call[],
  paymasterDetails: PaymasterDetails,
  maxFeeInGasToken?: BigNumberish
) => void;

declare const paymaster_assertCallsAreStrictlyEqual: typeof assertCallsAreStrictlyEqual;
declare const paymaster_assertPaymasterTransactionSafety: typeof assertPaymasterTransactionSafety;
declare const paymaster_getDefaultPaymasterNodeUrl: typeof getDefaultPaymasterNodeUrl;
declare namespace paymaster {
  export {
    paymaster_assertCallsAreStrictlyEqual as assertCallsAreStrictlyEqual,
    paymaster_assertPaymasterTransactionSafety as assertPaymasterTransactionSafety,
    paymaster_getDefaultPaymasterNodeUrl as getDefaultPaymasterNodeUrl,
  };
}

/**
 * Helper - Async Sleep for 'delay' time
 *
 * @param {number} delay - Number of milliseconds to delay
 * @returns {Promise<unknown>}
 * @example
 * ```typescript
 * await provider.wait(1000) // 1000 milliseconds == 1 second
 * ```
 */
declare function wait(delay: number): Promise<unknown>;
/**
 * Create Sierra compressed Contract Class from a given Compiled Sierra
 *
 * CompiledSierra -> SierraContractClass
 *
 * @param {CompiledSierra} contract sierra code from the Cairo compiler
 * @returns {SierraContractClass} compressed Sierra
 * @example
 * ```typescript
 * const result = provider.createSierraContractClass({
    "sierra_program": [
        "0x1",
        "0x4",
        "0x0",
        "0x2",
        "0x4",
        "0x1",
        "0x3b4",
        "0x4c",
        "0x65",
        "0x52616e6765436865636b",...})
 * // result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
 * ```
 */
declare function createSierraContractClass(contract: CompiledSierra): Promise<SierraContractClass>;
/**
 * Create a compressed contract from a given compiled Cairo 0 & 1 contract or a string.
 * Parse contract string to json and compile contract.sierra_program or contract.program property
 * @param {CompiledContract | string} contract - Compiled Cairo 0 or Cairo 1 contract, or string
 * @returns {ContractClass} Cairo 0 or Cairo 1 compressed contract
 * @example
 * ```typescript
 * const result = provider.parseContract({
    "sierra_program": [
        "0x1",
        "0x4",
        "0x0",
        "0x2",
        "0x4",
        "0x1",
        "0x3b4",
        "0x4c",
        "0x65",
        "0x52616e6765436865636b",...})
 * // result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
 * ```
 */
declare function parseContract(contract: CompiledContract | string): Promise<ContractClass>;
/**
 * Extract the ABI from a given ContractClass.
 * @param contract ContractClass
 * @returns Abi
 */
declare function extractAbi(contract: ContractClass): Abi;
/**
 * Return randomly select available public node
 * @param {NetworkName} networkName NetworkName
 * @returns {string} default node url
 * @example
 * ```typescript
 * const result= provider.getDefaultNodeUrl(constants.NetworkName.SN_MAIN);
 * // console : "Using default public node url, please provide nodeUrl in provider options!"
 * // result = "https://starknet-mainnet.public.blastapi.io/rpc/v0_9"
 * ```
 */
declare const getDefaultNodeUrl: (
  networkName?: _NetworkName,
  rpcVersion?: _SupportedRpcVersion
) => string;
/**
 * return Defaults RPC Nodes endpoints
 */
declare function getDefaultNodes(rpcVersion: _SupportedRpcVersion): {
  [k: string]: string[];
};
/**
 * Return supported RPC versions
 * @returns {SupportedRpcVersion[]} available RPC versions
 */
declare function getSupportedRpcVersions(): _SupportedRpcVersion[];
declare const validBlockTags: ('pre_confirmed' | 'latest' | 'l1_accepted')[];
/**
 * This class is formatting the identifier of a block.
 *
 * hex string and BigInt are detected as block hashes. identifier return { block_hash: hash }
 *
 * decimal string and number are detected as block numbers. identifier return { block_number: number }
 *
 * text string are detected as block tag. identifier return tag
 *
 * null is detected as 'latest' block tag. identifier return 'latest'
 * @example
 * ```typescript
 * const result = new provider.Block(null).identifier;
 * // result = "latest"
 * ```
 */
declare class Block {
  /**
   * @param {BlockIdentifier} hash if not null, contains the block hash
   */
  hash: BlockIdentifier;
  /**
   * @param {BlockIdentifier} number if not null, contains the block number
   */
  number: BlockIdentifier;
  /**
   * @param {BlockIdentifier} tag if not null, contains "pre_confirmed" or "latest"
   */
  tag: BlockIdentifier;
  private setIdentifier;
  /**
   * Create a Block instance
   * @param {BlockIdentifier} _identifier  hex string and BigInt are detected as block hashes.
   * decimal string and number are detected as block numbers.
   * text string are detected as block tag.
   * null is considered as a 'latest' block tag.
   */
  constructor(_identifier: BlockIdentifier);
  /**
   * @returns {any} the identifier as a string
   * @example
   * ```typescript
   * const result = new provider.Block(123456n).queryIdentifier;
   * // result = "blockHash=0x1e240"
   * ```
   */
  get queryIdentifier(): any;
  /**
   * @returns {any} the identifier as an object
   * @example
   * ```typescript
   * const result = new provider.Block(56789).identifier;
   * // result = { block_number: 56789 }
   * ```
   */
  get identifier(): any;
  /**
   * change the identifier of an existing Block instance
   * @example
   * ```typescript
   * const myBlock = new provider.Block("latest");
   * myBlock.identifier ="0x3456789abc";
   * const result = myBlock.identifier;
   * // result = { block_hash: '0x3456789abc' }
   * ```
   */
  set identifier(_identifier: BlockIdentifier);
  valueOf: () => BlockIdentifier;
  toString: () => BlockIdentifier;
}

type provider_Block = Block;
declare const provider_Block: typeof Block;
declare const provider_createSierraContractClass: typeof createSierraContractClass;
declare const provider_extractAbi: typeof extractAbi;
declare const provider_getDefaultNodeUrl: typeof getDefaultNodeUrl;
declare const provider_getDefaultNodes: typeof getDefaultNodes;
declare const provider_getSupportedRpcVersions: typeof getSupportedRpcVersions;
declare const provider_parseContract: typeof parseContract;
declare const provider_validBlockTags: typeof validBlockTags;
declare const provider_wait: typeof wait;
declare namespace provider {
  export {
    provider_Block as Block,
    provider_createSierraContractClass as createSierraContractClass,
    provider_extractAbi as extractAbi,
    provider_getDefaultNodeUrl as getDefaultNodeUrl,
    provider_getDefaultNodes as getDefaultNodes,
    provider_getSupportedRpcVersions as getSupportedRpcVersions,
    provider_parseContract as parseContract,
    provider_validBlockTags as validBlockTags,
    provider_wait as wait,
  };
}

/**
 * Check if an ABI entry is related to events.
 * @param {AbiEntry} object an Abi entry
 * @returns {boolean} true if this Abi Entry is related to an event
 * @example
 * ```typescript
 * // use of a transaction receipt
 * ```
 */
declare function isAbiEvent(object: AbiEntry): boolean;
/**
 * Retrieves the events from the given ABI (from Cairo 0 or Cairo 1 contract).
 *
 * Is able to handle Cairo 1 events nested in Cairo components.
 * @param {Abi} abi - The ABI to extract events from.
 * @return {AbiEvents} - An object containing the hashes and the definition of the events.
 * @example
 * ```typescript
 * const result = events.getAbiEvents(abi);
 * // result = {
 * //   '0x22ea134d4126804c60797e633195f8c9aa5fd6d1567e299f4961d0e96f373ee':
 * //    { '0x34e55c1cd55f1338241b50d352f0e91c7e4ffad0e4271d64eb347589ebdfd16': {
 * //     kind: 'struct', type: 'event',
 * //     name: 'ka::ExComponent::ex_logic_component::Mint',
 * //     members: [{
 * //      name: 'spender',
 * //      type: 'core::starknet::contract_address::ContractAddress',
 * //      kind: 'key'},
 * //      { name: 'value', type: 'core::integer::u256', kind: 'data' }]},
 * // ...
 * ```
 */
declare function getAbiEvents(abi: Abi): AbiEvents;
/**
 * Parse raw events and structure them into response object based on a contract structs and defined events
 * @param {RPC.Event[]} providerReceivedEvents Array of raw events
 * @param {AbiEvents} abiEvents Events defined in the abi
 * @param {AbiStructs} abiStructs Structs defined in the abi
 * @param {AbiEnums} abiEnums Enums defined in the abi
 * @returns {ParsedEvents} parsed events corresponding to the abi
 * @example
 * ```typescript
 * const abiEvents = events.getAbiEvents(sierra.abi);
 * const abiStructs =  CallData.getAbiStruct(sierra.abi);
 * const abiEnums = CallData.getAbiEnum(sierra.abi);
 * const result = events.parseEvents(myEvents, abiEvents, abiStructs, abiEnums);
 * // result = [{test::ExCh::ex_ch::Trade: {
      maker: 7548613724711489396448209137n,
      taker: 6435850562375218974960297344n,
      router_maker: 0n,
    }}]
 * ```
 */
declare function parseEvents(
  providerReceivedEvents: EmittedEvent$1[],
  abiEvents: AbiEvents,
  abiStructs: AbiStructs,
  abiEnums: AbiEnums,
  parser: AbiParserInterface
): ParsedEvents;
/**
 * Add getByPath helper method to parsed events array
 * This method allows finding events by partial key path matching
 * @param parsedEvents - Array of parsed events to enhance
 * @returns The same array with getByPath method attached
 * @example
 * ```typescript
 * const events = addGetByPathMethod(parsedEvents);
 * const transferEvent = events.getByPath('Transfer');
 * ```
 */
declare function addGetByPathMethod(parsedEvents: ParsedEvents): ParsedEvents;
/**
 * Extract and prepare emitted events from a transaction receipt
 * Optionally filters by contract address and enriches with transaction/block metadata
 * @param receipt - Transaction receipt containing events and metadata
 * @param contractAddress - Optional contract address to filter events by
 * @returns Emitted events with transaction and block context, optionally filtered
 * @example
 * ```typescript
 * // Get all emitted events
 * const allEvents = getEmittedEvents(receipt);
 *
 * // Get events from specific contract
 * const contractEvents = getEmittedEvents(receipt, contractAddress);
 * ```
 */
declare function getEmittedEvents(
  receipt: {
    events?: Event$2[];
    transaction_hash: string;
    block_hash?: string;
    block_number?: number;
  },
  contractAddress?: string
): EmittedEvent$1[];
/**
 * Filter events by contract address
 * @param events - Array of events to filter (defaults to empty array if undefined)
 * @param contractAddress - Address to filter by
 * @returns Filtered events matching the contract address
 * @example
 * ```typescript
 * const myEvents = filterEventsByAddress(allEvents, '0x123...');
 * ```
 */
declare function filterEventsByAddress<
  T extends {
    from_address: string;
  },
>(events: T[] | undefined, contractAddress: string): T[];

declare const index_addGetByPathMethod: typeof addGetByPathMethod;
declare const index_filterEventsByAddress: typeof filterEventsByAddress;
declare const index_getAbiEvents: typeof getAbiEvents;
declare const index_getEmittedEvents: typeof getEmittedEvents;
declare const index_isAbiEvent: typeof isAbiEvent;
declare const index_parseEvents: typeof parseEvents;
declare namespace index {
  export {
    index_addGetByPathMethod as addGetByPathMethod,
    index_filterEventsByAddress as filterEventsByAddress,
    index_getAbiEvents as getAbiEvents,
    index_getEmittedEvents as getEmittedEvents,
    index_isAbiEvent as isAbiEvent,
    index_parseEvents as parseEvents,
  };
}

declare function toOutsideCallV2(call: OutsideCallV1 | OutsideCallV2): OutsideCallV2;
/**
 * Converts a Call object to an OutsideCall object that can be used for an Outside Execution.
 * @param {Call} call transaction to proceed.
 * @returns {OutsideCall} transaction formatted in conformity to SNIP-9
 * @example
 * ```typescript
 * const call1: Call = {
 *    contractAddress: '0x0123',
 *    entrypoint: 'transfer',
 *    calldata: { recipient: '0xabcd', amount: cairo.uint256(10) },
 *  };
 *  const result = outsideExecution.getOutsideCall(call1);
 *  // result = {
 *  //  to: '0x0123',
 *  //  selector: getSelectorFromName(call1.entrypoint),
 *  //  calldata: ['43981', '10', '0'],
 *  //}
 * ```
 */
declare function getOutsideCall(call: Call): OutsideCall;
/**
 * Build a TypedData message that will be used for an Outside execution.
 * @param {string} chainId  The encoded string of the name of network.
 * @param {OutsideExecutionOptions} options Parameters related to an Outside Execution.
 * @param {BigNumberish} nonce Outside execution nonce (not to confuse with normal transaction nonce).
 * @param {Call[]} myCalls transaction(s) to proceed.
 * @param {OutsideExecutionVersion} version SNIP-9 V1 or V2.
 * @returns {TypedData} SNIP-12 message conform to SNIP-9.
 * @example
 * ```typescript
 * const callOptions: OutsideExecutionOptions = {
 *    caller: '0x1234',
 *    execute_after: 100,
 *    execute_before: 200,
 *  };
 *  const result: TypedData = outsideExecution.getTypedData(
 *    constants.StarknetChainId.SN_SEPOLIA,
 *    callOptions,
 *    21,
 *    [call1],
 *    EOutsideExecutionVersion.V2
 *  );
 *  // result = {
 *  //  domain: {
 *  //    chainId: '0x534e5f5345504f4c4941',
 *  //    name: 'Account.execute_from_outside',
 *  //    revision: '1',
 *  //    version: '2',
 *  //  },
 *  //  message: {
 *  //    Caller: '0x1234',
 *  //  ...
 * ```
 */
declare function getTypedData(
  chainId: string,
  options: OutsideExecutionOptions,
  nonce: BigNumberish,
  myCalls: Call[],
  version: OutsideExecutionVersion
): TypedData;
/**
 * Builds a Calldata for the execute_from_outside() entrypoint.
 * @param {OutsideTransaction} outsideTransaction an object that contains all the data for a Outside Execution.
 * @returns {Calldata} The Calldata related to this Outside transaction
 * @example
 * ```typescript
 * const outsideTransaction: OutsideTransaction = {
 *     outsideExecution: {
 *      caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 *      nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
 *      execute_after: 500, execute_before: 600,
 *      calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
 *    },
 *    signature: ['0x123', '0x456'],
 *    signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
 *    version: EOutsideExecutionVersion.V2,
 *  };
 *
 *  const result: Calldata = outsideExecution.buildExecuteFromOutsideCallData(outsideTransaction);
 * // result =      ['2846891009026995430665703316224827616914889274105712248413538305735679628945',
 * //   '3534941323322368687588030484849371698982661160919690922146419787802417549486',
 * //   '500', '600', '1', '1656', '2192', '2', '12', '13', '2', '291', '1110']
 * ```
 */
declare function buildExecuteFromOutsideCallData(outsideTransaction: OutsideTransaction): Calldata;
/**
 * Builds a Call for execute(), estimateFee() and simulateTransaction() functions.
 * @param {AllowArray<OutsideTransaction>} outsideTransaction an object that contains all the data for an Outside Execution.
 * @returns {Call[]} The Call related to this Outside transaction
 * @example
 * ```typescript
 * const outsideTransaction: OutsideTransaction = {
 *     outsideExecution: {
 *      caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 *      nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
 *      execute_after: 500, execute_before: 600,
 *      calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
 *    },
 *    signature: ['0x123', '0x456'],
 *    signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
 *    version: EOutsideExecutionVersion.V2,
 *  };
 *
 *  const result: Call[] = outsideExecution.buildExecuteFromOutsideCall(outsideTransaction);
 * // result = [{contractAddress: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 * //   entrypoint: 'execute_from_outside_v2',
 * //   calldata: [ ... ],
 * // }]
 * ```
 */
declare function buildExecuteFromOutsideCall(
  outsideTransaction: AllowArray<OutsideTransaction>
): Call[];

declare const outsideExecution_buildExecuteFromOutsideCall: typeof buildExecuteFromOutsideCall;
declare const outsideExecution_buildExecuteFromOutsideCallData: typeof buildExecuteFromOutsideCallData;
declare const outsideExecution_getOutsideCall: typeof getOutsideCall;
declare const outsideExecution_getTypedData: typeof getTypedData;
declare const outsideExecution_toOutsideCallV2: typeof toOutsideCallV2;
declare namespace outsideExecution {
  export {
    outsideExecution_buildExecuteFromOutsideCall as buildExecuteFromOutsideCall,
    outsideExecution_buildExecuteFromOutsideCallData as buildExecuteFromOutsideCallData,
    outsideExecution_getOutsideCall as getOutsideCall,
    outsideExecution_getTypedData as getTypedData,
    outsideExecution_toOutsideCallV2 as toOutsideCallV2,
  };
}

/**
 * Implementation of ERC165 introspection.
 * Verify if a contract has implemented some standard functionalities.
 * @param {RpcProvider} provider the provider to access to Starknet.
 * @param {BigNumberish} contractAddress the address of the contract to check.
 * @param {BigNumberish} interfaceId the hash of the functionality to check.
 * @returns {boolean} true if the interfaceId is implemented in this contract.
 * @example
 * ```typescript
 * const snip9InterfaceV2Id = constants.SNIP9_V2_INTERFACE_ID;
 * const result = src5.supportsInterface(myProvider, accountContractAddress, snip9InterfaceV2Id);
 * // result = true
 * ```
 */
declare function supportsInterface(
  provider: RpcProvider,
  contractAddress: BigNumberish,
  interfaceId: BigNumberish
): Promise<boolean>;

declare const src5_supportsInterface: typeof supportsInterface;
declare namespace src5 {
  export { src5_supportsInterface as supportsInterface };
}

/**
 * Check if the given transaction details is a V3 transaction.
 *
 * @param {InvocationsDetailsWithNonce} details The transaction details to be checked.
 * @return {boolean} Returns true if the transaction is a V3 transaction, otherwise false.
 * @example
 * ```typescript
 * const invocation: InvocationsDetailsWithNonce = {
 *   nonce: 1,
 *   version: 3,
 *   maxFee: 10 ** 15,
 *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
 *   tip: 10 ** 13,
 *   paymasterData: [],
 *   resourceBounds: {
 *       l1_gas: { max_amount: num.toHex(10 ** 14), max_price_per_unit: num.toHex(50) },
 *       l2_gas: { max_amount: num.toHex(0), max_price_per_unit: num.toHex(0) }}};
 * const result = provider.isV3Tx(invocation);
 * // result = true
 * ```
 */
declare function isV3Tx(details: InvocationsDetailsWithNonce): details is V3TransactionDetails;
/**
 * Determines if the provided version matches the specified version.
 * Version must be formatted "major.minor.patch" using dot delimiters.
 * Use wildcard * or unspecified to match 'any' value on the position.
 * ex. 7.3.* == 7.3.15, * == 1.1.1, 0.8 == 0.8.5. '' != 0.8.5
 *
 *
 * @param {string} expected version.
 * @param {string} provided to check against the expected version.
 * @returns {boolean} True if the response matches the version, false otherwise.
 * @example
 * ``` typescript
 * const result = provider.isVersion("0.9","0.9.0");
 * // result = true
 * ```
 */
declare function isVersion(expected: string, provided: string): boolean;
/**
 * Define if provided version is SDK supported rpc specification version
 */
declare function isSupportedSpecVersion(
  version: string,
  options?: {
    allowAnyPatchVersion: boolean;
  }
): version is _SupportedRpcVersion;
/**
 * Convert fixed version to any patch version.
 * ex. 0.8.1 -> 0.8.*
 */
declare function toAnyPatchVersion(version: string): string;
/**
 * Convert version to API format.
 * ex. '0.8.1' -> 'v0_8', '0.8' -> 'v0_8'
 * @param {string} version
 * @returns {string}
 */
declare function toApiVersion(version: string): string;
/**
 * Compare two semantic version strings segment by segment.
 * This function safely compares versions without collision risk between
 * versions like '0.0.1000' and '0.1.0'.
 *
 * @param {string} a First version string (e.g., '0.0.9')
 * @param {string} b Second version string (e.g., '0.0.10')
 * @returns {number} -1 if a < b, 0 if a === b, 1 if a > b
 * @example
 * ```typescript
 * const result1 = compareVersions('0.0.9', '0.0.10');
 * // result1 = -1 (0.0.9 < 0.0.10)
 *
 * const result2 = compareVersions('0.1.0', '0.0.1000');
 * // result2 = 1 (0.1.0 > 0.0.1000, correctly different!)
 *
 * const result3 = compareVersions('1.2.3', '1.2.3');
 * // result3 = 0 (equal versions)
 *
 * // Usage for version checks:
 * if (compareVersions(specVersion, '0.14.1') >= 0) {
 *   // Use Blake2s hash for version >= 0.14.1
 * }
 * ```
 */
declare function compareVersions(a: string, b: string): number;
/**
 * Guard Pre Confirmed Block
 * @param {GetBlockResponse} response answer of myProvider.getBlock()
 * @return {boolean} true if block is the pre confirmed block
 * @example
 * ```typescript
 * const block = await myProvider.getBlock("pre_confirmed");
 * const result = provider.isPreConfirmedBlock(block);
 * // result = true
 * ```
 */
declare function isPreConfirmedBlock(response: GetBlockResponse): response is PreConfirmedBlock;
/**
 * Guard Pre Confirmed Transaction
 * @param {GetTransactionReceiptResponse} response transaction Receipt
 * @return {boolean} true if the transaction is part of the pre confirmed block
 * @example
 * ```typescript
 * const block = await myProvider.getBlockWithTxs("pre_confirmed");
 * const txR = await myProvider.getTransactionReceipt(block.transactions[0].transaction_hash);
 * const result = provider.isPreConfirmedTransaction(txR);
 * // result = true
 * ```
 */
declare function isPreConfirmedTransaction(response: GetTransactionReceiptResponse): boolean;
/**
 * Guard Pre Confirmed State Update
 * @param {StateUpdateResponse} response State of a block
 * @return {boolean} true if the block is pre confirmed
 * @example
 * ```typescript
 * const state: StateUpdateResponse = await myProvider.getStateUpdate("pre_confirmed");
 * const result = provider.isPreConfirmedStateUpdate(state);
 * // result = true
 * ```
 */
declare function isPreConfirmedStateUpdate(
  response: StateUpdateResponse
): response is PreConfirmedStateUpdate;

type BatchClientOptions<
  T extends {
    [key: string]: {
      params?: any;
      result?: any;
    };
  },
> = {
  nodeUrl: string;
  headers: object;
  interval: number;
  baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;
  rpcMethods: T;
};
declare class BatchClient<
  T extends {
    [key: string]: {
      params?: any;
      result?: any;
    };
  },
> {
  nodeUrl: string;
  headers: object;
  interval: number;
  requestId: number;
  private pendingRequests;
  private batchPromises;
  private delayTimer?;
  private delayPromise?;
  private delayPromiseResolve?;
  private baseFetch;
  private rpcMethods;
  constructor(options: BatchClientOptions<T>);
  private wait;
  private addPendingRequest;
  private sendBatch;
  /**
   * Automatically batches and fetches JSON-RPC calls in a single request.
   * @param method Method to call
   * @param params Method parameters
   * @param id JSON-RPC Request ID
   * @returns JSON-RPC Response
   */
  fetch<
    M extends keyof T,
    TResponse extends ResponseBody & {
      result?: T[M]['result'];
      error?: Error$1;
    },
  >(method: M, params?: T[M]['params'], id?: string | number): Promise<TResponse>;
}

/**
 * Singular class handling cairo u256 data type
 */

declare const UINT_128_MAX: bigint;
declare const UINT_256_MAX: bigint;
declare const UINT_256_MIN = 0n;
declare const UINT_256_LOW_MAX = 340282366920938463463374607431768211455n;
declare const UINT_256_HIGH_MAX = 340282366920938463463374607431768211455n;
declare const UINT_256_LOW_MIN = 0n;
declare const UINT_256_HIGH_MIN = 0n;
declare class CairoUint256 {
  low: bigint;
  high: bigint;
  static abiSelector: 'core::integer::u256';
  /**
   * Default constructor (Lib usage)
   */
  constructor(data: BigNumberish | Uint256 | unknown);
  /**
   * Direct props initialization (Api response)
   */
  constructor(low: BigNumberish, high: BigNumberish);
  /**
   * Validate if BigNumberish can be represented as Unit256
   */
  static validate(bigNumberish: BigNumberish | unknown): bigint;
  /**
   * Validate if low and high can be represented as Unit256
   */
  static validateProps(
    low: BigNumberish,
    high: BigNumberish
  ): {
    low: bigint;
    high: bigint;
  };
  /**
   * Check if BigNumberish can be represented as Unit256
   */
  static is(bigNumberish: BigNumberish | unknown): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): abiType is 'core::integer::u256';
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint256;
  /**
   * Return bigint representation
   */
  toBigInt(): bigint;
  /**
   * Return Uint256 structure with HexString props
   * {low: HexString, high: HexString}
   */
  toUint256HexString(): {
    low: string;
    high: string;
  };
  /**
   * Return Uint256 structure with DecimalString props
   * {low: DecString, high: DecString}
   */
  toUint256DecimalString(): {
    low: string;
    high: string;
  };
  /**
   * Return api requests representation witch is felt array
   */
  toApiRequest(): string[];
}

declare class CairoFixedArray {
  /**
   * JS array representing a Cairo fixed array.
   */
  readonly content: any[];
  /**
   * Cairo fixed array type.
   */
  readonly arrayType: string;
  private static parseFixedArrayType;
  /**
   * Create an instance representing a Cairo fixed Array.
   * @param {any[]} content JS array representing a Cairo fixed array.
   * @param {string} arrayType Cairo fixed array type.
   */
  constructor(content: any[], arrayType: string);
  /**
   * Retrieves the array size from the given type string representing a Cairo fixed array.
   * @param {string} type - The Cairo fixed array type.
   * @returns {number} The array size.
   * @example
   * ```typescript
   * const result = CairoFixedArray.getFixedArraySize("[core::integer::u32; 8]");
   * // result = 8
   * ```
   */
  static getFixedArraySize(type: string): number;
  /**
   * Retrieves the Cairo fixed array size from the CairoFixedArray instance.
   * @returns {number} The fixed array size.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.getFixedArraySize();
   * // result = 3
   * ```
   */
  getFixedArraySize(): number;
  /**
   * Retrieve the Cairo content type from a Cairo fixed array type.
   * @param {string} type - The type string.
   * @returns {string} The fixed-array type.
   * @example
   * ```typescript
   * const result = CairoFixedArray.getFixedArrayType("[core::integer::u32; 8]");
   * // result = "core::integer::u32"
   * ```
   */
  static getFixedArrayType: (type: string) => string;
  /**
   * Retrieve the Cairo content type of the Cairo fixed array.
   * @returns {string} The fixed-array content type.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.getFixedArrayType();
   * // result = "core::integer::u32"
   * ```
   */
  getFixedArrayType(): string;
  /**
   * Create an object from a Cairo fixed array.
   * Be sure to have an array length conform to the ABI.
   * To be used with CallData.compile().
   * @param {Array<any>} input JS array representing a Cairo fixed array.
   * @returns {Object} a specific struct representing a fixed Array.
   * @example
   * ```typescript
   * const result = CairoFixedArray.compile([10,20,30]);
   * // result = { '0': 10, '1': 20, '2': 30 }
   * ```
   */
  static compile(input: Array<any>): Object;
  /**
   * Generate an object from the Cairo fixed array instance.
   * To be used with CallData.compile().
   * @returns a specific struct representing a fixed array.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.compile();
   * // result = { '0': 10, '1': 20, '2': 30 }
   * ```
   */
  compile(): Object;
  /**
   * Checks if the given Cairo type is a fixed-array type.
   * structure: [string; number]
   *
   * @param {string} type - The type to check.
   * @returns - `true` if the type is a fixed array type, `false` otherwise.
   * ```typescript
   * const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
   * // result = true
   */
  static isTypeFixedArray(type: string): boolean;
}

declare class CairoBytes31 {
  static MAX_BYTE_SIZE: 31;
  data: Uint8Array;
  static abiSelector: 'core::bytes_31::bytes31';
  constructor(data: string | Uint8Array | Buffer | unknown);
  static __processData(data: Uint8Array | string | Buffer | unknown): Uint8Array;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  /**
   * @param padded flag for including leading zeros
   */
  toHexString(padded?: 'padded'): string;
  static validate(data: Uint8Array | string | Buffer | unknown): void;
  static is(data: Uint8Array | string | Buffer): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoBytes31;
}

/**
 * felt252 is the basic field element used in Cairo.
 * It corresponds to an integer in the range 0 ≤ x < P where P is a very large prime number currently equal to 2^251 + 17⋅2^192 + 1.
 * Any operation that uses felt252 will be computed modulo P.
 * 63 hex symbols (31 bytes + 4 bits), 252 bits
 */
declare class CairoFelt252 {
  /**
   * byte representation of the felt252
   */
  data: Uint8Array;
  static abiSelector: 'core::felt252';
  constructor(data: BigNumberish | boolean | unknown);
  static __processData(data: BigNumberish | boolean): Uint8Array;
  toBigInt(): bigint;
  decodeUtf8(): string;
  toHexString(): string;
  toApiRequest(): string[];
  static assertRange(val: bigint): void;
  static validate(data: BigNumberish | boolean | unknown): void;
  static is(data: BigNumberish | boolean | unknown): boolean;
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoFelt252;
}
/**
 * @deprecated use the CairoFelt252 class instead, this one is limited to ASCII strings
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
 */
declare function CairoFelt(it: BigNumberish): string;

declare class CairoUint32 {
  data: bigint;
  static abiSelector: string;
  constructor(data: BigNumberish);
  static __processData(data: BigNumberish): bigint;
  toApiRequest(): string[];
  toBigInt(): bigint;
  decodeUtf8(): string;
  toHexString(): string;
  static validate(data: BigNumberish): void;
  static is(data: BigNumberish): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoUint32;
}

declare class CairoByteArray {
  /**
   * entire dataset
   */
  data: CairoBytes31[];
  /**
   * cairo specific implementation helper
   */
  pending_word: CairoFelt252;
  /**
   * cairo specific implementation helper
   */
  pending_word_len: CairoUint32;
  static abiSelector: 'core::byte_array::ByteArray';
  /**
   * byteArray from typed components
   */
  constructor(data: CairoBytes31[], pendingWord: CairoFelt252, pendingWordLen: CairoUint32);
  constructor(data: BigNumberish | Buffer | Uint8Array | unknown);
  static __processData(inData: BigNumberish | Buffer | Uint8Array | unknown): {
    data: CairoBytes31[];
    pending_word: CairoFelt252;
    pending_word_len: CairoUint32;
  };
  toApiRequest(): string[];
  decodeUtf8(): string;
  toBigInt(): bigint;
  toHexString(): string;
  toBuffer(): any;
  /**
   * Compute the Pedersen hash of this ByteArray, following OpenZeppelin's `hash_byte_array` algorithm.
   *
   * Serializes the ByteArray to its felt252 components (data array length, each data chunk,
   * pending_word, pending_word_len), then chains Pedersen hash over all elements starting
   * from 0, and finalizes with the total element count.
   *
   * @returns {string} hex-string felt252 Pedersen hash of the ByteArray
   * @example
   * ```typescript
   * const ba = new CairoByteArray('Hello');
   * const result = ba.hash();
   * // result = 0x15d19ad651ffaf8e90a13938db2081fa3ff01de0712e00cbe69891bace66c51
   * ```
   */
  hash(): string;
  /**
   * returns an array of all the data chunks and the pending word
   * when concatenated, represents the original bytes sequence
   */
  toElements(): Uint8Array[];
  /**
   * Private helper to check if the CairoByteArray is properly initialized
   */
  private assertInitialized;
  static validate(data: Uint8Array | Buffer | BigNumberish | unknown): void;
  /**
   * Check if the provided data is a valid CairoByteArray
   *
   * @param data - The data to check
   * @returns True if the data is a valid CairoByteArray, false otherwise
   */
  static is(data: any): boolean;
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean;
  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoByteArray;
}

/**
 * Format a hex number to '0x' and 64 characters, adding leading zeros if necessary.
 *
 * @param {BigNumberish} address
 * @returns {string} Hex string: 0x followed by 64 characters. No upper case characters in the response.
 * @example
 * ```typescript
 * const result = [31, 0x1f, '31', '0x1f', '0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf'].map(addAddressPadding);
 * // result = [
 * //   '0x000000000000000000000000000000000000000000000000000000000000001f',
 * //   '0x000000000000000000000000000000000000000000000000000000000000001f',
 * //   '0x0000000000000000000000000000000000000000000000000000000000000031',
 * //   '0x000000000000000000000000000000000000000000000000000000000000001f',
 * //   '0x0000090591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf'
 * // ]
 * ```
 */
declare function addAddressPadding(address: BigNumberish): string;
/**
 * Check the validity of a Starknet address, and format it as a hex number: '0x' and 64 characters, adding leading zeros if necessary.
 *
 * @param {BigNumberish} address
 * @returns {string} Hex string: 0x followed by 64 characters. No upper case characters in the response.
 * @throws address argument must be a valid address inside the address range bound
 * @example
 * ```typescript
 * const result = [31, 0x1f, '31', '0x1f', '0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf'].map(addAddressPadding);
 * // result = [
 * //   '0x000000000000000000000000000000000000000000000000000000000000001f',
 * //   '0x000000000000000000000000000000000000000000000000000000000000001f',
 * //   '0x0000000000000000000000000000000000000000000000000000000000000031',
 * //   '0x000000000000000000000000000000000000000000000000000000000000001f',
 * //   '0x0000090591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf'
 * // ]
 * ```
 */
declare function validateAndParseAddress(address: BigNumberish): string;
/**
 * Convert an address to her checksum representation which uses a specific pattern of uppercase and lowercase letters within
 * a given address to reduce the risk of errors introduced from typing an address or cut and paste issues.
 * @param {BigNumberish} address
 * @returns {string} Hex string : 0x followed by 64 characters. Mix of uppercase and lowercase
 * @example
 * ```typescript
 * const address = "0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf";
 * const result = getChecksumAddress(address);
 * // result = "0x0000090591D9fA3EfC87067d95a643f8455E0b8190eb8Cb7bFd39e4fb7571fDF"
 * ```
 */
declare function getChecksumAddress(address: BigNumberish): string;
/**
 * If the casing of an address is mixed, it is a Checksum Address, which uses a specific pattern of uppercase and lowercase letters within
 * a given address to reduce the risk of errors introduced from typing an address or cut and paste issues.
 *
 * @param address string
 * @returns true if the ChecksumAddress is valid
 * @example
 * ```typescript
 * const address = "0x0000090591D9fA3EfC87067d95a643f8455E0b8190eb8Cb7bFd39e4fb7571fDF";
 * const result = validateChecksumAddress(address);
 * // result = true
 * ```
 */
declare function validateChecksumAddress(address: string): boolean;

/**
 * Checks if the given name ends with "_len".
 *
 * @param {string} name - The name to be checked.
 * @returns - True if the name ends with "_len", false otherwise.
 */
declare const isLen: (name: string) => boolean;
/**
 * Checks if a given type is felt.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type is felt, false otherwise.
 */
declare const isTypeFelt: (type: string) => type is 'felt' | 'core::felt252';
/**
 * Checks if the given type is an array type.
 *
 * @param {string} type - The type to check.
 * @returns - `true` if the type is an array type, `false` otherwise.
 */
declare const isTypeArray: (type: string) => boolean;
/**
 * Checks if the given type is a tuple type.
 *
 * @param {string} type - The type to be checked.
 * @returns - `true` if the type is a tuple type, otherwise `false`.
 */
declare const isTypeTuple: (type: string) => boolean;
/**
 * Checks whether a given type is a named tuple.
 *
 * @param {string} type - The type to be checked.
 * @returns - True if the type is a named tuple, false otherwise.
 */
declare const isTypeNamedTuple: (type: string) => boolean;
/**
 * Checks if a given type is a struct.
 *
 * @param {string} type - The type to check for existence.
 * @param {AbiStructs} structs - The collection of structs to search in.
 * @returns - True if the type exists in the structs, false otherwise.
 */
declare const isTypeStruct: (type: string, structs: AbiStructs) => boolean;
/**
 * Checks if a given type is an enum.
 *
 * @param {string} type - The type to check.
 * @param {AbiEnums} enums - The enumeration to search in.
 * @returns - True if the type exists in the enumeration, otherwise false.
 */
declare const isTypeEnum: (type: string, enums: AbiEnums) => boolean;
/**
 * Determines if the given type is an Option type.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type is an Option type, false otherwise.
 */
declare const isTypeOption: (type: string) => boolean;
/**
 * Checks whether a given type starts with 'core::result::Result::'.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type starts with 'core::result::Result::', false otherwise.
 */
declare const isTypeResult: (type: string) => boolean;
/**
 * Checks if the given value is a valid Uint type.
 *
 * @param {string} type - The value to check.
 * @returns - Returns true if the value is a valid Uint type, otherwise false.
 */
declare const isTypeUint: (type: string) => boolean;
/**
 * Checks if the given value is a valid Int type.
 *
 * @param {string} type - The value to check.
 * @returns - Returns true if the value is a valid Int type, otherwise false.
 */
declare const isTypeInt: (type: string) => boolean;
/**
 * Checks if the given type is `uint256`.
 *
 * @param {string} type - The type to be checked.
 * @returns - Returns true if the type is `uint256`, otherwise false.
 */
declare const isTypeUint256: (type: string) => type is 'core::integer::u256';
/**
 * Checks if the given type is a literal type.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type is a literal type, false otherwise.
 */
declare const isTypeLiteral: (type: string) => boolean;
/**
 * Checks if the given type is a boolean type.
 *
 * @param {string} type - The type to be checked.
 * @returns - Returns true if the type is a boolean type, otherwise false.
 */
declare const isTypeBool: (type: string) => type is 'core::bool';
/**
 * Checks if the provided type is equal to 'core::starknet::contract_address::ContractAddress'.
 * @param {string} type - The type to be checked.
 * @returns - true if the type matches 'core::starknet::contract_address::ContractAddress', false otherwise.
 */
declare const isTypeContractAddress: (
  type: string
) => type is 'core::starknet::contract_address::ContractAddress';
/**
 * Determines if the given type is an Ethereum address type.
 *
 * @param {string} type - The type to check.
 * @returns - Returns true if the given type is 'core::starknet::eth_address::EthAddress', otherwise false.
 */
declare const isTypeEthAddress: (type: string) => type is 'core::starknet::eth_address::EthAddress';
/**
 * Checks if the given type is equal to the u96 type
 *
 * @param {string} type - The type to check.
 * @returns - True if the given type is equal to u96, false otherwise.
 */
declare const isTypeU96: (
  type: string
) => type is 'core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>';
declare const isTypeSecp256k1Point: (
  type: string
) => type is 'core::starknet::secp256k1::Secp256k1Point';
declare const isCairo1Type: (type: string) => boolean;
/**
 * Retrieves the array type from the given type string.
 *
 * Works also for core::zeroable::NonZero type.
 * @param {string} type - The type string.
 * @returns - The array type.
 */
declare const getArrayType: (type: string) => string;
/**
 * Test if an ABI comes from a Cairo 1 contract
 * @param abi representing the interface of a Cairo contract
 * @returns TRUE if it is an ABI from a Cairo1 contract
 * @example
 * ```typescript
 * const isCairo1: boolean = isCairo1Abi(myAbi: Abi);
 * ```
 */
declare function isCairo1Abi(abi: Abi): boolean;
/**
 * Checks if the given type is a NonZero type.
 *
 * @param {string} type The type to check.
 * @returns `true` if the type is NonZero type, `false` otherwise.
 * @example
 * ```typescript
 * const result = cairo.isTypeNonZero("core::zeroable::NonZero::<u8>");
 * //result = true
 * ```
 */
declare function isTypeNonZero(type: string): boolean;
/**
 * Return ContractVersion (Abi version) based on Abi
 * or undefined for unknown version
 * @param abi
 * @returns string
 */
declare function getAbiContractVersion(abi: Abi): ContractVersion;
/**
 * named tuple cairo type is described as js object {}
 * struct cairo type are described as js object {}
 * array cairo type are described as js array []
 */
/**
 * Create Uint256 Cairo type (helper for common struct type)
 * @example
 * ```typescript
 * uint256('892349863487563453485768723498');
 * ```
 */
declare const uint256: (it: BigNumberish) => Uint256;
/**
 * Create Uint512 Cairo type (helper for common struct type)
 * @param it BigNumberish representation of a 512 bits unsigned number
 * @returns Uint512 struct
 * @example
 * ```typescript
 * uint512('345745685892349863487563453485768723498');
 * ```
 */
declare const uint512: (it: BigNumberish) => Uint512;
/**
 * Create unnamed tuple Cairo type (helper same as common struct type)
 * @example
 * ```typescript
 * tuple(1, '0x101', 16);
 * ```
 */
declare const tuple: (
  ...args: (BigNumberish | object | boolean)[]
) => Record<number, BigNumberish | object | boolean>;
/**
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
 */
declare function felt(it: BigNumberish): string;

declare const cairo_felt: typeof felt;
declare const cairo_getAbiContractVersion: typeof getAbiContractVersion;
declare const cairo_getArrayType: typeof getArrayType;
declare const cairo_isCairo1Abi: typeof isCairo1Abi;
declare const cairo_isCairo1Type: typeof isCairo1Type;
declare const cairo_isLen: typeof isLen;
declare const cairo_isTypeArray: typeof isTypeArray;
declare const cairo_isTypeBool: typeof isTypeBool;
declare const cairo_isTypeContractAddress: typeof isTypeContractAddress;
declare const cairo_isTypeEnum: typeof isTypeEnum;
declare const cairo_isTypeEthAddress: typeof isTypeEthAddress;
declare const cairo_isTypeFelt: typeof isTypeFelt;
declare const cairo_isTypeInt: typeof isTypeInt;
declare const cairo_isTypeLiteral: typeof isTypeLiteral;
declare const cairo_isTypeNamedTuple: typeof isTypeNamedTuple;
declare const cairo_isTypeNonZero: typeof isTypeNonZero;
declare const cairo_isTypeOption: typeof isTypeOption;
declare const cairo_isTypeResult: typeof isTypeResult;
declare const cairo_isTypeSecp256k1Point: typeof isTypeSecp256k1Point;
declare const cairo_isTypeStruct: typeof isTypeStruct;
declare const cairo_isTypeTuple: typeof isTypeTuple;
declare const cairo_isTypeU96: typeof isTypeU96;
declare const cairo_isTypeUint: typeof isTypeUint;
declare const cairo_isTypeUint256: typeof isTypeUint256;
declare const cairo_tuple: typeof tuple;
declare const cairo_uint256: typeof uint256;
declare const cairo_uint512: typeof uint512;
declare namespace cairo {
  export {
    cairo_felt as felt,
    cairo_getAbiContractVersion as getAbiContractVersion,
    cairo_getArrayType as getArrayType,
    cairo_isCairo1Abi as isCairo1Abi,
    cairo_isCairo1Type as isCairo1Type,
    cairo_isLen as isLen,
    cairo_isTypeArray as isTypeArray,
    cairo_isTypeBool as isTypeBool,
    cairo_isTypeContractAddress as isTypeContractAddress,
    cairo_isTypeEnum as isTypeEnum,
    cairo_isTypeEthAddress as isTypeEthAddress,
    cairo_isTypeFelt as isTypeFelt,
    cairo_isTypeInt as isTypeInt,
    cairo_isTypeLiteral as isTypeLiteral,
    cairo_isTypeNamedTuple as isTypeNamedTuple,
    cairo_isTypeNonZero as isTypeNonZero,
    cairo_isTypeOption as isTypeOption,
    cairo_isTypeResult as isTypeResult,
    cairo_isTypeSecp256k1Point as isTypeSecp256k1Point,
    cairo_isTypeStruct as isTypeStruct,
    cairo_isTypeTuple as isTypeTuple,
    cairo_isTypeU96 as isTypeU96,
    cairo_isTypeUint as isTypeUint,
    cairo_isTypeUint256 as isTypeUint256,
    cairo_tuple as tuple,
    cairo_uint256 as uint256,
    cairo_uint512 as uint512,
  };
}

/**
 * convert a Cairo ByteArray to a JS string
 * @param myByteArray Cairo representation of a LongString
 * @returns a JS string
 * @example
 * ```typescript
 * const myByteArray = {
 *    data: [],
 *    pending_word: '0x414243444546474849',
 *    pending_word_len: 9
 * }
 * const result: String = stringFromByteArray(myByteArray); // ABCDEFGHI
 * ```
 */
declare function stringFromByteArray(myByteArray: ByteArray): string;
/**
 * convert a JS string to a Cairo ByteArray
 * @param targetString a JS string
 * @returns Cairo representation of a LongString
 * @example
 * ```typescript
 * const myByteArray: ByteArray = byteArrayFromString("ABCDEFGHI");
 * ```
 * Result is :
 * {
 *    data: [],
 *    pending_word: '0x414243444546474849',
 *    pending_word_len: 9
 * }
 */
declare function byteArrayFromString(targetString: string): ByteArray;

declare const byteArray_byteArrayFromString: typeof byteArrayFromString;
declare const byteArray_stringFromByteArray: typeof stringFromByteArray;
declare namespace byteArray {
  export {
    byteArray_byteArrayFromString as byteArrayFromString,
    byteArray_stringFromByteArray as stringFromByteArray,
  };
}

/**
 * Parse one field of the calldata by using input field from the abi for that method
 *
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 *
 * @example
 * const abiEntry = { name: 'test', type: 'struct' };
 * const abiStructs: AbiStructs = {
 *  struct: {
 *    members: [
 *        {
 *          name: 'test_name',
 *          type: 'test_type',
 *          offset: 1,
 *        },
 *    ],
 *    size: 2,
 *    name: 'cairo__struct',
 *    type: 'struct',
 *   },
 * };
 *
 * const abiEnums: AbiEnums = {
 *   enum: {
 *     variants: [
 *       {
 *         name: 'test_name',
 *         type: 'cairo_struct_variant',
 *         offset: 1,
 *       },
 *     ],
 *     size: 2,
 *     name: 'test_cairo',
 *     type: 'enum',
 *   },
 * };
 *
 * const args = [{ test_name: 'test' }];
 * const argsIterator = args[Symbol.iterator]();
 * const parsedField = parseCalldataField(
 *   argsIterator,
 *   abiEntry,
 *   abiStructs,
 *   abiEnums
 * );
 * // parsedField === ['1952805748']
 */
declare function parseCalldataField({
  argsIterator,
  input,
  structs,
  enums,
  parser,
}: {
  /** Iterator for value of the field */
  argsIterator: Iterator<any>;
  /** input(field) information from the abi that will be used to parse the data */
  input: AbiEntry;
  /** structs from abi */
  structs: AbiStructs;
  /** enums from abi */
  enums: AbiEnums;
  /** parser used to serialize the value */
  parser: AbiParserInterface;
}): string | string[];

declare class CallData {
  abi: Abi;
  parser: AbiParserInterface;
  protected readonly structs: AbiStructs;
  protected readonly enums: AbiEnums;
  constructor(abi: Abi, parsingStrategy?: ParsingStrategy);
  /**
   * Validate arguments passed to the method as corresponding to the ones in the abi
   * @param type ValidateType - type of the method
   * @param method string - name of the method
   * @param args ArgsOrCalldata - arguments that are passed to the method
   */
  validate(type: ValidateType, method: string, args?: ArgsOrCalldata): void;
  /**
   * Compile contract callData with abi
   * Parse the calldata by using input fields from the abi for that method
   * @param method string - method name
   * @param argsCalldata RawArgs - arguments passed to the method. Can be an array of arguments (in the order of abi definition), or an object constructed in conformity with abi (in this case, the parameter can be in a wrong order).
   * @return Calldata - parsed arguments in format that contract is expecting
   * @example
   * ```typescript
   * const calldata = myCallData.compile("constructor", ["0x34a", [1, 3n]]);
   * ```
   * ```typescript
   * const calldata2 = myCallData.compile("constructor", {list:[1, 3n], balance:"0x34"}); // wrong order is valid
   * ```
   */
  compile(method: string, argsCalldata: RawArgs): Calldata;
  /**
   * Compile contract callData without abi
   * @param rawArgs RawArgs representing cairo method arguments or string array of compiled data
   * @returns Calldata
   */
  static compile(rawArgs: RawArgs): Calldata;
  /**
   * Parse elements of the response array and structuring them into response object
   * @param method string - method name
   * @param response string[] - response from the method
   * @return Result - parsed response corresponding to the abi
   */
  parse(method: string, response: string[]): CallResult;
  /**
   * Format cairo method response data to native js values based on provided format schema
   * @param method string - cairo method name
   * @param response string[] - cairo method response
   * @param format object - formatter object schema
   * @returns Result - parsed and formatted response object
   */
  format(method: string, response: string[], format: object): CallResult;
  /**
   * Helper to extract structs from abi
   * @param abi Abi
   * @returns AbiStructs - structs from abi
   */
  static getAbiStruct(abi: Abi): AbiStructs;
  /**
   * Helper to extract enums from abi
   * @param abi Abi
   * @returns AbiEnums - enums from abi
   */
  static getAbiEnum(abi: Abi): AbiEnums;
  /**
   * Helper: Compile HexCalldata | RawCalldata | RawArgs
   * @param rawCalldata HexCalldata | RawCalldata | RawArgs
   * @returns Calldata
   */
  static toCalldata(rawCalldata?: RawArgs): Calldata;
  /**
   * Helper: Convert raw to HexCalldata
   * @param raw HexCalldata | RawCalldata | RawArgs
   * @returns HexCalldata
   */
  static toHex(raw?: RawArgs): HexCalldata;
  /**
   * Parse the elements of a contract response and structure them into one or several Result.
   * In Cairo 0, arrays are not supported.
   * @param typeCairo string or string[] - Cairo type name, ex : "hello::hello::UserData"
   * @param response string[] - serialized data corresponding to typeCairo.
   * @return Result or Result[] - parsed response corresponding to typeData.
   * @example
   * const res2=helloCallData.decodeParameters("hello::hello::UserData",["0x123456","0x1"]);
   * result = { address: 1193046n, is_claimed: true }
   */
  decodeParameters(typeCairo: AllowArray<string>, response: string[]): AllowArray<CallResult>;
}

type LoadedContract =
  | {
      sierra: CompiledSierra;
      casm: CairoAssembly;
      compiler?: string;
      compiledClassHash?: never;
    }
  | {
      sierra: CompiledSierra;
      casm?: never;
      compiler?: string;
      compiledClassHash: string;
    };
/**
 * Helper function to check if filesystem access is available (Node.js environment)
 * @return {boolean} - Returns true if running in Node.js with fs module available
 */
declare function isFileSystemAvailable(): boolean;
/**
 * Loads a Cairo contract from filesystem (Node.js) or File object (browser).
 *
 * **Node.js usage:**
 * Accepts a directory path or a direct path to a .sierra.json or .casm file.
 * - If a directory is provided: searches for .sierra.json and .casm files
 * - If a file path is provided: loads that file and attempts to find the complementary file
 * - If compiledClassHash is provided: .casm file is optional
 * - If compiledClassHash is NOT provided: .casm file is required
 *
 * **Browser usage:**
 * Accepts a File object (from file input or drag-and-drop).
 * - Returns a Promise that resolves to LoadedContract
 * - Automatically detects .sierra.json and .casm files
 * - Can accept a single .sierra.json or .casm file, or multiple files
 * - If compiledClassHash is provided: .casm file is optional
 *
 * @param {string | File | File[]} contractPath - Path (Node.js) or File/File[] (browser)
 * @param {string} [compiledClassHash] - Optional compiled class hash. If provided, .casm file becomes optional
 * @return {LoadedContract | Promise<LoadedContract>} - Contract data (sync in Node.js, async in browser)
 * @throws {Error} - If no .sierra.json file is found, or if .casm is missing when compiledClassHash is not provided
 *
 * @example
 * ```typescript
 * // Node.js: Load from directory (requires .casm)
 * const contract = contractLoader('./contracts/my_contract');
 *
 * // Node.js: Load with compiledClassHash (no .casm needed)
 * const contract = contractLoader('./contracts/my_contract', '0x1234...');
 *
 * // Node.js: Load from .sierra.json file
 * const contract = contractLoader('./contracts/my_contract.sierra.json');
 *
 * // Browser: Load from file input
 * const fileInput = document.querySelector('input[type="file"]');
 * const contract = await contractLoader(fileInput.files[0]);
 *
 * // Browser: Load with compiledClassHash (no .casm needed)
 * const contract = await contractLoader(sierraFile, '0x1234...');
 * ```
 */
declare function contractLoader(contractPath: string, compiledClassHash?: string): LoadedContract;
declare function contractLoader(file: File, compiledClassHash?: string): Promise<LoadedContract>;
declare function contractLoader(files: File[], compiledClassHash?: string): Promise<LoadedContract>;

/**
 * Checks if a given contract is in Sierra (Safe Intermediate Representation) format.
 *
 * @param {CairoContract | string} contract - The contract to check. Can be either a CairoContract object or a string representation of the contract.
 * @return {boolean} - Returns true if the contract is a Sierra contract, otherwise false.
 * @example
 * ```typescript
 * const result = isSierra(contract);
 * // result = true | false
 * ```
 */
declare function isSierra(
  contract: CairoContract | string
): contract is SierraContractClass | CompiledSierra;
/**
 * Extracts contract hashes from `DeclareContractPayload`.
 *
 * @param {DeclareContractPayload} payload - The payload containing contract information.
 * @return {CompleteDeclareContractPayload} - The `CompleteDeclareContractPayload` with extracted contract hashes.
 * @throws {Error} - If extraction of compiledClassHash or classHash fails.
 * @example
 * ```typescript
 * const result = extractContractHashes(contract);
 * // result = {
 * //   contract: ...,
 * //   classHash: ...,
 * //   casm: ...,
 * //   compiledClassHash: ...,
 * // }
 * ```
 */
declare function extractContractHashes(
  payload: DeclareContractPayload,
  starknetVersion?: string
): CompleteDeclareContractPayload;
/**
 * Helper to redeclare response Cairo0 contract
 */
declare function contractClassResponseToLegacyCompiledContract(
  ccr: ContractClassResponse
): Promise<LegacyCompiledContract>;

/**
 * !! Main design decision:
 * Class can't extend GetTransactionReceiptResponse because it is union type
 * and it is not possible to extend union type in current typescript version
 * So we have to use factory function to create 'data' return type and inject constructor
 *
 * ERROR case left but in library flow it is not possible as fetch would throw on error before it could be read by Helper
 */
/**
 * @deprecated Use `createTransactionReceipt` instead
 * Utility that analyses transaction receipt response and provides helpers to process it
 * @example
 * ```typescript
 * const responseTx = new ReceiptTx(receipt);
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   reverted: (txR: RevertedTransactionReceiptResponse) => { },
 *   error: (err: Error) => { },
 * });
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   _: () => { },
 * }
 * ```
 */
declare class ReceiptTx {
  readonly statusReceipt: TransactionReceiptStatus;
  readonly value: TransactionReceiptValue;
  constructor(receipt: GetTxReceiptResponseWithoutHelper);
  match: (callbacks: TransactionReceiptCallbacks) => void;
  isSuccess: () => this is SuccessfulTransactionReceiptResponseHelper;
  isReverted: () => this is RevertedTransactionReceiptResponseHelper;
  isError: () => this is ErrorReceiptResponseHelper;
  static isSuccess(
    transactionReceipt: GetTxReceiptResponseWithoutHelper
  ): transactionReceipt is SuccessfulTransactionReceiptResponse;
  static isReverted(
    transactionReceipt: GetTxReceiptResponseWithoutHelper
  ): transactionReceipt is RevertedTransactionReceiptResponse;
}
/**
 * Creates a transaction receipt response object with helpers
 * @param receipt - The transaction receipt response from the provider
 * @returns A transaction receipt response object with helpers
 */
declare function createTransactionReceipt(
  receipt: GetTxReceiptResponseWithoutHelper
): GetTransactionReceiptResponse;

/**
 * Convert strk to fri or fri to strk
 * @example
 * ```typescript
 * units(1000n, 'fri') // '0.000000000000001' strk
 * units('1', 'strk') // '1000000000000000000' fri
 * ```
 */
declare function units(amount: string | bigint, simbol?: 'fri' | 'strk'): string;

/**
 * Request Permission for wallet account, return addresses that are allowed by user
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed
 * @returns allowed accounts addresses
 */
declare function requestAccounts$2(
  swo: StarknetWindowObject,
  silent_mode?: boolean
): Promise<Address$1[]>;
/**
 * Request Permission for wallet account
 * @returns allowed accounts addresses
 */
declare function getPermissions$2(swo: StarknetWindowObject): Promise<Permission[]>;
/**
 * Request adding ERC20 Token to Wallet List
 * @param asset WatchAssetParameters
 * @returns boolean
 */
declare function watchAsset$2(
  swo: StarknetWindowObject,
  asset: WatchAssetParameters
): Promise<boolean>;
/**
 * Request adding custom Starknet chain
 * @param chain AddStarknetChainParameters
 * @returns boolean
 */
declare function addStarknetChain$2(
  swo: StarknetWindowObject,
  chain: AddStarknetChainParameters
): Promise<boolean>;
/**
 * Request Wallet Network change
 * @param chainId StarknetChainId
 * @returns boolean
 */
declare function switchStarknetChain$2(
  swo: StarknetWindowObject,
  chainId: ChainId
): Promise<boolean>;
/**
 * Request the current chain ID from the wallet.
 * @returns The current Starknet chain ID.
 */
declare function requestChainId$2(swo: StarknetWindowObject): Promise<ChainId>;
/**
 * Get deployment data for a contract.
 * @returns The deployment data result.
 */
declare function deploymentData$2(swo: StarknetWindowObject): Promise<AccountDeploymentData>;
/**
 * Add an invoke transaction to the wallet.
 * @param params The parameters required for the invoke transaction.
 * @returns The result of adding the invoke transaction.
 */
declare function addInvokeTransaction$2(
  swo: StarknetWindowObject,
  params: AddInvokeTransactionParameters
): Promise<AddInvokeTransactionResult>;
/**
 * Add a declare transaction to the wallet.
 * @param params The parameters required for the declare transaction.
 * @returns The result of adding the declare transaction.
 */
declare function addDeclareTransaction$2(
  swo: StarknetWindowObject,
  params: AddDeclareTransactionParameters
): Promise<AddDeclareTransactionResult>;
/**
 * Sign typed data using the wallet.
 * @param swo the starknet (wallet) window object to request the signature.
 * @param typedData The typed data to sign.
 * @returns An array of signatures as strings.
 */
declare function signMessage$2(
  swo: StarknetWindowObject,
  typedData: TypedData
): Promise<Signature$1>;
/**
 * Get the list of supported specifications.
 * @returns An array of supported specification strings.
 */
declare function supportedSpecs$2(swo: StarknetWindowObject): Promise<SpecVersion[]>;
/**
 * Get the list of supported wallet API versions.
 * @returns An array of supported wallet API version strings.
 */
declare function supportedWalletApi$2(swo: StarknetWindowObject): Promise<API_VERSION$1[]>;
/**
 * Attaches an event handler function to the "accountsChanged" event of a StarknetWindowObject.
 * When the accounts are changed, the specified callback function will be called.
 *
 * @param {StarknetWindowObject} swo - The StarknetWindowObject to attach the event handler to.
 * @param {AccountChangeEventHandler} callback - The function to be called when the accounts are changed.
 *                                              It will receive the changed accounts as a parameter.
 * @returns {void}
 */
declare function onAccountChange(
  swo: StarknetWindowObject,
  callback: AccountChangeEventHandler
): void;
/**
 * Register a callback function to be called when the network is changed.
 *
 * @param {StarknetWindowObject} swo - The StarknetWindowObject instance.
 * @param {NetworkChangeEventHandler} callback - The callback function to be called when the network is changed.
 * @return {void}
 */
declare function onNetworkChanged(
  swo: StarknetWindowObject,
  callback: NetworkChangeEventHandler
): void;

declare const connect_onAccountChange: typeof onAccountChange;
declare const connect_onNetworkChanged: typeof onNetworkChanged;
declare namespace connect {
  export {
    addDeclareTransaction$2 as addDeclareTransaction,
    addInvokeTransaction$2 as addInvokeTransaction,
    addStarknetChain$2 as addStarknetChain,
    deploymentData$2 as deploymentData,
    getPermissions$2 as getPermissions,
    connect_onAccountChange as onAccountChange,
    connect_onNetworkChanged as onNetworkChanged,
    requestAccounts$2 as requestAccounts,
    requestChainId$2 as requestChainId,
    signMessage$2 as signMessage,
    supportedSpecs$2 as supportedSpecs,
    supportedWalletApi$2 as supportedWalletApi,
    switchStarknetChain$2 as switchStarknetChain,
    watchAsset$2 as watchAsset,
  };
}

/**
 * Connect the DApp to the wallet through the wallet-standard `standard:connect` feature.
 *
 * Besides authorizing the accounts, this primes the wallet-standard wrapper internal
 * state (its `#account`). This priming is mandatory: the wrapper only bridges the wallet
 * legacy `accountsChanged` / `networkChanged` events to the `standard:events` "change"
 * event (consumed by {@link subscribeWalletEvent}) once it has been connected this way.
 * Without it, account/network change events never reach the DApp.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed accounts.
 * @returns {StandardConnectOutput} the wallet-standard accounts the DApp is authorized to use.
 */
declare function standardConnect$1(
  walletWSF: WalletWithStarknetFeatures,
  silent_mode?: boolean
): Promise<StandardConnectOutput>;
/**
 * Request Permission for wallet account, return addresses that are allowed by user
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed
 * @returns {Address[]} allowed accounts addresses
 */
declare function requestAccounts$1(
  walletWSF: WalletWithStarknetFeatures,
  silent_mode?: boolean
): Promise<Address$2[]>;
/**
 * Request if DAPP is connected to wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {Permission[]} "accounts" if permission granted
 */
declare function getPermissions$1(walletWSF: WalletWithStarknetFeatures): Promise<Permission$1[]>;
/**
 * Request adding an ERC20 Token to the Wallet List
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {WatchAssetParameters} asset description of the token to add.
 * @returns {boolean} true if the token was added successfully
 */
declare function watchAsset$1(
  walletWSF: WalletWithStarknetFeatures,
  asset: WatchAssetParameters$1
): Promise<boolean>;
/**
 * Request adding custom Starknet chain
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {AddStarknetChainParameters} chain description of the chain to add.
 * @returns {boolean} true if the chain was added successfully
 */
declare function addStarknetChain$1(
  walletWSF: WalletWithStarknetFeatures,
  chain: AddStarknetChainParameters$1
): Promise<boolean>;
/**
 * Request Wallet Network change
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {ChainId} chainId encoded name of the chain requested.
 * @returns {boolean} true if the chain was changed successfully
 */
declare function switchStarknetChain$1(
  walletWSF: WalletWithStarknetFeatures,
  chainId: ChainId$1
): Promise<boolean>;
/**
 * Request the current chain ID from the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {ChainId} The current Starknet chain ID.
 */
declare function requestChainId$1(walletWSF: WalletWithStarknetFeatures): Promise<ChainId$1>;
/**
 * Get deployment data for a contract.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {AccountDeploymentData} The deployment data result.
 */
declare function deploymentData$1(
  walletWSF: WalletWithStarknetFeatures
): Promise<AccountDeploymentData$1>;
/**
 * Add an invoke transaction to the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {AddInvokeTransactionParameters} params The parameters required for the invoke transaction.
 * @returns {AddInvokeTransactionResult} The result of adding the invoke transaction.
 */
declare function addInvokeTransaction$1(
  walletWSF: WalletWithStarknetFeatures,
  params: AddInvokeTransactionParameters$1
): Promise<AddInvokeTransactionResult$1>;
/**
 * Add a declare transaction to the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {AddDeclareTransactionParameters} params The parameters required for the declare transaction.
 * @returns {AddDeclareTransactionResult} The result of adding the declare transaction.
 */
declare function addDeclareTransaction$1(
  walletWSF: WalletWithStarknetFeatures,
  params: AddDeclareTransactionParameters$1
): Promise<AddDeclareTransactionResult$1>;
/**
 * Sign typed data using the wallet.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {TypedData} typedData The typed data to sign.
 * @returns {Signature} An array of signatures as strings.
 */
declare function signMessage$1(
  walletWSF: WalletWithStarknetFeatures,
  typedData: TypedData$1
): Promise<Signature$2>;
/**
 * Get the list of supported Wallet API specifications.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {SpecVersion[]} An array of wallet API supported specification strings.
 */
declare function supportedSpecs$1(walletWSF: WalletWithStarknetFeatures): Promise<SpecVersion$1[]>;
/**
 * Get the list of supported wallet API versions.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @returns {API_VERSION[]} An array of supported wallet API version strings.
 */
declare function supportedWalletApi$1(
  walletWSF: WalletWithStarknetFeatures
): Promise<API_VERSION$2[]>;
/**
 * Attaches an event handler function for the changes of network and account.
 * When the account/network are changed, the specified callback function will be called.
 * @param {WalletWithStarknetFeatures} walletWSF - The get-starknet V5 wallet object to use.
 * @param {StandardEventsChangeProperties} callback - The function to be called when the account/network are changed.
 * @returns {() => void} function to execute to unsubscribe events.
 */
declare function subscribeWalletEvent$1(
  walletWSF: WalletWithStarknetFeatures,
  callback: (change: StandardEventsChangeProperties$1) => void
): () => void;

declare namespace connectV5 {
  export {
    addDeclareTransaction$1 as addDeclareTransaction,
    addInvokeTransaction$1 as addInvokeTransaction,
    addStarknetChain$1 as addStarknetChain,
    deploymentData$1 as deploymentData,
    getPermissions$1 as getPermissions,
    requestAccounts$1 as requestAccounts,
    requestChainId$1 as requestChainId,
    signMessage$1 as signMessage,
    standardConnect$1 as standardConnect,
    subscribeWalletEvent$1 as subscribeWalletEvent,
    supportedSpecs$1 as supportedSpecs,
    supportedWalletApi$1 as supportedWalletApi,
    switchStarknetChain$1 as switchStarknetChain,
    watchAsset$1 as watchAsset,
  };
}

/**
 * Connect the DApp to the wallet through the wallet-standard `standard:connect` feature.
 *
 * Besides authorizing the accounts, this primes the wallet-standard wrapper internal
 * state (its `#account`). This priming is mandatory: the wrapper only bridges the wallet
 * legacy `accountsChanged` / `networkChanged` events to the `standard:events` "change"
 * event (consumed by {@link subscribeWalletEvent}) once it has been connected this way.
 * Without it, account/network change events never reach the DApp.
 * @param {WalletWithStarknetFeaturesV6} walletWSF - The get-starknet V6 wallet object to use.
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed accounts.
 * @returns {StandardConnectOutput} the wallet-standard accounts the DApp is authorized to use.
 */
declare function standardConnect(
  walletWSF: WalletWithStarknetFeatures$1,
  silent_mode?: boolean
): Promise<StandardConnectOutput>;
declare function requestAccounts(
  walletWSF: WalletWithStarknetFeatures$1,
  silent_mode?: boolean
): Promise<Address[]>;
declare function getPermissions(walletWSF: WalletWithStarknetFeatures$1): Promise<Permission$2[]>;
declare function watchAsset(
  walletWSF: WalletWithStarknetFeatures$1,
  asset: WatchAssetParameters$2
): Promise<boolean>;
declare function addStarknetChain(
  walletWSF: WalletWithStarknetFeatures$1,
  chain: AddStarknetChainParameters$2
): Promise<boolean>;
declare function switchStarknetChain(
  walletWSF: WalletWithStarknetFeatures$1,
  chainId: ChainId$2,
  silent_mode?: boolean
): Promise<boolean>;
declare function requestChainId(walletWSF: WalletWithStarknetFeatures$1): Promise<ChainId$2>;
declare function deploymentData(
  walletWSF: WalletWithStarknetFeatures$1
): Promise<AccountDeploymentData$2>;
declare function addInvokeTransaction(
  walletWSF: WalletWithStarknetFeatures$1,
  params: AddInvokeTransactionParameters$2
): Promise<AddInvokeTransactionResult$2>;
declare function addDeclareTransaction(
  walletWSF: WalletWithStarknetFeatures$1,
  params: AddDeclareTransactionParameters$2
): Promise<AddDeclareTransactionResult$2>;
declare function signMessage(
  walletWSF: WalletWithStarknetFeatures$1,
  typedData: TypedData$2
): Promise<Signature$3>;
declare function supportedSpecs(walletWSF: WalletWithStarknetFeatures$1): Promise<SpecVersion$2[]>;
declare function supportedWalletApi(
  walletWSF: WalletWithStarknetFeatures$1
): Promise<API_VERSION$3[]>;
declare function subscribeWalletEvent(
  walletWSF: WalletWithStarknetFeatures$1,
  callback: (change: StandardEventsChangeProperties$1) => void
): () => void;
declare function strk20Balances(
  walletWSF: WalletWithStarknetFeatures$1,
  tokens: Address[]
): Promise<STRK20_BALANCE_ENTRY[]>;
declare function strk20PrepareInvoke(
  walletWSF: WalletWithStarknetFeatures$1,
  actions: STRK20_ACTION$1[],
  simulate?: boolean
): Promise<STRK20_CALL_AND_PROOF$1>;
declare function strk20InvokeTransaction(
  walletWSF: WalletWithStarknetFeatures$1,
  actions: STRK20_ACTION$1[]
): Promise<{
  transaction_hash: string;
}>;
/**
 * Compute the commitment of a DAPP STRK20 sub-account. The commitment is computed locally
 * by the wallet from the user private state ; no transaction is sent.
 *
 * When `nonce` is given, the full commitment of this single sub-account is returned. When
 * `nonce` is omitted, the partial (nonce independent) commitment is returned instead : it
 * is shared by every sub-account the user derives for this DAPP, so it can be published
 * once to let a DAPP recognize all the sub-accounts of a user without learning any
 * individual nonce.
 * @param {WalletWithStarknetFeaturesV6} walletWSF - The get-starknet V6 wallet object to use.
 * @param {STRK20_DAPP_NAME} dapp_name - The DAPP that scopes the sub-account(s).
 * @param {FELT} [nonce] - The sub-account nonce ; each nonce selects a distinct sub-account for this user + DAPP. Omit it to get the partial commitment.
 * @returns {Promise<FELT>} The sub-account commitment.
 * @example
 * ```typescript
 * const commitment = await strk20SubaccountCommitment(walletWSF, 'myDapp', '0x0');
 * // commitment = '0x5f2e...'
 * ```
 */
declare function strk20SubaccountCommitment(
  walletWSF: WalletWithStarknetFeatures$1,
  dapp_name: STRK20_DAPP_NAME,
  nonce?: FELT$1
): Promise<FELT$1>;

declare const connectV6_addDeclareTransaction: typeof addDeclareTransaction;
declare const connectV6_addInvokeTransaction: typeof addInvokeTransaction;
declare const connectV6_addStarknetChain: typeof addStarknetChain;
declare const connectV6_deploymentData: typeof deploymentData;
declare const connectV6_getPermissions: typeof getPermissions;
declare const connectV6_requestAccounts: typeof requestAccounts;
declare const connectV6_requestChainId: typeof requestChainId;
declare const connectV6_signMessage: typeof signMessage;
declare const connectV6_standardConnect: typeof standardConnect;
declare const connectV6_strk20Balances: typeof strk20Balances;
declare const connectV6_strk20InvokeTransaction: typeof strk20InvokeTransaction;
declare const connectV6_strk20PrepareInvoke: typeof strk20PrepareInvoke;
declare const connectV6_strk20SubaccountCommitment: typeof strk20SubaccountCommitment;
declare const connectV6_subscribeWalletEvent: typeof subscribeWalletEvent;
declare const connectV6_supportedSpecs: typeof supportedSpecs;
declare const connectV6_supportedWalletApi: typeof supportedWalletApi;
declare const connectV6_switchStarknetChain: typeof switchStarknetChain;
declare const connectV6_watchAsset: typeof watchAsset;
declare namespace connectV6 {
  export {
    connectV6_addDeclareTransaction as addDeclareTransaction,
    connectV6_addInvokeTransaction as addInvokeTransaction,
    connectV6_addStarknetChain as addStarknetChain,
    connectV6_deploymentData as deploymentData,
    connectV6_getPermissions as getPermissions,
    connectV6_requestAccounts as requestAccounts,
    connectV6_requestChainId as requestChainId,
    connectV6_signMessage as signMessage,
    connectV6_standardConnect as standardConnect,
    connectV6_strk20Balances as strk20Balances,
    connectV6_strk20InvokeTransaction as strk20InvokeTransaction,
    connectV6_strk20PrepareInvoke as strk20PrepareInvoke,
    connectV6_strk20SubaccountCommitment as strk20SubaccountCommitment,
    connectV6_subscribeWalletEvent as subscribeWalletEvent,
    connectV6_supportedSpecs as supportedSpecs,
    connectV6_supportedWalletApi as supportedWalletApi,
    connectV6_switchStarknetChain as switchStarknetChain,
    connectV6_watchAsset as watchAsset,
  };
}

type DefaultConfig = typeof DEFAULT_GLOBAL_CONFIG;
type CustomConfig = {
  [key: string]: any;
};
type ConfigData = DefaultConfig & CustomConfig;
declare class Configuration {
  private static instance;
  private config;
  private constructor();
  private initialize;
  static getInstance(): Configuration;
  /**
   * Get a nested value from an object using a dot-notation path
   * @param obj - The object to traverse
   * @param path - The dot-notation path (e.g., 'a.b.c')
   * @returns The value at the path, or undefined if not found
   */
  private getNestedValue;
  /**
   * Set a nested value in an object using a dot-notation path
   * @param obj - The object to modify
   * @param path - The dot-notation path (e.g., 'a.b.c')
   * @param value - The value to set
   */
  private setNestedValue;
  get<K extends keyof DefaultConfig>(key: K): DefaultConfig[K];
  get(key: string, defaultValue?: any): any;
  set<K extends keyof DefaultConfig>(key: K, value: DefaultConfig[K]): void;
  set(key: string, value: any): void;
  update(configData: Partial<DefaultConfig> & CustomConfig): void;
  getAll(): ConfigData;
  reset(): void;
  delete<K extends keyof DefaultConfig>(key: K): void;
  delete(key: string): void;
  hasKey<K extends keyof DefaultConfig>(key: K): boolean;
  hasKey(key: string): boolean;
}
declare const config: Configuration;

/**
 * Logging class providing different levels of log
 */
declare class Logger {
  private static instance;
  private config;
  private constructor();
  static getInstance(): Logger;
  private getTimestamp;
  private shouldLog;
  private formatMessage;
  private log;
  /**
   * debug will be displayed when LogLevel level is set to DEBUG(5)
   */
  debug(message: string, data?: any): void;
  /**
   * info will be displayed when LogLevel level is set to DEBUG(5), INFO(4)
   */
  info(message: string, data?: any): void;
  /**
   * warn will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3)
   */
  warn(message: string, data?: any): void;
  /**
   * error will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2)
   */
  error(message: string, data?: any): void;
  /**
   * fatal will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2), FATAL(1)
   */
  fatal(message: string, data?: any): void;
  /**
   * Set the logging level you would like system to display
   * * 5 DEBUG  - show all logs
   * * 4 INFO
   * * 3 WARN
   * * 2 ERROR
   * * 1 FATAL
   * * 0 OFF    - disable logs
   */
  setLogLevel(level: LogLevel): void;
  getLogLevel(): LogLevel;
  /**
   *
   * @returns logs levels displayed on the configured LogLevel
   */
  getEnabledLogLevels(): string[];
}
/**
 * Logger instance, use for the system logging.
 * Higher the logger level index, higher the LogLevel required to display log.
 * Default should be INFO
 *
 * DEBUG: 5,
 * INFO: 4,
 * WARN: 3,
 * ERROR: 2,
 * FATAL: 1,
 */
declare const logger: Logger;

export {
  type Abi,
  type AbiEntry,
  type AbiEntryType,
  type AbiEnum,
  type AbiEnums,
  type AbiEvent,
  type AbiEvents,
  type AbiInterfaces,
  AbiParser1,
  AbiParser2,
  AbiParserInterface,
  type AbiStruct,
  type AbiStructs,
  Account,
  type AccountHooks,
  AccountInterface,
  type AccountInvocationItem,
  type AccountInvocations,
  type AccountInvocationsFactoryDetails,
  type AccountOptions,
  type AllowArray,
  type ApiEstimateFeeResponse,
  type Args,
  type ArgsOrCalldata,
  type ArgsOrCalldataWithOptions,
  type ArraySignatureType,
  type AsyncContractFunction,
  type BLOCK_HASH,
  type BLOCK_NUMBER,
  BatchClient,
  type BatchClientOptions,
  type BigNumberish,
  type Block$1 as Block,
  type BlockIdentifier,
  type BlockNumber,
  BlockStatus,
  BlockTag,
  type BlockTransactionTrace,
  type BlockTransactionsTracesWithInitialReads,
  type BlockWithTxHashes,
  BrotherIdImpl,
  type BrotherIdProviderMethods,
  type BrotherProfile,
  type Builtins,
  type ByteArray,
  type ByteCode,
  type CairoAssembly,
  CairoByteArray,
  CairoBytes31,
  type CairoContract,
  CairoCustomEnum,
  type CairoEnum,
  type CairoEnumRaw,
  type CairoEvent,
  type CairoEventDefinition,
  type CairoEventVariant,
  CairoFelt,
  CairoFelt252,
  CairoFixedArray,
  CairoInt128,
  CairoInt16,
  CairoInt32,
  CairoInt64,
  CairoInt8,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  CairoUint128,
  CairoUint16,
  CairoUint256,
  CairoUint32,
  CairoUint512,
  CairoUint64,
  CairoUint8,
  CairoUint96,
  type CairoVersion,
  type Call,
  type CallContractResponse,
  CallData,
  type CallDetails,
  type CallOptions,
  type CallResult,
  type Calldata,
  type CommonContractOptions,
  type CompiledContract,
  type CompiledSierra,
  type CompiledSierraCasm,
  type CompilerVersion,
  type CompleteDeclareContractPayload,
  type CompressedProgram,
  Contract,
  type ContractClass,
  type ContractClassIdentifier,
  type ContractClassPayload,
  type ContractClassResponse,
  type ContractEntryPointFields,
  type ContractFunction,
  ContractInterface,
  type ContractOptions,
  type ContractVersion,
  type DeclareAndDeployContractPayload,
  type DeclareContractPayload,
  type DeclareContractResponse,
  type DeclareContractTransaction,
  type DeclareDeployUDCResponse,
  type DeclareSignerDetails,
  type DeclareTransactionReceiptResponse,
  type DeclaredTransaction,
  type DeployAccountContractPayload,
  type DeployAccountContractTransaction,
  type DeployAccountSignerDetails,
  type DeployAccountTransactionReceiptResponse,
  type DeployAndInvokeTransaction,
  type DeployContractResponse,
  type DeployContractUDCResponse,
  type DeployTransaction,
  type DeployTransactionReceiptResponse,
  type DeployedAccountTransaction,
  Deployer,
  type DeployerCall,
  DeployerInterface,
  type Details,
  EDAMode,
  EDataAvailabilityMode,
  ESubscriptionTag,
  ETH_ADDRESS,
  ETraceFlag,
  ETransactionExecutionStatus,
  ETransactionStatus,
  ETransactionVersion,
  ETransactionVersion2,
  ETransactionVersion3,
  ETxnResponseFlag,
  type EVENTS_CHUNK,
  type EmittedEvent,
  EntryPointType,
  type EntryPointsByType,
  type ErrorReceiptResponseHelper,
  type EstimateFeeBulk,
  type EstimateFeeResponseBulkOverhead,
  type EstimateFeeResponseOverhead,
  EthSigner,
  type Event$1 as Event,
  type EventEntry,
  type EventFilter,
  type ExecutableDeployAndInvokeTransaction,
  type ExecutableDeployTransaction,
  type ExecutableInvokeTransaction,
  type ExecutableUserInvoke,
  type ExecutableUserTransaction,
  type ExecuteOptions,
  type ExecutionParameters,
  type FEE_ESTIMATE,
  type FELT,
  type FactoryParams,
  type FastExecuteAccountMethods,
  type FastExecuteProviderMethods,
  type FastExecuteResponse,
  type FastWaitForTransactionOptions,
  type FeeEstimate,
  type FeeMode,
  type FormatResponse,
  type FunctionAbi,
  type GasPrices,
  type GetBlockResponse,
  type GetTransactionReceiptResponse,
  type GetTransactionResponse,
  type GetTxReceiptResponseWithoutHelper,
  type HexCalldata,
  type Hint,
  type INITIAL_READS,
  Int,
  type InterfaceAbi,
  type Invocation,
  type Invocations,
  type InvocationsDetails,
  type InvocationsDetailsWithNonce,
  type InvocationsSignerDetails,
  type InvokeFunctionResponse,
  type InvokeTransaction,
  type InvokeTransactionReceiptResponse,
  type InvokedTransaction,
  type L1HandlerTransactionReceiptResponse,
  type L1_HANDLER_TXN,
  type LedgerPathCalculation,
  LedgerSigner111 as LedgerSigner,
  LedgerSigner111,
  LedgerSigner221,
  LedgerSigner231,
  type LegacyCompiledContract,
  type LegacyContractClass,
  type LegacyEvent,
  LibraryError,
  Literal,
  type LoadedContract,
  type LogLevel,
  LogLevelIndex,
  type Methods,
  type MultiDeployContractResponse,
  type MultiType,
  NON_ZERO_PREFIX,
  type Nonce,
  type OptionalPayload,
  type OutsideCall,
  type OutsideExecution,
  type OutsideExecutionOptions,
  OutsideExecutionTypesV1,
  OutsideExecutionTypesV2,
  OutsideExecutionVersion,
  type OutsideTransaction,
  type PRE_CONFIRMED_STATE_UPDATE,
  type PRICE_UNIT,
  type ParsedEvent,
  type ParsedEvents,
  type ParsedStruct,
  type ParsingStrategy,
  type PaymasterDetails,
  type PaymasterFeeEstimate,
  PaymasterInterface,
  type PaymasterOptions,
  PaymasterRpc,
  type PaymasterRpcOptions,
  type PaymasterTimeBounds,
  type PluginConfig,
  PluginManager,
  type PreConfirmedBlock,
  type PreConfirmedStateUpdate,
  type PreparedDeployAndInvokeTransaction,
  type PreparedDeployTransaction,
  type PreparedInvokeTransaction,
  type PreparedTransaction,
  type Program,
  RpcProvider as Provider,
  type ProviderHooks,
  ProviderInterface,
  type ProviderOptions,
  type ProviderOrAccount,
  type PythonicHints,
  type RESOURCE_PRICE,
  index$4 as RPC,
  rpc_0_10_2 as RPC0102,
  rpc_0_10_3 as RPC0103,
  rpc_0_9_0 as RPC09,
  RPCResponseParser,
  type RPC_ERROR,
  type RPC_ERROR_SET,
  type RawArgs,
  type RawArgsArray,
  type RawArgsObject,
  type RawCalldata,
  type Receipt,
  ReceiptTx,
  type ReconnectOptions,
  type RequiredKeysOf,
  type ResourceBounds,
  type ResourceBoundsBN,
  type ResourceBoundsOverhead,
  ResponseParser,
  type RevertedTransactionReceiptResponse,
  type RevertedTransactionReceiptResponseHelper,
  RpcChannel,
  RpcError,
  RpcProvider,
  type RpcProviderOptions,
  type SIMULATION_FLAG,
  type STATE_UPDATE,
  type STRK20_ACTION,
  type STRK20_CALL_AND_PROOF,
  type STRK20_SUBACCOUNT_INVOKE_ACTION,
  type SierraContractClass,
  type SierraContractEntryPointFields,
  type SierraEntryPointsByType,
  type SierraProgramDebugInfo,
  type Signature,
  Signer,
  SignerInterface,
  type Simplify,
  type SimulateTransaction,
  type SimulateTransactionDetails,
  type SimulateTransactionOverhead,
  type SimulateTransactionOverheadResponse,
  type SimulateTransactionResponse,
  type SimulationFlags,
  type StarkProfile,
  type StarknetIdAccountMethods,
  StarknetIdImpl,
  type StarknetIdProviderMethods,
  type StarknetPlugin,
  type StateUpdate,
  type StateUpdateResponse,
  type StorageResponse,
  type SubscribeEventsParams,
  type SubscribeNewHeadsParams,
  type SubscribeNewTransactionReceiptsParams,
  type SubscribeNewTransactionsParams,
  type SubscribeTransactionStatusParams,
  Subscription,
  type SubscriptionBlockIdentifier,
  type SubscriptionNewHeadsEvent,
  type SubscriptionNewTransactionEvent,
  type SubscriptionNewTransactionReceiptsEvent,
  type SubscriptionOptions,
  type SubscriptionStarknetEventsEvent,
  type SubscriptionTransactionStatusEvent,
  type SuccessfulTransactionReceiptResponse,
  type SuccessfulTransactionReceiptResponseHelper,
  type TXN_EXECUTION_STATUS,
  type TXN_HASH,
  type TXN_STATUS,
  TimeoutError,
  type TipAnalysisOptions,
  type TipEstimate,
  type TipType,
  type TokenData,
  TransactionExecutionStatus,
  TransactionFinalityStatus,
  type TransactionReceipt,
  type TransactionReceiptCallbacks,
  type TransactionReceiptCallbacksDefault,
  type TransactionReceiptCallbacksDefined,
  type TransactionReceiptStatus,
  type TransactionReceiptValue,
  type TransactionStatus,
  type TransactionStatusReceiptSets,
  type TransactionTrace,
  TransactionType,
  type TransactionWithHash,
  type Tupled,
  type TypedContractV2,
  UINT_128_MAX,
  UINT_128_MIN,
  UINT_256_HIGH_MAX,
  UINT_256_HIGH_MIN,
  UINT_256_LOW_MAX,
  UINT_256_LOW_MIN,
  UINT_256_MAX,
  UINT_256_MIN,
  UINT_512_MAX,
  UINT_512_MIN,
  Uint,
  type Uint256,
  type Uint512,
  type UniversalDeployerContractPayload,
  type UniversalDetails,
  type UserInvoke,
  type UserTransaction,
  type V3DeclareSignerDetails,
  type V3DeployAccountSignerDetails,
  type V3InvocationsSignerDetails,
  type V3TransactionDetails,
  ValidateType,
  WalletAccount,
  WalletAccountV5,
  WalletAccountV6,
  WebSocketChannel,
  type WebSocketModule,
  WebSocketNotConnectedError,
  type WebSocketOptions,
  type WeierstrassSignatureType,
  type WithOptions,
  addAddressPadding,
  brotherId,
  byteArray,
  cairo,
  compareVersions,
  config,
  constants,
  contractClassResponseToLegacyCompiledContract,
  contractLoader,
  createAbiParser,
  createTransactionReceipt,
  defaultDeployer,
  defaultPlugins,
  ec,
  encode,
  eth,
  index as events,
  extractContractHashes,
  fastExecute,
  fastParsingStrategy,
  getAbiVersion,
  type getBlockTransactionsTracesOptions,
  getChecksumAddress,
  type getContractVersionOptions,
  type getEstimateFeeBulkOptions,
  getGasPrices,
  getLedgerPathBuffer111 as getLedgerPathBuffer,
  getLedgerPathBuffer111,
  getLedgerPathBuffer221,
  type getSimulateTransactionOptions,
  getTipStatsFromBlocks,
  index$3 as hash,
  hdParsingStrategy,
  isAccount,
  isFileSystemAvailable,
  isNoConstructorValid,
  isPreConfirmedBlock,
  isPreConfirmedStateUpdate,
  isPreConfirmedTransaction,
  isRPC08Plus_ResourceBounds,
  isRPC08Plus_ResourceBoundsBN,
  isSierra,
  isSupportedSpecVersion,
  isV3Tx,
  isVersion,
  json,
  legacyDeployer,
  logger,
  merkle,
  num,
  outsideExecution,
  parseCalldataField,
  paymaster,
  provider,
  selector,
  shortString,
  src5,
  index$1 as stark,
  starknetId,
  toAnyPatchVersion,
  toApiVersion,
  index$2 as transaction,
  typedData,
  uint256$1 as uint256,
  units,
  v2 as v2hash,
  v3 as v3hash,
  validateAndParseAddress,
  validateChecksumAddress,
  verifyMessageInStarknet,
  type waitForTransactionOptions,
  connect as wallet,
  connectV5 as walletV5,
  connectV6 as walletV6,
};

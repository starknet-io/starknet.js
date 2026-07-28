'use strict';
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (
  __copyProps(target, mod, 'default'),
  secondTarget && __copyProps(secondTarget, mod, 'default')
);
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, 'default', { value: mod, enumerable: true })
      : target,
    mod
  )
);
var __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AbiParser1: () => AbiParser1,
  AbiParser2: () => AbiParser2,
  AbiParserInterface: () => AbiParserInterface,
  Account: () => Account,
  AccountInterface: () => AccountInterface,
  BatchClient: () => BatchClient,
  BlockStatus: () => BlockStatus,
  BlockTag: () => BlockTag,
  BrotherIdImpl: () => BrotherIdImpl,
  CairoByteArray: () => CairoByteArray,
  CairoBytes31: () => CairoBytes31,
  CairoCustomEnum: () => CairoCustomEnum,
  CairoFelt: () => CairoFelt,
  CairoFelt252: () => CairoFelt252,
  CairoFixedArray: () => CairoFixedArray,
  CairoInt128: () => CairoInt128,
  CairoInt16: () => CairoInt16,
  CairoInt32: () => CairoInt32,
  CairoInt64: () => CairoInt64,
  CairoInt8: () => CairoInt8,
  CairoOption: () => CairoOption,
  CairoOptionVariant: () => CairoOptionVariant,
  CairoResult: () => CairoResult,
  CairoResultVariant: () => CairoResultVariant,
  CairoUint128: () => CairoUint128,
  CairoUint16: () => CairoUint16,
  CairoUint256: () => CairoUint256,
  CairoUint32: () => CairoUint32,
  CairoUint512: () => CairoUint512,
  CairoUint64: () => CairoUint64,
  CairoUint8: () => CairoUint8,
  CairoUint96: () => CairoUint96,
  CallData: () => CallData,
  Contract: () => Contract,
  ContractInterface: () => ContractInterface,
  Deployer: () => Deployer,
  DeployerInterface: () => DeployerInterface,
  EDAMode: () => EDAMode,
  EDataAvailabilityMode: () => EDataAvailabilityMode,
  ESubscriptionTag: () => ESubscriptionTag,
  ETH_ADDRESS: () => ETH_ADDRESS,
  ETraceFlag: () => ETraceFlag,
  ETransactionExecutionStatus: () => ETransactionExecutionStatus,
  ETransactionStatus: () => ETransactionStatus,
  ETransactionVersion: () => ETransactionVersion,
  ETransactionVersion2: () => ETransactionVersion2,
  ETransactionVersion3: () => ETransactionVersion3,
  ETxnResponseFlag: () => ETxnResponseFlag,
  EntryPointType: () => EntryPointType,
  EthSigner: () => EthSigner,
  Int: () => Int,
  LedgerSigner: () => LedgerSigner111,
  LedgerSigner111: () => LedgerSigner111,
  LedgerSigner221: () => LedgerSigner221,
  LedgerSigner231: () => LedgerSigner231,
  LibraryError: () => LibraryError,
  Literal: () => Literal,
  LogLevelIndex: () => LogLevelIndex,
  NON_ZERO_PREFIX: () => NON_ZERO_PREFIX,
  OutsideExecutionTypesV1: () => OutsideExecutionTypesV1,
  OutsideExecutionTypesV2: () => OutsideExecutionTypesV2,
  OutsideExecutionVersion: () => OutsideExecutionVersion,
  PaymasterInterface: () => PaymasterInterface,
  PaymasterRpc: () => PaymasterRpc,
  PluginManager: () => PluginManager,
  Provider: () => RpcProvider,
  ProviderInterface: () => ProviderInterface,
  RPC: () => api_exports,
  RPC0102: () => rpc_0_10_2_exports,
  RPC0103: () => rpc_0_10_3_exports,
  RPC09: () => rpc_0_9_0_exports,
  RPCResponseParser: () => RPCResponseParser,
  ReceiptTx: () => ReceiptTx,
  ResponseParser: () => ResponseParser,
  RpcChannel: () => RpcChannel3,
  RpcError: () => RpcError,
  RpcProvider: () => RpcProvider,
  Signer: () => Signer,
  SignerInterface: () => SignerInterface,
  StarknetIdImpl: () => StarknetIdImpl,
  Subscription: () => Subscription,
  TimeoutError: () => TimeoutError,
  TransactionExecutionStatus: () => TransactionExecutionStatus,
  TransactionFinalityStatus: () => TransactionFinalityStatus,
  TransactionType: () => TransactionType,
  TypedDataRevision: () => api_exports.TypedDataRevision,
  UINT_128_MAX: () => UINT_128_MAX,
  UINT_128_MIN: () => UINT_128_MIN,
  UINT_256_HIGH_MAX: () => UINT_256_HIGH_MAX,
  UINT_256_HIGH_MIN: () => UINT_256_HIGH_MIN,
  UINT_256_LOW_MAX: () => UINT_256_LOW_MAX,
  UINT_256_LOW_MIN: () => UINT_256_LOW_MIN,
  UINT_256_MAX: () => UINT_256_MAX,
  UINT_256_MIN: () => UINT_256_MIN,
  UINT_512_MAX: () => UINT_512_MAX,
  UINT_512_MIN: () => UINT_512_MIN,
  Uint: () => Uint,
  ValidateType: () => ValidateType,
  WalletAccount: () => WalletAccount,
  WalletAccountV5: () => WalletAccountV5,
  WalletAccountV6: () => WalletAccountV6,
  WebSocketChannel: () => WebSocketChannel,
  WebSocketNotConnectedError: () => WebSocketNotConnectedError,
  addAddressPadding: () => addAddressPadding,
  brotherId: () => brotherId,
  byteArray: () => byteArray_exports,
  cairo: () => cairo_exports,
  compareVersions: () => compareVersions,
  config: () => config,
  constants: () => constants_exports,
  contractClassResponseToLegacyCompiledContract: () =>
    contractClassResponseToLegacyCompiledContract,
  contractLoader: () => contractLoader,
  createAbiParser: () => createAbiParser,
  createTransactionReceipt: () => createTransactionReceipt,
  defaultDeployer: () => defaultDeployer,
  defaultPlugins: () => defaultPlugins,
  ec: () => ec_exports,
  encode: () => encode_exports,
  eth: () => eth_exports,
  events: () => events_exports,
  extractContractHashes: () => extractContractHashes,
  fastExecute: () => fastExecute,
  fastParsingStrategy: () => fastParsingStrategy,
  getAbiVersion: () => getAbiVersion,
  getChecksumAddress: () => getChecksumAddress,
  getGasPrices: () => getGasPrices,
  getLedgerPathBuffer: () => getLedgerPathBuffer111,
  getLedgerPathBuffer111: () => getLedgerPathBuffer111,
  getLedgerPathBuffer221: () => getLedgerPathBuffer221,
  getTipStatsFromBlocks: () => getTipStatsFromBlocks,
  hash: () => hash_exports,
  hdParsingStrategy: () => hdParsingStrategy,
  isAccount: () => isAccount,
  isFileSystemAvailable: () => isFileSystemAvailable,
  isNoConstructorValid: () => isNoConstructorValid,
  isPreConfirmedBlock: () => isPreConfirmedBlock,
  isPreConfirmedStateUpdate: () => isPreConfirmedStateUpdate,
  isPreConfirmedTransaction: () => isPreConfirmedTransaction,
  isRPC08Plus_ResourceBounds: () => isRPC08Plus_ResourceBounds,
  isRPC08Plus_ResourceBoundsBN: () => isRPC08Plus_ResourceBoundsBN,
  isSierra: () => isSierra,
  isSupportedSpecVersion: () => isSupportedSpecVersion,
  isV3Tx: () => isV3Tx,
  isVersion: () => isVersion,
  json: () => json_exports,
  legacyDeployer: () => legacyDeployer,
  logger: () => logger,
  merkle: () => merkle_exports,
  num: () => num_exports,
  outsideExecution: () => outsideExecution_exports,
  parseCalldataField: () => parseCalldataField,
  paymaster: () => paymaster_exports,
  provider: () => provider_exports,
  selector: () => selector_exports,
  shortString: () => shortString_exports,
  src5: () => src5_exports,
  stark: () => stark_exports,
  starknetId: () => starknetId_exports,
  toAnyPatchVersion: () => toAnyPatchVersion,
  toApiVersion: () => toApiVersion,
  transaction: () => transaction_exports,
  typedData: () => typedData_exports,
  uint256: () => uint256_exports,
  units: () => units,
  v2hash: () => v2_exports,
  v3hash: () => v3_exports,
  validateAndParseAddress: () => validateAndParseAddress,
  validateChecksumAddress: () => validateChecksumAddress,
  verifyMessageInStarknet: () => verifyMessageInStarknet,
  wallet: () => connect_exports,
  walletV5: () => connectV5_exports,
  walletV6: () => connectV6_exports,
});
module.exports = __toCommonJS(index_exports);

// src/global/constants.ts
var constants_exports = {};
__export(constants_exports, {
  ADDR_BOUND: () => ADDR_BOUND,
  API_VERSION: () => API_VERSION,
  BaseUrl: () => _BaseUrl,
  DEFAULT_GLOBAL_CONFIG: () => DEFAULT_GLOBAL_CONFIG,
  HARDENING_4BYTES: () => HARDENING_4BYTES,
  HARDENING_BYTE: () => HARDENING_BYTE,
  IS_BROWSER: () => IS_BROWSER,
  LegacyUDC: () => LegacyUDC,
  MASK_250: () => MASK_250,
  MASK_31: () => MASK_31,
  MAX_STORAGE_ITEM_SIZE: () => MAX_STORAGE_ITEM_SIZE,
  NetworkName: () => _NetworkName,
  OutsideExecutionCallerAny: () => OutsideExecutionCallerAny,
  PAYMASTER_RPC_NODES: () => PAYMASTER_RPC_NODES,
  PRIME: () => PRIME,
  RANGE_FELT: () => RANGE_FELT,
  RANGE_I128: () => RANGE_I128,
  RANGE_I16: () => RANGE_I16,
  RANGE_I32: () => RANGE_I32,
  RANGE_I64: () => RANGE_I64,
  RANGE_I8: () => RANGE_I8,
  RANGE_U128: () => RANGE_U128,
  RANGE_U16: () => RANGE_U16,
  RANGE_U32: () => RANGE_U32,
  RANGE_U64: () => RANGE_U64,
  RANGE_U8: () => RANGE_U8,
  RANGE_U96: () => RANGE_U96,
  RPC_DEFAULT_NODES: () => RPC_DEFAULT_NODES,
  SNIP9_V1_INTERFACE_ID: () => SNIP9_V1_INTERFACE_ID,
  SNIP9_V2_INTERFACE_ID: () => SNIP9_V2_INTERFACE_ID,
  SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS: () =>
    SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS,
  SYSTEM_MESSAGES: () => SYSTEM_MESSAGES,
  StarknetChainId: () => _StarknetChainId,
  SupportedRpcVersion: () => _SupportedRpcVersion,
  TEXT_TO_FELT_MAX_LEN: () => TEXT_TO_FELT_MAX_LEN,
  TransactionHashPrefix: () => _TransactionHashPrefix,
  UDC: () => UDC,
  ZERO: () => ZERO,
});

// src/types/api/index.ts
var api_exports = {};
__export(api_exports, {
  JRPC: () => jsonrpc_exports,
  PAYMASTER_API: () => import_starknet_types_0103.PAYMASTER_API,
  RPCSPEC0103: () => RPCSPEC0103,
  RPCSPEC09: () => RPCSPEC09,
});

// src/types/api/jsonrpc.ts
var jsonrpc_exports = {};

// src/types/api/index.ts
var RPCSPEC09 = __toESM(require('@starknet-io/starknet-types-09'));
var RPCSPEC0103 = __toESM(require('@starknet-io/starknet-types-0103'));
var import_starknet_types_0103 = require('@starknet-io/starknet-types-0103');

// src/types/api/rpc.ts
var rpc_exports = {};
__reExport(rpc_exports, require('@starknet-io/starknet-types-0103'));

// src/types/api/index.ts
__reExport(api_exports, rpc_exports);

// src/provider/types/spec.type.ts
var { ETransactionVersion } = RPCSPEC09;
var { ETransactionVersion2 } = RPCSPEC09;
var { ETransactionVersion3 } = RPCSPEC09;
var { EDataAvailabilityMode } = RPCSPEC0103;
var { EDAMode } = RPCSPEC0103;
function isRPC08Plus_ResourceBounds(entry) {
  return 'l1_data_gas' in entry;
}
function isRPC08Plus_ResourceBoundsBN(entry) {
  return 'l1_data_gas' in entry;
}
var { ETxnResponseFlag } = RPCSPEC0103;
var { ETraceFlag } = RPCSPEC0103;
var { ESubscriptionTag } = RPCSPEC0103;
var { ETransactionStatus } = RPCSPEC0103;
var { ETransactionExecutionStatus } = RPCSPEC0103;
var { ETransactionType: TransactionType } = RPCSPEC09;
var { EBlockStatus: BlockStatus } = RPCSPEC09;
var { ETransactionFinalityStatus: TransactionFinalityStatus } = RPCSPEC09;
var { ETransactionExecutionStatus: TransactionExecutionStatus } = RPCSPEC09;
var { EBlockTag: BlockTag } = RPCSPEC09;

// src/utils/encode.ts
var encode_exports = {};
__export(encode_exports, {
  IS_BROWSER: () => IS_BROWSER,
  addHexPrefix: () => addHexPrefix,
  arrayBufferToString: () => arrayBufferToString,
  atobUniversal: () => atobUniversal,
  bigIntToUint8Array: () => bigIntToUint8Array,
  btoaUniversal: () => btoaUniversal,
  buf2hex: () => buf2hex,
  calcByteLength: () => calcByteLength,
  concatenateArrayBuffer: () => concatenateArrayBuffer,
  hexStringToUint8Array: () => hexStringToUint8Array,
  padLeft: () => padLeft,
  pascalToSnake: () => pascalToSnake,
  removeHexPrefix: () => removeHexPrefix,
  sanitizeBytes: () => sanitizeBytes,
  sanitizeHex: () => sanitizeHex,
  stringToUint8Array: () => stringToUint8Array,
  uint8ArrayToBigInt: () => uint8ArrayToBigInt,
  utf8ToArray: () => utf8ToArray,
  utf8ToBigInt: () => utf8ToBigInt,
  utf8ToUint8Array: () => utf8ToUint8Array,
});
var import_base = require('@scure/base');
var IS_BROWSER = typeof window !== 'undefined';
var STRING_ZERO = '0';
function arrayBufferToString(array) {
  return new Uint8Array(array).reduce((data, byte) => data + String.fromCharCode(byte), '');
}
function utf8ToUint8Array(str) {
  return new TextEncoder().encode(str);
}
var utf8ToArray = utf8ToUint8Array;
function utf8ToBigInt(str) {
  return uint8ArrayToBigInt(utf8ToUint8Array(str));
}
function atobUniversal(a) {
  return import_base.base64.decode(a);
}
function btoaUniversal(b) {
  return import_base.base64.encode(new Uint8Array(b));
}
function buf2hex(buffer) {
  return buffer.reduce((r, x) => r + x.toString(16).padStart(2, '0'), '');
}
function removeHexPrefix(hex) {
  return hex.startsWith('0x') || hex.startsWith('0X') ? hex.slice(2) : hex;
}
function addHexPrefix(hex) {
  return `0x${removeHexPrefix(hex)}`;
}
function padString(str, length, left, padding = STRING_ZERO) {
  const diff = length - str.length;
  let result = str;
  if (diff > 0) {
    const pad = padding.repeat(diff);
    result = left ? pad + str : str + pad;
  }
  return result;
}
function padLeft(str, length, padding = STRING_ZERO) {
  return padString(str, length, true, padding);
}
function calcByteLength(str, byteSize = 8) {
  const { length } = str;
  const remainder = length % byteSize;
  return remainder ? ((length - remainder) / byteSize) * byteSize + byteSize : length;
}
function sanitizeBytes(str, byteSize = 8, padding = STRING_ZERO) {
  return padLeft(str, calcByteLength(str, byteSize), padding);
}
function sanitizeHex(hex) {
  const hexWithoutPrefix = removeHexPrefix(hex);
  const sanitizedHex = sanitizeBytes(hexWithoutPrefix, 2);
  return sanitizedHex ? addHexPrefix(sanitizedHex) : sanitizedHex;
}
var pascalToSnake = (text) =>
  /[a-z]/.test(text)
    ? text
        .split(/(?=[A-Z])/)
        .join('_')
        .toUpperCase()
    : text;
function concatenateArrayBuffer(uint8arrays) {
  const totalLength = uint8arrays.reduce((total, uint8array) => total + uint8array.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  uint8arrays.forEach((uint8array) => {
    result.set(uint8array, offset);
    offset += uint8array.byteLength;
  });
  return result;
}
function hexStringToUint8Array(hex) {
  if (!isHexString(addHexPrefix(hex))) {
    throw new Error(`Invalid hex string: "${hex}"`);
  }
  const paddedHex = removeHexPrefix(sanitizeHex(hex));
  const bytes = new Uint8Array(paddedHex.length / 2);
  for (let i = 0; i < paddedHex.length; i += 2) {
    bytes[i / 2] = parseInt(paddedHex.substring(i, i + 2), 16);
  }
  return bytes;
}
function isHexString(hex) {
  return /^0[xX][0-9a-fA-F]*$/.test(hex);
}
function isDecimalString(str) {
  return /^[0-9]+$/.test(str);
}
function stringToUint8Array(str) {
  if (isHexString(str)) {
    return hexStringToUint8Array(str);
  }
  if (isDecimalString(str)) {
    const value = BigInt(str);
    return bigIntToUint8Array(value);
  }
  return utf8ToUint8Array(str);
}
function bigIntToUint8Array(value) {
  if (value < 0n) {
    throw new Error(`Cannot convert negative bigint ${value} to Uint8Array`);
  }
  if (value === 0n) {
    return new Uint8Array([0]);
  }
  let hex = value.toString(16);
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`;
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToBigInt(data) {
  if (!data || data.length === 0) {
    return 0n;
  }
  let hex = '0x';
  for (let i = 0; i < data.length; i += 1) {
    hex += data[i].toString(16).padStart(2, '0');
  }
  return BigInt(hex);
}

// src/global/constants.ts
var TEXT_TO_FELT_MAX_LEN = 31;
var ZERO = 0n;
var MASK_250 = 2n ** 250n - 1n;
var MASK_31 = 2n ** 31n - 1n;
var API_VERSION = ZERO;
var PRIME = 2n ** 251n + 17n * 2n ** 192n + 1n;
var MAX_STORAGE_ITEM_SIZE = 256n;
var ADDR_BOUND = 2n ** 251n - MAX_STORAGE_ITEM_SIZE;
var range = (min, max) => ({ min, max });
var RANGE_FELT = range(ZERO, PRIME - 1n);
var RANGE_U8 = range(ZERO, 2n ** 8n - 1n);
var RANGE_U16 = range(ZERO, 2n ** 16n - 1n);
var RANGE_U32 = range(ZERO, 2n ** 32n - 1n);
var RANGE_U64 = range(ZERO, 2n ** 64n - 1n);
var RANGE_U96 = range(ZERO, 2n ** 96n - 1n);
var RANGE_U128 = range(ZERO, 2n ** 128n - 1n);
var RANGE_I8 = range(-(2n ** 7n), 2n ** 7n - 1n);
var RANGE_I16 = range(-(2n ** 15n), 2n ** 15n - 1n);
var RANGE_I32 = range(-(2n ** 31n), 2n ** 31n - 1n);
var RANGE_I64 = range(-(2n ** 63n), 2n ** 63n - 1n);
var RANGE_I128 = range(-(2n ** 127n), 2n ** 127n - 1n);
var LegacyUDC = {
  ADDRESS: '0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf',
  ENTRYPOINT: 'deployContract',
};
var UDC = {
  ADDRESS: '0x02ceed65a4bd731034c01113685c831b01c15d7d432f71afb1cf1634b53a2125',
  ENTRYPOINT: 'deploy_contract',
};
var OutsideExecutionCallerAny = '0x414e595f43414c4c4552';
var SNIP9_V1_INTERFACE_ID = '0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181';
var SNIP9_V2_INTERFACE_ID = '0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872';
var HARDENING_BYTE = 128;
var HARDENING_4BYTES = 2147483648n;
var _BaseUrl = {
  SN_MAIN: 'https://alpha-mainnet.starknet.io',
  SN_SEPOLIA: 'https://alpha-sepolia.starknet.io',
};
var _NetworkName = {
  SN_MAIN: 'SN_MAIN',
  SN_SEPOLIA: 'SN_SEPOLIA',
};
var _StarknetChainId = {
  SN_MAIN: '0x534e5f4d41494e',
  // encodeShortString('SN_MAIN'),
  SN_SEPOLIA: '0x534e5f5345504f4c4941',
  // encodeShortString('SN_SEPOLIA')
};
var _TransactionHashPrefix = {
  DECLARE: '0x6465636c617265',
  // encodeShortString('declare'),
  DEPLOY: '0x6465706c6f79',
  // encodeShortString('deploy'),
  DEPLOY_ACCOUNT: '0x6465706c6f795f6163636f756e74',
  // encodeShortString('deploy_account'),
  INVOKE: '0x696e766f6b65',
  // encodeShortString('invoke'),
  L1_HANDLER: '0x6c315f68616e646c6572',
  // encodeShortString('l1_handler'),
};
var _SupportedRpcVersion = {
  '0.9.0': '0.9.0',
  '0.10.0': '0.10.0',
  '0.10.2': '0.10.2',
  '0.10.3': '0.10.3',
  v0_9_0: '0.9.0',
  v0_10_0: '0.10.0',
  v0_10_2: '0.10.2',
  v0_10_3: '0.10.3',
};
var DEFAULT_GLOBAL_CONFIG = {
  rpcVersion: '0.10.0',
  transactionVersion: api_exports.ETransactionVersion.V3,
  // Starknet 0.14.0 only V3 transactions
  logLevel: 'INFO',
  resourceBoundsOverhead: {
    l1_gas: {
      max_amount: 50,
      max_price_per_unit: 50,
    },
    l1_data_gas: {
      max_amount: 50,
      max_price_per_unit: 50,
    },
    l2_gas: {
      max_amount: 50,
      max_price_per_unit: 50,
    },
  },
  defaultTipType: 'recommendedTip',
  channelDefaults: {
    options: {
      headers: { 'Content-Type': 'application/json' },
      blockIdentifier: BlockTag.LATEST,
      retries: 200,
      transactionRetryIntervalFallback: 5e3,
    },
    methods: {
      simulateTransaction: {
        skipValidate: true,
        skipFeeCharge: true,
      },
      getEstimateFee: {
        skipValidate: true,
      },
    },
  },
  fetch: void 0,
  websocket: void 0,
  buffer: void 0,
  blake: void 0,
};
var RPC_DEFAULT_NODES = {
  SN_MAIN: [`https://api.zan.top/public/starknet-mainnet/rpc/`],
  SN_SEPOLIA: [`https://api.zan.top/public/starknet-sepolia/rpc/`],
};
var PAYMASTER_RPC_NODES = {
  SN_MAIN: [`https://starknet.paymaster.avnu.fi`],
  SN_SEPOLIA: [`https://sepolia.paymaster.avnu.fi`],
};
var SYSTEM_MESSAGES = {
  legacyTxWarningMessage:
    'You are using a deprecated transaction version (V0,V1,V2)!\nUpdate to the latest V3 transactions!',
  legacyTxRPC08Message:
    'RPC 0.8+ do not support legacy transactions, use RPC 0.8+ v3 transactions!',
  SWOldV3: 'RPC 0.7 V3 tx (improper resource bounds) not supported in RPC 0.8+',
  channelVersionMismatch:
    'Channel specification version is not compatible with the connected node Specification Version',
  unsupportedSpecVersion:
    'The connected node specification version is not supported by this library',
  maxFeeInV3: 'maxFee is not supported in V3 transactions, use resourceBounds instead',
  declareNonSierra: 'Declaring non Sierra (Cairo0)contract using RPC 0.8+',
  unsupportedMethodForRpcVersion: 'Unsupported method for RPC version',
  txEvictedFromMempool: 'Transaction TTL, evicted from the mempool, try to increase the tip',
  consensusFailed: 'Consensus failed to finalize the block proposal',
  txFailsBlockBuildingValidation: 'Transaction fails block building validation',
};
var SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS = '0.14.1';

// src/global/config.ts
var Configuration = class _Configuration {
  static instance;
  config;
  constructor() {
    this.initialize();
  }
  initialize() {
    this.config = { ...DEFAULT_GLOBAL_CONFIG };
  }
  static getInstance() {
    if (!_Configuration.instance) {
      _Configuration.instance = new _Configuration();
    }
    return _Configuration.instance;
  }
  /**
   * Get a nested value from an object using a dot-notation path
   * @param obj - The object to traverse
   * @param path - The dot-notation path (e.g., 'a.b.c')
   * @returns The value at the path, or undefined if not found
   */
  getNestedValue(obj, path) {
    const keys = path.split('.');
    return keys.reduce((current, key) => {
      if (current === null || current === void 0) {
        return void 0;
      }
      return current[key];
    }, obj);
  }
  /**
   * Set a nested value in an object using a dot-notation path
   * @param obj - The object to modify
   * @param path - The dot-notation path (e.g., 'a.b.c')
   * @param value - The value to set
   */
  setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
      }
      return current[key];
    }, obj);
    target[lastKey] = value;
  }
  get(key, defaultValue) {
    if (key.includes('.')) {
      const value = this.getNestedValue(this.config, key);
      return value ?? defaultValue;
    }
    return this.config[key] ?? defaultValue;
  }
  set(key, value) {
    if (key.includes('.')) {
      this.setNestedValue(this.config, key, value);
    } else {
      this.config[key] = value;
    }
  }
  update(configData) {
    this.config = {
      ...this.config,
      ...configData,
    };
  }
  getAll() {
    return { ...this.config };
  }
  reset() {
    this.initialize();
  }
  delete(key) {
    delete this.config[key];
  }
  hasKey(key) {
    return key in this.config;
  }
};
var config = Configuration.getInstance();

// src/global/logger.type.ts
var LogLevelIndex = {
  DEBUG: 5,
  INFO: 4,
  WARN: 3,
  ERROR: 2,
  FATAL: 1,
  OFF: 0,
};

// src/global/logger.ts
var Logger = class _Logger {
  static instance;
  config;
  constructor() {
    this.config = config;
  }
  static getInstance() {
    if (!_Logger.instance) {
      _Logger.instance = new _Logger();
    }
    return _Logger.instance;
  }
  getTimestamp() {
    return /* @__PURE__ */ new Date().toISOString();
  }
  shouldLog(messageLevel) {
    const configLevel = this.config.get('logLevel', 'INFO');
    return messageLevel <= LogLevelIndex[configLevel];
  }
  formatMessage(logMessage) {
    const { level, message, timestamp, data } = logMessage;
    let formattedMessage = `[${timestamp}] ${level}: ${message}`;
    if (data) {
      try {
        formattedMessage += `
${JSON.stringify(data, null, 2)}`;
      } catch (error) {
        formattedMessage += `
[JSON.stringify Error/Circular]: ${error}`;
      }
    }
    return formattedMessage;
  }
  log(level, message, data) {
    if (!this.shouldLog(LogLevelIndex[level])) {
      return;
    }
    const logMessage = {
      level,
      message,
      timestamp: this.getTimestamp(),
      data,
    };
    const formattedMessage = this.formatMessage(logMessage);
    switch (level) {
      case 'DEBUG':
        console.debug(formattedMessage);
        break;
      case 'INFO':
        console.info(formattedMessage);
        break;
      case 'WARN':
        console.warn(formattedMessage);
        break;
      case 'ERROR':
      case 'FATAL':
        console.error(formattedMessage);
        break;
      case 'OFF':
        break;
      default:
        console.log(formattedMessage);
        break;
    }
  }
  /**
   * debug will be displayed when LogLevel level is set to DEBUG(5)
   */
  debug(message, data) {
    this.log('DEBUG', message, data);
  }
  /**
   * info will be displayed when LogLevel level is set to DEBUG(5), INFO(4)
   */
  info(message, data) {
    this.log('INFO', message, data);
  }
  /**
   * warn will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3)
   */
  warn(message, data) {
    this.log('WARN', message, data);
  }
  /**
   * error will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2)
   */
  error(message, data) {
    this.log('ERROR', message, data);
  }
  /**
   * fatal will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2), FATAL(1)
   */
  fatal(message, data) {
    this.log('FATAL', message, data);
  }
  /**
   * Set the logging level you would like system to display
   * * 5 DEBUG  - show all logs
   * * 4 INFO
   * * 3 WARN
   * * 2 ERROR
   * * 1 FATAL
   * * 0 OFF    - disable logs
   */
  setLogLevel(level) {
    this.config.set('logLevel', level);
  }
  getLogLevel() {
    return this.config.get('logLevel', 'INFO');
  }
  /**
   *
   * @returns logs levels displayed on the configured LogLevel
   */
  getEnabledLogLevels() {
    return Object.keys(LogLevelIndex).filter((s) => {
      return this.shouldLog(LogLevelIndex[s]) && s !== 'OFF';
    });
  }
};
var logger = Logger.getInstance();

// src/channel/rpc_0_9_0.ts
var rpc_0_9_0_exports = {};
__export(rpc_0_9_0_exports, {
  RpcChannel: () => RpcChannel,
});

// src/types/lib/contract/index.ts
var EntryPointType = {
  EXTERNAL: 'EXTERNAL',
  L1_HANDLER: 'L1_HANDLER',
  CONSTRUCTOR: 'CONSTRUCTOR',
};

// src/types/calldata.ts
var ValidateType = {
  DEPLOY: 'DEPLOY',
  CALL: 'CALL',
  INVOKE: 'INVOKE',
};
var Uint = {
  u8: 'core::integer::u8',
  u16: 'core::integer::u16',
  u32: 'core::integer::u32',
  u64: 'core::integer::u64',
  u96: 'core::integer::u96',
  u128: 'core::integer::u128',
  u256: 'core::integer::u256',
  // This one is struct
  u512: 'core::integer::u512',
  // This one is struct
};
var Int = {
  i8: 'core::integer::i8',
  i16: 'core::integer::i16',
  i32: 'core::integer::i32',
  i64: 'core::integer::i64',
  i128: 'core::integer::i128',
};
var Literal = {
  ClassHash: 'core::starknet::class_hash::ClassHash',
  ContractAddress: 'core::starknet::contract_address::ContractAddress',
  Secp256k1Point: 'core::starknet::secp256k1::Secp256k1Point',
  U96: 'core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>',
};
var ETH_ADDRESS = 'core::starknet::eth_address::EthAddress';
var NON_ZERO_PREFIX = 'core::zeroable::NonZero::';

// src/contract/types/index.type.ts
function isAccount(providerOrAccount) {
  return 'execute' in providerOrAccount;
}

// src/types/outsideExecution.ts
var OutsideExecutionTypesV1 = {
  StarkNetDomain: [
    { name: 'name', type: 'felt' },
    { name: 'version', type: 'felt' },
    { name: 'chainId', type: 'felt' },
  ],
  OutsideExecution: [
    { name: 'caller', type: 'felt' },
    { name: 'nonce', type: 'felt' },
    { name: 'execute_after', type: 'felt' },
    { name: 'execute_before', type: 'felt' },
    { name: 'calls_len', type: 'felt' },
    { name: 'calls', type: 'OutsideCall*' },
  ],
  OutsideCall: [
    { name: 'to', type: 'felt' },
    { name: 'selector', type: 'felt' },
    { name: 'calldata_len', type: 'felt' },
    { name: 'calldata', type: 'felt*' },
  ],
};
var OutsideExecutionTypesV2 = {
  StarknetDomain: [
    // SNIP-12 revision 1 is used, so should be "StarknetDomain", not "StarkNetDomain"
    { name: 'name', type: 'shortstring' },
    { name: 'version', type: 'shortstring' },
    // set to 2 in v2
    { name: 'chainId', type: 'shortstring' },
    { name: 'revision', type: 'shortstring' },
  ],
  OutsideExecution: [
    { name: 'Caller', type: 'ContractAddress' },
    { name: 'Nonce', type: 'felt' },
    { name: 'Execute After', type: 'u128' },
    { name: 'Execute Before', type: 'u128' },
    { name: 'Calls', type: 'Call*' },
  ],
  Call: [
    { name: 'To', type: 'ContractAddress' },
    { name: 'Selector', type: 'selector' },
    { name: 'Calldata', type: 'felt*' },
  ],
};
var OutsideExecutionVersion = {
  UNSUPPORTED: '0',
  V1: '1',
  V2: '2',
};

// src/utils/assert.ts
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failure');
  }
}

// src/utils/json.ts
var json_exports = {};
__export(json_exports, {
  parse: () => parse2,
  parseAlwaysAsBig: () => parseAlwaysAsBig,
  stringify: () => stringify2,
});
var json = __toESM(require('lossless-json'));
var parseIntAsNumberOrBigInt = (str) => {
  if (!json.isInteger(str)) return parseFloat(str);
  const num = parseInt(str, 10);
  return Number.isSafeInteger(num) ? num : BigInt(str);
};
var parse2 = (str) => json.parse(String(str), void 0, parseIntAsNumberOrBigInt);
var parseAlwaysAsBig = (str) => json.parse(String(str), void 0, json.parseNumberAndBigInt);
var stringify2 = (value, replacer, space, numberStringifiers) =>
  json.stringify(value, replacer, space, numberStringifiers);

// src/utils/batch/index.ts
var BatchClient = class {
  nodeUrl;
  headers;
  interval;
  requestId = 0;
  pendingRequests = {};
  batchPromises = {};
  delayTimer;
  delayPromise;
  delayPromiseResolve;
  baseFetch;
  rpcMethods;
  constructor(options) {
    this.nodeUrl = options.nodeUrl;
    this.headers = options.headers;
    this.interval = options.interval;
    this.baseFetch = options.baseFetch;
    this.rpcMethods = options.rpcMethods;
  }
  async wait() {
    if (!this.delayPromise || !this.delayPromiseResolve) {
      this.delayPromise = new Promise((resolve) => {
        this.delayPromiseResolve = resolve;
      });
    }
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = void 0;
    }
    this.delayTimer = setTimeout(() => {
      if (this.delayPromiseResolve) {
        this.delayPromiseResolve();
        this.delayPromise = void 0;
        this.delayPromiseResolve = void 0;
      }
    }, this.interval);
    return this.delayPromise;
  }
  addPendingRequest(method, params, id) {
    const request = {
      id: id ?? `batched_${(this.requestId += 1)}`,
      jsonrpc: '2.0',
      method: method.description || String(method),
      params: params ?? void 0,
    };
    this.pendingRequests[request.id] = request;
    return request.id;
  }
  async sendBatch(requests) {
    const raw = await this.baseFetch(this.nodeUrl, {
      method: 'POST',
      body: stringify2(requests),
      headers: this.headers,
    });
    return raw.json();
  }
  /**
   * Automatically batches and fetches JSON-RPC calls in a single request.
   * @param method Method to call
   * @param params Method parameters
   * @param id JSON-RPC Request ID
   * @returns JSON-RPC Response
   */
  async fetch(method, params, id) {
    const requestId = this.addPendingRequest(method, params, id);
    await this.wait();
    const requests = this.pendingRequests;
    this.pendingRequests = {};
    if (!this.batchPromises[requestId]) {
      const promise = this.sendBatch(Object.values(requests));
      Object.keys(requests).forEach((key) => {
        this.batchPromises[key] = promise;
      });
    }
    const results = await this.batchPromises[requestId];
    delete this.batchPromises[requestId];
    const result = results.find((res) => res.id === requestId);
    if (!result)
      throw new Error(`Couldn't find the result for the request. Method: ${String(method)}`);
    return result;
  }
};

// src/utils/num.ts
var num_exports = {};
__export(num_exports, {
  addPercent: () => addPercent,
  assertInRange: () => assertInRange,
  bigNumberishArrayToDecimalStringArray: () => bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray: () => bigNumberishArrayToHexadecimalStringArray,
  cleanHex: () => cleanHex,
  getDecimalString: () => getDecimalString,
  getHexString: () => getHexString,
  getHexStringArray: () => getHexStringArray,
  getNext: () => getNext,
  hexToBytes: () => hexToBytes,
  hexToDecimalString: () => hexToDecimalString,
  isBigNumberish: () => isBigNumberish,
  isHex: () => isHex,
  isHexString: () => isHexString2,
  isStringWholeNumber: () => isStringWholeNumber,
  stringToSha256ToArrayBuff4: () => stringToSha256ToArrayBuff4,
  toBigInt: () => toBigInt,
  toCairoBool: () => toCairoBool,
  toHex: () => toHex,
  toHex64: () => toHex64,
  toHexString: () => toHexString,
  toStorageKey: () => toStorageKey,
  tryToBigInt: () => tryToBigInt,
});
var import_utils = require('@noble/curves/abstract/utils');
var import_sha256 = require('@noble/hashes/sha256');

// src/utils/typed.ts
var isUndefined = (value) => {
  return typeof value === 'undefined' || value === void 0;
};
function isNumber(value) {
  return typeof value === 'number';
}
function isBoolean(value) {
  return typeof value === 'boolean';
}
function isBigInt(value) {
  return typeof value === 'bigint';
}
function isString(value) {
  return typeof value === 'string';
}
function isBuffer(obj) {
  return typeof Buffer !== 'undefined' && obj instanceof Buffer;
}
function isObject(item) {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}
function isInteger2(value) {
  return Number.isInteger(value);
}

// src/utils/num.ts
function isHex(hex) {
  return /^0[xX][0-9a-fA-F]*$/.test(hex);
}
var isHexString2 = isHex;
function toBigInt(value) {
  return BigInt(value);
}
function tryToBigInt(value) {
  return value ? BigInt(value) : void 0;
}
function toHex(value) {
  return addHexPrefix(toBigInt(value).toString(16));
}
var toHexString = toHex;
function cleanHex(hex) {
  return toHex(hex);
}
function toStorageKey(number) {
  return addHexPrefix(toBigInt(number).toString(16).padStart(64, '0'));
}
function toHex64(number) {
  const res = addHexPrefix(toBigInt(number).toString(16).padStart(64, '0'));
  if (res.length !== 66) throw TypeError('number is too big for hex 0x(64) representation');
  return res;
}
function hexToDecimalString(hex) {
  return BigInt(addHexPrefix(hex)).toString(10);
}
function assertInRange(input, lowerBound, upperBound, inputName = '') {
  const messageSuffix = inputName === '' ? 'invalid length' : `invalid ${inputName} length`;
  const inputBigInt = BigInt(input);
  const lowerBoundBigInt = BigInt(lowerBound);
  const upperBoundBigInt = BigInt(upperBound);
  assert(
    inputBigInt >= lowerBoundBigInt && inputBigInt <= upperBoundBigInt,
    `Message not signable, ${messageSuffix}.`
  );
}
function bigNumberishArrayToDecimalStringArray(data) {
  return data.map((x) => toBigInt(x).toString(10));
}
function bigNumberishArrayToHexadecimalStringArray(data) {
  return data.map((x) => toHex(x));
}
function isStringWholeNumber(str) {
  return /^\d+$/.test(str);
}
function getDecimalString(str) {
  if (isHex(str)) {
    return hexToDecimalString(str);
  }
  if (isStringWholeNumber(str)) {
    return str;
  }
  throw new Error(`${str} needs to be a hex-string or whole-number-string`);
}
function getHexString(str) {
  if (isHex(str)) {
    return str;
  }
  if (isStringWholeNumber(str)) {
    return toHexString(str);
  }
  throw new Error(`${str} needs to be a hex-string or whole-number-string`);
}
function getHexStringArray(array) {
  return array.map(getHexString);
}
function toCairoBool(value) {
  return (+value).toString();
}
function hexToBytes(str) {
  if (!isHex(str)) throw new Error(`${str} needs to be a hex-string`);
  let adaptedValue = removeHexPrefix(str);
  if (adaptedValue.length % 2 !== 0) {
    adaptedValue = `0${adaptedValue}`;
  }
  return (0, import_utils.hexToBytes)(adaptedValue);
}
function addPercent(number, percent) {
  const bigIntNum = BigInt(number);
  return bigIntNum + (bigIntNum * BigInt(percent)) / 100n;
}
function stringToSha256ToArrayBuff4(str) {
  const int31 = (n) => Number(n & MASK_31);
  const result = int31(BigInt(addHexPrefix(buf2hex((0, import_sha256.sha256)(str)))));
  return hexToBytes(toHex(result));
}
function isBigNumberish(input) {
  return (
    isNumber(input) ||
    isBigInt(input) ||
    (isString(input) && (isHex(input) || isStringWholeNumber(input)))
  );
}
function getNext(iterator) {
  const it = iterator.next();
  if (it.done) throw new Error('Unexpected end of response');
  return it.value;
}

// src/utils/hash/selector.ts
var selector_exports = {};
__export(selector_exports, {
  getL1MessageHash: () => getL1MessageHash,
  getL2MessageHash: () => getL2MessageHash,
  getSelector: () => getSelector,
  getSelectorFromName: () => getSelectorFromName,
  keccakBn: () => keccakBn,
  solidityUint256PackedKeccak256: () => solidityUint256PackedKeccak256,
  starknetKeccak: () => starknetKeccak,
});
var import_starknet = require('@scure/starknet');
var import_sha3 = require('@noble/hashes/sha3');
var import_utils2 = require('@noble/curves/abstract/utils');
function keccakBn(value) {
  const hexWithoutPrefix = removeHexPrefix(toHex(BigInt(value)));
  const evenHex = hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;
  return addHexPrefix((0, import_starknet.keccak)(hexToBytes(addHexPrefix(evenHex))).toString(16));
}
function keccakHex(str) {
  return addHexPrefix((0, import_starknet.keccak)(utf8ToArray(str)).toString(16));
}
function starknetKeccak(str) {
  const hash = BigInt(keccakHex(str));
  return hash & MASK_250;
}
function getSelectorFromName(funcName) {
  return toHex(starknetKeccak(funcName));
}
function getSelector(value) {
  if (isNumber(value) || isBigInt(value)) return toHex(value);
  if (isHex(value)) return value;
  if (isStringWholeNumber(value)) return toHex(value);
  return getSelectorFromName(value);
}
function solidityUint256PackedKeccak256(params) {
  const myEncode = addHexPrefix(
    params.reduce((res, par) => res + removeHexPrefix(toHex(par)).padStart(64, '0'), '')
  );
  return addHexPrefix(
    (0, import_utils2.bytesToHex)((0, import_sha3.keccak_256)(hexToBytes(myEncode)))
  );
}
function getL2MessageHash(l1FromAddress, l2ToAddress, l2Selector, l2Calldata, l1Nonce) {
  return solidityUint256PackedKeccak256([
    l1FromAddress,
    l2ToAddress,
    l1Nonce,
    l2Selector,
    l2Calldata.length,
    ...l2Calldata,
  ]);
}
function getL1MessageHash(fromL2Address, toL1Address, payload) {
  return solidityUint256PackedKeccak256([fromL2Address, toL1Address, payload.length, ...payload]);
}

// src/utils/shortString.ts
var shortString_exports = {};
__export(shortString_exports, {
  decodeShortString: () => decodeShortString,
  encodeShortString: () => encodeShortString,
  isASCII: () => isASCII,
  isDecimalString: () => isDecimalString2,
  isLongText: () => isLongText,
  isShortString: () => isShortString,
  isShortText: () => isShortText,
  isText: () => isText,
  splitLongString: () => splitLongString,
});
function isASCII(str) {
  return /^[\x00-\x7F]*$/.test(str);
}
function isShortString(str) {
  return str.length <= TEXT_TO_FELT_MAX_LEN;
}
function isDecimalString2(str) {
  return /^[0-9]*$/i.test(str);
}
function isText(val) {
  return isString(val) && !isHex(val) && !isStringWholeNumber(val);
}
var isShortText = (val) => isText(val) && isShortString(val);
var isLongText = (val) => isText(val) && !isShortString(val);
function splitLongString(longStr) {
  const regex = RegExp(`[^]{1,${TEXT_TO_FELT_MAX_LEN}}`, 'g');
  return longStr.match(regex) || [];
}
function encodeShortString(str) {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (!isShortString(str)) throw new Error(`${str} is too long`);
  return addHexPrefix(str.replace(/./g, (char) => char.charCodeAt(0).toString(16)));
}
function decodeShortString(str) {
  if (!isASCII(str)) throw new Error(`${str} is not an ASCII string`);
  if (isHex(str)) {
    return removeHexPrefix(str).replace(/.{2}/g, (hex) => String.fromCharCode(parseInt(hex, 16)));
  }
  if (isDecimalString2(str)) {
    return decodeShortString('0X'.concat(BigInt(str).toString(16)));
  }
  throw new Error(`${str} is not Hex or decimal`);
}

// src/utils/calldata/byteArray.ts
var byteArray_exports = {};
__export(byteArray_exports, {
  byteArrayFromString: () => byteArrayFromString,
  stringFromByteArray: () => stringFromByteArray,
});
function stringFromByteArray(myByteArray) {
  const pending_word =
    BigInt(myByteArray.pending_word) === 0n
      ? ''
      : decodeShortString(toHex(myByteArray.pending_word));
  return (
    myByteArray.data.reduce((cumuledString, encodedString) => {
      const add = BigInt(encodedString) === 0n ? '' : decodeShortString(toHex(encodedString));
      return cumuledString + add;
    }, '') + pending_word
  );
}
function byteArrayFromString(targetString) {
  const shortStrings = splitLongString(targetString);
  const remainder = shortStrings[shortStrings.length - 1];
  const shortStringsEncoded = shortStrings.map(encodeShortString);
  const [pendingWord, pendingWordLength] =
    remainder === void 0 || remainder.length === 31
      ? ['0x00', 0]
      : [shortStringsEncoded.pop(), remainder.length];
  return {
    data: shortStringsEncoded.length === 0 ? [] : shortStringsEncoded,
    pending_word: pendingWord,
    pending_word_len: pendingWordLength,
  };
}

// src/utils/calldata/cairo.ts
var cairo_exports = {};
__export(cairo_exports, {
  felt: () => felt,
  getAbiContractVersion: () => getAbiContractVersion,
  getArrayType: () => getArrayType,
  isCairo1Abi: () => isCairo1Abi,
  isCairo1Type: () => isCairo1Type,
  isLen: () => isLen,
  isTypeArray: () => isTypeArray,
  isTypeBool: () => isTypeBool,
  isTypeContractAddress: () => isTypeContractAddress,
  isTypeEnum: () => isTypeEnum,
  isTypeEthAddress: () => isTypeEthAddress,
  isTypeFelt: () => isTypeFelt,
  isTypeInt: () => isTypeInt,
  isTypeLiteral: () => isTypeLiteral,
  isTypeNamedTuple: () => isTypeNamedTuple,
  isTypeNonZero: () => isTypeNonZero,
  isTypeOption: () => isTypeOption,
  isTypeResult: () => isTypeResult,
  isTypeSecp256k1Point: () => isTypeSecp256k1Point,
  isTypeStruct: () => isTypeStruct,
  isTypeTuple: () => isTypeTuple,
  isTypeU96: () => isTypeU96,
  isTypeUint: () => isTypeUint,
  isTypeUint256: () => isTypeUint256,
  tuple: () => tuple,
  uint256: () => uint256,
  uint512: () => uint512,
});

// src/utils/helpers.ts
function addCompiledFlag(compiled) {
  Object.defineProperty(compiled, '__compiled__', {
    enumerable: false,
    writable: false,
    value: true,
  });
  return compiled;
}

// src/utils/cairoDataTypes/felt.ts
var CairoFelt252 = class _CairoFelt252 {
  /**
   * byte representation of the felt252
   */
  data;
  static abiSelector = 'core::felt252';
  constructor(data) {
    _CairoFelt252.validate(data);
    const processedData = _CairoFelt252.__processData(data);
    this.data = processedData.subarray(processedData.findIndex((x) => x > 0));
  }
  static __processData(data) {
    if (isString(data)) {
      return stringToUint8Array(data);
    }
    if (isBigInt(data)) {
      return bigIntToUint8Array(data);
    }
    if (Number.isInteger(data)) {
      return bigIntToUint8Array(BigInt(data));
    }
    if (isBoolean(data)) {
      return bigIntToUint8Array(BigInt(data ? 1 : 0));
    }
    throw new Error(`${data} can't be computed by felt()`);
  }
  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }
  decodeUtf8() {
    return new TextDecoder().decode(this.data);
  }
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  static assertRange(val) {
    assert(val >= 0n && val < PRIME, `Value ${val} is out of felt252 range [0, ${PRIME})`);
  }
  static validate(data) {
    assert(data !== null, 'null value is not allowed for felt252');
    assert(data !== void 0, 'undefined value is not allowed for felt252');
    assert(
      isString(data) || isNumber(data) || isBigInt(data) || isBoolean(data),
      `Unsupported data type '${typeof data}' for felt252. Expected string, number, bigint, or boolean`
    );
    const value = _CairoFelt252.__processData(data);
    const bn = uint8ArrayToBigInt(value);
    _CairoFelt252.assertRange(bn);
  }
  static is(data) {
    try {
      _CairoFelt252.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  static isAbiType(abiType) {
    return abiType === _CairoFelt252.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoFelt252(getNext(responseIterator));
  }
};
function CairoFelt(it) {
  if (isBigInt(it) || Number.isInteger(it)) {
    const val = BigInt(it);
    CairoFelt252.assertRange(val);
    return val.toString();
  }
  if (isString(it)) {
    if (isHex(it)) {
      const val = BigInt(it);
      CairoFelt252.assertRange(val);
      return val.toString();
    }
    if (isText(it)) {
      if (!isShortString(it)) {
        throw new Error(
          `${it} is a long string > 31 chars. Please split it into an array of short strings.`
        );
      }
      return BigInt(encodeShortString(it)).toString();
    }
    if (isStringWholeNumber(it)) {
      const val = BigInt(it);
      CairoFelt252.assertRange(val);
      return val.toString();
    }
  }
  if (isBoolean(it)) {
    return `${+it}`;
  }
  throw new Error(`${it} can't be computed by felt()`);
}

// src/utils/cairoDataTypes/uint256.ts
var UINT_128_MAX = (1n << 128n) - 1n;
var UINT_256_MAX = (1n << 256n) - 1n;
var UINT_256_MIN = 0n;
var UINT_256_LOW_MAX = 340282366920938463463374607431768211455n;
var UINT_256_HIGH_MAX = 340282366920938463463374607431768211455n;
var UINT_256_LOW_MIN = 0n;
var UINT_256_HIGH_MIN = 0n;
var CairoUint256 = class _CairoUint256 {
  low;
  // TODO should be u128
  high;
  // TODO should be u128
  static abiSelector = 'core::integer::u256';
  constructor(...arr) {
    if (isObject(arr[0]) && arr.length === 1 && 'low' in arr[0] && 'high' in arr[0]) {
      const props = _CairoUint256.validateProps(arr[0].low, arr[0].high);
      this.low = props.low;
      this.high = props.high;
    } else if (arr.length === 1) {
      const bigInt = _CairoUint256.validate(arr[0]);
      this.low = bigInt & UINT_128_MAX;
      this.high = bigInt >> 128n;
    } else if (arr.length === 2) {
      const props = _CairoUint256.validateProps(arr[0], arr[1]);
      this.low = props.low;
      this.high = props.high;
    } else {
      throw Error('Incorrect constructor parameters');
    }
  }
  /**
   * Validate if BigNumberish can be represented as Unit256
   */
  static validate(bigNumberish) {
    assert(bigNumberish !== null, 'null value is not allowed for u256');
    assert(bigNumberish !== void 0, 'undefined value is not allowed for u256');
    assert(
      isBigNumberish(bigNumberish) || isObject(bigNumberish),
      `Unsupported data type '${typeof bigNumberish}' for u256. Expected string, number, bigint, or Uint256 object`
    );
    const bigInt = BigInt(bigNumberish);
    assert(bigInt >= UINT_256_MIN, 'bigNumberish is smaller than UINT_256_MIN');
    assert(bigInt <= UINT_256_MAX, 'bigNumberish is bigger than UINT_256_MAX');
    return bigInt;
  }
  /**
   * Validate if low and high can be represented as Unit256
   */
  static validateProps(low, high) {
    const bigIntLow = BigInt(low);
    const bigIntHigh = BigInt(high);
    assert(
      bigIntLow >= UINT_256_LOW_MIN && bigIntLow <= UINT_256_LOW_MAX,
      'low is out of range UINT_256_LOW_MIN - UINT_256_LOW_MAX'
    );
    assert(
      bigIntHigh >= UINT_256_HIGH_MIN && bigIntHigh <= UINT_256_HIGH_MAX,
      'high is out of range UINT_256_HIGH_MIN - UINT_256_HIGH_MAX'
    );
    return { low: bigIntLow, high: bigIntHigh };
  }
  /**
   * Check if BigNumberish can be represented as Unit256
   */
  static is(bigNumberish) {
    try {
      _CairoUint256.validate(bigNumberish);
    } catch (error) {
      return false;
    }
    return true;
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint256.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const low = getNext(responseIterator);
    const high = getNext(responseIterator);
    return new _CairoUint256(low, high);
  }
  /**
   * Return bigint representation
   */
  toBigInt() {
    return (this.high << 128n) + this.low;
  }
  /**
   * Return Uint256 structure with HexString props
   * {low: HexString, high: HexString}
   */
  toUint256HexString() {
    return {
      low: addHexPrefix(this.low.toString(16)),
      high: addHexPrefix(this.high.toString(16)),
    };
  }
  /**
   * Return Uint256 structure with DecimalString props
   * {low: DecString, high: DecString}
   */
  toUint256DecimalString() {
    return {
      low: this.low.toString(10),
      high: this.high.toString(10),
    };
  }
  /**
   * Return api requests representation witch is felt array
   */
  toApiRequest() {
    return [CairoFelt(this.low), CairoFelt(this.high)];
  }
};

// src/utils/cairoDataTypes/uint512.ts
var UINT_512_MAX = (1n << 512n) - 1n;
var UINT_512_MIN = 0n;
var UINT_128_MIN = 0n;
var CairoUint512 = class _CairoUint512 {
  limb0;
  // TODO should be u128
  limb1;
  // TODO should be u128
  limb2;
  // TODO should be u128
  limb3;
  // TODO should be u128
  static abiSelector = 'core::integer::u512';
  constructor(...arr) {
    if (
      isObject(arr[0]) &&
      arr.length === 1 &&
      'limb0' in arr[0] &&
      'limb1' in arr[0] &&
      'limb2' in arr[0] &&
      'limb3' in arr[0]
    ) {
      const props = _CairoUint512.validateProps(
        arr[0].limb0,
        arr[0].limb1,
        arr[0].limb2,
        arr[0].limb3
      );
      this.limb0 = props.limb0;
      this.limb1 = props.limb1;
      this.limb2 = props.limb2;
      this.limb3 = props.limb3;
    } else if (arr.length === 1) {
      const bigInt = _CairoUint512.validate(arr[0]);
      this.limb0 = bigInt & UINT_128_MAX;
      this.limb1 = (bigInt & (UINT_128_MAX << 128n)) >> 128n;
      this.limb2 = (bigInt & (UINT_128_MAX << 256n)) >> 256n;
      this.limb3 = bigInt >> 384n;
    } else if (arr.length === 4) {
      const props = _CairoUint512.validateProps(arr[0], arr[1], arr[2], arr[3]);
      this.limb0 = props.limb0;
      this.limb1 = props.limb1;
      this.limb2 = props.limb2;
      this.limb3 = props.limb3;
    } else {
      throw Error('Incorrect Uint512 constructor parameters');
    }
  }
  /**
   * Validate if BigNumberish can be represented as Uint512
   */
  static validate(bigNumberish) {
    assert(bigNumberish !== null, 'null value is not allowed for u512');
    assert(bigNumberish !== void 0, 'undefined value is not allowed for u512');
    assert(
      isBigNumberish(bigNumberish) || isObject(bigNumberish),
      `Unsupported data type '${typeof bigNumberish}' for u512. Expected string, number, bigint, or Uint512 object`
    );
    const bigInt = BigInt(bigNumberish);
    assert(bigInt >= UINT_512_MIN, 'bigNumberish is smaller than UINT_512_MIN.');
    assert(bigInt <= UINT_512_MAX, 'bigNumberish is bigger than UINT_512_MAX.');
    return bigInt;
  }
  /**
   * Validate if limbs can be represented as Uint512
   */
  static validateProps(limb0, limb1, limb2, limb3) {
    const l0 = BigInt(limb0);
    const l1 = BigInt(limb1);
    const l2 = BigInt(limb2);
    const l3 = BigInt(limb3);
    [l0, l1, l2, l3].forEach((value, index) => {
      assert(
        value >= UINT_128_MIN && value <= UINT_128_MAX,
        `limb${index} is not in the range of a u128 number`
      );
    });
    return { limb0: l0, limb1: l1, limb2: l2, limb3: l3 };
  }
  /**
   * Check if BigNumberish can be represented as Uint512
   */
  static is(bigNumberish) {
    try {
      _CairoUint512.validate(bigNumberish);
    } catch (error) {
      return false;
    }
    return true;
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint512.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const limb0 = getNext(responseIterator);
    const limb1 = getNext(responseIterator);
    const limb2 = getNext(responseIterator);
    const limb3 = getNext(responseIterator);
    return new _CairoUint512(limb0, limb1, limb2, limb3);
  }
  /**
   * Return bigint representation
   */
  toBigInt() {
    return (this.limb3 << 384n) + (this.limb2 << 256n) + (this.limb1 << 128n) + this.limb0;
  }
  /**
   * Return Uint512 structure with HexString props
   * limbx: HexString
   */
  toUint512HexString() {
    return {
      limb0: addHexPrefix(this.limb0.toString(16)),
      limb1: addHexPrefix(this.limb1.toString(16)),
      limb2: addHexPrefix(this.limb2.toString(16)),
      limb3: addHexPrefix(this.limb3.toString(16)),
    };
  }
  /**
   * Return Uint512 structure with DecimalString props
   * limbx DecString
   */
  toUint512DecimalString() {
    return {
      limb0: this.limb0.toString(10),
      limb1: this.limb1.toString(10),
      limb2: this.limb2.toString(10),
      limb3: this.limb3.toString(10),
    };
  }
  /**
   * Return api requests representation witch is felt array
   */
  toApiRequest() {
    return [
      CairoFelt(this.limb0),
      CairoFelt(this.limb1),
      CairoFelt(this.limb2),
      CairoFelt(this.limb3),
    ];
  }
};

// src/utils/calldata/cairo.ts
var isLen = (name) => /_len$/.test(name);
var isTypeFelt = (type) => type === 'felt' || type === 'core::felt252';
var isTypeArray = (type) =>
  /\*/.test(type) ||
  type.startsWith('core::array::Array::') ||
  type.startsWith('core::array::Span::');
var isTypeTuple = (type) => type.startsWith('(') && type.endsWith(')');
var isTypeNamedTuple = (type) => {
  const start = type.indexOf('(');
  return start !== -1 && type.indexOf(')', start + 1) !== -1 && type.includes(':');
};
var isTypeStruct = (type, structs) => type in structs;
var isTypeEnum = (type, enums) => type in enums;
var isTypeOption = (type) => type.startsWith('core::option::Option::');
var isTypeResult = (type) => type.startsWith('core::result::Result::');
var isTypeUint = (type) => Object.values(Uint).includes(type);
var isTypeInt = (type) => Object.values(Int).includes(type);
var isTypeUint256 = (type) => CairoUint256.isAbiType(type);
var isTypeLiteral = (type) => Object.values(Literal).includes(type);
var isTypeBool = (type) => type === 'core::bool';
var isTypeContractAddress = (type) => type === Literal.ContractAddress;
var isTypeEthAddress = (type) => type === ETH_ADDRESS;
var isTypeU96 = (type) =>
  type === 'core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>';
var isTypeSecp256k1Point = (type) => type === Literal.Secp256k1Point;
var isCairo1Type = (type) => type.includes('::');
var getArrayType = (type) => {
  return isCairo1Type(type)
    ? type.substring(type.indexOf('<') + 1, type.lastIndexOf('>'))
    : type.replaceAll('*', '');
};
function isCairo1Abi(abi) {
  const { cairo } = getAbiContractVersion(abi);
  if (cairo === void 0) {
    throw Error('Unable to determine Cairo version');
  }
  return cairo === '1';
}
function isTypeNonZero(type) {
  return type.startsWith(NON_ZERO_PREFIX);
}
function getAbiContractVersion(abi) {
  if (abi.find((it) => it.type === 'interface')) {
    return { cairo: '1', compiler: '2' };
  }
  const testSubject = abi.find(
    (it) =>
      (it.type === 'function' || it.type === 'constructor') &&
      (it.inputs.length || it.outputs.length)
  );
  if (!testSubject) {
    return { cairo: void 0, compiler: void 0 };
  }
  const io = testSubject.inputs.length ? testSubject.inputs : testSubject.outputs;
  if (isCairo1Type(io[0].type)) {
    return { cairo: '1', compiler: '1' };
  }
  return { cairo: '0', compiler: '0' };
}
var uint256 = (it) => {
  return new CairoUint256(it).toUint256DecimalString();
};
var uint512 = (it) => {
  return new CairoUint512(it).toUint512DecimalString();
};
var tuple = (...args) => ({ ...args });
function felt(it) {
  return CairoFelt(it);
}

// src/utils/calldata/enum/CairoCustomEnum.ts
var CairoCustomEnum = class {
  /**
   * direct readonly access to variants of the Cairo Custom Enum.
   * @returns a value of type any
   * @example
   * ```typescript
   * const successValue = myCairoEnum.variant.Success;
   */
  variant;
  /**
   * @param enumContent an object with the variants as keys and the content as value. Only one content shall be defined.
   */
  constructor(enumContent) {
    const variantsList = Object.values(enumContent);
    if (variantsList.length === 0) {
      throw new Error('This Enum must have at least 1 variant');
    }
    const nbActiveVariants = variantsList.filter((content) => !isUndefined(content)).length;
    if (nbActiveVariants !== 1) {
      throw new Error('This Enum must have exactly one active variant');
    }
    this.variant = enumContent;
  }
  /**
   *
   * @returns the content of the valid variant of a Cairo custom Enum.
   */
  unwrap() {
    const variants = Object.values(this.variant);
    return variants.find((item) => !isUndefined(item));
  }
  /**
   *
   * @returns the name of the valid variant of a Cairo custom Enum.
   */
  activeVariant() {
    const variants = Object.entries(this.variant);
    const activeVariant = variants.find((item) => !isUndefined(item[1]));
    return isUndefined(activeVariant) ? '' : activeVariant[0];
  }
};

// src/utils/calldata/enum/CairoOption.ts
var CairoOptionVariant = {
  Some: 0,
  None: 1,
};
var CairoOption = class {
  Some;
  None;
  constructor(variant, content) {
    if (!(variant in Object.values(CairoOptionVariant))) {
      throw new Error('Wrong variant! It should be CairoOptionVariant.Some or .None.');
    }
    if (variant === CairoOptionVariant.Some) {
      if (isUndefined(content)) {
        throw new Error(
          'The creation of a Cairo Option with "Some" variant needs a content as input.'
        );
      }
      this.Some = content;
      this.None = void 0;
    } else {
      this.Some = void 0;
      this.None = true;
    }
  }
  /**
   *
   * @returns the content of the valid variant of a Cairo custom Enum.
   *  If None, returns 'undefined'.
   */
  unwrap() {
    return this.None ? void 0 : this.Some;
  }
  /**
   *
   * @returns true if the valid variant is 'isSome'.
   */
  isSome() {
    return !isUndefined(this.Some);
  }
  /**
   *
   * @returns true if the valid variant is 'isNone'.
   */
  isNone() {
    return this.None === true;
  }
};

// src/utils/calldata/enum/CairoResult.ts
var CairoResultVariant = {
  Ok: 0,
  Err: 1,
};
var CairoResult = class {
  Ok;
  Err;
  constructor(variant, resultContent) {
    if (!(variant in Object.values(CairoResultVariant))) {
      throw new Error('Wrong variant! It should be CairoResultVariant.Ok or .Err.');
    }
    if (variant === CairoResultVariant.Ok) {
      this.Ok = resultContent;
      this.Err = void 0;
    } else {
      this.Ok = void 0;
      this.Err = resultContent;
    }
  }
  /**
   *
   * @returns the content of the valid variant of a Cairo Result.
   */
  unwrap() {
    if (!isUndefined(this.Ok)) {
      return this.Ok;
    }
    if (!isUndefined(this.Err)) {
      return this.Err;
    }
    throw new Error('Both Result.Ok and .Err are undefined. Not authorized.');
  }
  /**
   *
   * @returns true if the valid variant is 'Ok'.
   */
  isOk() {
    return !isUndefined(this.Ok);
  }
  /**
   *
   * @returns true if the valid variant is 'isErr'.
   */
  isErr() {
    return !isUndefined(this.Err);
  }
};

// src/utils/calldata/formatter.ts
var guard = {
  /**
   * Checks if the data is a BigInt (BN) and throws an error if not.
   *
   * @param {Record<string, any>} data - The data object containing the key to check.
   * @param {Record<string, any>} type - The type definition object.
   * @param {string} key - The key in the data object to check.
   * @throws {Error} If the data type does not match the expected BigInt (BN) type.
   */
  isBN: (data, type, key) => {
    if (!isBigInt(data[key]))
      throw new Error(
        `Data and formatter mismatch on ${key}:${type[key]}, expected response data ${key}:${data[key]} to be BN instead it is ${typeof data[key]}`
      );
  },
  /**
   * Throws an error for unhandled formatter types.
   *
   * @param {Record<string, any>} data - The data object containing the key.
   * @param {Record<string, any>} type - The type definition object.
   * @param {string} key - The key in the data object to check.
   * @throws {Error} If the formatter encounters an unknown type.
   */
  unknown: (data, type, key) => {
    throw new Error(`Unhandled formatter type on ${key}:${type[key]} for data ${key}:${data[key]}`);
  },
};
function formatter(data, type, sameType) {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const elType = sameType ?? type[key];
    if (!(key in type) && !sameType) {
      acc[key] = value;
      return acc;
    }
    if (elType === 'string') {
      if (Array.isArray(data[key])) {
        const arrayStr = formatter(
          data[key],
          data[key].map((_) => elType)
        );
        acc[key] = Object.values(arrayStr).join('');
        return acc;
      }
      guard.isBN(data, type, key);
      acc[key] = decodeShortString(value);
      return acc;
    }
    if (elType === 'number') {
      guard.isBN(data, type, key);
      acc[key] = Number(value);
      return acc;
    }
    if (typeof elType === 'function') {
      acc[key] = elType(value);
      return acc;
    }
    if (Array.isArray(elType)) {
      const arrayObj = formatter(data[key], elType, elType[0]);
      acc[key] = Object.values(arrayObj);
      return acc;
    }
    if (isObject(elType)) {
      acc[key] = formatter(data[key], elType);
      return acc;
    }
    guard.unknown(data, type, key);
    return acc;
  }, {});
}

// src/utils/calldata/parser/interface.ts
var AbiParserInterface = class {};

// src/utils/cairoDataTypes/bytes31.ts
var CairoBytes31 = class _CairoBytes31 {
  static MAX_BYTE_SIZE = 31;
  data;
  static abiSelector = 'core::bytes_31::bytes31';
  constructor(data) {
    _CairoBytes31.validate(data);
    const processedData = _CairoBytes31.__processData(data);
    this.data = new Uint8Array(_CairoBytes31.MAX_BYTE_SIZE);
    this.data.set(processedData, _CairoBytes31.MAX_BYTE_SIZE - processedData.length);
  }
  static __processData(data) {
    if (isString(data)) {
      return stringToUint8Array(data);
    }
    if (isBuffer(data)) {
      return new Uint8Array(data);
    }
    if (data instanceof Uint8Array) {
      return new Uint8Array(data);
    }
    throw new Error('Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array');
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }
  decodeUtf8() {
    const cutoff = this.data.findIndex((x) => x > 0);
    const pruned = this.data.subarray(cutoff >= 0 ? cutoff : Infinity);
    return new TextDecoder().decode(pruned);
  }
  /**
   * @param padded flag for including leading zeros
   */
  toHexString(padded) {
    const hex = padded === 'padded' ? buf2hex(this.data) : this.toBigInt().toString(16);
    return addHexPrefix(hex);
  }
  static validate(data) {
    const byteLength = _CairoBytes31.__processData(data).length;
    assert(
      byteLength <= this.MAX_BYTE_SIZE,
      `Data is too long: ${byteLength} bytes (max ${this.MAX_BYTE_SIZE} bytes)`
    );
  }
  static is(data) {
    try {
      _CairoBytes31.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoBytes31.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoBytes31(getNext(responseIterator));
  }
};

// src/utils/ec.ts
var ec_exports = {};
__export(ec_exports, {
  starkCurve: () => starkCurve,
  weierstrass: () => weierstrass,
});
var starkCurve = __toESM(require('@scure/starknet'));
var weierstrass = __toESM(require('@noble/curves/abstract/weierstrass'));

// src/utils/hash/pedersenCore.ts
function computePedersenHash(a, b) {
  return starkCurve.pedersen(BigInt(a), BigInt(b));
}
function computeHashOnElements(data) {
  return [...data, data.length]
    .reduce((x, y) => starkCurve.pedersen(BigInt(x), BigInt(y)), 0)
    .toString();
}
var computePedersenHashOnElements = computeHashOnElements;

// src/utils/errors/rpc.ts
var errorCodes = {
  FAILED_TO_RECEIVE_TXN: 1,
  NO_TRACE_AVAILABLE: 10,
  CONTRACT_NOT_FOUND: 20,
  ENTRYPOINT_NOT_FOUND: 21,
  BLOCK_NOT_FOUND: 24,
  INVALID_TXN_INDEX: 27,
  CLASS_HASH_NOT_FOUND: 28,
  TXN_HASH_NOT_FOUND: 29,
  PAGE_SIZE_TOO_BIG: 31,
  NO_BLOCKS: 32,
  INVALID_CONTINUATION_TOKEN: 33,
  TOO_MANY_KEYS_IN_FILTER: 34,
  CONTRACT_ERROR: 40,
  TRANSACTION_EXECUTION_ERROR: 41,
  STORAGE_PROOF_NOT_SUPPORTED: 42,
  CLASS_ALREADY_DECLARED: 51,
  INVALID_TRANSACTION_NONCE: 52,
  INSUFFICIENT_RESOURCES_FOR_VALIDATE: 53,
  INSUFFICIENT_ACCOUNT_BALANCE: 54,
  VALIDATION_FAILURE: 55,
  COMPILATION_FAILED: 56,
  CONTRACT_CLASS_SIZE_IS_TOO_LARGE: 57,
  NON_ACCOUNT: 58,
  DUPLICATE_TX: 59,
  COMPILED_CLASS_HASH_MISMATCH: 60,
  UNSUPPORTED_TX_VERSION: 61,
  UNSUPPORTED_CONTRACT_CLASS_VERSION: 62,
  UNEXPECTED_ERROR: 63,
  REPLACEMENT_TRANSACTION_UNDERPRICED: 64,
  FEE_BELOW_MINIMUM: 65,
  INVALID_SUBSCRIPTION_ID: 66,
  TOO_MANY_ADDRESSES_IN_FILTER: 67,
  TOO_MANY_BLOCKS_BACK: 68,
  COMPILATION_ERROR: 100,
  //
  INVALID_ADDRESS: 150,
  TOKEN_NOT_SUPPORTED: 151,
  INVALID_SIGNATURE: 153,
  MAX_AMOUNT_TOO_LOW: 154,
  CLASS_HASH_NOT_SUPPORTED: 155,
  PAYMASTER_TRANSACTION_EXECUTION_ERROR: 156,
  INVALID_TIME_BOUNDS: 157,
  INVALID_DEPLOYMENT_DATA: 158,
  INVALID_CLASS_HASH: 159,
  INVALID_ID: 160,
  UNKNOWN_ERROR: 163,
};
var rpc_default = errorCodes;

// src/utils/errors/index.ts
function fixStack(target, fn = target.constructor) {
  const { captureStackTrace } = Error;
  captureStackTrace && captureStackTrace(target, fn);
}
function fixProto(target, prototype) {
  const { setPrototypeOf } = Object;
  setPrototypeOf ? setPrototypeOf(target, prototype) : (target.__proto__ = prototype);
}
var CustomError = class extends Error {
  name;
  constructor(message) {
    super(message);
    Object.defineProperty(this, 'name', {
      value: new.target.name,
      enumerable: false,
      configurable: true,
    });
    fixProto(this, new.target.prototype);
    fixStack(this);
  }
};
var LibraryError = class extends CustomError {};
var RpcError = class extends LibraryError {
  constructor(baseError, method, params) {
    super(`RPC: ${method} with params ${stringify2(params, null, 2)}

      ${baseError.code}: ${baseError.message}: ${stringify2(baseError.data)}`);
    this.baseError = baseError;
    this.request = { method, params };
  }
  request;
  get code() {
    return this.baseError.code;
  }
  /**
   * Verifies the underlying RPC error, also serves as a type guard for the _baseError_ property
   * @example
   * ```typescript
   * SomeError.isType('UNEXPECTED_ERROR');
   * ```
   */
  isType(typeName) {
    return rpc_default[typeName] === this.code;
  }
};
var TimeoutError = class extends LibraryError {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
};
var WebSocketNotConnectedError = class extends LibraryError {
  constructor(message) {
    super(message);
    this.name = 'WebSocketNotConnectedError';
  }
};

// src/utils/connect/buffer.ts
var buffer_default =
  config.get('buffer') ||
  (typeof Buffer !== 'undefined' && Buffer) ||
  (typeof globalThis !== 'undefined' && globalThis.Buffer) ||
  (typeof window !== 'undefined' && window.Buffer) ||
  (typeof global !== 'undefined' && global.Buffer) ||
  class {
    constructor() {
      throw new LibraryError(
        `Buffer not detected, use 'config.set("buffer", YourBufferPolyfill)' or polyfill or Node.js environment for Buffer support`
      );
    }
    static from(_data) {
      throw new LibraryError(
        `Buffer not detected, use 'config.set("buffer", YourBufferPolyfill)' or polyfill or Node.js environment for Buffer support`
      );
    }
    static isBuffer(obj) {
      const BufferImpl = config.get('buffer') || (typeof Buffer !== 'undefined' && Buffer);
      return BufferImpl && BufferImpl.isBuffer && BufferImpl.isBuffer(obj);
    }
  };

// src/utils/cairoDataTypes/uint32.ts
var CairoUint32 = class _CairoUint32 {
  data;
  static abiSelector = 'core::u32::u32';
  constructor(data) {
    _CairoUint32.validate(data);
    this.data = _CairoUint32.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoUint32.__processData(data);
    assert(value >= 0n && value <= 2n ** 32n - 1n, 'Value is out of u32 range [0, 2^32)');
  }
  static is(data) {
    try {
      _CairoUint32.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint32.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoUint32(getNext(responseIterator));
  }
};

// src/utils/cairoDataTypes/byteArray.ts
var CairoByteArray = class _CairoByteArray {
  /**
   * entire dataset
   */
  data = [];
  /**
   * cairo specific implementation helper
   */
  pending_word;
  // felt
  /**
   * cairo specific implementation helper
   */
  pending_word_len;
  // u32
  static abiSelector = 'core::byte_array::ByteArray';
  constructor(...arr) {
    if (arr.length === 3) {
      const [dataArg, pendingWord, pendingWordLen] = arr;
      assert(
        Array.isArray(dataArg) &&
          pendingWord instanceof CairoFelt252 &&
          pendingWordLen instanceof CairoUint32,
        'Invalid constructor parameters. Expected (CairoBytes31[], CairoFelt252, CairoUint32)'
      );
      this.data = dataArg;
      this.pending_word = pendingWord;
      this.pending_word_len = pendingWordLen;
      return;
    }
    const inData = arr[0];
    _CairoByteArray.validate(inData);
    const { data, pending_word, pending_word_len } = _CairoByteArray.__processData(inData);
    this.data = data;
    this.pending_word = pending_word;
    this.pending_word_len = pending_word_len;
  }
  static __processData(inData) {
    let fullData;
    if (inData instanceof Uint8Array) {
      fullData = inData;
    } else if (isBuffer(inData)) {
      fullData = new Uint8Array(inData);
    } else if (isString(inData)) {
      fullData = stringToUint8Array(inData);
    } else if (isBigInt(inData)) {
      fullData = bigIntToUint8Array(inData);
    } else if (isInteger2(inData)) {
      fullData = bigIntToUint8Array(BigInt(inData));
    } else {
      throw new Error('Invalid input type. Expected Uint8Array, Buffer, string, number, or bigint');
    }
    const CHUNK_SIZE = CairoBytes31.MAX_BYTE_SIZE;
    const completeChunks = Math.floor(fullData.length / CHUNK_SIZE);
    const remainderLength = fullData.length % CHUNK_SIZE;
    const data = [];
    let pending_word;
    let pending_word_len;
    for (let i = 0; i < completeChunks; i += 1) {
      const chunkStart = i * CHUNK_SIZE;
      const chunkEnd = chunkStart + CHUNK_SIZE;
      const chunk = fullData.slice(chunkStart, chunkEnd);
      data.push(new CairoBytes31(chunk));
    }
    if (remainderLength > 0) {
      const remainder = fullData.slice(completeChunks * CHUNK_SIZE);
      let hex = '0x';
      for (let i = 0; i < remainder.length; i += 1) {
        hex += remainder[i].toString(16).padStart(2, '0');
      }
      pending_word = new CairoFelt252(hex);
      pending_word_len = new CairoUint32(remainderLength);
    } else {
      pending_word = new CairoFelt252(0);
      pending_word_len = new CairoUint32(0);
    }
    return { data, pending_word, pending_word_len };
  }
  toApiRequest() {
    this.assertInitialized();
    return addCompiledFlag([
      this.data.length.toString(),
      ...this.data.flatMap((bytes31) => bytes31.toApiRequest()),
      ...this.pending_word.toApiRequest(),
      ...this.pending_word_len.toApiRequest(),
    ]);
  }
  decodeUtf8() {
    const allBytes = concatenateArrayBuffer(this.toElements());
    return new TextDecoder().decode(allBytes);
  }
  toBigInt() {
    const allBytes = concatenateArrayBuffer(this.toElements());
    if (allBytes.length === 0) {
      return 0n;
    }
    let result = 0n;
    allBytes.forEach((byte) => {
      result = result * 256n + BigInt(byte);
    });
    return result;
  }
  toHexString() {
    const allBytes = concatenateArrayBuffer(this.toElements());
    const hexValue = allBytes.length === 0 ? '0' : buf2hex(allBytes);
    return addHexPrefix(hexValue);
  }
  toBuffer() {
    const allBytes = concatenateArrayBuffer(this.toElements());
    return buffer_default.from(allBytes);
  }
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
  hash() {
    this.assertInitialized();
    const serialized = [
      addHexPrefix(this.data.length.toString(16)),
      ...this.data.flatMap((bytes31) => bytes31.toApiRequest()),
      ...this.pending_word.toApiRequest(),
      ...this.pending_word_len.toApiRequest(),
    ];
    return computeHashOnElements(serialized);
  }
  /**
   * returns an array of all the data chunks and the pending word
   * when concatenated, represents the original bytes sequence
   */
  toElements() {
    this.assertInitialized();
    const allChunks = this.data.flatMap((chunk) => chunk.data);
    const pendingLen = Number(this.pending_word_len.toBigInt());
    if (pendingLen) {
      const pending = new Uint8Array(pendingLen);
      const paddingDifference = pendingLen - this.pending_word.data.length;
      pending.set(this.pending_word.data, paddingDifference);
      allChunks.push(pending);
    }
    return allChunks;
  }
  /**
   * Private helper to check if the CairoByteArray is properly initialized
   */
  assertInitialized() {
    assert(
      this.data && this.pending_word !== void 0 && this.pending_word_len !== void 0,
      'CairoByteArray is not properly initialized'
    );
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(
      !Array.isArray(data) || data instanceof Uint8Array,
      'Invalid input: arrays are not supported, use Uint8Array'
    );
    assert(
      typeof data !== 'object' || isBuffer(data) || data instanceof Uint8Array,
      'Invalid input for CairoByteArray: objects are not supported'
    );
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input for CairoByteArray: decimal numbers are not supported, only integers'
    );
    assert(
      !isNumber(data) || data >= 0,
      'Invalid input for CairoByteArray: negative numbers are not supported'
    );
    assert(
      !isBigInt(data) || data >= 0n,
      'Invalid input for CairoByteArray: negative bigints are not supported'
    );
    assert(
      data instanceof Uint8Array ||
        isBuffer(data) ||
        isString(data) ||
        isNumber(data) ||
        isBigInt(data),
      'Invalid input type. Expected Uint8Array, Buffer, string, number, or bigint'
    );
  }
  /**
   * Check if the provided data is a valid CairoByteArray
   *
   * @param data - The data to check
   * @returns True if the data is a valid CairoByteArray, false otherwise
   */
  static is(data) {
    try {
      _CairoByteArray.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoByteArray.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const data = Array.from({ length: Number(getNext(responseIterator)) }, () =>
      CairoBytes31.factoryFromApiResponse(responseIterator)
    );
    const pending_word = CairoFelt252.factoryFromApiResponse(responseIterator);
    const pending_word_len = CairoUint32.factoryFromApiResponse(responseIterator);
    return new _CairoByteArray(data, pending_word, pending_word_len);
  }
};

// src/utils/cairoDataTypes/uint8.ts
var CairoUint8 = class _CairoUint8 {
  data;
  static abiSelector = 'core::integer::u8';
  constructor(data) {
    _CairoUint8.validate(data);
    this.data = _CairoUint8.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoUint8.__processData(data);
    assert(
      value >= RANGE_U8.min && value <= RANGE_U8.max,
      `Value is out of u8 range [${RANGE_U8.min}, ${RANGE_U8.max}]`
    );
  }
  static is(data) {
    try {
      _CairoUint8.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint8.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoUint8(getNext(responseIterator));
  }
};

// src/utils/cairoDataTypes/uint16.ts
var CairoUint16 = class _CairoUint16 {
  data;
  static abiSelector = 'core::integer::u16';
  constructor(data) {
    _CairoUint16.validate(data);
    this.data = _CairoUint16.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoUint16.__processData(data);
    assert(
      value >= RANGE_U16.min && value <= RANGE_U16.max,
      `Value is out of u16 range [${RANGE_U16.min}, ${RANGE_U16.max}]`
    );
  }
  static is(data) {
    try {
      _CairoUint16.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint16.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoUint16(getNext(responseIterator));
  }
};

// src/utils/cairoDataTypes/uint64.ts
var CairoUint64 = class _CairoUint64 {
  data;
  static abiSelector = 'core::integer::u64';
  constructor(data) {
    _CairoUint64.validate(data);
    this.data = _CairoUint64.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoUint64.__processData(data);
    assert(
      value >= RANGE_U64.min && value <= RANGE_U64.max,
      `Value is out of u64 range [${RANGE_U64.min}, ${RANGE_U64.max}]`
    );
  }
  static is(data) {
    try {
      _CairoUint64.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint64.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoUint64(getNext(responseIterator));
  }
};

// src/utils/cairoDataTypes/uint96.ts
var CairoUint96 = class _CairoUint96 {
  data;
  static abiSelector = 'core::integer::u96';
  constructor(data) {
    _CairoUint96.validate(data);
    this.data = _CairoUint96.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoUint96.__processData(data);
    assert(
      value >= RANGE_U96.min && value <= RANGE_U96.max,
      `Value is out of u96 range [${RANGE_U96.min}, ${RANGE_U96.max}]`
    );
  }
  static is(data) {
    try {
      _CairoUint96.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint96.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoUint96(getNext(responseIterator));
  }
};

// src/utils/cairoDataTypes/uint128.ts
var CairoUint128 = class _CairoUint128 {
  data;
  static abiSelector = 'core::integer::u128';
  constructor(data) {
    _CairoUint128.validate(data);
    this.data = _CairoUint128.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }
  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoUint128.__processData(data);
    assert(
      value >= RANGE_U128.min && value <= RANGE_U128.max,
      `Value is out of u128 range [${RANGE_U128.min}, ${RANGE_U128.max}]`
    );
  }
  static is(data) {
    try {
      _CairoUint128.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoUint128.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    return new _CairoUint128(getNext(responseIterator));
  }
};

// src/utils/cairoDataTypes/int8.ts
var CairoInt8 = class _CairoInt8 {
  data;
  static abiSelector = 'core::integer::i8';
  constructor(data) {
    _CairoInt8.validate(data);
    this.data = _CairoInt8.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 256n + this.data)
    );
  }
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString() {
    const value = this.toBigInt();
    if (value < 0n) {
      const fieldElement = PRIME + value;
      return addHexPrefix(fieldElement.toString(16));
    }
    return addHexPrefix(value.toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoInt8.__processData(data);
    assert(
      value >= RANGE_I8.min && value <= RANGE_I8.max,
      `Value is out of i8 range [${RANGE_I8.min}, ${RANGE_I8.max}]`
    );
  }
  static is(data) {
    try {
      _CairoInt8.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoInt8.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    const signedValue = value > PRIME / 2n ? value - PRIME : value;
    return new _CairoInt8(signedValue);
  }
};

// src/utils/cairoDataTypes/int16.ts
var CairoInt16 = class _CairoInt16 {
  data;
  static abiSelector = 'core::integer::i16';
  constructor(data) {
    _CairoInt16.validate(data);
    this.data = _CairoInt16.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 65536n + this.data)
    );
  }
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString() {
    const value = this.toBigInt();
    if (value < 0n) {
      const fieldElement = PRIME + value;
      return addHexPrefix(fieldElement.toString(16));
    }
    return addHexPrefix(value.toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoInt16.__processData(data);
    assert(
      value >= RANGE_I16.min && value <= RANGE_I16.max,
      `Value is out of i16 range [${RANGE_I16.min}, ${RANGE_I16.max}]`
    );
  }
  static is(data) {
    try {
      _CairoInt16.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoInt16.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    const signedValue = value > PRIME / 2n ? value - PRIME : value;
    return new _CairoInt16(signedValue);
  }
};

// src/utils/cairoDataTypes/int32.ts
var CairoInt32 = class _CairoInt32 {
  data;
  static abiSelector = 'core::integer::i32';
  constructor(data) {
    _CairoInt32.validate(data);
    this.data = _CairoInt32.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 4294967296n + this.data)
    );
  }
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString() {
    const value = this.toBigInt();
    if (value < 0n) {
      const fieldElement = PRIME + value;
      return addHexPrefix(fieldElement.toString(16));
    }
    return addHexPrefix(value.toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoInt32.__processData(data);
    assert(
      value >= RANGE_I32.min && value <= RANGE_I32.max,
      `Value is out of i32 range [${RANGE_I32.min}, ${RANGE_I32.max}]`
    );
  }
  static is(data) {
    try {
      _CairoInt32.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoInt32.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    const signedValue = value > PRIME / 2n ? value - PRIME : value;
    return new _CairoInt32(signedValue);
  }
};

// src/utils/cairoDataTypes/int64.ts
var CairoInt64 = class _CairoInt64 {
  data;
  static abiSelector = 'core::integer::i64';
  constructor(data) {
    _CairoInt64.validate(data);
    this.data = _CairoInt64.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 2n ** 64n + this.data)
    );
  }
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString() {
    const value = this.toBigInt();
    if (value < 0n) {
      const fieldElement = PRIME + value;
      return addHexPrefix(fieldElement.toString(16));
    }
    return addHexPrefix(value.toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoInt64.__processData(data);
    assert(
      value >= RANGE_I64.min && value <= RANGE_I64.max,
      `Value is out of i64 range [${RANGE_I64.min}, ${RANGE_I64.max}]`
    );
  }
  static is(data) {
    try {
      _CairoInt64.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoInt64.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    const signedValue = value > PRIME / 2n ? value - PRIME : value;
    return new _CairoInt64(signedValue);
  }
};

// src/utils/cairoDataTypes/int128.ts
var CairoInt128 = class _CairoInt128 {
  data;
  static abiSelector = 'core::integer::i128';
  constructor(data) {
    _CairoInt128.validate(data);
    this.data = _CairoInt128.__processData(data);
  }
  static __processData(data) {
    if (isString(data) && isText(data)) {
      return utf8ToBigInt(data);
    }
    return BigInt(data);
  }
  toApiRequest() {
    return addCompiledFlag([BigInt(this.toHexString()).toString()]);
  }
  toBigInt() {
    return this.data;
  }
  decodeUtf8() {
    return new TextDecoder().decode(
      bigIntToUint8Array(this.data >= 0n ? this.data : 2n ** 128n + this.data)
    );
  }
  /**
   * For negative values field element representation as positive hex string.
   * @returns cairo field arithmetic hex string
   */
  toHexString() {
    const value = this.toBigInt();
    if (value < 0n) {
      const fieldElement = PRIME + value;
      return addHexPrefix(fieldElement.toString(16));
    }
    return addHexPrefix(value.toString(16));
  }
  static validate(data) {
    assert(data !== null && data !== void 0, 'Invalid input: null or undefined');
    assert(!isObject(data) && !Array.isArray(data), 'Invalid input: objects are not supported');
    assert(
      !isNumber(data) || Number.isInteger(data),
      'Invalid input: decimal numbers are not supported, only integers'
    );
    const value = _CairoInt128.__processData(data);
    assert(
      value >= RANGE_I128.min && value <= RANGE_I128.max,
      `Value is out of i128 range [${RANGE_I128.min}, ${RANGE_I128.max}]`
    );
  }
  static is(data) {
    try {
      _CairoInt128.validate(data);
      return true;
    } catch {
      return false;
    }
  }
  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType) {
    return abiType === _CairoInt128.abiSelector;
  }
  static factoryFromApiResponse(responseIterator) {
    const response = getNext(responseIterator);
    const value = BigInt(response);
    const signedValue = value > PRIME / 2n ? value - PRIME : value;
    return new _CairoInt128(signedValue);
  }
};

// src/utils/calldata/parser/parsingStrategy.ts
var hdParsingStrategy = {
  // TODO: provjeri svi request parseri stvaraju array, dali je to ok sa requstParserom
  request: {
    [CairoBytes31.abiSelector]: (val) => {
      return new CairoBytes31(val).toApiRequest();
    },
    [CairoByteArray.abiSelector]: (val) => {
      return new CairoByteArray(val).toApiRequest();
    },
    [CairoFelt252.abiSelector]: (val) => {
      return new CairoFelt252(val).toApiRequest();
    },
    [CairoUint256.abiSelector]: (val) => {
      return new CairoUint256(val).toApiRequest();
    },
    [CairoUint512.abiSelector]: (val) => {
      return new CairoUint512(val).toApiRequest();
    },
    [CairoUint8.abiSelector]: (val) => {
      return new CairoUint8(val).toApiRequest();
    },
    [CairoUint16.abiSelector]: (val) => {
      return new CairoUint16(val).toApiRequest();
    },
    [CairoUint64.abiSelector]: (val) => {
      return new CairoUint64(val).toApiRequest();
    },
    [CairoUint96.abiSelector]: (val) => {
      return new CairoUint96(val).toApiRequest();
    },
    [CairoUint128.abiSelector]: (val) => {
      return new CairoUint128(val).toApiRequest();
    },
    [CairoInt8.abiSelector]: (val) => {
      return new CairoInt8(val).toApiRequest();
    },
    [CairoInt16.abiSelector]: (val) => {
      return new CairoInt16(val).toApiRequest();
    },
    [CairoInt32.abiSelector]: (val) => {
      return new CairoInt32(val).toApiRequest();
    },
    [CairoInt64.abiSelector]: (val) => {
      return new CairoInt64(val).toApiRequest();
    },
    [CairoInt128.abiSelector]: (val) => {
      return new CairoInt128(val).toApiRequest();
    },
  },
  response: {
    [CairoBytes31.abiSelector]: (responseIterator) => {
      return CairoBytes31.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoByteArray.abiSelector]: (responseIterator) => {
      return CairoByteArray.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoFelt252.abiSelector]: (responseIterator) => {
      return CairoFelt252.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint256.abiSelector]: (responseIterator) => {
      return CairoUint256.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint512.abiSelector]: (responseIterator) => {
      return CairoUint512.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint8.abiSelector]: (responseIterator) => {
      return CairoUint8.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint16.abiSelector]: (responseIterator) => {
      return CairoUint16.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint64.abiSelector]: (responseIterator) => {
      return CairoUint64.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint96.abiSelector]: (responseIterator) => {
      return CairoUint96.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint128.abiSelector]: (responseIterator) => {
      return CairoUint128.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt8.abiSelector]: (responseIterator) => {
      return CairoInt8.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt16.abiSelector]: (responseIterator) => {
      return CairoInt16.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt32.abiSelector]: (responseIterator) => {
      return CairoInt32.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt64.abiSelector]: (responseIterator) => {
      return CairoInt64.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoInt128.abiSelector]: (responseIterator) => {
      return CairoInt128.factoryFromApiResponse(responseIterator).toBigInt();
    },
  },
};
var fastParsingStrategy = {
  request: {
    [CairoBytes31.abiSelector]: (val) => {
      return new CairoBytes31(val).toApiRequest();
    },
    [CairoByteArray.abiSelector]: (val) => {
      return new CairoByteArray(val).toApiRequest();
    },
    [CairoFelt252.abiSelector]: (val) => {
      return new CairoFelt252(val).toApiRequest();
    },
    [CairoUint256.abiSelector]: (val) => {
      return new CairoUint256(val).toApiRequest();
    },
    [CairoUint512.abiSelector]: (val) => {
      return new CairoUint512(val).toApiRequest();
    },
    [CairoUint8.abiSelector]: (val) => {
      return felt(val);
    },
    [CairoUint16.abiSelector]: (val) => {
      return felt(val);
    },
    [CairoUint64.abiSelector]: (val) => {
      return felt(val);
    },
    [CairoUint96.abiSelector]: (val) => {
      return felt(val);
    },
    [CairoUint128.abiSelector]: (val) => {
      return felt(val);
    },
    [CairoInt8.abiSelector]: (val) => {
      return new CairoInt8(val).toApiRequest();
    },
    [CairoInt16.abiSelector]: (val) => {
      return new CairoInt16(val).toApiRequest();
    },
    [CairoInt32.abiSelector]: (val) => {
      return new CairoInt32(val).toApiRequest();
    },
    [CairoInt64.abiSelector]: (val) => {
      return new CairoInt64(val).toApiRequest();
    },
    [CairoInt128.abiSelector]: (val) => {
      return new CairoInt128(val).toApiRequest();
    },
  },
  response: {
    [CairoBytes31.abiSelector]: (responseIterator) => {
      return CairoBytes31.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoByteArray.abiSelector]: (responseIterator) => {
      return CairoByteArray.factoryFromApiResponse(responseIterator).decodeUtf8();
    },
    [CairoFelt252.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint256.abiSelector]: (responseIterator) => {
      return CairoUint256.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint512.abiSelector]: (responseIterator) => {
      return CairoUint512.factoryFromApiResponse(responseIterator).toBigInt();
    },
    [CairoUint8.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint16.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint64.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint96.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoUint128.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt8.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt16.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt32.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt64.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
    [CairoInt128.abiSelector]: (responseIterator) => {
      return BigInt(getNext(responseIterator));
    },
  },
};

// src/utils/calldata/parser/parser-0-1.1.0.ts
var AbiParser1 = class {
  abi;
  parsingStrategy;
  constructor(abi, parsingStrategy) {
    this.abi = abi;
    this.parsingStrategy = parsingStrategy || fastParsingStrategy;
  }
  getRequestParser(abiType) {
    if (this.parsingStrategy.request[abiType]) {
      return this.parsingStrategy.request[abiType];
    }
    throw new Error(`Parser for ${abiType} not found`);
  }
  getResponseParser(abiType) {
    if (this.parsingStrategy.response[abiType]) {
      return this.parsingStrategy.response[abiType];
    }
    throw new Error(`Parser for ${abiType} not found`);
  }
  /**
   * abi method inputs length without '_len' inputs
   * cairo 0 reducer
   * @param abiMethod FunctionAbi
   * @returns number
   */
  methodInputsLength(abiMethod) {
    return abiMethod.inputs.reduce((acc, input) => (!isLen(input.name) ? acc + 1 : acc), 0);
  }
  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  getMethod(name) {
    return this.abi.find((it) => it.name === name);
  }
  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  getLegacyFormat() {
    return this.abi;
  }
};

// src/utils/calldata/parser/parser-2.0.0.ts
var AbiParser2 = class {
  abi;
  parsingStrategy;
  constructor(abi, parsingStrategy) {
    this.abi = abi;
    this.parsingStrategy = parsingStrategy || fastParsingStrategy;
  }
  getRequestParser(abiType) {
    if (this.parsingStrategy.request[abiType]) {
      return this.parsingStrategy.request[abiType];
    }
    throw new Error(`Parser for ${abiType} not found`);
  }
  getResponseParser(abiType) {
    if (this.parsingStrategy.response[abiType]) {
      return this.parsingStrategy.response[abiType];
    }
    throw new Error(`Parser for ${abiType} not found`);
  }
  /**
   * abi method inputs length
   * @param abiMethod FunctionAbi
   * @returns number
   */
  methodInputsLength(abiMethod) {
    return abiMethod.inputs.length;
  }
  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  getMethod(name) {
    const intf = this.abi.find((it) => it.type === 'interface');
    return intf?.items?.find((it) => it.name === name);
  }
  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  getLegacyFormat() {
    return this.abi.flatMap((it) => {
      return it.type === 'interface' ? it.items : it;
    });
  }
};

// src/utils/calldata/parser/index.ts
function createAbiParser(abi, parsingStrategy) {
  const version = getAbiVersion(abi);
  if (version === 0 || version === 1) {
    return new AbiParser1(abi, parsingStrategy);
  }
  if (version === 2) {
    return new AbiParser2(abi, parsingStrategy);
  }
  throw Error(`Unsupported ABI version ${version}`);
}
function getAbiVersion(abi) {
  if (abi.find((it) => it.type === 'interface')) return 2;
  if (isCairo1Abi(abi)) return 1;
  return 0;
}
function isNoConstructorValid(method, argsCalldata, abiMethod) {
  return method === 'constructor' && !abiMethod && !argsCalldata.length;
}

// src/utils/calldata/tuple.ts
function parseNamedTuple(namedTuple) {
  const name = namedTuple.substring(0, namedTuple.indexOf(':'));
  const type = namedTuple.substring(name.length + ':'.length);
  return { name, type };
}
function parseSubTuple(s) {
  if (!s.includes('(')) return { subTuple: [], result: s };
  const subTuple = [];
  let result = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '(') {
      let counter = 1;
      const lBracket = i;
      i++;
      while (counter) {
        if (s[i] === ')') counter--;
        if (s[i] === '(') counter++;
        i++;
      }
      subTuple.push(s.substring(lBracket, i));
      result += ' ';
      i--;
    } else {
      result += s[i];
    }
    i++;
  }
  return {
    subTuple,
    result,
  };
}
function extractCairo0Tuple(type) {
  const cleanType = type.replace(/\s/g, '').slice(1, -1);
  const { subTuple, result } = parseSubTuple(cleanType);
  let recomposed = result.split(',').map((it) => {
    return subTuple.length ? it.replace(' ', subTuple.shift()) : it;
  });
  if (isTypeNamedTuple(type)) {
    recomposed = recomposed.reduce((acc, it) => {
      return acc.concat(parseNamedTuple(it));
    }, []);
  }
  return recomposed;
}
function getClosureOffset(input, open, close) {
  for (let i = 0, counter = 0; i < input.length; i++) {
    if (input[i] === open) {
      counter++;
    } else if (input[i] === close && --counter === 0) {
      return i;
    }
  }
  return Number.POSITIVE_INFINITY;
}
function extractCairo1Tuple(type) {
  const input = type.slice(1, -1);
  const result = [];
  let currentIndex = 0;
  let limitIndex;
  while (currentIndex < input.length) {
    switch (true) {
      // Tuple
      case input[currentIndex] === '(': {
        limitIndex = currentIndex + getClosureOffset(input.slice(currentIndex), '(', ')') + 1;
        break;
      }
      case input.startsWith('core::result::Result::<', currentIndex) ||
        input.startsWith('core::array::Array::<', currentIndex) ||
        input.startsWith('core::option::Option::<', currentIndex): {
        limitIndex = currentIndex + getClosureOffset(input.slice(currentIndex), '<', '>') + 1;
        break;
      }
      default: {
        const commaIndex = input.indexOf(',', currentIndex);
        limitIndex = commaIndex !== -1 ? commaIndex : Number.POSITIVE_INFINITY;
      }
    }
    result.push(input.slice(currentIndex, limitIndex));
    currentIndex = limitIndex + 2;
  }
  return result;
}
function extractTupleMemberTypes(type) {
  return isCairo1Type(type) ? extractCairo1Tuple(type) : extractCairo0Tuple(type);
}

// src/utils/cairoDataTypes/fixedArray.ts
var CairoFixedArray = class _CairoFixedArray {
  /**
   * JS array representing a Cairo fixed array.
   */
  content;
  /**
   * Cairo fixed array type.
   */
  arrayType;
  static parseFixedArrayType(type) {
    if (!type.startsWith('[') || !type.endsWith(']')) {
      return void 0;
    }
    const separator = type.lastIndexOf('; ');
    const itemType = type.slice(1, separator);
    const size = type.slice(separator + 2, -1);
    if (
      separator <= 1 ||
      size.length === 0 ||
      ![...size].every((char) => char >= '0' && char <= '9')
    ) {
      return void 0;
    }
    return { itemType, size };
  }
  /**
   * Create an instance representing a Cairo fixed Array.
   * @param {any[]} content JS array representing a Cairo fixed array.
   * @param {string} arrayType Cairo fixed array type.
   */
  constructor(content, arrayType) {
    assert(
      _CairoFixedArray.isTypeFixedArray(arrayType),
      `The type ${arrayType} is not a Cairo fixed array. Needs [type; length].`
    );
    try {
      _CairoFixedArray.getFixedArrayType(arrayType);
    } catch {
      throw new Error(
        `The type ${arrayType} do not includes any content type. Needs [type; length].`
      );
    }
    let arraySize;
    try {
      arraySize = _CairoFixedArray.getFixedArraySize(arrayType);
    } catch {
      throw new Error(
        `The type ${arrayType} type do not includes any length. Needs [type; length].`
      );
    }
    assert(
      arraySize === content.length,
      `The ABI type ${arrayType} is expecting ${arraySize} items. ${content.length} items provided.`
    );
    this.content = content;
    this.arrayType = arrayType;
  }
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
  static getFixedArraySize(type) {
    const fixedArrayType = _CairoFixedArray.parseFixedArrayType(type);
    if (!fixedArrayType)
      throw new Error(`ABI type ${type} do not includes a valid number after ';' character.`);
    return Number(fixedArrayType.size);
  }
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
  getFixedArraySize() {
    return _CairoFixedArray.getFixedArraySize(this.arrayType);
  }
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
  static getFixedArrayType = (type) => {
    const fixedArrayType = _CairoFixedArray.parseFixedArrayType(type);
    if (!fixedArrayType) throw new Error(`ABI type ${type} do not includes a valid type of data.`);
    return fixedArrayType.itemType;
  };
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
  getFixedArrayType() {
    return _CairoFixedArray.getFixedArrayType(this.arrayType);
  }
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
  static compile(input) {
    return input.reduce((acc, item, idx) => {
      acc[idx] = item;
      return acc;
    }, {});
  }
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
  compile() {
    return _CairoFixedArray.compile(this.content);
  }
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
  static isTypeFixedArray(type) {
    return _CairoFixedArray.parseFixedArrayType(type) !== void 0;
  }
};

// src/utils/calldata/propertyOrder.ts
function errorU256(key) {
  return Error(
    `Your object includes the property : ${key}, containing an Uint256 object without the 'low' and 'high' keys.`
  );
}
function errorU512(key) {
  return Error(
    `Your object includes the property : ${key}, containing an Uint512 object without the 'limb0' to 'limb3' keys.`
  );
}
function orderPropsByAbi(unorderedObject, abiOfObject, structs, enums) {
  const orderInput = (unorderedItem, abiType) => {
    if (CairoFixedArray.isTypeFixedArray(abiType)) {
      return orderFixedArray(unorderedItem, abiType);
    }
    if (isTypeArray(abiType)) {
      return orderArray(unorderedItem, abiType);
    }
    if (isTypeEnum(abiType, enums)) {
      const abiObj = enums[abiType];
      return orderEnum(unorderedItem, abiObj);
    }
    if (isTypeTuple(abiType)) {
      return orderTuple(unorderedItem, abiType);
    }
    if (isTypeEthAddress(abiType)) {
      return unorderedItem;
    }
    if (isTypeNonZero(abiType)) {
      return unorderedItem;
    }
    if (CairoByteArray.isAbiType(abiType)) {
      return unorderedItem;
    }
    if (isTypeU96(abiType)) {
      return unorderedItem;
    }
    if (isTypeSecp256k1Point(abiType)) {
      return unorderedItem;
    }
    if (CairoUint256.isAbiType(abiType)) {
      const u256 = unorderedItem;
      if (typeof u256 !== 'object') {
        return u256;
      }
      if (!('low' in u256 && 'high' in u256)) {
        throw errorU256(abiType);
      }
      return { low: u256.low, high: u256.high };
    }
    if (CairoUint512.isAbiType(abiType)) {
      const u512 = unorderedItem;
      if (typeof u512 !== 'object') {
        return u512;
      }
      if (!['limb0', 'limb1', 'limb2', 'limb3'].every((key) => key in u512)) {
        throw errorU512(abiType);
      }
      return { limb0: u512.limb0, limb1: u512.limb1, limb2: u512.limb2, limb3: u512.limb3 };
    }
    if (isTypeStruct(abiType, structs)) {
      const abiOfStruct = structs[abiType].members;
      return orderStruct(unorderedItem, abiOfStruct);
    }
    return unorderedItem;
  };
  const orderStruct = (unorderedObject2, abiObject) => {
    const orderedObject2 = abiObject.reduce((orderedObject, abiParam) => {
      const setProperty = (value) =>
        Object.defineProperty(orderedObject, abiParam.name, {
          enumerable: true,
          value: value ?? unorderedObject2[abiParam.name],
        });
      if (unorderedObject2[abiParam.name] === 'undefined') {
        if (isCairo1Type(abiParam.type) || !isLen(abiParam.name)) {
          throw Error(`Your object needs a property with key : ${abiParam.name} .`);
        }
      }
      setProperty(orderInput(unorderedObject2[abiParam.name], abiParam.type));
      return orderedObject;
    }, {});
    return orderedObject2;
  };
  function orderArray(myArray, abiParam) {
    const typeInArray = getArrayType(abiParam);
    if (isString(myArray)) {
      return myArray;
    }
    return myArray.map((myElem) => orderInput(myElem, typeInArray));
  }
  function orderFixedArray(input, abiParam) {
    const typeInFixedArray = CairoFixedArray.getFixedArrayType(abiParam);
    const arraySize = CairoFixedArray.getFixedArraySize(abiParam);
    if (Array.isArray(input)) {
      if (arraySize !== input.length) {
        throw new Error(
          `ABI type ${abiParam}: array provided do not includes  ${arraySize} items. ${input.length} items provided.`
        );
      }
      return input.map((myElem) => orderInput(myElem, typeInFixedArray));
    }
    if (arraySize !== Object.keys(input).length) {
      throw new Error(
        `ABI type ${abiParam}: object provided do not includes  ${arraySize} properties. ${Object.keys(input).length} items provided.`
      );
    }
    return orderInput(input, typeInFixedArray);
  }
  function orderTuple(unorderedObject2, abiParam) {
    const typeList = extractTupleMemberTypes(abiParam);
    const orderedObject2 = typeList.reduce((orderedObject, abiTypeCairoX, index) => {
      const myObjKeys = Object.keys(unorderedObject2);
      const setProperty = (value) =>
        Object.defineProperty(orderedObject, index.toString(), {
          enumerable: true,
          value: value ?? unorderedObject2[myObjKeys[index]],
        });
      const abiType = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX;
      setProperty(orderInput(unorderedObject2[myObjKeys[index]], abiType));
      return orderedObject;
    }, {});
    return orderedObject2;
  }
  const orderEnum = (unorderedObject2, abiObject) => {
    if (isTypeResult(abiObject.name)) {
      const unorderedResult = unorderedObject2;
      const resultOkType = abiObject.name.substring(
        abiObject.name.indexOf('<') + 1,
        abiObject.name.lastIndexOf(',')
      );
      const resultErrType = abiObject.name.substring(
        abiObject.name.indexOf(',') + 1,
        abiObject.name.lastIndexOf('>')
      );
      if (unorderedResult.isOk()) {
        return new CairoResult(
          CairoResultVariant.Ok,
          orderInput(unorderedObject2.unwrap(), resultOkType)
        );
      }
      return new CairoResult(
        CairoResultVariant.Err,
        orderInput(unorderedObject2.unwrap(), resultErrType)
      );
    }
    if (isTypeOption(abiObject.name)) {
      const unorderedOption = unorderedObject2;
      const resultSomeType = abiObject.name.substring(
        abiObject.name.indexOf('<') + 1,
        abiObject.name.lastIndexOf('>')
      );
      if (unorderedOption.isSome()) {
        return new CairoOption(
          CairoOptionVariant.Some,
          orderInput(unorderedOption.unwrap(), resultSomeType)
        );
      }
      return new CairoOption(CairoOptionVariant.None, {});
    }
    const unorderedCustomEnum = unorderedObject2;
    const variants = Object.entries(unorderedCustomEnum.variant);
    const newEntries = variants.map((variant) => {
      if (isUndefined(variant[1])) {
        return variant;
      }
      const variantType = abiObject.type.substring(
        abiObject.type.lastIndexOf('<') + 1,
        abiObject.type.lastIndexOf('>')
      );
      if (variantType === '()') {
        return variant;
      }
      return [variant[0], orderInput(unorderedCustomEnum.unwrap(), variantType)];
    });
    return new CairoCustomEnum(Object.fromEntries(newEntries));
  };
  const finalOrderedObject = abiOfObject.reduce((orderedObject, abiParam) => {
    const setProperty = (value) =>
      Object.defineProperty(orderedObject, abiParam.name, {
        enumerable: true,
        value,
      });
    if (isLen(abiParam.name) && !isCairo1Type(abiParam.type)) {
      return orderedObject;
    }
    setProperty(orderInput(unorderedObject[abiParam.name], abiParam.type));
    return orderedObject;
  }, {});
  return finalOrderedObject;
}

// src/utils/calldata/requestParser.ts
function parseBaseTypes({ type, val, parser }) {
  switch (true) {
    case CairoUint256.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint512.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint8.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint16.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint64.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint96.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoUint128.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt8.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt16.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt32.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt64.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoInt128.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case CairoBytes31.isAbiType(type):
      return parser.getRequestParser(type)(val);
    case isTypeSecp256k1Point(type): {
      const pubKeyETH = removeHexPrefix(toHex(val)).padStart(128, '0');
      const pubKeyETHy = uint256(addHexPrefix(pubKeyETH.slice(-64)));
      const pubKeyETHx = uint256(addHexPrefix(pubKeyETH.slice(0, -64)));
      return [
        felt(pubKeyETHx.low),
        felt(pubKeyETHx.high),
        felt(pubKeyETHy.low),
        felt(pubKeyETHy.high),
      ];
    }
    default:
      return parser.getRequestParser(CairoFelt252.abiSelector)(val);
  }
}
function parseTuple(element, typeStr) {
  const memberTypes = extractTupleMemberTypes(typeStr);
  const elements = Object.values(element);
  if (elements.length !== memberTypes.length) {
    throw Error(
      `ParseTuple: provided and expected abi tuple size do not match.
      provided: ${elements}
      expected: ${memberTypes}`
    );
  }
  return memberTypes.map((it, dx) => {
    return {
      element: elements[dx],
      type: it.type ?? it,
    };
  });
}
function parseCalldataValue({ element, type, structs, enums, parser }) {
  if (element === void 0) {
    throw Error(`Missing parameter for type ${type}`);
  }
  if (CairoFixedArray.isTypeFixedArray(type)) {
    const arrayType = CairoFixedArray.getFixedArrayType(type);
    let values = [];
    if (Array.isArray(element)) {
      const array = new CairoFixedArray(element, type);
      values = array.content;
    } else if (typeof element === 'object') {
      values = Object.values(element);
      assert(
        values.length === CairoFixedArray.getFixedArraySize(type),
        `ABI type ${type}: object provided do not includes  ${CairoFixedArray.getFixedArraySize(type)} items. ${values.length} items provided.`
      );
    } else {
      throw new Error(`ABI type ${type}: not an Array representing a cairo.fixedArray() provided.`);
    }
    return values.reduce((acc, it) => {
      return acc.concat(
        parseCalldataValue({ element: it, type: arrayType, structs, enums, parser })
      );
    }, []);
  }
  if (Array.isArray(element)) {
    const result = [];
    result.push(felt(element.length));
    const arrayType = getArrayType(type);
    return element.reduce((acc, it) => {
      return acc.concat(
        parseCalldataValue({ element: it, type: arrayType, structs, enums, parser })
      );
    }, result);
  }
  if (CairoUint256.isAbiType(type)) {
    return parser.getRequestParser(type)(element);
  }
  if (CairoUint512.isAbiType(type)) {
    return parser.getRequestParser(type)(element);
  }
  if (structs[type] && structs[type].members.length) {
    if (isTypeEthAddress(type)) {
      return parseBaseTypes({ type, val: element, parser });
    }
    if (CairoByteArray.isAbiType(type)) {
      return parser.getRequestParser(type)(element);
    }
    const { members } = structs[type];
    const subElement = element;
    return members.reduce((acc, it) => {
      return acc.concat(
        parseCalldataValue({
          element: subElement[it.name],
          type: it.type,
          structs,
          enums,
          parser,
        })
      );
    }, []);
  }
  if (isTypeTuple(type)) {
    const tupled = parseTuple(element, type);
    return tupled.reduce((acc, it) => {
      const parsedData = parseCalldataValue({
        element: it.element,
        type: it.type,
        structs,
        enums,
        parser,
      });
      return acc.concat(parsedData);
    }, []);
  }
  if (isTypeEnum(type, enums)) {
    const { variants } = enums[type];
    if (isTypeOption(type)) {
      const myOption = element;
      if (myOption.isSome()) {
        const listTypeVariant2 = variants.find((variant) => variant.name === 'Some');
        if (isUndefined(listTypeVariant2)) {
          throw Error(`Error in abi : Option has no 'Some' variant.`);
        }
        const typeVariantSome = listTypeVariant2.type;
        if (typeVariantSome === '()') {
          return CairoOptionVariant.Some.toString();
        }
        const parsedParameter2 = parseCalldataValue({
          element: myOption.unwrap(),
          type: typeVariantSome,
          structs,
          enums,
          parser,
        });
        if (Array.isArray(parsedParameter2)) {
          return [CairoOptionVariant.Some.toString(), ...parsedParameter2];
        }
        return [CairoOptionVariant.Some.toString(), parsedParameter2];
      }
      return CairoOptionVariant.None.toString();
    }
    if (isTypeResult(type)) {
      const myResult = element;
      if (myResult.isOk()) {
        const listTypeVariant3 = variants.find((variant) => variant.name === 'Ok');
        if (isUndefined(listTypeVariant3)) {
          throw Error(`Error in abi : Result has no 'Ok' variant.`);
        }
        const typeVariantOk = listTypeVariant3.type;
        if (typeVariantOk === '()') {
          return CairoResultVariant.Ok.toString();
        }
        const parsedParameter3 = parseCalldataValue({
          element: myResult.unwrap(),
          type: typeVariantOk,
          structs,
          enums,
          parser,
        });
        if (Array.isArray(parsedParameter3)) {
          return [CairoResultVariant.Ok.toString(), ...parsedParameter3];
        }
        return [CairoResultVariant.Ok.toString(), parsedParameter3];
      }
      const listTypeVariant2 = variants.find((variant) => variant.name === 'Err');
      if (isUndefined(listTypeVariant2)) {
        throw Error(`Error in abi : Result has no 'Err' variant.`);
      }
      const typeVariantErr = listTypeVariant2.type;
      if (typeVariantErr === '()') {
        return CairoResultVariant.Err.toString();
      }
      const parsedParameter2 = parseCalldataValue({
        element: myResult.unwrap(),
        type: typeVariantErr,
        structs,
        enums,
        parser,
      });
      if (Array.isArray(parsedParameter2)) {
        return [CairoResultVariant.Err.toString(), ...parsedParameter2];
      }
      return [CairoResultVariant.Err.toString(), parsedParameter2];
    }
    const myEnum = element;
    const activeVariant = myEnum.activeVariant();
    const listTypeVariant = variants.find((variant) => variant.name === activeVariant);
    if (isUndefined(listTypeVariant)) {
      throw Error(`Not find in abi : Enum has no '${activeVariant}' variant.`);
    }
    const typeActiveVariant = listTypeVariant.type;
    const numActiveVariant = variants.findIndex((variant) => variant.name === activeVariant);
    if (typeActiveVariant === '()') {
      return numActiveVariant.toString();
    }
    const parsedParameter = parseCalldataValue({
      element: myEnum.unwrap(),
      type: typeActiveVariant,
      structs,
      enums,
      parser,
    });
    if (Array.isArray(parsedParameter)) {
      return [numActiveVariant.toString(), ...parsedParameter];
    }
    return [numActiveVariant.toString(), parsedParameter];
  }
  if (isTypeNonZero(type)) {
    return parseBaseTypes({ type: getArrayType(type), val: element, parser });
  }
  if (typeof element === 'object') {
    throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
  }
  return parseBaseTypes({ type, val: element, parser });
}
function parseCalldataField({ argsIterator, input, structs, enums, parser }) {
  const { name, type } = input;
  let { value } = argsIterator.next();
  switch (true) {
    // Fixed array
    case CairoFixedArray.isTypeFixedArray(type):
      if (!Array.isArray(value) && !(typeof value === 'object')) {
        throw Error(`ABI expected parameter ${name} to be an array or an object, got ${value}`);
      }
      return parseCalldataValue({ element: value, type: input.type, structs, enums, parser });
    // Normal Array
    case isTypeArray(type):
      if (!Array.isArray(value) && !isText(value)) {
        throw Error(`ABI expected parameter ${name} to be array or long string, got ${value}`);
      }
      if (isString(value)) {
        value = splitLongString(value);
      }
      return parseCalldataValue({ element: value, type: input.type, structs, enums, parser });
    case isTypeNonZero(type):
      return parseBaseTypes({ type: getArrayType(type), val: value, parser });
    case isTypeEthAddress(type):
      return parseBaseTypes({ type, val: value, parser });
    // Struct or Tuple
    case isTypeStruct(type, structs) || isTypeTuple(type) || CairoUint256.isAbiType(type):
      return parseCalldataValue({
        element: value,
        type,
        structs,
        enums,
        parser,
      });
    // Enums
    case isTypeEnum(type, enums):
      return parseCalldataValue({
        element: value,
        type,
        structs,
        enums,
        parser,
      });
    // Felt or unhandled
    default:
      return parseBaseTypes({ type, val: value, parser });
  }
}

// src/utils/calldata/responseParser.ts
function parseBaseTypes2(type, it, parser) {
  let temp;
  switch (true) {
    case isTypeBool(type):
      temp = it.next().value;
      return Boolean(BigInt(temp));
    case CairoUint256.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoUint512.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoUint8.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoUint16.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoUint64.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoUint96.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoUint128.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoInt8.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoInt16.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoInt32.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoInt64.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case CairoInt128.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case isTypeEthAddress(type):
      temp = it.next().value;
      return BigInt(temp);
    case CairoBytes31.isAbiType(type):
      return parser.getResponseParser(type)(it);
    case isTypeSecp256k1Point(type):
      const xLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const xHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const yLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const yHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const pubK = BigInt(addHexPrefix(xHigh + xLow + yHigh + yLow));
      return pubK;
    default:
      return parser.getResponseParser(CairoFelt252.abiSelector)(it);
  }
}
function parseResponseValue(responseIterator, element, parser, structs, enums) {
  if (element.type === '()') {
    return {};
  }
  if (CairoUint256.isAbiType(element.type)) {
    return parser.getResponseParser(element.type)(responseIterator);
  }
  if (CairoUint512.isAbiType(element.type)) {
    return parser.getResponseParser(element.type)(responseIterator);
  }
  if (CairoByteArray.isAbiType(element.type)) {
    return parser.getResponseParser(element.type)(responseIterator);
  }
  if (CairoFixedArray.isTypeFixedArray(element.type)) {
    const parsedDataArr = [];
    const el = { name: '', type: CairoFixedArray.getFixedArrayType(element.type) };
    const arraySize = CairoFixedArray.getFixedArraySize(element.type);
    while (parsedDataArr.length < arraySize) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, parser, structs, enums));
    }
    return parsedDataArr;
  }
  if (isTypeArray(element.type)) {
    const parsedDataArr = [];
    const el = { name: '', type: getArrayType(element.type) };
    const len = BigInt(responseIterator.next().value);
    while (parsedDataArr.length < len) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, parser, structs, enums));
    }
    return parsedDataArr;
  }
  if (isTypeNonZero(element.type)) {
    const el = { name: '', type: getArrayType(element.type) };
    return parseResponseValue(responseIterator, el, parser, structs, enums);
  }
  if (structs && element.type in structs && structs[element.type]) {
    if (isTypeEthAddress(element.type)) {
      return parseBaseTypes2(element.type, responseIterator, parser);
    }
    return structs[element.type].members.reduce((acc, el) => {
      acc[el.name] = parseResponseValue(responseIterator, el, parser, structs, enums);
      return acc;
    }, {});
  }
  if (enums && element.type in enums && enums[element.type]) {
    const variantNum = Number(responseIterator.next().value);
    const rawEnum = enums[element.type].variants.reduce((acc, variant, num) => {
      if (num === variantNum) {
        acc[variant.name] = parseResponseValue(
          responseIterator,
          { name: '', type: variant.type },
          parser,
          structs,
          enums
        );
        return acc;
      }
      acc[variant.name] = void 0;
      return acc;
    }, {});
    if (element.type.startsWith('core::option::Option')) {
      const content = variantNum === CairoOptionVariant.Some ? rawEnum.Some : void 0;
      return new CairoOption(variantNum, content);
    }
    if (element.type.startsWith('core::result::Result')) {
      let content;
      if (variantNum === CairoResultVariant.Ok) {
        content = rawEnum.Ok;
      } else {
        content = rawEnum.Err;
      }
      return new CairoResult(variantNum, content);
    }
    const customEnum = new CairoCustomEnum(rawEnum);
    return customEnum;
  }
  if (isTypeTuple(element.type)) {
    const memberTypes = extractTupleMemberTypes(element.type);
    return memberTypes.reduce((acc, it, idx) => {
      const name = it?.name ? it.name : idx;
      const type = it?.type ? it.type : it;
      const el = { name, type };
      acc[name] = parseResponseValue(responseIterator, el, parser, structs, enums);
      return acc;
    }, {});
  }
  if (isTypeArray(element.type)) {
    const parsedDataArr = [];
    const el = { name: '', type: getArrayType(element.type) };
    const len = BigInt(responseIterator.next().value);
    while (parsedDataArr.length < len) {
      parsedDataArr.push(parseResponseValue(responseIterator, el, parser, structs, enums));
    }
    return parsedDataArr;
  }
  return parseBaseTypes2(element.type, responseIterator, parser);
}
function responseParser({ responseIterator, output, structs, enums, parsedResult, parser }) {
  const { name, type } = output;
  let temp;
  switch (true) {
    case isLen(name):
      temp = responseIterator.next().value;
      return BigInt(temp);
    case (structs && type in structs) || isTypeTuple(type):
      return parseResponseValue(responseIterator, output, parser, structs, enums);
    case enums && isTypeEnum(type, enums):
      return parseResponseValue(responseIterator, output, parser, structs, enums);
    case CairoFixedArray.isTypeFixedArray(type):
      return parseResponseValue(responseIterator, output, parser, structs, enums);
    case isTypeArray(type):
      if (isCairo1Type(type)) {
        return parseResponseValue(responseIterator, output, parser, structs, enums);
      }
      const parsedDataArr = [];
      if (parsedResult && parsedResult[`${name}_len`]) {
        const arrLen = parsedResult[`${name}_len`];
        while (parsedDataArr.length < arrLen) {
          parsedDataArr.push(
            parseResponseValue(
              responseIterator,
              { name, type: output.type.replaceAll('*', '') },
              parser,
              structs,
              enums
            )
          );
        }
      }
      return parsedDataArr;
    case isTypeNonZero(type):
      return parseResponseValue(responseIterator, output, parser, structs, enums);
    default:
      return parseBaseTypes2(type, responseIterator, parser);
  }
}

// src/utils/calldata/validate.ts
var validateFelt = (parameter, input) => {
  assert(
    isString(parameter) || isNumber(parameter) || isBigInt(parameter),
    `Validate: arg ${input.name} should be a felt typed as (String, Number or BigInt)`
  );
  if (isString(parameter) && !isHex(parameter)) return;
  const param = BigInt(parameter.toString(10));
  assert(
    // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1266
    param >= 0n && param <= 2n ** 252n - 1n,
    `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
  );
};
var validateUint = (parameter, input) => {
  if (isNumber(parameter)) {
    assert(
      parameter <= Number.MAX_SAFE_INTEGER,
      'Validation: Parameter is too large to be typed as Number use (BigInt or String)'
    );
  }
  assert(
    isString(parameter) ||
      isNumber(parameter) ||
      isBigInt(parameter) ||
      (isObject(parameter) && 'low' in parameter && 'high' in parameter) ||
      (isObject(parameter) &&
        ['limb0', 'limb1', 'limb2', 'limb3'].every((key) => key in parameter)),
    `Validate: arg ${input.name} of cairo type ${input.type} should be type (String, Number or BigInt), but is ${typeof parameter} ${parameter}.`
  );
  let param;
  switch (input.type) {
    case Uint.u256:
      param = new CairoUint256(parameter).toBigInt();
      break;
    case Uint.u512:
      param = new CairoUint512(parameter).toBigInt();
      break;
    default:
      param = toBigInt(parameter);
  }
  switch (input.type) {
    case Uint.u8:
      assert(
        param >= 0n && param <= 255n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0 - 255]`
      );
      break;
    case Uint.u16:
      assert(
        param >= 0n && param <= 65535n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 65535]`
      );
      break;
    case Uint.u32:
      assert(
        param >= 0n && param <= 4294967295n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 4294967295]`
      );
      break;
    case Uint.u64:
      assert(
        param >= 0n && param <= 2n ** 64n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^64-1]`
      );
      break;
    case Uint.u128:
      assert(
        param >= 0n && param <= 2n ** 128n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^128-1]`
      );
      break;
    case Uint.u256:
      assert(
        param >= 0n && param <= 2n ** 256n - 1n,
        `Validate: arg ${input.name} is ${input.type} should be in range 0 - 2^256-1`
      );
      break;
    case Uint.u512:
      assert(
        CairoUint512.is(param),
        `Validate: arg ${input.name} is ${input.type} should be in range 0 - 2^512-1`
      );
      break;
    case Literal.ClassHash:
      assert(
        // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1670
        param >= 0n && param <= 2n ** 252n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
      );
      break;
    case Literal.ContractAddress:
      assert(
        // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1245
        param >= 0n && param <= 2n ** 252n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
      );
      break;
    case Literal.Secp256k1Point: {
      assert(
        param >= 0n && param <= 2n ** 512n - 1n,
        `Validate: arg ${input.name} must be ${input.type} : a 512 bits number.`
      );
      break;
    }
    case Literal.U96: {
      assert(
        param >= 0n && param <= 2n ** 96n - 1n,
        `Validate: arg ${input.name} must be ${input.type} : a 96 bits number.`
      );
      break;
    }
    default:
      break;
  }
};
var validateBool = (parameter, input) => {
  assert(
    isBoolean(parameter),
    `Validate: arg ${input.name} of cairo type ${input.type} should be type (Boolean)`
  );
};
var validateStruct = (parameter, input, structs) => {
  if (input.type === Uint.u256 || input.type === Uint.u512) {
    validateUint(parameter, input);
    return;
  }
  if (isTypeEthAddress(input.type)) {
    assert(!isObject(parameter), `EthAddress type is waiting a BigNumberish. Got "${parameter}"`);
    const param = BigInt(parameter.toString(10));
    assert(
      // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1259
      param >= 0n && param <= 2n ** 160n - 1n,
      `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^160-1]`
    );
    return;
  }
  assert(
    isObject(parameter),
    `Validate: arg ${input.name} is cairo type struct (${input.type}), and should be defined as a js object (not array)`
  );
  structs[input.type].members.forEach(({ name }) => {
    assert(
      Object.keys(parameter).includes(name),
      `Validate: arg ${input.name} should have a property ${name}`
    );
  });
};
var validateEnum = (parameter, input) => {
  assert(
    isObject(parameter),
    `Validate: arg ${input.name} is cairo type Enum (${input.type}), and should be defined as a js object (not array)`
  );
  const methodsKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(parameter));
  const keys = [...Object.getOwnPropertyNames(parameter), ...methodsKeys];
  if (isTypeOption(input.type) && keys.includes('isSome') && keys.includes('isNone')) {
    return;
  }
  if (isTypeResult(input.type) && keys.includes('isOk') && keys.includes('isErr')) {
    return;
  }
  if (keys.includes('variant') && keys.includes('activeVariant')) {
    return;
  }
  throw new Error(
    `Validate Enum: argument ${input.name}, type ${input.type}, value received "${parameter}", is not an Enum.`
  );
};
var validateTuple = (parameter, input) => {
  assert(isObject(parameter), `Validate: arg ${input.name} should be a tuple (defined as object)`);
};
var validateArray = (parameterArray, input, structs, enums) => {
  const isNormalArray = isTypeArray(input.type);
  const baseType = isNormalArray
    ? getArrayType(input.type)
    : CairoFixedArray.getFixedArrayType(input.type);
  if (isNormalArray && isTypeFelt(baseType) && isLongText(parameterArray)) {
    return;
  }
  let parameter = [];
  if (isNormalArray) {
    assert(Array.isArray(parameterArray), `Validate: arg ${input.name} should be an Array`);
    parameter = parameterArray;
  } else {
    switch (true) {
      case Array.isArray(parameterArray):
        parameter = parameterArray;
        break;
      case typeof parameterArray === 'object':
        parameter = Object.values(parameterArray);
        break;
      default:
        throw new Error(`Validate: arg ${input.name} should be an Array or an object.`);
    }
  }
  switch (true) {
    case isTypeFelt(baseType):
      parameter.forEach((param) => validateFelt(param, input));
      break;
    case isTypeTuple(baseType):
      parameter.forEach((it) => validateTuple(it, { name: input.name, type: baseType }));
      break;
    case isTypeArray(baseType):
      parameter.forEach((param) =>
        validateArray(param, { name: '', type: baseType }, structs, enums)
      );
      break;
    case isTypeStruct(baseType, structs):
      parameter.forEach((it) => validateStruct(it, { name: input.name, type: baseType }, structs));
      break;
    case isTypeEnum(baseType, enums):
      parameter.forEach((it) => validateEnum(it, { name: input.name, type: baseType }));
      break;
    case isTypeUint(baseType) || isTypeLiteral(baseType):
      parameter.forEach((param) => validateUint(param, { name: '', type: baseType }));
      break;
    case isTypeBool(baseType):
      parameter.forEach((param) => validateBool(param, input));
      break;
    default:
      throw new Error(
        `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
      );
  }
};
var validateNonZero = (parameter, input) => {
  const baseType = getArrayType(input.type);
  assert(
    (isTypeUint(baseType) && baseType !== CairoUint512.abiSelector) || isTypeFelt(baseType),
    `Validate: ${input.name} type is not authorized for NonZero type.`
  );
  switch (true) {
    case isTypeFelt(baseType):
      validateFelt(parameter, input);
      assert(
        BigInt(parameter.toString(10)) > 0,
        'Validate: value 0 is not authorized in NonZero felt252 type.'
      );
      break;
    case isTypeUint(baseType):
      validateUint(parameter, { name: '', type: baseType });
      switch (baseType) {
        case Uint.u256:
          assert(
            new CairoUint256(parameter).toBigInt() > 0,
            'Validate: value 0 is not authorized in NonZero uint256 type.'
          );
          break;
        default:
          assert(
            toBigInt(parameter) > 0,
            'Validate: value 0 is not authorized in NonZero uint type.'
          );
      }
      break;
    default:
      throw new Error(
        `Validate Unhandled: argument ${input.name}, type ${input.type}, value "${parameter}"`
      );
  }
};
function validateFields(abiMethod, args, structs, enums) {
  abiMethod.inputs.reduce((acc, input) => {
    const parameter = args[acc];
    switch (true) {
      case isLen(input.name):
        return acc;
      case isTypeFelt(input.type):
        validateFelt(parameter, input);
        break;
      case CairoBytes31.isAbiType(input.type):
        CairoBytes31.validate(parameter);
        break;
      case isTypeUint(input.type) || isTypeLiteral(input.type):
        validateUint(parameter, input);
        break;
      case isTypeBool(input.type):
        validateBool(parameter, input);
        break;
      case CairoByteArray.isAbiType(input.type):
        CairoByteArray.validate(parameter);
        break;
      case CairoInt8.isAbiType(input.type):
        CairoInt8.validate(parameter);
        break;
      case CairoInt16.isAbiType(input.type):
        CairoInt16.validate(parameter);
        break;
      case CairoInt32.isAbiType(input.type):
        CairoInt32.validate(parameter);
        break;
      case CairoInt64.isAbiType(input.type):
        CairoInt64.validate(parameter);
        break;
      case CairoInt128.isAbiType(input.type):
        CairoInt128.validate(parameter);
        break;
      case isTypeArray(input.type) || CairoFixedArray.isTypeFixedArray(input.type):
        validateArray(parameter, input, structs, enums);
        break;
      case isTypeStruct(input.type, structs):
        validateStruct(parameter, input, structs);
        break;
      case isTypeEnum(input.type, enums):
        validateEnum(parameter, input);
        break;
      case isTypeTuple(input.type):
        validateTuple(parameter, input);
        break;
      case isTypeNonZero(input.type):
        validateNonZero(parameter, input);
        break;
      default:
        throw new Error(
          `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
        );
    }
    return acc + 1;
  }, 0);
}

// src/utils/calldata/index.ts
var CallData = class _CallData {
  abi;
  parser;
  structs;
  enums;
  constructor(abi, parsingStrategy) {
    this.structs = _CallData.getAbiStruct(abi);
    this.enums = _CallData.getAbiEnum(abi);
    this.parser = createAbiParser(abi, parsingStrategy);
    this.abi = this.parser.getLegacyFormat();
  }
  /**
   * Validate arguments passed to the method as corresponding to the ones in the abi
   * @param type ValidateType - type of the method
   * @param method string - name of the method
   * @param args ArgsOrCalldata - arguments that are passed to the method
   */
  validate(type, method, args = []) {
    if (type !== ValidateType.DEPLOY) {
      const invocableFunctionNames = this.abi
        .filter((abi) => {
          if (abi.type !== 'function') return false;
          const isView = abi.stateMutability === 'view' || abi.state_mutability === 'view';
          return type === ValidateType.INVOKE ? !isView : isView;
        })
        .map((abi) => abi.name);
      assert(
        invocableFunctionNames.includes(method),
        `${type === ValidateType.INVOKE ? 'invocable' : 'viewable'} method not found in abi`
      );
    }
    const abiMethod = this.abi.find((abi) =>
      type === ValidateType.DEPLOY
        ? abi.name === method && abi.type === 'constructor'
        : abi.name === method && abi.type === 'function'
    );
    if (isNoConstructorValid(method, args, abiMethod)) {
      return;
    }
    const inputsLength = this.parser.methodInputsLength(abiMethod);
    if (args.length !== inputsLength) {
      throw Error(
        `Invalid number of arguments, expected ${inputsLength} arguments, but got ${args.length}`
      );
    }
    validateFields(abiMethod, args, this.structs, this.enums);
  }
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
  compile(method, argsCalldata) {
    const abiMethod = this.abi.find((abiFunction) => abiFunction.name === method);
    if (isNoConstructorValid(method, argsCalldata, abiMethod)) {
      return [];
    }
    let args;
    if (Array.isArray(argsCalldata)) {
      args = argsCalldata;
    } else {
      const orderedObject = orderPropsByAbi(
        argsCalldata,
        abiMethod.inputs,
        this.structs,
        this.enums
      );
      args = Object.values(orderedObject);
      validateFields(abiMethod, args, this.structs, this.enums);
    }
    const argsIterator = args[Symbol.iterator]();
    const callArray = abiMethod.inputs.reduce(
      (acc, input) =>
        isLen(input.name) && !isCairo1Type(input.type)
          ? acc
          : acc.concat(
              parseCalldataField({
                argsIterator,
                input,
                structs: this.structs,
                enums: this.enums,
                parser: this.parser,
              })
            ),
      []
    );
    Object.defineProperty(callArray, '__compiled__', {
      enumerable: false,
      writable: false,
      value: true,
    });
    return callArray;
  }
  /**
   * Compile contract callData without abi
   * @param rawArgs RawArgs representing cairo method arguments or string array of compiled data
   * @returns Calldata
   */
  static compile(rawArgs) {
    const createTree = (obj) => {
      const getEntries = (o, prefix = '.') => {
        const oe = Array.isArray(o) ? [o.length.toString(), ...o] : o;
        return Object.entries(oe).flatMap(([k, v]) => {
          let value = v;
          if (k === 'entrypoint') value = getSelectorFromName(value);
          else if (isLongText(value)) value = byteArrayFromString(value);
          const kk = Array.isArray(oe) && k === '0' ? '$$len' : k;
          if (isBigInt(value)) return [[`${prefix}${kk}`, felt(value)]];
          if (Object(value) === value) {
            const methodsKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(value));
            const keys = [...Object.getOwnPropertyNames(value), ...methodsKeys];
            if (keys.includes('isSome') && keys.includes('isNone')) {
              const myOption = value;
              const variantNb = myOption.isSome()
                ? CairoOptionVariant.Some
                : CairoOptionVariant.None;
              if (myOption.isSome())
                return getEntries({ 0: variantNb, 1: myOption.unwrap() }, `${prefix}${kk}.`);
              return [[`${prefix}${kk}`, felt(variantNb)]];
            }
            if (keys.includes('isOk') && keys.includes('isErr')) {
              const myResult = value;
              const variantNb = myResult.isOk() ? CairoResultVariant.Ok : CairoResultVariant.Err;
              return getEntries({ 0: variantNb, 1: myResult.unwrap() }, `${prefix}${kk}.`);
            }
            if (keys.includes('variant') && keys.includes('activeVariant')) {
              const myEnum = value;
              const activeVariant = myEnum.activeVariant();
              const listVariants = Object.keys(myEnum.variant);
              const activeVariantNb = listVariants.findIndex(
                (variant) => variant === activeVariant
              );
              if (
                typeof myEnum.unwrap() === 'object' &&
                Object.keys(myEnum.unwrap()).length === 0
              ) {
                return [[`${prefix}${kk}`, felt(activeVariantNb)]];
              }
              return getEntries({ 0: activeVariantNb, 1: myEnum.unwrap() }, `${prefix}${kk}.`);
            }
            return getEntries(value, `${prefix}${kk}.`);
          }
          return [[`${prefix}${kk}`, felt(value)]];
        });
      };
      const result = Object.fromEntries(getEntries(obj));
      return result;
    };
    let callTreeArray;
    if (!Array.isArray(rawArgs)) {
      const callTree = createTree(rawArgs);
      callTreeArray = Object.values(callTree);
    } else {
      const callObj = { ...rawArgs };
      const callTree = createTree(callObj);
      callTreeArray = Object.values(callTree);
    }
    Object.defineProperty(callTreeArray, '__compiled__', {
      enumerable: false,
      writable: false,
      value: true,
    });
    return callTreeArray;
  }
  /**
   * Parse elements of the response array and structuring them into response object
   * @param method string - method name
   * @param response string[] - response from the method
   * @return Result - parsed response corresponding to the abi
   */
  parse(method, response) {
    const { outputs } = this.abi.find((abi) => abi.name === method);
    const responseIterator = response.flat()[Symbol.iterator]();
    const parsed = outputs.flat().reduce((acc, output, idx) => {
      const propName = output.name ?? idx;
      acc[propName] = responseParser({
        responseIterator,
        output,
        structs: this.structs,
        enums: this.enums,
        parsedResult: acc,
        parser: this.parser,
      });
      if (acc[propName] && acc[`${propName}_len`]) {
        delete acc[`${propName}_len`];
      }
      return acc;
    }, {});
    return Object.keys(parsed).length === 1 && 0 in parsed ? parsed[0] : parsed;
  }
  /**
   * Format cairo method response data to native js values based on provided format schema
   * @param method string - cairo method name
   * @param response string[] - cairo method response
   * @param format object - formatter object schema
   * @returns Result - parsed and formatted response object
   */
  format(method, response, format) {
    const parsed = this.parse(method, response);
    return formatter(parsed, format);
  }
  /**
   * Helper to extract structs from abi
   * @param abi Abi
   * @returns AbiStructs - structs from abi
   */
  static getAbiStruct(abi) {
    return abi
      .filter((abiEntry) => abiEntry.type === 'struct')
      .reduce(
        (acc, abiEntry) => ({
          ...acc,
          [abiEntry.name]: abiEntry,
        }),
        {}
      );
  }
  /**
   * Helper to extract enums from abi
   * @param abi Abi
   * @returns AbiEnums - enums from abi
   */
  static getAbiEnum(abi) {
    const fullEnumList = abi
      .filter((abiEntry) => abiEntry.type === 'enum')
      .reduce(
        (acc, abiEntry) => ({
          ...acc,
          [abiEntry.name]: abiEntry,
        }),
        {}
      );
    delete fullEnumList['core::bool'];
    return fullEnumList;
  }
  /**
   * Helper: Compile HexCalldata | RawCalldata | RawArgs
   * @param rawCalldata HexCalldata | RawCalldata | RawArgs
   * @returns Calldata
   */
  static toCalldata(rawCalldata = []) {
    return _CallData.compile(rawCalldata);
  }
  /**
   * Helper: Convert raw to HexCalldata
   * @param raw HexCalldata | RawCalldata | RawArgs
   * @returns HexCalldata
   */
  static toHex(raw = []) {
    const calldata = _CallData.compile(raw);
    return calldata.map((it) => toHex(it));
  }
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
  decodeParameters(typeCairo, response) {
    const typeCairoArray = Array.isArray(typeCairo) ? typeCairo : [typeCairo];
    const responseIterator = response.flat()[Symbol.iterator]();
    const decodedArray = typeCairoArray.map((typeParam) =>
      responseParser({
        responseIterator,
        output: { name: '', type: typeParam },
        parser: this.parser,
        structs: this.structs,
        enums: this.enums,
      })
    );
    return decodedArray.length === 1 ? decodedArray[0] : decodedArray;
  }
};

// src/utils/hash/index.ts
var hash_exports = {};
__export(hash_exports, {
  COMPILED_CLASS_VERSION: () => COMPILED_CLASS_VERSION,
  blake2sHashMany: () => blake2sHashMany,
  calculateContractAddressFromHash: () => calculateContractAddressFromHash,
  calculateDeclareTransactionHash: () => calculateDeclareTransactionHash3,
  calculateDeployAccountTransactionHash: () => calculateDeployAccountTransactionHash3,
  calculateInvokeTransactionHash: () => calculateInvokeTransactionHash2,
  calculateL2MessageTxHash: () => calculateL2MessageTxHash,
  computeCompiledClassHash: () => computeCompiledClassHash,
  computeCompiledClassHashBlake: () => computeCompiledClassHashBlake,
  computeCompiledClassHashPoseidon: () => computeCompiledClassHashPoseidon,
  computeContractClassHash: () => computeContractClassHash,
  computeHashOnElements: () => computeHashOnElements,
  computeHintedClassHash: () => computeHintedClassHash,
  computeLegacyContractClassHash: () => computeLegacyContractClassHash,
  computePedersenHash: () => computePedersenHash,
  computePedersenHashOnElements: () => computePedersenHashOnElements,
  computePoseidonHash: () => computePoseidonHash,
  computePoseidonHashOnElements: () => computePoseidonHashOnElements,
  computeSierraContractClassHash: () => computeSierraContractClassHash,
  encodeBuiltins: () => encodeBuiltins,
  flattenEntryPointData: () => flattenEntryPointData,
  formatSpaces: () => formatSpaces,
  getL1MessageHash: () => getL1MessageHash,
  getL2MessageHash: () => getL2MessageHash,
  getSelector: () => getSelector,
  getSelectorFromName: () => getSelectorFromName,
  hashByteCodeSegments: () => hashByteCodeSegments,
  hashByteCodeSegmentsBlake: () => hashByteCodeSegmentsBlake,
  keccakBn: () => keccakBn,
  nullSkipReplacer: () => nullSkipReplacer,
  poseidon: () => poseidon,
  solidityUint256PackedKeccak256: () => solidityUint256PackedKeccak256,
  starknetKeccak: () => starknetKeccak,
});
var poseidon = __toESM(require('@noble/curves/abstract/poseidon'));

// src/utils/hash/transactionHash/v3.ts
var v3_exports = {};
__export(v3_exports, {
  calculateDeclareTransactionHash: () => calculateDeclareTransactionHash,
  calculateDeployAccountTransactionHash: () => calculateDeployAccountTransactionHash,
  calculateInvokeTransactionHash: () => calculateInvokeTransactionHash,
  calculateTransactionHashCommon: () => calculateTransactionHashCommon,
  encodeDataResourceBoundsL1: () => encodeDataResourceBoundsL1,
  encodeResourceBoundsL1: () => encodeResourceBoundsL1,
  encodeResourceBoundsL2: () => encodeResourceBoundsL2,
  hashDAMode: () => hashDAMode,
  hashFeeFieldV3B3: () => hashFeeFieldV3B3,
});
var import_starknet2 = require('@scure/starknet');
var AToBI = (array) => array.map((it) => BigInt(it));
var DATA_AVAILABILITY_MODE_BITS = 32n;
var MAX_AMOUNT_BITS = 64n;
var MAX_PRICE_PER_UNIT_BITS = 128n;
var RESOURCE_VALUE_OFFSET = MAX_AMOUNT_BITS + MAX_PRICE_PER_UNIT_BITS;
var L1_GAS_NAME = BigInt(encodeShortString('L1_GAS'));
var L2_GAS_NAME = BigInt(encodeShortString('L2_GAS'));
var L1_DATA_GAS_NAME = BigInt(encodeShortString('L1_DATA'));
function hashDAMode(nonceDAMode, feeDAMode) {
  return (BigInt(nonceDAMode) << DATA_AVAILABILITY_MODE_BITS) + BigInt(feeDAMode);
}
function encodeResourceBoundsL1(bounds) {
  return (
    (L1_GAS_NAME << RESOURCE_VALUE_OFFSET) +
    (bounds.l1_gas.max_amount << MAX_PRICE_PER_UNIT_BITS) +
    bounds.l1_gas.max_price_per_unit
  );
}
function encodeResourceBoundsL2(bounds) {
  return (
    (L2_GAS_NAME << RESOURCE_VALUE_OFFSET) +
    (bounds.l2_gas.max_amount << MAX_PRICE_PER_UNIT_BITS) +
    bounds.l2_gas.max_price_per_unit
  );
}
function encodeDataResourceBoundsL1(bounds) {
  return (
    (L1_DATA_GAS_NAME << RESOURCE_VALUE_OFFSET) +
    (bounds.l1_data_gas.max_amount << MAX_PRICE_PER_UNIT_BITS) +
    bounds.l1_data_gas.max_price_per_unit
  );
}
function hashFeeFieldV3B3(tip, bounds) {
  const L1Bound = encodeResourceBoundsL1(bounds);
  const L2Bound = encodeResourceBoundsL2(bounds);
  const L1Data = encodeDataResourceBoundsL1(bounds);
  return (0, import_starknet2.poseidonHashMany)([BigInt(tip), L1Bound, L2Bound, L1Data]);
}
function calculateTransactionHashCommon(
  txHashPrefix,
  version,
  senderAddress,
  chainId,
  nonce,
  tip,
  paymasterData,
  nonceDataAvailabilityMode,
  feeDataAvailabilityMode,
  resourceBounds,
  additionalData = []
) {
  const feeFieldHash = hashFeeFieldV3B3(tip, resourceBounds);
  const dAModeHash = hashDAMode(nonceDataAvailabilityMode, feeDataAvailabilityMode);
  const dataToHash = AToBI([
    txHashPrefix,
    version,
    senderAddress,
    feeFieldHash,
    (0, import_starknet2.poseidonHashMany)(AToBI(paymasterData)),
    chainId,
    nonce,
    dAModeHash,
    ...AToBI(additionalData),
  ]);
  return toHex((0, import_starknet2.poseidonHashMany)(dataToHash));
}
function calculateDeployAccountTransactionHash(
  contractAddress,
  classHash,
  compiledConstructorCalldata,
  salt,
  version,
  chainId,
  nonce,
  nonceDataAvailabilityMode,
  feeDataAvailabilityMode,
  resourceBounds,
  tip,
  paymasterData
) {
  return calculateTransactionHashCommon(
    _TransactionHashPrefix.DEPLOY_ACCOUNT,
    version,
    contractAddress,
    chainId,
    nonce,
    tip,
    paymasterData,
    nonceDataAvailabilityMode,
    feeDataAvailabilityMode,
    resourceBounds,
    [(0, import_starknet2.poseidonHashMany)(AToBI(compiledConstructorCalldata)), classHash, salt]
  );
}
function calculateDeclareTransactionHash(
  classHash,
  compiledClassHash,
  senderAddress,
  version,
  chainId,
  nonce,
  accountDeploymentData,
  nonceDataAvailabilityMode,
  feeDataAvailabilityMode,
  resourceBounds,
  tip,
  paymasterData
) {
  return calculateTransactionHashCommon(
    _TransactionHashPrefix.DECLARE,
    version,
    senderAddress,
    chainId,
    nonce,
    tip,
    AToBI(paymasterData),
    nonceDataAvailabilityMode,
    feeDataAvailabilityMode,
    resourceBounds,
    [
      (0, import_starknet2.poseidonHashMany)(AToBI(accountDeploymentData)),
      classHash,
      compiledClassHash,
    ]
  );
}
function calculateInvokeTransactionHash(
  senderAddress,
  version,
  compiledCalldata,
  chainId,
  nonce,
  accountDeploymentData,
  nonceDataAvailabilityMode,
  feeDataAvailabilityMode,
  resourceBounds,
  tip,
  paymasterData,
  proofFacts
) {
  const proofFactsAdditionalData = proofFacts?.length
    ? [(0, import_starknet2.poseidonHashMany)(AToBI(proofFacts))]
    : [];
  return calculateTransactionHashCommon(
    _TransactionHashPrefix.INVOKE,
    version,
    senderAddress,
    chainId,
    nonce,
    tip,
    paymasterData,
    nonceDataAvailabilityMode,
    feeDataAvailabilityMode,
    resourceBounds,
    [
      (0, import_starknet2.poseidonHashMany)(AToBI(accountDeploymentData)),
      (0, import_starknet2.poseidonHashMany)(AToBI(compiledCalldata)),
      ...proofFactsAdditionalData,
    ]
  );
}

// src/utils/hash/transactionHash/v2.ts
var v2_exports = {};
__export(v2_exports, {
  calculateDeclareTransactionHash: () => calculateDeclareTransactionHash2,
  calculateDeployAccountTransactionHash: () => calculateDeployAccountTransactionHash2,
  calculateL2MessageTxHash: () => calculateL2MessageTxHash,
  calculateTransactionHash: () => calculateTransactionHash,
  calculateTransactionHashCommon: () => calculateTransactionHashCommon2,
  computeHashOnElements: () => computeHashOnElements2,
});
function computeHashOnElements2(data) {
  return [...data, data.length]
    .reduce((x, y) => starkCurve.pedersen(toBigInt(x), toBigInt(y)), 0)
    .toString();
}
function calculateTransactionHashCommon2(
  txHashPrefix,
  version,
  contractAddress,
  entryPointSelector,
  calldata,
  maxFee,
  chainId,
  additionalData = []
) {
  const calldataHash = computeHashOnElements2(calldata);
  const dataToHash = [
    txHashPrefix,
    version,
    contractAddress,
    entryPointSelector,
    calldataHash,
    maxFee,
    chainId,
    ...additionalData,
  ];
  return computeHashOnElements2(dataToHash);
}
function calculateDeclareTransactionHash2(
  classHash,
  senderAddress,
  version,
  maxFee,
  chainId,
  nonce,
  compiledClassHash
) {
  return calculateTransactionHashCommon2(
    _TransactionHashPrefix.DECLARE,
    version,
    senderAddress,
    0,
    [classHash],
    maxFee,
    chainId,
    [nonce, ...(compiledClassHash ? [compiledClassHash] : [])]
  );
}
function calculateDeployAccountTransactionHash2(
  contractAddress,
  classHash,
  constructorCalldata,
  salt,
  version,
  maxFee,
  chainId,
  nonce
) {
  const calldata = [classHash, salt, ...constructorCalldata];
  return calculateTransactionHashCommon2(
    _TransactionHashPrefix.DEPLOY_ACCOUNT,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce]
  );
}
function calculateTransactionHash(contractAddress, version, calldata, maxFee, chainId, nonce) {
  return calculateTransactionHashCommon2(
    _TransactionHashPrefix.INVOKE,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce]
  );
}
function calculateL2MessageTxHash(
  l1FromAddress,
  l2ToAddress,
  l2Selector,
  l2Calldata,
  l2ChainId,
  l1Nonce
) {
  const payload = [l1FromAddress, ...l2Calldata];
  return calculateTransactionHashCommon2(
    _TransactionHashPrefix.L1_HANDLER,
    0,
    l2ToAddress,
    getSelector(l2Selector),
    payload,
    0,
    l2ChainId,
    [l1Nonce]
  );
}

// src/utils/hash/transactionHash/index.ts
function isV3InvokeTx(args) {
  return [api_exports.ETransactionVersion.V3, api_exports.ETransactionVersion.F3].includes(
    args.version
  );
}
function calculateInvokeTransactionHash2(args) {
  if (isV3InvokeTx(args)) {
    return calculateInvokeTransactionHash(
      args.senderAddress,
      args.version,
      args.compiledCalldata,
      args.chainId,
      args.nonce,
      args.accountDeploymentData,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData,
      args.proofFacts
    );
  }
  throw new Error('Invalid Tx version for hash calculation');
}
function isV3DeclareTx(args) {
  return [api_exports.ETransactionVersion.V3, api_exports.ETransactionVersion.F3].includes(
    args.version
  );
}
function calculateDeclareTransactionHash3(args) {
  if (isV3DeclareTx(args)) {
    return calculateDeclareTransactionHash(
      args.classHash,
      args.compiledClassHash,
      args.senderAddress,
      args.version,
      args.chainId,
      args.nonce,
      args.accountDeploymentData,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData
    );
  }
  throw new Error('Invalid Tx version for hash calculation');
}
function isV3DeployAccountTx(args) {
  return [api_exports.ETransactionVersion.V3, api_exports.ETransactionVersion.F3].includes(
    args.version
  );
}
function calculateDeployAccountTransactionHash3(args) {
  if (isV3DeployAccountTx(args)) {
    return calculateDeployAccountTransactionHash(
      args.contractAddress,
      args.classHash,
      args.compiledConstructorCalldata,
      args.salt,
      args.version,
      args.chainId,
      args.nonce,
      args.nonceDataAvailabilityMode,
      args.feeDataAvailabilityMode,
      args.resourceBounds,
      args.tip,
      args.paymasterData
    );
  }
  throw new Error('Invalid Tx version for hash calculation');
}

// src/utils/hash/classHash/util.ts
var COMPILED_CLASS_VERSION = 'COMPILED_CLASS_V1';
function formatSpaces(json2) {
  let insideQuotes = false;
  const newString = [];
  for (const char of json2) {
    if (char === '"' && (newString.length > 0 && newString.slice(-1)[0] === '\\') === false) {
      insideQuotes = !insideQuotes;
    }
    if (insideQuotes) {
      newString.push(char);
    } else {
      newString.push(char === ':' ? ': ' : char === ',' ? ', ' : char);
    }
  }
  return newString.join('');
}
function nullSkipReplacer(key, value) {
  if (key === 'attributes' || key === 'accessible_scopes') {
    return Array.isArray(value) && value.length === 0 ? void 0 : value;
  }
  if (key === 'debug_info') {
    return null;
  }
  return value === null ? void 0 : value;
}
function encodeBuiltins(builtins) {
  return builtins.map((it) => BigInt(encodeShortString(it)));
}
function flattenEntryPointData(data, encodedBuiltinsArray) {
  return data.flatMap((it, index) => [
    BigInt(it.selector),
    BigInt(it.offset),
    ...encodedBuiltinsArray[index],
  ]);
}

// src/utils/hash/classHash/pedersen.ts
function calculateContractAddressFromHash(salt, classHash, constructorCalldata, deployerAddress) {
  const compiledCalldata = CallData.compile(constructorCalldata);
  const constructorCalldataHash = computeHashOnElements(compiledCalldata);
  const CONTRACT_ADDRESS_PREFIX = felt('0x535441524b4e45545f434f4e54524143545f41444452455353');
  const hash = computeHashOnElements([
    CONTRACT_ADDRESS_PREFIX,
    deployerAddress,
    salt,
    classHash,
    constructorCalldataHash,
  ]);
  return toHex(BigInt(hash) % ADDR_BOUND);
}
function computeHintedClassHash(compiledContract) {
  const { abi, program } = compiledContract;
  const contractClass = { abi, program };
  const serializedJson = formatSpaces(stringify2(contractClass, nullSkipReplacer));
  return addHexPrefix(starkCurve.keccak(utf8ToArray(serializedJson)).toString(16));
}
function computeLegacyContractClassHash(contract) {
  const compiledContract = isString(contract) ? parse2(contract) : contract;
  const apiVersion = toHex(API_VERSION);
  const externalEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.EXTERNAL.flatMap((e) => [e.selector, e.offset])
  );
  const l1HandlerEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.L1_HANDLER.flatMap((e) => [e.selector, e.offset])
  );
  const constructorEntryPointHash = computeHashOnElements(
    compiledContract.entry_points_by_type.CONSTRUCTOR.flatMap((e) => [e.selector, e.offset])
  );
  const builtinsHash = computeHashOnElements(
    compiledContract.program.builtins.map((s) => encodeShortString(s))
  );
  const hintedClassHash = computeHintedClassHash(compiledContract);
  const dataHash = computeHashOnElements(compiledContract.program.data);
  return computeHashOnElements([
    apiVersion,
    externalEntryPointsHash,
    l1HandlerEntryPointsHash,
    constructorEntryPointHash,
    builtinsHash,
    hintedClassHash,
    dataHash,
  ]);
}

// src/utils/hash/classHash/poseidon.ts
var import_starknet3 = require('@scure/starknet');
function computePoseidonHash(a, b) {
  return toHex(starkCurve.poseidonHash(BigInt(a), BigInt(b)));
}
function computePoseidonHashOnElements(data) {
  return toHex((0, import_starknet3.poseidonHashMany)(data.map((x) => BigInt(x))));
}
function hashBuiltins(builtins) {
  return (0, import_starknet3.poseidonHashMany)(encodeBuiltins(builtins));
}
function hashEntryPoint(data) {
  const base = data.flatMap((it) => {
    return [BigInt(it.selector), BigInt(it.offset), hashBuiltins(it.builtins)];
  });
  return (0, import_starknet3.poseidonHashMany)(base);
}
function hashByteCodeSegments(casm) {
  const byteCode = casm.bytecode.map((n) => BigInt(n));
  const bytecodeSegmentLengths = casm.bytecode_segment_lengths ?? [];
  let segmentStart = 0;
  const hashLeaves = bytecodeSegmentLengths.flatMap((len) => {
    const segment = byteCode.slice(segmentStart, (segmentStart += len));
    return [BigInt(len), (0, import_starknet3.poseidonHashMany)(segment)];
  });
  return 1n + (0, import_starknet3.poseidonHashMany)(hashLeaves);
}
function computeCompiledClassHashPoseidon(casm) {
  const compiledClassVersion = BigInt(encodeShortString(COMPILED_CLASS_VERSION));
  const externalEntryPointsHash = hashEntryPoint(casm.entry_points_by_type.EXTERNAL);
  const l1Handlers = hashEntryPoint(casm.entry_points_by_type.L1_HANDLER);
  const constructor = hashEntryPoint(casm.entry_points_by_type.CONSTRUCTOR);
  const bytecode = casm.bytecode_segment_lengths
    ? hashByteCodeSegments(casm)
    : (0, import_starknet3.poseidonHashMany)(casm.bytecode.map((it) => BigInt(it)));
  return toHex(
    (0, import_starknet3.poseidonHashMany)([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      bytecode,
    ])
  );
}
function hashEntryPointSierra(data) {
  const base = data.flatMap((it) => {
    return [BigInt(it.selector), BigInt(it.function_idx)];
  });
  return (0, import_starknet3.poseidonHashMany)(base);
}
function hashAbi(sierra) {
  const indentString = formatSpaces(stringify2(sierra.abi, null));
  return BigInt(addHexPrefix(starkCurve.keccak(utf8ToArray(indentString)).toString(16)));
}
function computeSierraContractClassHash(sierra) {
  const CONTRACT_CLASS_VERSION = 'CONTRACT_CLASS_V0.1.0';
  const compiledClassVersion = BigInt(encodeShortString(CONTRACT_CLASS_VERSION));
  const externalEntryPointsHash = hashEntryPointSierra(sierra.entry_points_by_type.EXTERNAL);
  const l1Handlers = hashEntryPointSierra(sierra.entry_points_by_type.L1_HANDLER);
  const constructor = hashEntryPointSierra(sierra.entry_points_by_type.CONSTRUCTOR);
  const abiHash = hashAbi(sierra);
  const sierraProgram = (0, import_starknet3.poseidonHashMany)(
    sierra.sierra_program.map((it) => BigInt(it))
  );
  return toHex(
    (0, import_starknet3.poseidonHashMany)([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      abiHash,
      sierraProgram,
    ])
  );
}

// src/utils/connect/blake.ts
var import_blake2s = require('@noble/hashes/blake2s');
function blakeHash(uint8Array) {
  return (
    config.get('blake')?.(uint8Array) || (0, import_blake2s.blake2s)(uint8Array, { dkLen: 32 })
  );
}

// src/utils/hash/classHash/blake.ts
function blake2sHashMany(data) {
  const SMALL_THRESHOLD = 0x8000000000000000n;
  const BIG_MARKER = 2147483648;
  const u32Words = [];
  const buf = new ArrayBuffer(32);
  const feltView = new DataView(buf);
  for (const felt2 of data) {
    const u64_0 = felt2 & 0xffffffffffffffffn;
    const u64_1 = (felt2 & 0xffffffffffffffff0000000000000000n) >> 64n;
    const u64_2 = (felt2 & 0xffffffffffffffff00000000000000000000000000000000n) >> 128n;
    const u64_3 =
      (felt2 & 0xffffffffffffffff000000000000000000000000000000000000000000000000n) >> 192n;
    feltView.setBigUint64(0, u64_3, false);
    feltView.setBigUint64(8, u64_2, false);
    feltView.setBigUint64(16, u64_1, false);
    feltView.setBigUint64(24, u64_0, false);
    if (felt2 < SMALL_THRESHOLD) {
      const hi0 = feltView.getUint32(24, false);
      const lo0 = feltView.getUint32(28, false);
      u32Words.push(hi0, lo0);
    } else {
      const word0 = feltView.getUint32(0, false) | BIG_MARKER;
      const word1 = feltView.getUint32(4, false);
      const word2 = feltView.getUint32(8, false);
      const word3 = feltView.getUint32(12, false);
      const word4 = feltView.getUint32(16, false);
      const word5 = feltView.getUint32(20, false);
      const word6 = feltView.getUint32(24, false);
      const word7 = feltView.getUint32(28, false);
      u32Words.push(word0, word1, word2, word3, word4, word5, word6, word7);
    }
  }
  const bytes = new ArrayBuffer(u32Words.length * 4);
  const bytesView = new DataView(bytes);
  for (let i = 0; i < u32Words.length; i++) {
    bytesView.setUint32(i * 4, u32Words[i], true);
  }
  const hash = blakeHash(new Uint8Array(bytes));
  let hashBigInt = 0n;
  for (let i = 0; i < 32; i++) {
    hashBigInt |= BigInt(hash[i]) << BigInt(i * 8);
  }
  return hashBigInt % PRIME;
}
function hashBuiltinsBlake(builtins) {
  return blake2sHashMany(encodeBuiltins(builtins));
}
function hashEntryPointBlake(data) {
  const base = data.flatMap((it) => {
    return [BigInt(it.selector), BigInt(it.offset), hashBuiltinsBlake(it.builtins)];
  });
  return blake2sHashMany(base);
}
function bytecodeHashNodeBlake(iter, node) {
  if (typeof node === 'number') {
    const data = [];
    for (let i = 0; i < node; i++) {
      const next = iter.next();
      if (next.done) throw new Error('Bytecode length mismatch');
      data.push(next.value);
    }
    return [node, blake2sHashMany(data)];
  }
  const innerNodes = node.map((child) => bytecodeHashNodeBlake(iter, child));
  const flatData = innerNodes.flatMap(([len, hash2]) => [BigInt(len), hash2]);
  const hash = blake2sHashMany(flatData) + 1n;
  const totalLen = innerNodes.reduce((sum, [len]) => sum + len, 0);
  return [totalLen, hash];
}
function hashByteCodeSegmentsBlake(casm) {
  const byteCode = casm.bytecode.map((n) => BigInt(n));
  const bytecodeSegmentLengths = casm.bytecode_segment_lengths;
  if (!bytecodeSegmentLengths) {
    return blake2sHashMany(byteCode);
  }
  const iter = byteCode[Symbol.iterator]();
  const [len, hash] = bytecodeHashNodeBlake(iter, bytecodeSegmentLengths);
  if (len !== byteCode.length) {
    throw new Error(`Bytecode length mismatch: expected ${byteCode.length}, got ${len}`);
  }
  return hash;
}
function computeCompiledClassHashBlake(casm) {
  const compiledClassVersion = BigInt(encodeShortString(COMPILED_CLASS_VERSION));
  const externalEntryPointsHash = hashEntryPointBlake(casm.entry_points_by_type.EXTERNAL);
  const l1Handlers = hashEntryPointBlake(casm.entry_points_by_type.L1_HANDLER);
  const constructor = hashEntryPointBlake(casm.entry_points_by_type.CONSTRUCTOR);
  const bytecode = hashByteCodeSegmentsBlake(casm);
  return toHex(
    blake2sHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      bytecode,
    ])
  );
}

// src/utils/resolve.ts
function isV3Tx(details) {
  const version = details.version ? toHex(details.version) : ETransactionVersion.V3;
  return version === ETransactionVersion.V3 || version === ETransactionVersion.F3;
}
function isVersion(expected, provided) {
  const expectedParts = expected.split('.');
  const providedParts = provided.split('.');
  return expectedParts.every((part, index) => part === '*' || part === providedParts[index]);
}
function isSupportedSpecVersion(version, options = { allowAnyPatchVersion: false }) {
  return Object.values(_SupportedRpcVersion).some((v) =>
    isVersion(options.allowAnyPatchVersion ? toAnyPatchVersion(v) : v, version)
  );
}
function toAnyPatchVersion(version) {
  const parts = version.split('.');
  if (parts.length < 3) {
    return version;
  }
  return `${parts[0]}.${parts[1]}.*`;
}
function toApiVersion(version) {
  const [major, minor] = version.replace(/^v/, '').split('.');
  return `v${major}_${minor}`;
}
function compareVersions(a, b) {
  const aParts = a.split('.').map(Number);
  const bParts = b.split('.').map(Number);
  const maxLen = Math.max(aParts.length, bParts.length);
  for (let i = 0; i < maxLen; i += 1) {
    const aNum = aParts[i] || 0;
    const bNum = bParts[i] || 0;
    if (aNum > bNum) return 1;
    if (aNum < bNum) return -1;
  }
  return 0;
}
function isPreConfirmedBlock(response) {
  return response.status === rpc_exports.EBlockStatus.PRE_CONFIRMED;
}
function isPreConfirmedTransaction(response) {
  return !('block_hash' in response);
}
function isPreConfirmedStateUpdate(response) {
  return !('block_hash' in response);
}

// src/utils/hash/classHash/index.ts
function computeContractClassHash(contract) {
  const compiledContract = isString(contract) ? parse2(contract) : contract;
  if ('sierra_program' in compiledContract) {
    return computeSierraContractClassHash(compiledContract);
  }
  return computeLegacyContractClassHash(compiledContract);
}
function computeCompiledClassHash(
  casm,
  starknetVersion = SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS
) {
  if (compareVersions(starknetVersion, SN_VERSION_IMPLEMENTING_BLAKE_FOR_COMPILED_CLASS) >= 0) {
    return computeCompiledClassHashBlake(casm);
  }
  return computeCompiledClassHashPoseidon(casm);
}

// src/utils/stark/index.ts
var stark_exports = {};
__export(stark_exports, {
  ZeroFeeEstimate: () => ZeroFeeEstimate,
  compressProgram: () => compressProgram,
  decodeProof: () => decodeProof,
  decompressProgram: () => decompressProgram,
  encodeProof: () => encodeProof,
  formatSignature: () => formatSignature,
  getFullPublicKey: () => getFullPublicKey,
  getSharedSecret: () => getSharedSecret,
  intDAM: () => intDAM,
  randomAddress: () => randomAddress,
  resourceBoundsToBigInt: () => resourceBoundsToBigInt,
  resourceBoundsToEstimateFeeResponse: () => resourceBoundsToEstimateFeeResponse,
  resourceBoundsToHexString: () => resourceBoundsToHexString,
  signatureToDecimalArray: () => signatureToDecimalArray,
  signatureToHexArray: () => signatureToHexArray,
  toFeeVersion: () => toFeeVersion,
  toOverheadOverallFee: () => toOverheadOverallFee,
  toOverheadResourceBounds: () => toOverheadResourceBounds,
  toTransactionVersion: () => toTransactionVersion,
  v3Details: () => v3Details,
  zeroResourceBounds: () => zeroResourceBounds,
});
var import_starknet4 = require('@scure/starknet');
async function compressProgram(jsonProgram) {
  const stringified = isString(jsonProgram) ? jsonProgram : stringify2(jsonProgram);
  const stream = new CompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(new TextEncoder().encode(stringified));
  writer.close();
  const compressedProgram = await new Response(stream.readable).arrayBuffer();
  return btoaUniversal(compressedProgram);
}
async function decompressProgram(base642) {
  if (Array.isArray(base642)) return base642;
  const compressed = atobUniversal(base642);
  const stream = new DecompressionStream('gzip');
  const writer = stream.writable.getWriter();
  writer.write(new Uint8Array(compressed));
  writer.close();
  const decompressed = await new Response(stream.readable).text();
  return parse2(decompressed);
}
function randomAddress() {
  const randomKeyPair = import_starknet4.utils.randomPrivateKey();
  return (0, import_starknet4.getStarkKey)(randomKeyPair);
}
function encodeProof(proof) {
  return btoaUniversal(new Uint32Array(proof).buffer);
}
function decodeProof(proofBase64) {
  const decoded = atobUniversal(proofBase64);
  const uint32Array = new Uint32Array(decoded.buffer);
  return Array.from(uint32Array);
}
function formatSignature(sig) {
  if (!sig) throw Error('formatSignature: provided signature is undefined');
  if (Array.isArray(sig)) {
    return sig.map((it) => toHex(it));
  }
  try {
    const { r, s } = sig;
    return [toHex(r), toHex(s)];
  } catch (e) {
    throw new Error('Signature need to be weierstrass.SignatureType or an array for custom');
  }
}
function signatureToDecimalArray(sig) {
  return bigNumberishArrayToDecimalStringArray(formatSignature(sig));
}
function signatureToHexArray(sig) {
  return bigNumberishArrayToHexadecimalStringArray(formatSignature(sig));
}
function getSharedSecret(privateKey, fullPublicKey) {
  const privK = toHex(privateKey);
  const fullPubKHex = removeHexPrefix(toHex(fullPublicKey)).padStart(130, '0');
  if (fullPubKHex.length !== 130 || !fullPubKHex.startsWith('04')) {
    throw new Error(
      'fullPublicKey must be an uncompressed public key (starting with 04, 65 bytes total)'
    );
  }
  const sharedSecret = buf2hex(starkCurve.getSharedSecret(privK, fullPubKHex));
  return addHexPrefix(sharedSecret);
}
function zeroResourceBounds() {
  return toOverheadResourceBounds(ZeroFeeEstimate(), false);
}
function toOverheadResourceBounds(estimate, overhead = config.get('resourceBoundsOverhead')) {
  return {
    l2_gas: {
      max_amount: addPercent(
        estimate.l2_gas_consumed,
        overhead !== false ? overhead.l2_gas.max_amount : 0
      ),
      max_price_per_unit: addPercent(
        estimate.l2_gas_price,
        overhead !== false ? overhead.l2_gas.max_price_per_unit : 0
      ),
    },
    l1_gas: {
      max_amount: addPercent(
        estimate.l1_gas_consumed,
        overhead !== false ? overhead.l1_gas.max_amount : 0
      ),
      max_price_per_unit: addPercent(
        estimate.l1_gas_price,
        overhead !== false ? overhead.l1_gas.max_price_per_unit : 0
      ),
    },
    l1_data_gas: {
      max_amount: addPercent(
        estimate.l1_data_gas_consumed,
        overhead !== false ? overhead.l1_data_gas.max_amount : 0
      ),
      max_price_per_unit: addPercent(
        estimate.l1_data_gas_price,
        overhead !== false ? overhead.l1_data_gas.max_price_per_unit : 0
      ),
    },
  };
}
function resourceBoundsToEstimateFeeResponse(resourceBounds) {
  return {
    resourceBounds,
    /**
     * maximum overall fee for provided resource bounds
     */
    overall_fee:
      resourceBounds.l1_gas.max_amount * resourceBounds.l1_gas.max_price_per_unit +
      resourceBounds.l1_data_gas.max_amount * resourceBounds.l1_data_gas.max_price_per_unit +
      resourceBounds.l2_gas.max_amount * resourceBounds.l2_gas.max_price_per_unit,
    unit: 'FRI',
  };
}
function toOverheadOverallFee(estimate, overhead = config.get('resourceBoundsOverhead')) {
  return (
    addPercent(estimate.l1_gas_consumed, overhead !== false ? overhead.l1_gas.max_amount : 0) *
      addPercent(
        estimate.l1_gas_price,
        overhead !== false ? overhead.l1_gas.max_price_per_unit : 0
      ) +
    addPercent(
      estimate.l1_data_gas_consumed,
      overhead !== false ? overhead.l1_data_gas.max_amount : 0
    ) *
      addPercent(
        estimate.l1_data_gas_price,
        overhead !== false ? overhead.l1_data_gas.max_price_per_unit : 0
      ) +
    addPercent(estimate.l2_gas_consumed, overhead !== false ? overhead.l2_gas.max_amount : 0) *
      addPercent(estimate.l2_gas_price, overhead !== false ? overhead.l2_gas.max_price_per_unit : 0)
  );
}
function ZeroFeeEstimate() {
  return {
    l1_gas_consumed: '0',
    l1_gas_price: '0',
    l1_data_gas_consumed: '0',
    l1_data_gas_price: '0',
    l2_gas_consumed: '0',
    l2_gas_price: '0',
    overall_fee: '0',
    unit: 'FRI',
  };
}
function intDAM(dam) {
  if (dam === EDataAvailabilityMode.L1) return EDAMode.L1;
  if (dam === EDataAvailabilityMode.L2) return EDAMode.L2;
  throw Error('EDAM conversion');
}
function toTransactionVersion(defaultVersion, providedVersion) {
  const version = providedVersion ? toHex(providedVersion) : toHex(defaultVersion);
  const validVersions = Object.values(ETransactionVersion3);
  if (!validVersions.includes(version)) {
    throw Error(
      `${providedVersion ? 'providedVersion' : 'defaultVersion'} ${version} is not ETransactionVersion`
    );
  }
  return version;
}
function toFeeVersion(providedVersion) {
  if (!providedVersion) return void 0;
  const version = toHex(providedVersion);
  if (version === ETransactionVersion.V0) return ETransactionVersion.F0;
  if (version === ETransactionVersion.V1) return ETransactionVersion.F1;
  if (version === ETransactionVersion.V2) return ETransactionVersion.F2;
  if (version === ETransactionVersion.V3) return ETransactionVersion.F3;
  throw Error(`toFeeVersion: ${version} is not supported`);
}
function v3Details(details) {
  return {
    tip: details.tip || 0,
    paymasterData: details.paymasterData || [],
    accountDeploymentData: details.accountDeploymentData || [],
    nonceDataAvailabilityMode: details.nonceDataAvailabilityMode || EDataAvailabilityMode.L1,
    feeDataAvailabilityMode: details.feeDataAvailabilityMode || EDataAvailabilityMode.L1,
    resourceBounds: details.resourceBounds ?? zeroResourceBounds(),
    proofFacts: details.proofFacts,
    proof: details.proof,
  };
}
function getFullPublicKey(privateKey) {
  const privKey = toHex(privateKey);
  const fullPrivKey = addHexPrefix(buf2hex((0, import_starknet4.getPublicKey)(privKey, false)));
  return fullPrivKey;
}
function resourceBoundsToHexString(resourceBoundsBN) {
  const convertBigIntToHex = (obj) => {
    if (isBigInt(obj)) {
      return toHex(obj);
    }
    if (isObject(obj)) {
      const result = {};
      Object.keys(obj).forEach((key) => {
        result[key] = convertBigIntToHex(obj[key]);
      });
      return result;
    }
    return obj;
  };
  return convertBigIntToHex(resourceBoundsBN);
}
function resourceBoundsToBigInt(resourceBounds) {
  const convertStringToBigInt = (obj) => {
    if (isString(obj)) {
      return BigInt(obj);
    }
    if (isObject(obj)) {
      const result = {};
      Object.keys(obj).forEach((key) => {
        result[key] = convertStringToBigInt(obj[key]);
      });
      return result;
    }
    return obj;
  };
  return convertStringToBigInt(resourceBounds);
}

// src/utils/contractLoader.ts
function isFileSystemAvailable() {
  try {
    return typeof require !== 'undefined' && typeof require.resolve === 'function';
  } catch {
    logger.info('isFileSystemAvailable: false');
    return false;
  }
}
function contractLoader(input, compiledClassHash) {
  if (typeof File !== 'undefined' && (input instanceof File || Array.isArray(input))) {
    return loadFromFileAPI(input, compiledClassHash);
  }
  if (typeof input === 'string') {
    if (!isFileSystemAvailable()) {
      throw new Error(
        'contractLoader with string paths is only available in Node.js environments. In browsers, please use File objects from <input type="file"> or drag-and-drop. Example: await contractLoader(fileInput.files[0])'
      );
    }
    return loadFromFileSystem(input, compiledClassHash);
  }
  throw new Error(
    'Invalid input type. Expected string (Node.js path) or File/File[] (browser File API)'
  );
}
function loadFromFileSystem(contractPath, compiledClassHash) {
  const fs = require('fs');
  const path = require('path');
  const resolvedPath = path.resolve(contractPath);
  let dirPath;
  let specifiedSierraFile;
  let specifiedCasmFile;
  const stats = fs.statSync(resolvedPath);
  if (stats.isFile()) {
    dirPath = path.dirname(resolvedPath);
    const fileName = path.basename(resolvedPath);
    if (
      fileName.endsWith('.sierra.json') ||
      (fileName.endsWith('.json') && !fileName.endsWith('.casm'))
    ) {
      specifiedSierraFile = fileName;
    } else if (fileName.endsWith('.casm')) {
      specifiedCasmFile = fileName;
    } else {
      throw new Error(
        `Invalid file type. Expected .json, .sierra.json, or .casm file, got: ${fileName}`
      );
    }
  } else if (stats.isDirectory()) {
    dirPath = resolvedPath;
  } else {
    throw new Error(`Path is neither a file nor a directory: ${contractPath}`);
  }
  const files = fs.readdirSync(dirPath);
  let sierraFile;
  let casmFile;
  if (specifiedSierraFile) {
    sierraFile = specifiedSierraFile;
    const baseName = sierraFile.replace(/\.sierra\.json$/, '').replace(/\.json$/, '');
    casmFile = files.find((f) => f === `${baseName}.casm`);
  } else if (specifiedCasmFile) {
    casmFile = specifiedCasmFile;
    const baseName = casmFile.replace(/\.casm$/, '');
    sierraFile =
      files.find((f) => f === `${baseName}.sierra.json`) ||
      files.find((f) => f === `${baseName}.json`);
  } else {
    const sierraFiles = files.filter(
      (f) => f.endsWith('.sierra.json') || (f.endsWith('.json') && !f.endsWith('.casm'))
    );
    if (sierraFiles.length === 0) {
      throw new Error(`No .sierra.json file found in ${dirPath}. Sierra file is required.`);
    }
    if (sierraFiles.length > 1) {
      throw new Error(
        `Multiple .sierra.json files found in ${dirPath}: ${sierraFiles.join(', ')}. Please specify which file to use.`
      );
    }
    [sierraFile] = sierraFiles;
    const baseName = sierraFile.replace(/\.sierra\.json$/, '').replace(/\.json$/, '');
    casmFile = files.find((f) => f === `${baseName}.casm`);
  }
  if (!sierraFile) {
    throw new Error(`No .sierra.json file found in ${dirPath}. Sierra file is required.`);
  }
  const sierraPath = path.join(dirPath, sierraFile);
  const sierraContent = parse2(fs.readFileSync(sierraPath, 'utf8'));
  if (casmFile) {
    const casmPath = path.join(dirPath, casmFile);
    const casmContent = parse2(fs.readFileSync(casmPath, 'utf8'));
    return {
      sierra: sierraContent,
      casm: casmContent,
      compiler: casmContent.compiler_version,
    };
  }
  if (!compiledClassHash) {
    throw new Error(
      `No .casm file found for ${sierraFile} and no compiledClassHash provided. Either provide a .casm file or pass compiledClassHash as second parameter.`
    );
  }
  return {
    sierra: sierraContent,
    compiledClassHash,
  };
}
async function loadFromFileAPI(input, compiledClassHash) {
  const files = Array.isArray(input) ? input : [input];
  if (files.length === 0) {
    throw new Error('No files provided');
  }
  const sierraFiles = files.filter(
    (file) =>
      file.name.endsWith('.sierra.json') ||
      (file.name.endsWith('.json') && !file.name.endsWith('.casm'))
  );
  const casmFiles = files.filter((file) => file.name.endsWith('.casm'));
  if (sierraFiles.length > 1) {
    throw new Error(
      `Multiple .sierra.json files provided: ${sierraFiles.map((f) => f.name).join(', ')}. Please provide only one sierra file.`
    );
  }
  if (casmFiles.length > 1) {
    throw new Error(
      `Multiple .casm files provided: ${casmFiles.map((f) => f.name).join(', ')}. Please provide only one casm file.`
    );
  }
  const sierraFile = sierraFiles[0];
  const casmFile = casmFiles[0];
  if (!sierraFile) {
    throw new Error(
      `No .sierra.json file found in provided files. Sierra file is required. Provided files: ${files.map((f) => f.name).join(', ')}`
    );
  }
  const sierraContent = parse2(await readFileAsText(sierraFile));
  if (casmFile) {
    const casmContent = parse2(await readFileAsText(casmFile));
    return {
      sierra: sierraContent,
      casm: casmContent,
      compiler: casmContent.compiler_version,
    };
  }
  if (!compiledClassHash) {
    throw new Error(
      'No .casm file found in provided files and no compiledClassHash provided. Either provide a .casm file or pass compiledClassHash as second parameter.'
    );
  }
  return {
    sierra: sierraContent,
    compiledClassHash,
  };
}
function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        resolve(content);
      } else {
        reject(new Error(`Failed to read file ${file.name} as text`));
      }
    };
    reader.onerror = () => {
      reject(new Error(`Failed to read file ${file.name}: ${reader.error?.message}`));
    };
    reader.readAsText(file);
  });
}

// src/utils/contract.ts
function isSierra(contract) {
  const compiledContract = isString(contract) ? parse2(contract) : contract;
  return 'sierra_program' in compiledContract;
}
function extractContractHashes(payload, starknetVersion) {
  const response = { ...payload };
  if (isSierra(payload.contract)) {
    if (!payload.compiledClassHash && payload.casm) {
      response.compiledClassHash = computeCompiledClassHash(payload.casm, starknetVersion);
    }
    if (!response.compiledClassHash)
      throw new Error(
        'Extract compiledClassHash failed, provide (CairoAssembly).casm file or compiledClassHash'
      );
  }
  response.classHash = payload.classHash ?? computeContractClassHash(payload.contract);
  if (!response.classHash)
    throw new Error('Extract classHash failed, provide (CompiledContract).json file or classHash');
  return response;
}
async function contractClassResponseToLegacyCompiledContract(ccr) {
  if (isSierra(ccr)) {
    throw Error('ContractClassResponse need to be LegacyContractClass (cairo0 response class)');
  }
  const contract = ccr;
  return {
    ...contract,
    program: await decompressProgram(contract.program),
  };
}

// src/utils/eth.ts
var eth_exports = {};
__export(eth_exports, {
  ethRandomPrivateKey: () => ethRandomPrivateKey,
  validateAndParseEthAddress: () => validateAndParseEthAddress,
});
var import_secp256k1 = require('@noble/curves/secp256k1');
function ethRandomPrivateKey() {
  return sanitizeHex(buf2hex(import_secp256k1.secp256k1.utils.randomPrivateKey()));
}
function validateAndParseEthAddress(address) {
  assertInRange(address, ZERO, 2n ** 160n - 1n, 'Ethereum Address ');
  const result = addHexPrefix(removeHexPrefix(toHex(address)).padStart(40, '0'));
  assert(Boolean(result.match(/^(0x)?[0-9a-f]{40}$/)), 'Invalid Ethereum Address Format');
  return result;
}

// src/utils/connect/fetch.ts
var fetch_default =
  (typeof globalThis !== 'undefined' &&
    typeof globalThis.fetch !== 'undefined' &&
    globalThis.fetch.bind(globalThis)) ||
  (typeof window !== 'undefined' &&
    typeof window.fetch !== 'undefined' &&
    window.fetch.bind(window)) ||
  (typeof global !== 'undefined' &&
    typeof global.fetch !== 'undefined' &&
    global.fetch.bind(global)) ||
  (() => {
    throw new LibraryError(
      "'fetch()' not detected, use the 'baseFetch' constructor parameter to set it"
    );
  });

// src/utils/provider.ts
var provider_exports = {};
__export(provider_exports, {
  Block: () => Block,
  createSierraContractClass: () => createSierraContractClass,
  extractAbi: () => extractAbi,
  getDefaultNodeUrl: () => getDefaultNodeUrl,
  getDefaultNodes: () => getDefaultNodes,
  getSupportedRpcVersions: () => getSupportedRpcVersions,
  parseContract: () => parseContract,
  validBlockTags: () => validBlockTags,
  wait: () => wait,
});
function wait(delay) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}
async function createSierraContractClass(contract) {
  const result = { ...contract };
  delete result.sierra_program_debug_info;
  result.abi = formatSpaces(stringify2(contract.abi));
  result.sierra_program = formatSpaces(stringify2(contract.sierra_program));
  result.sierra_program = await compressProgram(result.sierra_program);
  return result;
}
async function parseContract(contract) {
  const parsedContract = isString(contract) ? parse2(contract) : contract;
  if (!isSierra(contract)) {
    return {
      ...parsedContract,
      ...('program' in parsedContract && {
        program: await compressProgram(parsedContract.program),
      }),
    };
  }
  return await createSierraContractClass(parsedContract);
}
function extractAbi(contract) {
  return isString(contract.abi) ? parse2(contract.abi) : contract.abi;
}
var getDefaultNodeUrl = (networkName, rpcVersion) => {
  logger.info('Using default public node url, please provide nodeUrl in provider options!');
  const rpcNodes = getDefaultNodes(rpcVersion ?? config.get('rpcVersion'));
  const nodes = rpcNodes[networkName ?? _NetworkName.SN_SEPOLIA];
  const randIdx = Math.floor(Math.random() * nodes.length);
  return nodes[randIdx];
};
function getDefaultNodes(rpcVersion) {
  const apiVersion = toApiVersion(rpcVersion);
  return Object.fromEntries(
    Object.entries(RPC_DEFAULT_NODES).map(([key, urls]) => [
      key,
      urls.map((url) => `${url}${apiVersion}`),
    ])
  );
}
function getSupportedRpcVersions() {
  return [...new Set(Object.values(_SupportedRpcVersion))];
}
var validBlockTags = Object.values(BlockTag);
var Block = class {
  /**
   * @param {BlockIdentifier} hash if not null, contains the block hash
   */
  hash = null;
  /**
   * @param {BlockIdentifier} number if not null, contains the block number
   */
  number = null;
  /**
   * @param {BlockIdentifier} tag if not null, contains "pre_confirmed" or "latest"
   */
  tag = null;
  setIdentifier(__identifier) {
    if (isString(__identifier)) {
      if (isDecimalString2(__identifier)) {
        this.number = parseInt(__identifier, 10);
      } else if (isHex(__identifier)) {
        this.hash = __identifier;
      } else if (validBlockTags.includes(__identifier)) {
        this.tag = __identifier;
      } else {
        throw TypeError(`Block identifier unmanaged: ${__identifier}`);
      }
    } else if (isBigInt(__identifier)) {
      this.hash = toHex(__identifier);
    } else if (isNumber(__identifier)) {
      this.number = __identifier;
    } else {
      this.tag = BlockTag.LATEST;
    }
    if (isNumber(this.number) && this.number < 0) {
      throw TypeError(`Block number (${this.number}) can't be negative`);
    }
  }
  /**
   * Create a Block instance
   * @param {BlockIdentifier} _identifier  hex string and BigInt are detected as block hashes.
   * decimal string and number are detected as block numbers.
   * text string are detected as block tag.
   * null is considered as a 'latest' block tag.
   */
  constructor(_identifier) {
    this.setIdentifier(_identifier);
  }
  // TODO: fix any
  /**
   * @returns {any} the identifier as a string
   * @example
   * ```typescript
   * const result = new provider.Block(123456n).queryIdentifier;
   * // result = "blockHash=0x1e240"
   * ```
   */
  get queryIdentifier() {
    if (this.number !== null) {
      return `blockNumber=${this.number}`;
    }
    if (this.hash !== null) {
      return `blockHash=${this.hash}`;
    }
    return `blockNumber=${this.tag}`;
  }
  // TODO: fix any
  /**
   * @returns {any} the identifier as an object
   * @example
   * ```typescript
   * const result = new provider.Block(56789).identifier;
   * // result = { block_number: 56789 }
   * ```
   */
  get identifier() {
    if (this.number !== null) {
      return { block_number: this.number };
    }
    if (this.hash !== null) {
      return { block_hash: this.hash };
    }
    return this.tag;
  }
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
  set identifier(_identifier) {
    this.setIdentifier(_identifier);
  }
  valueOf = () => this.number;
  toString = () => this.hash;
};

// src/utils/transaction/index.ts
var transaction_exports = {};
__export(transaction_exports, {
  fromCallsToExecuteCalldata: () => fromCallsToExecuteCalldata,
  fromCallsToExecuteCalldata_cairo1: () => fromCallsToExecuteCalldata_cairo1,
  getCompiledCalldata: () => getCompiledCalldata,
  getExecuteCalldata: () => getExecuteCalldata,
  getVersionsByType: () => getVersionsByType,
  transformCallsToMulticallArrays: () => transformCallsToMulticallArrays,
});

// src/utils/transaction/getCompiledCalldata.ts
function getCompiledCalldata(constructorArguments, callback) {
  if (Array.isArray(constructorArguments) && '__compiled__' in constructorArguments)
    return constructorArguments;
  if (
    Array.isArray(constructorArguments) &&
    Array.isArray(constructorArguments[0]) &&
    '__compiled__' in constructorArguments[0]
  )
    return constructorArguments[0];
  return callback();
}

// src/utils/transaction/transaction.ts
var transformCallsToMulticallArrays = (calls) => {
  const callArray = [];
  const calldata = [];
  calls.forEach((call) => {
    const data = CallData.compile(call.calldata || []);
    callArray.push({
      to: toBigInt(call.contractAddress).toString(10),
      selector: toBigInt(getSelectorFromName(call.entrypoint)).toString(10),
      data_offset: calldata.length.toString(),
      data_len: data.length.toString(),
    });
    calldata.push(...data);
  });
  return {
    callArray,
    calldata: CallData.compile({ calldata }),
  };
};
var fromCallsToExecuteCalldata = (calls) => {
  const { callArray, calldata } = transformCallsToMulticallArrays(calls);
  const compiledCalls = CallData.compile({ callArray });
  return [...compiledCalls, ...calldata];
};
var fromCallsToExecuteCalldata_cairo1 = (calls) => {
  const orderCalls = calls.map((call) => ({
    contractAddress: call.contractAddress,
    entrypoint: call.entrypoint,
    calldata:
      Array.isArray(call.calldata) && '__compiled__' in call.calldata
        ? call.calldata
        : CallData.compile(call.calldata),
    // RawArgsObject | RawArgsArray type
  }));
  return CallData.compile({ orderCalls });
};
var getExecuteCalldata = (calls, cairoVersion = '0') => {
  if (cairoVersion === '1') {
    return fromCallsToExecuteCalldata_cairo1(calls);
  }
  return fromCallsToExecuteCalldata(calls);
};
function getVersionsByType(versionType) {
  return versionType === 'fee'
    ? {
        v3: ETransactionVersion.F3,
      }
    : { v3: ETransactionVersion.V3 };
}

// src/channel/rpc_0_9_0.ts
var RpcChannel = class {
  id = 'RPC090';
  /**
   * RPC specification version this Channel class implements
   */
  channelSpecVersion = _SupportedRpcVersion.v0_9_0;
  nodeUrl;
  headers;
  requestId;
  blockIdentifier;
  retries;
  waitMode;
  // behave like web2 rpc and return when tx is processed
  chainId;
  /**
   * RPC specification version of the connected node
   */
  specVersion;
  transactionRetryIntervalFallback;
  batchClient;
  baseFetch;
  constructor(optionsOrProvider) {
    const {
      baseFetch,
      batch,
      blockIdentifier,
      chainId,
      headers,
      nodeUrl,
      retries,
      specVersion,
      transactionRetryIntervalFallback,
      waitMode,
    } = optionsOrProvider || {};
    if (Object.values(_NetworkName).includes(nodeUrl)) {
      this.nodeUrl = getDefaultNodeUrl(nodeUrl, this.channelSpecVersion);
    } else if (nodeUrl) {
      this.nodeUrl = nodeUrl;
    } else {
      this.nodeUrl = getDefaultNodeUrl(void 0, this.channelSpecVersion);
    }
    const channelDefaults = config.get('channelDefaults');
    this.baseFetch = baseFetch || config.get('fetch') || fetch_default;
    this.blockIdentifier = blockIdentifier ?? channelDefaults.options.blockIdentifier;
    this.chainId = chainId;
    this.headers = { ...channelDefaults.options.headers, ...headers };
    this.retries = retries ?? channelDefaults.options.retries;
    this.specVersion = specVersion;
    this.transactionRetryIntervalFallback =
      transactionRetryIntervalFallback ?? channelDefaults.options.transactionRetryIntervalFallback;
    this.waitMode = waitMode ?? false;
    this.requestId = 0;
    if (isNumber(batch)) {
      this.batchClient = new BatchClient({
        nodeUrl: this.nodeUrl,
        headers: this.headers,
        interval: batch,
        baseFetch: this.baseFetch,
        rpcMethods: {},
        // Type information only, not used at runtime
      });
    }
    logger.debug('Using Channel', this.id);
  }
  readSpecVersion() {
    return this.specVersion;
  }
  get transactionRetryIntervalDefault() {
    return this.transactionRetryIntervalFallback ?? 5e3;
  }
  setChainId(chainId) {
    this.chainId = chainId;
  }
  fetch(method, params, id = 0) {
    const rpcRequestBody = {
      id,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    return this.baseFetch(this.nodeUrl, {
      method: 'POST',
      body: stringify2(rpcRequestBody),
      headers: this.headers,
    });
  }
  errorHandler(method, params, rpcError, otherError) {
    if (rpcError) {
      throw new RpcError(rpcError, method, params);
    }
    if (otherError instanceof LibraryError) {
      throw otherError;
    }
    if (otherError) {
      throw Error(otherError.message);
    }
  }
  async fetchEndpoint(method, params) {
    try {
      let error;
      let result;
      if (this.batchClient) {
        ({ error, result } = await this.batchClient.fetch(method, params, (this.requestId += 1)));
      } else {
        const rawResult = await this.fetch(method, params, (this.requestId += 1));
        ({ error, result } = await rawResult.json());
      }
      this.errorHandler(method, params, error);
      if (result === void 0) {
        throw new LibraryError(
          `RPC: '${method}' returned an empty response (no result and no error). The node reply is malformed or not a valid JSON-RPC response.`
        );
      }
      return result;
    } catch (error) {
      this.errorHandler(method, params, error?.response?.data, error);
      throw error;
    }
  }
  async getChainId() {
    this.chainId ??= await this.fetchEndpoint('starknet_chainId');
    return this.chainId;
  }
  /**
   * fetch rpc node specVersion
   * @example this.specVersion = "0.9.0"
   */
  getSpecVersion() {
    return this.fetchEndpoint('starknet_specVersion');
  }
  /**
   * fetch if undefined else just return this.specVersion
   * @example this.specVersion = "0.9.0"
   */
  async setUpSpecVersion() {
    if (!this.specVersion) {
      const unknownSpecVersion = await this.fetchEndpoint('starknet_specVersion');
      if (!isVersion(this.channelSpecVersion, unknownSpecVersion)) {
        logger.error(SYSTEM_MESSAGES.channelVersionMismatch, {
          channelId: this.id,
          channelSpecVersion: this.channelSpecVersion,
          nodeSpecVersion: this.specVersion,
        });
      }
      if (!isSupportedSpecVersion(unknownSpecVersion)) {
        throw new LibraryError(`${SYSTEM_MESSAGES.unsupportedSpecVersion}, channelId: ${this.id}`);
      }
      this.specVersion = unknownSpecVersion;
    }
    return this.specVersion;
  }
  // TODO: New Method add test
  /**
   * Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order
   */
  getMessagesStatus(txHash) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getMessagesStatus', {
      transaction_hash,
    });
  }
  // TODO: New Method add test
  getStorageProof(
    classHashes = [],
    contractAddresses = [],
    contractsStorageKeys = [],
    blockIdentifier = this.blockIdentifier
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const class_hashes = bigNumberishArrayToHexadecimalStringArray(classHashes);
    const contract_addresses = bigNumberishArrayToHexadecimalStringArray(contractAddresses);
    return this.fetchEndpoint('starknet_getStorageProof', {
      block_id,
      class_hashes,
      contract_addresses,
      contracts_storage_keys: contractsStorageKeys,
    });
  }
  // TODO: New Method add test
  getCompiledCasm(classHash) {
    const class_hash = toHex(classHash);
    return this.fetchEndpoint('starknet_getCompiledCasm', {
      class_hash,
    });
  }
  getNonceForAddress(contractAddress, blockIdentifier = this.blockIdentifier) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getNonce', {
      contract_address,
      block_id,
    });
  }
  /**
   * Helper method to get the starknet version from the block, default latest block
   * @returns Starknet version
   */
  async getStarknetVersion(blockIdentifier = this.blockIdentifier) {
    const block = await this.getBlockWithTxHashes(blockIdentifier);
    return block.starknet_version;
  }
  /**
   * Get the most recent accepted block hash and number
   */
  getBlockLatestAccepted() {
    return this.fetchEndpoint('starknet_blockHashAndNumber');
  }
  /**
   * Get the most recent accepted block number
   * redundant use getBlockLatestAccepted();
   * @returns Number of the latest block
   */
  getBlockNumber() {
    return this.fetchEndpoint('starknet_blockNumber');
  }
  getBlockWithTxHashes(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  }
  getBlockWithTxs(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxs', { block_id });
  }
  getBlockWithReceipts(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithReceipts', { block_id });
  }
  getBlockStateUpdate(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStateUpdate', { block_id });
  }
  getBlockTransactionsTraces(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_traceBlockTransactions', { block_id });
  }
  getBlockTransactionCount(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
  }
  getTransactionByHash(txHash) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionByHash', {
      transaction_hash,
    });
  }
  getTransactionByBlockIdAndIndex(blockIdentifier, index) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', { block_id, index });
  }
  getTransactionReceipt(txHash) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionReceipt', { transaction_hash });
  }
  getTransactionTrace(txHash) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_traceTransaction', { transaction_hash });
  }
  /**
   * Get the status of a transaction
   */
  getTransactionStatus(transactionHash) {
    const transaction_hash = toHex(transactionHash);
    return this.fetchEndpoint('starknet_getTransactionStatus', { transaction_hash });
  }
  /**
   * @param invocations AccountInvocations
   * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
   * - blockIdentifier<br/>
   * - skipValidate (default true)<br/>
   * - skipFeeCharge (default true)<br/>
   */
  async simulateTransaction(invocations, simulateTransactionOptions = {}) {
    const channelDefaults = config.get('channelDefaults');
    const methodDefaults = channelDefaults.methods.simulateTransaction || {};
    const {
      blockIdentifier = this.blockIdentifier,
      skipValidate = methodDefaults.skipValidate,
      skipFeeCharge = methodDefaults.skipFeeCharge,
    } = simulateTransactionOptions;
    const block_id = new Block(blockIdentifier).identifier;
    const simulationFlags = [];
    if (skipValidate) simulationFlags.push(RPCSPEC09.ESimulationFlag.SKIP_VALIDATE);
    if (skipFeeCharge) simulationFlags.push(RPCSPEC09.ESimulationFlag.SKIP_FEE_CHARGE);
    return this.fetchEndpoint('starknet_simulateTransactions', {
      block_id,
      transactions: await Promise.all(invocations.map((it) => this.buildTransaction(it))),
      simulation_flags: simulationFlags,
    });
  }
  async waitForTransaction(txHash, options) {
    const transactionHash = toHex(txHash);
    let retries = options?.retries ?? this.retries;
    let lifeCycleRetries = options?.lifeCycleRetries ?? 3;
    let onchain = false;
    let isErrorState = false;
    const retryInterval = options?.retryInterval ?? this.transactionRetryIntervalDefault;
    const errorStates = options?.errorStates ?? [];
    const successStates = options?.successStates ?? [
      // RPC.ETransactionExecutionStatus.SUCCEEDED, // UDC  on SUCCEEDED + pre_confirmed had no proper events to parse UDC
      RPCSPEC09.ETransactionFinalityStatus.ACCEPTED_ON_L2,
      RPCSPEC09.ETransactionFinalityStatus.ACCEPTED_ON_L1,
    ];
    const errorMessages = {
      [RPCSPEC09.ETransactionStatus.RECEIVED]: SYSTEM_MESSAGES.txEvictedFromMempool,
      [RPCSPEC09.ETransactionStatus.PRE_CONFIRMED]: SYSTEM_MESSAGES.consensusFailed,
      [RPCSPEC09.ETransactionStatus.CANDIDATE]: SYSTEM_MESSAGES.txFailsBlockBuildingValidation,
    };
    const txLife = [];
    let txStatus;
    while (!onchain) {
      await wait(retryInterval);
      try {
        txStatus = await this.getTransactionStatus(transactionHash);
        txLife.push(txStatus.finality_status);
        const executionStatus = txStatus.execution_status;
        const finalityStatus = txStatus.finality_status;
        if (!finalityStatus) {
          const error = new Error('waiting for transaction status');
          throw error;
        }
        if (errorStates.includes(executionStatus) || errorStates.includes(finalityStatus)) {
          const message = `${executionStatus}: ${finalityStatus}`;
          const error = new Error(message);
          error.response = txStatus;
          isErrorState = true;
          throw error;
        } else if (
          successStates.includes(executionStatus) ||
          successStates.includes(finalityStatus)
        ) {
          onchain = true;
        }
      } catch (error) {
        if (error instanceof Error && isErrorState) {
          throw error;
        }
        if (error instanceof RpcError && error.isType('TXN_HASH_NOT_FOUND')) {
          logger.info('txLife: ', txLife);
          const errorMessage = errorMessages[txLife.at(-1)];
          if (errorMessage && lifeCycleRetries <= 0) {
            throw new Error(errorMessage);
          }
          lifeCycleRetries -= 1;
        }
        if (retries <= 0) {
          throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
        }
      }
      retries -= 1;
    }
    let txReceipt = null;
    while (txReceipt === null) {
      try {
        txReceipt = await this.getTransactionReceipt(transactionHash);
      } catch (error) {
        if (retries <= 0) {
          throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
        }
      }
      retries -= 1;
      await wait(retryInterval);
    }
    return txReceipt;
  }
  getStorageAt(contractAddress, key, blockIdentifier = this.blockIdentifier) {
    const contract_address = toHex(contractAddress);
    const parsedKey = toStorageKey(key);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStorageAt', {
      contract_address,
      key: parsedKey,
      block_id,
    });
  }
  getClassHashAt(contractAddress, blockIdentifier = this.blockIdentifier) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassHashAt', {
      block_id,
      contract_address,
    });
  }
  getClass(classHash, blockIdentifier = this.blockIdentifier) {
    const class_hash = toHex(classHash);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClass', {
      class_hash,
      block_id,
    });
  }
  getClassAt(contractAddress, blockIdentifier = this.blockIdentifier) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassAt', {
      block_id,
      contract_address,
    });
  }
  async getEstimateFee(invocations, options = {}) {
    const channelDefaults = config.get('channelDefaults');
    const methodDefaults = channelDefaults.methods.getEstimateFee || {};
    const { blockIdentifier = this.blockIdentifier, skipValidate = methodDefaults.skipValidate } =
      options;
    const block_id = new Block(blockIdentifier).identifier;
    const flags = {
      simulation_flags: skipValidate ? [RPCSPEC09.ESimulationFlag.SKIP_VALIDATE] : [],
    };
    return this.fetchEndpoint('starknet_estimateFee', {
      request: await Promise.all(invocations.map((it) => this.buildTransaction(it, 'fee'))),
      block_id,
      ...flags,
    });
  }
  async invoke(functionInvocation, details) {
    const transaction = await this.buildTransaction(
      {
        type: api_exports.ETransactionType.INVOKE,
        ...functionInvocation,
        ...details,
      },
      'transaction'
    );
    const promise = this.fetchEndpoint('starknet_addInvokeTransaction', {
      invoke_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  async invokeSignedTx(transaction) {
    const promise = this.fetchEndpoint('starknet_addInvokeTransaction', {
      invoke_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  async declare(declareTransaction, details) {
    const transaction = await this.buildTransaction(
      {
        type: api_exports.ETransactionType.DECLARE,
        ...declareTransaction,
        ...details,
      },
      'transaction'
    );
    const promise = this.fetchEndpoint('starknet_addDeclareTransaction', {
      declare_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  async deployAccount(deployAccountTransaction, details) {
    const transaction = await this.buildTransaction(
      {
        type: api_exports.ETransactionType.DEPLOY_ACCOUNT,
        ...deployAccountTransaction,
        ...details,
      },
      'transaction'
    );
    const promise = this.fetchEndpoint('starknet_addDeployAccountTransaction', {
      deploy_account_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  callContract(call, blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_call', {
      request: {
        contract_address: call.contractAddress,
        entry_point_selector: getSelectorFromName(call.entrypoint),
        calldata: CallData.toHex(call.calldata),
      },
      block_id,
    });
  }
  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   */
  estimateMessageFee(message, blockIdentifier = this.blockIdentifier) {
    const { from_address, to_address, entry_point_selector, payload } = message;
    const formattedMessage = {
      from_address: validateAndParseEthAddress(from_address),
      to_address: toHex(to_address),
      entry_point_selector: getSelector(entry_point_selector),
      payload: getHexStringArray(payload),
    };
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_estimateMessageFee', {
      message: formattedMessage,
      block_id,
    });
  }
  /**
   * Returns an object about the sync status, or false if the node is not synching
   * @returns Object with the stats data
   */
  getSyncingStats() {
    return this.fetchEndpoint('starknet_syncing');
  }
  /**
   * Returns all events matching the given filter
   * @returns events and the pagination of the events
   */
  getEvents(eventFilter) {
    return this.fetchEndpoint('starknet_getEvents', { filter: eventFilter });
  }
  // Generic buildTransaction that automatically narrows return type based on input
  async buildTransaction(invocation, versionType) {
    const defaultVersions = getVersionsByType(versionType);
    assert(isV3Tx(invocation), SYSTEM_MESSAGES.legacyTxRPC08Message);
    assert(
      versionType !== 'transaction' || isRPC08Plus_ResourceBoundsBN(invocation.resourceBounds),
      SYSTEM_MESSAGES.SWOldV3
    );
    const details = {
      signature: signatureToHexArray(invocation.signature),
      nonce: toHex(invocation.nonce),
      resource_bounds: resourceBoundsToHexString(invocation.resourceBounds),
      tip: toHex(invocation.tip),
      paymaster_data: invocation.paymasterData.map((it) => toHex(it)),
      nonce_data_availability_mode: invocation.nonceDataAvailabilityMode,
      fee_data_availability_mode: invocation.feeDataAvailabilityMode,
      account_deployment_data: invocation.accountDeploymentData.map((it) => toHex(it)),
      version: toTransactionVersion(defaultVersions.v3, invocation.version),
    };
    if (invocation.type === api_exports.ETransactionType.INVOKE) {
      const btx = {
        type: RPCSPEC09.ETransactionType.INVOKE,
        sender_address: invocation.contractAddress,
        calldata: CallData.toHex(invocation.calldata),
        ...details,
      };
      return btx;
    }
    if (invocation.type === api_exports.ETransactionType.DECLARE) {
      assert(isSierra(invocation.contract), 'Declaring non Sierra contract using RPC 0.9');
      const btx = {
        type: invocation.type,
        contract_class: {
          ...invocation.contract,
          sierra_program: await decompressProgram(invocation.contract.sierra_program),
        },
        compiled_class_hash: invocation.compiledClassHash || '',
        sender_address: invocation.senderAddress,
        ...details,
      };
      return btx;
    }
    if (invocation.type === api_exports.ETransactionType.DEPLOY_ACCOUNT) {
      const { account_deployment_data, ...restDetails } = details;
      const btx = {
        type: invocation.type,
        constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
        class_hash: toHex(invocation.classHash),
        contract_address_salt: toHex(invocation.addressSalt || 0),
        ...restDetails,
      };
      return btx;
    }
    throw Error('RPC buildTransaction received unknown TransactionType');
  }
};

// src/channel/rpc_0_10_2.ts
var rpc_0_10_2_exports = {};
__export(rpc_0_10_2_exports, {
  RpcChannel: () => RpcChannel2,
});
var RPC = __toESM(require('@starknet-io/starknet-types-0101'));
var RpcChannel2 = class {
  id = 'RPC0.10.2';
  /**
   * RPC specification version this Channel class implements
   */
  channelSpecVersion = _SupportedRpcVersion.v0_10_2;
  nodeUrl;
  headers;
  requestId;
  blockIdentifier;
  retries;
  waitMode;
  // behave like web2 rpc and return when tx is processed
  chainId;
  /**
   * RPC specification version of the connected node
   */
  specVersion;
  transactionRetryIntervalFallback;
  batchClient;
  baseFetch;
  constructor(optionsOrProvider) {
    const {
      baseFetch,
      batch,
      blockIdentifier,
      chainId,
      headers,
      nodeUrl,
      retries,
      specVersion,
      transactionRetryIntervalFallback,
      waitMode,
    } = optionsOrProvider || {};
    if (Object.values(_NetworkName).includes(nodeUrl)) {
      this.nodeUrl = getDefaultNodeUrl(nodeUrl, this.channelSpecVersion);
    } else if (nodeUrl) {
      this.nodeUrl = nodeUrl;
    } else {
      this.nodeUrl = getDefaultNodeUrl(void 0, this.channelSpecVersion);
    }
    const channelDefaults = config.get('channelDefaults');
    this.baseFetch = baseFetch || config.get('fetch') || fetch_default;
    this.blockIdentifier = blockIdentifier ?? channelDefaults.options.blockIdentifier;
    this.chainId = chainId;
    this.headers = { ...channelDefaults.options.headers, ...headers };
    this.retries = retries ?? channelDefaults.options.retries;
    this.specVersion = specVersion;
    this.transactionRetryIntervalFallback =
      transactionRetryIntervalFallback ?? channelDefaults.options.transactionRetryIntervalFallback;
    this.waitMode = waitMode ?? false;
    this.requestId = 0;
    if (isNumber(batch)) {
      this.batchClient = new BatchClient({
        nodeUrl: this.nodeUrl,
        headers: this.headers,
        interval: batch,
        baseFetch: this.baseFetch,
        rpcMethods: {},
        // Type information only, not used at runtime
      });
    }
    logger.debug('Using Channel', this.id);
  }
  readSpecVersion() {
    return this.specVersion;
  }
  get transactionRetryIntervalDefault() {
    return this.transactionRetryIntervalFallback ?? 5e3;
  }
  setChainId(chainId) {
    this.chainId = chainId;
  }
  fetch(method, params, id = 0) {
    const rpcRequestBody = {
      id,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    return this.baseFetch(this.nodeUrl, {
      method: 'POST',
      body: stringify2(rpcRequestBody),
      headers: this.headers,
    });
  }
  errorHandler(method, params, rpcError, otherError) {
    if (rpcError) {
      throw new RpcError(rpcError, method, params);
    }
    if (otherError instanceof LibraryError) {
      throw otherError;
    }
    if (otherError) {
      throw Error(otherError.message);
    }
  }
  async fetchEndpoint(method, params) {
    try {
      let error;
      let result;
      if (this.batchClient) {
        ({ error, result } = await this.batchClient.fetch(method, params, (this.requestId += 1)));
      } else {
        const rawResult = await this.fetch(method, params, (this.requestId += 1));
        ({ error, result } = await rawResult.json());
      }
      this.errorHandler(method, params, error);
      if (result === void 0) {
        throw new LibraryError(
          `RPC: '${method}' returned an empty response (no result and no error). The node reply is malformed or not a valid JSON-RPC response.`
        );
      }
      return result;
    } catch (error) {
      this.errorHandler(method, params, error?.response?.data, error);
      throw error;
    }
  }
  async getChainId() {
    this.chainId ??= await this.fetchEndpoint('starknet_chainId');
    return this.chainId;
  }
  /**
   * fetch rpc node specVersion
   * @example this.specVersion = "0.9.0"
   */
  getSpecVersion() {
    return this.fetchEndpoint('starknet_specVersion');
  }
  /**
   * fetch if undefined else just return this.specVersion
   * @example this.specVersion = "0.9.0"
   */
  async setUpSpecVersion() {
    if (!this.specVersion) {
      const unknownSpecVersion = await this.fetchEndpoint('starknet_specVersion');
      if (!isVersion('0.10', unknownSpecVersion)) {
        logger.error(SYSTEM_MESSAGES.channelVersionMismatch, {
          channelId: this.id,
          channelSpecVersion: this.channelSpecVersion,
          nodeSpecVersion: this.specVersion,
        });
      }
      if (!isSupportedSpecVersion(unknownSpecVersion)) {
        throw new LibraryError(`${SYSTEM_MESSAGES.unsupportedSpecVersion}, channelId: ${this.id}`);
      }
      this.specVersion = unknownSpecVersion;
    }
    return this.specVersion;
  }
  // TODO: New Method add test
  /**
   * Given an l1 tx hash, returns the associated l1_handler tx hashes and statuses for all L1 -> L2 messages sent by the l1 transaction, ordered by the l1 tx sending order
   */
  getMessagesStatus(txHash) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getMessagesStatus', {
      transaction_hash,
    });
  }
  // TODO: New Method add test
  getStorageProof(
    classHashes = [],
    contractAddresses = [],
    contractsStorageKeys = [],
    blockIdentifier = this.blockIdentifier
  ) {
    const block_id = new Block(blockIdentifier).identifier;
    const class_hashes = bigNumberishArrayToHexadecimalStringArray(classHashes);
    const contract_addresses = bigNumberishArrayToHexadecimalStringArray(contractAddresses);
    return this.fetchEndpoint('starknet_getStorageProof', {
      block_id,
      class_hashes,
      contract_addresses,
      contracts_storage_keys: contractsStorageKeys,
    });
  }
  // TODO: New Method add test
  getCompiledCasm(classHash) {
    const class_hash = toHex(classHash);
    return this.fetchEndpoint('starknet_getCompiledCasm', {
      class_hash,
    });
  }
  getNonceForAddress(contractAddress, blockIdentifier = this.blockIdentifier) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getNonce', {
      contract_address,
      block_id,
    });
  }
  /**
   * Helper method to get the starknet version from the block, default latest block
   * @returns Starknet version
   */
  async getStarknetVersion(blockIdentifier = this.blockIdentifier) {
    const block = await this.getBlockWithTxHashes(blockIdentifier);
    return block.starknet_version;
  }
  /**
   * Get the most recent accepted block hash and number
   */
  getBlockLatestAccepted() {
    return this.fetchEndpoint('starknet_blockHashAndNumber');
  }
  /**
   * Get the most recent accepted block number
   * redundant use getBlockLatestAccepted();
   * @returns Number of the latest block
   */
  getBlockNumber() {
    return this.fetchEndpoint('starknet_blockNumber');
  }
  getBlockWithTxHashes(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockWithTxHashes', { block_id });
  }
  /**
   * Get block information with full transactions
   * @param blockIdentifier - block identifier
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getBlockWithTxs(blockIdentifier = this.blockIdentifier, options) {
    const block_id = new Block(blockIdentifier).identifier;
    const response_flags = options?.includeProofFacts
      ? [RPC.ETxnResponseFlag.INCLUDE_PROOF_FACTS]
      : void 0;
    return this.fetchEndpoint('starknet_getBlockWithTxs', {
      block_id,
      ...(response_flags && { response_flags }),
    });
  }
  /**
   * Get block information with transaction receipts
   * @param blockIdentifier - block identifier
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getBlockWithReceipts(blockIdentifier = this.blockIdentifier, options) {
    const block_id = new Block(blockIdentifier).identifier;
    const response_flags = options?.includeProofFacts
      ? [RPC.ETxnResponseFlag.INCLUDE_PROOF_FACTS]
      : void 0;
    return this.fetchEndpoint('starknet_getBlockWithReceipts', {
      block_id,
      ...(response_flags && { response_flags }),
    });
  }
  getBlockStateUpdate(blockIdentifier = this.blockIdentifier, contractAddresses) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStateUpdate', {
      block_id,
      ...(contractAddresses && {
        contract_addresses: contractAddresses.map((addr) => toHex(addr)),
      }),
    });
  }
  /**
   * Get transaction traces for all transactions in a block
   * @param blockIdentifier - block identifier
   * @param options - optional flags
   *  - returnInitialReads - include initial storage reads in traces (RPC 0.10.1+)
   */
  getBlockTransactionsTraces(blockIdentifier = this.blockIdentifier, options) {
    const block_id = new Block(blockIdentifier).identifier;
    const trace_flags = options?.returnInitialReads
      ? [RPC.ETraceFlag.RETURN_INITIAL_READS]
      : void 0;
    return this.fetchEndpoint('starknet_traceBlockTransactions', {
      block_id,
      ...(trace_flags && { trace_flags }),
    });
  }
  getBlockTransactionCount(blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getBlockTransactionCount', { block_id });
  }
  /**
   * Get transaction by hash
   * @param txHash - transaction hash
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getTransactionByHash(txHash, options) {
    const transaction_hash = toHex(txHash);
    const response_flags = options?.includeProofFacts
      ? [RPC.ETxnResponseFlag.INCLUDE_PROOF_FACTS]
      : void 0;
    return this.fetchEndpoint('starknet_getTransactionByHash', {
      transaction_hash,
      ...(response_flags && { response_flags }),
    });
  }
  /**
   * Get transaction by block identifier and index
   * @param blockIdentifier - block identifier
   * @param index - transaction index in the block
   * @param options - optional flags
   *  - includeProofFacts - include proof facts in the response (RPC 0.10.1+)
   */
  getTransactionByBlockIdAndIndex(blockIdentifier, index, options) {
    const block_id = new Block(blockIdentifier).identifier;
    const response_flags = options?.includeProofFacts
      ? [RPC.ETxnResponseFlag.INCLUDE_PROOF_FACTS]
      : void 0;
    return this.fetchEndpoint('starknet_getTransactionByBlockIdAndIndex', {
      block_id,
      index,
      ...(response_flags && { response_flags }),
    });
  }
  getTransactionReceipt(txHash) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_getTransactionReceipt', { transaction_hash });
  }
  getTransactionTrace(txHash) {
    const transaction_hash = toHex(txHash);
    return this.fetchEndpoint('starknet_traceTransaction', { transaction_hash });
  }
  /**
   * Get the status of a transaction
   */
  getTransactionStatus(transactionHash) {
    const transaction_hash = toHex(transactionHash);
    return this.fetchEndpoint('starknet_getTransactionStatus', { transaction_hash });
  }
  /**
   * @param invocations AccountInvocations
   * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
   * - blockIdentifier<br/>
   * - skipValidate (default true)<br/>
   * - skipFeeCharge (default true)<br/>
   * - returnInitialReads (default false) - include initial storage reads in trace (RPC 0.10.1+)<br/>
   */
  async simulateTransaction(invocations, simulateTransactionOptions = {}) {
    const channelDefaults = config.get('channelDefaults');
    const methodDefaults = channelDefaults.methods.simulateTransaction || {};
    const {
      blockIdentifier = this.blockIdentifier,
      skipValidate = methodDefaults.skipValidate,
      skipFeeCharge = methodDefaults.skipFeeCharge,
      returnInitialReads,
    } = simulateTransactionOptions;
    const block_id = new Block(blockIdentifier).identifier;
    const simulationFlags = [];
    if (skipValidate) simulationFlags.push(RPC.ESimulationFlag.SKIP_VALIDATE);
    if (skipFeeCharge) simulationFlags.push(RPC.ESimulationFlag.SKIP_FEE_CHARGE);
    const trace_flags = returnInitialReads ? [RPC.ETraceFlag.RETURN_INITIAL_READS] : void 0;
    return this.fetchEndpoint('starknet_simulateTransactions', {
      block_id,
      transactions: await Promise.all(invocations.map((it) => this.buildTransaction(it))),
      simulation_flags: simulationFlags,
      ...(trace_flags && { trace_flags }),
    });
  }
  async waitForTransaction(txHash, options) {
    const transactionHash = toHex(txHash);
    let retries = options?.retries ?? this.retries;
    let lifeCycleRetries = options?.lifeCycleRetries ?? 3;
    let onchain = false;
    let isErrorState = false;
    const retryInterval = options?.retryInterval ?? this.transactionRetryIntervalDefault;
    const errorStates = options?.errorStates ?? [];
    const successStates = options?.successStates ?? [
      // RPC.ETransactionExecutionStatus.SUCCEEDED, // UDC  on SUCCEEDED + pre_confirmed had no proper events to parse UDC
      RPC.ETransactionFinalityStatus.ACCEPTED_ON_L2,
      RPC.ETransactionFinalityStatus.ACCEPTED_ON_L1,
    ];
    const errorMessages = {
      [RPC.ETransactionStatus.RECEIVED]: SYSTEM_MESSAGES.txEvictedFromMempool,
      [RPC.ETransactionStatus.PRE_CONFIRMED]: SYSTEM_MESSAGES.consensusFailed,
      [RPC.ETransactionStatus.CANDIDATE]: SYSTEM_MESSAGES.txFailsBlockBuildingValidation,
    };
    const txLife = [];
    let txStatus;
    while (!onchain) {
      await wait(retryInterval);
      try {
        txStatus = await this.getTransactionStatus(transactionHash);
        txLife.push(txStatus.finality_status);
        const executionStatus = txStatus.execution_status;
        const finalityStatus = txStatus.finality_status;
        if (!finalityStatus) {
          const error = new Error('waiting for transaction status');
          throw error;
        }
        if (errorStates.includes(executionStatus) || errorStates.includes(finalityStatus)) {
          const message = `${executionStatus}: ${finalityStatus}`;
          const error = new Error(message);
          error.response = txStatus;
          isErrorState = true;
          throw error;
        } else if (
          successStates.includes(executionStatus) ||
          successStates.includes(finalityStatus)
        ) {
          onchain = true;
        }
      } catch (error) {
        if (error instanceof Error && isErrorState) {
          throw error;
        }
        if (error instanceof RpcError && error.isType('TXN_HASH_NOT_FOUND')) {
          logger.info('txLife: ', txLife);
          const errorMessage = errorMessages[txLife.at(-1)];
          if (errorMessage && lifeCycleRetries <= 0) {
            throw new Error(errorMessage);
          }
          lifeCycleRetries -= 1;
        }
        if (retries <= 0) {
          throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
        }
      }
      retries -= 1;
    }
    let txReceipt = null;
    while (txReceipt === null) {
      try {
        txReceipt = await this.getTransactionReceipt(transactionHash);
      } catch (error) {
        if (retries <= 0) {
          throw new Error(`waitForTransaction timed-out with retries ${this.retries}`);
        }
      }
      retries -= 1;
      await wait(retryInterval);
    }
    return txReceipt;
  }
  getStorageAt(contractAddress, key, blockIdentifier = this.blockIdentifier, responseFlags) {
    const contract_address = toHex(contractAddress);
    const parsedKey = toStorageKey(key);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getStorageAt', {
      contract_address,
      key: parsedKey,
      block_id,
      ...(responseFlags && { response_flags: responseFlags }),
    });
  }
  getClassHashAt(contractAddress, blockIdentifier = this.blockIdentifier) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassHashAt', {
      block_id,
      contract_address,
    });
  }
  getClass(classHash, blockIdentifier = this.blockIdentifier) {
    const class_hash = toHex(classHash);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClass', {
      class_hash,
      block_id,
    });
  }
  getClassAt(contractAddress, blockIdentifier = this.blockIdentifier) {
    const contract_address = toHex(contractAddress);
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_getClassAt', {
      block_id,
      contract_address,
    });
  }
  async getEstimateFee(invocations, options = {}) {
    const channelDefaults = config.get('channelDefaults');
    const methodDefaults = channelDefaults.methods.getEstimateFee || {};
    const { blockIdentifier = this.blockIdentifier, skipValidate = methodDefaults.skipValidate } =
      options;
    const block_id = new Block(blockIdentifier).identifier;
    const flags = {
      simulation_flags: skipValidate ? [RPC.ESimulationFlag.SKIP_VALIDATE] : [],
    };
    return this.fetchEndpoint('starknet_estimateFee', {
      request: await Promise.all(invocations.map((it) => this.buildTransaction(it, 'fee'))),
      block_id,
      ...flags,
    });
  }
  async invoke(functionInvocation, details) {
    const transaction = await this.buildTransaction(
      {
        type: api_exports.ETransactionType.INVOKE,
        ...functionInvocation,
        ...details,
      },
      'transaction'
    );
    const promise = this.fetchEndpoint('starknet_addInvokeTransaction', {
      invoke_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  async invokeSignedTx(transaction) {
    const promise = this.fetchEndpoint('starknet_addInvokeTransaction', {
      invoke_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  async declare(declareTransaction, details) {
    const transaction = await this.buildTransaction(
      {
        type: api_exports.ETransactionType.DECLARE,
        ...declareTransaction,
        ...details,
      },
      'transaction'
    );
    const promise = this.fetchEndpoint('starknet_addDeclareTransaction', {
      declare_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  async deployAccount(deployAccountTransaction, details) {
    const transaction = await this.buildTransaction(
      {
        type: api_exports.ETransactionType.DEPLOY_ACCOUNT,
        ...deployAccountTransaction,
        ...details,
      },
      'transaction'
    );
    const promise = this.fetchEndpoint('starknet_addDeployAccountTransaction', {
      deploy_account_transaction: transaction,
    });
    return this.waitMode ? this.waitForTransaction((await promise).transaction_hash) : promise;
  }
  callContract(call, blockIdentifier = this.blockIdentifier) {
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_call', {
      request: {
        contract_address: call.contractAddress,
        entry_point_selector: getSelectorFromName(call.entrypoint),
        calldata: CallData.toHex(call.calldata),
      },
      block_id,
    });
  }
  /**
   * NEW: Estimate the fee for a message from L1
   * @param message Message From L1
   */
  estimateMessageFee(message, blockIdentifier = this.blockIdentifier) {
    const { from_address, to_address, entry_point_selector, payload } = message;
    const formattedMessage = {
      from_address: validateAndParseEthAddress(from_address),
      to_address: toHex(to_address),
      entry_point_selector: getSelector(entry_point_selector),
      payload: getHexStringArray(payload),
    };
    const block_id = new Block(blockIdentifier).identifier;
    return this.fetchEndpoint('starknet_estimateMessageFee', {
      message: formattedMessage,
      block_id,
    });
  }
  /**
   * Returns an object about the sync status, or false if the node is not synching
   * @returns Object with the stats data
   */
  getSyncingStats() {
    return this.fetchEndpoint('starknet_syncing');
  }
  /**
   * Returns all events matching the given filter
   * @returns events and the pagination of the events
   */
  getEvents(eventFilter) {
    return this.fetchEndpoint('starknet_getEvents', { filter: eventFilter });
  }
  // Generic buildTransaction that automatically narrows return type based on input
  async buildTransaction(invocation, versionType) {
    const defaultVersions = getVersionsByType(versionType);
    assert(isV3Tx(invocation), SYSTEM_MESSAGES.legacyTxRPC08Message);
    assert(
      versionType !== 'transaction' || isRPC08Plus_ResourceBoundsBN(invocation.resourceBounds),
      SYSTEM_MESSAGES.SWOldV3
    );
    const details = {
      signature: signatureToHexArray(invocation.signature),
      nonce: toHex(invocation.nonce),
      resource_bounds: resourceBoundsToHexString(invocation.resourceBounds),
      tip: toHex(invocation.tip),
      paymaster_data: invocation.paymasterData.map((it) => toHex(it)),
      nonce_data_availability_mode: invocation.nonceDataAvailabilityMode,
      fee_data_availability_mode: invocation.feeDataAvailabilityMode,
      account_deployment_data: invocation.accountDeploymentData.map((it) => toHex(it)),
      version: toTransactionVersion(defaultVersions.v3, invocation.version),
    };
    if (invocation.type === api_exports.ETransactionType.INVOKE) {
      const btx = {
        type: RPC.ETransactionType.INVOKE,
        sender_address: invocation.contractAddress,
        calldata: CallData.toHex(invocation.calldata),
        ...details,
        ...(invocation.proofFacts &&
          invocation.proofFacts.length > 0 && {
            proof_facts: invocation.proofFacts.map((it) => toHex(it)),
          }),
        ...(invocation.proof && {
          proof: invocation.proof,
        }),
      };
      return btx;
    }
    if (invocation.type === api_exports.ETransactionType.DECLARE) {
      assert(isSierra(invocation.contract), 'Declaring non Sierra contract using RPC 0.9');
      const btx = {
        type: invocation.type,
        contract_class: {
          ...invocation.contract,
          sierra_program: await decompressProgram(invocation.contract.sierra_program),
        },
        compiled_class_hash: invocation.compiledClassHash || '',
        sender_address: invocation.senderAddress,
        ...details,
      };
      return btx;
    }
    if (invocation.type === api_exports.ETransactionType.DEPLOY_ACCOUNT) {
      const { account_deployment_data, ...restDetails } = details;
      const btx = {
        type: invocation.type,
        constructor_calldata: CallData.toHex(invocation.constructorCalldata || []),
        class_hash: toHex(invocation.classHash),
        contract_address_salt: toHex(invocation.addressSalt || 0),
        ...restDetails,
      };
      return btx;
    }
    throw Error('RPC buildTransaction received unknown TransactionType');
  }
};

// src/channel/rpc_0_10_3.ts
var rpc_0_10_3_exports = {};
__export(rpc_0_10_3_exports, {
  RpcChannel: () => RpcChannel3,
});
var RpcChannel3 = class extends RpcChannel2 {
  id = 'RPC0.10.3';
  channelSpecVersion = _SupportedRpcVersion.v0_10_3;
};

// src/utils/eventEmitter.ts
var EventEmitter = class {
  listeners = {};
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }
  off(event, listener) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
  }
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(data));
    }
  }
  clear() {
    this.listeners = {};
  }
};

// src/utils/connect/ws.ts
var ws_default =
  (typeof WebSocket !== 'undefined' && WebSocket) ||
  (typeof globalThis !== 'undefined' && globalThis.WebSocket) ||
  (typeof window !== 'undefined' && window.WebSocket && window.WebSocket.bind(window)) ||
  (typeof global !== 'undefined' && global.WebSocket) ||
  class {
    constructor() {
      throw new LibraryError(
        "WebSocket module not detected, use the 'websocket' constructor parameter to set a compatible connection"
      );
    }
  };

// src/channel/ws/subscription.ts
var Subscription = class {
  /**
   * The containing `WebSocketChannel` instance.
   * @internal
   */
  channel;
  /**
   * The JSON-RPC method used to create this subscription.
   * @internal
   */
  method;
  /**
   * The parameters used to create this subscription.
   * @internal
   */
  params;
  /**
   * The unique identifier for this subscription.
   * @internal
   */
  id;
  events = new EventEmitter();
  buffer = [];
  maxBufferSize;
  handler = null;
  _isClosed = false;
  /**
   * @internal
   * @param options - Subscription configuration options
   */
  constructor(options) {
    this.channel = options.channel;
    this.method = options.method;
    this.params = options.params ?? {};
    this.id = options.id;
    this.maxBufferSize = options.maxBufferSize;
  }
  /**
   * Indicates if the subscription has been closed.
   * @returns {boolean} `true` if unsubscribed, `false` otherwise.
   */
  get isClosed() {
    return this._isClosed;
  }
  /**
   * Internal method to handle incoming events from the WebSocket channel.
   * If a handler is attached, it's invoked immediately. Otherwise, the event is buffered.
   * @internal
   * @param {T} data - The event data.
   */
  _handleEvent(data) {
    if (this.handler) {
      this.handler(data);
    } else {
      if (this.buffer.length >= this.maxBufferSize) {
        const droppedEvent = this.buffer.shift();
        logger.warn(`Subscription ${this.id}: Buffer full. Dropping oldest event:`, droppedEvent);
      }
      this.buffer.push(data);
    }
  }
  /**
   * Attaches a handler function to be called for each event.
   *
   * When a handler is attached, any buffered events will be passed to it sequentially.
   * Subsequent events will be passed directly as they arrive.
   *
   * @param {(data: T) => void} handler - The function to call with event data.
   * @throws {Error} If a handler is already attached to this subscription.
   */
  on(handler) {
    if (this.handler) {
      throw new Error('A handler is already attached to this subscription.');
    }
    this.handler = handler;
    while (this.buffer.length > 0) {
      const event = this.buffer.shift();
      if (event) {
        this.handler(event);
      }
    }
  }
  /**
   * Sends an unsubscribe request to the node and cleans up local resources.
   * @returns {Promise<boolean>} A Promise that resolves to `true` if the unsubscription was successful.
   */
  async unsubscribe() {
    if (this._isClosed) {
      return true;
    }
    const success = await this.channel.unsubscribe(this.id);
    if (success) {
      this._isClosed = true;
      this.channel.removeSubscription(this.id);
      this.events.emit('unsubscribe', void 0);
      this.events.clear();
    }
    return success;
  }
};

// src/channel/ws/ws_0_10.ts
var WebSocketChannel = class {
  /**
   * The URL of the WebSocket RPC Node.
   * @example 'wss://starknet-sepolia.public.blastapi.io/rpc/v0_8'
   */
  nodeUrl;
  /**
   * The underlying WebSocket instance.
   */
  websocket;
  // Store the WebSocket implementation class to allow for custom implementations.
  WsImplementation;
  // Map of active subscriptions, keyed by their ID.
  activeSubscriptions = /* @__PURE__ */ new Map();
  maxBufferSize;
  autoReconnect;
  reconnectOptions;
  requestTimeout;
  isReconnecting = false;
  reconnectAttempts = 0;
  userInitiatedClose = false;
  reconnectTimeoutId = null;
  // Fires once a (re)connection has stayed open long enough to be considered stable,
  // resetting the reconnection attempt counter.
  reconnectStabilityTimeoutId = null;
  requestQueue = [];
  events = new EventEmitter();
  openListener = (ev) => {
    this.scheduleReconnectAttemptsReset();
    this.events.emit('open', ev);
  };
  closeListener = this.onCloseProxy.bind(this);
  messageListener = this.onMessageProxy.bind(this);
  errorListener = (ev) => this.events.emit('error', ev);
  /**
   * JSON RPC latest sent message ID.
   * The receiving message is expected to contain the same ID.
   */
  sendId = 0;
  /**
   * Creates an instance of WebSocketChannel.
   * @param {WebSocketOptions} options - The options for configuring the channel.
   */
  constructor(options) {
    this.nodeUrl = options.nodeUrl;
    this.maxBufferSize = options.maxBufferSize ?? 1e3;
    this.autoReconnect = options.autoReconnect ?? true;
    this.reconnectOptions = {
      retries: options.reconnectOptions?.retries ?? 5,
      delay: options.reconnectOptions?.delay ?? 2e3,
      exponential: options.reconnectOptions?.exponential ?? true,
      stableConnectionThreshold: options.reconnectOptions?.stableConnectionThreshold ?? 5e3,
    };
    this.requestTimeout = options.requestTimeout ?? 6e4;
    this.WsImplementation = options.websocket || config.get('websocket') || ws_default;
    this.websocket = new this.WsImplementation(this.nodeUrl);
    this.websocket.addEventListener('open', this.openListener);
    this.websocket.addEventListener('close', this.closeListener);
    this.websocket.addEventListener('message', this.messageListener);
    this.websocket.addEventListener('error', this.errorListener);
  }
  idResolver(id) {
    if (id) return id;
    return this.sendId++;
  }
  /**
   * Sends a JSON-RPC request over the WebSocket connection without waiting for a response.
   * This is a low-level method. Prefer `sendReceive` for most use cases.
   * @param {string} method - The RPC method name.
   * @param {object} [params] - The parameters for the RPC method.
   * @param {number} [id] - A specific request ID. If not provided, an auto-incrementing ID is used.
   * @returns {number} The ID of the sent request.
   * @throws {WebSocketNotConnectedError} If the WebSocket is not connected.
   */
  send(method, params, id) {
    if (!this.isConnected()) {
      throw new WebSocketNotConnectedError(
        'WebSocketChannel.send() failed due to socket being disconnected'
      );
    }
    const usedId = this.idResolver(id);
    const rpcRequestBody = {
      id: usedId,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    this.websocket.send(stringify2(rpcRequestBody));
    return usedId;
  }
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
  sendReceive(method, params) {
    if (
      this.isReconnecting ||
      (!this.isConnected() && this.autoReconnect && !this.userInitiatedClose)
    ) {
      logger.info(`WebSocket: Connection unavailable, queueing request: ${method}`);
      return new Promise((resolve, reject) => {
        this.requestQueue.push({ method, params, resolve, reject });
      });
    }
    const sendId = this.send(method, params);
    return new Promise((resolve, reject) => {
      let timeoutId;
      if (!this.websocket || this.websocket.readyState !== ws_default.OPEN) {
        reject(new WebSocketNotConnectedError('WebSocket not available or not connected.'));
        return;
      }
      const messageHandler = (event) => {
        if (!isString(event.data)) {
          logger.warn('WebSocket received non-string message data:', event.data);
          return;
        }
        const message = JSON.parse(event.data);
        if (message.id === sendId) {
          clearTimeout(timeoutId);
          this.websocket.removeEventListener('message', messageHandler);
          this.websocket.removeEventListener('error', errorHandler);
          if ('result' in message) {
            resolve(message.result);
          } else {
            reject(
              new Error(`Error on ${method} (id: ${sendId}): ${JSON.stringify(message.error)}`)
            );
          }
        }
      };
      const errorHandler = (event) => {
        clearTimeout(timeoutId);
        this.websocket.removeEventListener('message', messageHandler);
        this.websocket.removeEventListener('error', errorHandler);
        reject(
          new Error(
            `WebSocket error during ${method} (id: ${sendId}): ${event.type || 'Unknown error'}`
          )
        );
      };
      this.websocket.addEventListener('message', messageHandler);
      this.websocket.addEventListener('error', errorHandler);
      timeoutId = setTimeout(() => {
        this.websocket.removeEventListener('message', messageHandler);
        this.websocket.removeEventListener('error', errorHandler);
        reject(
          new TimeoutError(
            `Request ${method} (id: ${sendId}) timed out after ${this.requestTimeout}ms`
          )
        );
      }, this.requestTimeout);
    });
  }
  /**
   * Checks if the WebSocket connection is currently open.
   * @returns {boolean} `true` if the connection is open, `false` otherwise.
   */
  isConnected() {
    return this.websocket.readyState === ws_default.OPEN;
  }
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
  async waitForConnection() {
    if (this.websocket.readyState !== ws_default.OPEN) {
      return new Promise((resolve, reject) => {
        if (!this.websocket) return;
        this.websocket.onopen = () => resolve(this.websocket.readyState);
        this.websocket.onerror = (error) => {
          return reject(error);
        };
      });
    }
    return this.websocket.readyState;
  }
  /**
   * Closes the WebSocket connection.
   * This method is user-initiated and will prevent automatic reconnection for this closure.
   * @param {number} [code] - The WebSocket connection close code.
   * @param {string} [reason] - The WebSocket connection close reason.
   */
  disconnect(code, reason) {
    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
    if (this.reconnectStabilityTimeoutId) {
      clearTimeout(this.reconnectStabilityTimeoutId);
      this.reconnectStabilityTimeoutId = null;
    }
    this.userInitiatedClose = true;
    this.websocket.close(code, reason);
  }
  /**
   * Returns a Promise that resolves when the WebSocket connection is closed.
   * @returns {Promise<number | Event>} A Promise that resolves with the WebSocket's `readyState` or a `CloseEvent` when disconnected.
   */
  async waitForDisconnection() {
    if (this.websocket.readyState !== ws_default.CLOSED) {
      return new Promise((resolve, reject) => {
        if (!this.websocket) return;
        this.websocket.onclose = () => resolve(this.websocket.readyState);
        this.websocket.onerror = reject;
      });
    }
    return this.websocket.readyState;
  }
  /**
   * Unsubscribes from a Starknet subscription.
   * It is recommended to use the `unsubscribe()` method on the `Subscription` object instead.
   * @internal
   * @param {SUBSCRIPTION_ID} subscriptionId - The ID of the subscription to unsubscribe from.
   * @returns {Promise<boolean>} A Promise that resolves with `true` if the unsubscription was successful.
   */
  async unsubscribe(subscriptionId) {
    const status = await this.sendReceive('starknet_unsubscribe', {
      subscription_id: subscriptionId,
    });
    if (status) {
      this.events.emit('unsubscribe', subscriptionId);
    }
    return status;
  }
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
  waitForUnsubscription(targetId) {
    return new Promise((resolve) => {
      const listener = (unsubId) => {
        if (unsubId === targetId) {
          this.events.off('unsubscribe', listener);
          resolve();
        }
      };
      this.events.on('unsubscribe', listener);
    });
  }
  /**
   * Manually initiates a reconnection attempt.
   * This creates a new WebSocket instance and re-establishes listeners.
   */
  reconnect() {
    this.userInitiatedClose = false;
    this.websocket = new this.WsImplementation(this.nodeUrl);
    this.websocket.addEventListener('open', this.openListener);
    this.websocket.addEventListener('close', this.closeListener);
    this.websocket.addEventListener('message', this.messageListener);
    this.websocket.addEventListener('error', this.errorListener);
  }
  _processRequestQueue() {
    logger.info(`WebSocket: Processing ${this.requestQueue.length} queued requests.`);
    while (this.requestQueue.length > 0) {
      const { method, params, resolve, reject } = this.requestQueue.shift();
      this.sendReceive(method, params).then(resolve).catch(reject);
    }
  }
  async _restoreSubscriptions() {
    const oldSubscriptions = Array.from(this.activeSubscriptions.values());
    this.activeSubscriptions.clear();
    const restorePromises = oldSubscriptions.map(async (sub) => {
      try {
        const newSubId = await this.sendReceive(sub.method, sub.params);
        sub.id = newSubId;
        this.activeSubscriptions.set(newSubId, sub);
        logger.info(`Subscription ${sub.method} restored with new ID: ${newSubId}`);
      } catch (error) {
        logger.error(`Failed to restore subscription ${sub.method}:`, error);
      }
    });
    await Promise.all(restorePromises);
  }
  /**
   * Reset the reconnection attempt counter, but only once the current connection has
   * stayed open for `stableConnectionThreshold` ms. A connection that opens and then
   * immediately drops (a flapping gateway) never reaches this point, so its attempts
   * keep accumulating toward the retry cap instead of resetting every cycle.
   */
  scheduleReconnectAttemptsReset() {
    if (this.reconnectStabilityTimeoutId) {
      clearTimeout(this.reconnectStabilityTimeoutId);
    }
    this.reconnectStabilityTimeoutId = setTimeout(() => {
      this.reconnectAttempts = 0;
      this.reconnectStabilityTimeoutId = null;
    }, this.reconnectOptions.stableConnectionThreshold);
  }
  _startReconnect() {
    if (this.isReconnecting || !this.autoReconnect) {
      return;
    }
    if (this.reconnectStabilityTimeoutId) {
      clearTimeout(this.reconnectStabilityTimeoutId);
      this.reconnectStabilityTimeoutId = null;
    }
    this.isReconnecting = true;
    const tryReconnect = () => {
      if (this.reconnectAttempts >= this.reconnectOptions.retries) {
        logger.error('WebSocket: Maximum reconnection retries reached. Giving up.');
        this.isReconnecting = false;
        return;
      }
      this.reconnectAttempts += 1;
      logger.info(
        `WebSocket: Connection lost. Attempting to reconnect... (${this.reconnectAttempts}/${this.reconnectOptions.retries})`
      );
      this.reconnect();
      this.websocket.onopen = async () => {
        logger.info('WebSocket: Reconnection successful.');
        this.isReconnecting = false;
        await this._restoreSubscriptions();
        this._processRequestQueue();
        this.events.emit('open', new Event('open'));
      };
      this.websocket.onerror = () => {
        const delay = this.reconnectOptions.exponential
          ? this.reconnectOptions.delay * 2 ** (this.reconnectAttempts - 1)
          : this.reconnectOptions.delay;
        logger.info(`WebSocket: Reconnect attempt failed. Retrying in ${delay}ms.`);
        this.reconnectTimeoutId = setTimeout(tryReconnect, delay);
      };
    };
    tryReconnect();
  }
  onCloseProxy(ev) {
    this.websocket.removeEventListener('open', this.openListener);
    this.websocket.removeEventListener('close', this.closeListener);
    this.websocket.removeEventListener('message', this.messageListener);
    this.websocket.removeEventListener('error', this.errorListener);
    this.events.emit('close', ev);
    if (!this.userInitiatedClose) {
      this._startReconnect();
    }
  }
  onMessageProxy(event) {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch (error) {
      logger.error(
        `WebSocketChannel: Error parsing incoming message: ${event.data}, Error: ${error}`
      );
      return;
    }
    if (message.method && isObject(message.params) && 'subscription_id' in message.params) {
      const { result, subscription_id } = message.params;
      const subscription = this.activeSubscriptions.get(subscription_id);
      if (subscription) {
        subscription._handleEvent(result);
      } else {
        logger.warn(
          `WebSocketChannel: Received event for untracked subscription ID: ${subscription_id}.`
        );
      }
    }
    logger.debug('onMessageProxy:', event.data);
    this.events.emit('message', event);
  }
  /**
   * Subscribes to new block headers.
   * @param {SubscribeNewHeadsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<BLOCK_HEADER>>} A Promise that resolves with a `Subscription` object for new block headers.
   */
  async subscribeNewHeads(params = {}) {
    const method = 'starknet_subscribeNewHeads';
    const rpcParams = {
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : void 0,
    };
    const subId = await this.sendReceive(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }
  /**
   * Subscribes to events matching a given filter.
   * @param {SubscribeEventsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<EMITTED_EVENT>>} A Promise that resolves with a `Subscription` object for the specified events.
   */
  async subscribeEvents(params = {}) {
    const method = 'starknet_subscribeEvents';
    let from_address;
    if (params.fromAddress !== void 0) {
      from_address = Array.isArray(params.fromAddress)
        ? bigNumberishArrayToHexadecimalStringArray(params.fromAddress)
        : toHex(params.fromAddress);
    }
    const rpcParams = {
      from_address,
      keys: params.keys,
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : void 0,
      finality_status: params.finalityStatus,
    };
    const subId = await this.sendReceive(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }
  /**
   * Subscribes to status updates for a specific transaction.
   * @param {SubscribeTransactionStatusParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NEW_TXN_STATUS>>} A Promise that resolves with a `Subscription` object for the transaction's status.
   */
  async subscribeTransactionStatus(params) {
    const method = 'starknet_subscribeTransactionStatus';
    const rpcParams = {
      transaction_hash: toHex(params.transactionHash),
      block_id: params.blockIdentifier ? new Block(params.blockIdentifier).identifier : void 0,
    };
    const subId = await this.sendReceive(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }
  /**
   * Subscribes to new transaction receipts.
   * @param {SubscribeNewTransactionReceiptsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionReceiptsEvent['result']>>} A Promise that resolves with a `Subscription` object for new transaction receipts.
   */
  async subscribeNewTransactionReceipts(params = {}) {
    const method = 'starknet_subscribeNewTransactionReceipts';
    const rpcParams = {
      finality_status: params.finalityStatus,
      sender_address:
        params.senderAddress && bigNumberishArrayToHexadecimalStringArray(params.senderAddress),
    };
    const subId = await this.sendReceive(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }
  /**
   * Subscribes to new transactions.
   * @param {SubscribeNewTransactionsParams} params - The parameters for the subscription.
   * @returns {Promise<Subscription<NewTransactionEvent['result']>>} A Promise that resolves with a `Subscription` object for new transactions.
   */
  async subscribeNewTransactions(params = {}) {
    const method = 'starknet_subscribeNewTransactions';
    const rpcParams = {
      finality_status: params.finalityStatus,
      sender_address:
        params.senderAddress && bigNumberishArrayToHexadecimalStringArray(params.senderAddress),
      tags: params.tags,
    };
    const subId = await this.sendReceive(method, rpcParams);
    const subscription = new Subscription({
      channel: this,
      method,
      params: rpcParams,
      id: subId,
      maxBufferSize: this.maxBufferSize,
    });
    this.activeSubscriptions.set(subId, subscription);
    return subscription;
  }
  /**
   * Internal method to remove subscription from active map.
   * @internal
   */
  removeSubscription(id) {
    this.activeSubscriptions.delete(id);
  }
  /**
   * Adds a listener for a given event.
   * @param event The event name.
   * @param listener The listener function to add.
   */
  on(event, listener) {
    this.events.on(event, listener);
  }
  /**
   * Removes a listener for a given event.
   * @param event The event name.
   * @param listener The listener function to remove.
   */
  off(event, listener) {
    this.events.off(event, listener);
  }
};

// src/provider/modules/responseParser/interface.ts
var ResponseParser = class {};

// src/provider/modules/responseParser/rpc.ts
var RPCResponseParser = class {
  resourceBoundsOverhead;
  constructor(resourceBoundsOverhead) {
    this.resourceBoundsOverhead = resourceBoundsOverhead;
  }
  parseGetBlockResponse(res) {
    return res;
  }
  parseTransactionReceipt(res) {
    return res;
  }
  parseFeeEstimateBulkResponse(res) {
    return res.map((val) => ({
      resourceBounds: toOverheadResourceBounds(val, this.resourceBoundsOverhead),
      overall_fee: toOverheadOverallFee(val, this.resourceBoundsOverhead),
      unit: val.unit,
    }));
  }
  parseSimulateTransactionResponse(res) {
    const mapTransactions = (transactions) =>
      transactions.map((it) => ({
        transaction_trace: it.transaction_trace,
        resourceBounds: toOverheadResourceBounds(it.fee_estimation, this.resourceBoundsOverhead),
        overall_fee: toOverheadOverallFee(it.fee_estimation, this.resourceBoundsOverhead),
        unit: it.fee_estimation.unit,
      }));
    const isArray = Array.isArray(res);
    return {
      simulated_transactions: mapTransactions(isArray ? res : res.simulated_transactions),
      ...(!isArray && { initial_reads: res.initial_reads }),
    };
  }
  parseContractClassResponse(res) {
    return {
      ...res,
      abi: isString(res.abi) ? JSON.parse(res.abi) : res.abi,
    };
  }
  parseL1GasPriceResponse(res) {
    return res.l1_gas_price.price_in_wei;
  }
  parseStorageResponse(res) {
    if (typeof res === 'string') {
      return { value: res, last_update_block: 0 };
    }
    return res;
  }
};

// src/provider/modules/tip.ts
function isV3TransactionWithTip(tx) {
  return (
    tx.version === '0x3' &&
    'tip' in tx &&
    isString(tx.tip) &&
    (tx.type === 'INVOKE' || tx.type === 'DECLARE' || tx.type === 'DEPLOY_ACCOUNT')
  );
}
function isBatchingEnabled(provider) {
  const channel = provider.channel;
  return !!channel.batchClient;
}
function extractTipsFromBlock(blockData, includeZeroTips = true) {
  return blockData.transactions
    .filter(isV3TransactionWithTip)
    .map((tx) => BigInt(tx.tip))
    .filter((tip) => includeZeroTips || tip > 0n);
}
function createZeroTipEstimate(blocksAnalyzed, transactionsTipsFound) {
  return {
    minTip: 0n,
    maxTip: 0n,
    averageTip: 0n,
    medianTip: 0n,
    modeTip: 0n,
    recommendedTip: 0n,
    p90Tip: 0n,
    p95Tip: 0n,
    metrics: {
      blocksAnalyzed,
      transactionsTipsFound,
    },
  };
}
function calculatePercentile(sortedArray, percentile) {
  const index = (percentile / 100) * (sortedArray.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  if (lower === upper) {
    return sortedArray[lower];
  }
  const weight = index - lower;
  const lowerValue = sortedArray[lower];
  const upperValue = sortedArray[upper];
  const diff = upperValue - lowerValue;
  const weightedDiff = (diff * BigInt(Math.round(weight * 1e3))) / 1000n;
  return lowerValue + weightedDiff;
}
function calculateTipStats(tips) {
  assert(tips.length > 0, 'Cannot calculate statistics from empty tip array');
  const minTip = tips.reduce((min, tip) => (tip < min ? tip : min), RANGE_FELT.max);
  const maxTip = tips.reduce((max, tip) => (tip > max ? tip : max), 0n);
  const sumTip = tips.reduce((sum, tip) => sum + tip, 0n);
  const averageTip = sumTip / BigInt(tips.length);
  const sortedTips = [...tips].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  const midIndex = Math.floor(sortedTips.length / 2);
  let medianTip;
  if (sortedTips.length % 2 === 0) {
    medianTip = (sortedTips[midIndex - 1] + sortedTips[midIndex]) / 2n;
  } else {
    medianTip = sortedTips[midIndex];
  }
  const tipCounts = /* @__PURE__ */ new Map();
  tips.forEach((tip) => {
    tipCounts.set(tip, (tipCounts.get(tip) || 0) + 1);
  });
  const { modeTip } = Array.from(tipCounts.entries()).reduce(
    (acc, [tip, count]) => {
      if (count > acc.maxCount || (count === acc.maxCount && tip < acc.modeTip)) {
        return { maxCount: count, modeTip: tip };
      }
      return acc;
    },
    { maxCount: 0, modeTip: 0n }
  );
  const p90Tip = calculatePercentile(sortedTips, 90);
  const p95Tip = calculatePercentile(sortedTips, 95);
  const recommendedTip = medianTip;
  return { minTip, maxTip, averageTip, medianTip, modeTip, recommendedTip, p90Tip, p95Tip };
}
async function getStartingBlockNumber(provider, blockIdentifier) {
  try {
    const blockData = await provider.getBlockWithTxs(blockIdentifier);
    if (isNumber(blockData.block_number)) {
      return blockData.block_number;
    }
    const latestBlock = await provider.getBlockLatestAccepted();
    return latestBlock.block_number;
  } catch (error) {
    throw new LibraryError(
      `Failed to determine starting block number: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
async function fetchBlockSafely(provider, blockNumber) {
  try {
    return await provider.getBlockWithTxs(blockNumber);
  } catch (error) {
    logger.warn(`Failed to fetch block ${blockNumber}:`, error);
    return null;
  }
}
function generateBlockNumbers(startingBlockNumber, maxBlocks) {
  const oldestBlockNumber = Math.max(0, startingBlockNumber - maxBlocks + 1);
  const blockCount = startingBlockNumber - oldestBlockNumber + 1;
  return Array.from({ length: blockCount }, (_, index) => startingBlockNumber - index);
}
async function fetchBlocksInParallel(provider, blockNumbers) {
  const fetchPromises = blockNumbers.map(async (blockNumber) => {
    try {
      return await provider.getBlockWithTxs(blockNumber);
    } catch (error) {
      logger.warn(`Failed to fetch block ${blockNumber} in parallel:`, error);
      return null;
    }
  });
  return Promise.all(fetchPromises);
}
async function getTipStatsParallel(provider, blockIdentifier, options) {
  const { maxBlocks = 3, minTxsNecessary = 10, includeZeroTips = true } = options;
  try {
    const startingBlockNumber = await getStartingBlockNumber(provider, blockIdentifier);
    const blockNumbers = generateBlockNumbers(startingBlockNumber, maxBlocks);
    const blocks = await fetchBlocksInParallel(provider, blockNumbers);
    const allTips = blocks
      .filter((blockData) => blockData !== null)
      .flatMap((blockData) => extractTipsFromBlock(blockData, includeZeroTips));
    const analyzedBlocks = blocks.filter((b) => b !== null).length;
    if (allTips.length < minTxsNecessary) {
      logger.warn(
        `Insufficient transaction data: found ${allTips.length} V3 transactions with tips in ${analyzedBlocks} blocks (block range: ${Math.max(0, startingBlockNumber - maxBlocks + 1)}-${startingBlockNumber}). Required: ${minTxsNecessary} transactions. Consider reducing minTxsNecessary or increasing maxBlocks.`
      );
      return createZeroTipEstimate(analyzedBlocks, allTips);
    }
    const tipStats = calculateTipStats(allTips);
    return {
      ...tipStats,
      metrics: {
        blocksAnalyzed: analyzedBlocks,
        transactionsTipsFound: allTips,
      },
    };
  } catch (error) {
    throw new LibraryError(
      `Failed to analyze tip statistics (parallel): ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
async function getTipStatsSequential(provider, blockIdentifier, options) {
  const { maxBlocks = 3, minTxsNecessary = 10, includeZeroTips = true } = options;
  try {
    const startingBlockNumber = await getStartingBlockNumber(provider, blockIdentifier);
    const blockNumbers = generateBlockNumbers(startingBlockNumber, maxBlocks);
    const allTips = [];
    let blocksAnalyzed = 0;
    for (const blockNumber of blockNumbers) {
      const blockData = await fetchBlockSafely(provider, blockNumber);
      if (blockData) {
        blocksAnalyzed += 1;
        const tips = extractTipsFromBlock(blockData, includeZeroTips);
        allTips.push(...tips);
        if (allTips.length >= minTxsNecessary) {
          break;
        }
      }
    }
    if (allTips.length < minTxsNecessary) {
      logger.warn(
        `Insufficient transaction data: found ${allTips.length} V3 transactions with tips in ${blocksAnalyzed} blocks (block range: ${Math.max(0, startingBlockNumber - maxBlocks + 1)}-${startingBlockNumber}). Required: ${minTxsNecessary} transactions. Consider reducing minTxsNecessary or increasing maxBlocks.`
      );
      return createZeroTipEstimate(blocksAnalyzed, allTips);
    }
    const tipStats = calculateTipStats(allTips);
    return {
      ...tipStats,
      metrics: {
        blocksAnalyzed,
        transactionsTipsFound: allTips,
      },
    };
  } catch (error) {
    throw new LibraryError(
      `Failed to analyze tip statistics (sequential): ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
async function getTipStatsFromBlocks(provider, blockIdentifier = BlockTag.LATEST, options = {}) {
  const { maxBlocks = 3, minTxsNecessary = 10 } = options;
  assert(Number.isInteger(maxBlocks), 'maxBlocks parameter must be an integer');
  assert(maxBlocks >= 1, 'maxBlocks parameter must be greater than or equal to 1');
  assert(maxBlocks <= 100, 'maxBlocks parameter must be less than or equal to 100 for performance');
  assert(Number.isInteger(minTxsNecessary), 'minTxsNecessary parameter must be an integer');
  assert(minTxsNecessary >= 1, 'minTxsNecessary parameter must be greater than or equal to 1');
  if (isBatchingEnabled(provider)) {
    return getTipStatsParallel(provider, blockIdentifier, options);
  }
  return getTipStatsSequential(provider, blockIdentifier, options);
}

// src/utils/transactionReceipt/transactionReceipt.ts
var ReceiptTx = class _ReceiptTx {
  statusReceipt;
  value;
  constructor(receipt) {
    Object.assign(this, receipt);
    const [statusReceipt, value] = _ReceiptTx.isSuccess(receipt)
      ? ['SUCCEEDED', receipt]
      : _ReceiptTx.isReverted(receipt)
        ? ['REVERTED', receipt]
        : ['ERROR', new Error('Unknown response type')];
    Object.defineProperties(this, {
      statusReceipt: {
        value: statusReceipt,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      value: {
        value,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      match: {
        value(callbacks) {
          return statusReceipt in callbacks ? callbacks[statusReceipt](value) : callbacks._();
        },
        writable: false,
        enumerable: false,
        configurable: false,
      },
      isSuccess: {
        value: () => statusReceipt === 'SUCCEEDED',
        writable: false,
        enumerable: false,
        configurable: false,
      },
      isReverted: {
        value: () => statusReceipt === 'REVERTED',
        writable: false,
        enumerable: false,
        configurable: false,
      },
      isError: {
        value: () => statusReceipt === 'ERROR',
        writable: false,
        enumerable: false,
        configurable: false,
      },
    });
  }
  match;
  isSuccess;
  isReverted;
  isError;
  static isSuccess(transactionReceipt) {
    return transactionReceipt.execution_status === TransactionExecutionStatus.SUCCEEDED;
  }
  static isReverted(transactionReceipt) {
    return transactionReceipt.execution_status === TransactionExecutionStatus.REVERTED;
  }
};
var RECEIPT_CONFIG = {
  [TransactionExecutionStatus.SUCCEEDED]: {
    statusReceipt: 'SUCCEEDED',
    getBaseData: (receipt) => receipt,
    getValue: (receipt) => receipt,
  },
  [TransactionExecutionStatus.REVERTED]: {
    statusReceipt: 'REVERTED',
    getBaseData: (receipt) => receipt,
    getValue: (receipt) => receipt,
  },
};
function createTransactionReceipt(receipt) {
  const config2 = RECEIPT_CONFIG[receipt.execution_status];
  let obj;
  if (config2) {
    const { statusReceipt, getBaseData, getValue } = config2;
    const value = getValue(receipt);
    obj = {
      ...getBaseData(receipt),
      statusReceipt,
      value,
      match(callbacks) {
        return statusReceipt in callbacks ? callbacks[statusReceipt](value) : callbacks._();
      },
      // @ts-ignore - docs
      isSuccess() {
        return statusReceipt === 'SUCCEEDED';
      },
      // @ts-ignore - docs
      isReverted() {
        return statusReceipt === 'REVERTED';
      },
      // @ts-ignore - docs
      isError() {
        return false;
      },
    };
  } else {
    const errorValue = new Error('Unknown response type');
    obj = {
      statusReceipt: 'ERROR',
      value: errorValue,
      match(callbacks) {
        return 'ERROR' in callbacks ? callbacks.ERROR(errorValue) : callbacks._();
      },
      // @ts-ignore - docs
      isSuccess() {
        return false;
      },
      // @ts-ignore - docs
      isReverted() {
        return false;
      },
      // @ts-ignore - docs
      isError() {
        return true;
      },
    };
  }
  Object.setPrototypeOf(obj, ReceiptTx.prototype);
  Object.defineProperty(obj, 'constructor', {
    value: ReceiptTx,
    writable: false,
    enumerable: false,
    configurable: false,
  });
  return obj;
}

// src/utils/typedData.ts
var typedData_exports = {};
__export(typedData_exports, {
  encodeData: () => encodeData,
  encodeType: () => encodeType,
  encodeValue: () => encodeValue,
  getDependencies: () => getDependencies,
  getMessageHash: () => getMessageHash,
  getStructHash: () => getStructHash,
  getTypeHash: () => getTypeHash,
  isMerkleTreeType: () => isMerkleTreeType,
  prepareSelector: () => prepareSelector,
  validateTypedData: () => validateTypedData,
  verifyMessage: () => verifyMessage,
});

// src/utils/merkle.ts
var merkle_exports = {};
__export(merkle_exports, {
  MerkleTree: () => MerkleTree,
  proofMerklePath: () => proofMerklePath,
});
var MerkleTree = class _MerkleTree {
  leaves;
  branches = [];
  root;
  hashMethod;
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
  constructor(leafHashes, hashMethod = computePedersenHash) {
    this.hashMethod = hashMethod;
    this.leaves = leafHashes;
    this.root = this.build(leafHashes);
  }
  /** @ignore */
  build(leaves) {
    if (leaves.length === 1) {
      return leaves[0];
    }
    if (leaves.length !== this.leaves.length) {
      this.branches.push(leaves);
    }
    const newLeaves = [];
    for (let i = 0; i < leaves.length; i += 2) {
      if (i + 1 === leaves.length) {
        newLeaves.push(_MerkleTree.hash(leaves[i], '0x0', this.hashMethod));
      } else {
        newLeaves.push(_MerkleTree.hash(leaves[i], leaves[i + 1], this.hashMethod));
      }
    }
    return this.build(newLeaves);
  }
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
  static hash(a, b, hashMethod = computePedersenHash) {
    const [aSorted, bSorted] = [BigInt(a), BigInt(b)].sort((x, y) => (x >= y ? 1 : -1));
    return hashMethod(aSorted, bSorted);
  }
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
  getProof(leaf, branch = this.leaves, hashPath = []) {
    const index = branch.indexOf(leaf);
    if (index === -1) {
      throw new Error('leaf not found');
    }
    if (branch.length === 1) {
      return hashPath;
    }
    const isLeft = index % 2 === 0;
    const neededBranch = (isLeft ? branch[index + 1] : branch[index - 1]) ?? '0x0';
    const newHashPath = [...hashPath, neededBranch];
    const currentBranchLevelIndex =
      this.leaves.length === branch.length
        ? -1
        : this.branches.findIndex((b) => b.length === branch.length);
    const nextBranch = this.branches[currentBranchLevelIndex + 1] ?? [this.root];
    return this.getProof(
      _MerkleTree.hash(isLeft ? leaf : neededBranch, isLeft ? neededBranch : leaf, this.hashMethod),
      nextBranch,
      newHashPath
    );
  }
};
function proofMerklePath(root, leaf, path, hashMethod = computePedersenHash) {
  if (path.length === 0) {
    return root === leaf;
  }
  const [next, ...rest] = path;
  return proofMerklePath(root, MerkleTree.hash(leaf, next, hashMethod), rest, hashMethod);
}

// src/utils/typedData.ts
var presetTypes = {
  u256: JSON.parse('[{ "name": "low", "type": "u128" }, { "name": "high", "type": "u128" }]'),
  TokenAmount: JSON.parse(
    '[{ "name": "token_address", "type": "ContractAddress" }, { "name": "amount", "type": "u256" }]'
  ),
  NftId: JSON.parse(
    '[{ "name": "collection_address", "type": "ContractAddress" }, { "name": "token_id", "type": "u256" }]'
  ),
};
var revisionConfiguration = {
  [api_exports.TypedDataRevision.ACTIVE]: {
    domain: 'StarknetDomain',
    hashMethod: computePoseidonHashOnElements,
    hashMerkleMethod: computePoseidonHash,
    escapeTypeString: (s) => `"${s}"`,
    presetTypes,
  },
  [api_exports.TypedDataRevision.LEGACY]: {
    domain: 'StarkNetDomain',
    hashMethod: computePedersenHashOnElements,
    hashMerkleMethod: computePedersenHash,
    escapeTypeString: (s) => s,
    presetTypes: {},
  },
};
function assertRange(data, type, { min, max }) {
  const value = BigInt(data);
  assert(value >= min && value <= max, `${value} (${type}) is out of bounds [${min}, ${max}]`);
}
function identifyRevision({ types, domain }) {
  if (
    revisionConfiguration[api_exports.TypedDataRevision.ACTIVE].domain in types &&
    domain.revision?.toString() === api_exports.TypedDataRevision.ACTIVE
  )
    return api_exports.TypedDataRevision.ACTIVE;
  if (
    revisionConfiguration[api_exports.TypedDataRevision.LEGACY].domain in types &&
    (domain.revision ?? api_exports.TypedDataRevision.LEGACY) ===
      api_exports.TypedDataRevision.LEGACY
  )
    return api_exports.TypedDataRevision.LEGACY;
  return void 0;
}
function getHex(value) {
  try {
    return toHex(value);
  } catch (e) {
    if (isString(value)) {
      return toHex(encodeShortString(value));
    }
    throw new Error(`Invalid BigNumberish: ${value}`);
  }
}
function validateTypedData(data) {
  const typedData = data;
  return Boolean(
    typedData.message && typedData.primaryType && typedData.types && identifyRevision(typedData)
  );
}
function prepareSelector(selector) {
  return isHex(selector) ? selector : getSelectorFromName(selector);
}
function isMerkleTreeType(type) {
  return type.type === 'merkletree';
}
function getDependencies(
  types,
  type,
  dependencies = [],
  contains = '',
  revision = api_exports.TypedDataRevision.LEGACY
) {
  let dependencyTypes = [type];
  if (type[type.length - 1] === '*') {
    dependencyTypes = [type.slice(0, -1)];
  } else if (revision === api_exports.TypedDataRevision.ACTIVE) {
    if (type === 'enum') {
      dependencyTypes = [contains];
    } else if (type.match(/^\(.*\)$/)) {
      dependencyTypes = type
        .slice(1, -1)
        .split(',')
        .map((depType) => (depType[depType.length - 1] === '*' ? depType.slice(0, -1) : depType));
    }
  }
  return dependencyTypes
    .filter((t) => !dependencies.includes(t) && types[t])
    .reduce(
      // This comment prevents prettier from rolling everything here into a single line.
      (p, depType) => [
        ...p,
        ...[
          depType,
          ...types[depType].reduce(
            (previous, t) => [
              ...previous,
              ...getDependencies(types, t.type, previous, t.contains, revision).filter(
                (dependency) => !previous.includes(dependency)
              ),
            ],
            []
          ),
        ].filter((dependency) => !p.includes(dependency)),
      ],
      []
    );
}
function getMerkleTreeType(types, ctx) {
  if (ctx.parent && ctx.key) {
    const parentType = types[ctx.parent];
    const merkleType = parentType.find((t) => t.name === ctx.key);
    const isMerkleTree = isMerkleTreeType(merkleType);
    if (!isMerkleTree) {
      throw new Error(`${ctx.key} is not a merkle tree`);
    }
    if (merkleType.contains.endsWith('*')) {
      throw new Error(`Merkle tree contain property must not be an array but was given ${ctx.key}`);
    }
    return merkleType.contains;
  }
  return 'raw';
}
function encodeType(types, type, revision = api_exports.TypedDataRevision.LEGACY) {
  const allTypes =
    revision === api_exports.TypedDataRevision.ACTIVE
      ? { ...types, ...revisionConfiguration[revision].presetTypes }
      : types;
  const [primary, ...dependencies] = getDependencies(allTypes, type, void 0, void 0, revision);
  const newTypes = !primary ? [] : [primary, ...dependencies.sort()];
  const esc = revisionConfiguration[revision].escapeTypeString;
  return newTypes
    .map((dependency) => {
      const dependencyElements = allTypes[dependency].map((t) => {
        const targetType =
          t.type === 'enum' && revision === api_exports.TypedDataRevision.ACTIVE
            ? t.contains
            : t.type;
        const typeString = targetType.match(/^\(.*\)$/)
          ? `(${targetType
              .slice(1, -1)
              .split(',')
              .map((e) => (e ? esc(e) : e))
              .join(',')})`
          : esc(targetType);
        return `${esc(t.name)}:${typeString}`;
      });
      return `${esc(dependency)}(${dependencyElements})`;
    })
    .join('');
}
function getTypeHash(types, type, revision = api_exports.TypedDataRevision.LEGACY) {
  return getSelectorFromName(encodeType(types, type, revision));
}
function encodeValue(types, type, data, ctx = {}, revision = api_exports.TypedDataRevision.LEGACY) {
  if (types[type]) {
    return [type, getStructHash(types, type, data, revision)];
  }
  if (revisionConfiguration[revision].presetTypes[type]) {
    return [type, getStructHash(revisionConfiguration[revision].presetTypes, type, data, revision)];
  }
  if (type.endsWith('*')) {
    const hashes = data.map(
      (entry) => encodeValue(types, type.slice(0, -1), entry, void 0, revision)[1]
    );
    return [type, revisionConfiguration[revision].hashMethod(hashes)];
  }
  switch (type) {
    case 'enum': {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        const [variantKey, variantData] = Object.entries(data)[0];
        const parentType = types[ctx.parent].find((t) => t.name === ctx.key);
        const enumType = types[parentType.contains];
        const variantType = enumType.find((t) => t.name === variantKey);
        const variantIndex = enumType.indexOf(variantType);
        const encodedSubtypes = variantType.type
          .slice(1, -1)
          .split(',')
          .map((subtype, index) => {
            if (!subtype) return subtype;
            const subtypeData = variantData[index];
            return encodeValue(types, subtype, subtypeData, void 0, revision)[1];
          });
        return [
          type,
          revisionConfiguration[revision].hashMethod([variantIndex, ...encodedSubtypes]),
        ];
      }
      return [type, getHex(data)];
    }
    case 'merkletree': {
      const merkleTreeType = getMerkleTreeType(types, ctx);
      const structHashes = data.map((struct) => {
        return encodeValue(types, merkleTreeType, struct, void 0, revision)[1];
      });
      const { root } = new MerkleTree(
        structHashes,
        revisionConfiguration[revision].hashMerkleMethod
      );
      return ['felt', root];
    }
    case 'selector': {
      return ['felt', prepareSelector(data)];
    }
    case 'string': {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        const byteArray = byteArrayFromString(data);
        const elements = [
          byteArray.data.length,
          ...byteArray.data,
          byteArray.pending_word,
          byteArray.pending_word_len,
        ];
        return [type, revisionConfiguration[revision].hashMethod(elements)];
      }
      return [type, getHex(data)];
    }
    case 'i128': {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        const value = BigInt(data);
        assertRange(value, type, RANGE_I128);
        return [type, getHex(value < 0n ? PRIME + value : value)];
      }
      return [type, getHex(data)];
    }
    case 'timestamp':
    case 'u128': {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        assertRange(data, type, RANGE_U128);
      }
      return [type, getHex(data)];
    }
    case 'felt':
    case 'shortstring': {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        assertRange(getHex(data), type, RANGE_FELT);
      }
      return [type, getHex(data)];
    }
    case 'ClassHash':
    case 'ContractAddress': {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        assertRange(data, type, RANGE_FELT);
      }
      return [type, getHex(data)];
    }
    case 'bool': {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        assert(isBoolean(data), `Type mismatch for ${type} ${data}`);
      }
      return [type, getHex(data)];
    }
    default: {
      if (revision === api_exports.TypedDataRevision.ACTIVE) {
        throw new Error(`Unsupported type: ${type}`);
      }
      return [type, getHex(data)];
    }
  }
}
function encodeData(types, type, data, revision = api_exports.TypedDataRevision.LEGACY) {
  const targetType = types[type] ?? revisionConfiguration[revision].presetTypes[type];
  const [returnTypes, values] = targetType.reduce(
    ([ts, vs], field) => {
      if (data[field.name] === void 0 || (data[field.name] === null && field.type !== 'enum')) {
        throw new Error(`Cannot encode data: missing data for '${field.name}'`);
      }
      const value = data[field.name];
      const ctx = { parent: type, key: field.name };
      const [t, encodedValue] = encodeValue(types, field.type, value, ctx, revision);
      return [
        [...ts, t],
        [...vs, encodedValue],
      ];
    },
    [['felt'], [getTypeHash(types, type, revision)]]
  );
  return [returnTypes, values];
}
function getStructHash(types, type, data, revision = api_exports.TypedDataRevision.LEGACY) {
  return revisionConfiguration[revision].hashMethod(encodeData(types, type, data, revision)[1]);
}
function getMessageHash(typedData, accountAddress) {
  if (!validateTypedData(typedData)) {
    throw new Error('Typed data does not match JSON schema');
  }
  const revision = identifyRevision(typedData);
  const { domain, hashMethod } = revisionConfiguration[revision];
  const message = [
    encodeShortString('StarkNet Message'),
    getStructHash(typedData.types, domain, typedData.domain, revision),
    accountAddress,
    getStructHash(typedData.types, typedData.primaryType, typedData.message, revision),
  ];
  return hashMethod(message);
}
function verifyMessage(message, signature, fullPublicKey, accountAddress) {
  const isTypedData = validateTypedData(message);
  if (!isBigNumberish(message) && !isTypedData) {
    throw new Error('message has a wrong format.');
  }
  if (isTypedData && accountAddress === void 0) {
    throw new Error(
      'When providing a TypedData in message parameter, the accountAddress parameter has to be provided.'
    );
  }
  if (isTypedData && !isBigNumberish(accountAddress)) {
    throw new Error('accountAddress shall be a BigNumberish');
  }
  const messageHash = isTypedData ? getMessageHash(message, accountAddress) : toHex(message);
  const sign = Array.isArray(signature)
    ? new starkCurve.Signature(BigInt(signature[0]), BigInt(signature[1]))
    : signature;
  const fullPubKey = toHex(fullPublicKey);
  const isValid = starkCurve.verify(sign, messageHash, fullPubKey);
  return isValid;
}

// src/provider/modules/verifyMessageInStarknet.ts
async function verifyMessageInStarknet(
  provider,
  message,
  signature,
  accountAddress,
  signatureVerificationFunctionName,
  signatureVerificationResponse
) {
  const isTypedData = validateTypedData(message);
  if (!isBigNumberish(message) && !isTypedData) {
    throw new Error('message has a wrong format.');
  }
  if (!isBigNumberish(accountAddress)) {
    throw new Error('accountAddress shall be a BigNumberish');
  }
  const messageHash = isTypedData ? getMessageHash(message, accountAddress) : toHex(message);
  const knownSigVerificationFName = signatureVerificationFunctionName
    ? [signatureVerificationFunctionName]
    : ['isValidSignature', 'is_valid_signature'];
  const knownSignatureResponse = signatureVerificationResponse || {
    okResponse: [
      // any non-nok response is true
    ],
    nokResponse: [
      '0x0',
      // Devnet
      '0x00',
      // OpenZeppelin 0.7.0 to 0.9.0 invalid signature
    ],
    error: [
      'argent/invalid-signature',
      '0x617267656e742f696e76616c69642d7369676e6174757265',
      // ArgentX 0.3.0 to 0.3.1
      'is invalid, with respect to the public key',
      '0x697320696e76616c6964',
      // OpenZeppelin until 0.6.1, Braavos 0.0.11
      'INVALID_SIG',
      '0x494e56414c49445f534947',
      // Braavos 1.0.0
    ],
  };
  let error;
  for (const SigVerificationFName of knownSigVerificationFName) {
    try {
      const resp = await provider.callContract({
        contractAddress: toHex(accountAddress),
        entrypoint: SigVerificationFName,
        calldata: CallData.compile({
          hash: toBigInt(messageHash).toString(),
          signature: formatSignature(signature),
        }),
      });
      if (knownSignatureResponse.nokResponse.includes(resp[0].toString())) {
        return false;
      }
      if (
        knownSignatureResponse.okResponse.length === 0 ||
        knownSignatureResponse.okResponse.includes(resp[0].toString())
      ) {
        return true;
      }
      throw Error('signatureVerificationResponse Error: response is not part of known responses');
    } catch (err) {
      if (knownSignatureResponse.error.some((errMessage) => err.message.includes(errMessage))) {
        return false;
      }
      error = err;
    }
  }
  throw Error(`Signature verification Error: ${error}`);
}

// src/provider/modules/getGasPrices.ts
async function getGasPrices(channel, blockIdentifier = channel.blockIdentifier) {
  const bl = await channel.getBlockWithTxHashes(blockIdentifier);
  return {
    l1DataGasPrice: BigInt(bl.l1_data_gas_price.price_in_fri),
    l1GasPrice: BigInt(bl.l1_gas_price.price_in_fri),
    l2GasPrice: BigInt(bl.l2_gas_price.price_in_fri),
  };
}

// src/plugins/manager.ts
var PluginManager = class {
  registeredPlugins = /* @__PURE__ */ new Map();
  providerHooksList = [];
  accountHooksList = [];
  get plugins() {
    return this.registeredPlugins;
  }
  /**
   * Install a plugin on a Provider instance.
   * Calls `plugin.extend()` and assigns returned methods to the target.
   * Registers provider-level hooks.
   */
  installOnProvider(plugin, target) {
    if (this.registeredPlugins.has(plugin.name)) {
      return;
    }
    this.registeredPlugins.set(plugin.name, plugin);
    if (plugin.extend) {
      const methods = plugin.extend(target);
      if (methods) {
        Object.assign(target, methods);
      }
    }
    if (plugin.hooks) {
      this.providerHooksList.push(plugin.hooks);
    }
  }
  /**
   * Install a plugin on an Account instance.
   * Calls `plugin.accountExtend()` if available, otherwise falls back to `plugin.extend()`.
   * Registers both provider-level and account-level hooks.
   */
  installOnAccount(plugin, target) {
    if (this.registeredPlugins.has(plugin.name)) {
      return;
    }
    this.registeredPlugins.set(plugin.name, plugin);
    const extendFn = plugin.accountExtend ?? plugin.extend;
    if (extendFn) {
      const methods = extendFn(target);
      if (methods) {
        Object.assign(target, methods);
      }
    }
    if (plugin.hooks) {
      this.providerHooksList.push(plugin.hooks);
    }
    if (plugin.accountHooks) {
      this.accountHooksList.push(plugin.accountHooks);
    }
  }
  /**
   * Run a provider-level hook across all registered plugins.
   * Hooks are chained: each hook can modify the context for the next.
   */
  runProviderHook(hookName, context) {
    let current = context;
    this.providerHooksList.forEach((hooks) => {
      const hookFn = hooks[hookName];
      if (hookFn) {
        const result = hookFn(current);
        if (result !== void 0 && result !== null) {
          current = result;
        }
      }
    });
    return current;
  }
  /**
   * Run an account-level hook across all registered plugins.
   * "before" hooks are chained; "after" hooks are fire-and-forget.
   */
  runAccountHook(hookName, context) {
    let current = context;
    this.accountHooksList.forEach((hooks) => {
      const hookFn = hooks[hookName];
      if (hookFn) {
        const result = hookFn(current);
        if (result !== void 0 && result !== null) {
          current = result;
        }
      }
    });
    return current;
  }
  hasPlugin(name) {
    return this.registeredPlugins.has(name);
  }
};

// src/utils/starknetId.ts
var starknetId_exports = {};
__export(starknetId_exports, {
  StarknetIdContract: () => StarknetIdContract,
  StarknetIdIdentityContract: () => StarknetIdIdentityContract,
  StarknetIdMulticallContract: () => StarknetIdMulticallContract,
  StarknetIdPfpContract: () => StarknetIdPfpContract,
  StarknetIdPopContract: () => StarknetIdPopContract,
  StarknetIdVerifierContract: () => StarknetIdVerifierContract,
  dynamicCallData: () => dynamicCallData,
  dynamicFelt: () => dynamicFelt,
  execution: () => execution,
  getStarknetIdContract: () => getStarknetIdContract,
  getStarknetIdIdentityContract: () => getStarknetIdIdentityContract,
  getStarknetIdMulticallContract: () => getStarknetIdMulticallContract,
  getStarknetIdPfpContract: () => getStarknetIdPfpContract,
  getStarknetIdPopContract: () => getStarknetIdPopContract,
  getStarknetIdVerifierContract: () => getStarknetIdVerifierContract,
  isStarkDomain: () => isStarkDomain,
  useDecoded: () => useDecoded,
  useEncoded: () => useEncoded,
});
var basicAlphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-';
var basicSizePlusOne = BigInt(basicAlphabet.length + 1);
var bigAlphabet = '\u8FD9\u6765';
var basicAlphabetSize = BigInt(basicAlphabet.length);
var bigAlphabetSize = BigInt(bigAlphabet.length);
var bigAlphabetSizePlusOne = BigInt(bigAlphabet.length + 1);
function extractStars(str) {
  let k = 0;
  while (str.endsWith(bigAlphabet[bigAlphabet.length - 1])) {
    str = str.substring(0, str.length - 1);
    k += 1;
  }
  return [str, k];
}
function useDecoded(encoded) {
  let decoded = '';
  encoded.forEach((subdomain) => {
    while (subdomain !== ZERO) {
      const code = subdomain % basicSizePlusOne;
      subdomain /= basicSizePlusOne;
      if (code === BigInt(basicAlphabet.length)) {
        const nextSubdomain = subdomain / bigAlphabetSizePlusOne;
        if (nextSubdomain === ZERO) {
          const code2 = subdomain % bigAlphabetSizePlusOne;
          subdomain = nextSubdomain;
          if (code2 === ZERO) decoded += basicAlphabet[0];
          else decoded += bigAlphabet[Number(code2) - 1];
        } else {
          const code2 = subdomain % bigAlphabetSize;
          decoded += bigAlphabet[Number(code2)];
          subdomain /= bigAlphabetSize;
        }
      } else decoded += basicAlphabet[Number(code)];
    }
    const [str, k] = extractStars(decoded);
    if (k)
      decoded =
        str +
        (k % 2 === 0
          ? bigAlphabet[bigAlphabet.length - 1].repeat(k / 2 - 1) +
            bigAlphabet[0] +
            basicAlphabet[1]
          : bigAlphabet[bigAlphabet.length - 1].repeat((k - 1) / 2 + 1));
    decoded += '.';
  });
  if (!decoded) {
    return decoded;
  }
  return decoded.concat('stark');
}
function useEncoded(decoded) {
  let encoded = BigInt(0);
  let multiplier = BigInt(1);
  if (decoded.endsWith(bigAlphabet[0] + basicAlphabet[1])) {
    const [str, k] = extractStars(decoded.substring(0, decoded.length - 2));
    decoded = str + bigAlphabet[bigAlphabet.length - 1].repeat(2 * (k + 1));
  } else {
    const [str, k] = extractStars(decoded);
    if (k) decoded = str + bigAlphabet[bigAlphabet.length - 1].repeat(1 + 2 * (k - 1));
  }
  for (let i = 0; i < decoded.length; i += 1) {
    const char = decoded[i];
    const index = basicAlphabet.indexOf(char);
    const bnIndex = BigInt(basicAlphabet.indexOf(char));
    if (index !== -1) {
      if (i === decoded.length - 1 && decoded[i] === basicAlphabet[0]) {
        encoded += multiplier * basicAlphabetSize;
        multiplier *= basicSizePlusOne;
        multiplier *= basicSizePlusOne;
      } else {
        encoded += multiplier * bnIndex;
        multiplier *= basicSizePlusOne;
      }
    } else if (bigAlphabet.indexOf(char) !== -1) {
      encoded += multiplier * basicAlphabetSize;
      multiplier *= basicSizePlusOne;
      const newid = (i === decoded.length - 1 ? 1 : 0) + bigAlphabet.indexOf(char);
      encoded += multiplier * BigInt(newid);
      multiplier *= bigAlphabetSize;
    }
  }
  return encoded;
}
var StarknetIdContract = {
  MAINNET: '0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678',
  TESTNET_SEPOLIA: '0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474',
};
function getStarknetIdContract(chainId) {
  switch (chainId) {
    case _StarknetChainId.SN_MAIN:
      return StarknetIdContract.MAINNET;
    case _StarknetChainId.SN_SEPOLIA:
      return StarknetIdContract.TESTNET_SEPOLIA;
    default:
      throw new Error('Starknet.id is not yet deployed on this network');
  }
}
var StarknetIdIdentityContract = {
  MAINNET: '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af',
  TESTNET_SEPOLIA: '0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda',
};
function getStarknetIdIdentityContract(chainId) {
  switch (chainId) {
    case _StarknetChainId.SN_MAIN:
      return StarknetIdIdentityContract.MAINNET;
    case _StarknetChainId.SN_SEPOLIA:
      return StarknetIdIdentityContract.TESTNET_SEPOLIA;
    default:
      throw new Error('Starknet.id verifier contract is not yet deployed on this network');
  }
}
var StarknetIdMulticallContract =
  '0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970';
function getStarknetIdMulticallContract(chainId) {
  switch (chainId) {
    case _StarknetChainId.SN_MAIN:
      return StarknetIdMulticallContract;
    case _StarknetChainId.SN_SEPOLIA:
      return StarknetIdMulticallContract;
    default:
      throw new Error('Starknet.id multicall contract is not yet deployed on this network');
  }
}
var StarknetIdVerifierContract = {
  MAINNET: '0x07d14dfd8ee95b41fce179170d88ba1f0d5a512e13aeb232f19cfeec0a88f8bf',
  TESTNET_SEPOLIA: '0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566',
};
function getStarknetIdVerifierContract(chainId) {
  switch (chainId) {
    case _StarknetChainId.SN_MAIN:
      return StarknetIdVerifierContract.MAINNET;
    case _StarknetChainId.SN_SEPOLIA:
      return StarknetIdVerifierContract.TESTNET_SEPOLIA;
    default:
      throw new Error('Starknet.id verifier contract is not yet deployed on this network');
  }
}
var StarknetIdPfpContract = {
  MAINNET: '0x070aaa20ec4a46da57c932d9fd89ca5e6bb9ca3188d3df361a32306aff7d59c7',
  TESTNET_SEPOLIA: '0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02',
};
function getStarknetIdPfpContract(chainId) {
  switch (chainId) {
    case _StarknetChainId.SN_MAIN:
      return StarknetIdPfpContract.MAINNET;
    case _StarknetChainId.SN_SEPOLIA:
      return StarknetIdPfpContract.TESTNET_SEPOLIA;
    default:
      throw new Error(
        'Starknet.id profile picture verifier contract is not yet deployed on this network'
      );
  }
}
var StarknetIdPopContract = {
  MAINNET: '0x0293eb2ba9862f762bd3036586d5755a782bd22e6f5028320f1d0405fd47bff4',
  TESTNET_SEPOLIA: '0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a',
};
function getStarknetIdPopContract(chainId) {
  switch (chainId) {
    case _StarknetChainId.SN_MAIN:
      return StarknetIdPopContract.MAINNET;
    case _StarknetChainId.SN_SEPOLIA:
      return StarknetIdPopContract.TESTNET_SEPOLIA;
    default:
      throw new Error(
        'Starknet.id proof of personhood verifier contract is not yet deployed on this network'
      );
  }
}
function execution(staticEx, ifEqual = void 0, ifNotEqual = void 0) {
  return new CairoCustomEnum({
    Static: staticEx,
    IfEqual: ifEqual ? tuple(ifEqual[0], ifEqual[1], ifEqual[2]) : void 0,
    IfNotEqual: ifNotEqual ? tuple(ifNotEqual[0], ifNotEqual[1], ifNotEqual[2]) : void 0,
  });
}
function dynamicFelt(hardcoded, reference = void 0) {
  return new CairoCustomEnum({
    Hardcoded: hardcoded,
    Reference: reference ? tuple(reference[0], reference[1]) : void 0,
  });
}
function dynamicCallData(hardcoded, reference = void 0, arrayReference = void 0) {
  return new CairoCustomEnum({
    Hardcoded: hardcoded,
    Reference: reference ? tuple(reference[0], reference[1]) : void 0,
    ArrayReference: arrayReference ? tuple(arrayReference[0], arrayReference[1]) : void 0,
  });
}
function isStarkDomain(domain) {
  const starkSuffix = '.stark';
  if (!domain.endsWith(starkSuffix)) {
    return false;
  }
  const name = domain.slice(0, -starkSuffix.length);
  if (name.length === 0) {
    return false;
  }
  return name.split('.').every((label) => {
    return (
      label.length > 0 &&
      label.length <= 48 &&
      [...label].every((char) => {
        return (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') || char === '-';
      })
    );
  });
}

// src/plugins/starknet-id/index.ts
var StarknetIdImpl = class {
  static async getStarkName(provider, address, StarknetIdContract2) {
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract2 ?? getStarknetIdContract(chainId);
    try {
      const hexDomain = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'address_to_domain',
        calldata: CallData.compile({
          address,
          hint: [],
        }),
      });
      const decimalDomain = hexDomain.map((element) => BigInt(element)).slice(1);
      const stringDomain = useDecoded(decimalDomain);
      if (!stringDomain) {
        throw Error('Starkname not found');
      }
      return stringDomain;
    } catch (e) {
      if (e instanceof Error && e.message === 'Starkname not found') {
        throw e;
      }
      throw Error('Could not get stark name');
    }
  }
  static async getAddressFromStarkName(provider, name, StarknetIdContract2) {
    const starkName = name.endsWith('.stark') ? name : `${name}.stark`;
    if (!isStarkDomain(starkName)) {
      throw new Error('Invalid domain, must be a valid .stark domain');
    }
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract2 ?? getStarknetIdContract(chainId);
    try {
      const encodedDomain = starkName
        .replace('.stark', '')
        .split('.')
        .map((part) => useEncoded(part).toString(10));
      const addressData = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'domain_to_address',
        calldata: CallData.compile({ domain: encodedDomain, hint: [] }),
      });
      return addressData[0];
    } catch {
      throw Error('Could not get address from stark name');
    }
  }
  static async getStarkProfile(
    provider,
    address,
    StarknetIdContract2,
    StarknetIdIdentityContract2,
    StarknetIdVerifierContract2,
    StarknetIdPfpContract2,
    StarknetIdPopContract2,
    StarknetIdMulticallContract2
  ) {
    const chainId = await provider.getChainId();
    const contract = StarknetIdContract2 ?? getStarknetIdContract(chainId);
    const identityContract = StarknetIdIdentityContract2 ?? getStarknetIdIdentityContract(chainId);
    const verifierContract = StarknetIdVerifierContract2 ?? getStarknetIdVerifierContract(chainId);
    const pfpContract = StarknetIdPfpContract2 ?? getStarknetIdPfpContract(chainId);
    const popContract = StarknetIdPopContract2 ?? getStarknetIdPopContract(chainId);
    const multicallAddress =
      StarknetIdMulticallContract2 ?? getStarknetIdMulticallContract(chainId);
    try {
      const calls = [
        {
          execution: execution({}),
          to: dynamicCallData(contract),
          selector: dynamicCallData(getSelectorFromName('address_to_domain')),
          calldata: [dynamicCallData(address), dynamicCallData('0')],
        },
        {
          execution: execution({}),
          to: dynamicFelt(contract),
          selector: dynamicFelt(getSelectorFromName('domain_to_id')),
          calldata: [dynamicCallData(void 0, void 0, [0, 0])],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(void 0, [1, 0]),
            dynamicCallData(encodeShortString('twitter')),
            dynamicCallData(verifierContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(void 0, [1, 0]),
            dynamicCallData(encodeShortString('github')),
            dynamicCallData(verifierContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(void 0, [1, 0]),
            dynamicCallData(encodeShortString('discord')),
            dynamicCallData(verifierContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(void 0, [1, 0]),
            dynamicCallData(encodeShortString('proof_of_personhood')),
            dynamicCallData(popContract),
            dynamicCallData('0'),
          ],
        },
        // PFP
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_verifier_data')),
          calldata: [
            dynamicCallData(void 0, [1, 0]),
            dynamicCallData(encodeShortString('nft_pp_contract')),
            dynamicCallData(pfpContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution({}),
          to: dynamicFelt(identityContract),
          selector: dynamicFelt(getSelectorFromName('get_extended_verifier_data')),
          calldata: [
            dynamicCallData(void 0, [1, 0]),
            dynamicCallData(encodeShortString('nft_pp_id')),
            dynamicCallData('2'),
            dynamicCallData(pfpContract),
            dynamicCallData('0'),
          ],
        },
        {
          execution: execution(void 0, void 0, [6, 0, 0]),
          to: dynamicFelt(void 0, [6, 0]),
          selector: dynamicFelt(getSelectorFromName('tokenURI')),
          calldata: [dynamicCallData(void 0, [7, 1]), dynamicCallData(void 0, [7, 2])],
        },
      ];
      const data = await provider.callContract({
        contractAddress: multicallAddress,
        entrypoint: 'aggregate',
        calldata: CallData.compile({
          calls,
        }),
      });
      if (Array.isArray(data)) {
        const size = parseInt(data[0], 16);
        const finalArray = [];
        let index = 1;
        for (let i = 0; i < size; i += 1) {
          if (index < data.length) {
            const subArraySize = parseInt(data[index], 16);
            index += 1;
            const subArray = data.slice(index, index + subArraySize);
            finalArray.push(subArray);
            index += subArraySize;
          } else {
            break;
          }
        }
        const name = useDecoded(finalArray[0].slice(1).map((hexString) => BigInt(hexString)));
        const twitter = finalArray[2][0] !== '0x0' ? BigInt(finalArray[2][0]).toString() : void 0;
        const github = finalArray[3][0] !== '0x0' ? BigInt(finalArray[3][0]).toString() : void 0;
        const discord = finalArray[4][0] !== '0x0' ? BigInt(finalArray[4][0]).toString() : void 0;
        const proofOfPersonhood = finalArray[5][0] === '0x1';
        const profilePictureMetadata =
          data[0] === '0x9'
            ? finalArray[8]
                .slice(1)
                .map((val) => decodeShortString(val))
                .join('')
            : void 0;
        const profilePicture =
          profilePictureMetadata ||
          `https://starknet.id/api/identicons/${BigInt(finalArray[1][0]).toString()}`;
        return {
          name,
          twitter,
          github,
          discord,
          proofOfPersonhood,
          profilePicture,
        };
      }
      throw Error('Error while calling aggregate function');
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      }
      throw Error('Could not get user stark profile data from address');
    }
  }
};
function starknetId() {
  return {
    name: 'starknet-id',
    extend(provider) {
      return {
        getStarkName: (address, contract) =>
          StarknetIdImpl.getStarkName(provider, address, contract),
        getAddressFromStarkName: (name, contract) =>
          StarknetIdImpl.getAddressFromStarkName(provider, name, contract),
        getStarkProfile: (
          address,
          contract,
          identityContract,
          verifierContract,
          pfpContract,
          popContract,
          multicallContract
        ) =>
          StarknetIdImpl.getStarkProfile(
            provider,
            address,
            contract,
            identityContract,
            verifierContract,
            pfpContract,
            popContract,
            multicallContract
          ),
      };
    },
    accountExtend(account) {
      return {
        getStarkName: (address, contract) =>
          StarknetIdImpl.getStarkName(account.provider, address ?? account.address, contract),
        getAddressFromStarkName: (name, contract) =>
          StarknetIdImpl.getAddressFromStarkName(account.provider, name, contract),
        getStarkProfile: (
          address,
          contract,
          identityContract,
          verifierContract,
          pfpContract,
          popContract,
          multicallContract
        ) =>
          StarknetIdImpl.getStarkProfile(
            account.provider,
            address,
            contract,
            identityContract,
            verifierContract,
            pfpContract,
            popContract,
            multicallContract
          ),
      };
    },
  };
}

// src/plugins/brother-id/index.ts
function isBrotherDomain(domain) {
  return domain.endsWith('.brother');
}
function encodeBrotherDomain(domain) {
  const brotherName = domain.endsWith('.brother') ? domain.replace('.brother', '') : domain;
  return useEncoded(brotherName);
}
function decodeBrotherDomain(encoded) {
  const decoded = useDecoded([encoded]);
  if (decoded.endsWith('.stark')) {
    return decoded.replace('.stark', '.brother');
  }
  return decoded ? `${decoded}.brother` : decoded;
}
function getBrotherIdContract(chainId) {
  switch (chainId) {
    case _StarknetChainId.SN_MAIN:
      return '0x0212f1c57700f5a3913dd11efba540196aad4cf67772f7090c62709dd804fa74';
    default:
      return '0x0212f1c57700f5a3913dd11efba540196aad4cf67772f7090c62709dd804fa74';
  }
}
var BrotherIdImpl = class {
  static async getBrotherName(provider, address, BrotherIdContract) {
    const chainId = await provider.getChainId();
    const contract = BrotherIdContract ?? getBrotherIdContract(chainId);
    try {
      const primaryDomain = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'getPrimary',
        calldata: CallData.compile({
          user: address,
        }),
      });
      if (!primaryDomain[0] || primaryDomain[0] === '0x0') {
        throw Error('Brother name not found');
      }
      const encodedDomain = BigInt(primaryDomain[0]);
      return decodeBrotherDomain(encodedDomain);
    } catch (e) {
      if (e instanceof Error && e.message === 'Brother name not found') {
        throw e;
      }
      throw Error('Could not get brother name');
    }
  }
  static async getAddressFromBrotherName(provider, name, BrotherIdContract) {
    const brotherName = name.endsWith('.brother') ? name : `${name}.brother`;
    if (!isBrotherDomain(brotherName)) {
      throw new Error('Invalid domain, must be a valid .brother domain');
    }
    const chainId = await provider.getChainId();
    const contract = BrotherIdContract ?? getBrotherIdContract(chainId);
    try {
      const domainDetails = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'get_details_by_domain',
        calldata: CallData.compile({
          domain: encodeBrotherDomain(brotherName),
        }),
      });
      if (!domainDetails[0] || domainDetails[1] === '0x0') {
        throw Error('Could not get address from brother name');
      }
      return domainDetails[1];
    } catch {
      throw Error('Could not get address from brother name');
    }
  }
  static async getBrotherProfile(provider, address, BrotherIdContract) {
    const chainId = await provider.getChainId();
    const contract = BrotherIdContract ?? getBrotherIdContract(chainId);
    try {
      const primaryDomain = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'getPrimary',
        calldata: CallData.compile({
          user: address,
        }),
      });
      if (!primaryDomain[0] || primaryDomain[0] === '0x0') {
        throw Error('Brother profile not found');
      }
      const encodedDomain = BigInt(primaryDomain[0]);
      const decodedDomain = decodeBrotherDomain(encodedDomain);
      const domain = decodedDomain.replace('.brother', '');
      const domainDetails = await provider.callContract({
        contractAddress: contract,
        entrypoint: 'get_details_by_domain',
        calldata: CallData.compile({
          domain: encodeBrotherDomain(domain),
        }),
      });
      return {
        name: domain,
        resolver: domainDetails[1],
        tokenId: domainDetails[2],
        expiryDate: parseInt(domainDetails[3], 16),
        lastTransferTime: parseInt(domainDetails[4], 16),
      };
    } catch (e) {
      if (e instanceof Error && e.message === 'Brother profile not found') {
        throw e;
      }
      throw Error('Could not get brother profile');
    }
  }
};
function brotherId() {
  return {
    name: 'brother-id',
    extend(provider) {
      return {
        getBrotherName: (address, contract) =>
          BrotherIdImpl.getBrotherName(provider, address, contract),
        getAddressFromBrotherName: (name, contract) =>
          BrotherIdImpl.getAddressFromBrotherName(provider, name, contract),
        getBrotherProfile: (address, contract) =>
          BrotherIdImpl.getBrotherProfile(provider, address, contract),
      };
    },
  };
}

// src/plugins/fast-execute/impl.ts
var FastExecuteImpl = class _FastExecuteImpl {
  /**
   * Wait for transaction with polling-optimized confirmation
   * Only available on RPC 0.9+, requires PRE_CONFIRMED block identifier
   */
  static async fastWaitForTransaction(provider, txHash, address, initNonceBN, options) {
    const initNonce = BigInt(initNonceBN);
    let retries = options?.retries ?? 50;
    const retryInterval = options?.retryInterval ?? 500;
    const errorStates = ['REVERTED'];
    const successStates = ['ACCEPTED_ON_L2', 'ACCEPTED_ON_L1', 'PRE_CONFIRMED'];
    const start = /* @__PURE__ */ new Date().getTime();
    while (retries > 0) {
      await wait(retryInterval);
      const txStatus = await provider.getTransactionStatus(txHash);
      logger.info(
        `fastWaitForTransaction: ${retries} retries left, status: ${JSON.stringify(txStatus)}, elapsed: ${(/* @__PURE__ */ new Date().getTime() - start) / 1e3}s.`
      );
      const executionStatus = txStatus.execution_status ?? '';
      const finalityStatus = txStatus.finality_status;
      if (errorStates.includes(executionStatus)) {
        const message = `${executionStatus}: ${finalityStatus}`;
        const error = new Error(message);
        error.response = txStatus;
        throw error;
      } else if (successStates.includes(finalityStatus)) {
        let currentNonce = initNonce;
        while (currentNonce === initNonce && retries > 0) {
          currentNonce = BigInt(await provider.getNonceForAddress(address, BlockTag.PRE_CONFIRMED));
          logger.info(
            `fastWaitForTransaction: checking new nonce ${currentNonce}, initial was ${initNonce}, elapsed: ${(/* @__PURE__ */ new Date().getTime() - start) / 1e3}s.`
          );
          if (currentNonce !== initNonce) {
            return true;
          }
          await wait(retryInterval);
          retries -= 1;
        }
        return false;
      }
      retries -= 1;
    }
    return false;
  }
  /**
   * Execute transaction with fast confirmation waiting
   * Combines execute() with optimized polling for next transaction
   */
  static async fastExecute(account, transactions, transactionsDetail = {}, waitDetail = {}) {
    const { channel } = account.provider;
    assert(
      channel.blockIdentifier === BlockTag.PRE_CONFIRMED,
      'Provider needs to be initialized with `pre_confirmed` blockIdentifier option.'
    );
    const initNonce = BigInt(
      transactionsDetail.nonce ??
        (await account.provider.getNonceForAddress(account.address, BlockTag.PRE_CONFIRMED))
    );
    const details = { ...transactionsDetail, nonce: initNonce };
    const resultTx = await account.execute(transactions, details);
    const isReady = await _FastExecuteImpl.fastWaitForTransaction(
      account.provider,
      resultTx.transaction_hash,
      account.address,
      initNonce,
      waitDetail
    );
    return { txResult: resultTx, isReady };
  }
};

// src/plugins/fast-execute/index.ts
function fastExecute() {
  return {
    name: 'fast-execute',
    extend(provider) {
      return {
        fastWaitForTransaction: (txHash, address, initNonce, options) =>
          FastExecuteImpl.fastWaitForTransaction(provider, txHash, address, initNonce, options),
      };
    },
    accountExtend(account) {
      return {
        fastExecute: (transactions, details, waitDetail) =>
          FastExecuteImpl.fastExecute(account, transactions, details, waitDetail),
      };
    },
  };
}

// src/plugins/defaults.ts
var defaultPlugins = [starknetId(), brotherId(), fastExecute()];

// src/provider/rpc.ts
var RpcProvider = class {
  responseParser;
  channel;
  /** @internal Plugin management infrastructure */
  pluginManager;
  constructor(optionsOrProvider) {
    this.pluginManager = new PluginManager();
    if (optionsOrProvider && 'channel' in optionsOrProvider) {
      this.channel = optionsOrProvider.channel;
      this.responseParser =
        'responseParser' in optionsOrProvider
          ? optionsOrProvider.responseParser
          : new RPCResponseParser();
      if ('pluginManager' in optionsOrProvider) {
        const sourceManager = optionsOrProvider.pluginManager;
        Array.from(sourceManager.plugins.values()).forEach((plugin) => {
          this.pluginManager.installOnProvider(plugin, this);
        });
      }
    } else {
      const options = optionsOrProvider;
      if (options && options.specVersion) {
        if (isVersion('0.9', options.specVersion)) {
          this.channel = new rpc_0_9_0_exports.RpcChannel({ ...options, waitMode: false });
        } else if (isVersion('0.10', options.specVersion)) {
          this.channel = new rpc_0_10_3_exports.RpcChannel({ ...options, waitMode: false });
        } else throw new Error(`unsupported channel for spec version: ${options.specVersion}`);
      } else if (isVersion('0.9', config.get('rpcVersion'))) {
        this.channel = new rpc_0_9_0_exports.RpcChannel({ ...options, waitMode: false });
      } else if (isVersion('0.10', config.get('rpcVersion'))) {
        this.channel = new rpc_0_10_3_exports.RpcChannel({ ...options, waitMode: false });
      } else throw new Error('unable to define spec version for channel');
      this.responseParser = new RPCResponseParser(options?.resourceBoundsOverhead);
      const plugins = options?.plugins === false ? [] : (options?.plugins ?? defaultPlugins);
      plugins.forEach((plugin) => {
        this.pluginManager.installOnProvider(plugin, this);
      });
    }
  }
  /**
   * auto configure channel based on provided node
   * leave space for other async before constructor
   */
  // NOTE: the generic T and 'this' reference are used so that the expanded class is generated when a mixin is applied
  static async create(optionsOrProvider) {
    const channel = new rpc_0_9_0_exports.RpcChannel({ ...optionsOrProvider });
    const spec = await channel.getSpecVersion();
    if (!isSupportedSpecVersion(spec)) {
      logger.warn(`Using incompatible node spec version ${spec}`);
    }
    if (isVersion('0.9', spec)) {
      return new this({
        ...optionsOrProvider,
        specVersion: _SupportedRpcVersion.v0_9_0,
      });
    }
    if (isVersion('0.10', spec)) {
      return new this({
        ...optionsOrProvider,
        specVersion: _SupportedRpcVersion.v0_10_3,
      });
    }
    throw new LibraryError(
      `Provided RPC node specification version ${spec} is not compatible with the SDK. SDK supported RPC versions ${Object.keys(_SupportedRpcVersion).toString()}`
    );
  }
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
  use(plugin) {
    this.pluginManager.installOnProvider(plugin, this);
    return this;
  }
  async fetch(method, params, id = 0) {
    const hookResult = this.pluginManager.runProviderHook('beforeRequest', { method, params });
    const finalMethod = hookResult?.method ?? method;
    const finalParams = hookResult?.params ?? params;
    const result = await this.channel.fetch(finalMethod, finalParams, id);
    const afterResult = this.pluginManager.runProviderHook('afterRequest', {
      method: finalMethod,
      params: finalParams,
      result,
    });
    return afterResult ?? result;
  }
  async getChainId() {
    return this.channel.getChainId();
  }
  readSpecVersion() {
    return this.channel.readSpecVersion();
  }
  async getSpecVersion() {
    return this.channel.getSpecVersion();
  }
  setUpSpecVersion() {
    return this.channel.setUpSpecVersion();
  }
  async getStarknetVersion(blockIdentifier) {
    return this.channel.getStarknetVersion(blockIdentifier);
  }
  async getNonceForAddress(contractAddress, blockIdentifier) {
    return this.channel.getNonceForAddress(contractAddress, blockIdentifier);
  }
  async getBlock(blockIdentifier) {
    return this.channel
      .getBlockWithTxHashes(blockIdentifier)
      .then(this.responseParser.parseGetBlockResponse);
  }
  async getBlockLatestAccepted() {
    return this.channel.getBlockLatestAccepted();
  }
  async getBlockNumber() {
    return this.channel.getBlockNumber();
  }
  async getBlockWithTxHashes(blockIdentifier) {
    return this.channel.getBlockWithTxHashes(blockIdentifier);
  }
  async getBlockWithTxs(blockIdentifier, options) {
    if (this.channel instanceof rpc_0_10_2_exports.RpcChannel) {
      return this.channel.getBlockWithTxs(blockIdentifier, options);
    }
    return this.channel.getBlockWithTxs(blockIdentifier);
  }
  async waitForBlock(blockIdentifier = BlockTag.LATEST, retryInterval = 5e3) {
    if (blockIdentifier === BlockTag.LATEST) return;
    const currentBlock = await this.getBlockNumber();
    const targetBlock =
      blockIdentifier === BlockTag.PRE_CONFIRMED
        ? currentBlock + 1
        : Number(toHex(blockIdentifier));
    if (targetBlock <= currentBlock) return;
    const { retries } = this.channel;
    let retriesCount = retries;
    let isTargetBlock = false;
    while (!isTargetBlock) {
      const currBlock = await this.getBlockNumber();
      if (currBlock >= targetBlock) {
        isTargetBlock = true;
      } else {
        await wait(retryInterval);
      }
      retriesCount -= 1;
      if (retriesCount <= 0) {
        throw new Error(`waitForBlock() timed-out after ${retries} tries.`);
      }
    }
  }
  async getL1GasPrice(blockIdentifier) {
    return this.channel
      .getBlockWithTxHashes(blockIdentifier)
      .then(this.responseParser.parseL1GasPriceResponse);
  }
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
  async getGasPrices(blockIdentifier = this.channel.blockIdentifier) {
    return getGasPrices(this.channel, blockIdentifier);
  }
  async getL1MessageHash(l2TxHash) {
    const transaction = await this.channel.getTransactionByHash(l2TxHash);
    assert(transaction.type === 'L1_HANDLER', 'This L2 transaction is not a L1 message.');
    const { calldata, contract_address, entry_point_selector, nonce } = transaction;
    const params = [
      calldata[0],
      contract_address,
      nonce,
      entry_point_selector,
      calldata.length - 1,
      ...calldata.slice(1),
    ];
    return solidityUint256PackedKeccak256(params);
  }
  async getBlockWithReceipts(blockIdentifier, options) {
    if (this.channel instanceof rpc_0_10_2_exports.RpcChannel) {
      return this.channel.getBlockWithReceipts(blockIdentifier, options);
    }
    return this.channel.getBlockWithReceipts(blockIdentifier);
  }
  getStateUpdate = this.getBlockStateUpdate;
  async getBlockStateUpdate(blockIdentifier, contractAddresses) {
    return this.channel.getBlockStateUpdate(blockIdentifier, contractAddresses);
  }
  async getBlockTransactionsTraces(blockIdentifier, options) {
    if (this.channel instanceof rpc_0_10_2_exports.RpcChannel) {
      return this.channel.getBlockTransactionsTraces(blockIdentifier, options);
    }
    return this.channel.getBlockTransactionsTraces(blockIdentifier);
  }
  async getBlockTransactionCount(blockIdentifier) {
    return this.channel.getBlockTransactionCount(blockIdentifier);
  }
  async getTransaction(txHash, options) {
    return this.getTransactionByHash(txHash, options);
  }
  async getTransactionByHash(txHash, options) {
    if (this.channel instanceof rpc_0_10_2_exports.RpcChannel) {
      return this.channel.getTransactionByHash(txHash, options);
    }
    return this.channel.getTransactionByHash(txHash);
  }
  async getTransactionByBlockIdAndIndex(blockIdentifier, index, options) {
    if (this.channel instanceof rpc_0_10_2_exports.RpcChannel) {
      return this.channel.getTransactionByBlockIdAndIndex(blockIdentifier, index, options);
    }
    return this.channel.getTransactionByBlockIdAndIndex(blockIdentifier, index);
  }
  async getTransactionReceipt(txHash) {
    const txReceiptWoHelper = await this.channel.getTransactionReceipt(txHash);
    const txReceiptWoHelperModified =
      this.responseParser.parseTransactionReceipt(txReceiptWoHelper);
    return createTransactionReceipt(txReceiptWoHelperModified);
  }
  async getTransactionTrace(txHash) {
    return this.channel.getTransactionTrace(txHash);
  }
  async getTransactionStatus(transactionHash) {
    return this.channel.getTransactionStatus(transactionHash);
  }
  async getSimulateTransaction(invocations, options) {
    return this.channel
      .simulateTransaction(invocations, options)
      .then((r) => this.responseParser.parseSimulateTransactionResponse(r));
  }
  async waitForTransaction(txHash, options) {
    const receiptWoHelper = await this.channel.waitForTransaction(txHash, options);
    return createTransactionReceipt(receiptWoHelper);
  }
  async getStorageAt(contractAddress, key, blockIdentifier, responseFlags) {
    const result = await this.channel.getStorageAt(
      contractAddress,
      key,
      blockIdentifier,
      responseFlags
    );
    return this.responseParser.parseStorageResponse(result);
  }
  async getClassHashAt(contractAddress, blockIdentifier) {
    return this.channel.getClassHashAt(contractAddress, blockIdentifier);
  }
  async getClassByHash(classHash) {
    return this.getClass(classHash);
  }
  async getClass(classHash, blockIdentifier) {
    return this.channel
      .getClass(classHash, blockIdentifier)
      .then(this.responseParser.parseContractClassResponse);
  }
  async getClassAt(contractAddress, blockIdentifier) {
    return this.channel
      .getClassAt(contractAddress, blockIdentifier)
      .then(this.responseParser.parseContractClassResponse);
  }
  async getContractVersion(
    contractAddress,
    classHash,
    { blockIdentifier = this.channel.blockIdentifier, compiler = true } = {}
  ) {
    let contractClass;
    if (contractAddress) {
      contractClass = await this.getClassAt(contractAddress, blockIdentifier);
    } else if (classHash) {
      contractClass = await this.getClass(classHash, blockIdentifier);
    } else {
      throw Error('getContractVersion require contractAddress or classHash');
    }
    if (isSierra(contractClass)) {
      if (compiler) {
        const abiTest = getAbiContractVersion(contractClass.abi);
        return { cairo: '1', compiler: abiTest.compiler };
      }
      return { cairo: '1', compiler: void 0 };
    }
    return { cairo: '0', compiler: '0' };
  }
  async getInvokeEstimateFee(invocation, details, blockIdentifier, skipValidate) {
    return (
      await this.getEstimateFeeBulk(
        [{ type: api_exports.ETransactionType.INVOKE, ...invocation, ...details }],
        { blockIdentifier, skipValidate }
      )
    )[0];
  }
  async getDeclareEstimateFee(invocation, details, blockIdentifier, skipValidate) {
    return (
      await this.getEstimateFeeBulk(
        [{ type: api_exports.ETransactionType.DECLARE, ...invocation, ...details }],
        { blockIdentifier, skipValidate }
      )
    )[0];
  }
  async getDeployAccountEstimateFee(invocation, details, blockIdentifier, skipValidate) {
    return (
      await this.getEstimateFeeBulk(
        [{ type: api_exports.ETransactionType.DEPLOY_ACCOUNT, ...invocation, ...details }],
        { blockIdentifier, skipValidate }
      )
    )[0];
  }
  async getEstimateFeeBulk(invocations, options) {
    return this.channel
      .getEstimateFee(invocations, options)
      .then((r) => this.responseParser.parseFeeEstimateBulkResponse(r));
  }
  async invokeFunction(functionInvocation, details) {
    return this.channel.invoke(functionInvocation, details);
  }
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
  async invokeSignedTx(transaction) {
    return this.channel.invokeSignedTx(transaction);
  }
  async declareContract(transaction, details) {
    return this.channel.declare(transaction, details);
  }
  async deployAccountContract(transaction, details) {
    return this.channel.deployAccount(transaction, details);
  }
  async callContract(call, blockIdentifier) {
    return this.channel.callContract(call, blockIdentifier);
  }
  async estimateMessageFee(message, blockIdentifier) {
    return this.channel.estimateMessageFee(message, blockIdentifier);
  }
  async getSyncingStats() {
    return this.channel.getSyncingStats();
  }
  async getEvents(eventFilter) {
    if (this.channel instanceof rpc_0_10_2_exports.RpcChannel) {
      return this.channel.getEvents(eventFilter);
    }
    if (this.channel instanceof rpc_0_9_0_exports.RpcChannel) {
      return this.channel.getEvents(eventFilter);
    }
    throw new Error('Unsupported channel type');
  }
  async verifyMessageInStarknet(
    message,
    signature,
    accountAddress,
    signatureVerificationFunctionName,
    signatureVerificationResponse
  ) {
    return verifyMessageInStarknet(
      this,
      message,
      signature,
      accountAddress,
      signatureVerificationFunctionName,
      signatureVerificationResponse
    );
  }
  async isClassDeclared(contractClassIdentifier, blockIdentifier) {
    let classHash;
    if (!contractClassIdentifier.classHash && 'contract' in contractClassIdentifier) {
      const hashes = extractContractHashes(
        contractClassIdentifier,
        await this.channel.getStarknetVersion()
      );
      classHash = hashes.classHash;
    } else if (contractClassIdentifier.classHash) {
      classHash = contractClassIdentifier.classHash;
    } else {
      throw Error('contractClassIdentifier type not satisfied');
    }
    try {
      const result = await this.getClass(classHash, blockIdentifier);
      return result instanceof Object;
    } catch (error) {
      if (error instanceof LibraryError) {
        return false;
      }
      throw error;
    }
  }
  async prepareInvocations(invocations) {
    const bulk = [];
    for (const invocation of invocations) {
      if (invocation.type === api_exports.ETransactionType.DECLARE) {
        const isDeclared = await this.isClassDeclared(
          'payload' in invocation ? invocation.payload : invocation
        );
        if (!isDeclared) {
          bulk.unshift(invocation);
        }
      } else {
        bulk.push(invocation);
      }
    }
    return bulk;
  }
  async getL1MessagesStatus(transactionHash) {
    return this.channel.getMessagesStatus(transactionHash);
  }
  async getStorageProof(classHashes, contractAddresses, contractsStorageKeys, blockIdentifier) {
    return this.channel.getStorageProof(
      classHashes,
      contractAddresses,
      contractsStorageKeys,
      blockIdentifier
    );
  }
  async getCompiledCasm(classHash) {
    return this.channel.getCompiledCasm(classHash);
  }
  async getEstimateTip(blockIdentifier, options = {}) {
    return getTipStatsFromBlocks(this, blockIdentifier, options);
  }
};

// src/provider/interface.ts
var ProviderInterface = class {};

// src/signer/interface.ts
var SignerInterface = class {};

// src/signer/default.ts
var Signer = class {
  pk;
  constructor(pk = starkCurve.utils.randomPrivateKey()) {
    this.pk = pk instanceof Uint8Array ? buf2hex(pk) : toHex(pk);
  }
  async getPubKey() {
    return starkCurve.getStarkKey(this.pk);
  }
  async signMessage(typedData, accountAddress) {
    const msgHash = getMessageHash(typedData, accountAddress);
    return this.signRaw(msgHash);
  }
  async signTransaction(transactions, details) {
    const compiledCalldata = getExecuteCalldata(transactions, details.cairoVersion);
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateInvokeTransactionHash2({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signTransaction version');
    }
    return this.signRaw(msgHash);
  }
  async signDeployAccountTransaction(details) {
    const compiledConstructorCalldata = CallData.compile(details.constructorCalldata);
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateDeployAccountTransactionHash3({
        ...det,
        salt: det.addressSalt,
        compiledConstructorCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeployAccountTransaction version');
    }
    return this.signRaw(msgHash);
  }
  async signDeclareTransaction(details) {
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateDeclareTransactionHash3({
        ...det,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeclareTransaction version');
    }
    return this.signRaw(msgHash);
  }
  async signRaw(msgHash) {
    return starkCurve.sign(msgHash, this.pk);
  }
};

// src/signer/ethSigner.ts
var import_secp256k12 = require('@noble/curves/secp256k1');

// src/utils/uint256.ts
var uint256_exports = {};
__export(uint256_exports, {
  bnToUint256: () => bnToUint256,
  isUint256: () => isUint256,
  uint256ToBN: () => uint256ToBN,
});
function uint256ToBN(uint2562) {
  return new CairoUint256(uint2562).toBigInt();
}
function isUint256(bn) {
  return CairoUint256.is(bn);
}
function bnToUint256(bn) {
  return new CairoUint256(bn).toUint256HexString();
}

// src/signer/ethSigner.ts
var EthSigner = class {
  pk;
  // hex string without 0x and with an odd number of characters
  constructor(pk = ethRandomPrivateKey()) {
    this.pk =
      pk instanceof Uint8Array
        ? buf2hex(pk).padStart(64, '0')
        : removeHexPrefix(toHex(pk)).padStart(64, '0');
  }
  /**
   * provides the Ethereum full public key (without parity prefix)
   * @returns an hex string : 64 first characters are Point X coordinate. 64 last characters are Point Y coordinate.
   */
  async getPubKey() {
    return addHexPrefix(
      buf2hex(import_secp256k12.secp256k1.getPublicKey(this.pk, false)).padStart(130, '0').slice(2)
    );
  }
  async signMessage(typedData, accountAddress) {
    const msgHash = getMessageHash(typedData, accountAddress);
    const signature = import_secp256k12.secp256k1.sign(
      removeHexPrefix(sanitizeHex(msgHash)),
      this.pk
    );
    return this.formatEthSignature(signature);
  }
  async signTransaction(transactions, details) {
    const compiledCalldata = getExecuteCalldata(transactions, details.cairoVersion);
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateInvokeTransactionHash2({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signTransaction version');
    }
    const signature = import_secp256k12.secp256k1.sign(
      removeHexPrefix(sanitizeHex(msgHash)),
      this.pk
    );
    return this.formatEthSignature(signature);
  }
  async signDeployAccountTransaction(details) {
    const compiledConstructorCalldata = CallData.compile(details.constructorCalldata);
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateDeployAccountTransactionHash3({
        ...det,
        salt: det.addressSalt,
        compiledConstructorCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeployAccountTransaction version');
    }
    const signature = import_secp256k12.secp256k1.sign(
      removeHexPrefix(sanitizeHex(msgHash)),
      this.pk
    );
    return this.formatEthSignature(signature);
  }
  async signDeclareTransaction(details) {
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateDeclareTransactionHash3({
        ...det,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeclareTransaction version');
    }
    const signature = import_secp256k12.secp256k1.sign(
      removeHexPrefix(sanitizeHex(msgHash)),
      this.pk
    );
    return this.formatEthSignature(signature);
  }
  /**
   * Serialize the signature in conformity with starknet::eth_signature::Signature
   * @param ethSignature secp256k1 signature from Noble curves library
   * @return an array of felts, representing a Cairo Eth Signature.
   */
  formatEthSignature(ethSignature) {
    const r = bnToUint256(ethSignature.r);
    const s = bnToUint256(ethSignature.s);
    return [toHex(r.low), toHex(r.high), toHex(s.low), toHex(s.high), toHex(ethSignature.recovery)];
  }
};

// src/signer/ledgerSigner111.ts
var LedgerSigner111 = class {
  transporter;
  // this is a hack to allow the '@ledgerhq/hw-transport' type to be used as a dev dependency but not exposed in the production build
  _transporter;
  accountID;
  eip2645applicationName;
  pathBuffer;
  appVersion;
  pubKey;
  fullPubKey;
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
    transport,
    accountID,
    eip2645application = 'LedgerW',
    pathFunction = getLedgerPathBuffer111
  ) {
    assert(accountID >= 0, 'Ledger account ID shall not be a negative number.');
    assert(accountID <= MASK_31, 'Ledger account ID shall be < 2**31.');
    assert(!!eip2645application, 'Ledger application name shall not be empty.');
    this.transporter = transport;
    this._transporter = this.transporter;
    this.accountID = accountID;
    this.pubKey = '';
    this.fullPubKey = '';
    this.eip2645applicationName = eip2645application;
    this.appVersion = '';
    this.pathBuffer = pathFunction(this.accountID, this.eip2645applicationName);
  }
  /**
   * provides the Starknet public key
   * @returns an hex string : 64 characters are Point X coordinate.
   * @example
   * ```typescript
   * const result = await myLedgerSigner.getPubKey();
   * // result= "0x03681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e"
   * ```
   */
  async getPubKey() {
    if (!this.pubKey) await this.getPublicKeys();
    return this.pubKey;
  }
  /**
   * provides the full public key (with parity prefix)
   * @returns an hex string : 2 first characters are the parity, the 64 following characters are Point X coordinate. 64 last characters are Point Y coordinate.
   * @example
   * ```typescript
   * const result = await myLedgerSigner.getFullPubKey();
   * // result= "0x0403681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e03cbc86f805dcfcb0c1922dd4daf181afa289d86223a18bc856276615bcc7787"
   * ```
   */
  async getFullPubKey() {
    if (!this.fullPubKey) await this.getPublicKeys();
    return this.fullPubKey;
  }
  /**
   * Returns the version of the Starknet APP implemented in the Ledger.
   * @returns {string} version.
   * @example
   * ```typescript
   * const result = await myLedgerSigner.getAppVersion();
   * // result= "1.1.1"
   * ```
   */
  async getAppVersion() {
    if (!this.appVersion) {
      const resp = await this._transporter.send(Number('0x5a'), 0, 0, 0);
      this.appVersion = `${resp[0]}.${resp[1]}.${resp[2]}`;
    }
    return this.appVersion;
  }
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
  async signMessage(typedDataToHash, accountAddress) {
    const msgHash = getMessageHash(typedDataToHash, accountAddress);
    return this.signRaw(msgHash);
  }
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
  async signTransaction(transactions, transactionsDetail) {
    const compiledCalldata = getExecuteCalldata(transactions, transactionsDetail.cairoVersion);
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(transactionsDetail.version)) {
      const det = transactionsDetail;
      msgHash = calculateInvokeTransactionHash2({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signTransaction version');
    }
    return this.signRaw(msgHash);
  }
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
  async signDeployAccountTransaction(details) {
    const compiledConstructorCalldata = CallData.compile(details.constructorCalldata);
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateDeployAccountTransactionHash3({
        ...det,
        salt: det.addressSalt,
        compiledConstructorCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeployAccountTransaction version');
    }
    return this.signRaw(msgHash);
  }
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
  async signDeclareTransaction(details) {
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateDeclareTransactionHash3({
        ...det,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
    } else {
      throw Error('unsupported signDeclareTransaction version');
    }
    return this.signRaw(msgHash);
  }
  /**
   * Internal function to sign a hash in a Ledger Nano.
   * This is a blind sign in the Ledger ; no display of what you are signing.
   */
  async signRaw(msgHash) {
    addHexPrefix(
      buf2hex(
        await this._transporter.send(Number('0x5a'), 2, 0, 0, buffer_default.from(this.pathBuffer))
      )
    );
    const shiftedHash = toHex(BigInt(msgHash) << 4n);
    const buff2 = hexToBytes(shiftedHash);
    const respSign2 = Uint8Array.from(
      await this._transporter.send(Number('0x5a'), 2, 1, 0, buffer_default.from(buff2))
    );
    const r = BigInt(addHexPrefix(buf2hex(respSign2.subarray(1, 33))));
    const s = BigInt(addHexPrefix(buf2hex(respSign2.subarray(33, 65))));
    const v = respSign2[65];
    const sign0 = new starkCurve.Signature(r, s);
    const sign1 = sign0.addRecoveryBit(v);
    return sign1;
  }
  /** internal function to get both the Starknet public key and the full public key */
  async getPublicKeys() {
    const pathBuff = this.pathBuffer;
    const respGetPublic = Uint8Array.from(
      await this._transporter.send(Number('0x5a'), 1, 0, 0, buffer_default.from(pathBuff))
    );
    this.pubKey = addHexPrefix(buf2hex(respGetPublic.subarray(1, 33)));
    this.fullPubKey = addHexPrefix(buf2hex(respGetPublic.subarray(0, 65)));
  }
};
function getLedgerPathBuffer111(accountId, applicationName = 'LedgerW') {
  const path0buff = new Uint8Array([128, 0, 10, 85]);
  const path1buff = new Uint8Array([71, 65, 233, 201]);
  const path2buff =
    applicationName === 'LedgerW'
      ? new Uint8Array([43, 206, 231, 219])
      : stringToSha256ToArrayBuff4(applicationName);
  const path3buff = new Uint8Array([0, 0, 0, 0]);
  const hex = toHex(accountId);
  const padded = addHexPrefix(removeHexPrefix(hex).padStart(8, '0'));
  const path4buff = hexToBytes(padded);
  const path5buff = new Uint8Array([0, 0, 0, 0]);
  const pathBuff = concatenateArrayBuffer([
    path0buff,
    path1buff,
    path2buff,
    path3buff,
    path4buff,
    path5buff,
  ]);
  return pathBuff;
}

// src/utils/address.ts
var import_utils3 = require('@noble/curves/abstract/utils');
function addAddressPadding(address) {
  const hex = toHex(isString(address) ? addHexPrefix(address) : address);
  const padded = removeHexPrefix(hex).padStart(64, '0');
  return addHexPrefix(padded);
}
function validateAndParseAddress(address) {
  const result = addAddressPadding(address);
  if (!result.match(/^(0x)?[0-9a-fA-F]{64}$/)) {
    throw new Error('Invalid Address Format');
  }
  assertInRange(result, ZERO, ADDR_BOUND - 1n, 'Starknet Address');
  return result;
}
function getChecksumAddress(address) {
  const chars = removeHexPrefix(validateAndParseAddress(address)).toLowerCase().split('');
  const hex = removeHexPrefix(keccakBn(address));
  const hashed = (0, import_utils3.hexToBytes)(hex.padStart(64, '0'));
  for (let i = 0; i < chars.length; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase();
    }
    if ((hashed[i >> 1] & 15) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase();
    }
  }
  return addHexPrefix(chars.join(''));
}
function validateChecksumAddress(address) {
  return getChecksumAddress(address) === address;
}

// src/signer/ledgerSigner221.ts
var LedgerSigner221 = class extends LedgerSigner111 {
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
    transport,
    accountID,
    eip2645application = 'LedgerW',
    pathFunction = getLedgerPathBuffer221
  ) {
    super(transport, accountID, eip2645application, pathFunction);
  }
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
  async signTransaction(transactions, transactionsDetail) {
    const compiledCalldata = getExecuteCalldata(transactions, transactionsDetail.cairoVersion);
    if (Object.values(api_exports.ETransactionVersion3).includes(transactionsDetail.version)) {
      const det = transactionsDetail;
      const msgHash = calculateInvokeTransactionHash2({
        ...det,
        senderAddress: det.walletAddress,
        compiledCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
      const ledgerResponse = await this.signTxV3(det, transactions);
      assert(
        toBigInt(msgHash) === ledgerResponse.hash,
        'The V3 transaction hash calculated by Starknet.js is different from the one calculated by the Ledger.'
      );
      return ledgerResponse.signature;
    }
    throw Error('unsupported signTransaction version');
  }
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
  async signDeployAccountTransaction(details) {
    const compiledConstructorCalldata = CallData.compile(details.constructorCalldata);
    let msgHash;
    if (Object.values(api_exports.ETransactionVersion3).includes(details.version)) {
      const det = details;
      msgHash = calculateDeployAccountTransactionHash3({
        ...det,
        salt: det.addressSalt,
        compiledConstructorCalldata,
        version: det.version,
        nonceDataAvailabilityMode: intDAM(det.nonceDataAvailabilityMode),
        feeDataAvailabilityMode: intDAM(det.feeDataAvailabilityMode),
      });
      const ledgerResponse = await this.signDeployAccountV3(det);
      assert(
        toBigInt(msgHash) === ledgerResponse.hash,
        'The transaction hash calculated by Starknet.js is different from the one calculated by the Ledger.'
      );
      return ledgerResponse.signature;
    }
    throw Error('unsupported signDeployAccountTransaction version');
  }
  /**
   * Internal function to convert a bigNumberish to an Uint8array of 256 bits
   * @param {BigNumberish} input input value
   * @returns {Uint8Array} a Uint8Array containing 32 bytes.
   */
  convertBnToLedger(input) {
    return hexToBytes(addAddressPadding(toHex(input)));
  }
  /**
   * Internal function to decode the response of the Ledger signature
   * @param {Uint8Array} respSign the Buffer response of the Ledger
   * @returns { hash: bigint; signature: Signature } transaction hash & signature
   */
  decodeSignatureLedger(respSign) {
    const h = BigInt(addHexPrefix(buf2hex(respSign.subarray(0, 32))));
    const r = BigInt(addHexPrefix(buf2hex(respSign.subarray(33, 65))));
    const s = BigInt(addHexPrefix(buf2hex(respSign.subarray(65, 97))));
    const v = respSign[97];
    const sign0 = new starkCurve.Signature(r, s);
    const sign1 = sign0.addRecoveryBit(v);
    return { hash: h, signature: sign1 };
  }
  /** Internal function to convert a Call to an array of Uint8Array.
   * @param {Call} call A Call to convert.
   * @return {Uint8Array[]} Call encoded in an array of Uint8Array (each containing 7 u256).
   */
  encodeCall(call) {
    const toBuf = this.convertBnToLedger(call.contractAddress);
    const selectorBuf = hexToBytes(addAddressPadding(getSelector(call.entrypoint)));
    let calldataBuf = new Uint8Array([]);
    if (call.calldata) {
      const compiledCalldata = CallData.compile(call.calldata);
      calldataBuf = concatenateArrayBuffer(
        compiledCalldata.map((parameter) => {
          const a = this.convertBnToLedger(parameter);
          return a;
        })
      );
    }
    const callBuf = concatenateArrayBuffer([toBuf, selectorBuf, calldataBuf]);
    const calldatas = [];
    const chunkSize = 7 * 32;
    for (let i = 0; i < callBuf.length; i += chunkSize)
      calldatas.push(callBuf.subarray(i, i + chunkSize));
    return calldatas;
  }
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
  async signTxV3(txDetails, calls) {
    assert(txDetails.paymasterData.length <= 7, 'Paymaster data includes more than 7 items.');
    assert(
      txDetails.accountDeploymentData.length <= 7,
      'accountDeploymentData includes more than 7 items'
    );
    await this._transporter.send(Number('0x5a'), 3, 0, 0, buffer_default.from(this.pathBuffer));
    const accountAddressBuf = this.convertBnToLedger(txDetails.walletAddress);
    const tipBuf = this.convertBnToLedger(txDetails.tip);
    const chainIdBuf = this.convertBnToLedger(txDetails.chainId);
    const nonceBuf = this.convertBnToLedger(txDetails.nonce);
    const dAModeHashBuf = this.convertBnToLedger(
      hashDAMode(
        txDetails.nonceDataAvailabilityMode === api_exports.EDataAvailabilityMode.L1
          ? api_exports.EDAMode.L1
          : api_exports.EDAMode.L2,
        txDetails.feeDataAvailabilityMode === api_exports.EDataAvailabilityMode.L1
          ? api_exports.EDAMode.L1
          : api_exports.EDAMode.L2
      )
    );
    const l1_gasBuf = this.convertBnToLedger(encodeResourceBoundsL1(txDetails.resourceBounds));
    const l2_gasBuf = this.convertBnToLedger(encodeResourceBoundsL2(txDetails.resourceBounds));
    const dataBuf = concatenateArrayBuffer([
      accountAddressBuf,
      tipBuf,
      l1_gasBuf,
      l2_gasBuf,
      chainIdBuf,
      nonceBuf,
      dAModeHashBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 3, 1, 0, buffer_default.from(dataBuf));
    const paymasterBuf = concatenateArrayBuffer(
      txDetails.paymasterData.map((value) => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(Number('0x5a'), 3, 2, 0, buffer_default.from(paymasterBuf));
    const accountDeployDataBuf = concatenateArrayBuffer(
      txDetails.paymasterData.map((value) => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(
      Number('0x5a'),
      3,
      3,
      0,
      buffer_default.from(accountDeployDataBuf)
    );
    const nbCallsBuf = this.convertBnToLedger(calls.length);
    await this._transporter.send(Number('0x5a'), 3, 4, 0, buffer_default.from(nbCallsBuf));
    let respSign = new Uint8Array(0);
    for (const call of calls) {
      const calldatas = this.encodeCall(call);
      await this._transporter.send(Number('0x5a'), 3, 5, 0, buffer_default.from(calldatas[0]));
      if (calldatas.length > 1) {
        calldatas.slice(1).forEach(async (part) => {
          await this._transporter.send(Number('0x5a'), 3, 5, 1, buffer_default.from(part));
        });
      }
      respSign = await this._transporter.send(Number('0x5a'), 3, 5, 2);
    }
    return this.decodeSignatureLedger(respSign);
  }
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
  async signDeployAccountV3(deployAccountDetail) {
    await this._transporter.send(Number('0x5a'), 5, 0, 0, buffer_default.from(this.pathBuffer));
    const accountAddressBuf = this.convertBnToLedger(deployAccountDetail.contractAddress);
    const chainIdBuf = this.convertBnToLedger(deployAccountDetail.chainId);
    const nonceBuf = this.convertBnToLedger(deployAccountDetail.nonce);
    const dAModeHashBuf = this.convertBnToLedger(
      hashDAMode(
        deployAccountDetail.nonceDataAvailabilityMode === api_exports.EDataAvailabilityMode.L1
          ? api_exports.EDAMode.L1
          : api_exports.EDAMode.L2,
        deployAccountDetail.feeDataAvailabilityMode === api_exports.EDataAvailabilityMode.L1
          ? api_exports.EDAMode.L1
          : api_exports.EDAMode.L2
      )
    );
    const classHashBuf = this.convertBnToLedger(deployAccountDetail.classHash);
    const saltBuf = this.convertBnToLedger(deployAccountDetail.addressSalt);
    const dataBuf = concatenateArrayBuffer([
      accountAddressBuf,
      chainIdBuf,
      nonceBuf,
      dAModeHashBuf,
      classHashBuf,
      saltBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 5, 1, 0, buffer_default.from(dataBuf));
    const tipBuf = this.convertBnToLedger(deployAccountDetail.tip);
    const l1_gasBuf = this.convertBnToLedger(
      encodeResourceBoundsL1(deployAccountDetail.resourceBounds)
    );
    const l2_gasBuf = this.convertBnToLedger(
      encodeResourceBoundsL2(deployAccountDetail.resourceBounds)
    );
    const feeBuf = concatenateArrayBuffer([tipBuf, l1_gasBuf, l2_gasBuf]);
    await this._transporter.send(Number('0x5a'), 5, 2, 0, buffer_default.from(feeBuf));
    const paymasterBuf = concatenateArrayBuffer(
      deployAccountDetail.paymasterData.map((value) => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(Number('0x5a'), 5, 3, 0, buffer_default.from(paymasterBuf));
    const compiledConstructor = CallData.compile(deployAccountDetail.constructorCalldata);
    const constructorLengthBuf = this.convertBnToLedger(compiledConstructor.length);
    await this._transporter.send(
      Number('0x5a'),
      5,
      4,
      0,
      buffer_default.from(constructorLengthBuf)
    );
    const constructorBuf = concatenateArrayBuffer(
      compiledConstructor.map((parameter) => {
        const a = this.convertBnToLedger(parameter);
        return a;
      })
    );
    const constructorChunks = [];
    const chunkSize = 7 * 32;
    for (let i = 0; i < constructorBuf.length; i += chunkSize)
      constructorChunks.push(constructorBuf.subarray(i, i + chunkSize));
    let respSign = new Uint8Array(0);
    for (const chunk of constructorChunks) {
      respSign = await this._transporter.send(Number('0x5a'), 5, 5, 0, buffer_default.from(chunk));
    }
    return this.decodeSignatureLedger(respSign);
  }
};
function getLedgerPathBuffer221(accountId, applicationName = 'LedgerW') {
  const path0buff = new Uint8Array([HARDENING_BYTE, 0, 10, 85]);
  const path1buff = new Uint8Array([71 | HARDENING_BYTE, 65, 233, 201]);
  const path2Base =
    applicationName === 'LedgerW'
      ? new Uint8Array([43, 206, 231, 219])
      : stringToSha256ToArrayBuff4(applicationName);
  const path2buff = concatenateArrayBuffer([
    new Uint8Array([path2Base[0] | HARDENING_BYTE]),
    path2Base.subarray(1),
  ]);
  const path3buff = new Uint8Array([HARDENING_BYTE, 0, 0, 0]);
  const hex = toHex(BigInt(accountId) | HARDENING_4BYTES);
  const padded = addHexPrefix(removeHexPrefix(hex).padStart(8, '0'));
  const path4buff = hexToBytes(padded);
  const path5buff = new Uint8Array([0, 0, 0, 0]);
  const pathBuff = concatenateArrayBuffer([
    path0buff,
    path1buff,
    path2buff,
    path3buff,
    path4buff,
    path5buff,
  ]);
  return pathBuff;
}

// src/signer/ledgerSigner231.ts
var LedgerSigner231 = class extends LedgerSigner221 {
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
    transport,
    accountID,
    eip2645application = 'LedgerW',
    pathFunction = getLedgerPathBuffer221
  ) {
    super(transport, accountID, eip2645application, pathFunction);
  }
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
  async signTxV3(txDetails, calls) {
    assert(txDetails.paymasterData.length <= 7, 'Paymaster data includes more than 7 items.');
    assert(
      txDetails.accountDeploymentData.length <= 7,
      'accountDeploymentData includes more than 7 items'
    );
    await this._transporter.send(Number('0x5a'), 3, 0, 0, buffer_default.from(this.pathBuffer));
    const accountAddressBuf = this.convertBnToLedger(txDetails.walletAddress);
    const chainIdBuf = this.convertBnToLedger(txDetails.chainId);
    const nonceBuf = this.convertBnToLedger(txDetails.nonce);
    const dAModeHashBuf = this.convertBnToLedger(
      hashDAMode(
        intDAM(txDetails.nonceDataAvailabilityMode),
        intDAM(txDetails.feeDataAvailabilityMode)
      )
    );
    const dataBuf = concatenateArrayBuffer([
      accountAddressBuf,
      chainIdBuf,
      nonceBuf,
      dAModeHashBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 3, 1, 0, buffer_default.from(dataBuf));
    if (isRPC08Plus_ResourceBoundsBN(txDetails.resourceBounds)) {
      const tipBuf = this.convertBnToLedger(txDetails.tip);
      const l1_gasBuf = this.convertBnToLedger(encodeResourceBoundsL1(txDetails.resourceBounds));
      const l2_gasBuf = this.convertBnToLedger(encodeResourceBoundsL2(txDetails.resourceBounds));
      const l1_data_gasBuf = this.convertBnToLedger(
        encodeDataResourceBoundsL1(txDetails.resourceBounds)
      );
      const feeBuf = concatenateArrayBuffer([tipBuf, l1_gasBuf, l2_gasBuf, l1_data_gasBuf]);
      await this._transporter.send(Number('0x5a'), 3, 2, 0, buffer_default.from(feeBuf));
    }
    const paymasterBuf = concatenateArrayBuffer(
      txDetails.paymasterData.map((value) => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(Number('0x5a'), 3, 3, 0, buffer_default.from(paymasterBuf));
    const accountDeployDataBuf = concatenateArrayBuffer(
      txDetails.paymasterData.map((value) => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(
      Number('0x5a'),
      3,
      4,
      0,
      buffer_default.from(accountDeployDataBuf)
    );
    const nbCallsBuf = this.convertBnToLedger(calls.length);
    await this._transporter.send(Number('0x5a'), 3, 5, 0, buffer_default.from(nbCallsBuf));
    let respSign = new Uint8Array(0);
    for (const call of calls) {
      const calldatas = this.encodeCall(call);
      respSign = await this._transporter.send(
        Number('0x5a'),
        3,
        6,
        0,
        buffer_default.from(calldatas[0])
      );
      if (calldatas.length > 1) {
        calldatas.slice(1).forEach(async (part) => {
          respSign = await this._transporter.send(
            Number('0x5a'),
            3,
            6,
            1,
            buffer_default.from(part)
          );
        });
      }
    }
    return this.decodeSignatureLedger(respSign);
  }
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
  async signDeployAccountV3(deployAccountDetail) {
    await this._transporter.send(Number('0x5a'), 5, 0, 0, buffer_default.from(this.pathBuffer));
    const accountAddressBuf = this.convertBnToLedger(deployAccountDetail.contractAddress);
    const chainIdBuf = this.convertBnToLedger(deployAccountDetail.chainId);
    const nonceBuf = this.convertBnToLedger(deployAccountDetail.nonce);
    const dAModeHashBuf = this.convertBnToLedger(
      hashDAMode(
        intDAM(deployAccountDetail.nonceDataAvailabilityMode),
        intDAM(deployAccountDetail.feeDataAvailabilityMode)
      )
    );
    const classHashBuf = this.convertBnToLedger(deployAccountDetail.classHash);
    const saltBuf = this.convertBnToLedger(deployAccountDetail.addressSalt);
    const dataBuf = concatenateArrayBuffer([
      accountAddressBuf,
      chainIdBuf,
      nonceBuf,
      dAModeHashBuf,
      classHashBuf,
      saltBuf,
    ]);
    await this._transporter.send(Number('0x5a'), 5, 1, 0, buffer_default.from(dataBuf));
    if (isRPC08Plus_ResourceBoundsBN(deployAccountDetail.resourceBounds)) {
      const tipBuf = this.convertBnToLedger(deployAccountDetail.tip);
      const l1_gasBuf = this.convertBnToLedger(
        encodeResourceBoundsL1(deployAccountDetail.resourceBounds)
      );
      const l2_gasBuf = this.convertBnToLedger(
        encodeResourceBoundsL2(deployAccountDetail.resourceBounds)
      );
      const l1_data_gasBuf = this.convertBnToLedger(
        encodeDataResourceBoundsL1(deployAccountDetail.resourceBounds)
      );
      const feeBuf = concatenateArrayBuffer([tipBuf, l1_gasBuf, l2_gasBuf, l1_data_gasBuf]);
      await this._transporter.send(Number('0x5a'), 5, 2, 0, buffer_default.from(feeBuf));
    }
    const paymasterBuf = concatenateArrayBuffer(
      deployAccountDetail.paymasterData.map((value) => {
        const a = this.convertBnToLedger(value);
        return a;
      })
    );
    await this._transporter.send(Number('0x5a'), 5, 3, 0, buffer_default.from(paymasterBuf));
    const compiledConstructor = CallData.compile(deployAccountDetail.constructorCalldata);
    const constructorLengthBuf = this.convertBnToLedger(compiledConstructor.length);
    await this._transporter.send(
      Number('0x5a'),
      5,
      4,
      0,
      buffer_default.from(constructorLengthBuf)
    );
    const constructorBuf = concatenateArrayBuffer(
      compiledConstructor.map((parameter) => {
        const a = this.convertBnToLedger(parameter);
        return a;
      })
    );
    const constructorChunks = [];
    const chunkSize = 7 * 32;
    for (let i = 0; i < constructorBuf.length; i += chunkSize)
      constructorChunks.push(constructorBuf.subarray(i, i + chunkSize));
    let respSign = new Uint8Array(0);
    for (const chunk of constructorChunks) {
      respSign = await this._transporter.send(Number('0x5a'), 5, 5, 0, buffer_default.from(chunk));
    }
    return this.decodeSignatureLedger(respSign);
  }
  /** Internal function to convert a Call to an array of Uint8Array.
   * @param {Call} call A Call to convert.
   * @return {Uint8Array[]} Call encoded in an array of Uint8Array (each containing 7 u256).
   */
  encodeCall(call) {
    const toBuf = this.convertBnToLedger(call.contractAddress);
    const selectorBuf = hexToBytes(addAddressPadding(getSelector(call.entrypoint)));
    let calldataBuf = new Uint8Array([]);
    if (call.calldata) {
      const compiledCalldata = CallData.compile(call.calldata);
      const calldataSizeBuf = this.convertBnToLedger(compiledCalldata.length);
      calldataBuf = concatenateArrayBuffer([
        calldataSizeBuf,
        ...compiledCalldata.map((parameter) => {
          const a = this.convertBnToLedger(parameter);
          return a;
        }),
      ]);
    } else {
      calldataBuf = this.convertBnToLedger('0x00');
    }
    const callBuf = concatenateArrayBuffer([toBuf, selectorBuf, calldataBuf]);
    const calldatas = [];
    const chunkSize = 7 * 32;
    for (let i = 0; i < callBuf.length; i += chunkSize)
      calldatas.push(callBuf.subarray(i, i + chunkSize));
    return calldatas;
  }
};

// src/utils/outsideExecution.ts
var outsideExecution_exports = {};
__export(outsideExecution_exports, {
  buildExecuteFromOutsideCall: () => buildExecuteFromOutsideCall,
  buildExecuteFromOutsideCallData: () => buildExecuteFromOutsideCallData,
  getOutsideCall: () => getOutsideCall,
  getTypedData: () => getTypedData,
  toOutsideCallV2: () => toOutsideCallV2,
});
function toOutsideCallV2(call) {
  if ('calldata_len' in call) {
    return {
      To: call.to,
      Selector: call.selector,
      Calldata: call.calldata,
    };
  }
  return call;
}
function getOutsideCall(call) {
  const callData = call.calldata ?? [];
  const callDataCompiled = Array.isArray(callData) ? callData : CallData.compile(callData);
  return {
    to: call.contractAddress,
    selector: getSelectorFromName(call.entrypoint),
    calldata: callDataCompiled,
  };
}
function callToTypedData(call, version) {
  const outsideCall = getOutsideCall(call);
  if (version === '1') {
    return {
      ...outsideCall,
      calldata_len: outsideCall.calldata.length,
      calldata: outsideCall.calldata,
    };
  }
  return {
    To: outsideCall.to,
    Selector: outsideCall.selector,
    Calldata: outsideCall.calldata,
  };
}
function getDomain(chainId, version) {
  return {
    name: 'Account.execute_from_outside',
    version,
    chainId,
    ...(version === '2' ? { revision: '1' } : {}),
  };
}
function getTypedData(chainId, options, nonce, myCalls, version) {
  if (version === '1') {
    return {
      types: OutsideExecutionTypesV1,
      primaryType: 'OutsideExecution',
      domain: getDomain(chainId, version),
      message: {
        ...options,
        nonce,
        calls_len: myCalls.length,
        calls: myCalls.map((call) => callToTypedData(call, version)),
      },
    };
  }
  return {
    types: OutsideExecutionTypesV2,
    primaryType: 'OutsideExecution',
    domain: getDomain(chainId, version),
    message: {
      Caller: options.caller,
      Nonce: nonce,
      'Execute After': options.execute_after,
      'Execute Before': options.execute_before,
      Calls: myCalls.map((call) => callToTypedData(call, version)),
    },
  };
}
function buildExecuteFromOutsideCallData(outsideTransaction) {
  const execution2 = outsideTransaction.outsideExecution;
  const formattedSignature = formatSignature(outsideTransaction.signature);
  return CallData.compile({
    outside_execution: execution2,
    signature: formattedSignature,
  });
}
function buildExecuteFromOutsideCall(outsideTransaction) {
  const myOutsideTransactions = Array.isArray(outsideTransaction)
    ? outsideTransaction
    : [outsideTransaction];
  const multiCall = myOutsideTransactions.map((outsideTx) => {
    let entrypoint;
    if (outsideTx.version === OutsideExecutionVersion.V1) {
      entrypoint = 'execute_from_outside';
    } else if (outsideTx.version === OutsideExecutionVersion.V2) {
      entrypoint = 'execute_from_outside_v2';
    } else {
      throw new Error('Unsupported OutsideExecution version');
    }
    return {
      contractAddress: toHex(outsideTx.signerAddress),
      entrypoint,
      calldata: buildExecuteFromOutsideCallData(outsideTx),
    };
  });
  return multiCall;
}

// src/utils/src5.ts
var src5_exports = {};
__export(src5_exports, {
  supportsInterface: () => supportsInterface,
});
async function supportsInterface(provider, contractAddress, interfaceId) {
  const call = {
    contractAddress: toHex(contractAddress),
    entrypoint: 'supports_interface',
    calldata: [toHex(interfaceId)],
  };
  try {
    const resp = await provider.callContract(call);
    return BigInt(resp[0]) !== 0n;
  } catch {
    return false;
  }
}

// src/utils/paymaster.ts
var paymaster_exports = {};
__export(paymaster_exports, {
  assertCallsAreStrictlyEqual: () => assertCallsAreStrictlyEqual,
  assertPaymasterTransactionSafety: () => assertPaymasterTransactionSafety,
  getDefaultPaymasterNodeUrl: () => getDefaultPaymasterNodeUrl,
});
var getDefaultPaymasterNodeUrl = (networkName, mute = false) => {
  if (!mute) {
    logger.info('Using default public node url, please provide nodeUrl in provider options!');
  }
  const nodes = PAYMASTER_RPC_NODES[networkName ?? _NetworkName.SN_SEPOLIA];
  const randIdx = Math.floor(Math.random() * nodes.length);
  return nodes[randIdx];
};
var assertGasFeeFromUnsafeCalls = (unsafeCalls, fees) => {
  const unsafeCall = toOutsideCallV2(unsafeCalls[unsafeCalls.length - 1]);
  const unsafeGasTokenCalldata = CallData.toCalldata(unsafeCall.Calldata);
  const unsafeGasTokenValue = unsafeGasTokenCalldata[1];
  assert(
    BigInt(unsafeGasTokenValue) === BigInt(fees),
    'Gas token value is not equal to the provided gas fees'
  );
};
var assertGasTokenFromUnsafeCalls = (unsafeCalls, gasToken) => {
  const unsafeCall = toOutsideCallV2(unsafeCalls[unsafeCalls.length - 1]);
  assert(
    BigInt(unsafeCall.To) === BigInt(gasToken),
    'Gas token address is not equal to the provided gas token'
  );
};
function assertCallsAreStrictlyEqual(originalCalls, unsafeCalls) {
  const baseError = 'Provided calls are not strictly equal to the returned calls';
  assert(
    unsafeCalls.length - 1 === originalCalls.length,
    `${baseError}: Expected ${originalCalls.length + 1} calls, got ${unsafeCalls.length}`
  );
  for (let callIndex = 0; callIndex < originalCalls.length; callIndex += 1) {
    const originalCall = originalCalls[callIndex];
    const unsafeCall = toOutsideCallV2(unsafeCalls[callIndex]);
    const normalizeAddress = (address) => {
      return toBigInt(address).toString(16).toLowerCase();
    };
    const originalAddress = normalizeAddress(originalCall.contractAddress);
    const unsafeAddress = normalizeAddress(unsafeCall.To);
    assert(
      originalAddress === unsafeAddress,
      `${baseError}: Contract address mismatch at call ${callIndex}. Expected: ${originalCall.contractAddress}, Got: ${unsafeCall.To}`
    );
    assert(
      getSelectorFromName(originalCall.entrypoint) === unsafeCall.Selector,
      `${baseError}: Entrypoint mismatch at call ${callIndex}. Expected: ${originalCall.entrypoint}, Got: ${unsafeCall.Selector}`
    );
    const originalCalldata = CallData.toCalldata(originalCall.calldata);
    const unsafeCalldata = CallData.toCalldata(unsafeCall.Calldata);
    assert(
      originalCalldata.length === unsafeCalldata.length,
      `${baseError}: Calldata length mismatch at call ${callIndex}. Expected length: ${originalCalldata.length}, Got length: ${unsafeCalldata.length}`
    );
    for (let dataIndex = 0; dataIndex < originalCalldata.length; dataIndex += 1) {
      const originalValue = BigInt(originalCalldata[dataIndex]);
      const unsafeValue = BigInt(unsafeCalldata[dataIndex]);
      assert(
        originalValue === unsafeValue,
        `${baseError}: Calldata value mismatch at call ${callIndex}, parameter ${dataIndex}. Expected: ${originalCalldata[dataIndex]}, Got: ${unsafeCalldata[dataIndex]}`
      );
    }
  }
}
var assertPaymasterTransactionSafety = (
  preparedTransaction,
  calls,
  paymasterDetails,
  maxFeeInGasToken
) => {
  if (paymasterDetails.feeMode.mode !== 'sponsored') {
    if (preparedTransaction.type === 'invoke' || preparedTransaction.type === 'deploy_and_invoke') {
      const unsafeCalls =
        'calls' in preparedTransaction.typed_data.message
          ? preparedTransaction.typed_data.message.calls
          : preparedTransaction.typed_data.message.Calls;
      assertCallsAreStrictlyEqual(calls, unsafeCalls);
      assertGasTokenFromUnsafeCalls(unsafeCalls, paymasterDetails.feeMode.gasToken);
      if (maxFeeInGasToken) {
        assert(
          preparedTransaction.fee.suggested_max_fee_in_gas_token <= maxFeeInGasToken,
          'Gas token price is too high'
        );
        assertGasFeeFromUnsafeCalls(
          unsafeCalls,
          preparedTransaction.fee.suggested_max_fee_in_gas_token
        );
      }
    }
  }
};

// src/paymaster/rpc.ts
var convertCalls = (calls) =>
  calls.map((call) => ({
    to: call.contractAddress,
    selector: getSelectorFromName(call.entrypoint),
    calldata: CallData.toHex(call.calldata),
  }));
var convertFeeMode = (feeMode) => {
  if (feeMode.mode === 'sponsored') {
    return { mode: 'sponsored' };
  }
  return { mode: 'default', gas_token: feeMode.gasToken };
};
var convertFEE_MODE = (feeMode) => {
  if (feeMode.mode === 'sponsored') {
    return { mode: 'sponsored' };
  }
  return { mode: 'default', gasToken: feeMode.gas_token };
};
var convertTimeBounds = (timeBounds) =>
  timeBounds
    ? {
        execute_after: timeBounds.executeAfter || 1,
        // If executeAfter is not provided, set it to 1, meaning the transaction can be executed immediately
        execute_before: timeBounds.executeBefore,
      }
    : void 0;
var convertTIME_BOUNDS = (timeBounds) =>
  timeBounds
    ? {
        executeAfter: timeBounds.execute_after,
        executeBefore: timeBounds.execute_before,
      }
    : void 0;
var convertEXECUTION_PARAMETERS = (parameters) => ({
  version: parameters.version,
  feeMode: convertFEE_MODE(parameters.fee_mode),
  timeBounds: convertTIME_BOUNDS(parameters.time_bounds),
});
var defaultOptions = {
  headers: { 'Content-Type': 'application/json' },
};
var PaymasterRpc = class _PaymasterRpc {
  nodeUrl;
  headers;
  baseFetch;
  requestId;
  constructor(options) {
    if (options instanceof _PaymasterRpc) {
      this.nodeUrl = options.nodeUrl;
      this.headers = { ...defaultOptions.headers, ...options.headers };
      this.baseFetch = options.baseFetch;
      this.requestId = options.requestId;
      return;
    }
    if (options && 'nodeUrl' in options && 'headers' in options && 'baseFetch' in options) {
      this.nodeUrl = options.nodeUrl ?? getDefaultPaymasterNodeUrl(void 0);
      this.headers = { ...defaultOptions.headers, ...options.headers };
      this.baseFetch = options.baseFetch ?? fetch_default;
      this.requestId = 0;
      return;
    }
    const { nodeUrl, headers, baseFetch } = options || {};
    if (nodeUrl && Object.values(_NetworkName).includes(nodeUrl)) {
      this.nodeUrl = getDefaultPaymasterNodeUrl(nodeUrl, options?.mute);
    } else if (nodeUrl) {
      this.nodeUrl = nodeUrl;
    } else {
      this.nodeUrl = getDefaultPaymasterNodeUrl(void 0, options?.mute);
    }
    this.baseFetch = baseFetch ?? fetch_default;
    this.headers = { ...defaultOptions.headers, ...headers };
    this.requestId = 0;
  }
  fetch(method, params, id = 0) {
    const rpcRequestBody = {
      id,
      jsonrpc: '2.0',
      method,
      ...(params && { params }),
    };
    return this.baseFetch(this.nodeUrl, {
      method: 'POST',
      body: stringify2(rpcRequestBody),
      headers: this.headers,
    });
  }
  errorHandler(method, params, rpcError, otherError) {
    if (rpcError) {
      throw new RpcError(rpcError, method, params);
    }
    if (otherError instanceof LibraryError) {
      throw otherError;
    }
    if (otherError) {
      throw Error(otherError.message);
    }
  }
  async fetchEndpoint(method, params) {
    try {
      this.requestId += 1;
      const rawResult = await this.fetch(method, params, this.requestId);
      const { error, result } = await rawResult.json();
      this.errorHandler(method, params, error);
      return result;
    } catch (error) {
      this.errorHandler(method, params, error?.response?.data, error);
      throw error;
    }
  }
  async isAvailable() {
    return this.fetchEndpoint('paymaster_isAvailable');
  }
  async buildTransaction(transaction, parameters) {
    let userTransaction;
    switch (transaction.type) {
      case 'invoke':
        userTransaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            calls: convertCalls(transaction.invoke.calls),
          },
        };
        break;
      case 'deploy_and_invoke':
        userTransaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            calls: convertCalls(transaction.invoke.calls),
          },
        };
        break;
      case 'deploy':
      default:
        userTransaction = transaction;
        break;
    }
    const executionParameters = {
      version: parameters.version,
      fee_mode: convertFeeMode(parameters.feeMode),
      time_bounds: convertTimeBounds(parameters.timeBounds),
    };
    const response = await this.fetchEndpoint('paymaster_buildTransaction', {
      transaction: userTransaction,
      parameters: executionParameters,
    });
    const fee = {
      gas_token_price_in_strk: BigInt(response.fee.gas_token_price_in_strk),
      estimated_fee_in_strk: BigInt(response.fee.estimated_fee_in_strk),
      estimated_fee_in_gas_token: BigInt(response.fee.estimated_fee_in_gas_token),
      suggested_max_fee_in_strk: BigInt(response.fee.suggested_max_fee_in_strk),
      suggested_max_fee_in_gas_token: BigInt(response.fee.suggested_max_fee_in_gas_token),
    };
    switch (response.type) {
      case 'invoke':
        return {
          type: 'invoke',
          typed_data: response.typed_data,
          parameters: convertEXECUTION_PARAMETERS(response.parameters),
          fee,
        };
      case 'deploy_and_invoke':
        return {
          type: 'deploy_and_invoke',
          deployment: response.deployment,
          typed_data: response.typed_data,
          parameters: convertEXECUTION_PARAMETERS(response.parameters),
          fee,
        };
      case 'deploy':
      default:
        return {
          type: 'deploy',
          deployment: response.deployment,
          parameters: convertEXECUTION_PARAMETERS(response.parameters),
          fee,
        };
    }
  }
  async executeTransaction(transaction, parameters) {
    let user_transaction;
    switch (transaction.type) {
      case 'invoke':
        user_transaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            typed_data: transaction.invoke.typedData,
            signature: signatureToHexArray(transaction.invoke.signature),
          },
        };
        break;
      case 'deploy_and_invoke':
        user_transaction = {
          ...transaction,
          invoke: {
            user_address: transaction.invoke.userAddress,
            typed_data: transaction.invoke.typedData,
            signature: signatureToHexArray(transaction.invoke.signature),
          },
        };
        break;
      case 'deploy':
      default:
        user_transaction = transaction;
        break;
    }
    const executionParameters = {
      version: parameters.version,
      fee_mode: convertFeeMode(parameters.feeMode),
      time_bounds: convertTimeBounds(parameters.timeBounds),
    };
    return this.fetchEndpoint('paymaster_executeTransaction', {
      transaction: user_transaction,
      parameters: executionParameters,
    });
  }
  async getSupportedTokens() {
    return this.fetchEndpoint('paymaster_getSupportedTokens').then((tokens) =>
      tokens.map((token) => ({
        token_address: token.token_address,
        decimals: token.decimals,
        priceInStrk: BigInt(token.price_in_strk),
      }))
    );
  }
};

// src/paymaster/interface.ts
var PaymasterInterface = class {};

// src/deployer/default.ts
var Deployer = class {
  address;
  entryPoint;
  constructor(address, entryPoint) {
    this.address = address ?? UDC.ADDRESS;
    this.entryPoint = entryPoint ?? UDC.ENTRYPOINT;
  }
  buildDeployerCall(payload, address) {
    const params = [].concat(payload).map((it) => {
      const {
        classHash,
        salt,
        unique = true,
        // not_from_zero on v.2.0.0 but same function. When false v.1 address != v.2 address
        constructorCalldata = [],
        abi,
      } = it;
      const compiledConstructorCallData = getCompiledCalldata(constructorCalldata, () => {
        if (abi) {
          const calldataClass = new CallData(abi);
          const rawArgs = Object.values(constructorCalldata);
          calldataClass.validate(ValidateType.DEPLOY, 'constructor', rawArgs);
          return calldataClass.compile('constructor', rawArgs);
        }
        return CallData.compile(constructorCalldata);
      });
      const deploySalt = salt ?? randomAddress();
      return {
        call: {
          contractAddress: toHex(this.address),
          entrypoint: this.entryPoint,
          calldata: [
            classHash,
            deploySalt,
            toCairoBool(unique),
            compiledConstructorCallData.length,
            ...compiledConstructorCallData,
          ],
        },
        address: calculateContractAddressFromHash(
          unique ? starkCurve.pedersen(address, deploySalt) : deploySalt,
          classHash,
          compiledConstructorCallData,
          unique ? this.address : 0
        ),
      };
    });
    return {
      calls: params.map((it) => it.call),
      addresses: params.map((it) => it.address),
    };
  }
  parseDeployerEvent(txReceipt) {
    if (!txReceipt.events?.length) {
      throw new Error('Deployer emitted event is empty');
    }
    const event = txReceipt.events.find((it) => toHex(it.from_address) === toHex(this.address)) || {
      data: [],
    };
    return {
      transaction_hash: txReceipt.transaction_hash,
      contract_address: event.data[0],
      address: event.data[0],
      deployer: event.data[1],
      unique: event.data[2],
      classHash: event.data[3],
      calldata_len: event.data[4],
      calldata: event.data.slice(5, 5 + parseInt(event.data[4], 16)),
      salt: event.data[event.data.length - 1],
    };
  }
};

// src/deployer/interface.ts
var DeployerInterface = class {};

// src/deployer/index.ts
var defaultDeployer = new Deployer(UDC.ADDRESS, UDC.ENTRYPOINT);
var legacyDeployer = new Deployer(LegacyUDC.ADDRESS, LegacyUDC.ENTRYPOINT);

// src/account/default.ts
var Account = class {
  provider;
  signer;
  address;
  cairoVersion;
  transactionVersion;
  paymaster;
  deployer;
  defaultTipType;
  /** @internal Account-level plugin management */
  accountPluginManager;
  constructor(options) {
    const {
      provider,
      address,
      signer,
      cairoVersion,
      transactionVersion,
      paymaster,
      defaultTipType,
    } = options;
    this.provider = provider instanceof RpcProvider ? provider : new RpcProvider(provider);
    this.address = address.toLowerCase();
    this.signer = isString(signer) || signer instanceof Uint8Array ? new Signer(signer) : signer;
    if (cairoVersion) {
      this.cairoVersion = cairoVersion.toString();
    }
    this.transactionVersion = transactionVersion ?? config.get('transactionVersion');
    this.paymaster = paymaster ? new PaymasterRpc(paymaster) : new PaymasterRpc({ mute: true });
    this.deployer = options.deployer ?? defaultDeployer;
    this.defaultTipType = defaultTipType ?? config.get('defaultTipType');
    this.accountPluginManager = new PluginManager();
    const plugins = options.plugins === false ? [] : (options.plugins ?? defaultPlugins);
    plugins.forEach((plugin) => {
      this.accountPluginManager.installOnAccount(plugin, this);
    });
    logger.debug('Account setup', {
      transactionVersion: this.transactionVersion,
      cairoVersion: this.cairoVersion,
      channel: this.provider.channel.id,
    });
  }
  async getNonce(blockIdentifier) {
    return this.provider.getNonceForAddress(this.address, blockIdentifier);
  }
  async getNonceSafe(nonce) {
    try {
      return toBigInt(nonce ?? (await this.getNonce()));
    } catch (error) {
      return 0n;
    }
  }
  /**
   * Retrieves the Cairo version from the network and sets `cairoVersion` if not already set in the constructor.
   * @param classHash if provided detects Cairo version from classHash, otherwise from the account address
   */
  async getCairoVersion(classHash) {
    if (!this.cairoVersion) {
      const { cairo } = classHash
        ? await this.provider.getContractVersion(void 0, classHash)
        : await this.provider.getContractVersion(this.address);
      this.cairoVersion = cairo;
    }
    return this.cairoVersion;
  }
  // TODO: TT Cairo version is still needed for invoke on existing contracts
  async estimateInvokeFee(calls, details = {}) {
    const invocations = [{ type: api_exports.ETransactionType.INVOKE, payload: [calls].flat() }];
    const estimateBulk = await this.estimateFeeBulk(invocations, details);
    return estimateBulk[0];
  }
  async estimateDeclareFee(payload, details = {}) {
    assert(
      isSierra(payload.contract),
      'Declare fee estimation is not supported for Cairo0 contracts'
    );
    const invocations = [
      {
        type: api_exports.ETransactionType.DECLARE,
        payload: extractContractHashes(payload, await this.provider.channel.getStarknetVersion()),
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, details);
    return estimateBulk[0];
  }
  async estimateAccountDeployFee(
    { classHash, addressSalt = 0, constructorCalldata = [], contractAddress },
    details = {}
  ) {
    const compiledCalldata = CallData.compile(constructorCalldata);
    const contractAddressFinal =
      contractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);
    const invocations = [
      {
        type: api_exports.ETransactionType.DEPLOY_ACCOUNT,
        payload: {
          classHash,
          constructorCalldata: compiledCalldata,
          addressSalt,
          contractAddress: contractAddressFinal,
        },
      },
    ];
    const estimateBulk = await this.estimateFeeBulk(invocations, details);
    return estimateBulk[0];
  }
  async estimateDeployFee(payload, details = {}) {
    const { calls } = this.deployer.buildDeployerCall(payload, this.address);
    return this.estimateInvokeFee(calls, details);
  }
  async estimateFeeBulk(invocations, details = {}) {
    if (!invocations.length) throw TypeError('Invocations should be non-empty array');
    if (details.resourceBounds)
      return [resourceBoundsToEstimateFeeResponse(details.resourceBounds)];
    const { nonce, blockIdentifier, version, skipValidate } = details;
    const detailsWithTip = await this.resolveDetailsWithTip(details);
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      ...v3Details(detailsWithTip),
      versions: [
        toTransactionVersion(
          toFeeVersion(this.transactionVersion) || ETransactionVersion3.F3,
          version
        ),
        // sierra
      ],
      nonce,
      blockIdentifier,
      skipValidate,
    });
    return this.provider.getEstimateFeeBulk(accountInvocations, {
      blockIdentifier,
      skipValidate,
    });
  }
  async simulateTransaction(invocations, details = {}) {
    if (!invocations.length) throw TypeError('Invocations should be non-empty array');
    const {
      nonce,
      blockIdentifier,
      skipValidate = true,
      skipExecute,
      returnInitialReads,
      version: providedVersion,
    } = details;
    const detailsWithTip = await this.resolveDetailsWithTip(details);
    const accountInvocations = await this.accountInvocationsFactory(invocations, {
      ...v3Details(detailsWithTip),
      versions: [this.resolveTransactionVersion(providedVersion)],
      nonce,
      blockIdentifier,
      skipValidate,
    });
    return this.provider.getSimulateTransaction(accountInvocations, {
      blockIdentifier,
      skipValidate,
      skipExecute,
      returnInitialReads,
    });
  }
  /**
   * Shared preparation logic for execute() and buildExecute().
   * Runs hooks, estimates fees, and builds accountInvocations.
   * @private
   */
  async prepareInvoke(transactions, transactionsDetail = {}) {
    const hookResult = this.accountPluginManager.runAccountHook('beforeExecute', {
      calls: transactions,
      details: transactionsDetail,
    });
    const hookedTransactions = hookResult?.calls ?? transactions;
    const hookedDetails = hookResult?.details ?? transactionsDetail;
    const calls = [hookedTransactions].flat();
    const detailsWithTip = await this.resolveDetailsWithTip(hookedDetails);
    const { resourceBounds: providedResourceBounds } = hookedDetails;
    let resourceBounds = providedResourceBounds;
    if (!resourceBounds) {
      const estimateResponse = await this.estimateInvokeFee(calls, detailsWithTip);
      resourceBounds = estimateResponse.resourceBounds;
    }
    const accountInvocations = await this.accountInvocationsFactory(
      [{ type: api_exports.ETransactionType.INVOKE, payload: calls }],
      {
        ...v3Details(detailsWithTip),
        resourceBounds,
        versions: [this.resolveTransactionVersion(hookedDetails.version)],
        nonce: hookedDetails.nonce,
        skipValidate: false,
      }
    );
    return {
      invocation: accountInvocations[0],
      hookedTransactions,
      hookedDetails,
      detailsWithTip,
    };
  }
  async execute(transactions, transactionsDetail = {}) {
    const { invocation, hookedTransactions, hookedDetails, detailsWithTip } =
      await this.prepareInvoke(transactions, transactionsDetail);
    const result = await this.provider.invokeFunction(
      {
        contractAddress: invocation.contractAddress,
        calldata: invocation.calldata,
        signature: invocation.signature,
        ...(hookedDetails.proofFacts && { proofFacts: hookedDetails.proofFacts }),
        ...(hookedDetails.proof && { proof: hookedDetails.proof }),
      },
      {
        ...v3Details(detailsWithTip),
        resourceBounds: invocation.resourceBounds,
        nonce: invocation.nonce,
        version: invocation.version,
      }
    );
    this.accountPluginManager.runAccountHook('afterExecute', {
      calls: hookedTransactions,
      result,
    });
    return result;
  }
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
  async getSignedTransaction(transactions, transactionsDetail = {}) {
    const { invocation, hookedDetails, detailsWithTip } = await this.prepareInvoke(
      transactions,
      transactionsDetail
    );
    return this.provider.channel.buildTransaction(
      {
        type: api_exports.ETransactionType.INVOKE,
        contractAddress: invocation.contractAddress,
        calldata: invocation.calldata,
        signature: invocation.signature,
        ...(hookedDetails.proofFacts && { proofFacts: hookedDetails.proofFacts }),
        ...(hookedDetails.proof && { proof: hookedDetails.proof }),
        ...v3Details(detailsWithTip),
        resourceBounds: invocation.resourceBounds,
        nonce: invocation.nonce,
        version: invocation.version,
      },
      'transaction'
    );
  }
  /**
   * First check if contract is already declared, if not declare it
   * If contract already declared returned transaction_hash is ''.
   * Method will pass even if contract is already declared
   * @param transactionsDetail (optional)
   */
  async declareIfNot(payload, transactionsDetail = {}) {
    const declareContractPayload = extractContractHashes(
      payload,
      await this.provider.channel.getStarknetVersion()
    );
    try {
      await this.provider.getClassByHash(declareContractPayload.classHash);
    } catch (error) {
      return this.declare(payload, transactionsDetail);
    }
    return {
      transaction_hash: '',
      class_hash: declareContractPayload.classHash,
    };
  }
  async declare(payload, details = {}) {
    assert(isSierra(payload.contract), SYSTEM_MESSAGES.declareNonSierra);
    const declareContractPayload = extractContractHashes(
      payload,
      await this.provider.channel.getStarknetVersion()
    );
    const detailsWithTip = await this.resolveDetailsWithTip(details);
    const { resourceBounds: providedResourceBounds } = details;
    let resourceBounds = providedResourceBounds;
    if (!resourceBounds) {
      const estimateResponse = await this.estimateDeclareFee(payload, detailsWithTip);
      resourceBounds = estimateResponse.resourceBounds;
    }
    const accountInvocations = await this.accountInvocationsFactory(
      [{ type: api_exports.ETransactionType.DECLARE, payload: declareContractPayload }],
      {
        ...v3Details(detailsWithTip),
        resourceBounds,
        versions: [this.resolveTransactionVersion(details.version)],
        nonce: details.nonce,
        skipValidate: false,
      }
    );
    const declaration = accountInvocations[0];
    return this.provider.declareContract(
      {
        senderAddress: declaration.senderAddress,
        signature: declaration.signature,
        contract: declaration.contract,
        compiledClassHash: declaration.compiledClassHash,
      },
      {
        ...v3Details(detailsWithTip),
        nonce: declaration.nonce,
        resourceBounds: declaration.resourceBounds,
        version: declaration.version,
      }
    );
  }
  async deploy(payload, details = {}) {
    const { calls, addresses } = this.deployer.buildDeployerCall(payload, this.address);
    const invokeResponse = await this.execute(calls, details);
    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }
  async deployContract(payload, details = {}) {
    const deployTx = await this.deploy(payload, details);
    const txReceipt = await this.provider.waitForTransaction(deployTx.transaction_hash, details);
    return this.deployer.parseDeployerEvent(txReceipt);
  }
  async declareAndDeploy(payload, details = {}) {
    let declare = await this.declareIfNot(payload, details);
    if (declare.transaction_hash !== '') {
      const tx = await this.provider.waitForTransaction(declare.transaction_hash, details);
      declare = { ...declare, ...tx };
    }
    const deploy = await this.deployContract(
      { ...payload, classHash: declare.class_hash },
      details
    );
    return { declare: { ...declare }, deploy };
  }
  deploySelf = this.deployAccount;
  async deployAccount(
    {
      classHash,
      constructorCalldata = [],
      addressSalt = 0,
      contractAddress: providedContractAddress,
    },
    details = {}
  ) {
    const compiledCalldata = CallData.compile(constructorCalldata);
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);
    const detailsWithTip = await this.resolveDetailsWithTip(details);
    const { resourceBounds: providedResourceBounds } = details;
    let resourceBounds = providedResourceBounds;
    if (!resourceBounds) {
      const estimateResponse = await this.estimateAccountDeployFee(
        {
          classHash,
          constructorCalldata,
          addressSalt,
          contractAddress,
        },
        detailsWithTip
      );
      resourceBounds = estimateResponse.resourceBounds;
    }
    const accountInvocations = await this.accountInvocationsFactory(
      [
        {
          type: api_exports.ETransactionType.DEPLOY_ACCOUNT,
          payload: {
            classHash,
            constructorCalldata: compiledCalldata,
            addressSalt,
            contractAddress,
          },
        },
      ],
      {
        ...v3Details(detailsWithTip),
        resourceBounds,
        versions: [this.resolveTransactionVersion(details.version)],
        nonce: ZERO,
        // DEPLOY_ACCOUNT always uses nonce 0
        skipValidate: false,
      }
    );
    const deployment = accountInvocations[0];
    return this.provider.deployAccountContract(
      {
        classHash: deployment.classHash,
        addressSalt: deployment.addressSalt,
        constructorCalldata: deployment.constructorCalldata,
        signature: deployment.signature,
      },
      {
        ...v3Details(detailsWithTip),
        nonce: deployment.nonce,
        resourceBounds: deployment.resourceBounds,
        version: deployment.version,
      }
    );
  }
  async signMessage(typedData) {
    const hookResult = this.accountPluginManager.runAccountHook('beforeSign', { typedData });
    const finalTypedData = hookResult?.typedData ?? typedData;
    const signature = await this.signer.signMessage(finalTypedData, this.address);
    this.accountPluginManager.runAccountHook('afterSign', {
      typedData: finalTypedData,
      signature,
    });
    return signature;
  }
  async hashMessage(typedData) {
    return getMessageHash(typedData, this.address);
  }
  /**
   * Verify if an account is compatible with SNIP-9 outside execution, and with which version of this standard.
   * @returns {OutsideExecutionVersion} Not compatible, V1, V2.
   * @example
   * ```typescript
   * const result = myAccount.getSnip9Version();
   * // result = "V1"
   * ```
   */
  async getSnip9Version() {
    if (await supportsInterface(this.provider, this.address, SNIP9_V2_INTERFACE_ID)) {
      return OutsideExecutionVersion.V2;
    }
    if (await supportsInterface(this.provider, this.address, SNIP9_V1_INTERFACE_ID)) {
      return OutsideExecutionVersion.V1;
    }
    return OutsideExecutionVersion.UNSUPPORTED;
  }
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
  async isValidSnip9Nonce(nonce) {
    try {
      const call = {
        contractAddress: this.address,
        entrypoint: 'is_valid_outside_execution_nonce',
        calldata: [toHex(nonce)],
      };
      const resp = await this.provider.callContract(call);
      return BigInt(resp[0]) !== 0n;
    } catch (error) {
      throw new Error(`Failed to check if nonce is valid: ${error}`);
    }
  }
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
  async getSnip9Nonce() {
    const nonce = randomAddress();
    const isValidNonce = await this.isValidSnip9Nonce(nonce);
    if (!isValidNonce) {
      return this.getSnip9Nonce();
    }
    return nonce;
  }
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
  async getOutsideTransaction(options, calls, version, nonce) {
    if (!isHex(options.caller) && options.caller !== 'ANY_CALLER') {
      throw new Error(`The caller ${options.caller} is not valid.`);
    }
    const codedCaller = isHex(options.caller) ? options.caller : OutsideExecutionCallerAny;
    const myCalls = [calls].flat();
    const supportedVersion = version ?? (await this.getSnip9Version());
    if (!supportedVersion) {
      throw new Error('This account is not handling outside transactions.');
    }
    const myNonce = nonce ? toHex(nonce) : await this.getSnip9Nonce();
    const message = getTypedData(
      await this.provider.getChainId(),
      {
        caller: codedCaller,
        execute_after: options.execute_after,
        execute_before: options.execute_before,
      },
      myNonce,
      myCalls,
      supportedVersion
    );
    const sign = await this.signMessage(message);
    const toExecute = {
      caller: codedCaller,
      nonce: myNonce,
      execute_after: options.execute_after,
      execute_before: options.execute_before,
      calls: myCalls.map(getOutsideCall),
    };
    return {
      outsideExecution: toExecute,
      signature: sign,
      signerAddress: this.address,
      version: supportedVersion,
    };
  }
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
  async executeFromOutside(outsideTransaction, opts) {
    const multiCall = buildExecuteFromOutsideCall(outsideTransaction);
    return this.execute(multiCall, opts);
  }
  /*
   * Support methods
   */
  /**
   * Helper method to resolve details with tip estimation
   * @private
   */
  async resolveDetailsWithTip(details) {
    return {
      ...details,
      tip: details.tip ?? (await this.provider.getEstimateTip())[this.defaultTipType],
    };
  }
  /**
   * Helper method to resolve transaction version
   * @private
   */
  resolveTransactionVersion(providedVersion) {
    return toTransactionVersion(
      this.transactionVersion || ETransactionVersion3.V3,
      providedVersion
    );
  }
  async buildInvocation(call, details) {
    const calldata = getExecuteCalldata(call, await this.getCairoVersion());
    const signature = !details.skipValidate ? await this.signer.signTransaction(call, details) : [];
    return {
      ...v3Details(details),
      contractAddress: this.address,
      calldata,
      signature,
    };
  }
  async buildDeclarePayload(payload, details) {
    const { classHash, contract, compiledClassHash } = extractContractHashes(
      payload,
      await this.provider.channel.getStarknetVersion()
    );
    const compressedCompiledContract = await parseContract(contract);
    assert(
      !isUndefined(compiledClassHash) &&
        (details.version === ETransactionVersion3.F3 ||
          details.version === ETransactionVersion3.V3),
      'V3 Transaction work with Cairo1 Contracts and require compiledClassHash'
    );
    const signature = !details.skipValidate
      ? await this.signer.signDeclareTransaction({
          ...details,
          ...v3Details(details),
          classHash,
          compiledClassHash,
          senderAddress: details.walletAddress,
        })
      : [];
    return {
      senderAddress: details.walletAddress,
      signature,
      contract: compressedCompiledContract,
      compiledClassHash,
    };
  }
  async buildAccountDeployPayload(
    {
      classHash,
      addressSalt = 0,
      constructorCalldata = [],
      contractAddress: providedContractAddress,
    },
    details
  ) {
    const compiledCalldata = CallData.compile(constructorCalldata);
    const contractAddress =
      providedContractAddress ??
      calculateContractAddressFromHash(addressSalt, classHash, compiledCalldata, 0);
    const signature = !details.skipValidate
      ? await this.signer.signDeployAccountTransaction({
          ...details,
          ...v3Details(details),
          classHash,
          contractAddress,
          addressSalt,
          constructorCalldata: compiledCalldata,
        })
      : [];
    return {
      ...v3Details(details),
      classHash,
      addressSalt,
      constructorCalldata: compiledCalldata,
      signature,
    };
  }
  async accountInvocationsFactory(invocations, details) {
    const { nonce, blockIdentifier, skipValidate = true } = details;
    const safeNonce = await this.getNonceSafe(nonce);
    const chainId = await this.provider.getChainId();
    const versions = details.versions.map((it) => toTransactionVersion(it));
    const tx0Payload = 'payload' in invocations[0] ? invocations[0].payload : invocations[0];
    const cairoVersion =
      invocations[0].type === api_exports.ETransactionType.DEPLOY_ACCOUNT
        ? await this.getCairoVersion(tx0Payload.classHash)
        : await this.getCairoVersion();
    return Promise.all(
      [].concat(invocations).map(async (transaction, index) => {
        const txPayload = 'payload' in transaction ? transaction.payload : transaction;
        const signerDetails = {
          ...v3Details(details),
          walletAddress: this.address,
          nonce: toBigInt(Number(safeNonce) + index),
          chainId,
          cairoVersion,
          version: versions[0],
          skipValidate,
        };
        const common = {
          type: transaction.type,
          nonce: toBigInt(Number(safeNonce) + index),
          blockIdentifier,
          version: versions[0],
        };
        if (transaction.type === api_exports.ETransactionType.INVOKE) {
          const payload = await this.buildInvocation([].concat(txPayload), signerDetails);
          return {
            ...common,
            ...payload,
            ...signerDetails,
          };
        }
        if (transaction.type === api_exports.ETransactionType.DEPLOY) {
          const { calls } = this.deployer.buildDeployerCall(txPayload, this.address);
          const payload = await this.buildInvocation(calls, signerDetails);
          return {
            ...common,
            ...payload,
            ...signerDetails,
            type: api_exports.ETransactionType.INVOKE,
          };
        }
        if (transaction.type === api_exports.ETransactionType.DECLARE) {
          assert(
            isSierra(txPayload.contract),
            'Declare fee estimation is not supported for Cairo0 contracts'
          );
          const payload = await this.buildDeclarePayload(txPayload, signerDetails);
          return {
            ...common,
            ...payload,
            ...signerDetails,
          };
        }
        if (transaction.type === api_exports.ETransactionType.DEPLOY_ACCOUNT) {
          const payload = await this.buildAccountDeployPayload(txPayload, signerDetails);
          return {
            ...common,
            ...payload,
            ...signerDetails,
          };
        }
        throw Error(`accountInvocationsFactory: unsupported transaction type: ${transaction}`);
      })
    );
  }
  /*
   * SNIP-29 Paymaster
   */
  async buildPaymasterTransaction(calls, paymasterDetails) {
    if (!paymasterDetails.deploymentData) {
      const snip9Version = await this.getSnip9Version();
      if (snip9Version === OutsideExecutionVersion.UNSUPPORTED) {
        throw Error('Account is not compatible with SNIP-9');
      }
    }
    const parameters = {
      version: '0x1',
      feeMode: paymasterDetails.feeMode,
      timeBounds: paymasterDetails.timeBounds,
    };
    let transaction;
    if (paymasterDetails.deploymentData) {
      if (calls.length > 0) {
        transaction = {
          type: 'deploy_and_invoke',
          invoke: { userAddress: this.address, calls },
          deployment: paymasterDetails.deploymentData,
        };
      } else {
        transaction = {
          type: 'deploy',
          deployment: paymasterDetails.deploymentData,
        };
      }
    } else {
      transaction = {
        type: 'invoke',
        invoke: { userAddress: this.address, calls },
      };
    }
    return this.paymaster.buildTransaction(transaction, parameters);
  }
  async estimatePaymasterTransactionFee(calls, paymasterDetails) {
    const preparedTransaction = await this.buildPaymasterTransaction(calls, paymasterDetails);
    return preparedTransaction.fee;
  }
  async preparePaymasterTransaction(preparedTransaction) {
    let transaction;
    switch (preparedTransaction.type) {
      case 'deploy_and_invoke': {
        const signature = await this.signMessage(preparedTransaction.typed_data);
        transaction = {
          type: 'deploy_and_invoke',
          invoke: {
            userAddress: this.address,
            typedData: preparedTransaction.typed_data,
            signature: signatureToHexArray(signature),
          },
          deployment: preparedTransaction.deployment,
        };
        break;
      }
      case 'invoke': {
        const signature = await this.signMessage(preparedTransaction.typed_data);
        transaction = {
          type: 'invoke',
          invoke: {
            userAddress: this.address,
            typedData: preparedTransaction.typed_data,
            signature: signatureToHexArray(signature),
          },
        };
        break;
      }
      case 'deploy': {
        transaction = {
          type: 'deploy',
          deployment: preparedTransaction.deployment,
        };
        break;
      }
      default:
        throw Error('Invalid transaction type');
    }
    return transaction;
  }
  async executePaymasterTransaction(calls, paymasterDetails, maxFeeInGasToken) {
    const preparedTransaction = await this.buildPaymasterTransaction(calls, paymasterDetails);
    assertPaymasterTransactionSafety(
      preparedTransaction,
      calls,
      paymasterDetails,
      maxFeeInGasToken
    );
    const transaction = await this.preparePaymasterTransaction(preparedTransaction);
    return this.paymaster
      .executeTransaction(transaction, preparedTransaction.parameters)
      .then((response) => ({ transaction_hash: response.transaction_hash }));
  }
};

// src/account/interface.ts
var AccountInterface = class {};

// src/wallet/connect.ts
var connect_exports = {};
__export(connect_exports, {
  addDeclareTransaction: () => addDeclareTransaction,
  addInvokeTransaction: () => addInvokeTransaction,
  addStarknetChain: () => addStarknetChain,
  deploymentData: () => deploymentData,
  getPermissions: () => getPermissions,
  onAccountChange: () => onAccountChange,
  onNetworkChanged: () => onNetworkChanged,
  requestAccounts: () => requestAccounts,
  requestChainId: () => requestChainId,
  signMessage: () => signMessage,
  supportedSpecs: () => supportedSpecs,
  supportedWalletApi: () => supportedWalletApi,
  switchStarknetChain: () => switchStarknetChain,
  watchAsset: () => watchAsset,
});
function requestAccounts(swo, silent_mode = false) {
  return swo.request({
    type: 'wallet_requestAccounts',
    params: { silent_mode },
  });
}
function getPermissions(swo) {
  return swo.request({ type: 'wallet_getPermissions' });
}
function watchAsset(swo, asset) {
  return swo.request({ type: 'wallet_watchAsset', params: asset });
}
function addStarknetChain(swo, chain) {
  return swo.request({ type: 'wallet_addStarknetChain', params: chain });
}
function switchStarknetChain(swo, chainId) {
  return swo.request({
    type: 'wallet_switchStarknetChain',
    params: { chainId },
  });
}
function requestChainId(swo) {
  return swo.request({ type: 'wallet_requestChainId' });
}
function deploymentData(swo) {
  return swo.request({ type: 'wallet_deploymentData' });
}
function addInvokeTransaction(swo, params) {
  return swo.request({ type: 'wallet_addInvokeTransaction', params });
}
function addDeclareTransaction(swo, params) {
  return swo.request({ type: 'wallet_addDeclareTransaction', params });
}
function signMessage(swo, typedData) {
  return swo.request({ type: 'wallet_signTypedData', params: typedData });
}
function supportedSpecs(swo) {
  return swo.request({ type: 'wallet_supportedSpecs' });
}
function supportedWalletApi(swo) {
  return swo.request({ type: 'wallet_supportedWalletApi' });
}
function onAccountChange(swo, callback) {
  swo.on('accountsChanged', callback);
}
function onNetworkChanged(swo, callback) {
  swo.on('networkChanged', callback);
}

// src/wallet/account.ts
var WalletAccount = class _WalletAccount extends Account {
  walletProvider;
  constructor(options) {
    super({ ...options, signer: '' });
    this.walletProvider = options.walletProvider;
    this.walletProvider.on('accountsChanged', (res) => {
      if (!res) return;
      this.address = res[0].toLowerCase();
    });
    this.walletProvider.on('networkChanged', (res) => {
      if (!res) return;
      this.provider.channel.setChainId(res);
    });
  }
  /**
   * WALLET EVENTS
   */
  onAccountChange(callback) {
    onAccountChange(this.walletProvider, callback);
  }
  onNetworkChanged(callback) {
    onNetworkChanged(this.walletProvider, callback);
  }
  /**
   * WALLET SPECIFIC METHODS
   */
  requestAccounts(silentMode = false) {
    return requestAccounts(this.walletProvider, silentMode);
  }
  getPermissions() {
    return getPermissions(this.walletProvider);
  }
  switchStarknetChain(chainId) {
    return switchStarknetChain(this.walletProvider, chainId);
  }
  watchAsset(asset) {
    return watchAsset(this.walletProvider, asset);
  }
  addStarknetChain(chain) {
    return addStarknetChain(this.walletProvider, chain);
  }
  /**
   * ACCOUNT METHODS
   */
  execute(calls) {
    const txCalls = [].concat(calls).map((it) => {
      const { contractAddress, entrypoint, calldata } = it;
      return {
        contract_address: contractAddress,
        entry_point: entrypoint,
        calldata,
      };
    });
    const params = {
      calls: txCalls,
    };
    return addInvokeTransaction(this.walletProvider, params);
  }
  async declare(payload) {
    const declareContractPayload = extractContractHashes(
      payload,
      await this.provider.channel.getStarknetVersion()
    );
    const pContract = payload.contract;
    const cairo1Contract = {
      ...pContract,
      abi: stringify2(pContract.abi),
    };
    if (!declareContractPayload.compiledClassHash) {
      throw Error('compiledClassHash is required');
    }
    const params = {
      compiled_class_hash: declareContractPayload.compiledClassHash,
      contract_class: cairo1Contract,
    };
    return addDeclareTransaction(this.walletProvider, params);
  }
  async deploy(payload) {
    const { calls, addresses } = this.deployer.buildDeployerCall(payload, this.address);
    const invokeResponse = await this.execute(calls);
    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }
  signMessage(typedData) {
    return signMessage(this.walletProvider, typedData);
  }
  static async connect(provider, walletProvider, cairoVersion, paymaster, silentMode = false) {
    const [accountAddress] = await requestAccounts(walletProvider, silentMode);
    return new _WalletAccount({
      provider,
      walletProvider,
      address: accountAddress,
      cairoVersion,
      paymaster,
    });
  }
  static async connectSilent(provider, walletProvider, cairoVersion, paymaster) {
    return _WalletAccount.connect(provider, walletProvider, cairoVersion, paymaster, true);
  }
  // TODO: MISSING ESTIMATES
};

// src/wallet/connectV5.ts
var connectV5_exports = {};
__export(connectV5_exports, {
  addDeclareTransaction: () => addDeclareTransaction2,
  addInvokeTransaction: () => addInvokeTransaction2,
  addStarknetChain: () => addStarknetChain2,
  deploymentData: () => deploymentData2,
  getPermissions: () => getPermissions2,
  requestAccounts: () => requestAccounts2,
  requestChainId: () => requestChainId2,
  signMessage: () => signMessage2,
  standardConnect: () => standardConnect,
  subscribeWalletEvent: () => subscribeWalletEvent,
  supportedSpecs: () => supportedSpecs2,
  supportedWalletApi: () => supportedWalletApi2,
  switchStarknetChain: () => switchStarknetChain2,
  watchAsset: () => watchAsset2,
});
function standardConnect(walletWSF, silent_mode = false) {
  return walletWSF.features['standard:connect'].connect({ silent: silent_mode });
}
function requestAccounts2(walletWSF, silent_mode = false) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_requestAccounts',
    params: { silent_mode },
  });
}
function getPermissions2(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_getPermissions' });
}
function watchAsset2(walletWSF, asset) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_watchAsset',
    params: asset,
  });
}
function addStarknetChain2(walletWSF, chain) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addStarknetChain',
    params: chain,
  });
}
function switchStarknetChain2(walletWSF, chainId) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_switchStarknetChain',
    params: { chainId },
  });
}
function requestChainId2(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_requestChainId' });
}
function deploymentData2(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_deploymentData' });
}
function addInvokeTransaction2(walletWSF, params) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addInvokeTransaction',
    params,
  });
}
function addDeclareTransaction2(walletWSF, params) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addDeclareTransaction',
    params,
  });
}
function signMessage2(walletWSF, typedData) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_signTypedData',
    params: typedData,
  });
}
function supportedSpecs2(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedSpecs' });
}
function supportedWalletApi2(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedWalletApi' });
}
function subscribeWalletEvent(walletWSF, callback) {
  return walletWSF.features['standard:events'].on('change', callback);
}

// src/wallet/accountV5.ts
var WalletAccountV5 = class _WalletAccountV5 extends Account {
  walletProvider;
  /**
   * The function to use to unsubscribe from the wallet events.
   * To call before the instance is deleted.
   */
  unsubscribe;
  /**
   * Unsubscribe functions for the callbacks registered through {@link onChange}.
   * Released by {@link unsubscribeChange}.
   */
  changeSubscriptions = [];
  constructor(options) {
    super({ ...options, signer: '' });
    this.walletProvider = options.walletProvider;
    this.unsubscribe = this.walletProvider.features['standard:events'].on('change', (change) => {
      if (!change.accounts?.length) return;
      if (change.accounts[0].address) this.address = change.accounts[0].address;
      if (change.accounts[0].chains)
        this.provider.channel.setChainId(change.accounts[0].chains[0].slice(9));
    });
  }
  /**
   * WALLET EVENTS
   */
  /**
   * Subscribe a callback to wallet account/network changes.
   * @param {(change: StandardEventsChangeProperties) => void} callback called on each change.
   * @returns {() => void} a function to unsubscribe this specific callback.
   */
  onChange(callback) {
    const unsubscribe = subscribeWalletEvent(this.walletProvider, callback);
    this.changeSubscriptions.push(unsubscribe);
    return unsubscribe;
  }
  /**
   * Unsubscribe from all wallet events, including the callbacks registered through {@link onChange}.
   * To call before the instance is deleted.
   */
  unsubscribeChange() {
    this.unsubscribe();
    this.changeSubscriptions.forEach((unsubscribe) => unsubscribe());
    this.changeSubscriptions = [];
  }
  /**
   * WALLET SPECIFIC METHODS
   */
  requestAccounts(silentMode = false) {
    return requestAccounts2(this.walletProvider, silentMode);
  }
  getPermissions() {
    return getPermissions2(this.walletProvider);
  }
  switchStarknetChain(chainId) {
    return switchStarknetChain2(this.walletProvider, chainId);
  }
  watchAsset(asset) {
    return watchAsset2(this.walletProvider, asset);
  }
  addStarknetChain(chain) {
    return addStarknetChain2(this.walletProvider, chain);
  }
  /**
   * ACCOUNT METHODS
   */
  execute(calls) {
    const txCalls = [].concat(calls).map((it) => {
      const { contractAddress, entrypoint, calldata } = it;
      return {
        contract_address: contractAddress,
        entry_point: entrypoint,
        calldata,
      };
    });
    const params = {
      calls: txCalls,
    };
    return addInvokeTransaction2(this.walletProvider, params);
  }
  declare(payload) {
    const declareContractPayload = extractContractHashes(payload);
    const pContract = payload.contract;
    const cairo1Contract = {
      ...pContract,
      abi: stringify2(pContract.abi),
    };
    if (!declareContractPayload.compiledClassHash) {
      throw Error('compiledClassHash is required');
    }
    const params = {
      compiled_class_hash: declareContractPayload.compiledClassHash,
      contract_class: cairo1Contract,
    };
    return addDeclareTransaction2(this.walletProvider, params);
  }
  async deploy(payload) {
    const { calls, addresses } = defaultDeployer.buildDeployerCall(payload, this.address);
    const invokeResponse = await this.execute(calls);
    return {
      ...invokeResponse,
      contract_address: addresses,
    };
  }
  signMessage(typedData) {
    return signMessage2(this.walletProvider, typedData);
  }
  static async connect(provider, walletProvider, cairoVersion, paymaster, silentMode = false) {
    const { accounts } = await standardConnect(walletProvider, silentMode);
    const accountAddress = accounts[0]?.address;
    return new _WalletAccountV5({
      provider,
      walletProvider,
      address: accountAddress,
      cairoVersion,
      paymaster,
    });
  }
  static async connectSilent(provider, walletProvider, cairoVersion, paymaster) {
    return _WalletAccountV5.connect(provider, walletProvider, cairoVersion, paymaster, true);
  }
  // TODO: MISSING ESTIMATES
};

// src/wallet/adapterV6.ts
function toWalletApiCall(call) {
  return {
    contract_address: call.contractAddress,
    entry_point: call.entrypoint,
    calldata: CallData.toHex(call.calldata),
  };
}
function fromWalletApiCall(call) {
  return {
    contractAddress: call.contract_address,
    entrypoint: call.entry_point,
    calldata: call.calldata ?? [],
  };
}
function toWalletApiActions(actions) {
  return actions.map((action) =>
    action.type === 'subaccount_invoke'
      ? { ...action, calls: action.calls.map(toWalletApiCall) }
      : action
  );
}

// src/wallet/connectV6.ts
var connectV6_exports = {};
__export(connectV6_exports, {
  addDeclareTransaction: () => addDeclareTransaction3,
  addInvokeTransaction: () => addInvokeTransaction3,
  addStarknetChain: () => addStarknetChain3,
  deploymentData: () => deploymentData3,
  getPermissions: () => getPermissions3,
  requestAccounts: () => requestAccounts3,
  requestChainId: () => requestChainId3,
  signMessage: () => signMessage3,
  standardConnect: () => standardConnect2,
  strk20Balances: () => strk20Balances,
  strk20InvokeTransaction: () => strk20InvokeTransaction,
  strk20PrepareInvoke: () => strk20PrepareInvoke,
  strk20SubaccountCommitment: () => strk20SubaccountCommitment,
  subscribeWalletEvent: () => subscribeWalletEvent2,
  supportedSpecs: () => supportedSpecs3,
  supportedWalletApi: () => supportedWalletApi3,
  switchStarknetChain: () => switchStarknetChain3,
  watchAsset: () => watchAsset3,
});
function standardConnect2(walletWSF, silent_mode = false) {
  return walletWSF.features['standard:connect'].connect({ silent: silent_mode });
}
function requestAccounts3(walletWSF, silent_mode = false) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_requestAccounts',
    params: { silent_mode },
  });
}
function getPermissions3(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_getPermissions' });
}
function watchAsset3(walletWSF, asset) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_watchAsset',
    params: asset,
  });
}
function addStarknetChain3(walletWSF, chain) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addStarknetChain',
    params: chain,
  });
}
function switchStarknetChain3(walletWSF, chainId, silent_mode = false) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_switchStarknetChain',
    params: { chainId, silent_mode },
  });
}
function requestChainId3(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_requestChainId' });
}
function deploymentData3(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_deploymentData' });
}
function addInvokeTransaction3(walletWSF, params) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addInvokeTransaction',
    params,
  });
}
function addDeclareTransaction3(walletWSF, params) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_addDeclareTransaction',
    params,
  });
}
function signMessage3(walletWSF, typedData) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_signTypedData',
    params: typedData,
  });
}
function supportedSpecs3(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedSpecs' });
}
function supportedWalletApi3(walletWSF) {
  return walletWSF.features['starknet:walletApi'].request({ type: 'wallet_supportedWalletApi' });
}
function subscribeWalletEvent2(walletWSF, callback) {
  return walletWSF.features['standard:events'].on('change', callback);
}
function strk20Balances(walletWSF, tokens) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20Balances',
    params: { tokens },
  });
}
function strk20PrepareInvoke(walletWSF, actions, simulate) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20PrepareInvoke',
    params: { actions, simulate },
  });
}
function strk20InvokeTransaction(walletWSF, actions) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20InvokeTransaction',
    params: { actions },
  });
}
function strk20SubaccountCommitment(walletWSF, dapp_name, nonce) {
  return walletWSF.features['starknet:walletApi'].request({
    type: 'wallet_strk20SubaccountCommitment',
    params: { dapp_name, nonce },
  });
}

// src/wallet/accountV6.ts
var WalletAccountV6 = class _WalletAccountV6 extends WalletAccountV5 {
  constructor(options) {
    super({ ...options, walletProvider: options.walletProvider });
    this.walletProvider = options.walletProvider;
  }
  get v6Provider() {
    return this.walletProvider;
  }
  switchStarknetChain(chainId, silent_mode = false) {
    return switchStarknetChain3(this.v6Provider, chainId, silent_mode);
  }
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
  executeWithProof(calls, proof) {
    const txCalls = [].concat(calls).map(toWalletApiCall);
    return addInvokeTransaction3(this.v6Provider, { calls: txCalls, proof });
  }
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
  strk20Balances(tokens) {
    return strk20Balances(this.v6Provider, tokens);
  }
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
  async strk20PrepareInvoke(actions, simulate) {
    const { call, proof } = await strk20PrepareInvoke(
      this.v6Provider,
      toWalletApiActions(actions),
      simulate
    );
    return { call: fromWalletApiCall(call), proof };
  }
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
  strk20InvokeTransaction(actions) {
    return strk20InvokeTransaction(this.v6Provider, toWalletApiActions(actions));
  }
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
  strk20SubaccountCommitment(dappName, nonce) {
    return strk20SubaccountCommitment(this.v6Provider, dappName, nonce);
  }
  static async connect(provider, walletProvider, cairoVersion, paymaster, silentMode = false) {
    const { accounts } = await standardConnect2(walletProvider, silentMode);
    const accountAddress = accounts[0]?.address;
    return new _WalletAccountV6({
      provider,
      walletProvider,
      address: accountAddress,
      cairoVersion,
      paymaster,
    });
  }
  static async connectSilent(provider, walletProvider, cairoVersion, paymaster) {
    return _WalletAccountV6.connect(provider, walletProvider, cairoVersion, paymaster, true);
  }
};

// src/utils/events/index.ts
var events_exports = {};
__export(events_exports, {
  addGetByPathMethod: () => addGetByPathMethod,
  filterEventsByAddress: () => filterEventsByAddress,
  getAbiEvents: () => getAbiEvents,
  getEmittedEvents: () => getEmittedEvents,
  isAbiEvent: () => isAbiEvent,
  parseEvents: () => parseEvents,
});
function isAbiEvent(object) {
  return object.type === 'event';
}
function getCairo0AbiEvents(abi) {
  return abi
    .filter((abiEntry) => abiEntry.type === 'event')
    .reduce((acc, abiEntry) => {
      const entryName = abiEntry.name;
      const abiEntryMod = { ...abiEntry };
      abiEntryMod.name = entryName;
      return {
        ...acc,
        [addHexPrefix(starkCurve.keccak(utf8ToArray(entryName)).toString(16))]: abiEntryMod,
      };
    }, {});
}
function getCairo1AbiEvents(abi) {
  const abiEventsStructs = abi.filter((obj) => isAbiEvent(obj) && obj.kind === 'struct');
  const abiEventsEnums = abi.filter((obj) => isAbiEvent(obj) && obj.kind === 'enum');
  const abiEventsData = abiEventsStructs.reduce((acc, event) => {
    let nameList = [];
    let { name } = event;
    let flat = false;
    const findName = (variant) => variant.type === name;
    while (true) {
      const eventEnum = abiEventsEnums.find((eventE) => eventE.variants.some(findName));
      if (isUndefined(eventEnum)) break;
      const variant = eventEnum.variants.find(findName);
      nameList.unshift(variant.name);
      if (variant.kind === 'flat') flat = true;
      name = eventEnum.name;
    }
    if (nameList.length === 0) {
      throw new Error('inconsistency in ABI events definition.');
    }
    if (flat) nameList = [nameList[nameList.length - 1]];
    const final = nameList.pop();
    let result = {
      [addHexPrefix(starkCurve.keccak(utf8ToArray(final)).toString(16))]: event,
    };
    while (nameList.length > 0) {
      result = {
        [addHexPrefix(starkCurve.keccak(utf8ToArray(nameList.pop())).toString(16))]: result,
      };
    }
    result = { ...result };
    return mergeAbiEvents(acc, result);
  }, {});
  return abiEventsData;
}
function getAbiEvents(abi) {
  return isCairo1Abi(abi) ? getCairo1AbiEvents(abi) : getCairo0AbiEvents(abi);
}
function mergeAbiEvents(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeAbiEvents(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
function parseEvents(providerReceivedEvents, abiEvents, abiStructs, abiEnums, parser) {
  const ret = providerReceivedEvents.reduce((acc, recEvent) => {
    const eventKeys = [...recEvent.keys];
    const eventData = [...recEvent.data];
    let abiEvent = abiEvents[eventKeys.shift() ?? 0];
    if (!abiEvent) {
      return acc;
    }
    while (!abiEvent.name) {
      const hashName = eventKeys.shift();
      assert(!!hashName, 'Not enough data in "keys" property of this event.');
      abiEvent = abiEvent[hashName];
    }
    const { from_address: _from, keys: _keys, data: _data, ...eventMetadata } = recEvent;
    const parsedEvent = eventMetadata;
    const eventName = abiEvent.name;
    parsedEvent[eventName] = {};
    const keysIter = eventKeys[Symbol.iterator]();
    const dataIter = eventData[Symbol.iterator]();
    const abiEventKeys = abiEvent.members?.filter((it) => it.kind === 'key') || abiEvent.keys;
    const abiEventData = abiEvent.members?.filter((it) => it.kind === 'data') || abiEvent.data;
    const parsedEventData = parsedEvent[eventName];
    abiEventKeys.forEach((key) => {
      parsedEventData[key.name] = responseParser({
        responseIterator: keysIter,
        output: key,
        structs: abiStructs,
        enums: abiEnums,
        parser,
        parsedResult: parsedEventData,
      });
    });
    abiEventData.forEach((data) => {
      parsedEventData[data.name] = responseParser({
        responseIterator: dataIter,
        output: data,
        structs: abiStructs,
        enums: abiEnums,
        parser,
        parsedResult: parsedEventData,
      });
    });
    acc.push(parsedEvent);
    return acc;
  }, []);
  return ret;
}
function addGetByPathMethod(parsedEvents) {
  Object.defineProperty(parsedEvents, 'getByPath', {
    value: (path) => {
      const event = parsedEvents.find((ev) => Object.keys(ev).some((key) => key.includes(path)));
      const eventKey = Object.keys(event || {}).find((key) => key.includes(path));
      return eventKey && event ? event[eventKey] : null;
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });
  return parsedEvents;
}
function getEmittedEvents(receipt, contractAddress) {
  if (!receipt.events) return [];
  const eventsToEnrich = contractAddress
    ? filterEventsByAddress(receipt.events, contractAddress)
    : receipt.events;
  return eventsToEnrich.map((event) => ({
    ...event,
    transaction_hash: receipt.transaction_hash,
    block_hash: receipt.block_hash,
    block_number: receipt.block_number,
  }));
}
function filterEventsByAddress(events, contractAddress) {
  if (!events) return [];
  return events.filter((event) => toHex(event.from_address) === toHex(contractAddress));
}

// src/contract/default.ts
function buildCall(contract, functionAbi) {
  return async function (...args) {
    const options = { ...contract.withOptionsProps };
    contract.withOptionsProps = void 0;
    return contract.call(functionAbi.name, args, {
      parseRequest: contract.parseRequest,
      parseResponse: contract.parseResponse,
      ...options,
    });
  };
}
function buildInvoke(contract, functionAbi) {
  return async function (...args) {
    const options = { ...contract.withOptionsProps };
    contract.withOptionsProps = void 0;
    return contract.invoke(functionAbi.name, args, {
      parseRequest: contract.parseRequest,
      ...options,
    });
  };
}
function buildDefault(contract, functionAbi) {
  if (functionAbi.stateMutability === 'view' || functionAbi.state_mutability === 'view') {
    return buildCall(contract, functionAbi);
  }
  return buildInvoke(contract, functionAbi);
}
function buildPopulate(contract, functionAbi) {
  return function (...args) {
    return contract.populate(functionAbi.name, args);
  };
}
function buildEstimate(contract, functionAbi) {
  return function (...args) {
    const options = { ...contract.withOptionsProps };
    contract.withOptionsProps = void 0;
    return contract.estimate(functionAbi.name, args, options);
  };
}
var Contract = class _Contract {
  abi;
  address;
  providerOrAccount;
  classHash;
  parseRequest;
  parseResponse;
  defaultProvider;
  structs;
  events;
  functions;
  callStatic;
  populateTransaction;
  estimateFee;
  callData;
  withOptionsProps;
  parsingStrategy;
  /**
   * Get the provider from providerOrAccount
   * @private
   */
  get provider() {
    if (!this.providerOrAccount) {
      throw new Error(
        'Contract is not connected to a provider or account. Provide one during construction or call an async method to auto-initialize.'
      );
    }
    return isAccount(this.providerOrAccount)
      ? this.providerOrAccount.provider
      : this.providerOrAccount;
  }
  /**
   * Lazily initialize and cache the default provider with node version detection
   * @private
   */
  async ensureProvider() {
    if (this.defaultProvider) {
      return this.defaultProvider;
    }
    if (this.providerOrAccount) {
      if (isAccount(this.providerOrAccount)) {
        return this.providerOrAccount.provider;
      }
      return this.providerOrAccount;
    }
    this.defaultProvider = await RpcProvider.create();
    this.providerOrAccount = this.defaultProvider;
    return this.defaultProvider;
  }
  /**
   * @param options
   *  - abi: Abi of the contract object (required)
   *  - address: address to connect to (required)
   *  - providerOrAccount?: Provider or Account to attach to (optional, creates default RpcProvider on first use with auto node detection)
   *  - parseRequest?: compile and validate arguments (optional, default true)
   *  - parseResponse?: Parse elements of the response array and structuring them into response object (optional, default true)
   *  - parser?: Abi parser (optional, default createAbiParser(options.abi))
   */
  constructor(options) {
    this.parsingStrategy = options.parsingStrategy;
    const parser = createAbiParser(options.abi, options.parsingStrategy);
    this.abi = parser.getLegacyFormat();
    this.address = options.address && options.address.toLowerCase();
    this.providerOrAccount = options.providerOrAccount;
    this.parseRequest = options.parseRequest ?? true;
    this.parseResponse = options.parseResponse ?? true;
    this.classHash = options.classHash;
    this.callData = new CallData(options.abi, options.parsingStrategy);
    this.structs = CallData.getAbiStruct(options.abi);
    this.events = getAbiEvents(options.abi);
    const methodTypes = { enumerable: true, value: {}, writable: false };
    Object.defineProperties(this, {
      functions: { enumerable: true, value: {}, writable: false },
      callStatic: { enumerable: true, value: {}, writable: false },
      populateTransaction: { enumerable: true, value: {}, writable: false },
      estimateFee: { enumerable: true, value: {}, writable: false },
    });
    this.abi.forEach((abiElement) => {
      if (abiElement.type !== 'function') return;
      const methodSignature = abiElement.name;
      if (!this[methodSignature]) {
        Object.defineProperty(this, methodSignature, {
          ...methodTypes,
          value: buildDefault(this, abiElement),
        });
      }
      if (!this.functions[methodSignature]) {
        Object.defineProperty(this.functions, methodSignature, {
          ...methodTypes,
          value: buildDefault(this, abiElement),
        });
      }
      if (!this.callStatic[methodSignature]) {
        Object.defineProperty(this.callStatic, methodSignature, {
          ...methodTypes,
          value: buildCall(this, abiElement),
        });
      }
      if (!this.populateTransaction[methodSignature]) {
        Object.defineProperty(this.populateTransaction, methodSignature, {
          ...methodTypes,
          value: buildPopulate(this, abiElement),
        });
      }
      if (!this.estimateFee[methodSignature]) {
        Object.defineProperty(this.estimateFee, methodSignature, {
          ...methodTypes,
          value: buildEstimate(this, abiElement),
        });
      }
    });
  }
  withOptions(options) {
    this.withOptionsProps = options;
    return this;
  }
  attach(address, abi) {
    this.address = address;
    if (abi) {
      const parser = createAbiParser(abi, this.parsingStrategy);
      this.abi = parser.getLegacyFormat();
      this.callData = new CallData(abi, this.parsingStrategy);
      this.structs = CallData.getAbiStruct(abi);
      this.events = getAbiEvents(abi);
    }
  }
  async isDeployed() {
    try {
      const provider = await this.ensureProvider();
      await provider.getClassHashAt(this.address);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Contract not deployed at address ${this.address}: ${errorMessage}`);
    }
    return this;
  }
  async call(
    method,
    args = [],
    {
      parseRequest = true,
      parseResponse = true,
      formatResponse = void 0,
      blockIdentifier = void 0,
    } = {}
  ) {
    assert(this.address !== null, 'contract is not connected to an address');
    const calldata = getCompiledCalldata(args, () => {
      if (parseRequest) {
        this.callData.validate(ValidateType.CALL, method, args);
        return this.callData.compile(method, args);
      }
      logger.warn('Call skipped parsing but provided rawArgs, possible malfunction request');
      return args;
    });
    const provider = await this.ensureProvider();
    return provider
      .callContract(
        {
          contractAddress: this.address,
          calldata,
          entrypoint: method,
        },
        blockIdentifier
      )
      .then((it) => {
        if (!parseResponse) {
          return it;
        }
        if (formatResponse) {
          return this.callData.format(method, it, formatResponse);
        }
        return this.callData.parse(method, it);
      });
  }
  async invoke(method, args = [], options = {}) {
    const { parseRequest = true, signature, waitForTransaction, ...restInvokeOptions } = options;
    assert(this.address !== null, 'contract is not connected to an address');
    const calldata = getCompiledCalldata(args, () => {
      if (parseRequest) {
        this.callData.validate(ValidateType.INVOKE, method, args);
        return this.callData.compile(method, args);
      }
      logger.warn('Invoke skipped parsing but provided rawArgs, possible malfunction request');
      return args;
    });
    const invocation = {
      contractAddress: this.address,
      calldata,
      entrypoint: method,
    };
    await this.ensureProvider();
    if (isAccount(this.providerOrAccount)) {
      if (restInvokeOptions.paymasterDetails) {
        const myCall = {
          contractAddress: this.address,
          entrypoint: method,
          calldata: args,
        };
        return this.providerOrAccount.executePaymasterTransaction(
          [myCall],
          restInvokeOptions.paymasterDetails,
          restInvokeOptions.maxFeeInGasToken
        );
      }
      const result = await this.providerOrAccount.execute(invocation, {
        ...restInvokeOptions,
      });
      if (waitForTransaction) {
        const provider2 = await this.ensureProvider();
        const result2 = await provider2.waitForTransaction(result.transaction_hash);
        if (result2.isSuccess()) {
          return result2;
        }
        throw new Error('Transaction failed', { cause: result2 });
      }
      return result;
    }
    if (!restInvokeOptions.nonce)
      throw new Error(`Manual nonce is required when invoking a function without an account`);
    logger.warn(`Invoking ${method} without an account.`);
    const provider = await this.ensureProvider();
    return provider.invokeFunction(
      {
        ...invocation,
        signature,
      },
      {
        ...restInvokeOptions,
        nonce: restInvokeOptions.nonce,
      }
    );
  }
  async estimate(method, args = [], estimateDetails = {}) {
    assert(this.address !== null, 'contract is not connected to an address');
    if (!getCompiledCalldata(args, () => false)) {
      this.callData.validate(ValidateType.INVOKE, method, args);
    }
    const invocation = this.populate(method, args);
    await this.ensureProvider();
    if (isAccount(this.providerOrAccount)) {
      if (estimateDetails.paymasterDetails) {
        const myCall = {
          contractAddress: this.address,
          entrypoint: method,
          calldata: args,
        };
        return this.providerOrAccount.estimatePaymasterTransactionFee(
          [myCall],
          estimateDetails.paymasterDetails
        );
      }
      return this.providerOrAccount.estimateInvokeFee(invocation, estimateDetails);
    }
    throw Error('Contract must be connected to the account contract to estimate');
  }
  compile(method, args = []) {
    return getCompiledCalldata(args, () => this.callData.compile(method, args));
  }
  populate(method, args = []) {
    return {
      contractAddress: this.address,
      entrypoint: method,
      calldata: this.compile(method, args),
    };
  }
  parseEvents(receipt) {
    if (!receipt.isSuccess()) {
      throw Error('This transaction was not successful.');
    }
    return addGetByPathMethod(
      parseEvents(
        getEmittedEvents(receipt.value, this.address),
        this.events,
        this.structs,
        CallData.getAbiEnum(this.abi),
        this.callData.parser
      )
    );
  }
  isCairo1() {
    return cairo_exports.isCairo1Abi(this.abi);
  }
  async getVersion() {
    const provider = await this.ensureProvider();
    return provider.getContractVersion(this.address);
  }
  typedv2(tAbi) {
    return this;
  }
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
  static async factory(params, details = {}) {
    const { account, parseRequest = true } = params;
    let abi;
    let classHash;
    let contract_address;
    if ('classHash' in params && params.classHash && !('contract' in params)) {
      const deployParams = params;
      classHash = deployParams.classHash.toString();
      if (!deployParams.abi) {
        const contractClass = await account.provider.getClass(classHash);
        abi = contractClass.abi;
      } else {
        abi = deployParams.abi;
      }
      const deployResult = await account.deployContract(
        {
          classHash,
          constructorCalldata: deployParams.constructorCalldata,
          salt: deployParams.salt,
          unique: deployParams.unique,
          abi: parseRequest ? abi : void 0,
        },
        details
      );
      contract_address = deployResult.contract_address;
    } else {
      const declareParams = params;
      const contract = await parseContract(declareParams.contract);
      abi = declareParams.abi ? declareParams.abi : extractAbi(contract);
      const {
        declare: { class_hash },
        deploy: { contract_address: deployed_address },
      } = await account.declareAndDeploy(
        {
          ...declareParams,
          abi: parseRequest ? abi : void 0,
        },
        details
      );
      classHash = class_hash.toString();
      contract_address = deployed_address;
    }
    assert(Boolean(contract_address), 'Deployment of the contract failed');
    return new _Contract({
      abi,
      address: contract_address,
      providerOrAccount: account,
      classHash,
      parseRequest: params.parseRequest,
      parseResponse: params.parseResponse,
      parsingStrategy: params.parsingStrategy,
    });
  }
};

// src/contract/interface.ts
var ContractInterface = class {
  /**
   * Contract methods that return promises (async operations)
   */
  functions;
  /**
   * Contract methods for read-only calls (state queries)
   */
  callStatic;
  /**
   * Contract methods that return populated transactions for batching
   */
  populateTransaction;
  /**
   * Contract methods for fee estimation
   */
  estimateFee;
};

// src/utils/units.ts
function units(amount, simbol = 'fri') {
  if (simbol === 'strk') {
    let numStr = '';
    if (isBigInt(amount)) numStr = amount.toString();
    else if (isString(amount)) {
      if (isHex(amount)) {
        numStr = BigInt(amount).toString();
      } else {
        numStr = amount;
      }
    }
    const [integer, decimal = '0'] = numStr.split('.');
    const pdec = decimal.padEnd(18, '0');
    return `${integer}${pdec}`.replace(/\b0+/g, '');
  }
  const bis = BigInt(amount).toString();
  let strk;
  if (bis.length <= 18) {
    strk = `0.${bis.padStart(18, '0')}`;
  } else {
    strk = `${bis.slice(0, bis.length - 18)}.${bis.slice(bis.length - 18)}`;
  }
  return strk.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1');
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    AbiParser1,
    AbiParser2,
    AbiParserInterface,
    Account,
    AccountInterface,
    BatchClient,
    BlockStatus,
    BlockTag,
    BrotherIdImpl,
    CairoByteArray,
    CairoBytes31,
    CairoCustomEnum,
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
    CallData,
    Contract,
    ContractInterface,
    Deployer,
    DeployerInterface,
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
    EntryPointType,
    EthSigner,
    Int,
    LedgerSigner,
    LedgerSigner111,
    LedgerSigner221,
    LedgerSigner231,
    LibraryError,
    Literal,
    LogLevelIndex,
    NON_ZERO_PREFIX,
    OutsideExecutionTypesV1,
    OutsideExecutionTypesV2,
    OutsideExecutionVersion,
    PaymasterInterface,
    PaymasterRpc,
    PluginManager,
    Provider,
    ProviderInterface,
    RPC,
    RPC0102,
    RPC0103,
    RPC09,
    RPCResponseParser,
    ReceiptTx,
    ResponseParser,
    RpcChannel,
    RpcError,
    RpcProvider,
    Signer,
    SignerInterface,
    StarknetIdImpl,
    Subscription,
    TimeoutError,
    TransactionExecutionStatus,
    TransactionFinalityStatus,
    TransactionType,
    TypedDataRevision,
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
    ValidateType,
    WalletAccount,
    WalletAccountV5,
    WalletAccountV6,
    WebSocketChannel,
    WebSocketNotConnectedError,
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
    events,
    extractContractHashes,
    fastExecute,
    fastParsingStrategy,
    getAbiVersion,
    getChecksumAddress,
    getGasPrices,
    getLedgerPathBuffer,
    getLedgerPathBuffer111,
    getLedgerPathBuffer221,
    getTipStatsFromBlocks,
    hash,
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
    stark,
    starknetId,
    toAnyPatchVersion,
    toApiVersion,
    transaction,
    typedData,
    uint256,
    units,
    v2hash,
    v3hash,
    validateAndParseAddress,
    validateChecksumAddress,
    verifyMessageInStarknet,
    wallet,
    walletV5,
    walletV6,
  });
//# sourceMappingURL=index.js.map

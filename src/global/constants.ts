/* eslint-disable no-underscore-dangle */
import type { ResourceBoundsOverhead } from '../types';
import { ETransactionVersion } from '../types/api';
import { ValuesType } from '../types/helpers/valuesType';
import type { LogLevel } from './logger.type';
import type { TipEstimate } from '../utils/modules/tip';

export { IS_BROWSER } from '../utils/encode';

/**
 * Cairo Felt support storing max 31 character
 */
export const TEXT_TO_FELT_MAX_LEN = 31;
export const ZERO = 0n;
export const MASK_250 = 2n ** 250n - 1n; // 2 ** 250 - 1
export const MASK_31 = 2n ** 31n - 1n; // 2 ** 31 - 1
export const API_VERSION = ZERO;
export const PRIME = 2n ** 251n + 17n * 2n ** 192n + 1n;

// based on: https://github.com/starkware-libs/cairo-lang/blob/v0.12.3/src/starkware/starknet/common/storage.cairo#L3
export const MAX_STORAGE_ITEM_SIZE = 256n;
export const ADDR_BOUND = 2n ** 251n - MAX_STORAGE_ITEM_SIZE;

const range = (min: bigint, max: bigint) => ({ min, max }) as const;

export const RANGE_FELT = range(ZERO, PRIME - 1n);
export const RANGE_I128 = range(-(2n ** 127n), 2n ** 127n - 1n);
export const RANGE_U128 = range(ZERO, 2n ** 128n - 1n);

export const UDC = {
  ADDRESS: '0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf',
  ENTRYPOINT: 'deployContract',
} as const;

export const OutsideExecutionCallerAny = '0x414e595f43414c4c4552'; // encodeShortString('ANY_CALLER')
export const SNIP9_V1_INTERFACE_ID =
  '0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181';
export const SNIP9_V2_INTERFACE_ID =
  '0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872';

// Ledger signer
// 0x80
export const HARDENING_BYTE = 128;
// 0x80000000
export const HARDENING_4BYTES = 2147483648n;

// NOTE: the enum alias exports are made so both the 'const' and 'type' are reachable in the published '.d.ts' file,
// otherwise the last export hides the preceding export with the same name in this file
const _BaseUrl = {
  SN_MAIN: 'https://alpha-mainnet.starknet.io',
  SN_SEPOLIA: 'https://alpha-sepolia.starknet.io',
} as const;
type _BaseUrl = ValuesType<typeof _BaseUrl>;
export { _BaseUrl as BaseUrl };

const _NetworkName = {
  SN_MAIN: 'SN_MAIN',
  SN_SEPOLIA: 'SN_SEPOLIA',
} as const;
type _NetworkName = ValuesType<typeof _NetworkName>;
export { _NetworkName as NetworkName };

const _StarknetChainId = {
  SN_MAIN: '0x534e5f4d41494e', // encodeShortString('SN_MAIN'),
  SN_SEPOLIA: '0x534e5f5345504f4c4941', // encodeShortString('SN_SEPOLIA')
} as const;
type _StarknetChainId = ValuesType<typeof _StarknetChainId>;
export { _StarknetChainId as StarknetChainId };

const _TransactionHashPrefix = {
  DECLARE: '0x6465636c617265', // encodeShortString('declare'),
  DEPLOY: '0x6465706c6f79', // encodeShortString('deploy'),
  DEPLOY_ACCOUNT: '0x6465706c6f795f6163636f756e74', // encodeShortString('deploy_account'),
  INVOKE: '0x696e766f6b65', // encodeShortString('invoke'),
  L1_HANDLER: '0x6c315f68616e646c6572', // encodeShortString('l1_handler'),
} as const;
type _TransactionHashPrefix = ValuesType<typeof _TransactionHashPrefix>;
export { _TransactionHashPrefix as TransactionHashPrefix };

/**
 * dot format rpc versions
 */
const _SupportedRpcVersion = {
  '0.8.1': '0.8.1',
  '0.9.0': '0.9.0',
  v0_8_1: '0.8.1',
  v0_9_0: '0.9.0',
} as const;
type _SupportedRpcVersion = ValuesType<typeof _SupportedRpcVersion>;
export { _SupportedRpcVersion as SupportedRpcVersion };

export type SupportedTransactionVersion = typeof ETransactionVersion.V3;
export type SupportedCairoVersion = '1';

// Default initial global config
export const DEFAULT_GLOBAL_CONFIG: {
  logLevel: LogLevel;
  rpcVersion: _SupportedRpcVersion;
  transactionVersion: SupportedTransactionVersion;
  resourceBoundsOverhead: ResourceBoundsOverhead;
  defaultTipType: Exclude<keyof TipEstimate, 'metrics'>;
  fetch: any;
  websocket: any;
} = {
  rpcVersion: '0.9.0',
  transactionVersion: ETransactionVersion.V3, // Starknet 0.14.0 only V3 transactions
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
  fetch: undefined,
  websocket: undefined,
};

export const RPC_DEFAULT_NODES = {
  SN_MAIN: [`https://starknet-mainnet.public.blastapi.io/rpc/`],
  SN_SEPOLIA: [`https://starknet-sepolia.public.blastapi.io/rpc/`],
} as const;

export const PAYMASTER_RPC_NODES = {
  SN_MAIN: [`https://starknet.paymaster.avnu.fi`],
  SN_SEPOLIA: [`https://sepolia.paymaster.avnu.fi`],
} as const;

// Default system messages
export const SYSTEM_MESSAGES = {
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
};

import type { FeeMarginPercentage } from '../types';
import { ETransactionVersion, RPCSPEC08 } from '../types/api';
import type { LogLevel } from './logger.type';

export { IS_BROWSER } from '../utils/encode';

/**
 * Cairo Felt support storing max 31 character
 */
export const TEXT_TO_FELT_MAX_LEN = 31;

/**
 * Alternatively use directly from api specification
 * types.RPC.ETransactionVersion
 * For BN do BigInt(TRANSACTION_VERSION.*)
 */
export const { ETransactionVersion: TRANSACTION_VERSION } = RPCSPEC08;

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

export enum BaseUrl {
  SN_MAIN = 'https://alpha-mainnet.starknet.io',
  SN_SEPOLIA = 'https://alpha-sepolia.starknet.io',
}

export enum NetworkName {
  SN_MAIN = 'SN_MAIN',
  SN_SEPOLIA = 'SN_SEPOLIA',
}

export enum StarknetChainId {
  SN_MAIN = '0x534e5f4d41494e', // encodeShortString('SN_MAIN'),
  SN_SEPOLIA = '0x534e5f5345504f4c4941', // encodeShortString('SN_SEPOLIA')
}

export enum TransactionHashPrefix {
  DECLARE = '0x6465636c617265', // encodeShortString('declare'),
  DEPLOY = '0x6465706c6f79', // encodeShortString('deploy'),
  DEPLOY_ACCOUNT = '0x6465706c6f795f6163636f756e74', // encodeShortString('deploy_account'),
  INVOKE = '0x696e766f6b65', // encodeShortString('invoke'),
  L1_HANDLER = '0x6c315f68616e646c6572', // encodeShortString('l1_handler'),
}

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

/**
 * dot formate rpc versions
 */
export const SupportedRpcVersion = {
  0.7: '0.7',
  0.8: '0.8',
} as const;
export type SupportedRpcVersion = (typeof SupportedRpcVersion)[keyof typeof SupportedRpcVersion];

export type SupportedTransactionVersion =
  | typeof ETransactionVersion.V2
  | typeof ETransactionVersion.V3;

// Default initial global config
export const DEFAULT_GLOBAL_CONFIG: {
  legacyMode: boolean;
  logLevel: LogLevel;
  rpcVersion: SupportedRpcVersion;
  transactionVersion: SupportedTransactionVersion;
  feeMarginPercentage: FeeMarginPercentage;
} = {
  legacyMode: false,
  rpcVersion: '0.8',
  transactionVersion: ETransactionVersion.V3,
  logLevel: 'INFO',
  feeMarginPercentage: {
    bounds: {
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
    maxFee: 50,
  },
};

const vToUrl = (versionString: SupportedRpcVersion) =>
  `v${versionString.replace(/^v/, '').replace(/\./g, '_')}`;

export const RPC_NODES = {
  SN_MAIN: [
    `https://starknet-mainnet.public.blastapi.io/rpc/${vToUrl(DEFAULT_GLOBAL_CONFIG.rpcVersion)}`,
    `https://free-rpc.nethermind.io/mainnet-juno/${vToUrl(DEFAULT_GLOBAL_CONFIG.rpcVersion)}`,
  ],
  SN_SEPOLIA: [
    `https://starknet-sepolia.public.blastapi.io/rpc/${vToUrl(DEFAULT_GLOBAL_CONFIG.rpcVersion)}`,
    `https://free-rpc.nethermind.io/sepolia-juno/${vToUrl(DEFAULT_GLOBAL_CONFIG.rpcVersion)}`,
  ],
} as const;

// Default system messages
export const SYSTEM_MESSAGES = {
  legacyTxWarningMessage:
    'You are using a deprecated transaction version (V0,V1,V2)!\nUpdate to the latest V3 transactions!',
  legacyTxRPC08Message: 'RPC 0.8 do not support legacy transactions',
  SWOldV3: 'RPC 0.7 V3 tx (improper resource bounds) not supported in RPC 0.8',
};

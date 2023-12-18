export { IS_BROWSER } from './utils/encode';

/**
 * Cairo Felt support storing max 31 character
 */
export const TEXT_TO_FELT_MAX_LEN = 31;

export const HEX_STR_TRANSACTION_VERSION_1 = '0x1';
export const HEX_STR_TRANSACTION_VERSION_2 = '0x2';
export const BN_TRANSACTION_VERSION_1 = 1n;
export const BN_TRANSACTION_VERSION_2 = 2n;
export const BN_FEE_TRANSACTION_VERSION_1 = 2n ** 128n + BN_TRANSACTION_VERSION_1;
export const BN_FEE_TRANSACTION_VERSION_2 = 2n ** 128n + BN_TRANSACTION_VERSION_2;

export const ZERO = 0n;
export const MASK_250 = 2n ** 250n - 1n; // 2 ** 250 - 1
export const API_VERSION = ZERO;

// based on: https://github.com/starkware-libs/cairo-lang/blob/v0.12.3/src/starkware/starknet/common/storage.cairo#L3
export const MAX_STORAGE_ITEM_SIZE = 256n;
export const ADDR_BOUND = 2n ** 251n - MAX_STORAGE_ITEM_SIZE;

export enum BaseUrl {
  SN_MAIN = 'https://alpha-mainnet.starknet.io',
  SN_GOERLI = 'https://alpha4.starknet.io',
  SN_SEPOLIA = 'https://alpha-sepolia.starknet.io',
}

export enum NetworkName {
  SN_MAIN = 'SN_MAIN',
  SN_GOERLI = 'SN_GOERLI',
  SN_SEPOLIA = 'SN_SEPOLIA',
}

export enum StarknetChainId {
  SN_MAIN = '0x534e5f4d41494e', // encodeShortString('SN_MAIN'),
  SN_GOERLI = '0x534e5f474f45524c49', // encodeShortString('SN_GOERLI')
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
};

export const RPC_DEFAULT_VERSION = 'v0_5';

export const RPC_NODES = {
  SN_GOERLI: [
    `https://starknet-testnet.public.blastapi.io/rpc/`,
    `https://free-rpc.nethermind.io/goerli-juno/`,
  ],
  SN_MAIN: [
    `https://starknet-mainnet.public.blastapi.io/rpc/`,
    `https://free-rpc.nethermind.io/mainnet-juno/`,
  ],
  SN_SEPOLIA: [
    `https://starknet-sepolia.public.blastapi.io/rpc/`,
    `https://free-rpc.nethermind.io/sepolia-juno/`,
  ],
};

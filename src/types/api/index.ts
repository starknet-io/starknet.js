export * as JRPC from './jsonrpc';

export * as RPCSPEC07 from '@starknet-io/starknet-types-07';
export * as RPCSPEC08 from '@starknet-io/starknet-types-08';
export * as RPCSPEC09 from '@starknet-io/starknet-types-09';
export { PAYMASTER_API } from '@starknet-io/starknet-types-08';

export * from '@starknet-io/starknet-types-08';
// TODO: Should this be default export type as RPCSPEC07 & RPCSPEC08 are sued only in channel rest of the code do not know what rpc version it works with and it can be both.
// export * from '../../provider/types/spec.type';

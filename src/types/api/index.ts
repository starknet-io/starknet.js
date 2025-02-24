export * as JRPC from './jsonrpc';

export * as RPCSPEC07 from 'starknet-types-07';
export * as RPCSPEC08 from 'starknet-types-08';

export * from 'starknet-types-08';

export * as MERGE from './merge'; // TODO: Should this be default export type as RPCSPEC07 & RPCSPEC08 are sued only in channel rest of the code do not know what rpc version it works with and it can be both.

export * as JRPC from './jsonrpc';

export * as RPCSPEC09 from '@starknet-io/starknet-types-09';
export * as RPCSPEC0104 from '@starknet-io/starknet-types-0104';

export { PAYMASTER_API } from '@starknet-io/starknet-types-0104';

// Default export
// alias for "export * from '@starknet-io/starknet-types-0104';" which is done within ./rpc.ts
// the extra level avoids a rollup issue that injects namespace merger JS code into the published .d.ts file
//
// eslint-disable-next-line
export * from './rpc';

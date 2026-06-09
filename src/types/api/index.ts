export * as JRPC from './jsonrpc';

export * as RPCSPEC09 from '@starknet-io/starknet-types-09';
export * as RPCSPEC0103 from '@starknet-io/starknet-types-0103';

export { PAYMASTER_API } from '@starknet-io/starknet-types-0103';

// Default export
// alias for "export * from '@starknet-io/starknet-types-09';" which is done within ./rpc.ts
// the extra level avoids a rollup issue that injects namespace merger JS code into the published .d.ts file
//
// eslint-disable-next-line
export * from './rpc';

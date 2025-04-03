// Processes the RPC specification error types and logs the output to simplify the generation
// of an error aggregating TS type and error code mapping object. Currently used in:
// - src/types/errors.ts
// - src/utils/errors/rpc.ts

const starknet_api_openrpc = require('starknet_specs/api/starknet_api_openrpc.json');
const starknet_executables = require('starknet_specs/api/starknet_executables.json');
const starknet_trace_api_openrpc = require('starknet_specs/api/starknet_trace_api_openrpc.json');
const starknet_write_api = require('starknet_specs/api/starknet_write_api.json');
const starknet_ws_api = require('starknet_specs/api/starknet_ws_api.json');

const extractErrors = (api) => api?.components?.errors || {}; 

const errorNameCodeMap = Object.fromEntries(
  [
    ...Object.entries(extractErrors(starknet_api_openrpc)),
    ...Object.entries(extractErrors(starknet_executables)),
    ...Object.entries(extractErrors(starknet_trace_api_openrpc)),
    ...Object.entries(extractErrors(starknet_write_api)),
    ...Object.entries(extractErrors(starknet_ws_api)),
  ]
    .filter(([_, value]) => value?.code !== undefined)
    .map(([key, value]) => [key, value.code])
    .sort((a, b) => a[1] - b[1])
);

console.log('errorCodes:');
console.log(errorNameCodeMap);
console.log();
console.log('errorTypes:');
Object.keys(errorNameCodeMap).forEach((n) => console.log(`${n}: Errors.${n};`));

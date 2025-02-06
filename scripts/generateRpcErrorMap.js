// Processes the RPC specification error types and logs the output to simplify the generation
// of an error aggregating TS type and error code mapping object. Currently used in:
// - src/types/errors.ts
// - src/utils/errors/rpc.ts

const starknet_api_openrpc = require('starknet_specs/api/starknet_api_openrpc.json');
const starknet_trace_api_openrpc = require('starknet_specs/api/starknet_trace_api_openrpc.json');
const starknet_write_api = require('starknet_specs/api/starknet_write_api.json');

const errorNameCodeMap = Object.fromEntries(
  Object.entries({
    ...starknet_trace_api_openrpc.components.errors,
    ...starknet_write_api.components.errors,
    ...starknet_api_openrpc.components.errors,
  })
    .map((e) => [e[0], e[1].code])
    .sort((a, b) => a[1] - b[1])
);

console.log('errorCodes:');
console.log(errorNameCodeMap);
console.log();
console.log('errorTypes:');
Object.keys(errorNameCodeMap).forEach((n) => console.log(`${n}: Errors.${n};`));

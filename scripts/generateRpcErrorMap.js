// errorProcessor.js

/**
 * @file Processes the Starknet RPC specification error types from various
 * OpenRPC files. This script generates a sorted error code mapping object
 * and a list of TypeScript type definitions, simplifying the aggregation
 * and generation of centralized error handling utilities.
 */

// --- Dependencies: Starknet RPC Specifications ---
const specFiles = [
    'starknet_api_openrpc',
    'starknet_executables',
    'starknet_trace_api_openrpc',
    'starknet_write_api',
    'starknet_ws_api',
].map((file) => require(`starknet_specs/api/${file}.json`));

// --- Core Processing Logic ---

// Combine all 'components.errors' from all spec files into a single object.
const combinedErrors = specFiles.reduce((acc, spec) => {
    return { ...acc, ...spec.components.errors };
}, {});

// Map the error names to their respective codes, then sort the entries
// based on the error code (ascending numerical order).
const errorNameCodeMap = Object.entries(combinedErrors)
    .map(([name, definition]) => [name, definition.code])
    .sort((a, b) => a[1] - b[1]);

// Convert the sorted array of [name, code] pairs back into an object.
const errorCodesMap = Object.fromEntries(errorNameCodeMap);

// --- Output Generation ---

console.log('// Generated error code map object (JSON format)');
console.log('errorCodes:');
console.log(errorCodesMap);
console.log();

console.log('// Generated TypeScript union type members');
console.log('errorTypes:');
Object.keys(errorCodesMap).forEach((name) => {
    // Note: Assuming 'Errors' is the imported module or namespace where the actual
    // error classes/types are defined in the target TypeScript file.
    console.log(`${name}: Errors.${name};`);
});

// To generate a final string of the sorted error codes (e.g., for direct inclusion in a TS file):
// const errorCodesString = JSON.stringify(errorCodesMap, null, 2);

// Processes the RPC specification error types and logs the output to simplify the generation
// of an error aggregating TS type and error code mapping object.

// --- Configuration: List of all StarkNet RPC specification files ---
const SPEC_FILES = [
    'starknet_api_openrpc.json',
    'starknet_executables.json',
    'starknet_trace_api_openrpc.json',
    'starknet_write_api.json',
    'starknet_ws_api.json',
];

// --- Core Logic ---

// Aggregates errors from all specification files into a single map (Name -> Code).
function aggregateErrorMap() {
    const errorMap = {};
    const specsPath = 'starknet_specs/api/';

    for (const file of SPEC_FILES) {
        let spec;
        try {
            // Use dynamic require path.
            spec = require(`${specsPath}${file}`);
        } catch (e) {
            console.error(`ERROR: Failed to load or parse specification file: ${file}`);
            console.error(e);
            continue;
        }

        // Defensive check for the expected OpenRPC structure.
        const errors = spec?.components?.errors;
        if (!errors) {
            console.warn(`WARN: File ${file} does not contain 'components.errors'. Skipping.`);
            continue;
        }

        // Iterate through errors in the current spec file.
        for (const [errorName, errorDef] of Object.entries(errors)) {
            const errorCode = errorDef?.code;

            if (errorMap[errorName] !== undefined && errorMap[errorName] !== errorCode) {
                // IMPORTANT: Conflict check - report if the same error name has a different code.
                console.warn(`WARN: Error name conflict detected for '${errorName}'. 
Code changed from ${errorMap[errorName]} to ${errorCode} by file ${file}.`);
            }
            
            if (errorCode !== undefined) {
                // Store the error name and code (last one wins in case of conflict).
                errorMap[errorName] = errorCode;
            }
        }
    }
    return errorMap;
}

const rawErrorMap = aggregateErrorMap();

// 1. Convert the map to entries and sort by code numerically.
const sortedErrorEntries = Object.entries(rawErrorMap)
    .sort((a, b) => a[1] - b[1]);

// 2. Re-create the object to guarantee sorted insertion order (supported by modern JS).
const errorNameCodeMap = Object.fromEntries(sortedErrorEntries);

console.log('--- RPC Error Code Mapping (Name -> Code) ---');
console.log('errorCodes:');
console.log(errorNameCodeMap);
console.log();

console.log('--- TypeScript Type Definitions (Name: Errors.Name;) ---');
console.log('errorTypes:');
Object.keys(errorNameCodeMap).forEach((n) => {
    // Generates output suitable for creating an aggregation type.
    console.log(`  ${n}: Errors.${n};`);
});

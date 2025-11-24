// Optimized processing script for StarkNet RPC error specifications.
// This script aggregates error codes and names from multiple OpenRPC files
// to simplify the generation of error-related code artifacts.

import { readdirSync } from 'node:fs';
import { join } from 'node:path';

// Define the base path for RPC specifications
const SPECS_DIR = 'starknet_specs/api/';

// 1. Aggregate all relevant spec files dynamically
// We dynamically load all JSON files that contain error components.
const specFiles = readdirSync(SPECS_DIR)
    .filter(file => file.endsWith('_openrpc.json') || file.endsWith('.json'))
    .map(file => join(SPECS_DIR, file));

// 2. Load and merge error definitions from all specification files
let mergedErrors = {};

for (const filePath of specFiles) {
    try {
        // Use dynamic import for ESM environment
        const spec = require(`./${filePath}`); 
        // Merge the 'errors' component from each spec file
        const errors = spec?.components?.errors || {};
        
        mergedErrors = {
            ...mergedErrors,
            ...errors,
        };
    } catch (error) {
        // Robustness: Log an error if a file is missing or invalid JSON
        console.error(`Error loading or parsing spec file: ${filePath}`, error);
        // Continue processing other files
    }
}


// 3. Transform the merged object into the final error name-to-code map

const errorNameCodeMap = Object.fromEntries(
    Object.entries(mergedErrors)
        // Use destructuring to immediately extract name and definition for clarity
        .map(([errorName, errorDef]) => [errorName, errorDef.code])
        // Sort the errors numerically by their code for consistent output
        .sort(([_aName, aCode], [_bName, bCode]) => aCode - bCode)
);


// 4. Output the results for code generation purposes

console.log('errorCodes:');
// Output: { "InternalError": 1, "FailedToReceiveTransaction": 2, ... }
console.log(errorNameCodeMap);
console.log();

console.log('errorTypes:');
// Output for TypeScript generation (e.g., in errors.ts):
// InternalError: Errors.InternalError;
// FailedToReceiveTransaction: Errors.FailedToReceiveTransaction;
Object.keys(errorNameCodeMap).forEach((name) => 
    console.log(`${name}: Errors.${name};`)
);

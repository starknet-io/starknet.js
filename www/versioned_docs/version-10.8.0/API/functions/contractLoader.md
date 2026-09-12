# Function: contractLoader()

## Call Signature

> **contractLoader**(`contractPath`, `compiledClassHash?`): [`LoadedContract`](../type-aliases/LoadedContract.md)

Defined in: [src/utils/contractLoader.ts:73](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/contractLoader.ts#L73)

Loads a Cairo contract from filesystem (Node.js) or File object (browser).

**Node.js usage:**
Accepts a directory path or a direct path to a .sierra.json or .casm file.

- If a directory is provided: searches for .sierra.json and .casm files
- If a file path is provided: loads that file and attempts to find the complementary file
- If compiledClassHash is provided: .casm file is optional
- If compiledClassHash is NOT provided: .casm file is required

**Browser usage:**
Accepts a File object (from file input or drag-and-drop).

- Returns a Promise that resolves to LoadedContract
- Automatically detects .sierra.json and .casm files
- Can accept a single .sierra.json or .casm file, or multiple files
- If compiledClassHash is provided: .casm file is optional

### Parameters

#### contractPath

`string`

Path (Node.js) or File/File[] (browser)

#### compiledClassHash?

`string`

Optional compiled class hash. If provided, .casm file becomes optional

### Returns

[`LoadedContract`](../type-aliases/LoadedContract.md)

- Contract data (sync in Node.js, async in browser)

### Throws

- If no .sierra.json file is found, or if .casm is missing when compiledClassHash is not provided

### Example

```typescript
// Node.js: Load from directory (requires .casm)
const contract = contractLoader('./contracts/my_contract');

// Node.js: Load with compiledClassHash (no .casm needed)
const contract = contractLoader('./contracts/my_contract', '0x1234...');

// Node.js: Load from .sierra.json file
const contract = contractLoader('./contracts/my_contract.sierra.json');

// Browser: Load from file input
const fileInput = document.querySelector('input[type="file"]');
const contract = await contractLoader(fileInput.files[0]);

// Browser: Load with compiledClassHash (no .casm needed)
const contract = await contractLoader(sierraFile, '0x1234...');
```

## Call Signature

> **contractLoader**(`file`, `compiledClassHash?`): `Promise`\<[`LoadedContract`](../type-aliases/LoadedContract.md)\>

Defined in: [src/utils/contractLoader.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/contractLoader.ts#L74)

Loads a Cairo contract from filesystem (Node.js) or File object (browser).

**Node.js usage:**
Accepts a directory path or a direct path to a .sierra.json or .casm file.

- If a directory is provided: searches for .sierra.json and .casm files
- If a file path is provided: loads that file and attempts to find the complementary file
- If compiledClassHash is provided: .casm file is optional
- If compiledClassHash is NOT provided: .casm file is required

**Browser usage:**
Accepts a File object (from file input or drag-and-drop).

- Returns a Promise that resolves to LoadedContract
- Automatically detects .sierra.json and .casm files
- Can accept a single .sierra.json or .casm file, or multiple files
- If compiledClassHash is provided: .casm file is optional

### Parameters

#### file

`File`

#### compiledClassHash?

`string`

Optional compiled class hash. If provided, .casm file becomes optional

### Returns

`Promise`\<[`LoadedContract`](../type-aliases/LoadedContract.md)\>

- Contract data (sync in Node.js, async in browser)

### Throws

- If no .sierra.json file is found, or if .casm is missing when compiledClassHash is not provided

### Example

```typescript
// Node.js: Load from directory (requires .casm)
const contract = contractLoader('./contracts/my_contract');

// Node.js: Load with compiledClassHash (no .casm needed)
const contract = contractLoader('./contracts/my_contract', '0x1234...');

// Node.js: Load from .sierra.json file
const contract = contractLoader('./contracts/my_contract.sierra.json');

// Browser: Load from file input
const fileInput = document.querySelector('input[type="file"]');
const contract = await contractLoader(fileInput.files[0]);

// Browser: Load with compiledClassHash (no .casm needed)
const contract = await contractLoader(sierraFile, '0x1234...');
```

## Call Signature

> **contractLoader**(`files`, `compiledClassHash?`): `Promise`\<[`LoadedContract`](../type-aliases/LoadedContract.md)\>

Defined in: [src/utils/contractLoader.ts:75](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/contractLoader.ts#L75)

Loads a Cairo contract from filesystem (Node.js) or File object (browser).

**Node.js usage:**
Accepts a directory path or a direct path to a .sierra.json or .casm file.

- If a directory is provided: searches for .sierra.json and .casm files
- If a file path is provided: loads that file and attempts to find the complementary file
- If compiledClassHash is provided: .casm file is optional
- If compiledClassHash is NOT provided: .casm file is required

**Browser usage:**
Accepts a File object (from file input or drag-and-drop).

- Returns a Promise that resolves to LoadedContract
- Automatically detects .sierra.json and .casm files
- Can accept a single .sierra.json or .casm file, or multiple files
- If compiledClassHash is provided: .casm file is optional

### Parameters

#### files

`File`[]

#### compiledClassHash?

`string`

Optional compiled class hash. If provided, .casm file becomes optional

### Returns

`Promise`\<[`LoadedContract`](../type-aliases/LoadedContract.md)\>

- Contract data (sync in Node.js, async in browser)

### Throws

- If no .sierra.json file is found, or if .casm is missing when compiledClassHash is not provided

### Example

```typescript
// Node.js: Load from directory (requires .casm)
const contract = contractLoader('./contracts/my_contract');

// Node.js: Load with compiledClassHash (no .casm needed)
const contract = contractLoader('./contracts/my_contract', '0x1234...');

// Node.js: Load from .sierra.json file
const contract = contractLoader('./contracts/my_contract.sierra.json');

// Browser: Load from file input
const fileInput = document.querySelector('input[type="file"]');
const contract = await contractLoader(fileInput.files[0]);

// Browser: Load with compiledClassHash (no .casm needed)
const contract = await contractLoader(sierraFile, '0x1234...');
```

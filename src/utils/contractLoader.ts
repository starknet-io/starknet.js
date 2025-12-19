import { CompiledSierra, CairoAssembly } from '../types/lib/contract/index';
import { parse } from './json';

export interface LoadedContract {
  sierra: CompiledSierra;
  casm?: CairoAssembly;
  compiler?: string;
}

/**
 * Helper function to check if filesystem access is available (Node.js environment)
 * @return {boolean} - Returns true if running in Node.js with fs module available
 */
export function isFileSystemAvailable(): boolean {
  try {
    return typeof require !== 'undefined' && typeof require.resolve === 'function';
  } catch {
    return false;
  }
}

/**
 * Loads a Cairo contract from filesystem (Node.js) or File object (browser).
 *
 * **Node.js usage:**
 * Accepts a directory path or a direct path to a .sierra.json or .casm file.
 * - If a directory is provided: searches for .sierra.json and .casm files
 * - If a file path is provided: loads that file and attempts to find the complementary file
 *
 * **Browser usage:**
 * Accepts a File object (from file input or drag-and-drop).
 * - Returns a Promise that resolves to LoadedContract
 * - Automatically detects .sierra.json and .casm files
 * - Can accept a single .sierra.json or .casm file, or multiple files
 *
 * @param {string | File | File[]} input - Path (Node.js) or File/File[] (browser)
 * @return {LoadedContract | Promise<LoadedContract>} - Contract data (sync in Node.js, async in browser)
 * @throws {Error} - If no .sierra.json file is found or file reading fails
 *
 * @example
 * ```typescript
 * // Node.js: Load from directory
 * const contract = contractLoader('./contracts/my_contract');
 *
 * // Node.js: Load from .sierra.json file
 * const contract = contractLoader('./contracts/my_contract.sierra.json');
 *
 * // Browser: Load from file input
 * const fileInput = document.querySelector('input[type="file"]');
 * const contract = await contractLoader(fileInput.files[0]);
 *
 * // Browser: Load from multiple files
 * const contract = await contractLoader([sierraFile, casmFile]);
 * ```
 */
export function contractLoader(contractPath: string): LoadedContract;
export function contractLoader(file: File): Promise<LoadedContract>;
export function contractLoader(files: File[]): Promise<LoadedContract>;
export function contractLoader(
  input: string | File | File[]
): LoadedContract | Promise<LoadedContract> {
  // Browser path: File or File[]
  if (typeof File !== 'undefined' && (input instanceof File || Array.isArray(input))) {
    return loadFromFileAPI(input);
  }

  // Node.js path: string
  if (typeof input === 'string') {
    if (!isFileSystemAvailable()) {
      throw new Error(
        'contractLoader with string paths is only available in Node.js environments. ' +
          'In browsers, please use File objects from <input type="file"> or drag-and-drop. ' +
          'Example: await contractLoader(fileInput.files[0])'
      );
    }
    return loadFromFileSystem(input);
  }

  throw new Error(
    'Invalid input type. Expected string (Node.js path) or File/File[] (browser File API)'
  );
}

/**
 * Load contract from Node.js filesystem (synchronous)
 */
function loadFromFileSystem(contractPath: string): LoadedContract {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const path = require('path');

  // Resolve relative paths to absolute paths
  const resolvedPath = path.resolve(contractPath);

  let dirPath: string;
  let specifiedSierraFile: string | undefined;
  let specifiedCasmFile: string | undefined;

  // Check if the path is a file or directory
  const stats = fs.statSync(resolvedPath);

  if (stats.isFile()) {
    // If it's a file, extract the directory and remember which file was specified
    dirPath = path.dirname(resolvedPath);
    const fileName = path.basename(resolvedPath);

    if (
      fileName.endsWith('.sierra.json') ||
      (fileName.endsWith('.json') && !fileName.endsWith('.casm'))
    ) {
      specifiedSierraFile = fileName;
    } else if (fileName.endsWith('.casm')) {
      specifiedCasmFile = fileName;
    } else {
      throw new Error(
        `Invalid file type. Expected .json, .sierra.json, or .casm file, got: ${fileName}`
      );
    }
  } else if (stats.isDirectory()) {
    dirPath = resolvedPath;
  } else {
    throw new Error(`Path is neither a file nor a directory: ${contractPath}`);
  }

  // Read all files in the directory
  const files = fs.readdirSync(dirPath);

  let sierraFile: string | undefined;
  let casmFile: string | undefined;

  if (specifiedSierraFile) {
    // User specified a .json file - look for matching .casm
    sierraFile = specifiedSierraFile;
    const baseName = sierraFile.replace(/\.sierra\.json$/, '').replace(/\.json$/, '');
    casmFile = files.find((f: string) => f === `${baseName}.casm`);
  } else if (specifiedCasmFile) {
    // User specified a .casm file - look for matching .json
    casmFile = specifiedCasmFile;
    const baseName = casmFile.replace(/\.casm$/, '');
    // Try .sierra.json first, then .json
    sierraFile =
      files.find((f: string) => f === `${baseName}.sierra.json`) ||
      files.find((f: string) => f === `${baseName}.json`);
  } else {
    // User specified a directory - find .sierra.json files and their matching .casm
    const sierraFiles = files.filter(
      (f: string) => f.endsWith('.sierra.json') || (f.endsWith('.json') && !f.endsWith('.casm'))
    );

    if (sierraFiles.length === 0) {
      throw new Error(`No .sierra.json file found in ${dirPath}. Sierra file is required.`);
    }

    if (sierraFiles.length > 1) {
      throw new Error(
        `Multiple .sierra.json files found in ${dirPath}: ${sierraFiles.join(', ')}. Please specify which file to use.`
      );
    }

    [sierraFile] = sierraFiles;
    const baseName = sierraFile!.replace(/\.sierra\.json$/, '').replace(/\.json$/, '');
    casmFile = files.find((f: string) => f === `${baseName}.casm`);
  }

  // Sierra is required
  if (!sierraFile) {
    throw new Error(`No .sierra.json file found in ${dirPath}. Sierra file is required.`);
  }

  // Load sierra file
  const sierraPath = path.join(dirPath, sierraFile);
  const sierraContent = parse(fs.readFileSync(sierraPath, 'utf8'));

  const result: LoadedContract = {
    sierra: sierraContent,
  };

  // Load casm if available
  if (casmFile) {
    const casmPath = path.join(dirPath, casmFile);
    const casmContent = parse(fs.readFileSync(casmPath, 'utf8'));
    result.casm = casmContent;
    result.compiler = casmContent.compiler_version;
  }

  return result;
}

/**
 * Load contract from browser File API (asynchronous)
 */
async function loadFromFileAPI(input: File | File[]): Promise<LoadedContract> {
  const files = Array.isArray(input) ? input : [input];

  if (files.length === 0) {
    throw new Error('No files provided');
  }

  // Identify sierra and casm files
  const sierraFiles = files.filter(
    (file) =>
      file.name.endsWith('.sierra.json') ||
      (file.name.endsWith('.json') && !file.name.endsWith('.casm'))
  );
  const casmFiles = files.filter((file) => file.name.endsWith('.casm'));

  if (sierraFiles.length > 1) {
    throw new Error(
      `Multiple .sierra.json files provided: ${sierraFiles.map((f) => f.name).join(', ')}. Please provide only one sierra file.`
    );
  }

  if (casmFiles.length > 1) {
    throw new Error(
      `Multiple .casm files provided: ${casmFiles.map((f) => f.name).join(', ')}. Please provide only one casm file.`
    );
  }

  const sierraFile = sierraFiles[0];
  const casmFile = casmFiles[0];

  if (!sierraFile) {
    throw new Error(
      'No .sierra.json file found in provided files. Sierra file is required. ' +
        `Provided files: ${files.map((f) => f.name).join(', ')}`
    );
  }

  // Read sierra file
  const sierraContent = parse(await readFileAsText(sierraFile));

  const result: LoadedContract = {
    sierra: sierraContent,
  };

  // Read casm file if available
  if (casmFile) {
    const casmContent = parse(await readFileAsText(casmFile));
    result.casm = casmContent;
    result.compiler = casmContent.compiler_version;
  }

  return result;
}

/**
 * Helper to read a File object as text using FileReader
 */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        resolve(content);
      } else {
        reject(new Error(`Failed to read file ${file.name} as text`));
      }
    };

    reader.onerror = () => {
      reject(new Error(`Failed to read file ${file.name}: ${reader.error?.message}`));
    };

    reader.readAsText(file);
  });
}

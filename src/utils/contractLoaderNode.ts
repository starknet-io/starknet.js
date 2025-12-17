import { CompiledSierra, CairoAssembly } from '../types/lib/contract/index';
import { parse } from './json';

export interface LoadedContract {
  sierra: CompiledSierra;
  casm?: CairoAssembly;
  compiler?: string;
}

/**
 * Loads a Cairo contract from the filesystem.
 *
 * Accepts either a directory path or a direct path to a .sierra.json or .casm file.
 * - If a directory is provided: searches for .sierra.json and .casm files
 * - If a file path is provided: loads that file and attempts to find the complementary file
 *
 * @param {string} contractPath - Path to a directory or a .sierra.json/.casm file
 * @return {LoadedContract} - Object containing sierra (required), casm (optional), and compiler version (optional)
 * @throws {Error} - If no .sierra.json file is found, multiple .sierra.json files are found, or file reading fails
 * @example
 * ```typescript
 * // Load from directory
 * const contract = contractLoader('./contracts/my_contract');
 * // contract = { sierra: {...}, casm: {...}, compiler: '2.6.0' }
 *
 * // Load from .sierra.json file
 * const contract = contractLoader('./contracts/my_contract.sierra.json');
 *
 * // Load from .casm file (will find matching .sierra.json)
 * const contract = contractLoader('./contracts/my_contract.casm');
 * ```
 */
export function contractLoader(contractPath: string): LoadedContract {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const fs = require('fs');
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const path = require('path');

  let dirPath: string;
  let specifiedSierraFile: string | undefined;
  let specifiedCasmFile: string | undefined;

  // Check if the path is a file or directory
  const stats = fs.statSync(contractPath);

  if (stats.isFile()) {
    // If it's a file, extract the directory and remember which file was specified
    dirPath = path.dirname(contractPath);
    const fileName = path.basename(contractPath);

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
    dirPath = contractPath;
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
    // At this point sierraFile is guaranteed to be defined because we checked sierraFiles.length
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

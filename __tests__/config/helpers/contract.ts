import fs from 'node:fs';
import path from 'node:path';
import { json } from '../../../src';
import { CompiledSierra, CompiledSierraCasm, LegacyCompiledContract } from '../../../src/types';
import { isString } from '../../../src/utils/typed';

export const readFile = (subpath: string) => fs.readFileSync(path.resolve(__dirname, subpath));

export const readContract = <T = LegacyCompiledContract>(
  name: string,
  extension: string = 'json'
): T => json.parse(readFile(`../../../__mocks__/${name}.${extension}`).toString('ascii'));

export const readContractSierra = readContract<CompiledSierra>;
export const readContractSierraCasm = (name: string) =>
  readContract<CompiledSierraCasm>(name, 'casm');

export const readContractSet = (name: string, pathPrefix: string = 'cairo') => {
  const casm = readContractSierraCasm(`${pathPrefix}/${name}`);
  return {
    sierra: readContractSierra(`${pathPrefix}/${name}.sierra`),
    casm,
    compiler: casm.compiler_version,
  };
};

export const readContractCasmOnly = (name: string, pathPrefix: string = 'cairo') => {
  const casm = readContractSierraCasm(`${pathPrefix}/${name}`);
  return {
    casm,
    compiler: casm.compiler_version,
  };
};

export const readContractSierraOnly = readContract<CompiledSierra>;

export const mapContractSets = <T extends Record<string, any>>(
  contractRecord: T,
  pathPrefix?: string
): { [K in keyof T]: T[K] extends string ? ReturnType<typeof readContractSet> : T[K] } =>
  Object.fromEntries(
    Object.entries(contractRecord).map(([key, value]) => [
      key,
      isString(value) ? readContractSet(value, pathPrefix) : value,
    ])
  ) as any;

/**
 * Generates a PascalCase contract key from a file path
 * Examples:
 *   cairo210/cairo210 -> Cairo210
 *   ethSigner/openzeppelin_EthAccount090 -> OpenzeppelinEthAccount090
 *   complexInput/complexInput -> ComplexInput
 *   byteArray/target/dev/test_ByteArrayStorage -> TestByteArrayStorage
 */
const generateContractKey = (filePath: string): string => {
  // Get the filename (last part of path)
  const parts = filePath.split('/');
  const filename = parts[parts.length - 1];

  // Convert to PascalCase: split by underscore/dash, capitalize each part
  return filename
    .split(/[_-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
};

/**
 * Recursively discovers contract files in a directory and loads them
 */
const discoverAndLoadContracts = (
  basePath: string,
  topLevelDir: string,
  pathPrefix: string = ''
): Record<string, any> => {
  const discovered: Record<string, any> = {};
  const fullPath = pathPrefix ? path.join(basePath, pathPrefix) : basePath;

  if (!fs.existsSync(fullPath)) return discovered;

  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  const processedFiles = new Set<string>();

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      // Recursively discover contracts in subdirectories
      const subPath = pathPrefix ? `${pathPrefix}/${entry.name}` : entry.name;
      Object.assign(discovered, discoverAndLoadContracts(basePath, topLevelDir, subPath));
    } else if (entry.name.endsWith('.sierra.json')) {
      const relativePath = pathPrefix ? `${pathPrefix}/${entry.name}` : entry.name;
      const contractPath = relativePath.replace('.sierra.json', '');

      if (processedFiles.has(contractPath)) return;
      processedFiles.add(contractPath);

      const contractKey = generateContractKey(contractPath);
      // For .casm matching, handle edge case like "complex_sierra.sierra.json" -> "complex_sierra.casm"
      const baseName = entry.name.replace(/\.sierra\.json$/, '').replace(/\.sierra$/, '');
      const casmPath = path.join(fullPath, `${baseName}.casm`);

      if (fs.existsSync(casmPath)) {
        // Sierra + casm pair - store as string path for later loading
        discovered[contractKey] = contractPath;
      } else {
        // Sierra only - wrap in {sierra: ...} format
        discovered[contractKey] = {
          sierra: readContractSierra(`${topLevelDir}/${contractPath}.sierra`),
        };
      }
    } else if (entry.name.endsWith('.casm') && !entry.name.includes('.json')) {
      const relativePath = pathPrefix ? `${pathPrefix}/${entry.name}` : entry.name;
      const contractPath = relativePath.replace('.casm', '');

      if (processedFiles.has(contractPath)) return;

      // Check if sierra file exists
      const baseName = entry.name.replace('.casm', '');
      const sierraPath = path.join(fullPath, `${baseName}.sierra.json`);

      if (!fs.existsSync(sierraPath)) {
        // Casm only - wrap in {casm: ...} format
        processedFiles.add(contractPath);
        const contractKey = generateContractKey(contractPath);
        discovered[contractKey] = readContractCasmOnly(contractPath, topLevelDir);
      }
    }
  });

  return discovered;
};

/**
 * Automatically discovers and loads all contracts from the __mocks__ directory
 */
export const autoDiscoverContracts = (
  baseDir: string = path.resolve(__dirname, '../../../__mocks__')
): Record<string, any> => {
  const discovered: Record<string, any> = {};

  // Discover cairo contracts (flat structure - all in one namespace)
  const cairoContracts = discoverAndLoadContracts(path.join(baseDir, 'cairo'), 'cairo');

  // Map cairo contracts (convert strings to {sierra, casm} objects)
  Object.assign(discovered, mapContractSets(cairoContracts, 'cairo'));

  // Discover grouped contracts from other top-level directories
  const baseEntries = fs.readdirSync(baseDir, { withFileTypes: true });

  baseEntries
    .filter((entry) => entry.isDirectory() && entry.name !== 'cairo')
    .forEach((topLevelDir) => {
      const topLevelPath = path.join(baseDir, topLevelDir.name);
      const subdirs = fs.readdirSync(topLevelPath, { withFileTypes: true });
      const groupedContracts: Record<string, string> = {};

      subdirs
        .filter((subdir) => subdir.isDirectory())
        .forEach((subdir) => {
          const subdirPath = path.join(topLevelPath, subdir.name);
          const files = fs.readdirSync(subdirPath);

          // Find any .sierra.json file in the directory
          const sierraFile = files.find((file) => file.endsWith('.sierra.json'));

          if (sierraFile) {
            const contractName = sierraFile.replace('.sierra.json', '');
            const key = generateContractKey(contractName);
            groupedContracts[key] = `${subdir.name}/${contractName}`;
          }
        });

      if (Object.keys(groupedContracts).length > 0) {
        const groupKey = generateContractKey(topLevelDir.name);
        discovered[groupKey] = mapContractSets(groupedContracts, topLevelDir.name);
      }
    });

  // Return discovered contracts (cairo contracts already mapped, grouped contracts already mapped)
  return discovered;
};

/**
 * Auto-discovered contracts from __mocks__ directory.
 * Contracts are automatically loaded based on their file structure:
 * - Cairo contracts: __mocks__/cairo/**\/*.sierra.json + matching .casm files
 * - Grouped contracts: __mocks__/{groupName}/**\/*.sierra.json + matching .casm files
 *   (e.g., StarknetId contracts in __mocks__/starknetId/)
 *
 * Contract keys are generated from filenames in PascalCase:
 * - cairo210.sierra.json -> Cairo210
 * - openzeppelin_EthAccount090.sierra.json -> OpenzeppelinEthAccount090
 * - starknetId directory -> StarknetId group
 */
export const CONTRACTS = autoDiscoverContracts();

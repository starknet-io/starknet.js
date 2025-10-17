/**
 * Cairo 0 Class Hash computation using Pedersen hash
 */

import { ADDR_BOUND, API_VERSION } from '../../../global/constants';
import { BigNumberish, LegacyCompiledContract, RawArgs } from '../../../types';
import { CallData } from '../../calldata';
import { felt } from '../../calldata/cairo';
import { starkCurve } from '../../ec';
import { addHexPrefix, utf8ToArray } from '../../encode';
import { parse, stringify } from '../../json';
import { toHex } from '../../num';
import { encodeShortString } from '../../shortString';
import { isString } from '../../typed';
import { formatSpaces, nullSkipReplacer } from './util';

export function computePedersenHash(a: BigNumberish, b: BigNumberish): string {
  return starkCurve.pedersen(BigInt(a), BigInt(b));
}

/**
 * Compute Pedersen hash from data
 *
 * @param {BigNumberish[]} data Array of data to compute Pedersen hash on
 * @returns {string} hex-string of Pedersen hash
 *
 * @example
 * ```typescript
 * const result = hash.computeHashOnElements(['0xabc', '0x123', '0xabc123'])
 * // result = 0x148141e8f7db29d005a0187669a56f0790d7e8c2c5b2d780e4d8b9e436a5521
 * ```
 */
export function computeHashOnElements(data: BigNumberish[]): string {
  return [...data, data.length]
    .reduce((x: BigNumberish, y: BigNumberish) => starkCurve.pedersen(BigInt(x), BigInt(y)), 0)
    .toString();
}

export const computePedersenHashOnElements = computeHashOnElements;

/**
 * Calculate contract address from class hash
 *
 * @param {BigNumberish} salt Salt to be used for hashing
 * @param {BigNumberish} classHash Class hash of contract to generate address for
 * @param {RawArgs} constructorCalldata Call data for contract constructor
 * @param {BigNumberish} deployerAddress Address of contract deployer
 * @returns {string} hex-string
 * @example
 * ```typescript
 * const result = hash.calculateContractAddressFromHash(1234, 0x1cf4fe5d37868d25524cdacb89518d88bf217a9240a1e6fde71cc22c429e0e3, [1234, true, false], 0x052fb1a9ab0db3c4f81d70fea6a2f6e55f57c709a46089b25eeec0e959db3695);
 * // result = 0x5fb03d3a88d8e474976932f927ff6a9e332e06ed36642ea3e8c7e38bf010f76
 * ```
 */
export function calculateContractAddressFromHash(
  salt: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: RawArgs,
  deployerAddress: BigNumberish
): string {
  const compiledCalldata = CallData.compile(constructorCalldata);
  const constructorCalldataHash = computeHashOnElements(compiledCalldata);

  const CONTRACT_ADDRESS_PREFIX = felt('0x535441524b4e45545f434f4e54524143545f41444452455353'); // Equivalent to 'STARKNET_CONTRACT_ADDRESS'

  const hash = computeHashOnElements([
    CONTRACT_ADDRESS_PREFIX,
    deployerAddress,
    salt,
    classHash,
    constructorCalldataHash,
  ]);
  return toHex(BigInt(hash) % ADDR_BOUND);
}

/**
 * Compute hinted class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract} compiledContract
 * @returns {string} hex-string
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeHintedClassHash(compiledCairo0);
 * // result = "0x293eabb06955c0a1e55557014675aa4e7a1fd69896147382b29b2b6b166a2ac"
 * ``` */
export function computeHintedClassHash(compiledContract: LegacyCompiledContract): string {
  const { abi, program } = compiledContract;
  const contractClass = { abi, program };
  const serializedJson = formatSpaces(stringify(contractClass, nullSkipReplacer));
  return addHexPrefix(starkCurve.keccak(utf8ToArray(serializedJson)).toString(16));
}

/**
 * Computes the class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract | string} contract legacy compiled contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeLegacyContractClassHash(compiledCairo0);
 * // result = "0x4a5cae61fa8312b0a3d0c44658b403d3e4197be80027fd5020ffcdf0c803331"
 * ```
 */
export function computeLegacyContractClassHash(contract: LegacyCompiledContract | string): string {
  const compiledContract = isString(contract)
    ? (parse(contract) as LegacyCompiledContract)
    : contract;

  const apiVersion = toHex(API_VERSION);

  const externalEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.EXTERNAL.flatMap((e) => [e.selector, e.offset])
  );

  const l1HandlerEntryPointsHash = computeHashOnElements(
    compiledContract.entry_points_by_type.L1_HANDLER.flatMap((e) => [e.selector, e.offset])
  );

  const constructorEntryPointHash = computeHashOnElements(
    compiledContract.entry_points_by_type.CONSTRUCTOR.flatMap((e) => [e.selector, e.offset])
  );

  const builtinsHash = computeHashOnElements(
    compiledContract.program.builtins.map((s) => encodeShortString(s))
  );

  const hintedClassHash = computeHintedClassHash(compiledContract);

  const dataHash = computeHashOnElements(compiledContract.program.data);

  return computeHashOnElements([
    apiVersion,
    externalEntryPointsHash,
    l1HandlerEntryPointsHash,
    constructorEntryPointHash,
    builtinsHash,
    hintedClassHash,
    dataHash,
  ]);
}

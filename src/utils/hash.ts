/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { keccak256 } from 'ethereum-cryptography/keccak.js';
import { hexToBytes } from 'ethereum-cryptography/utils.js';
import { sort } from 'json-keys-sort';
import { poseidonHashMany } from 'micro-starknet';

import { API_VERSION, MASK_250, StarknetChainId, TransactionHashPrefix } from '../constants';
import {
  Builtins,
  CompiledContract,
  CompiledSiera,
  CompiledSieraCasm,
  ContractEntryPointFields,
  Hints,
  RawCalldata,
  SieraContractEntryPointFields,
} from '../types/lib';
import { felt } from './calldata/cairo';
import { starkCurve } from './ec';
import { addHexPrefix, buf2hex, removeHexPrefix, utf8ToArray } from './encode';
import { parse, stringify } from './json';
import { BigNumberish, isHex, isStringWholeNumber, toBigInt, toHex, toHexString } from './num';
import { encodeShortString } from './shortString';

export * as poseidon from '@noble/curves/abstract/poseidon';

export const transactionVersion = 1n;
export const feeTransactionVersion = 2n ** 128n + transactionVersion;

export function keccakBn(value: BigNumberish): string {
  const hexWithoutPrefix = removeHexPrefix(toHex(BigInt(value)));
  const evenHex = hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;
  return addHexPrefix(buf2hex(keccak256(hexToBytes(evenHex))));
}

function keccakHex(value: string): string {
  return addHexPrefix(buf2hex(keccak256(utf8ToArray(value))));
}

/**
 * Function to get the starknet keccak hash from a string
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)
 * @param value - string you want to get the starknetKeccak hash from
 * @returns starknet keccak hash as BigNumber
 */
export function starknetKeccak(value: string): bigint {
  const hash = BigInt(keccakHex(value));
  // eslint-disable-next-line no-bitwise
  return hash & MASK_250;
}

/**
 * Function to get the hex selector from a given function name
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)
 * @param funcName - selectors abi function name
 * @returns hex selector of given abi function name
 */
export function getSelectorFromName(funcName: string) {
  // sometimes BigInteger pads the hex string with zeros, which is not allowed in the starknet api
  return toHex(starknetKeccak(funcName));
}

/**
 * Function to get hex selector from function name, decimal string or hex string
 * @param value hex string | decimal string | string
 * @returns Hex selector
 */
export function getSelector(value: string) {
  if (isHex(value)) {
    return value;
  }
  if (isStringWholeNumber(value)) {
    return toHexString(value);
  }
  return getSelectorFromName(value);
}

export function computeHashOnElements(data: BigNumberish[]): string {
  return [...data, data.length]
    .reduce((x: BigNumberish, y: BigNumberish) => starkCurve.pedersen(toBigInt(x), toBigInt(y)), 0)
    .toString();
}

// following implementation is based on this python implementation:
// https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py

export function calculateTransactionHashCommon(
  txHashPrefix: TransactionHashPrefix,
  version: BigNumberish,
  contractAddress: BigNumberish,
  entryPointSelector: BigNumberish,
  calldata: BigNumberish[],
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  additionalData: BigNumberish[] = []
): string {
  const calldataHash = computeHashOnElements(calldata);
  const dataToHash = [
    txHashPrefix,
    version,
    contractAddress,
    entryPointSelector,
    calldataHash,
    maxFee,
    chainId,
    ...additionalData,
  ];
  return computeHashOnElements(dataToHash);
}

export function calculateDeployTransactionHash(
  contractAddress: BigNumberish,
  constructorCalldata: BigNumberish[],
  version: BigNumberish,
  chainId: StarknetChainId
): string {
  return calculateTransactionHashCommon(
    TransactionHashPrefix.DEPLOY,
    version,
    contractAddress,
    getSelectorFromName('constructor'),
    constructorCalldata,
    0,
    chainId
  );
}

export function calculateDeclareTransactionHash(
  classHash: string,
  senderAddress: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish
): string {
  return calculateTransactionHashCommon(
    TransactionHashPrefix.DECLARE,
    version,
    senderAddress,
    0,
    [classHash],
    maxFee,
    chainId,
    [nonce]
  );
}

export function calculateDeployAccountTransactionHash(
  contractAddress: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: BigNumberish[],
  salt: BigNumberish,
  version: BigNumberish,
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish
) {
  const calldata = [classHash, salt, ...constructorCalldata];

  return calculateTransactionHashCommon(
    TransactionHashPrefix.DEPLOY_ACCOUNT,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce]
  );
}

export function calculateTransactionHash(
  contractAddress: BigNumberish,
  version: BigNumberish,
  calldata: BigNumberish[],
  maxFee: BigNumberish,
  chainId: StarknetChainId,
  nonce: BigNumberish
): string {
  return calculateTransactionHashCommon(
    TransactionHashPrefix.INVOKE,
    version,
    contractAddress,
    0,
    calldata,
    maxFee,
    chainId,
    [nonce]
  );
}

export function calculateContractAddressFromHash(
  salt: BigNumberish,
  classHash: BigNumberish,
  constructorCalldata: RawCalldata,
  deployerAddress: BigNumberish
) {
  const constructorCalldataHash = computeHashOnElements(constructorCalldata);

  const CONTRACT_ADDRESS_PREFIX = felt('0x535441524b4e45545f434f4e54524143545f41444452455353'); // Equivalent to 'STARKNET_CONTRACT_ADDRESS'

  return computeHashOnElements([
    CONTRACT_ADDRESS_PREFIX,
    deployerAddress,
    salt,
    classHash,
    constructorCalldataHash,
  ]);
}

function nullSkipReplacer(key: string, value: any) {
  if (key === 'attributes' || key === 'accessible_scopes') {
    return Array.isArray(value) && value.length === 0 ? undefined : value;
  }

  if (key === 'debug_info') {
    return null;
  }

  return value === null ? undefined : value;
}

function formatSpaces(json: string) {
  return json.split('').reduce<[boolean, string]>(
    ([insideQuotes, newString], char) => {
      if (char === '"' && newString[newString.length - 1] !== '\\') {
        // ignore escaped quotes
        insideQuotes = !insideQuotes;
      }
      if (insideQuotes) {
        newString += char;
        return [insideQuotes, newString];
      }
      if (char === ':' && !insideQuotes) {
        newString += ': ';
      } else if (char === ',' && !insideQuotes) {
        newString += ', ';
      } else {
        newString += char;
      }
      return [insideQuotes, newString];
    },
    [false, '']
  )[1];
}

export default function computeHintedClassHash(compiledContract: CompiledContract) {
  const { abi, program } = compiledContract;
  const contractClass = { abi, program };
  const serializedJson = formatSpaces(stringify(contractClass, nullSkipReplacer));

  return addHexPrefix(starkCurve.keccak(utf8ToArray(serializedJson)).toString(16));
}

// Computes the class hash of a given contract class
export function computeLegacyContractClassHash(contract: CompiledContract | string) {
  const compiledContract =
    typeof contract === 'string' ? (parse(contract) as CompiledContract) : contract;

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

// Cairo1 bellow
function hashBuiltins(builtins: Builtins) {
  return poseidonHashMany(
    builtins.flatMap((it: any) => {
      return BigInt(encodeShortString(it));
    })
  );
}

function hashEntryPoint(data: ContractEntryPointFields[]) {
  const base = data.flatMap((it: any) => {
    return [BigInt(it.selector), BigInt(it.offset), hashBuiltins(it.builtins)];
  });
  return poseidonHashMany(base);
}

function parseHints(hints: Hints) {
  return hints.reduce((cum, [hint_id, hint_codes]) => {
    cum[hint_id] = hint_codes.map((it) => ({
      code: it,
      accessible_scopes: [],
      flow_tracking_data: { ap_tracking: { group: 0, offset: 0 }, reference_ids: {} },
    }));
    return cum;
  }, {} as any);
}

// Possible StarkWare will change to better hashing without stringify before testnet!
function hintedProgram(casm: CompiledSieraCasm) {
  const sortedHintedProgram = sort({
    program: {
      prime: casm.prime,
      data: casm.bytecode,
      builtins: [],
      hints: parseHints(casm.hints),
      compiler_version: casm.compiler_version,
    },
  });

  const serialized = formatSpaces(stringify(sortedHintedProgram));
  return BigInt(addHexPrefix(starkCurve.keccak(utf8ToArray(serialized)).toString(16)));
}

export function computeCompiledClassHash(casm: CompiledSieraCasm) {
  const COMPILED_CLASS_VERSION = 'COMPILED_CLASS_V1';

  // Hash compiled class version
  const compiledClassVersion = BigInt(encodeShortString(COMPILED_CLASS_VERSION));

  // Hash external entry points.
  const externalEntryPointsHash = hashEntryPoint(casm.entry_points_by_type.EXTERNAL);

  // Hash L1 handler entry points.
  const l1Handlers = hashEntryPoint(casm.entry_points_by_type.L1_HANDLER);

  // Hash constructor entry points.
  const constructor = hashEntryPoint(casm.entry_points_by_type.CONSTRUCTOR);

  // Hash hintedCompiledClassHash. ( starknet_keccak of the contract program, including its hints.)
  const hintedCompiledClassHash = hintedProgram(casm);

  // Hash bytecode.
  const bytecode = poseidonHashMany(casm.bytecode.map((it: string) => BigInt(it)));

  return toHex(
    poseidonHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      hintedCompiledClassHash,
      bytecode,
    ])
  );
}

function hashEntryPointSiera(data: SieraContractEntryPointFields[]) {
  const base = data.flatMap((it: any) => {
    return [BigInt(it.selector), BigInt(it.function_idx)];
  });
  return poseidonHashMany(base);
}

function hashAbi(siera: CompiledSiera) {
  const indentString = stringify(siera.abi, null, 2);
  return BigInt(addHexPrefix(starkCurve.keccak(utf8ToArray(indentString)).toString(16)));
}

export function computeSieraContractClassHash(siera: CompiledSiera) {
  const CONTRACT_CLASS_VERSION = 'CONTRACT_CLASS_V0.1.0';

  // Hash class version
  const compiledClassVersion = BigInt(encodeShortString(CONTRACT_CLASS_VERSION));

  // Hash external entry points.
  const externalEntryPointsHash = hashEntryPointSiera(siera.entry_points_by_type.EXTERNAL);

  // Hash L1 handler entry points.
  const l1Handlers = hashEntryPointSiera(siera.entry_points_by_type.L1_HANDLER);

  // Hash constructor entry points.
  const constructor = hashEntryPointSiera(siera.entry_points_by_type.CONSTRUCTOR);

  // Hash abi_hash.
  const abiHash = hashAbi(siera);

  // Hash Sierra program.
  const sieraProgram = poseidonHashMany(siera.sierra_program.map((it: string) => BigInt(it)));

  return toHex(
    poseidonHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      abiHash,
      sieraProgram,
    ])
  );
}

/**
 * Compute ClassHash (siera or legacy) based on provided contract
 * @param contract CompiledContract | CompiledSiera | string
 * @returns HexString ClassHash
 */
export function computeContractClassHash(contract: CompiledContract | CompiledSiera | string) {
  const compiledContract = typeof contract === 'string' ? parse(contract) : contract;

  if ('sierra_program' in compiledContract) {
    return computeSieraContractClassHash(compiledContract as CompiledSiera);
  }

  return computeLegacyContractClassHash(compiledContract as CompiledContract);
}

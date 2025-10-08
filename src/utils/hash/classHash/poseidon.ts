/**
 * Cairo 1 Class Hash computation using Poseidon hash
 */

import { poseidonHashMany } from '@scure/starknet';
import {
  BigNumberish,
  Builtins,
  CompiledSierra,
  CompiledSierraCasm,
  ContractEntryPointFields,
  SierraContractEntryPointFields,
} from '../../../types';
import { starkCurve } from '../../ec';
import { addHexPrefix, utf8ToArray } from '../../encode';
import { stringify } from '../../json';
import { toHex } from '../../num';
import { encodeShortString } from '../../shortString';
import { COMPILED_CLASS_VERSION as COMPILED_CLASS_V1, encodeBuiltins, formatSpaces } from './util';

export function computePoseidonHash(a: BigNumberish, b: BigNumberish): string {
  return toHex(starkCurve.poseidonHash(BigInt(a), BigInt(b)));
}

export function computePoseidonHashOnElements(data: BigNumberish[]) {
  return toHex(poseidonHashMany(data.map((x) => BigInt(x))));
}

function hashBuiltins(builtins: Builtins) {
  return poseidonHashMany(encodeBuiltins(builtins));
}

function hashEntryPoint(data: ContractEntryPointFields[]) {
  const base = data.flatMap((it: any) => {
    return [BigInt(it.selector), BigInt(it.offset), hashBuiltins(it.builtins)];
  });
  return poseidonHashMany(base);
}

/**
 * Compute hash of the bytecode for Sierra v1.5.0 onwards (Cairo 2.6.0)
 * Each segment is Poseidon hashed.
 * The global hash is : 1 + PoseidonHash(len0, h0, len1, h1, ...)
 * @param {CompiledSierraCasm} casm compiled Sierra CASM file content.
 * @returns {bigint} the bytecode hash as bigint.
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./contractC260.casm.json").toString("ascii"));
 * const result = hash.hashByteCodeSegments(compiledCasm);
 * // result = 80499149343908132326491548897246987792410240503053732367044713070598981699n
 * ```
 */
export function hashByteCodeSegments(casm: CompiledSierraCasm): bigint {
  const byteCode: bigint[] = casm.bytecode.map((n) => BigInt(n));
  const bytecodeSegmentLengths: number[] = casm.bytecode_segment_lengths ?? [];
  let segmentStart = 0;
  const hashLeaves = bytecodeSegmentLengths.flatMap((len) => {
    const segment = byteCode.slice(segmentStart, (segmentStart += len));
    return [BigInt(len), poseidonHashMany(segment)];
  });
  return 1n + poseidonHashMany(hashLeaves);
}

/**
 * Compute compiled class hash for contract (Cairo 1)
 * @param {CompiledSierraCasm} casm Cairo 1 compiled contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./cairo260.casm.json").toString("ascii"));
 * const result = hash.computeCompiledClassHash(compiledCasm);
 * // result = "0x4087905743b4fa2b3affc1fc71333f1390c8c5d1e8ea47d6ba70786de3fc01a"
```
 */
export function computeCompiledClassHash(casm: CompiledSierraCasm): string {
  // Hash compiled class version
  const compiledClassVersion = BigInt(encodeShortString(COMPILED_CLASS_V1));

  // Hash external entry points.
  const externalEntryPointsHash = hashEntryPoint(casm.entry_points_by_type.EXTERNAL);

  // Hash L1 handler entry points.
  const l1Handlers = hashEntryPoint(casm.entry_points_by_type.L1_HANDLER);

  // Hash constructor entry points.
  const constructor = hashEntryPoint(casm.entry_points_by_type.CONSTRUCTOR);

  // Hash bytecode.
  const bytecode = casm.bytecode_segment_lengths
    ? hashByteCodeSegments(casm)
    : poseidonHashMany(casm.bytecode.map((it: string) => BigInt(it)));

  return toHex(
    poseidonHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      bytecode,
    ])
  );
}

function hashEntryPointSierra(data: SierraContractEntryPointFields[]) {
  const base = data.flatMap((it: any) => {
    return [BigInt(it.selector), BigInt(it.function_idx)];
  });
  return poseidonHashMany(base);
}

function hashAbi(sierra: CompiledSierra) {
  const indentString = formatSpaces(stringify(sierra.abi, null));
  return BigInt(addHexPrefix(starkCurve.keccak(utf8ToArray(indentString)).toString(16)));
}

/**
 * Compute sierra contract class hash (Cairo 1)
 * @param {CompiledSierra} sierra Cairo 1 Sierra contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeSierraContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
export function computeSierraContractClassHash(sierra: CompiledSierra): string {
  const CONTRACT_CLASS_VERSION = 'CONTRACT_CLASS_V0.1.0';

  // Hash class version
  const compiledClassVersion = BigInt(encodeShortString(CONTRACT_CLASS_VERSION));

  // Hash external entry points.
  const externalEntryPointsHash = hashEntryPointSierra(sierra.entry_points_by_type.EXTERNAL);

  // Hash L1 handler entry points.
  const l1Handlers = hashEntryPointSierra(sierra.entry_points_by_type.L1_HANDLER);

  // Hash constructor entry points.
  const constructor = hashEntryPointSierra(sierra.entry_points_by_type.CONSTRUCTOR);

  // Hash abi_hash.
  const abiHash = hashAbi(sierra);

  // Hash Sierra program.
  const sierraProgram = poseidonHashMany(sierra.sierra_program.map((it: string) => BigInt(it)));

  return toHex(
    poseidonHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      abiHash,
      sierraProgram,
    ])
  );
}

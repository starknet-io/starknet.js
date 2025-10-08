/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import { blake2s } from 'blakejs';

import { toHex } from '../../num';
import { encodeShortString } from '../../shortString';
import type { Builtins, CompiledSierraCasm, ContractEntryPointFields } from '../../../types';
import { PRIME } from '../../../global/constants';
import { COMPILED_CLASS_VERSION as COMPILED_CLASS_V1, encodeBuiltins } from './util';

/**
 * Blake2s hash function for Starknet that produces a field element.
 * Matches the Blake2Felt252 implementation from Rust.
 *
 * The implementation:
 * 1. Encodes each Felt into u32 words (small: 2 words, large: 8 words)
 * 2. Serializes u32 words as little-endian bytes
 * 3. Computes Blake2s hash (32-byte output)
 * 4. Interprets hash as little-endian Felt
 */
function blake2sHashMany(data: bigint[]): bigint {
  const SMALL_THRESHOLD = 0x8000000000000000n; // 2^63
  const BIG_MARKER = 0x80000000; // 1 << 31

  // Encode each Felt to u32 words
  const u32Words: number[] = [];

  for (const felt of data) {
    // Convert to 32-byte big-endian representation
    const feltBytes = new Uint8Array(32);
    let value = felt;
    for (let i = 31; i >= 0; i--) {
      feltBytes[i] = Number(value & 0xffn);
      value >>= 8n;
    }

    if (felt < SMALL_THRESHOLD) {
      // Small value: 2 u32 words from last 8 bytes
      const hi =
        (feltBytes[24] << 24) | (feltBytes[25] << 16) | (feltBytes[26] << 8) | feltBytes[27];
      const lo =
        (feltBytes[28] << 24) | (feltBytes[29] << 16) | (feltBytes[30] << 8) | feltBytes[31];
      u32Words.push(hi, lo);
    } else {
      // Large value: 8 u32 words with MSB marker
      const startIdx = u32Words.length;
      for (let i = 0; i < 32; i += 4) {
        const word =
          (feltBytes[i] << 24) |
          (feltBytes[i + 1] << 16) |
          (feltBytes[i + 2] << 8) |
          feltBytes[i + 3];
        u32Words.push(word);
      }
      // Set MSB of first word as marker
      u32Words[startIdx] |= BIG_MARKER;
    }
  }

  // Serialize u32 words as little-endian bytes
  const bytes = new Uint8Array(u32Words.length * 4);
  for (let i = 0; i < u32Words.length; i++) {
    const word = u32Words[i];
    bytes[i * 4] = word & 0xff;
    bytes[i * 4 + 1] = (word >>> 8) & 0xff;
    bytes[i * 4 + 2] = (word >>> 16) & 0xff;
    bytes[i * 4 + 3] = (word >>> 24) & 0xff;
  }

  // Compute Blake2s hash (32 bytes output)
  const hash = blake2s(bytes, undefined, 32);

  // Convert hash from little-endian to bigint
  let hashBigInt = 0n;
  for (let i = 0; i < 32; i++) {
    hashBigInt |= BigInt(hash[i]) << BigInt(i * 8);
  }

  return hashBigInt % PRIME;
}

function hashBuiltinsBlake(builtins: Builtins): bigint {
  return blake2sHashMany(encodeBuiltins(builtins));
}

function hashEntryPointBlake(data: ContractEntryPointFields[]): bigint {
  const base = data.flatMap((it: any) => {
    return [BigInt(it.selector), BigInt(it.offset), hashBuiltinsBlake(it.builtins)];
  });
  return blake2sHashMany(base);
}

/**
 * Recursively compute hash of a bytecode segment node using Blake2s.
 * Returns [length, hash] tuple.
 */
function bytecodeHashNodeBlake(iter: Iterator<bigint>, node: number | number[]): [number, bigint] {
  if (typeof node === 'number') {
    // Leaf node: hash the segment directly
    const data: bigint[] = [];
    for (let i = 0; i < node; i++) {
      const next = iter.next();
      if (next.done) throw new Error('Bytecode length mismatch');
      data.push(next.value);
    }
    return [node, blake2sHashMany(data)];
  }

  // Non-leaf node: recursively process children
  const innerNodes = node.map((child) => bytecodeHashNodeBlake(iter, child));
  const flatData = innerNodes.flatMap(([len, hash]) => [BigInt(len), hash]);
  const hash = blake2sHashMany(flatData) + 1n;
  const totalLen = innerNodes.reduce((sum, [len]) => sum + len, 0);

  return [totalLen, hash];
}

/**
 * Compute hash of the bytecode using Blake2s for nested segments.
 * Each segment is Blake2s hashed according to the segment structure.
 * For non-leaf nodes: 1 + Blake2sHash(len0, h0, len1, h1, ...)
 * @param {CompiledSierraCasm} casm compiled Sierra CASM file content.
 * @returns {bigint} the bytecode hash as bigint.
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./contractC260.casm.json").toString("ascii"));
 * const result = hash.hashByteCodeSegmentsBlake(compiledCasm);
 * ```
 */
export function hashByteCodeSegmentsBlake(casm: CompiledSierraCasm): bigint {
  const byteCode: bigint[] = casm.bytecode.map((n) => BigInt(n));
  const bytecodeSegmentLengths = casm.bytecode_segment_lengths;

  if (!bytecodeSegmentLengths) {
    // No segment structure: hash entire bytecode as single segment
    return blake2sHashMany(byteCode);
  }

  // Process bytecode according to segment structure
  const iter = byteCode[Symbol.iterator]();
  const [len, hash] = bytecodeHashNodeBlake(iter, bytecodeSegmentLengths as any);

  // Verify we consumed all bytecode
  if (len !== byteCode.length) {
    throw new Error(`Bytecode length mismatch: expected ${byteCode.length}, got ${len}`);
  }

  return hash;
}

/**
 * Compute compiled class hash for contract (Cairo 1) using Blake2s hashing (V2).
 * This implements the V2 hash version as specified in Starknet.
 * @param {CompiledSierraCasm} casm Cairo 1 compiled contract content
 * @returns {string} hex-string of compiled class hash
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./cairo260.casm.json").toString("ascii"));
 * const result = hash.computeCompiledClassHashBlake(compiledCasm);
 * ```
 */
export function computeCompiledClassHashBlake(casm: CompiledSierraCasm): string {
  // Hash compiled class version
  const compiledClassVersion = BigInt(encodeShortString(COMPILED_CLASS_V1));

  // Hash external entry points using Blake2s
  const externalEntryPointsHash = hashEntryPointBlake(casm.entry_points_by_type.EXTERNAL);

  // Hash L1 handler entry points using Blake2s
  const l1Handlers = hashEntryPointBlake(casm.entry_points_by_type.L1_HANDLER);

  // Hash constructor entry points using Blake2s
  const constructor = hashEntryPointBlake(casm.entry_points_by_type.CONSTRUCTOR);

  // Hash bytecode using Blake2s with segment structure
  const bytecode = hashByteCodeSegmentsBlake(casm);

  // Compute final hash: Blake2s([version, external, l1_handler, constructor, bytecode])
  return toHex(
    blake2sHashMany([
      compiledClassVersion,
      externalEntryPointsHash,
      l1Handlers,
      constructor,
      bytecode,
    ])
  );
}

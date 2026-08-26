import { CairoFelt252 } from './felt';
import { CairoInt8 } from './int8';
import { CairoInt16 } from './int16';
import { CairoInt32 } from './int32';
import { CairoInt64 } from './int64';
import { CairoInt128 } from './int128';
import { CairoUint8 } from './uint8';
import { CairoUint16 } from './uint16';
import { CairoUint32 } from './uint32';
import { CairoUint64 } from './uint64';
import { CairoUint96 } from './uint96';
import { CairoUint128 } from './uint128';

/** What this module needs of a Cairo type class: the abi type it answers to, and its value. */
type SingleFeltCairoType = {
  isAbiType(abiType: string): boolean;
  new (...args: any[]): { toBigInt(): bigint };
};

/**
 * The Cairo types that occupy one felt and are built from a number.
 *
 * Listed rather than recognized by shape: `toBigInt` alone would also catch `CairoUint256` and
 * `CairoByteArray`, which carry a number too but do not fit in one felt — reducing those to it
 * would silently drop felts from the calldata.
 *
 * `CairoBytes31` is one felt as well but is absent on purpose: it reads bytes, not numbers, so its
 * own constructor is what adopts an instance — reducing one here would hand it a bigint it refuses.
 */
const SINGLE_FELT_TYPES: readonly SingleFeltCairoType[] = [
  CairoFelt252,
  CairoUint8,
  CairoUint16,
  CairoUint32,
  CairoUint64,
  CairoUint96,
  CairoUint128,
  CairoInt8,
  CairoInt16,
  CairoInt32,
  CairoInt64,
  CairoInt128,
];

/**
 * The number a one-felt Cairo type carries, when it is the very type the abi declares.
 *
 * An abi slot normally receives a `BigNumberish`; this lets an already typed value stand there too,
 * by reducing the instance to its number so that the declared type reads and range-checks it as it
 * would any other input. The match is on the declared type alone: a `CairoUint128` facing a `u64`
 * slot comes back untouched and is refused further down, whatever number it holds — a value that
 * happens to fit is not a reason to let a wider type through.
 *
 * Every other value — a plain number, a string, a `CairoUint256`, a `CairoByteArray` — comes back
 * unchanged, so this is a no-op wherever it does not apply.
 * @param {unknown} value the value an abi slot received
 * @param {string} abiType the type that slot declares
 * @returns {unknown} the number the instance carries, or the value unchanged
 * @example
 * ```typescript
 * const result = unwrapCairoScalar(new CairoUint64(44), 'core::integer::u64');
 * // result = 44n
 * const result2 = unwrapCairoScalar(new CairoInt128(-5), 'core::integer::i128');
 * // result2 = -5n     (the field element is computed later, by the declared type)
 * const result3 = unwrapCairoScalar(new CairoUint128(44), 'core::integer::u64');
 * // result3 = CairoUint128 { data: 44n }     (not the declared type, so left for it to refuse)
 * ```
 */
export function unwrapCairoScalar(value: unknown, abiType: string): unknown {
  const declared = SINGLE_FELT_TYPES.find((cairoType) => cairoType.isAbiType(abiType));
  return declared && value instanceof declared ? value.toBigInt() : value;
}

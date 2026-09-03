import type { Abi, AbiEnums, AbiStructs } from '../../types';

/**
 * The structs an abi declares, keyed by name.
 *
 * This lives apart from `CallData`, which exposes it as a static method, because the abi parsers
 * need it too — and they cannot reach for `CallData`, which imports them. A module both sides can
 * import, and that imports neither, is what keeps that from closing into a cycle.
 * @param {Abi} abi the abi to read
 * @returns {AbiStructs} the struct definitions, keyed by their abi name
 * @example
 * ```typescript
 * const abi = [
 *   {
 *     type: 'struct',
 *     name: 'test::Point',
 *     members: [
 *       { name: 'x', type: 'core::integer::u8' },
 *       { name: 'y', type: 'core::integer::u32' },
 *     ],
 *   },
 * ];
 * const result = Object.keys(getAbiStruct(abi));
 * // result = ["test::Point"]
 * ```
 */
export function getAbiStruct(abi: Abi): AbiStructs {
  return abi
    .filter((abiEntry) => abiEntry.type === 'struct')
    .reduce(
      (acc, abiEntry) => ({
        ...acc,
        [abiEntry.name]: abiEntry,
      }),
      {}
    );
}

/**
 * The enums an abi declares, keyed by name, minus `core::bool`.
 *
 * A bool is declared as an enum of two variants like any other, but nothing treats it as one : it
 * is a leaf with its own class, and leaving it in would send it down the enum branch of every
 * parser. So it is dropped here, once, rather than guarded against everywhere.
 * @param {Abi} abi the abi to read
 * @returns {AbiEnums} the enum definitions, keyed by their abi name
 * @example
 * ```typescript
 * const abi = [
 *   { type: 'enum', name: 'core::bool', variants: [] },
 *   {
 *     type: 'enum',
 *     name: 'test::Choice',
 *     variants: [
 *       { name: 'Empty', type: '()' },
 *       { name: 'Number', type: 'core::integer::u8' },
 *     ],
 *   },
 * ];
 * const result = Object.keys(getAbiEnum(abi));
 * // result = ["test::Choice"]     core::bool dropped
 * ```
 */
export function getAbiEnum(abi: Abi): AbiEnums {
  const fullEnumList = abi
    .filter((abiEntry) => abiEntry.type === 'enum')
    .reduce(
      (acc, abiEntry) => ({
        ...acc,
        [abiEntry.name]: abiEntry,
      }),
      {}
    );
  delete fullEnumList['core::bool'];
  return fullEnumList;
}

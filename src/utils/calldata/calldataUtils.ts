import type { Abi, AbiEnums, AbiStructs } from '../../types';

/**
 * Helper to extract enums from abi
 * @param abi Abi
 * @returns AbiEnums - enums from abi
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

/**
 * Helper to extract structs from abi
 * @param abi Abi
 * @returns AbiStructs - structs from abi
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

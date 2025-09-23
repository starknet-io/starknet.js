import { Abi, AbiStructs } from '../../types';

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

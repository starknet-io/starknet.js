import { Abi, AbiEvents } from '../../types/lib/contract/abi';
import { starkCurve } from '../ec';
import { addHexPrefix, utf8ToArray } from '../encode';

export * from './responseParser';

export function getAbiEvents(abi: Abi): AbiEvents {
  return abi
    .filter((abiEntry) => abiEntry.type === 'event' && (abiEntry.size || abiEntry.kind !== 'enum'))
    .reduce((acc, abiEntry) => {
      const entryName = abiEntry.name.slice(abiEntry.name.lastIndexOf(':') + 1);
      const abiEntryMod = { ...abiEntry };
      abiEntryMod.name = entryName;
      return {
        ...acc,
        [addHexPrefix(starkCurve.keccak(utf8ToArray(entryName)).toString(16))]: abiEntryMod,
      };
    }, {});
}

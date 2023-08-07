import {
  Abi,
  AbiEvents,
  AbiStructs,
  Cairo1Event,
  EventAbi,
  LegacyEvent,
  ParsedEvent,
  ParsedEvents,
} from '../../types';
import { Event as ProviderEvent } from '../../types/provider/response';
import responseParser from '../calldata/responseParser';
import { starkCurve } from '../ec';
import { addHexPrefix, utf8ToArray } from '../encode';

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

/**
 * Parse raw events and structure them into response object based on a contract structs and defined events
 * @param providerReceivedEvents ProviderEvent[] - Array of raw events
 * @param abiEvents AbiEvents - Events defined in the abi
 * @param abiStructs AbiStructs - Structs defined in the abi
 * @return ParsedEvents - parsed events corresponding to the abi
 */
export function parseEvents(
  providerReceivedEvents: Array<ProviderEvent>,
  abiEvents: AbiEvents,
  abiStructs: AbiStructs
): ParsedEvents {
  const ret = providerReceivedEvents.flat().reduce((acc, recEvent) => {
    const abiEvent: EventAbi = abiEvents[recEvent.keys[0]];
    if (!abiEvent) {
      return acc;
    }

    // Create our final event object
    const parsedEvent: ParsedEvent = {};

    // Remove the event's name hashed from the keys array
    recEvent.keys.shift();

    const keysIter = recEvent.keys[Symbol.iterator]();
    const dataIter = recEvent.data[Symbol.iterator]();

    const abiEventKeys =
      (abiEvent as Cairo1Event).members?.filter((it) => it.kind === 'key') ||
      (abiEvent as LegacyEvent).keys;
    const abiEventData =
      (abiEvent as Cairo1Event).members?.filter((it) => it.kind === 'data') ||
      (abiEvent as LegacyEvent).data;

    abiEventKeys.forEach((key) => {
      parsedEvent[key.name] = responseParser(keysIter, key, abiStructs, parsedEvent);
    });

    abiEventData.forEach((data) => {
      parsedEvent[data.name] = responseParser(dataIter, data, abiStructs, parsedEvent);
    });

    (acc[abiEvent.name] as Array<ParsedEvent>) = (
      (acc[abiEvent.name] as Array<ParsedEvent>) ?? []
    ).concat(parsedEvent) || [parsedEvent];

    return acc;
  }, {} as ParsedEvents);
  return ret;
}

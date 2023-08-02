import {
  AbiEvents,
  AbiStructs,
  BigNumberish,
  EventAbi,
  EventEntry,
  OldEvent,
  ParsedEvents,
  ParsedStruct,
  UpToDateEvent,
} from '../../types';
import { Event as ProviderEvent } from '../../types/provider/response';
import { isCairo1Type, isLen, isTypeArray, isTypeTuple } from '../calldata/cairo';
import { parseBaseTypes, parseResponseValue } from '../calldata/responseParser';

function responseParser(
  responseIterator: Iterator<string>,
  output: EventEntry,
  structs: AbiStructs,
  parsedResult?: ParsedStruct
): any {
  const { name, type } = output;
  let temp;

  switch (true) {
    case isLen(name):
      temp = responseIterator.next().value;
      return BigInt(temp);

    case type in structs || isTypeTuple(type):
      return parseResponseValue(responseIterator, output, structs);

    case isTypeArray(type):
      // C1 Array
      if (isCairo1Type(type)) {
        return parseResponseValue(responseIterator, output, structs);
      }
      // C0 Array
      // eslint-disable-next-line no-case-declarations
      const parsedDataArr: (BigNumberish | ParsedStruct | boolean | any[])[] = [];
      if (parsedResult && parsedResult[`${name}_len`]) {
        const arrLen = parsedResult[`${name}_len`] as number;
        while (parsedDataArr.length < arrLen) {
          parsedDataArr.push(
            parseResponseValue(
              responseIterator,
              { name, type: output.type.replace('*', '') },
              structs
            )
          );
        }
      }
      return parsedDataArr;
    default:
      return parseBaseTypes(type, responseIterator);
  }
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
    // Create our event object
    acc[abiEvent.name] = {};

    // Remove the event's name hashed from the keys array
    recEvent.keys.shift();

    const keysIter = recEvent.keys[Symbol.iterator]();
    const dataIter = recEvent.data[Symbol.iterator]();

    const abiEventKeys =
      (abiEvent as UpToDateEvent).members?.filter((it) => it.kind === 'key') ||
      (abiEvent as OldEvent).keys;
    const abiEventData =
      (abiEvent as UpToDateEvent).members?.filter((it) => it.kind === 'data') ||
      (abiEvent as OldEvent).data;

    abiEventKeys.forEach((key) => {
      acc[abiEvent.name][key.name] = responseParser(keysIter, key, abiStructs, acc[abiEvent.name]);
    });

    abiEventData.forEach((data) => {
      acc[abiEvent.name][data.name] = responseParser(
        dataIter,
        data,
        abiStructs,
        acc[abiEvent.name]
      );
    });
    return acc;
  }, {} as ParsedEvents);
  return ret;
}

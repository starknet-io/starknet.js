import {
  Abi,
  AbiEnums,
  AbiEvents,
  AbiStructs,
  Cairo1Events,
  EventAbi,
  LegacyEvent,
  ParsedEvent,
  ParsedEvents,
  RPC,
  type Cairo1Event,
  type Cairo1EventVariant,
} from '../../types';
import assert from '../assert';
import { isCairo1Abi } from '../calldata/cairo';
import responseParser from '../calldata/responseParser';
import { starkCurve } from '../ec';
import { addHexPrefix, utf8ToArray } from '../encode';

/**
 * Retrieves the events from the given ABI.
 *
 * Is able to handle Cairo 1 events nested in Cairo components.
 * @param {Abi} abi - The ABI to extract events from.
 * @return {AbiEvents} - An object containing the extracted events.
 * @example
 * ```typescript
 * const result = events.getAbiEvents(abi);
 * // result = {
 * //   '0x22ea134d4126804c60797e633195f8c9aa5fd6d1567e299f4961d0e96f373ee': 
 * //    { '0x34e55c1cd55f1338241b50d352f0e91c7e4ffad0e4271d64eb347589ebdfd16': {
 * //     kind: 'struct', type: 'event',
 * //     name: 'ka::ExComponent::ex_logic_component::Mint',
      
 * //     members: [{
 * //      name: 'spender',
 * //      type: 'core::starknet::contract_address::ContractAddress',
 * //      kind: 'key'},
 * //      { name: 'value', type: 'core::integer::u256', kind: 'data' }]},
 * // ...
 * ```
 */
export function getAbiEvents(abi: Abi): AbiEvents {
  let finalResult: AbiEvents;
  if (!isCairo1Abi(abi)) {
    // Cairo 0 abi
    finalResult = abi
      .filter((abiEntry) => abiEntry.type === 'event')
      .reduce((acc, abiEntry) => {
        const entryName = abiEntry.name;
        const abiEntryMod = { ...abiEntry };
        abiEntryMod.name = entryName;
        return {
          ...acc,
          [addHexPrefix(starkCurve.keccak(utf8ToArray(entryName)).toString(16))]: abiEntryMod,
        };
      }, {});
  } else {
    // Cairo 1 abi
    const abiEventsStructs = abi.filter((obj) => obj.type === 'event' && obj.kind === 'struct');
    const abiEventsEnums = abi.filter((obj) => obj.type === 'event' && obj.kind === 'enum');
    const abiEventsData: AbiEvents = abiEventsStructs.reduce(
      (acc: Cairo1Events, event: Cairo1Events) => {
        let nameList: string[] = [];
        let { name } = event;
        let flat: boolean = false;
        const findName = (variant: Cairo1EventVariant) => variant.type === name;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const eventEnum = abiEventsEnums.find((eventE) => eventE.variants.some(findName));
          if (typeof eventEnum === 'undefined') break;
          const variant: Cairo1EventVariant = eventEnum.variants.find(findName);
          nameList.unshift(variant.name);
          if (variant.kind === 'flat') flat = true;
          name = eventEnum.name;
        }
        if (nameList.length === 0) {
          throw new Error('inconsistancy in ABI events definition.');
        }
        if (flat) nameList = [nameList[nameList.length - 1]];
        const final = nameList.pop();
        let result: AbiEvents = {
          [addHexPrefix(starkCurve.keccak(utf8ToArray(final!)).toString(16))]: event,
        };
        while (nameList.length > 0) {
          result = {
            [addHexPrefix(starkCurve.keccak(utf8ToArray(nameList.pop()!)).toString(16))]: result,
          };
        }
        result = { ...result };
        return mergeAbiEvents(acc, result);
      },
      {}
    );
    finalResult = abiEventsData;
  }
  return finalResult;
}

/**
 * Checks if a given value is an object (Object or Array)
 * @param {any} item the tested item
 * @returns {boolean}
 * @example
 * ```typescript
 * const result = events.isObject({event: "pending"});
 * // result = true
 * ```
 */
export function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * internal function to deep merge 2 event description objects
 */
function mergeAbiEvents(target: any, source: any): Object {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = mergeAbiEvents(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

/**
 * Parse raw events and structure them into response object based on a contract structs and defined events
 * @param {RPC.Event[]} providerReceivedEvents Array of raw events
 * @param {AbiEvents} abiEvents Events defined in the abi
 * @param {AbiStructs} abiStructs Structs defined in the abi
 * @param {AbiEnums} abiEnums Enums defined in the abi
 * @returns {ParsedEvents} parsed events corresponding to the abi
 * @example
 * ```typescript
 * const abiEvents = events.getAbiEvents(sierra.abi);
 * const abiStructs =  CallData.getAbiStruct(sierra.abi);
 * const abiEnums = CallData.getAbiEnum(sierra.abi);
 * const result = events.parseEvents(myEvents, abiEvents, abiStructs, abiEnums);
 * // result = [{test::ExCh::ex_ch::Trade: {
      maker: 7548613724711489396448209137n,
      taker: 6435850562375218974960297344n,
      router_maker: 0n,
    }}]
 * ```
 */
export function parseEvents(
  providerReceivedEvents: RPC.Event[],
  abiEvents: AbiEvents,
  abiStructs: AbiStructs,
  abiEnums: AbiEnums
): ParsedEvents {
  const ret = providerReceivedEvents.flat().reduce((acc, recEvent: RPC.Event) => {
    let abiEvent: EventAbi | AbiEvents = abiEvents[recEvent.keys.shift() ?? 0];
    if (!abiEvent) {
      return acc;
    }
    while (!abiEvent.name) {
      const hashName = recEvent.keys.shift();
      assert(!!hashName, 'Not enough data in "key" property of this event.');
      abiEvent = (abiEvent as AbiEvents)[hashName];
    }
    // Create our final event object
    const parsedEvent: ParsedEvent = {};
    parsedEvent[abiEvent.name as string] = {};
    // Remove the event's name hashed from the keys array
    const keysIter = recEvent.keys[Symbol.iterator]();
    const dataIter = recEvent.data[Symbol.iterator]();

    const abiEventKeys =
      (abiEvent as Cairo1Event).members?.filter((it) => it.kind === 'key') ||
      (abiEvent as LegacyEvent).keys;
    const abiEventData =
      (abiEvent as Cairo1Event).members?.filter((it) => it.kind === 'data') ||
      (abiEvent as LegacyEvent).data;

    abiEventKeys.forEach((key) => {
      parsedEvent[abiEvent.name as string][key.name] = responseParser(
        keysIter,
        key,
        abiStructs,
        abiEnums,
        parsedEvent[abiEvent.name as string]
      );
    });

    abiEventData.forEach((data) => {
      parsedEvent[abiEvent.name as string][data.name] = responseParser(
        dataIter,
        data,
        abiStructs,
        abiEnums,
        parsedEvent[abiEvent.name as string]
      );
    });
    acc.push(parsedEvent);
    return acc;
  }, [] as ParsedEvents);
  return ret;
}

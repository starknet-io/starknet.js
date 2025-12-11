import {
  Abi,
  AbiEnums,
  AbiEvents,
  AbiStructs,
  CairoEvent,
  AbiEvent,
  LegacyEvent,
  ParsedEvent,
  ParsedEvents,
  RPC,
  type CairoEventDefinition,
  type CairoEventVariant,
  type AbiEntry,
} from '../../types';
import assert from '../assert';
import { isCairo1Abi } from '../calldata/cairo';
import { AbiParserInterface } from '../calldata/parser/interface';
import responseParser from '../calldata/responseParser';
import { starkCurve } from '../ec';
import { addHexPrefix, utf8ToArray } from '../encode';
import { toHex } from '../num';
import { isUndefined, isObject } from '../typed';

/**
 * Check if an ABI entry is related to events.
 * @param {AbiEntry} object an Abi entry
 * @returns {boolean} true if this Abi Entry is related to an event
 * @example
 * ```typescript
 * // use of a transaction receipt
 * ```
 */
export function isAbiEvent(object: AbiEntry): boolean {
  return object.type === 'event';
}

/**
 * Retrieves the events from the given Cairo 0 ABI.
 * @param {Abi} abi - The Cairo 0 ABI to extract events from.
 * @return {AbiEvents} - An object containing the hashes and the definition of the events.
 * @example
 * ```typescript
 * const result = events.getCairo0AbiEvents(abi0);
 * // result = {
  '0x35ea10b06d74221d24a134672e9f776a3088ba6b9829e53b9a10abd8817a211': {
    data: [{ name: 'admin_requester', type: 'felt' }, { name: 'new_requester', type: 'felt' }],
    keys: [],
    name: 'AddAdmin',
    type: 'event'
  }
 * ```
 */
function getCairo0AbiEvents(abi: Abi): AbiEvents {
  return abi
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
}

/**
 * Retrieves the events from the given Cairo 1 ABI.
 *
 * Is able to handle events nested in Cairo components.
 * @param {Abi} abi - The Cairo 1 ABI to extract events from.
 * @return {AbiEvents} - An object containing the hashes and the definition of the events.
 * @example
 * ```typescript
 * const result = events.getCairo1AbiEvents(abi1);
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
function getCairo1AbiEvents(abi: Abi): AbiEvents {
  const abiEventsStructs = abi.filter((obj) => isAbiEvent(obj) && obj.kind === 'struct');
  const abiEventsEnums = abi.filter((obj) => isAbiEvent(obj) && obj.kind === 'enum');
  const abiEventsData: AbiEvents = abiEventsStructs.reduce((acc: CairoEvent, event: CairoEvent) => {
    let nameList: string[] = [];
    let { name } = event;
    let flat: boolean = false;
    const findName = (variant: CairoEventVariant) => variant.type === name;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const eventEnum = abiEventsEnums.find((eventE) => eventE.variants.some(findName));
      if (isUndefined(eventEnum)) break;
      const variant = eventEnum.variants.find(findName);
      nameList.unshift(variant.name);
      if (variant.kind === 'flat') flat = true;
      name = eventEnum.name;
    }

    if (nameList.length === 0) {
      throw new Error('inconsistency in ABI events definition.');
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
  }, {});
  return abiEventsData;
}

/**
 * Retrieves the events from the given ABI (from Cairo 0 or Cairo 1 contract).
 *
 * Is able to handle Cairo 1 events nested in Cairo components.
 * @param {Abi} abi - The ABI to extract events from.
 * @return {AbiEvents} - An object containing the hashes and the definition of the events.
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
  return isCairo1Abi(abi) ? getCairo1AbiEvents(abi) : getCairo0AbiEvents(abi);
}

/**
 * internal function to deep merge 2 event description objects
 */
function mergeAbiEvents(target: any, source: any): Object {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key as keyof typeof source])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key as keyof typeof source] });
        else
          output[key] = mergeAbiEvents(
            target[key as keyof typeof target],
            source[key as keyof typeof source]
          );
      } else {
        Object.assign(output, { [key]: source[key as keyof typeof source] });
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
  providerReceivedEvents: RPC.EmittedEvent[],
  abiEvents: AbiEvents,
  abiStructs: AbiStructs,
  abiEnums: AbiEnums,
  parser: AbiParserInterface
): ParsedEvents {
  const ret = providerReceivedEvents.reduce((acc, recEvent: RPC.EmittedEvent | RPC.Event) => {
    // Shallow clone to avoid mutating original event while processing keys
    const eventKeys = [...recEvent.keys];
    const eventData = [...recEvent.data];

    let abiEvent: AbiEvent | AbiEvents = abiEvents[eventKeys.shift() ?? 0];
    if (!abiEvent) {
      return acc;
    }
    while (!abiEvent.name) {
      const hashName = eventKeys.shift();
      assert(!!hashName, 'Not enough data in "keys" property of this event.');
      abiEvent = (abiEvent as AbiEvents)[hashName];
    }

    // Create our final event object with metadata only (exclude from_address, keys, data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { from_address: _from, keys: _keys, data: _data, ...eventMetadata } = recEvent;
    const parsedEvent: ParsedEvent = eventMetadata as ParsedEvent;

    const eventName = abiEvent.name as string;
    parsedEvent[eventName] = {};

    // Get iterators for remaining keys and data (after shifts above)
    const keysIter = eventKeys[Symbol.iterator]();
    const dataIter = eventData[Symbol.iterator]();

    const abiEventKeys =
      (abiEvent as CairoEventDefinition).members?.filter((it) => it.kind === 'key') ||
      (abiEvent as LegacyEvent).keys;
    const abiEventData =
      (abiEvent as CairoEventDefinition).members?.filter((it) => it.kind === 'data') ||
      (abiEvent as LegacyEvent).data;

    const parsedEventData = parsedEvent[eventName];

    abiEventKeys.forEach((key) => {
      parsedEventData[key.name] = responseParser({
        responseIterator: keysIter,
        output: key,
        structs: abiStructs,
        enums: abiEnums,
        parser,
        parsedResult: parsedEventData,
      });
    });

    abiEventData.forEach((data) => {
      parsedEventData[data.name] = responseParser({
        responseIterator: dataIter,
        output: data,
        structs: abiStructs,
        enums: abiEnums,
        parser,
        parsedResult: parsedEventData,
      });
    });

    acc.push(parsedEvent);
    return acc;
  }, [] as ParsedEvents);
  return ret;
}

/**
 * Add getByPath helper method to parsed events array
 * This method allows finding events by partial key path matching
 * @param parsedEvents - Array of parsed events to enhance
 * @returns The same array with getByPath method attached
 * @example
 * ```typescript
 * const events = addGetByPathMethod(parsedEvents);
 * const transferEvent = events.getByPath('Transfer');
 * ```
 */
export function addGetByPathMethod(parsedEvents: ParsedEvents): ParsedEvents {
  Object.defineProperty(parsedEvents, 'getByPath', {
    value: (path: string) => {
      const event = parsedEvents.find((ev) => Object.keys(ev).some((key) => key.includes(path)));
      const eventKey = Object.keys(event || {}).find((key) => key.includes(path));
      return eventKey && event ? event[eventKey] : null;
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });
  return parsedEvents;
}

/**
 * Extract and prepare emitted events from a transaction receipt
 * Optionally filters by contract address and enriches with transaction/block metadata
 * @param receipt - Transaction receipt containing events and metadata
 * @param contractAddress - Optional contract address to filter events by
 * @returns Emitted events with transaction and block context, optionally filtered
 * @example
 * ```typescript
 * // Get all emitted events
 * const allEvents = getEmittedEvents(receipt);
 *
 * // Get events from specific contract
 * const contractEvents = getEmittedEvents(receipt, contractAddress);
 * ```
 */
export function getEmittedEvents(
  receipt: {
    events?: RPC.Event[];
    transaction_hash: string;
    block_hash?: string;
    block_number?: number;
  },
  contractAddress?: string
): RPC.EmittedEvent[] {
  if (!receipt.events) return [];

  // Filter first if contract address provided
  const eventsToEnrich = contractAddress
    ? filterEventsByAddress(receipt.events, contractAddress)
    : receipt.events;

  return eventsToEnrich.map((event) => ({
    ...event,
    transaction_hash: receipt.transaction_hash,
    block_hash: receipt.block_hash,
    block_number: receipt.block_number,
  })) as RPC.EmittedEvent[];
}

/**
 * Filter events by contract address
 * @param events - Array of events to filter (defaults to empty array if undefined)
 * @param contractAddress - Address to filter by
 * @returns Filtered events matching the contract address
 * @example
 * ```typescript
 * const myEvents = filterEventsByAddress(allEvents, '0x123...');
 * ```
 */
export function filterEventsByAddress<T extends { from_address: string }>(
  events: T[] | undefined,
  contractAddress: string
): T[] {
  if (!events) return [];
  return events.filter((event) => toHex(event.from_address) === toHex(contractAddress));
}

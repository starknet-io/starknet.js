import type {
  AbiEntry,
  AbiEnums,
  AbiEvent,
  AbiStructs,
  CairoEventVariant,
  FunctionAbi,
  InterfaceAbi,
  RPC,
} from '../../src';
import { isAbiEvent, getAbiEvents, parseEvents } from '../../src/utils/events';

const getAbiEventEntry = (): AbiEntry => ({ name: 'test', type: 'event' });

const getFunctionAbi = (): FunctionAbi => ({
  inputs: [getAbiEventEntry()],
  name: 'test',
  outputs: [getAbiEventEntry()],
  stateMutability: 'view',
  type: 'function',
});

const getInterfaceAbi = (): InterfaceAbi => ({
  items: [getFunctionAbi()],
  name: 'test_interface_abi',
  type: 'interface',
});

describe('isAbiEvent', () => {
  test('should return true if it is Abi event', () => {
    expect(isAbiEvent(getAbiEventEntry())).toEqual(true);
  });

  test('should return false if it is not Abi event', () => {
    const abiEntry: AbiEntry = { name: 'test', type: 'felt ' };
    expect(isAbiEvent(abiEntry)).toEqual(false);
  });
});

describe('getAbiEvents', () => {
  test('should get Cairo1 ABI events', () => {
    const abiEventAndVariantName = 'cairo_event_struct';
    const abiCairoEventStruct: AbiEvent = {
      kind: 'struct',
      members: [
        {
          name: 'test_name',
          type: 'test_type',
          kind: 'data',
        },
      ],
      name: abiEventAndVariantName,
      type: 'event',
    };

    const abiCairoEventEnum: CairoEventVariant = {
      kind: 'enum',
      variants: [
        {
          name: 'test_name',
          type: abiEventAndVariantName,
          kind: 'data',
        },
      ],
      name: 'test_cairo_event',
      type: 'event',
    };

    const abiEvents = getAbiEvents([getInterfaceAbi(), abiCairoEventStruct, abiCairoEventEnum]);

    const result = {
      '0x3c719ce4f57dd2d9059b9ffed65417d694a29982d35b188574144d6ae6c3f87': abiCairoEventStruct,
    };
    expect(abiEvents).toEqual(result);
  });

  test('should throw and error if Cairo1 ABI events definition is inconsistent', () => {
    const abiCairoEventStruct: AbiEvent = {
      kind: 'struct',
      members: [
        {
          name: 'test_name',
          type: 'test_type',
          kind: 'data',
        },
      ],
      name: 'cairo_event_struct',
      type: 'event',
    };

    const abiCairoEventEnum: CairoEventVariant = {
      kind: 'enum',
      variants: [
        {
          name: 'test_name',
          type: 'cairo_event_struct_variant',
          kind: 'data',
        },
      ],
      name: 'test_cairo_event',
      type: 'event',
    };

    expect(() => getAbiEvents([getInterfaceAbi(), abiCairoEventStruct, abiCairoEventEnum])).toThrow(
      new Error('inconsistency in ABI events definition.')
    );
  });

  test('should return Cairo0 ABI events', () => {
    const abiCairoEventStruct: AbiEvent = {
      kind: 'struct',
      members: [
        {
          name: 'test_name',
          type: 'test_type',
          kind: 'data',
        },
      ],
      name: 'cairo_event_struct',
      type: 'event',
    };

    const abiEvents = getAbiEvents([getFunctionAbi(), abiCairoEventStruct]);
    const result = {
      '0x27b21abc103381e154ea5c557dfe64466e0d25add7ef91a45718f5b8ee8fae3': abiCairoEventStruct,
    };
    expect(abiEvents).toEqual(result);
  });
});

describe('parseEvents', () => {
  test('should return parsed events', () => {
    const abiEventAndVariantName = 'cairo_event_struct';
    const abiCairoEventStruct: AbiEvent = {
      kind: 'struct',
      members: [
        {
          name: 'test_name',
          type: 'test_type',
          kind: 'data',
        },
      ],
      name: abiEventAndVariantName,
      type: 'event',
    };

    const abiCairoEventEnum: CairoEventVariant = {
      kind: 'enum',
      variants: [
        {
          name: 'test_name',
          type: abiEventAndVariantName,
          kind: 'data',
        },
      ],
      name: 'test_cairo_event',
      type: 'event',
    };

    const abiEvents = getAbiEvents([getInterfaceAbi(), abiCairoEventStruct, abiCairoEventEnum]);

    const abiStructs: AbiStructs = {
      abi_structs: {
        members: [
          {
            name: 'test_name',
            type: 'test_type',
            offset: 1,
          },
        ],
        size: 2,
        name: 'cairo_event_struct',
        type: 'struct',
      },
    };

    const abiEnums: AbiEnums = {
      abi_enums: {
        variants: [
          {
            name: 'test_name',
            type: 'cairo_event_struct_variant',
            offset: 1,
          },
        ],
        size: 2,
        name: 'test_cairo_event',
        type: 'enum',
      },
    };

    const event: RPC.Event = {
      from_address: 'test_address',
      keys: ['0x3c719ce4f57dd2d9059b9ffed65417d694a29982d35b188574144d6ae6c3f87'],
      data: ['0x3c719ce4f57dd2d9059b9ffed65417d694a29982d35b188574144d6ae6c3f87'],
    };

    const parsedEvents = parseEvents([event], abiEvents, abiStructs, abiEnums);

    const result = [
      {
        cairo_event_struct: {
          test_name: 1708719217404197029088109386680815809747762070431461851150711916567020191623n,
        },
      },
    ];

    expect(parsedEvents).toEqual(result);
  });
});

import { AbiEntry, AbiEvent, CairoEventVariant, FunctionAbi, InterfaceAbi } from '../../src';
import { isAbiEvent, getAbiEvents } from '../../src/utils/events';

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
  name: 'test interface abi',
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
    const abiEventAndVariantName = 'cairo event struct';
    const abiCairoEventStruct: AbiEvent = {
      kind: 'struct',
      members: [
        {
          name: 'test name',
          type: 'test type',
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
          name: 'test name',
          type: abiEventAndVariantName,
          kind: 'data',
        },
      ],
      name: 'test cairo event',
      type: 'event',
    };

    const abiEvents = getAbiEvents([getInterfaceAbi(), abiCairoEventStruct, abiCairoEventEnum]);

    const result = {
      '0x39a2b7df1164974dbe26a66730afee631c761abd691bb7c9555bbf564d15f10': abiCairoEventStruct,
    };
    expect(abiEvents).toEqual(result);
  });

  test('should throw and error if Cairo1 ABI events definition is inconsistent', () => {
    const abiCairoEventStruct: AbiEvent = {
      kind: 'struct',
      members: [
        {
          name: 'test name',
          type: 'test type',
          kind: 'data',
        },
      ],
      name: 'cairo event struct',
      type: 'event',
    };

    const abiCairoEventEnum: CairoEventVariant = {
      kind: 'enum',
      variants: [
        {
          name: 'test name',
          type: 'cairo event struct variant',
          kind: 'data',
        },
      ],
      name: 'test cairo event',
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
          name: 'test name',
          type: 'test type',
          kind: 'data',
        },
      ],
      name: 'cairo event struct',
      type: 'event',
    };

    const abiEvents = getAbiEvents([getFunctionAbi(), abiCairoEventStruct]);
    const result = {
      '0x2bd2c1e69d74c920d0c4fbfd7e83a653d4a8e46f16516765fd625516bff90d8': abiCairoEventStruct,
    };
    expect(abiEvents).toEqual(result);
  });
});

import type {
  AbiEntry,
  AbiEnums,
  AbiEvent,
  AbiStructs,
  CairoEventVariant,
  InvokeTransactionReceiptResponse,
  RPC,
} from '../../src';
import { isAbiEvent, getAbiEvents, parseEvents, parseUDCEvent } from '../../src/utils/events';
import { getFunctionAbi, getInterfaceAbi, getAbiEntry } from '../factories/abi';

const getBaseTxReceiptData = (): InvokeTransactionReceiptResponse => ({
  type: 'INVOKE',
  transaction_hash: '0x6eebff0d931f36222268705ca791fd0de8d059eaf01887eecf1ce99a6c27f49',
  actual_fee: { unit: 'WEI', amount: '0x33d758c09000' },
  messages_sent: [],
  events: [],
  execution_status: 'SUCCEEDED',
  finality_status: 'ACCEPTED_ON_L2',
  block_hash: '0xdfc9b788478b2a2b9bcba19ab7d86996bcc45c4f8a865435469334e9077b24',
  block_number: 584,
  execution_resources: {
    steps: 9490,
    memory_holes: 143,
    range_check_builtin_applications: 198,
    pedersen_builtin_applications: 34,
    ec_op_builtin_applications: 3,
    data_availability: { l1_gas: 0, l1_data_gas: 544 },
  },
});

describe('isAbiEvent', () => {
  test('should return true if it is Abi event', () => {
    expect(isAbiEvent(getAbiEntry('event'))).toEqual(true);
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
    expect(abiEvents).toStrictEqual(result);
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

    const abiEvents = getAbiEvents([getFunctionAbi('event'), abiCairoEventStruct]);
    const result = {
      '0x27b21abc103381e154ea5c557dfe64466e0d25add7ef91a45718f5b8ee8fae3': abiCairoEventStruct,
    };
    expect(abiEvents).toStrictEqual(result);
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

    expect(parsedEvents).toStrictEqual(result);
  });

  test('should throw if ABI events has not enough data in "keys" property', () => {
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

    abiEvents['0x3c719ce4f57dd2d9059b9ffed65417d694a29982d35b188574144d6ae6c3f87'].name = '';
    expect(() => parseEvents([event], abiEvents, abiStructs, abiEnums)).toBeTruthy();
  });
});

describe('parseUDCEvent', () => {
  test('should return parsed UDC event', () => {
    const txReceipt: InvokeTransactionReceiptResponse = {
      ...getBaseTxReceiptData(),
      events: [
        {
          from_address: '0x41a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf',
          keys: ['0x26b160f10156dea0639bec90696772c640b9706a47f5b8c52ea1abe5858b34d'],
          data: [
            '0x1f1209f331cda3e84202f5495446028cd8730159ab24e08a5fd96125257673f',
            '0x6cee47a1571f83b30b3549fce4aceda18d2533a51b0016b75a50466c708daad',
            '0x0',
            '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
            '0x3',
            '0x546f6b656e',
            '0x4552433230',
            '0x6cee47a1571f83b30b3549fce4aceda18d2533a51b0016b75a50466c708daad',
            '0x76d9fae688efa7dc5defa712c1fa7df537e4c0f5f8b05842a1fd4a6d8d9d3a1',
          ],
        },
        {
          from_address: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
          keys: [
            '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9',
            '0x6cee47a1571f83b30b3549fce4aceda18d2533a51b0016b75a50466c708daad',
            '0x1000',
          ],

          data: ['0x33d758c09000', '0x0'],
        },
      ],
    };

    const parsedUDCEvent = parseUDCEvent(txReceipt);
    const result = {
      transaction_hash: '0x6eebff0d931f36222268705ca791fd0de8d059eaf01887eecf1ce99a6c27f49',
      contract_address: '0x1f1209f331cda3e84202f5495446028cd8730159ab24e08a5fd96125257673f',
      address: '0x1f1209f331cda3e84202f5495446028cd8730159ab24e08a5fd96125257673f',
      deployer: '0x6cee47a1571f83b30b3549fce4aceda18d2533a51b0016b75a50466c708daad',
      unique: '0x0',
      classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
      calldata_len: '0x3',
      calldata: [
        '0x546f6b656e',
        '0x4552433230',
        '0x6cee47a1571f83b30b3549fce4aceda18d2533a51b0016b75a50466c708daad',
      ],
      salt: '0x76d9fae688efa7dc5defa712c1fa7df537e4c0f5f8b05842a1fd4a6d8d9d3a1',
    };
    expect(parsedUDCEvent).toStrictEqual(result);
  });

  test('should throw an error if events are empty', () => {
    const txReceipt: InvokeTransactionReceiptResponse = {
      ...getBaseTxReceiptData(),
      events: [],
    };

    expect(() => parseUDCEvent(txReceipt)).toThrow(new Error('UDC emitted event is empty'));
  });
});

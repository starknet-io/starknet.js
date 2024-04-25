import { parseCalldataField } from '../../src/utils/calldata/requestParser';
import { decodeCalldataField } from '../../src/utils/calldata/calldataDecoder';
import assert from '../../src/utils/assert';
import { CairoUint256 } from '../../src/utils/cairoDataTypes/uint256';
import { AbiEnums, AbiStructs } from '../../src/types';

describe('Encode-Decode CalldataField Flow', () => {
  it('correctly encodes and decodes various types', () => {
    // Setup
    const structs: AbiStructs = {
      SimpleStruct: {
        type: 'struct',
        name: 'SimpleStruct',
        size: 2,
        members: [
          { name: 'id', type: 'felt', offset: 0 },
          { name: 'value', type: 'core::integer::u256', offset: 0 },
        ],
      },
    };
    const enums: AbiEnums = {}; // Assuming no enums for this test
    const simpleStructValue = { id: felt(123), value: new CairoUint256('0x1') };

    // Create a simple iterator for each value
    function* createIterator(value: any): Iterator<any> {
      yield value;
    }

    // Encode
    const encodedId = parseCalldataField(
      createIterator(simpleStructValue.id),
      { name: 'id', type: 'felt' },
      structs,
      enums
    );
    const encodedValue = parseCalldataField(
      createIterator(simpleStructValue.value.toApiRequest()),
      { name: 'value', type: 'core::integer::u256' },
      structs,
      enums
    );

    // Decode
    const decodedId = decodeCalldataField(
      typeof encodedId === 'string' ? [encodedId] : encodedId,
      { name: 'id', type: 'felt' },
      structs,
      enums
    );
    const decodedValue = decodeCalldataField(
      typeof encodedValue === 'string' ? [encodedValue] : encodedValue,
      { name: 'value', type: 'core::integer::u256' },
      structs,
      enums
    );

    // Assertions
    assert(decodedId.toEqual(simpleStructValue.id));
    assert(decodedValue.toBigInt().toEqual(simpleStructValue.value.toBigInt()));
    // assert(2 - 1 === 1, 'abcd');
  });
});

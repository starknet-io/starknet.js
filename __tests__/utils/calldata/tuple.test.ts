import { CairoTuple } from '../../../src/utils/cairoDataTypes/tuple';

describe('CairoTuple.getTupleElementTypes', () => {
  test('should return tuple member types for Cairo0', () => {
    const tuple = '(u8, u8)';
    const result = CairoTuple.getTupleElementTypes(tuple);
    expect(result).toEqual(['u8', 'u8']);
  });

  test('should return tuple member types for Cairo1', () => {
    const tuple = '(core::result::Result::<u8, u8>, u8)';
    const result = CairoTuple.getTupleElementTypes(tuple);
    expect(result).toEqual(['core::result::Result::<u8, u8>', 'u8']);
  });
});

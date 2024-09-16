import extractTupleMemberTypes from '../../../src/utils/calldata/tuple';

describe('extractTupleMemberTypes', () => {
  test('should return tuple member types for Cairo0', () => {
    const tuple = '(u8, u8)';
    const result = extractTupleMemberTypes(tuple);
    expect(result).toEqual(['u8', 'u8']);
  });

  test('should return tuple member types for Cairo1', () => {
    const tuple = '(core::result::Result::<u8, u8>, u8)';
    const result = extractTupleMemberTypes(tuple);
    expect(result).toEqual(['core::result::Result::<u8, u8>', 'u8']);
  });
});

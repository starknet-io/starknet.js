import { parseFalconOptions } from '../../../src/falcon/accountType';

describe('parseFalconOptions', () => {
  test('no options, empty options or an undefined accountType give s2morrow', () => {
    expect(parseFalconOptions(undefined)).toBe('s2morrow');
    expect(parseFalconOptions({})).toBe('s2morrow');
    expect(parseFalconOptions({ accountType: undefined })).toBe('s2morrow');
  });

  test('the three account types are returned as given', () => {
    expect(parseFalconOptions({ accountType: 's2morrow' })).toBe('s2morrow');
    expect(parseFalconOptions({ accountType: 'oz-hint' })).toBe('oz-hint');
    expect(parseFalconOptions({ accountType: 'oz-direct' })).toBe('oz-direct');
  });

  test('an unknown account type is refused', () => {
    expect(() => parseFalconOptions({ accountType: 'oz' })).toThrow('unknown accountType "oz"');
  });

  test('a misspelt option name is refused, instead of falling back to s2morrow', () => {
    expect(() => parseFalconOptions({ acountType: 'oz-hint' })).toThrow(
      'unknown option "acountType"'
    );
  });

  test('options that are not an object are refused', () => {
    expect(() => parseFalconOptions(0)).toThrow('options must be an object');
    expect(() => parseFalconOptions('oz-hint')).toThrow('options must be an object');
    expect(() => parseFalconOptions(null)).toThrow('options must be an object');
    expect(() => parseFalconOptions([])).toThrow('options must be an object');
  });
});

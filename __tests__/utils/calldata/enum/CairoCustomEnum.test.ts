import { CairoCustomEnum } from '../../../../src/utils/calldata/enum';

describe('CairoCustomEnum', () => {
  describe('constructor', () => {
    test('should set "variant" if enum content is provided', () => {
      const cairoCustomEnum = new CairoCustomEnum({ test: 'custom_enum' });
      expect(cairoCustomEnum.variant).toEqual({ test: 'custom_enum' });
    });

    test('should throw an error if enum does not have any variant', () => {
      const error = new Error('This Enum must have at least 1 variant');
      expect(() => new CairoCustomEnum({})).toThrow(error);
    });

    test('should throw an error if there is more then one active variant', () => {
      const content = { test: 'custom_enum', test2: 'custom_enum_2' };
      const error = new Error('This Enum must have exactly one active variant');
      expect(() => new CairoCustomEnum(content)).toThrow(error);
    });
  });

  describe('unwrap', () => {
    test('should return content of the valid variant', () => {
      const cairoCustomEnum = new CairoCustomEnum({ test: undefined, test2: 'test_2' });
      expect(cairoCustomEnum.unwrap()).toEqual('test_2');
    });
  });

  describe('activeVariant', () => {
    test('should return the name of the valid variant', () => {
      const cairoCustomEnum = new CairoCustomEnum({ test: undefined, test2: 'test_2' });
      expect(cairoCustomEnum.activeVariant()).toEqual('test2');
    });
  });
});

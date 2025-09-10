import { CallData, type BigNumberish, CairoOptionVariant, CairoOption } from '../../../../src';

describe('CairoOption', () => {
  describe('constructor', () => {
    test('should set "Some" if variant is 0', () => {
      const cairoOption = new CairoOption<string>(0, 'option_content');
      expect(cairoOption.Some).toEqual('option_content');
      expect(cairoOption.None).toBeUndefined();
    });

    test('should set "None" if variant is 1', () => {
      const cairoOption = new CairoOption<string>(1, 'option_content');
      expect(cairoOption.None).toEqual(true);
      expect(cairoOption.Some).toBeUndefined();
    });

    test('should throw an error if wrong variant is provided', () => {
      expect(() => new CairoOption<string>(2, 'option_content')).toThrow(
        new Error('Wrong variant! It should be CairoOptionVariant.Some or .None.')
      );
    });

    test('should throw an error if content is undefined or not provided', () => {
      expect(() => new CairoOption<string>(0)).toThrow(
        new Error('The creation of a Cairo Option with "Some" variant needs a content as input.')
      );
    });
  });

  describe('unwrap', () => {
    test('should return undefined if "None" value is set', () => {
      const cairoOption = new CairoOption<string>(1, 'option_content');
      expect(cairoOption.unwrap()).toBeUndefined();
    });

    test('should return "Some" value if it is set', () => {
      const cairoOption = new CairoOption<string>(0, 'option_content');
      expect(cairoOption.unwrap()).toEqual('option_content');
    });
  });

  describe('isSome', () => {
    test('should return true if "Some" value is set', () => {
      const cairoOption = new CairoOption<string>(0, 'option_content');
      expect(cairoOption.isSome()).toEqual(true);
    });
  });

  describe('isNone', () => {
    test('should return true if "None" value is set', () => {
      const cairoOption = new CairoOption<string>(1, 'option_content');
      expect(cairoOption.isNone()).toEqual(true);
    });
  });
  describe('encoding without Abi', () => {
    test('number', () => {
      expect(CallData.compile([new CairoOption<BigNumberish>(CairoOptionVariant.Some, 7)])).toEqual(
        ['0', '7']
      );
      expect(CallData.compile([new CairoOption<BigNumberish>(CairoOptionVariant.None)])).toEqual([
        '1',
      ]);
      expect(
        CallData.compile({ value: new CairoOption<BigNumberish>(CairoOptionVariant.Some, 7) })
      ).toEqual(['0', '7']);
      expect(
        CallData.compile({ value: new CairoOption<BigNumberish>(CairoOptionVariant.None) })
      ).toEqual(['1']);
    });
  });
});

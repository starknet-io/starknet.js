import {
  CairoOptionVariant,
  CairoTypeOption,
  CairoUint8,
  hdParsingStrategy,
} from '../../../../src';

describe('CairoTypeOption', () => {
  describe('constructor', () => {
    test('should set "Some" if variant is 0', () => {
      const val = 8;
      const typeCairo = 'core::option::Option::<core::integer::u8>';
      const cairoTypeOption0 = new CairoTypeOption(
        val,
        typeCairo,
        hdParsingStrategy,
        CairoOptionVariant.Some
      );
      expect(cairoTypeOption0.isVariantSome).toBe(true);
      expect(cairoTypeOption0.content).toEqual(new CairoUint8(8));
      expect(cairoTypeOption0.optionCairoType).toBe(typeCairo);
      expect(cairoTypeOption0.strategy).toEqual(hdParsingStrategy);
    });

    test('should set "None" if variant is 1', () => {
      const typeCairo = 'core::option::Option::<core::integer::u8>';
      const cairoTypeOption = new CairoTypeOption(
        undefined,
        typeCairo,
        hdParsingStrategy,
        CairoOptionVariant.None
      );
      expect(cairoTypeOption.isVariantSome).toBe(false);
      expect(cairoTypeOption.content).toBeUndefined();
      expect(cairoTypeOption.optionCairoType).toBe(typeCairo);
      expect(cairoTypeOption.strategy).toEqual(hdParsingStrategy);
    });

    // test('should throw an error if wrong variant is provided', () => {
    //   expect(() => new CairoTypeOption()).toThrow(
    //     new Error('Wrong variant! It should be CairoOptionVariant.Some or .None.')
    //   );
    // });

    //   test('should throw an error if content is undefined or not provided', () => {
    //     expect(() => new CairoOption<string>(0)).toThrow(
    //       new Error('The creation of a Cairo Option with "Some" variant needs a content as input.')
    //     );
    //   });
    // });

    // describe('unwrap', () => {
    //   test('should return undefined if "None" value is set', () => {
    //     const cairoOption = new CairoOption<string>(1, 'option_content');
    //     expect(cairoOption.unwrap()).toBeUndefined();
    //   });

    //   test('should return "Some" value if it is set', () => {
    //     const cairoOption = new CairoOption<string>(0, 'option_content');
    //     expect(cairoOption.unwrap()).toEqual('option_content');
    //   });
    // });

    // describe('isSome', () => {
    //   test('should return true if "Some" value is set', () => {
    //     const cairoOption = new CairoOption<string>(0, 'option_content');
    //     expect(cairoOption.isSome()).toEqual(true);
    //   });
    // });

    // describe('isNone', () => {
    //   test('should return true if "None" value is set', () => {
    //     const cairoOption = new CairoOption<string>(1, 'option_content');
    //     expect(cairoOption.isNone()).toEqual(true);
    //   });
  });
});

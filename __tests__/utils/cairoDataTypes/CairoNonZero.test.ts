import {
  CairoUint8,
  hdParsingStrategy,
  cairo,
  CairoUint256,
  CallData,
  CairoNonZero,
} from '../../../src';

describe('CairoNonZero', () => {
  describe('constructor types', () => {
    const typeCairo = 'core::zeroable::NonZero::<core::integer::u8>';
    const iter = ['9'][Symbol.iterator]();

    test('content is a BigNumberish', () => {
      const cairoNonZero0 = new CairoNonZero(8, typeCairo, hdParsingStrategy);
      expect(cairoNonZero0.content).toEqual(new CairoUint8(8));
      expect(cairoNonZero0.contentType).toBe('core::zeroable::NonZero::<core::integer::u8>');
      expect(cairoNonZero0.toApiRequest()).toEqual(['8']);
      expect(cairoNonZero0.decompose(hdParsingStrategy)).toBe(8n);
    });

    test('content is an iterator', () => {
      const cairoNonZero0 = new CairoNonZero(iter, typeCairo, hdParsingStrategy);
      expect(cairoNonZero0.content).toEqual(new CairoUint8(9));
      expect(cairoNonZero0.contentType).toBe('core::zeroable::NonZero::<core::integer::u8>');
      expect(cairoNonZero0.toApiRequest()).toEqual(['9']);
      expect(cairoNonZero0.decompose(hdParsingStrategy)).toBe(9n);
    });

    test('content is a CairoType', () => {
      const value = new CairoUint8(7);
      const cairoNonZero0 = new CairoNonZero(value, typeCairo, hdParsingStrategy);
      expect(cairoNonZero0.content).toEqual(value);
      expect(cairoNonZero0.contentType).toBe('core::zeroable::NonZero::<core::integer::u8>');
      expect(cairoNonZero0.toApiRequest()).toEqual(['7']);
      expect(cairoNonZero0.decompose(hdParsingStrategy)).toBe(7n);
    });

    test('content is a u256', () => {
      const value = cairo.uint256(1000);
      const valType = new CairoUint256(1000);
      const cairoNonZero0 = new CairoNonZero(
        value,
        'core::zeroable::NonZero::<core::integer::u256>',
        hdParsingStrategy
      );
      expect(cairoNonZero0.content).toEqual(valType);
      expect(cairoNonZero0.contentType).toBe('core::zeroable::NonZero::<core::integer::u256>');
      expect(cairoNonZero0.toApiRequest()).toEqual(['1000', '0']);
      expect(cairoNonZero0.decompose(hdParsingStrategy)).toBe(1000n);
      const cairoNonZero1 = new CairoNonZero(
        valType,
        'core::zeroable::NonZero::<core::integer::u256>',
        hdParsingStrategy
      );
      expect(cairoNonZero1.content).toEqual(valType);
      expect(cairoNonZero1.contentType).toBe('core::zeroable::NonZero::<core::integer::u256>');
      const cairoNonZero2 = new CairoNonZero(
        1000,
        'core::zeroable::NonZero::<core::integer::u256>',
        hdParsingStrategy
      );
      expect(cairoNonZero2.content).toEqual(valType);
      expect(cairoNonZero2.contentType).toBe('core::zeroable::NonZero::<core::integer::u256>');
      const cairoNonZero3 = new CairoNonZero(
        cairoNonZero2,
        'core::zeroable::NonZero::<core::integer::u64>',
        hdParsingStrategy
      );
      expect(cairoNonZero3.content).toEqual(valType);
      expect(cairoNonZero3.contentType).toBe('core::zeroable::NonZero::<core::integer::u256>');
    });
  });

  describe('zero values', () => {
    test('content is a u8', () => {
      expect(
        () => new CairoNonZero(0, 'core::zeroable::NonZero::<core::integer::u8>', hdParsingStrategy)
      ).toThrow(new Error('ValidateValue: value 0 is not authorized in NonZero type.'));
    });
    test('content is a u16', () => {
      expect(
        () =>
          new CairoNonZero(0, 'core::zeroable::NonZero::<core::integer::u16>', hdParsingStrategy)
      ).toThrow(new Error('ValidateValue: value 0 is not authorized in NonZero type.'));
    });
    test('content is a u32', () => {
      expect(
        () =>
          new CairoNonZero(0, 'core::zeroable::NonZero::<core::integer::u32>', hdParsingStrategy)
      ).toThrow(new Error('ValidateValue: value 0 is not authorized in NonZero type.'));
    });
    test('content is a u64', () => {
      expect(
        () =>
          new CairoNonZero(0, 'core::zeroable::NonZero::<core::integer::u64>', hdParsingStrategy)
      ).toThrow(new Error('ValidateValue: value 0 is not authorized in NonZero type.'));
    });
    test('content is a u96', () => {
      expect(
        () =>
          new CairoNonZero(
            0,
            'core::zeroable::NonZero::<core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>>',
            hdParsingStrategy
          )
      ).toThrow(new Error('ValidateValue: value 0 is not authorized in NonZero type.'));
    });
    test('content is a u128', () => {
      expect(
        () =>
          new CairoNonZero(0, 'core::zeroable::NonZero::<core::integer::u128>', hdParsingStrategy)
      ).toThrow(new Error('ValidateValue: value 0 is not authorized in NonZero type.'));
    });
    test('content is a u256', () => {
      expect(
        () =>
          new CairoNonZero(0, 'core::zeroable::NonZero::<core::integer::u256>', hdParsingStrategy)
      ).toThrow(new Error('ValidateValue: value 0 is not authorized in NonZero type.'));
    });
  });

  describe('invalid types', () => {
    test('content is a u512', () => {
      expect(
        () =>
          new CairoNonZero(8, 'core::zeroable::NonZero::<core::integer::u512>', hdParsingStrategy)
      ).toThrow(
        new Error('Validate: core::integer::u512 type is not authorized for NonZero type.')
      );
    });

    test('content is a i8', () => {
      expect(
        () => new CairoNonZero(8, 'core::zeroable::NonZero::<core::integer::i8>', hdParsingStrategy)
      ).toThrow(new Error('Validate: core::integer::i8 type is not authorized for NonZero type.'));
    });

    test('content is an array', () => {
      expect(
        () =>
          new CairoNonZero(
            [8, 9],
            'core::zeroable::NonZero::<core::array::Array::<core::integer::u8>>',
            hdParsingStrategy
          )
      ).toThrow(
        new Error(
          'Validate: core::array::Array::<core::integer::u8> type is not authorized for NonZero type.'
        )
      );
    });
  });

  describe('static methods', () => {
    test('is', () => {
      expect(CairoNonZero.is(200, 'core::zeroable::NonZero::<core::integer::u8>')).toBe(true);
      expect(CairoNonZero.is(100, 'core::zeroable::NonZero::<core::integer::i8>')).toBe(false);
    });

    test('isAbiType', () => {
      expect(CairoNonZero.isAbiType('core::zeroable::NonZero::<core::integer::u8>')).toBe(true);
      expect(CairoNonZero.isAbiType('core::wrong::<core::integer::u16>')).toBe(false);
    });

    test('validate', () => {
      expect(() =>
        CairoNonZero.validate(200, 'core::zeroable::NonZero::<core::integer::u8>')
      ).not.toThrow();
      expect(() =>
        CairoNonZero.validate(
          200,
          'core::zeroable::NonZero::<core::array::Array::<core::integer::u8>>'
        )
      ).toThrow(
        new Error(
          'Validate: core::array::Array::<core::integer::u8> type is not authorized for NonZero type.'
        )
      );
    });

    test('getNonZeroType', () => {
      expect(CairoNonZero.getNonZeroType('core::zeroable::NonZero::<core::integer::u16>')).toBe(
        'core::integer::u16'
      );
    });
  });

  describe('encoding without Abi', () => {
    test('number', () => {
      expect(
        CallData.compile([
          new CairoNonZero(7, 'core::zeroable::NonZero::<core::integer::u16>', hdParsingStrategy),
        ])
      ).toEqual(['7']);

      expect(
        CallData.compile({
          input: new CairoNonZero(
            7,
            'core::zeroable::NonZero::<core::integer::u16>',
            hdParsingStrategy
          ),
        })
      ).toEqual(['7']);
    });
  });
});

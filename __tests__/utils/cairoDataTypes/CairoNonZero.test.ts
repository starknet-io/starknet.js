import { CallData, cairo } from '../../../src';
import { CairoNonZero } from '../../../src/utils/cairoDataTypes/nonZero';
import { CairoUint8 } from '../../../src/utils/cairoDataTypes/uint8';
import { CairoUint256 } from '../../../src/utils/cairoDataTypes/uint256';
import { cairoTypeStrategy as S } from '../../../src/utils/calldata/parser/cairoTypeStrategy';

const NZ8 = 'core::zeroable::NonZero::<core::integer::u8>';
const NZ256 = 'core::zeroable::NonZero::<core::integer::u256>';
const NZ_FELT = 'core::zeroable::NonZero::<core::felt252>';

describe('CairoNonZero class Unit Tests', () => {
  describe('what the content may be', () => {
    test('should build from a number', () => {
      const nonZero = new CairoNonZero(8, NZ8, S);
      expect(nonZero.content).toEqual(new CairoUint8(8));
      expect(nonZero.contentType).toBe(NZ8);
      expect([...nonZero.toApiRequest()]).toEqual(['8']);
      expect(nonZero.decompose(S)).toBe(8n);
    });

    test('should build from a response', () => {
      const nonZero = new CairoNonZero(['9'].values(), NZ8, S);
      expect(nonZero.content).toEqual(new CairoUint8(9));
      expect([...nonZero.toApiRequest()]).toEqual(['9']);
      expect(nonZero.decompose(S)).toBe(9n);
    });

    test('should take a CairoType already built', () => {
      const value = new CairoUint8(7);
      const nonZero = new CairoNonZero(value, NZ8, S);
      expect(nonZero.content).toEqual(value);
      expect([...nonZero.toApiRequest()]).toEqual(['7']);
    });

    test('should copy a CairoNonZero handed to it whole', () => {
      const copy = new CairoNonZero(new CairoNonZero(8, NZ8, S), NZ8, S);
      expect([...copy.toApiRequest()]).toEqual(['8']);
      expect(copy.contentType).toBe(NZ8);
    });

    test('should wrap a u256, whatever shape it is given in', () => {
      const expected = new CairoUint256(1000);
      [cairo.uint256(1000), expected, 1000].forEach((value) => {
        const nonZero = new CairoNonZero(value, NZ256, S);
        expect(nonZero.content).toEqual(expected);
        expect([...nonZero.toApiRequest()]).toEqual(['1000', '0']);
        expect(nonZero.decompose(S)).toBe(1000n);
      });
    });

    test('should wrap a felt252', () => {
      expect([...new CairoNonZero(5, NZ_FELT, S).toApiRequest()]).toEqual(['5']);
    });
  });

  describe('zero is what this type exists to refuse', () => {
    test.each([
      ['u8', 'core::zeroable::NonZero::<core::integer::u8>'],
      ['u16', 'core::zeroable::NonZero::<core::integer::u16>'],
      ['u32', 'core::zeroable::NonZero::<core::integer::u32>'],
      ['u64', 'core::zeroable::NonZero::<core::integer::u64>'],
      ['u96', 'core::zeroable::NonZero::<core::integer::u96>'],
      ['u128', 'core::zeroable::NonZero::<core::integer::u128>'],
      ['u256', 'core::zeroable::NonZero::<core::integer::u256>'],
      ['felt252', 'core::zeroable::NonZero::<core::felt252>'],
    ])('should refuse a zero given raw as %s', (_name, type) => {
      expect(() => new CairoNonZero(0, type, S)).toThrow(
        'ValidateValue: value 0 is not authorized in NonZero type.'
      );
    });

    test('should let a zero through when it is already built', () => {
      // the check runs on a value this class builds itself; one handed in is taken as it stands
      expect([...new CairoNonZero(new CairoUint8(0), NZ8, S).toApiRequest()]).toEqual(['0']);
    });

    test('should let a zero through when it comes from a response', () => {
      // what a node answers is not the caller's mistake to catch
      expect([...new CairoNonZero(['0'].values(), NZ8, S).toApiRequest()]).toEqual(['0']);
    });
  });

  describe('the types Cairo allows here', () => {
    test('should refuse u512, which Cairo does not support', () => {
      expect(
        () => new CairoNonZero(1, 'core::zeroable::NonZero::<core::integer::u512>', S)
      ).toThrow('Validate: core::integer::u512 type is not authorized for NonZero type.');
    });

    test('should refuse a signed integer', () => {
      expect(() => new CairoNonZero(1, 'core::zeroable::NonZero::<core::integer::i8>', S)).toThrow(
        'Validate: core::integer::i8 type is not authorized for NonZero type.'
      );
    });

    test('should refuse a composite', () => {
      expect(
        () =>
          new CairoNonZero(
            [1],
            'core::zeroable::NonZero::<core::array::Array::<core::integer::u8>>',
            S
          )
      ).toThrow('is not authorized for NonZero type.');
    });
  });

  describe('static methods', () => {
    test('getNonZeroType', () => {
      expect(CairoNonZero.getNonZeroType(NZ8)).toBe('core::integer::u8');
      expect(CairoNonZero.getNonZeroType(NZ256)).toBe('core::integer::u256');
    });

    test('isAbiType', () => {
      expect(CairoNonZero.isAbiType(NZ8)).toBe(true);
      expect(CairoNonZero.isAbiType('core::integer::u8')).toBe(false);
    });

    test('validate', () => {
      expect(() => CairoNonZero.validate(1, NZ8)).not.toThrow();
      expect(() => CairoNonZero.validate(1, 'core::integer::u8')).toThrow(
        'The type core::integer::u8 is not a Cairo Non Zero. Needs core::zeroable::NonZero::<T>.'
      );
    });

    test('is should be the non-throwing form of validate, and say nothing about zero', () => {
      expect(CairoNonZero.is(1, NZ8)).toBe(true);
      expect(CairoNonZero.is(0, NZ8)).toBe(true);
      expect(CairoNonZero.is(1, 'core::integer::u8')).toBe(false);
    });
  });

  describe('the dynamic selector', () => {
    test('should name the class, on the class and on an instance', () => {
      expect(CairoNonZero.dynamicSelector).toBe('CairoNonZero');
      expect(new CairoNonZero(8, NZ8, S).dynamicSelector).toBe('CairoNonZero');
    });

    test('should be registered in the strategy', () => {
      expect(S.dynamicSelectors.CairoNonZero(NZ8)).toBe(true);
      expect(S.dynamicSelectors.CairoNonZero('core::integer::u8')).toBe(false);
      expect(typeof S.constructors.CairoNonZero).toBe('function');
      expect(typeof S.response.CairoNonZero).toBe('function');
    });
  });

  describe('toApiRequest method', () => {
    test('should add no felt of its own', () => {
      // the whole point: a NonZero is a promise about a value, not a shape around it
      expect([...new CairoNonZero(8, NZ8, S).toApiRequest()]).toEqual(['8']);
      expect([...new CairoNonZero(1000, NZ256, S).toApiRequest()]).toHaveLength(2);
    });

    test('should flag the result as compiled', () => {
      expect(new CairoNonZero(8, NZ8, S).toApiRequest()).toHaveProperty('__compiled__', true);
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance as its wrapped value', () => {
      expect(CallData.compile([new CairoNonZero(8, NZ8, S)] as any)).toEqual(['8']);
      expect(CallData.compile([new CairoNonZero(1000, NZ256, S)] as any)).toEqual(['1000', '0']);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [string, any][] = [
        [NZ8, 8],
        [NZ256, 1000],
        [NZ_FELT, 5],
      ];
      cases.forEach(([type, value]) => {
        const nonZero = new CairoNonZero(value, type, S);
        const response = [...nonZero.toApiRequest()].map(
          (felt) => `0x${BigInt(felt).toString(16)}`
        );
        const readBack = new CairoNonZero(response.values(), type, S);
        expect([...readBack.toApiRequest()]).toEqual([...nonZero.toApiRequest()]);
      });
    });
  });
});

import { AbiParser0, cairoTypeStrategy, fastParsingStrategy } from '../../../../src';
import { getFunctionAbi } from '../../../factories/abi';

/** A Cairo 0 abi: its types carry no `::`, which is what sends it to this parser. */
const cairo0 = () => [getFunctionAbi('felt')];

describe('AbiParser0', () => {
  test('should keep the abi it was given, flat', () => {
    const abi = cairo0();
    const abiParser = new AbiParser0(abi);
    expect(abiParser.getLegacyFormat()).toStrictEqual(abi);
  });

  describe('methodInputsLength', () => {
    test('should count every input', () => {
      expect(new AbiParser0(cairo0()).methodInputsLength(getFunctionAbi('felt'))).toEqual(1);
    });

    test('should discount an input that carries the length of an array', () => {
      // a Cairo 0 array is two inputs, `a_len` and `a`, and a caller passes one value: the length
      // is derived from it. This is the reduction AbiParser1 gave up when the two were split
      const functionAbi = getFunctionAbi('felt');
      functionAbi.inputs[0].name = 'test_len';
      expect(new AbiParser0(cairo0()).methodInputsLength(functionAbi)).toEqual(0);
    });
  });

  describe('the strategy shape it accepts', () => {
    test('should take the shape that predates the Cairo type classes', () => {
      expect(new AbiParser0(cairo0(), fastParsingStrategy).parsingStrategy).toBe(
        fastParsingStrategy
      );
    });

    test('should refuse the other, rather than ignore it', () => {
      expect(() => new AbiParser0(cairo0(), cairoTypeStrategy)).toThrow(
        'use `hdParsingStrategy` or `fastParsingStrategy`'
      );
    });
  });

  describe('the two directions', () => {
    test('should serialize a felt and read one back', () => {
      const abiParser = new AbiParser0(cairo0());
      expect(abiParser.parseRequestField(1000, { name: 'x', type: 'felt' })).toEqual(['1000']);
      expect(abiParser.parseResponse(['0x3e8'].values(), { name: 'x', type: 'felt' })).toBe(1000n);
    });

    test('should read an array back from the length read just before it', () => {
      // nothing in the felts says where a Cairo 0 array stops, so the `${name}_len` output already
      // parsed is what says how many to take
      const response = ['0x1', '0x2', '0x3'].values();
      expect(
        new AbiParser0(cairo0()).parseResponse(response, { name: 'r', type: 'felt*' }, {
          r_len: 3n,
        } as any)
      ).toEqual([1n, 2n, 3n]);
    });
  });
});

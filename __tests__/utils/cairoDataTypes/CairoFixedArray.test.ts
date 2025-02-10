import { CairoFixedArray } from '../../../src';

describe('CairoFixedArray class test', () => {
  test('inputs for a CairoFixedArray instance', () => {
    expect(new CairoFixedArray([2, 4, 6], '[core::integer::u32; 3]')).toBeDefined();
    expect(() => new CairoFixedArray([2, 4, 6], '[core::integer::u32; zorg]')).toThrow();
    expect(() => new CairoFixedArray([2, 4, 6], '[core::integer::u32]')).toThrow();
    expect(() => new CairoFixedArray([2, 4, 6], 'core::integer::u32; 3')).toThrow();
    expect(() => new CairoFixedArray([2, 4, 6], '[; 3]')).toThrow();
  });

  test('use dynamic class methods', () => {
    const myFixedArray = new CairoFixedArray([1, 2, 3], '[core::integer::u32; 3]');
    expect(myFixedArray.getFixedArraySize()).toBe(3);
    expect(myFixedArray.getFixedArrayType()).toBe('core::integer::u32');
  });

  test('use static methods for CallData.compile()', () => {
    expect(CairoFixedArray.getFixedArraySize('[core::integer::u32; 8]')).toBe(8);
    expect(() => CairoFixedArray.getFixedArraySize('[core::integer::u32; zorg]')).toThrow();
    expect(CairoFixedArray.getFixedArrayType('[core::integer::u32; 8]')).toBe('core::integer::u32');
    expect(() => CairoFixedArray.getFixedArrayType('[; 8]')).toThrow();
    expect(CairoFixedArray.isTypeFixedArray('[core::integer::u32; 8]')).toBe(true);
    expect(CairoFixedArray.isTypeFixedArray('[core::integer::u32;8]')).toBe(false);
    expect(CairoFixedArray.isTypeFixedArray('[core::integer::u32; zorg]')).toBe(false);
  });

  test('prepare fixed array for CallData.compile()', () => {
    const myFixedArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
    expect(myFixedArray.compile()).toStrictEqual({ '0': 10, '1': 20, '2': 30 });
    expect(CairoFixedArray.compile([10, 20, 30])).toStrictEqual({ '0': 10, '1': 20, '2': 30 });
  });
});

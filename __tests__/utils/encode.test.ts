import { encode } from '../../src';
import { atobUniversal, btoaUniversal } from '../../src/utils/encode';

describe('atobUniversal and btoaUniversal functions', () => {
  test('atobUniversal should decode base64 string to Uint8Array', () => {
    const base64 = 'SGVsbG8sIFdvcmxkIQ=='; // "Hello, World!" in base64
    const expected = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);
    const result = atobUniversal(base64);
    expect(result).toEqual(expected);
  });

  test('btoaUniversal should encode ArrayBuffer to base64 string', () => {
    const { buffer } = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);

    const expected = 'SGVsbG8sIFdvcmxkIQ=='; // "Hello, World!" in base64
    const result = btoaUniversal(buffer);
    expect(result).toBe(expected);
  });

  test('should round trip encode/decode correctly', () => {
    const originalString = 'Hello, World!';
    const { buffer } = new TextEncoder().encode(originalString);
    const encoded = btoaUniversal(buffer);
    const decoded = new TextDecoder().decode(atobUniversal(encoded));
    expect(decoded).toBe(originalString);
  });

  test('should handle empty string', () => {
    const emptyBuffer = new ArrayBuffer(0);
    const encoded = btoaUniversal(emptyBuffer);
    expect(encoded).toBe('');
    const decoded = atobUniversal(encoded);
    expect(decoded).toEqual(new Uint8Array([]));
  });
});

describe('concatenateArrayBuffer', () => {
  test('should concatenate uint8Arrays', () => {
    const path0buff = new Uint8Array([128, 0, 10, 85]);
    const path1buff = new Uint8Array([71, 65, 233, 201]);
    const result = encode.concatenateArrayBuffer([path0buff, path1buff]);
    expect(result).toEqual(new Uint8Array([128, 0, 10, 85, 71, 65, 233, 201]));
  });
});

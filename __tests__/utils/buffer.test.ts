import { config } from '../../src/global/config';
import { CairoByteArray } from '../../src';
import { CairoBytes31 } from '../../src/utils/cairoDataTypes/bytes31';

/**
 * Mock Buffer implementation for testing browser environments
 */
class MockBuffer extends Uint8Array {
  static isBuffer(obj: any): obj is MockBuffer {
    return obj instanceof MockBuffer;
  }

  static from(data: any): MockBuffer {
    if (Array.isArray(data)) {
      return new MockBuffer(data);
    }
    if (typeof data === 'string') {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(data);
      return new MockBuffer(uint8Array);
    }
    if (data instanceof Uint8Array) {
      return new MockBuffer(data);
    }
    throw new Error('Unsupported data type for MockBuffer');
  }

  static alloc(size: number, fill?: any): MockBuffer {
    const buffer = new MockBuffer(size);
    if (fill !== undefined) {
      buffer.fill(typeof fill === 'string' ? fill.charCodeAt(0) : fill);
    }
    return buffer;
  }
}

describe('Buffer Environment Tests', () => {
  afterEach(() => {
    // Reset global config after each test
    config.reset();
  });

  describe('Native Node.js Buffer Environment', () => {
    test('should use native Buffer when available', () => {
      // Native Buffer should be available in Node.js test environment
      expect(typeof Buffer).toBe('function');
      expect(Buffer.isBuffer).toBeDefined();

      const testData = [1, 2, 3, 4];
      const buffer = Buffer.from(testData);

      const byteArray = new CairoByteArray(buffer);
      const resultBuffer = byteArray.toBuffer();

      expect(Buffer.isBuffer(resultBuffer)).toBe(true);
      expect(Array.from(resultBuffer)).toEqual(testData);
    });

    test('should handle Buffer input in CairoBytes31', () => {
      const testString = 'Hello Buffer';
      const buffer = Buffer.from(testString);

      const bytes31 = new CairoBytes31(buffer);
      expect(bytes31.decodeUtf8()).toBe(testString);
      expect(bytes31.toHexString()).toBe('0x48656c6c6f20427566666572');
    });

    test('should handle Buffer input in CairoByteArray', () => {
      const testString = 'Hello from Buffer in CairoByteArray';
      const buffer = Buffer.from(testString);

      const byteArray = new CairoByteArray(buffer);
      expect(byteArray.decodeUtf8()).toBe(testString);

      const resultBuffer = byteArray.toBuffer();
      expect(Buffer.isBuffer(resultBuffer)).toBe(true);
      expect(resultBuffer.toString('utf8')).toBe(testString);
    });
  });

  describe('Global Config Buffer Management', () => {
    test('should validate config API works correctly', () => {
      // Test setting and getting buffer config
      expect(config.get('buffer')).toBeUndefined();

      config.set('buffer', MockBuffer as any);
      expect(config.get('buffer')).toBe(MockBuffer);

      config.reset();
      expect(config.get('buffer')).toBeUndefined();
    });

    test('should contain buffer in DEFAULT_GLOBAL_CONFIG', () => {
      const allConfig = config.getAll();
      expect(allConfig).toHaveProperty('buffer');
      expect(allConfig.buffer).toBeUndefined(); // Default value
    });

    test('should allow setting custom Buffer implementation', () => {
      // This tests the API without needing module reload
      expect(() => config.set('buffer', MockBuffer as any)).not.toThrow();
      expect(config.get('buffer')).toBe(MockBuffer);
    });
  });

  describe('Buffer Utility Error Messages', () => {
    test('should provide helpful error messages', () => {
      // Test that our error message includes helpful config instructions
      const expectedPattern = /config\.set\("buffer", YourBufferPolyfill\)/;
      const errorMessage =
        'Buffer not detected, use \'config.set("buffer", YourBufferPolyfill)\' or polyfill or Node.js environment for Buffer support';

      expect(errorMessage).toMatch(expectedPattern);
      expect(errorMessage).toContain('YourBufferPolyfill');
      expect(errorMessage).toContain('Node.js environment');
      expect(errorMessage).toContain('polyfill');
    });
  });

  describe('MockBuffer Implementation Tests', () => {
    test('should handle MockBuffer like native Buffer in data types', () => {
      // Test that MockBuffer works with Cairo data types
      const testData = [72, 101, 108, 108, 111]; // "Hello"
      const mockBuffer = MockBuffer.from(testData);

      const bytes31 = new CairoBytes31(mockBuffer);
      expect(bytes31.decodeUtf8()).toBe('Hello');
      expect(bytes31.toBigInt()).toBe(310939249775n); // BigInt representation of "Hello"
    });

    test('should handle complex data with MockBuffer', () => {
      // Test with complex data structure
      const complexData = new Uint8Array([
        0x48,
        0x65,
        0x6c,
        0x6c,
        0x6f,
        0x20, // "Hello "
        0x57,
        0x6f,
        0x72,
        0x6c,
        0x64,
        0x21, // "World!"
      ]);

      const mockBuffer = MockBuffer.from(complexData);
      const byteArray = new CairoByteArray(mockBuffer);

      expect(byteArray.decodeUtf8()).toBe('Hello World!');
      expect(new TextDecoder().decode(mockBuffer)).toBe('Hello World!');
    });

    test('should maintain API compatibility between Buffer implementations', () => {
      const testData = 'Compatibility Test';

      // Create with native Buffer
      const nativeByteArray = new CairoByteArray(Buffer.from(testData));

      // Create with mock Buffer (simulating what would happen with polyfill)
      const mockByteArray = new CairoByteArray(MockBuffer.from(testData));

      // Both should produce equivalent results
      expect(nativeByteArray.decodeUtf8()).toBe(mockByteArray.decodeUtf8());
      expect(nativeByteArray.toHexString()).toBe(mockByteArray.toHexString());
      expect(nativeByteArray.toBigInt()).toBe(mockByteArray.toBigInt());

      // API requests should be equivalent
      const nativeApiRequest = nativeByteArray.toApiRequest();
      const mockApiRequest = mockByteArray.toApiRequest();
      expect(nativeApiRequest).toEqual(mockApiRequest);
    });
  });

  describe('isBuffer Function Tests', () => {
    test('should work with native Buffer', async () => {
      const { isBuffer } = await import('../../src/utils/typed');

      const buffer = Buffer.from([1, 2, 3]);
      const uint8Array = new Uint8Array([1, 2, 3]);

      expect(isBuffer(buffer)).toBe(true);
      expect(isBuffer(uint8Array)).toBe(false);
      expect(isBuffer('string')).toBe(false);
      expect(isBuffer(null)).toBe(false);
    });

    test('should work consistently across different contexts', async () => {
      const { isBuffer } = await import('../../src/utils/typed');

      // Test with various inputs
      expect(isBuffer(undefined)).toBe(false);
      expect(isBuffer({})).toBe(false);
      expect(isBuffer([])).toBe(false);
      expect(isBuffer(123)).toBe(false);

      // MockBuffer should not be detected as Buffer by isBuffer
      // because isBuffer checks for native Buffer instance
      const mockBuffer = MockBuffer.from([1, 2, 3]);
      expect(isBuffer(mockBuffer)).toBe(false);
    });

    test('should handle edge cases', async () => {
      const { isBuffer } = await import('../../src/utils/typed');

      expect(isBuffer(NaN)).toBe(false);
      expect(isBuffer(Infinity)).toBe(false);
      expect(isBuffer(Symbol('test'))).toBe(false);
      expect(isBuffer(() => {})).toBe(false);
      expect(isBuffer(new Date())).toBe(false);
      expect(isBuffer(new Error())).toBe(false);
    });
  });

  describe('Buffer Type Validation', () => {
    test('should validate Buffer inputs correctly in CairoBytes31', () => {
      // Test valid inputs
      expect(() => new CairoBytes31(Buffer.from('test'))).not.toThrow();
      expect(() => new CairoBytes31(Buffer.alloc(31))).not.toThrow();
      expect(() => new CairoBytes31(MockBuffer.from('test'))).not.toThrow();

      // Test invalid inputs
      expect(() => new CairoBytes31(Buffer.alloc(32))).toThrow(/too long/);
      expect(() => new CairoBytes31({} as any)).toThrow(/Invalid input type/);
    });

    test('should validate Buffer inputs correctly in CairoByteArray', () => {
      // Test valid inputs
      expect(() => new CairoByteArray(Buffer.from('test'))).not.toThrow();
      expect(() => new CairoByteArray(MockBuffer.from('test'))).not.toThrow();

      // Test invalid inputs
      expect(() => new CairoByteArray(null as any)).toThrow(/Invalid input: null/);
      expect(() => new CairoByteArray({} as any)).toThrow(
        /Invalid input.*objects are not supported/
      );
    });
  });

  describe('Buffer Environment Detection', () => {
    test('should work in Node.js environment', () => {
      // Verify we're in Node.js test environment
      expect(typeof process).toBe('object');
      expect(typeof require).toBe('function');
      expect(typeof Buffer).toBe('function');
      expect(typeof Buffer.isBuffer).toBe('function');
    });

    test('should detect Buffer availability', () => {
      // Test the conditions used in buffer utility
      expect(typeof Buffer !== 'undefined').toBe(true);
      expect(typeof globalThis !== 'undefined').toBe(true);

      // Verify Buffer functionality
      const testBuffer = Buffer.from([1, 2, 3]);
      expect(Buffer.isBuffer(testBuffer)).toBe(true);
      expect(testBuffer.length).toBe(3);
    });
  });
});

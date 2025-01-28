import { constants, config } from '../../src';

describe('Configuration', () => {
  // Reset the configuration before each test to avoid side effects
  beforeEach(() => {
    config.reset();
  });

  describe('Initial Configuration', () => {
    it('should initialize with default values', () => {
      expect(config.get('legacyMode')).toBe(constants.DEFAULT_GLOBAL_CONFIG.legacyMode);
      expect(config.get('logLevel')).toBe(constants.DEFAULT_GLOBAL_CONFIG.logLevel);
    });
  });

  describe('get()', () => {
    it('should retrieve the value of an existing key', () => {
      expect(config.get('logLevel')).toBe(constants.DEFAULT_GLOBAL_CONFIG.logLevel);
    });

    it('should return the default value for a non-existent key', () => {
      expect(config.get('nonExistentKey', 'default')).toBe('default');
    });

    it('should return undefined for a non-existent key without a default', () => {
      expect(config.get('nonExistentKey')).toBeUndefined();
    });
  });

  describe('set()', () => {
    it('should update the value of an existing key', () => {
      config.set('logLevel', 'DEBUG');
      expect(config.get('logLevel')).toBe('DEBUG');
    });

    it('should add a new key-value pair', () => {
      config.set('newKey', 'value');
      expect(config.get('newKey')).toBe('value');
    });
  });

  describe('update()', () => {
    it('should merge provided configuration with existing values', () => {
      config.update({ legacyMode: true, newKey: 'value' });
      expect(config.get('legacyMode')).toBe(true);
      expect(config.get('newKey')).toBe('value');
      expect(config.get('logLevel')).toBe('INFO'); // Existing key remains unchanged
    });
  });

  describe('getAll()', () => {
    it('should return a copy of the configuration', () => {
      const all = config.getAll();
      all.legacyMode = true; // Modify the copy
      expect(config.get('legacyMode')).toBe(false); // Original remains unaffected
    });
  });

  describe('reset()', () => {
    it('should restore the configuration to initial defaults', () => {
      config.set('logLevel', 'ERROR');
      config.reset();
      expect(config.get('logLevel')).toBe('INFO');
    });
  });

  describe('delete()', () => {
    it('should remove a key from the configuration', () => {
      config.set('newKey', 'value');
      config.delete('newKey');
      expect(config.hasKey('newKey')).toBe(false);
    });

    it('should do nothing if the key does not exist', () => {
      config.delete('nonExistentKey');
      expect(config.hasKey('nonExistentKey')).toBe(false);
    });
  });

  describe('hasKey()', () => {
    it('should return true for existing keys', () => {
      expect(config.hasKey('logLevel')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(config.hasKey('nonExistentKey')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined values with default in get()', () => {
      config.set('logLevel', undefined);
      expect(config.get('logLevel', 'DEFAULT')).toBe('DEFAULT');
    });

    it('should treat keys as case-sensitive', () => {
      config.set('LogLevel', 'DEBUG');
      expect(config.hasKey('LogLevel')).toBe(true);
      expect(config.hasKey('logLevel')).toBe(true); // Original key still exists
    });
  });
});

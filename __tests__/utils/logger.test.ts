/* eslint-disable no-console */
import { LogLevel } from '../../src';

// Mock console methods first
const mockConsole = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
};

global.console = mockConsole as any;

// Create the mock config store with an index signature
const mockConfigStore: {
  logLevel: LogLevel;
  rpcVersion: string;
  [key: string]: any; // Add this index signature to allow any string key
} = {
  logLevel: 'INFO' as LogLevel,
  rpcVersion: '0.8',
};

// Use doMock instead of mock (doesn't get hoisted)
jest.doMock('../../src/global/config', () => ({
  config: {
    get: jest.fn().mockImplementation((key: string, defaultValue?: any) => {
      return mockConfigStore[key] ?? defaultValue;
    }),
    set: jest.fn().mockImplementation((key: string, value: any) => {
      mockConfigStore[key] = value;
    }),
  },
}));

// Import logger AFTER the mock is set up
const { logger } = require('../../src');

describe('Logger', () => {
  // const gLog = jest.spyOn(global.console, 'log');
  const gInfo = jest.spyOn(global.console, 'info');
  const gDebug = jest.spyOn(global.console, 'debug');
  const gWarn = jest.spyOn(global.console, 'warn');
  const gError = jest.spyOn(global.console, 'error');

  beforeEach(() => {
    // Reset mock config and console calls
    mockConfigStore.logLevel = 'INFO';
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('Log Level Configuration', () => {
    it('should have config log level', () => {
      expect(logger.getLogLevel()).toBe('INFO');
    });

    it('should set and get log level OFF', () => {
      logger.setLogLevel('OFF');
      expect(logger.getLogLevel()).toBe('OFF');
      expect(logger.getEnabledLogLevels()).toStrictEqual([]);
    });

    it('should set and get log level FATAL', () => {
      logger.setLogLevel('FATAL');
      expect(logger.getLogLevel()).toBe('FATAL');
      expect(logger.getEnabledLogLevels()).toStrictEqual(['FATAL']);
    });

    it('should set and get log level ERROR', () => {
      logger.setLogLevel('ERROR');
      expect(logger.getLogLevel()).toBe('ERROR');
      expect(logger.getEnabledLogLevels()).toStrictEqual(['ERROR', 'FATAL']);
    });

    it('should set and get log level WARN', () => {
      logger.setLogLevel('WARN');
      expect(logger.getLogLevel()).toBe('WARN');
      expect(logger.getEnabledLogLevels()).toStrictEqual(['WARN', 'ERROR', 'FATAL']);
    });

    it('should set and get log level INFO', () => {
      logger.setLogLevel('INFO');
      expect(logger.getLogLevel()).toBe('INFO');
      expect(logger.getEnabledLogLevels()).toStrictEqual(['INFO', 'WARN', 'ERROR', 'FATAL']);
    });

    it('should set and get log level DEBUG', () => {
      logger.setLogLevel('DEBUG');
      expect(logger.getLogLevel()).toBe('DEBUG');
      expect(logger.getEnabledLogLevels()).toStrictEqual([
        'DEBUG',
        'INFO',
        'WARN',
        'ERROR',
        'FATAL',
      ]);
    });
  });

  describe('Log Filtering', () => {
    it('should log messages at or above current level', () => {
      logger.setLogLevel('WARN');

      logger.debug('Debug message');
      logger.warn('Warning message');

      expect(gDebug).not.toHaveBeenCalled();
      expect(gWarn).toHaveBeenCalled();
    });

    it('should not log when level is OFF', () => {
      logger.setLogLevel('OFF');

      logger.error('Error message');
      logger.fatal('Fatal message');

      expect(gError).not.toHaveBeenCalled();
      expect(gError).not.toHaveBeenCalled();
    });
  });

  describe('Log Methods', () => {
    it('should format messages correctly', () => {
      logger.info('Test message', { key: 'value' });

      const expectedMessage = `[2024-01-01T00:00:00.000Z] INFO: Test message\n${JSON.stringify({ key: 'value' }, null, 2)}`;
      expect(gInfo).toHaveBeenCalledWith(expectedMessage);
    });

    it('should use appropriate console methods', () => {
      logger.setLogLevel('DEBUG');
      logger.debug('Debug');
      logger.info('Info');
      logger.warn('Warn');
      logger.error('Error');
      logger.fatal('Fatal');

      expect(gDebug).toHaveBeenCalled();
      expect(gInfo).toHaveBeenCalled();
      expect(gWarn).toHaveBeenCalled();
      expect(gError).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data', () => {
      logger.info('Message without data');
      const expectedMessage = '[2024-01-01T00:00:00.000Z] INFO: Message without data';
      expect(gInfo).toHaveBeenCalledWith(expectedMessage);
    });

    it('should handle circular data structures', () => {
      logger.setLogLevel('DEBUG');
      const circularObj: any = { a: 'test' };
      circularObj.myself = circularObj;

      logger.error('Circular error', circularObj);

      // Should handle circular references in stringification
      expect(gError).toHaveBeenCalled();
    });
  });
});

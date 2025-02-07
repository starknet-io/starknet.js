/* eslint-disable no-console */
import { config } from './config';
import { LogLevelIndex, LogLevel } from './logger.type';

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}
/**
 * Logging class providing different levels of log
 */
class Logger {
  private static instance: Logger;

  private config: typeof config;

  private constructor() {
    this.config = config;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private shouldLog(messageLevel: LogLevelIndex): boolean {
    const configLevel = this.config.get('logLevel', 'INFO');
    return messageLevel <= LogLevelIndex[configLevel as LogLevel];
  }

  private formatMessage(logMessage: LogMessage): string {
    const { level, message, timestamp, data } = logMessage;
    let formattedMessage = `[${timestamp}] ${level}: ${message}`;

    if (data) {
      try {
        formattedMessage += `\n${JSON.stringify(data, null, 2)}`;
      } catch (error) {
        formattedMessage += `\n[JSON.stringify Error/Circular]: ${error}`;
      }
    }

    return formattedMessage;
  }

  private log(level: LogLevel, message: string, data?: any): void {
    if (!this.shouldLog(LogLevelIndex[level])) {
      return;
    }

    const logMessage: LogMessage = {
      level,
      message,
      timestamp: this.getTimestamp(),
      data,
    };

    const formattedMessage = this.formatMessage(logMessage);

    switch (level) {
      case 'DEBUG':
        console.debug(formattedMessage);
        break;
      case 'INFO':
        console.info(formattedMessage);
        break;
      case 'WARN':
        console.warn(formattedMessage);
        break;
      case 'ERROR':
      case 'FATAL':
        console.error(formattedMessage);
        break;
      case 'OFF':
        // Do nothing when logging is off
        break;
      default:
        console.log(formattedMessage); // Default fallback for unknown log levels
        break;
    }
  }

  /**
   * debug will be displayed when LogLevel level is set to DEBUG(5)
   */
  public debug(message: string, data?: any): void {
    this.log('DEBUG', message, data);
  }

  /**
   * info will be displayed when LogLevel level is set to DEBUG(5), INFO(4)
   */
  public info(message: string, data?: any): void {
    this.log('INFO', message, data);
  }

  /**
   * warn will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3)
   */
  public warn(message: string, data?: any): void {
    this.log('WARN', message, data);
  }

  /**
   * error will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2)
   */
  public error(message: string, data?: any): void {
    this.log('ERROR', message, data);
  }

  /**
   * fatal will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2), FATAL(1)
   */
  public fatal(message: string, data?: any): void {
    this.log('FATAL', message, data);
  }

  /**
   * Set the logging level you would like system to display
   * * 5 DEBUG  - show all logs
   * * 4 INFO
   * * 3 WARN
   * * 2 ERROR
   * * 1 FATAL
   * * 0 OFF    - disable logs
   */
  public setLogLevel(level: LogLevel): void {
    this.config.set('logLevel', level);
  }

  public getLogLevel(): LogLevel {
    return this.config.get('logLevel', 'INFO');
  }

  /**
   *
   * @returns logs levels displayed on the configured LogLevel
   */
  public getEnabledLogLevels() {
    return Object.keys(LogLevelIndex).filter((s) => {
      return this.shouldLog(LogLevelIndex[s as LogLevel]) && s !== 'OFF';
    });
  }
}

// Export a single instance
/**
 * Logger instance, use for the system logging.
 * Higher the logger level index, higher the LogLevel required to display log.
 * Default should be INFO
 *
 * DEBUG: 5,
 * INFO: 4,
 * WARN: 3,
 * ERROR: 2,
 * FATAL: 1,
 */
export const logger = Logger.getInstance();

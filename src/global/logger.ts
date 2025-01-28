/* eslint-disable no-console */
import { config } from './config';
import { LogLevelIndex, LogLevel } from './logger.type';

interface LogMessage {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

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
    const configLevel = this.config.get<string>('logLevel', 'INFO');
    return messageLevel <= LogLevelIndex[configLevel as LogLevel];
  }

  private formatMessage(logMessage: LogMessage): string {
    const { level, message, timestamp, data } = logMessage;
    let formattedMessage = `[${timestamp}] ${level}: ${message}`;

    if (data) {
      try {
        formattedMessage += `\n${JSON.stringify(data, null, 2)}`;
      } catch (error) {
        formattedMessage += `\n[JSON.stringify Error/Circular]`;
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

  public debug(message: string, data?: any): void {
    this.log('DEBUG', message, data);
  }

  public info(message: string, data?: any): void {
    this.log('INFO', message, data);
  }

  public warn(message: string, data?: any): void {
    this.log('WARN', message, data);
  }

  public error(message: string, data?: any): void {
    this.log('ERROR', message, data);
  }

  public fatal(message: string, data?: any): void {
    this.log('FATAL', message, data);
  }

  public setLogLevel(level: LogLevel): void {
    this.config.set('logLevel', level);
  }

  public getLogLevel(): LogLevel {
    return this.config.get<string>('logLevel', 'INFO');
  }

  public getEnabledLogLevels() {
    const logLevelStringKeys = Object.keys(LogLevelIndex).filter(
      (v) => Number.isNaN(Number(v)) && v !== 'OFF'
    );
    const logLevels = logLevelStringKeys.filter((s) => {
      return this.shouldLog(LogLevelIndex[s as LogLevel]);
    });

    return logLevels;
  }
}

// Export a single instance
export const logger = Logger.getInstance();

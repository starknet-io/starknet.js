import { config } from './config';

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
  OFF = 5,
}

type LogLevelStrings = keyof typeof LogLevel;

interface LogMessage {
  level: LogLevelStrings;
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

  private shouldLog(messageLevel: LogLevel): boolean {
    const configLevel = this.config.get<string>('logLevel', 'INFO');
    return messageLevel >= LogLevel[configLevel as LogLevelStrings];
  }

  private formatMessage(logMessage: LogMessage): string {
    const { level, message, timestamp, data } = logMessage;
    let formattedMessage = `[${timestamp}] ${level}: ${message}`;

    if (data) {
      formattedMessage += `\n${JSON.stringify(data, null, 2)}`;
    }

    return formattedMessage;
  }

  private log(level: LogLevelStrings, message: string, data?: any): void {
    if (!this.shouldLog(LogLevel[level])) {
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

  public setLogLevel(level: LogLevelStrings): void {
    this.config.set('logLevel', level);
  }
}

// Export a single instance
export const logger = Logger.getInstance();

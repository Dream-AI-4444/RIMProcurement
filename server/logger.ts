import { config } from './config';

// Log levels
type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// Log level priority (lower number = higher priority)
const logLevelPriority: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

// Current log level from config
const currentLogLevel = logLevelPriority[config.LOG_LEVEL];

// Helper to determine if a log level should be displayed
const shouldLog = (level: LogLevel): boolean => {
  return logLevelPriority[level] <= currentLogLevel;
};

// Format current timestamp
const timestamp = (): string => {
  return new Date().toISOString();
};

// Logger implementation
export const logger = {
  error: (message: string, ...args: any[]): void => {
    if (shouldLog('error')) {
      console.error(`[ERROR] ${timestamp()} - ${message}`, ...args);
    }
  },

  warn: (message: string, ...args: any[]): void => {
    if (shouldLog('warn')) {
      console.warn(`[WARN] ${timestamp()} - ${message}`, ...args);
    }
  },

  info: (message: string, ...args: any[]): void => {
    if (shouldLog('info')) {
      console.info(`[INFO] ${timestamp()} - ${message}`, ...args);
    }
  },

  debug: (message: string, ...args: any[]): void => {
    if (shouldLog('debug')) {
      console.debug(`[DEBUG] ${timestamp()} - ${message}`, ...args);
    }
  },

  // Log HTTP request (for middleware)
  request: (req: any, status: number, duration: number): void => {
    if (shouldLog('info')) {
      const { method, originalUrl, ip } = req;
      console.info(`[INFO] ${timestamp()} - ${method} ${originalUrl} ${status} ${duration}ms - ${ip}`);
    }
  }
};

export default logger;

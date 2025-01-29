import { ValuesType } from '../types/helpers/valuesType';

export const LogLevelIndex = {
  DEBUG: 5,
  INFO: 4,
  WARN: 3,
  ERROR: 2,
  FATAL: 1,
  OFF: 0,
};

export type LogLevelIndex = ValuesType<typeof LogLevelIndex>;

export type LogLevel = keyof typeof LogLevelIndex;

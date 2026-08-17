import { logger } from '../../../src/global/logger';

/**
 * Silence the SDK logger while `fn` runs.
 *
 * A test that deliberately drives an error path makes the logger write to `console.error`, and
 * Jest prints that under a **passing** suite. A green run littered with error output trains the
 * reader to skip past it, which is exactly how a real error gets missed.
 *
 * Wrapping the step that provokes the log keeps the run readable without weakening anything: the
 * behaviour is still asserted, only the narration is dropped. Wrap the provoking step, not the
 * whole test — an unexpected error logged elsewhere must stay visible.
 */
export const withoutErrorLogs = async <T>(fn: () => T | Promise<T>): Promise<T> => {
  const previous = logger.getLogLevel();
  logger.setLogLevel('OFF');
  try {
    return await fn();
  } finally {
    logger.setLogLevel(previous);
  }
};

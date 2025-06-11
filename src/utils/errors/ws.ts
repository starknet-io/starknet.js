/* eslint-disable max-classes-per-file */

/**
 * Thrown when a WebSocket request does not receive a response within the configured timeout period.
 *
 * @property {string} name - The name of the error, always 'TimeoutError'.
 */
export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}

/**
 * Thrown when an operation is attempted on a WebSocket that is not connected.
 *
 * @property {string} name - The name of the error, always 'WebSocketNotConnectedError'.
 */
export class WebSocketNotConnectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebSocketNotConnectedError';
  }
}

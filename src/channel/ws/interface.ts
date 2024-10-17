export type WebSocketOptions = {
  /**
   * websocket node url address
   * @example 'ws://www.host.com/path'
   * @default public websocket enabled starknet node
   */
  nodeUrl?: string;
  /**
   * Starknet rpc specification used for this channel
   * @default requested on connection established
   * @example '0.8.0' // TODO provjeri koji je format specifikacije
   */
  specVersion?: string;
  /**
   * You can provide websocket object defined by protocol standard else library will use default 'isows'/'ws' package
   * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket#protocols .
   * https://www.rfc-editor.org/rfc/rfc6455.html#section-1 .
   * @default WebSocket
   */
  websocket?: WebSocket;
  /**
   * Whether or not to send keep-alive ping messages.
   * @default true
   */
  keepAlive?:
    | boolean
    | {
        /**
         * The interval (in ms) to send keep-alive messages.
         * @default 30_000
         */
        interval?: number;
      };
  /**
   * Whether or not to attempt to reconnect on socket failure.
   * @default true
   */
  reconnect?:
    | boolean
    | {
        /**
         * The maximum number of reconnection attempts.
         * @default 5
         */
        attempts?: number | undefined;
        /**
         * The delay (in ms) between reconnection attempts.
         * @default 2_000
         */
        delay?: number | undefined;
      };
  /** The max number of times to retry. */
  retryCount?: number;
  /** The base delay (in ms) between retries. */
  retryDelay?: number;
  /** The timeout (in ms) for async WebSocket requests. Default: 10_000 */
  timeout?: number;
};

/**
 * A SocketChannel provide pure specification defined methods and communication with Starknet node over long-lived socket connection
 */
export abstract class WebSocketChannelInterface {
  public abstract nodeUrl: string;

  /**
   *  Sub-classes **must** implement this method to send the message over their transport.
   */
  public abstract send(message: string): Promise<void>;
}

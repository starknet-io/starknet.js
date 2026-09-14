/**
 * A WebSocket stand-in that records what was sent and lets a test answer for the node.
 *
 * Nothing here reaches a real node, so tests using it run in every environment. A socket starts
 * CONNECTING and opens only when the test says so, which is what makes a readiness latch
 * observable: the transport must not have written anything before `open()` is called.
 *
 * Injected through the `websocket` option or `config.set('websocket', …)`, exactly as the
 * production code resolves its implementation.
 */
export const createMockWebSocket = () => {
  const sockets: MockWebSocket[] = [];

  class MockWebSocket extends EventTarget {
    static CONNECTING = 0;

    static OPEN = 1;

    static CLOSING = 2;

    static CLOSED = 3;

    public readyState = MockWebSocket.CONNECTING;

    /** Raw frames this socket was asked to send, in order. */
    public sent: string[] = [];

    public onopen: ((ev: Event) => void) | null = null;

    public onclose: ((ev: Event) => void) | null = null;

    public onerror: ((ev: Event) => void) | null = null;

    public onmessage: ((ev: Event) => void) | null = null;

    constructor(public url: string) {
      super();
      sockets.push(this);
    }

    public send(data: string) {
      this.sent.push(data);
    }

    public close() {
      this.closeRemote();
    }

    /** The frames this socket was asked to send, parsed. */
    public get sentBodies(): any[] {
      return this.sent.map((raw) => JSON.parse(raw));
    }

    /** Completes the handshake. */
    public open() {
      if (this.readyState !== MockWebSocket.CONNECTING) return;
      this.readyState = MockWebSocket.OPEN;
      this.emit('open');
    }

    /** The connection attempt fails with an `error`, as a browser reports it. */
    public fail() {
      this.readyState = MockWebSocket.CLOSED;
      this.emit('error');
    }

    /** The peer closes with no `error` first — how a gateway turns a connection away. */
    public closeRemote() {
      if (this.readyState === MockWebSocket.CLOSED) return;
      this.readyState = MockWebSocket.CLOSED;
      this.emit('close');
    }

    /** Delivers a frame as if the node had pushed it. */
    public reply(body: unknown) {
      const ev: any = new Event('message');
      ev.data = JSON.stringify(body);
      this.onmessage?.(ev);
      this.dispatchEvent(ev);
    }

    /**
     * Fires both the `on*` property and the listeners, as a real WebSocket does.
     *
     * Public because the class is returned from a function, and TypeScript refuses to emit a
     * declaration for an anonymous class type carrying a private member (TS4094).
     */
    public emit(type: 'open' | 'close' | 'error') {
      const ev = new Event(type);
      const handlers = { open: this.onopen, close: this.onclose, error: this.onerror };
      handlers[type]?.(ev);
      this.dispatchEvent(ev);
    }
  }

  return {
    MockWebSocket,
    get sockets() {
      return sockets;
    },
    get last() {
      return sockets[sockets.length - 1];
    },
  };
};

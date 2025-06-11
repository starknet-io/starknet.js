/* eslint-disable max-classes-per-file */
type Listener<T> = (data: T) => void;

export class EventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Listener<T[K]>[] } = {};

  public on<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  public off<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event] = this.listeners[event]!.filter((l) => l !== listener);
  }

  public emit<K extends keyof T>(event: K, data: T[K]): void {
    if (this.listeners[event]) {
      this.listeners[event]!.forEach((listener) => listener(data));
    }
  }

  public clear(): void {
    this.listeners = {};
  }
}

import { generateUID } from './utils';

export interface IStorageWrapper {
  set(value: string | null | undefined): boolean;
  get(): string | null | undefined;
  delete(): boolean;
}

export class LocalStorageWrapper implements IStorageWrapper {
  #initialized = false;

  #key: string | undefined = undefined;

  #prefix: string;

  value: string | null | undefined = undefined;

  constructor(key: string) {
    this.#prefix = key;

    this.#init();
  }

  set(value: string | null | undefined) {
    if (!this.#initialized && !this.#init()) {
      return false;
    }

    this.delete(); // clear current key

    this.value = value;
    if (value) {
      this.#key = `${this.#prefix}-${generateUID()}`;
      localStorage.setItem(this.#key, value);
    }

    return true;
  }

  get() {
    this.#validateValue();
    return this.value;
  }

  delete() {
    if (!this.#initialized && !this.#init()) {
      return false;
    }

    this.value = null;
    if (this.#key) localStorage.removeItem(this.#key);

    return true;
  }

  #validateValue() {
    if (this.value) {
      this.set(this.value);
    }
  }

  #init() {
    try {
      if (!this.#initialized && typeof window !== 'undefined') {
        // init with prev key/value
        this.#key = Object.keys(localStorage).find((sk) => sk.startsWith(this.#prefix));

        // set initialized as soon as we managed to extract data
        // from localStorage, so the `set` call below won't result
        // in a endless-recursive loop
        this.#initialized = true;
        if (this.#key) {
          this.set(localStorage.getItem(this.#key));
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(err);
    }
    return this.#initialized;
  }
}

export class DelayedAction {
  private delay: number;

  private timer: NodeJS.Timeout | null;

  private promise?: Promise<void>;

  private promiseResolve?: () => void;

  constructor(delay: number = 5000) {
    this.delay = delay;
    this.timer = null;
  }

  /**
   * Waits for the delay to pass, then resolves the promise.
   * All calls to this method will return the same promise until the delay has passed
   *
   * @returns {Promise<void>}
   */
  public async wait(): Promise<void> {
    // If the promise is not set, create a new one and store the resolve function
    if (!this.promise || !this.promiseResolve) {
      this.promise = new Promise((resolve) => {
        this.promiseResolve = resolve;
      });
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(() => {
      if (this.promiseResolve) {
        this.promiseResolve();

        // Reset the promise and resolve function so that a new promise is created next time
        this.promise = undefined;
        this.promiseResolve = undefined;
      }
    }, this.delay);

    return this.promise;
  }
}

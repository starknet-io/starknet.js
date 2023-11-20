// eslint-disable-next-line max-classes-per-file
export function fixStack(target: Error, fn: Function = target.constructor) {
  const { captureStackTrace } = Error as any;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  captureStackTrace && captureStackTrace(target, fn);
}

export function fixProto(target: Error, prototype: {}) {
  const { setPrototypeOf } = Object as any;
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-proto, no-param-reassign
  setPrototypeOf ? setPrototypeOf(target, prototype) : ((target as any).__proto__ = prototype);
}

/* eslint-disable max-classes-per-file */
export class CustomError extends Error {
  name!: string;

  constructor(message?: string) {
    super(message);
    // set error name as constructor name, make it not enumerable to keep native Error behavior
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
    // see https://github.com/adriengibrat/ts-custom-error/issues/30
    Object.defineProperty(this, 'name', {
      value: new.target.name,
      enumerable: false,
      configurable: true,
    });
    // fix the extended error prototype chain
    // because typescript __extends implementation can't
    // see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    fixProto(this, new.target.prototype);
    // try to remove constructor from stack trace
    fixStack(this);
  }
}

export class LibraryError extends CustomError {}

export class GatewayError extends LibraryError {
  constructor(message: string, public errorCode: string) {
    super(message);
  }
}

export class HttpError extends LibraryError {
  constructor(message: string, public errorCode: number) {
    super(message);
  }
}

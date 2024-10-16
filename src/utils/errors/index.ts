/* eslint-disable max-classes-per-file */
import { RPC, RPC_ERROR, RPC_ERROR_SET } from '../../types';
import { stringify } from '../json';
import rpcErrors from './rpc';

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

export class RpcError<BaseErrorT extends RPC_ERROR = RPC_ERROR> extends LibraryError {
  public readonly request: {
    method: string;
    params: any;
  };

  constructor(
    public readonly baseError: BaseErrorT,
    method: string,
    params: any
  ) {
    // legacy message format
    super(`RPC: ${method} with params ${stringify(params, null, 2)}\n
      ${baseError.code}: ${baseError.message}: ${stringify((baseError as RPC.JRPC.Error).data)}`);

    this.request = { method, params };
  }

  public get code() {
    return this.baseError.code;
  }

  /**
   * Verifies the underlying RPC error, also serves as a type guard for the _baseError_ property
   * @example
   * ```typescript
   * SomeError.isType('UNEXPECTED_ERROR');
   * ```
   */
  public isType<N extends keyof RPC_ERROR_SET, C extends RPC_ERROR_SET[N]['code']>(
    typeName: N
  ): this is RpcError<RPC_ERROR_SET[N] & { code: C }> {
    return rpcErrors[typeName] === this.code;
  }
}

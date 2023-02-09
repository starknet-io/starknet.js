/* eslint-disable max-classes-per-file */
import { CustomError } from 'ts-custom-error';

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

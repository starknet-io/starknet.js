/* eslint-disable max-classes-per-file */
import { CustomError } from 'ts-custom-error';

export class GatewayError extends CustomError {
  constructor(message: string, public errorCode: string) {
    super(message);
  }
}

export class HttpError extends CustomError {
  constructor(message: string, public errorCode: number) {
    super(message);
  }
}

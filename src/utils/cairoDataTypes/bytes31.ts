import { addHexPrefix, stringToUint8Array, uint8ArrayToBigInt } from '../encode';

export class CairoBytes31 {
  static MAX_BYTE_SIZE = 31 as const;

  data: Uint8Array;

  static abiSelector = 'core::bytes_31::bytes31';

  /**
   *  from String
   */
  constructor(data: string);
  /**
   *  from Buffer
   */
  constructor(data: Buffer);
  /**
   *  from Uint8Array
   */
  constructor(data: Uint8Array);
  constructor(...arr: any[]) {
    const input = arr[0];

    // Validate input using static validate method
    CairoBytes31.validate(input);

    if (typeof input === 'string') {
      this.data = stringToUint8Array(input);
    } else if (input instanceof Buffer) {
      this.data = new Uint8Array(input);
    } else if (input instanceof Uint8Array) {
      this.data = new Uint8Array(input);
    } else {
      throw new Error('Invalid input type. Expected string, Buffer, or Uint8Array');
    }
  }

  toApiRequest(): string[] {
    return [uint8ArrayToBigInt(this.data).toString()];
  }

  toBigInt() {
    return uint8ArrayToBigInt(this.data);
  }

  toUnicode() {
    return new TextDecoder().decode(this.data);
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  static validate(data: Uint8Array | string | Buffer): void {
    let byteLength: number;

    if (typeof data === 'string') {
      const encoder = new TextEncoder();
      byteLength = encoder.encode(data).length;
    } else if (data instanceof Buffer) {
      byteLength = data.length;
    } else if (data instanceof Uint8Array) {
      byteLength = data.length;
    } else {
      throw new Error('Invalid input type. Expected string, Buffer, or Uint8Array');
    }

    if (byteLength > this.MAX_BYTE_SIZE) {
      throw new Error(`Data is too long: ${byteLength} bytes (max ${this.MAX_BYTE_SIZE} bytes)`);
    }
  }

  static is(data: Uint8Array | string | Buffer): boolean {
    try {
      CairoBytes31.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoBytes31.abiSelector;
  }
}

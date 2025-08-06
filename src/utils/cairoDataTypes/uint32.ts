import { addHexPrefix, bigIntToUint8Array } from '../encode';

export class CairoUint32 {
  data: bigint;

  static abiSelector = 'core::u32::u32';

  constructor(data: number | bigint) {
    this.data = BigInt(data);
  }

  toApiRequest(): string[] {
    return [this.data.toString()];
  }

  toBigInt() {
    return this.data;
  }

  toUnicode() {
    return new TextDecoder().decode(bigIntToUint8Array(this.data));
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  static validate(data: number | bigint): void {
    // validate that what is provided is number
    if (typeof data !== 'number' && typeof data !== 'bigint') {
      throw new Error('Invalid input type. Expected number or bigint');
    }

    if (data < 0n || data > 2n ** 32n - 1n) {
      throw new Error('Value is out of u32 range [0, 2^32)');
    }
  }

  static is(data: number | bigint): boolean {
    try {
      CairoUint32.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoUint32.abiSelector;
  }
}

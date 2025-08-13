/* eslint-disable no-underscore-dangle */
import { BigNumberish } from '../../types';
import assert from '../assert';
import { addHexPrefix, bigIntToUint8Array, stringToUint8Array } from '../encode';
import { getNext } from '../num';
import { isBigInt, isBuffer, isInteger, isString } from '../typed';
import { CairoBytes31 } from './bytes31';
import { CairoFelt252 } from './felt';
import { CairoUint32 } from './uint32';

export class CairoByteArray {
  /**
   * entire dataset
   */
  data: CairoBytes31[] = [];

  /**
   * cairo specific implementation helper
   */
  pending_word!: CairoFelt252; // felt

  /**
   * cairo specific implementation helper
   */
  pending_word_len!: CairoUint32; // u32

  static abiSelector = 'core::byte_array::ByteArray' as const;

  /**
   * byteArray from typed components
   */
  public constructor(data: CairoBytes31[], pendingWord: CairoFelt252, pendingWordLen: CairoUint32);
  public constructor(data: BigNumberish | Buffer | Uint8Array | unknown);
  public constructor(...arr: any[]) {
    // Handle constructor from typed components
    if (arr.length === 3) {
      const [dataArg, pendingWord, pendingWordLen] = arr;

      // Check if we're dealing with typed classes
      assert(
        Array.isArray(dataArg) &&
          pendingWord instanceof CairoFelt252 &&
          pendingWordLen instanceof CairoUint32,
        'Invalid constructor parameters. Expected (CairoBytes31[], CairoFelt252, CairoUint32)'
      );
      // Typed classes - use directly
      this.data = dataArg;
      this.pending_word = pendingWord;
      this.pending_word_len = pendingWordLen;
      return;
    }

    // Handle custom constructor
    const inData = arr[0] as unknown;
    CairoByteArray.validate(inData);
    const { data, pending_word, pending_word_len } = CairoByteArray.__processData(inData);
    this.data = data;
    this.pending_word = pending_word;
    this.pending_word_len = pending_word_len;
  }

  static __processData(inData: BigNumberish | Buffer | Uint8Array | unknown) {
    let fullData: Uint8Array;
    // Handle different input types
    if (inData instanceof Uint8Array) {
      // byteArrayFromUint8Array
      fullData = inData;
    } else if (isBuffer(inData)) {
      // byteArrayFromBuffer
      fullData = new Uint8Array(inData);
    } else if (isString(inData)) {
      // byteArrayFromString - stringToUint8Array handles hex, decimal, and UTF-8
      fullData = stringToUint8Array(inData);
    } else if (isBigInt(inData)) {
      // byteArrayFromBigInt
      fullData = bigIntToUint8Array(inData);
    } else if (isInteger(inData)) {
      // byteArrayFromNumber
      fullData = bigIntToUint8Array(BigInt(inData));
    } else {
      throw new Error('Invalid input type. Expected Uint8Array, Buffer, string, number, or bigint');
    }

    const CHUNK_SIZE = CairoBytes31.MAX_BYTE_SIZE;

    // Calculate how many complete 31-byte chunks we have
    const completeChunks = Math.floor(fullData.length / CHUNK_SIZE);
    const remainderLength = fullData.length % CHUNK_SIZE;

    // Extract the data (complete 31-byte chunks) as CairoBytes31 objects
    const data = [];
    let pending_word: CairoFelt252;
    let pending_word_len: CairoUint32;
    for (let i = 0; i < completeChunks; i += 1) {
      const chunkStart = i * CHUNK_SIZE;
      const chunkEnd = chunkStart + CHUNK_SIZE;
      const chunk = fullData.slice(chunkStart, chunkEnd);
      data.push(new CairoBytes31(chunk));
    }

    // Handle the pending word (remainder)
    if (remainderLength > 0) {
      const remainder = fullData.slice(completeChunks * CHUNK_SIZE);
      // Convert remainder to hex string for CairoFelt252
      let hex = '0x';
      for (let i = 0; i < remainder.length; i += 1) {
        hex += remainder[i].toString(16).padStart(2, '0');
      }
      pending_word = new CairoFelt252(hex);
      pending_word_len = new CairoUint32(remainderLength);
    } else {
      pending_word = new CairoFelt252(0);
      pending_word_len = new CairoUint32(0);
    }

    return { data, pending_word, pending_word_len };
  }

  toApiRequest() {
    assert(
      this.data && this.pending_word !== undefined && this.pending_word_len !== undefined,
      'CairoByteArray is not properly initialized'
    );

    const compiled = [
      addHexPrefix(this.data.length.toString(16)),
      ...this.data.flatMap((bytes31) => bytes31.toApiRequest()),
      ...this.pending_word.toApiRequest(),
      ...this.pending_word_len.toApiRequest(),
    ];

    Object.defineProperty(compiled, '__compiled__', {
      enumerable: false,
      writable: false,
      value: true,
    });

    return compiled;
  }

  decodeUtf8() {
    assert(
      this.data && this.pending_word !== undefined && this.pending_word_len !== undefined,
      'CairoByteArray is not properly initialized'
    );

    // Reconstruct the full byte sequence first to avoid splitting UTF-8 characters
    const allBytes: number[] = [];

    // Add bytes from all complete chunks (each chunk contains exactly 31 bytes when full)
    this.data.forEach((chunk) => {
      // Each chunk stores its data as a Uint8Array
      const chunkBytes = chunk.data;
      for (let i = 0; i < chunkBytes.length; i += 1) {
        allBytes.push(chunkBytes[i]);
      }
    });

    // Add bytes from pending word
    const pendingLen = Number(this.pending_word_len.toBigInt());
    if (pendingLen > 0) {
      // Get the hex string from pending_word and convert to bytes
      const hex = this.pending_word.toHexString();
      const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex;

      // Convert hex to bytes
      // Ensure hex string has even length by padding with leading zero if necessary
      const paddedHex =
        hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;

      for (let i = 0; i < pendingLen; i += 1) {
        const byteHex = paddedHex.slice(i * 2, i * 2 + 2);
        if (byteHex.length < 2) {
          // If we don't have enough hex digits, treat as zero
          allBytes.push(0);
        } else {
          const byteValue = parseInt(byteHex, 16);
          if (Number.isNaN(byteValue)) {
            throw new Error(`Invalid hex byte: ${byteHex}`);
          }
          allBytes.push(byteValue);
        }
      }
    }

    // Convert all bytes to Uint8Array and decode as UTF-8 string
    // This ensures multi-byte UTF-8 characters are not split across chunk boundaries
    const fullBytes = new Uint8Array(allBytes);
    return new TextDecoder().decode(fullBytes);
  }

  toBigInt() {
    assert(
      this.data && this.pending_word !== undefined && this.pending_word_len !== undefined,
      'CairoByteArray is not properly initialized'
    );

    // Reconstruct the full byte sequence
    const allBytes: number[] = [];

    // Add bytes from all complete chunks (each chunk contains exactly 31 bytes when full)
    this.data.forEach((chunk) => {
      // Each chunk stores its data as a Uint8Array
      const chunkBytes = chunk.data;
      for (let i = 0; i < chunkBytes.length; i += 1) {
        allBytes.push(chunkBytes[i]);
      }
    });

    // Add bytes from pending word
    const pendingLen = Number(this.pending_word_len.toBigInt());
    if (pendingLen > 0) {
      const hex = this.pending_word.toHexString();
      const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex;

      // Convert hex to bytes
      // Ensure hex string has even length by padding with leading zero if necessary
      const paddedHex =
        hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;

      for (let i = 0; i < pendingLen; i += 1) {
        const byteHex = paddedHex.slice(i * 2, i * 2 + 2);
        if (byteHex.length < 2) {
          // If we don't have enough hex digits, treat as zero
          allBytes.push(0);
        } else {
          const byteValue = parseInt(byteHex, 16);
          if (Number.isNaN(byteValue)) {
            throw new Error(`Invalid hex byte: ${byteHex}`);
          }
          allBytes.push(byteValue);
        }
      }
    }

    // Convert bytes array to bigint
    if (allBytes.length === 0) {
      return 0n;
    }

    let result = 0n;
    allBytes.forEach((byte) => {
      result = result * 256n + BigInt(byte);
    });

    return result;
  }

  toHexString() {
    return addHexPrefix(this.toBigInt().toString(16));
  }

  toBuffer() {
    assert(
      this.data && this.pending_word !== undefined && this.pending_word_len !== undefined,
      'CairoByteArray is not properly initialized'
    );

    // Reconstruct the full byte sequence
    const allBytes: number[] = [];

    // Add bytes from all complete chunks (each chunk contains exactly 31 bytes when full)
    this.data.forEach((chunk) => {
      // Each chunk stores its data as a Uint8Array
      const chunkBytes = chunk.data;
      for (let i = 0; i < chunkBytes.length; i += 1) {
        allBytes.push(chunkBytes[i]);
      }
    });

    // Add bytes from pending word
    const pendingLen = Number(this.pending_word_len.toBigInt());
    if (pendingLen > 0) {
      const hex = this.pending_word.toHexString();
      const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex;

      // Convert hex to bytes
      // Ensure hex string has even length by padding with leading zero if necessary
      const paddedHex =
        hexWithoutPrefix.length % 2 === 0 ? hexWithoutPrefix : `0${hexWithoutPrefix}`;

      for (let i = 0; i < pendingLen; i += 1) {
        const byteHex = paddedHex.slice(i * 2, i * 2 + 2);
        if (byteHex.length >= 2) {
          const byteValue = parseInt(byteHex, 16);
          if (!Number.isNaN(byteValue)) {
            allBytes.push(byteValue);
          }
        }
      }
    }

    return Buffer.from(allBytes);
  }

  static validate(data: Uint8Array | Buffer | BigNumberish | unknown) {
    assert(data != null, 'Invalid input: null or undefined');
    assert(
      !Array.isArray(data) || data instanceof Uint8Array,
      'Invalid input: arrays are not supported, use Uint8Array'
    );
    assert(
      typeof data !== 'object' || isBuffer(data) || data instanceof Uint8Array,
      'Invalid input for CairoByteArray: objects are not supported'
    );
    assert(
      typeof data !== 'number' || Number.isInteger(data),
      'Invalid input for CairoByteArray: decimal numbers are not supported, only integers'
    );
    assert(
      typeof data !== 'number' || data >= 0,
      'Invalid input for CairoByteArray: negative numbers are not supported'
    );
    assert(
      typeof data !== 'bigint' || data >= 0n,
      'Invalid input for CairoByteArray: negative bigints are not supported'
    );

    // There is no particular validation from input parameters when they are composed of existing types
    assert(
      data instanceof Uint8Array ||
        isBuffer(data) ||
        typeof data === 'string' ||
        typeof data === 'number' ||
        typeof data === 'bigint',
      'Invalid input type. Expected Uint8Array, Buffer, string, number, or bigint'
    );
  }

  /**
   * Check if the provided data is a valid CairoByteArray
   *
   * @param data - The data to check
   * @returns True if the data is a valid CairoByteArray, false otherwise
   */
  static is(data: any): boolean {
    try {
      CairoByteArray.validate(data);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if provided abi type is this data type
   */
  static isAbiType(abiType: string): boolean {
    return abiType === CairoByteArray.abiSelector;
  }

  static factoryFromApiResponse(responseIterator: Iterator<string>): CairoByteArray {
    const data = Array.from({ length: Number(getNext(responseIterator)) }, () =>
      CairoBytes31.factoryFromApiResponse(responseIterator)
    );
    const pending_word = CairoFelt252.factoryFromApiResponse(responseIterator);
    const pending_word_len = CairoUint32.factoryFromApiResponse(responseIterator);
    return new CairoByteArray(data, pending_word, pending_word_len);
  }
}

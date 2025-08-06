import { stringToUint8Array } from '../encode';
import { CairoBytes31 } from './bytes31';
import { CairoFelt252 } from './felt';
import { CairoUint32 } from './uint32';

export class CairoByteArray {
  data: CairoBytes31[] = [];

  pending_word?: CairoFelt252; // felt

  pending_word_len?: CairoUint32; // u32

  /**
   *  byteArray from Uint8Array
   */
  public constructor(data: Uint8Array);
  /**
   * byteArray from Buffer
   */
  public constructor(data: Buffer);
  /**
   * byteArray from String
   */
  public constructor(data: String);
  /**
   * byteArray from typed components
   */
  public constructor(data: CairoBytes31[], pendingWord: CairoFelt252, pendingWordLen: CairoUint32);
  public constructor(...arr: any[]) {
    // Handle the 3-parameter constructor first
    if (arr.length === 3) {
      const [dataArg, pendingWord, pendingWordLen] = arr;

      // Check if we're dealing with typed classes
      if (
        Array.isArray(dataArg) &&
        pendingWord instanceof CairoFelt252 &&
        pendingWordLen instanceof CairoUint32
      ) {
        // Typed classes - use directly
        this.data = dataArg;
        this.pending_word = pendingWord;
        this.pending_word_len = pendingWordLen;
      } else {
        throw new Error(
          'Invalid constructor parameters. Expected (CairoBytes31[], CairoFelt252, CairoUint32)'
        );
      }
      return;
    }

    // Handle single parameter constructors
    const data = arr[0];

    if (data instanceof Uint8Array) {
      // byteArrayFromUint8Array
      this.processData(data);
    } else if (data instanceof Buffer) {
      // byteArrayFromBuffer
      this.processData(new Uint8Array(data));
    } else if (typeof data === 'string') {
      // byteArrayFromString
      this.processData(stringToUint8Array(data));
    } else {
      throw new Error('Invalid input type. Expected Uint8Array, Buffer, or string');
    }
  }

  private processData(fullData: Uint8Array) {
    const CHUNK_SIZE = CairoBytes31.MAX_BYTE_SIZE;

    // Calculate how many complete 31-byte chunks we have
    const completeChunks = Math.floor(fullData.length / CHUNK_SIZE);
    const remainderLength = fullData.length % CHUNK_SIZE;

    // Extract the data (complete 31-byte chunks) as CairoBytes31 objects
    this.data = [];
    for (let i = 0; i < completeChunks; i += 1) {
      const chunkStart = i * CHUNK_SIZE;
      const chunkEnd = chunkStart + CHUNK_SIZE;
      const chunk = fullData.slice(chunkStart, chunkEnd);
      this.data.push(new CairoBytes31(chunk));
    }

    // Handle the pending word (remainder)
    if (remainderLength > 0) {
      const remainder = fullData.slice(completeChunks * CHUNK_SIZE);
      // Convert remainder to hex string for CairoFelt252
      let hex = '0x';
      for (let i = 0; i < remainder.length; i += 1) {
        hex += remainder[i].toString(16).padStart(2, '0');
      }
      this.pending_word = new CairoFelt252(hex);
      this.pending_word_len = new CairoUint32(remainderLength);
    } else {
      this.pending_word = new CairoFelt252(0);
      this.pending_word_len = new CairoUint32(0);
    }
  }

  static validate(
    _data: CairoBytes31[],
    _pending_word: CairoFelt252,
    _pending_word_len: CairoUint32
  ) {
    // TODO: Implement validation
  }

  toApiRequest() {
    if (!this.data || this.pending_word === undefined || this.pending_word_len === undefined) {
      throw new Error('CairoByteArray is not properly initialized');
    }

    return [
      this.data.length.toString(),
      ...this.data.flatMap((bytes31) => bytes31.toApiRequest()),
      ...this.pending_word.toApiRequest(),
      ...this.pending_word_len.toApiRequest(),
    ];
  }
}

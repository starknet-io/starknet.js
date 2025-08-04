export class CairoByteArray {
  data?: Uint8Array; // TODO: this should be cairo bytes_31, aka. 31 byte, should test if left like this not to overextend on 32 bytes.

  pending_word?: string; // felt

  pending_word_len?: number; // u32

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
   * byteArray from arguments
   */
  public constructor(data: Uint8Array, pendingWord: string, pendingWordLen: number);
  public constructor(...arr: any[]) {
    // Handle the 4-parameter constructor first
    if (arr.length === 3 && arr[0] instanceof Uint8Array) {
      const [dataArg, pendingWord, pendingWordLen] = arr;
      this.data = dataArg;
      this.pending_word = pendingWord;
      this.pending_word_len = pendingWordLen;
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
      const encoder = new TextEncoder();
      this.processData(encoder.encode(data));
    }
  }

  private processData(fullData: Uint8Array) {
    const CHUNK_SIZE = 31;

    // Calculate how many complete 31-byte chunks we have
    const completeChunks = Math.floor(fullData.length / CHUNK_SIZE);
    const remainderLength = fullData.length % CHUNK_SIZE;

    // Extract the data (complete 31-byte chunks)
    if (completeChunks > 0) {
      this.data = fullData.slice(0, completeChunks * CHUNK_SIZE);
    } else {
      this.data = new Uint8Array();
    }

    // Handle the pending word (remainder)
    if (remainderLength > 0) {
      const remainder = fullData.slice(completeChunks * CHUNK_SIZE);
      // Convert remainder to hex string
      let hex = '0x';
      for (let i = 0; i < remainder.length; i += 1) {
        hex += remainder[i].toString(16).padStart(2, '0');
      }
      this.pending_word = hex;
      this.pending_word_len = remainderLength;
    } else {
      this.pending_word = '0x00';
      this.pending_word_len = 0;
    }
  }

  static validate(_data: Uint32Array, _pending_word: string, _pending_word_len: number) {
    // TODO: Implement validation
  }

  toApiRequest() {
    if (!this.data || this.pending_word === undefined || this.pending_word_len === undefined) {
      throw new Error('CairoByteArray is not properly initialized');
    }

    return [
      this.data.length.toString(),
      ...Array.from(this.data).map((bn) => bn.toString()),
      this.pending_word.toString(),
      this.pending_word_len.toString(),
    ];
  }
}

import { BigNumberish, ByteArray } from '../../types/lib';
import { CairoByteArray } from '../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../cairoDataTypes/bytes31';
import { CairoFelt252 } from '../cairoDataTypes/felt';
import { CairoUint32 } from '../cairoDataTypes/uint32';
import { utf8ToUint8Array } from '../encode';
import { toHex } from '../num';

/**
 * convert a Cairo ByteArray to a JS string
 * @param myByteArray Cairo representation of a LongString
 * @returns a JS string
 * @example
 * ```typescript
 * const myByteArray = {
 *    data: [],
 *    pending_word: '0x414243444546474849',
 *    pending_word_len: 9
 * }
 * const result: String = stringFromByteArray(myByteArray); // ABCDEFGHI
 * ```
 */
export function stringFromByteArray(myByteArray: ByteArray): string {
  return new CairoByteArray(
    // CairoBytes31 only takes a string, a Buffer or a Uint8Array, while a data word is a
    // BigNumberish — so it may arrive as a bigint or a number, and has to be normalized.
    myByteArray.data.map((word: BigNumberish) => new CairoBytes31(toHex(word))),
    new CairoFelt252(myByteArray.pending_word),
    new CairoUint32(myByteArray.pending_word_len)
  ).decodeUtf8();
}

/**
 * convert a JS string to a Cairo ByteArray
 * @param targetString a JS string
 * @returns Cairo representation of a LongString
 * @example
 * ```typescript
 * const myByteArray: ByteArray = byteArrayFromString("ABCDEFGHI");
 * ```
 * Result is :
 * {
 *    data: [],
 *    pending_word: '0x414243444546474849',
 *    pending_word_len: 9
 * }
 */
export function byteArrayFromString(targetString: string): ByteArray {
  // the text is cut into words of 31 *bytes*, so a multi-byte character may straddle two words
  const byteArray = new CairoByteArray(utf8ToUint8Array(targetString));
  const pendingWordLen = Number(byteArray.pending_word_len.toBigInt());

  return {
    // full width kept as in v10: a data word has no length field, unlike the pending word
    data: byteArray.data.map((word: CairoBytes31) => word.toHexString('padded')),
    // an absent pending word reads '0x00' as in v10, where the canonical felt form is '0x0'
    pending_word: pendingWordLen === 0 ? '0x00' : byteArray.pending_word.toHexString(),
    pending_word_len: pendingWordLen,
  };
}

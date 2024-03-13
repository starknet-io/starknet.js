import { BigNumberish, ByteArray } from '../../types/lib';
import { toHex } from '../num';
import { decodeShortString, encodeShortString, splitLongString } from '../shortString';

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
  const pending_word: string =
    BigInt(myByteArray.pending_word) === 0n
      ? ''
      : decodeShortString(toHex(myByteArray.pending_word));
  return (
    myByteArray.data.reduce<string>((cumuledString, encodedString: BigNumberish) => {
      const add: string =
        BigInt(encodedString) === 0n ? '' : decodeShortString(toHex(encodedString));
      return cumuledString + add;
    }, '') + pending_word
  );
}

/**
 * convert a JS string to a Cairo ByteArray
 * @param myString a JS string
 * @returns Cairo representation of a LongString
 * @example
 * ```typescript
 * const myByteArray: ByteArray = byteArrayFromStr("ABCDEFGHI");
 * ```
 * Result is :
 * {
 *    data: [],
 *    pending_word: '0x414243444546474849',
 *    pending_word_len: 9
 * }
 */
export function byteArrayFromString(myString: string): ByteArray {
  if (myString.length === 0) {
    return {
      data: [],
      pending_word: '0x00',
      pending_word_len: 0,
    } as ByteArray;
  }
  const myShortStrings: string[] = splitLongString(myString);
  const remains: string = myShortStrings[myShortStrings.length - 1];
  const myShortStringsEncoded: BigNumberish[] = myShortStrings.map((shortStr) =>
    encodeShortString(shortStr)
  );
  if (remains.length === 31) {
    return {
      data: myShortStringsEncoded,
      pending_word: '0x00',
      pending_word_len: 0,
    } as ByteArray;
  }
  const pendingEncodedWord: BigNumberish = myShortStringsEncoded.pop()!;
  return {
    data: myShortStringsEncoded.length === 0 ? [] : myShortStringsEncoded,
    pending_word: pendingEncodedWord,
    pending_word_len: remains.length,
  } as ByteArray;
}

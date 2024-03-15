import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  ByteArray,
  CairoEnum,
  ParsedStruct,
  Tupled,
} from '../../types';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { encodeShortString, isText, splitLongString } from '../shortString';
import { byteArrayFromString } from './byteArray';
import {
  felt,
  getArrayType,
  isTypeArray,
  isTypeBytes31,
  isTypeEnum,
  isTypeOption,
  isTypeResult,
  isTypeStruct,
  isTypeTuple,
} from './cairo';
import {
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import extractTupleMemberTypes from './tuple';

import { decodeShortString } from '../shortString';

/**
 * Parse base types
 * @param type Type from ABI
 * @param calldata Calldata provided
 * @returns Parsed value
 */
// function decodeBaseType(type: string, calldata: string | string[]): BigNumberish {
//   switch (true) {
//     case CairoUint256.isAbiType(type):
//       // Assuming there exists a method to construct CairoUint256 from calldata
//       return CairoUint256.fromCalldata(calldata).toBigInt();
//     case isTypeBytes31(type):
//       // Assuming a method to decode a short string back from calldata
//       return decodeShortString(calldata as string);
//     default:
//       // Direct conversion for 'felt' types, assuming calldata is a string representing a number
//       return BigInt(calldata.toString());
//   }
// }

function decodeBaseType(type: string, calldata: string | string[]): BigNumberish | CairoUint256 {
  switch (true) {
    case CairoUint256.isAbiType(type):
      // Assuming calldata for CairoUint256 comes as an array of two strings.
      if (!Array.isArray(calldata) || calldata.length !== 2) {
        throw new Error("Expected calldata for CairoUint256 as an array of two strings.");
      }
      // Use the fromCalldata method to construct and return a CairoUint256 instance.
      return CairoUint256.fromCalldata([calldata[0], calldata[1]]);

    case isTypeBytes31(type):
      // Handle decoding for bytes31, which might involve reversing the encoding logic.
      // Placeholder for actual decoding logic.
      return decodeShortString(calldata as string);

    default:
      // Direct conversion for 'felt' types. Ensure calldata is a string.
      if (typeof calldata !== "string") {
        throw new Error("Expected string calldata for base type decoding.");
      }
      return BigInt(calldata);
  }
}

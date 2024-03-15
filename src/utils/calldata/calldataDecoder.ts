import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  ByteArray,
  CairoEnum,
  ParsedStruct,
  StructAbi,
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
  CairoEnumRaw,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import extractTupleMemberTypes from './tuple';

import { decodeShortString } from '../shortString';
import { byteArray } from '.';

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

/**
 * Decode a tuple from calldata.
 * @param calldata The calldata array.
 * @param typeStr The type string representing the tuple structure.
 * @param structs The ABI structs.
 * @param enums The ABI enums.
 * @returns An array of decoded tuple elements.
 */
function decodeTuple(calldata: string[], typeStr: string, structs: AbiStructs, enums: AbiEnums) {
  // Parse typeStr to understand the tuple structure, e.g., "('felt', 'struct', 'enum')"
  const types: string[] = extractTupleMemberTypes(typeStr).map((type: string | object) => String(type));
  
  // Assuming we now have an array of types, ['felt', 'YourStructName', 'YourEnumName'], etc.
  const decodedElements = [];
  let calldataIndex = 0;

  for (const type of types) {
    switch (true) {
      case isTypeStruct(type, structs):
        let structRes = decodeStruct(calldata.slice(calldataIndex, calldataIndex + structs[type].size), type, structs, enums);
        decodedElements.push(structRes);
        calldataIndex += structs[type].size; // Assuming size is defined for structs.
        break;
      case isTypeEnum(type, enums):
        // Determine the expected calldata consumption for the current enum.
        const expectedCalldataLength = getExpectedCalldataLengthForEnum(calldata[calldataIndex], type, enums);
        const enumSlice = calldata.slice(calldataIndex, calldataIndex + expectedCalldataLength);
        const enumRes = decodeEnum(enumSlice, type, enums);
        decodedElements.push(enumRes);
        calldataIndex += expectedCalldataLength; // Move past the consumed calldata.
        break;
      case isTypeArray(type):
        const arrayType = getArrayType(type);
        const arrayRes = decodeCalldataValue([calldata[calldataIndex]], arrayType, structs, enums);
        decodedElements.push(arrayRes);
        calldataIndex += 1;
        break;
      default:
        const result = decodeBaseType(type, calldata[calldataIndex]);
        decodedElements.push(result);
        calldataIndex += 1;
    }
  }

  return decodedElements;
}

function decodeByteArray(calldata: string[]): ByteArray {
  // Implementation here...
  return byteArrayFromString(calldata.join(''));
}

function decodeCalldataValue(calldata: string | string[], type: string, structs: AbiStructs, enums: AbiEnums): any {
  // Implementation here...
}

function decodeCalldataField(calldataIterator: Iterator<string>, input: AbiEntry, structs: AbiStructs, enums: AbiEnums): any {
  // Implementation here...
}

function decodeStruct(calldataSegment: string[], structName: string, structs: AbiStructs, enums: AbiEnums): ParsedStruct {
  const structAbi: StructAbi = structs[structName];
  if (!structAbi) {
    throw new Error(`Struct with name ${structName} not found.`);
  }

  let index = 0;
  const result: ParsedStruct = {};

  for (const field of structAbi.members) {
    const fieldType = field.type;
    const fieldCalldata = calldataSegment.slice(index, index + 1); // This is simplified; complex types might span multiple elements.
    result[field.name] = decodeCalldataValue(fieldCalldata[0], fieldType, structs, enums);
    index++;
  }

  return result;
}

function decodeEnum(calldataValues: string[], enumName: string, enums: AbiEnums): CairoEnum {
  const enumDefinition = enums[enumName];
  if (!enumDefinition) {
    throw new Error(`Enum with name ${enumName} not found.`);
  }

  const variantIndex = parseInt(calldataValues[0], 10);
  if (variantIndex < 0 || variantIndex >= enumDefinition.variants.length) {
    throw new Error(`Variant index ${variantIndex} out of range for enum ${enumName}.`);
  }

  const variant = enumDefinition.variants[variantIndex];

  // Determine the enum type and decode accordingly
  switch (enumName) {
    case "CairoOption":
      switch (variant.name) {
        case "None":
          return new CairoOption(CairoOptionVariant.None);
        default: // "Some"
          const someValue = calldataValues[1]; // Placeholder for actual decoding logic.
          // The decoding of someValue needs to be based on the expected data type.
          return new CairoOption(CairoOptionVariant.Some, someValue); // Assuming someValue decoding logic is implemented elsewhere.
      }
    case "CairoResult":
      const resultValue = calldataValues[1]; // Placeholder for actual decoding logic.
      
      switch (variant.name) {
        case "Ok":
          return new CairoResult(CairoResultVariant.Ok , resultValue); // Needs proper decoding based on expected type.
        default: // "Err"
          return new CairoResult(CairoResultVariant.Err , resultValue); // Needs proper decoding based on expected type.
      }

    default: // Handling CairoCustomEnum or simple enum types without associated data.
      return new CairoCustomEnum({ activeVariant: variant.name, variant: variant.name });
  }
}

function getExpectedCalldataLengthForEnum(variantIndexCalldata: string, enumName: string, enums: AbiEnums): number {
  const enumDefinition = enums[enumName];
  if (!enumDefinition) throw new Error(`Enum with name ${enumName} not found.`);

  const variantIndex = parseInt(variantIndexCalldata, 10);
  const variant = enumDefinition.variants[variantIndex];

  switch (enumName) {
    case "CairoOption":
      return variant.name === "None" ? 1 : 2; // "None" requires only the index, "Some" requires additional data.
    case "CairoResult":
      return 2; // Both "Ok" and "Err" require additional data.
    default:
      return 1; // Assuming other enums don't have associated data by default.
  }
}

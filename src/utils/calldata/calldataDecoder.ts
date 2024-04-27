import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  ByteArray,
  CairoEnum,
  Calldata,
  ParsedStruct,
  RawArgs,
  RawArgsArray,
  StructAbi,
} from '../../types';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import {
  isTypeFelt,
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
import assert from '../assert';

/**
 * Decode a base type from calldata.
 * @param type The type string.
 * @param calldata The calldata value.
 * @returns The decoded value.
 * @throws An error if the type is not recognized.
 */
function decodeBaseTypes(type: string, calldata: string | string[]): BigNumberish | CairoUint256 {
  switch (true) {
    case CairoUint256.isAbiType(type):
      if (Array.isArray(calldata) && calldata.length === 2) {
        return new CairoUint256(calldata[0], calldata[1]).toBigInt();
      } else {
        throw new Error('Expected calldata for CairoUint256 as an array of two strings.');
      }

    case CairoUint512.isAbiType(type):
      if (Array.isArray(calldata) && calldata.length === 2) {
        return new CairoUint512(calldata[0], calldata[1], calldata[2], calldata[3]).toBigInt();
      } else {
        throw new Error('Expected calldata for CairoUint256 as an array of two strings.');
      }

    case isTypeBytes31(type):
      if (typeof calldata === 'string') {
        return decodeShortString(calldata);
      } else {
        throw new Error('Expected single string calldata for type `bytes31`.');
      }

    case isTypeFelt(type):
      if (typeof calldata === 'string') {
        return BigInt(calldata);
      } else {
        throw new Error('Expected single string calldata for type `felt`.');
      }

    default:
      throw new Error(`Unrecognized base type ${type} for calldata decoding.`);
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
function decodeTuple(
  calldata: string[],
  typeStr: string,
  structs: AbiStructs,
  enums: AbiEnums
): any[] {
  // Parse typeStr to understand the tuple structure, e.g., "('felt', 'struct', 'enum')"
  const types: string[] = extractTupleMemberTypes(typeStr).map((type: string | object) =>
    String(type)
  );

  // Assuming we now have an array of types, ['felt', 'YourStructName', 'YourEnumName'], etc.
  const decodedElements: any = [];
  let calldataIndex = 0;

  types.forEach((type) => {
    switch (true) {
      case isTypeStruct(type, structs): {
        const structRes = decodeStruct(
          calldata.slice(calldataIndex, calldataIndex + structs[type].size),
          type,
          structs,
          enums
        );
        decodedElements.push(structRes);
        calldataIndex += structs[type].size; // Assuming size is defined for structs.
        break;
      }
      case isTypeEnum(type, enums): {
        // Determine the expected calldata consumption for the current enum. (e.g., 1 or 2 elements for CairoOption, 2 elements for CairoResult, etc.)
        const expectedCalldataLength = getExpectedCalldataLengthForEnum(
          calldata[calldataIndex],
          type,
          enums
        );
        const enumSlice = calldata.slice(calldataIndex, calldataIndex + expectedCalldataLength);
        const enumRes = decodeEnum(enumSlice, type, enums);
        decodedElements.push(enumRes);
        calldataIndex += expectedCalldataLength; // Move past the consumed calldata.
        break;
      }
      case isTypeArray(type): {
        const arrayType = getArrayType(type);
        const arrayRes = decodeCalldataValue([calldata[calldataIndex]], arrayType, structs, enums);
        decodedElements.push(arrayRes);
        calldataIndex += 1;
        break;
      }
      default: {
        const result = decodeBaseTypes(type, calldata[calldataIndex]);
        decodedElements.push(result);
        calldataIndex += 1;
      }
    }
  });

  return decodedElements;
}

/**
 * Decode a byte array from calldata.
 * @param calldata The calldata array.
 * @returns The decoded byte array.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function decodeByteArray(calldata: string[]): ByteArray {
  // Extract the length of the data array from the first element.
  const dataLength = parseInt(calldata[0], 10);

  // Extract the data array elements based on the extracted length.
  const data = calldata.slice(1, 1 + dataLength).map((str) => parseInt(str, 10));

  // The pending_word is the second-to-last element in the original array.
  const pending_word = parseInt(calldata[1 + dataLength], 10);

  // The pending_word_len is the last element in the original array.
  const pending_word_len = parseInt(calldata[2 + dataLength], 10);

  // Construct and return the ByteArray object.
  return {
    data,
    pending_word,
    pending_word_len,
  };
}

/**
 * Decode an array from calldata.
 * @param calldata The calldata array.
 * @param arrayType The type of the array.
 * @param structs The ABI structs.
 * @param enums The ABI enums.
 * @returns The decoded array.
 */
function decodeArray(
  calldata: string[],
  arrayType: string,
  structs: AbiStructs,
  enums: AbiEnums
): any[] {
  const elementType = getArrayType(arrayType);
  const elements = [];

  for (let i = 0; i < calldata.length; i += 1) {
    elements.push(decodeCalldataValue([calldata[i]], elementType, structs, enums));
  }

  return elements;
}

/**
 * Decode a struct from calldata.
 * @param calldataSegment The calldata segment for the struct.
 * @param structName The name of the struct.
 * @param structs The ABI structs.
 * @param enums The ABI enums.
 * @returns The decoded struct.
 * @throws An error if the struct is not found.
 */
function decodeStruct(
  calldataSegment: string[],
  structName: string,
  structs: AbiStructs,
  enums: AbiEnums
): ParsedStruct {
  const structAbi: StructAbi = structs[structName];
  assert(structAbi !== null, `Struct with name ${structName} not found.`);

  let index = 0;
  const result: ParsedStruct = {};

  structAbi.members.forEach((field) => {
    const fieldType = field.type;
    const fieldCalldata = calldataSegment.slice(index, index + 1);
    result[field.name] = decodeCalldataValue(fieldCalldata[0], fieldType, structs, enums);
    index += 1;
  });

  return result;
}

/**
 * Decode an enum from calldata.
 * @param calldataValues The calldata values.
 * @param enumName The name of the enum.
 * @param enums The ABI enums.
 * @returns The decoded enum.
 * @throws An error if the enum is not found or the variant index is out of range.
 */
function decodeEnum(calldataValues: string[], enumName: string, enums: AbiEnums): CairoEnum {
  const enumDefinition = enums[enumName];
  assert(enumDefinition !== null, `Enum with name ${enumName} not found.`);

  const variantIndex = parseInt(calldataValues[0], 10);
  assert(
    variantIndex >= 0 && variantIndex < enumDefinition.variants.length,
    `Variant index ${variantIndex} out of range for enum ${enumName}.`
  );

  const variant = enumDefinition.variants[variantIndex];

  // Determine the enum type and decode accordingly
  switch (enumName) {
    case 'CairoOption':
      switch (variant.name) {
        case 'None': {
          return new CairoOption(CairoOptionVariant.None);
        }
        default: {
          // "Some"
          // const someValue = calldataValues[1]; // Placeholder logic.
          const someValue = decodeCalldataValue(calldataValues.slice(1), variant.type, {}, enums);
          return new CairoOption(CairoOptionVariant.Some, someValue);
        }
      }
    case 'CairoResult': {
      // const resultValue = calldataValues[1]; // Placeholder logic.
      const resultValue = decodeCalldataValue(calldataValues.slice(1), variant.type, {}, enums);

      switch (variant.name) {
        case 'Ok':
          return new CairoResult(CairoResultVariant.Ok, resultValue);
        default: // "Err"
          return new CairoResult(CairoResultVariant.Err, resultValue);
      }
    }
    default: {
      // Handling CairoCustomEnum or simple enum types without associated data.
      return new CairoCustomEnum({ activeVariant: variant.name, variant: variant.name });
    }
  }
}

/**
 * Decode a CairoOption from calldata.
 * @param calldata The calldata array.
 * @param innerType The type of the inner value.
 * @param structs The ABI structs.
 * @param enums The ABI enums.
 * @returns The decoded CairoOption.
 */
function decodeCairoOption(
  calldata: string[],
  innerType: string,
  structs: AbiStructs,
  enums: AbiEnums
): CairoOption<any> {
  const optionIndicator = parseInt(calldata[0], 10);

  if (optionIndicator === CairoOptionVariant.Some) {
    // Decode the "Some" value content if the indicator shows "Some"
    const someValueCalldata = calldata.slice(1);
    const someValue = decodeCalldataValue(someValueCalldata, innerType, structs, enums);
    return new CairoOption(CairoOptionVariant.Some, someValue);
  } else {
    // Return a CairoOption instance indicating "None" without content
    return new CairoOption(CairoOptionVariant.None);
  }
}

/**
 * Decode a CairoResult from calldata.
 * @param calldata
 * @param okType
 * @param errType
 * @param structs
 * @param enums
 * @returns
 */
function decodeCairoResult(
  calldata: string[],
  okType: string,
  errType: string,
  structs: AbiStructs,
  enums: AbiEnums
): CairoResult<any, any> {
  const resultIndicator = parseInt(calldata[0], 10);

  if (resultIndicator === CairoResultVariant.Ok) {
    // Handle the "Ok" variant
    const okValueCalldata = calldata.slice(1);
    const okValue = decodeCalldataValue(okValueCalldata, okType, structs, enums);
    return new CairoResult(CairoResultVariant.Ok, okValue);
  } else {
    // Handle the "Err" variant
    const errValueCalldata = calldata.slice(1);
    const errValue = decodeCalldataValue(errValueCalldata, errType, structs, enums);
    return new CairoResult(CairoResultVariant.Err, errValue);
  }
}

/**
 * Get the expected calldata length for a given enum variant.
 * @param variantIndexCalldata The calldata for the variant index.
 * @param enumName The name of the enum.
 * @param enums The ABI enums.
 * @returns The expected calldata length.
 */
function getExpectedCalldataLengthForEnum(
  variantIndexCalldata: string,
  enumName: string,
  enums: AbiEnums
): number {
  const enumDefinition = enums[enumName];
  assert(enumDefinition, `Enum with name ${enumName} not found.`);

  const variantIndex = parseInt(variantIndexCalldata, 10);
  const variant = enumDefinition.variants[variantIndex];

  switch (enumName) {
    case 'CairoOption':
      return variant.name === 'None' ? 1 : 2; // "None" requires only the index, "Some" requires additional data.
    case 'CairoResult':
      return 2; // Both "Ok" and "Err" require additional data.
    default:
      return 1; // Assuming other enums don't have associated data by default.
  }
}

/**
 * Decode calldata fields using provided ABI details.
 * @param calldataIterator Iterator over the string array representing encoded calldata.
 * @param input ABI entry for the field to decode.
 * @param structs Struct definitions from ABI, if applicable.
 * @param enums Enum definitions from ABI, if applicable.
 * @returns Decoded field value.
 */
export default function decodeCalldataField(
  calldataIterator: Iterator<string>,
  input: AbiEntry,
  structs: AbiStructs,
  enums: AbiEnums
): any {
  const { type } = input;
  let temp;

  // Handling different types based on the ABI definition
  switch (true) {
    case isTypeArray(type): {
      const elementType = getArrayType(type);
      const elements: any[] = [];
      let elementResult = calldataIterator.next();
      while (!elementResult.done) {
        elements.push(decodeCalldataValue([elementResult.value], elementType, structs, enums));
        elementResult = calldataIterator.next();
      }
      return elements;
    }

    case isTypeStruct(type, structs):
    case isTypeTuple(type):
      const structOrTupleResult: RawArgs = {};
      const memberTypes = structs[type]?.members || extractTupleMemberTypes(type);
      memberTypes.forEach(member => {
        structOrTupleResult[member.name] = decodeCalldataValue([calldataIterator.next().value], member.type, structs, enums);
      });
      return structOrTupleResult;

    case isTypeFelt(type):
    case CairoUint256.isAbiType(type):
    case isTypeEnum(type, enums):
    case isTypeBytes31(type):
      temp = calldataIterator.next().value;
      return decodeCalldataValue(temp, type, structs, enums);

    default:
      throw new Error(`Unsupported or unrecognized type: ${type}`);
  }
}

/**
 * Decodes a calldata segment based on the specified type.
 * This function is versatile enough to handle all types directly from the calldata.
 * @param calldata The calldata array segment or a single calldata value.
 * @param type The type string as defined in the ABI.
 * @param structs ABI struct definitions, if applicable.
 * @param enums ABI enum definitions, if applicable.
 * @returns The decoded JavaScript-compatible type.
 */
function decodeCalldataValue(
  calldata: string | string[],
  type: string,
  structs: AbiStructs,
  enums: AbiEnums
): any {
  // Handling for base types directly
  if (CairoUint256.isAbiType(type) || CairoUint512.isAbiType(type) || isTypeFelt(type) || isTypeBytes31(type)) {
    return decodeBaseTypes(type, calldata);
  }

  // Handling complex types
  switch (true) {
    case isTypeEnum(type, enums):
      return decodeEnum(calldata as string[], type, enums);

    case isTypeStruct(type, structs):
      return decodeStruct(calldata as string[], type, structs, enums);

    case isTypeArray(type):
      const elementType = getArrayType(type);
      return (calldata as string[]).map(element => decodeCalldataValue(element, elementType, structs, enums));

    case isTypeTuple(type):
      return decodeTuple(calldata as string[], type, structs, enums);

    case isTypeOption(type) || isTypeResult(type):
      return decodeComplexType(calldata as string[], type, structs, enums);

    default:
      throw new Error(`Unrecognized type ${type} for calldata decoding.`);
  }
}


function decodeComplexType(
  calldata: Calldata,
  type: string,
  structs: AbiStructs,
  enums: AbiEnums
): CairoOption<any> | CairoResult<any, any> | CairoCustomEnum {
  const matches = type.match(/(Option|Result)<(.+)>/);
  assert(matches, `Type "${type}" is not a valid complex type.`);
  const containerType = matches[1];
  const innerType = matches[2];

  switch (containerType) {
    case 'Option':
      const optionValue = decodeCalldataValue(calldata, innerType, structs, enums);
      return new CairoOption(optionValue ? CairoOptionVariant.Some : CairoOptionVariant.None, optionValue);
    case 'Result':
      const resultValue = decodeCalldataValue(calldata, innerType, structs, enums);
      return new CairoResult(resultValue ? CairoResultVariant.Ok : CairoResultVariant.Err, resultValue);
    default:
      throw new Error(`Unsupported container type: ${containerType}`);
  }
}

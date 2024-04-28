import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  ByteArray,
  CairoEnum,
  Calldata,
  MultiType,
  ParsedStruct,
  RawArgs,
  RawArgsArray,
  StructAbi,
} from '../../types';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import { toHex } from '../num';
import { decodeShortString } from '../shortString';
import { stringFromByteArray } from './byteArray';
import { addHexPrefix, removeHexPrefix } from '../encode';
import {
  isTypeFelt,
  getArrayType,
  isTypeArray,
  isTypeBytes31,
  isTypeEnum,
  isTypeBool,
  isLen,
  isTypeByteArray,
  isTypeSecp256k1Point,
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
import assert from '../assert';
import { call } from 'abi-wan-kanabi';

/**
 * Decode base types from calldata
 * @param type type of element
 * @param it iterator
 * @returns CairoUint256 | CairoUint512 | Boolean | string | BigNumberish
 */
function decodeBaseTypes(type: string, it: Iterator<string>): 
  | Boolean
  | ParsedStruct
  | BigNumberish
  | BigNumberish[]
  | CairoOption<any>
  | CairoResult<any, any>
  | CairoEnum 
{
  let temp;
  switch (true) {
    case isTypeBool(type):
      temp = it.next().value;
      return Boolean(BigInt(temp));

    case CairoUint256.isAbiType(type):
      const low = it.next().value;
      const high = it.next().value;

      return new CairoUint256(low, high).toBigInt();

      case CairoUint512.isAbiType(type):
      const limb0 = it.next().value;
      const limb1 = it.next().value;
      const limb2 = it.next().value;
      const limb3 = it.next().value;

      return new CairoUint512(limb0, limb1, limb2, limb3).toBigInt();

      case type === 'core::starknet::eth_address::EthAddress':
      temp = it.next().value;
      return BigInt(temp);

      case type === 'core::bytes_31::bytes31':
      temp = it.next().value;
      return decodeShortString(temp);

      case isTypeSecp256k1Point(type):
      const xLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const xHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const yLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const yHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const pubK = BigInt(addHexPrefix(xHigh + xLow + yHigh + yLow));

      return pubK;

      default:
      temp = it.next().value;
      return BigInt(temp);
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
 * Decodes calldata based on the provided type, using an iterator over the calldata.
 * @param calldataIterator Iterator over the encoded calldata strings.
 * @param type The type string as defined in the ABI.
 * @param structs Optional struct definitions from ABI.
 * @param enums Optional enum definitions from ABI.
 * @returns Decoded calldata as a JavaScript-compatible type.
 */
function decodeCalldataValue(
  calldataIterator: Iterator<string>,
  element: { name: string; type: string },
  structs: AbiStructs,
  enums: AbiEnums
): 
  | Boolean
  | ParsedStruct
  | BigNumberish
  | BigNumberish[]
  | CairoOption<any>
  | CairoResult<any, any>
  | CairoEnum
{

  if (element.type === '()') {
    return {};
  }

  // type uint256 struct (c1v2)
  if (CairoUint256.isAbiType(element.type)) {
    const low = calldataIterator.next().value;
    const high = calldataIterator.next().value;
    return new CairoUint256(low, high).toBigInt();
  }
  // type uint512 struct
  if (CairoUint512.isAbiType(element.type)) {
    const limb0 = calldataIterator.next().value;
    const limb1 = calldataIterator.next().value;
    const limb2 = calldataIterator.next().value;
    const limb3 = calldataIterator.next().value;
    return new CairoUint512(limb0, limb1, limb2, limb3).toBigInt();
  }
  // type C1 ByteArray struct, representing a LongString
  if (isTypeByteArray(element.type)) {
    const parsedBytes31Arr: BigNumberish[] = [];
    const bytes31ArrLen = BigInt(calldataIterator.next().value);
    while (parsedBytes31Arr.length < bytes31ArrLen) {
      parsedBytes31Arr.push(toHex(calldataIterator.next().value));
    }
    const pending_word = toHex(calldataIterator.next().value);
    const pending_word_len = BigInt(calldataIterator.next().value);
    const myByteArray: ByteArray = {
      data: parsedBytes31Arr,
      pending_word,
      pending_word_len,
    };
    return stringFromByteArray(myByteArray);
  }

  // type Bytes31 string
  if (isTypeBytes31(element.type)) {
    return decodeShortString(calldataIterator.next().value);
  }

  // base type
  return decodeBaseTypes(element.type, calldataIterator);
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
  const { name, type } = input;

  switch (true) {
    case isLen(name):
      let temp = calldataIterator.next().value;
      return BigInt(temp);

    case isTypeArray(type): {
      const elementType = getArrayType(type);
      const elements: any[] = [];
      let elementResult = calldataIterator.next();
      while (!elementResult.done) {
        elements.push(decodeCalldataValue(elementResult.value, elementType, structs, enums));
        elementResult = calldataIterator.next();
      }
      return elements;
    }

    case isTypeStruct(type, structs):
    case isTypeTuple(type):
      const structOrTupleResult: RawArgs = {};
      const memberTypes = structs[type]?.members || extractTupleMemberTypes(type);
      memberTypes.forEach(member => {
        structOrTupleResult[member.name] = decodeCalldataValue(calldataIterator.next().value, member.type, structs, enums);
      });
      return structOrTupleResult;

    case isTypeFelt(type):
    case CairoUint256.isAbiType(type):
    case isTypeEnum(type, enums):
    case isTypeBytes31(type):
      return decodeCalldataValue(calldataIterator.next().value, type, structs, enums);

    default:
      throw new Error(`Unsupported or unrecognized type: ${type}`);
  }
}

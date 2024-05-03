import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  ByteArray,
  DecodeConfig,
  CairoEnum,
  ParsedStruct,
  Uint256,
} from '../../types';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import { toHex } from '../num';
import { decodeShortString } from '../shortString';
import { stringFromByteArray } from './byteArray';
import { addHexPrefix, removeHexPrefix } from '../encode';
import {
  getArrayType,
  isTypeArray,
  isTypeBytes31,
  isTypeEnum,
  isTypeBool,
  isLen,
  isCairo1Type,
  isTypeFelt,
  isTypeUint,
  getUintType,
  isTypeByteArray,
  isTypeSecp256k1Point,
  isTypeOption,
  isTypeResult,
  isTypeContractAddress,
  isTypeEthAddress,
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

/**
 * Decode base types from calldata
 * @param type type of element
 * @param it iterator
 * @returns CairoUint256 | CairoUint512 | Boolean | string | BigNumberish
 */
function decodeBaseTypes(
  type: string,
  it: Iterator<string>,
  config?: DecodeConfig
):
  | Boolean
  | ParsedStruct
  | BigNumberish
  | Uint256
  | BigNumberish[]
  | CairoOption<any>
  | CairoResult<any, any>
  | CairoEnum {
  let temp;
  switch (true) {
    case isTypeBool(type):
      temp = it.next().value;
      return Boolean(BigInt(temp));

    case isTypeUint(type):
      switch (true) {
        case CairoUint256.isAbiType(type): {
          const low = it.next().value;
          const high = it.next().value;

          const ret = new CairoUint256(low, high);
          const configConstructor = config?.['core::integer::u256'];
          if (configConstructor) {
            return configConstructor(ret);
          }

          return ret;
        }

        case CairoUint512.isAbiType(type): {
          const limb0 = it.next().value;
          const limb1 = it.next().value;
          const limb2 = it.next().value;
          const limb3 = it.next().value;

          return new CairoUint512(limb0, limb1, limb2, limb3).toBigInt();
        }

        default: {
          temp = it.next().value;
          const configType = getUintType(type);
          if (configType) {
            const UintConstructor = config?.[configType];
            if (UintConstructor) {
              return UintConstructor(temp);
            }
            return BigInt(temp);
          }
        }
      }

      return BigInt(temp);

    case isTypeEthAddress(type):
      temp = it.next().value;
      return BigInt(temp);

    case isTypeContractAddress(type): {
      temp = it.next().value;
      temp = toHex(temp);
      const configConstructor = config?.[type];
      if (configConstructor) {
        return configConstructor(temp);
      }
      return BigInt(temp);
    }

    case isTypeBytes31(type):
      temp = it.next().value;
      return decodeShortString(temp);

    case isTypeSecp256k1Point(type): {
      const xLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const xHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const yLow = removeHexPrefix(it.next().value).padStart(32, '0');
      const yHigh = removeHexPrefix(it.next().value).padStart(32, '0');
      const pubK = BigInt(addHexPrefix(xHigh + xLow + yHigh + yLow));

      return pubK;
    }

    case isTypeFelt(type): {
      temp = String(it.next().value);
      const configFeltConstructor = config?.['core::felt252'];
      if (configFeltConstructor) {
        if (configFeltConstructor === String) return decodeShortString(temp);
        return configFeltConstructor(temp);
      }

      // Default
      return BigInt(temp);
    }

    default:
      temp = it.next().value;
      return BigInt(temp);
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
  enums: AbiEnums,
  config?: DecodeConfig
):
  | Boolean
  | ParsedStruct
  | Uint256
  | BigNumberish
  | BigNumberish[]
  | any[]
  | CairoOption<any>
  | CairoResult<any, any>
  | CairoEnum {
  if (element.type === '()') {
    return {};
  }

  // type uint256 struct (c1v2)
  if (CairoUint256.isAbiType(element.type)) {
    const low = calldataIterator.next().value;
    const high = calldataIterator.next().value;
    return new CairoUint256(low, high);
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

  // type struct
  if (structs && element.type in structs && structs[element.type]) {
    if (isTypeEthAddress(element.type)) {
      return decodeBaseTypes(element.type, calldataIterator, config);
    }
    if (isTypeContractAddress(element.type)) {
      return decodeBaseTypes(element.type, calldataIterator, config);
    }

    return structs[element.type].members.reduce((acc, el) => {
      acc[el.name] = decodeCalldataValue(calldataIterator, el, structs, enums, config);
      return acc;
    }, {} as any);
  }

  // type Enum (only CustomEnum)
  if (enums && element.type in enums && enums[element.type]) {
    const variantNum: number = Number(calldataIterator.next().value); // get variant number
    const rawEnum = enums[element.type].variants.reduce((acc, variant, num) => {
      if (num === variantNum) {
        acc[variant.name] = decodeCalldataValue(
          calldataIterator,
          { name: '', type: variant.type },
          structs,
          enums,
          config
        );
        return acc;
      }
      acc[variant.name] = undefined;
      return acc;
    }, {} as CairoEnumRaw);
    // Option
    if (isTypeOption(element.type)) {
      const content = variantNum === CairoOptionVariant.Some ? rawEnum.Some : undefined;
      return new CairoOption<Object>(variantNum, content);
    }
    // Result
    if (isTypeResult(element.type)) {
      let content: Object;
      if (variantNum === CairoResultVariant.Ok) {
        content = rawEnum.Ok;
      } else {
        content = rawEnum.Err;
      }
      return new CairoResult<Object, Object>(variantNum, content);
    }
    // Cairo custom Enum
    const customEnum = new CairoCustomEnum(rawEnum);
    return customEnum;
  }

  // type tuple
  if (isTypeTuple(element.type)) {
    const memberTypes = extractTupleMemberTypes(element.type);
    return memberTypes.reduce((acc, it: any, idx) => {
      const name = it?.name ? it.name : idx;
      const type = it?.type ? it.type : it;
      const el = { name, type };
      acc[name] = decodeCalldataValue(calldataIterator, el, structs, enums, config);
      return acc;
    }, {} as any);
  }

  // type c1 array
  if (isTypeArray(element.type)) {
    // eslint-disable-next-line no-case-declarations
    const parsedDataArr = [];
    const el: AbiEntry = { name: '', type: getArrayType(element.type) };
    const len = BigInt(calldataIterator.next().value); // get length
    while (parsedDataArr.length < len) {
      const val = decodeCalldataValue(calldataIterator, el, structs, enums, config);
      if (
        el.type === 'core::integer::u128' ||
        el.type === 'core::integer::u8' ||
        el.type === 'core::integer::u16'
      ) {
        parsedDataArr.push(Number(val));
      } else {
        parsedDataArr.push(val);
      }
    }
    const configConstructor = config?.[element.name];
    if (configConstructor) {
      const concatenatedString = parsedDataArr.join('');
      return concatenatedString;
    }
    return parsedDataArr;
  }

  // base type
  return decodeBaseTypes(element.type, calldataIterator, config);
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
  enums: AbiEnums,
  config?: DecodeConfig
): any {
  const { name, type } = input;

  switch (true) {
    case isLen(name): {
      const temp = calldataIterator.next().value;
      return BigInt(temp);
    }

    case (structs && type in structs) || isTypeTuple(type):
      return decodeCalldataValue(calldataIterator, input, structs, enums, config);

    case enums && isTypeEnum(type, enums):
      return decodeCalldataValue(calldataIterator, input, structs, enums, config);

    case isTypeArray(type):
      // C1 Array
      if (isCairo1Type(type)) {
        return decodeCalldataValue(calldataIterator, input, structs, enums, config);
      }
      break;

    default:
      return decodeBaseTypes(type, calldataIterator, config);
  }

  return null;
}

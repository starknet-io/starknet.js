import {
  AbiEntry,
  AbiEnums,
  AbiStructs,
  BigNumberish,
  FunctionAbi,
  Literal,
  Uint,
} from '../../types';
import assert from '../assert';
import { CairoByteArray } from '../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../cairoDataTypes/bytes31';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { CairoArray } from '../cairoDataTypes/array';
import { CairoTuple } from '../cairoDataTypes/tuple';
import { CairoInt8 } from '../cairoDataTypes/int8';
import { CairoInt16 } from '../cairoDataTypes/int16';
import { CairoInt32 } from '../cairoDataTypes/int32';
import { CairoInt64 } from '../cairoDataTypes/int64';
import { CairoInt128 } from '../cairoDataTypes/int128';
import { CairoUint256 } from '../cairoDataTypes/uint256';
import { CairoUint512 } from '../cairoDataTypes/uint512';
import { CairoSecp256k1Point } from '../cairoDataTypes/secp256k1Point';
import { isHex, toBigInt } from '../num';
import { isLongText } from '../shortString';
import { isNumber, isString, isBigInt, isObject } from '../typed';
import {
  getArrayType,
  isLen,
  isTypeArray,
  isTypeBool,
  isTypeEnum,
  isTypeEthAddress,
  isTypeFelt,
  isTypeLiteral,
  isTypeOption,
  isTypeResult,
  isTypeStruct,
  isTypeTuple,
  isTypeUint,
} from './cairo';
import { CairoTypeOption } from '../cairoDataTypes/cairoTypeOption';
import { CairoCustomEnum, CairoOption, CairoResult } from './enum';
import { CairoTypeResult } from '../cairoDataTypes/cairoTypeResult';
import { CairoStruct } from '../cairoDataTypes/cairoStruct';
import { CairoTypeCustomEnum } from '../cairoDataTypes/cairoTypeCustomEnum';
import { CairoBool } from '../cairoDataTypes';
import { CairoEthAddress } from '../cairoDataTypes/ethAddress';
import { CairoNonZero } from '../cairoDataTypes/nonZero';

// TODO: separate validate is redundant as CairoTypes are validated during construction.
// TODO: This validate should provide added valie method base validate poiniting to incorect value for method, opt. using color coding
// TODO: Something like: store_message(a -> *INVALID JS TYPE*, b, c -> *MISSING REQUIRED ARG*)

const validateFelt = (parameter: any, input: AbiEntry) => {
  assert(
    isString(parameter) || isNumber(parameter) || isBigInt(parameter),
    `Validate: arg ${input.name} should be a felt typed as (String, Number or BigInt)`
  );
  if (isString(parameter) && !isHex(parameter)) return; // shortstring
  const param = BigInt(parameter.toString(10));
  assert(
    // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1266
    param >= 0n && param <= 2n ** 252n - 1n,
    `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
  );
};

const validateUint = (parameter: any, input: AbiEntry) => {
  if (isNumber(parameter)) {
    assert(
      parameter <= Number.MAX_SAFE_INTEGER,
      'Validation: Parameter is too large to be typed as Number use (BigInt or String)'
    );
  }
  assert(
    isString(parameter) ||
      isNumber(parameter) ||
      isBigInt(parameter) ||
      (isObject(parameter) && 'low' in parameter && 'high' in parameter) ||
      (isObject(parameter) &&
        ['limb0', 'limb1', 'limb2', 'limb3'].every((key) => key in parameter)),
    `Validate: arg ${input.name} of cairo type ${
      input.type
    } should be type (String, Number or BigInt), but is ${typeof parameter} ${parameter}.`
  );
  let param: bigint;
  switch (input.type) {
    case Uint.u256:
      param = new CairoUint256(parameter as BigNumberish).toBigInt();
      break;
    case Uint.u512:
      param = new CairoUint512(parameter as BigNumberish).toBigInt();
      break;
    default:
      param = toBigInt(parameter as BigNumberish);
  }
  switch (input.type) {
    case Uint.u8:
      assert(
        param >= 0n && param <= 255n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0 - 255]`
      );
      break;

    case Uint.u16:
      assert(
        param >= 0n && param <= 65535n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 65535]`
      );
      break;

    case Uint.u32:
      assert(
        param >= 0n && param <= 4294967295n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 4294967295]`
      );
      break;

    case Uint.u64:
      assert(
        param >= 0n && param <= 2n ** 64n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^64-1]`
      );
      break;

    case Uint.u128:
      assert(
        param >= 0n && param <= 2n ** 128n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^128-1]`
      );
      break;

    case Uint.u256:
      assert(
        param >= 0n && param <= 2n ** 256n - 1n,
        `Validate: arg ${input.name} is ${input.type} should be in range 0 - 2^256-1`
      );
      break;

    case Uint.u512:
      assert(
        CairoUint512.is(param),
        `Validate: arg ${input.name} is ${input.type} should be in range 0 - 2^512-1`
      );
      break;

    case Literal.ClassHash:
      assert(
        // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1670
        param >= 0n && param <= 2n ** 252n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
      );
      break;

    case Literal.ContractAddress:
      assert(
        // from : https://github.com/starkware-libs/starknet-specs/blob/29bab650be6b1847c92d4461d4c33008b5e50b1a/api/starknet_api_openrpc.json#L1245
        param >= 0n && param <= 2n ** 252n - 1n,
        `Validate: arg ${input.name} cairo typed ${input.type} should be in range [0, 2^252-1]`
      );
      break;
    case Literal.Secp256k1Point: {
      assert(
        CairoSecp256k1Point.is(param),
        `Validate: arg ${input.name} must be ${input.type} : a valid 512 bits secp256k1 point.`
      );
      break;
    }
    case Literal.U96: {
      assert(
        param >= 0n && param <= 2n ** 96n - 1n,
        `Validate: arg ${input.name} must be ${input.type} : a 96 bits number.`
      );
      break;
    }

    default:
      break;
  }
};

const validateBool = (parameter: any, input: AbiEntry) => {
  assert(
    CairoBool.is(parameter),
    `Validate: arg ${input.name} of cairo type ${input.type} should be type (Boolean)`
  );
};

const validateStruct = (parameter: any, input: AbiEntry, structs: AbiStructs) => {
  // c1v2 uint256 or u512 in struct
  if (input.type === Uint.u256 || input.type === Uint.u512) {
    validateUint(parameter, input);
    return;
  }

  if (isTypeEthAddress(input.type)) {
    CairoEthAddress.validate(parameter);
    return;
  }

  if (isTypeStruct(input.type, structs) && parameter instanceof CairoStruct) {
    return; // CairoStruct
  }

  assert(
    isObject(parameter),
    `Validate: arg ${input.name} is cairo type struct (${input.type}), and should be defined as a js object (not array)`
  );

  // shallow struct validation, only first depth level
  structs[input.type].members.forEach(({ name }) => {
    assert(
      Object.keys(parameter).includes(name),
      `Validate: arg ${input.name} should have a property ${name}`
    );
  });
};

const validateEnum = (parameter: any, input: AbiEntry) => {
  // If parameter is a CairoTypeCustomEnum instance, skip validation (it's already validated)
  if (parameter instanceof CairoTypeCustomEnum) {
    return;
  }
  assert(
    isObject(parameter),
    `Validate: arg ${input.name} is cairo type Enum (${input.type}), and should be defined as a js object (not array)`
  );

  const methodsKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(parameter));
  const keys = [...Object.getOwnPropertyNames(parameter), ...methodsKeys];
  if (isTypeOption(input.type) && parameter instanceof CairoTypeOption) {
    return; // CairoTypeOption Enum
  }
  if (isTypeOption(input.type) && parameter instanceof CairoOption) {
    return; // CairoOption Enum
  }
  if (isTypeResult(input.type) && parameter instanceof CairoTypeResult) {
    return; // CairoTypeOption Enum
  }
  if (isTypeResult(input.type) && parameter instanceof CairoResult) {
    return; // CairoResult Enum
  }
  if (parameter instanceof CairoCustomEnum) {
    return;
  }
  if (keys.includes('variant') && keys.includes('activeVariant')) {
    return; // Custom Enum
  }
  throw new Error(
    `Validate Enum: argument ${input.name}, type ${input.type}, value received "${parameter}", is not an Enum.`
  );
};

const validateTuple = (parameter: any, input: AbiEntry) => {
  // If parameter is a CairoTuple instance, skip validation (it's already validated)
  if (parameter instanceof CairoTuple) {
    return;
  }

  assert(
    isObject(parameter) || Array.isArray(parameter),
    `Validate: arg ${input.name} should be a tuple (defined as object or array)`
  );
  // todo: skip tuple structural validation for now
};

const validateArray = (
  parameterArray: Array<any> | Record<string, any> | CairoFixedArray | CairoArray | CairoTuple,
  input: AbiEntry,
  structs: AbiStructs,
  enums: AbiEnums
) => {
  // If parameterArray is a CairoFixedArray, CairoArray, or CairoTuple instance, skip validation (it's already validated)
  if (
    parameterArray instanceof CairoFixedArray ||
    parameterArray instanceof CairoArray ||
    parameterArray instanceof CairoTuple
  ) {
    return;
  }

  const isNormalArray = isTypeArray(input.type);
  const baseType = isNormalArray
    ? getArrayType(input.type)
    : CairoFixedArray.getFixedArrayType(input.type);

  // Long text (special case when parameter is not an array but long text)
  if (isNormalArray && isTypeFelt(baseType) && isLongText(parameterArray)) {
    return;
  }
  let parameter: Array<any> = [];
  if (isNormalArray) {
    assert(Array.isArray(parameterArray), `Validate: arg ${input.name} should be an Array`);
    parameter = parameterArray;
  } else {
    // fixedArray
    switch (true) {
      case Array.isArray(parameterArray):
        // the type cast is just for the documentation generation, TS narrowing works as expected
        parameter = parameterArray as any;
        break;
      case typeof parameterArray === 'object':
        parameter = Object.values(parameterArray);
        break;
      default:
        throw new Error(`Validate: arg ${input.name} should be an Array or an object.`);
    }
  }

  switch (true) {
    case isTypeFelt(baseType):
      parameter.forEach((param: BigNumberish) => validateFelt(param, input));
      break;
    case isTypeTuple(baseType):
      parameter.forEach((it: any) => validateTuple(it, { name: input.name, type: baseType }));
      break;

    case isTypeArray(baseType):
      parameter.forEach((param: any) =>
        validateArray(param, { name: '', type: baseType }, structs, enums)
      );
      break;
    case isTypeStruct(baseType, structs):
      parameter.forEach((it: any) =>
        validateStruct(it, { name: input.name, type: baseType }, structs)
      );
      break;
    case isTypeEnum(baseType, enums):
      parameter.forEach((it: any) => validateEnum(it, { name: input.name, type: baseType }));
      break;
    case isTypeUint(baseType) || isTypeLiteral(baseType):
      parameter.forEach((param: BigNumberish) => validateUint(param, { name: '', type: baseType }));
      break;
    case isTypeBool(baseType):
      parameter.forEach((param: BigNumberish) => validateBool(param, input));
      break;
    default:
      throw new Error(
        `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
      );
  }
};

/**
 * Validate cairo contract method arguments
 * Flow: Determine type from abi and than validate against parameter
 *
 * @param {FunctionAbi} abiMethod - Abi method.
 * @param {any[]} args - Arguments.
 * @param {AbiStructs} structs - ABI structs.
 * @param {AbiEnums} enums - ABI enums.
 * @returns {void} - Return void if validation passes
 *
 * @example
 * const functionAbi: FunctionAbi = {
 *   inputs: [{ name: 'test', type: 'felt' }],
 *   name: 'test',
 *   outputs: [{ name: 'test', type: 'felt' }],
 *   stateMutability: 'view',
 *   type: 'function',
 * };
 *
 * const abiStructs: AbiStructs = {
 *  abi_structs: {
 *    members: [
 *        {
 *          name: 'test_name',
 *          type: 'test_type',
 *          offset: 1,
 *        },
 *    ],
 *    size: 2,
 *    name: 'cairo_event_struct',
 *    type: 'struct',
 *   },
 * };
 *
 * const abiEnums: AbiEnums = {
 *   abi_enums: {
 *     variants: [
 *       {
 *         name: 'test_name',
 *         type: 'cairo_event_struct_variant',
 *         offset: 1,
 *       },
 *     ],
 *     size: 2,
 *     name: 'test_cairo_event',
 *     type: 'enum',
 *   },
 * };
 *
 * validateFields(functionAbi, [1n], abiStructs, abiEnums); // Returns void since validation passes
 * validateFields(functionAbi, [{}], abiStructs, abiEnums); // Throw an error because parameters are not valid
 */
export default function validateFields(
  abiMethod: FunctionAbi,
  args: any[],
  structs: AbiStructs,
  enums: AbiEnums
): void {
  abiMethod.inputs.reduce((acc, input) => {
    const parameter = args[acc];

    switch (true) {
      case isLen(input.name):
        return acc;
      case isTypeFelt(input.type):
        validateFelt(parameter, input);
        break;
      case CairoBytes31.isAbiType(input.type):
        CairoBytes31.validate(parameter);
        break;
      case isTypeUint(input.type) || isTypeLiteral(input.type):
        validateUint(parameter, input);
        break;
      case isTypeBool(input.type):
        validateBool(parameter, input);
        break;
      case CairoByteArray.isAbiType(input.type):
        CairoByteArray.validate(parameter);
        break;
      case CairoInt8.isAbiType(input.type):
        CairoInt8.validate(parameter);
        break;
      case CairoInt16.isAbiType(input.type):
        CairoInt16.validate(parameter);
        break;
      case CairoInt32.isAbiType(input.type):
        CairoInt32.validate(parameter);
        break;
      case CairoInt64.isAbiType(input.type):
        CairoInt64.validate(parameter);
        break;
      case CairoInt128.isAbiType(input.type):
        CairoInt128.validate(parameter);
        break;
      case isTypeArray(input.type) || CairoFixedArray.isAbiType(input.type):
        validateArray(parameter, input, structs, enums);
        break;
      case isTypeStruct(input.type, structs):
        validateStruct(parameter, input, structs);
        break;
      case isTypeEnum(input.type, enums):
        validateEnum(parameter, input);
        break;
      case isTypeTuple(input.type):
        validateTuple(parameter, input);
        break;
      case CairoNonZero.isAbiType(input.type):
        CairoNonZero.validate(parameter, input.type);
        break;
      default:
        throw new Error(
          `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
        );
    }

    return acc + 1;
  }, 0);
}

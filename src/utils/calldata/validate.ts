import { AbiEntry, AbiStructs, FunctionAbi } from '../../types';
/**
 * Validate cairo contract method arguments
 * Flow: Determine type from abi and than validate against parameter
 */
import assert from '../assert';
import { BigNumberish, toBigInt } from '../num';
import { isLongText } from '../shortString';
import { uint256ToBN } from '../uint256';
import {
  Uint,
  getArrayType,
  isLen,
  isTypeArray,
  isTypeBool,
  isTypeContractAddress,
  isTypeFelt,
  isTypeStruct,
  isTypeTuple,
  isTypeUint,
} from './cairo';

const validateFelt = (parameter: any, input: AbiEntry) => {
  assert(
    typeof parameter === 'string' || typeof parameter === 'number' || typeof parameter === 'bigint',
    `Validate: arg ${input.name} should be a felt typed as (String, Number or BigInt)`
  );
};

const validateUint = (parameter: any, input: AbiEntry) => {
  if (typeof parameter === 'number') {
    assert(
      parameter <= Number.MAX_SAFE_INTEGER,
      `Validation: Parameter is to large to be typed as Number use (BigInt or String)`
    );
  }
  assert(
    typeof parameter === 'string' ||
      typeof parameter === 'number' ||
      typeof parameter === 'bigint' ||
      (typeof parameter === 'object' && 'low' in parameter && 'high' in parameter),
    `Validate: arg ${input.name} of cairo ZORG type ${input.type} should be type (String, Number or BigInt)`
  );
  const param = typeof parameter === 'object' ? uint256ToBN(parameter) : toBigInt(parameter);

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
        `Validate: arg ${input.name} is ${input.type} 0 - 2^256-1`
      );
      break;

    default:
      break;
  }
};

const validateBool = (parameter: any, input: AbiEntry) => {
  assert(
    typeof parameter === 'boolean',
    `Validate: arg ${input.name} of cairo type ${input.type} should be type (Boolean)`
  );
};

const validateStruct = (parameter: any, input: AbiEntry, structs: AbiStructs) => {
  assert(
    typeof parameter === 'object' && !Array.isArray(parameter),
    `Validate: arg ${input.name} is cairo type struct (${input.type}), and should be defined as js object (not array)`
  );

  // shallow struct validation, only first depth level
  structs[input.type].members.forEach(({ name }) => {
    assert(
      Object.keys(parameter).includes(name),
      `Validate: arg ${input.name} should have a property ${name}`
    );
  });
};

const validateTuple = (parameter: any, input: AbiEntry) => {
  assert(
    typeof parameter === 'object' && !Array.isArray(parameter),
    `Validate: arg ${input.name} should be a tuple (defined as object)`
  );
  // todo: skip tuple structural validation for now
};

const validateArray = (parameter: any, input: AbiEntry, structs: AbiStructs) => {
  const baseType = getArrayType(input.type);

  // Long text (special case when parameter is not an array but long text)
  if (isTypeFelt(baseType) && isLongText(parameter)) return;

  assert(Array.isArray(parameter), `Validate: arg ${input.name} should be an Array`);

  switch (true) {
    case isTypeFelt(baseType):
      parameter.forEach((param: BigNumberish) => validateFelt(param, input));
      break;
    case isTypeTuple(baseType):
      parameter.forEach((it: any) => validateTuple(it, { name: input.name, type: baseType }));
      break;
    case isTypeStruct(baseType, structs):
      parameter.forEach((it: any) =>
        validateStruct(it, { name: input.name, type: baseType }, structs)
      );
      break;
    case isTypeUint(baseType):
      parameter.forEach((param: BigNumberish) => validateUint(param, input));
      break;
    case isTypeBool(baseType):
      parameter.forEach((param: BigNumberish) => validateBool(param, input));
      break;
    case isTypeArray(baseType):
      parameter.forEach((param: BigNumberish) =>
        validateArray(param, { name: '', type: baseType }, structs)
      );
      break;
    default:
      throw new Error(
        `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
      );
  }
};

export default function validateFields(
  abiMethod: FunctionAbi,
  args: Array<any>,
  structs: AbiStructs
) {
  abiMethod.inputs.reduce((acc, input) => {
    const parameter = args[acc];

    switch (true) {
      case isLen(input.name):
        return acc;
      case isTypeFelt(input.type):
        validateFelt(parameter, input);
        break;
      case isTypeUint(input.type):
        validateUint(parameter, input);
        break;
      case isTypeBool(input.type):
        validateBool(parameter, input);
        break;
      case isTypeContractAddress(input.type):
        // TODO: ??
        break;
      case isTypeStruct(input.type, structs):
        validateStruct(parameter, input, structs);
        break;
      case isTypeTuple(input.type):
        validateTuple(parameter, input);
        break;
      case isTypeArray(input.type):
        validateArray(parameter, input, structs);
        break;
      default:
        throw new Error(
          `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
        );
    }

    return acc + 1;
  }, 0);
}

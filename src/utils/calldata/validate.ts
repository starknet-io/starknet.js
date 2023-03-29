import { AbiEntry, AbiStructs, FunctionAbi } from '../../types';
/**
 * Validate cairo contract method arguments
 * Flow: Determine type from abi and than validate against parameter
 */
import assert from '../assert';
import { BigNumberish } from '../num';
import { isLongText } from '../shortString';
import { isLen, isTypeArray, isTypeFelt, isTypeStruct, isTypeTuple } from './cairo';

const validateFelt = (parameter: any, input: AbiEntry) => {
  assert(
    typeof parameter === 'string' || typeof parameter === 'number' || typeof parameter === 'bigint',
    `Validate: arg ${input.name} should be a felt (string, number, BigNumber)`
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
  const baseType = input.type.replace('*', '');

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

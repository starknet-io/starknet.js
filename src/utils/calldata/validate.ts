/**
 * Validate cairo contract method arguments
 * Flow: Determine type from abi and than validate against parameter
 */

import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { AbiEntry, FunctionAbi, abiStructs } from '../../types';
import { BigNumberish } from '../number';
import { isLongText } from '../shortString';
import { isLen, isTypeArray, isTypeFelt, isTypeStruct, isTypeTuple } from './cairo';

const validateFelt = (parameter: any, input: AbiEntry) => {
  assert(
    typeof parameter === 'string' || typeof parameter === 'number' || parameter instanceof BN,
    `Validate: arg ${input.name} should be a felt (string, number, BigNumber)`
  );
};

const validateStruct = (parameter: any, input: AbiEntry, structs: abiStructs) => {
  assert(
    typeof parameter === 'object' && !Array.isArray(parameter),
    `Validate: arg ${input.name} is cairo type struct (${input.type}), and should be defined as js object (not array)`
  );

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

const validateArray = (parameter: any, input: AbiEntry, structs: abiStructs) => {
  const baseType = input.type.replace('*', '');

  // Long text (special case when parameter is not an array but long text)
  if (isTypeFelt(baseType) && isLongText(parameter)) return;

  assert(Array.isArray(parameter), `Validate: arg ${input.name} should be an Array`);
  // Array of Felts
  if (isTypeFelt(baseType)) {
    parameter.forEach((param: BigNumberish) => validateFelt(param, input));
    // Array of Tuple
  } else if (/\(felt/.test(input.type)) {
    // todo: this is not true it can be like (Struct.. or (Tuple...)
    // TODO: This ex. code validate only most basic tuple structure, skip for validation
    // Array of Struct
  } else if (isTypeStruct(baseType, structs)) {
    parameter.forEach((structParam: any) =>
      validateStruct(structParam, { name: input.name, type: baseType }, structs)
    );
  } else {
    throw new Error(
      `Validate Unhandled: argument ${input.name}, type ${input.type}, value ${parameter}`
    );
  }
};

export default function validateFields(
  abiMethod: FunctionAbi,
  args: Array<any>,
  structs: abiStructs
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

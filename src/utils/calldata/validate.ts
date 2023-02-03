import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { FunctionAbi, abiStructs } from '../../types';
import { BigNumberish } from '../number';
import { isLongText } from '../shortString';
import { isLen, isTypeFelt } from './cairo';
import { calculateStructMembers } from './requestParser';

export default function validateFields(
  abiMethod: FunctionAbi,
  args: Array<any>,
  structs: abiStructs
) {
  // TODO: This need to be refactored. It need to test by type and than test by parameter, with else throw unknown
  // validate parameters
  abiMethod.inputs.reduce((acc, input) => {
    const parameter = args[acc];

    // Skip for _len
    if (isLen(input.name)) return acc;

    // type Felt
    if (isTypeFelt(input.type)) {
      assert(
        typeof parameter === 'string' || typeof parameter === 'number' || parameter instanceof BN,
        `arg ${input.name} should be a felt (string, number, BigNumber)`
      );

      // type Struct
    } else if (input.type in structs && typeof parameter === 'object') {
      // Case when struct parameters are provided as array instead of object
      if (Array.isArray(parameter)) {
        const structMembersLength = calculateStructMembers(input.type, structs);
        assert(
          parameter.length === structMembersLength,
          `arg should be of length ${structMembersLength}`
        );
      } else {
        structs[input.type].members.forEach(({ name }) => {
          assert(Object.keys(parameter).includes(name), `arg should have a property ${name}`);
        });
      }

      // Type Tuple -> detected as object that is not part of abi struct
    } else if (typeof parameter === 'object' && !Array.isArray(parameter)) {
      // TODO: skip tuple validation for now
      // Type Array
      // TODO: fix, this is array is assumption
    } else {
      // Long string
      if (isLongText(parameter)) {
        return acc + 1;
      }
      assert(Array.isArray(parameter), `arg ${input.name} should be an Array`);
      // Array of Felts
      if (input.type === 'felt*') {
        parameter.forEach((felty: BigNumberish) => {
          assert(
            typeof felty === 'string' || typeof felty === 'number' || felty instanceof BN,
            `arg ${input.name} should be an array of string, number or BigNumber`
          );
        });
        // Array of Tuple
      } else if (/\(felt/.test(input.type)) {
        // TODO: This ex. code validate only most basic tuple structure, skip for validation
        // Array of Struct
      } else {
        const arrayType = input.type.replace('*', '');
        parameter.forEach((struct: any) => {
          structs[arrayType].members.forEach(({ name }) => {
            // Struct provided as Array, should not be valid
            if (Array.isArray(struct)) {
              const structMembersLength = calculateStructMembers(arrayType, structs);
              assert(
                struct.length === structMembersLength,
                `arg should be of length ${structMembersLength}`
              );
            } else {
              assert(
                Object.keys(struct).includes(name),
                `arg ${input.name} should be an array of ${arrayType}`
              );
            }
          });
        });
      }
    }
    return acc + 1;
  }, 0);
}

import { AbiEntry, ParsedStruct, Tupled, abiStructs } from '../../types';
import { BigNumberish, toFelt } from '../number';
import { isTypeArray, isTypeFeltArray, isTypeTuple } from './cairo';
import extractTupleMemberTypes from './tuple';

/**
 * Parse tuple type string to array of known objects
 * @param element request element
 * @param typeStr tuple type string
 * @returns Tupled[]
 */
function parseTuple(element: object, typeStr: string): Tupled[] {
  const memberTypes = extractTupleMemberTypes(typeStr);
  const elements = Object.values(element);

  if (elements.length !== memberTypes.length) {
    throw Error('Provided and abi expected tuple size diff in parseTuple');
  }

  return memberTypes.map((it: any, dx: number) => {
    return {
      element: elements[dx],
      type: it.type,
    };
  });
}

/**
 * Deep parse of the object that has been passed to the method // TODO: Check how to get here
 *
 * @param struct - struct that needs to be calculated
 * @param structs - structs from abi
 * @return {number} - number of members for the given struct
 */
export function calculateStructMembers(struct: string, structs: abiStructs): number {
  return structs[struct].members.reduce((acc, member) => {
    if (member.type === 'felt') {
      return acc + 1;
    }
    return acc + calculateStructMembers(member.type, structs);
  }, 0);
}

/**
 * Deep parse of the object that has been passed to the method
 *
 * @param element - element that needs to be parsed
 * @param type  - name of the method
 * @param structs - structs from abi
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 */
function parseCalldataValue(
  element: ParsedStruct | BigNumberish | BigNumberish[],
  type: string,
  structs: abiStructs
): string | string[] {
  if (element === undefined) {
    throw Error(`Missing parameter for type ${type}`);
  }
  if (Array.isArray(element)) {
    // Structure or Tuple provided as Array, this should not be valid
    const structMemberNum = calculateStructMembers(type, structs);
    if (element.length !== structMemberNum) {
      throw Error(`Missing parameter for type ${type}`);
    }
    return element.map((el) => toFelt(el));
  }
  // checking if the passed element is struct
  if (structs[type] && structs[type].members.length) {
    const { members } = structs[type];
    const subElement = element as any;

    return members.reduce((acc, it: AbiEntry) => {
      return acc.concat(parseCalldataValue(subElement[it.name], it.type, structs));
    }, [] as string[]);
  }
  // check if abi element is tuple
  if (isTypeTuple(type)) {
    const tupled = parseTuple(element as object, type);

    return tupled.reduce((acc, it: Tupled) => {
      const parsedData = parseCalldataValue(it.element, it.type, structs);
      return acc.concat(parsedData);
    }, [] as string[]);
  }
  if (typeof element === 'object') {
    throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
  }
  return toFelt(element as BigNumberish);
}

/**
 * Parse one field of the calldata by using input field from the abi for that method
 *
 * @param argsIterator - Iterator<any> for value of the field
 * @param input  - input(field) information from the abi that will be used to parse the data
 * @param structs - structs from abi
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 */
export function parseCalldataField(
  argsIterator: Iterator<any>,
  input: AbiEntry,
  structs: abiStructs
): string | string[] {
  const { name, type } = input;
  const { value } = argsIterator.next();

  switch (true) {
    // When type is Array
    case isTypeArray(type):
      if (!Array.isArray(value)) {
        throw Error(`ABI expected parameter ${name} to be array, got ${value}`);
      }
      // eslint-disable-next-line no-case-declarations
      const result: string[] = [];
      result.push(toFelt(value.length)); // Add length to array

      return (value as (BigNumberish | ParsedStruct)[]).reduce((acc, el) => {
        if (isTypeFeltArray(type)) {
          acc.push(toFelt(el as BigNumberish));
        } else {
          // structure or tuple
          acc.push(...parseCalldataValue(el, type.replace('*', ''), structs));
        }
        return acc;
      }, result);
    // When type is Struct or Tuple
    case type in structs || isTypeTuple(type):
      return parseCalldataValue(value as ParsedStruct | BigNumberish[], type, structs);
    // When type is felt or unhandled
    default:
      return toFelt(value as BigNumberish);
  }
}
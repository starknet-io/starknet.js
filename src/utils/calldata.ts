/* eslint-disable no-plusplus */
import BN from 'bn.js';
import assert from 'minimalistic-assert';

import {
  Abi,
  AbiEntry,
  Args,
  Calldata,
  FunctionAbi,
  ParsedStruct,
  Result,
  StructAbi,
  Tupled,
} from '../types';
import { BigNumberish, toBN, toFelt } from './number';
import { Uint256, isUint256 } from './uint256';

const isLen = (name: string) => /_len$/.test(name);
// ABI Types
const isTypeFelt = (type: string) => type === 'felt';
const isTypeFeltArray = (type: string) => type === 'felt*';
const isTypeArray = (type: string) => /\*/.test(type);
const isTypeTuple = (type: string) => /\(.*\)/i.test(type);
const isTypeNamedTuple = (type: string) => /\(.*\)/i.test(type) && type.includes(':');

function parseNamedTuple(namedTuple: string): any {
  const name = namedTuple.substring(0, namedTuple.indexOf(':'));
  const type = namedTuple.substring(name.length + ':'.length);
  return { name, type };
}

function parseSubTuple(s: string) {
  if (!s.includes('(')) return { subTuple: [], result: s };

  const subTuple: string[] = [];
  let result = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '(') {
      let counter = 1;
      const lBracket = i;
      i++;
      while (counter) {
        if (s[i] === ')') counter--;
        if (s[i] === '(') counter++;
        i++;
      }
      subTuple.push(s.substring(lBracket, i));
      result += ' ';
      i--;
    } else {
      result += s[i];
    }
    i++;
  }

  return {
    subTuple,
    result,
  };
}

function extractTupleMemberTypes(type: string): (string | object)[] {
  const cleanType = type.replace(/\s/g, '').slice(1, -1); // remove first lvl () and spaces

  // Decompose subTuple
  const { subTuple, result } = parseSubTuple(cleanType);

  // Recompose subTuple
  let recomposed = result.split(',').map((it) => {
    return subTuple.length ? it.replace(' ', subTuple.shift() as string) : it;
  });

  // Parse named tuple
  if (isTypeNamedTuple(type)) {
    recomposed = recomposed.reduce((acc, it) => {
      return acc.concat(parseNamedTuple(it));
    }, []);
    // TODO: we can check also names in named tuple
  }

  return recomposed;
}

export class CheckCallData {
  abi: Abi;

  protected readonly structs: { [name: string]: StructAbi };

  constructor(abi: Abi) {
    this.abi = abi;
    this.structs = abi
      .filter((abiEntry) => abiEntry.type === 'struct')
      .reduce(
        (acc, abiEntry) => ({
          ...acc,
          [abiEntry.name]: abiEntry,
        }),
        {}
      );
  }

  /**
   * Validates if all arguments that are passed to the method are corresponding to the ones in the abi
   *
   * @param type - type of the method
   * @param method  - name of the method
   * @param args - arguments that are passed to the method
   */
  public validateMethodAndArgs(
    type: 'INVOKE' | 'CALL' | 'DEPLOY',
    method: string,
    args: Array<any> = []
  ) {
    // ensure provided method of type exists
    if (type !== 'DEPLOY') {
      const invocableFunctionNames = this.abi
        .filter((abi) => {
          if (abi.type !== 'function') return false;
          const isView = abi.stateMutability === 'view';
          return type === 'INVOKE' ? !isView : isView;
        })
        .map((abi) => abi.name);
      assert(
        invocableFunctionNames.includes(method),
        `${type === 'INVOKE' ? 'invocable' : 'viewable'} method not found in abi`
      );
    }

    // get requested method from abi
    const methodAbi = this.abi.find((abi) =>
      type === 'DEPLOY'
        ? abi.name === method && abi.type === method
        : abi.name === method && abi.type === 'function'
    ) as FunctionAbi;

    // validate parameters
    methodAbi.inputs.reduce((acc, input) => {
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
      } else if (input.type in this.structs && typeof parameter === 'object') {
        // Case when struct parameters are provided as array instead of object
        if (Array.isArray(parameter)) {
          const structMembersLength = this.calculateStructMembers(input.type);
          assert(
            parameter.length === structMembersLength,
            `arg should be of length ${structMembersLength}`
          );
        } else {
          this.structs[input.type].members.forEach(({ name }) => {
            assert(Object.keys(parameter).includes(name), `arg should have a property ${name}`);
          });
        }

        // Type Tuple -> detected as object that is not part of abi struct
      } else if (typeof parameter === 'object' && !Array.isArray(parameter)) {
        // TODO: skip tuple validation for now
        // Type Array
      } else {
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
            this.structs[arrayType].members.forEach(({ name }) => {
              // Struct provided as Array, should not be valid
              if (Array.isArray(struct)) {
                const structMembersLength = this.calculateStructMembers(arrayType);
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

  /**
   * Parse the calldata by using input fields from the abi for that method
   *
   * @param args - arguments passed the the method
   * @param inputs  - list of inputs(fields) that are in the abi
   * @return {Calldata} - parsed arguments in format that contract is expecting
   */
  public compileCalldata(args: Array<any>, inputs: AbiEntry[]): Calldata {
    const argsIterator = args[Symbol.iterator]();
    return inputs.reduce(
      (acc, input) =>
        isLen(input.name) ? acc : acc.concat(this.parseCalldataField(argsIterator, input)),
      [] as Calldata
    );
  }

  /**
   * Parse one field of the calldata by using input field from the abi for that method
   *
   * @param argsIterator - Iterator<any> for value of the field
   * @param input  - input(field) information from the abi that will be used to parse the data
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */
  protected parseCalldataField(argsIterator: Iterator<any>, input: AbiEntry): string | string[] {
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
            acc.push(...this.parseCalldataValue(el, type.replace('*', '')));
          }
          return acc;
        }, result);
      // When type is Struct or Tuple
      case type in this.structs || isTypeTuple(type):
        return this.parseCalldataValue(value as ParsedStruct | BigNumberish[], type);
      // When type is felt or unhandled
      default:
        return toFelt(value as BigNumberish);
    }
  }

  /**
   * Deep parse of the object that has been passed to the method
   *
   * @param element - element that needs to be parsed
   * @param type  - name of the method
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */

  protected parseCalldataValue(
    element: ParsedStruct | BigNumberish | BigNumberish[],
    type: string
  ): string | string[] {
    if (element === undefined) {
      throw Error(`Missing parameter for type ${type}`);
    }
    if (Array.isArray(element)) {
      // Structure or Tuple provided as Array, this should not be valid
      const structMemberNum = this.calculateStructMembers(type);
      if (element.length !== structMemberNum) {
        throw Error(`Missing parameter for type ${type}`);
      }
      return element.map((el) => toFelt(el));
    }
    // checking if the passed element is struct
    if (this.structs[type] && this.structs[type].members.length) {
      const { members } = this.structs[type];
      const subElement = element as any;

      return members.reduce((acc, it: AbiEntry) => {
        // TODO: refactor types so member name can be used as keyof ParsedStruct
        return acc.concat(this.parseCalldataValue(subElement[it.name], it.type));
      }, [] as string[]);
    }
    // check if abi element is tuple
    if (isTypeTuple(type)) {
      const tupled = this.parseTuple(element as object, type);

      return tupled.reduce((acc, it: Tupled) => {
        const parsedData = this.parseCalldataValue(it.element, it.type);
        return acc.concat(parsedData);
      }, [] as string[]);
    }
    if (typeof element === 'object') {
      throw Error(`Parameter ${element} do not align with abi parameter ${type}`);
    }
    return toFelt(element as BigNumberish);
  }

  /**
   * Deep parse of the object that has been passed to the method // TODO: Check how to get here
   *
   * @param struct - struct that needs to be calculated
   * @return {number} - number of members for the given struct
   */
  private calculateStructMembers(struct: string): number {
    return this.structs[struct].members.reduce((acc, member) => {
      if (member.type === 'felt') {
        return acc + 1;
      }
      return acc + this.calculateStructMembers(member.type);
    }, 0);
  }

  private parseTuple(element: object, typeStr: string): Tupled[] {
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
   * Parse elements of the response array and structuring them into response object
   *
   * @param method - method name
   * @param response  - response from the method
   * @return - parsed response corresponding to the abi
   */
  public parseResponse(method: string, response: string[]): Result {
    const { outputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();

    const resultObject = outputs.flat().reduce((acc, output) => {
      acc[output.name] = this.parseResponseField(responseIterator, output, acc);
      if (acc[output.name] && acc[`${output.name}_len`]) {
        delete acc[`${output.name}_len`];
      }
      return acc;
    }, {} as Args);
    // TODO: Remove this no need for it as user can do Object.values(response) to get indexed data
    return Object.entries(resultObject).reduce((acc, [key, value]) => {
      acc.push(value);
      acc[key] = value;
      return acc;
    }, [] as Result);
  }

  /**
   * Parse elements of the response and structuring them into one field by using output property from the abi for that method
   *
   * @param responseIterator - iterator of the response
   * @param output  - output(field) information from the abi that will be used to parse the data
   * @return - parsed response corresponding to the abi structure of the field
   */
  protected parseResponseField(
    responseIterator: Iterator<string>,
    output: AbiEntry,
    parsedResult?: Args
  ): any {
    const { name, type } = output;
    let temp;

    switch (true) {
      case isLen(name):
        temp = responseIterator.next().value;
        return toBN(temp).toNumber();
      case isTypeArray(type):
        // eslint-disable-next-line no-case-declarations
        const parsedDataArr: (BigNumberish | ParsedStruct)[] = [];

        if (parsedResult && parsedResult[`${name}_len`]) {
          const arrLen = parsedResult[`${name}_len`] as number;
          while (parsedDataArr.length < arrLen) {
            parsedDataArr.push(
              this.parseResponseStruct(responseIterator, output.type.replace('*', ''))
            );
          }
        }
        return parsedDataArr;
      case type in this.structs || isTypeTuple(type):
        return this.parseResponseStruct(responseIterator, type);
      default:
        temp = responseIterator.next().value;
        return toBN(temp);
    }
  }

  /**
   * Parse of the response elements that are converted to Object (Struct) by using the abi
   *
   * @param responseIterator - iterator of the response
   * @param type - type of the struct
   * @return {BigNumberish | ParsedStruct} - parsed arguments in format that contract is expecting
   */
  protected parseResponseStruct(
    responseIterator: Iterator<string>,
    type: string
  ): BigNumberish | ParsedStruct {
    // type struct
    if (type in this.structs && this.structs[type]) {
      return this.structs[type].members.reduce((acc, el) => {
        // parse each member of the struct (member can felt or nested struct)
        acc[el.name] = this.parseResponseStruct(responseIterator, el.type);
        return acc;
      }, {} as any);
    }
    // todo: tuple
    if (isTypeTuple(type)) {
      const memberTypes = extractTupleMemberTypes(type);
      const result = memberTypes.reduce((acc, it: any, idx) => {
        const tName = it?.name ? it.name : idx;
        const tType = it?.type ? it.type : it;
        acc[tName] = this.parseResponseStruct(responseIterator, tType);
        return acc;
      }, {} as any);
      return result;
    }
    const temp = responseIterator.next().value;
    return toBN(temp);
  }
}

/**
 * Uint256 cairo type (helper for common struct type)
 */
export function uint256(it: BigNumberish): Uint256 {
  const bn = toBN(it);
  if (!isUint256(bn)) throw new Error('Number is too large');
  return {
    low: bn.maskn(128).toString(10),
    high: bn.shrn(128).toString(10),
  };
}

/**
 * 'unnamed' tuple cairo type (helper same as common struct type)
 * named tuple can be defined as struct with js object
 */
export function tuple(...args: (BigNumberish | object)[]) {
  return { ...args };
}

/**
 * struct types are described as js object {}
 */

/**
 * array types are described as js array []
 */

/**
 * felt cairo type
 */
export const felt = (it: BigNumberish) => toFelt(it);

/**
 * Compile contract callData for sending request
 * @param data Object representing cairo method arguments
 * @returns string[]
 */
export function callData(data: object): string[] {
  const createTree = (obj: object) => {
    const getEntries = (o: object, prefix = ''): any => {
      const oe = Array.isArray(o) ? [o.length.toString(), ...o] : o;
      return Object.entries(oe).flatMap(([k, v]) => {
        const kk = Array.isArray(oe) && k === '0' ? '$$len' : k;
        if (BN.isBN(v)) return [[`${prefix}${kk}`, felt(v)]];
        return Object(v) === v ? getEntries(v, `${prefix}${kk}.`) : [[`${prefix}${kk}`, felt(v)]];
      });
    };
    return Object.fromEntries(getEntries(obj));
  };

  // flatten structs, tuples, add array length. Process leafs as Felt
  const callTree = createTree(data);
  // convert to array
  const callTreeArray = Object.values(callTree);

  // add compiled property to array object
  Object.defineProperty(callTreeArray, 'compiled', {
    enumerable: false,
    writable: false,
    value: true,
  });
  return callTreeArray;
}

import BN from 'bn.js';
import assert from 'minimalistic-assert';

import { Abi, AbiEntry, Calldata, FunctionAbi, ParsedStruct, StructAbi } from '../types';
import { BigNumberish, toFelt } from './number';

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
   * Parse the calldata by using input fields from the abi for that method
   *
   * @param args - arguments passed the the method
   * @param inputs  - list of inputs(fields) that are in the abi
   * @return {Calldata} - parsed arguments in format that contract is expecting
   */
  public compileCalldata(args: Array<any>, inputs: AbiEntry[]): Calldata {
    const argsIterator = args[Symbol.iterator]();
    return inputs.reduce((acc, input) => {
      if (/_len$/.test(input.name)) {
        return acc;
      }
      const parsedData = this.parseCalldataField(argsIterator, input);
      if (Array.isArray(parsedData)) {
        acc.push(...parsedData);
      } else {
        acc.push(parsedData);
      }
      return acc;
    }, [] as Calldata);
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
    // ensure provided method exists
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

    // ensure args match abi type
    const methodAbi = this.abi.find((abi) =>
      type === 'DEPLOY'
        ? abi.name === method && abi.type === method
        : abi.name === method && abi.type === 'function'
    ) as FunctionAbi;
    let argPosition = 0;
    methodAbi.inputs.forEach((input) => {
      if (/_len$/.test(input.name)) {
        return;
      }
      if (input.type === 'felt') {
        assert(
          typeof args[argPosition] === 'string' ||
            typeof args[argPosition] === 'number' ||
            args[argPosition] instanceof BN,
          `arg ${input.name} should be a felt (string, number, BigNumber)`
        );
        argPosition += 1;
      } else if (input.type in this.structs && typeof args[argPosition] === 'object') {
        if (Array.isArray(args[argPosition])) {
          const structMembersLength = this.calculateStructMembers(input.type);
          assert(
            args[argPosition].length === structMembersLength,
            `arg should be of length ${structMembersLength}`
          );
        } else {
          this.structs[input.type].members.forEach(({ name }) => {
            assert(
              Object.keys(args[argPosition]).includes(name),
              `arg should have a property ${name}`
            );
          });
        }
        argPosition += 1;
      } else {
        assert(Array.isArray(args[argPosition]), `arg ${input.name} should be an Array`);
        if (input.type === 'felt*') {
          args[argPosition].forEach((felt: BigNumberish) => {
            assert(
              typeof felt === 'string' || typeof felt === 'number' || felt instanceof BN,
              `arg ${input.name} should be an array of string, number or BigNumber`
            );
          });
          argPosition += 1;
        } else if (/\(felt/.test(input.type)) {
          const tupleLength = input.type.split(',').length;
          assert(
            args[argPosition].length === tupleLength,
            `arg ${input.name} should have ${tupleLength} elements in tuple`
          );
          args[argPosition].forEach((felt: BigNumberish) => {
            assert(
              typeof felt === 'string' || typeof felt === 'number' || felt instanceof BN,
              `arg ${input.name} should be an array of string, number or BigNumber`
            );
          });
          argPosition += 1;
        } else {
          const arrayType = input.type.replace('*', '');
          args[argPosition].forEach((struct: any) => {
            this.structs[arrayType].members.forEach(({ name }) => {
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
          argPosition += 1;
        }
      }
    });
  }

  /**
   * Parse one field of the calldata by using input field from the abi for that method
   *
   * @param args - value of the field
   * @param input  - input(field) information from the abi that will be used to parse the data
   * @return {string | string[]} - parsed arguments in format that contract is expecting
   */
  protected parseCalldataField(argsIterator: Iterator<any>, input: AbiEntry): string | string[] {
    const { name, type } = input;
    const { value } = argsIterator.next();

    const parsedCalldata: string[] = [];
    switch (true) {
      case /\*/.test(type):
        if (Array.isArray(value)) {
          parsedCalldata.push(toFelt(value.length));
          return (value as (BigNumberish | ParsedStruct)[]).reduce((acc, el) => {
            if (/felt/.test(type)) {
              acc.push(toFelt(el as BigNumberish));
            } else {
              acc.push(...this.parseCalldataValue(el, type.replace('*', '')));
            }
            return acc;
          }, parsedCalldata);
        }
        throw Error(`Expected ${name} to be array`);
      case type in this.structs:
        return this.parseCalldataValue(value as ParsedStruct | BigNumberish[], type);
      case /\(felt/.test(type):
        if (Array.isArray(value)) {
          return value.map((el) => toFelt(el as BigNumberish));
        }
        throw Error(`Expected ${name} to be array`);
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
      throw Error('Missing element in calldata');
    }
    if (Array.isArray(element)) {
      const structMemberNum = this.calculateStructMembers(type);
      if (element.length !== structMemberNum) {
        throw Error('Missing element in calldata');
      }
      return element.map((el) => toFelt(el));
    }
    // checking if the passed element is struct or element in struct
    if (this.structs[type] && this.structs[type].members.length) {
      // going through all the members of the struct and parsing the value
      return this.structs[type].members.reduce((acc, member: AbiEntry) => {
        // if the member of the struct is another struct this will return array of the felts if not it will be single felt
        // TODO: refactor types so member name can be used as keyof ParsedStruct
        /* @ts-ignore */
        const parsedData = this.parseCalldataValue(element[member.name], member.type);
        if (typeof parsedData === 'string') {
          acc.push(parsedData);
        } else {
          acc.push(...parsedData);
        }
        return acc;
      }, [] as string[]);
    }
    return toFelt(element as BigNumberish);
  }

  /**
   * Deep parse of the object that has been passed to the method
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
}

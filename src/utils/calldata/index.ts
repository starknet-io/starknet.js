import { Abi, AbiEntry, AbiStructs, Args, Calldata, FunctionAbi } from '../../types';
import assert from '../assert';
import { isBigInt } from '../num';
import { isLongText, splitLongString } from '../shortString';
import { felt, isLen } from './cairo';
import formatter from './formatter';
import { parseCalldataField } from './requestParser';
import responseParser from './responseParser';
import validateFields from './validate';

// Helpers

export class CallData {
  abi: Abi;

  protected readonly structs: AbiStructs;

  constructor(abi: Abi) {
    this.abi = abi;
    this.structs = CallData.getAbiStruct(abi);
  }

  /**
   * Validates if all arguments that are passed to the method are corresponding to the ones in the abi
   *
   * @param type - type of the method
   * @param method  - name of the method
   * @param args - arguments that are passed to the method
   */
  public validate(type: 'INVOKE' | 'CALL' | 'DEPLOY', method: string, args: Array<any> = []) {
    // ensure provided method of type exists
    if (type !== 'DEPLOY') {
      const invocableFunctionNames = this.abi
        .filter((abi) => {
          if (abi.type !== 'function') return false;
          const isView = abi.stateMutability === 'view' || abi.state_mutability === 'view';
          return type === 'INVOKE' ? !isView : isView;
        })
        .map((abi) => abi.name);
      assert(
        invocableFunctionNames.includes(method),
        `${type === 'INVOKE' ? 'invocable' : 'viewable'} method not found in abi`
      );
    }

    // get requested method from abi
    const abiMethod = this.abi.find((abi) =>
      type === 'DEPLOY'
        ? abi.name === method && abi.type === method
        : abi.name === method && abi.type === 'function'
    ) as FunctionAbi;

    // validate arguments length
    const inputsLength = CallData.abiInputsLength(abiMethod.inputs);
    if (args.length !== inputsLength) {
      throw Error(
        `Invalid number of arguments, expected ${inputsLength} arguments, but got ${args.length}`
      );
    }

    // validate parameters
    validateFields(abiMethod, args, this.structs);
  }

  /**
   * Parse the calldata by using input fields from the abi for that method
   *
   * @param args - arguments passed the the method
   * @param inputs  - list of inputs(fields) that are in the abi
   * @return {Calldata} - parsed arguments in format that contract is expecting
   */
  public compile(args: Array<any>, inputs: AbiEntry[]): Calldata {
    const argsIterator = args[Symbol.iterator]();
    return inputs.reduce(
      (acc, input) =>
        isLen(input.name) ? acc : acc.concat(parseCalldataField(argsIterator, input, this.structs)),
      [] as Calldata
    );
  }

  /**
   * Compile contract callData without abi
   * @param data Object representing cairo method arguments or string array of compiled data
   * @returns string[]
   */
  static compile(data: object | string[]): Calldata {
    const createTree = (obj: object) => {
      const getEntries = (o: object, prefix = ''): any => {
        const oe = Array.isArray(o) ? [o.length.toString(), ...o] : o;
        return Object.entries(oe).flatMap(([k, v]) => {
          let value = v;
          if (isLongText(value)) value = splitLongString(value);
          const kk = Array.isArray(oe) && k === '0' ? '$$len' : k;
          if (isBigInt(value)) return [[`${prefix}${kk}`, felt(value)]];
          return Object(value) === value
            ? getEntries(value, `${prefix}${kk}.`)
            : [[`${prefix}${kk}`, felt(value)]];
        });
      };
      return Object.fromEntries(getEntries(obj));
    };

    let callTreeArray;
    if (!Array.isArray(data)) {
      // flatten structs, tuples, add array length. Process leafs as Felt
      const callTree = createTree(data);
      // convert to array
      callTreeArray = Object.values(callTree);
    } else {
      // data are already compiled or some missuses
      callTreeArray = data;
    }

    // add compiled property to array object
    Object.defineProperty(callTreeArray, 'compiled', {
      enumerable: false,
      writable: false,
      value: true,
    });
    return callTreeArray;
  }

  /**
   * Parse elements of the response array and structuring them into response object
   * @param method - method name
   * @param response  - response from the method
   * @return - parsed response corresponding to the abi
   */
  public parse(method: string, response: string[]): object {
    const { outputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();

    return outputs.flat().reduce((acc, output) => {
      acc[output.name] = responseParser(responseIterator, output, this.structs, acc);
      if (acc[output.name] && acc[`${output.name}_len`]) {
        delete acc[`${output.name}_len`];
      }
      return acc;
    }, {} as Args);
  }

  /**
   * Format cairo method response data to native js values based on provided format schema
   * @param method - cairo method name
   * @param response - cairo method response
   * @param format - formatter object schema
   * @returns parsed and formatted response object
   */
  public format(method: string, response: string[], format: object): object {
    const parsed = this.parse(method, response);
    return formatter(parsed, format);
  }

  // Helper to calculate inputs
  static abiInputsLength(inputs: AbiEntry[]) {
    return inputs.reduce((acc, input) => (!isLen(input.name) ? acc + 1 : acc), 0);
  }

  // Helper to extract structs
  static getAbiStruct(abi: Abi) {
    return abi
      .filter((abiEntry) => abiEntry.type === 'struct')
      .reduce(
        (acc, abiEntry) => ({
          ...acc,
          [abiEntry.name]: abiEntry,
        }),
        {}
      );
  }
}

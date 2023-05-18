/* eslint-disable no-plusplus */
import {
  Abi,
  AbiEntry,
  AbiStructs,
  Args,
  ArgsOrCalldata,
  Calldata,
  FunctionAbi,
  HexCalldata,
  RawArgs,
  RawArgsArray,
  RawArgsObject,
  Result,
} from '../../types';
import assert from '../assert';
import { isBigInt, toHex } from '../num';
import { getSelectorFromName } from '../selector';
import { isLongText, splitLongString } from '../shortString';
import {
  felt,
  getArrayType,
  isCairo1Type,
  isLen,
  isTypeArray,
  isTypeStruct,
  isTypeTuple,
  isTypeUint256,
} from './cairo';
import formatter from './formatter';
import { parseCalldataField } from './requestParser';
import responseParser from './responseParser';
import extractTupleMemberTypes from './tuple';
import validateFields from './validate';

export * as cairo from './cairo';

export class CallData {
  abi: Abi;

  protected readonly structs: AbiStructs;

  constructor(abi: Abi) {
    this.abi = abi;
    this.structs = CallData.getAbiStruct(abi);
  }

  /**
   * Validate arguments passed to the method as corresponding to the ones in the abi
   * @param type string - type of the method
   * @param method string - name of the method
   * @param args ArgsOrCalldata - arguments that are passed to the method
   */
  public validate(type: 'INVOKE' | 'CALL' | 'DEPLOY', method: string, args: ArgsOrCalldata = []) {
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
   * Compile contract callData with abi
   * Parse the calldata by using input fields from the abi for that method
   * @param method string - method name
   * @param args RawArgs - arguments passed to the method. Can be an array of arguments (in the order of abi definition), or an object constructed in conformity with abi (in this case, the parameter can be in a wrong order).
   * @return Calldata - parsed arguments in format that contract is expecting
   * @example
   * ```typescript
   * const calldata = myCallData.compile("constructor",["0x34a",[1,3n]]);
   * ```
   * ```typescript
   * const calldata2 = myCallData.compile("constructor",{list:[1,3n],balance:"0x34"}); // wrong order
   * ```
   */
  public compile(method: string, argsCalldata: RawArgs): Calldata {
    function errorU256(key: string) {
      throw Error(
        `Your object includes the property : ${key}, containing an Uint256 object without the 'low' and 'high' keys.`
      );
    }
    const orderObject = (myObj: RawArgsObject, abiObject: AbiEntry[]): object => {
      const paramProperty = { enumerable: true };
      const newObj2 = abiObject.reduce((newObj, abiParam) => {
        const copyProperty2struct = () =>
          Object.defineProperty(newObj, abiParam.name, {
            ...paramProperty,
            value: myObj[abiParam.name],
          });

        if (myObj[abiParam.name] === 'undefined') {
          if (
            isCairo1Type(abiParam.type) ||
            (!isCairo1Type(abiParam.type) && !isLen(abiParam.name))
          ) {
            throw Error(`Your object needs a property with key : ${abiParam.name} .`);
          }
        }
        switch (true) {
          case isTypeStruct(abiParam.type, this.structs):
            Object.defineProperty(newObj, abiParam.name, {
              ...paramProperty,
              value: orderObject(
                myObj[abiParam.name] as RawArgsObject,
                this.structs[abiParam.type].members
              ),
            });
            break;
          case isTypeUint256(abiParam.type):
            {
              const u256 = myObj[abiParam.name];
              if (typeof u256 === 'object') {
                if ('low' in u256 && 'high' in u256) {
                  Object.defineProperty(newObj, abiParam.name, {
                    ...paramProperty,
                    value: { low: u256.low, high: u256.high },
                  });
                } else {
                  // object without 'low' & 'high'
                  errorU256(abiParam.name);
                }
              } else {
                // BigNumberish --> just copy
                copyProperty2struct();
              }
            }
            break;
          case isTypeTuple(abiParam.type):
            Object.defineProperty(newObj, abiParam.name, {
              ...paramProperty,
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              value: orderTuple(myObj[abiParam.name] as RawArgsObject, abiParam),
            });

            break;
          case isTypeArray(abiParam.type):
            Object.defineProperty(newObj, abiParam.name, {
              ...paramProperty,
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              value: orderArray(myObj[abiParam.name] as Array<any>, abiParam),
            });

            break;
          case !isCairo1Type(abiParam.type) && isLen(abiParam.name):
            // Cairo 0 array_len. Nothing to do, go to next abi item
            break;
          default: // do not needs recursion --> just copy
            copyProperty2struct();
        }
        return newObj;
      }, {});
      return newObj2;
    };

    const orderArray = (myArray: Array<any> | string, abiParam: AbiEntry): Array<any> | string => {
      const typeInArray = getArrayType(abiParam.type);
      if (typeof myArray === 'string') {
        return myArray; // longstring
      }
      switch (true) {
        case typeInArray in this.structs:
          return myArray.map((myObj) => orderObject(myObj, this.structs[typeInArray].members));
        case typeInArray === 'core::integer::u256':
          return myArray.map((u256) => {
            if (typeof u256 === 'object') {
              if ('low' in u256 && 'high' in u256) {
                return { low: u256.low, high: u256.high };
              }
              // object without 'low' & 'high'
              errorU256(abiParam.name);
            }
            return u256;
          });
        case isTypeTuple(typeInArray):
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          return myArray.map((myElem) => orderTuple(myElem, { name: '0', type: typeInArray }));
        case isTypeArray(typeInArray):
          return myArray.map((myElem) => orderArray(myElem, { name: '0', type: typeInArray }));
        default: // is an array of litterals
          return myArray;
      }
    };

    const orderTuple = (myObj: RawArgsObject, abiParam: AbiEntry): object => {
      const paramProperty = { enumerable: true };
      const typeList = extractTupleMemberTypes(abiParam.type);
      const newObj2 = typeList.reduce((newObj: object, abiTypeCairoX: any, index) => {
        const myObjKeys: string[] = Object.keys(myObj);
        const copyProperty2Tuple = () =>
          Object.defineProperty(newObj, index.toString(), {
            ...paramProperty,
            value: myObj[myObjKeys[index]],
          });
        const abiType: string = abiTypeCairoX?.type ? abiTypeCairoX.type : abiTypeCairoX; // Named tuple, or tuple

        switch (true) {
          case isTypeStruct(abiType, this.structs):
            Object.defineProperty(newObj, index.toString(), {
              ...paramProperty,
              value: orderObject(
                myObj[myObjKeys[index]] as RawArgsObject,
                this.structs[abiType].members
              ),
            });
            break;
          case isTypeUint256(abiType):
            {
              const u256 = myObj[myObjKeys[index]];
              if (typeof u256 === 'object') {
                if ('low' in u256 && 'high' in u256) {
                  Object.defineProperty(newObj, index.toString(), {
                    ...paramProperty,
                    value: { low: u256.low, high: u256.high },
                  });
                } else {
                  // object without 'low' & 'high'
                  errorU256(abiParam.name);
                }
              } else {
                // BigNumberish --> just copy
                copyProperty2Tuple();
              }
            }
            break;
          case isTypeTuple(abiType):
            Object.defineProperty(newObj, index.toString(), {
              ...paramProperty,
              value: orderTuple(myObj[myObjKeys[index]] as RawArgsObject, {
                name: '0',
                type: abiType,
              }),
            });
            break;
          case isTypeArray(abiType):
            Object.defineProperty(newObj, index.toString(), {
              ...paramProperty,
              value: orderArray(myObj[myObjKeys[index]] as Array<any>, {
                name: '0',
                type: abiType,
              }),
            });
            break;
          default: // litterals, do not needs recursion --> just copy
            copyProperty2Tuple();
        }
        return newObj;
      }, {});
      return newObj2;
    };

    const abiMethod = this.abi.find((abi) => abi.name === method) as FunctionAbi;

    let args: RawArgsArray;
    if (Array.isArray(argsCalldata)) {
      args = argsCalldata;
    } else {
      // order the object, only for Cairo 1 contract
      const orderedObject = orderObject(argsCalldata, abiMethod.inputs);
      args = Object.values(orderedObject);
      //   // validate array elements to abi
      validateFields(abiMethod, args, this.structs);
    }

    const argsIterator = args[Symbol.iterator]();
    return abiMethod.inputs.reduce(
      (acc, input) =>
        isLen(input.name) ? acc : acc.concat(parseCalldataField(argsIterator, input, this.structs)),
      [] as Calldata
    );
  }

  /**
   * Compile contract callData without abi
   * @param rawArgs RawArgs representing cairo method arguments or string array of compiled data
   * @returns Calldata
   */
  static compile(rawArgs: RawArgs): Calldata {
    const createTree = (obj: object) => {
      const getEntries = (o: object, prefix = ''): any => {
        const oe = Array.isArray(o) ? [o.length.toString(), ...o] : o;
        return Object.entries(oe).flatMap(([k, v]) => {
          let value = v;
          if (isLongText(value)) value = splitLongString(value);
          if (k === 'entrypoint') value = getSelectorFromName(value);
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
    if (!Array.isArray(rawArgs)) {
      // flatten structs, tuples, add array length. Process leafs as Felt
      const callTree = createTree(rawArgs);
      // convert to array
      callTreeArray = Object.values(callTree);
    } else {
      // already compiled data but modified or raw args provided as array, recompile it
      // recreate tree
      const callObj = { ...rawArgs };
      const callTree = createTree(callObj);
      callTreeArray = Object.values(callTree);
    }

    // add compiled property to array object
    Object.defineProperty(callTreeArray, '__compiled__', {
      enumerable: false,
      writable: false,
      value: true,
    });
    return callTreeArray;
  }

  /**
   * Parse elements of the response array and structuring them into response object
   * @param method string - method name
   * @param response string[] - response from the method
   * @return Result - parsed response corresponding to the abi
   */
  public parse(method: string, response: string[]): Result {
    const { outputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();

    const parsed = outputs.flat().reduce((acc, output, idx) => {
      const propName = output.name ?? idx;
      acc[propName] = responseParser(responseIterator, output, this.structs, acc);
      if (acc[propName] && acc[`${propName}_len`]) {
        delete acc[`${propName}_len`];
      }
      return acc;
    }, {} as Args);

    // Cairo1 avoid object.0 structure
    return Object.keys(parsed).length === 1 && 0 in parsed ? (parsed[0] as Result) : parsed;
  }

  /**
   * Format cairo method response data to native js values based on provided format schema
   * @param method string - cairo method name
   * @param response string[] - cairo method response
   * @param format object - formatter object schema
   * @returns Result - parsed and formatted response object
   */
  public format(method: string, response: string[], format: object): Result {
    const parsed = this.parse(method, response);
    return formatter(parsed, format);
  }

  /**
   * Helper to calculate inputs from abi
   * @param inputs AbiEntry
   * @returns number
   */
  static abiInputsLength(inputs: AbiEntry[]) {
    return inputs.reduce((acc, input) => (!isLen(input.name) ? acc + 1 : acc), 0);
  }

  /**
   * Helper to extract structs from abi
   * @param abi Abi
   * @returns AbiStructs - structs from abi
   */
  static getAbiStruct(abi: Abi): AbiStructs {
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

  /**
   * Helper: Compile HexCalldata | RawCalldata | RawArgs
   * @param rawCalldata HexCalldata | RawCalldata | RawArgs
   * @returns Calldata
   */
  static toCalldata(rawCalldata: RawArgs = []): Calldata {
    return CallData.compile(rawCalldata);
  }

  /**
   * Helper: Convert raw to HexCalldata
   * @param raw HexCalldata | RawCalldata | RawArgs
   * @returns HexCalldata
   */
  static toHex(raw: RawArgs = []): HexCalldata {
    const calldata = CallData.compile(raw);
    return calldata.map((it) => toHex(it));
  }
}

/* eslint-disable no-plusplus */
import {
  Abi,
  AbiEnums,
  AbiStructs,
  AllowArray,
  Args,
  ArgsOrCalldata,
  Calldata,
  FunctionAbi,
  HexCalldata,
  RawArgs,
  RawArgsArray,
  CallResult,
  ValidateType,
} from '../../types';
import assert from '../assert';
import { CairoFelt252 } from '../cairoDataTypes/felt';
import { CairoFixedArray } from '../cairoDataTypes/fixedArray';
import { toHex } from '../num';
import { isBigInt } from '../typed';
import { getSelectorFromName } from '../hash/selector';
import { isLongText } from '../shortString';
import { byteArrayFromString } from './byteArray';
import { getAbiEnum, getAbiStruct } from './calldataUtils';
import { felt, isCairo1Type, isLen } from './cairo';
import {
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
} from './enum';
import formatter from './formatter';
import {
  createAbiParser,
  isNoConstructorValid,
  type CairoTypeStrategy,
  ParsingStrategy,
} from './parser';
import { AbiParserInterface } from './parser/interface';
import orderPropsByAbi from './propertyOrder';

export * as cairo from './cairo';
export * as byteArray from './byteArray';
export { parseCalldataField } from './requestParser';
export * from './parser';

export class CallData {
  abi: Abi;

  parser: AbiParserInterface;

  protected readonly structs: AbiStructs;

  protected readonly enums: AbiEnums;

  constructor(abi: Abi, parsingStrategy?: ParsingStrategy | CairoTypeStrategy) {
    this.structs = CallData.getAbiStruct(abi);
    this.enums = CallData.getAbiEnum(abi);
    this.parser = createAbiParser(abi, parsingStrategy);
    this.abi = this.parser.getLegacyFormat();
  }

  /**
   * Validate arguments passed to the method as corresponding to the ones in the abi
   * @param type ValidateType - type of the method
   * @param method string - name of the method
   * @param args ArgsOrCalldata - arguments that are passed to the method
   */
  public validate(type: ValidateType, method: string, args: ArgsOrCalldata = []) {
    // ensure provided method of type exists
    if (type !== ValidateType.DEPLOY) {
      const invocableFunctionNames = this.abi
        .filter((abi) => {
          if (abi.type !== 'function') return false;
          const isView = abi.stateMutability === 'view' || abi.state_mutability === 'view';
          return type === ValidateType.INVOKE ? !isView : isView;
        })
        .map((abi) => abi.name);
      assert(
        invocableFunctionNames.includes(method),
        `${type === ValidateType.INVOKE ? 'invocable' : 'viewable'} method not found in abi`
      );
    }

    // get requested method from abi
    const abiMethod = this.abi.find((abi) =>
      type === ValidateType.DEPLOY
        ? abi.name === method && abi.type === 'constructor'
        : abi.name === method && abi.type === 'function'
    ) as FunctionAbi;

    if (isNoConstructorValid(method, args, abiMethod)) {
      return;
    }

    // validate arguments length
    const inputsLength = this.parser.methodInputsLength(abiMethod);
    if (args.length !== inputsLength) {
      throw Error(
        `Invalid number of arguments, expected ${inputsLength} arguments, but got ${args.length}`
      );
    }

    // Validate the parameters by compiling them and throwing the felts away. Building a Cairo type
    // is what refuses a value that does not fit, so there is nothing a separate pass could catch
    // that this does not — and the message is the one `compile` would have given.
    this.compile(method, args as RawArgs);
  }

  /**
   * Compile contract callData with abi
   * Parse the calldata by using input fields from the abi for that method
   * @param method string - method name
   * @param argsCalldata RawArgs - arguments passed to the method. Can be an array of arguments (in the order of abi definition), or an object constructed in conformity with abi (in this case, the parameter can be in a wrong order).
   * @return Calldata - parsed arguments in format that contract is expecting
   * @example
   * ```typescript
   * const calldata = myCallData.compile("constructor", ["0x34a", [1, 3n]]);
   * ```
   * ```typescript
   * const calldata2 = myCallData.compile("constructor", {list:[1, 3n], balance:"0x34"}); // wrong order is valid
   * ```
   */
  public compile(method: string, argsCalldata: RawArgs): Calldata {
    const abiMethod = this.abi.find((abiFunction) => abiFunction.name === method) as FunctionAbi;

    if (isNoConstructorValid(method, argsCalldata, abiMethod)) {
      return [];
    }

    let args: RawArgsArray;
    if (Array.isArray(argsCalldata)) {
      args = argsCalldata;
    } else {
      // order the object
      const orderedObject = orderPropsByAbi(
        argsCalldata,
        abiMethod.inputs,
        this.structs,
        this.enums
      );
      args = Object.values(orderedObject);
      // only a parser that serializes without building Cairo types has anything to check here;
      // where those classes do the building, they refuse what does not fit a few lines below
      this.parser.validateRequestFields(abiMethod, args);
    }

    const argsIterator = args[Symbol.iterator]();

    const callArray = abiMethod.inputs.reduce(
      (acc, input) =>
        isLen(input.name) && !isCairo1Type(input.type)
          ? acc
          : acc.concat(this.parser.parseRequestField(argsIterator.next().value, input)),
      [] as Calldata
    );

    // add compiled property to array object
    Object.defineProperty(callArray, '__compiled__', {
      enumerable: false,
      writable: false,
      value: true,
    });
    return callArray;
  }

  /**
   * Compile contract callData without abi
   *
   * An instance of a Cairo type class — `CairoByteArray`, `CairoBytes31`, `CairoUint256`, … — is
   * serialized by that class, so it yields the same felts here as it would through an abi. Any
   * other object is walked field by field, which is what makes a plain `{ low, high }` and the
   * object of `byteArrayFromString` work just as well.
   *
   * A `string[]` value is always read as a Cairo array and gains a length in front of it, an
   * already compiled one included : pass the instance itself rather than its `toApiRequest()`.
   * @param rawArgs RawArgs representing cairo method arguments or string array of compiled data
   * @returns Calldata
   * @example
   * ```typescript
   * const result = CallData.compile({ text: CairoByteArray.fromText('12345') });
   * // result = ["0", "211295614005", "5"]
   * const result2 = CallData.compile({ text: CairoByteArray.fromText('12345').toApiRequest() });
   * // result2 = ["3", "0", "211295614005", "5"]   the three felts, behind an array length
   * ```
   */
  static compile(rawArgs: RawArgs): Calldata {
    const createTree = (obj: object) => {
      const getEntries = (o: object, prefix = '.'): any => {
        const oe = Array.isArray(o) ? [o.length.toString(), ...o] : o;
        return Object.entries(oe).flatMap(([k, v]) => {
          let value = v;
          if (k === 'entrypoint') value = getSelectorFromName(value);
          else if (isLongText(value)) value = byteArrayFromString(value);
          const kk = Array.isArray(oe) && k === '0' ? '$$len' : k;
          if (isBigInt(value)) return [[`${prefix}${kk}`, felt(value)]];
          if (Object(value) === value) {
            // a Cairo type instance already knows its own wire format, and it is the one the abi
            // path uses. Enumerating it instead would spell out its internals — the byte buffer of
            // a felt252 or a bytes31 byte by byte, the three fields of a ByteArray.
            // Tested on the value rather than on `keys` below, which only reaches one level of
            // prototype: a subclass would otherwise fall back to being enumerated.
            if (typeof (value as { toApiRequest?: unknown }).toApiRequest === 'function') {
              // unpacked felt by felt: the array itself must never become a value in the tree,
              // where it would be read as a Cairo array and gain a length in front of it
              return (value as { toApiRequest: () => string[] })
                .toApiRequest()
                .map((serialized, index) => [`${prefix}${kk}.${index}`, serialized]);
            }
            // the one Cairo type class that cannot serialize itself: its items may be of any type,
            // and turning those into felts without an abi is this function's job, not the class's.
            // `compile()` gives the shape it documents for exactly this — items keyed by index, so
            // no length is emitted before them, and each one is walked here like any other value.
            if (value instanceof CairoFixedArray) {
              return getEntries(value.compile(), `${prefix}${kk}.`);
            }
            const methodsKeys = Object.getOwnPropertyNames(Object.getPrototypeOf(value));
            const keys = [...Object.getOwnPropertyNames(value), ...methodsKeys];
            if (keys.includes('isSome') && keys.includes('isNone')) {
              // Option
              const myOption = value as CairoOption<any>;
              const variantNb = myOption.isSome()
                ? CairoOptionVariant.Some
                : CairoOptionVariant.None;
              if (myOption.isSome())
                return getEntries({ 0: variantNb, 1: myOption.unwrap() }, `${prefix}${kk}.`);
              return [[`${prefix}${kk}`, felt(variantNb)]];
            }
            if (keys.includes('isOk') && keys.includes('isErr')) {
              // Result
              const myResult = value as CairoResult<any, any>;
              const variantNb = myResult.isOk() ? CairoResultVariant.Ok : CairoResultVariant.Err;
              return getEntries({ 0: variantNb, 1: myResult.unwrap() }, `${prefix}${kk}.`);
            }
            if (keys.includes('variant') && keys.includes('activeVariant')) {
              // CustomEnum
              const myEnum = value as CairoCustomEnum;
              const activeVariant: string = myEnum.activeVariant();
              const listVariants = Object.keys(myEnum.variant);
              const activeVariantNb = listVariants.findIndex(
                (variant: any) => variant === activeVariant
              );
              if (
                typeof myEnum.unwrap() === 'object' &&
                Object.keys(myEnum.unwrap()).length === 0 // empty object : {}
              ) {
                return [[`${prefix}${kk}`, felt(activeVariantNb)]];
              }
              return getEntries({ 0: activeVariantNb, 1: myEnum.unwrap() }, `${prefix}${kk}.`);
            }
            // normal object
            return getEntries(value, `${prefix}${kk}.`);
          }
          // a leaf carries no type of its own, and there is no abi to declare one — unlike the
          // values above, which are arbitrated on the type their own class names. So the value is
          // taken for whatever CairoFelt252 can make of it — number, hex or decimal string,
          // boolean, or text. Not bigint: those are taken 40 lines above, before this branch
          return [[`${prefix}${kk}`, new CairoFelt252(value).toBigInt().toString()]];
        });
      };
      const result = Object.fromEntries(getEntries(obj));
      return result;
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
  public parse(method: string, response: string[]): CallResult {
    const { outputs } = this.abi.find((abi) => abi.name === method) as FunctionAbi;
    const responseIterator = response.flat()[Symbol.iterator]();

    const parsed = outputs.flat().reduce((acc, output, idx) => {
      const propName = output.name ?? idx;
      acc[propName] = this.parser.parseResponse(responseIterator, output, acc);
      if (acc[propName] && acc[`${propName}_len`]) {
        delete acc[`${propName}_len`];
      }
      return acc;
    }, {} as Args);

    // Cairo1 avoid object.0 structure
    return Object.keys(parsed).length === 1 && 0 in parsed ? (parsed[0] as CallResult) : parsed;
  }

  /**
   * Format cairo method response data to native js values based on provided format schema
   * @param method string - cairo method name
   * @param response string[] - cairo method response
   * @param format object - formatter object schema
   * @returns Result - parsed and formatted response object
   */
  public format(method: string, response: string[], format: object): CallResult {
    const parsed = this.parse(method, response);
    return formatter(parsed as Record<string, any>, format);
  }

  /**
   * Helper to extract structs from abi
   * @param abi Abi
   * @returns AbiStructs - structs from abi
   */
  static getAbiStruct(abi: Abi): AbiStructs {
    return getAbiStruct(abi);
  }

  /**
   * Helper to extract enums from abi
   * @param abi Abi
   * @returns AbiEnums - enums from abi
   */
  static getAbiEnum(abi: Abi): AbiEnums {
    return getAbiEnum(abi);
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

  /**
   * Parse the elements of a contract response and structure them into one or several Result.
   * In Cairo 0, arrays are not supported.
   * @param typeCairo string or string[] - Cairo type name, ex : "hello::hello::UserData"
   * @param response string[] - serialized data corresponding to typeCairo.
   * @return Result or Result[] - parsed response corresponding to typeData.
   * @example
   * const res2=helloCallData.decodeParameters("hello::hello::UserData",["0x123456","0x1"]);
   * result = { address: 1193046n, is_claimed: true }
   */
  public decodeParameters(
    typeCairo: AllowArray<string>,
    response: string[]
  ): AllowArray<CallResult> {
    const typeCairoArray = Array.isArray(typeCairo) ? typeCairo : [typeCairo];
    const responseIterator = response.flat()[Symbol.iterator]();
    const decodedArray = typeCairoArray.map(
      (typeParam) =>
        this.parser.parseResponse(responseIterator, { name: '', type: typeParam }) as CallResult
    );
    return decodedArray.length === 1 ? decodedArray[0] : decodedArray;
  }
}

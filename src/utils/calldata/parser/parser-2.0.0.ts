import {
  Abi,
  FunctionAbi,
  AbiEvent,
  AbiStruct,
  InterfaceAbi,
  type LegacyEvent,
  AbiEntryType,
} from '../../../types';
import { AbiParserInterface } from './interface';
import { hdParsingStrategy, ParsingStrategy } from './parsingStrategy';

export class AbiParser2 implements AbiParserInterface {
  abi: Abi;

  parsingStrategy: ParsingStrategy;

  constructor(abi: Abi, parsingStrategy?: ParsingStrategy) {
    this.abi = abi;
    this.parsingStrategy = parsingStrategy || hdParsingStrategy;
  }

  public getRequestParser(abiType: AbiEntryType): (val: unknown, type?: string) => any {
    // Check direct constructors first
    if (this.parsingStrategy.constructors[abiType]) {
      return (val: unknown, type?: string) => {
        const instance = this.parsingStrategy.constructors[abiType](val, type);
        return instance.toApiRequest();
      };
    }

    // Check dynamic selectors
    const dynamicSelectors = Object.entries(this.parsingStrategy.dynamicSelectors);
    const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));

    if (matchingSelector) {
      const [selectorName] = matchingSelector;
      const dynamicConstructor = this.parsingStrategy.constructors[selectorName];
      if (dynamicConstructor) {
        return (val: unknown, type?: string) => {
          const instance = dynamicConstructor(val, type || abiType);
          return instance.toApiRequest();
        };
      }
    }

    throw new Error(`Parser for ${abiType} not found`);
  }

  public getResponseParser(
    abiType: AbiEntryType
  ): (responseIterator: Iterator<string>, type?: string) => any {
    // Check direct constructors first
    if (this.parsingStrategy.constructors[abiType] && this.parsingStrategy.response[abiType]) {
      return (responseIterator: Iterator<string>, type?: string) => {
        const instance = this.parsingStrategy.constructors[abiType](responseIterator, type);
        return this.parsingStrategy.response[abiType](instance);
      };
    }

    // Check dynamic selectors
    const dynamicSelectors = Object.entries(this.parsingStrategy.dynamicSelectors);
    const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));

    if (matchingSelector) {
      const [selectorName] = matchingSelector;
      const dynamicConstructor = this.parsingStrategy.constructors[selectorName];
      const responseParser = this.parsingStrategy.response[selectorName];
      if (dynamicConstructor && responseParser) {
        return (responseIterator: Iterator<string>, type?: string) => {
          const instance = dynamicConstructor(responseIterator, type || abiType);
          return responseParser(instance);
        };
      }
    }

    throw new Error(`Parser for ${abiType} not found`);
  }

  /**
   * abi method inputs length
   * @param abiMethod FunctionAbi
   * @returns number
   */
  public methodInputsLength(abiMethod: FunctionAbi) {
    return abiMethod.inputs.length;
  }

  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  public getMethod(name: string): FunctionAbi | undefined {
    const intf = this.abi.find(
      (it: FunctionAbi | AbiEvent | AbiStruct | InterfaceAbi) => it.type === 'interface'
    ) as InterfaceAbi;
    return intf?.items?.find((it) => it.name === name);
  }

  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  public getLegacyFormat(): Abi {
    return this.abi.flatMap((it: FunctionAbi | LegacyEvent | AbiStruct | InterfaceAbi) => {
      return it.type === 'interface' ? it.items : it;
    });
  }
}

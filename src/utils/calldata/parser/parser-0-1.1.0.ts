import { Abi, AbiEntryType, FunctionAbi } from '../../../types';
import { isLen } from '../cairo';
import { AbiParserInterface } from './interface';
import { ParsingStrategy } from './parsingStrategy.type';

export class AbiParser1 implements AbiParserInterface {
  abi: Abi;

  parsingStrategies: ParsingStrategy;

  constructor(abi: Abi, parsingStrategy: ParsingStrategy) {
    this.abi = abi;
    this.parsingStrategies = parsingStrategy;
  }

  public getRequestParser(abiType: AbiEntryType): (val: unknown, type?: string) => any {
    // Check direct constructors first
    if (this.parsingStrategies.constructors[abiType]) {
      return (val: unknown, type?: string) => {
        const instance = this.parsingStrategies.constructors[abiType](
          val,
          this.parsingStrategies,
          type
        );
        return instance.toApiRequest();
      };
    }

    // Check dynamic selectors
    const dynamicSelectors = Object.entries(this.parsingStrategies.dynamicSelectors);
    const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));

    if (matchingSelector) {
      const [selectorName] = matchingSelector;
      const dynamicConstructor = this.parsingStrategies.constructors[selectorName];
      if (dynamicConstructor) {
        return (val: unknown, type?: string) => {
          const instance = dynamicConstructor(val, this.parsingStrategies, type || abiType);
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
    if (this.parsingStrategies.constructors[abiType] && this.parsingStrategies.response[abiType]) {
      return (responseIterator: Iterator<string>, type?: string) => {
        const instance = this.parsingStrategies.constructors[abiType](
          responseIterator,
          this.parsingStrategies,
          type
        );
        return this.parsingStrategies.response[abiType](instance, this.parsingStrategies);
      };
    }

    // Check dynamic selectors
    const dynamicSelectors = Object.entries(this.parsingStrategies.dynamicSelectors);
    const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));

    if (matchingSelector) {
      const [selectorName] = matchingSelector;
      const dynamicConstructor = this.parsingStrategies.constructors[selectorName];
      const responseParser = this.parsingStrategies.response[selectorName];
      if (dynamicConstructor && responseParser) {
        return (responseIterator: Iterator<string>, type?: string) => {
          const instance = dynamicConstructor(
            responseIterator,
            this.parsingStrategies,
            type || abiType
          );
          return responseParser(instance, this.parsingStrategies);
        };
      }
    }

    throw new Error(`Parser for ${abiType} not found`);
  }

  /**
   * abi method inputs length without '_len' inputs
   * cairo 0 reducer
   * @param abiMethod FunctionAbi
   * @returns number
   */
  public methodInputsLength(abiMethod: FunctionAbi) {
    return abiMethod.inputs.reduce((acc, input) => (!isLen(input.name) ? acc + 1 : acc), 0);
  }

  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  public getMethod(name: string): FunctionAbi | undefined {
    return this.abi.find((it) => it.name === name);
  }

  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  public getLegacyFormat() {
    return this.abi;
  }
}

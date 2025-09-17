import { Abi, AbiEntryType, FunctionAbi } from '../../../types';
import { isLen } from '../cairo';
import { AbiParserInterface } from './interface';
import { hdParsingStrategy, ParsingStrategy } from './parsingStrategy';

export class AbiParser1 implements AbiParserInterface {
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
        const instance = this.parsingStrategy.constructors[abiType](
          val,
          this.parsingStrategy,
          type
        );
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
          const instance = dynamicConstructor(val, this.parsingStrategy, type || abiType);
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
        const instance = this.parsingStrategy.constructors[abiType](
          responseIterator,
          this.parsingStrategy,
          type
        );
        return this.parsingStrategy.response[abiType](instance, this.parsingStrategy);
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
          const instance = dynamicConstructor(
            responseIterator,
            this.parsingStrategy,
            type || abiType
          );
          return responseParser(instance, this.parsingStrategy);
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

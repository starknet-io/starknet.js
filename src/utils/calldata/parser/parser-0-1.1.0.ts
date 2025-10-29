import { Abi, AbiEntryType, FunctionAbi, type AbiStruct, type AllowArray } from '../../../types';
import type { CairoType } from '../../cairoDataTypes';
import { CairoStruct } from '../../cairoDataTypes/cairoStruct';
import { isLen, isTypeArray } from '../cairo';
import { getAbiStruct } from '../calldataUtils';
import { AbiParserInterface } from './interface';
import { ParsingStrategy } from './parsingStrategy.type';

export class AbiParser1 implements AbiParserInterface {
  abi: Abi;

  parsingStrategies: ParsingStrategy[];

  constructor(abi: Abi, parsingStrategy: ParsingStrategy) {
    this.abi = abi;
    // add structs & enums in strategy
    const structs: AbiStruct[] = Object.values(getAbiStruct(abi));
    const structStrategy: ParsingStrategy = {
      constructors: {},
      response: {},
      dynamicSelectors: {},
    };
    structs.forEach((struct: AbiStruct) => {
      // Span are defined as Struct in Abi, but are useless here
      if (!isTypeArray(struct.name)) {
        structStrategy.constructors[struct.name] = (input: Iterator<string> | unknown) => {
          return new CairoStruct(input, struct, [parsingStrategy, structStrategy]);
        };
        structStrategy.response[struct.name] = (
          instance: CairoType,
          strategy: AllowArray<ParsingStrategy>
        ) => (instance as CairoStruct).decompose(strategy);
        structStrategy.dynamicSelectors[struct.name] = (_type: string) => _type === struct.name;
      }
    });

    this.parsingStrategies = [parsingStrategy, structStrategy];
  }

  public parseRequestField(requestData: any, abiType: AbiEntryType): string[] {
    // Check direct constructors first
    const strategyConstructorNum = this.parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[abiType]
    );
    if (strategyConstructorNum >= 0) {
      const instance = this.parsingStrategies[strategyConstructorNum].constructors[abiType](
        requestData,
        this.parsingStrategies,
        abiType
      );
      return instance.toApiRequest();
    }
    // Check dynamic selectors
    const strategyDynamicNum = this.parsingStrategies.findIndex((strategy: ParsingStrategy) => {
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      return dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));
    });

    if (strategyDynamicNum >= 0) {
      const dynamicSelectors = Object.entries(
        this.parsingStrategies[strategyDynamicNum].dynamicSelectors
      );
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));

      const [selectorName] = matchingSelector as [string, (type: string) => boolean];
      const dynamicConstructor =
        this.parsingStrategies[strategyDynamicNum].constructors[selectorName];
      if (dynamicConstructor) {
        const instance = dynamicConstructor(requestData, this.parsingStrategies, abiType);
        return instance.toApiRequest();
      }
    }
    throw new Error(`Parser for ${abiType} not found`);
  }

  public parseResponse(
    responseIterator: Iterator<string>,
    fieldName: string,
    abiType: string
  ): any {
    if (isLen(fieldName)) {
      return undefined;
    }
    // Check direct constructors first
    const strategyConstructorNum = this.parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[abiType] && strategy.response[abiType]
    );
    if (strategyConstructorNum >= 0) {
      const instance: CairoType = this.parsingStrategies[strategyConstructorNum].constructors[
        abiType
      ](responseIterator, this.parsingStrategies);
      return this.parsingStrategies[strategyConstructorNum].response[abiType](
        instance,
        this.parsingStrategies
      );
    }
    // Check dynamic selectors
    const strategyDynamicNum = this.parsingStrategies.findIndex((strategy: ParsingStrategy) => {
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      return dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));
    });
    if (strategyDynamicNum >= 0) {
      const dynamicSelectors = Object.entries(
        this.parsingStrategies[strategyDynamicNum].dynamicSelectors
      );
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(abiType));
      const [selectorName] = matchingSelector as [string, (type: string) => boolean];
      const dynamicConstructor =
        this.parsingStrategies[strategyDynamicNum].constructors[selectorName];
      const responseParser = this.parsingStrategies[strategyDynamicNum].response[selectorName];
      if (dynamicConstructor && responseParser) {
        const instance: CairoType = dynamicConstructor(
          responseIterator,
          this.parsingStrategies,
          abiType
        );
        return responseParser(instance, this.parsingStrategies);
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

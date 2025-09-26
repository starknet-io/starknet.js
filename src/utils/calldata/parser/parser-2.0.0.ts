import {
  Abi,
  FunctionAbi,
  AbiEvent,
  AbiStruct,
  InterfaceAbi,
  type LegacyEvent,
  AbiEntryType,
  type AllowArray,
  type AbiEnum,
} from '../../../types';
import { CairoStruct } from '../../cairoDataTypes/cairoStruct';
import type { CairoType } from '../../cairoDataTypes/cairoType.interface';
import { isTypeArray, isTypeOption, isTypeResult } from '../cairo';
import { AbiParserInterface } from './interface';
import { ParsingStrategy, type VariantType } from './parsingStrategy.type';
import { CairoTypeCustomEnum } from '../../cairoDataTypes/cairoTypeCustomEnum';
import { getAbiEnum, getAbiStruct } from '../calldataUtils';
import assert from '../../assert';

export class AbiParser2 implements AbiParserInterface {
  abi: Abi;

  parsingStrategies: ParsingStrategy[];

  constructor(abi: Abi, parsingStrategy: ParsingStrategy) {
    this.abi = abi;
    // add structs & enums in strategy
    const structs: AbiStruct[] = Object.values(getAbiStruct(abi));
    const enums: AbiEnum[] = Object.values(getAbiEnum(abi));
    const structAndEnumStrategy: ParsingStrategy = {
      constructors: {},
      response: {},
      dynamicSelectors: {},
    };
    structs.forEach((struct: AbiStruct) => {
      // Span are defined as Struct in Abi, but are useless here
      if (!isTypeArray(struct.name)) {
        structAndEnumStrategy.constructors[struct.name] = (input: Iterator<string> | unknown) => {
          return new CairoStruct(input, struct, [parsingStrategy, structAndEnumStrategy]);
        };
        structAndEnumStrategy.response[struct.name] = (
          instance: CairoType,
          strategy: AllowArray<ParsingStrategy>
        ) => (instance as CairoStruct).decompose(strategy);
        structAndEnumStrategy.dynamicSelectors[struct.name] = (_type: string) => true;
      }
    });
    enums.forEach((enumDef: AbiEnum) => {
      // option & result are defined as enums in Abi, but are useless here
      if (!isTypeOption(enumDef.name) && !isTypeResult(enumDef.name)) {
        structAndEnumStrategy.constructors[enumDef.name] = (
          input: Iterator<string> | unknown,
          _strategy: AllowArray<ParsingStrategy>,
          _type?: string,
          variant?: VariantType
        ) => {
          // assert(!!variant, 'CairoTypeCustomEnum constructor requires "variant" parameter.');
          assert(!(typeof variant === 'string'), 'variant needs to be an integer.');
          return new CairoTypeCustomEnum(
            input,
            enumDef,
            [parsingStrategy, structAndEnumStrategy],
            variant
          );
        };
        structAndEnumStrategy.response[enumDef.name] = (
          instance: CairoType,
          strategy: AllowArray<ParsingStrategy>
        ) => (instance as CairoTypeCustomEnum).decompose(strategy);
        structAndEnumStrategy.dynamicSelectors[enumDef.name] = (_type: string) => true;
      }
    });
    this.parsingStrategies = [parsingStrategy, structAndEnumStrategy];
  }

  public getRequestParser(abiType: AbiEntryType): (val: unknown, type?: string) => any {
    // Check direct constructors first
    const strategyConstructorNum = this.parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[abiType]
    );
    if (strategyConstructorNum >= 0) {
      return (val: unknown, type?: string) => {
        const instance = this.parsingStrategies[strategyConstructorNum].constructors[abiType](
          val,
          this.parsingStrategies,
          type
        );
        return instance.toApiRequest();
      };
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
    const strategyConstructorNum = this.parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[abiType] && strategy.response[abiType]
    );
    if (strategyConstructorNum >= 0) {
      return (responseIterator: Iterator<string>, type?: string) => {
        const instance = this.parsingStrategies[strategyConstructorNum].constructors[abiType](
          responseIterator,
          this.parsingStrategies,
          type
        );
        return this.parsingStrategies[strategyConstructorNum].response[abiType](
          instance,
          this.parsingStrategies
        );
      };
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

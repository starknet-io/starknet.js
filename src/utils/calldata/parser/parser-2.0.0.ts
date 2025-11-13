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
import { fastParsingStrategy, ParsingStrategy } from './parsingStrategy';

export class AbiParser2 implements AbiParserInterface {
  abi: Abi;

  parsingStrategy: ParsingStrategy;

  constructor(abi: Abi, parsingStrategy?: ParsingStrategy) {
    this.abi = abi;
    this.parsingStrategy = parsingStrategy || fastParsingStrategy;
  }

  public getRequestParser(abiType: AbiEntryType): (val: unknown) => any {
    if (this.parsingStrategy.request[abiType]) {
      return this.parsingStrategy.request[abiType];
    }
    throw new Error(`Parser for ${abiType} not found`);
  }

  public getResponseParser(abiType: AbiEntryType): (responseIterator: Iterator<string>) => any {
    if (this.parsingStrategy.response[abiType]) {
      return this.parsingStrategy.response[abiType];
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

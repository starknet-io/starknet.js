import { Abi, AbiEntryType, FunctionAbi } from '../../../types';
import { isLen } from '../cairo';
import { AbiParserInterface } from './interface';
import { fastParsingStrategy, ParsingStrategy } from './parsingStrategy';

export class AbiParser1 implements AbiParserInterface {
  abi: Abi;

  parsingStrategy: ParsingStrategy;

  constructor(abi: Abi, parsingStrategy?: ParsingStrategy) {
    this.abi = abi;
    this.parsingStrategy = parsingStrategy || fastParsingStrategy;
  }

  public getRequestParser(abiType: AbiEntryType): () => any {
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

import { Abi, AbiEntryType, FunctionAbi } from '../../../types';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { isLen } from '../cairo';
import { AbiParserInterface } from './interface';

export class AbiParser1 implements AbiParserInterface {
  abi: Abi;

  parsingMap: Record<AbiEntryType, (responseIterator: Iterator<string>) => any> = {};

  constructor(abi: Abi) {
    this.abi = abi;
    this.parsingMap = {
      [CairoBytes31.abiSelector]: (responseIterator: Iterator<string>) => {
        return CairoBytes31.factoryFromApiResponse(responseIterator).decodeUtf8();
      },
      [CairoByteArray.abiSelector]: (responseIterator: Iterator<string>) => {
        return CairoByteArray.factoryFromApiResponse(responseIterator).decodeUtf8();
      },
    };
  }

  public getParser(abiType: AbiEntryType): (responseIterator: Iterator<string>) => any {
    if (this.parsingMap[abiType]) {
      return this.parsingMap[abiType];
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

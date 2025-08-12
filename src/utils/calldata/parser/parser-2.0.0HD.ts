import {
  Abi,
  FunctionAbi,
  AbiEvent,
  AbiStruct,
  InterfaceAbi,
  type LegacyEvent,
  AbiEntryType,
} from '../../../types';
import { CairoByteArray } from '../../cairoDataTypes/byteArray';
import { CairoBytes31 } from '../../cairoDataTypes/bytes31';
import { AbiParserInterface } from './interface';

export class AbiParser2HD implements AbiParserInterface {
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

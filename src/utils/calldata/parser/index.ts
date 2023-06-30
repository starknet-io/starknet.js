import { FunctionAbi } from '../../../types';
import { Abi } from '../../..';
import { isCairo1Abi } from '../cairo';
import { AbiParserInterface } from './interface';
import { AbiParser1 } from './parser-0-1.1.0';
import { AbiParser2 } from './parser-2.0.0';

export class AbiParser implements AbiParserInterface {
  abi: Abi;

  version: number;

  parser: AbiParserInterface;

  methods: FunctionAbi[] = [];

  constructor(abi: Abi) {
    this.abi = abi;
    this.version = AbiParser.getAbiVersion(abi);
    this.parser = AbiParser.create(this.version, abi);
  }

  // FACTORY
  static create(version: number, abi: Abi) {
    if (version === 0 || version === 1) {
      return new AbiParser1(abi);
    }
    if (version === 2) {
      return new AbiParser2(abi);
    }
    throw Error(`Unsupported ABI version ${version}`);
  }

  static getAbiVersion(abi: Abi) {
    if (abi.find((it) => it.type === 'interface')) return 2;
    if (isCairo1Abi(abi)) return 1;
    return 0;
  }

  // INTERFACE
  public methodInputsLength(abiMethod: FunctionAbi) {
    return this.parser.methodInputsLength(abiMethod);
  }

  public getMethod(name: string): FunctionAbi | undefined {
    return this.parser.getMethod(name);
  }
}

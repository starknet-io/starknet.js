import { CompiledContract, ContractClass, RawCalldata } from '../types';
import { parse } from './json';
import { isHex, toBN, toHex } from './number';
import { compressProgram } from './stark';

export function wait(delay: number) {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
}

export function parseCalldata(calldata: RawCalldata = []) {
  return calldata.map((data) => {
    if (typeof data === 'string' && isHex(data as string)) {
      return data;
    }
    return toHex(toBN(data));
  });
}

export function parseContract(contract: CompiledContract | string) {
  const parsedContract =
    typeof contract === 'string' ? (parse(contract) as CompiledContract) : contract;
  return {
    ...parsedContract,
    program: compressProgram(parsedContract.program),
  } as ContractClass;
}

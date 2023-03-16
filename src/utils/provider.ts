import { CompiledContract, ContractClass, RawCalldata } from '../types';
import { parse } from './json';
import { isHex, toHex } from './num';
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
    return toHex(data);
  });
}

// TODO: How can we receive string here ?
export function parseContract(contract: CompiledContract | string) {
  const parsedContract =
    typeof contract === 'string' ? (parse(contract) as CompiledContract) : contract;
  return {
    ...parsedContract,
    // TODO: Why do we gzip program object?
    ...('program' in parsedContract && { program: compressProgram(parsedContract.program) }),
  } as ContractClass;
}

export type AsyncContractFunction<T = any> = (...args: Array<any>) => Promise<T>;
export type ContractFunction = (...args: Array<any>) => any;
export interface ResultAccessor extends Array<any> {
  [key: string]: any;
}
export type Result = ResultAccessor | undefined;

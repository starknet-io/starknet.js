export interface IStorageWrapper {
  set(value: string | null | undefined): boolean;
  get(): string | null | undefined;
  delete(): boolean;
}
export declare class LocalStorageWrapper implements IStorageWrapper {
  #private;

  value: string | null | undefined;
  constructor(key: string);
  set(value: string | null | undefined): boolean;
  get(): string | null | undefined;
  delete(): boolean;
}

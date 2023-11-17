/**
 * @see https://github.com/GoogleChrome/web-vitals/blob/main/src/lib/generateUniqueID.ts
 */
export declare const generateUID: () => string;
export declare const shuffle: <T extends any[]>(arr: T) => T;
declare type AllowPromise<T> = Promise<T> | T;
export declare function pipe<T>(...fns: Array<(arg: T) => AllowPromise<T>>): (arg: T) => Promise<T>;
export {};

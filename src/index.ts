import * as n from './utils/number/number';
import * as c from './utils/number/numberDeprecated';

/**
 * Main
 */
export * from './contract';
export * from './types';
export * from './provider';
export * from './account';
export * from './signer';

/**
 * Utils
 */
export * as constants from './constants';
export * as encode from './utils/encode';
export * as hash from './utils/hash';
export * as json from './utils/json';
export const number = { ...n, toFelt: c.toFelt };
export * as transaction from './utils/transaction';
export * as stark from './utils/stark';
export * as merkle from './utils/merkle';
export * as uint256 from './utils/uint256';
export * as shortString from './utils/shortString';
export * as typedData from './utils/typedData';
export * as cairo from './utils/calldata/cairo';
export * as ec from './utils/ec/ec';
export * from './utils/address';
export * from './utils/url';

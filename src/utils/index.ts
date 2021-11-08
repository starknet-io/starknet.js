export * as enc from './encode';
export * as hash from './hash';
export * as json from './json';
export * as number from './number';
export * as starknet from './starknet';

export function wait(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

import { pedersen } from './ec';

export * from './ec';

export const hashCalldata = (calldata: string[]): string => {
  const calldataCopy = [...calldata];
  if (calldataCopy.length === 0) {
    return '0';
  }
  if (calldataCopy.length === 1) {
    return calldataCopy[0];
  }
  // calldata element will always be there as it was checked by an if statement before (!)
  const calldataEl = calldataCopy.shift()!;
  return pedersen([hashCalldata(calldataCopy), calldataEl]);
};

export const hashMessage = (
  account: string,
  to: string,
  selector: string,
  calldata: string[],
  nonce: string
) => {
  const hash0 = pedersen([account, to]);
  const hash1 = pedersen([hash0, selector]);
  const calldataHash = hashCalldata(calldata);
  const hash2 = pedersen([hash1, calldataHash]);
  return pedersen([hash2, nonce]);
};

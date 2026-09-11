# Function: getL1MessageHash()

> **getL1MessageHash**(`fromL2Address`, `toL1Address`, `payload`): `string`

Defined in: [src/utils/hash/selector.ts:183](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/selector.ts#L183)

Calculate the message hash related by a message L2->L1.

## Parameters

### fromL2Address

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

L2 contract address that send the message.

### toL1Address

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Recipient L1 account address.

### payload

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

an array of BigNumberish of the raw parameters passed to the message.

## Returns

`string`

hex-string of the message hash.

## Example

```typescript
const fromL2Address = '0x04c5772d1914fe6ce891b64eb35bf3522aeae1315647314aac58b01137607f3f';
const toL1Address = '0x8453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
const payload = [
  0n,
  1270393329865452722422775477982592488490549769359n,
  4543560n,
  200000000000000,
  0n,
];
const result = hash.getL1MessageHash(fromL2Address, toL1Address, payload);
// result = "0x2eace1d0ab5dbe354a93fb0a59c6b98f26e6a0fe7c33f87329f8fc9829058b8b"
```

# Function: getL2MessageHash()

> **getL2MessageHash**(`l1FromAddress`, `l2ToAddress`, `l2Selector`, `l2Calldata`, `l1Nonce`): `string`

Defined in: [src/utils/hash/selector.ts:145](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/hash/selector.ts#L145)

Calculate the message hash related by a message L1->L2

## Parameters

### l1FromAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

L1 account address that paid the message.

### l2ToAddress

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

L2 contract address to execute.

### l2Selector

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

can be a function name ("bridge_withdraw") or a number (BigNumberish).

### l2Calldata

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)[]

an array of BigNumberish of the raw parameters passed to the above function.

### l1Nonce

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

The nonce of the L1 account.

## Returns

`string`

hex-string of the L2 transaction hash

## Example

```typescript
const l1FromAddress = '0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
const payload = [
  4543560n,
  829565602143178078434185452406102222830667255948n,
  3461886633118033953192540141609307739580461579986333346825796013261542798665n,
  9000000000000000n,
  0n,
];
const l1Nonce = 8288n;
const result = hash.getL2MessageHash(l1FromAddress, l2ToAddress, l2Selector, payload, l1Nonce);
// result = "0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090"
```

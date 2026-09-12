# Function: getFullPublicKey()

> **getFullPublicKey**(`privateKey`): `string`

Defined in: [src/utils/stark/index.ts:509](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/stark/index.ts#L509)

get the hex string of the full public key related to a Starknet private key.

## Parameters

### privateKey

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

a 252 bits private key.

## Returns

`string`

an hex string of a 520 bit number, representing the full public key related to `privateKey`.

## Example

```typescript
const result = ec.getFullPublicKey(
  '0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535'
);
// result = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf"
```

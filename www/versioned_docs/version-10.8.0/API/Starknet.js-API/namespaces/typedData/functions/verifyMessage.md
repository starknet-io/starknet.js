# Function: verifyMessage()

## Call Signature

> **verifyMessage**(`message`, `signature`, `fullPublicKey`, `accountAddress?`): `boolean`

Defined in: [src/utils/typedData.ts:640](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L640)

Checks if a signed EIP712 message is related to an account.
Valid for a standard Starknet signature.

### Parameters

#### message

[`TypedData`](../../RPC/interfaces/TypedData.md)

a TypedMessage message, or the hash of an EIP712 message (SNIP-12).

#### signature

[`Signature`](../../../../type-aliases/Signature.md)

a WeierstrassSignatureType signature, or an array of 2 strings.

#### fullPublicKey

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

a number coded on 520 bits (from ec.getFullPublicKey()).

#### accountAddress?

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

address of the account that has signed the message. Not needed with a message hash is provided in `message`

### Returns

`boolean`

true if the message is verified.

### Example

```typescript
const myTypedMessage: TypedMessage = .... ;
const sign: Signature = ["0x123...abc", "0x345...def"];
const fullPubK = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf";
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = typedData.verifyMessage(myTypedMessage, sign, fullPubK, accountAddress);
const result2 = typedData.verifyMessage(messageHash, sign, fullPubK);
// result1 = result2 = true
```

## Call Signature

> **verifyMessage**(`message`, `signature`, `fullPublicKey`): `boolean`

Defined in: [src/utils/typedData.ts:646](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/typedData.ts#L646)

Checks if a signed EIP712 message is related to an account.
Valid for a standard Starknet signature.

### Parameters

#### message

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

a TypedMessage message, or the hash of an EIP712 message (SNIP-12).

#### signature

[`Signature`](../../../../type-aliases/Signature.md)

a WeierstrassSignatureType signature, or an array of 2 strings.

#### fullPublicKey

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

a number coded on 520 bits (from ec.getFullPublicKey()).

### Returns

`boolean`

true if the message is verified.

### Example

```typescript
const myTypedMessage: TypedMessage = .... ;
const sign: Signature = ["0x123...abc", "0x345...def"];
const fullPubK = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf";
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = typedData.verifyMessage(myTypedMessage, sign, fullPubK, accountAddress);
const result2 = typedData.verifyMessage(messageHash, sign, fullPubK);
// result1 = result2 = true
```

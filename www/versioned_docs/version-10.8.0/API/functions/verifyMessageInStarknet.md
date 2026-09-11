# Function: verifyMessageInStarknet()

> **verifyMessageInStarknet**(`provider`, `message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`\<`boolean`\>

Defined in: [src/provider/modules/verifyMessageInStarknet.ts:27](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/modules/verifyMessageInStarknet.ts#L27)

Verify in Starknet a signature of a TypedData object or of a given hash.

## Parameters

### provider

[`ProviderInterface`](../classes/ProviderInterface.md)

The provider to use for the verification.

### message

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md) \| [`BigNumberish`](../type-aliases/BigNumberish.md)

TypedData object to be verified, or message hash to be verified.

### signature

[`Signature`](../type-aliases/Signature.md)

signature of the message.

### accountAddress

[`BigNumberish`](../type-aliases/BigNumberish.md)

address of the account that has signed the message.

### signatureVerificationFunctionName?

`string`

if account contract with non standard account verification function name.

### signatureVerificationResponse?

if account contract with non standard response of verification function.

#### okResponse

`string`[]

#### nokResponse

`string`[]

#### error

`string`[]

## Returns

`Promise`\<`boolean`\>

```typescript
const myTypedMessage: TypedMessage = .... ;
const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
// result1 = result2 = true
```

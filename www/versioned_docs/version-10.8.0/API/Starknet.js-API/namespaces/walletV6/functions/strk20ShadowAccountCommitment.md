# Function: strk20ShadowAccountCommitment()

> **strk20ShadowAccountCommitment**(`walletWSF`, `dapp_name`, `nonce?`): `Promise`\<`string`\>

Defined in: [src/wallet/connectV6.ts:199](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/connectV6.ts#L199)

Compute the commitment of a DAPP STRK20 shadow account. The commitment is computed
locally by the wallet from the user private state ; no transaction is sent.

When `nonce` is given, the full commitment of this single shadow account is returned.
When `nonce` is omitted, the partial (nonce independent) commitment is returned instead :
it is shared by every shadow account the user derives for this DAPP, so it can be
published once to let a DAPP recognize all the shadow accounts of a user without learning
any individual nonce.

## Parameters

### walletWSF

`WalletWithStarknetFeatures`

The get-starknet V6 wallet object to use.

### dapp_name

`string`

The DAPP that scopes the shadow account(s).

### nonce?

`string`

The shadow account nonce ; each nonce selects a distinct shadow account for this user + DAPP. Omit it to get the partial commitment.

## Returns

`Promise`\<`string`\>

The shadow account commitment.

## Example

```typescript
const commitment = await strk20ShadowAccountCommitment(walletWSF, 'myDapp', '0x0');
// commitment = '0x5f2e...'
```

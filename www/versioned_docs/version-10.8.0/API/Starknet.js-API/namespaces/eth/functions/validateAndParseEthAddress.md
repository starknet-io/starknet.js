# Function: validateAndParseEthAddress()

> **validateAndParseEthAddress**(`address`): `string`

Defined in: [src/utils/eth.ts:32](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/eth.ts#L32)

Get a string formatted for an Ethereum address, without uppercase characters.

## Parameters

### address

[`BigNumberish`](../../../../type-aliases/BigNumberish.md)

Address of an Ethereum account.

## Returns

`string`

an Hex string coded on 20 bytes

## Example

```typescript
const myEthAddress: string = validateAndParseEthAddress('0x8359E4B0152ed5A731162D3c7B0D8D56edB165');
// result = "0x008359e4b0152ed5a731162d3c7b0d8d56edb165"
```

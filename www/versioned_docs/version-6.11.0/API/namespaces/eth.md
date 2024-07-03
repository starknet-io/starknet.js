---
id: 'eth'
title: 'Namespace: eth'
sidebar_label: 'eth'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### ethRandomPrivateKey

▸ **ethRandomPrivateKey**(): `string`

Get random Ethereum private Key.

#### Returns

`string`

an Hex string

**`Example`**

```typescript
const myPK: string = randomAddress();
// result = "0xf04e69ac152fba37c02929c2ae78c9a481461dda42dbc6c6e286be6eb2a8ab83"
```

#### Defined in

[src/utils/eth.ts:18](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/eth.ts#L18)

---

### validateAndParseEthAddress

▸ **validateAndParseEthAddress**(`address`): `string`

Get a string formatted for an Ethereum address, without uppercase characters.

#### Parameters

| Name      | Type                                    | Description                     |
| :-------- | :-------------------------------------- | :------------------------------ |
| `address` | [`BigNumberish`](types.md#bignumberish) | Address of an Ethereum account. |

#### Returns

`string`

an Hex string coded on 20 bytes

**`Example`**

```typescript
const myEthAddress: string = validateAndParseEthAddress('0x8359E4B0152ed5A731162D3c7B0D8D56edB165');
// result = "0x008359e4b0152ed5a731162d3c7b0d8d56edb165"
```

#### Defined in

[src/utils/eth.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/eth.ts#L32)

---
id: 'starknetId'
title: 'Namespace: starknetId'
sidebar_label: 'starknetId'
sidebar_position: 0
custom_edit_url: null
---

## Enumerations

- [StarknetIdContract](../enums/starknetId.StarknetIdContract.md)
- [StarknetIdIdentityContract](../enums/starknetId.StarknetIdIdentityContract.md)
- [StarknetIdVerifierContract](../enums/starknetId.StarknetIdVerifierContract.md)
- [StarknetIdPfpContract](../enums/starknetId.StarknetIdPfpContract.md)
- [StarknetIdPopContract](../enums/starknetId.StarknetIdPopContract.md)

## Variables

### StarknetIdMulticallContract

• `Const` **StarknetIdMulticallContract**: `"0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970"`

#### Defined in

[src/utils/starknetId.ts:189](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L189)

## Functions

### useDecoded

▸ **useDecoded**(`encoded`): `string`

Decodes an array of BigInts into a string using the given algorithm.

#### Parameters

| Name      | Type       | Description                   |
| :-------- | :--------- | :---------------------------- |
| `encoded` | `bigint`[] | The encoded array of BigInts. |

#### Returns

`string`

The decoded string.

**`Example`**

```typescript
const result = starknetId.useDecoded([3015206943634620n]);
// result = "starknetjs.stark"
```

#### Defined in

[src/utils/starknetId.ts:33](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L33)

---

### useEncoded

▸ **useEncoded**(`decoded`): `bigint`

Encodes a string into a bigint value.

#### Parameters

| Name      | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `decoded` | `string` | The string to be encoded. |

#### Returns

`bigint`

The encoded bigint value.

**`Example`**

```typescript
const result = starknetId.useEncoded('starknet.js');
// result = 3015206943634620n
```

#### Defined in

[src/utils/starknetId.ts:85](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L85)

---

### getStarknetIdContract

▸ **getStarknetIdContract**(`chainId`): `string`

Returns the Starknet ID contract address based on the provided chain ID.

#### Parameters

| Name      | Type                                                       | Description                           |
| :-------- | :--------------------------------------------------------- | :------------------------------------ |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | The chain ID of the Starknet network. |

#### Returns

`string`

The Starknet ID contract address.

**`Throws`**

Throws an error if the Starknet ID contract is not deployed on the network.

**`Example`**

```typescript
const result = starknetId.getStarknetIdContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474"
```

#### Defined in

[src/utils/starknetId.ts:144](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L144)

---

### getStarknetIdIdentityContract

▸ **getStarknetIdIdentityContract**(`chainId`): `string`

Returns the Starknet ID identity contract address for the given chain ID.

#### Parameters

| Name      | Type                                                       | Description                             |
| :-------- | :--------------------------------------------------------- | :-------------------------------------- |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | The chain ID for the specified network. |

#### Returns

`string`

The Starknet ID identity contract address for the specified network.

**`Throws`**

If the Starknet ID verifier contract is not deployed on the network.

**`Example`**

```typescript
const result = starknetId.getStarknetIdIdentityContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda"
```

#### Defined in

[src/utils/starknetId.ts:176](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L176)

---

### getStarknetIdMulticallContract

▸ **getStarknetIdMulticallContract**(`chainId`): `string`

Returns the Starknet.id multicall contract address based on the provided chainId.

#### Parameters

| Name      | Type                                                       | Description                 |
| :-------- | :--------------------------------------------------------- | :-------------------------- |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | The chainId of the network. |

#### Returns

`string`

- The address of the Starknet.id multicall contract.

**`Throws`**

- If the Starknet.id multicall contract is not deployed on the network.

**`Example`**

```typescript
const result = starknetId.getStarknetIdMulticallContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970"
```

#### Defined in

[src/utils/starknetId.ts:204](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L204)

---

### getStarknetIdVerifierContract

▸ **getStarknetIdVerifierContract**(`chainId`): `string`

Returns the address of the Starknet ID Verifier contract based on the specified chain ID.

#### Parameters

| Name      | Type                                                       | Description                   |
| :-------- | :--------------------------------------------------------- | :---------------------------- |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | The ID of the Starknet chain. |

#### Returns

`string`

- The address of the Starknet ID Verifier contract.

**`Throws`**

- If the Starknet ID Verifier contract is not deployed on the specified network.

**`Example`**

```typescript
const result = starknetId.getStarknetIdVerifierContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566"
```

#### Defined in

[src/utils/starknetId.ts:234](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L234)

---

### getStarknetIdPfpContract

▸ **getStarknetIdPfpContract**(`chainId`): `string`

Retrieves the contract address of the Starknet.id profile picture verifier contract based on the given chain ID.

#### Parameters

| Name      | Type                                                       | Description                  |
| :-------- | :--------------------------------------------------------- | :--------------------------- |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | The chain ID of the network. |

#### Returns

`string`

- The contract address of the Starknet.id profile picture verifier contract.

**`Throws`**

- Throws an error if the Starknet.id profile picture verifier contract is not yet deployed on the network.

**`Example`**

```typescript
const result = starknetId.getStarknetIdPfpContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02"
```

#### Defined in

[src/utils/starknetId.ts:264](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L264)

---

### getStarknetIdPopContract

▸ **getStarknetIdPopContract**(`chainId`): `string`

Retrieves the Starknet ID Proof of Personhood (IdPop) verifier contract address for the given chain ID.

#### Parameters

| Name      | Type                                                       | Description                           |
| :-------- | :--------------------------------------------------------- | :------------------------------------ |
| `chainId` | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | The chain ID of the Starknet network. |

#### Returns

`string`

- The Starknet ID Pop contract address.

**`Throws`**

- If the Starknet ID Pop contract is not deployed on the specified network.

**`Example`**

```typescript
const result = starknetId.getStarknetIdPopContract(constants.StarknetChainId.SN_SEPOLIA);
// result = "0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a"
```

#### Defined in

[src/utils/starknetId.ts:296](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L296)

---

### execution

▸ **execution**(`staticEx?`, `ifEqual?`, `ifNotEqual?`): [`CairoCustomEnum`](../classes/CairoCustomEnum.md)

Returns a CairoCustomEnum object.

Functions to build CairoCustomEnum for multiCall contracts

#### Parameters

| Name          | Type       | Default value | Description                                                               |
| :------------ | :--------- | :------------ | :------------------------------------------------------------------------ |
| `staticEx?`   | `Object`   | `undefined`   | An optional object defining the "Static" value of the CairoCustomEnum.    |
| `ifEqual?`    | `number`[] | `undefined`   | An optional array defining the "IfEqual" value of the CairoCustomEnum.    |
| `ifNotEqual?` | `number`[] | `undefined`   | An optional array defining the "IfNotEqual" value of the CairoCustomEnum. |

#### Returns

[`CairoCustomEnum`](../classes/CairoCustomEnum.md)

- The created CairoCustomEnum object.

**`Example`**

```typescript
const result: CairoCustomEnum = starknetId.execution(undefined, [1, 2, 3], undefined);
// result = CairoCustomEnum {
//   variant: {
//     Static: undefined,
//     IfEqual: { '0': 1, '1': 2, '2': 3 },
//     IfNotEqual: undefined
//   }
// }
```

#### Defined in

[src/utils/starknetId.ts:331](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L331)

---

### dynamicFelt

▸ **dynamicFelt**(`hardcoded?`, `reference?`): [`CairoCustomEnum`](../classes/CairoCustomEnum.md)

Creates a new instance of CairoCustomEnum.

#### Parameters

| Name         | Type                                    | Default value | Description                                  |
| :----------- | :-------------------------------------- | :------------ | :------------------------------------------- |
| `hardcoded?` | [`BigNumberish`](types.md#bignumberish) | `undefined`   | The hardcoded value for the CairoCustomEnum. |
| `reference?` | `number`[]                              | `undefined`   | The reference array for the CairoCustomEnum. |

#### Returns

[`CairoCustomEnum`](../classes/CairoCustomEnum.md)

The new instance of CairoCustomEnum.

**`Example`**

```typescript
const result: CairoCustomEnum = starknetId.dynamicFelt(undefined, [1, 2]);
// result = CairoCustomEnum {
//  variant: { Hardcoded: undefined, Reference: { '0': 1, '1': 2 } }
// }
```

#### Defined in

[src/utils/starknetId.ts:357](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L357)

---

### dynamicCallData

▸ **dynamicCallData**(`hardcoded?`, `reference?`, `arrayReference?`): [`CairoCustomEnum`](../classes/CairoCustomEnum.md)

Creates a new instance of CairoCustomEnum with the given parameters.

#### Parameters

| Name              | Type                                      | Default value | Description                           |
| :---------------- | :---------------------------------------- | :------------ | :------------------------------------ |
| `hardcoded?`      | [`BigNumberish`](types.md#bignumberish)   | `undefined`   | The hardcoded value.                  |
| `reference?`      | [`BigNumberish`](types.md#bignumberish)[] | `undefined`   | The reference value (optional).       |
| `arrayReference?` | [`BigNumberish`](types.md#bignumberish)[] | `undefined`   | The array reference value (optional). |

#### Returns

[`CairoCustomEnum`](../classes/CairoCustomEnum.md)

The new instance of CairoCustomEnum.

**`Example`**

```typescript
const result: CairoCustomEnum = starknetId.dynamicCallData(undefined, [1, 2], undefined);
// result = CairoCustomEnum {
//   variant: {
//     Hardcoded: undefined,
//     Reference: { '0': 1, '1': 2 },
//     ArrayReference: undefined
//   }
// }
```

#### Defined in

[src/utils/starknetId.ts:385](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/starknetId.ts#L385)

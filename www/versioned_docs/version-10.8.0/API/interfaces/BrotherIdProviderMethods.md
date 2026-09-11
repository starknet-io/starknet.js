# Interface: BrotherIdProviderMethods

Defined in: [src/plugins/brother-id/index.ts:46](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L46)

## Extended by

- [`Account`](../classes/Account.md)
- [`RpcProvider`](../classes/RpcProvider.md)

## Methods

### getBrotherName()

> **getBrotherName**(`address`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L47)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getAddressFromBrotherName()

> **getAddressFromBrotherName**(`name`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L48)

#### Parameters

##### name

`string`

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getBrotherProfile()

> **getBrotherProfile**(`address`, `BrotherIdContract?`): `Promise`\<[`BrotherProfile`](BrotherProfile.md)\>

Defined in: [src/plugins/brother-id/index.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L49)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<[`BrotherProfile`](BrotherProfile.md)\>

# Class: BrotherIdImpl

Defined in: [src/plugins/brother-id/index.ts:54](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L54)

## Constructors

### Constructor

> **new BrotherIdImpl**(): `BrotherIdImpl`

#### Returns

`BrotherIdImpl`

## Methods

### getBrotherName()

> `static` **getBrotherName**(`provider`, `address`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L55)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md)

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getAddressFromBrotherName()

> `static` **getAddressFromBrotherName**(`provider`, `name`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:86](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L86)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md)

##### name

`string`

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getBrotherProfile()

> `static` **getBrotherProfile**(`provider`, `address`, `BrotherIdContract?`): `Promise`\<[`BrotherProfile`](../interfaces/BrotherProfile.md)\>

Defined in: [src/plugins/brother-id/index.ts:119](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L119)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md)

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<[`BrotherProfile`](../interfaces/BrotherProfile.md)\>

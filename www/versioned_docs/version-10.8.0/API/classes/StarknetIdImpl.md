# Class: StarknetIdImpl

Defined in: [src/plugins/starknet-id/index.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L55)

## Constructors

### Constructor

> **new StarknetIdImpl**(): `StarknetIdImpl`

#### Returns

`StarknetIdImpl`

## Methods

### getStarkName()

> `static` **getStarkName**(`provider`, `address`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:56](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L56)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md)

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getAddressFromStarkName()

> `static` **getAddressFromStarkName**(`provider`, `name`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:90](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L90)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md)

##### name

`string`

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getStarkProfile()

> `static` **getStarkProfile**(`provider`, `address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`\<[`StarkProfile`](../type-aliases/StarkProfile.md)\>

Defined in: [src/plugins/starknet-id/index.ts:122](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L122)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md)

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### StarknetIdContract?

`string`

##### StarknetIdIdentityContract?

`string`

##### StarknetIdVerifierContract?

`string`

##### StarknetIdPfpContract?

`string`

##### StarknetIdPopContract?

`string`

##### StarknetIdMulticallContract?

`string`

#### Returns

`Promise`\<[`StarkProfile`](../type-aliases/StarkProfile.md)\>

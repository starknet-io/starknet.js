# Interface: StarknetIdAccountMethods

Defined in: [src/plugins/starknet-id/index.ts:39](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L39)

## Extended by

- [`Account`](../classes/Account.md)

## Methods

### getStarkName()

> **getStarkName**(`address?`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:40](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L40)

#### Parameters

##### address?

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getAddressFromStarkName()

> **getAddressFromStarkName**(`name`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:41](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L41)

#### Parameters

##### name

`string`

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

---

### getStarkProfile()

> **getStarkProfile**(`address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`\<[`StarkProfile`](../type-aliases/StarkProfile.md)\>

Defined in: [src/plugins/starknet-id/index.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L42)

#### Parameters

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

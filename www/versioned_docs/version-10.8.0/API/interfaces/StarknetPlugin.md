# Interface: StarknetPlugin\<TProviderMethods, TAccountMethods\>

Defined in: [src/plugins/types.ts:67](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L67)

A Starknet plugin that can extend Provider and Account with methods and lifecycle hooks.

## Example

```typescript
const myPlugin = (): StarknetPlugin<{ greet(): string }> => ({
  name: 'my-plugin',
  extend: () => ({ greet: () => 'hello' }),
});
```

## Type Parameters

### TProviderMethods

`TProviderMethods` _extends_ `Record`\<`string`, `any`\> = `Record`\<`string`, `never`\>

Methods added to Provider instances

### TAccountMethods

`TAccountMethods` _extends_ `Record`\<`string`, `any`\> = `TProviderMethods`

Methods added to Account instances (defaults to TProviderMethods)

## Properties

### name

> `readonly` **name**: `string`

Defined in: [src/plugins/types.ts:72](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L72)

Unique plugin name, used for deduplication

---

### hooks?

> `optional` **hooks?**: [`ProviderHooks`](ProviderHooks.md)

Defined in: [src/plugins/types.ts:88](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L88)

Provider-level lifecycle hooks

---

### accountHooks?

> `optional` **accountHooks?**: [`AccountHooks`](AccountHooks.md)

Defined in: [src/plugins/types.ts:91](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L91)

Account-level lifecycle hooks

## Methods

### extend()?

> `optional` **extend**(`provider`): `TProviderMethods`

Defined in: [src/plugins/types.ts:78](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L78)

Called when the plugin is installed on a Provider.
Returns an object of methods to add to the provider instance.

#### Parameters

##### provider

[`ProviderInterface`](../classes/ProviderInterface.md)

#### Returns

`TProviderMethods`

---

### accountExtend()?

> `optional` **accountExtend**(`account`): `TAccountMethods`

Defined in: [src/plugins/types.ts:85](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/types.ts#L85)

Called when the plugin is installed on an Account.
Returns methods specific to the account context.
If not provided, `extend` is used instead.

#### Parameters

##### account

[`AccountInterface`](../classes/AccountInterface.md)

#### Returns

`TAccountMethods`

# Class: PluginManager

Defined in: [src/plugins/manager.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/manager.ts#L9)

Manages plugin registration, method installation, and hook execution.

Each Provider/Account instance owns its own PluginManager to ensure
plugins are scoped to the instance rather than shared globally.

## Constructors

### Constructor

> **new PluginManager**(): `PluginManager`

#### Returns

`PluginManager`

## Accessors

### plugins

#### Get Signature

> **get** **plugins**(): `ReadonlyMap`\<`string`, [`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<`any`, `any`\>\>

Defined in: [src/plugins/manager.ts:16](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/manager.ts#L16)

##### Returns

`ReadonlyMap`\<`string`, [`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<`any`, `any`\>\>

## Methods

### installOnProvider()

> **installOnProvider**(`plugin`, `target`): `void`

Defined in: [src/plugins/manager.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/manager.ts#L25)

Install a plugin on a Provider instance.
Calls `plugin.extend()` and assigns returned methods to the target.
Registers provider-level hooks.

#### Parameters

##### plugin

[`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<`any`, `any`\>

##### target

`any`

#### Returns

`void`

---

### installOnAccount()

> **installOnAccount**(`plugin`, `target`): `void`

Defined in: [src/plugins/manager.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/manager.ts#L48)

Install a plugin on an Account instance.
Calls `plugin.accountExtend()` if available, otherwise falls back to `plugin.extend()`.
Registers both provider-level and account-level hooks.

#### Parameters

##### plugin

[`StarknetPlugin`](../interfaces/StarknetPlugin.md)\<`any`, `any`\>

##### target

`any`

#### Returns

`void`

---

### runProviderHook()

> **runProviderHook**\<`K`\>(`hookName`, `context`): `any`

Defined in: [src/plugins/manager.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/manager.ts#L74)

Run a provider-level hook across all registered plugins.
Hooks are chained: each hook can modify the context for the next.

#### Type Parameters

##### K

`K` _extends_ keyof [`ProviderHooks`](../interfaces/ProviderHooks.md)

#### Parameters

##### hookName

`K`

##### context

`Parameters`\<`NonNullable`\<[`ProviderHooks`](../interfaces/ProviderHooks.md)\[`K`\]\>\>\[`0`\]

#### Returns

`any`

---

### runAccountHook()

> **runAccountHook**\<`K`\>(`hookName`, `context`): `any`

Defined in: [src/plugins/manager.ts:95](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/manager.ts#L95)

Run an account-level hook across all registered plugins.
"before" hooks are chained; "after" hooks are fire-and-forget.

#### Type Parameters

##### K

`K` _extends_ keyof [`AccountHooks`](../interfaces/AccountHooks.md)

#### Parameters

##### hookName

`K`

##### context

`Parameters`\<`NonNullable`\<[`AccountHooks`](../interfaces/AccountHooks.md)\[`K`\]\>\>\[`0`\]

#### Returns

`any`

---

### hasPlugin()

> **hasPlugin**(`name`): `boolean`

Defined in: [src/plugins/manager.ts:112](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/manager.ts#L112)

#### Parameters

##### name

`string`

#### Returns

`boolean`

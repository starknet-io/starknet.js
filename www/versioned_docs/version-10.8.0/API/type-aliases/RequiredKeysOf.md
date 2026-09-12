# Type Alias: RequiredKeysOf\<T\>

> **RequiredKeysOf**\<`T`\> = `Exclude`\<`{ [K in keyof T]: T extends Record<K, T[K]> ? K : never }`\[keyof `T`\], `undefined`\>

Defined in: [src/provider/types/spec.type.ts:10](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/spec.type.ts#L10)

## Type Parameters

### T

`T` _extends_ `object`

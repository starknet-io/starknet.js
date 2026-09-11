# Type Alias: ResourceBoundsBN

> **ResourceBoundsBN** = `{ [K in keyof ResourceBounds]: ResourceBounds[K] extends object ? { [P in keyof ResourceBounds[K]]: bigint } : number }`

Defined in: [src/provider/types/spec.type.ts:172](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/spec.type.ts#L172)

Resource bounds in big number format

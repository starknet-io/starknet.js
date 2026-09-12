# Type Alias: ResourceBoundsOverhead

> **ResourceBoundsOverhead** = `{ [K in keyof ResourceBounds]: ResourceBounds[K] extends object ? { [P in keyof ResourceBounds[K]]: number } : number }`

Defined in: [src/provider/types/spec.type.ts:161](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/provider/types/spec.type.ts#L161)

Represents percentage overhead for each resource bound
numerical 50 means 50% overhead

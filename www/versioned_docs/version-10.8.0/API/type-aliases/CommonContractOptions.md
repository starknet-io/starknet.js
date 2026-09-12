# Type Alias: CommonContractOptions

> **CommonContractOptions** = `object`

Defined in: [src/contract/types/index.type.ts:63](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/types/index.type.ts#L63)

## Properties

### parseRequest?

> `optional` **parseRequest?**: `boolean`

Defined in: [src/contract/types/index.type.ts:68](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/types/index.type.ts#L68)

compile and validate arguments

#### Default

```ts
true;
```

---

### parseResponse?

> `optional` **parseResponse?**: `boolean`

Defined in: [src/contract/types/index.type.ts:74](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/types/index.type.ts#L74)

Parse elements of the response array and structuring them into response object

#### Default

```ts
true;
```

---

### parsingStrategy?

> `optional` **parsingStrategy?**: [`ParsingStrategy`](ParsingStrategy.md)

Defined in: [src/contract/types/index.type.ts:79](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/types/index.type.ts#L79)

Custom parsing strategy for request/response processing

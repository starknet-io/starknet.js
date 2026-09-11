# Type Alias: ParsingStrategy

> **ParsingStrategy** = `object`

Defined in: [src/utils/calldata/parser/parsingStrategy.ts:24](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parsingStrategy.ts#L24)

Parsing map for parser, request and response parsers are separated
Configure parsing strategy for each abi type

## Properties

### request

> **request**: `Record`\<[`AbiEntryType`](AbiEntryType.md), (`val`) => `any`\>

Defined in: [src/utils/calldata/parser/parsingStrategy.ts:25](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parsingStrategy.ts#L25)

---

### response

> **response**: `Record`\<[`AbiEntryType`](AbiEntryType.md), (`responseIterator`) => `any`\>

Defined in: [src/utils/calldata/parser/parsingStrategy.ts:26](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/utils/calldata/parser/parsingStrategy.ts#L26)

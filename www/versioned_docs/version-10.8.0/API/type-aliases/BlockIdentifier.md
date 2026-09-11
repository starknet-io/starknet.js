# Type Alias: BlockIdentifier

> **BlockIdentifier** = [`BlockNumber`](BlockNumber.md) \| [`BigNumberish`](BigNumberish.md)

Defined in: [src/types/lib/index.ts:283](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L283)

hex string and BigInt are detected as block hashes

decimal string and number are detected as block numbers

text string are detected as block tag

null return 'latest' block tag

# Type Alias: ESubscriptionTag

> **ESubscriptionTag** = _typeof_ [`ESubscriptionTag`](../variables/ESubscriptionTag.md)\[keyof _typeof_ [`ESubscriptionTag`](../variables/ESubscriptionTag.md)\]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/api/constants.d.ts:123

Tags that control what additional fields are included in subscription responses.
INCLUDE_PROOF_FACTS: Include proof_facts field in the response (an empty array is returned if no proof facts exist for the transaction; only applicable to INVOKE transactions with version 3).

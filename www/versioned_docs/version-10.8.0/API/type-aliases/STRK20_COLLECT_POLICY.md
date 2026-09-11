# Type Alias: STRK20_COLLECT_POLICY

> **STRK20_COLLECT_POLICY** = \{ `type`: `"all"`; \} \| \{ `type`: `"diff"`; \} \| \{ `type`: `"exact"`; `amount`: [`FELT`](../Starknet.js-API/namespaces/RPC/type-aliases/FELT.md); \}

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:235

How much of the shadow account's token balance a settled open note
collects. 'all' collects the shadow account's entire token balance; 'diff'
collects only the balance gained during this interaction; 'exact' collects
the given amount (which must be provided).

## Union Members

### Type Literal

\{ `type`: `"all"`; \}

---

### Type Literal

\{ `type`: `"diff"`; \}

---

### Type Literal

\{ `type`: `"exact"`; `amount`: [`FELT`](../Starknet.js-API/namespaces/RPC/type-aliases/FELT.md); \}

#### type

> **type**: `"exact"`

#### amount

> **amount**: [`FELT`](../Starknet.js-API/namespaces/RPC/type-aliases/FELT.md)

The exact amount to collect, in the token's smallest unit.

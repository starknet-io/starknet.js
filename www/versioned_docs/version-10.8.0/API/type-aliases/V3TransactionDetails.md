# Type Alias: V3TransactionDetails

> **V3TransactionDetails** = `object`

Defined in: [src/types/lib/index.ts:198](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L198)

## Properties

### nonce

> **nonce**: [`BigNumberish`](BigNumberish.md)

Defined in: [src/types/lib/index.ts:199](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L199)

---

### version

> **version**: [`BigNumberish`](BigNumberish.md)

Defined in: [src/types/lib/index.ts:200](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L200)

---

### resourceBounds

> **resourceBounds**: [`ResourceBoundsBN`](ResourceBoundsBN.md)

Defined in: [src/types/lib/index.ts:201](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L201)

---

### tip

> **tip**: [`BigNumberish`](BigNumberish.md)

Defined in: [src/types/lib/index.ts:202](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L202)

---

### paymasterData

> **paymasterData**: [`BigNumberish`](BigNumberish.md)[]

Defined in: [src/types/lib/index.ts:203](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L203)

---

### accountDeploymentData

> **accountDeploymentData**: [`BigNumberish`](BigNumberish.md)[]

Defined in: [src/types/lib/index.ts:204](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L204)

---

### nonceDataAvailabilityMode

> **nonceDataAvailabilityMode**: [`EDataAvailabilityMode`](../Starknet.js-API/namespaces/RPC/type-aliases/EDataAvailabilityMode.md)

Defined in: [src/types/lib/index.ts:205](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L205)

---

### feeDataAvailabilityMode

> **feeDataAvailabilityMode**: [`EDataAvailabilityMode`](../Starknet.js-API/namespaces/RPC/type-aliases/EDataAvailabilityMode.md)

Defined in: [src/types/lib/index.ts:206](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L206)

---

### proofFacts?

> `optional` **proofFacts?**: [`BigNumberish`](BigNumberish.md)[]

Defined in: [src/types/lib/index.ts:208](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L208)

Proof facts to include in the transaction (RPC 0.10.1+)

---

### proof?

> `optional` **proof?**: `string`

Defined in: [src/types/lib/index.ts:210](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/types/lib/index.ts#L210)

Proof for the transaction (RPC 0.10.1+) - base64 encoded string

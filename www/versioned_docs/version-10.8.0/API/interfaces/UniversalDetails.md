# Interface: UniversalDetails

Defined in: [src/account/types/index.type.ts:63](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L63)

## Properties

### nonce?

> `optional` **nonce?**: [`BigNumberish`](../type-aliases/BigNumberish.md)

Defined in: [src/account/types/index.type.ts:64](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L64)

---

### blockIdentifier?

> `optional` **blockIdentifier?**: [`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

Defined in: [src/account/types/index.type.ts:65](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L65)

---

### tip?

> `optional` **tip?**: [`BigNumberish`](../type-aliases/BigNumberish.md)

Defined in: [src/account/types/index.type.ts:66](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L66)

---

### paymasterData?

> `optional` **paymasterData?**: [`BigNumberish`](../type-aliases/BigNumberish.md)[]

Defined in: [src/account/types/index.type.ts:67](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L67)

---

### accountDeploymentData?

> `optional` **accountDeploymentData?**: [`BigNumberish`](../type-aliases/BigNumberish.md)[]

Defined in: [src/account/types/index.type.ts:68](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L68)

---

### nonceDataAvailabilityMode?

> `optional` **nonceDataAvailabilityMode?**: [`EDataAvailabilityMode`](../Starknet.js-API/namespaces/RPC/type-aliases/EDataAvailabilityMode.md)

Defined in: [src/account/types/index.type.ts:69](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L69)

---

### feeDataAvailabilityMode?

> `optional` **feeDataAvailabilityMode?**: [`EDataAvailabilityMode`](../Starknet.js-API/namespaces/RPC/type-aliases/EDataAvailabilityMode.md)

Defined in: [src/account/types/index.type.ts:70](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L70)

---

### version?

> `optional` **version?**: [`BigNumberish`](../type-aliases/BigNumberish.md)

Defined in: [src/account/types/index.type.ts:71](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L71)

---

### resourceBounds?

> `optional` **resourceBounds?**: [`ResourceBoundsBN`](../type-aliases/ResourceBoundsBN.md)

Defined in: [src/account/types/index.type.ts:72](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L72)

---

### skipValidate?

> `optional` **skipValidate?**: `boolean`

Defined in: [src/account/types/index.type.ts:73](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L73)

---

### proofFacts?

> `optional` **proofFacts?**: [`BigNumberish`](../type-aliases/BigNumberish.md)[]

Defined in: [src/account/types/index.type.ts:75](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L75)

Proof facts to include in the transaction (RPC 0.10.1+)

---

### proof?

> `optional` **proof?**: `string`

Defined in: [src/account/types/index.type.ts:77](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/types/index.type.ts#L77)

Proof for the transaction (RPC 0.10.1+) - base64 encoded string

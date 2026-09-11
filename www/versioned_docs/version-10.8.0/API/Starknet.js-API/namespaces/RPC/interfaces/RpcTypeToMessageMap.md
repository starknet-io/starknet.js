# Interface: RpcTypeToMessageMap

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:10

Maps each RPC message type to its corresponding parameters and result type.

## Properties

### wallet_getPermissions

> **wallet_getPermissions**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:15

Get permissions from the wallet.

#### params?

> `optional` **params?**: [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: \[\] \| `"accounts"`[]

#### errors

> **errors**: [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Returns

An array of permissions.

---

### wallet_requestAccounts

> **wallet_requestAccounts**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:25

Request active accounts from the wallet.

#### params?

> `optional` **params?**: [`RequestAccountsParameters`](RequestAccountsParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `string`[]

#### errors

> **errors**: [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

Optional parameters for requesting accounts.

#### Returns

An array of account addresses as strings.

---

### wallet_watchAsset

> **wallet_watchAsset**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:35

Watch an asset in the wallet.

#### params

> **params**: [`WatchAssetParameters`](WatchAssetParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `boolean`

#### errors

> **errors**: [`NOT_ERC20`](NOT_ERC20.md) \| [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required to watch an asset.

#### Returns

A boolean indicating if the operation was successful.

---

### wallet_addStarknetChain

> **wallet_addStarknetChain**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:45

Add a new Starknet chain to the wallet.

#### params

> **params**: [`AddStarknetChainParameters`](AddStarknetChainParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `boolean`

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required to add a new chain.

#### Returns

A boolean indicating if the operation was successful.

---

### wallet_switchStarknetChain

> **wallet_switchStarknetChain**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:55

Switch the current Starknet chain in the wallet.

#### params

> **params**: [`SwitchStarknetChainParameters`](SwitchStarknetChainParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `boolean`

#### errors

> **errors**: [`UNLISTED_NETWORK`](UNLISTED_NETWORK.md) \| [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`CHAIN_ID_NOT_SUPPORTED`](CHAIN_ID_NOT_SUPPORTED.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required to switch chains.

#### Returns

A boolean indicating if the operation was successful.

---

### wallet_requestChainId

> **wallet_requestChainId**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:64

Request the current chain ID from the wallet.

#### params?

> `optional` **params?**: [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: `string`

#### errors

> **errors**: [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Returns

The current Starknet chain ID.

---

### wallet_deploymentData

> **wallet_deploymentData**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:73

Get deployment data for a contract.

#### params?

> `optional` **params?**: [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`AccountDeploymentData`](AccountDeploymentData.md)

#### errors

> **errors**: [`ACCOUNT_ALREADY_DEPLOYED`](ACCOUNT_ALREADY_DEPLOYED.md) \| [`DEPLOYMENT_DATA_NOT_AVAILABLE`](DEPLOYMENT_DATA_NOT_AVAILABLE.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Returns

The deployment data result.

---

### wallet_addInvokeTransaction

> **wallet_addInvokeTransaction**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:83

Add an invoke transaction to the wallet.

#### params

> **params**: [`AddInvokeTransactionParameters`](AddInvokeTransactionParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`AddInvokeTransactionResult`](AddInvokeTransactionResult.md)

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required for the invoke transaction.

#### Returns

The result of adding the invoke transaction.

---

### wallet_addDeclareTransaction

> **wallet_addDeclareTransaction**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:93

Add a declare transaction to the wallet.

#### params

> **params**: [`AddDeclareTransactionParameters`](AddDeclareTransactionParameters.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`AddDeclareTransactionResult`](AddDeclareTransactionResult.md)

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The parameters required for the declare transaction.

#### Returns

The result of adding the declare transaction.

---

### wallet_signTypedData

> **wallet_signTypedData**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:103

Sign typed data using the wallet.

#### params

> **params**: [`TypedData`](TypedData.md) & [`ApiVersionRequest`](ApiVersionRequest.md)

#### result

> **result**: [`SIGNATURE`](../type-aliases/SIGNATURE.md)

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The typed data to sign.

#### Returns

An array of signatures as strings.

---

### wallet_supportedSpecs

> **wallet_supportedSpecs**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:112

Get the list of supported RPC specification versions.

#### params?

> `optional` **params?**: `undefined`

#### result

> **result**: [`SpecVersion`](../type-aliases/SpecVersion.md)[]

#### Returns

An array of supported specification strings.

---

### wallet_supportedWalletApi

> **wallet_supportedWalletApi**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:121

Returns a list of wallet api versions compatible with the wallet.
Notice this might be different from Starknet JSON-RPC spec

#### params?

> `optional` **params?**: `undefined`

#### result

> **result**: [`API_VERSION`](../type-aliases/API_VERSION.md)[]

#### Returns

An array of supported wallet api versions.

---

### wallet_strk20InvokeTransaction

> **wallet_strk20InvokeTransaction**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:138

Submit a transaction containing STRK20 privacy protocol actions. Submits one
or more STRK20 actions (deposit, withdraw, private transfer) as a single
atomic transaction. The wallet shows an approval UI and may take
significantly longer than wallet_addInvokeTransaction because SNIP-36 ZK proof
generation is required; the dapp must tolerate long-running calls. The wallet
adds the fee action itself: a withdraw action covering the paymaster/relayer
fee required to submit, on top of the actions the dapp supplies.
Registration into the pool is transparent — if the user is not registered,
NOT_REGISTERED is returned.

#### params

> **params**: `object`

##### params.actions

> **actions**: [`STRK20_ACTION`](../type-aliases/STRK20_ACTION.md)[]

##### params.api_version?

> `optional` **api_version?**: [`API_VERSION`](../type-aliases/API_VERSION.md)

#### result

> **result**: `object`

##### result.transaction_hash

> **transaction_hash**: `string`

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`NOT_REGISTERED`](NOT_REGISTERED.md) \| [`INSUFFICIENT_PRIVATE_BALANCE`](INSUFFICIENT_PRIVATE_BALANCE.md) \| [`PRIVACY_LEAK`](PRIVACY_LEAK.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

An ordered list of STRK20 actions to execute atomically (min 1).

#### Returns

The transaction hash.

---

### wallet_strk20PrepareInvoke

> **wallet_strk20PrepareInvoke**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:162

Build the Starknet call (and SNIP-36 ZK proof) for a STRK20 transaction
without submitting it. The dapp submits the returned call itself. The wallet
supplies the viewing key and the user's private state (channels, notes); the
dapp only describes the actions. The wallet does not add a fee withdrawal
action — the fee belongs to whoever submits, so the dapp covers it (for
instance through its own paymaster). When `simulate` is true the wallet skips the
expensive, state-revealing proof generation and returns the call with an empty
proof — same shape, but NOT submittable on-chain (use for fee estimation / UI
previews). NOT_REGISTERED if the user is not registered.

#### params

> **params**: `object`

##### params.actions

> **actions**: [`STRK20_ACTION`](../type-aliases/STRK20_ACTION.md)[]

##### params.simulate?

> `optional` **simulate?**: `boolean`

##### params.api_version?

> `optional` **api_version?**: [`API_VERSION`](../type-aliases/API_VERSION.md)

#### result

> **result**: [`STRK20_CALL_AND_PROOF`](../type-aliases/STRK20_CALL_AND_PROOF.md)

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`NOT_REGISTERED`](NOT_REGISTERED.md) \| [`INSUFFICIENT_PRIVATE_BALANCE`](INSUFFICIENT_PRIVATE_BALANCE.md) \| [`PRIVACY_LEAK`](PRIVACY_LEAK.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

An ordered list of STRK20 actions to bundle (min 1).

#### Param

If true, skip proof generation and return an empty proof. Defaults to false.

#### Returns

The assembled call and proof (proof fields are empty when simulate is true).

---

### wallet_strk20Balances

> **wallet_strk20Balances**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:180

Query the user's private balances for a list of tokens, or for all shielded
tokens. Returns the private balance held inside the pool for each requested
token address; an empty array returns balances of all shielded tokens the
wallet holds. NOT_REGISTERED if the user is not registered.

#### params

> **params**: `object`

##### params.tokens

> **tokens**: `string`[]

Token addresses to query. Pass an empty array to return balances of all shielded tokens in the privacy pool.

##### params.valid_until?

> `optional` **valid_until?**: `number`

Requested expiry of the balance-read authorization, as a Unix timestamp in seconds. When omitted, the wallet applies its own default window.

##### params.api_version?

> `optional` **api_version?**: [`API_VERSION`](../type-aliases/API_VERSION.md)

#### result

> **result**: [`STRK20_BALANCE_ENTRY`](../../../../type-aliases/STRK20_BALANCE_ENTRY.md)[]

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`NOT_REGISTERED`](NOT_REGISTERED.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

Token addresses to query; an empty array returns all shielded tokens.

#### Param

Expiry of the balance-read authorization, as a Unix timestamp in seconds; if omitted, the wallet applies its own default window.

#### Returns

Balance per token.

---

### wallet_strk20ShadowAccountCommitment

> **wallet_strk20ShadowAccountCommitment**: `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/methods.d.ts:208

Compute the commitment for a dapp's STRK20 shadow accounts. The commitment
is computed locally by the wallet from the user's private state; no
transaction is sent. When `nonce` is given, returns the full commitment for
that single shadow account: hash(partial_commitment, nonce); each nonce maps
to a distinct, deterministic shadow account for the user + dapp. When
`nonce` is omitted, returns the partial (nonce-independent) commitment:
hash(identity_key, dapp_name), where identity_key is derived from the user,
their viewing key, and the shadow account anonymizer address. The partial
commitment is shared by every shadow account the user derives for this dapp,
so it can be published once to let a dapp recognize all of the user's shadow
accounts without learning any individual nonce. NOT_REGISTERED if the user
is not registered.

#### params

> **params**: `object`

##### params.dapp_name

> **dapp_name**: `string`

##### params.nonce?

> `optional` **nonce?**: `string`

##### params.api_version?

> `optional` **api_version?**: [`API_VERSION`](../type-aliases/API_VERSION.md)

#### result

> **result**: `string`

#### errors

> **errors**: [`USER_REFUSED_OP`](USER_REFUSED_OP.md) \| [`INVALID_REQUEST_PAYLOAD`](INVALID_REQUEST_PAYLOAD.md) \| [`NOT_REGISTERED`](NOT_REGISTERED.md) \| [`API_VERSION_NOT_SUPPORTED`](API_VERSION_NOT_SUPPORTED.md) \| [`UNKNOWN_ERROR`](UNKNOWN_ERROR.md)

#### Param

The dapp that scopes the shadow account(s).

#### Param

The shadow account nonce; each nonce selects a distinct shadow account for this user + dapp. When omitted, the partial commitment is returned instead.

#### Returns

The shadow account commitment: hash(partial_commitment, nonce) when `nonce` was given, otherwise the partial commitment hash(identity_key, dapp_name).

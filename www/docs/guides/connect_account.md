---
sidebar_position: 4
---

# 🔌 Connect to an existing account

Once your provider is initialized, you can connect an existing account.

You need 2 pieces of data:

- the address of the account
- the private key of this account

```typescript
import { Account, RpcProvider } from "starknet";
```

## Connect to a pre-deployed account in Starknet-devnet-rs

When you launch starknet-devnet-rs, 10 accounts are pre-deployed with 100 dummy ETH in each.

Addresses and private keys are displayed on the console at initialization.

> This data will change at each launch, so to freeze them, launch with: `cargo run --release -- --seed 0`.

The result for `account #0`:

```text
Address    : 0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691
Private key: 0x71d7bb07b9a64f6f78ac4c816aff4da9
Public key : 0x7e52885445756b313ea16849145363ccb73fb4ab0440dbac333cf9d13de82b9
```

Then you can use this code:

```typescript
// initialize provider
const provider = new RpcProvider({ nodeUrl: "http://127.0.0.1:5050/rpc" });
// initialize existing pre-deployed account 0 of Devnet
const privateKey = "0x71d7bb07b9a64f6f78ac4c816aff4da9";
const accountAddress = "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691";

const account = new Account(provider, accountAddress, privateKey);
```

Your account is now connected, and you can use it.

> **IMPORTANT:** If this account is based on a Cairo v2 contract (for example OpenZeppelin account 0.7.0 or later), do not forget to add the parameter "1" after the privateKey parameter:

```typescript
const account = new Account(provider, accountAddress, privateKey, "1");
```

> Take care that this added parameter is a string, NOT a number.

## 👛 Connect to an existing account (in any network)

The code is the same, you just have to:

- connect to the appropriate network.
- use the address of this account (public data).
- use the private key of this account (very sensitive data: your code MUST not disclose it).

For example, to connect an existing account on testnet, with a private key stored in a .env non-archived file:

```typescript
import * as dotenv from "dotenv";
dotenv.config();

// initialize provider
const provider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });
// initialize existing account
const privateKey = process.env.OZ_NEW_ACCOUNT_PRIVKEY;
const accountAddress = "0x051158d244c7636dde39ec822873b29e6c9a758c6a9812d005b6287564908667";

const account = new Account(provider, accountAddress, privateKey);
// add ,"1" after privateKey if this account is not a Cairo 0 contract

```

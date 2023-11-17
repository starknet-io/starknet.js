---
sidebar_position: 4
---

# 🔌 Connect to an existing account

Once your provider is initialized, you can connect an existing account.

You need 2 pieces of data:

- the address of the account
- the private key of this account

```typescript
import { Account, Provider } from "starknet";
```

## Connect to a pre-deployed account in Starknet-devnet

When you launch starknet-devnet, 10 accounts are pre-deployed with 100 dummy ETH in each.

Addresses and private keys are displayed on the console at initialization.

> This data will change at each launch, so to freeze them, launch with: `starknet-devnet --seed 0`.

The result for `account #0`:

```bash
Address: 0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a
Public key: 0x7e52885445756b313ea16849145363ccb73fb4ab0440dbac333cf9d13de82b9
Private key: 0xe3e70682c2094cac629f6fbed82c07cd
```

Then you can use this code:

```typescript
// initialize provider
const provider = new Provider({ sequencer: { baseUrl:"http://127.0.0.1:5050"  } });
// initialize existing pre-deployed account 0 of Devnet
const privateKey = "0xe3e70682c2094cac629f6fbed82c07cd";
const accountAddress = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";

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
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI  } });
// initialize existing account
const privateKey = process.env.OZ_NEW_ACCOUNT_PRIVKEY;
const accountAddress = "0x051158d244c7636dde39ec822873b29e6c9a758c6a9812d005b6287564908667";

const account = new Account(provider, accountAddress, privateKey);
// add ,"1" after privateKey if this account is not a Cairo 0 contract

```

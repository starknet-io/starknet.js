---
sidebar_position: 4
---

# 🔌 Connect an existing account

Once your provider is initialized, you can connect an existing account.

You need 2 data:

- the address of the account
- the private key of this account

```typescript
import { Account, ec, Provider } from "starknet";
```

## Connect a predeployed account in Starknet-devnet

When you launch starknet-devnet, 10 accounts are predeployed with 100 dummy ETH in each.

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
const starkKeyPair = ec.getKeyPair(privateKey);
const accountAddress = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";

const account = new Account(provider, accountAddress, starkKeyPair);
```

Your account is now connected, and you can use it.

## 👛 Connect an existing account (in any network)

The code is exactly the same, you just have to:

- connect to the appropriate network.
- use the address of this account (public data).
- use the private key of this account (very sensitive data: your code MUST not disclose it).

For example, to connect an existing account to testnet, with a private key stored in .env non archived file:

```typescript
import * as dotenv from "dotenv";
dotenv.config();

// initialize provider
const provider = new Provider({ sequencer: { baseUrl:"goerli-alpha"  } });
// initialize existing account
const privateKey = process.env.OZ_NEW_ACCOUNT_PRIVKEY;
const starkKeyPair = ec.getKeyPair(privateKey);
const accountAddress = "0x051158d244c7636dde39ec822873b29e6c9a758c6a9812d005b6287564908667";

const account = new Account(provider, accountAddress, starkKeyPair);
```

---
sidebar_position: 4
---

# 🔌 Connect an existing wallet :
Once your provider initialized,you can connect an existing wallet.  
You need 2 data :
- the address of the wallet
- the private key of this wallet
```typescript
import { Account, ec, Provider } from "starknet";
```
## Connect a predeployed account in Starknet-devnet :
When you launch starknet-devnet, 10 accounts are predeployed with 100 dummy ETH in each. Addresses and private keys are displayed on the console at initialization. These data will change at each launch ; to freeze them, launch with : `starknet-devnet --seed 0`. The result for account #0 :   
```Account #0
Address: 0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a
Public key: 0x7e52885445756b313ea16849145363ccb73fb4ab0440dbac333cf9d13de82b9
Private key: 0xe3e70682c2094cac629f6fbed82c07cd
```
Then you can use this code :
```typescript
// intialize provider
const provider = new Provider({ sequencer: { baseUrl:"http://127.0.0.1:5050"  } });
// initialize existing predeployed account 0 of Devnet
const privateKey = "0xe3e70682c2094cac629f6fbed82c07cd";
const starkKeyPair = ec.getKeyPair(privateKey);
const accountAddress = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";

const account = new Account(provider, accountAddress, starkKeyPair);
```
Your account is now connect, and you can use it.
## Connect an existing wallet (in any network) :
The code is exactly the same, you have just :
- to connect to the appropriate network.
- to use the address of this wallet (public data).
- to use the private key of this wallet (very sensitive date : your code MUST not disclose it).  
For example, to connect an existing wallet to testnet, with a private key stored in .env non archived file :
```typescript
import * as dotenv from "dotenv";
dotenv.config();

// intialize provider
const provider = new Provider({ sequencer: { baseUrl:"goerli-alpha"  } });
// initialize existing account 
const privateKey = process.env.OZ_NEW_ACCOUNT_PRIVKEY;
const starkKeyPair = ec.getKeyPair(privateKey);
const accountAddress = "0x051158d244c7636dde39ec822873b29e6c9a758c6a9812d005b6287564908667";

const account = new Account(provider, accountAddress, starkKeyPair);
```


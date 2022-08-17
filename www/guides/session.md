# How to use Sessions

Sessions can be used to make a user allow a bunch of transactions once and allow the dapp to execute these transactions as many times as they want, only limited by the policies signed.
A session kind of looks like this:

```typescript
interface Policy {
  contractAddress: string;
  selector: string;
}

interface Session {
  key: string;
  expires: number;
  policies: Policy[];
}
```

## Using sessions as a dapp

First you need to have a valid account with a valid Signer. You can either get that by using the Account and Signer classes provided by starknet.js, or use an injected instance by a wallet.

```typescript
const account = window.starknet.account
```

Next you need to come up with the permissions you would like for your session. You also need to generate the session keypair you want to grant these rights to.

This example session will allow the dapp to execute erc20 transfers on the specified token without asking the user to approve the transaction again. After signing the session the dapp can execute all transactions listed in `policies` whenever it wants and as many times as it wants.

```typescript
import { Signer, ec } from "starknet"

// gets signer with random private key you need to store if you want to reuse the session
const sessionSigner = new Signer()

const session: Session = {
  key: await sessionSigner.getPublicKey(),
  expires: Date.now() + 1000 * 60 * 60 * 24, // 1 day
  policies: [
    {
      // lets assume this is a erc20 contract
      contractAddress: '0x...',
      selector: 'transfer',
    },
  ],
}
```

Now you can sign the session with the account you have.
Depending on how your account works, the user may get asked to sign a message

```typescript
import { session } from "starknet"

// calls account.signMessage internally
const signedSession = await session.createSession(session, account)
```

### Using established sessions

With your signed session you can now use it with your dapp to do transactions without the user having to approve again.

```typescript
import { SessionAccount } from "starknet"

const sessionAccount = new SessionAccount(account, account.address, sessionSigner, signedSession)

// this transaction should get executed without the user having to approve again
const tx = sessionAccount.execute({
    // lets assume this is a erc20 contract
    contractAddress: '0x...',
    selector: 'transfer',
    calldata: [
      '0x...', // address of the recipient
      '1', // amount of tokens to transfer
    ],
})
```

You can also use the session when you dont have access to the main account (`window.starknet.account`). You only need access to the `signedSession` object and the `sessionSigner`.

```typescript
const sessionAccount = new SessionAccount(
    providerWithCorrectNetwork,
    "0xaccountAddress",
    sessionSigner,
    signedSession
)
```

Congratulations, you can now use your dapp to execute transactions without the user having to approve!

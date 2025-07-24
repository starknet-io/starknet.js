---
sidebar_position: 7
---

# Outside Execution

## Introduction

Outside execution refers to the ability to execute transactions on behalf of an account without having access to its private key. This is useful in scenarios where you want to:

1. Execute transactions for users who have delegated permission
2. Implement meta-transactions
3. Build automation systems that can operate on behalf of users

## Prerequisites

To enable outside execution, the account contract must implement the necessary validation logic to verify external signatures or permissions.

## Basic concept

Instead of using the account's private key, outside execution uses:

1. A separate signer for transaction authorization
2. Custom validation logic in the account contract
3. Additional parameters to prove execution permission

## Implementation

### 1. Create a signer

First, create a signer that will authorize the execution:

```typescript
import { Signer } from 'starknet';

const externalSigner = new Signer(externalPrivateKey);
```

### 2. Prepare execution parameters

Include the necessary parameters for validation:

```typescript
const executionParams = {
  signature: await externalSigner.signMessage({
    message: messageHash,
    domain: {
      name: 'External Execution',
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    },
  }),
  nonce: await myAccount.getNonce(),
  // Other validation parameters
};
```

### 3. Execute the transaction

Use the execution parameters when calling the contract:

```typescript
const result = await myAccount.execute({
  contractAddress: targetContract,
  entrypoint: 'externalExecute',
  calldata: [
    ...executionParams.signature,
    executionParams.nonce,
    // Transaction parameters
  ],
});
```

## Example: Delegated execution

Here's a complete example of implementing delegated execution:

```typescript
import { Account, Contract, RpcProvider, Signer, constants } from 'starknet';

async function executeDelegated(chosenAccount: Account, delegateSigner: Signer, transaction: any) {
  // Get current nonce
  const nonce = await chosenAccount.getNonce();

  // Create message hash
  const messageHash = hash.computeHashOnElements([
    transaction.contractAddress,
    transaction.entrypoint,
    ...transaction.calldata,
    nonce,
  ]);

  // Sign with delegate key
  const signature = await delegateSigner.signMessage({
    message: messageHash,
    domain: {
      name: 'Delegate Execution',
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    },
  });

  // Execute with signature
  const result = await chosenAccount.execute({
    contractAddress: transaction.contractAddress,
    entrypoint: 'executeFromDelegate',
    calldata: [
      ...signature,
      nonce,
      transaction.contractAddress,
      transaction.entrypoint,
      ...transaction.calldata,
    ],
  });

  return result;
}

// Usage
const myProvider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });
const myAccount = new Account(myProvider, accountAddress, accountPrivateKey);
const delegateSigner = new Signer(delegatePrivateKey);

const transaction = {
  contractAddress: '0x...',
  entrypoint: 'transfer',
  calldata: ['0x...', '1000'],
};

const result = await executeDelegated(myAccount, delegateSigner, transaction);
console.log('Transaction hash:', result.transaction_hash);
```

## Example: Meta-transactions

Implement meta-transactions where a relayer executes transactions:

```typescript
import { Account, RpcProvider, Signer, constants, hash } from 'starknet';

class MetaTransaction {
  constructor(
    public readonly sender: string,
    public readonly target: string,
    public readonly entrypoint: string,
    public readonly calldata: string[],
    public readonly nonce: string,
    public readonly signature: string[]
  ) {}

  static async create(
    sender: string,
    target: string,
    entrypoint: string,
    calldata: string[],
    nonce: string,
    signer: Signer
  ): Promise<MetaTransaction> {
    const messageHash = hash.computeHashOnElements([
      sender,
      target,
      entrypoint,
      ...calldata,
      nonce,
    ]);

    const signature = await signer.signMessage({
      message: messageHash,
      domain: {
        name: 'Meta Transaction',
        chainId: constants.StarknetChainId.SN_SEPOLIA,
      },
    });

    return new MetaTransaction(sender, target, entrypoint, calldata, nonce, signature);
  }
}

class Relayer {
  constructor(
    private readonly account: Account,
    private readonly provider: RpcProvider
  ) {}

  async relay(metaTx: MetaTransaction) {
    const result = await this.account.execute({
      contractAddress: metaTx.target,
      entrypoint: 'executeMetaTransaction',
      calldata: [
        metaTx.sender,
        metaTx.target,
        metaTx.entrypoint,
        ...metaTx.calldata,
        metaTx.nonce,
        ...metaTx.signature,
      ],
    });

    return result;
  }
}

// Usage
const myProvider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });
const relayerAccount = new Account(myProvider, relayerAddress, relayerPrivateKey);
const userSigner = new Signer(userPrivateKey);

const relayer = new Relayer(relayerAccount, myProvider);

// Create meta-transaction
const metaTx = await MetaTransaction.create(
  userAddress,
  targetContract,
  'transfer',
  ['0x...', '1000'],
  await myProvider.getNonceForAddress(userAddress),
  userSigner
);

// Relay transaction
const result = await relayer.relay(metaTx);
console.log('Transaction hash:', result.transaction_hash);
```

## Security considerations

When implementing outside execution:

1. Validate all signatures and permissions thoroughly
2. Use nonces to prevent replay attacks
3. Implement proper access control in contracts
4. Consider gas costs and limitations
5. Monitor for suspicious activity

## Error handling

Handle common outside execution errors:

```typescript
try {
  const result = await executeDelegated(myAccount, delegateSigner, transaction);
} catch (error) {
  if (error.message.includes('Invalid delegate signature')) {
    console.error('Delegate signature verification failed');
  } else if (error.message.includes('Invalid nonce')) {
    console.error('Nonce mismatch');
  } else if (error.message.includes('Unauthorized delegate')) {
    console.error('Delegate not authorized');
  } else {
    console.error('Transaction failed:', error);
  }
}
```

## Best practices

1. Always verify signatures before execution
2. Use unique nonces for each transaction
3. Implement proper error handling
4. Test thoroughly with different scenarios
5. Monitor gas costs and optimize when needed
6. Keep private keys secure
7. Implement proper logging and monitoring
8. Consider rate limiting for security
9. Document the validation requirements
10. Regular security audits

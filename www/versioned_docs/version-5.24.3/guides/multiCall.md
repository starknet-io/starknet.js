---
sidebar_position: 15
---

# Interact with more than one contract within one transaction

Interacting with more than one contract with one transaction is one of Starknet's features. To use this feature, two contracts are required.

## Setup

Set up basic stuff before multicall.

```javascript
// devnet private key from Account #0 if generated with --seed 0
const privateKey = "0xe3e70682c2094cac629f6fbed82c07cd";
const accountAddress = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";

// Ether token contract address
const contractAddress_1 = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

// contract address which require ether
const contractAddress_2 = '0x078f36c1d59dd29e00a0bb60aa2a9409856f4f9841c47f165aba5bab4225aa6b';

const account = new Account(
    provider,
    accountAddress,
    privateKey
  );
```

## Interact with contracts

Interact with more than one contract by using `account.execute([calls])`. The example is as follows.

```javascript
const multiCall = await account.execute(
	[
    // Calling the first contract
    {
    contractAddress: contractAddress_1,
    entrypoint: "approve",
    // approve 1 wei for bridge
    calldata: CallData.compile({
        spender: contractAddress_2,
        amount: cairo.uint256(1),
      })
    },
    // Calling the second contract
    {
      contractAddress: contractAddress_2,
      entrypoint: "transfer_ether",
      // transfer 1 wei to the contract address
      calldata: CallData.compile({
          amount: cairo.uint256(1),
      })
    }
  ]
)
await provider.waitForTransaction(multiCall.transaction_hash);
```

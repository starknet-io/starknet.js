---
sidebar_position: 3
---

# Deploy an ERC20 Contract

Deploy the contract and wait for deployment transaction to be accepted on StarkNet

```javascript
const compiledErc20 = json.parse(
  fs.readFileSync("./ERC20.json").toString("ascii")
);
const erc20Response = await defaultProvider.deployContract({
  contract: compiledErc20,
});
console.log("Waiting for Tx to be Accepted on Starknet - ERC20 Deployment...");
await defaultProvider.waitForTransaction(erc20Response.transaction_hash);
```

## Get the erc20 contract address and create the contact object

```javascript
const erc20Address = erc20Response.address;
const erc20 = new Contract(compiledErc20.abi, erc20Address);
```

## Mint tokens to an account address

Make sure you created the `Account` instance following the [Creating an Account](./account.md) guide.

```javascript
const { transaction_hash: mintTxHash } = await erc20.mint(
  account.address,
  "1000"
);
console.log(`Waiting for Tx to be Accepted on Starknet - Minting...`);
await defaultProvider.waitForTransaction(mintTxHash);
```

## Check balance after mint

```javascript
console.log(`Calling StarkNet for account balance...`);
const balanceBeforeTransfer = await erc20.balance_of(account.address);

console.log(
  `account Address ${account.address} has a balance of:`,
  number.toBN(balanceBeforeTransfer.res, 16).toString()
);
```

## Transfer tokens

```javascript
// Execute tx transfer of 10 tokens
console.log(`Invoke Tx - Transfer 10 tokens back to erc20 contract...`);
const { transaction_hash: transferTxHash } = await account.execute(
  {
    contractAddress: erc20Address,
    entrypoint: "transfer",
    calldata: [erc20Address, "10"],
  },
  undefined,
  { maxFee: "0" }
);

// Wait for the invoke transaction to be accepted on StarkNet
console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
await defaultProvider.waitForTransaction(transferTxHash);
```

## Check balance after transfer

```javascript
// Check balance after transfer - should be 990
console.log(`Calling StarkNet for account balance...`);
const balanceAfterTransfer = await erc20.balance_of(account.address);

console.log(
  `account Address ${account.address} has a balance of:`,
  number.toBN(balanceAfterTransfer.res, 16).toString()
);
```

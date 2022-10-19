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
  constructorCalldata: [encodeShortString('TokenName'), encodeShortString('TokenSymbol'), recipient], // Here the `recipient` receives the initial 1000 tokens
});

console.log("Waiting for Tx to be Accepted on Starknet - ERC20 Deployment...");
await defaultProvider.waitForTransaction(erc20Response.transaction_hash);
```

> **Note**
>
> The ERC20 contract can be found [here](https://github.com/argentlabs/argent-contracts-starknet/blob/develop/contracts/lib/ERC20.cairo)

## Get the erc20 contract address and create the contact object

```javascript
const erc20Address = erc20Response.contract_address;
const erc20 = new Contract(compiledErc20.abi, erc20Address, defaultProvider);
```

## Mint tokens to an account address

Make sure you created the `Account` instance following the [Creating an Account](./account.md) guide.

Also make sure you added funds to your account!

```javascript
erc20.connect(account);

const { transaction_hash: mintTxHash } = await erc20.mint(
  account.address,
 [ "1000", "0"]
  {
    maxFee: "1"
  }
);

console.log(`Waiting for Tx to be Accepted on Starknet - Minting...`);
await defaultProvider.waitForTransaction(mintTxHash);
```

> **Note**
>
> Transaction can be rejected if `maxFee` is lower than actual.
>
> _Error: REJECTED: FEE_TRANSFER_FAILURE_
>
> _Actual fee exceeded max fee._
>
> If this occurs, set `maxFee` to a higher value, for example: 999999995330000

## Check balance after mint

```javascript
console.log(`Calling StarkNet for account balance...`);
const balanceBeforeTransfer = await erc20.balanceOf(account.address);

console.log(
  `account Address ${account.address} has a balance of:`,
  number.toBN(balanceBeforeTransfer.balance.low, 16).toString()
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
    calldata: [erc20Address, "10", "0"],
  },
  undefined,
  { maxFee: "1" }
);

// Wait for the invoke transaction to be accepted on StarkNet
console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
await defaultProvider.waitForTransaction(transferTxHash);
```

## Check balance after transfer

```javascript
// Check balance after transfer - should be 1990 (1000 initial supply + 1000 mint - 10 transfer)
console.log(`Calling StarkNet for account balance...`);
const balanceAfterTransfer = await erc20.balanceOf(account.address);

console.log(
  `account Address ${account.address} has a balance of:`,
  number.toBN(balanceAfterTransfer.balance.low, 16).toString()
);
```

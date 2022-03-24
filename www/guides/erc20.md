---
sidebar_position: 3
---
# Deploy an ERC20 Contract

Dpeploy the contract and wait for deployment transaction to be accepted on StarkNet

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
```javascript
const { transaction_hash: mintTxHash } = await erc20.mint(
  accountContract.address,
  "1000"
);
console.log(`Waiting for Tx to be Accepted on Starknet - Minting...`);
await defaultProvider.waitForTransaction(mintTxHash);
```

## Check balance after mint
```javascript
console.log(`Calling StarkNet for accountContract balance...`);
const balanceBeforeTransfer = await erc20.balance_of(accountContract.address);

console.log(
  `accountContract Address ${accountContract.address} has a balance of:`,
  number.toBN(balanceBeforeTransfer.res, 16).toString()
);
```

## Transfer tokens
```javascript
// Get the nonce of the account and prepare transfer tx
console.log(`Calling StarkNet for accountContract nonce...`);
const nonce = (await accountContract.call("get_nonce")).nonce.toString();
const calls = [
  {
    contractAddress: erc20Address,
    entrypoint: "transfer",
    calldata: [erc20Address, "10"],
  },
];
const msgHash = hash.hashMulticall(accountContract.address, calls, nonce, "0");

const { callArray, calldata } = transformCallsToMulticallArrays(calls);

// sign tx to transfer 10 tokens
const signature = ec.sign(starkKeyPair, msgHash);

// Execute tx transfer of 10 tokens
console.log(`Invoke Tx - Transfer 10 tokens back to erc20 contract...`);
const { transaction_hash: transferTxHash } = await accountContract.__execute__(
  callArray,
  calldata,
  nonce,
  signature
);

// Wait for the invoke transaction to be accepted on StarkNet
console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
await defaultProvider.waitForTransaction(transferTxHash);
```

## Check balance after transfer
```javascript
// Check balance after transfer - should be 990
console.log(`Calling StarkNet for accountContract balance...`);
const balanceAfterTransfer = await erc20.balance_of(accountContract.address);

console.log(
  `accountContract Address ${accountContract.address} has a balance of:`,
  number.toBN(balanceAfterTransfer.res, 16).toString()
);
```

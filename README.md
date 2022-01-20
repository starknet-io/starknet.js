<!-- logo -->
<p align="center">
  <img width='300' src="https://raw.githubusercontent.com/seanjameshan/starknet.js/main/img/logo.svg">
</p>

<!-- tag line -->
<h4 align='center'> JavaScript library for StarkNet.</h4>

<!-- primary badges -->
<p align="center">
  <a href="https://github.com/seanjameshan/starknet.js/actions">
    <img src="https://img.shields.io/github/workflow/status/seanjameshan/starknet.js/Release">
  </a>
  <a href="https://www.npmjs.com/package/starknet">
    <img src='https://img.shields.io/npm/v/starknet' />
  </a>
  <a href="https://www.npmjs.com/package/starknet">
    <img src='https://img.shields.io/npm/v/starknet/next' />
  </a>
  <a href="https://bundlephobia.com/package/starknet">
    <img src='https://img.shields.io/bundlephobia/minzip/starknet?color=success&label=size' />
  </a>
  <a href="https://www.npmjs.com/package/starknet">
    <img src='https://img.shields.io/npm/dt/starknet?color=blueviolet' />
  </a>
  <a href="https://github.com/seanjameshan/starknet.js/blob/main/LICENSE/">
    <img src="https://img.shields.io/badge/license-MIT-black">
  </a>
  <a href="https://github.com/seanjameshan/starknet.js/stargazers">
    <img src='https://img.shields.io/github/stars/seanjameshan/starknet.js?color=yellow' />
  </a>
  <a href="https://starkware.co/">
    <img src="https://img.shields.io/badge/powered_by-StarkWare-navy">
  </a>
</p>

## 🕹️ Usage

Install starknet with `npm`

```bash
$ npm install starknet
```

Import `starknet` and use the [API](https://www.starknetjs.com/modules.html)

The following code is used to build a [simple AMM example](https://starkfin.netlify.app/) from the [cairo docs](https://www.cairo-lang.org/docs/hello_starknet/amm.html)

```javascript
import { defaultProvider, stark } from 'starknet';
const { getSelectorFromName } = stark;

const CONTRACT_ADDRESS =
  "0x03e19baa6cb2078631bcdb34844f3f7879449a544c9ce722681a54af08cff4b9";

/**
 * addTransaction() example
**/

/** Reset the liquidity pool **/
const addTokenResponse = await defaultProvider.addTransaction({
  type: "INVOKE_FUNCTION",
  contract_address: CONTRACT_ADDRESS,
  entry_point_selector: getSelectorFromName("init_pool"),
  calldata: ["1000000", "1000000"],
});
console.log(addTokenResponse);

/**
 * callContract() example
**/

/** Get the balance of the liquidity pool of token A **/
const poolBalanceTokenA = await defaultProvider.callContract({
  contract_address: CONTRACT_ADDRESS,
  entry_point_selector: getSelectorFromName("get_pool_token_balance"),
  calldata: ["1"],
});
const balanceA = poolBalanceTokenA.result[0];
console.log('token a liquidity pool balance: ', parseInt(balanceA, 16));

/** Get the balance of the liquidity pool of token B **/
const poolBalanceTokenB = await defaultProvider.callContract({
  contract_address: CONTRACT_ADDRESS,
  entry_point_selector: getSelectorFromName("get_pool_token_balance"),
  calldata: ["2"],
});
const balanceB = poolBalanceTokenB.result[0];
console.log('token b liquidity pool balance: ', parseInt(balanceB, 16));
```

For more information about **signing transactions**, please take a look at this [pull request](https://github.com/seanjameshan/starknet.js/pull/51)

## 🌐 API

[Click Here](https://www.starknetjs.com/modules.html)

## 🚀 Powered by Starknet.js

- [Argent X - the first StarkNet wallet](https://github.com/argentlabs/argent-x)
- [React + Starknet.js boilerplate](https://github.com/fracek/starknet-react-example)
- [AMM Demo](https://www.starknetswap.com/)

## ✏️ Contributing

If you consider to contribute to this project please read [CONTRIBUTING.md](https://github.com/seanjameshan/starknet.js/blob/main/CONTRIBUTING.md) first.

## ❤️ Special Thanks

Special thanks to all the [contributors](https://github.com/seanjameshan/starknet.js/graphs/contributors), especially to Janek ([@janek26](https://github.com/janek26)) from [Argent](https://github.com/argentlabs) for driving the development of Starknet.js.

This library would not be possible without these rockstars.

## 📜 License

Copyright (c) 2021 Sean James Han

Licensed under the [MIT license](https://github.com/seanjameshan/starknet.js/blob/main/LICENSE).

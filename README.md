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

```javascript
import { defaultProvider } from 'starknet';

defaultProvider.getContractAddresses().then((data) => {
  console.log(data);
});
```

## 🌐 API

[Click Here](https://www.starknetjs.com/modules.html)

## 🚀 Powered by Starknet.js

- [Argent X - the first StarkNet wallet](https://github.com/argentlabs/argent-x)
- [React + Starknet.js boilerplate](https://github.com/fracek/starknet-react-example)

## ✏️ Contributing

If you consider to contribute to this project please read [CONTRIBUTING.md](https://github.com/seanjameshan/starknet.js/blob/main/CONTRIBUTING.md) first.

## ❤️ Special Thanks

Special thanks to all the [contributors](https://github.com/seanjameshan/starknet.js/graphs/contributors), and especially Janek ([@janek26](https://github.com/janek26)) from [Argent](https://github.com/argentlabs) for driving the development of Starknet.js.

This library would not be possible without these rockstars.

## 📜 License

Copyright (c) 2021 Sean James Han

Licensed under the [MIT license](https://github.com/seanjameshan/starknet.js/blob/main/LICENSE).

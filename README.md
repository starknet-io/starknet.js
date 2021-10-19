<!-- logo -->
<p align="center">
  <img width='300' src="https://raw.githubusercontent.com/seanjameshan/starknet.js/main/img/logo.svg">
</p>

<!-- tag line -->
<h4 align='center'> JavaScript library for StarkNet.</h4>

<!-- primary badges -->
<p align="center">
  <a href="https://github.com/seanjameshan/starknet.js/actions">
    <img src="https://img.shields.io/github/workflow/status/seanjameshan/starknet.js/Node.js%20CI/main">
  </a>
  <a href="https://www.npmjs.com/package/starknet">
    <img src='https://img.shields.io/github/package-json/v/seanjameshan/starknet.js?label=npm' />
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

Import `starknet` and use the [API](https://github.com/seanjameshan/starknet.js/blob/main/docs)

```javascript
import starknet from 'starknet';

starknet.getContractAddresses().then((data) => {
  console.log(data);
});
```

## 🌐 API

[Click Here](https://github.com/seanjameshan/starknet.js/blob/main/docs)

## License

Copyright (c) 2021 Sean James Han

Licensed under the MIT license.

<!-- logo -->
<p align="center">
  <img width='300' src="https://raw.githubusercontent.com/seanjameshan/starknet.js/main/img/logo.svg">
</p>

<!-- tag line -->
<h4 align='center'> JavaScript library for StarkNet.</h4>

<!-- primary badges -->
<p align="center">
  <img src='https://img.shields.io/github/package-json/v/seanjameshan/starknet.js?label=npm' />
  <img src='https://img.shields.io/bundlephobia/minzip/starknet?color=success&label=size' />
  <!-- <img src='https://img.shields.io/npm/dt/starknet?color=blueviolet' /> -->
  <img src="https://img.shields.io/badge/license-MIT-black">
  <img src='https://img.shields.io/github/stars/seanjameshan/starknet.js?color=yellow' />
  <img src='https://img.shields.io/github/followers/seanjameshan?color=red' />
  <img src="https://img.shields.io/badge/powered_by-StarkWare-navy">
</p>

## 🕹️ Usage
Install the starknet with `npm`
```bash
$ npm install starknet
```
Import `starknet` and use the [API](https://github.com/seanjameshan/starknet.js/blob/main/docs/Home.md)
```javascript
import starknet from 'starknet';

starknet.getContractAddresses().then((data) => {
  console.log(data);
});
```

## 🌐 API
[Click Here](https://github.com/seanjameshan/starknet.js/blob/main/docs/Home.md)

## License
Copyright (c) 2021 Sean James Han

Licensed under the MIT license.

<!-- logo -->
<p align="center">
  <img width='300' src="https://raw.githubusercontent.com/seanjameshan/starknet.js/main/img/logo.svg">
</p>

<!-- tag line -->
<h4 align='center'> JavaScript library for StarkNet.</h4>

<!-- primary badges -->
<p align="center">
  <img src='https://img.shields.io/github/package-json/v/seanjameshan/starknet.js?color=blue&label=npm&style=flat' />
  <img src='https://img.shields.io/bundlephobia/minzip/starknet?color=success&label=size' />
  <img src='https://img.shields.io/npm/dt/starknet?color=blueviolet' />
  <img src='https://img.shields.io/github/stars/seanjameshan/starknet.js?style=social&color=%23FFB31A' />
<img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square">
<img src="https://img.shields.io/badge/powered_by-StarkWare-navy?style=flat-square">
</p>

## 🕹️ Usage
Install the starknet with `npm`
```bash
$ npm install starknet
```
Import `starknet` and use the [API](https://github.com/seanjameshan/starknet.js/blob/main/docs)
```javascript
import starknet from 'starknet';

starknet.getContractAddresses().then((data) => {
	console.log(data)
})
```

## 🌐 API
[Click Here](https://github.com/seanjameshan/starknet.js/blob/main/docs)

## License
Copyright (c) 2021 Sean James Han
Licensed under the MIT license.

---
sidebar_position: 6
---

# Utils

Util functions are provided so you can use low level functions in your application.

## `address`

the address helpers can be imported using:

```js
import { address } from 'starknet.js';
```

### `getChecksumAddress(address: BigNumberish): string`

This function accepts an address as a `BigNumberish` and returns the checksummed address as a string.
An example:

```js
import { address } from 'starknet.js';

const addressToCheck = '0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914';

const checksummedAddress = address.getChecksumAddress(addressToCheck);

console.log(checksummedAddress); // 0x02FD23D9182193775423497Fc0c472E156C57C69E4089a1967fb288a2D84e914
```

### `validateChecksumAddress(address: string): boolean`

This function validates the checksum address. It returns true if the address is valid, false otherwise.

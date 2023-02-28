/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
// import { hexToBytes as oldHexToBytes } from 'ethereum-cryptography/utils';

// import {hexToBytes} from '@noble/curves/abstract/utils'
import { encode, number } from '..';

const aHex = '0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775';
// const aBytes=oldHexToBytes(aHex);
const aECbytes = number.hexToBytes(aHex);
// console.log("aBtyes =",aBytes);
const a1Final = encode.buf2hex(aECbytes);
console.log('a1Final =', a1Final);

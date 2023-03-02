/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
// import { hexToBytes as oldHexToBytes } from 'ethereum-cryptography/utils';

// import {hexToBytes} from '@noble/curves/abstract/utils'
import { ec, encode, getChecksumAddress, number } from '..';

const a = number.toFelt('0x02');

const aHex = '0x162da33a4585851fe8d3af3c2a9c60b557814e221e0d4f30ff0b2189d9c7775';
// const aBytes=oldHexToBytes(aHex);
const aECbytes = number.hexToBytes(aHex);
// console.log("aBtyes =",aBytes);
const a1Final = encode.buf2hex(aECbytes);
const rd = ec.genKeyPair();
console.log('a1Final =', a1Final);
console.log(a, rd);
const adr = '0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914';
// const ha = hash.keccakBn(pk);
// const hb = hash.starknetKeccak(pk);
const cs = getChecksumAddress(adr);
console.log('cs =', cs);

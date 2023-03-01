import { toHex } from '../utils/number/number';
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// V4
import { ec, encode, hash } from '..';

const privateKey = '0x5b7d4f8710b3581ebb2b8b74efaa23d25ab0ffea2a4f3e269bf91bf9f63d634';
const keyPair = ec.getKeyPair(privateKey);
console.log('priv=', toHex(keyPair.getPrivate()));
console.log('pub=', keyPair.getPublic());
const fullPubKey = encode.addHexPrefix(keyPair.getPublic('hex')); // 512 bits
const starknetPubKey: string = ec.getStarkKey(keyPair); // 256 bits
console.log('fullpubKey    =', fullPubKey);
console.log('starknetPubKey= ', starknetPubKey);

const message = ['0x53463473467', '0x879678967', '0x67896789678'];
const msgHash = hash.computeHashOnElements(message);
const signature = ec.sign(keyPair, msgHash);

const inferredKeyPair = ec.getKeyPairFromPublicKey(fullPubKey);
const isVerified = ec.verify(inferredKeyPair, msgHash, signature);
console.log('isVerified =', isVerified);

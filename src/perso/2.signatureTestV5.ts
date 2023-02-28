/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
import { ec, encode, hash } from '..';

const privKeyRandom = ec.starkCurve.utils.randomPrivateKey;

// V5
const privateKey = '0x5b7d4f8710b3581ebb2b8b74efaa23d25ab0ffea2a4f3e269bf91bf9f63d633';
const pubKeySource = ec.starkCurve.getPublicKey(privateKey, false); // complete
const starknetPubKey = ec.starkCurve.getStarkKey(privateKey); // only X part
console.log('fullpubKey    =', encode.buf2hex(pubKeySource));
console.log('starknetPubKey= ', starknetPubKey);

const message = ['0x53463473467', '0x879678967', '0x67896789678'];
const msgHash = hash.computeHashOnElements(message);
const signature = ec.starkCurve.sign(msgHash, privateKey);

const verifStarknet = ec.starkCurve.verify(signature, msgHash, starknetPubKey);
console.log('verifStarknet =', verifStarknet);
const verifFull = ec.starkCurve.verify(signature, msgHash, pubKeySource);
console.log('verifFull =', verifFull);

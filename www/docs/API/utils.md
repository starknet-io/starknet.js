---
sidebar_position: 6
---

# Utils

Util functions are provided so you can use various low level functions in your application.

## **address**

Helper functions for starknet addresses.

### validateAndParseAddress

`validateAndParseAddress(address: BigNumberish): string`

Checks if the address is valid and, if it is, parses it to the correct format (0x prefix is added if not provided).

### getChecksumAddress

`getChecksumAddress(address: BigNumberish): string`

This function accepts an address as a `BigNumberish` and returns the checksummed address as a string.
An example:

```js
import { address } from 'starknet.js';

const addressToCheck = '0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914';

const checksummedAddress = address.getChecksumAddress(addressToCheck);

console.log(checksummedAddress); // 0x02FD23D9182193775423497Fc0c472E156C57C69E4089a1967fb288a2D84e914
```

### validateChecksumAddress

`validateChecksumAddress(address: string): boolean`

This function validates the checksum address.

Returns true if the address is valid, false otherwise.

<hr />

## **stark**

Functions for stark specific manipulations.

### compressProgram

`compressProgram(jsonProgram: Program | string): CompressedProgram`

Function to compress compiled cairo program. Accepts a json file representing the compiled cairo program and returns a compressed cairo program.

### randomAddress

`randomAddress(): string`

Function that generates a random stark address.

### makeAddress

`makeAddress(input: string): string`

Function that turns an incompatible address string into stark address format.

Returns a string.

Example: `0xdFD0F27FCe99b50909de0bDD328Aed6eAbe76BC5` -> `0xdfd0f27fce99b50909de0bdd328aed6eabe76bc5`

### formatSignature

`formatSignature(sig?: Signature): string[]`

Function that formats a Signature to BigNum and then to string array.

Returns a string array.

### compileCalldata

`compileCalldata(args: RawArgs): Calldata`

Function that creates calldata that gets sent to the contract.

```js
await this.callContract({
    contractAddress: this.address,
    entrypoint: 'is_valid_signature',
    calldata: compileCalldata({
        hash: toBN(hash).toString(),
        signature: signature.map((x) => toBN(x).toString()),
    }),
});
```

### estimatedFeeToMaxFee

`estimatedFeeToMaxFee(estimatedFee: BigNumberish, overhead: number = 0.5): BN`

Function that calculates and returns maximum fee based on the previously estimated one.

Returns a BN.

<hr />

## **number**

Various number formatting functions.

`BN` is the `BigNum` representation imported from `bn.js` library.

```js
export type BigNumberish = string | number | BN;
```

### isHex

`isHex(hex: string): boolean`

Check if number is in hex format.

### toBN

`toBN(number: BigNumberish, base?: number | 'hex'): BN`

Converts BigNumberish to BN.

Returns a BN.

### toHex

`toHex(number: BN): string`

Converts BN to hex.

Returns a string.

### hexToDecimalString

`hexToDecimalString(hex: string): string`

Converts hex string to decimal string.

### toFelt

`toFelt(num: BigNumberish): string`

Converts BN to Felt.

Returns a string.

### assertInRange

`assertInRange(input: BigNumberish, lowerBound: BigNumberish, upperBound: BigNumberish, inputName = '')`

Asserts input is equal to or greater then `lowerBound` and lower then `upperBound`. Assert message specifies inputName.
`input`, `lowerBound`, and `upperBound` should be of type BN.
`inputName` should be a string.

### bigNumberishArrayToDecimalStringArray

`bigNumberishArrayToDecimalStringArray(rawCalldata: BigNumberish[]): string[]`

Convert BigNumberish array to decimal array. Used for signature conversion.

```js
const signature = await this.signer.signTransaction(transactions, signerDetails);

{
    contract_address: this.address,
    entry_point_selector: getSelectorFromName('__execute__'),
    calldata,
    version: toHex(version),
    signature: bigNumberishArrayToDecimalStringArray(signature),
}
```

### bigNumberishArrayToHexadecimalStringArray

`bigNumberishArrayToHexadecimalStringArray(rawCalldata: BigNumberish[]): string[]`

Convert BigNumberish array to hexadecimal string array. Used for signature conversion.

<hr />

## **uint256**

```js
// Represents an integer in the range [0, 2^256).
export interface Uint256 {
  // The low 128 bits of the value.
  low: BigNumberish;
  // The high 128 bits of the value.
  high: BigNumberish;
}
```

### uint256ToBN

`uint256ToBN(uint256: Uint256): BN`

Function to convert `Uint256` to `BN` (big number), which uses the `bn.js` library.

### isUint256

`isUint256(bn: BigNumberish): boolean`

Function to check if `BN` is smaller or equal to `2**256-1`.

### bnToUint256

`bnToUint256(bignumber: BigNumberish): Uint256`

Function to convert `BN` to `Uint256`.

<hr />

## **hash**

Various hashing helpers.

### starknetKeccak

`starknetKeccak(value: string): BN`

Function to get the starknet keccak hash from a string. Returns starknet keccak hash as BigNumber.

Returns starknet keccak hash as BigNumber.

### getSelectorFromName

`getSelectorFromName(funcName: string)`

Function to get the hex selector from a given function name.

Returns hex selector of given abi function name.

### pedersen

`pedersen(input: [BigNumberish, BigNumberish])`

Function to get the Pedersen hash for two arguments.

Returns a string.

### computeHashOnElements

`computeHashOnElements(data: BigNumberish[])`

Function to compute a Pedersen hash on a array of elements.

Returns a string.

### calculateTransactionHashCommon

`calculateTransactionHashCommon(txHashPrefix: TransactionHashPrefix, version: BigNumberish,contractAddress: BigNumberish, entryPointSelector: BigNumberish, calldata: BigNumberish[], maxFee: BigNumberish, chainId: StarknetChainId, additionalData: BigNumberish[] = []): string`

Calculates the transaction hash in the StarkNet network - a unique identifier of the transaction.

Called internally in `calculateDeployTransactionHash` and `calculcateTransactionHash`.

### calculateDeployTransactionHash

`calculateDeployTransactionHash(contractAddress: BigNumberish, constructorCalldata: BigNumberish[], version: BigNumberish, chainId: StarknetChainId): string`

Function that calculates the deployment transaction hash in the StarkNet network.

Internally calls `calculateTransactionHashCommon` with `TransactionHashPrefix.DEPLOY`.

### calculateTransactionHash

`calculateTransactionHash(contractAddress: BigNumberish, version: BigNumberish, entryPointSelector: BigNumberish, calldata: BigNumberish[], maxFee: BigNumberish, chainId: StarknetChainId, nonce: BigNumberish): string`

Function that internally calls `calculateTransactionHashCommon`, with `TransactionHashPrefix.INVOKE`.

```js
const hashMsg = calculcateTransactionHash(
  account,
  transactionVersion,
  getSelectorFromName('__execute__'),
  calldata,
  maxFee,
  StarknetChainId.TESTNET
);
```

### calculateContractAddressFromHash

`calculateContractAddressFromHash(salt: BigNumberish, classHash: BigNumberish, constructorCalldata: RawCalldata, deployerAddress: BigNumberish)`

Function that calculates contract address from hash.

Returns a string.

<hr />

## **ellipticCurve**

Wrapper around the javascript `elliptic` library with additional functionality.

### genKeyPair

`ec.genKeyPair()`

Generate a random key pair.

### getKeyPair

`getKeyPair(pk: BigNumberish): KeyPair`

Get a key pair from a private key.

### getStarkKey

`getStarkKey(keyPair: KeyPair): string`

Public key defined over a Stark-friendly elliptic curve that is different from the standard Ethereum elliptic curve

### getKeyPairFromPublicKey

`getKeyPairFromPublicKey(publicKey: BigNumberish): KeyPair`

Takes a public key and casts it into `elliptic` KeyPair format.

Returns keyPair with public key only, which can be used to verify signatures, but can't sign anything.

### sign

`sign(keyPair: KeyPair, msgHash: string): Signature`

Signs a message using the provided key.

keyPair should be an KeyPair with a valid private key.

Returns an Signature.

### verify

`verify(keyPair: KeyPair | KeyPair[], msgHash: string, sig: Signature): boolean`

Verifies a message using the provided key.

keyPair should be an KeyPair with a valid public key.

sig should be an Signature.

Returns true if the verification succeeds.

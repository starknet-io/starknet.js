import {
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  InvocationsSignerDetails,
  Signature,
  TypedData,
} from '../types';

export abstract class SignerInterface {
  /**
   * Method to get the public key of the signer
   *
   * @returns format: hex-string
   * @example
   * ```typescript
   * const publicKey: string = await getPubKey();
   * // result publicKey = "0x0439a0e4b446c2672e3191e1f8c6c4f4f8d0735a5b2b9369c162f84967cb6bb28588c7e3f3d19a3f4875d1465c1e21ad4c30b7a5ecf87e23c30b9371097cb8f9a"
   * ```
   */
  public abstract getPubKey(): Promise<string>;

  /**
   * Signs a JSON object for off-chain usage with the Starknet private key and returns the signature
   * This adds a message prefix so it can't be interchanged with transactions
   *
   * @param typedData - JSON object to be signed
   * @param accountAddress
   * @returns A promise that resolves to a Signature object
   * @example  
   * ```typescript
*const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

*const signer = new StarknetSigner(privateKey);

*const typedData = {
 * types: {
  *  EIP712Domain: [
  *    { name: 'name', type: 'string' },
  *    { name: 'version', type: 'string' },
  *    { name: 'chainId', type: 'uint256' },
  *    { name: 'verifyingContract', type: 'address' },
  *  ],
  *  Message: [
  *    { name: 'from', type: 'address' },
  *    { name: 'to', type: 'address' },
   *   { name: 'value', type: 'uint256' },
   * ],
  *},
  *primaryType: 'Message',
 * domain: {
  *  name: 'Starknet',
  *  version: '1',
   * chainId: 1,
  *  verifyingContract: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
 * },
 * message: {
 *   from: '0x1234567890abcdef',
  *  to: '0xabcdef1234567890abcdef1234567890abcdef',
  *  value: '0x1234567890abcdef',
  *},
*};

* const accountAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

* const signature = await signer.signMessage(typedData, accountAddress);
* console.log(signature);
// Output: {"signature_r":: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', "signature_s":: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' }
*```
   */
  public abstract signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;

  /**
   * Signs transactions with the Starknet private key and returns the signature
   *
   * @param transactions - Array of Call objects, each including:<br/>
   *  - contractAddress<br/>
   *  - entrypoint<br/>
   *  - calldata<br/>
   * @param transactionsDetail - InvocationsSignerDetails object with:<br/>
   *  - walletAddress<br/>
   *  - chainId<br/>
   *  - cairoVersion<br/>
   *  - maxFee<br/>
   *  - version<br/>
   *  - nonce<br/>
  * @example
   *```typescript
*const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

*const signer = new StarknetSigner(privateKey);

*const transactions: Call[] = [
 * {
*contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    *  entrypoint: 'transfer',
    *calldata: ['0x1234567890abcdef', '0xabcdef1234567890'],
 * },
  *{
 *   contractAddress: '0xabcdef1234567890abcdef1234567890abcdef',
  *  entrypoint: 'approve',
  *  calldata: ['0x1234567890abcdef', '0xabcdef1234567890'],
 * },
*];

*const transactionsDetail: InvocationsSignerDetails = {
 * walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
 * chainId: 1,
 * cairoVersion: 1,
  *maxFee: '0x1234567890abcdef',
 * version: 1,
 * nonce: 1,
*};

*const signature = await signer.signTransaction(transactions, transactionsDetail);
*console.log(signature);
// Output: {"signature_r":: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', "signature_s":: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' }
```
   */
  public abstract signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails
  ): Promise<Signature>;

  /**
   * Signs a DEPLOY_ACCOUNT transaction with the Starknet private key and returns the signature
   *
   * @param transaction<br/>
   * - contractAddress<br/>
   * - chainId<br/>
   * - classHash<br/>
   * - constructorCalldata<br/>
   * - addressSalt<br/>
   * - maxFee<br/>
   * - version<br/>
   * - nonce<br/>
   * 
   * ```typescript
   * @example
   const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

  *const signer = new StarknetSigner(privateKey);

  *const transaction: DeployAccountSignerDetails = {
  *contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
 * chainId: 1,
  *classHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
 * constructorCalldata: ['0x1234567890abcdef', '0xabcdef1234567890'],
 * addressSalt: '0xabcdef1234567890abcdef1234567890abcdef',
 * maxFee: '0x1234567890abcdef',
  *version: 1,
  *nonce: 1,
* };

*const signature = await signer.signDeployAccountTransaction(transaction);
*console.log(signature);
// Output: {"signature_r":: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', "signature_s":: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' }
   * ```
   */
  public abstract signDeployAccountTransaction(
    transaction: DeployAccountSignerDetails
  ): Promise<Signature>;

  /**
   * Signs a DECLARE transaction with the Starknet private key and returns the signature
   *
   * @param transaction<br/>
   * - classHash<br/>
   * - compiledClassHash? - used for Cairo1<br/>
   * - senderAddress<br/>
   * - chainId<br/>
   * - maxFee<br/>
   * - version<br/>
   * - nonce<br/>
   * ```typescript
   * @returns A promise that resolves to a Signature object.
* @example
* const privateKey = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

* const signer = new StarknetSigner(privateKey);

* const transaction: DeclareSignerDetails = {
 *   classHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  *  compiledClassHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // optional, for Cairo1
 * senderAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  * chainId: 1,
 * maxFee: '0x1234567890abcdef',
  * version: 1,
 * nonce: 1,
* };

* const signature = await signer.signDeclareTransaction(transaction);
*  console.log(signature);
// Output: {"signature_r":: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',   "signature_s":: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef' }
   * ``` 
   */
  public abstract signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}

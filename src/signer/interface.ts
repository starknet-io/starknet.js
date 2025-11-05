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
   * @returns {Promise<string>} hex-string public key
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const result = await mySigner.getPubKey();
   * // result = "0x566d69d8c99f62bc71118399bab25c1f03719463eab8d6a444cd11ece131616"
   * ```
   */
  public abstract getPubKey(): Promise<string>;

  /**
   * Signs a JSON object for off-chain usage with the private key and returns the signature.
   * This adds a message prefix so it can't be interchanged with transactions
   *
   * @param {TypedData} typedData - JSON object to be signed
   * @param {string} accountAddress - Hex string of the account's address
   * @returns {Promise<Signature>} the signature of the message
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myTypedData: TypedData = {
   *   domain: {
   *     name: "Example DApp",
   *     chainId: constants.StarknetChainId.SN_SEPOLIA,
   *     version: "0.0.3"
   *   },
   *   types: {
   *     StarkNetDomain: [
   *       { name: "name", type: "string" },
   *       { name: "chainId", type: "felt" },
   *       { name: "version", type: "string" }
   *     ],
   *     Message: [{ name: "message", type: "felt" }]
   *   },
   *   primaryType: "Message",
   *   message: { message: "1234" }
   * };
   * const result = await mySigner.signMessage(myTypedData, "0x5d08a4e9188429da4e993c9bf25aafe5cd491ee2b501505d4d059f0c938f82d");
   * // result = Signature {r: 684915484701699003335398790608214855489903651271362390249153620883122231253n,
   * // s: 1399150959912500412309102776989465580949387575375484933432871778355496929189n, recovery: 1}
   * ```
   */
  public abstract signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;

  /**
   * Signs INVOKE transactions with the private key and returns the signature
   *
   * @param {Call[]} transactions - Array of Call objects representing the transactions
   * @param {InvocationsSignerDetails} transactionsDetail - Transaction details including V3 fields
   * @returns {Promise<Signature>} the signature of the transaction
   * @remarks Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const calls: Call[] = [{
   *   contractAddress: "0x1234567890123456789012345678901234567890",
   *   entrypoint: "transfer",
   *   calldata: ["0xRecipient", "1000", "0"]
   * }];
   * const transactionsDetail: InvocationsSignerDetails = {
   *   walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
   *   chainId: constants.StarknetChainId.SN_MAIN,
   *   cairoVersion: "1",
   *   version: "0x3",
   *   nonce: 1,
   *   resourceBounds: {
   *     l1_gas: { amount: "0x1000", price: "0x20" },
   *     l2_gas: { amount: "0x200", price: "0x5" },
   *     l1_data_gas: { amount: "0x500", price: "0x10" }
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1
   * };
   * const result = await mySigner.signTransaction(calls, transactionsDetail);
   * // result = Signature {r: 304910226421970384958146916800275294114105560641204815169249090836676768876n,
   * //   s: 1072798866000813654190523783606274062837012608648308896325315895472901074693n, recovery: 0}
   * ```
   */
  public abstract signTransaction(
    transactions: Call[],
    transactionsDetail: InvocationsSignerDetails
  ): Promise<Signature>;

  /**
   * Signs a DEPLOY_ACCOUNT transaction with the private key and returns the signature
   *
   * @param {DeployAccountSignerDetails} transaction - Transaction details to deploy an account contract
   * @returns {Promise<Signature>} the signature of the transaction to deploy an account
   * @remarks Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myDeployAcc: DeployAccountSignerDetails = {
   *   contractAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
   *   version: "0x3",
   *   chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
   *   constructorCalldata: ["0x123", "0x456"],
   *   addressSalt: "0x789",
   *   nonce: 0,
   *   resourceBounds: {
   *     l1_gas: { amount: "0x1000", price: "0x20" },
   *     l2_gas: { amount: "0x200", price: "0x5" },
   *     l1_data_gas: { amount: "0x500", price: "0x10" }
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1
   * };
   * const result = await mySigner.signDeployAccountTransaction(myDeployAcc);
   * // result = Signature {r: 2871311234341436528393212130310036951068553852419934781736214693308640202748n,
   * //  s: 1746271646048888422437132495446973163454853863041370993384284773665861377605n, recovery: 1}
   * ```
   */
  public abstract signDeployAccountTransaction(
    transaction: DeployAccountSignerDetails
  ): Promise<Signature>;

  /**
   * Signs a DECLARE transaction with the private key and returns the signature
   *
   * @param {DeclareSignerDetails} transaction - Transaction details to declare a contract class
   * @returns {Promise<Signature>} the signature of the transaction to declare a class
   * @remarks Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myDeclare: DeclareSignerDetails = {
   *   version: "0x3",
   *   chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   senderAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
   *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
   *   compiledClassHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
   *   nonce: 45,
   *   resourceBounds: {
   *     l1_gas: { amount: "0x1000", price: "0x20" },
   *     l2_gas: { amount: "0x200", price: "0x5" },
   *     l1_data_gas: { amount: "0x500", price: "0x10" }
   *   },
   *   tip: 0,
   *   paymasterData: [],
   *   accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1
   * };
   * const result = await mySigner.signDeclareTransaction(myDeclare);
   * // result = Signature {r: 2432056944313955951711774394836075930010416436707488863728289188289211995670n,
   * //  s: 3407649393310177489888603098175002856596469926897298636282244411990343146307n, recovery: 1}
   * ```
   */
  public abstract signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}

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
   * @returns {string} hex-string
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
   * @param {TypedData} typedData JSON object to be signed
   * @param {string} accountAddress Hex string of the account's address
   * @returns {Promise<Signature>} the signature of the message
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   *     const myTypedData: TypedData = {
   *         domain: {name: "Example DApp",
   *           chainId: constants.StarknetChainId.SN_SEPOLIA,
   *           version: "0.0.3"},
   *         types: {StarkNetDomain: [
   *             { name: "name", type: "string" },
   *             { name: "chainId", type: "felt" },
   *             { name: "version", type: "string" }],
   *           Message: [{ name: "message", type: "felt" }]},
   *         primaryType: "Message", message: {message: "1234"}};
   *     const result = await mySigner.signMessage(myTypedData,"0x5d08a4e9188429da4e993c9bf25aafe5cd491ee2b501505d4d059f0c938f82d");
   * // result = Signature {r: 684915484701699003335398790608214855489903651271362390249153620883122231253n,
   * // s: 1399150959912500412309102776989465580949387575375484933432871778355496929189n, recovery: 1}
   * ```

   */
  public abstract signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;

  /**
   * Signs transactions with the private key and returns the signature
   *
   * @param {Call[]} transactions array of Call objects
   * @param {InvocationsSignerDetails} transactionsDetail InvocationsSignerDetails object
   * @returns {Promise<Signature>} the signature of the transaction
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const calls: Call[] = [{
   *     contractAddress: "0x1234567890123456789012345678901234567890",
   *     entrypoint: "functionName",
   *     calldata: [1, 2, 3]
   * }];
   * const transactionsDetail: InvocationsSignerDetails = {
   *     walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
   *     chainId: constants.StarknetChainId.SN_MAIN,
   *     cairoVersion: "1",
   *     maxFee: '0x1234567890abcdef',
   *     version: "0x0", nonce: 1};
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
   * @param {DeployAccountSignerDetails} transaction to deploy an account contract
   * @returns {Promise<Signature>} the signature of the transaction to deploy an account
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myDeployAcc: DeployAccountSignerDetails = {
   *   contractAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
   *   version: "0x2", chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
   *   constructorCalldata: [1, 2],addressSalt: 1234,
   *   nonce: 45, maxFee: 10 ** 15, tip: 0, paymasterData: [],accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   resourceBounds: stark.estimateFeeToBounds(constants.ZERO),
   * }
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
   * @param {DeclareSignerDetails} transaction to declare a class
   * @returns {Promise<Signature>} the signature of the transaction to declare a class
   * @example
   * ```typescript
   * const mySigner = new Signer("0x123");
   * const myDeclare: DeclareSignerDetails = {
   *   version: "0x2", chainId: constants.StarknetChainId.SN_SEPOLIA,
   *   senderAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
   *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
   *   nonce: 45, maxFee: 10 ** 15, tip: 0, paymasterData: [], accountDeploymentData: [],
   *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
   *   resourceBounds: stark.estimateFeeToBounds(constants.ZERO),
}
   * const result = await mySigner.signDeclareTransaction(myDeclare);
   * // result = Signature {r: 2432056944313955951711774394836075930010416436707488863728289188289211995670n,
   * //  s: 3407649393310177489888603098175002856596469926897298636282244411990343146307n, recovery: 1}
   * ```
   */
  public abstract signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}

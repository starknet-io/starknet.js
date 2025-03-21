import { WatchAssetParameters, TypedData } from 'starknet-types-07';
import { prepareMulticallCalldata } from 'rosettanet';
import { Account, AccountInterface } from '../account';
import {
  EthereumWindowObject,
  requestAccounts,
  watchAsset,
  sendTransaction,
  signMessage,
  requestChainId,
  switchRosettanetChain,
  getPermissions,
  personalSign,
  accounts,
  getBlockNumber,
  call,
  estimateGas,
  gasPrice,
  getBalance,
  getBlockByHash,
  getBlockByNumber,
  getBlockTransactionCountByHash,
  getBlockTransactionCountByNumber,
  getCode,
  getTransactionHashByBlockHashAndIndex,
  getTransactionHashByBlockNumberAndIndex,
  getTransactionByHash,
  getTransactionCount,
  getTransactionReceipt,
} from './rosettanetConnect';
import {
  CairoVersion,
  ProviderOptions,
  AllowArray,
  Call,
  Uint256,
  ArraySignatureType,
} from '../types';
import { ProviderInterface } from '../provider';
import {
  BLOCK_HASH,
  BLOCK_NUMBER,
  BLOCK_TAG,
  TX_REQUEST,
  TXN_HASH,
} from '../types/api/rosettaRpc/components';
import { RosettanetChainId } from '../global/constants';
import { addHexPrefix, removeHexPrefix } from '../utils/encode';
import { cairo } from '../utils/calldata';
import { toHex } from '../utils/num';

export class RosettanetAccount extends Account implements AccountInterface {
  public walletProvider: EthereumWindowObject;

  constructor(
    providerOrOptions: ProviderOptions | ProviderInterface,
    walletProvider: EthereumWindowObject,
    cairoVersion?: CairoVersion,
    address: string = ''
  ) {
    super(providerOrOptions, address, '', cairoVersion); // At this point unknown address
    this.walletProvider = walletProvider;

    if (!address.length) {
      // eslint-disable-next-line no-console
      console.warn(
        '@deprecated Use static method WalletAccount.connect or WalletAccount.connectSilent instead. Constructor {@link WalletAccount.(format:2)}.'
      );
      requestAccounts(this.walletProvider).then(([accountAddress]) => {
        this.address = accountAddress.toLowerCase();
      });
    }
  }

  /**
   * Send transaction to the wallet.
   * @param params Ethereum transaction object.
   * @returns Transaction hash.
   */
  public sendTransactionRosettanet(params: TX_REQUEST) {
    return sendTransaction(this.walletProvider, params);
  }

  /**
   * Request the current chain ID from the wallet.
   * @returns The current Wallet Chain ID.
   */
  public chainIdRosettanet() {
    return requestChainId(this.walletProvider);
  }

  /**
   * Sign typed data using the wallet. Uses personal_sign method.
   * @param message The typed data to sign.
   * @param address The wallet address to sign.
   * @returns Signatures as strings.
   */
  public personalSignRosettanet(message: string, address: string) {
    return personalSign(this.walletProvider, message, address);
  }

  /**
   * Request connected accounts
   * @returns connected accounts addresses
   */
  public accountsRosettanet() {
    return accounts(this.walletProvider);
  }

  /**
   * Request latest block number in Starknet
   * @returns latest block number in hexadecimal format
   */
  public blockNumberRosettanet() {
    return getBlockNumber(this.walletProvider);
  }

  /**
   * Call request.
   * @param tx Ethereum transaction object.
   * @returns Answer from called contract.
   */
  public callRosettanet(tx: TX_REQUEST) {
    return call(this.walletProvider, tx);
  }

  /**
   * Estimated gas fee for the transaction.
   * @param tx Ethereum transaction object.
   * @returns Estimated gas amount.
   */
  public estimateGasRosettanet(tx: TX_REQUEST) {
    return estimateGas(this.walletProvider, tx);
  }

  /**
   * Latest gas price in network.
   * @returns Latest gas price.
   */
  public gasPriceRosettanet() {
    return gasPrice(this.walletProvider);
  }

  /**
   * STRK balance of given address.
   * @param address Address to check balance.
   * @param block Block number or hash. (optional)
   * @returns STRK balance.
   */
  public getBalanceRosettanet(
    address: string,
    block: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG = 'latest'
  ) {
    return getBalance(this.walletProvider, address, block);
  }

  /**
   * Block by given block hash.
   * @param blockHash Block hash.
   * @param hydratedTx Hydrated transactions (optional)
   * @returns Block by given block hash.
   */
  public getBlockByHashRosettanet(blockHash: BLOCK_HASH, hydratedTx: boolean = false) {
    return getBlockByHash(this.walletProvider, blockHash, hydratedTx);
  }

  /**
   * Block by given block number.
   * @param blockNumber Block number or block tag.
   * @param hydratedTx Hydrated transactions (optional)
   * @returns Block by given block number.
   */
  public getBlockByNumberRosettanet(
    blockNumber: BLOCK_NUMBER | BLOCK_TAG,
    hydratedTx: boolean = false
  ) {
    return getBlockByNumber(this.walletProvider, blockNumber, hydratedTx);
  }

  /**
   * Transaction count of given block hash.
   * @param blockHash Block hash.
   * @returns Transaction count of given block hash.
   */
  public getBlockTransactionCountByHashRosettanet(blockHash: BLOCK_HASH) {
    return getBlockTransactionCountByHash(this.walletProvider, blockHash);
  }

  /**
   * Transaction count of given block number.
   * @param blockNumber Block number or block tag..
   * @returns Transaction count of given block number.
   */
  public getBlockTransactionCountByNumberRosettanet(blockNumber: BLOCK_NUMBER | BLOCK_TAG) {
    return getBlockTransactionCountByNumber(this.walletProvider, blockNumber);
  }

  public getCodeRosettanet(
    address: string,
    block: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG = 'latest'
  ) {
    return getCode(this.walletProvider, address, block);
  }

  public getTransactionHashByBlockHashAndIndexRosettanet(blockHash: BLOCK_HASH, index: string) {
    return getTransactionHashByBlockHashAndIndex(this.walletProvider, blockHash, index);
  }

  public getTransactionHashByBlockNumberAndIndexRosettanet(
    blockNumber: BLOCK_NUMBER | BLOCK_TAG,
    index: string
  ) {
    return getTransactionHashByBlockNumberAndIndex(this.walletProvider, blockNumber, index);
  }

  public getTransactionByHashRosettanet(txHash: TXN_HASH) {
    return getTransactionByHash(this.walletProvider, txHash);
  }

  /**
   * Transaction count of given address.
   * @param address address.
   * @returns Transaction count of given address.
   */
  public getTransactionCountRosettanet(
    address: string,
    block: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG = 'latest'
  ) {
    return getTransactionCount(this.walletProvider, address, block);
  }

  /**
   * Transaction receipt of given transaction hash.
   * @param txHash address.
   * @returns Transaction receipt of given transaction hash.
   */
  public getTransactionReceiptRosettanet(txHash: TXN_HASH) {
    return getTransactionReceipt(this.walletProvider, txHash);
  }

  // WALLET ACCOUNT METHODS

  public requestAccounts() {
    return requestAccounts(this.walletProvider);
  }

  /**
   * Request Permission for wallet account
   * @returns allowed accounts addresses
   */
  public getPermissions() {
    if (this.walletProvider.name === 'Coinbase Wallet') {
      throw new Error('Get permissions Method not found in Coinbase Wallet');
    }
    return getPermissions(this.walletProvider);
  }

  public switchStarknetChain(chainId: RosettanetChainId) {
    return switchRosettanetChain(this.walletProvider, chainId);
  }

  /**
   * Request adding ERC20 Token to Wallet List
   * @param asset WatchAssetParameters
   * @returns boolean
   */
  public watchAsset(asset: WatchAssetParameters) {
    return watchAsset(this.walletProvider, asset);
  }

  override declare(): Promise<{ transaction_hash: string; class_hash: string }> {
    throw new Error('Declare Method not implemented in Rosettanet Account Class.');
  }

  override deploy(): Promise<{ transaction_hash: string; contract_address: string[] }> {
    throw new Error('Deploy Method not implemented in Rosettanet Account Class.');
  }

  /**
   * Sign typed data using the wallet. Uses eth_signTypedData_v4 method.
   * @param message The typed data to sign.
   * @returns Signature as strings.
   */
  override async signMessage(message: TypedData) {
    const evmSignedHash = await signMessage(this.walletProvider, message, this.address);

    if (!evmSignedHash || (evmSignedHash.length !== 132 && evmSignedHash.length !== 130)) {
      throw new Error('Ethereum Signature error');
    }

    const signedHashWithoutPrefix = removeHexPrefix(evmSignedHash);
    const r: Uint256 = cairo.uint256(addHexPrefix(signedHashWithoutPrefix.slice(0, 63))); // First 64 chars → r (32 bytes)
    const s: Uint256 = cairo.uint256(addHexPrefix(signedHashWithoutPrefix.slice(64, 127))); // Next 64 chars → s (32 bytes)
    const v = addHexPrefix(signedHashWithoutPrefix.slice(128, 130)); // Last 2 chars → v (1 byte)

    if (v !== '0x1c' && v !== '0x1b') {
      throw new Error('Invalid Ethereum Signature');
    }

    return [
      toHex(r.low),
      toHex(r.high),
      toHex(s.low),
      toHex(s.high),
      toHex(v),
    ] as ArraySignatureType;
  }

  override async execute(calls: AllowArray<Call>): Promise<{ transaction_hash: string }> {
    const txCalls = [].concat(calls as any).map((it) => {
      const { contractAddress, entrypoint, calldata } = it;
      return {
        contract_address: contractAddress,
        entry_point: entrypoint,
        calldata,
      };
    });

    const params = {
      calls: txCalls,
    };

    const txData = prepareMulticallCalldata(params.calls);

    const txObject = {
      from: this.address,
      to: this.address,
      data: txData,
      value: '0x0',
    };

    const txHash = await sendTransaction(this.walletProvider, txObject);
    return { transaction_hash: txHash };
  }

  static async connect(
    provider: ProviderInterface,
    walletProvider: EthereumWindowObject,
    cairoVersion?: CairoVersion
  ) {
    const [accountAddress] = await requestAccounts(walletProvider);
    return new RosettanetAccount(provider, walletProvider, cairoVersion, accountAddress);
  }

  static async connectSilent(
    provider: ProviderInterface,
    walletProvider: EthereumWindowObject,
    cairoVersion?: CairoVersion
  ) {
    const [accountAddress] = await requestAccounts(walletProvider);
    return new RosettanetAccount(provider, walletProvider, cairoVersion, accountAddress);
  }
}

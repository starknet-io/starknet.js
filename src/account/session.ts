import { ZERO } from '../constants';
import { ProviderInterface, ProviderOptions } from '../provider';
import { SignerInterface } from '../signer';
import {
  Abi,
  Call,
  EstimateFee,
  EstimateFeeDetails,
  InvocationsDetails,
  InvocationsSignerDetails,
  InvokeFunctionResponse,
  KeyPair,
  Signature,
} from '../types';
import { computeHashOnElements, feeTransactionVersion, transactionVersion } from '../utils/hash';
import { BigNumberish, toBN } from '../utils/number';
import { compileCalldata, estimatedFeeToMaxFee } from '../utils/stark';
import { fromCallsToExecuteCalldataWithNonce } from '../utils/transaction';
import { Account } from './default';
import { AccountInterface } from './interface';

export interface Session {
  key: string;
  expires: number;
  root: string;
}

const SESSION_PLUGIN_CLASS_HASH = '0x0';

export class SessionAccount extends Account implements AccountInterface {
  constructor(
    providerOrOptions: ProviderOptions | ProviderInterface,
    address: string,
    keyPairOrSigner: KeyPair | SignerInterface,
    public session: Session
  ) {
    super(providerOrOptions, address, keyPairOrSigner);
  }

  private async getSessionToken(key: string, expires: number, root: string): Promise<Signature> {
    const session = [key, expires, root];
    const hash = computeHashOnElements(session);
    return this.signer.signMessage(
      { domain: {}, types: {}, primaryType: '', message: { hash } },
      ''
    );
  }

  private async sessionToCall(session: Session): Promise<Call> {
    const sessionToken = await this.getSessionToken(session.key, session.expires, session.root);
    return {
      contractAddress: this.address,
      entrypoint: 'use_plugin',
      calldata: compileCalldata({
        SESSION_PLUGIN_CLASS_HASH,
        signer: await this.signer.getPubKey(),
        expires: session.expires.toString(),
        token1: sessionToken[0],
        token2: sessionToken[1],
        root: session.root,
        proof: [],
      }),
    };
  }

  private async extendCallsBySession(calls: Call[], session: Session): Promise<Call[]> {
    return [await this.sessionToCall(session), ...calls];
  }

  public async estimateFee(
    calls: Call | Call[],
    { nonce: providedNonce, blockIdentifier }: EstimateFeeDetails = {}
  ): Promise<EstimateFee> {
    const transactions = await this.extendCallsBySession(
      Array.isArray(calls) ? calls : [calls],
      this.session
    );
    const nonce = providedNonce ?? (await this.getNonce());
    const version = toBN(feeTransactionVersion);

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce: toBN(nonce),
      maxFee: ZERO,
      version,
      chainId: this.chainId,
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails);

    const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);
    const response = await super.getEstimateFee(
      { contractAddress: this.address, entrypoint: '__execute__', calldata, signature },
      blockIdentifier,
      { version }
    );

    const suggestedMaxFee = estimatedFeeToMaxFee(response.overall_fee);

    return {
      ...response,
      suggestedMaxFee,
    };
  }

  /**
   * Invoke execute function in account contract
   *
   * [Reference](https://github.com/starkware-libs/cairo-lang/blob/f464ec4797361b6be8989e36e02ec690e74ef285/src/starkware/starknet/services/api/gateway/gateway_client.py#L13-L17)
   *
   * @param calls - one or more calls to be executed
   * @param abis - one or more abis which can be used to display the calls
   * @param transactionsDetail - optional transaction details
   * @returns a confirmation of invoking a function on the starknet contract
   */
  public async execute(
    calls: Call | Call[],
    abis: Abi[] | undefined = undefined,
    transactionsDetail: InvocationsDetails = {}
  ): Promise<InvokeFunctionResponse> {
    const transactions = await this.extendCallsBySession(
      Array.isArray(calls) ? calls : [calls],
      this.session
    );
    const nonce = toBN(transactionsDetail.nonce ?? (await this.getNonce()));
    let maxFee: BigNumberish = '0';
    if (transactionsDetail.maxFee || transactionsDetail.maxFee === 0) {
      maxFee = transactionsDetail.maxFee;
    } else {
      const { suggestedMaxFee } = await this.estimateFee(transactions, { nonce });
      maxFee = suggestedMaxFee.toString();
    }

    const version = toBN(transactionVersion);

    const signerDetails: InvocationsSignerDetails = {
      walletAddress: this.address,
      nonce,
      maxFee,
      version,
      chainId: this.chainId,
    };

    const signature = await this.signer.signTransaction(transactions, signerDetails, abis);

    const calldata = fromCallsToExecuteCalldataWithNonce(transactions, nonce);

    return this.invokeFunction(
      { contractAddress: this.address, entrypoint: '__execute__', calldata, signature },
      {
        maxFee,
        version,
      }
    );
  }
}

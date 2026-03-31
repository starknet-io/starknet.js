import {
  type RpcProvider,
  type Account,
  PaymasterRpc,
  OutsideExecutionVersion,
  num,
  cairo,
} from '../src';
import type { PaymasterDetails, PaymasterFeeEstimate, TokenData } from '../src/plugins/paymaster';
import { describeIfTestnet, getTestAccount, getTestProvider, STRKtokenAddress } from './config';

describeIfTestnet('Paymaster with Account, in Testnet', () => {
  let provider: RpcProvider;
  let myAccount: Account;
  const feesDetails: PaymasterDetails = {
    feeMode: { mode: 'default', gasToken: STRKtokenAddress },
  };

  beforeAll(async () => {
    provider = getTestProvider(false);
    const paymasterRpc = new PaymasterRpc({ nodeUrl: 'https://sepolia.paymaster.avnu.fi' });
    myAccount = getTestAccount(provider, undefined, paymasterRpc);
    const isAccountCompatibleSnip9 = await myAccount.getSnip9Version();
    expect(isAccountCompatibleSnip9).not.toBe(OutsideExecutionVersion.UNSUPPORTED);
    const isPaymasterAvailable = await myAccount.isPaymasterAvailable();
    expect(isPaymasterAvailable).toBe(true);
  });

  test('Get list of tokens', async () => {
    const supported: TokenData[] = await myAccount.getPaymasterSupportedTokens();
    const containsStrk = supported.some(
      (data: TokenData) => data.token_address === num.cleanHex(STRKtokenAddress)
    );
    expect(containsStrk).toBe(true);
  });

  test('Estimate fee with Paymaster', async () => {
    const estimation: PaymasterFeeEstimate = await myAccount.estimatePaymasterTransactionFee(
      [
        {
          contractAddress: STRKtokenAddress,
          entrypoint: 'transfer',
          calldata: ['0x010101', cairo.uint256(10)],
        },
      ],
      feesDetails
    );
    expect(estimation.suggested_max_fee_in_gas_token).toBeDefined();
  });

  test('Execute with Paymaster', async () => {
    const res1 = await myAccount.executePaymasterTransaction(
      [
        {
          contractAddress: STRKtokenAddress,
          entrypoint: 'transfer',
          calldata: ['0x010101', cairo.uint256(100)],
        },
      ],
      feesDetails
    );
    const txR1 = await provider.waitForTransaction(res1.transaction_hash);
    expect(txR1.isSuccess()).toBe(true);

    const res2 = await myAccount.executePaymasterTransaction(
      [
        {
          contractAddress: STRKtokenAddress,
          entrypoint: 'transfer',
          calldata: ['0x010101', cairo.uint256(101)],
        },
      ],
      feesDetails,
      1n * 10n ** 18n
    );
    const txR2 = await provider.waitForTransaction(res2.transaction_hash);
    expect(txR2.isSuccess()).toBe(true);
  });
});

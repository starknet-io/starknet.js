import {
  type RpcProvider,
  type Account,
  Contract,
  PaymasterRpc,
  OutsideExecutionVersion,
  type TokenData,
  num,
  type PaymasterDetails,
  cairo,
  type PaymasterFeeEstimate,
} from '../src';
import { describeIfTestnet, getTestProvider } from './config/fixtures';
import { getTestAccount, STRKtokenAddress } from './config/fixturesInit';

describeIfTestnet('Paymaster with Contract, in Testnet', () => {
  let provider: RpcProvider;
  let myAccount: Account;
  let strkContract: Contract;
  const feesDetails: PaymasterDetails = {
    feeMode: { mode: 'default', gasToken: STRKtokenAddress },
  };

  beforeAll(async () => {
    provider = getTestProvider(false);
    const paymasterRpc = new PaymasterRpc({ nodeUrl: 'https://sepolia.paymaster.avnu.fi' });
    myAccount = getTestAccount(provider, undefined, paymasterRpc);
    // console.log(myAccount.paymaster);
    const isAccountCompatibleSnip9 = await myAccount.getSnip9Version();
    expect(isAccountCompatibleSnip9).not.toBe(OutsideExecutionVersion.UNSUPPORTED);
    const isPaymasterAvailable = await myAccount.paymaster.isAvailable();
    expect(isPaymasterAvailable).toBe(true);
    strkContract = new Contract({
      abi: (await provider.getClassAt(STRKtokenAddress)).abi,
      address: STRKtokenAddress,
      providerOrAccount: myAccount,
    });
  });

  test('Get list of tokens', async () => {
    const supported: TokenData[] = await myAccount.paymaster.getSupportedTokens();
    const containsStrk = supported.some(
      (data: TokenData) => data.token_address === num.cleanHex(STRKtokenAddress)
    );
    expect(containsStrk).toBe(true);
  });

  test('Estimate fee with Paymaster in a Contract', async () => {
    const estimation = (await strkContract.estimate(
      'transfer',
      [
        '0x010101', // random address
        cairo.uint256(10), // dust of STRK
      ],
      {
        paymasterDetails: feesDetails,
      }
    )) as PaymasterFeeEstimate;
    expect(estimation.suggested_max_fee_in_gas_token).toBeDefined();
  });

  test('Contract invoke with Paymaster', async () => {
    const res1 = await strkContract.invoke('transfer', ['0x010101', cairo.uint256(100)], {
      paymasterDetails: feesDetails,
    });
    const txR1 = await provider.waitForTransaction(res1.transaction_hash);
    expect(txR1.isSuccess()).toBe(true);
    const res2 = await strkContract.invoke('transfer', ['0x010101', cairo.uint256(101)], {
      paymasterDetails: feesDetails,
      maxFeeInGasToken: 2n * 10n ** 17n,
    });
    const txR2 = await provider.waitForTransaction(res2.transaction_hash);
    expect(txR2.isSuccess()).toBe(true);
  });

  test('Contract withOptions with Paymaster', async () => {
    const res1 = await strkContract
      .withOptions({
        paymasterDetails: feesDetails,
      })
      .transfer('0x010101', cairo.uint256(102));
    const txR1 = await provider.waitForTransaction(res1.transaction_hash);
    expect(txR1.isSuccess()).toBe(true);
    const res2 = await strkContract
      .withOptions({
        paymasterDetails: feesDetails,
        maxFeeInGasToken: 2n * 10n ** 17n,
      })
      .transfer('0x010101', cairo.uint256(103));
    const txR2 = await provider.waitForTransaction(res2.transaction_hash);
    expect(txR2.isSuccess()).toBe(true);
  });
});

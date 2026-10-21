// Unit tests of the paymaster plugin. No test here reaches a node: the provider only gives the
// accounts an url.
import {
  Account,
  Contract,
  PaymasterRpc,
  RpcProvider,
  fastExecute,
  logger,
  paymasterPlugin,
  type Abi,
  type Call,
  type InvokeFunctionResponse,
  type PaymasterDetails,
  type PaymasterFeeEstimate,
  type PreparedTransaction,
} from '../src';

const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:5050/' });
const address = '0xabc';
const signer = { signMessage: jest.fn() } as any;
const paymasterUrl = 'https://paymaster.example.com';
const otherPaymasterUrl = 'https://other-paymaster.example.com';
const deploymentData: NonNullable<PaymasterDetails['deploymentData']> = {
  address: '0xabc',
  class_hash: '0x123',
  salt: '0x1',
  calldata: [],
  version: 1,
};

describe('Paymaster plugin', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('an account has the paymaster members by default', () => {
    const account = new Account({ provider, address, signer });

    expect(account.paymaster).toBeInstanceOf(PaymasterRpc);
    expect(typeof account.buildPaymasterTransaction).toBe('function');
    expect(typeof account.estimatePaymasterTransactionFee).toBe('function');
    expect(typeof account.preparePaymasterTransaction).toBe('function');
    expect(typeof account.executePaymasterTransaction).toBe('function');
  });

  test('the paymaster option sets the url of the paymaster', () => {
    const account = new Account({
      provider,
      address,
      signer,
      paymaster: { nodeUrl: paymasterUrl },
    });

    expect(account.paymaster.nodeUrl).toBe(paymasterUrl);
  });

  test('plugins: false without the paymaster option removes the paymaster methods', () => {
    const account = new Account({ provider, address, signer, plugins: false });

    expect(account.executePaymasterTransaction).toBeUndefined();
  });

  test('the paymaster option installs the paymaster plugin even with plugins: false', () => {
    const account = new Account({
      provider,
      address,
      signer,
      plugins: false,
      paymaster: { nodeUrl: paymasterUrl },
    });

    expect(typeof account.executePaymasterTransaction).toBe('function');
  });

  test('the paymaster option installs the paymaster plugin in a list without it', () => {
    const account = new Account({
      provider,
      address,
      signer,
      plugins: [fastExecute()],
      paymaster: { nodeUrl: paymasterUrl },
    });

    expect(typeof account.executePaymasterTransaction).toBe('function');
  });

  test('the paymaster option replaces the paymaster plugin of the list', () => {
    const account = new Account({
      provider,
      address,
      signer,
      plugins: [paymasterPlugin({ nodeUrl: otherPaymasterUrl })],
      paymaster: { nodeUrl: paymasterUrl },
    });

    expect(account.paymaster.nodeUrl).toBe(paymasterUrl);
  });

  test('an account without the paymaster option logs no message', () => {
    const infoSpy = jest.spyOn(logger, 'info');

    const account = new Account({ provider, address, signer });

    expect(account.paymaster).toBeInstanceOf(PaymasterRpc);
    expect(infoSpy).not.toHaveBeenCalled();
  });

  test('a paymaster replaced after the account is created is used', async () => {
    const fee: PaymasterFeeEstimate = {
      gas_token_price_in_strk: '0x1',
      estimated_fee_in_strk: '0x2',
      estimated_fee_in_gas_token: '0x3',
      suggested_max_fee_in_strk: '0x4',
      suggested_max_fee_in_gas_token: '0x5',
    };
    const prepared: PreparedTransaction = {
      type: 'deploy',
      deployment: deploymentData,
      parameters: { version: '0x1', feeMode: { mode: 'sponsored' } },
      fee,
    };
    const otherPaymaster = new PaymasterRpc({ nodeUrl: otherPaymasterUrl });
    otherPaymaster.buildTransaction = jest.fn().mockResolvedValue(prepared);
    const account = new Account({ provider, address, signer });

    account.paymaster = otherPaymaster;
    // With deploymentData, the account does not ask the node for its SNIP-9 version.
    const result = await account.estimatePaymasterTransactionFee([], {
      feeMode: { mode: 'sponsored' },
      deploymentData,
    });

    expect(result).toBe(fee);
  });

  test('a subclass of Account keeps its own paymaster method', async () => {
    class MyAccount extends Account {
      async executePaymasterTransaction(
        calls: Call[],
        paymasterDetails: PaymasterDetails
      ): Promise<InvokeFunctionResponse> {
        return { transaction_hash: `${this.address}-${paymasterDetails.feeMode.mode}` };
      }
    }
    const account = new MyAccount({ provider, address, signer });

    const result = await account.executePaymasterTransaction([], {
      feeMode: { mode: 'sponsored' },
    });

    expect(result.transaction_hash).toBe('0xabc-sponsored');
  });

  test('a contract paymaster option with an account without paymaster gives a clear error', async () => {
    const abi: Abi = [
      {
        type: 'function',
        name: 'transfer',
        inputs: [
          { name: 'recipient', type: 'core::felt252' },
          { name: 'amount', type: 'core::felt252' },
        ],
        outputs: [],
        state_mutability: 'external',
      },
    ];
    const account = new Account({ provider, address, signer, plugins: false });
    const contract = new Contract({ abi, address: '0x123', providerOrAccount: account });

    await expect(
      contract.invoke('transfer', ['0x456', 10], {
        paymasterDetails: { feeMode: { mode: 'sponsored' } },
      })
    ).rejects.toThrow('This account has no paymaster methods');
  });

  describe('contract methods with a paymaster option', () => {
    // An ERC-20 transfer: once compiled with the abi, the u256 amount is two felts.
    const erc20Abi: Abi = [
      {
        type: 'struct',
        name: 'core::integer::u256',
        members: [
          { name: 'low', type: 'core::integer::u128' },
          { name: 'high', type: 'core::integer::u128' },
        ],
      },
      {
        type: 'function',
        name: 'transfer',
        inputs: [
          { name: 'recipient', type: 'core::starknet::contract_address::ContractAddress' },
          { name: 'amount', type: 'core::integer::u256' },
        ],
        outputs: [{ type: 'core::bool' }],
        state_mutability: 'external',
      },
    ];
    const paymasterDetails: PaymasterDetails = { feeMode: { mode: 'sponsored' } };

    test('contract.invoke sends the calldata compiled with the abi', async () => {
      const account = new Account({ provider, address, signer });
      const executeSpy = jest
        .spyOn(account, 'executePaymasterTransaction')
        .mockResolvedValue({ transaction_hash: '0x1' });
      const contract = new Contract({
        abi: erc20Abi,
        address: '0x123',
        providerOrAccount: account,
      });

      await contract.invoke('transfer', ['0x456', 100], { paymasterDetails });

      expect(executeSpy).toHaveBeenCalledWith(
        [{ contractAddress: '0x123', entrypoint: 'transfer', calldata: ['1110', '100', '0'] }],
        paymasterDetails,
        undefined
      );
    });

    test('contract.estimate sends the calldata compiled with the abi', async () => {
      const fee: PaymasterFeeEstimate = {
        gas_token_price_in_strk: '0x1',
        estimated_fee_in_strk: '0x2',
        estimated_fee_in_gas_token: '0x3',
        suggested_max_fee_in_strk: '0x4',
        suggested_max_fee_in_gas_token: '0x5',
      };
      const account = new Account({ provider, address, signer });
      const estimateSpy = jest
        .spyOn(account, 'estimatePaymasterTransactionFee')
        .mockResolvedValue(fee);
      const contract = new Contract({
        abi: erc20Abi,
        address: '0x123',
        providerOrAccount: account,
      });

      await contract.estimate('transfer', ['0x456', 100], { paymasterDetails });

      expect(estimateSpy).toHaveBeenCalledWith(
        [{ contractAddress: '0x123', entrypoint: 'transfer', calldata: ['1110', '100', '0'] }],
        paymasterDetails
      );
    });
  });
});

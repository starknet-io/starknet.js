import { Contract, Provider, SequencerProvider, stark } from '../src';
import { ZERO } from '../src/constants';
import { feeTransactionVersion } from '../src/utils/hash';
import { toBigInt } from '../src/utils/number';
import { encodeShortString } from '../src/utils/shortString';
import { fromCallsToExecuteCalldata } from '../src/utils/transaction';
import {
  compiledErc20,
  compiledL1L2,
  describeIfDevnet,
  describeIfNotDevnet,
  describeIfSequencer,
  getTestAccount,
  getTestProvider,
} from './fixtures';

describeIfSequencer('SequencerProvider', () => {
  const sequencerProvider = getTestProvider() as SequencerProvider;
  const account = getTestAccount(sequencerProvider);
  let customSequencerProvider: Provider;
  let exampleContractAddress: string;

  describe('Gateway specific methods', () => {
    let exampleTransactionHash: string;

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledErc20,
        constructorCalldata: [
          encodeShortString('Token'),
          encodeShortString('ERC20'),
          account.address,
        ],
      });

      exampleTransactionHash = deploy.transaction_hash;
      exampleContractAddress = deploy.contract_address;
    });

    test('getTransactionStatus()', async () => {
      return expect(
        sequencerProvider.getTransactionStatus(exampleTransactionHash)
      ).resolves.not.toThrow();
    });

    test('transaction trace', async () => {
      const transactionTrace = await sequencerProvider.getTransactionTrace(exampleTransactionHash);
      // TODO test optional properties
      expect(transactionTrace).toHaveProperty('signature');
    });

    test('simulate transaction', async () => {
      const call = {
        contractAddress: exampleContractAddress,
        entrypoint: 'transfer',
        calldata: [exampleContractAddress, '10', '0'],
      };
      const calldata = fromCallsToExecuteCalldata([call]);
      const nonce = toBigInt(await account.getNonce());
      const version = toBigInt(feeTransactionVersion);
      const chainId = await account.getChainId();
      const signature = await account.signer.signTransaction([call], {
        walletAddress: account.address,
        nonce,
        version,
        maxFee: ZERO,
        chainId,
      });

      const res = await sequencerProvider.simulateTransaction(
        {
          contractAddress: account.address,
          calldata,
          signature,
        },
        { version, nonce }
      );
      expect(res).toHaveProperty('trace');
      expect(res).toHaveProperty('fee_estimation');
    });

    test('getCode() -> { bytecode }', async () => {
      const code = await sequencerProvider.getCode(exampleContractAddress);
      return expect(Array.isArray(code.bytecode)).toBe(true);
    });

    describeIfNotDevnet('which are not available on devnet', () => {
      test('getContractAddresses()', async () => {
        const { GpsStatementVerifier, Starknet } = await sequencerProvider.getContractAddresses();
        expect(typeof GpsStatementVerifier).toBe('string');
        expect(typeof Starknet).toBe('string');
      });
    });
  });

  describe('Test Estimate message fee', () => {
    const L1_ADDRESS = '0x8359E4B0152ed5A731162D3c7B0D8D56edB165A0';
    let l1l2ContractAddress: string;

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledL1L2,
      });
      l1l2ContractAddress = deploy.contract_address;
    });

    test('estimate message fee', async () => {
      const estimation = await sequencerProvider.estimateMessageFee(
        {
          from_address: L1_ADDRESS,
          to_address: l1l2ContractAddress,
          entry_point_selector: 'deposit',
          payload: ['556', '123'],
        },
        'latest'
      );
      expect(estimation).toEqual(
        expect.objectContaining({
          overall_fee: expect.anything(),
          gas_price: expect.anything(),
          gas_usage: expect.anything(),
          unit: 'wei',
        })
      );
    });
  });

  describeIfDevnet('Test calls with Custom Devnet Sequencer Provider', () => {
    let erc20: Contract;
    const wallet = stark.randomAddress();

    beforeAll(async () => {
      customSequencerProvider = new Provider({
        sequencer: {
          baseUrl: 'http://127.0.0.1:5050/',
          feederGatewayUrl: 'feeder_gateway',
          gatewayUrl: 'gateway',
        },
      });
      const accountCustom = getTestAccount(customSequencerProvider);
      const { deploy } = await accountCustom.declareAndDeploy({
        contract: compiledErc20,
        constructorCalldata: [encodeShortString('Token'), encodeShortString('ERC20'), wallet],
      });

      erc20 = new Contract(compiledErc20.abi, deploy.contract_address, customSequencerProvider);
    });

    test('Check ERC20 balance using Custom Sequencer Provider', async () => {
      const result = await erc20.balanceOf(wallet);
      const [res] = result;
      expect(res.low).toStrictEqual(toBigInt(1000));
      expect(res).toStrictEqual(result.balance);
    });
  });
});

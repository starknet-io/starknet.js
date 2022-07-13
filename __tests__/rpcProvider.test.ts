import { isBN } from 'bn.js';

import { Account, Contract, DeployContractResponse, Provider, RPCProvider } from '../src';
import { toBN } from '../src/utils/number';
import { compileCalldata } from '../src/utils/stark';
import { compiledErc20, describeIfNotDevnet, getTestAccount } from './fixtures';

const { TEST_RPC_URL } = process.env;

if (!TEST_RPC_URL) {
  throw new Error('TEST_RPC_URL is not set');
}

describe('RPCProvider', () => {
  let provider: RPCProvider;

  beforeAll(async () => {
    provider = new RPCProvider({ nodeUrl: TEST_RPC_URL });
  });

  describe('Provider methods', () => {
    describe('getBlock', () => {
      test('pending', async () => {
        const latestBlock = await provider.getBlock();
        expect(latestBlock).toHaveProperty('block_hash');
        expect(latestBlock).toHaveProperty('parent_hash');
        expect(latestBlock).toHaveProperty('block_number');
        expect(latestBlock).toHaveProperty('status');
        expect(latestBlock).toHaveProperty('sequencer');
        expect(latestBlock).toHaveProperty('new_root');
        expect(latestBlock).toHaveProperty('old_root');
        expect(latestBlock).toHaveProperty('accepted_time');
        expect(latestBlock).toHaveProperty('gas_price');
        expect(latestBlock).toHaveProperty('transactions');
        expect(Array.isArray(latestBlock.transactions)).toBe(true);
      });

      test('Block Hash 0x8a30a1212d142cb0053fe9921e1dbf64f651d328565bd2e7ac24059c270f43', async () => {
        const block = await provider.getBlock(
          '0x8a30a1212d142cb0053fe9921e1dbf64f651d328565bd2e7ac24059c270f43'
        );

        expect(block).toHaveProperty('block_hash');
        expect(block).toHaveProperty('parent_hash');
        expect(block).toHaveProperty('block_number');
        expect(block).toHaveProperty('status');
        expect(block).toHaveProperty('sequencer');
        expect(block).toHaveProperty('new_root');
        expect(block).toHaveProperty('old_root');
        expect(block).toHaveProperty('accepted_time');
        expect(block).toHaveProperty('gas_price');
        expect(block).toHaveProperty('transactions');
        expect(Array.isArray(block.transactions)).toBe(true);
      });

      test('Block Number 102634', async () => {
        const block = await provider.getBlock(102634);
        expect(block).toHaveProperty('block_hash');
        expect(block).toHaveProperty('parent_hash');
        expect(block).toHaveProperty('block_number');
        expect(block).toHaveProperty('status');
        expect(block).toHaveProperty('sequencer');
        expect(block).toHaveProperty('new_root');
        expect(block).toHaveProperty('old_root');
        expect(block).toHaveProperty('accepted_time');
        expect(block).toHaveProperty('gas_price');
        expect(block).toHaveProperty('transactions');
        expect(Array.isArray(block.transactions)).toBe(true);
      });
    });

    describe('getStorageAt', () => {
      test('pending', async () => {
        const storage = await provider.getStorageAt(
          '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
          0
        );
        expect(typeof storage).toBe('string');
      });

      test('Block Hash 0x7104702055c2a5773a870ceada9552ec659d69c18053b14078983f07527dea8', async () => {
        const storage = await provider.getStorageAt(
          '0x01d1f307c073bb786a66e6e042ec2a9bdc385a3373bb3738d95b966d5ce56166',
          0,
          '0x7225762c7ff5e7e5f0867f0a8e73594df4f44f05a65375339a76398e8ae3e64'
        );
        expect(typeof storage).toBe('string');
      });
    });

    describe('getTransaction', () => {
      test('Deploy Transaction Hash 0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348', async () => {
        const transaction = await provider.getTransaction(
          '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
        );

        expect(transaction.transaction_hash).toBeTruthy();
        expect(transaction.contract_address).toBeTruthy();
      });

      test('Invoke Transaction Hash 0x2a56c636f45761c99a67ecdf0f185a6d5fe5239924ed9a4886fddbfaf3227b', async () => {
        const transaction = await provider.getTransaction(
          '0x2a56c636f45761c99a67ecdf0f185a6d5fe5239924ed9a4886fddbfaf3227b'
        );

        expect(transaction.transaction_hash).toBeTruthy();
        expect(transaction.contract_address).toBeTruthy();
        expect(Array.isArray(transaction.calldata)).toBe(true);
        expect(transaction.entry_point_selector).toBeTruthy();
        expect(Array.isArray(transaction.signature)).toBe(true);
        expect(transaction.max_fee).toBeTruthy();
      });

      test('Declare Transaction Hash 0x79b130f2e808db6ab4b83f0182f016a128d73752b849e5b0221c2b3a35a87ea', async () => {
        const transaction = await provider.getTransaction(
          '0x79b130f2e808db6ab4b83f0182f016a128d73752b849e5b0221c2b3a35a87ea'
        );

        expect(transaction.max_fee).toBeTruthy();
        expect(transaction.transaction_hash).toBeTruthy();
      });
    });

    describe('getTransactionReceipt', () => {
      test('Transaction Hash 0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348', async () => {
        const receipt = await provider.getTransactionReceipt(
          '0x37013e1cb9c133e6fe51b4b371b76b317a480f56d80576730754c1662582348'
        );

        expect(receipt).toHaveProperty('transaction_hash');
        expect(receipt).toHaveProperty('status');
        expect(receipt).toHaveProperty('status_data');
        expect(receipt).toHaveProperty('messages_sent');
        expect(receipt).toHaveProperty('l1_origin_message');
        expect(receipt).toHaveProperty('events');
      });
    });
  });

  describe('Contract methods', () => {
    let contractAddress: string;
    let deployTransactionHash: string;
    let deployResponse: DeployContractResponse;

    beforeAll(async () => {
      deployResponse = await provider.deployContract({ contract: compiledErc20 });
      contractAddress = deployResponse.contract_address;
      deployTransactionHash = deployResponse.transaction_hash;

      await provider.waitForTransaction(deployTransactionHash);
    });

    test('Deployed contract', () => {
      expect(deployResponse).toBeTruthy();
      expect(contractAddress).toBeTruthy();
      expect(deployTransactionHash).toBeTruthy();
    });

    test('Declared contract', async () => {
      const declareContractResponse = await provider.declareContract({ contract: compiledErc20 });

      expect(declareContractResponse.class_hash).toBeTruthy();
      expect(declareContractResponse.transaction_hash).toBeTruthy();
    });

    test('getClassAt', async () => {
      const classResponse = await provider.getClassAt(contractAddress);
      expect(classResponse).toHaveProperty('program');
      expect(classResponse).toHaveProperty('entry_points_by_type');
    });

    describe('callContract', () => {
      test('result', () => {
        return expect(
          provider
            .callContract({
              contractAddress,
              entrypoint: 'balance_of',
              calldata: compileCalldata({
                user: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
              }),
            })
            .then((res) => {
              expect(Array.isArray(res.result)).toBe(true);
            })
        ).resolves.not.toThrow();
      });
    });
  });

  describe('RPC methods', () => {
    test('getChainId', async () => {
      const chainId = await provider.getChainId();
      expect(chainId).toBe('0x534e5f474f45524c49');
    });
  });

  describeIfNotDevnet('Account', () => {
    let account: Account;
    let erc20Address!: string;
    let erc20: Contract;

    beforeAll(async () => {
      const rpcProvider = new Provider({ rpc: { nodeUrl: TEST_RPC_URL } });
      account = getTestAccount(rpcProvider, false);
      expect(account).toBeInstanceOf(Account);

      const erc20Response = await provider.deployContract({
        contract: compiledErc20,
      });

      erc20Address = erc20Response.contract_address!;
      erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

      await provider.waitForTransaction(erc20Response.transaction_hash);
      erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

      const mintResponse = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'mint',
        calldata: [account.address, '1000'],
      });

      await provider.waitForTransaction(mintResponse.transaction_hash);
    });

    test('estimate fee', async () => {
      const { overall_fee } = await account.estimateFee({
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [erc20.address, '10'],
      });

      expect(isBN(overall_fee)).toBe(true);
    });

    test('execute by wallet owner', async () => {
      const { res: before } = await erc20.balance_of(account.address);

      const { transaction_hash } = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [erc20.address, '10'],
      });

      await account.waitForTransaction(transaction_hash);

      const { res: after } = await erc20.balance_of(account.address);

      expect(toBN(before).sub(toBN(after)).toString(10)).toBe('10');
    });
  });
});

import {
  Account,
  Block,
  BlockNumber,
  CallData,
  LibraryError,
  ProviderInterface,
  RpcProvider,
  stark,
  num,
  type Calldata,
  type RawArgs,
  isPreConfirmedStateUpdate,
} from '../src';
import {
  CONTRACTS,
  createTestProvider,
  erc20ClassHash,
  getTestAccount,
  wrongClassHash,
} from './config';

describe('defaultProvider', () => {
  let testProvider: ProviderInterface;
  let account: Account;
  let exampleTransactionHash: string;
  let erc20ContractAddress: string;
  let exampleBlock: Block;
  let exampleBlockNumber: BlockNumber;
  let exampleBlockHash: string;
  let erc20Constructor: Calldata;
  let erc20ConstructorParams: RawArgs;
  const erc20CallData = new CallData(CONTRACTS.Erc20Oz100.sierra.abi);
  const wallet = stark.randomFelt();

  beforeAll(async () => {
    testProvider = await createTestProvider();
    account = getTestAccount(testProvider);
    expect(testProvider).toBeInstanceOf(RpcProvider);

    erc20ConstructorParams = {
      name: 'Token',
      symbol: 'ERC20',
      amount: 1000n,
      recipient: account.address,
      owner: account.address,
    };
    erc20Constructor = erc20CallData.compile('constructor', erc20ConstructorParams);

    const { deploy } = await account.declareAndDeploy({
      contract: CONTRACTS.Erc20Oz100.sierra,
      casm: CONTRACTS.Erc20Oz100.casm,
      constructorCalldata: erc20Constructor,
    });

    exampleTransactionHash = deploy.transaction_hash;
    erc20ContractAddress = deploy.contract_address;

    exampleBlock = await testProvider.getBlock('latest');
    exampleBlockHash = exampleBlock.block_hash;
    exampleBlockNumber = exampleBlock.block_number;
  });

  describe('endpoints', () => {
    test('declareDeploy()', () => {
      expect(erc20ContractAddress).toBeTruthy();
      expect(exampleTransactionHash).toBeTruthy();
    });

    test('getContractVersion', async () => {
      const expected = { cairo: '1', compiler: '2' };
      expect(await testProvider.getContractVersion(erc20ContractAddress)).toEqual(expected);
      expect(await testProvider.getContractVersion(undefined, erc20ClassHash)).toEqual(expected);
    });

    describe('getBlock', () => {
      test('getBlock(blockIdentifier=latest)', async () => {
        expect(exampleBlock).not.toBeNull();
      });

      test(`getBlock(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
        const block = await testProvider.getBlock(exampleBlockNumber);
        expect(block.block_number).toBe(exampleBlockNumber);
      });

      test(`getBlock(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
        const block = await testProvider.getBlock(exampleBlockHash);
        expect(block.block_hash).toBe(exampleBlockHash);
      });

      test('getBlock() -> { blockNumber }', async () => {
        const block = await testProvider.getBlock('latest');
        expect(block).toBeDefined();
      });

      test(`getStateUpdate(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
        const stateUpdate = await testProvider.getStateUpdate(exampleBlockHash);
        if (isPreConfirmedStateUpdate(stateUpdate)) {
          fail('exampleBlockHash is latest block, should not be pre confirmed');
        }
        expect(stateUpdate.block_hash).toBe(exampleBlockHash);
      });

      test(`getStateUpdate(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
        const stateUpdate = await testProvider.getStateUpdate(exampleBlockNumber);
        if (isPreConfirmedStateUpdate(stateUpdate)) {
          fail('exampleBlockHash is latest block, should not be pre confirmed');
        }
        expect(stateUpdate.block_hash).toBe(exampleBlockHash);
      });
    });

    test('getNonceForAddress()', async () => {
      const nonce = await testProvider.getNonceForAddress(erc20ContractAddress);
      return expect(num.toBigInt(nonce)).toEqual(num.toBigInt('0x0'));
    });

    describe('getStorageAt', () => {
      test('with "key" type of number', async () => {
        const storage = await testProvider.getStorageAt(erc20ContractAddress, 0);
        expect(storage.value).toMatch(/^0x[0-9a-f]+$/i);
      });

      test('"key" type of string', async () => {
        const storage = await testProvider.getStorageAt(erc20ContractAddress, '0x0');
        expect(storage.value).toMatch(/^0x[0-9a-f]+$/i);
      });

      test('with "key" type of BN', async () => {
        const storage = await testProvider.getStorageAt(erc20ContractAddress, num.toBigInt('0x0'));
        expect(storage.value).toMatch(/^0x[0-9a-f]+$/i);
      });
    });

    test('getTransaction() - failed retrieval', () => {
      return expect(testProvider.getTransaction(wrongClassHash)).rejects.toThrow(LibraryError);
    });

    test('getTransaction() - successful deploy transaction', async () => {
      const transaction = await testProvider.getTransaction(exampleTransactionHash);
      expect(transaction).toBeDefined();
    });

    test('getTransactionReceipt() - successful transaction', async () => {
      const transactionReceipt = await testProvider.getTransactionReceipt(exampleTransactionHash);
      expect(transactionReceipt).toBeDefined();
    });

    describe('callContract()', () => {
      test('callContract()', async () => {
        const res = await testProvider.callContract({
          contractAddress: erc20ContractAddress,
          entrypoint: 'balanceOf',
          calldata: CallData.compile({
            user: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
          }),
        });
        expect(Array.isArray(res)).toBe(true);
      });

      test('callContract() - user wallet', () => {
        return expect(
          testProvider
            .callContract({
              contractAddress: erc20ContractAddress,
              entrypoint: 'balanceOf',
              calldata: CallData.compile({
                user: wallet,
              }),
            })
            .then((res) => {
              expect(Array.isArray(res)).toBe(true);
            })
        ).resolves.not.toThrow();
      });

      test('callContract() - gateway error', async () => {
        return expect(
          testProvider.callContract({
            contractAddress: erc20ContractAddress,
            entrypoint: 'non_existent_entrypoint',
            calldata: CallData.compile({
              user: '0xdeadbeef',
            }),
          })
        ).rejects.toThrow();
      });
    });
  });
});

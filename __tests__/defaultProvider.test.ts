import {
  Account,
  Block,
  BlockNumber,
  CallData,
  isPendingStateUpdate,
  LibraryError,
  Provider,
  ProviderInterface,
  stark,
  num,
  type Calldata,
  type RawArgs,
} from '../src';
import {
  contracts,
  createTestProvider,
  erc20ClassHash,
  getTestAccount,
  wrongClassHash,
} from './config/fixtures';
import { initializeMatcher } from './config/schema';

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
  const erc20CallData = new CallData(contracts.Erc20OZ.sierra.abi);
  const wallet = stark.randomAddress();
  initializeMatcher(expect);

  beforeAll(async () => {
    testProvider = new Provider(await createTestProvider());
    account = getTestAccount(testProvider);
    expect(testProvider).toBeInstanceOf(Provider);

    erc20ConstructorParams = {
      name: 'Token',
      symbol: 'ERC20',
      amount: 1000n,
      recipient: account.address,
      owner: account.address,
    };
    erc20Constructor = erc20CallData.compile('constructor', erc20ConstructorParams);

    const { deploy } = await account.declareAndDeploy({
      contract: contracts.Erc20OZ.sierra,
      casm: contracts.Erc20OZ.casm,
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
        expect(exampleBlock).toMatchSchemaRef('GetBlockResponse');
      });

      test(`getBlock(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
        const block = await testProvider.getBlock(exampleBlockNumber);
        expect(block).toMatchSchemaRef('GetBlockResponse');
      });

      test(`getBlock(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
        const block = await testProvider.getBlock(exampleBlockHash);
        expect(block).toMatchSchemaRef('GetBlockResponse');
      });

      test('getBlock() -> { blockNumber }', async () => {
        const block = await testProvider.getBlock('latest');
        expect(block).toMatchSchemaRef('GetBlockResponse');
      });

      test(`getStateUpdate(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
        const stateUpdate = await testProvider.getStateUpdate(exampleBlockHash);
        if (isPendingStateUpdate(stateUpdate)) {
          fail('exampleBlockHash is latest block, should not be pending');
        }
        expect(stateUpdate.block_hash).toBe(exampleBlockHash);
        expect(stateUpdate).toMatchSchemaRef('StateUpdateResponse');
      });

      test(`getStateUpdate(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
        const stateUpdate = await testProvider.getStateUpdate(exampleBlockNumber);
        if (isPendingStateUpdate(stateUpdate)) {
          fail('exampleBlockHash is latest block, should not be pending');
        }
        expect(stateUpdate.block_hash).toBe(exampleBlockHash);
        expect(stateUpdate).toMatchSchemaRef('StateUpdateResponse');
      });
    });

    test('getNonceForAddress()', async () => {
      const nonce = await testProvider.getNonceForAddress(erc20ContractAddress);
      return expect(num.toBigInt(nonce)).toEqual(num.toBigInt('0x0'));
    });

    test('getClassAt(contractAddress, blockNumber="latest")', async () => {
      const classResponse = await testProvider.getClassAt(erc20ContractAddress);
      expect(classResponse).toMatchSchemaRef('SierraContractClass');
    });

    test('getClassByHash', async () => {
      const classResponse = await testProvider.getClassByHash(erc20ClassHash);
      expect(classResponse).toMatchSchemaRef('SierraContractClass');
    });

    describe('getStorageAt', () => {
      test('with "key" type of number', () => {
        return expect(testProvider.getStorageAt(erc20ContractAddress, 0)).resolves.not.toThrow();
      });

      test('"key" type of string', () => {
        return expect(
          testProvider.getStorageAt(erc20ContractAddress, '0x0')
        ).resolves.not.toThrow();
      });

      test('with "key" type of BN', () => {
        return expect(
          testProvider.getStorageAt(erc20ContractAddress, num.toBigInt('0x0'))
        ).resolves.not.toThrow();
      });
    });

    test('getTransaction() - failed retrieval', () => {
      return expect(testProvider.getTransaction(wrongClassHash)).rejects.toThrow(LibraryError);
    });

    test('getTransaction() - successful deploy transaction', async () => {
      const transaction = await testProvider.getTransaction(exampleTransactionHash);
      expect(transaction).toMatchSchemaRef('GetTransactionResponse');
    });

    test('getTransactionReceipt() - successful transaction', async () => {
      const transactionReceipt = await testProvider.getTransactionReceipt(exampleTransactionHash);
      expect(transactionReceipt).toMatchSchemaRef('GetTransactionReceiptResponse');
    });

    describe('callContract()', () => {
      test('callContract()', () => {
        return expect(
          testProvider.callContract({
            contractAddress: erc20ContractAddress,
            entrypoint: 'balanceOf',
            calldata: CallData.compile({
              user: '0x9ff64f4ab0e1fe88df4465ade98d1ea99d5732761c39279b8e1374fa943e9b',
            }),
          })
        ).resolves.not.toThrow();
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
        ).rejects.toThrowError();
      });
    });
  });
});

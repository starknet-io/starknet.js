import {
  BlockNumber,
  CallData,
  GetBlockResponse,
  LibraryError,
  Provider,
  provider,
  stark,
} from '../src';
import { toBigInt } from '../src/utils/num';
import { encodeShortString } from '../src/utils/shortString';
import {
  compiledErc20,
  erc20ClassHash,
  getTestAccount,
  getTestProvider,
  wrongClassHash,
} from './config/fixtures';
import { initializeMatcher } from './config/schema';

const testProvider = new Provider(getTestProvider());

describe('defaultProvider', () => {
  let exampleTransactionHash: string;
  let erc20ContractAddress: string;
  let exampleBlock: GetBlockResponse;
  let exampleBlockNumber: BlockNumber;
  let exampleBlockHash: string;
  const wallet = stark.randomAddress();
  const account = getTestAccount(testProvider);
  initializeMatcher(expect);

  beforeAll(async () => {
    expect(testProvider).toBeInstanceOf(Provider);

    const { deploy } = await account.declareAndDeploy({
      contract: compiledErc20,
      constructorCalldata: [encodeShortString('Token'), encodeShortString('ERC20'), wallet],
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
      const expected = { cairo: '0', compiler: '0' };
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
        provider.defStateUpdate(
          stateUpdate,
          (state) => {
            expect(state.block_hash).toBe(exampleBlockHash);
            expect(state).toMatchSchemaRef('StateUpdateResponse');
          },
          (pending) => {
            fail('exampleBlockHash is latest block, should not be pending');
            expect(pending).toMatchSchemaRef('PendingStateUpdateResponse');
          }
        );
      });

      test(`getStateUpdate(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
        const stateUpdate = await testProvider.getStateUpdate(exampleBlockNumber);
        provider.defStateUpdate(
          stateUpdate,
          (state) => {
            expect(state.block_hash).toBe(exampleBlockHash);
            expect(state).toMatchSchemaRef('StateUpdateResponse');
          },
          (pending) => {
            fail('exampleBlockHash is latest block, should not be pending');
            expect(pending).toMatchSchemaRef('PendingStateUpdateResponse');
          }
        );
      });
    });

    test('getNonceForAddress()', async () => {
      const nonce = await testProvider.getNonceForAddress(erc20ContractAddress);
      return expect(toBigInt(nonce)).toEqual(toBigInt('0x0'));
    });

    test('getClassAt(contractAddress, blockNumber="latest")', async () => {
      const classResponse = await testProvider.getClassAt(erc20ContractAddress);
      expect(classResponse).toMatchSchemaRef('LegacyContractClass');
    });

    test('getClassByHash', async () => {
      const classResponse = await testProvider.getClassByHash(erc20ClassHash);
      expect(classResponse).toMatchSchemaRef('LegacyContractClass');
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
          testProvider.getStorageAt(erc20ContractAddress, toBigInt('0x0'))
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
              expect(Array.isArray(res.result)).toBe(true);
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

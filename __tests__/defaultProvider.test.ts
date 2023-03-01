import { BlockNumber, GetBlockResponse, LibraryError, Provider, stark } from '../src';
import { toBigInt } from '../src/utils/number';
import { encodeShortString } from '../src/utils/shortString';
import {
  compiledErc20,
  erc20ClassHash,
  getTestAccount,
  getTestProvider,
  wrongClassHash,
} from './fixtures';
import { initializeMatcher } from './schema';

const { compileCalldata } = stark;

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

    describe('getBlock', () => {
      test('getBlock(blockIdentifier=latest)', async () => {
        expect(exampleBlock).not.toBeNull();
        const blockSchema = {
          $ref: 'providerSchemas#/definitions/GetBlockResponse',
        };
        expect(exampleBlock).toMatchSchema(blockSchema);
      });

      test(`getBlock(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
        const block = await testProvider.getBlock(exampleBlockNumber);
        const blockSchema = {
          $ref: 'providerSchemas#/definitions/GetBlockResponse',
        };
        expect(block).toMatchSchema(blockSchema);
      });

      test(`getBlock(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
        const block = await testProvider.getBlock(exampleBlockHash);
        const blockSchema = {
          $ref: 'providerSchemas#/definitions/GetBlockResponse',
        };
        expect(block).toMatchSchema(blockSchema);
      });

      test('getBlock() -> { blockNumber }', async () => {
        const block = await testProvider.getBlock('latest');
        const blockSchema = {
          $ref: 'providerSchemas#/definitions/GetBlockResponse',
        };
        expect(block).toMatchSchema(blockSchema);
      });

      test(`getStateUpdate(blockHash=${exampleBlockHash}, blockNumber=undefined)`, async () => {
        const stateUpdate = await testProvider.getStateUpdate(exampleBlockHash);
        expect(stateUpdate.block_hash).toBe(exampleBlockHash);

        const stateUpdateResponse = {
          $ref: 'providerSchemas#/definitions/StateUpdateResponse',
        };
        expect(stateUpdate).toMatchSchema(stateUpdateResponse);
      });

      test(`getStateUpdate(blockHash=undefined, blockNumber=${exampleBlockNumber})`, async () => {
        const stateUpdate = await testProvider.getStateUpdate(exampleBlockNumber);
        expect(stateUpdate.block_hash).toBe(exampleBlockHash);

        const stateUpdateResponse = {
          $ref: 'providerSchemas#/definitions/StateUpdateResponse',
        };
        expect(stateUpdate).toMatchSchema(stateUpdateResponse);
      });
    });

    test('getNonceForAddress()', async () => {
      const nonce = await testProvider.getNonceForAddress(erc20ContractAddress);
      return expect(toBigInt(nonce)).toEqual(toBigInt('0x0'));
    });

    test('getClassAt(contractAddress, blockNumber="latest")', async () => {
      const classResponse = await testProvider.getClassAt(erc20ContractAddress);

      const classResponseSchema = {
        $ref: 'libSchemas#/definitions/ContractClass',
      };
      expect(classResponse).toMatchSchema(classResponseSchema);
    });

    test('GetClassByHash', async () => {
      const classResponse = await testProvider.getClassByHash(erc20ClassHash);

      const classResponseSchema = {
        $ref: 'libSchemas#/definitions/ContractClass',
      };
      expect(classResponse).toMatchSchema(classResponseSchema);
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

      const transactionSchema = {
        $ref: 'providerSchemas#/definitions/GetTransactionResponse',
      };
      expect(transaction).toMatchSchema(transactionSchema);
    });

    test('getTransactionReceipt() - successful transaction', async () => {
      const transactionReceipt = await testProvider.getTransactionReceipt(exampleTransactionHash);

      const txReceiptSchema = {
        $ref: 'providerSchemas#/definitions/GetTransactionReceiptResponse',
      };
      expect(transactionReceipt).toMatchSchema(txReceiptSchema);
    });

    describe('callContract()', () => {
      test('callContract()', () => {
        return expect(
          testProvider.callContract({
            contractAddress: erc20ContractAddress,
            entrypoint: 'balanceOf',
            calldata: compileCalldata({
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
              calldata: compileCalldata({
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
            calldata: compileCalldata({
              user: '0xdeadbeef',
            }),
          })
        ).rejects.toThrowError();
      });
    });
  });
});

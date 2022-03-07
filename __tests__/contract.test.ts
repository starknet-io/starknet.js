import { isBN } from 'bn.js';

import { Contract, defaultProvider, stark } from '../src';
import { getSelectorFromName } from '../src/utils/hash';
import { BigNumberish, toBN } from '../src/utils/number';
import { compileCalldata } from '../src/utils/stark';
import { compiledErc20, compiledMulticall, compiledTypeTransformation } from './fixtures';

describe('class Contract {}', () => {
  const wallet = stark.randomAddress();

  describe('Basic Interaction', () => {
    let erc20: Contract;
    let contract: Contract;

    beforeAll(async () => {
      const { code, transaction_hash, address } = await defaultProvider.deployContract({
        contract: compiledErc20,
      });
      erc20 = new Contract(compiledErc20.abi, address, defaultProvider);
      expect(code).toBe('TRANSACTION_RECEIVED');
      await defaultProvider.waitForTransaction(transaction_hash);

      // Deploy Multicall

      const {
        code: m_code,
        transaction_hash: m_transaction_hash,
        address: multicallAddress,
      } = await defaultProvider.deployContract({
        contract: compiledMulticall,
      });

      contract = new Contract(compiledMulticall.abi, multicallAddress);

      expect(m_code).toBe('TRANSACTION_RECEIVED');

      await defaultProvider.waitForTransaction(m_transaction_hash);
    });

    test('read initial balance of that account', async () => {
      const { res } = await erc20.call('balance_of', {
        user: wallet,
      });
      expect(res).toStrictEqual(toBN(0));
    });

    test('add 10 test ERC20 to account', async () => {
      const response = await erc20.invoke('mint', {
        recipient: wallet,
        amount: '10',
      });
      expect(response.code).toBe('TRANSACTION_RECEIVED');

      await defaultProvider.waitForTransaction(response.transaction_hash);
    });

    test('read balance after mint of that account', async () => {
      const { res } = await erc20.call('balance_of', {
        user: wallet,
      });

      expect(res).toStrictEqual(toBN(10));
    });

    test('read balance in a multicall', async () => {
      const args1 = { user: wallet };
      const args2 = {};
      const calls = [
        erc20.connectedTo,
        getSelectorFromName('balance_of'),
        Object.keys(args1).length,
        ...compileCalldata(args1),

        erc20.connectedTo,
        getSelectorFromName('decimals'),
        Object.keys(args2).length,
        ...compileCalldata(args2),
      ];
      const { block_number, result } = await contract.call('aggregate', { calls });
      expect(isBN(block_number));
      expect(Array.isArray(result));
      (result as BigNumberish[]).forEach((el) => expect(isBN(el)));
    });
  });

  describe('Type Transformation', () => {
    let contract: Contract;

    beforeAll(async () => {
      const { code, transaction_hash, address } = await defaultProvider.deployContract({
        contract: compiledTypeTransformation,
      });
      contract = new Contract(compiledTypeTransformation.abi, address, defaultProvider);
      expect(code).toBe('TRANSACTION_RECEIVED');
      await defaultProvider.waitForTransaction(transaction_hash);
    });

    describe('Request Type Transformation', () => {
      test('Parsing the felt in request', async () => {
        return expect(contract.call('request_felt', { num: 3 })).resolves.not.toThrow();
      });

      test('Parsing the array of felt in request', async () => {
        return expect(
          contract.call('request_array_of_felts', { arr: [1, 2] })
        ).resolves.not.toThrow();
      });

      test('Parsing the struct in request', async () => {
        return expect(
          contract.call('request_struct', {
            str: { x: 1, y: 2 },
          })
        ).resolves.not.toThrow();
      });

      test('Parsing the array of structs in request', async () => {
        return expect(
          contract.call('request_array_of_structs', { str: [{ x: 1, y: 2 }] })
        ).resolves.not.toThrow();
      });

      test('Parsing the nested structs in request', async () => {
        return expect(
          contract.call('request_nested_structs', {
            str: {
              p1: { x: 1, y: 2 },
              p2: { x: 3, y: 4 },
              extra: 5,
            },
          })
        ).resolves.not.toThrow();
      });

      test('Parsing the tuple in request', async () => {
        return expect(contract.call('request_tuple', { tup: [1, 2] })).resolves.not.toThrow();
      });

      test('Parsing the multiple types in request', async () => {
        return expect(
          contract.call('request_mixed_types', {
            num: 2,
            point: {
              x: 1,
              y: 2,
            },
            arr: [1],
          })
        ).resolves.not.toThrow();
      });
    });

    describe('Response Type Transformation', () => {
      test('Parsing the felt in response', async () => {
        const { res } = await contract.call('get_felt');
        expect(res).toStrictEqual(toBN(4));
      });

      test('Parsing the array of felt in response', async () => {
        const { res } = await contract.call('get_array_of_felts');
        expect(res).toStrictEqual([toBN(4), toBN(5)]);
      });

      test('Parsing the array of structs in response', async () => {
        const { res } = await contract.call('get_struct');
        expect(res).toStrictEqual({ x: toBN(1), y: toBN(2) });
      });

      test('Parsing the array of structs in response', async () => {
        const { res } = await contract.call('get_array_of_structs');
        expect(res).toStrictEqual([{ x: toBN(1), y: toBN(2) }]);
      });

      test('Parsing the nested structs in response', async () => {
        const { res } = await contract.call('get_nested_structs');
        expect(res).toStrictEqual({
          p1: { x: toBN(1), y: toBN(2) },
          p2: { x: toBN(3), y: toBN(4) },
          extra: toBN(5),
        });
      });

      test('Parsing the tuple in response', async () => {
        const { res } = await contract.call('get_tuple');
        expect(res).toStrictEqual([toBN(1), toBN(2), toBN(3)]);
      });

      test('Parsing the multiple types in response', async () => {
        const { tuple, number, array, point } = await contract.call('get_mixed_types');
        expect(tuple).toStrictEqual([toBN(1), toBN(2)]);
        expect(number).toStrictEqual(toBN(3));
        expect(array).toStrictEqual([toBN(4)]);
        expect(point).toStrictEqual({ x: toBN(1), y: toBN(2) });
      });
    });
  });
});

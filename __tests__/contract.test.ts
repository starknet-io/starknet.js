import { isBN } from 'bn.js';

import { Account, Contract, Provider, defaultProvider, ec, stark } from '../src';
import { getSelectorFromName } from '../src/utils/hash';
import { BigNumberish, toBN } from '../src/utils/number';
import { compileCalldata } from '../src/utils/stark';
import {
  compiledArgentAccount,
  compiledErc20,
  compiledMulticall,
  compiledTypeTransformation,
} from './fixtures';

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

    test('populate transaction for initial balance of that account', async () => {
      const res = await erc20.populateTransaction.balance_of({ user: wallet });
      expect(res).toHaveProperty('contractAddress');
      expect(res).toHaveProperty('entrypoint');
      expect(res).toHaveProperty('calldata');
      expect(res).toHaveProperty('signature');
    });

    test('read initial balance of that account', async () => {
      const { res } = await erc20.balance_of({ user: wallet });
      expect(res).toStrictEqual(toBN(0));
    });

    test('add 10 test ERC20 to account', async () => {
      const response = await erc20.mint({
        recipient: wallet,
        amount: '10',
      });
      expect(response.code).toBe('TRANSACTION_RECEIVED');

      await defaultProvider.waitForTransaction(response.transaction_hash);
    });

    test('read balance after mint of that account', async () => {
      const { res } = await erc20.balance_of({ user: wallet });

      expect(res).toStrictEqual(toBN(10));
    });

    test('read balance in a multicall', async () => {
      const args1 = { user: wallet };
      const args2 = {};
      const calls = [
        erc20.address,
        getSelectorFromName('balance_of'),
        Object.keys(args1).length,
        ...compileCalldata(args1),

        erc20.address,
        getSelectorFromName('decimals'),
        Object.keys(args2).length,
        ...compileCalldata(args2),
      ];
      const { block_number, result } = await contract.aggregate({ calls });
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
        return expect(contract.request_felt({ num: 3 })).resolves.not.toThrow();
      });

      test('Parsing the array of felt in request', async () => {
        return expect(contract.request_array_of_felts({ arr: [1, 2] })).resolves.not.toThrow();
      });

      test('Parsing the struct in request', async () => {
        return expect(
          contract.request_struct({
            str: { x: 1, y: 2 },
          })
        ).resolves.not.toThrow();
      });

      test('Parsing the array of structs in request', async () => {
        return expect(
          contract.request_array_of_structs({ str: [{ x: 1, y: 2 }] })
        ).resolves.not.toThrow();
      });

      test('Parsing the nested structs in request', async () => {
        return expect(
          contract.request_nested_structs({
            str: {
              p1: { x: 1, y: 2 },
              p2: { x: 3, y: 4 },
              extra: 5,
            },
          })
        ).resolves.not.toThrow();
      });

      test('Parsing the tuple in request', async () => {
        return expect(contract.request_tuple({ tup: [1, 2] })).resolves.not.toThrow();
      });

      test('Parsing the multiple types in request', async () => {
        return expect(
          contract.request_mixed_types({
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
        const { res } = await contract.get_felt();
        expect(res).toStrictEqual(toBN(4));
      });

      test('Parsing the array of felt in response', async () => {
        const { res } = await contract.get_array_of_felts();
        expect(res).toStrictEqual([toBN(4), toBN(5)]);
      });

      test('Parsing the array of structs in response', async () => {
        const { res } = await contract.get_struct();
        expect(res).toStrictEqual({ x: toBN(1), y: toBN(2) });
      });

      test('Parsing the array of structs in response', async () => {
        const { res } = await contract.get_array_of_structs();
        expect(res).toStrictEqual([{ x: toBN(1), y: toBN(2) }]);
      });

      test('Parsing the nested structs in response', async () => {
        const { res } = await contract.get_nested_structs();
        expect(res).toStrictEqual({
          p1: { x: toBN(1), y: toBN(2) },
          p2: { x: toBN(3), y: toBN(4) },
          extra: toBN(5),
        });
      });

      test('Parsing the tuple in response', async () => {
        const { res } = await contract.get_tuple();
        expect(res).toStrictEqual([toBN(1), toBN(2), toBN(3)]);
      });

      test('Parsing the multiple types in response', async () => {
        const { tuple, number, array, point } = await contract.get_mixed_types();
        expect(tuple).toStrictEqual([toBN(1), toBN(2)]);
        expect(number).toStrictEqual(toBN(3));
        expect(array).toStrictEqual([toBN(4)]);
        expect(point).toStrictEqual({ x: toBN(1), y: toBN(2) });
      });
    });
  });

  describe('Contract interaction with Account', () => {
    const privateKey = stark.randomAddress();

    const starkKeyPair = ec.getKeyPair(privateKey);
    const starkKeyPub = ec.getStarkKey(starkKeyPair);
    let account: Account;
    let erc20: Contract;
    let erc20Address: string;

    beforeAll(async () => {
      const accountResponse = await defaultProvider.deployContract({
        contract: compiledArgentAccount,
        addressSalt: starkKeyPub,
      });
      const contract = new Contract(compiledArgentAccount.abi, accountResponse.address);
      expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

      const initializeResponse = await contract.initialize({
        signer: starkKeyPub,
        guardian: '0',
      });
      expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

      account = new Account(defaultProvider, accountResponse.address, starkKeyPair);

      const erc20Response = await defaultProvider.deployContract({
        contract: compiledErc20,
      });
      erc20Address = erc20Response.address;
      erc20 = new Contract(compiledErc20.abi, erc20Address, defaultProvider);
      await defaultProvider.waitForTransaction(erc20Response.transaction_hash);
      expect(erc20Response.code).toBe('TRANSACTION_RECEIVED');

      const mintResponse = await erc20.mint({
        recipient: account.address,
        amount: '1000',
      });

      await defaultProvider.waitForTransaction(mintResponse.transaction_hash);
    });

    test('read balance of wallet', async () => {
      const { res } = await erc20.balance_of({
        user: account.address,
      });

      expect(res).toStrictEqual(toBN(1000));
    });

    test('change from provider to account', async () => {
      expect(erc20.providerOrAccount instanceof Provider);
      erc20.connect(account);
      expect(erc20.providerOrAccount instanceof Account);
    });

    test('read balance of wallet', async () => {
      const { res } = await erc20.balance_of({
        user: account.address,
      });

      expect(res).toStrictEqual(toBN(1000));
    });

    test('invoke contract by wallet owner', async () => {
      const { transaction_hash, code } = await erc20.transfer({
        recipient: toBN(erc20Address).toString(),
        amount: 10,
      });
      expect(code).toBe('TRANSACTION_RECEIVED');
      await defaultProvider.waitForTransaction(transaction_hash);
      const { res } = await erc20.balance_of({
        user: account.address,
      });
      expect(res).toStrictEqual(toBN(990));
    });
  });
});

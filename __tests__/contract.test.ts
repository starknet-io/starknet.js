import { isBN } from 'bn.js';

import { Account, Contract, ContractFactory, Provider, defaultProvider, ec, stark } from '../src';
import { getSelectorFromName } from '../src/utils/hash';
import { BigNumberish, toBN } from '../src/utils/number';
import { compileCalldata } from '../src/utils/stark';
import { ACCOUNT_ADDRESS, PRIVATE_KEY } from './constancts';
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

    test('populate transaction for initial balance of that account', async () => {
      const res = await erc20.populateTransaction.balance_of(wallet);
      expect(res).toHaveProperty('contractAddress');
      expect(res).toHaveProperty('entrypoint');
      expect(res).toHaveProperty('calldata');
      expect(res).toHaveProperty('signature');
    });

    test('estimate gas fee for `mint` should fail when connected to the provider', async () => {
      expect(erc20.estimateFee.mint(wallet, '10')).rejects.toThrow();
    });

    test('read initial balance of that account', async () => {
      const result = await erc20.balance_of(wallet);
      const [res] = result;
      expect(res).toStrictEqual(toBN(0));
      expect(res).toStrictEqual(result.res);
    });

    test('add 10 test ERC20 to account', async () => {
      const response = await erc20.mint(wallet, '10');
      expect(response.code).toBe('TRANSACTION_RECEIVED');

      await defaultProvider.waitForTransaction(response.transaction_hash);
    });

    test('read balance after mint of that account', async () => {
      const result = await erc20.balance_of(wallet);
      const [res] = result;
      expect(res).toStrictEqual(toBN(10));
      expect(res).toStrictEqual(result.res);
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
      const result = await contract.aggregate(calls);
      const [block_number, res] = result;
      expect(isBN(block_number));
      expect(Array.isArray(res));
      (res as BigNumberish[]).forEach((el) => expect(isBN(el)));
      expect(block_number).toStrictEqual(result.block_number);
      expect(res).toStrictEqual(result.result);
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
        return expect(contract.request_felt(3)).resolves.not.toThrow();
      });

      test('Parsing the array of felt in request', async () => {
        return expect(contract.request_array_of_felts([1, 2])).resolves.not.toThrow();
      });

      test('Parsing the struct in request', async () => {
        return expect(contract.request_struct({ x: 1, y: 2 })).resolves.not.toThrow();
      });

      test('Parsing the array of structs in request', async () => {
        return expect(contract.request_array_of_structs([{ x: 1, y: 2 }])).resolves.not.toThrow();
      });

      test('Parsing the nested structs in request', async () => {
        return expect(
          contract.request_nested_structs({
            p1: { x: 1, y: 2 },
            p2: { x: 3, y: 4 },
            extra: 5,
          })
        ).resolves.not.toThrow();
      });

      test('Parsing the tuple in request', async () => {
        return expect(contract.request_tuple([1, 2])).resolves.not.toThrow();
      });

      test('Parsing the multiple types in request', async () => {
        return expect(contract.request_mixed_types(2, { x: 1, y: 2 }, [1])).resolves.not.toThrow();
      });
    });

    describe('Response Type Transformation', () => {
      test('Parsing the felt in response', async () => {
        const { res } = await contract.get_felt();
        expect(res).toStrictEqual(toBN(4));
      });

      test('Parsing the array of felt in response', async () => {
        const result = await contract.get_array_of_felts();
        const [res] = result;
        expect(res).toStrictEqual([toBN(4), toBN(5)]);
        expect(res).toStrictEqual(result.res);
      });

      test('Parsing the array of structs in response', async () => {
        const result = await contract.get_struct();
        const [res] = result;
        expect(res).toStrictEqual({ x: toBN(1), y: toBN(2) });
        expect(res).toStrictEqual(result.res);
      });

      test('Parsing the array of structs in response', async () => {
        const result = await contract.get_array_of_structs();
        const [res] = result;
        expect(res).toStrictEqual([{ x: toBN(1), y: toBN(2) }]);
        expect(res).toStrictEqual(result.res);
      });

      test('Parsing the nested structs in response', async () => {
        const result = await contract.get_nested_structs();
        const [res] = result;
        expect(res).toStrictEqual({
          p1: { x: toBN(1), y: toBN(2) },
          p2: { x: toBN(3), y: toBN(4) },
          extra: toBN(5),
        });
        expect(res).toStrictEqual(result.res);
      });

      test('Parsing the tuple in response', async () => {
        const result = await contract.get_tuple();
        const [res] = result;
        expect(res).toStrictEqual([toBN(1), toBN(2), toBN(3)]);
        expect(res).toStrictEqual(result.res);
      });

      test('Parsing the multiple types in response', async () => {
        const result = await contract.get_mixed_types();
        const [tuple, number, array, point] = result;
        expect(tuple).toStrictEqual([toBN(1), toBN(2)]);
        expect(number).toStrictEqual(toBN(3));
        expect(array).toStrictEqual([toBN(4)]);
        expect(point).toStrictEqual({ x: toBN(1), y: toBN(2) });
        expect(tuple).toStrictEqual(result.tuple);
        expect(number).toStrictEqual(result.number);
        expect(array).toStrictEqual(result.array);
        expect(point).toStrictEqual(result.point);
      });
    });
  });

  describe('Contract interaction with Account', () => {
    const starkKeyPair = ec.getKeyPair(PRIVATE_KEY);
    let account: Account;
    let erc20: Contract;
    let erc20Address: string;

    beforeAll(async () => {
      account = new Account(defaultProvider, ACCOUNT_ADDRESS, starkKeyPair);

      const erc20Response = await defaultProvider.deployContract({
        contract: compiledErc20,
      });
      erc20Address = erc20Response.address;
      erc20 = new Contract(compiledErc20.abi, erc20Address, defaultProvider);
      await defaultProvider.waitForTransaction(erc20Response.transaction_hash);
      expect(erc20Response.code).toBe('TRANSACTION_RECEIVED');

      const mintResponse = await erc20.mint(account.address, '1000');

      await defaultProvider.waitForTransaction(mintResponse.transaction_hash);
    });

    test('read balance of wallet', async () => {
      const result = await erc20.balance_of(account.address);
      const [res] = result;
      expect(res).toStrictEqual(toBN(1000));
      expect(res).toStrictEqual(result.res);
    });

    test('change from provider to account', async () => {
      expect(erc20.providerOrAccount instanceof Provider);
      erc20.connect(account);
      expect(erc20.providerOrAccount instanceof Account);
    });

    test('estimate gas fee for `mint`', async () => {
      const res = await erc20.estimateFee.mint(wallet, '10');
      expect(res).toHaveProperty('amount');
      expect(res).toHaveProperty('unit');
    });

    test('read balance of wallet', async () => {
      const { res } = await erc20.balance_of(account.address);

      expect(res).toStrictEqual(toBN(1000));
    });

    test('invoke contract by wallet owner', async () => {
      const { transaction_hash, code } = await erc20.transfer(toBN(erc20Address).toString(), 10);
      expect(code).toBe('TRANSACTION_RECEIVED');
      await defaultProvider.waitForTransaction(transaction_hash);
      const { res } = await erc20.balance_of(account.address);
      expect(res).toStrictEqual(toBN(990));
    });
  });
});

describe('class ContractFactory {}', () => {
  let erc20Address: string;
  beforeAll(async () => {
    const { code, transaction_hash, address } = await defaultProvider.deployContract({
      contract: compiledErc20,
    });
    expect(code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTransaction(transaction_hash);
    erc20Address = address;
  });
  test('deployment of new contract', async () => {
    const factory = new ContractFactory(compiledErc20);
    const erc20 = await factory.deploy();
    expect(erc20 instanceof Contract);
  });
  test('wait for deployment transaction', async () => {
    const factory = new ContractFactory(compiledErc20);
    const contract = await factory.deploy();
    expect(contract.deployed()).resolves.not.toThrow();
  });
  test('attach new contract', async () => {
    const factory = new ContractFactory(compiledErc20);
    const erc20 = factory.attach(erc20Address);
    expect(erc20 instanceof Contract);
  });
});

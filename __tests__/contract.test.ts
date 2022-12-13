import { isBN } from 'bn.js';

import { Contract, ContractFactory, stark } from '../src';
import { getSelectorFromName } from '../src/utils/hash';
import { BigNumberish, toBN } from '../src/utils/number';
import { encodeShortString } from '../src/utils/shortString';
import { compileCalldata } from '../src/utils/stark';
import {
  compiledErc20,
  compiledMulticall,
  compiledTypeTransformation,
  getTestAccount,
  getTestProvider,
} from './fixtures';

describe('contract module', () => {
  let erc20Address: string;
  const provider = getTestProvider();
  const wallet = stark.randomAddress();
  const account = getTestAccount(provider);
  const constructorCalldata = [encodeShortString('Token'), encodeShortString('ERC20'), wallet];
  const classHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';

  describe('class Contract {}', () => {
    describe('Basic Interaction', () => {
      let erc20Contract: Contract;
      let multicallContract: Contract;

      beforeAll(async () => {
        const { deploy } = await account.declareDeploy({
          contract: compiledErc20,
          classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
          constructorCalldata: [encodeShortString('Token'), encodeShortString('ERC20'), wallet],
        });

        erc20Contract = new Contract(compiledErc20.abi, deploy.contract_address!, provider);

        const { deploy: multicallDeploy } = await account.declareDeploy({
          contract: compiledMulticall,
          classHash: '0x06f94f3229a8d9c1d51cb84f1f5ec306c8552a805e307540727dda53c4936b43',
        });

        multicallContract = new Contract(
          compiledMulticall.abi,
          multicallDeploy.contract_address!,
          provider
        );
      });

      test('populate transaction for initial balance of that account', async () => {
        const res = await erc20Contract.populateTransaction.balanceOf(wallet);
        expect(res).toHaveProperty('contractAddress');
        expect(res).toHaveProperty('entrypoint');
        expect(res).toHaveProperty('calldata');
      });

      test('estimate gas fee for `mint` should fail when connected to the provider', async () => {
        expect(erc20Contract.estimateFee.mint(wallet, ['10', '0'])).rejects.toThrow();
      });

      test('read initial balance of that account', async () => {
        const result = await erc20Contract.balanceOf(wallet);
        const [res] = result;
        expect(res.low).toStrictEqual(toBN(1000));
        expect(res).toStrictEqual(result.balance);
      });

      test('read balance in a multicall', async () => {
        const args1 = { user: wallet };
        const args2 = {};
        const calls = [
          erc20Contract.address,
          getSelectorFromName('balanceOf'),
          Object.keys(args1).length,
          ...compileCalldata(args1),

          erc20Contract.address,
          getSelectorFromName('decimals'),
          Object.keys(args2).length,
          ...compileCalldata(args2),
        ];
        const result = await multicallContract.aggregate(calls);
        const [block_number, res] = result;
        expect(isBN(block_number));
        expect(Array.isArray(res));
        (res as BigNumberish[]).forEach((el) => expect(isBN(el)));
        expect(block_number).toStrictEqual(result.block_number);
        expect(res).toStrictEqual(result.result);
      });
    });

    describe('Type Transformation', () => {
      let typeTransformedContract: Contract;

      beforeAll(async () => {
        const { deploy } = await account.declareDeploy({
          contract: compiledTypeTransformation,
          classHash: '0x022a0e662b13d18a2aaa3ee54ae290de6569621b549022c18169c6e7893809ea',
        });

        typeTransformedContract = new Contract(
          compiledTypeTransformation.abi,
          deploy.contract_address!,
          provider
        );
      });

      describe('Request Type Transformation', () => {
        test('Parsing the felt in request', async () => {
          return expect(typeTransformedContract.request_felt(3)).resolves.not.toThrow();
        });

        test('Parsing the array of felt in request', async () => {
          return expect(
            typeTransformedContract.request_array_of_felts([1, 2])
          ).resolves.not.toThrow();
        });

        test('Parsing the struct in request', async () => {
          return expect(
            typeTransformedContract.request_struct({ x: 1, y: 2 })
          ).resolves.not.toThrow();
        });

        test('Parsing the array of structs in request', async () => {
          return expect(
            typeTransformedContract.request_array_of_structs([{ x: 1, y: 2 }])
          ).resolves.not.toThrow();
        });

        test('Parsing the nested structs in request', async () => {
          return expect(
            typeTransformedContract.request_nested_structs({
              p1: { x: 1, y: 2 },
              p2: { x: 3, y: 4 },
              extra: 5,
            })
          ).resolves.not.toThrow();
        });

        test('Parsing the tuple in request', async () => {
          return expect(typeTransformedContract.request_tuple([1, 2])).resolves.not.toThrow();
        });

        test('Parsing the multiple types in request', async () => {
          return expect(
            typeTransformedContract.request_mixed_types(2, { x: 1, y: 2 }, [1])
          ).resolves.not.toThrow();
        });
      });

      describe('Response Type Transformation', () => {
        test('Parsing the felt in response', async () => {
          const { res } = await typeTransformedContract.get_felt();
          expect(res).toStrictEqual(toBN(4));
        });

        test('Parsing the array of felt in response', async () => {
          const result = await typeTransformedContract.get_array_of_felts();
          const [res] = result;
          expect(res).toStrictEqual([toBN(4), toBN(5)]);
          expect(res).toStrictEqual(result.res);
        });

        test('Parsing the array of structs in response', async () => {
          const result = await typeTransformedContract.get_struct();
          const [res] = result;
          expect(res).toStrictEqual({ x: toBN(1), y: toBN(2) });
          expect(res).toStrictEqual(result.res);
        });

        test('Parsing the array of structs in response', async () => {
          const result = await typeTransformedContract.get_array_of_structs();
          const [res] = result;
          expect(res).toStrictEqual([{ x: toBN(1), y: toBN(2) }]);
          expect(res).toStrictEqual(result.res);
        });

        test('Parsing the nested structs in response', async () => {
          const result = await typeTransformedContract.get_nested_structs();
          const [res] = result;
          expect(res).toStrictEqual({
            p1: { x: toBN(1), y: toBN(2) },
            p2: { x: toBN(3), y: toBN(4) },
            extra: toBN(5),
          });
          expect(res).toStrictEqual(result.res);
        });

        test('Parsing the tuple in response', async () => {
          const result = await typeTransformedContract.get_tuple();
          const [res] = result;
          expect(res).toStrictEqual([toBN(1), toBN(2), toBN(3)]);
          expect(res).toStrictEqual(result.res);
        });

        test('Parsing the multiple types in response', async () => {
          const result = await typeTransformedContract.get_mixed_types();
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
  });

  describe('class ContractFactory {}', () => {
    beforeAll(async () => {
      await account.declareDeploy({
        contract: compiledErc20,
        classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
        constructorCalldata,
      });
    });
    test('deployment of new contract', async () => {
      const factory = new ContractFactory(compiledErc20, classHash, account);
      const erc20 = await factory.deploy(
        compileCalldata({
          name: encodeShortString('Token'),
          symbol: encodeShortString('ERC20'),
          recipient: wallet,
        })
      );
      expect(erc20 instanceof Contract);
    });
    test('wait for deployment transaction', async () => {
      const factory = new ContractFactory(compiledErc20, classHash, account);
      const contract = await factory.deploy(
        compileCalldata({
          name: encodeShortString('Token'),
          symbol: encodeShortString('ERC20'),
          recipient: wallet,
        })
      );
      expect(contract.deployed()).resolves.not.toThrow();
    });
    test('attach new contract', async () => {
      const factory = new ContractFactory(compiledErc20, classHash, account);
      const erc20 = factory.attach(erc20Address);
      expect(erc20 instanceof Contract);
    });
  });
});

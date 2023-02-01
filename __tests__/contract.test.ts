import { isBN } from 'bn.js';

import { Contract, ContractFactory, stark } from '../src';
import { CallData } from '../src/utils/calldata';
import { felt, tuple, uint256 } from '../src/utils/calldata/cairo';
import { getSelectorFromName } from '../src/utils/hash';
import { BigNumberish, toBN } from '../src/utils/number';
import { encodeShortString } from '../src/utils/shortString';
import { compileCalldata } from '../src/utils/stark';
import { uint256ToBN } from '../src/utils/uint256';
import {
  compiledErc20,
  compiledErc20Echo,
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
          constructorCalldata,
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
        const { balance } = await erc20Contract.balanceOf(wallet, {
          formatResponse: { balance: uint256ToBN },
        });
        expect(balance).toStrictEqual(toBN(1000));
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
        const { block_number, result } = await multicallContract.aggregate(calls);
        expect(isBN(block_number));
        expect(Array.isArray(result));
        (result as BigNumberish[]).forEach((el) => expect(isBN(el)));
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
          return expect(typeTransformedContract.request_tuple(tuple(1, 2))).resolves.not.toThrow();
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
          const { res } = await typeTransformedContract.get_array_of_felts();
          expect(res).toStrictEqual([toBN(4), toBN(5)]);
        });

        test('Parsing the array of structs in response', async () => {
          const { res } = await typeTransformedContract.get_struct();
          expect(res).toStrictEqual({ x: toBN(1), y: toBN(2) });
        });

        test('Parsing the array of structs in response', async () => {
          const { res } = await typeTransformedContract.get_array_of_structs();
          expect(res).toStrictEqual([{ x: toBN(1), y: toBN(2) }]);
        });

        test('Parsing the nested structs in response', async () => {
          const { res } = await typeTransformedContract.get_nested_structs();
          expect(res).toStrictEqual({
            p1: { x: toBN(1), y: toBN(2) },
            p2: { x: toBN(3), y: toBN(4) },
            extra: toBN(5),
          });
        });

        test('Parsing the tuple in response', async () => {
          const { res } = await typeTransformedContract.get_tuple();
          expect(res).toStrictEqual({ 0: toBN(1), 1: toBN(2), 2: toBN(3) });
        });

        test('Parsing the multiple types in response', async () => {
          const {
            tuple: aTuple,
            number,
            array,
            point,
          } = await typeTransformedContract.get_mixed_types();
          expect(aTuple).toStrictEqual({ 0: toBN(1), 1: toBN(2) });
          expect(number).toStrictEqual(toBN(3));
          expect(array).toStrictEqual([toBN(4)]);
          expect(point).toStrictEqual({ x: toBN(1), y: toBN(2) });
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

describe('Contract interaction', () => {
  let erc20Echo20Contract: Contract;
  const provider = getTestProvider();
  const account = getTestAccount(provider);
  const classHash = '0x01a76ad51ccafca47079059ebf9fd577d8bcbbcded0c497852129f42eaaf6bef';
  let factory: ContractFactory;

  beforeAll(async () => {
    factory = new ContractFactory(compiledErc20Echo, classHash, account);
    erc20Echo20Contract = await factory.deploy(
      'Token',
      'ERC20',
      18,
      uint256('1000000000'),
      account.address,
      ['0x823d5a0c0eefdc9a6a1cb0e064079a6284f3b26566b677a32c71bbe7bf9f8c'],
      22
    );
  });

  test('contractFactory.deploy with raw arguments - all types constructor params', () => {
    // executed in beforeAll
    expect(erc20Echo20Contract instanceof Contract);
  });

  test('contractFactory.deploy with callData - all types constructor params', async () => {
    // Deploy with callData - OK
    erc20Echo20Contract = await factory.deploy(
      CallData.compile({
        name: 'Token',
        symbol: 'ERC20',
        decimals: '18', // number as string will stay same (not processed)
        initial_supply: uint256('1000000000'),
        recipient: account.address,
        signers: ['0x823d5a0c0eefdc9a6a1cb0e064079a6284f3b26566b677a32c71bbe7bf9f8c'],
        threshold: 1,
      })
    );
    expect(erc20Echo20Contract instanceof Contract);
  });

  test('declareDeploy with callData - all types using felt,uint256,tuple helpers', async () => {
    const { deploy } = await account.declareDeploy({
      contract: compiledErc20Echo,
      classHash,
      constructorCalldata: CallData.compile({
        name: felt('Token'),
        symbol: felt('ERC20'),
        decimals: felt('18'),
        initial_supply: uint256('1000000000'),
        recipient: felt(account.address),
        signers: ['0x823d5a0c0eefdc9a6a1cb0e064079a6284f3b26566b677a32c71bbe7bf9f8c'],
        threshold: 1,
      }),
    });

    erc20Echo20Contract = new Contract(compiledErc20Echo.abi, deploy.contract_address!, provider);
    expect(erc20Echo20Contract instanceof Contract);
  });

  test('Assert helpers and non helpers data produce same result', async () => {
    const feltedData = CallData.compile({
      name: felt('Token'),
      symbol: felt('ERC20'),
      decimals: felt(18),
      initial_supply: uint256('1000000000'),
      recipient: felt(account.address),
      someArray: [1, 2, 3], // array doesn't need helper as it is defined as js array
      someStruct: { a: 1, b: 2 }, // struct doesn't need helper as it is defined as js object
      someTuple: tuple(10, '0x9', 'string'),
    });

    const composedData = CallData.compile({
      name: 'Token',
      symbol: 'ERC20',
      decimals: 18,
      initial_supply: { low: 1_000_000_000, high: 0 },
      recipient: account.address,
      someArray: [1, 2, 3],
      someStruct: { a: 1, b: 2 },
      someTuple: { 0: 10, 1: '0x9', 2: 'string' },
    });

    expect(JSON.stringify(feltedData)).toBe(JSON.stringify(composedData));
  });

  test('call composed and nested data types (felt, array, struct, tuples)', async () => {
    const request = {
      t1: 'demo text1',
      n1: 123,
      t2: 'some text 2',
      k1: [{ a: 1, b: { b: 2, c: tuple(3, 4, 5, 6) } }],
      k2: {
        // named tuple
        t1: 1,
        t2: {
          x1: 2,
          x2: { y1: 3, y2: 4 },
          x3: { tx1: tuple(5, 6), tx2: { tx21: { tx211: 7, tx212: 8 }, tx22: tuple(9, 10) } },
        },
        t3: 11,
      },
      // added from echo
      u1: uint256('5000'),
      s1: {
        discount_fix_bps: felt(1),
        discount_transfer_bps: felt(2),
      },
      s2: {
        info: {
          discount_fix_bps: felt(1),
          discount_transfer_bps: felt(2),
        },
        data: felt(200),
        data2: tuple(felt(1), felt(2)),
      },
      // added from echo2, (dodan a ispred svega)
      af1: [1, 2, 3, 4, 5, 6],
      au1: [uint256(1000), uint256(2000), uint256(3000), uint256(4000)],
      as2: [
        { discount_fix_bps: 10, discount_transfer_bps: 11 },
        { discount_fix_bps: 20, discount_transfer_bps: 22 },
      ],
    };

    // Test formatter, experimental
    // Define JS types expected from response object instead of BN
    const formatResponse = {
      t1: 'string',
      n1: 'number',
      t2: 'string',
      k1: [
        {
          a: 'number',
          b: { b: 'number', c: { 0: 'number', 1: 'number', 2: 'number', 3: 'number' } },
        },
      ],
      k2: {
        t1: 'number',
        t2: {
          x1: 'number',
          x2: { y1: 'number', y2: 'number' },
          x3: {
            tx1: { 0: 'number', 1: 'number' },
            tx2: { tx21: { tx211: 'number', tx212: 'number' }, tx22: { 0: 'number', 1: 'number' } },
          },
        },
        t3: 'number',
      },
    };

    const result = await erc20Echo20Contract.echo(CallData.compile(request), {
      parseRequest: true,
      parseResponse: true,
      formatResponse,
    });
    expect(JSON.stringify(request)).toBe(JSON.stringify(result));

    // TODO: add raw parameters call test

    // invoke test 2
    const result23 = await erc20Echo20Contract.iecho(CallData.compile(request));

    await provider.waitForTransaction(result23.transaction_hash);

    const result3 = await erc20Echo20Contract.iecho(
      request.t1,
      request.n1,
      request.t2,
      request.k1,
      request.k2,
      { formatResponse }
    );

    await provider.waitForTransaction(result3.transaction_hash);

    console.log(result23, result3);

    // Test PopulateTransaction
    const result22 = await erc20Echo20Contract.populateTransaction.echo(CallData.compile(request));
    console.log(result22);

    // Test estimate fee
    const result2 = await erc20Echo20Contract.estimateFee.iecho(CallData.compile(request));
    console.log(result2);
  });

  test('callData compatibility', async () => {
    const compiledCallData = stark.compileCalldata({
      name: encodeShortString('TokenMTK'),
      symbol: encodeShortString('MTK'),
      decimals: '18',
      initial_supply: { type: 'struct', low: 100, high: 0 },
      recipient: account.address,
      owner: account.address,
    });

    console.log(compiledCallData);

    const newCalldata = {
      name: 'TokenMTK',
      symbol: 'MTK',
      decimals: 18,
      decimals2: '1234', // will not be converted
      initial_supply: uint256('1000000000000'),
      recipient: account.address,
      tuple1: tuple(10, 20, '0x30', toBN(40)),
      struct1: {
        a: 1,
        b: 2,
      },
      structOfTuple: {
        x: tuple(10, 20),
        y: tuple(22, 33),
      },
      structOfTupleOfTuple: {
        x: tuple(tuple(1, 2), tuple(3, 4)),
        y: tuple(22, 33),
      },
      tupleOfStruct: tuple(
        {
          a: 1,
          b: 33,
        },
        { c: 'Test', d: uint256('123333333') }
      ),
      tupleOfStructOfStruct: tuple({
        a: {
          a1: 1,
          a2: tuple(2, 3),
          a3: {
            a31: 1,
            a32: tuple(321, 322),
          },
        },
        b: uint256(33),
      }),
      array1: ['123', '0x123'],
      arrayOfStruct: [
        { x: 1, y: 2 },
        { x: 10, y: 20 },
        { x: 100, y: 200 },
      ],
      arrayOfStructOfTuple: [
        { x: tuple(111, 112), y: tuple(121, 122) },
        { x: tuple(211, 212), y: tuple(221, 222) },
      ],
    };

    const compiledNewCallData = CallData.compile(newCalldata);

    console.log(compiledNewCallData);

    const { balance: uint256Balance } = await erc20Echo20Contract.balanceOf(account.address, {
      parseRequest: true, // user can opt out from validation and paring request/response
      parseResponse: true,
    });
    const bnBalance = uint256ToBN(uint256Balance);
    const balance = bnBalance.toString();
    expect(balance).toBe('1000000000');
  });
});

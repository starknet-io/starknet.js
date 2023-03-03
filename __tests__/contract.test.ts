import { Contract, ContractFactory, json, stark } from '../src';
import { CallData } from '../src/utils/calldata';
import { felt, tuple, uint256 } from '../src/utils/calldata/cairo';
import { getSelectorFromName } from '../src/utils/hash';
import { BigNumberish, hexToDecimalString, toBigInt } from '../src/utils/number';
import { encodeShortString } from '../src/utils/shortString';
import { compileCalldata } from '../src/utils/stark';
import { uint256ToBN } from '../src/utils/uint256';
import {
  compiledErc20,
  compiledErc20Echo,
  compiledMulticall,
  compiledTypeTransformation,
  describeIfDevnet,
  getTestAccount,
  getTestProvider,
} from './fixtures';
import { initializeMatcher } from './schema';

describe('contract module', () => {
  let erc20Address: string;
  const provider = getTestProvider();
  const wallet = stark.randomAddress();
  const account = getTestAccount(provider);
  const constructorCalldata = [encodeShortString('Token'), encodeShortString('ERC20'), wallet];
  const classHash = '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a';
  initializeMatcher(expect);

  describe('class Contract {}', () => {
    describe('Basic Interaction', () => {
      let erc20Contract: Contract;
      let multicallContract: Contract;

      beforeAll(async () => {
        const { deploy } = await account.declareAndDeploy({
          contract: compiledErc20,
          classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
          constructorCalldata,
        });

        erc20Contract = new Contract(compiledErc20.abi, deploy.contract_address!, provider);

        const { deploy: multicallDeploy } = await account.declareAndDeploy({
          contract: compiledMulticall,
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
        expect(balance).toStrictEqual(BigInt(1000));
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
        expect(BigInt(block_number));
        expect(Array.isArray(result));
        (result as BigNumberish[]).forEach((el) => expect(BigInt(el)));
      });
    });

    describe('Type Transformation', () => {
      let typeTransformedContract: Contract;

      beforeAll(async () => {
        const { deploy } = await account.declareAndDeploy({
          contract: compiledTypeTransformation,
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
          expect(res).toStrictEqual(toBigInt(4));
        });

        test('Parsing the array of felt in response', async () => {
          const { res } = await typeTransformedContract.get_array_of_felts();
          expect(res).toStrictEqual([BigInt(4), BigInt(5)]);
        });

        test('Parsing the array of structs in response', async () => {
          const { res } = await typeTransformedContract.get_struct();
          expect(res).toStrictEqual({ x: BigInt(1), y: BigInt(2) });
        });

        test('Parsing the array of structs in response', async () => {
          const { res } = await typeTransformedContract.get_array_of_structs();
          expect(res).toStrictEqual([{ x: BigInt(1), y: BigInt(2) }]);
        });

        test('Parsing the nested structs in response', async () => {
          const { res } = await typeTransformedContract.get_nested_structs();
          expect(res).toStrictEqual({
            p1: { x: toBigInt(1), y: toBigInt(2) },
            p2: { x: toBigInt(3), y: toBigInt(4) },
            extra: toBigInt(5),
          });
        });

        test('Parsing the tuple in response', async () => {
          const { res } = await typeTransformedContract.get_tuple();
          expect(res).toStrictEqual({ 0: BigInt(1), 1: BigInt(2), 2: BigInt(3) });
        });

        test('Parsing the multiple types in response', async () => {
          const {
            tuple: aTuple,
            number,
            array,
            point,
          } = await typeTransformedContract.get_mixed_types();
          expect(aTuple).toStrictEqual({ 0: BigInt(1), 1: BigInt(2) });
          expect(number).toStrictEqual(BigInt(3));
          expect(array).toStrictEqual([BigInt(4)]);
          expect(point).toStrictEqual({ x: BigInt(1), y: BigInt(2) });
        });
      });
    });
  });

  describe('class ContractFactory {}', () => {
    beforeAll(async () => {
      await account.declareAndDeploy({
        contract: compiledErc20,
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

describe('Complex interaction', () => {
  let erc20Echo20Contract: Contract;
  const provider = getTestProvider();
  const account = getTestAccount(provider);
  const classHash = '0x011ab8626b891bcb29f7cc36907af7670d6fb8a0528c7944330729d8f01e9ea3';
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

  describeIfDevnet('speedup live tests', () => {
    test('declareDeploy with callData - all types using felt,uint256,tuple helpers', async () => {
      const { deploy } = await account.declareAndDeploy({
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

    expect(json.stringify(feltedData)).toBe(json.stringify(composedData));
  });

  test('callData compile', async () => {
    const newCalldata = {
      name: 'TokenMTK',
      symbol: 'MTK',
      decimals: 18,
      decimals2: '1234', // will not be converted
      initial_supply: uint256('1000000000000'),
      recipient: account.address,
      tuple1: tuple(10, 20, '0x30', BigInt(40)),
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

    const compiled = CallData.compile(newCalldata);
    const doubleCompiled = CallData.compile(compiled);
    const reference = `["6084199704987259979","5067851","18","1234","1000000000000","0","${hexToDecimalString(
      account.address
    )}","10","20","48","40","1","2","10","20","22","33","1","2","3","4","22","33","1","33","1415934836","123333333","0","1","2","3","1","321","322","33","0","2","123","291","3","1","2","10","20","100","200","2","111","112","121","122","211","212","221","222"]`;
    expect(json.stringify(compiled)).toBe(reference);
    expect(json.stringify(doubleCompiled)).toBe(reference);
  });

  describe('Composed and nested data types (felt, array, struct, tuples), formatter', () => {
    const request = {
      t1: 'demo text1',
      n1: 123,
      tl2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
      u1: uint256('5000'),
      s1: {
        discount_fix_bps: 1,
        discount_transfer_bps: 2,
      },
      s2: {
        info: {
          discount_fix_bps: 1,
          discount_transfer_bps: 2,
        },
        data: 200,
        data2: { min: 1, max: 2 },
      },
      af1: [1, 2, 3, 4, 5, 6],
      au1: [uint256(1000), uint256(2000), uint256(3000), uint256(4000)],
      as1: [
        { discount_fix_bps: 10, discount_transfer_bps: 11 },
        { discount_fix_bps: 20, discount_transfer_bps: 22 },
      ],
      atmk: [
        { p1: { p1: { y1: 1, y2: 2 }, p2: 3 }, p2: 4 },
        { p1: { p1: { y1: 1, y2: 2 }, p2: 3 }, p2: 4 },
      ],
      atmku: [
        tuple(tuple({ y1: 1, y2: 2 }, 3), 4),
        tuple(tuple({ y1: 1, y2: 2 }, 3), 4),
        tuple(tuple({ y1: 1, y2: 2 }, 3), 4),
      ],
    };

    // formatter(experimental) Define JS types expected from response object instead of BN
    const formatResponse = {
      t1: 'string',
      n1: 'number',
      tl2: 'string',
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
      u1: uint256ToBN,
      s1: {
        discount_fix_bps: 'number',
        discount_transfer_bps: 'number',
      },
      s2: {
        info: {
          discount_fix_bps: 'number',
          discount_transfer_bps: 'number',
        },
        data: 'number',
        data2: { min: 'number', max: 'number' },
      },
      af1: ['number'],
      au1: [uint256ToBN],
      as1: [{ discount_fix_bps: 'number', discount_transfer_bps: 'number' }],
      atmk: [{ p1: { p1: { y1: 'number', y2: 'number' }, p2: 'number' }, p2: 'number' }],
      atmku: [tuple(tuple({ y1: 'number', y2: 'number' }, 'number'), 'number')],
    };

    test('call compiled data', async () => {
      const result = await erc20Echo20Contract.echo(CallData.compile(request), {
        parseRequest: true,
        parseResponse: true,
        formatResponse,
      });

      // Convert request uint256 to match response
      const compareRequest = {
        ...request,
        u1: uint256ToBN(request.u1),
        au1: request.au1.map((it) => uint256ToBN(it)),
      };
      expect(json.stringify(compareRequest)).toBe(json.stringify(result));
    });

    test('invoke compiled data', async () => {
      const result = await erc20Echo20Contract.iecho(CallData.compile(request));
      const transaction = await provider.waitForTransaction(result.transaction_hash);

      expect(transaction.status).toBeDefined();
    });

    describe('speedup live tests', () => {
      test('call parameterized data', async () => {
        const result = await erc20Echo20Contract.echo(
          request.t1,
          request.n1,
          request.tl2,
          request.k1,
          request.k2,
          request.u1,
          request.s1,
          request.s2,
          request.af1,
          request.au1,
          request.as1,
          request.atmk,
          request.atmku,
          {
            parseRequest: true,
            parseResponse: true,
            formatResponse,
          }
        );

        // Convert request uint256 to match response
        const compareRequest = {
          ...request,
          u1: uint256ToBN(request.u1),
          au1: request.au1.map((it) => uint256ToBN(it)),
        };
        expect(json.stringify(result)).toBe(json.stringify(compareRequest));
      });

      test('invoke parameterized data', async () => {
        const result = await erc20Echo20Contract.iecho(
          request.t1,
          request.n1,
          request.tl2,
          request.k1,
          request.k2,
          request.u1,
          request.s1,
          request.s2,
          request.af1,
          request.au1,
          request.as1,
          request.atmk,
          request.atmku,
          { formatResponse }
        );
        const transaction = await provider.waitForTransaction(result.transaction_hash);
        expect(transaction.status).toBeDefined();
      });
    });

    test('populate transaction and call with populated data', async () => {
      const populated = await erc20Echo20Contract.populateTransaction.echo(
        CallData.compile(request)
      );
      expect(
        '["474107654995566025798705","123","8","135049554883004558383340439742929429255072943744440858662311072577337126766","203887170123222058415354283980421533276985178030994883159827760142323294308","196343614134218459150194337625778954700414868493373034945803514629145850912","191491606203201332235940470946533476219373216944002683254566549675726417440","150983476482645969577707455338206408996455974968365254240526141964709732462","196916864427988120570407658938236398782031728400132565646592333804118761826","196909666192589839125749789377187946419246316474617716408635151520594095469","2259304674248048077001042434290734","1","1","2","3","4","5","6","1","2","3","4","5","6","7","8","9","10","11","5000","0","1","2","1","2","200","1","2","6","1","2","3","4","5","6","4","1000","0","2000","0","3000","0","4000","0","2","10","11","20","22","2","1","2","3","4","1","2","3","4","3","1","2","3","4","1","2","3","4","1","2","3","4"]'
      ).toBe(json.stringify(populated.calldata));

      // mark data as compiled (it can be also done manually check defineProperty compiled in CallData.compile)
      const compiledCallData = CallData.compile(populated.calldata);
      const result = await erc20Echo20Contract.echo(compiledCallData, { formatResponse });

      // Convert request uint256 to match response
      const compareRequest = {
        ...request,
        u1: uint256ToBN(request.u1),
        au1: request.au1.map((it) => uint256ToBN(it)),
      };
      expect(json.stringify(compareRequest)).toBe(json.stringify(result));
    });

    test('estimate fee', async () => {
      const gas = await erc20Echo20Contract.estimateFee.iecho(CallData.compile(request));
      expect(gas).toMatchSchemaRef('EstimateFee');
    });

    test('estimate fee transfer', async () => {
      const gas = await erc20Echo20Contract.estimateFee.transfer(stark.randomAddress(), uint256(1));
      expect(gas).toMatchSchemaRef('EstimateFee');
    });
  });
});

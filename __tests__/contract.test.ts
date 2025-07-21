import {
  Account,
  Contract,
  ProviderInterface,
  RawArgs,
  hash,
  json,
  shortString,
  stark,
  type Calldata,
  cairo,
  CallData,
  uint256,
  num,
  byteArray,
  RpcError,
} from '../src';

import { contracts, createTestProvider, describeIfRpc081, getTestAccount } from './config/fixtures';
import { initializeMatcher } from './config/schema';

describe('contract module', () => {
  let erc20Address: string;
  let provider: ProviderInterface;
  let account: Account;
  const erc20ClassHash = hash.computeContractClassHash(contracts.Erc20OZ.sierra);
  const erc20CompiledClassHash = hash.computeCompiledClassHash(contracts.Erc20OZ.casm);
  const erc20CallData = new CallData(contracts.Erc20OZ.sierra.abi);
  let erc20Constructor: Calldata;
  let erc20ConstructorParams: RawArgs;

  initializeMatcher(expect);

  beforeAll(async () => {
    provider = await createTestProvider();
    account = getTestAccount(provider);
    erc20ConstructorParams = {
      name: 'Token',
      symbol: 'ERC20',
      amount: 1000n,
      recipient: account.address,
      owner: account.address,
    };
    erc20Constructor = erc20CallData.compile('constructor', erc20ConstructorParams);
  });

  describe('class Contract {}', () => {
    describe('Basic Interaction', () => {
      let erc20Contract: Contract;

      beforeAll(async () => {
        const { deploy } = await account.declareAndDeploy({
          contract: contracts.Erc20OZ.sierra,
          casm: contracts.Erc20OZ.casm,
          constructorCalldata: erc20Constructor,
        });
        erc20Address = deploy.address;
        erc20Contract = new Contract({
          abi: contracts.Erc20OZ.sierra.abi,
          address: erc20Address,
          providerOrAccount: provider,
        });
      });
      test('getCairoVersion', async () => {
        const version = await erc20Contract.getVersion();
        expect(version).toEqual({ cairo: '1', compiler: '2' });
      });

      test('isCairo1', async () => {
        const isContractCairo1: boolean = erc20Contract.isCairo1();
        expect(isContractCairo1).toBe(true);
        const isAbiCairo1: boolean = cairo.isCairo1Abi(erc20Contract.abi);
        expect(isAbiCairo1).toBe(true);
      });

      test('populate transaction for initial balance of that account', async () => {
        const res = await erc20Contract.populateTransaction.balanceOf(account.address);
        expect(res).toHaveProperty('contractAddress');
        expect(res).toHaveProperty('entrypoint');
        expect(res).toHaveProperty('calldata');
      });

      test('estimate gas fee for `mint` should fail when connected to the provider', async () => {
        await expect(
          erc20Contract.estimateFee.mint(account.address, ['10', '0'])
        ).rejects.toThrow();
      });

      test('read initial balance of that account', async () => {
        const balance = await erc20Contract.balanceOf(account.address);
        expect(balance).toStrictEqual(1000n);
      });

      test('isDeployed should return contract when deployed', async () => {
        const result = await erc20Contract.isDeployed();
        expect(result).toBe(erc20Contract);
      });

      test('isDeployed should throw error when contract not deployed', async () => {
        const nonExistentContract = new Contract({
          abi: contracts.Erc20OZ.sierra.abi,
          address: '0x123456789abcdef123456789abcdef123456789abcdef123456789abcdef1234',
          providerOrAccount: provider,
        });

        await expect(nonExistentContract.isDeployed()).rejects.toThrow(
          /Contract not deployed at address/
        );
      });
    });

    describe('Type Transformation', () => {
      let typeTransformedContract: Contract;

      beforeAll(async () => {
        const { deploy } = await account.declareAndDeploy({
          contract: contracts.TypeTransformation.sierra,
          casm: contracts.TypeTransformation.casm,
        });

        typeTransformedContract = new Contract({
          abi: contracts.TypeTransformation.sierra.abi,
          address: deploy.contract_address,
          providerOrAccount: account,
        });
      });

      describeIfRpc081('Request Type Transformation', () => {
        test('Parsing the felt in request', async () => {
          const resp = await typeTransformedContract.request_felt(3);
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the array of felt in request', async () => {
          const resp = await typeTransformedContract.request_array_of_felts([1, 2]);
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the struct in request', async () => {
          const resp = await typeTransformedContract.request_struct({ x: 1, y: 2 });
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the array of structs in request', async () => {
          const resp = await typeTransformedContract.request_array_of_structs([{ x: 1, y: 2 }]);
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the nested structs in request', async () => {
          const resp = await typeTransformedContract.request_nested_structs({
            p1: { x: 1, y: 2 },
            p2: { x: 3, y: 4 },
            extra: 5,
          });
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the tuple in request', async () => {
          const resp = await typeTransformedContract.request_tuple(cairo.tuple(1, 2));
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the multiple types in request', async () => {
          const resp = await typeTransformedContract.request_mixed_types(2, { x: 1, y: 2 }, [1]);
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });
      });

      /*       describeIfRpc071('Request Type Transformation', () => {
        test('Parsing the felt in request', async () => {
          const myCall = typeTransformedContract.populate('request_felt', [3]);
          const estim: EstimateFeeResponseOverhead = await account.estimateInvokeFee(myCall);
          const resourceBounds: ResourceBounds = {
            l1_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
            l2_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l2_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l2_gas.max_price_per_unit) * 2n
              ),
            },
          };
          const resp = await account.execute(myCall, {
            resourceBounds,
          });
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the array of felt in request', async () => {
          const myCall = typeTransformedContract.populate('request_array_of_felts', [[1, 2]]);
          const estim: EstimateFee = await account.estimateInvokeFee(myCall);
          const resourceBounds: ResourceBounds = {
            l1_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
            l2_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l2_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l2_gas.max_price_per_unit) * 2n
              ),
            },
          };
          const resp = await account.execute(myCall, {
            resourceBounds,
          });
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the struct in request', async () => {
          const myCall = typeTransformedContract.populate('request_struct', [{ x: 1, y: 2 }]);
          const estim: EstimateFee = await account.estimateInvokeFee(myCall);
          const resourceBounds: ResourceBounds = {
            l1_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
            l2_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l2_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l2_gas.max_price_per_unit) * 2n
              ),
            },
          };
          const resp = await account.execute(myCall, {
            resourceBounds,
          });
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the array of structs in request', async () => {
          const myCall = typeTransformedContract.populate('request_array_of_structs', [
            [{ x: 1, y: 2 }],
          ]);
          const estim: EstimateFee = await account.estimateInvokeFee(myCall);
          const resourceBounds: ResourceBounds = {
            l1_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
            l2_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l2_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l2_gas.max_price_per_unit) * 2n
              ),
            },
          };
          const resp = await account.execute(myCall, {
            resourceBounds,
          });

          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the nested structs in request', async () => {
          const myCall = typeTransformedContract.populate('request_nested_structs', [
            {
              p1: { x: 1, y: 2 },
              p2: { x: 3, y: 4 },
              extra: 5,
            },
          ]);
          const estim: EstimateFee = await account.estimateInvokeFee(myCall);
          const resourceBounds: ResourceBounds = {
            l1_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
            l2_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l2_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l2_gas.max_price_per_unit) * 2n
              ),
            },
          };
          const resp = await account.execute(myCall, {
            resourceBounds,
          });

          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the tuple in request', async () => {
          const myCall = typeTransformedContract.populate('request_tuple', [cairo.tuple(1, 2)]);
          const estim: EstimateFee = await account.estimateInvokeFee(myCall);
          const resourceBounds: ResourceBounds = {
            l1_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
            l2_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l2_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l2_gas.max_price_per_unit) * 2n
              ),
            },
          };
          const resp = await account.execute(myCall, {
            resourceBounds,
          });
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });

        test('Parsing the multiple types in request', async () => {
          const myCall = typeTransformedContract.populate('request_mixed_types', [
            2,
            { x: 1, y: 2 },
            [1],
          ]);
          const estim: EstimateFee = await account.estimateInvokeFee(myCall);
          const resourceBounds: ResourceBounds = {
            l1_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
            l2_gas: {
              max_amount: num.toHex(BigInt(estim.resourceBounds.l2_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(estim.resourceBounds.l2_gas.max_price_per_unit) * 2n
              ),
            },
          };
          const resp = await account.execute(myCall, {
            resourceBounds,
          });
          const txR = await provider.waitForTransaction(resp.transaction_hash);
          expect(txR.isSuccess()).toBe(true);
        });
      }); */

      describe('Response Type Transformation', () => {
        test('Parsing the felt in response', async () => {
          const res = await typeTransformedContract.get_felt();
          expect(res).toStrictEqual(num.toBigInt(4));
        });

        test('Parsing the array of felt in response', async () => {
          const res = await typeTransformedContract.get_array_of_felts();
          expect(res).toStrictEqual([BigInt(4), BigInt(5)]);
        });

        test('Parsing the array of structs in response', async () => {
          const res = await typeTransformedContract.get_struct();
          expect(res).toStrictEqual({ x: BigInt(1), y: BigInt(2) });
        });

        test('Parsing the array of structs in response', async () => {
          const res = await typeTransformedContract.get_array_of_structs();
          expect(res).toStrictEqual([{ x: BigInt(1), y: BigInt(2) }]);
        });

        test('Parsing the nested structs in response', async () => {
          const res = await typeTransformedContract.get_nested_structs();
          expect(res).toStrictEqual({
            p1: { x: num.toBigInt(1), y: num.toBigInt(2) },
            p2: { x: num.toBigInt(3), y: num.toBigInt(4) },
            extra: num.toBigInt(5),
          });
        });

        test('Parsing the tuple in response', async () => {
          const res = await typeTransformedContract.get_tuple();
          expect(res).toStrictEqual({ 0: BigInt(1), 1: BigInt(2), 2: BigInt(3) });
        });

        test('Parsing the multiple types in response', async () => {
          const resp = await typeTransformedContract.get_mixed_types();
          expect(resp['0']).toStrictEqual({ 0: BigInt(1), 1: BigInt(2) });
          expect(resp['1']).toStrictEqual(BigInt(3));
          expect(resp['2']).toStrictEqual([BigInt(4)]);
          expect(resp['3']).toStrictEqual({ x: BigInt(1), y: BigInt(2) });
        });
      });
    });
  });

  describe('class static factory()', () => {
    beforeAll(async () => {
      await account.declareAndDeploy({
        contract: contracts.Erc20OZ.sierra,
        casm: contracts.Erc20OZ.casm,
        constructorCalldata: erc20Constructor,
      });
    });

    test('factory deployment of new contract with constructor arguments as js params', async () => {
      const erc20 = await Contract.factory({
        contract: contracts.Erc20OZ.sierra,
        compiledClassHash: erc20CompiledClassHash,
        account,
        constructorCalldata: erc20ConstructorParams,
      });
      expect(erc20).toBeInstanceOf(Contract);
    });

    test('factory deployment of new contract with constructor arguments as already compiled calldata', async () => {
      const erc20 = await Contract.factory({
        contract: contracts.Erc20OZ.sierra,
        casm: contracts.Erc20OZ.casm,
        classHash: erc20ClassHash,
        account,
        constructorCalldata: erc20Constructor,
      });
      expect(erc20).toBeInstanceOf(Contract);
    });

    test('optimization, factory deployment of new contract with constructor arguments as already compiled calldata', async () => {
      const erc20 = await Contract.factory({
        contract: contracts.Erc20OZ.sierra,
        casm: contracts.Erc20OZ.casm,
        classHash: erc20ClassHash,
        account,
        constructorCalldata: erc20Constructor,
        parseRequest: false, // optimization when calldata are already validated and compiled.
      });
      expect(erc20).toBeInstanceOf(Contract);
    });

    test('factory deployment of declared contract with constructor arguments as js params', async () => {
      const erc20 = await Contract.factory({
        contract: contracts.Erc20OZ.sierra,
        casm: contracts.Erc20OZ.casm,
        classHash: erc20ClassHash,
        account,
        constructorCalldata: erc20ConstructorParams,
      });
      expect(erc20).toBeInstanceOf(Contract);
    });
  });
});

describe('Complex interaction', () => {
  let erc20Contract: Contract;
  let echoContract: Contract;
  let provider: ProviderInterface;
  let account: Account;
  const classHash = hash.computeContractClassHash(contracts.Erc20OZ.sierra);

  beforeAll(async () => {
    provider = await createTestProvider();
    account = getTestAccount(provider);

    erc20Contract = await Contract.factory({
      contract: contracts.Erc20OZ.sierra,
      casm: contracts.Erc20OZ.casm,
      classHash,
      account,
      constructorCalldata: {
        name: 'TEST',
        symbol: 'TST',
        amount: 1000n,
        recipient: account.address,
        owner: account.address,
      },
    });

    echoContract = await Contract.factory({
      contract: contracts.echo.sierra,
      casm: contracts.echo.casm,
      account,
    });
  });

  test('contractFactory.deploy with raw arguments - all types constructor params', () => {
    // executed in beforeAll
    expect(erc20Contract).toBeInstanceOf(Contract);
    expect(echoContract).toBeInstanceOf(Contract);
  });

  test('contractFactory.deploy with callData - all types constructor params', async () => {
    // Deploy with callData - OK
    const erc20Contract2 = await Contract.factory({
      contract: contracts.Erc20OZ.sierra,
      casm: contracts.Erc20OZ.casm,
      classHash,
      account,
      constructorCalldata: CallData.compile({
        name: byteArray.byteArrayFromString('Token'),
        symbol: byteArray.byteArrayFromString('ERC20'),
        amount: cairo.uint256('1000000000'),
        recipient: account.address,
        owner: '0x823d5a0c0eefdc9a6a1cb0e064079a6284f3b26566b677a32c71bbe7bf9f8c',
      }),
    });

    expect(erc20Contract2).toBeInstanceOf(Contract);
  });

  test('Assert helpers and non helpers data produce same result', async () => {
    const feltedData = CallData.compile({
      name: cairo.felt('Token'),
      symbol: cairo.felt('ERC20'),
      decimals: cairo.felt(18),
      initial_supply: cairo.uint256('1000000000'),
      recipient: cairo.felt(account.address),
      someArray: [1, 2, 3], // array doesn't need helper as it is defined as js array
      someStruct: { a: 1, b: 2 }, // struct doesn't need helper as it is defined as js object
      someTuple: cairo.tuple(10, '0x9', 'string'),
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
    const newCalldata: RawArgs = {
      name: 'TokenMTK',
      symbol: 'MTK',
      decimals: 18,
      decimals2: '1234', // will not be converted
      initial_supply: cairo.uint256('1000000000000'),
      recipient: account.address,
      tuple1: cairo.tuple(10, 20, '0x30', BigInt(40)),
      struct1: {
        a: 1,
        b: 2,
      },
      structOfTuple: {
        x: cairo.tuple(10, 20),
        y: cairo.tuple(22, 33),
      },
      structOfTupleOfTuple: {
        x: cairo.tuple(cairo.tuple(1, 2), cairo.tuple(3, 4)),
        y: cairo.tuple(22, 33),
      },
      tupleOfStruct: cairo.tuple(
        {
          a: 1,
          b: 33,
        },
        { c: 'Test', d: cairo.uint256('123333333') }
      ),
      tupleOfStructOfStruct: cairo.tuple({
        a: {
          a1: 1,
          a2: cairo.tuple(2, 3),
          a3: {
            a31: 1,
            a32: cairo.tuple(321, 322),
          },
        },
        b: cairo.uint256(33),
      }),
      array1: ['123', '0x123'],
      arrayOfStruct: [
        { x: 1, y: 2 },
        { x: 10, y: 20 },
        { x: 100, y: 200 },
      ],
      arrayOfStructOfTuple: [
        { x: cairo.tuple(111, 112), y: cairo.tuple(121, 122) },
        { x: cairo.tuple(211, 212), y: cairo.tuple(221, 222) },
      ],
    };

    const compiled = CallData.compile(newCalldata);
    const doubleCompiled = CallData.compile(compiled);
    const reference = `["6084199704987259979","5067851","18","1234","1000000000000","0","${num.hexToDecimalString(
      account.address
    )}","10","20","48","40","1","2","10","20","22","33","1","2","3","4","22","33","1","33","1415934836","123333333","0","1","2","3","1","321","322","33","0","2","123","291","3","1","2","10","20","100","200","2","111","112","121","122","211","212","221","222"]`;
    expect(json.stringify(compiled)).toBe(reference);
    expect(json.stringify(doubleCompiled)).toBe(reference);

    // mix of complex and literal
    const mySetArgs = {
      validators: [234, 235],
      powers: { a1: 562, a2: 567 },
      valsetNonce: cairo.uint256(49),
    };
    const compiledArr = CallData.compile([mySetArgs, 456789]);
    const compiledObj = CallData.compile({
      currentValset: mySetArgs,
      relayerRouterAddress: 456789,
    });
    const expectedResult = ['2', '234', '235', '562', '567', '49', '0', '456789'];
    expect(compiledArr).toStrictEqual(expectedResult);
    expect(compiledObj).toStrictEqual(expectedResult);
  });

  describe('Composed and nested data types (felt, array, struct, tuples), formatter', () => {
    const request = {
      t1: 'demo text1',
      n1: 123,
      tl2: shortString.splitLongString(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      ),
      k1: [{ a: 1, b: { b: 2, c: cairo.tuple(3, 4, 5, 6) } }],
      k2: cairo.tuple(
        1,
        {
          x1: 2,
          x2: { y1: 3, y2: 4 },
          x3: cairo.tuple(cairo.tuple(5, 6), cairo.tuple(cairo.tuple(7, 8), cairo.tuple(9, 10))),
        },
        11
      ),

      u1: cairo.uint256('5000'),
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
        data2: cairo.tuple(1, 2),
      },
      af1: [1, 2, 3, 4, 5, 6],
      au1: [cairo.uint256(1000), cairo.uint256(2000), cairo.uint256(3000), cairo.uint256(4000)],
      as1: [
        { discount_fix_bps: 10, discount_transfer_bps: 11 },
        { discount_fix_bps: 20, discount_transfer_bps: 22 },
      ],
      atmk: [
        cairo.tuple(
          cairo.tuple(
            {
              x1: 1,
              x2: { y1: 1, y2: 2 },
              x3: cairo.tuple(
                cairo.tuple(10, 11),
                cairo.tuple(cairo.tuple(100, 101), cairo.tuple(1000, 1001))
              ),
            },
            3
          ),
          4
        ),
        cairo.tuple(
          cairo.tuple(
            {
              x1: 1,
              x2: { y1: 1, y2: 2 },
              x3: cairo.tuple(
                cairo.tuple(10, 11),
                cairo.tuple(cairo.tuple(100, 101), cairo.tuple(1000, 1001))
              ),
            },
            3
          ),
          4
        ),
      ],
      atmku: [
        cairo.tuple(cairo.tuple({ y1: 1, y2: 2 }, 3), 4),
        cairo.tuple(cairo.tuple({ y1: 1, y2: 2 }, 3), 4),
        cairo.tuple(cairo.tuple({ y1: 1, y2: 2 }, 3), 4),
      ],
    };

    // formatter(experimental) Define JS types expected from response object instead of BN
    const formatResponse = {
      '0': 'string',
      '1': 'number',
      '2': ['string'],
      '3': [
        {
          a: 'number',
          b: { b: 'number', c: { 0: 'number', 1: 'number', 2: 'number', 3: 'number' } },
        },
      ],
      '4': cairo.tuple(
        'number',
        {
          x1: 'number',
          x2: { y1: 'number', y2: 'number' },
          x3: cairo.tuple(
            cairo.tuple('number', 'number'),
            cairo.tuple(cairo.tuple('number', 'number'), cairo.tuple('number', 'number'))
          ),
        },
        'number'
      ),
      '5': 'number',
      '6': {
        discount_fix_bps: 'number',
        discount_transfer_bps: 'number',
      },
      '7': {
        info: {
          discount_fix_bps: 'number',
          discount_transfer_bps: 'number',
        },
        data: 'number',
        data2: cairo.tuple('number', 'number'),
      },
      '8': ['number'],
      '9': ['number'],
      '10': [{ discount_fix_bps: 'number', discount_transfer_bps: 'number' }],
      '11': [
        cairo.tuple(
          cairo.tuple(
            cairo.tuple(
              cairo.tuple(
                {
                  x1: 'number',
                  x2: { y1: 'number', y2: 'number' },
                  x3: cairo.tuple(
                    cairo.tuple('number', 'number'),
                    cairo.tuple(cairo.tuple('number', 'number'), cairo.tuple('number', 'number'))
                  ),
                },
                'number'
              ),
              'number'
            ),
            'number'
          ),
          'number'
        ),
      ],
      '12': [cairo.tuple(cairo.tuple({ y1: 'number', y2: 'number' }, 'number'), 'number')],
    };

    test('call compiled data', async () => {
      const calldata = CallData.compile(request);
      const args = Object.values(request);

      const result = await echoContract
        .withOptions({
          parseRequest: true,
          parseResponse: true,
          formatResponse,
        })
        .echo(calldata);

      const result2 = await echoContract
        .withOptions({
          formatResponse,
        })
        .echo(...args);

      const result3 = await echoContract.call('echo', calldata, {
        formatResponse,
      });

      const result4 = await echoContract.call('echo', args, {
        formatResponse,
      });

      // Convert request uint256 to match response
      const compareRequest = cairo.tuple(
        ...Object.values({
          ...request,
          u1: uint256.uint256ToBN(request.u1),
          au1: request.au1.map((it) => uint256.uint256ToBN(it)),
        })
      );
      expect(json.stringify(result)).toBe(json.stringify(result));
      expect(json.stringify(result2)).toBe(json.stringify(result2));
      expect(json.stringify(result3)).toBe(json.stringify(result3));
      expect(json.stringify(result4)).toBe(json.stringify(compareRequest));
    });

    test('myCallData.compile for Cairo 1', async () => {
      const requestNonOrdered = {
        t1: 'demo text1',
        n1: 123,
        k1: [{ a: 1, b: { b: 2, c: cairo.tuple(3, 4, 5, 6) } }], // not ordered
        tl2: shortString.splitLongString(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        ),
        k2: cairo.tuple(
          1,
          {
            x2: { y1: 3, y2: 4 }, // not ordered
            x1: 2,
            x3: cairo.tuple(cairo.tuple(5, 6), cairo.tuple(cairo.tuple(7, 8), cairo.tuple(9, 10))),
          },
          11
        ),

        u1: { high: 0, low: 5000 }, // not ordered Uint256
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
        au1: [cairo.uint256(1000), cairo.uint256(2000), cairo.uint256(3000), cairo.uint256(4000)],
        as1: [
          { discount_fix_bps: 10, discount_transfer_bps: 11 },
          { discount_fix_bps: 20, discount_transfer_bps: 22 },
        ],
        atmk: [
          cairo.tuple(
            cairo.tuple(
              {
                x1: 1,
                x2: { y1: 1, y2: 2 },
                x3: cairo.tuple(
                  cairo.tuple(10, 11),
                  cairo.tuple(cairo.tuple(100, 101), cairo.tuple(1000, 1001))
                ),
              },
              3
            ),
            4
          ),
          cairo.tuple(
            cairo.tuple(
              {
                x1: 1,
                x2: { y1: 1, y2: 2 },
                x3: cairo.tuple(
                  cairo.tuple(10, 11),
                  cairo.tuple(cairo.tuple(100, 101), cairo.tuple(1000, 1001))
                ),
              },
              3
            ),
            4
          ),
        ],
        atmku: [
          cairo.tuple(cairo.tuple({ y1: 1, y2: 2 }, 3), 4),
          cairo.tuple(cairo.tuple({ y1: 1, y2: 2 }, 3), 4),
          cairo.tuple(cairo.tuple({ y1: 1, y2: 2 }, 3), 4),
        ],
      };
      const myCallData = new CallData(echoContract.abi);
      const myRawArgsObject = requestNonOrdered;
      const myRawArgsArray = Object.values(request);
      const callDataFromObject = myCallData.compile('echo', myRawArgsObject);
      const callDataFromArray = myCallData.compile('echo', myRawArgsArray);
      const expectedResult = [
        '474107654995566025798705',
        '123',
        '8',
        '135049554883004558383340439742929429255072943744440858662311072577337126766',
        '203887170123222058415354283980421533276985178030994883159827760142323294308',
        '196343614134218459150194337625778954700414868493373034945803514629145850912',
        '191491606203201332235940470946533476219373216944002683254566549675726417440',
        '150983476482645969577707455338206408996455974968365254240526141964709732462',
        '196916864427988120570407658938236398782031728400132565646592333804118761826',
        '196909666192589839125749789377187946419246316474617716408635151520594095469',
        '2259304674248048077001042434290734',
        '1',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '5000',
        '0',
        '1',
        '2',
        '1',
        '2',
        '200',
        '1',
        '2',
        '6',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '4',
        '1000',
        '0',
        '2000',
        '0',
        '3000',
        '0',
        '4000',
        '0',
        '2',
        '10',
        '11',
        '20',
        '22',
        '2',
        '1',
        '1',
        '2',
        '10',
        '11',
        '100',
        '101',
        '1000',
        '1001',
        '3',
        '4',
        '1',
        '1',
        '2',
        '10',
        '11',
        '100',
        '101',
        '1000',
        '1001',
        '3',
        '4',
        '3',
        '1',
        '2',
        '3',
        '4',
        '1',
        '2',
        '3',
        '4',
        '1',
        '2',
        '3',
        '4',
      ];
      expect(callDataFromObject).toStrictEqual(expectedResult);
      expect(callDataFromArray).toStrictEqual(expectedResult);
    });

    test('myCallData.decodeParameters for Cairo 1', async () => {
      const myCallData = new CallData(echoContract.abi);

      const res0 = myCallData.decodeParameters('core::felt252', ['474107654995566025798705']);
      expect(res0).toBe(474107654995566025798705n);
      const res1 = myCallData.decodeParameters('echo::StructY', [
        '474107654995566025798705',
        '3534634645645',
      ]);
      expect(res1).toEqual({ y1: 474107654995566025798705n, y2: 3534634645645n });

      const res2 = myCallData.decodeParameters('core::integer::u256', ['47410765', '35346645']);
      expect(res2).toBe(12027840023314154934885372750905072692667575885n);
      const res3 = myCallData.decodeParameters('echo::Struct32', [
        '47410765',
        '35346645',
        '1',
        '2',
        '3',
      ]);
      expect(res3).toEqual({ b: 47410765n, c: { '0': 35346645n, '1': 1n, '2': 2n, '3': 3n } });

      const res4 = myCallData.decodeParameters(
        '(core::felt252, core::felt252, core::felt252, core::felt252)',
        ['47410765', '35346645', '1', '2']
      );
      expect(res4).toEqual({ '0': 47410765n, '1': 35346645n, '2': 1n, '3': 2n });

      const res5 = myCallData.decodeParameters('echo::Struct2', [
        '47410765',
        '35346645',
        '1',
        '2',
        '3',
      ]);
      expect(res5).toEqual({
        info: { discount_fix_bps: 47410765n, discount_transfer_bps: 35346645n },
        data: 1n,
        data2: { '0': 2n, '1': 3n },
      });
      const res6 = myCallData.decodeParameters('echo::Struct3', [
        '47',
        '35346645',
        '1',
        '2',
        '3',
        '4',
      ]);
      expect(res6).toEqual({
        a: 47n,
        b: { b: 35346645n, c: { '0': 1n, '1': 2n, '2': 3n, '3': 4n } },
      });
      const res7 = myCallData.decodeParameters('(core::felt252, echo::StructX, core::felt252)', [
        '47410765',
        '35346645',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ]);
      expect(res7).toEqual({
        '0': 47410765n,
        '1': {
          x1: 35346645n,
          x2: { y1: 1n, y2: 2n },
          x3: {
            '0': { '0': 3n, '1': 4n },
            '1': { '0': { '0': 5n, '1': 6n }, '1': { '0': 7n, '1': 8n } },
          },
        },
        '2': 9n,
      });
    });

    test('invoke compiled data', async () => {
      const result = await echoContract.iecho(CallData.compile(request));
      const transactionR = await provider.waitForTransaction(result.transaction_hash);
      expect(transactionR.isSuccess()).toBe(true);
    });

    test('invoke with resourceBounds options', async () => {
      await expect(
        echoContract
          .withOptions({
            resourceBounds: {
              l1_gas: {
                max_amount: 0n,
                max_price_per_unit: 0n,
              },
              l1_data_gas: {
                max_amount: 0n,
                max_price_per_unit: 0n,
              },
              l2_gas: {
                max_amount: 0n,
                max_price_per_unit: 0n,
              },
            },
          })
          .iecho(CallData.compile(request))
      ).rejects.toThrow(RpcError);
    });

    test('invoke unit test arguments', async () => {
      const calldata = CallData.compile(request);
      const args = Object.values(request);
      const result = await echoContract.iecho(calldata);
      const transactionR = await provider.waitForTransaction(result.transaction_hash);
      expect(transactionR.isSuccess()).toBe(true);

      const result1 = await echoContract.iecho(...args);
      const transaction1R = await provider.waitForTransaction(result1.transaction_hash);
      expect(transaction1R.isSuccess()).toBe(true);

      const result2 = await echoContract.invoke('iecho', calldata);
      const transaction2R = await provider.waitForTransaction(result2.transaction_hash);
      expect(transaction2R.isSuccess()).toBe(true);

      const result3 = await echoContract.invoke('iecho', args);
      const transaction3R = await provider.waitForTransaction(result3.transaction_hash);
      expect(transaction3R.isSuccess()).toBe(true);
    });

    describe('speedup live tests', () => {
      test('call parameterized data', async () => {
        const result = await echoContract
          .withOptions({
            parseRequest: true,
            parseResponse: true,
            formatResponse,
          })
          .echo(
            shortString.encodeShortString(request.t1),
            request.n1,
            request.tl2.map(shortString.encodeShortString),
            request.k1,
            request.k2,
            request.u1,
            request.s1,
            request.s2,
            request.af1,
            request.au1,
            request.as1,
            request.atmk,
            request.atmku
          );

        // Convert request uint256 to match response
        const compareRequest = cairo.tuple(
          ...Object.values({
            ...request,
            u1: uint256.uint256ToBN(request.u1),
            au1: request.au1.map((it) => uint256.uint256ToBN(it)),
          })
        );
        expect(json.stringify(result)).toBe(json.stringify(compareRequest));
      });

      test('invoke parameterized data', async () => {
        const result = await echoContract
          .withOptions({
            formatResponse,
          })
          .iecho(
            request.t1,
            request.n1,
            request.tl2.map(shortString.encodeShortString),
            request.k1,
            request.k2,
            request.u1,
            request.s1,
            request.s2,
            request.af1,
            request.au1,
            request.as1,
            request.atmk,
            request.atmku
          );
        const transactionR = await provider.waitForTransaction(result.transaction_hash);
        expect(transactionR.isSuccess()).toBe(true);
      });
    });

    test('populate transaction and call with populated data', async () => {
      const args = Object.values(request);
      // populateTransaction
      const populated1 = echoContract.populateTransaction.echo(...args);
      // populate
      const populated2 = echoContract.populate('echo', args);
      // populate with apply
      const populated3 = echoContract.populate.apply(echoContract, ['echo', args]);
      // populateTransaction with compiledCalldata
      const calldata = CallData.compile(request);
      const populated4 = echoContract.populateTransaction.echo(calldata);
      const populated5 = echoContract.populate('echo', calldata);
      const populated6 = echoContract.populate('echo', request);
      const expected =
        '["474107654995566025798705","123","8","135049554883004558383340439742929429255072943744440858662311072577337126766","203887170123222058415354283980421533276985178030994883159827760142323294308","196343614134218459150194337625778954700414868493373034945803514629145850912","191491606203201332235940470946533476219373216944002683254566549675726417440","150983476482645969577707455338206408996455974968365254240526141964709732462","196916864427988120570407658938236398782031728400132565646592333804118761826","196909666192589839125749789377187946419246316474617716408635151520594095469","2259304674248048077001042434290734","1","1","2","3","4","5","6","1","2","3","4","5","6","7","8","9","10","11","5000","0","1","2","1","2","200","1","2","6","1","2","3","4","5","6","4","1000","0","2000","0","3000","0","4000","0","2","10","11","20","22","2","1","1","2","10","11","100","101","1000","1001","3","4","1","1","2","10","11","100","101","1000","1001","3","4","3","1","2","3","4","1","2","3","4","1","2","3","4"]';
      expect(expected).toBe(json.stringify(populated1.calldata));
      expect(expected).toBe(json.stringify(populated2.calldata));
      expect(expected).toBe(json.stringify(populated3.calldata));
      expect(expected).toBe(json.stringify(populated4.calldata));
      expect(expected).toBe(json.stringify(populated5.calldata));
      expect(expected).toBe(json.stringify(populated6.calldata));

      // mark data as compiled (it can be also done manually check defineProperty compiled in CallData.compile)
      const compiledCallData = CallData.compile(populated4.calldata);
      const result = await echoContract
        .withOptions({
          formatResponse,
        })
        .echo(compiledCallData);
      // Convert request uint256 to match response
      const compareRequest = cairo.tuple(
        ...Object.values({
          ...request,
          u1: uint256.uint256ToBN(request.u1),
          au1: request.au1.map((it) => uint256.uint256ToBN(it)),
        })
      );
      expect(json.stringify(result)).toBe(json.stringify(compareRequest));
    });

    test('estimate fee', async () => {
      const args = Object.values(request);
      const calldata = CallData.compile(request);
      const gas1 = await echoContract.estimateFee.iecho(calldata);
      const gas2 = await echoContract.estimateFee.iecho(...args);
      const gas3 = await echoContract.estimate('iecho', calldata);
      const gas4 = await echoContract.estimate('iecho', args);
      expect(gas1).toMatchSchemaRef('EstimateFeeResponseOverhead');
      expect(gas2).toMatchSchemaRef('EstimateFeeResponseOverhead');
      expect(gas3).toMatchSchemaRef('EstimateFeeResponseOverhead');
      expect(gas4).toMatchSchemaRef('EstimateFeeResponseOverhead');
    });

    test('estimate fee transfer', async () => {
      const gas = await erc20Contract.estimateFee.transfer(stark.randomAddress(), cairo.uint256(1));
      expect(gas).toMatchSchemaRef('EstimateFeeResponseOverhead');
    });
  });
});

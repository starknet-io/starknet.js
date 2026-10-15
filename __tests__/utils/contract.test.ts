import { type CompiledSierra, type Calldata, CallData, Deployer, cairo } from '../../src';
import { isSierra, extractContractHashes } from '../../src/utils/contract';
import { parseContract } from '../../src/utils/provider';
import { CONTRACTS } from '../config/fixtures';

describe('isSierra', () => {
  test('should return true for a contract in Sierra format', () => {
    expect(isSierra(CONTRACTS.Erc20Oz100.sierra)).toBe(true);
  });

  test('should return false for a contract not in Sierra format', () => {
    expect(isSierra(CONTRACTS.Erc20Oz100.casm as any as CompiledSierra)).toBe(false);
  });
});

describe('extractContractHashes', () => {
  test('should properly extract hashes from contract, starknet < v0.14.1', () => {
    const declareContractPayload = {
      contract: CONTRACTS.Erc20Oz100.sierra,
      casm: CONTRACTS.Erc20Oz100.casm,
    };
    const result = extractContractHashes(declareContractPayload, '0.13.0');

    expect(result).toHaveProperty(
      'classHash',
      '0x393ef3ce29284a4fbf7abfe301d894ff9e7720a13c37f4aac58f2376f0c12ff'
    );
    expect(result).toHaveProperty(
      'compiledClassHash',
      '0x7e4b13e7b1de8e3555b04b2ef2c8757b4329b83420dc502ae5384c9748cdab5'
    );
  });

  test('should properly extract hashes from contract, starknet = v0.14.1', () => {
    const declareContractPayload = {
      contract: CONTRACTS.Erc20Oz100.sierra,
      casm: CONTRACTS.Erc20Oz100.casm,
    };
    const result = extractContractHashes(declareContractPayload, '0.14.1');

    expect(result).toHaveProperty(
      'classHash',
      '0x393ef3ce29284a4fbf7abfe301d894ff9e7720a13c37f4aac58f2376f0c12ff'
    );
    expect(result).toHaveProperty(
      'compiledClassHash',
      '0x51bdb8f4a2ca02c238fc2d700f68d020574949c1c70dff3799b16f3d9757d52'
    );
  });

  test('should properly extract hashes from contract, starknet > v0.14.1', () => {
    const declareContractPayload = {
      contract: CONTRACTS.Erc20Oz100.sierra,
      casm: CONTRACTS.Erc20Oz100.casm,
    };
    const result = extractContractHashes(declareContractPayload, '0.15.0');

    expect(result).toHaveProperty(
      'classHash',
      '0x393ef3ce29284a4fbf7abfe301d894ff9e7720a13c37f4aac58f2376f0c12ff'
    );
    expect(result).toHaveProperty(
      'compiledClassHash',
      '0x51bdb8f4a2ca02c238fc2d700f68d020574949c1c70dff3799b16f3d9757d52'
    );
  });

  test('should properly extract hashes from contract, starknet default', () => {
    const declareContractPayload = {
      contract: CONTRACTS.Erc20Oz100.sierra,
      casm: CONTRACTS.Erc20Oz100.casm,
    };
    const result = extractContractHashes(declareContractPayload);

    expect(result).toHaveProperty(
      'classHash',
      '0x393ef3ce29284a4fbf7abfe301d894ff9e7720a13c37f4aac58f2376f0c12ff'
    );
    expect(result).toHaveProperty(
      'compiledClassHash',
      '0x51bdb8f4a2ca02c238fc2d700f68d020574949c1c70dff3799b16f3d9757d52'
    );
  });
});

describe('parseContract', () => {
  test('refuses a Sierra contract without abi field', async () => {
    const sierraWithoutAbi = { ...CONTRACTS.U96.sierra, abi: undefined } as any;
    await expect(parseContract(sierraWithoutAbi)).rejects.toThrow(
      'Invalid Sierra contract: the "abi" field is missing'
    );
  });
});

describe('Deployer.buildDeployerCall', () => {
  const erc20Abi = CONTRACTS.Erc20Oz100.sierra.abi;
  const classHash = '0x1234';
  const deployerAddress = '0xabc';
  const salt = '0x1';

  const name = 'Token';
  const symbol = 'ERC20';
  const amount = 1000n;
  const recipient = '0x1111';
  const owner = '0x2222';

  // An array is always positional, so this call never goes through the object-ordering
  // logic under test: it is an independent oracle for the expected constructor calldata.
  const expectedConstructorCalldata = new CallData(erc20Abi).compile('constructor', [
    name,
    symbol,
    amount,
    recipient,
    owner,
  ]);

  test('orders a named constructor object by the abi, not by its key insertion order', () => {
    const deployer = new Deployer();

    // `Call.calldata` is typed `RawArgs | Calldata` for input flexibility elsewhere; this
    // function always builds it as a concrete array, so the cast reflects that guarantee.
    const inAbiOrder = deployer.buildDeployerCall(
      {
        classHash,
        salt,
        abi: erc20Abi,
        constructorCalldata: { name, symbol, amount, recipient, owner },
      },
      deployerAddress
    ).calls[0].calldata as Calldata;

    // Same fields and values, only the object's insertion order differs from the abi's:
    // recipient and amount swap places, as in GHSA-5v3j-x5p9-4grp.
    const outOfAbiOrder = deployer.buildDeployerCall(
      {
        classHash,
        salt,
        abi: erc20Abi,
        constructorCalldata: { name, symbol, recipient, amount, owner },
      },
      deployerAddress
    ).calls[0].calldata as Calldata;

    // calldata layout: [classHash, salt, unique, constructorCalldata.length, ...constructorCalldata]
    expect(inAbiOrder.slice(4)).toEqual(expectedConstructorCalldata);
    expect(outOfAbiOrder.slice(4)).toEqual(expectedConstructorCalldata);
  });

  test('accepts already compiled felts that match the constructor', () => {
    const deployer = new Deployer();
    const calldata = deployer.buildDeployerCall(
      { classHash, salt, abi: erc20Abi, constructorCalldata: expectedConstructorCalldata },
      deployerAddress
    ).calls[0].calldata as Calldata;

    expect(calldata.slice(4)).toEqual(expectedConstructorCalldata);
  });

  test('refuses already compiled felts made without the abi', () => {
    const deployer = new Deployer();
    // without the abi, each text becomes 1 felt instead of a 3-felt ByteArray, and the u256
    // 1 felt instead of 2: 5 felts where the constructor takes 10
    const feltsWithoutAbi = CallData.compile([name, symbol, amount, recipient, owner]);
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: erc20Abi, constructorCalldata: feltsWithoutAbi },
        deployerAddress
      )
    ).toThrow('The compiled constructor calldata does not match the abi');
  });

  test('refuses already compiled felts with one felt too many', () => {
    const deployer = new Deployer();
    const oneFeltTooMany = CallData.compile([...expectedConstructorCalldata, '7']);
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: erc20Abi, constructorCalldata: oneFeltTooMany },
        deployerAddress
      )
    ).toThrow('The compiled constructor calldata does not match the abi: it has 1 felt too many');
  });

  test('refuses already compiled felts with one felt missing', () => {
    const deployer = new Deployer();
    const oneFeltMissing = CallData.compile(expectedConstructorCalldata.slice(0, -1));
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: erc20Abi, constructorCalldata: oneFeltMissing },
        deployerAddress
      )
    ).toThrow(
      'The compiled constructor calldata does not match the abi: it has fewer felts than the constructor takes'
    );
  });
});

describe('Deployer.buildDeployerCall for a contract with no constructor', () => {
  // u96 has no constructor in its abi: only an empty calldata can deploy it
  const noConstructorAbi = CONTRACTS.U96.sierra.abi;
  const classHash = '0x1234';
  const deployerAddress = '0xabc';
  const salt = '0x1';

  test('accepts an empty calldata', () => {
    const deployer = new Deployer();
    const calldata = deployer.buildDeployerCall(
      { classHash, salt, abi: noConstructorAbi, constructorCalldata: [] },
      deployerAddress
    ).calls[0].calldata as Calldata;

    // calldata layout: [classHash, salt, unique, constructorCalldata.length, ...constructorCalldata]
    expect(calldata.slice(3)).toEqual([0]);
  });

  test('refuses an array calldata, which used to fail with an unclear TypeError', () => {
    const deployer = new Deployer();
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: noConstructorAbi, constructorCalldata: [1] },
        deployerAddress
      )
    ).toThrow('Cannot pass calldata to a contract with no constructor');
  });

  test('refuses an object calldata, which used to be dropped silently', () => {
    const deployer = new Deployer();
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: noConstructorAbi, constructorCalldata: { a: 1 } },
        deployerAddress
      )
    ).toThrow('Cannot pass calldata to a contract with no constructor');
  });

  test('refuses already compiled felts, which used to pass unchecked', () => {
    const deployer = new Deployer();
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: noConstructorAbi, constructorCalldata: CallData.compile([1]) },
        deployerAddress
      )
    ).toThrow('Cannot pass calldata to a contract with no constructor');
  });
});

describe('Deployer.buildDeployerCall for a Cairo V1 contract, whose abi declares the constructor as a function', () => {
  // complex_sierra is Cairo V1 (Sierra 0.1.0): its abi has `type: 'function', name: 'constructor'`
  const cairoV1Abi = CONTRACTS.ComplexSierra.sierra.abi;
  const classHash = '0x1234';
  const deployerAddress = '0xabc';
  const salt = '0x1';

  // the constructor parameters of __tests__/cairo1v2.test.ts, first as named parameters...
  const uint256 = { low: 23456, high: 1 };
  const order2 = { p1: '17', p2: [234, 467456745457n, '0x56ec'] };
  const namedParameters = {
    name: 'niceToken',
    symbol: 'NIT',
    decimals: 18,
    initial_supply: uint256,
    card: order2,
    recipient: '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
    active: true,
    tupoftup: cairo.tuple(cairo.tuple(34, '0x5e'), uint256),
    longText: 'Bug is back, for ever, here and everywhere',
    array1: [100, 101, 102],
    array2: [
      [200, 201],
      [202, 203],
      [204, 205],
    ],
    array3: [order2, order2],
    array4: [uint256, uint256],
    tuple1: cairo.tuple(40000n, order2, [54, 55n, '0xae'], 'texte'),
    array5: [cairo.tuple(251, 40000n), cairo.tuple(252, 40001n)],
  };
  // ...then the same values as an array, in the order of the abi
  const parametersArray = [
    'niceToken',
    'NIT',
    18,
    uint256,
    order2,
    '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
    true,
    cairo.tuple(cairo.tuple(34, '0x5e'), uint256),
    'Bug is back, for ever, here and everywhere',
    [100, 101, 102],
    [
      [200, 201],
      [202, 203],
      [204, 205],
    ],
    [order2, order2],
    [uint256, uint256],
    cairo.tuple(40000n, order2, [54, 55n, '0xae'], 'texte'),
    [cairo.tuple(251, 40000n), cairo.tuple(252, 40001n)],
  ];
  // `compile` has always found this constructor, by its name: its result is the reference
  const expectedConstructorCalldata = new CallData(cairoV1Abi).compile(
    'constructor',
    namedParameters
  );

  test('accepts named parameters', () => {
    const deployer = new Deployer();
    const calldata = deployer.buildDeployerCall(
      { classHash, salt, abi: cairoV1Abi, constructorCalldata: namedParameters },
      deployerAddress
    ).calls[0].calldata as Calldata;

    // calldata layout: [classHash, salt, unique, constructorCalldata.length, ...constructorCalldata]
    expect(calldata.slice(4)).toEqual(expectedConstructorCalldata);
  });

  test('accepts an array of parameters, which used to be refused', () => {
    const deployer = new Deployer();
    const calldata = deployer.buildDeployerCall(
      { classHash, salt, abi: cairoV1Abi, constructorCalldata: parametersArray },
      deployerAddress
    ).calls[0].calldata as Calldata;

    expect(calldata.slice(4)).toEqual(expectedConstructorCalldata);
  });

  test('accepts already compiled felts', () => {
    const deployer = new Deployer();
    const calldata = deployer.buildDeployerCall(
      { classHash, salt, abi: cairoV1Abi, constructorCalldata: expectedConstructorCalldata },
      deployerAddress
    ).calls[0].calldata as Calldata;

    expect(calldata.slice(4)).toEqual(expectedConstructorCalldata);
  });

  test('refuses already compiled felts with one felt too many', () => {
    const deployer = new Deployer();
    const oneFeltTooMany = CallData.compile([...expectedConstructorCalldata, '7']);
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: cairoV1Abi, constructorCalldata: oneFeltTooMany },
        deployerAddress
      )
    ).toThrow('The compiled constructor calldata does not match the abi: it has 1 felt too many');
  });
});

describe('Deployer.buildDeployerCall with already compiled felts for a NonZero parameter', () => {
  // a constructor taking one NonZero<felt252>: the felts are written again by the abi, which
  // refuses a zero, as it does for a parameter
  const nonZeroAbi = [
    {
      type: 'constructor',
      name: 'constructor',
      inputs: [{ name: 'amount', type: 'core::zeroable::NonZero::<core::felt252>' }],
    },
  ];
  const classHash = '0x1234';
  const deployerAddress = '0xabc';
  const salt = '0x1';

  test('accepts a felt that is not zero', () => {
    const deployer = new Deployer();
    const calldata = deployer.buildDeployerCall(
      { classHash, salt, abi: nonZeroAbi, constructorCalldata: CallData.compile(['7']) },
      deployerAddress
    ).calls[0].calldata as Calldata;

    expect(calldata.slice(4)).toEqual(['7']);
  });

  test('refuses a zero', () => {
    const deployer = new Deployer();
    expect(() =>
      deployer.buildDeployerCall(
        { classHash, salt, abi: nonZeroAbi, constructorCalldata: CallData.compile(['0']) },
        deployerAddress
      )
    ).toThrow('value 0 is not authorized in NonZero type');
  });
});

import { type CompiledSierra, type Calldata, CallData, Deployer } from '../../src';
import { isSierra, extractContractHashes } from '../../src/utils/contract';
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
});

// We test here the most common case: an account compatible with ERC-165 and SNIP-9 (v2).
// To limit test duration, these cases are not tested: non ERC165 account, non SNIP-9 account, SNIP9-v1 account.
import {
  Provider,
  Account,
  cairo,
  ec,
  stark,
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CallData,
  OutsideExecutionVersion,
  type OutsideExecutionOptions,
  type OutsideTransaction,
  constants,
  type Call,
  Contract,
  outsideExecution,
  type TypedData,
  type Calldata,
  src5,
} from '../src';
import { getSelectorFromName } from '../src/utils/hash';
import { getDecimalString } from '../src/utils/num';
import {
  compiledArgentX4Account,
  compiledErc20OZ,
  getTestAccount,
  getTestProvider,
} from './config/fixtures';

describe('Account and OutsideExecution', () => {
  const ethAddress = '0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7';
  const provider = new Provider(getTestProvider());
  const executorAccount = getTestAccount(provider);
  let signerAccount: Account;
  const targetPK = stark.randomAddress();
  const targetPubK = ec.starkCurve.getStarkKey(targetPK);
  // For ERC20 transfer outside call
  const recipientAccount = executorAccount;
  const ethContract = new Contract(compiledErc20OZ.abi, ethAddress, provider);

  beforeAll(async () => {
    // Deploy the SNIP-9 signer account (ArgentX v 0.4.0, using SNIP-9 v2):
    const calldataAX = new CallData(compiledArgentX4Account.abi);
    const axSigner = new CairoCustomEnum({ Starknet: { pubkey: targetPubK } });
    const axGuardian = new CairoOption<unknown>(CairoOptionVariant.None);
    const constructorAXCallData = calldataAX.compile('constructor', {
      owner: axSigner,
      guardian: axGuardian,
    });
    const response = await executorAccount.declareAndDeploy({
      contract: compiledArgentX4Account,
      classHash: '0x36078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f',
      compiledClassHash: '0x7a663375245780bd307f56fde688e33e5c260ab02b76741a57711c5b60d47f6',
      constructorCalldata: constructorAXCallData,
    });
    const targetAddress = response.deploy.contract_address;
    signerAccount = new Account(provider, targetAddress, targetPK);

    // Transfer dust of ETH token to the signer account
    const transferCall = {
      contractAddress: ethAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: signerAccount.address,
        amount: cairo.uint256(1000),
      },
    };
    const { transaction_hash } = await executorAccount.execute(transferCall);
    await provider.waitForTransaction(transaction_hash);
  });

  test('getOutsideCall', async () => {
    const call1: Call = {
      contractAddress: '0x0123',
      entrypoint: 'transfer',
      calldata: {
        recipient: '0xabcd',
        amount: cairo.uint256(10),
      },
    };
    expect(outsideExecution.getOutsideCall(call1)).toEqual({
      to: '0x0123',
      selector: getSelectorFromName(call1.entrypoint),
      calldata: ['43981', '10', '0'],
    });
  });

  test('Build SNIP-9 v2 TypedData', async () => {
    const call1: Call = {
      contractAddress: '0x0123',
      entrypoint: 'transfer',
      calldata: {
        recipient: '0xabcd',
        amount: cairo.uint256(10),
      },
    };
    const callOptions: OutsideExecutionOptions = {
      caller: '0x1234',
      execute_after: 100,
      execute_before: 200,
    };
    const message: TypedData = outsideExecution.getTypedData(
      constants.StarknetChainId.SN_SEPOLIA,
      callOptions,
      21,
      [call1],
      OutsideExecutionVersion.V2
    );
    expect(message).toEqual({
      domain: {
        chainId: '0x534e5f5345504f4c4941',
        name: 'Account.execute_from_outside',
        revision: '1',
        version: '2',
      },
      message: {
        Caller: '0x1234',
        Calls: [
          {
            Calldata: ['43981', '10', '0'],
            Selector: '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
            To: '0x0123',
          },
        ],
        'Execute After': 100,
        'Execute Before': 200,
        Nonce: 21,
      },
      primaryType: 'OutsideExecution',
      types: {
        Call: [
          {
            name: 'To',
            type: 'ContractAddress',
          },
          {
            name: 'Selector',
            type: 'selector',
          },
          {
            name: 'Calldata',
            type: 'felt*',
          },
        ],
        OutsideExecution: [
          {
            name: 'Caller',
            type: 'ContractAddress',
          },
          {
            name: 'Nonce',
            type: 'felt',
          },
          {
            name: 'Execute After',
            type: 'u128',
          },
          {
            name: 'Execute Before',
            type: 'u128',
          },
          {
            name: 'Calls',
            type: 'Call*',
          },
        ],
        StarknetDomain: [
          {
            name: 'name',
            type: 'shortstring',
          },
          {
            name: 'version',
            type: 'shortstring',
          },
          {
            name: 'chainId',
            type: 'shortstring',
          },
          {
            name: 'revision',
            type: 'shortstring',
          },
        ],
      },
    });
  });

  test('buildExecuteFromOutsideCallData', async () => {
    const outsideTransaction: OutsideTransaction = {
      outsideExecution: {
        caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
        nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
        execute_after: 500,
        execute_before: 600,
        calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
      },
      signature: ['0x123', '0x456'],
      signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
      version: OutsideExecutionVersion.V2,
    };

    const execute: Calldata = outsideExecution.buildExecuteFromOutsideCallData(outsideTransaction);
    expect(execute).toEqual([
      '2846891009026995430665703316224827616914889274105712248413538305735679628945',
      '3534941323322368687588030484849371698982661160919690922146419787802417549486',
      '500',
      '600',
      '1',
      '1656',
      '2192',
      '2',
      '12',
      '13',
      '2',
      '291',
      '1110',
    ]);
  });

  test('Signer account should support SNIP-9 v2', async () => {
    expect(await signerAccount.getSnip9Version()).toBe(OutsideExecutionVersion.V2);
  });

  test('SNIP-9 nonce', async () => {
    const nonce = await signerAccount.getSnip9Nonce();
    expect(nonce).toBeDefined();
    expect(await signerAccount.isValidSnip9Nonce(nonce)).toBe(true);
  });

  test('should build and execute outside transactions', async () => {
    const now_seconds = Math.floor(Date.now() / 1000);
    const hour_ago = (now_seconds - 3600).toString();
    const hour_later = (now_seconds + 3600).toString();
    const callOptions: OutsideExecutionOptions = {
      caller: executorAccount.address,
      execute_after: hour_ago,
      execute_before: hour_later,
    };
    const callOptions4: OutsideExecutionOptions = {
      ...callOptions,
      caller: 'ANY_CALLER',
    };
    const call1: Call = {
      contractAddress: ethAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: recipientAccount.address,
        amount: cairo.uint256(100),
      },
    };
    const call2: Call = {
      contractAddress: ethAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: recipientAccount.address,
        amount: cairo.uint256(200),
      },
    };
    const call3: Call = {
      contractAddress: ethAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: recipientAccount.address,
        amount: cairo.uint256(300),
      },
    };
    const call4: Call = {
      contractAddress: ethAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: recipientAccount.address,
        amount: cairo.uint256(400),
      },
    };
    const outsideTransaction3: OutsideTransaction = await signerAccount.getOutsideTransaction(
      callOptions4,
      call4
    ); // ANY_CALLER

    const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(
      callOptions,
      call3
    ); // designated caller
    expect(outsideTransaction3.version).toBe(OutsideExecutionVersion.V2);
    expect(outsideTransaction1.signerAddress).toBe(signerAccount.address);
    expect(outsideTransaction3.outsideExecution.caller).toBe(constants.OutsideExecutionCallerAny);
    expect(outsideTransaction1.outsideExecution.caller).toBe(executorAccount.address);
    expect(outsideTransaction1.outsideExecution.execute_after).toBe(hour_ago);
    expect(outsideTransaction1.outsideExecution.execute_before).toBe(hour_later);
    expect(outsideTransaction1.outsideExecution.calls).toEqual([
      {
        to: ethAddress,
        selector: '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
        calldata: [getDecimalString(recipientAccount.address), '300', '0'],
      },
    ]);
    // get outside transaction of a multiCall :
    const outsideTransaction2: OutsideTransaction = await signerAccount.getOutsideTransaction(
      callOptions,
      [call1, call2]
    );
    expect(outsideTransaction2.outsideExecution.calls).toEqual([
      {
        to: ethAddress,
        selector: '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
        calldata: [getDecimalString(recipientAccount.address), '100', '0'],
      },
      {
        to: ethAddress,
        selector: '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
        calldata: [getDecimalString(recipientAccount.address), '200', '0'],
      },
    ]);
    const bal0 = (await ethContract.balanceOf(signerAccount.address)) as bigint;
    const res0 = await executorAccount.executeFromOutside(outsideTransaction2);
    await provider.waitForTransaction(res0.transaction_hash);
    const bal1 = (await ethContract.balanceOf(signerAccount.address)) as bigint;
    expect(bal0 - bal1).toBe(300n);
    // execute multi outside transactions
    const res1 = await executorAccount.executeFromOutside([
      outsideTransaction1,
      outsideTransaction3,
    ]);
    await provider.waitForTransaction(res1.transaction_hash);
    const bal2 = (await ethContract.balanceOf(signerAccount.address)) as bigint;
    expect(bal1 - bal2).toBe(700n);
    expect(await signerAccount.isValidSnip9Nonce(outsideTransaction3.outsideExecution.nonce)).toBe(
      false
    );
  });

  test('ERC165 introspection', async () => {
    const isSNIP9 = await src5.supportsInterface(
      provider,
      signerAccount.address,
      constants.SNIP9_V2_INTERFACE_ID
    );
    expect(isSNIP9).toBe(true);
  });
});

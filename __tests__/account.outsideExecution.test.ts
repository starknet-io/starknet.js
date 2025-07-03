// We test here the most common case: an account compatible with ERC-165 and SNIP-9 (v2).
// To limit test duration, these cases are not tested: non ERC165 account, non SNIP-9 account, SNIP9-v1 account.
import {
  Account,
  cairo,
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CallData,
  constants,
  Contract,
  ec,
  num,
  outsideExecution,
  OutsideExecutionVersion,
  Provider,
  src5,
  stark,
  TransactionType,
  type Call,
  type Calldata,
  type Invocations,
  type OutsideExecutionOptions,
  type OutsideTransaction,
  type TypedData,
  type WeierstrassSignatureType,
} from '../src';
import { getSelectorFromName } from '../src/utils/hash';
import { getDecimalString } from '../src/utils/num';
import { contracts, createTestProvider, getTestAccount, STRKtokenAddress } from './config/fixtures';

describe('Account and OutsideExecution', () => {
  let provider: Provider;
  let executorAccount: Account;
  let signerAccount: Account;

  const targetPK = stark.randomAddress();
  const targetPubK = ec.starkCurve.getStarkKey(targetPK);

  // For ERC20 transfer outside call
  let recipientAccount: Account;
  let strkContract: Contract;

  let call1: Call;
  let call2: Call;

  const now_seconds = Math.floor(Date.now() / 1000);
  const hour_ago = (now_seconds - 3600).toString();
  const hour_later = (now_seconds + 3600).toString();

  beforeAll(async () => {
    provider = new Provider(await createTestProvider());
    executorAccount = getTestAccount(provider);
    recipientAccount = executorAccount;
    strkContract = new Contract(contracts.Erc20OZ.sierra.abi, STRKtokenAddress, provider);

    call1 = {
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: recipientAccount.address,
        amount: cairo.uint256(100),
      },
    };
    call2 = {
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: recipientAccount.address,
        amount: cairo.uint256(200),
      },
    };

    // Deploy the SNIP-9 signer account (ArgentX v 0.4.0, using SNIP-9 v2):
    const calldataAX = new CallData(contracts.ArgentX4Account.sierra.abi);
    const axSigner = new CairoCustomEnum({ Starknet: { pubkey: targetPubK } });
    const axGuardian = new CairoOption<unknown>(CairoOptionVariant.None);
    const constructorAXCallData = calldataAX.compile('constructor', {
      owner: axSigner,
      guardian: axGuardian,
    });
    const response = await executorAccount.declareAndDeploy({
      contract: contracts.ArgentX4Account.sierra,
      classHash: '0x36078334509b514626504edc9fb252328d1a240e4e948bef8d0c08dff45927f',
      compiledClassHash: '0x7a663375245780bd307f56fde688e33e5c260ab02b76741a57711c5b60d47f6',
      constructorCalldata: constructorAXCallData,
    });
    const targetAddress = response.deploy.contract_address;
    signerAccount = new Account(provider, targetAddress, targetPK);

    // Transfer dust of STRK token to the signer account
    const transferCall = {
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: signerAccount.address,
        amount: cairo.uint256(2n * 10n ** 17n), // 0.2 STRK
      },
    };
    const { transaction_hash } = await executorAccount.execute(transferCall);
    await provider.waitForTransaction(transaction_hash);
  });

  test('getOutsideCall', async () => {
    expect(outsideExecution.getOutsideCall(call1)).toEqual({
      to: STRKtokenAddress,
      selector: getSelectorFromName(call1.entrypoint),
      calldata: [num.hexToDecimalString(recipientAccount.address), '100', '0'],
    });
  });

  test('Build SNIP-9 v2 TypedData', async () => {
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
            Calldata: [num.hexToDecimalString(recipientAccount.address), '100', '0'],
            Selector: getSelectorFromName(call1.entrypoint),
            To: STRKtokenAddress,
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

  test('buildExecuteFromOutsideCall', async () => {
    const callOptions: OutsideExecutionOptions = {
      caller: executorAccount.address,
      execute_after: hour_ago,
      execute_before: hour_later,
    };
    const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(
      callOptions,
      [call1, call2]
    );
    const outsideExecutionCall: Call[] =
      outsideExecution.buildExecuteFromOutsideCall(outsideTransaction1);
    expect(outsideExecutionCall).toEqual([
      {
        calldata: [
          num.hexToDecimalString(recipientAccount.address),
          num.hexToDecimalString(outsideTransaction1.outsideExecution.nonce as string),
          outsideTransaction1.outsideExecution.execute_after.toString(),
          outsideTransaction1.outsideExecution.execute_before.toString(),
          '2',
          '2009894490435840142178314390393166646092438090257831307886760648929397478285',
          '232670485425082704932579856502088130646006032362877466777181098476241604910',
          '3',
          num.hexToDecimalString(recipientAccount.address),
          '100',
          '0',
          '2009894490435840142178314390393166646092438090257831307886760648929397478285',
          '232670485425082704932579856502088130646006032362877466777181098476241604910',
          '3',
          num.hexToDecimalString(recipientAccount.address),
          '200',
          '0',
          '2',
          (outsideTransaction1.signature as WeierstrassSignatureType).r.toString(),
          (outsideTransaction1.signature as WeierstrassSignatureType).s.toString(),
        ],
        contractAddress: signerAccount.address,
        entrypoint: 'execute_from_outside_v2',
      },
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
    const callOptions: OutsideExecutionOptions = {
      caller: executorAccount.address,
      execute_after: hour_ago,
      execute_before: hour_later,
    };
    const callOptions4: OutsideExecutionOptions = {
      ...callOptions,
      caller: 'ANY_CALLER',
    };
    const call3: Call = {
      contractAddress: STRKtokenAddress,
      entrypoint: 'transfer',
      calldata: {
        recipient: recipientAccount.address,
        amount: cairo.uint256(300),
      },
    };
    const call4: Call = {
      contractAddress: STRKtokenAddress,
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
        to: STRKtokenAddress,
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
        to: STRKtokenAddress,
        selector: '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
        calldata: [getDecimalString(recipientAccount.address), '100', '0'],
      },
      {
        to: STRKtokenAddress,
        selector: '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e',
        calldata: [getDecimalString(recipientAccount.address), '200', '0'],
      },
    ]);
    const bal0 = (await strkContract.balanceOf(signerAccount.address)) as bigint;
    const res0 = await executorAccount.executeFromOutside(outsideTransaction2);
    await provider.waitForTransaction(res0.transaction_hash);
    const bal1 = (await strkContract.balanceOf(signerAccount.address)) as bigint;
    expect(bal0 - bal1).toBe(300n);
    // execute multi outside transactions
    const res1 = await executorAccount.executeFromOutside([
      outsideTransaction1,
      outsideTransaction3,
    ]);
    await provider.waitForTransaction(res1.transaction_hash);
    const bal2 = (await strkContract.balanceOf(signerAccount.address)) as bigint;
    expect(bal1 - bal2).toBe(700n);
    expect(await signerAccount.isValidSnip9Nonce(outsideTransaction3.outsideExecution.nonce)).toBe(
      false
    );
  });

  test('estimate fees / simulate outsideExecution', async () => {
    const callOptions: OutsideExecutionOptions = {
      caller: executorAccount.address,
      execute_after: hour_ago,
      execute_before: hour_later,
    };
    const outsideTransaction: OutsideTransaction = await signerAccount.getOutsideTransaction(
      callOptions,
      [call1, call2]
    );
    const outsideExecutionCall: Call[] =
      outsideExecution.buildExecuteFromOutsideCall(outsideTransaction);
    const estimateFee = await executorAccount.estimateFee(outsideExecutionCall);
    expect(Object.keys(estimateFee).sort()).toEqual(
      [
        'overall_fee',
        'unit',
        'suggestedMaxFee',
        'resourceBounds',
        'l1_gas_consumed',
        'l1_data_gas_consumed',
        'l1_data_gas_price',
        'l1_gas_price',
        'l2_gas_consumed',
        'l2_gas_price',
      ].sort()
    );

    const invocations: Invocations = [
      {
        type: TransactionType.INVOKE,
        payload: outsideExecutionCall,
      },
    ];
    const responseSimulate = await executorAccount.simulateTransaction(invocations);
    expect(Object.keys(responseSimulate[0]).sort()).toEqual(
      Object.keys({
        transaction_trace: 0,
        fee_estimation: 0,
        suggestedMaxFee: 0,
        resourceBounds: 0,
      }).sort()
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
